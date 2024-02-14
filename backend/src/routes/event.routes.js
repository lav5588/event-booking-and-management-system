import { Router } from "express"; 
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router=Router()

import { getEvent, getEventById, registerEvent } from "../controllers/event.controller.js";

router.route("/register").post(verifyJWT,upload.array('files'),registerEvent)
router.route("/get-events").get(getEvent)
router.route("/:eventid").get(getEventById)


export default router