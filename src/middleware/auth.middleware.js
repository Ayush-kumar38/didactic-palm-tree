import { verifyToken } from "../utils/token.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("error at authUser middleware  ", error.message);
    return res.status(401).json({
      message: "you are not authorized ",
      success: false,
    });
  }
};
