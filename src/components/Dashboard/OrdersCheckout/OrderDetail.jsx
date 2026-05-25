import { useEffect, useState } from "react";

import "./styles/OrderDetail.css";

import { NavLink, useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetail,
  updateOrderStatus,
} from "../../../redux/admin/order/orderManagementSlice";

const OrderDetail = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id, mode } = useParams();

  const isEdit = mode === "edit";

  const { orderDetail, loading } = useSelector(
    (state) => state.adminOrders,
  );

  const [status, setStatus] = useState("pending");

  // =========================
  // FETCH DETAIL
  // =========================
  useEffect(() => {
    dispatch(getOrderDetail(id));
  }, [dispatch, id]);

  // =========================
  // SET STATUS
  // =========================
  useEffect(() => {
    if (orderDetail) {
      setStatus(orderDetail.orderStatus);
    }
  }, [orderDetail]);

  // =========================
  // UPDATE STATUS
  // =========================
  const handleUpdateStatus = async () => {
    await dispatch(
      updateOrderStatus({
        id,
        orderStatus: status,
      }),
    );

    navigate("/admin/orders");
  };

  // =========================
  // STATUS LABEL
  // =========================
  const getStatusLabel = (status) => {
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

  if (loading || !orderDetail) {
    return (
      <div className="order-detail-loading">
        Đang tải đơn hàng...
      </div>
    );
  }

  return (
    <div className="order-detail">
      {/* BREADCRUMB */}
      <div className="order-breadcrumb">
        <NavLink to="/admin/orders">
          Đơn hàng
        </NavLink>

        <span>/</span>

        <span>
          {isEdit
            ? "Cập nhật đơn hàng"
            : "Chi tiết đơn hàng"}
        </span>

        <span
          className={`order-mode ${
            isEdit ? "edit" : "view"
          }`}
        >
          {isEdit ? "EDIT" : "VIEW"}
        </span>
      </div>

      {/* PRODUCTS */}
      <div className="order-product-grid">
        {orderDetail.items.map((item, index) => (
          <div
            className="order-product-card"
            key={index}
          >
            <img
              src={item.image}
              alt={item.name}
            />

            <div className="order-product-info">
              <h3>{item.name}</h3>

              <div className="order-product-option">
                {item.optionLabel}
              </div>

              <div className="order-product-bottom">
                <span className="order-price">
                  {item.price.toLocaleString()}₫
                </span>

                <span>x{item.quantity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM */}
      <div className="order-bottom-grid">
        {/* STATUS */}
        <div className="order-card">
          <h2>
            Trạng thái đơn hàng:
            <span
              className={`order-status-text ${status}`}
            >
              {" "}
              {getStatusLabel(status)}
            </span>
          </h2>

          <div className="order-form-group">
            <label>Trạng thái</label>

            <select
              value={status}
              disabled={!isEdit}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option value="pending">
                Chờ xác nhận
              </option>

              <option value="confirmed">
                Đã xác nhận
              </option>

              <option value="shipping">
                Đang giao
              </option>

              <option value="completed">
                Hoàn thành
              </option>

              <option value="cancelled">
                Đã hủy
              </option>
            </select>
          </div>

          {isEdit && (
            <button
              onClick={handleUpdateStatus}
              className="order-update-btn"
            >
              Cập nhật
            </button>
          )}
        </div>

        {/* INFO */}
        <div className="order-card">
          <h2>Thông tin đơn hàng</h2>

          <div className="order-info-row">
            <span>Mã hóa đơn</span>

            <strong className="order-code">
              {orderDetail.orderCode}
            </strong>
          </div>

          <div className="order-info-row">
            <span>Tên khách hàng</span>

            <strong>
              {
                orderDetail.shippingAddress
                  ?.fullName
              }
            </strong>
          </div>

          <div className="order-info-row">
            <span>Số điện thoại</span>

            <strong>
              {
                orderDetail.shippingAddress
                  ?.phone
              }
            </strong>
          </div>

          <div className="order-info-row">
            <span>Địa chỉ giao hàng</span>

            <strong>
              {
                orderDetail.shippingAddress
                  ?.address
              }
            </strong>
          </div>

          <div className="order-info-row">
            <span>Phương thức thanh toán</span>

            <strong>
              {orderDetail.paymentMethod}
            </strong>
          </div>

          <div className="order-info-row">
            <span>Thanh toán</span>

            <strong>
              {orderDetail.paymentStatus}
            </strong>
          </div>

          <div className="order-info-row">
            <span>Thời gian</span>

            <strong>
              {new Date(
                orderDetail.createdAt,
              ).toLocaleString("vi-VN")}
            </strong>
          </div>

          <div className="order-info-row">
            <span>Tổng số lượng</span>

            <strong>
              {orderDetail.totalQuantity}
            </strong>
          </div>

          <div className="order-info-row">
            <span>Phí ship</span>

            <strong>
              {orderDetail.shippingFee.toLocaleString()}
              ₫
            </strong>
          </div>

          <div className="order-info-row">
           <div className="total">
             <span>Tổng tiền hàng</span>

            <strong>
              {orderDetail.totalPrice.toLocaleString()}
              ₫
            </strong>
           </div>
          </div>

          {orderDetail.note && (
            <div className="order-note">
              <span>Ghi chú:</span>

              <p>{orderDetail.note}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;