// const data = [
//   {
//     name: "Burger Bò Phô Mai",
//     brand: "FastFood House",
//     category: "burger",
//     price: 89000,
//     importPrice: 45000,
//     discount: 10,
//     images: [
//       "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
//     ],
//     options: [
//       {
//         label: "Size M",
//         price: 89000,
//         stock: 20,
//         importPrice: 45000,
//       },
//     ],
//     views: 120,
//     rating: 4.5,
//     reviews: 30,
//     sold: 90,
//     stock: 35,
//     isBestSeller: true,
//     prepTime: 15,
//     ingredients: ["bò", "phô mai", "bánh mì"],
//     description: "Burger bò phô mai thơm ngon.",
//     status: "available",
//   },

//   {
//     name: "Burger Gà Giòn",
//     brand: "FastFood House",
//     category: "burger",
//     price: 79000,
//     importPrice: 40000,
//     discount: 5,
//     images: [
//       "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600",
//     ],
//     options: [
//       {
//         label: "Size L",
//         price: 99000,
//         stock: 25,
//         importPrice: 50000,
//       },
//     ],
//     views: 80,
//     rating: 4.4,
//     reviews: 18,
//     sold: 65,
//     stock: 25,
//     isBestSeller: false,
//     prepTime: 12,
//     ingredients: ["gà", "xà lách", "sốt mayo"],
//     description: "Burger gà giòn cay hấp dẫn.",
//     status: "available",
//   },

//   {
//     name: "Pizza Hải Sản",
//     brand: "Pizza Home",
//     category: "pizza",
//     price: 199000,
//     importPrice: 110000,
//     discount: 15,
//     images: [
//       "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
//     ],
//     options: [
//       {
//         label: "Size M",
//         price: 199000,
//         stock: 10,
//         importPrice: 110000,
//       },
//     ],
//     views: 200,
//     rating: 4.8,
//     reviews: 44,
//     sold: 160,
//     stock: 18,
//     isBestSeller: true,
//     prepTime: 20,
//     ingredients: ["tôm", "mực", "phô mai"],
//     description: "Pizza hải sản đầy topping.",
//     status: "available",
//   },

//   {
//     name: "Pizza Pepperoni",
//     brand: "Pizza Home",
//     category: "pizza",
//     price: 179000,
//     importPrice: 95000,
//     discount: 12,
//     images: [
//       "https://images.unsplash.com/photo-1548365328-9f547fb0953b?w=600",
//     ],
//     options: [
//       {
//         label: "Size L",
//         price: 259000,
//         stock: 12,
//         importPrice: 130000,
//       },
//     ],
//     views: 150,
//     rating: 4.6,
//     reviews: 31,
//     sold: 120,
//     stock: 20,
//     isBestSeller: true,
//     prepTime: 18,
//     ingredients: ["xúc xích", "phô mai", "ớt chuông"],
//     description: "Pizza pepperoni kiểu Ý.",
//     status: "available",
//   },

//   {
//     name: "Gà Rán Giòn Cay",
//     brand: "Chicken King",
//     category: "ga-ran",
//     price: 129000,
//     importPrice: 70000,
//     discount: 5,
//     images: [
//       "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=600",
//     ],
//     options: [
//       {
//         label: "2 miếng",
//         price: 129000,
//         stock: 25,
//         importPrice: 70000,
//       },
//     ],
//     views: 150,
//     rating: 4.6,
//     reviews: 38,
//     sold: 120,
//     stock: 25,
//     isBestSeller: true,
//     prepTime: 18,
//     ingredients: ["gà", "bột chiên"],
//     description: "Gà rán giòn cay hấp dẫn.",
//     status: "available",
//   },

//   {
//     name: "Gà Rán Mật Ong",
//     brand: "Chicken King",
//     category: "ga-ran",
//     price: 139000,
//     importPrice: 75000,
//     discount: 8,
//     images: [
//       "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600",
//     ],
//     options: [
//       {
//         label: "Combo",
//         price: 159000,
//         stock: 15,
//         importPrice: 90000,
//       },
//     ],
//     views: 100,
//     rating: 4.7,
//     reviews: 29,
//     sold: 88,
//     stock: 15,
//     isBestSeller: false,
//     prepTime: 16,
//     ingredients: ["gà", "mật ong", "mè rang"],
//     description: "Gà rán phủ sốt mật ong.",
//     status: "available",
//   },

//   {
//     name: "Mỳ Ý Bò Bằm",
//     brand: "Italian Food",
//     category: "my-y",
//     price: 149000,
//     importPrice: 80000,
//     discount: 12,
//     images: [
//       "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
//     ],
//     options: [
//       {
//         label: "1 phần",
//         price: 149000,
//         stock: 20,
//         importPrice: 80000,
//       },
//     ],
//     views: 90,
//     rating: 4.4,
//     reviews: 21,
//     sold: 70,
//     stock: 20,
//     isBestSeller: false,
//     prepTime: 15,
//     ingredients: ["mỳ", "bò bằm", "sốt cà"],
//     description: "Mỳ Ý bò bằm chuẩn vị.",
//     status: "available",
//   },

//   {
//     name: "Mỳ Ý Hải Sản",
//     brand: "Italian Food",
//     category: "my-y",
//     price: 169000,
//     importPrice: 90000,
//     discount: 10,
//     images: [
//       "https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=600",
//     ],
//     options: [
//       {
//         label: "1 phần",
//         price: 169000,
//         stock: 16,
//         importPrice: 90000,
//       },
//     ],
//     views: 95,
//     rating: 4.5,
//     reviews: 22,
//     sold: 60,
//     stock: 16,
//     isBestSeller: false,
//     prepTime: 17,
//     ingredients: ["tôm", "mực", "mỳ Ý"],
//     description: "Mỳ Ý sốt hải sản béo ngậy.",
//     status: "available",
//   },

//   {
//     name: "Cơm Gà Xối Mỡ",
//     brand: "Cơm Việt",
//     category: "com",
//     price: 69000,
//     importPrice: 35000,
//     discount: 0,
//     images: [
//       "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600",
//     ],
//     options: [
//       {
//         label: "1 phần",
//         price: 69000,
//         stock: 30,
//         importPrice: 35000,
//       },
//     ],
//     views: 100,
//     rating: 4.3,
//     reviews: 19,
//     sold: 80,
//     stock: 30,
//     isBestSeller: false,
//     prepTime: 10,
//     ingredients: ["cơm", "gà", "dưa leo"],
//     description: "Cơm gà xối mỡ giòn ngon.",
//     status: "available",
//   },

//   {
//     name: "Cơm Sườn Nướng",
//     brand: "Cơm Việt",
//     category: "com",
//     price: 75000,
//     importPrice: 40000,
//     discount: 5,
//     images: [
//       "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600",
//     ],
//     options: [
//       {
//         label: "1 phần",
//         price: 75000,
//         stock: 22,
//         importPrice: 40000,
//       },
//     ],
//     views: 110,
//     rating: 4.6,
//     reviews: 26,
//     sold: 90,
//     stock: 22,
//     isBestSeller: true,
//     prepTime: 12,
//     ingredients: ["sườn", "cơm", "trứng"],
//     description: "Cơm sườn nướng thơm lừng.",
//     status: "available",
//   }
// ];

// // clone ra thành 100 sản phẩm khác nhau
// const finalData = [];

// for (let i = 1; i <= 20; i++) {
//   data.forEach((item) => {
//     finalData.push({
//       ...item,
//       name: `${item.name} ${i}`,
//       price: item.price + i * 1000,
//       sold: item.sold + i,
//       views: item.views + i * 10,
//       stock: item.stock + i,
//     });
//   });
// }

// export default finalData;
const data = [
  // ================= BURGER =================
  {
    name: "Burger Bò Phô Mai",
    brand: "FastFood House",
    category: "burger",
    price: 89000,
    importPrice: 45000,
    discount: 10,

    images: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600",
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600",
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600",
    ],

    options: [
      {
        label: "Size M",
        price: 89000,
        stock: 20,
        importPrice: 45000,
      },
    ],

    views: 120,
    rating: 4.5,
    reviews: 30,
    sold: 90,
    stock: 35,
    isBestSeller: true,
    prepTime: 15,
    ingredients: ["bò", "phô mai", "bánh mì"],
    description: "Burger bò phô mai thơm ngon.",
    status: "available",
  },

  // ================= PIZZA =================
  {
    name: "Pizza Hải Sản",
    brand: "Pizza Home",
    category: "pizza",
    price: 199000,
    importPrice: 110000,
    discount: 15,

    images: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
      "https://images.unsplash.com/photo-1548365328-9f547fb0953b?w=600",
      "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=600",
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=600",
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600",
    ],

    options: [
      {
        label: "Size M",
        price: 199000,
        stock: 10,
        importPrice: 110000,
      },
    ],

    views: 200,
    rating: 4.8,
    reviews: 44,
    sold: 160,
    stock: 18,
    isBestSeller: true,
    prepTime: 20,
    ingredients: ["tôm", "mực", "phô mai"],
    description: "Pizza hải sản đầy topping.",
    status: "available",
  },

  // ================= GÀ RÁN =================
  {
    name: "Gà Rán Giòn Cay",
    brand: "Chicken King",
    category: "ga-ran",
    price: 129000,
    importPrice: 70000,
    discount: 5,

    images: [
      "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=600",
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600",
      "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=600",
      "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=600",
    ],

    options: [
      {
        label: "2 miếng",
        price: 129000,
        stock: 25,
        importPrice: 70000,
      },
    ],

    views: 150,
    rating: 4.6,
    reviews: 38,
    sold: 120,
    stock: 25,
    isBestSeller: true,
    prepTime: 18,
    ingredients: ["gà", "bột chiên"],
    description: "Gà rán giòn cay hấp dẫn.",
    status: "available",
  },

  // ================= MỲ Ý =================
  {
    name: "Mỳ Ý Bò Bằm",
    brand: "Italian Food",
    category: "my-y",
    price: 149000,
    importPrice: 80000,
    discount: 12,

    images: [
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
      "https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=600",
      "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8df0?w=600",
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600",
    ],

    options: [
      {
        label: "1 phần",
        price: 149000,
        stock: 20,
        importPrice: 80000,
      },
    ],

    views: 90,
    rating: 4.4,
    reviews: 21,
    sold: 70,
    stock: 20,
    isBestSeller: false,
    prepTime: 15,
    ingredients: ["mỳ", "bò bằm", "sốt cà"],
    description: "Mỳ Ý bò bằm chuẩn vị.",
    status: "available",
  },

  // ================= CƠM =================
  {
    name: "Cơm Gà Xối Mỡ",
    brand: "Cơm Việt",
    category: "com",
    price: 69000,
    importPrice: 35000,
    discount: 0,

    images: [
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600",
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
    ],

    options: [
      {
        label: "1 phần",
        price: 69000,
        stock: 30,
        importPrice: 35000,
      },
    ],

    views: 100,
    rating: 4.3,
    reviews: 19,
    sold: 80,
    stock: 30,
    isBestSeller: false,
    prepTime: 10,
    ingredients: ["cơm", "gà", "dưa leo"],
    description: "Cơm gà xối mỡ giòn ngon.",
    status: "available",
  },

  // ================= PHỞ =================
  {
    name: "Phở Bò Tái",
    brand: "Phở Việt",
    category: "pho",
    price: 85000,
    importPrice: 45000,
    discount: 5,

    images: [
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600",
      "https://images.unsplash.com/photo-1555126634-323283e090fa?w=600",
      "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=600",
      "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=600",
    ],

    options: [
      {
        label: "Tô lớn",
        price: 85000,
        stock: 20,
        importPrice: 45000,
      },
    ],

    views: 180,
    rating: 4.7,
    reviews: 40,
    sold: 140,
    stock: 25,
    isBestSeller: true,
    prepTime: 12,
    ingredients: ["bánh phở", "bò", "hành"],
    description: "Phở bò tái truyền thống.",
    status: "available",
  },

  // ================= NƯỚC ÉP =================
  {
    name: "Nước Ép Cam",
    brand: "Fresh Juice",
    category: "nuoc-ep",
    price: 45000,
    importPrice: 18000,
    discount: 0,

    images: [
      "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600",
      "https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?w=600",
      "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600",
    ],

    options: [
      {
        label: "500ml",
        price: 45000,
        stock: 50,
        importPrice: 18000,
      },
    ],

    views: 70,
    rating: 4.5,
    reviews: 12,
    sold: 60,
    stock: 50,
    isBestSeller: false,
    prepTime: 5,
    ingredients: ["cam tươi", "đá"],
    description: "Nước ép cam nguyên chất.",
    status: "available",
  },

  // ================= BÁNH =================
  {
    name: "Bánh Tiramisu",
    brand: "Sweet Cake",
    category: "banh",
    price: 99000,
    importPrice: 45000,
    discount: 10,

    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600",
      "https://images.unsplash.com/photo-1464306076886-da185f6a9d05?w=600",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
    ],

    options: [
      {
        label: "1 bánh",
        price: 99000,
        stock: 15,
        importPrice: 45000,
      },
    ],

    views: 130,
    rating: 4.8,
    reviews: 24,
    sold: 95,
    stock: 15,
    isBestSeller: true,
    prepTime: 8,
    ingredients: ["kem", "socola", "bánh mềm"],
    description: "Bánh tiramisu béo ngậy.",
    status: "available",
  },

  // ================= TRÀ SỮA =================
  {
    name: "Trà Sữa Trân Châu",
    brand: "Milk Tea House",
    category: "tra-sua",
    price: 55000,
    importPrice: 22000,
    discount: 0,

    images: [
      "https://images.unsplash.com/photo-1558857563-b371033873b8?w=600",
      "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=600",
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
    ],

    options: [
      {
        label: "Size L",
        price: 55000,
        stock: 40,
        importPrice: 22000,
      },
    ],

    views: 220,
    rating: 4.9,
    reviews: 55,
    sold: 210,
    stock: 40,
    isBestSeller: true,
    prepTime: 6,
    ingredients: ["trà", "sữa", "trân châu"],
    description: "Trà sữa trân châu đường đen.",
    status: "available",
  },
];

// clone thành 200 products
const finalData = [];

for (let i = 1; i <= 20; i++) {
  data.forEach((item) => {
    finalData.push({
      ...item,

      name: `${item.name} ${i}`,

      price: item.price + i * 1000,

      sold: item.sold + i,

      views: item.views + i * 10,

      stock: item.stock + i,
    });
  });
}

export default finalData;