// pages/admin/AdminCommentDetail.jsx

import { useEffect, useState } from "react";

import "./styles/AdminCommentDetail.css";

import {
  NavLink,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  getCommentDetail,
  updateCommentStatus,
  deleteComment,
} from "../../../redux/commentSlice";

import { toast } from "react-toastify";

export default function AdminCommentDetail() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const navigate = useNavigate();

  const { commentDetail, loading } = useSelector(
    (state) => state.comments,
  );

  const [status, setStatus] = useState("");

  const [isPinned, setIsPinned] = useState(false);

  /**
   * FETCH DETAIL
   */
  useEffect(() => {
    dispatch(getCommentDetail(id));
  }, [dispatch, id]);

  /**
   * SET DATA
   */
  useEffect(() => {
    if (commentDetail) {
      setStatus(
        commentDetail.isHidden
          ? "Ẩn"
          : "Hiển thị",
      );

      setIsPinned(
        commentDetail.isPinned || false,
      );
    }
  }, [commentDetail]);

  /**
   * UPDATE STATUS
   */
  const handleUpdateStatus = async () => {
    try {
      await dispatch(
        updateCommentStatus({
          id,
          isHidden: status === "Ẩn",
          isPinned,
        }),
      ).unwrap();

      toast.success(
        "Cập nhật trạng thái thành công",
      );
    } catch (error) {
      toast.error(
        error.message || "Có lỗi xảy ra",
      );
    }
  };

  /**
   * UPDATE PIN
   */
  const handleUpdatePin = async () => {
    try {
      await dispatch(
        updateCommentStatus({
          id,
          isHidden: status === "Ẩn",
          isPinned,
        }),
      ).unwrap();

      toast.success(
        "Cập nhật ghim thành công",
      );
    } catch (error) {
      toast.error(
        error.message || "Có lỗi xảy ra",
      );
    }
  };

  /**
   * DELETE
   */
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa bình luận?",
    );

    if (!confirmDelete) return;

    try {
      await dispatch(deleteComment(id)).unwrap();

      toast.success(
        "Xóa bình luận thành công",
      );

      navigate("/admin/comments");
    } catch (error) {
      toast.error(
        error.message || "Có lỗi xảy ra",
      );
    }
  };

  /**
   * LOADING
   */
  if (loading || !commentDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div className="admin-comment-detail">
      <div className="admin-comment-detail__card">
        {/* BREADCRUMB */}
        <div className="admin-comment-detail__breadcrumb">
          <NavLink to={"/admin/comments"}>
            Bình luận
          </NavLink>

          <span>/</span>

          <span>Chi tiết bình luận</span>
        </div>

        {/* CONTENT */}
        <div className="admin-comment-detail__section">
          <h3>Nội dung bình luận</h3>

          <div className="admin-comment-detail__content">
            {commentDetail.content}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="admin-comment-detail__bottom">
          {/* LEFT */}
          <div className="admin-comment-detail__box">
            <div className="admin-comment-detail__info">
              <span>Tên sản phẩm</span>

              <strong>
                {commentDetail.product?.name}
              </strong>
            </div>

            <div className="admin-comment-detail__info">
              <span>Họ tên</span>

              <strong>
                {commentDetail.user?.name}
              </strong>
            </div>

            <div className="admin-comment-detail__info">
              <span>Đánh giá</span>

              <strong>
                {[...Array(
                  commentDetail?.rating || 0,
                )].map((_, index) => (
                  <span key={index}>⭐</span>
                ))}
              </strong>
            </div>

            <div className="admin-comment-detail__info">
              <span>Thời gian</span>

              <strong>
                {new Date(
                  commentDetail.createdAt,
                ).toLocaleString("vi-VN")}
              </strong>
            </div>
          </div>

          {/* RIGHT */}
          <div className="admin-comment-detail__box">
            {/* STATUS */}
            <div className="admin-comment-detail__status-row">
              <span className="admin-comment-detail__label">
                Trạng thái:
              </span>

              <span
                className={`admin-comment-detail__status ${
                  status === "Ẩn"
                    ? "hidden"
                    : "show"
                }`}
              >
                {status}
              </span>
            </div>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="admin-comment-detail__select"
            >
              <option value="Hiển thị">
                Hiển thị
              </option>

              <option value="Ẩn">
                Ẩn
              </option>
            </select>

            <button
              className="admin-comment-detail__update-btn"
              onClick={handleUpdateStatus}
            >
              Cập nhật trạng thái
            </button>

            {/* PIN */}
            <div
              className="admin-comment-detail__status-row"
              style={{
                marginTop: "20px",
              }}
            >
              <span className="admin-comment-detail__label">
                Ghim:
              </span>

              <span
                className={`admin-comment-detail__pin ${
                  isPinned
                    ? "pinned"
                    : "unpinned"
                }`}
              >
                {isPinned
                  ? "Đã ghim"
                  : "Chưa ghim"}
              </span>
            </div>

            <select
              value={
                isPinned ? "true" : "false"
              }
              onChange={(e) =>
                setIsPinned(
                  e.target.value === "true",
                )
              }
              className="admin-comment-detail__select"
            >
              <option value="false">
                Không ghim
              </option>

              <option value="true">
                Ghim bình luận
              </option>
            </select>

            <button
              className="admin-comment-detail__pin-btn"
              onClick={handleUpdatePin}
            >
              Cập nhật ghim
            </button>

            {/* DELETE */}
            <div className="admin-comment-detail__actions">
              <button
                className="admin-comment-detail__delete-btn"
                onClick={handleDelete}
              >
                Xóa bình luận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 