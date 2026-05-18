/// backend/controllers/categoryController.js

import Category from "../models/Category.js";

export const getShowCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      status: "show",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};