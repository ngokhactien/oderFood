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

// ✅ GET ALL
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
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