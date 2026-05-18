import mongoose from "mongoose";

const tableReservationSchema =
  new mongoose.Schema(
    {
      tableId: String,

      tableName: String,

      customerName: String,

      phone: String,

      date: String,

      time: String,

      guests: Number,

      note: String,

      status: {
        type: String,

        enum: [
          "reserved",
          "completed",
          "cancelled",
        ],

        default: "reserved",
      },

      // hủy -> 3 ngày xóa
      cancelledAt: {
        type: Date,
        default: null,
        expires: 60 * 60 * 24 * 3,
      },

      // hoàn thành -> 2 tháng xóa
      completedAt: {
        type: Date,
        default: null,
        expires:
          60 * 60 * 24 * 30 * 2,
      },
    },
    {
      timestamps: true,
    },
  );

export default mongoose.model(
  "TableReservation",
  tableReservationSchema,
);

// Vậy nên tách thành 2 field thời gian riêng để auto xóa đúng loại:

// cancelledAt → xóa sau 3 ngày
// completedAt → xóa sau 2 tháng