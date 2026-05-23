// routes/commentRoutes.js

import express from "express";

import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  getCommentsByProduct,
  getPinnedComments,
  updateCommentStatus,
} from "../controllers/commentController.js";

const router = express.Router();

router.get("/", getAllComments);

router.get(
  "/pinned",
  getPinnedComments,
);

router.get(
  "/product/:productId",
  getCommentsByProduct,
);

router.get("/:id", getCommentById);

router.post("/", createComment);

router.put(
  "/:id/status",
  updateCommentStatus,
);

router.delete("/:id", deleteComment);

export default router;