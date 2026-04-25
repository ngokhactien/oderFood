const data = [
  {
    "name": "Pizza Hải Sản",
    "brand": "Pizza Hut",
    "category": "pizza",
    "price": 220000,
    "discount": 10,
    "images": ["https://images.unsplash.com/photo-1601924582975-7e0c3d4c9e7d?w=600"],
    "options": [
      { "label": "Size S", "price": 180000 },
      { "label": "Size M", "price": 220000 },
      { "label": "Size L", "price": 260000 }
    ],
    "stock": 30,
    "prepTime": 20,
    "ingredients": ["tôm", "mực", "phô mai"],
    "description": "Pizza hải sản tươi ngon, đậm vị biển.",
    "status": "available"
  },
  {
    "name": "Gà Rán Giòn Cay",
    "brand": "KFC",
    "category": "chicken",
    "price": 90000,
    "discount": 5,
    "images": ["https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600"],
    "options": [
      { "label": "2 miếng", "price": 90000 },
      { "label": "4 miếng", "price": 170000 }
    ],
    "stock": 50,
    "prepTime": 10,
    "ingredients": ["gà", "bột chiên", "gia vị cay"],
    "description": "Gà rán giòn rụm, cay nhẹ hấp dẫn.",
    "status": "available"
  },
  {
    "name": "Mì Ý Bò Bằm",
    "brand": "Italiano",
    "category": "pasta",
    "price": 120000,
    "discount": 0,
    "images": ["https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600"],
    "options": [
      { "label": "1 phần", "price": 120000 }
    ],
    "stock": 40,
    "prepTime": 15,
    "ingredients": ["bò", "mì", "sốt cà"],
    "description": "Mì Ý truyền thống với sốt bò đậm đà.",
    "status": "available"
  },
  {
    "name": "Burger Bò Phô Mai",
    "brand": "Lotteria",
    "category": "burger",
    "price": 75000,
    "discount": 8,
    "images": ["https://images.unsplash.com/photo-1550547660-d9450f859349?w=600"],
    "options": [
      { "label": "1 cái", "price": 75000 }
    ],
    "stock": 60,
    "prepTime": 8,
    "ingredients": ["bò", "bánh mì", "phô mai"],
    "description": "Burger bò mềm, phô mai béo ngậy.",
    "status": "available"
  },
  {
    "name": "Trà Sữa Trân Châu",
    "brand": "GongCha",
    "category": "drink",
    "price": 45000,
    "discount": 0,
    "images": ["https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600"],
    "options": [
      { "label": "Size M", "price": 45000 },
      { "label": "Size L", "price": 55000 }
    ],
    "stock": 100,
    "prepTime": 5,
    "ingredients": ["trà", "sữa", "trân châu"],
    "description": "Trà sữa thơm ngon, topping đầy đủ.",
    "status": "available"
  },
  {
    "name": "Cơm Gà Xối Mỡ",
    "brand": "Quán Việt",
    "category": "rice",
    "price": 65000,
    "discount": 0,
    "images": ["https://images.unsplash.com/photo-1604908177522-402c59f2a2c1?w=600"],
    "options": [
      { "label": "1 phần", "price": 65000 }
    ],
    "stock": 45,
    "prepTime": 12,
    "ingredients": ["gà", "cơm", "nước mắm"],
    "description": "Cơm gà giòn rụm, ăn kèm nước mắm đặc biệt.",
    "status": "available"
  },
  {
    "name": "Phở Bò Hà Nội",
    "brand": "Phở 24",
    "category": "noodle",
    "price": 70000,
    "discount": 0,
    "images": ["https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600"],
    "options": [
      { "label": "Tô thường", "price": 70000 },
      { "label": "Tô lớn", "price": 90000 }
    ],
    "stock": 80,
    "prepTime": 10,
    "ingredients": ["bò", "bánh phở", "nước dùng"],
    "description": "Phở bò truyền thống chuẩn vị Hà Nội.",
    "status": "available"
  },
  {
    "name": "Bánh Mì Thịt Nướng",
    "brand": "Street Food",
    "category": "bread",
    "price": 30000,
    "discount": 0,
    "images": ["https://images.unsplash.com/photo-1604908176997-125f25cc6a9c?w=600"],
    "options": [
      { "label": "1 ổ", "price": 30000 }
    ],
    "stock": 100,
    "prepTime": 5,
    "ingredients": ["thịt nướng", "bánh mì", "rau"],
    "description": "Bánh mì giòn, nhân đậm đà.",
    "status": "available"
  },
  {
    "name": "Lẩu Thái Hải Sản",
    "brand": "Hotpot",
    "category": "hotpot",
    "price": 250000,
    "discount": 12,
    "images": ["https://images.unsplash.com/photo-1604908554007-6f3d6e7a3a89?w=600"],
    "options": [
      { "label": "2 người", "price": 250000 },
      { "label": "4 người", "price": 400000 }
    ],
    "stock": 20,
    "prepTime": 25,
    "ingredients": ["tôm", "mực", "rau", "nước lẩu"],
    "description": "Lẩu chua cay đậm vị Thái.",
    "status": "available"
  },
  {
    "name": "Kem Matcha Nhật",
    "brand": "Tokyo Ice",
    "category": "dessert",
    "price": 50000,
    "discount": 0,
    "images": ["https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=600"],
    "options": [
      { "label": "1 viên", "price": 50000 },
      { "label": "2 viên", "price": 90000 }
    ],
    "stock": 70,
    "prepTime": 3,
    "ingredients": ["matcha", "sữa"],
    "description": "Kem matcha mát lạnh, vị trà xanh đặc trưng.",
    "status": "available"
  }
];
export default data;