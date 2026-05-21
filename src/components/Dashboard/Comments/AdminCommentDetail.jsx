// pages/admin/AdminCommentDetail.jsx

import { useState } from "react";
import "./styles/AdminCommentDetail.css";
import { NavLink } from "react-router-dom";

export default function AdminCommentDetail() {
  const [status, setStatus] = useState("Hiển thị");

  const comment = {
    content: "Gà Rán ngon",
    product: "Gà Rán (4 Miếng)",
    name: "Nguyễn Anh Lộc",
    time: "13:56 10-02-2026",
  };

  return (
    <div className="admin-comment-detail">
      <div className="admin-comment-detail__card">
        {/* breadcrumb */}
        <div className="admin-comment-detail__breadcrumb">
          <NavLink to={'/admin/comments'}>Bình luận</NavLink>
          <span>/</span>
          <span>Chi tiết bình luận</span>
        </div>

        {/* content */}
        <div className="admin-comment-detail__section">
          <h3>Nội dung bình luận</h3>

          <div className="admin-comment-detail__content">{comment.content}</div>
        </div>

        {/* bottom */}
        <div className="admin-comment-detail__bottom">
          {/* left */}
          <div className="admin-comment-detail__box">
            <div className="admin-comment-detail__info">
              <span>Tên sản phẩm</span>
              <strong>{comment.product}</strong>
            </div>

            <div className="admin-comment-detail__info">
              <span>Họ tên</span>
              <strong>{comment.name}</strong>
            </div>

            <div className="admin-comment-detail__info">
              <span>Thời gian</span>
              <strong>{comment.time}</strong>
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
              <button className="admin-comment-detail__update-btn">
                Cập nhật
              </button>

              <button className="admin-comment-detail__delete-btn">
                Xóa bình luận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
