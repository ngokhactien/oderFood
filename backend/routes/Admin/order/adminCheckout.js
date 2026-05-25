import express from "express";

import {
  getAllOrders,
  getAdminOrderDetail,
  updateOrderStatus,
  cancelOrderAdmin,
} from "../../../controllers/admin/order/adminCheckoutController.js";
import { verifyToken } from "../../../middleware/auth.js";

const router = express.Router();

// =========================
// GET ALL
// =========================
router.get("/", verifyToken, getAllOrders);

// =========================
// DETAIL
// =========================
router.get("/:id", verifyToken, getAdminOrderDetail);

// =========================
// UPDATE STATUS
// =========================
router.put("/status/:id", verifyToken, updateOrderStatus);

// =========================
// CANCEL
// =========================
router.put("/cancel/:id", verifyToken, cancelOrderAdmin);

export default router;
