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
import { toast } from "react-toastify";

export default function Register({ setMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // FORM DATA
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  // ERROR STATE
  const [errors, setErrors] = useState({});

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // xoá lỗi khi nhập lại
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // VALIDATE
  const validate = () => {
    let newErrors = {};

    if (!form.email) newErrors.email = "Nhập email";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email không hợp lệ";

    if (!form.name) newErrors.name = "Nhập họ tên";
    if (!form.username) newErrors.username = "Nhập username";
    if (!form.phone) newErrors.phone = "Nhập SĐT";
    if (!form.address) newErrors.address = "Nhập địa chỉ";

    if (!form.password) newErrors.password = "Nhập mật khẩu";
    else if (form.password.length < 6)
      newErrors.password = "Mật khẩu >= 6 ký tự";

    if (!form.confirmPassword) newErrors.confirmPassword = "Xác nhận mật khẩu";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Mật khẩu không khớp";

    setErrors(newErrors);

    // show toast lỗi đầu tiên
    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0]);
      return false;
    }

    return true;
  };

  // SUBMIT
  const handleRegister = async () => {
    if (!validate()) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          email: form.email,
          password: form.password,
          phone: form.phone,
          addresses: [
            {
              fullName: form.name,
              phone: form.phone,
              address: form.address,
            },
          ],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data);
        return;
      }

      toast.success("Đăng ký thành công 🎉");

      setTimeout(() => {
        setMode("login");
      }, 1000);
    } catch (err) {
      toast.error("Lỗi server");
    }
  };

  return (
    <>
      <h2>Đăng Ký Tài Khoản</h2>
      <p>Tạo tài khoản mới để mua sắm</p>

      <div className="grid">
        {/* Email */}
        <div className="form-group">
          <label>Email *</label>
          <div className={`input-box ${errors.email ? "error" : ""}`}>
            <EnvelopeIcon className="icon" />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Nhập email"
            />
          </div>
        </div>

        {/* Họ tên */}
        <div className="form-group">
          <label>Họ và tên *</label>
          <div className={`input-box ${errors.name ? "error" : ""}`}>
            <UserIcon className="icon" />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nhập họ tên"
            />
          </div>
        </div>

        {/* Username */}
        <div className="form-group">
          <label>Tên đăng nhập *</label>
          <div className={`input-box ${errors.username ? "error" : ""}`}>
            <UserIcon className="icon" />
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Số điện thoại *</label>
          <div className={`input-box ${errors.phone ? "error" : ""}`}>
            <PhoneIcon className="icon" />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="SĐT"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="form-group">
        <label>Địa chỉ *</label>
        <div className={`input-box ${errors.address ? "error" : ""}`}>
          <MapPinIcon className="icon" />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Nhập địa chỉ"
          />
        </div>
      </div>

      <div className="grid">
        {/* Password */}
        <div className="form-group">
          <label>Mật khẩu *</label>
          <div className={`input-box ${errors.password ? "error" : ""}`}>
            <LockClosedIcon className="icon" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Mật khẩu"
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

        {/* Confirm */}
        <div className="form-group">
          <label>Xác nhận mật khẩu *</label>
          <div className={`input-box ${errors.confirmPassword ? "error" : ""}`}>
            <CheckIcon className="icon" />
            <input
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu"
            />
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

      <button className="primary" onClick={handleRegister}>
        Đăng Ký
      </button>

      <div className="divider">hoặc</div>

      <p>Đã có tài khoản?</p>
      <button className="outline" onClick={() => setMode("login")}>
        Đăng Nhập Ngay
      </button>
    </>
  );
}
