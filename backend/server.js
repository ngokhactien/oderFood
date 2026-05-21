import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import momoRoutes from "./routes/momo.js";
import floorRoutes from "./routes/floor.js";
import orderRoutes from "./routes/order.js";
import commentRoutes from "./routes/comment.js";
import categoryRoutes from "./routes/category.js";
import tableReservationRoutes from "./routes/Admin/tableReservation.js";
import adminUserRoutes from "./routes/admin/adminUserRoutes.js";
import adminProductRoutes from "./routes/admin/adminProductRoutes.js";
import adminCategoryRoutes from "./routes/admin/adminCategoryRoutes.js";
dotenv.config(); // 🔥 phải để lên trên

const app = express();

// middleware
app.use(express.json());

// 🔥 CORS chuẩn
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use("/api/floors", floorRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/momo", momoRoutes);

// CATEGORY HIỂN THỊ CHO CLIENT
app.use("/api/categories", categoryRoutes);

// dùng để xem user đặt bàn
app.use("/api/reservations", tableReservationRoutes);

app.use("/api/comments", commentRoutes);

//admin user
app.use(
  "/api/admin/users",
  adminUserRoutes,
);

// admin products
app.use(
  "/api/admin/products",
  adminProductRoutes,
);

// admin mục lục
app.use("/api/categories", adminCategoryRoutes);

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
