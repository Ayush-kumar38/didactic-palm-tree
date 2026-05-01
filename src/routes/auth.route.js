import { Router } from "express";

import {
  createUser,
  getAllUsers,
  loginUser,
  logoutUser,
  registerAdmin,
} from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const authRoute = Router();

// Public Routes
authRoute.post("/register", createUser);
authRoute.get("/login", loginUser);
authRoute.get("/logout", logoutUser);

// Admin only Routes
authRoute.get("/all-sub-admins",protect, getAllUsers);
authRoute.post("/register/admin",protect, registerAdmin);

export default authRoute;
