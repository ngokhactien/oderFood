import React from "react";

const CommentList = ({
  comments,
  loading,
  user,
  handleDelete,
}) => {
  if (loading) {
    return <p>Đang tải bình luận...</p>;
  }

  if (comments.length === 0) {
    return <p>Chưa có bình luận nào.</p>;
  }

  return (
    <div className="comments">
      {comments.map((c) => (
        <div className="comment" key={c._id}>
          <div className="avatar" />

          <div className="comment__body">
            <div className="name">
              {c.user?.name}

              {user?._id === c.user?._id && (
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(c._id)}
                >
                  Xóa
                </button>
              )}
            </div>

            <div className="time">
              {new Date(c.createdAt).toLocaleString("vi-VN")}
            </div>

            <div className="text">{c.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;