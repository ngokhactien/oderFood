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

// lấy 10 sản phẩm
// GET /api/products?limit=10 
export const getProducts = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;

  const products = await Product.find().limit(limit);

  res.json(products);
};

// ✅ UPDATE
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

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