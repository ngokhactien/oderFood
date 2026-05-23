// routes/cartRoutes.js

import express from "express";

import {
  addToCart,
  getCart,
  updateCartQuantity,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

// =========================
// GET USER CART
// =========================
router.get("/", verifyToken, getCart);

// =========================
// ADD TO CART
// =========================
router.post("/", verifyToken, addToCart);

// =========================
// UPDATE QUANTITY
// =========================
router.put("/", verifyToken, updateCartQuantity);

// =========================
// REMOVE ITEM
// =========================
router.delete("/", verifyToken, removeCartItem);

// =========================
// CLEAR CART
// =========================
router.delete("/clear", verifyToken, clearCart);

export default router;
