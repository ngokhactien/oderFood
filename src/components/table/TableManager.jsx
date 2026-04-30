import { useState, useRef } from "react";
import Pagination from "../Pagination";
import '../styles/table/TableManager.css'

export default function TableManager({ onSelectTable }) {
  const [active, setActive] = useState(0);
  const [tableCount, setTableCount] = useState(50);
  const fixedTable = "Giao đi";

  const otherTables = [
    ...Array.from({ length: tableCount }, (_, i) => `Bàn ${i + 1}`),
    "Phòng VIP 1",
    "Phòng VIP",
  ];

  // pangation
  const [page, setPage] = useState(1);
  const pageSize = 35;
  const totalPages = Math.ceil(otherTables.length / pageSize);
  const start = (page - 1) * pageSize;
  const currentTables = otherTables.slice(start, start + pageSize);

  const handlePageChange = (p) => {
    setPage(p);

    // reset selected về item đầu trang để tránh lệch index
    setActive("Giao đi");
    // scroll lên đầu
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
        <label>
          <input name="tableStatus" type="radio" defaultChecked /> Tất cả (32)
        </label>
        <label>
          <input name="tableStatus" type="radio" /> Sử dụng (2)
        </label>
        <label>
          <input name="tableStatus" type="radio" /> Còn trống (30)
        </label>
      </div>

      {/* Grid */}
      <div className="grid">
        {/* 👉 Giao đi luôn đứng đầu */}
        <div
          className={`table ${active === "Giao đi" ? "selected" : ""}`}
          onClick={() => {
            setActive("Giao đi");
            onSelectTable("Giao đi");
          }}
        >
          <div className="shape"></div>
          <span>Giao đi</span>
        </div>

        {/* 👉 phần paginate */}
        {currentTables.map((name, i) => (
          <div
            key={i}
            className={`table ${active === name ? "selected" : ""}`}
            onClick={() => {
              setActive(name);
              onSelectTable(name);
            }}
          >
            <div className="shape"></div>
            <span>{name}</span>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
