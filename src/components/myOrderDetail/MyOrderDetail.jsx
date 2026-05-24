// MyOrderDetail.jsx

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

import "./styles/MyOrderDetail.css";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useEffect,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getOrderDetail,
} from "../../redux/admin/checkout/checkoutSlice";

export default function MyOrderDetail() {
  const dispatch =
    useDispatch();

  const { id } =
    useParams();

  const {
    order,
    loading,
  } = useSelector(
    (state) =>
      state.checkout,
  );

  // =========================
  // FETCH DETAIL
  // =========================
  useEffect(() => {
    dispatch(
      getOrderDetail(id),
    );
  }, [dispatch, id]);

  // =========================
  // FORMAT DATE
  // =========================
  const formatDate = (
    date,
  ) => {
    return new Date(
      date,
    ).toLocaleString("vi-VN");
  };

  // =========================
  // STATUS TEXT
  // =========================
  const getStatusText = (
    status,
  ) => {
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

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="order-detail-page">
        Đang tải...
      </div>
    );
  }

  // =========================
  // NO ORDER
  // =========================
  if (!order) {
    return (
      <div className="order-detail-page">
        Không tìm thấy đơn hàng
      </div>
    );
  }

  return (
    <div className="order-detail-page">
      {/* HEADER */}
      <div className="detail-header">
        <div>
          <h1>
            <ClipboardDocumentListIcon className="title-icon" />
            Chi Tiết Đơn Hàng{" "}
            {order.orderCode}
          </h1>

          <p>
            Theo dõi trạng thái
            và thông tin đơn hàng
            của bạn
          </p>
        </div>

        <div className="status-badge">
          <ExclamationCircleIcon className="status-icon" />

          {getStatusText(
            order.orderStatus,
          )}
        </div>
      </div>

      {/* INFO */}
      <div className="info-grid">
        <div className="info-card">
          <CalendarDaysIcon className="info-icon" />

          <div>
            <span>
              Ngày đặt hàng
            </span>

            <strong>
              {formatDate(
                order.createdAt,
              )}
            </strong>
          </div>
        </div>

        <div className="info-card">
          <ClockIcon className="info-icon" />

          <div>
            <span>
              Thanh toán
            </span>

            <strong>
              {order.paymentMethod}
            </strong>
          </div>
        </div>

        <div className="info-card">
          <ShoppingBagIcon className="info-icon" />

          <div>
            <span>
              Trạng thái
            </span>

            <strong className="orange">
              {getStatusText(
                order.orderStatus,
              )}
            </strong>
          </div>
        </div>
      </div>

      {/* TRACKING */}
      <div className="section">
        <h2>
          Theo Dõi Đơn Hàng
        </h2>

        <div className="tracking">
          <div className="line"></div>

          {/* STEP 1 */}
          <div
            className={`step ${
              [
                "pending",
                "confirmed",
                "shipping",
                "completed",
              ].includes(
                order.orderStatus,
              )
                ? "active"
                : ""
            }`}
          >
            <div className="circle">
              <CheckIcon />
            </div>

            <h4>
              Đơn hàng đã đặt
            </h4>

            <p>
              Chờ xác nhận
            </p>
          </div>

          {/* STEP 2 */}
          <div
            className={`step ${
              [
                "confirmed",
                "shipping",
                "completed",
              ].includes(
                order.orderStatus,
              )
                ? "active"
                : ""
            }`}
          >
            <div className="circle">
              <UserIcon />
            </div>

            <h4>
              Đã xác nhận
            </h4>

            <p>
              Shop đã xác nhận
            </p>
          </div>

          {/* STEP 3 */}
          <div
            className={`step ${
              [
                "shipping",
                "completed",
              ].includes(
                order.orderStatus,
              )
                ? "active"
                : ""
            }`}
          >
            <div className="circle">
              <TruckIcon />
            </div>

            <h4>
              Đang giao
            </h4>

            <p>
              Đơn hàng đang giao
            </p>
          </div>

          {/* STEP 4 */}
          <div
            className={`step ${
              order.orderStatus ===
              "completed"
                ? "active"
                : ""
            }`}
          >
            <div className="circle">
              <CheckIcon />
            </div>

            <h4>
              Hoàn thành
            </h4>

            <p>
              Giao thành công
            </p>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="section">
        <h2>
          <CubeIcon className="section-icon" />

          Sản Phẩm Đã Đặt (
          {order.totalQuantity} sản phẩm)
        </h2>

        <div className="product-grid">
          {order.items?.map(
            (
              item,
              index,
            ) => (
              <div
                className="product-card"
                key={index}
              >
                <div className="left">
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div>
                    <h3>
                      {item.name}
                    </h3>

                    <div className="meta">
                      <span className="price">
                        {item.price.toLocaleString()}
                        đ
                      </span>

                      <span className="qty">
                        × {item.quantity}
                      </span>
                    </div>

                    <p className="option">
                      {item.optionLabel}
                    </p>
                  </div>
                </div>

                <div className="right">
                  <span>
                    Thành tiền:
                  </span>

                  <strong>
                    {item.totalPrice.toLocaleString()}
                    đ
                  </strong>
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="bottom-grid">
        {/* SHIPPING */}
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

            <strong>
              {
                order
                  .shippingAddress
                  ?.fullName
              }
            </strong>
          </div>

          <div className="info-row">
            <span>
              <MapPinIcon className="mini-icon" />
              Địa chỉ:
            </span>

            <strong>
              {
                order
                  .shippingAddress
                  ?.address
              }
            </strong>
          </div>

          <div className="info-row">
            <span>
              <DocumentTextIcon className="mini-icon" />
              SĐT:
            </span>

            <strong>
              {
                order
                  .shippingAddress
                  ?.phone
              }
            </strong>
          </div>

          {order.note && (
            <div className="info-row">
              <span>
                <DocumentTextIcon className="mini-icon" />
                Ghi chú:
              </span>

              <strong>
                {order.note}
              </strong>
            </div>
          )}
        </div>

        {/* TOTAL */}
        <div className="box">
          <h2>
            <ClipboardDocumentListIcon className="section-icon" />
            Tổng Đơn Hàng
          </h2>

          <div className="summary-row">
            <span>
              Tổng tiền hàng:
            </span>

            <strong>
              {order.totalPrice.toLocaleString()}
              đ
            </strong>
          </div>

          <div className="summary-row">
            <span>
              Phí vận chuyển:
            </span>

            <strong className="green">
              {order.shippingFee ===
              0
                ? "Miễn phí"
                : `${order.shippingFee.toLocaleString()}đ`}
            </strong>
          </div>

          <div className="summary-row">
            <span>
              Thanh toán:
            </span>

            <strong>
              {order.paymentMethod}
            </strong>
          </div>

          <div className="total-box">
            <span>
              Tổng thanh toán:
            </span>

            <strong>
              {(
                order.totalPrice +
                order.shippingFee
              ).toLocaleString()}
              đ
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}