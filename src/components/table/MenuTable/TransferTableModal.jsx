// import "../styles/table/Modal.css";

export default function TransferTableModal({
  open,
  table,
  tables,
  onClose,
}) {
  if (!open || !table) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>
          Chuyển bàn
        </h3>

        <p>
          Từ: {table.displayName}
        </p>

        <select>
          {tables.map((t) => (
            <option key={t.id}>
              {t.displayName}
            </option>
          ))}
        </select>

        <div className="actions">
          <button onClick={onClose}>
            Huỷ
          </button>

          <button>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}