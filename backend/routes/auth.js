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
  setDefaultAddress,
  updateProfile,
  uploadAvatar1,
  removeAvatar,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/auth.js";
import uploadAvatar from "../middleware/uploadAvatar.js";

const router = express.Router();

// AUTH
router.post("/register", register);
router.post("/login", login);
router.post("/forgot", forgotPassword);
router.post("/reset-password", resetPassword);
// update info
router.put("/profile", verifyToken, updateProfile);
// 🔥 upload avatar
router.post("/avatar", verifyToken, uploadAvatar.single("avatar"), uploadAvatar1);
router.put("/avatar", verifyToken, removeAvatar);

// ADDRESS
router.post("/address", verifyToken, addAddress);
router.delete("/address/:id", verifyToken, deleteAddress);
router.put("/address/:id", verifyToken, updateAddress);
router.put("/address/default/:id", verifyToken, setDefaultAddress);

// pass
router.post("/change-password", verifyToken, changePassword);

export default router;
