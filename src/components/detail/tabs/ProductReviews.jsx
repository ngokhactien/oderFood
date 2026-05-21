import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import CommentList from "./CommentList";

import CommentForm from "./CommentForm";
import { createComment, deleteComment, getCommentsByProduct } from "../../../redux/commentSlice";

const ProductReviews = ({ productId }) => {
  const dispatch = useDispatch();

  const { comments, loading } = useSelector(
    (state) => state.comments,
  );

  const user = useSelector((state) => state.auth.user);

  const [content, setContent] = useState("");

  /**
   * FETCH COMMENTS
   */
  useEffect(() => {
    if (productId) {
      dispatch(getCommentsByProduct(productId));
    }
  }, [dispatch, productId]);

  /**
   * SUBMIT
   */
  const handleSubmit = async () => {
    if (!content.trim()) {
      return toast.warning("Nhập nội dung!");
    }

    try {
      await dispatch(
        createComment({
          user: user._id,
          product: productId,
          content,
          rating: 5,
        }),
      ).unwrap();

      toast.success("Gửi bình luận thành công!");

      setContent("");
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra");
    }
  };

  /**
   * DELETE
   */
  const handleDelete = async (commentId) => {
    try {
      await dispatch(deleteComment(commentId)).unwrap();

      toast.success("Xóa bình luận thành công!");
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra");
    }
  };

  return (
    <div className="review">
      <h3>Bình luận</h3>

      <div className="review__wrapper">
        {/* LEFT */}
        <CommentList
          comments={comments}
          loading={loading}
          user={user}
          handleDelete={handleDelete}
        />

        {/* RIGHT */}
        <CommentForm
          user={user}
          content={content}
          setContent={setContent}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ProductReviews;