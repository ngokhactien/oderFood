import React, { useState } from "react";
import "../styles/detail/ProductTabs.css";
import { useSelector } from "react-redux";

const commentsData = [
  {
    id: 1,
    name: "Nguyễn Anh Lộc",
    time: "2026-02-10 13:44:24",
    content: "Món ăn ngon nha hihi",
  },
  {
    id: 2,
    name: "Nguyễn Bảo Long",
    time: "2026-02-08 23:50:29",
    content: "HDPE ngon lun",
  },
];

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("desc");
  const [content, setContent] = useState("");

  const user = useSelector((state) => state.auth.user);

  const handleSubmit = () => {
    if (!content.trim()) return alert("Nhập nội dung!");
    setContent("");
  };

  return (
    <div className="product-tabs">
      {/* HEADER */}
      <div className="tabs__header">
        <button
          className={activeTab === "desc" ? "active" : ""}
          onClick={() => setActiveTab("desc")}
        >
          Mô tả sản phẩm
        </button>

        <button
          className={activeTab === "review" ? "active" : ""}
          onClick={() => setActiveTab("review")}
        >
          Đánh giá ({commentsData.length})
        </button>
      </div>

      {/* CONTENT */}
      <div className="tabs__content">
        {activeTab === "desc" && (
          <div className="desc">
            <p>Mô tả sản phẩm...</p>
          </div>
        )}

        {activeTab === "review" && (
          <div className="review">
            <h3>Bình luận</h3>

            <div className="review__wrapper">
              {/* LEFT */}
              <div className="comments">
                {commentsData.map((c) => (
                  <div className="comment" key={c.id}>
                    <div className="avatar" />

                    <div className="comment__body">
                      <div className="name">{c.name}</div>
                      <div className="time">{c.time}</div>
                      <div className="text">{c.content}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT */}
              <div className="comment-box">
                {user ? (
                  <>
                    <h4>Để lại bình luận</h4>

                    <label>Nội dung *</label>

                    <textarea
                      placeholder="Nhập nội dung bình luận của bạn..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />

                    <button className="btn-submit" onClick={handleSubmit}>
                      ⚠ Gửi bình luận
                    </button>
                  </>
                ) : (
                  <div className="login-box">
                    <div className="icon">👤</div>
                    <p>Vui lòng đăng nhập để có thể bình luận</p>
                    <button
                      onClick={() => (window.location.href = "/login")}
                    >
                      Đăng nhập ngay
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;