// src/pages/AdminProductForm.jsx

import React, { useEffect, useState } from "react";
import "../../styles/Dashboard/Products/ProductForm.css";
import { NavLink, useParams } from "react-router-dom";

const ProductForm = ({ productData, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    salePrice: "",
    quantity: "",
    shortDesc: "",
    detail: "",
    category: "Pizza & Burger",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const { mode } = useParams();

  useEffect(() => {
    if (productData) {
      setFormData({
        name: productData.name || "",
        price: productData.price || "",
        salePrice: productData.salePrice || "",
        quantity: productData.quantity || "",
        shortDesc: productData.shortDesc || "",
        detail: productData.detail || "",
        category: productData.category || "Pizza & Burger",
        image: null,
      });

      setPreview(productData.image);
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        image: file,
      });

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("DATA SUBMIT:", formData);

    alert(isEdit ? "Cập nhật thành công" : "Thêm mới thành công");
  };

  return (
    <div className="admin-product-page">
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="left-content">
          <div className="product-header">
            <NavLink to="/admin/products">Sản phẩm</NavLink> /{" "}
            <span>{isEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</span>
            <span className={`product-mode ${isEdit ? "edit" : "add"}`}>
              {mode}
            </span>
          </div>
          <div className="form-group">
            <label>Tên sản phẩm</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập tên sản phẩm"
            />
          </div>

          <div className="form-group">
            <label>Giá bán thường (đ)</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="65000"
            />
          </div>

          <div className="form-group">
            <label>Giá khuyến mãi (đ)</label>

            <input
              type="number"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
              placeholder="51000"
            />
          </div>

          <div className="form-group">
            <label>Số lượng (nhập số)</label>

            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="249"
            />
          </div>

          <div className="form-group">
            <label>Mô tả ngắn</label>

            <textarea
              rows="5"
              name="shortDesc"
              value={formData.shortDesc}
              onChange={handleChange}
              placeholder="Nhập mô tả ngắn..."
            />
          </div>

          <div className="form-group">
            <label>Chi tiết sản phẩm</label>

            <textarea
              rows="8"
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              placeholder="Nhập chi tiết sản phẩm..."
            />
          </div>
        </div>

        <div className="right-content">
          <div className="card-box">
            <label>Hình ảnh (JPG, PNG)</label>

            <input type="file" accept="image/*" onChange={handleImage} />

            {preview && (
              <img src={preview} alt="preview" className="preview-image" />
            )}
          </div>

          <div className="card-box">
            <label>Chọn danh mục</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Pizza & Burger</option>
              <option>Gà Rán</option>
              <option>Nước Uống</option>
              <option>Combo</option>
            </select>

            <button type="submit" className="submit-btn">
              {isEdit ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
