import { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

import Pagination from "../../Pagination";

import {
  fetchProducts,
  removeProduct,
} from "../../../redux/admin/products/adminProductSlice";

import "../../styles/Dashboard/Products/Products.css";
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
  // FILTER
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

    //
    // SORT
    //
    switch (sort) {
      case "price_asc":
        data.sort((a, b) => a.price - b.price);
        break;

      case "price_desc":
        data.sort((a, b) => b.price - a.price);
        break;

      case "name_asc":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      default:
        data.reverse();
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

  //
  // FORMAT PRICE
  //
  const formatPrice = (price) => {
    return Number(price).toLocaleString("vi-VN") + "₫";
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
            placeholder="Tìm sản phẩm..."
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
            <option value="all">Tất cả</option>

            <option value="pizza">Pizza</option>

            <option value="burger">Burger</option>

            <option value="sushi">Sushi</option>

            <option value="drink">Drink</option>

            <option value="pasta">Pasta</option>
          </select>

          {/* SORT */}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Mới nhất</option>

            <option value="price_asc">Giá tăng dần</option>

            <option value="price_desc">Giá giảm dần</option>

            <option value="name_asc">A-Z</option>
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
              <th>#</th>

              <th>SẢN PHẨM</th>

              <th>HÌNH ẢNH</th>

              <th>DANH MỤC</th>

              <th>GIÁ</th>

              <th>STOCK</th>

              <th>THAO TÁC</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" align="center">
                  Đang tải...
                </td>
              </tr>
            ) : currentData.length === 0 ? (
              <tr>
                <td colSpan="7" align="center">
                  Không có sản phẩm
                </td>
              </tr>
            ) : (
              currentData.map((item, index) => (
                <tr key={item._id}>
                  <td>{start + index + 1}</td>

                  <td className="product-name">{item.name}</td>

                  <td>
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="product-image"
                    />
                  </td>

                  <td>{item.category}</td>

                  <td className="new-price">{formatPrice(item.price)}</td>

                  <td>{item.stock}</td>

                  <td>
                    <div className="products-actions">
                      {/* EDIT */}
                      <NavLink
                        to={`/admin/products/form/edit/${item._id}`}
                        className="edit-btn"
                      >
                        Sửa
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
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
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
