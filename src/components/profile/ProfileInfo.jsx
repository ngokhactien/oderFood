import React, { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ChangePasswordModal from "./ChangePasswordModal";
import "../styles/profile/ProfileInfo.css";

export default function ProfileInfo() {
  const user = useSelector((state) => state.auth.user);
  const defaultAddress = user.addresses?.find((item) => item.isDefault);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="profile__content">
      <div className="content-header">
        <div>
          <h2>Thông tin tài khoản</h2>
          <p>Quản lý thông tin cá nhân của bạn</p>
        </div>

        <button className="outline">
          <PencilSquareIcon className="icon" />
          Sửa hồ sơ
        </button>
      </div>

      <div className="info">
        <div className="row">
          <span>Họ tên</span>
          <span>{user.name}</span>
        </div>

        <div className="row">
          <span>Email</span>
          <span>{user.email}</span>
        </div>

        <div className="row">
          <span>Số điện thoại</span>
          <span>{user.phone}</span>
        </div>

        <div className="row">
          <span>Tên tài khoản</span>
          <span>{user.username}</span>
        </div>

        <div className="row">
          <span>Mật khẩu</span>
          <span>********</span>
          <button
            className="link-btn"
            onClick={() => setShowChangePassword(true)}
          >
            Thay đổi
          </button>
        </div>

        <div className="row">
          <span>Địa chỉ</span>

          <div>
            {defaultAddress ? (
              <div>
                {defaultAddress.fullName}({defaultAddress.phone})
                <p>{defaultAddress.address}</p>
              </div>
            ) : (
              <span>Chưa có địa chỉ</span>
            )}
          </div>

          <NavLink to="/address" className="link-btn">
            Thêm địa chỉ
          </NavLink>
        </div>
      </div>
      <ChangePasswordModal
        open={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  );
}
