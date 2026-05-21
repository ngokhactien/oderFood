import React from "react";

import { StarIcon } from "@heroicons/react/24/solid";
import './styles/CommentForm.css'
const CommentForm = ({
  user,
  content,
  setContent,
  handleSubmit,
  rating,
  setRating,
}) => {
  if (!user) {
    return (
      <div className="comment-box">
        <div className="login-box">
          <div className="icon">👤</div>

          <p>Vui lòng đăng nhập để bình luận</p>

          <button onClick={() => (window.location.href = "/login")}>
            Đăng nhập ngay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="comment-box">
      <h4>Để lại bình luận</h4>

      {/* RATING */}
      <label>Đánh giá *</label>

      <div className="rating-select">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            onClick={() => setRating(star)}
            className="rating-star"
            style={{
              opacity: star <= rating ? 1 : 0.25,
            }}
          />
        ))}
      </div>

      {/* CONTENT */}
      <label>Nội dung *</label>

      <textarea
        placeholder="Nhập nội dung bình luận..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* BUTTON */}
      <button className="btn-submit" onClick={handleSubmit}>
        Gửi bình luận
      </button>
    </div>
  );
};

export default CommentForm;