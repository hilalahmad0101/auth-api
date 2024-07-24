import { registerUser, emailVerification, loginUser, getUser, changePassword, forgetPassword, forgetPasswordVerification, forgetChangePassword, updateProfile } from "../controllers/user/user.controller.js"
import { userMiddleware } from "../middlewares/user.middleware.js";
import { changePasswordValidator, createUserValidator, forgetChangePasswordValidator, forgetPasswordValidator, forgetPasswordVerificationValidator, loginUserValidator, updateUserValidator } from "../validator/user.validator.js";

export default (app) => {
    let api_base_url = "/api/user";

    app.post(`${api_base_url}/register`, createUserValidator, registerUser);
    app.post(`${api_base_url}/email/verification`, emailVerification);
    app.post(`${api_base_url}/login`, loginUserValidator, loginUser);
    app.get(`${api_base_url}`, userMiddleware, getUser);
    app.post(`${api_base_url}/change/password`, userMiddleware, changePasswordValidator, changePassword);
    app.post(`${api_base_url}/forget/password`, forgetPasswordValidator, forgetPassword);
    app.post(`${api_base_url}/forget/password/verification`, forgetPasswordVerificationValidator, forgetPasswordVerification);
    app.post(`${api_base_url}/forget/change/password`, forgetChangePasswordValidator, forgetChangePassword);
    app.post(`${api_base_url}/update/profile`, userMiddleware, updateUserValidator, updateProfile);

}