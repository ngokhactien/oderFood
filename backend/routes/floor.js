// routes/floorRoutes.js

import express from "express";

import {
  createFloor,
  getFloors,
  deleteFloor,
  updateFloor,

  // table
  updateTableStatus,
  addTable,
  deleteTable,
  updateTable,
} from "../controllers/floorController.js";

const router = express.Router();

// =========================
// FLOOR
// =========================

// tạo lầu
router.post("/", createFloor);

// lấy danh sách lầu
router.get("/", getFloors);

// cập nhật tên lầu
router.put("/:floorId", updateFloor);

// xoá lầu
router.delete("/:floorId", deleteFloor);

// =========================
// TABLE
// =========================

// thêm bàn vào lầu
router.post("/:floorId/table", addTable);

// cập nhật thông tin bàn
router.put("/table/:tableId", updateTable);

// cập nhật trạng thái bàn
router.put("/table/:tableId/status", updateTableStatus);

// xoá bàn
router.delete("/:floorId/table/:tableId", deleteTable);

export default router;
