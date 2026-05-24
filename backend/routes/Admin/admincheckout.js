// routes/admin/checkoutRoutes.js

import express from "express";

import {
  createOrder,
  getMyOrders,
  getOrderDetail,
  cancelOrder,
} from "../../controllers/admin/checkoutController.js";

import{ verifyToken } from "../../middleware/auth.js";
const router = express.Router();

// =========================
// CREATE ORDER
// =========================
router.post(
  "/",
  verifyToken,
  createOrder
);

// =========================
// MY ORDERS
// =========================
router.get(
  "/my-orders",
  verifyToken,
  getMyOrders
);

// =========================
// ORDER DETAIL
// =========================
router.get(
  "/my-orders/:id",
  verifyToken,
  getOrderDetail
);

// =========================
// CANCEL ORDER
// =========================
router.put(
  "/cancel/:id",
  verifyToken,
  cancelOrder
);

export default router;