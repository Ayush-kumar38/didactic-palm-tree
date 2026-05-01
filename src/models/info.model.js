import mongoose from "mongoose";

const infoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        trim:true,
        lowercase:true,
    },
    phoneNo:{
        type:String,
        unique:true,
        required:true,
        match: [/^\+?[1-9]\d{9,14}$/, "Invalid phone number"]
    }
});

const infoModel = mongoose.model("info",infoSchema);
export default infoModel;
