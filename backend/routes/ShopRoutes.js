import express from "express";
import upload from "../config/multer.js";
import {
  activateSeller,
  createShop,
  loadSeller,
  loginSeller,
  logoutSeller,
} from "../controller/ShopController.js";
import { isSeller } from "../middleware/auth.js";

const shopRouter = express.Router();

shopRouter.post("/create-seller", upload.single("file"), createShop);
shopRouter.post("/seller-account/activation", activateSeller);
shopRouter.post("/login-seller", loginSeller);

shopRouter.get("/getSeller", isSeller, loadSeller);
shopRouter.get("/logout-seller", logoutSeller);

export default shopRouter;
