import express from "express";
import upload from "../config/multer.js";
import {
  activateUser,
  createUser,
  deleteUserAddress,
  forgotPassword,
  loadUser,
  loginUser,
  logoutUser,
  resetPassword,
  updateAddresses,
  updateAvatar,
  updateUser,
  updateUserPassword,
} from "../controller/UserController.js";
import { isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/create-user", upload.single("file"), createUser);
userRouter.post("/activation", activateUser);

userRouter.post("/login-user", loginUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.put("/reset-password/:token", resetPassword);
userRouter.get("/logout-user", isAuthenticated, logoutUser);

userRouter.get("/get-user", isAuthenticated, loadUser);
userRouter.put("/update-user-info", isAuthenticated, updateUser);
userRouter.put("/update-user-password", isAuthenticated, updateUserPassword);
userRouter.put(
  "/update-user-avatar",
  isAuthenticated,
  upload.single("file"),
  updateAvatar,
);

userRouter.put("/update-user-addresses", isAuthenticated, updateAddresses);
userRouter.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  deleteUserAddress,
);

export default userRouter;
