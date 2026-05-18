import express from "express";

import {
  getShowCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

// CATEGORY SHOW CLIENT
router.get("/show", getShowCategories);

export default router;