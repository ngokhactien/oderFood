import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderCode: String,

    tableId: String, // 🔥 query nhanh
    table: {
      id: String,
      name: String,
      floor: String,
    },

    type: {
      type: String,
      enum: ["dine-in", "takeaway"],
      default: "dine-in",
    },

    items: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        price: Number,
        qty: Number,

        status: {
          type: String,
          enum: ["pending", "serving", "done"],
          default: "pending",
        },

        note: String,
      },
    ],

    total: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["draft", "confirmed", "serving", "paid", "cancelled"],
      default: "draft",
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },

    note: String,

    openedAt: {
      type: Date,
      default: Date.now,
    },

    closedAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);

// {
//   "_id": "66f1a2b3c4d5e6f789000001",
//   "userId": "66f000abc123456789000001",

//   "orderCode": "ORD-000123",

//   "tableId": "Lầu 2-Bàn 10",
//   "table": {
//     "id": "Lầu 2-Bàn 10",
//     "name": "Bàn 10",
//     "floor": "Lầu 2"
//   },

//   "type": "dine-in",

//   "items": [
//     {
//       "productId": "66p001",
//       "name": "Cà phê sữa",
//       "price": 25000,
//       "qty": 2,
//       "status": "done",
//       "note": "Ít đá"
//     },
//     {
//       "productId": "66p002",
//       "name": "Trà đào",
//       "price": 30000,
//       "qty": 1,
//       "status": "serving",
//       "note": ""
//     }
//   ],

//   "total": 80000,

//   "status": "serving",
//   "paymentStatus": "unpaid",

//   "note": "Khách ngồi gần cửa sổ",

//   "openedAt": "2026-05-04T10:00:00.000Z",
//   "closedAt": null,

//   "createdAt": "2026-05-04T10:00:00.000Z",
//   "updatedAt": "2026-05-04T10:10:00.000Z"
// }
