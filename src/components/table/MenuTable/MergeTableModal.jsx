// import "../styles/table/Modal.css";

export default function MergeTableModal({
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
          Gộp bàn {table.displayName}
        </h3>

        {tables.map((t) => (
          <label key={t.id}>
            <input type="checkbox" />

            {t.displayName}
          </label>
        ))}

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