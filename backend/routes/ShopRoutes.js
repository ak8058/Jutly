import express from "express";
import upload from "../config/multer.js";
import {
  activateSeller,
  createShop,
  getShopInfo,
  loadSeller,
  loginSeller,
  logoutSeller,
  updateShopAvatar,
  updateShopProfile,
} from "../controller/ShopController.js";
import { isSeller } from "../middleware/auth.js";

const shopRouter = express.Router();

function uploadShopAvatar(req, res, next) {
  upload.single("file")(req, res, (error) => {
    if (error) {
      console.error("Shop avatar upload failed:", error);
      return res.status(400).json({
        success: false,
        message: error.message || "Avatar upload failed",
      });
    }
    next();
  });
}

shopRouter.post("/create-seller", upload.single("file"), createShop);
shopRouter.post("/seller-account/activation", activateSeller);
shopRouter.post("/login-seller", loginSeller);

shopRouter.get("/getSeller", isSeller, loadSeller);
shopRouter.get("/logout-seller", logoutSeller);
shopRouter.get("/get-shop-info/:id", getShopInfo);

shopRouter.put(
  "/update-shop-avatar",
  isSeller,
  uploadShopAvatar,
  updateShopAvatar,
);
shopRouter.put("/update-shop-profile", isSeller, updateShopProfile);

export default shopRouter;
