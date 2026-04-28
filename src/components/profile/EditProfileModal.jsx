import { useState, useEffect } from "react";
import "../styles/profile/Confirm.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/authSlice";

export default function EditProfileModal({ open, onClose }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        username: user.username || "",
      });
    }
  }, [user]);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) return toast.error(data);

      dispatch(updateUser(data.user));

      toast.success("Cập nhật thành công 🎉");
      onClose();
    } catch (err) {
      toast.error("Lỗi server");
    }
  };

  return (
    <div className="modal_logout">
      <div className="modal__overlay" onClick={onClose}></div>

      <div className="modal__box">
        <h3>👤 Sửa hồ sơ</h3>
        <p>Cập nhật thông tin cá nhân</p>

        {/* GRID 2 CỘT */}
        <div className="form-grid">
          <div>
            <label className="input-label">Họ tên</label>
            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="input-label">Email</label>
            <input
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="input-label">Số điện thoại</label>
            <input
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </div>

          <div>
            <label className="input-label">Tên tài khoản</label>
            <input
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
          </div>
        </div>

        <div className="modal__actions">
          <button className="outline" onClick={onClose}>
            Huỷ
          </button>

          <button className="danger" onClick={handleSubmit}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}