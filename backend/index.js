import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/mongodb.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/UserRoutes.js";
import cors from "cors";
import shopRouter from "./routes/ShopRoutes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
connectDB();

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/api/v2/user", userRouter);
app.use("/api/v2/seller", shopRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}...`);
});
