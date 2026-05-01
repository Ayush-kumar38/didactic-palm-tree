import infoModel from "../models/info.model.js";

/**
 * - student info controller
 * - POST /api/student/info
 */
export const sendInfo = async (req, res) => {
  try {
    const { name, email, phoneNo } = req.body;
    if (!name || !email || !phoneNo) {
      return res.status(400).json({
        message: " All fields are required",
        success: false,
      });
    }
    // console.log(phoneNo.length);
    if (phoneNo.length > 10 || phoneNo.length < 10) {
      return res.status(400).json({
        message: "Invalid phone number ",
        success: false,
      });
    }
    const cleanPhone = phoneNo.replace(/\D/g, "");

    // 🔥 Validate phone
    if (!/^[1-9]\d{9,14}$/.test(cleanPhone)) {
      return res.status(400).json({
        message: "Invalid phone number",
        success: false,
      });
    }
    const isUserExist = await infoModel.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        message: " User already exist",
        success: false,
      });
    }
    const user = await infoModel.create({
      name,
      email,
      phoneNo:cleanPhone
    });

    return res.status(201).json({
      message: "info has been send",
      success: true,
      info: user,
    });
  } catch (error) {
    console.log("Error while sending student info", error.message);
    return res.status(500).json({
      message: " Internal server error",
      success: false,
    });
  }
};

/**
 * - student info controller
 * - DELETE /api/student/info
 */
// export const
