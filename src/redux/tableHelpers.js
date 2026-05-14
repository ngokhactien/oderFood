// redux/tableHelpers.js

export const isTableUsing = (
  tableId,
  draftItems,
  orders,
) => {
  const hasDraft = !!draftItems?.[tableId];

  const hasOrder = orders.some(
    (o) =>
      o.tableId === tableId &&
      (o.status === "active" ||
        o.status === "confirmed"),
  );

  return hasDraft || hasOrder;
};

export const getAvailableTables = ({
  tables,
  currentTableId,
  draftItems,
  orders,
  reservations,
}) => {
  const now = new Date();

  return tables.filter((t) => {
    // không lấy chính nó
    if (t.id === currentTableId) {
      return false;
    }

    // đang dùng
    const using = isTableUsing(
      t.id,
      draftItems,
      orders,
    );

    if (using) {
      return false;
    }

    // đang reserved
    const hasReservation = reservations.some((r) => {
      if (r.tableId !== t.id) {
        return false;
      }

      const reserveTime = new Date(
        `${r.date}T${r.time}`,
      );

      return reserveTime > now;
    });

    if (hasReservation) {
      return false;
    }

    return true;
  });
};