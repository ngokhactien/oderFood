// src/pages/AdminInventory.jsx

import { useState } from "react";
import {
  CubeIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ArchiveBoxIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import "../../styles/Dashboard/Inventory/AdminInventory.css";
import Pagination from "../../Pagination";
import { NavLink } from "react-router-dom";

const AdminInventory = () => {
  const [page, setPage] = useState(1);

  const products = [
    {
      id: 1,
      image:
        "https://png.pngtree.com/png-vector/20240622/ourmid/pngtree-tasty-cheeseburger-on-transparent-background-png-image_12807020.png",
      name: "Burger Bò Sốt Tiêu Đen",
      category: "Pizza & Burger",
      stock: 249,
      sold: 15,
      price: "65,000đ",
      status: "Còn hàng",
    },
    {
      id: 2,
      image:
        "https://png.pngtree.com/png-vector/20240622/ourmid/pngtree-tasty-cheeseburger-on-transparent-background-png-image_12807020.png",
      name: "Burger Gà Quay Flava",
      category: "Pizza & Burger",
      stock: 90,
      sold: 22,
      price: "60,000đ",
      status: "Còn hàng",
    },
    {
      id: 3,
      image:
        "https://png.pngtree.com/png-vector/20240622/ourmid/pngtree-tasty-cheeseburger-on-transparent-background-png-image_12807020.png",
      name: "Burger Tôm Phô Mai",
      category: "Pizza & Burger",
      stock: 0,
      sold: 40,
      price: "75,000đ",
      status: "Hết hàng",
    },
  ];

  return (
    <div className="inventory-management-page">
      {/* STATS */}
      <div className="inventory-management-stats">
        <div className="inventory-management-card">
          <div className="inventory-management-icon blue">
            <CubeIcon />
          </div>

          <div>
            <p>TỔNG SẢN PHẨM</p>
            <h3>20</h3>
          </div>
        </div>

        <div className="inventory-management-card">
          <div className="inventory-management-icon green">
            <ArchiveBoxIcon />
          </div>

          <div>
            <p>TỔNG TỒN KHO</p>
            <h3>4,952</h3>
          </div>
        </div>

        <div className="inventory-management-card">
          <div className="inventory-management-icon orange">
            <ExclamationTriangleIcon />
          </div>

          <div>
            <p>SẮP HẾT HÀNG</p>
            <h3>0</h3>
          </div>
        </div>

        <div className="inventory-management-card">
          <div className="inventory-management-icon red">
            <XCircleIcon />
          </div>

          <div>
            <p>HẾT HÀNG</p>
            <h3>1</h3>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="inventory-management-wrapper">
        {/* HEADER */}
        <div className="inventory-management-header">
          <h2>Quản lý kho hàng</h2>

          <div className="inventory-management-actions">
            <NavLink to={'import'} className="inventory-import-btn">
              <ArrowDownTrayIcon />
              Nhập hàng
            </NavLink>

            <NavLink to={'/admin/products/form/add'} className="inventory-add-btn">
              <PlusIcon />
              Thêm sản phẩm mới
            </NavLink>
          </div>
        </div>

        {/* FILTER */}
        <div className="inventory-management-filter">
          <input
            type="text"
            placeholder="Tìm theo tên sản phẩm..."
          />

          <select>
            <option>Tất cả danh mục</option>
            <option>Pizza & Burger</option>
            <option>Gà rán</option>
            <option>Nước uống</option>
          </select>

          <button>
            <MagnifyingGlassIcon />
            Tìm kiếm
          </button>
        </div>

        {/* TABLE */}
        <div className="inventory-management-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>HÌNH ẢNH</th>
                <th>TÊN SẢN PHẨM</th>
                <th>DANH MỤC</th>
                <th>TỒN KHO</th>
                <th>ĐÃ BÁN</th>
                <th>TRẠNG THÁI</th>
                <th>GIÁ BÁN</th>
                <th>THAO TÁC</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>

                  <td>
                    <img src={item.image} alt={item.name} />
                  </td>

                  <td className="inventory-product-name">
                    {item.name}
                  </td>

                  <td>{item.category}</td>

                  <td className="inventory-product-stock">
                    {item.stock}
                  </td>

                  <td>{item.sold}</td>

                  <td>
                    <span
                      className={`inventory-product-status ${
                        item.status === "Hết hàng"
                          ? "out-stock"
                          : ""
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="inventory-product-price">
                    {item.price}
                  </td>

                  <td>
                    <button className="inventory-edit-btn">
                      <PencilSquareIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <Pagination
          page={page}
          totalPages={20}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default AdminInventory;