// models/Order.js

import mongoose from "mongoose";

// =========================
// ORDER PRODUCT
// =========================
const orderProductSchema = new mongoose.Schema(
  {
    // product
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // option / size id
    optionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    // tên sản phẩm lúc đặt
    name: {
      type: String,
      required: true,
    },

    // ảnh sản phẩm
    image: {
      type: String,
      default: "",
    },

    // tên size / option
    optionLabel: {
      type: String,
      default: "",
    },

    // giá bán lúc mua
    price: {
      type: Number,
      required: true,
      default: 0,
    },

    // giá nhập lúc mua
    importPrice: {
      type: Number,
      default: 0,
    },

    // discount lúc mua
    discount: {
      type: Number,
      default: 0,
    },

    // số lượng
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    // tổng tiền item
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  },
);

// =========================
// ORDER
// =========================
const orderSchema = new mongoose.Schema(
  {
    // mã đơn hàng
    orderCode: {
      type: String,
      unique: true,
    },

    // user đặt hàng
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // danh sách sản phẩm
    items: {
      type: [orderProductSchema],
      default: [],
    },

    // tổng tiền đơn hàng
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    // phí ship
    shippingFee: {
      type: Number,
      default: 0,
    },

    // tổng số lượng sản phẩm
    totalQuantity: {
      type: Number,
      default: 0,
    },

    // phương thức thanh toán
    paymentMethod: {
      type: String,
      enum: ["COD", "MOMO"],
      default: "COD",
    },

    // trạng thái thanh toán
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    // trạng thái đơn hàng
    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "shipping", "completed", "cancelled"],
      default: "pending",
    },

    // địa chỉ giao hàng
    shippingAddress: {
      fullName: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        default: "",
      },

      address: {
        type: String,
        default: "",
      },
    },

    // ghi chú
    note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Checkout", orderSchema);
