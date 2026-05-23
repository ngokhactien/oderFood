// OrderDetail.jsx

import {
  ClipboardDocumentListIcon,
  ExclamationCircleIcon,
  CalendarDaysIcon,
  ClockIcon,
  ShoppingBagIcon,
  CheckIcon,
  TruckIcon,
  UserIcon,
  MapPinIcon,
  DocumentTextIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

import './styles/MyOrderDetail.css'

export default function MyOrderDetail() {
  const products = [
    {
      id: 1,
      name: "Mì Ý Rau Củ Đút Lò",
      price: "70,000đ",
      total: "70,000đ",
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=300",
    },
    {
      id: 2,
      name: "Burger Tôm",
      price: "40,000đ",
      total: "40,000đ",
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300",
    },
  ];

  return (
    <div className="order-detail-page">
      {/* Header */}
      <div className="detail-header">
        <div>
          <h1>
            <ClipboardDocumentListIcon className="title-icon" />
            Chi Tiết Đơn Hàng #102
          </h1>

          <p>Theo dõi trạng thái và thông tin đơn hàng của bạn</p>
        </div>

        <div className="status-badge">
          <ExclamationCircleIcon className="status-icon" />
          Chờ xác nhận
        </div>
      </div>

      {/* Info */}
      <div className="info-grid">
        <div className="info-card">
          <CalendarDaysIcon className="info-icon" />

          <div>
            <span>Ngày đặt hàng</span>
            <strong>13:46 10-02-2026</strong>
          </div>
        </div>

        <div className="info-card">
          <ClockIcon className="info-icon" />

          <div>
            <span>Giao hàng dự kiến</span>
            <strong>13:46 15-02-2026</strong>
          </div>
        </div>

        <div className="info-card">
          <ShoppingBagIcon className="info-icon" />

          <div>
            <span>Trạng thái đơn hàng</span>
            <strong className="orange">Chờ xác nhận</strong>
          </div>
        </div>
      </div>

      {/* Tracking */}
      <div className="section">
        <h2>Theo Dõi Đơn Hàng</h2>

        <div className="tracking">
          <div className="line"></div>

          <div className="step active">
            <div className="circle">
              <CheckIcon />
            </div>

            <h4>Đơn hàng đã đặt</h4>
            <p>Chờ xác nhận</p>
          </div>

          <div className="step">
            <div className="circle">
              <UserIcon />
            </div>

            <h4>Đã xác nhận</h4>
            <p>Shop đã xác nhận đơn</p>
          </div>

          <div className="step">
            <div className="circle">
              <TruckIcon />
            </div>

            <h4>Đang giao hàng</h4>
            <p>Đơn hàng đang trên đường</p>
          </div>

          <div className="step">
            <div className="circle">
              <CheckIcon />
            </div>

            <h4>Giao thành công</h4>
            <p>Đơn hàng đã được giao</p>
          </div>
        </div>
      </div>

      {/* Product */}
      <div className="section">
        <h2>
          <CubeIcon className="section-icon" />
          Sản Phẩm Đã Đặt (2 sản phẩm)
        </h2>

        <div className="product-grid">
          {products.map((item) => (
            <div className="product-card" key={item.id}>
              <div className="left">
                <img src={item.image} alt="" />

                <div>
                  <h3>{item.name}</h3>

                  <div className="meta">
                    <span className="price">{item.price}</span>
                    <span className="qty">× {item.quantity}</span>
                  </div>
                </div>
              </div>

              <div className="right">
                <span>Thành tiền:</span>
                <strong>{item.total}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="bottom-grid">
        {/* Shipping */}
        <div className="box">
          <h2>
            <UserIcon className="section-icon" />
            Thông Tin Nhận Hàng
          </h2>

          <div className="info-row">
            <span>
              <UserIcon className="mini-icon" />
              Họ và tên:
            </span>

            <strong>Nguyễn Anh Lộc</strong>
          </div>

          <div className="info-row">
            <span>
              <MapPinIcon className="mini-icon" />
              Địa chỉ:
            </span>

            <strong>Quận 1, HCM</strong>
          </div>

          <div className="info-row">
            <span>
              <DocumentTextIcon className="mini-icon" />
              Ghi chú:
            </span>

            <strong>Giao nhanh nha shop</strong>
          </div>
        </div>

        {/* Total */}
        <div className="box">
          <h2>
            <ClipboardDocumentListIcon className="section-icon" />
            Tổng Đơn Hàng
          </h2>

          <div className="summary-row">
            <span>Tổng tiền hàng:</span>
            <strong>110,000đ</strong>
          </div>

          <div className="summary-row">
            <span>Phí vận chuyển:</span>
            <strong className="green">Miễn phí</strong>
          </div>

          <div className="total-box">
            <span>Tổng thanh toán:</span>
            <strong>110,000đ</strong>
          </div>
        </div>
      </div>
    </div>
  );
}