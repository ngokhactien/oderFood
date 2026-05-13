// import "../styles/table/TableActionMenu.css";

export default function TableActionMenu({
  table,
  onClose,
  onOpen,
  onReserve,
  onMerge,
  onTransfer,
}) {
  if (!table) return null;

  return (
    <div className="table-menu-overlay">
      <div className="table-menu">
        <button
          onClick={() => {
            onOpen(table);
            onClose();
          }}
        >
          🍽 Mở bàn
        </button>

        <button
          onClick={() => {
            onReserve(table);
            onClose();
          }}
        >
          📅 Đặt trước
        </button>

        <button
          onClick={() => {
            onMerge(table);
            onClose();
          }}
        >
          🔀 Gộp bàn
        </button>

        <button
          onClick={() => {
            onTransfer(table);
            onClose();
          }}
        >
          ↔️ Chuyển bàn
        </button>

        <button className="close" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
}