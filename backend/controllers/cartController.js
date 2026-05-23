// controllers/cartController.js

import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// =========================
// ADD TO CART
// =========================
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const { productId, optionId, quantity = 1 } = req.body;

    // validate quantity
    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity",
      });
    }

    // tìm product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // tìm option
    const option = product.options.id(optionId);

    if (!option) {
      return res.status(404).json({
        success: false,
        message: "Option not found",
      });
    }

    // kiểm tra stock
    if (quantity > option.stock) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock",
      });
    }

    // tìm cart
    let cart = await Cart.findOne({
      user: userId,
    });

    // nếu chưa có cart
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [],
      });
    }

    // kiểm tra item tồn tại
    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.optionId.toString() === optionId,
    );

    // nếu đã tồn tại
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      // check stock lần nữa
      if (newQuantity > option.stock) {
        return res.status(400).json({
          success: false,
          message: "Not enough stock",
        });
      }

      existingItem.quantity = newQuantity;
    }

    // nếu chưa tồn tại
    else {
      cart.items.push({
        productId,
        optionId,
        quantity,
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Added to cart successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET CART
// =========================
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.productId");

    // chưa có cart
    if (!cart) {
      return res.status(200).json({
        success: true,
        items: [],
        totalAmount: 0,
      });
    }

    const formattedItems = cart.items
      .map((item) => {
        const product = item.productId;

        // product bị xoá
        if (!product) return null;

        // tìm option
        const option = product.options.id(item.optionId);

        // option bị xoá
        if (!option) return null;

        return {
          productId: product._id,

          optionId: item.optionId,

          name: product.name,

          image: product.thumbnail || product.images[0],

          option: option.label,

          price: option.price,

          quantity: item.quantity,

          stock: option.stock,

          subtotal: option.price * item.quantity,
        };
      })

      // xoá item null
      .filter(Boolean);

    // tính tổng tiền
    const totalAmount = formattedItems.reduce(
      (total, item) => total + item.subtotal,
      0,
    );

    res.status(200).json({
      success: true,

      items: formattedItems,

      totalAmount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// UPDATE QUANTITY
// =========================
export const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user.id;

    const { productId, optionId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity",
      });
    }

    // tìm product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // tìm option
    const option = product.options.id(optionId);

    if (!option) {
      return res.status(404).json({
        success: false,
        message: "Option not found",
      });
    }

    // check stock
    if (quantity > option.stock) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock",
      });
    }

    // tìm cart
    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // tìm item
    const item = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.optionId.toString() === optionId,
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // update quantity
    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// REMOVE ITEM
// =========================
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;

    const { productId, optionId } = req.body;

    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // filter item
    cart.items = cart.items.filter(
      (item) =>
        !(
          item.productId.toString() === productId &&
          item.optionId.toString() === optionId
        ),
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// CLEAR CART
// =========================
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
