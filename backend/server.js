import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import sellerRouter from "./routes/seller.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1800;

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/api", (req, res) => {
  console.log("API is working");
  res.json({
    message: "API is working",
  });
});

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
