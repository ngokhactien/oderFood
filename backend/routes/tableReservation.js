import express from "express";

import TableReservation from "../models/TableReservation.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const reservation =
      await TableReservation.create(req.body);

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const reservations =
      await TableReservation.find().sort({
        createdAt: -1,
      });

    res.json(reservations);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;