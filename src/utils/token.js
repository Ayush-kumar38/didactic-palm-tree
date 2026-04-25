import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const genToken = async (data) =>{
    return jwt.sign(data, env.JWT_SECRET, { expiresIn: "1d" });
}

export const verifyToken = async (data) => {
    return jwt.verify(data, env.JWT_SECRET);
}