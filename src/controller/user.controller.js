import { hashPassword } from "../utils/hash.js";
import userModel from "../models/user.model.js";
import { genToken , verifyToken} from "../utils/token.js";
import { comparePassword } from "../utils/hash.js";

/**
 * - sub-admin register controller
 * - POST /api/auth/register
 */
export  const createUser = async (req, res) => {
    try {
        const {adminId,password ,isLoggedIn} = req.body;
        if(!adminId || !password ){
            return res.status(400).json({
                message :" All fields are required",
                success:false
            })
        }
        if (req.body.role){
            return res.status(400).json({
                message:"Role cannot be assighed",
                success:false

            })
        }
        const isUserExist = await userModel.findOne({adminId});
        if(isUserExist){
            return res.status(400).json({
                message :" User already exist",
                success:false
            })
        }
        const hashesPassword = await hashPassword(password);
        const user = await userModel.create({
            adminId,
            password:hashesPassword,
            role:"sub-admin",
            isLoggedIn:true
        });
        const token = await genToken({
            id:user._id,
            adminId:user.adminId,
            role:user.role
        });
        res.cookie("token", token, {
            httpOnly: true
        });
        return res.status(201).json({
            message:" User created successfully",
            success:true,
            user:{
                id:user._id,
                adminId:user.adminId,
                role:user.role
            }
        });

    } catch (error) {
        console.log("Error while creating user", error.message);
        return res.status(500).json({
            message:" Internal server error",
            success:false
        });
    }
}


/**
 * - user Login controller
 * - GET /api/auth/login
 */

export const loginUser = async (req, res) => {
    try {
        const {adminId, password}= req.body;
        if(!adminId || !password){
            return res.status(400).json({
                message :" All fields are required",
                success:false
            })
        }   
        const isUserExist = await userModel.findOne({adminId});
        if(!isUserExist){
            return res.status(400).json({
                message :" User not exist",
                success:false
            })
        }
        const isPasswordMatch = await comparePassword(password, isUserExist.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message :" Invalid credentials",
                success:false
            })
        }
        const token = await genToken({
            id:isUserExist._id,
            adminId:isUserExist.adminId,
            role:isUserExist.role
        });
        const updatedUser = await userModel.findByIdAndUpdate(isUserExist._id, {isLoggedIn:true}, { returnDocument: 'after' });
        res.cookie("token", token, {
            httpOnly: true
        });
        return res.status(200).json({
            message:" User logged in successfully",
            success:true,
            user:{
                id:isUserExist._id,
                adminId:isUserExist.adminId,
                role:isUserExist.role
            }
        });
    } catch (error) {
        console.log("Error while logging in user", error.message);
        return res.status(500).json({
            message:" Internal server error",
            success:false
        });
    }
}

/**
 * - user register controller
 * - GET /api/auth/logout
 */

export const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                message :" User not logged in",
                success:false
            })
        }
        const user = await verifyToken(token);
        if(!user){
            return res.status(400).json({
                message :" Invalid token",
                success:false
            })
        }
        const isUserExist = await userModel.findById(user.id);
        if(!isUserExist){
            return res.status(400).json({
                message :" User not found",
                success:false
            })
        }
        const updatedUser = await userModel.findByIdAndUpdate(user.id, {isLoggedIn:false}, { returnDocument: 'after' }); 

        res.clearCookie("token");
        return res.status(200).json({
            message:" User logged out successfully",
            success:true,
        }); 
    } catch (error) {
        console.log("Error while logging out user", error.message);
        return res.status(500).json({
            message:" Internal server error",
            success:false
        });
    }
}


/**
 * - get all users controller
 * - GET /api/auth/logout
 */

export const getAllUsers = async (req , res) => {
    try {
        const result = await userModel.find()
        return res.status(200).json({
            message:"All sub-Admins has been fetched ",
            success:true,
            result
        })
        
    } catch (error) {
        console.log("Error while getting all user", error.message);
        return res.status(500).json({
            message:" Internal server error",
            success:false
        });
    }
}


/**
 * - admin register controller
 * - POST /api/auth/register/admin
 */

export const registerAdmin = async (req , res) => {
    try {
        const {adminId,password,role}=req.body;
        if(req.body.role!=="admin"){
            return res.status(403).json({
                message:"Access denied"
            })
        }
        if(!adminId || !password){
            return res.status(400).json({
                message :" All fields are required",
                success:false
            })
        }

        const existingUser = await userModel.findOne({adminId});
        if(existingUser){
            return res.status(400).json({
                message:"User already exist"
            })
        }
        const hashesPassword = await hashPassword(password);
        const user = await userModel.create({
            adminId,
            password:hashesPassword,
            role:role || "sub-admin"
        })
        
        return res.status(201).json({
            message:"User created successfully ",
            user:{
                id:user._id,
                adminId:user.adminId,
                role:user.role,
            }
        })        
    } catch (error) {
        console.log("Error while creating admin", error.message);
        return res.status(500).json({
            message:" Internal server error",
            success:false
        });
    }
}