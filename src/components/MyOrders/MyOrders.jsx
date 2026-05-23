// MyOrders.jsx

import {
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import './styles/MyOrders.css'
import { NavLink } from "react-router-dom";

export default function MyOrders() {
  const orders = [
    {
      id: 102,
      date: "13:46 10-02-2026",
      status: "Chờ xác nhận",
      total: "110,000đ",
      products: [
        {
          id: 1,
          name: "Mì Ý Rau Củ Đút Lò",
          price: "70,000đ",
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=300",
        },
        {
          id: 2,
          name: "Burger Tôm",
          price: "40,000đ",
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300",
        },
      ],
    },
    {
      id: 102,
      date: "13:46 10-02-2026",
      status: "Chờ xác nhận",
      total: "110,000đ",
      products: [
        {
          id: 1,
          name: "Mì Ý Rau Củ Đút Lò",
          price: "70,000đ",
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=300",
        },
        {
          id: 2,
          name: "Burger Tôm",
          price: "40,000đ",
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300",
        },
      ],
    },
  ];

  return (
    <div className="orders-page">
      {/* Header */}
      <div className="orders-header">
        <div>
          <h1>ĐƠN HÀNG CỦA TÔI</h1>
          <p>Quản lý và theo dõi đơn hàng của bạn</p>
        </div>

        <div className="total-order-box">
          <span>1</span>
          <p>Tổng đơn</p>
        </div>
      </div>

      {/* Order List */}
      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          {/* Top */}
          <div className="order-top">
            <div className="order-info">
              <div className="info-item">
                <ClipboardDocumentListIcon className="top-icon" />
                <span>Đơn hàng #{order.id}</span>
              </div>

              <div className="info-item">
                <CalendarDaysIcon className="top-icon" />
                <span>{order.date}</span>
              </div>
            </div>

            <div className="status">
              <ExclamationCircleIcon className="status-icon" />
              {order.status}
            </div>
          </div>

          {/* Products */}
          <div className="product-list">
            {order.products.map((product) => (
              <div className="product-item" key={product.id}>
                <img src={product.image} alt={product.name} />

                <div className="product-content">
                  <h3>{product.name}</h3>

                  <div className="product-meta">
                    <span className="price">{product.price}</span>
                    <span className="qty">× {product.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="order-bottom">
            <div className="total">
              Tổng thanh toán:
              <strong>{order.total}</strong>
            </div>

            <NavLink to={`/my-orders/${order.id}`} className="detail-btn">
              Xem chi tiết
              <ChevronRightIcon className="btn-arrow" />
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
}