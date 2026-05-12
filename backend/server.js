import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import momoRoutes from "./routes/momo.js";
import floorRoutes from "./routes/floor.js";
import orderRoutes from "./routes/order.js";

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
app.use("/api/products", productRoutes);

app.use("/api/floors", floorRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/momo", momoRoutes);


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