import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true,
    }
},{
    timestamps:true
});

const videoModel = mongoose.model("Video", videoSchema);
export default videoModel;
