// src/pages/AdminInventory.jsx

import { useEffect, useMemo, useState } from "react";

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

import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

import Pagination from "../../Pagination";

import { fetchProducts } from "../../../redux/admin/products/adminProductSlice";

import "../../styles/Dashboard/Inventory/AdminInventory.css";
import { getShowCategories } from "../../../redux/categorySlice";

const AdminInventory = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.adminProducts);

  const { categories } = useSelector((state) => state.menuCategories);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");

  const [entries, setEntries] = useState(5);

  //
  // FETCH PRODUCTS
  //
  useEffect(() => {
    dispatch(fetchProducts());

    dispatch(getShowCategories());
  }, [dispatch]);

  //
  // FILTER PRODUCTS
  //
  const filteredProducts = useMemo(() => {
    let data = [...products];

    //
    // SEARCH
    //
    if (search) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    //
    // CATEGORY
    //
    if (category !== "all") {
      data = data.filter((item) => item.category === category);
    }

    return data;
  }, [products, search, category]);

  //
  // PAGINATION
  //
  const totalPages = Math.ceil(filteredProducts.length / entries);

  const start = (page - 1) * entries;

  const currentData = filteredProducts.slice(start, start + entries);

  //
  // STATS
  //
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, item) => total + Number(item.stock || 0),
    0,
  );

  const lowStock = products.filter(
    (item) => item.stock > 0 && item.stock <= 10,
  ).length;

  const outOfStock = products.filter((item) => item.stock === 0).length;

  //
  // FORMAT PRICE
  //
  const formatPrice = (price) => {
    return Number(price).toLocaleString("vi-VN") + "₫";
  };

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
            <h3>{totalProducts}</h3>
          </div>
        </div>

        <div className="inventory-management-card">
          <div className="inventory-management-icon green">
            <ArchiveBoxIcon />
          </div>

          <div>
            <p>TỔNG TỒN KHO</p>
            <h3>{totalStock.toLocaleString("vi-VN")}</h3>
          </div>
        </div>

        <div className="inventory-management-card">
          <div className="inventory-management-icon orange">
            <ExclamationTriangleIcon />
          </div>

          <div>
            <p>SẮP HẾT HÀNG</p>
            <h3>{lowStock}</h3>
          </div>
        </div>

        <div className="inventory-management-card">
          <div className="inventory-management-icon red">
            <XCircleIcon />
          </div>

          <div>
            <p>HẾT HÀNG</p>
            <h3>{outOfStock}</h3>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="inventory-management-wrapper">
        {/* HEADER */}
        <div className="inventory-management-header">
          <h2>Quản lý kho hàng</h2>

          <div className="inventory-management-actions">
            <NavLink to="import" className="inventory-import-btn">
              <ArrowDownTrayIcon />
              Nhập hàng
            </NavLink>

            <NavLink
              to="/admin/products/form/add"
              className="inventory-add-btn"
            >
              <PlusIcon />
              Thêm sản phẩm mới
            </NavLink>
          </div>
        </div>

        {/* FILTER */}
        <div className="inventory-management-filter">
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
            type="text"
            placeholder="Tìm theo tên sản phẩm..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              setPage(1);
            }}
          />

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);

              setPage(1);
            }}
          >
            <option value="all">Tất cả danh mục</option>

            {categories.map((item) => (
              <option key={item._id} value={item.slug}>
                {item.name}
              </option>
            ))}
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
              {loading ? (
                <tr>
                  <td colSpan="9" align="center">
                    Đang tải...
                  </td>
                </tr>
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan="9" align="center">
                    Không có sản phẩm
                  </td>
                </tr>
              ) : (
                currentData.map((item, index) => {
                  const status =
                    item.stock === 0
                      ? "Hết hàng"
                      : item.stock <= 10
                        ? "Sắp hết"
                        : "Còn hàng";

                  return (
                    <tr key={item._id}>
                      <td>{start + index + 1}</td>

                      <td>
                        <img src={item.images?.[0]} alt={item.name} />
                      </td>

                      <td className="inventory-product-name">{item.name}</td>

                      <td>{item.category}</td>

                      <td className="inventory-product-stock">{item.stock}</td>

                      <td>{item.sold || 0}</td>

                      <td>
                        <span
                          className={`inventory-product-status ${
                            status === "Hết hàng"
                              ? "out-stock"
                              : status === "Sắp hết"
                                ? "low-stock"
                                : ""
                          }`}
                        >
                          {status}
                        </span>
                      </td>

                      <td className="inventory-product-price">
                        {formatPrice(item.price)}
                      </td>

                      <td>
                        <NavLink
                          to={`/admin/products/form/edit/${item._id}`}
                          className="inventory-edit-btn"
                        >
                          <PencilSquareIcon />
                        </NavLink>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="products-footer">
          <span>
            Showing {filteredProducts.length > 0 ? start + 1 : 0} to{" "}
            {Math.min(start + entries, filteredProducts.length)} of{" "}
            {filteredProducts.length} entries
          </span>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminInventory;
