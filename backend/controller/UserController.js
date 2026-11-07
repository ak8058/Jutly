import cloudinary from "../config/cloudinary.js";
import { sendToken } from "../config/jwtToken.js";
import transporter from "../config/nodemailer.js";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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
      return res.status(409).json({
        success: false,
        message: "This activation link was already used. Please sign in.",
      });
    }

    try {
      Userr = await User.create({ fullName, email, password, avatar });
    } catch (error) {
      // A second activation request can race past findOne. The unique email
      // index rejects the duplicate; return the existing account as success.
      if (error.code !== 11000) throw error;
      return res.status(409).json({
        success: false,
        message: "This activation link was already used. Please sign in.",
      });
    }

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
    const { email, password, rememberMe = false } = req.body;
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
    sendToken(user, 201, res, rememberMe === true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function forgotPassword(req, res) {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const response = { success: true, message: "If an account exists for that email, a reset link has been sent." };
    if (!email) return res.status(400).json({ success: false, message: "Please provide your email address." });
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json(response);

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
    user.resetPasswordTime = Date.now() + 15 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
    try {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "Reset your Jutly password",
        html: `<p>Use this link to reset your password. It expires in 15 minutes.</p><a href="${process.env.FRONTEND_URL}/reset-password/${token}">Reset password</a>`,
      });
    } catch (mailError) {
      user.resetPasswordToken = undefined;
      user.resetPasswordTime = undefined;
      await user.save({ validateBeforeSave: false });
      throw mailError;
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ success: false, message: "Unable to send a reset email right now." });
  }
}

export async function resetPassword(req, res) {
  try {
    const password = req.body.password;
    if (!password || password.length < 4) return res.status(400).json({ success: false, message: "Password must be at least 4 characters long." });
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({ resetPasswordToken: hashedToken, resetPasswordTime: { $gt: Date.now() } }).select("+password");
    if (!user) return res.status(400).json({ success: false, message: "This reset link is invalid or expired." });
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;
    await user.save();
    return res.status(200).json({ success: true, message: "Password reset successfully. You can sign in." });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ success: false, message: "Unable to reset password right now." });
  }
}

export async function logoutUser(req, res) {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({ success: true, message: "Logout Successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function loadUser(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateUser(req, res) {
  try {
    const { fullName, email, password, phoneNumber } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist!" });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    user.fullName = fullName;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}

export async function updateUserPassword(req, res) {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(oldPassword);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Old Password is incorrect!",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password doesn' t match with each other!",
      });
    }
    user.password = newPassword;
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "Password Updated Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function updateAvatar(req, res) {
  try {
    const existUser = await User.findById(req.user.id);
    const oldPublicId = existUser?.avatar?.public_id;
    if (oldPublicId) {
      await cloudinary.uploader.destroy(`jutly_uploads/${oldPublicId}`);
    }
    const newPublicId = req.file.filename.split(".")[0];
    const newUrl = req.file.path;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        avatar: {
          public_id: newPublicId,
          url: newUrl,
        },
      },
      { returnDocument: "after" },
    );
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function updateAddresses(req, res) {
  try {
    const { addressType, country, city, address1, address2, zipCode } =
      req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const sameTypeAddress = user.addresses.find(
      (address) => address.addressType === addressType,
    );
    if (sameTypeAddress) {
      return res.status(409).json({
        success: false,
        message: `${addressType} address already exists!`,
      });
    }
    const addressData = {
      addressType,
      country,
      city,
      address1,
      address2,
      zipCode,
    };

    const existsAddress = user.addresses.find(
      (address) => address._id === req.body._id,
    );
    if (existsAddress) {
      Object.assign(existsAddress, addressData);
    } else {
      user.addresses.push(addressData);
    }
    await user.save();
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}

export async function deleteUserAddress(req, res) {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;
    await User.updateOne(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } },
    );
    const user = await User.findById(userId);
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}
