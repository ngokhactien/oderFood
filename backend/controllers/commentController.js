import Comment from "../models/Comment.js";

/**
 * GET COMMENTS BY PRODUCT
 */
export const getCommentsByProduct = async (req, res) => {
  try {
    const comments = await Comment.find({
      product: req.params.productId,
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
      "name avatar",
    );

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
    await Comment.findByIdAndDelete(req.params.commentId);

    res.json({
      message: "Xóa bình luận thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};