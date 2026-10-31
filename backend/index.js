import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/mongodb.js";
import userRouter from "./routes/UserRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/api/v2/user", userRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}...`);
});
