// models/Product.js

import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  label: String, // tên option/size sản phẩm

  price: Number, // giá bán của từng option

  stock: Number, // số lượng hàng còn trong kho của từng option

  importPrice: Number, // giá nhập của từng option
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }, // tên sản phẩm

    brand: String, // thương hiệu sản phẩm

    category: String, // danh mục sản phẩm

    price: Number, // giá bán sản phẩm

    importPrice: {
      type: Number,
      default: 0,
    }, // giá nhập sản phẩm

    discount: Number, // phần trăm giảm giá

    images: [String], // danh sách ảnh sản phẩm

    options: [optionSchema], // danh sách option/size sản phẩm

    views: {
      type: Number,
      default: 0,
    }, // số lượt xem sản phẩm để tính độ hot

    rating: {
      type: Number,
      default: 0,
    }, // điểm đánh giá trung bình sản phẩm

    reviews: {
      type: Number,
      default: 0,
    }, // số lượng người đánh giá sản phẩm

    sold: {
      type: Number,
      default: 0,
    }, // số lượng sản phẩm đã bán

    stock: Number, // số lượng hàng còn trong kho

    isBestSeller: {
      type: Boolean,
      default: false,
    }, // kiểm tra sản phẩm bán chạy

    prepTime: Number, // thời gian chuẩn bị món ăn

    ingredients: [String], // nguyên liệu của sản phẩm

    description: String, // mô tả sản phẩm

    status: {
      type: String,

      enum: ["available", "out_of_stock"],

      default: "available",
    }, // trạng thái còn hàng hoặc hết hàng
  },
  {
    timestamps: true, // tự động tạo createdAt và updatedAt
  },
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
