// pages/admin/AdminCommentDetail.jsx

import { useEffect, useState } from "react";
import "./styles/AdminCommentDetail.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
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
  const { commentDetail, loading } = useSelector((state) => state.comments);

  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getCommentDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (commentDetail) {
      setStatus(commentDetail.isHidden ? "Ẩn" : "Hiển thị");
    }
  }, [commentDetail]);

  const handleUpdateStatus = async () => {
    await dispatch(
      updateCommentStatus({
        id,
        isHidden: status === "Ẩn",
      }),
    );

    toast.success("Cập nhật trạng thái thành công");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa bình luận?");

    if (!confirmDelete) return;

    await dispatch(deleteComment(id));

    toast.success("Xóa bình luận thành công");

    navigate("/admin/comments");
  };

  if (loading || !commentDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div className="admin-comment-detail">
      <div className="admin-comment-detail__card">
        {/* breadcrumb */}
        <div className="admin-comment-detail__breadcrumb">
          <NavLink to={"/admin/comments"}>Bình luận</NavLink>

          <span>/</span>

          <span>Chi tiết bình luận</span>
        </div>

        {/* content */}
        <div className="admin-comment-detail__section">
          <h3>Nội dung bình luận</h3>

          <div className="admin-comment-detail__content">
            {commentDetail.content}
          </div>
        </div>

        {/* bottom */}
        <div className="admin-comment-detail__bottom">
          {/* left */}
          <div className="admin-comment-detail__box">
            <div className="admin-comment-detail__info">
              <span>Tên sản phẩm</span>

              <strong>{commentDetail.product?.name}</strong>
            </div>

            <div className="admin-comment-detail__info">
              <span>Họ tên</span>

              <strong>{commentDetail.user?.name}</strong>
            </div>

            <div className="admin-comment-detail__info">
              <span>Đánh giá</span>

              <strong>
                {[...Array(commentDetail?.rating || 0)].map((_, index) => (
                  <span key={index}>⭐</span>
                ))}
              </strong>
            </div>

            <div className="admin-comment-detail__info">
              <span>Thời gian</span>

              <strong>
                {new Date(commentDetail.createdAt).toLocaleString("vi-VN")}
              </strong>
            </div>
          </div>

          {/* right */}
          <div className="admin-comment-detail__box">
            <div className="admin-comment-detail__status-row">
              <span className="admin-comment-detail__label">Trạng thái:</span>

              <span className="admin-comment-detail__status">{status}</span>
            </div>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="admin-comment-detail__select"
            >
              <option value="Hiển thị">Hiển thị</option>

              <option value="Ẩn">Ẩn</option>
            </select>

            <div className="admin-comment-detail__actions">
              <button
                className="admin-comment-detail__update-btn"
                onClick={handleUpdateStatus}
              >
                Cập nhật
              </button>

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
