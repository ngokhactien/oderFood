import User from "../models/User.js";

// 🔥 helper
const createTables = (count, start = 1, prefix = "Bàn") => {
  return Array.from({ length: count }, (_, i) => ({
    name: `${prefix} ${i + start}`,
  }));
};

// ✅ CREATE FLOOR
export const createFloor = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, type = "normal", tableCount, startNumber } = req.body;

    if (!name || !tableCount) {
      return res.status(400).json("Thiếu dữ liệu");
    }

    const tables = createTables(tableCount, startNumber || 1);

    const newFloor = { name, type, tables };

    await User.findByIdAndUpdate(userId, {
      $push: { floors: newFloor },
    });

    res.json("Tạo lầu thành công");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ✅ GET FLOORS
export const getFloors = async (req, res) => {
  const user = await User.findById(req.user.id).select("floors");
  res.json(user.floors);
};

// ✅ DELETE FLOOR
export const deleteFloor = async (req, res) => {
  const { floorId } = req.params;

  await User.findByIdAndUpdate(req.user.id, {
    $pull: { floors: { _id: floorId } },
  });

  res.json("Xoá lầu thành công");
};

// ✅ UPDATE FLOOR NAME
export const updateFloor = async (req, res) => {
  const { floorId } = req.params;
  const { name } = req.body;

  await User.updateOne(
    { _id: req.user.id, "floors._id": floorId },
    {
      $set: { "floors.$.name": name },
    }
  );

  res.json("Cập nhật thành công");
};

// 🔥 UPDATE TABLE STATUS
export const updateTableStatus = async (req, res) => {
  const { tableId } = req.params;
  const { status } = req.body;

  await User.updateOne(
    { _id: req.user.id },
    {
      $set: {
        "floors.$[].tables.$[t].status": status,
      },
    },
    {
      arrayFilters: [{ "t._id": tableId }],
    }
  );

  res.json("Đã cập nhật trạng thái bàn");
};