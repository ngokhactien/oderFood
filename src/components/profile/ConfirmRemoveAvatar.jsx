import "../styles/profile/Confirm.css";

export default function ConfirmRemoveAvatar({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="modal_logout">
      <div className="modal__overlay" onClick={onClose}></div>

      <div className="modal__box">
        <h3>Xoá ảnh đại diện?</h3>
        <p>Bạn có chắc muốn đặt lại ảnh mặc định không?</p>

        <div className="modal__actions">
          <button className="outline" onClick={onClose}>
            Huỷ
          </button>
          <button className="danger" onClick={onConfirm}>
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
}