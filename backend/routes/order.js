import express from "express";
import {
  getOrCreateOrder,
  addItem,
  updateQty,
  removeItem,
  confirmOrder,
  updateItemStatus,
  payOrder,
  getActiveOrders,
} from "../controllers/orderController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, getOrCreateOrder);
router.get("/", verifyToken, getActiveOrders);

router.post("/:orderId/item", verifyToken, addItem);
router.put("/:orderId/item/:itemId", verifyToken, updateQty);
router.delete("/:orderId/item/:itemId", verifyToken, removeItem);

router.put("/:orderId/confirm", verifyToken, confirmOrder);
router.put("/:orderId/item/:itemId/status", verifyToken, updateItemStatus);
router.put("/:orderId/pay", verifyToken, payOrder);

export default router;