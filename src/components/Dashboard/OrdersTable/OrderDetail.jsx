import { useState } from "react";
import "./styles/OrderDetail.css";
import { NavLink, useParams } from "react-router-dom";

export default function OrderDetail() {
  const [status, setStatus] = useState("Đã xác nhận");
  const { mode } = useParams();

  const isEdit = mode === "E";

  const products = [
    {
      id: 1,
      name: "Cơm Gà Nướng",
      price: "65,000₫",
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=300",
    },
    {
      id: 2,
      name: "Pizza Hải Sản",
      price: "90,000₫",
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300",
    },
    {
      id: 3,
      name: "Gà Rán",
      price: "120,000₫",
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1562967916-eb82221dfb92?q=80&w=300",
    },
    {
      id: 4,
      name: "Mì Ý Bò Bằm",
      price: "45,000₫",
      qty: 2,
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=300",
    },
  ];

  return (
    <div className="order-detail">
      {/* breadcrumb */}
      <div className="order-breadcrumb">
       <NavLink to={'/admin/orders'}> Đơn hàng </NavLink> / <span>Chi tiết đơn hàng</span>{" "}
        <span className={`order-mode ${isEdit ? "edit" : "view"}`}>{mode}</span>
      </div>

      {/* product list */}
      <div className="order-product-grid">
        {products.map((item) => (
          <div className="order-product-card" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div className="order-product-info">
              <h3>{item.name}</h3>

              <div className="order-product-bottom">
                <span className="order-price">{item.price}</span>

                <span>x{item.qty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* bottom section */}
      <div className="order-bottom-grid">
        {/* status */}
        <div className="order-card">
          <h2>
            Trạng thái đơn hàng:
            <span className="order-status-text"> {status}</span>
          </h2>

          <div className="order-form-group">
            <label>Trạng thái</label>

            <select
              value={status}
              disabled={!isEdit}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Chờ xác nhận</option>
              <option>Đã xác nhận</option>
              <option>Đang giao</option>
              <option>Giao thành công</option>
            </select>
          </div>

          <button disabled={!isEdit} className="order-update-btn">
            Cập nhật
          </button>
        </div>

        {/* order info */}
        <div className="order-card">
          <h2>Thông tin đơn hàng</h2>

          <div className="order-info-row">
            <span>Tên khách hàng</span>
            <strong>Nguyễn Anh Lộc</strong>
          </div>

          <div className="order-info-row">
            <span>Số điện thoại</span>
            <strong>0336999111</strong>
          </div>

          <div className="order-info-row">
            <span>Địa chỉ giao hàng</span>
            <strong>Quận 5, HCM</strong>
          </div>

          <div className="order-info-row">
            <span>Thời gian</span>
            <strong>13:57 10-02-2026</strong>
          </div>

          <div className="order-info-row">
            <span>Tổng tiền hàng</span>
            <strong>365,000₫</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
