import mongoose from "mongoose";
import env from "../config/env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URL);
    console.log("Database is connected successfully !!!!!");
  } catch (error) {
    console.log("error while connecting database", error.message);
  }
};

export default connectDB;

