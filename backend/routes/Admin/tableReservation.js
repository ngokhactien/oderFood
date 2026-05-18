import express from "express";

import {
  create,
  getAll,
  updateStatus,
  getTodayReservations,
} from "../../controllers/admin/tableReservationController.js";

import reservationValidation from "../../middleware/reservationValidation.js";

const router =
  express.Router();

// CREATE
router.post(
  "/",
  reservationValidation,
  create,
);

// GET ALL
router.get("/", getAll);

// GET TODAY
router.get(
  "/today",
  getTodayReservations,
);

// UPDATE STATUS
router.patch(
  "/:id",
  updateStatus,
);

export default router;