import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Forgot({ setMode }) {
  return (
    <>
      <h2>Quên Mật Khẩu</h2>
      <p>Nhập email để khôi phục mật khẩu của bạn</p>

      {/* Email */}
      <div className="form-group">
        <label>Email đăng ký</label>

        <div className="input-box">
          <EnvelopeIcon className="icon" />
          <input placeholder="Nhập email của bạn" />
        </div>
      </div>

      <button className="primary">Lấy Lại Mật Khẩu</button>

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