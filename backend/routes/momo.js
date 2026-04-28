import express from "express";
import { createPayment, handleIPN } from "../controllers/momo.js";

const router = express.Router();

router.post("/create", createPayment);
router.post("/ipn", handleIPN);

export default router;