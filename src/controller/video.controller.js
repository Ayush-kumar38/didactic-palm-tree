import videoModel from "../models/video.model.js";
import uploadFile from "../services/service.storage.js";

/**
 * - sub-admin register controller
 * - POST /api/auth/register
 */
export const uploadVideo = async (req,res) => {
    try {
        // const {url} = req.body;
        const file = req.file;
        console.log(file);

        const result = await uploadFile(file.buffer.toString("base64"));
        const video = await videoModel.create({
            url:result.url
        });
        return res.status(201).json({
            message:"video uploaded successfully",
            success:true,
            video:{
                id:video._id,
                url:video.url
            }
        })
    } catch (error) {
        console.log("Error while uploading video", error.message);
        return res.status(500).json({
            message:" Internal server error",
            success:false
        });
    }
}