import express from "express";

import {
  createComment,
  getCommentsByProduct,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

/**
 * GET COMMENTS BY PRODUCT
 */
router.get("/:productId", getCommentsByProduct);

/**
 * CREATE COMMENT
 */
router.post("/", createComment);

/**
 * DELETE COMMENT
 */
router.delete("/:commentId", deleteComment);

export default router;