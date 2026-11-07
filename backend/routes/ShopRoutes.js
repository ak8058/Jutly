import express from "express";
import upload from "../config/multer.js";
import {
  activateSeller,
  createShop,
  loginSeller,
} from "../controller/ShopController.js";

const shopRouter = express.Router();

shopRouter.post("/create-seller", upload.single("file"), createShop);
shopRouter.post("/seller-account/activation", activateSeller);
shopRouter.post("/login-seller", loginSeller);

export default shopRouter;
