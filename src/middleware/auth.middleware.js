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

export const protect = async (req,res,next) =>{
  try {
    const token = req.cookies.token;
    if(!token){
      return res.status(401).json({
        message:"Not authorized",
        success:false,
      });
    }
    const decoded = await verifyToken(token);
    if (decoded.role !=="admin") {
      return res.status(403).json({
        message: "you do not have access",
        success: false,
      });
    }
    req.user = decoded;
    next();
    
  } catch (error) {
    console.log("error at protect middleware  ", error.message);
    return res.status(401).json({
      message: "you are not authorized ",
      success: false,
    });
  }
};


export const roleMiddleware = async (req,res,next) =>{
  try {
    const token = req.cookies.token;
    if(!token){
      return res.status(401).json({
        message:"Not authorized",
        success:false,
      });
    }
    const decoded = await verifyToken(token);
    if (decoded.role !=="sub-admin") {
      return res.status(403).json({
        message: "you do not have access",
        success: false,
      });
    }
    req.user = decoded;
    next();
    
  } catch (error) {
    console.log("error at role middleware  ", error.message);
    return res.status(401).json({
      message: "you are not authorized ",
      success: false,
    });
  }
};
