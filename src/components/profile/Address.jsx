import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../styles/profile/address.css";
import { useDispatch } from "react-redux";
import { updateAddresses } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Address() {
  const addresses = useSelector((state) => state.auth.user?.addresses || []);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // 🔥 state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editAddress, setEditAddress] = useState("");

  // ✅ FIX BUG: sync user → input
  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  // 🔥 ADD ADDRESS
  const handleAdd = async () => {
    if (loading) return; // 🔥 CHẶN DOUBLE CLICK
    // validate
    if (!fullName.trim() || !phone.trim() || !newAddress.trim()) {
      return toast.warning("Vui lòng nhập đầy đủ thông tin");
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.warning("Bạn cần đăng nhập");
        return;
      }

      if (addresses.length >= 5) {
        return toast.warning("Bạn chỉ được thêm tối đa 5 địa chỉ");
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName: fullName.trim(),
            phone: phone.trim(),
            address: newAddress.trim(),
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.warning(data);
        return;
      }

      // 🔥 UPDATE REDUX
      dispatch(updateAddresses(data.addresses));

      // reset address thôi (giữ lại name + phone cho tiện)
      setNewAddress("");

      toast.success("Thêm địa chỉ thành công 🎉");
    } catch (err) {
      console.log(err);
      toast.error("Lỗi server");
    } finally {
      setLoading(false);
    }
  };

  // DELETE ADDRESS
  const handleDelete = async (id) => {
    if (!window.confirm("Xoá địa chỉ này?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/address/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) return toast.warning(data);

      dispatch(updateAddresses(data.addresses));
      toast.success("Đã xoá địa chỉ");
    } catch (err) {
      toast.error("Lỗi server");
    }
  };

  // UPDATE ADDRESS
  const handleUpdate = async (id) => {
    if (!editAddress.trim()) return toast.warning("Nhập địa chỉ");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/address/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            address: editAddress,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) return toast.warning(data);

      dispatch(updateAddresses(data.addresses));

      setEditingId(null);
      setEditAddress("");

      toast.success("Cập nhật thành công");
    } catch (err) {
      toast.error("Lỗi server");
    }
  };

  return (
    <div className="address">
      {/* HEADER */}
      <div className="address__header">
        <h2>Quản lý địa chỉ</h2>
        <p>Thêm và quản lý địa chỉ giao hàng của bạn</p>
      </div>

      {/* LIST ADDRESS */}
      <div className="address__list">
        {addresses.length === 0 && <p>Chưa có địa chỉ</p>}

        {addresses.map((item, index) => (
          <div className="address__card" key={item._id || index}>
            <div style={{width: '70%'}}>
              <p className="title">ĐỊA CHỈ {index + 1}</p>

              <p className="text">
                <strong>{item.fullName}</strong> ({item.phone})
              </p>

              {/* 🔥 EDIT MODE */}
              {editingId === item._id ? (
                <>
                  <textarea
                    className="card-textarea"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                  />

                  <div className="actions">
                    <button
                      className="primary"
                      onClick={() => handleUpdate(item._id)}
                    >
                      Lưu
                    </button>

                    <button
                      className="outline"
                      onClick={() => setEditingId(null)}
                    >
                      Huỷ
                    </button>
                  </div>
                </>
              ) : (
                <p className="text">{item.address}</p>
              )}
            </div>

            {/* 🔥 ACTION ICON */}
            <div className="address__actions">
              {/* EDIT luôn có */}
              <PencilSquareIcon
                className="icon edit"
                onClick={() => {
                  setEditingId(item._id);
                  setEditAddress(item.address);
                }}
              />

              {/* ❌ KHÔNG PHẢI DEFAULT → cho delete */}
              {!item.isDefault && (
                <TrashIcon
                  className="icon delete"
                  onClick={() => handleDelete(item._id)}
                />
              )}

              {item.isDefault && <span className="default">Mặc định</span>}
            </div>
          </div>
        ))}
      </div>

      {/* ADD NEW */}
      <div className="address__add">
        <h3>Thêm địa chỉ mới</h3>

        {/* FULLNAME */}
        <label>Họ và tên *</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Nhập tên người nhận"
        />

        {/* PHONE */}
        <label>Số điện thoại *</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Nhập số điện thoại"
        />

        {/* ADDRESS */}
        <label>Địa chỉ *</label>
        <textarea
          placeholder="Nhập địa chỉ chi tiết (số nhà, đường, phường/xã...)"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />

        <div className="actions">
          <button className="primary" onClick={handleAdd} disabled={loading}>
            {loading ? "Đang thêm..." : "+ Thêm địa chỉ"}
          </button>

          <button className="outline" onClick={() => setNewAddress("")}>
            Xoá nhập
          </button>
        </div>
      </div>
    </div>
  );
}
