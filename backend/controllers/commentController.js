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

  const totalRating = comments.reduce((sum, item) => sum + item.rating, 0);

  const rating = reviews > 0 ? totalRating / reviews : 0;

  const updated = await Product.findByIdAndUpdate(
    productId,
    {
      reviews,
      rating: Number(rating.toFixed(1)),
    },
    {
      new: true,
    },
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
/**
 * UPDATE COMMENT STATUS + PIN
 */
export const updateCommentStatus = async (req, res) => {
  try {
    const { isHidden, isPinned } = req.body;

    const comment = await Comment.findById(
      req.params.id,
    );

    if (!comment) {
      return res.status(404).json({
        message: "Không tìm thấy bình luận",
      });
    }

    /**
     * UPDATE HIDDEN
     */
    if (
      typeof isHidden !== "undefined"
    ) {
      comment.isHidden = isHidden;
    }

    /**
     * UPDATE PIN
     */
    if (
      typeof isPinned !== "undefined"
    ) {
      // nếu muốn ghim
      if (isPinned === true) {
        const totalPinned =
          await Comment.countDocuments({
            isPinned: true,
            isHidden: false,
          });

        // tối đa 6 comment
        if (
          totalPinned >= 6 &&
          !comment.isPinned
        ) {
          return res.status(400).json({
            message:
              "Chỉ được ghim tối đa 6 bình luận",
          });
        }
      }

      comment.isPinned = isPinned;
    }

    /**
     * nếu ẩn comment
     * => tự bỏ ghim
     */
    if (comment.isHidden) {
      comment.isPinned = false;
    }

    await comment.save();

    /**
     * UPDATE PRODUCT RATING
     */
    await updateProductRating(
      comment.product,
    );

    const updated =
      await Comment.findById(comment._id)
        .populate("user")
        .populate("product");

    res.json(updated);
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

    const populatedComment = await comment.populate("user", "name avatar");

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


/**
 * GET PINNED COMMENTS
 * chỉ lấy comment:
 * - isPinned = true
 * - isHidden = false
 * - tối đa 6 comment
 */
export const getPinnedComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      isPinned: true,
      isHidden: false,
    })
      .populate("user", "name avatar")
      .populate("product", "name")
      .sort({ createdAt: -1 })
      .limit(6);

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};