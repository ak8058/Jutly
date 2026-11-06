import express from "express";
import upload from "../config/multer.js";
import {
  activateUser,
  createUser,
  deleteUserAddress,
  loadUser,
  loginUser,
  logoutUser,
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
