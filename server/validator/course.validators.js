import { body } from "express-validator"




const createCourseValidator = () => {
    return [
        body("courseTitle")
            .trim()
            .notEmpty().withMessage("CourseTitle is required")
            .isString(),
        body("category")
            .trim()
            .notEmpty().withMessage("CourseTitle is required")
            .isString()
    ]
} 