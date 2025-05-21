import { Course } from "../models/course.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";




export const createCourse = asyncHandler(async (req, res) => {
    const { courseTitle, category } = req.body;
    const userId = req.id

    if (!courseTitle || !category) {
        throw new ApiError(400, "Course title and category is required.")
    }

    const course = await Course.create({
        courseTitle,
        category,
        creator: userId
    })

    return res.status(201).json(new ApiResponse(200, course, "Course created successfully"))
})


export const searchCourse = asyncHandler(async (req, res) => {
    const { query = "", categories = [], sortByPrice = "" } = req.qurey;

    const searchCriteria = {
        isPublished: true,
        $or: [
            { courseTitle: { $regex: query, $options: "i" } },
            { subTitle: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
        ]
    }

    //if category selected
    if (category.length > 0) {
        searchCriteria.category = { $in: categories };
    }

    //define sorting order
    const sortOption = {};
    if (sortByPrice === "low") {
        sortOption.coursePrice = 1;
    } else if (sortByPrice === "high") {
        sortOption.coursePrice = -1;
    }

    const courses = await Course.find(searchCriteria).populate({ path: "creator", select: "name avatar" }).sort(sortOption);

    return res.status(200).json(new ApiResponse(200, courses || []))
})


export const getPublishedCourse = asyncHandler(async (req, res) => {

    const coureses = await Course.find({ isPublished: true }).populate({path:"creator", select:"name avatar"});
    

})