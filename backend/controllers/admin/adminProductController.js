import Product from "../../models/Product.js";

//
// GET PRODUCTS
//
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
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
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
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
export const createProduct = async (req, res) => {
  try {
    const images = req.files?.map((file) => file.path) || [];

    const product = await Product.create({
      name: req.body.name,

      brand: req.body.brand,

      category: req.body.category,

      price: req.body.price,

      importPrice: req.body.importPrice,

      discount: req.body.discount,

      stock: req.body.stock,

      prepTime: req.body.prepTime,

      description: req.body.description,

      status: req.body.status,

      ingredients: JSON.parse(req.body.ingredients || "[]"),

      options: JSON.parse(req.body.options || "[]"),

      images,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

//
// UPDATE PRODUCT
//
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }

    // ảnh mới upload
    const newImages = req.files?.map((file) => file.path) || [];

    // giữ ảnh cũ nếu không upload mới
    const images = newImages.length > 0 ? newImages : product.images;

    const updatedData = {
      name: req.body.name,

      brand: req.body.brand,

      category: req.body.category,

      price: req.body.price,

      importPrice: req.body.importPrice,

      discount: req.body.discount,

      stock: req.body.stock,

      prepTime: req.body.prepTime,

      description: req.body.description,

      status: req.body.status,

      ingredients: req.body.ingredients ? JSON.parse(req.body.ingredients) : [],

      options: req.body.options ? JSON.parse(req.body.options) : [],

      images,
    };

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      },
    );

    res.json(updated);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

//
// DELETE PRODUCT
//
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
