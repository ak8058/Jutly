import cloudinary from "../config/cloudinary.js";
import { sendToken } from "../config/jwtToken.js";
import transporter from "../config/nodemailer.js";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

function createActivationToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "5m" });
}

export async function createUser(req, res) {
  try {
    const { fullName, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      if (req.file?.filename) {
        const publicId = req.file.filename.split(".")[0];
        await cloudinary.uploader.destroy(`jutly_uploads/${publicId}`);
      }
      return res.status(400).json({ message: "User already exists" });
    }

    if (!req.file?.path || !req.file?.filename) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload an avatar!" });
    }

    const user = {
      fullName,
      email,
      password,
      avatar: {
        public_id: req.file.filename.split(".")[0],
        url: req.file.path,
      },
    };
    const activationToken = createActivationToken(user);
    const activationUrl = `${process.env.FRONTEND_URL}/activation/${activationToken}`;
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Account Activation",
      html: `<p>Hi ${fullName},</p>
             <p>Thank you for registering. Please click the link below to activate your account:</p>
             <a href="${activationUrl}">Activate Account</a>`,
    };
    await transporter.sendMail(mailOptions);
    res.status(201).json({
      success: true,
      message: `Please check your email:-  ${user.email} to activate your account!`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function activateUser(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Activation token is required",
      });
    }

    let user;

    try {
      user = jwt.verify(url, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "Activation token has expired",
        });
      }

      if (error.name === "JsonWebTokenError") {
        return res.status(400).json({
          success: false,
          message: "Invalid activation token",
        });
      }

      throw error;
    }

    const { fullName, email, password, avatar } = user;

    let Userr = await User.findOne({ email });

    if (Userr) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    Userr = await User.create({
      fullName,
      email,
      password,
      avatar,
    });

    return sendToken(Userr, 201, res);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "User doesn't exist!" });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    sendToken(user, 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
