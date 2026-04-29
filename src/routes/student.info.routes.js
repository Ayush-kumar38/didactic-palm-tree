import { Router } from "express";
import { sendInfo } from "../controller/student.info.controller.js";
const infoRoute = Router();


infoRoute.post("/info",sendInfo);

export default infoRoute;