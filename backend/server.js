import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config(); // 🔥 phải để lên trên

const app = express();

// middleware
app.use(express.json());

// 🔥 CORS chuẩn
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// routes
app.use("/api/auth", authRoutes);

// 🔥 MongoDB từ env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// 🔥 port động
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server chạy ở port ${PORT}`);
});