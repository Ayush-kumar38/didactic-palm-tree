import express from "express";
import cookieparser from "cookie-parser";

import connectDB from "./src/config/db.js";
import env from "./src/config/env.js";
import authRoute from "./src/routes/auth.route.js";
import imageRouter from "./src/routes/image.upload.routes.js";


const app = express();
app.use(express.json());
app.use(cookieparser());

app.use("/api/auth",authRoute);
app.use("/api/image",imageRouter);

app.get("/", async (req, res) => {
  try {
    return res.status(200).json({
      message: "Server started / Auth Route",
      success: true,
    });
  } catch (error) {
    console.log("error \t" + error.message);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
});



app.listen(env.PORT,()=>{
    connectDB();
    console.log(`server is running at http://localhost:${env.PORT}`)
})

