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
        default: "reserved",
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