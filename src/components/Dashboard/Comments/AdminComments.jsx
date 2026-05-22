// pages/admin/AdminComments.jsx

import { useEffect, useMemo, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./styles/AdminComments.css";
import Pagination from "../../Pagination";
import { getAllComments } from "../../../redux/commentSlice";

export default function AdminComments() {
  const dispatch = useDispatch();

  const { comments, loading } = useSelector((state) => state.comments);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [sortStatus, setSortStatus] = useState("");

  // SORT STAR
  const [sortStar, setSortStar] = useState("");

  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);

  // FILTER + SORT
  const filteredData = useMemo(() => {
    if (!comments) return [];

    let data = comments.filter((item) => {
      const name = item.user?.name || "";
      const content = item.content || "";
      const product = item.product?.name || "";

      return (
        name.toLowerCase().includes(search.toLowerCase()) ||
        content.toLowerCase().includes(search.toLowerCase()) ||
        product.toLowerCase().includes(search.toLowerCase())
      );
    });

    // SORT STAR
    // FILTER STAR
    if (sortStar) {
      data = data.filter((item) => item.rating === Number(sortStar));
    }

    // FILTER STATUS
    if (sortStatus === "show") {
      data = data.filter((item) => !item.isHidden);
    }

    if (sortStatus === "hidden") {
      data = data.filter((item) => item.isHidden);
    }

    return data;
  }, [comments, search, sortStar, sortStatus]);

  useEffect(() => {
    setPage(1);
  }, [search, limit, sortStar, sortStatus]);

  const totalPages = Math.ceil(filteredData.length / limit);

  const currentData = filteredData.slice((page - 1) * limit, page * limit);

  if (loading) {
    return <p className="p-4">Loading comments...</p>;
  }

  return (
    <div className="admin-comment">
      <div className="admin-comment__card">
        <h2 className="admin-comment__title">Danh sách bình luận</h2>

        {/* TOP */}
        <div className="admin-comment__top">
          <div className="admin-comment__show">
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          {/* SORT STAR */}
          <div className="admin-comment__sort">
            <select
              value={sortStar}
              onChange={(e) => setSortStar(e.target.value)}
            >
              <option value="">Tất cả sao</option>
              <option value="5">5 sao</option>
              <option value="4">4 sao</option>
              <option value="3">3 sao</option>
              <option value="2">2 sao</option>
              <option value="1">1 sao</option>
            </select>
          </div>

          {/* SORT status */}
          <div className="admin-comment__sort">
            <select
              value={sortStatus}
              onChange={(e) => setSortStatus(e.target.value)}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="show">Hiện</option>
              <option value="hidden">Ẩn</option>
            </select>
          </div>

          <div className="admin-comment__search">
            <MagnifyingGlassIcon className="admin-comment__search-icon" />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="admin-comment__table-wrap">
          <table className="admin-comment__table">
            <thead>
              <tr>
                <th>#</th>
                <th>HỌ TÊN</th>
                <th>SẢN PHẨM</th>
                <th>ĐÁNH GIÁ</th>
                <th>BÌNH LUẬN</th>
                <th>TRẠNG THÁI</th>
                <th>THỜI GIAN</th>
                <th>CHỈNH SỬA</th>
              </tr>
            </thead>

            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr key={item._id}>
                    <td>{(page - 1) * limit + index + 1}</td>

                    <td>{item.user?.name}</td>

                    <td>{item.product?.name}</td>

                    <td>
                      <div className="admin-comment__stars">
                        {[...Array(item.rating)].map((_, index) => (
                          <span key={index}>⭐</span>
                        ))}
                      </div>
                    </td>

                    <td>
                      <div className="admin-comment__tooltip">
                        <div className="admin-comment__content">
                          {item.content}
                        </div>

                        <div className="admin-comment__tooltip-text">
                          {item.content}
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`admin-comment__status ${
                          item.isHidden ? "hidden" : "show"
                        }`}
                      >
                        {item.isHidden ? "Ẩn" : "Hiện"}
                      </span>
                    </td>

                    <td>{new Date(item.createdAt).toLocaleString("vi-VN")}</td>

                    <td>
                      <NavLink
                        to={`/admin/comments/detail/${item._id}`}
                        className="admin-comment__detail-btn"
                      >
                        Chi tiết
                      </NavLink>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">Không có bình luận</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* BOTTOM */}
        {filteredData.length > 0 && (
          <div className="admin-comment__bottom">
            <p>
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, filteredData.length)} of{" "}
              {filteredData.length} entries
            </p>

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
}
