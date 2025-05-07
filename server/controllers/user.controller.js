import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";




export const register = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

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

    if (!username && !email) {
        throw new ApiError(400, "Username or email is required");
    }

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

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
                "User logged in successfully"
            )
        );
})