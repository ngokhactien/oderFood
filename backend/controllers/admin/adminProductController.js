import Product from "../../models/Product.js";

//
// GET PRODUCTS
//
export const getProducts =
  async (req, res) => {
    try {
      const products =
        await Product.find().sort({
          createdAt: -1,
        });

      res.json(products);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

//
// GET PRODUCT
//
export const getProduct =
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.id,
        );

      if (!product) {
        return res.status(404).json({
          message:
            "Không tìm thấy sản phẩm",
        });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

//
// CREATE PRODUCT
//
export const createProduct =
  async (req, res) => {
    try {
      const product =
        await Product.create(req.body);

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

//
// UPDATE PRODUCT
//
export const updateProduct =
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.id,
        );

      if (!product) {
        return res.status(404).json({
          message:
            "Không tìm thấy sản phẩm",
        });
      }

      const updated =
        await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          },
        );

      res.json(updated);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

//
// DELETE PRODUCT
//
export const deleteProduct =
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.id,
        );

      if (!product) {
        return res.status(404).json({
          message:
            "Không tìm thấy sản phẩm",
        });
      }

      await product.deleteOne();

      res.json({
        message:
          "Xóa sản phẩm thành công",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };