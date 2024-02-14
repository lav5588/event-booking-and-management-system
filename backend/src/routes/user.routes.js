import { Router } from "express";
import {
    changeCurrentPassword,
    getcurrentUser,
    knowUserBetterSignUp,
    logOutUser,
    loginUser,
     refreshAccessToken,
     registerUser,
     updateAccountDetails,
     verifyEmail
    }
     from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router=Router()



router.route("/register").post(upload.none(),registerUser)
router.route("/register/verify-email").post(upload.none(),verifyEmail);
router.route("/login").post(upload.none(),loginUser)
router.route("/logout").get(verifyJWT,logOutUser)
router.route("/refresh-token").post(verifyJWT,refreshAccessToken)
router.route("/change-password").post(upload.none(),verifyJWT,changeCurrentPassword);
router.route("/current-user").get(verifyJWT,getcurrentUser);
router.route("/update-account").post(upload.none(),verifyJWT,updateAccountDetails)
router.route("/know-user-better-signup").post(upload.none(),verifyJWT,knowUserBetterSignUp)

export default router