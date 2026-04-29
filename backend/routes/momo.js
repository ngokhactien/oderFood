import express from "express";
import { createPayment, handleIPN } from "../controllers/momoController.js";

const router = express.Router();

router.post("/create", createPayment);
router.post("/ipn", handleIPN);

export default router;