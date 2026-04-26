const data = [
  {
    name: "Sushi trứng Tamago",
    brand: "iSushi",
    category: "sushi",
    price: 140000,
    discount: 14,
    images: [
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600"
    ],
    options: [
      { label: "6 pcs", price: 140000, stock: 20 },
      { label: "12 pcs", price: 260000, stock: 15 }
    ],
    views: 320,
    rating: 4.5,
    reviews: 70,
    sold: 180,
    stock: 50,
    isBestSeller: true,
    prepTime: 15,
    ingredients: ["trứng", "cơm", "rong biển"],
    description: "Sushi trứng tamago ngọt nhẹ, mềm mịn.",
    status: "available"
  },
  {
    name: "Gunkan trứng cá hồi",
    brand: "iSushi",
    category: "sushi",
    price: 230000,
    discount: 10,
    images: [
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600"
    ],
    options: [
      { label: "4 pcs", price: 230000, stock: 10 },
      { label: "8 pcs", price: 420000, stock: 8 }
    ],
    views: 850,
    rating: 4.9,
    reviews: 175,
    sold: 410,
    stock: 40,
    isBestSeller: true,
    prepTime: 15,
    ingredients: ["trứng cá hồi", "cơm"],
    description: "Gunkan trứng cá hồi béo, mặn nhẹ.",
    status: "available"
  },
  {
    name: "Pizza Hải Sản",
    brand: "Pizza Hut",
    category: "pizza",
    price: 220000,
    discount: 10,
    images: [
      "https://images.unsplash.com/photo-1601924582975-7e0c3d4c9e7d?w=600"
    ],
    options: [
      { label: "Size S", price: 180000, stock: 10 },
      { label: "Size M", price: 220000, stock: 10 },
      { label: "Size L", price: 260000, stock: 10 }
    ],
    views: 600,
    rating: 4.6,
    reviews: 120,
    sold: 300,
    stock: 30,
    prepTime: 20,
    ingredients: ["tôm", "mực", "phô mai"],
    description: "Pizza hải sản đậm vị biển.",
    status: "available"
  },
  {
    name: "Gà Rán Giòn Cay",
    brand: "KFC",
    category: "chicken",
    price: 90000,
    discount: 5,
    images: [
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600"
    ],
    options: [
      { label: "2 miếng", price: 90000, stock: 25 },
      { label: "4 miếng", price: 170000, stock: 20 }
    ],
    views: 720,
    rating: 4.4,
    reviews: 90,
    sold: 250,
    stock: 50,
    prepTime: 10,
    ingredients: ["gà", "bột chiên"],
    description: "Gà rán giòn cay hấp dẫn.",
    status: "available"
  },
  {
    name: "Mì Ý Bò Bằm",
    brand: "Italiano",
    category: "pasta",
    price: 120000,
    discount: 0,
    images: [
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600"
    ],
    options: [
      { label: "1 phần", price: 120000, stock: 40 }
    ],
    views: 300,
    rating: 4.3,
    reviews: 60,
    sold: 150,
    stock: 40,
    prepTime: 15,
    ingredients: ["bò", "mì"],
    description: "Mì Ý sốt bò truyền thống.",
    status: "available"
  },
  {
    name: "Burger Bò Phô Mai",
    brand: "Lotteria",
    category: "burger",
    price: 75000,
    discount: 8,
    images: [
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600"
    ],
    options: [
      { label: "1 cái", price: 75000, stock: 60 }
    ],
    views: 650,
    rating: 4.5,
    reviews: 85,
    sold: 210,
    stock: 60,
    prepTime: 8,
    ingredients: ["bò", "phô mai"],
    description: "Burger bò mềm béo.",
    status: "available"
  },
  {
    name: "Trà Sữa Trân Châu",
    brand: "GongCha",
    category: "drink",
    price: 45000,
    discount: 0,
    images: [
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600"
    ],
    options: [
      { label: "Size M", price: 45000, stock: 50 },
      { label: "Size L", price: 55000, stock: 50 }
    ],
    views: 900,
    rating: 4.8,
    reviews: 200,
    sold: 500,
    stock: 100,
    prepTime: 5,
    ingredients: ["trà", "sữa"],
    description: "Trà sữa topping đầy đủ.",
    status: "available"
  },
  {
    name: "Cơm Gà Xối Mỡ",
    brand: "Quán Việt",
    category: "rice",
    price: 65000,
    discount: 0,
    images: [
      "https://images.unsplash.com/photo-1604908177522-402c59f2a2c1?w=600"
    ],
    options: [
      { label: "1 phần", price: 65000, stock: 45 }
    ],
    views: 500,
    rating: 4.4,
    reviews: 110,
    sold: 270,
    stock: 45,
    prepTime: 12,
    ingredients: ["gà", "cơm"],
    description: "Cơm gà giòn ngon.",
    status: "available"
  },
  {
    name: "Phở Bò Hà Nội",
    brand: "Phở 24",
    category: "noodle",
    price: 70000,
    discount: 0,
    images: [
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600"
    ],
    options: [
      { label: "Tô thường", price: 70000, stock: 40 },
      { label: "Tô lớn", price: 90000, stock: 40 }
    ],
    views: 780,
    rating: 4.7,
    reviews: 150,
    sold: 350,
    stock: 80,
    prepTime: 10,
    ingredients: ["bò", "bánh phở"],
    description: "Phở bò chuẩn vị.",
    status: "available"
  },
  {
    name: "Lẩu Thái Hải Sản",
    brand: "Hotpot",
    category: "hotpot",
    price: 250000,
    discount: 12,
    images: [
      "https://images.unsplash.com/photo-1604908554007-6f3d6e7a3a89?w=600"
    ],
    options: [
      { label: "2 người", price: 250000, stock: 10 },
      { label: "4 người", price: 400000, stock: 10 }
    ],
    views: 420,
    rating: 4.6,
    reviews: 95,
    sold: 180,
    stock: 20,
    prepTime: 25,
    ingredients: ["tôm", "mực"],
    description: "Lẩu chua cay hấp dẫn.",
    status: "available"
  },
  {
    name: "Kem Matcha Nhật",
    brand: "Tokyo Ice",
    category: "dessert",
    price: 50000,
    discount: 0,
    images: [
      "https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=600"
    ],
    options: [
      { label: "1 viên", price: 50000, stock: 40 },
      { label: "2 viên", price: 90000, stock: 30 }
    ],
    views: 350,
    rating: 4.5,
    reviews: 60,
    sold: 140,
    stock: 70,
    prepTime: 3,
    ingredients: ["matcha", "sữa"],
    description: "Kem matcha mát lạnh.",
    status: "available"
  }
];

export default data;

// // models/Product.js
// import mongoose from "mongoose";

// const optionSchema = new mongoose.Schema({
//   label: String,
//   price: Number,
//   stock: Number, // mỗi size có kho riêng
// });

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     brand: String,
//     category: String,

//     price: Number,
//     discount: Number,

//     images: [String],

//     options: [optionSchema],

//     views: { type: Number, default: 0 },  // để tính độ hot
//     rating: { type: Number, default: 0 },
//     reviews: { type: Number, default: 0 }, // số người đánh giá 
//     sold: { type: Number, default: 0 },

//     stock: Number,
//     isBestSeller: { type: Boolean, default: false },

//     prepTime: Number,

//     ingredients: [String],

//     description: String,

//     status: {
//       type: String,
//       enum: ["available", "out_of_stock"],
//       default: "available",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Product", productSchema);

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