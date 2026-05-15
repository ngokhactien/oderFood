import express from "express";

import {
  create,
  getAll,
} from "../controllers/tableReservationController.js";

import reservationValidation from "../middlewares/reservationValidation.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  reservationValidation,
  create,
);

// GET LIST
router.get("/", getAll);

export default router;