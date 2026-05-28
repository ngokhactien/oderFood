// models/Floor.js

import mongoose from "mongoose";

// =========================
// Table Schema
// =========================
// Schema của từng bàn bên trong tầng
// Ví dụ:
// Lầu 1
//   ├── Bàn 1
//   ├── Bàn 2
//   └── Bàn 3
// =========================

const tableSchema = new mongoose.Schema(
  {
    // 🔥 Tên bàn
    // Ví dụ:
    // Bàn 1
    // Bàn VIP 2
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔥 Trạng thái bàn
    //
    // empty    = bàn trống
    // using    = đang có khách
    // reserved = đã được đặt trước
    status: {
      type: String,

      enum: ["empty", "using", "reserved"],

      default: "empty",
    },

    // 🔥 Sức chứa của bàn
    // Ví dụ:
    // 2 người
    // 4 người
    // 10 người
    capacity: {
      type: Number,
      default: 2,
    },
  },

  {
    // 🔥 Mongoose tự tạo _id cho mỗi bàn
    // để sau này:
    // - order
    // - reservation
    // - update status
    // có thể dùng tableId riêng
    _id: true,
  },
);

// =========================
// Floor Schema
// =========================
// Schema của tầng
//
// Ví dụ:
// Lầu 1
// Lầu 2
// Sân thượng
// =========================

const floorSchema = new mongoose.Schema(
  {
    // 🔥 Tên tầng
    name: {
      type: String,
      required: true,
      trim: true,

      // không cho trùng tên tầng
      unique: true,
    },

    // 🔥 Danh sách bàn trong tầng
    //
    // Ví dụ:
    // tables: [
    //   { name: "Bàn 1" },
    //   { name: "Bàn 2" }
    // ]
    tables: [tableSchema],
  },

  {
    // 🔥 createdAt
    // 🔥 updatedAt
    timestamps: true,
  },
);

export default mongoose.model("Floor", floorSchema);

/*

=========================
Ví dụ dữ liệu trong MongoDB
=========================

{
  "_id": "665001",

  "name": "Lầu 1",

  "tables": [
    {
      "_id": "table001",

      "name": "Bàn 1",

      "status": "empty",

      "capacity": 4
    },

    {
      "_id": "table002",

      "name": "Bàn 2",

      "status": "using",

      "capacity": 6
    }
  ],

  "createdAt": "2026-05-28T10:00:00.000Z",

  "updatedAt": "2026-05-28T10:00:00.000Z"
}

*/
