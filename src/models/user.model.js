import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    adminId:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    role:{
        type:String,
        enum:['admin','sub-admin'],
        default:'sub-admin',
    },  
    isLoggedIn:{
        type:Boolean,
        default:false,  
    }
},{
    timestamps:true 
});         

const userModel = mongoose.model("User", userSchema);

export default userModel;