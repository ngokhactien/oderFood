import {
  EnvelopeIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  LockClosedIcon,
  CheckIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Register({ setMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <>
      <h2>Đăng Ký Tài Khoản</h2>
      <p>Tạo tài khoản mới để mua sắm</p>

      <div className="grid">
        {/* Email */}
        <div className="form-group">
          <label>Email *</label>
          <div className="input-box">
            <EnvelopeIcon className="icon" />
            <input placeholder="Nhập địa chỉ email" />
          </div>
        </div>

        {/* Họ tên */}
        <div className="form-group">
          <label>Họ và tên *</label>
          <div className="input-box">
            <UserIcon className="icon" />
            <input placeholder="Nhập họ và tên" />
          </div>
        </div>

        {/* Username */}
        <div className="form-group">
          <label>Tên đăng nhập *</label>
          <div className="input-box">
            <UserIcon className="icon" />
            <input placeholder="Nhập tên đăng nhập" />
          </div>
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Số điện thoại *</label>
          <div className="input-box">
            <PhoneIcon className="icon" />
            <input placeholder="Nhập số điện thoại" />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="form-group">
        <label>Địa chỉ *</label>
        <div className="input-box">
          <MapPinIcon className="icon" />
          <input placeholder="Nhập địa chỉ" />
        </div>
      </div>

      <div className="grid">
        {/* Password */}
        <div className="form-group">
          <label>Mật khẩu *</label>

          <div className="input-box">
            <LockClosedIcon className="icon" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
            />

            {/* ICON MẮT */}
            <div className="eye" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeIcon className="icon" />
              ) : (
                <EyeSlashIcon className="icon" />
              )}
            </div>
          </div>
        </div>

        {/* Confirm */}
        <div className="form-group">
          <label>Xác nhận mật khẩu *</label>
          <div className="input-box">
            <CheckIcon className="icon" />
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
            />
            {/* ICON MẮT */}
            <div className="eye" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? (
                <EyeIcon className="icon" />
              ) : (
                <EyeSlashIcon className="icon" />
              )}
            </div>
          </div>
        </div>
      </div>

      <button className="primary">Đăng Ký</button>

      <div className="divider">hoặc</div>

      <p>Đã có tài khoản?</p>
      <button className="outline" onClick={() => setMode("login")}>
        Đăng Nhập Ngay
      </button>
    </>
  );
}
