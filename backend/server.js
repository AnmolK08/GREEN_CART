import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import sellerRouter from "./routes/seller.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import addressRouter from "./routes/address.routes.js";
import orderRouter from "./routes/order.routes.js";
import connectCloudinary from "./config/cloudinary.js";
import { stripWebhooks } from "./controllers/order.controller.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1800;

const allowedOrigins = ["http://localhost:5173"];

app.post('/stripe' , express.raw({type: 'application/json'}) , stripWebhooks)

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
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

connectCloudinary();
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
