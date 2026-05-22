import express from "express";

import {
  createComment,
  getCommentsByProduct,
  deleteComment,
  getAllComments,
  getCommentById,
  updateCommentStatus,
} from "../controllers/commentController.js";

const router = express.Router();

/**
 * GET COMMENTS BY PRODUCT
 */
router.get("/product/:productId", getCommentsByProduct);

router.get("/", getAllComments);

/**
 * CREATE COMMENT
 */
router.post("/", createComment);

/**
 * get comment by id
 */
router.get("/:id", getCommentById);

router.put("/:id/status", updateCommentStatus);

/**
 * DELETE COMMENT
 */
router.delete("/:id", deleteComment);

export default router;