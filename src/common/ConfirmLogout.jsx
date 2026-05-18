import "./styles/Confirm.css";

export default function ConfirmLogout({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="modal_logout">
      <div className="modal__overlay" onClick={onClose}></div>

      <div className="modal__box">
        <h3>Đăng xuất</h3>
        <p>Bạn có chắc chắn muốn đăng xuất không?</p>

        <div className="modal__actions">
          <button className="outline" onClick={onClose}>
            Hủy
          </button>
          <button className="danger" onClick={onConfirm}>
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}