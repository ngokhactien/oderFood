import { useState } from "react";
import "../styles/profile/address.css";

export default function Address({ addresses = [] }) {
  const [newAddress, setNewAddress] = useState("");

  const handleAdd = () => {
    if (!newAddress.trim()) return;
    console.log("Add address:", newAddress);
    setNewAddress("");
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
        {addresses.map((item, index) => (
          <div className="address__card" key={item._id || index}>
            <div>
              <p className="title">ĐỊA CHỈ {index + 1}</p>
              <p className="text">
                {item.street}, {item.district}, {item.city}
              </p>
            </div>

            {item.isDefault && (
              <span className="default">Mặc định</span>
            )}
          </div>
        ))}
      </div>

      {/* ADD NEW */}
      <div className="address__add">
        <h3>Thêm địa chỉ mới</h3>

        <label>Địa chỉ *</label>
        <textarea
          placeholder="Nhập địa chỉ chi tiết (số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố)"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />

        <div className="actions">
          <button className="primary" onClick={handleAdd}>
            + Thêm địa chỉ
          </button>

          <button className="outline">Quay lại</button>
        </div>
      </div>
    </div>
  );
}