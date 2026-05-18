import "./styles/DeleteModal.css";

export default function DeleteModal({
  open,
  onClose,
  onConfirm,
  productName,
}) {
  if (!open) return null;

  return (
    <div
      className="admin-modal-overlay"
      onClick={onClose}
    >
      <div
        className="admin-delete-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <h3>
          Xác nhận xóa
        </h3>

        <p>
          Bạn có chắc muốn xóa {" "}
          <strong>
            {productName}
          </strong>
          ?
        </p>

        <div className="admin-modal-actions">
          <button onClick={onClose}>
            Hủy
          </button>

          <button
            className="admin-danger-btn"
            onClick={onConfirm}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}