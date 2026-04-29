import { useState } from "react";

export default function OrderPanel() {
  const [items, setItems] = useState([
    { id: 1, name: "Phomai dây Nga", price: 125000, qty: 1 },
    { id: 2, name: "Mint Tea", price: 15000, qty: 1 },
    { id: 3, name: "Súp kem kiểu Paris", price: 125000, qty: 1 }
  ]);

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
      )
    );
  };

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="order">
      {/* Header */}
      <div className="order-header">
        <input placeholder="Tìm khách hàng" />
      </div>

      {/* List */}
      <div className="order-list">
        {items.map((item, i) => (
          <div key={item.id} className="item">
            <div className="left">
              <b>{i + 1}. {item.name}</b>
              <small>Không có Ghi chú/Món thêm</small>
            </div>

            <div className="right">
              <div className="qty">
                <button onClick={() => updateQty(item.id, -1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
              </div>
              <div className="price">
                {(item.price * item.qty).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="order-footer">
        <div className="total">
          Tổng tiền: <b>{total.toLocaleString()}</b>
        </div>

        <button className="pay">Thanh toán</button>
        <button className="notify">Thông báo</button>
      </div>
    </div>
  );
}