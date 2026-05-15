// pages/admin/AdminComments.jsx
import { useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import "../../styles/Dashboard/Comments/AdminComments.css";
import Pagination from "../../Pagination";
import { NavLink } from "react-router-dom";

const commentsData = [
  {
    id: 1,
    name: "Nguyễn Anh Lộc",
    comment: "Gà rán ngon",
    time: "13:56 10-02-2026",
  },
  {
    id: 2,
    name: "Nguyễn Anh Lộc",
    comment: "Món ăn ngon nha hihi",
    time: "13:44 10-02-2026",
  },
  {
    id: 3,
    name: "Nguyễn Long Nhật",
    comment: "Sản phẩm ok dùng tốt",
    time: "11:56 10-02-2026",
  },
  {
    id: 4,
    name: "Nguyễn Xuân Lộc",
    comment: "Sản phẩm dùng tốt",
    time: "13:03 09-02-2026",
  },
  {
    id: 5,
    name: "Nguyễn Bảo Long",
    comment: "HDPE ngon lun",
    time: "23:50 08-02-2026",
  },
  {
    id: 6,
    name: "Nguyễn Văn A",
    comment: "Đóng gói đẹp",
    time: "20:10 08-02-2026",
  },
];

export default function AdminComments() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");

  // search
  const filteredData = useMemo(() => {
    return commentsData.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.comment.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  // tổng số trang
  const totalPages = Math.ceil(filteredData.length / limit);

  // data hiện tại
  const currentData = filteredData.slice(
    (page - 1) * limit,
    page * limit,
  );

  return (
    <div className="admin-comment">
      <div className="admin-comment__card">
        <h2 className="admin-comment__title">
          Danh sách bình luận
        </h2>

        {/* top */}
        <div className="admin-comment__top">
          <div className="admin-comment__show">
            <span>Show</span>

            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>

            <span>entries</span>
          </div>

          <div className="admin-comment__search">
            <MagnifyingGlassIcon className="admin-comment__search-icon" />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* table */}
        <div className="admin-comment__table-wrap">
          <table className="admin-comment__table">
            <thead>
              <tr>
                <th>#</th>
                <th>HỌ TÊN</th>
                <th>BÌNH LUẬN</th>
                <th>THỜI GIAN</th>
                <th>CHỈNH SỬA</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((item, index) => (
                <tr key={item.id}>
                  <td>{(page - 1) * limit + index + 1}</td>

                  <td>{item.name}</td>

                  <td>{item.comment}</td>

                  <td>{item.time}</td>

                  <td>
                    <NavLink to={'detail'} className="admin-comment__detail-btn">
                      Chi tiết
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* bottom */}
        <div className="admin-comment__bottom">
          <p>
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, filteredData.length)} of{" "}
            {filteredData.length} entries
          </p>

          {/* dùng pagination của bạn */}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}