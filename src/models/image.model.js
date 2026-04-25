import mongoose from "mongoose";
const imageSchema = new mongoose.Schema({
  url:{
    type:String,
    required:true,

  },
  subAdmin:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  } 
});

const imageModel = mongoose.model("Image",imageSchema);
export default imageModel;
