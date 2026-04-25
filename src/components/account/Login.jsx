import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";

export default function Login({ setMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            account,
            password,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.warning(data);
        return;
      }

      dispatch(
        loginSuccess({
          user: data.user,
          token: data.token,
        }),
      );

      toast.success("Đăng nhập thành công 🎉");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Lỗi server");
    }
  };

  return (
    <>
      <h2>Đăng Nhập</h2>
      <p style={{ marginBottom: "1.5rem" }}>Chào mừng bạn quay trở lại</p>

      {/* Account */}
      <div className="form-group">
        <label>Email hoặc Username</label>
        <div className="input-box">
          <UserIcon className="icon" />
          <input
            placeholder="Nhập email hoặc username"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      <p className="forgot" onClick={() => setMode("forgot")}>
        Quên mật khẩu?
      </p>
      <button className="primary" onClick={handleLogin}>
        Đăng Nhập
      </button>

      <div className="divider">hoặc</div>

      <p>Chưa có tài khoản?</p>
      <button className="outline" onClick={() => setMode("register")}>
        Tạo Tài Khoản Mới
      </button>
    </>
  );
}
