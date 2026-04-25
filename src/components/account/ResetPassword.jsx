import { LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = async () => {
    // 🔥 validate
    if (!form.password || !form.confirmPassword) {
      return toast.error("Vui lòng nhập đầy đủ");
    }

    if (form.password.length < 6) {
      return toast.error("Mật khẩu tối thiểu 6 ký tự");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Mật khẩu không khớp");
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data);
      }

      toast.success("Đổi mật khẩu thành công 🎉");

      // 👉 chuyển về login
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error("Lỗi server");
    }
  };

  return (
    <div className="auth-container">
      <h2>Đặt Lại Mật Khẩu</h2>
      <p>Nhập mật khẩu mới của bạn</p>

      {/* Password */}
      <div className="form-group">
        <label>Mật khẩu mới</label>
        <div className="input-box">
          <LockClosedIcon className="icon" />
          <input
            name="password"
            type={showPass ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu mới"
          />

          <div className="eye" onClick={() => setShowPass(!showPass)}>
            {showPass ? <EyeIcon className="icon" /> : <EyeSlashIcon className="icon" />}
          </div>
        </div>
      </div>

      {/* Confirm */}
      <div className="form-group">
        <label>Xác nhận mật khẩu</label>
        <div className="input-box">
          <LockClosedIcon className="icon" />
          <input
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu"
          />

          <div className="eye" onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? <EyeIcon className="icon" /> : <EyeSlashIcon className="icon" />}
          </div>
        </div>
      </div>

      <button className="primary" onClick={handleReset}>
        Đổi Mật Khẩu
      </button>
    </div>
  );
}