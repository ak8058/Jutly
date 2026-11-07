import Shop from "../models/ShopModel.js";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import cloudinary from "../config/cloudinary.js";
import { sendShopToken } from "../config/jwtToken.js";

export async function createShop(req, res) {
  try {
    const { name, phoneNumber, address, zipCode, email, password } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      if (req.file.filename) {
        const publicId = req.file.filename.split(".")[0];
        await cloudinary.uploader.destroy(`jutly_uploads/${publicId}`);
      }
      return res.status(400).json({ message: "User already exists!" });
    }

    if (!req.file?.path || !req.file?.filename) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload an avatar!" });
    }
    const seller = {
      name,
      phoneNumber,
      email,
      password,
      address,
      zipCode,
      avatar: {
        public_id: req.file.filename.split(".")[0],
        url: req.file.path,
      },
    };
    const activationToken = createActivationToken(seller);
    const activationUrl = `${process.env.FRONTEND_URL}/seller/activation/${activationToken}`;
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Seller Account Activation",
      html: `<p>Hi ${name} owner,</p>
                 <p>Thank you for registering the seller account. Please click the link below to activate your seller account:</p>
                 <a href="${activationUrl}">Activate Seller Account</a>`,
    };
    await transporter.sendMail(mailOptions);
    res.status(201).json({
      success: true,
      message: `Please check your shop email:-${seller.email} to activate your seller account!`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error" });
  }
}

function createActivationToken(seller) {
  return jwt.sign(seller, process.env.JWT_SECRET, { expiresIn: "5m" });
}

export async function activateSeller(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Activation token or URL is required",
      });
    }

    const token = url.includes("/") ? url.split("/").pop() : url;

    let sellerData;

    try {
      sellerData = jwt.verify(token, process.env.JWT_SECRET);
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

    const { name, email, password, avatar, zipCode, address, phoneNumber } =
      sellerData;

    let seller = await Shop.findOne({ email });

    if (seller) {
      return res.status(409).json({
        success: false,
        message: "This activation link was already used. Please sign in.",
      });
    }

    try {
      seller = await Shop.create({
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      });
    } catch (error) {
      if (error.code !== 11000) throw error;
      return res.status(409).json({
        success: false,
        message: "This activation link was already used. Please sign in.",
      });
    }

    return sendShopToken(seller, 201, res);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function loginSeller(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const seller = await Shop.findOne({ email }).select("+password");
    if (!seller) {
      return res
        .status(401)
        .json({ message: "This Seller account doesn't exist!" });
    }
    const isPasswordMatched = await seller.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    sendShopToken(seller, 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
