// SuccessOrder.jsx
import {
  CheckIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import './styles/SuccessOrder.css'
import { NavLink } from "react-router-dom";

export default function SuccessOrder() {
  return (
    <div className="success-page">
      <div className="success-card">
        {/* Header */}
        <div className="success-header">
          <div className="icon-wrapper">
            <CheckIcon className="check-icon" />
          </div>

          <h2>Đặt hàng thành công</h2>
          <p>Đơn hàng của bạn đã được tiếp nhận và đang xử lý</p>
        </div>

        {/* Body */}
        <div className="success-body">
          <div className="info-box">
            <div className="info-row">
              <span>TRẠNG THÁI</span>
              <strong>Chưa xác nhận</strong>
            </div>

            <div className="info-row">
              <span>THỜI GIAN</span>
              <strong>Vừa xong</strong>
            </div>
          </div>

          {/* Buttons */}
          <div className="button-group">
            <NavLink to={'my-orders'} className="btn primary">
              <ClipboardDocumentListIcon className="btn-icon" />
              Xem đơn hàng
            </NavLink>

            <NavLink to={'/'} className="btn secondary">
              <HomeIcon className="btn-icon" />
              Về trang chủ
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}