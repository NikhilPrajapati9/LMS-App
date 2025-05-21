import { Router } from "express";
import { login, register, updateProfile } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { userRegisterValidator, userLoginValidator } from "../validator/user.validators.js"
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router()


router.route("/register").post(userRegisterValidator(), validate, register);
router.route("/login").post(userLoginValidator(), validate, login);
router.route("/edit-profile").post(upload.single("avatar"), updateProfile);




export default router