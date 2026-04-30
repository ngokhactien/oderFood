import { useState } from "react";

const tableList = [
  "Giao đi",
  ...Array.from({ length: 20 }, (_, i) => `Bàn ${i + 1}`),
  "Phòng VIP 1",
  "Phòng VIP"
];

export default function TableManager() {
  const [active, setActive] = useState(null);

  return (
    <div className="table_manager">
      {/* Tabs */}
      <div className="tabs">
        <button className="active">Tất cả</button>
        <button>Lầu 2</button>
        <button>Lầu 3</button>
        <button>Phòng VIP</button>

        <div className="search">🔍</div>
      </div>

      {/* Filters */}
      <div className="filters">
        <label><input type="radio" defaultChecked /> Tất cả (32)</label>
        <label><input type="radio" /> Sử dụng (2)</label>
        <label><input type="radio" /> Còn trống (30)</label>
      </div>

      {/* Grid */}
      <div className="grid">
        {tableList.map((name, i) => (
          <div
            key={i}
            className={`table ${active === i ? "selected" : ""}`}
            onClick={() => setActive(i)}
          >
            <div className="shape"></div>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}