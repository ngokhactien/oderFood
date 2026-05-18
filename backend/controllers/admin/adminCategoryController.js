import Category from "../../models/Category.js";
import { slugify } from "../../utils/slugify.js";

//
// GET ALL
//
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      createdAt: -1,
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//
// CREATE
//
export const createCategory = async (req, res) => {
  try {
    const { name, image, status } = req.body;

    const slug = slugify(name);

    // ❌ check trùng slug
    const exist = await Category.findOne({ slug });

    if (exist) {
      return res.status(400).json({
        message: "Tên Danh Mục đã có rồi không thể tạo nữa !!!",
      });
    }

    // ✅ create category
    const category = await Category.create({
      name,
      slug,
      image,
      status,
      createdBy: req.user?._id,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//
// UPDATE
//
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const { name, image, status } = req.body;

    // đổi name -> check slug
    if (name && name !== category.name) {
      const newSlug = slugify(name);

      const exist = await Category.findOne({
        slug: newSlug,
        _id: { $ne: category._id },
      });

      // ❌ đã có
      if (exist) {
        return res.status(400).json({
          message: "Tên Danh Mục đã tồn tại !!!",
        });
      }

      category.slug = newSlug;
    }

    category.name = name || category.name;
    category.image = image || category.image;

    category.status =
      status !== undefined
        ? status
        : category.status;

    await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//
// DELETE
//
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    await category.deleteOne();

    res.json({
      message: "Delete success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
