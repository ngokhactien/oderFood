// src/pages/AdminImportInventory.jsx

import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Dashboard/Inventory/AdminImportInventory.css";

const AdminImportInventory = () => {
  const products = [
    {
      id: 1,
      name: "Burger Bò Sốt Tiêu Đen",
      stock: 249,
      price: 65000,
    },
    {
      id: 2,
      name: "Burger Gà Quay Flava",
      stock: 90,
      price: 60000,
    },
  ];

  const [selectedId, setSelectedId] = useState(1);
  const [importQty, setImportQty] = useState(11);
  const [importPrice, setImportPrice] = useState("");

  const selectedProduct = useMemo(() => {
    return products.find((item) => item.id === Number(selectedId));
  }, [selectedId]);

  const totalQuantity =
    Number(selectedProduct?.stock || 0) + Number(importQty || 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      productId: selectedId,
      importQty,
      importPrice,
    };

    console.log(data);

    alert("Nhập hàng thành công");
  };

  return (
    <div className="inventory-import-page">
      <form onSubmit={handleSubmit}>
        <div className="inventory-import-wrapper">
          {/* LEFT */}
          <div className="inventory-import-left">
            <div className="inventory-import-header">
              <NavLink to="/admin/inventory">Quản lý kho hàng</NavLink>

              <span>/</span>

              <h2>Nhập hàng vào kho</h2>
            </div>

            {/* SELECT */}
            <div className="inventory-import-group">
              <label>
                Chọn sản phẩm <span>*</span>
              </label>

              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
              >
                {products.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} (Tồn: {item.stock})
                  </option>
                ))}
              </select>
            </div>

            {/* INFO */}
            <div className="inventory-product-info">
              <h3>Thông tin sản phẩm</h3>

              <div className="inventory-product-row">
                <span>Tên sản phẩm:</span>

                <strong>{selectedProduct?.name}</strong>
              </div>

              <div className="inventory-product-row">
                <span>Tồn kho hiện tại:</span>

                <strong className="stock">{selectedProduct?.stock}</strong>
              </div>

              <div className="inventory-product-row">
                <span>Giá bán hiện tại:</span>

                <strong>{selectedProduct?.price.toLocaleString()}đ</strong>
              </div>
            </div>

            {/* QTY */}
            <div className="inventory-import-group">
              <label>
                Số lượng nhập <span>*</span>
              </label>

              <input
                type="number"
                value={importQty}
                onChange={(e) => setImportQty(e.target.value)}
              />

              <small>Số lượng sản phẩm muốn nhập vào kho</small>
            </div>

            {/* PRICE */}
            <div className="inventory-import-group">
              <label>Giá nhập (tùy chọn)</label>

              <input
                type="number"
                placeholder="Nhập giá nếu muốn cập nhật"
                value={importPrice}
                onChange={(e) => setImportPrice(e.target.value)}
              />

              <small>
                Nếu nhập giá mới, hệ thống sẽ cập nhật giá bán của sản phẩm
              </small>
            </div>
          </div>

          {/* RIGHT */}
          <div className="inventory-import-right">
            <div className="inventory-total-box">
              <p>Tổng số lượng sau khi nhập</p>

              <div className="inventory-total-content">
                <span>Tổng số lượng:</span>

                <h3>{totalQuantity}</h3>
              </div>
            </div>

            <div className="inventory-import-actions">
              <button type="submit" className="confirm-btn">
                Xác nhận nhập hàng
              </button>

              <NavLink to="/admin/inventory" className="cancel-btn">
                Hủy
              </NavLink>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminImportInventory;
