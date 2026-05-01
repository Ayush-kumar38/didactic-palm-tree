// import videoModel from "../models/video.model.js";
import {Router} from "express";
import { roleMiddleware } from "../middleware/auth.middleware.js";
import upload from "../services/multer.js";
import { uploadVideo } from "../controller/video.controller.js";
const videoRoute = Router();


videoRoute.post("/upload", roleMiddleware, upload.single("video"),uploadVideo);


export default videoRoute;