// controllers/productController.js
import Product from "../models/Product.js";

// ✅ CREATE
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ✅ GET ONE
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json("Không tìm thấy sản phẩm");

    res.json(product);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// lấy 10 sản phẩm trang home not search
// GET /api/products?limit=10
export const getProducts = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;

  const products = await Product.find().limit(limit);

  res.json(products);
};

// ✅ UPDATE
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(product);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ✅ DELETE
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json("Xóa sản phẩm thành công");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// search
// controllers/productController.js
export const searchProducts = async (req, res) => {
  try {
    let { q, category, minPrice, maxPrice, page = 1, limit = 12 } = req.query;

    const query = {};

    // 🔍 SEARCH
    if (q && q.trim() !== "") {
      query.name = { $regex: q, $options: "i" };
    }

    // 📂 CATEGORY
    if (category && category !== "all") {
      if (category === "pizza-burger") {
        query.category = { $in: ["pizza", "burger"] };
      } else {
        query.category = category;
      }
    }

    // 💰 PRICE (fix chuẩn)
    const min = Number(minPrice);
    const max = Number(maxPrice);

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};

      if (minPrice !== undefined) query.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) query.price.$lte = Number(maxPrice);
    }

    // 📊 FIX limit & page
    const limitNum = Number(limit) || 10;
    const pageNum = Number(page) || 1;

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    res.json({
      data: products,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    console.log("❌ ERROR:", err); // 👈 BẮT BUỘC
    res.status(500).json(err.message);
  }
};
