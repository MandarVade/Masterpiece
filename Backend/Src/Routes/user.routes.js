import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshaccesstoken } from "../Controllers/user.controllers.js";
import { upload } from "../Middlewares/multer.middleware.js";
import { verifyJwt } from "../Middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post(
    upload.fields(
        [
            {
                name: "avatar",
                maxCount: 1
            },
            {
                name: "coverImage",
                maxCount: 1
            },
        ]
    )
    , registerUser)

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt, logoutUser)
router.route("/refreshtoken").post(refreshaccesstoken)

export default router