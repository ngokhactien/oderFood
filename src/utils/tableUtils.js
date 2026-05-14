// utils/tableUtils.js

// =========================
// TABLE USING
// =========================
export const isTableUsing = (
  tableId,
  draftItems,
  orders,
) => {
  const hasDraft =
    !!draftItems?.[tableId];

  const hasConfirmed =
    orders.some(
      (o) =>
        o.tableId === tableId &&
        (o.status === "active" ||
          o.status === "confirmed"),
    );

  return hasDraft || hasConfirmed;
};

// =========================
// AVAILABLE TABLES
// chỉ lấy bàn trống
// =========================
export const getAvailableTables = ({
  tables,
  currentTableId,
  draftItems,
  orders,
  reservations,
}) => {
  const now = new Date();

  return tables.filter((t) => {
    // bỏ chính nó
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

    // reserved
    const hasReservation =
      reservations.some((r) => {
        if (r.tableId !== t.id) {
          return false;
        }

        const reserveTime =
          new Date(
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

// =========================
// GET RESERVATION STATUS
// =========================
export const getTableReservations =
  (tableId, reservations) => {
    const now = new Date();

    const tableReservations =
      reservations

        .filter((r) => {
          if (r.tableId !== tableId) {
            return false;
          }

          const reserveDate =
            new Date(
              `${r.date}T${r.time}`,
            );

          return reserveDate > now;
        })

        .sort((a, b) => {
          const aTime =
            new Date(
              `${a.date}T${a.time}`,
            );

          const bTime =
            new Date(
              `${b.date}T${b.time}`,
            );

          return aTime - bTime;
        });

    if (!tableReservations.length) {
      return null;
    }

    const current =
      tableReservations[0];

    const reserveTime =
      new Date(
        `${current.date}T${current.time}`,
      );

    const diff =
      reserveTime - now;

    let type =
      "reserved-future";

    if (
      diff <=
      2 * 60 * 60 * 1000
    ) {
      type = "reserved-soon";
    }

    return {
      type,

      current,

      all: tableReservations,
    };
  };