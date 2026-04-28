import { useEffect, useState } from "react";

export default function CheckoutLeft({
  addresses,
  selectedAddress,
  setSelectedAddress,
}) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    note: "",
  });

  // 👉 khi chọn address → fill vào form
  useEffect(() => {
    if (selectedAddress) {
      setForm((prev) => ({
        ...prev,
        fullName: selectedAddress.fullName || "",
        phone: selectedAddress.phone || "",
        address: selectedAddress.address || "",
      }));
    }
  }, [selectedAddress]);

  return (
    <div className="checkout-left">
      <h3 className="section-title">Thông Tin Giao Hàng</h3>

      {/* ROW */}
      <div className="form-row">
        <div className="form-group">
          <label>Họ và tên *</label>
          <input value={form.fullName} readOnly />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input value={form.email} placeholder="Nhập email..." />
        </div>
      </div>

      {/* ADDRESS */}
      <div className="form-group">
        <label>Địa chỉ giao hàng *</label>
        <input value={form.address} readOnly />
      </div>

      {/* PHONE */}
      <div className="form-group">
        <label>Số điện thoại *</label>
        <input value={form.phone} readOnly />
      </div>

      {/* NOTE */}
      <div className="form-group">
        <label>Ghi chú đơn hàng</label>
        <input
          placeholder="Ghi chú về đơn hàng (tùy chọn)"
          value={form.note}
          onChange={(e) =>
            setForm({ ...form, note: e.target.value })
          }
        />
      </div>

      {/* ADDRESS ACTION */}
      <div className="address-action-box">
        <span>⚠ Chọn địa chỉ đã lưu hoặc nhập địa chỉ mới</span>

        <div className="address-buttons">
          {addresses.map((item) => (
            <button
              key={item._id}
              className={
                selectedAddress?._id === item._id ? "active" : ""
              }
              onClick={() => setSelectedAddress(item)}
            >
              {item.isDefault ? "🏠" : "📍"} {item.fullName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}