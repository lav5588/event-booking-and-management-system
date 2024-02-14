import { Router } from "express";

const router=Router();

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addAndRemoveFavorite } from "../controllers/favoriteEvents.controller.js";

router.route("/handlefavorite").post(verifyJWT,upload.none(),addAndRemoveFavorite);

export default router