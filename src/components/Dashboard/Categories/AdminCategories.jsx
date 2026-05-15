// pages/admin/AdminCategories.jsx

import { useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import "../../styles/Dashboard/Categories/AdminCategories.css";
import Pagination from "../../Pagination";

const categoriesData = [
  {
    id: 1,
    name: "Chưa có danh mục",
    image:
      "https://cdn-icons-png.flaticon.com/512/1829/1829586.png",
    products: 0,
    status: "Hiển thị",
  },
  {
    id: 2,
    name: "Gà rán",
    image:
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58",
    products: 1,
    status: "Hiển thị",
  },
  {
    id: 3,
    name: "Mì Ý",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
    products: 2,
    status: "Hiển thị",
  },
  {
    id: 4,
    name: "Pizza & Burger",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    products: 5,
    status: "Hiển thị",
  },
  {
    id: 5,
    name: "Cơm",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19",
    products: 2,
    status: "Hiển thị",
  },
  {
    id: 6,
    name: "Trà sữa",
    image:
      "https://images.unsplash.com/photo-1558857563-b371033873b8",
    products: 4,
    status: "Ẩn",
  },
  {
    id: 7,
    name: "Đồ ăn vặt",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    products: 3,
    status: "Hiển thị",
  },
];

export default function AdminCategories() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");

  // search
  const filteredData = useMemo(() => {
    return categoriesData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  // total pages
  const totalPages = Math.ceil(filteredData.length / limit);

  // current data
  const currentData = filteredData.slice(
    (page - 1) * limit,
    page * limit,
  );

  return (
    <div className="admin-categories">
      <div className="admin-categories__card">
        {/* header */}
        <div className="admin-categories__header">
          <h2>Danh mục</h2>

          <button className="admin-categories__add-btn">
            <PlusIcon className="admin-categories__add-icon" />
            Thêm danh mục
          </button>
        </div>

        {/* top */}
        <div className="admin-categories__top">
          <div className="admin-categories__show">
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

          <div className="admin-categories__search">
            <MagnifyingGlassIcon className="admin-categories__search-icon" />

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
        <div className="admin-categories__table-wrap">
          <table className="admin-categories__table">
            <thead>
              <tr>
                <th>#</th>
                <th>TÊN</th>
                <th>ẢNH</th>
                <th>SẢN PHẨM</th>
                <th>TRẠNG THÁI</th>
                <th>CHỈNH SỬA</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((item, index) => (
                <tr key={item.id}>
                  <td>{(page - 1) * limit + index + 1}</td>

                  <td className="admin-categories__name">
                    {item.name}
                  </td>

                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="admin-categories__image"
                    />
                  </td>

                  <td>{item.products}</td>

                  <td>
                    <span
                      className={`admin-categories__status ${
                        item.status === "Hiển thị"
                          ? "admin-categories__status--show"
                          : "admin-categories__status--hide"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <button className="admin-categories__action-btn">
                      <EllipsisVerticalIcon className="admin-categories__action-icon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* bottom */}
        <div className="admin-categories__bottom">
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