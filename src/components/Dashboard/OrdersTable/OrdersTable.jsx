import React, { useState } from "react";
import "../../styles/Dashboard/OrdersTable/OrdersTable.css";
import Pagination from "../../Pagination";

const mockData = [
  {
    id: 1,
    name: "Nguyễn Anh Lộc",
    date: "13:57 10/02/2026",
    total: "365,000đ",
    status: "Chờ xác nhận",
  },
  {
    id: 2,
    name: "Nguyễn Bảo Long",
    date: "13:19 02-02-2026",
    total: "1,315,000đ",
    status: "Chờ xác nhận",
  },
  {
    id: 3,
    name: "Nguyễn Xuân Lộc",
    date: "14:08 30-01-2026",
    total: "2,448,500đ",
    status: "Chờ xác nhận",
  },
  {
    id: 4,
    name: "Nguyễn Xuân Lộc",
    date: "22:30 29-01-2026",
    total: "500,000đ",
    status: "Chờ xác nhận",
  },
  {
    id: 5,
    name: "Nguyễn Xuân Lộc",
    date: "22:08 28-01-2026",
    total: "11,000đ",
    status: "Chờ xác nhận",
  },
];

const OrdersTable = () => {
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(5);
  const [search, setSearch] = useState("");

  // filter search
  const filtered = mockData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / entries);

  const start = (page - 1) * entries;
  const currentData = filtered.slice(start, start + entries);

  return (
    <div className="table-wrapper">
      <h3>Danh sách đơn chờ xác nhận</h3>

      {/* top controls */}
      <div className="table-controls">
        <div>
          Show{" "}
          <select
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>{" "}
          entries
        </div>

        <div>
          Search:{" "}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* table */}
      <table className="orders-table">
        <thead>
          <tr>
            <th>#</th>
            <th>TÊN KHÁCH HÀNG</th>
            <th>NGÀY ĐẶT</th>
            <th>TỔNG TIỀN</th>
            <th>TRẠNG THÁI</th>
            <th>CHỈNH SỬA</th>
          </tr>
        </thead>

        <tbody>
          {currentData.map((item, index) => (
            <tr key={item.id}>
              <td>{start + index + 1}</td>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td className="money">{item.total}</td>
              <td>
                <span className="status">{item.status}</span>
              </td>
              <td>
                <button className="btn view">Xem</button>
                <button className="btn edit">Sửa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* bottom */}
      <div className="table-footer">
        <span>
          Showing {start + 1} to{" "}
          {Math.min(start + entries, filtered.length)} of{" "}
          {filtered.length} entries
        </span>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default OrdersTable;