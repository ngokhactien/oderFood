import Comment from "../models/Comment.js";
import Product from "../models/Product.js";

/**
 * UPDATE PRODUCT RATING + REVIEWS
 */
const updateProductRating = async (productId) => {
  const comments = await Comment.find({
    product: productId,
    isHidden: false,
  });

  const reviews = comments.length;

  const totalRating = comments.reduce(
    (sum, item) => sum + item.rating,
    0
  );

  const rating =
    reviews > 0 ? totalRating / reviews : 0;

  const updated = await Product.findByIdAndUpdate(
    productId,
    {
      reviews,
      rating: Number(rating.toFixed(1)),
    },
    {
      new: true,
    }
  );
};

/**
 * GET COMMENTS BY PRODUCT
 */
export const getCommentsByProduct = async (req, res) => {
  try {
    const comments = await Comment.find({
      product: req.params.productId,
      isHidden: false,
    })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * GET ALL COMMENTS
 */
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("user", "name avatar")
      .populate("product", "name")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * GET COMMENT BY ID
 */
export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("user", "name")
      .populate("product", "name");

    if (!comment) {
      return res.status(404).json({
        message: "Không tìm thấy bình luận",
      });
    }

    res.json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * UPDATE COMMENT STATUS
 */
export const updateCommentStatus = async (req, res) => {
  try {
    const { isHidden } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { isHidden },
      { new: true }
    )
      .populate("user", "name")
      .populate("product", "name");

    if (!comment) {
      return res.status(404).json({
        message: "Không tìm thấy bình luận",
      });
    }

    await updateProductRating(comment.product._id);

    res.json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * CREATE COMMENT
 */
export const createComment = async (req, res) => {
  try {
    const { user, product, content, rating } = req.body;

    const comment = await Comment.create({
      user,
      product,
      content,
      rating,
    });

    const populatedComment = await comment.populate(
      "user",
      "name avatar"
    );

    await updateProductRating(product);

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * DELETE COMMENT
 */
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Không tìm thấy bình luận",
      });
    }

    const productId = comment.product;

    await comment.deleteOne();

    await updateProductRating(productId);

    res.json({
      message: "Xóa bình luận thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};