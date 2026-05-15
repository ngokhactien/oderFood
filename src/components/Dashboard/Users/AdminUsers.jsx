// pages/admin/AdminUsers.jsx

import { useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import "../../styles/Dashboard/Users/AdminUsers.css";
import Pagination from "../../Pagination";

const usersData = [
  {
    id: 1,
    avatar:
      "https://i.pravatar.cc/100?img=1",
    name: "Nguyễn Anh Lộc",
    email: "khachvip@gmail.com",
    phone: "0336999111",
    role: "Khách hàng",
  },
  {
    id: 2,
    avatar:
      "https://i.pravatar.cc/100?img=2",
    name: "Trần Thị Ngân",
    email: "tranthingan@gmail.com",
    phone: "0336999555",
    role: "Khách hàng",
  },
  {
    id: 3,
    avatar:
      "https://i.pravatar.cc/100?img=3",
    name: "Nguyễn Long Nhật",
    email: "khachhang01@gmail.com",
    phone: "0336456113",
    role: "Khách hàng",
  },
  {
    id: 4,
    avatar:
      "https://i.pravatar.cc/100?img=4",
    name: "Nguyễn Bảo Long",
    email: "taikhoan3@gmail.com",
    phone: "0336999111",
    role: "Khách hàng",
  },
  {
    id: 5,
    avatar:
      "https://i.pravatar.cc/100?img=5",
    name: "Nguyễn Khoa Nè",
    email: "k2003@gmail.com",
    phone: "0336216113",
    role: "Khách hàng",
  },
  {
    id: 6,
    avatar:
      "https://i.pravatar.cc/100?img=6",
    name: "Nguyễn Văn A",
    email: "vana@gmail.com",
    phone: "0988888888",
    role: "Admin",
  },
];

export default function AdminUsers() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");

  // search
  const filteredData = useMemo(() => {
    return usersData.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.includes(search),
    );
  }, [search]);

  // total page
  const totalPages = Math.ceil(filteredData.length / limit);

  // current data
  const currentData = filteredData.slice(
    (page - 1) * limit,
    page * limit,
  );

  return (
    <div className="admin-users">
      {/* header */}
      <div className="admin-users__header">
        <div>
          <h1>Danh sách tài khoản</h1>

          <p>Quản lý người dùng trong hệ thống</p>
        </div>

        <button className="admin-users__add-btn">
          <PlusIcon className="admin-users__add-icon" />
          Thêm tài khoản
        </button>
      </div>

      {/* card */}
      <div className="admin-users__card">
        {/* top */}
        <div className="admin-users__top">
          <div className="admin-users__show">
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

          <div className="admin-users__search">
            <MagnifyingGlassIcon className="admin-users__search-icon" />

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
        <div className="admin-users__table-wrap">
          <table className="admin-users__table">
            <thead>
              <tr>
                <th>#</th>
                <th>ẢNH</th>
                <th>HỌ TÊN</th>
                <th>EMAIL</th>
                <th>SỐ ĐIỆN THOẠI</th>
                <th>VAI TRÒ</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((user, index) => (
                <tr key={user.id}>
                  <td>{(page - 1) * limit + index + 1}</td>

                  <td>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="admin-users__avatar"
                    />
                  </td>

                  <td className="admin-users__name">
                    {user.name}
                  </td>

                  <td>
                    <div className="admin-users__info">
                      <EnvelopeIcon className="admin-users__info-icon" />
                      {user.email}
                    </div>
                  </td>

                  <td>
                    <div className="admin-users__info">
                      <PhoneIcon className="admin-users__info-icon" />
                      {user.phone}
                    </div>
                  </td>

                  <td>
                    <div className="admin-users__role">
                      <UserIcon className="admin-users__role-icon" />
                      {user.role}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* bottom */}
        <div className="admin-users__bottom">
          <p>
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, filteredData.length)} of{" "}
            {filteredData.length} entries
          </p>

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