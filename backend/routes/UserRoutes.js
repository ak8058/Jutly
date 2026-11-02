import express from "express";
import upload from "../config/multer.js";
import {
  activateUser,
  createUser,
  loadUser,
  loginUser,
  logoutUser,
  updateUser,
} from "../controller/UserController.js";
import { isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/create-user", upload.single("file"), createUser);
userRouter.post("/activation", activateUser);
userRouter.post("/login-user", loginUser);
userRouter.get("/logout-user", isAuthenticated, logoutUser);
userRouter.get("/get-user", isAuthenticated, loadUser);
userRouter.put("/update-user-info", isAuthenticated, updateUser);

export default userRouter;
