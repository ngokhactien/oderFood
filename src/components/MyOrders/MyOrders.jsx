import {
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

import "./styles/MyOrders.css";

import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { getMyOrders } from "../../redux/admin/checkout/checkoutSlice";

export default function MyOrders() {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.checkout);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  // =========================
  // FORMAT DATE
  // =========================
  const formatDate = (date) => {
    return new Date(date).toLocaleString("vi-VN");
  };

  // =========================
  // STATUS
  // =========================
  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";

      case "confirmed":
        return "Đã xác nhận";

      case "shipping":
        return "Đang giao";

      case "completed":
        return "Hoàn thành";

      case "cancelled":
        return "Đã hủy";

      default:
        return status;
    }
  };

  if (loading) {
    return <div className="orders-page">Đang tải...</div>;
  }

  return (
    <div className="orders-page">
      {/* HEADER */}
      <div className="orders-header">
        <div>
          <h1>ĐƠN HÀNG CỦA TÔI</h1>

          <p>Quản lý và theo dõi đơn hàng của bạn</p>
        </div>

        <div className="total-order-box">
          <span>{orders.length}</span>

          <p>Tổng đơn</p>
        </div>
      </div>

      {/* EMPTY */}
      {!orders.length && (
        <div className="empty-order">Chưa có đơn hàng nào</div>
      )}

      {/* ORDER LIST */}
      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          {/* TOP */}
          <div className="order-top">
            <div className="order-info">
              <div className="info-item">
                <ClipboardDocumentListIcon className="top-icon" />

                <span>{order.orderCode}</span>
              </div>

              <div className="info-item">
                <CalendarDaysIcon className="top-icon" />

                <span>{formatDate(order.createdAt)}</span>
              </div>
            </div>

            <div className="status">
              <ExclamationCircleIcon className="status-icon" />

              {getStatusText(order.orderStatus)}
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="product-list">
            {order.items?.map((product, index) => (
              <div className="product-item" key={index}>
                <img src={product.image} alt={product.name} />

                <div className="product-content">
                  <h3>{product.name}</h3>

                  {product.optionLabel && (
                    <p className="option-label">{product.optionLabel}</p>
                  )}

                  <div className="product-meta">
                    <span className="price">
                      {product.price.toLocaleString()}đ
                    </span>

                    <span className="qty">x{product.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM */}
          <div className="order-bottom">
            <div className="total">
              Tổng thanh toán:
              <strong>{order.totalPrice.toLocaleString()}đ</strong>
            </div>

            <NavLink to={`/my-orders/${order._id}`} className="detail-btn">
              Xem chi tiết
              <ChevronRightIcon className="btn-arrow" />
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
}
