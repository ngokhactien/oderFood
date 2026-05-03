import { useState } from "react";
import "../styles/table/OrderRequest.css";

export default function OrderRequest() {
  const [selectedTable, setSelectedTable] = useState("Bàn 10 / Lầu 2");

  const requests = [
    {
      id: 1,
      table: "Bàn 10 / Lầu 2",
      time: "vài giây trước",
      items: [
        { name: "Bia Hà Nội", qty: 2, price: 30000 },
        { name: "Đĩa thịt nguội Tây Ban Nha hảo hạng", qty: 1, price: 125000 }
      ]
    }
  ];

  const current = requests.find(r => r.table === selectedTable);

  return (
    <div className="order-container">
      {/* LEFT */}
      <div className="order-sidebar">
        {requests.map((r) => (
          <div
            key={r.id}
            className={`table-item ${
              selectedTable === r.table ? "active" : ""
            }`}
            onClick={() => setSelectedTable(r.table)}
          >
            <div className="table-name">{r.table}</div>
            <div className="table-time">{r.time}</div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="order-content">
        <h3>Yêu cầu gọi món từ {current.table}</h3>

        <div className="order-list">
          {current.items.map((item, index) => (
            <div key={index} className="order-row">
              <div className="left">
                {item.qty}x {item.name}
              </div>
              <div className="right">
                {item.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="order-actions">
          <button className="btn cancel">Từ chối</button>
          <button className="btn confirm">Xác nhận</button>
        </div>
      </div>
    </div>
  );
}