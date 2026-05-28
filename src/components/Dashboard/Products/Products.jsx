import { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

import Pagination from "../../Pagination";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import {
  fetchProducts,
  removeProduct,
} from "../../../redux/admin/products/adminProductSlice";

import "./styles/Products.css";

import DeleteModal from "../../../common/DeleteModal";

export default function Products() {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.adminProducts);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");

  const [entries, setEntries] = useState(5);

  const [page, setPage] = useState(1);

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
  }, [dispatch]);

  //
  // FORMAT PRICE
  //
  const formatPrice = (price) => {
    return Number(price).toLocaleString("vi-VN") + "₫";
  };

  //
  // STOCK STATUS
  //
  const getStockStatus = (item) => {
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
      // NAME A-Z
      //
      case "name_asc":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      //
      // CÒN HÀNG TRƯỚC
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
      // SẮP HẾT TRƯỚC
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
      // HẾT HÀNG TRƯỚC
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
    <div className="products-page">
      {/* TOP */}
      <div className="products-top">
        <div className="products-filter">
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
            placeholder="Tìm sản phẩm..."
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
            <option value="all">Tất cả</option>

            <option value="pizza">Pizza</option>

            <option value="burger">Burger</option>

            <option value="sushi">Sushi</option>

            <option value="drink">Drink</option>

            <option value="pasta">Pasta</option>
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
        </div>

        {/* ADD */}
        <div className="products-left">
          <NavLink to="/admin/products/form/add" className="add-product-btn">
            + Thêm sản phẩm
          </NavLink>
        </div>
      </div>

      {/* TABLE */}
      <div className="products-table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
               <th className="stt">#</th>

              <th>SẢN PHẨM</th>

              <th>THƯƠNG HIỆU</th>

              <th>HÌNH ẢNH</th>

              <th>DANH MỤC</th>

              <th>GIÁ</th>

              <th>STOCK</th>

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

                    <td className="product-name">{item.name}</td>

                    <td className="product-brand">{item.brand}</td>

                    <td>
                      <img
                        src={item.images?.[0] || "/placeholder.png"}
                        alt={item.name}
                        className="product-image"
                      />
                    </td>

                    <td>{item.category}</td>

                    <td className="new-price">{formatPrice(item.price)}</td>

                    <td>{item.stock}</td>

                    <td>
                      <span className={`product-badge ${status.type}`}>
                        {status.text}
                      </span>
                    </td>

                    <td>
                      <div className="products-actions">
                        {/* EDIT */}
                        <NavLink
                          to={`/admin/products/form/edit/${item._id}`}
                          className="edit-btn"
                        >
                          <PencilSquareIcon className="action-icon" />
                        </NavLink>

                        {/* DELETE */}
                        <button
                          className="delete-btn"
                          onClick={() =>
                            setDeleteModal({
                              open: true,
                              product: item,
                            })
                          }
                        >
                          <TrashIcon className="action-icon" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* FOOTER */}
        <div className="products-footer">
          <span>
            Showing {filteredProducts.length > 0 ? start + 1 : 0} to{" "}
            {Math.min(start + entries, filteredProducts.length)} of{" "}
            {filteredProducts.length} entries
          </span>

          {filteredProducts.length > 0 && totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
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
}
