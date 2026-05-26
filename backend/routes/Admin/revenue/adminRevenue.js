import express from "express";
import { getRevenue } from "../../../controllers/admin/revenue/adminRevenueController.js";

const router = express.Router();

router.get("/", getRevenue);

export default router;
