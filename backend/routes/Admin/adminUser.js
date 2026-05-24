// routes/admin/userRoutes.js

import express from "express";

import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../controllers/admin/adminUserController.js";

const router = express.Router();

// GET
router.get("/", getAllUsers);

// CREATE
router.post("/", createUser);

// UPDATE
router.put("/:id", updateUser);

// DELETE
router.delete("/:id", deleteUser);

export default router;