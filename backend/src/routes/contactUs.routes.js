import { Router } from "express";


const router=Router();


import { upload } from "../middlewares/multer.middleware.js";
import { registerRequest } from "../controllers/contactUs.controller.js";

router.route("/contact-us").post(upload.none(),registerRequest)


export default router