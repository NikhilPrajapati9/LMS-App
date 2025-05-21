import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteMediaFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";




export const register = asyncHandler(async (req, res) => {
    const { email, name, password } = req.body;

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new ApiError(409, "User with email is already exists", [])
    }

    const user = await User.create({
        name,
        email,
        password
    })

    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                user,
                "Users registered successfully"
            )
        );
})


export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!email && !password) {
        throw new ApiError(400, "Email or Password is required");
    }

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    console.log(await user.isPasswordCorrect(password), isPasswordValid);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    const jwtToken = await user.generateAccessToken();

    return res
        .status(200)
        .cookie("token", jwtToken,
            {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000 // 1d
            })
        .json(
            new ApiResponse(
                200,
                user,
                "Welcome back"
            )
        );
})


export const logout = asyncHandler(async (req, res) => {
    return res.status(200).cookie("token", "", { maxAge: 0 })
        .json(new ApiResponse(200, {}, "User logged out"));
})


export const getProfile = asyncHandler(async (req, res) => {
    const id = req.id;

    const user = await User.findById(id).populate("enrolledCourses");

    if (!user) {
        if (!user) {
            throw new ApiError(404, "Profile not found");
        }
    }

    return res.status(200).json(new ApiResponse(new ApiResponse(200, user, "Profile fetched")))
})

export const updateProfile = asyncHandler(async (req, res) => {
    const userId = req.id;
    const { name } = req.body;
    const avatarPath = req.file?.path;

    if (!avatarPath) {
        throw new ApiError(400, "Avatar image file is missing")
    }

    const user = await User.findById(userId);

    if (!user) {
        if (!user) {
            throw new ApiError(404, "User not found");
        }
    }


    if (user.avatar) {
        const publicId = user.avatar.split("/").pop().split(".")[0]; // extract public id
        deleteMediaFromCloudinary(publicId);
    }

    const avatarImage = await uploadOnCloudinary(avatarPath);

    if (!avatarImage.secure_url) {
        throw new ApiError(400, "Error while uploading on avatar")
    }

    const updatedData = { name, photoUrl };
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true })

    return res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated successfully."))
})