import express from "express";
import {
  createFloor,
  getFloors,
  deleteFloor,
  updateFloor,
  updateTableStatus,
} from "../controllers/floorController.js";

const router = express.Router();

router.post("/", createFloor);
router.get("/", getFloors);
router.delete("/:floorId", deleteFloor);
router.put("/:floorId", updateFloor);

// table
router.put("/table/:tableId/status", updateTableStatus);

export default router;