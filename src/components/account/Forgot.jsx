import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Forgot({ setMode }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgot = async () => {
    // validate
    if (!email) {
      toast.error("Vui lòng nhập email");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email không hợp lệ");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data);
        return;
      }

      // 👉 hiện link (demo)
      console.log("RESET LINK:", data.link);

      toast.success("Đã gửi link reset (check console)");

    } catch (err) {
      toast.error("Lỗi server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Quên Mật Khẩu</h2>
      <p>Nhập email để khôi phục mật khẩu của bạn</p>

      {/* Email */}
      <div className="form-group">
        <label>Email đăng ký</label>

        <div className="input-box">
          <EnvelopeIcon className="icon" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email của bạn"
          />
        </div>
      </div>

      <button className="primary" onClick={handleForgot} disabled={loading}>
        {loading ? "Đang gửi..." : "Lấy Lại Mật Khẩu"}
      </button>

      <div className="divider">hoặc</div>

      <button className="outline" onClick={() => setMode("login")}>
        Đăng Nhập
      </button>

      <p>Chưa có tài khoản?</p>
      <button className="outline" onClick={() => setMode("register")}>
        Tạo Tài Khoản Mới
      </button>
    </>
  );
}