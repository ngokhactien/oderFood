import express from "express";

import upload from "../../middleware/upload.js";

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../../controllers/admin/adminProductController.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(
    upload.array("images", 10),
    createProduct,
  );

router
  .route("/:id")
  .get(getProduct)
  .put(
    upload.array("images", 10),
    updateProduct,
  )
  .delete(deleteProduct);

export default router;