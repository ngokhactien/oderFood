import React, { useMemo, useState } from "react";

import { StarIcon } from "@heroicons/react/24/solid";

import "./styles/CommentList.css";

const CommentList = ({
  comments = [],
  loading,
  user,
  handleDelete,
}) => {
  /**
   * STATE
   */
  const [showAll, setShowAll] = useState(false);

  /**
   * AVG RATING
   */
  const averageRating = useMemo(() => {
    if (!comments.length) return 0;

    const total = comments.reduce(
      (sum, item) => sum + (item.rating || 0),
      0,
    );

    return (total / comments.length).toFixed(1);
  }, [comments]);

  /**
   * CONDITIONS
   */
  const shouldShowButton = comments.length > 5;

  const shouldScroll = comments.length >= 10;

  /**
   * COMMENTS DISPLAY
   */
  const displayedComments = showAll
    ? comments
    : comments.slice(0, 5);

  /**
   * LOADING
   */
  if (loading) {
    return (
      <div className="loading-comment">
        Đang tải bình luận...
      </div>
    );
  }

  /**
   * EMPTY
   */
  if (comments.length === 0) {
    return (
      <div className="empty-comment">
        Chưa có bình luận nào.
      </div>
    );
  }

  return (
    <div className="comments-wrapper">
      {/* SUMMARY */}
      <div className="comments-summary">
        <div className="summary-score">
          <span className="score">
            {averageRating}
          </span>

          <span className="total">
            /5 ({comments.length} đánh giá)
          </span>
        </div>

        <div className="summary-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`summary-star ${
                star <= Math.round(averageRating)
                  ? "active"
                  : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* LIST */}
      <div
        className={`comments ${
          shouldScroll && showAll
            ? "comments-scroll"
            : ""
        }`}
      >
        {displayedComments.map((c) => (
          <div className="comment" key={c._id}>
            {/* AVATAR */}
            <div className="avatar">
              {c.user?.avatar ? (
                <img
                  src={c.user.avatar}
                  alt={c.user?.name}
                  className="avatar-img"
                />
              ) : (
                c.user?.name?.charAt(0)
              )}
            </div>

            {/* BODY */}
            <div className="comment__body">
              <div className="comment__top">
                <div>
                  <div className="name">
                    {c.user?.name}
                  </div>

                  {/* STARS */}
                  <div className="comment-stars">
                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <StarIcon
                          key={star}
                          className={`comment-star ${
                            star <= c.rating
                              ? "active"
                              : ""
                          }`}
                        />
                      ),
                    )}
                  </div>
                </div>

                {/* DELETE */}
                {user?._id === c.user?._id && (
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(c._id)
                    }
                  >
                    Xóa
                  </button>
                )}
              </div>

              {/* TIME */}
              <div className="time">
                {new Date(
                  c.createdAt,
                ).toLocaleString("vi-VN")}
              </div>

              {/* CONTENT */}
              <div className="text">
                {c.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ACTION */}
      {shouldShowButton && (
        <div className="comments-action">
          <button
            className="toggle-comments-btn"
            onClick={() =>
              setShowAll(!showAll)
            }
          >
            {showAll
              ? "Ẩn bớt bình luận"
              : `Xem thêm ${
                  comments.length - 5
                } bình luận`}
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentList;