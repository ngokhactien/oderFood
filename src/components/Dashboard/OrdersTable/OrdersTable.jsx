import React, { useState } from "react";
import "./styles/OrdersTable.css";
import Pagination from "../../Pagination";
import { NavLink } from "react-router-dom";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

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
  {
    id: 6,
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

  // filter search (giữ nguyên logic)
  const filtered = mockData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / entries);

  const start = (page - 1) * entries;
  const currentData = filtered.slice(start, start + entries);

  return (
    <div className="products-page">
      {/* TOP (GIỐNG PRODUCTS LAYOUT) */}
      <div className="products-top">
        <div className="products-filter">
          {/* ENTRIES */}
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
          </select>

          {/* SEARCH */}
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Tìm đơn hàng..."
          />
        </div>

        {/* RIGHT (GIỐNG PRODUCTS BUTTON AREA) */}
        <div className="products-left">
          <NavLink to="#" className="add-product-btn">
            + Xuất đơn hàng
          </NavLink>
        </div>
      </div>

      {/* TABLE */}
      <div className="products-table-wrapper">
        <table className="products-table">
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
                <td className="product-name">{item.name}</td>
                <td>{item.date}</td>
                <td className="new-price">{item.total}</td>
                <td>
                  <span className="product-badge in-stock">{item.status}</span>
                </td>
                <td>
                  <div className="products-actions">
                    {/* VIEW */}
                    <NavLink to={`detail/V`} className="edit-btn">
                      <EyeIcon className="action-icon" />
                    </NavLink>

                    {/* EDIT */}
                    <NavLink to={`detail/E`} className="edit-btn">
                      <PencilSquareIcon className="action-icon" />
                    </NavLink>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* FOOTER */}
        {filtered.length > 0 && (
          <div className="products-footer">
            <span>
              Showing {start + 1} to{" "}
              {Math.min(start + entries, filtered.length)} of {filtered.length}{" "}
              entries
            </span>

            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersTable;
