import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// =========================
// ROUTES
// =========================

// auth
import authRoutes from "./routes/auth.js";

// product
import productRoutes from "./routes/product.js";

// floor
import floorRoutes from "./routes/floor.js";

// order
import orderRoutes from "./routes/order.js";

// momo
import momoRoutes from "./routes/momo.js";

// cart
import cartRoutes from "./routes/carts.js";

// checkout
import checkoutRoutes from "./routes/checkout.js";

// comment
import commentRoutes from "./routes/comment.js";

// category client
import categoryRoutes from "./routes/category.js";

// reservation
import tableReservationRoutes from "./routes/Admin/tableReservation.js";

// =========================
// ADMIN ROUTES
// =========================

import adminUser from "./routes/admin/adminUser.js";

import adminProduct from "./routes/admin/adminProduct.js";

import adminCategory from "./routes/admin/adminCategory.js";

import adminCheckoutRoutes from "./routes/admin/order/adminCheckout.js";

import adminRevenueRoutes from "./routes/admin/revenue/adminRevenue.js";

// =========================
// CONFIG
// =========================

dotenv.config();

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,

    credentials: true,
  }),
);

// =========================
// TEST API
// =========================

app.get("/", (req, res) => {
  res.send("API running...");
});

// =========================
// CLIENT ROUTES
// =========================

// auth
app.use("/api/auth", authRoutes);

// products
app.use("/api/products", productRoutes);

// floors
app.use("/api/floors", floorRoutes);

// orders
app.use("/api/orders", orderRoutes);

// momo payment
app.use("/api/momo", momoRoutes);

// cart
app.use("/api/cart", cartRoutes);

// categories client
app.use("/api/categories", categoryRoutes);

// checkout
app.use("/api/checkout", checkoutRoutes);

// reservations
app.use("/api/reservations", tableReservationRoutes);

// comments
app.use("/api/comments", commentRoutes);

// =========================
// ADMIN ROUTES
// =========================

// users
app.use("/api/admin/users", adminUser);

// products
app.use("/api/admin/products", adminProduct);

// categories
app.use("/api/admin/categories", adminCategory);

// checkout
app.use("/api/admin/checkout", adminCheckoutRoutes);

// revenue
app.use("/api/admin/revenue", adminRevenueRoutes);

// =========================
// MONGODB
// =========================

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {
    console.log("MongoDB connected");
  })

  .catch((err) => {
    console.log("MongoDB error:", err.message);
  });

// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
