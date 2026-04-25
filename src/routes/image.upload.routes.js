import { Router } from "express";
import { uploadImage } from "../controller/image.controller.js";
import upload from "../services/multer.js";
import { authUser } from "../middleware/auth.middleware.js";
const imageRouter = Router();

imageRouter.post("/upload",authUser,upload.single("image"),uploadImage)

export default imageRouter; 