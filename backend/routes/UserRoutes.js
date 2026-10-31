import express from "express";
import upload from "../config/multer.js";
import {
  activateUser,
  createUser,
  loginUser,
} from "../controller/UserController.js";

const userRouter = express.Router();

userRouter.post("/create-user", upload.single("file"), createUser);
userRouter.post("/activation", activateUser);
userRouter.post("/login-user", loginUser);

export default userRouter;
