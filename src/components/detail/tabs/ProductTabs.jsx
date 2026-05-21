import React, { useState } from "react";

import "./styles/ProductTabs.css";

import ProductDescription from "./ProductDescription";
import ProductReviews from "./ProductReviews";

const ProductTabs = ({
  description,
  ingredients = [],
  productId,
  reviews,
}) => {
  const [activeTab, setActiveTab] = useState("desc");

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
          Đánh giá ({reviews})
        </button>
      </div>

      {/* CONTENT */}
      <div className="tabs__content">
        {activeTab === "desc" && (
          <ProductDescription
            description={description}
            ingredients={ingredients}
          />
        )}

        {activeTab === "review" && (
          <ProductReviews
            productId={productId}
            reviews={reviews}
          />
        )}
      </div>
    </div>
  );
};

export default ProductTabs;