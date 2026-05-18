import { useState } from "react";
import "../../common/styles/Confirm.css";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function ChangePasswordModal({ open, onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [oldError, setOldError] = useState("");

  if (!open) return null;

  const isMismatch = confirmPassword && newPassword !== confirmPassword;

  const handleSubmit = async () => {
    setOldError("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.warning("Vui lòng nhập đầy đủ");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Mật khẩu không khớp");
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        // 🔥 bắt lỗi mật khẩu cũ
        if (data === "Mật khẩu cũ không đúng") {
          setOldError(data);
        } else {
          toast.error(data);
        }
        return;
      }

      toast.success("Đổi mật khẩu thành công 🎉");
      onClose();
    } catch (err) {
      toast.error("Lỗi server"+ err);
    }
  };

  return (
    <div className="modal_logout">
      {/* overlay */}
      <div className="modal__overlay" onClick={onClose}></div>

      {/* box */}
      <div className="modal__box">
        <h3>🔒 Đổi mật khẩu</h3>
        <p>Vui lòng nhập thông tin bên dưới</p>

        {/* OLD PASSWORD (hiển thị luôn) */}
        <label className="input-label">Mật khẩu cũ</label>
        <input
          type="text"
          placeholder="Mật khẩu cũ"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className={oldError ? "error" : ""}
        />
        {oldError && <p className="error-text">{oldError}</p>}

        {/* NEW PASSWORD */}
        <label className="input-label">Mật khẩu mới</label>
        <div className={`input-group ${isMismatch ? "error" : ""}`}>
          <input
            type={showNew ? "text" : "password"}
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <span onClick={() => setShowNew(!showNew)}>
            {showNew ? <EyeSlashIcon /> : <EyeIcon />}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        <label className="input-label">Xác nhận mật khẩu</label>
        <div className={`input-group ${isMismatch ? "error" : ""}`}>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <span onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? <EyeSlashIcon /> : <EyeIcon />}
          </span>
        </div>

        {/* ERROR TEXT */}
        {isMismatch && <p className="error-text">Mật khẩu không khớp</p>}

        {/* ACTION */}
        <div className="modal__actions">
          <button className="outline" onClick={onClose}>
            Huỷ
          </button>

          <button
            className="danger"
            onClick={handleSubmit}
            disabled={isMismatch}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
