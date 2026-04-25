import imageModel from "../models/image.model.js";
import uploadFile from "../services/service.storage.js";
import { verifyToken } from "../utils/token.js";
/**
 * - user Image controller
 * - POST /api/image/uploadImage
 */

export const uploadImage = async (req,res) => {
    try {
        // const token = req.cookies.token;
        // if(!token){
        //     return res.status(401).json({
        //         message:"Unauthorized",
        //         success:false
        //     })
        // }
        // const decoded = await verifyToken(token);

        const file = req.file;
        const result = await uploadFile(file.buffer.toString("base64"));
        const image = await imageModel.create({
            url:result.url,
            subAdmin:req.user.id

        });
        return res.status(200).json({
            message:"image has been uploaded",
            success:true,
            image:{
                id:image._id,
                url:image.url,
                subAdmin:image.subAdmin
            }
        });
    } catch (error) {
        console.log("error while uploading image", error.message);
        return res.status(500).json({
            message:"server error ",
            success:false
        })
    }
}