import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();

import { createBlog, deleteBlog, updateBlog } from "../controllers/blogs.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

router.route("/create-blog").post(verifyJWT,upload.none(),createBlog)
router.route("/update-blog").patch(verifyJWT,upload.none(),updateBlog)
router.route("/delete-blog").post(verifyJWT,upload.none(),deleteBlog)

export default router