import "../styles/profile/Confirm.css";

export default function DeleteConfirmModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="modal_logout">
      {/* overlay */}
      <div className="modal__overlay" onClick={onClose}></div>

      {/* box */}
      <div className="modal__box">
        <h3>🗑️ Xoá địa chỉ</h3>
        <p>Bạn có chắc muốn xoá địa chỉ này?</p>

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