import { Router } from "express";

const router=Router();

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addTicket, deleteTicket } from "../controllers/booking.controller.js";

router.route("/addTicket").post(verifyJWT,addTicket);
router.route("/deleteTicket").post(verifyJWT,upload.none(),deleteTicket);

export default router