  import { useSelector } from "react-redux";

  export default function TableActionMenu({
    table,
    onClose,
    onOpen,
    onReserve,
    onMerge,
    onTransfer,
  }) {
    // =========================
    // HOOKS
    // =========================
    const orders = useSelector(
      (state) => state.order.orders || [],
    );

    const draftItems = useSelector(
      (state) => state.orderUI.draftItems || {},
    );

    // =========================
    // RETURN SAU HOOK
    // =========================
    if (!table) {
      return null;
    }

    // =========================
    // ORDER HIỆN TẠI
    // =========================
    const currentOrder = orders.find(
      (o) =>
        o.tableId === table.id &&
        (o.status === "active" ||
          o.status === "confirmed"),
    );

    // =========================
    // CHECK CONFIRMED ITEMS
    // =========================
    const hasConfirmedItems =
      currentOrder?.items?.length > 0;

    // =========================
    // CHECK DRAFT ITEMS
    // hỗ trợ cả array và object.items
    // =========================
    const draft = draftItems[table.id];

    const hasDraftItems = Array.isArray(draft)
      ? draft.length > 0
      : draft?.items?.length > 0;

    // =========================
    // CÓ MÓN HAY KHÔNG
    // =========================
    const hasItems =
      hasConfirmedItems || hasDraftItems;

    return (
      <div className="table-menu-overlay">
        <div className="table-menu">
          {/* MỞ BÀN */}
          <button
            onClick={() => {
              onOpen(table);
              onClose();
            }}
          >
            🍽 Mở bàn
          </button>

          {/* ĐẶT TRƯỚC */}
          <button
            onClick={() => {
              onReserve(table);
              onClose();
            }}
          >
            📅 Đặt trước
          </button>

          {/* GỘP BÀN */}
          <button
            onClick={() => {
              onMerge(table);
              onClose();
            }}
          >
            🔀 Gộp bàn
          </button>

          {/* CHUYỂN BÀN */}
          <button
            disabled={!hasItems}
            className={!hasItems ? "disabled-btn" : ""}
            onClick={() => {
              if (!hasItems) {
                return;
              }

              onTransfer(table);

              onClose();
            }}
          >
            ↔️ Chuyển bàn
          </button>

          {/* ĐÓNG */}
          <button
            className="close"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    );
  }