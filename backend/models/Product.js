// models/Product.js
import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  label: String,
  price: Number,
  stock: Number, // mỗi size có kho riêng
  importPrice: Number, // giá nhập riêng từng option
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: String,
    category: String,

    price: Number,

    // GIÁ NHẬP
    importPrice: {
      type: Number,
      default: 0,
    },
    discount: Number,

    images: [String],

    options: [optionSchema],

    views: { type: Number, default: 0 }, // để tính độ hot
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 }, // số người đánh giá
    sold: { type: Number, default: 0 },

    stock: Number,
    isBestSeller: { type: Boolean, default: false },

    prepTime: Number,

    ingredients: [String],

    description: String,

    status: {
      type: String,
      enum: ["available", "out_of_stock"],
      default: "available",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);

// {
//   id: 8,
//   name: "Sushi trứng Tamago",
//   brand: "iSushi",
//   category: "sushi",

//   price: 140000,
//   discount: 14,

//   images: [
//     "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600"
//   ],

//   options: [
//     { label: "6 pcs", price: 140000 },
//     { label: "12 pcs", price: 260000 }
//   ],

//   rating: 4.5,
//   reviews: 70,
//   sold: 180,

//   stock: 50,
//   isBestSeller: true,

//   prepTime: 15,

//   ingredients: ["trứng", "cơm", "rong biển"],

//   description: "Sushi trứng tamago ngọt nhẹ, mềm mịn, phù hợp cho trẻ em.",

//   status: "available"
// }
