import React, { useState } from "react";
import "../styles/detail/ProductTabs.css";

const commentsData = [
  {
    id: 1,
    name: "Nguyễn Bảo Long",
    time: "2026-02-08 23:45:09",
    content: "Đẹp quá, xứng đáng giá tiền, Đẹp quá, xứng đáng giá tiền Đẹp quá, xứng đáng giá tiền Đẹp quá, xứng đáng giá tiền",
  },
  {
    id: 2,
    name: "Nguyen Văn AN",
    time: "2026-02-06 12:44:16",
    content: "Sản phẩm ok nha. Sản phẩm ok nha Sản phẩm ok nha, Sản phẩm ok nha. Sản phẩm ok nha Sản phẩm ok nha Sản phẩm ok nha. Sản phẩm ok nha Sản phẩm ok nha  Sản phẩm ok nha. Sản phẩm ok nha Sản phẩm ok nha",
  },
  {
    id: 3,
    name: "Nguyen Văn AN",
    time: "2026-02-06 12:44:16",
    content: "Sản phẩm ok nha. Sản phẩm ok nha Sản phẩm ok nha, Sản phẩm ok nha. Sản phẩm ok nha Sản phẩm ok nha Sản phẩm ok nha. Sản phẩm ok nha Sản phẩm ok nha  Sản phẩm ok nha. Sản phẩm ok nha Sản phẩm ok nha",
  },
];

const ProductTabs = ({comments}) => {
  const [activeTab, setActiveTab] = useState("desc");

  return (
    <div className="tabs">
      {/* Header Tabs */}
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
          Đánh giá {comments}
        </button>
      </div>

      {/* Content */}
      <div className="tabs__content">
        {activeTab === "desc" && (
          <div className="desc">
            <p>Burger, sốt, xà lách, cà chua, bò sốt tiêu, trứng, sốt Giao hàng miễn phí 
                trong 24h (chỉ áp dụng khu vực nội thành) Trả góp lãi suất 0% qua thẻ tín dụng Visa, Master,
                 JCB, Burger, sốt, xà lách, cà chua, bò sốt tiêu, trứng, sốt Giao hàng miễn phí 
                trong 24h (chỉ áp dụng khu vực nội thành) Trả góp lãi suất 0% qua thẻ tín dụng Visa, Master,
                 JC</p>
          </div>
        )}

        {activeTab === "review" && (
          <div className="review">
            <h3>Bình luận</h3>

            <div className="review__wrapper">
              {/* LEFT: comments */}
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

              {/* RIGHT: login box */}
              <div className="login-box">
                <div className="icon">👤</div>
                <p>Vui lòng đăng nhập để có thể bình luận</p>
                <button>Đăng nhập ngay</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
