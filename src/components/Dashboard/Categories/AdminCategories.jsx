import { useEffect, useMemo, useState } from "react";

import {
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import {
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { useDispatch, useSelector } from "react-redux";

import "./styles/AdminCategories.css";

import Pagination from "../../Pagination";

import {
  fetchCategories,
  deleteCategory,
} from "../../../redux/admin/category/categorySlice";

import CategoryFormModal from "./CategoryFormModal";
import DeleteModal from "../../../common/DeleteModal";

export default function AdminCategories() {
  const dispatch = useDispatch();

  const { categories, loading } = useSelector(
    (state) => state.categories
  );

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [search, setSearch] = useState("");

  // FILTER STATUS
  const [statusFilter, setStatusFilter] =
    useState("all");

  // MODAL
  const [openModal, setOpenModal] =
    useState(false);

  const [editItem, setEditItem] =
    useState(null);

  // DELETE
  const [openDelete, setOpenDelete] =
    useState(false);

  const [deleteItem, setDeleteItem] =
    useState(null);

  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/1829/1829586.png";

  /**
   * FETCH DATA
   */
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  /**
   * CREATE
   */
  const handleCreate = () => {
    setEditItem(null);
    setOpenModal(true);
  };

  /**
   * EDIT
   */
  const handleEdit = (item) => {
    setEditItem(item);
    setOpenModal(true);
  };

  /**
   * OPEN DELETE
   */
  const handleOpenDelete = (item) => {
    setDeleteItem(item);
    setOpenDelete(true);
  };

  /**
   * CONFIRM DELETE
   */
  const handleConfirmDelete = async () => {
    if (!deleteItem) return;

    await dispatch(deleteCategory(deleteItem._id));

    setOpenDelete(false);
    setDeleteItem(null);
  };

  /**
   * FILTER DATA
   */
  const filteredData = useMemo(() => {
    if (!categories) return [];

    return categories
      .filter((item) =>
        item.name
          .toLowerCase()
          .includes(search.toLowerCase())
      )

      // FILTER STATUS
      .filter((item) => {
        if (statusFilter === "all") {
          return true;
        }

        return item.status === statusFilter;
      })

      .map((item) => ({
        ...item,
        products: item.products || 0,
      }));
  }, [categories, search, statusFilter]);

  /**
   * PAGINATION
   */
  const totalPages = Math.ceil(
    filteredData.length / limit
  );

  const currentData = filteredData.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div className="admin-categories">
      <div className="admin-categories__card">
        {/* HEADER */}
        <div className="admin-categories__header">
          <h2>Danh mục</h2>

          <button
            className="admin-categories__add-btn"
            onClick={handleCreate}
          >
            <PlusIcon className="admin-categories__add-icon" />
            Thêm danh mục
          </button>
        </div>

        {/* TOP */}
        <div className="admin-categories__top">
          <div className="admin-categories__top-left">
            {/* SHOW */}
            <div className="admin-categories__show">
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
            </div>

            {/* FILTER STATUS */}
            <div className="admin-categories__filter">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(
                    e.target.value
                  );

                  setPage(1);
                }}
              >
                <option value="all">
                  Tất cả
                </option>

                <option value="show">
                  Hiển thị
                </option>

                <option value="hide">
                  Ẩn
                </option>
              </select>
            </div>
          </div>

          {/* SEARCH */}
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

        {/* TABLE */}
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
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="admin-categories__loading"
                  >
                    Đang tải...
                  </td>
                </tr>
              ) : currentData.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="admin-categories__empty"
                  >
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                currentData.map(
                  (item, index) => (
                    <tr key={item._id}>
                      {/* STT */}
                      <td>
                        {(page - 1) * limit +
                          index +
                          1}
                      </td>

                      {/* NAME */}
                      <td className="admin-categories__name">
                        {item.name}
                      </td>

                      {/* IMAGE */}
                      <td>
                        <img
                          src={
                            item.image?.trim()
                              ? item.image
                              : defaultImage
                          }
                          alt={item.name}
                          className="admin-categories__image"
                        />
                      </td>

                      {/* PRODUCTS */}
                      <td>
                        {item.products}
                      </td>

                      {/* STATUS */}
                      <td>
                        <span
                          className={`admin-categories__status ${
                            item.status ===
                            "show"
                              ? "admin-categories__status--show"
                              : "admin-categories__status--hide"
                          }`}
                        >
                          {item.status ===
                          "show"
                            ? "Hiển thị"
                            : "Ẩn"}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td>
                        <div className="action-icons">
                          {/* EDIT */}
                          <button
                            className="action-btn edit"
                            onClick={() =>
                              handleEdit(
                                item
                              )
                            }
                          >
                            <PencilSquareIcon className="action-icon" />
                          </button>

                          {/* DELETE */}
                          <button
                            className="action-btn delete"
                            onClick={() =>
                              handleOpenDelete(
                                item
                              )
                            }
                          >
                            <TrashIcon className="action-icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>

        {/* BOTTOM */}
        <div className="admin-categories__bottom">
          <p>
            Showing{" "}
            {(page - 1) * limit + 1} to{" "}
            {Math.min(
              page * limit,
              filteredData.length
            )}{" "}
            of {filteredData.length} entries
          </p>

          {filteredData.length > limit && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>

      {/* CATEGORY MODAL */}
      <CategoryFormModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        editItem={editItem}
      />

      {/* DELETE MODAL */}
      <DeleteModal
        open={openDelete}
        onClose={() =>
          setOpenDelete(false)
        }
        onConfirm={handleConfirmDelete}
        productName={deleteItem?.name}
      />
    </div>
  );
}