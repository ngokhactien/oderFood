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
  TrashIcon,
} from "@heroicons/react/24/outline";

import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

import Pagination from "../../Pagination";

import {
  fetchProducts,
  removeProduct,
} from "../../../redux/admin/products/adminProductSlice";

import "./styles/AdminInventory.css";

import { getShowCategories } from "../../../redux/categorySlice";

import DeleteModal from "../../../common/DeleteModal";

const AdminInventory = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.adminProducts);

  const { categories } = useSelector((state) => state.menuCategories);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");

  const [entries, setEntries] = useState(5);

  const [sort, setSort] = useState("newest");

  //
  // DELETE MODAL
  //
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    product: null,
  });

  //
  // FETCH PRODUCTS
  //
  useEffect(() => {
    dispatch(fetchProducts());

    dispatch(getShowCategories());
  }, [dispatch]);

  //
  // FORMAT PRICE
  //
  const formatPrice = (price) => {
    return Number(price).toLocaleString("vi-VN") + "₫";
  };

  //
  // STATUS
  //
  const getStockStatus = (item) => {
    // ưu tiên status backend như Products
    if (item.status === "out_of_stock") {
      return {
        text: "Hết hàng",
        type: "out-stock",
      };
    }

    if (Number(item.stock) <= 0) {
      return {
        text: "Hết hàng",
        type: "out-stock",
      };
    }

    if (Number(item.stock) <= 10) {
      return {
        text: "Sắp hết",
        type: "low-stock",
      };
    }

    return {
      text: "Còn hàng",
      type: "in-stock",
    };
  };

  //
  // FILTER + SORT
  //
  const filteredProducts = useMemo(() => {
    let data = [...products];

    //
    // SEARCH
    //
    if (search) {
      data = data.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    //
    // CATEGORY
    //
    if (category !== "all") {
      data = data.filter((item) => item.category === category);
    }

    //
    // SORT
    //
    switch (sort) {
      //
      // NEWEST
      //
      case "newest":
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;

      //
      // OLDEST
      //
      case "oldest":
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;

      //
      // PRICE ASC
      //
      case "price_asc":
        data.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      //
      // PRICE DESC
      //
      case "price_desc":
        data.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      //
      // NAME
      //
      case "name_asc":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      //
      // STOCK IN
      //
      case "stock_in":
        data.sort((a, b) => {
          const order = {
            "in-stock": 0,
            "low-stock": 1,
            "out-stock": 2,
          };

          return order[getStockStatus(a).type] - order[getStockStatus(b).type];
        });
        break;

      //
      // LOW STOCK
      //
      case "low_stock":
        data.sort((a, b) => {
          const order = {
            "low-stock": 0,
            "in-stock": 1,
            "out-stock": 2,
          };

          return order[getStockStatus(a).type] - order[getStockStatus(b).type];
        });
        break;

      //
      // OUT STOCK
      //
      case "stock_out":
        data.sort((a, b) => {
          const order = {
            "out-stock": 0,
            "low-stock": 1,
            "in-stock": 2,
          };

          return order[getStockStatus(a).type] - order[getStockStatus(b).type];
        });
        break;

      default:
        break;
    }

    return data;
  }, [products, search, category, sort]);

  //
  // PAGINATION
  //
  const totalPages = Math.ceil(filteredProducts.length / entries);

  const start = (page - 1) * entries;

  const currentData = filteredProducts.slice(start, start + entries);

  //
  // RESET PAGE
  //
  useEffect(() => {
    setPage(1);
  }, [search, category, sort, entries]);

  //
  // STATS
  //
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, item) => total + Number(item.stock || 0),
    0,
  );

  const lowStock = products.filter(
    (item) => Number(item.stock) > 0 && Number(item.stock) <= 10,
  ).length;

  const outOfStock = products.filter((item) => Number(item.stock) <= 0).length;

  //
  // DELETE
  //
  const handleDelete = async () => {
    if (!deleteModal.product) return;

    await dispatch(removeProduct(deleteModal.product._id));

    setDeleteModal({
      open: false,
      product: null,
    });
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
            }}
          />

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="all">Tất cả danh mục</option>

            {categories.map((item) => (
              <option key={item._id} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <option value="newest">Mới nhất</option>

            <option value="oldest">Cũ nhất</option>

            <option value="price_asc">Giá tăng dần</option>

            <option value="price_desc">Giá giảm dần</option>

            <option value="name_asc">A-Z</option>

            <option value="stock_in">Còn hàng</option>

            <option value="low_stock">Sắp hết</option>

            <option value="stock_out">Hết hàng</option>
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
                 <th className="stt">#</th>

                <th>TÊN SẢN PHẨM</th>

                <th>HÌNH ẢNH</th>

                <th>TỒN KHO</th>

                <th>GIÁ NHẬP</th>

                <th>GIÁ BÁN</th>

                <th>ĐÃ BÁN</th>

                <th>TRẠNG THÁI</th>

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
                  const status = getStockStatus(item);

                  return (
                    <tr key={item._id}>
                      <td>{start + index + 1}</td>

                      <td className="inventory-product-name">{item.name}</td>

                      <td>
                        <img
                          src={item.images?.[0] || "/placeholder.png"}
                          alt={item.name}
                        />
                      </td>

                      <td className="inventory-product-stock">{item.stock}</td>

                      <td>{formatPrice(item.importPrice)}</td>

                      <td className="inventory-product-price">
                        {formatPrice(item.price)}
                      </td>

                      <td>{item.sold || 0}</td>

                      <td>
                        <span
                          className={`inventory-product-status ${status.type}`}
                        >
                          {status.text}
                        </span>
                      </td>

                      <td>
                        <div className="inventory-actions">
                          {/* EDIT */}
                          <NavLink
                            to={`/admin/products/form/edit/${item._id}`}
                            className="inventory-edit-btn"
                          >
                            <PencilSquareIcon />
                          </NavLink>

                          {/* DELETE */}
                          <button
                            className="inventory-delete-btn"
                            onClick={() =>
                              setDeleteModal({
                                open: true,
                                product: item,
                              })
                            }
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        {filteredProducts.length > 0 && (
          <div className="products-footer">
            <span>
              Showing {start + 1} to{" "}
              {Math.min(start + entries, filteredProducts.length)} of{" "}
              {filteredProducts.length} entries
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

      {/* DELETE MODAL */}
      <DeleteModal
        open={deleteModal.open}
        onClose={() =>
          setDeleteModal({
            open: false,
            product: null,
          })
        }
        onConfirm={handleDelete}
        productName={deleteModal.product?.name}
      />
    </div>
  );
};

export default AdminInventory;
