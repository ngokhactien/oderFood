import React, { useEffect, useState } from "react";

import "./styles/ProductTabs.css";

import ProductDescription from "./ProductDescription";
import ProductReviews from "./ProductReviews";

const ProductTabs = ({
  description,
  ingredients = [],
  productId,
  reviews,
  onReloadProduct,
}) => {
  /**
   * LOAD TAB FROM LOCALSTORAGE
   */
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("product_tab") || "desc";
  });

  /**
   * SAVE TAB
   */
  useEffect(() => {
    localStorage.setItem("product_tab", activeTab);
  }, [activeTab]);

  return (
    <div className="product-tabs">
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
            onReloadProduct={onReloadProduct}
          />
        )}
      </div>
    </div>
  );
};

export default ProductTabs;