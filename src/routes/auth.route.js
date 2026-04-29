import { Router } from "express";

import {
  createUser,
  getAllUsers,
  loginUser,
  logoutUser,
} from "../controller/user.controller.js";

const authRoute = Router();

authRoute.post("/register", createUser);
authRoute.get("/login", loginUser);
authRoute.get("/logout", logoutUser);
authRoute.get("/all-sub-admins", getAllUsers);

export default authRoute;
