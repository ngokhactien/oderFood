import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth.js";

const app = express();

// cho phép nhận JSON từ frontend
app.use(express.json());

// cho phép React gọi API
app.use(cors());

// gắn route
app.use("/api/auth", authRoutes);

// kết nối MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/order-food")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// chạy server
app.listen(5000, () => {
  console.log("Server chạy ở http://localhost:5000");
});