// controllers/floorController.js

import Floor from "../models/Floor.js";

// =========================
// Helper tạo danh sách bàn
// =========================

const createTables = (count, start = 1, prefix = "Bàn") => {
  return Array.from({ length: count }, (_, i) => ({
    name: `${prefix} ${i + start}`,

    status: "empty",

    capacity: 2,
  }));
};

// =========================
// CREATE FLOOR
// =========================

export const createFloor = async (req, res) => {
  try {
    const {
      name,

      tableCount,

      startNumber,
    } = req.body;

    // validate
    if (!name || !tableCount) {
      return res.status(400).json("Thiếu dữ liệu");
    }

    // tạo danh sách bàn
    const tables = createTables(tableCount, startNumber || 1);

    // tạo floor mới
    const floor = await Floor.create({
      name,

      tables,
    });

    res.status(201).json(floor);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// =========================
// GET FLOORS
// =========================

export const getFloors = async (req, res) => {
  try {
    const floors = await Floor.find().sort({
      createdAt: 1,
    });

    res.json(floors);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// =========================
// DELETE FLOOR
// =========================

export const deleteFloor = async (req, res) => {
  try {
    const { floorId } = req.params;

    await Floor.findByIdAndDelete(floorId);

    res.json("Xoá lầu thành công");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// =========================
// UPDATE FLOOR NAME
// =========================

export const updateFloor = async (req, res) => {
  try {
    const { floorId } = req.params;

    const { name } = req.body;

    await Floor.findByIdAndUpdate(floorId, {
      name,
    });

    res.json("Cập nhật thành công");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// =========================
// UPDATE TABLE STATUS
// =========================

export const updateTableStatus = async (req, res) => {
  try {
    const { tableId } = req.params;

    const { status } = req.body;

    await Floor.updateOne(
      {
        "tables._id": tableId,
      },

      {
        $set: {
          "tables.$.status": status,
        },
      },
    );

    res.json("Đã cập nhật trạng thái bàn");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// =========================
// ADD TABLE
// =========================

export const addTable = async (req, res) => {
  try {
    const { floorId } = req.params;

    const {
      name,

      capacity = 2,
    } = req.body;

    await Floor.findByIdAndUpdate(
      floorId,

      {
        $push: {
          tables: {
            name,

            capacity,

            status: "empty",
          },
        },
      },
    );

    res.json("Thêm bàn thành công");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// =========================
// DELETE TABLE
// =========================

export const deleteTable = async (req, res) => {
  try {
    const { floorId, tableId } = req.params;

    await Floor.findByIdAndUpdate(
      floorId,

      {
        $pull: {
          tables: {
            _id: tableId,
          },
        },
      },
    );

    res.json("Xoá bàn thành công");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// =========================
// UPDATE TABLE
// =========================

export const updateTable = async (req, res) => {
  try {
    const { tableId } = req.params;

    const {
      name,

      capacity,
    } = req.body;

    await Floor.updateOne(
      {
        "tables._id": tableId,
      },

      {
        $set: {
          "tables.$.name": name,

          "tables.$.capacity": capacity,
        },
      },
    );

    res.json("Cập nhật bàn thành công");
  } catch (err) {
    res.status(500).json(err.message);
  }
};
