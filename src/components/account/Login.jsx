import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Login({ setMode }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <h2>Đăng Nhập</h2>
      <p>Chào mừng bạn quay trở lại</p>

      {/* Username */}
      <div className="form-group">
        <label>Tên đăng nhập</label>
        <div className="input-box">
          <UserIcon className="icon" />
          <input placeholder="Nhập tên đăng nhập" />
        </div>
      </div>

      {/* Password */}
      <div className="form-group">
        <label>Mật khẩu</label>

        <div className="input-box">
          <LockClosedIcon className="icon" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Nhập mật khẩu"
          />

          <div className="eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeIcon className="icon" />
            ) : (
              <EyeSlashIcon className="icon" />
            )}
          </div>
        </div>
      </div>

      {/* Forgot */}
      <div className="link" onClick={() => setMode("forgot")}>
        Quên mật khẩu?
      </div>

      <button className="primary">Đăng Nhập</button>

      <div className="divider">hoặc</div>

      <p>Chưa có tài khoản?</p>
      <button className="outline" onClick={() => setMode("register")}>
        Tạo Tài Khoản Mới
      </button>
    </>
  );
}
