const products = [
  {
    id: 1,
    name: "Set mix Juuichi (2-3 người)",
    brand: "iSushi",
    price: 1300000,
    discount: "-15%",
    images: [
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1562158070-57a88f1a5c8d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop",
    ],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    reviews: 120,
    sold: 350,
    description: "Set sushi tổng hợp dành cho 2-3 người, bao gồm nhiều loại sushi và sashimi tươi ngon."
  },
  {
    id: 2,
    name: "Set mix Juuyon (3-4 người)",
    brand: "iSushi",
    price: 1320000,
    discount: "-9%",
    images: [
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&h=400&fit=crop",
    ],
    sizes: ["M", "L"],
    rating: 4.7,
    reviews: 98,
    sold: 280,
    description: "Set sushi cao cấp dành cho 3-4 người, phù hợp cho các buổi họp mặt gia đình."
  },
  {
    id: 3,
    name: "Salad rong biển",
    brand: "iSushi",
    price: 110000,
    discount: "-18%",
    images: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    ],
    sizes: ["Regular"],
    rating: 4.5,
    reviews: 60,
    sold: 150,
    description: "Salad rong biển tươi mát, giàu dinh dưỡng và tốt cho sức khỏe."
  },
  {
    id: 4,
    name: "Sashimi cá ngừ đại dương",
    brand: "iSushi",
    price: 250000,
    discount: "-12%",
    images: [
      "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=600&h=400&fit=crop",
    ],
    sizes: ["S", "M"],
    rating: 4.8,
    reviews: 150,
    sold: 310,
    description: "Sashimi cá ngừ đại dương tươi ngon, cắt lát tinh tế theo phong cách Nhật Bản."
  },
  {
    id: 5,
    name: "Makimono thanh cua",
    brand: "iSushi",
    price: 170000,
    discount: "-12%",
    images: [
      "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=600&h=400&fit=crop",
    ],
    sizes: ["6 pcs", "12 pcs"],
    rating: 4.6,
    reviews: 80,
    sold: 200,
    description: "Cơm cuộn makimono với thanh cua và rau củ tươi, phù hợp cho mọi lứa tuổi."
  },
  {
    id: 6,
    name: "Tempura tôm giòn",
    brand: "iSushi",
    price: 220000,
    discount: "-14%",
    images: [
      "https://images.unsplash.com/photo-1604908176997-431c3f7a2b76?w=600&h=400&fit=crop",
    ],
    sizes: ["S", "M"],
    rating: 4.7,
    reviews: 95,
    sold: 260,
    description: "Tôm tempura chiên giòn, lớp bột nhẹ và xốp, ăn kèm nước chấm đặc trưng."
  },
  {
    id: 7,
    name: "Cơm cuộn lươn Nhật",
    brand: "iSushi",
    price: 240000,
    discount: "-13%",
    images: [
      "https://images.unsplash.com/photo-1617196034738-26c5e0e0f89b?w=600&h=400&fit=crop",
    ],
    sizes: ["6 pcs", "12 pcs"],
    rating: 4.8,
    reviews: 110,
    sold: 290,
    description: "Cơm cuộn lươn Nhật với sốt kabayaki đậm đà, hương vị đặc trưng."
  },
  {
    id: 8,
    name: "Sushi trứng Tamago",
    brand: "iSushi",
    price: 140000,
    discount: "-14%",
    images: [
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&h=400&fit=crop",
    ],
    sizes: ["6 pcs", "12 pcs"],
    rating: 4.5,
    reviews: 70,
    sold: 180,
    description: "Sushi trứng tamago ngọt nhẹ, mềm mịn, phù hợp cho trẻ em."
  },
  {
    id: 9,
    name: "Gunkan trứng cá hồi",
    brand: "iSushi",
    price: 230000,
    discount: "",
    images: [
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&h=400&fit=crop",
    ],
    sizes: ["4 pcs", "8 pcs"],
    rating: 4.9,
    reviews: 175,
    sold: 410,
    description: "Gunkan trứng cá hồi tươi, vị béo và mặn nhẹ, món ăn được yêu thích."
  },
  {
    id: 10,
    name: "Mì Udon hải sản",
    brand: "iSushi",
    price: 195000,
    discount: "-13%",
    images: [
      "https://images.unsplash.com/photo-1603079847843-5d5e3d2f1c9f?w=600&h=400&fit=crop",
    ],
    sizes: ["Regular", "Large"],
    rating: 4.6,
    reviews: 90,
    sold: 230,
    description: "Mì Udon hải sản với nước dùng thanh ngọt, sợi mì dai ngon."
  }
];

export default products;

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