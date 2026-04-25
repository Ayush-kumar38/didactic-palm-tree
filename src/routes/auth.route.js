import { Router } from "express";

import { createUser, loginUser, logoutUser } from "../controller/user.controller.js";

const authRoute = Router();

authRoute.post("/register", createUser);
authRoute.get("/login",loginUser);
authRoute.get("/logout",logoutUser)



export default authRoute;
