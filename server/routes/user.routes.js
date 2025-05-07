import { Router } from "express";
import { login, register } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { userRegisterValidator, userLoginValidator } from "../validator/user.validators.js"

const router = Router()


router.route("/register").post(userRegisterValidator(), validate, register);
router.route("/login").post(userLoginValidator(), validate, login);




export default router