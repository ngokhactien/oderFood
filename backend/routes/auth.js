import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  addAddress,
  deleteAddress,
  updateAddress,
  changePassword,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// AUTH
router.post("/register", register);
router.post("/login", login);
router.post("/forgot", forgotPassword);
router.post("/reset-password", resetPassword);

// ADDRESS
router.post("/address", verifyToken, addAddress);
router.delete("/address/:id", verifyToken, deleteAddress);
router.put("/address/:id", verifyToken, updateAddress);

// pass
router.post("/change-password", verifyToken, changePassword);

export default router;
