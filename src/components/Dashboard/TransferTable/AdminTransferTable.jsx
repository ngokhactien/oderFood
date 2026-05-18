// AdminTransferTable.jsx

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Pagination from "../../Pagination";

import "./styles/AdminTransferTable.css";

import {
  fetchReservations,
  updateReservationStatus,
} from "../../../redux/admin/reservation/reservationSlice";

import CreateReservationModal from "./CreateReservationModal";

const AdminTransferTable = () => {
  const dispatch = useDispatch();

  const { reservations, totalPages, loading } = useSelector(
    (state) => state.reservations,
  );

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [entries, setEntries] = useState(5);

  const [openCreate, setOpenCreate] = useState(false);

  // mặc định reserved
  const [status, setStatus] = useState("reserved");

  // FETCH
  useEffect(() => {
    dispatch(
      fetchReservations({
        page,
        limit: entries,
        search,
        status,
      }),
    );
  }, [dispatch, page, entries, search, status]);

  // UPDATE STATUS
  const handleStatus = async (id, newStatus) => {
    try {
      await dispatch(
        updateReservationStatus({
          id,
          status: newStatus,
        }),
      );

      dispatch(
        fetchReservations({
          page,
          limit: entries,
          search,
          status,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reservation-page">
      {/* HEADER */}
      <div className="reservation-header">
        <h2>Đặt bàn</h2>

        <div className="reservation-filters">
          {/* ADD */}
          <button
            className="add-reservation-btn"
            onClick={() => setOpenCreate(true)}
          >
            + Đặt bàn
          </button>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Tìm khách..."
            value={search}
            onChange={(e) => {
              setPage(1);

              setSearch(e.target.value);
            }}
          />

          {/* ENTRIES */}
          <select
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));

              setPage(1);
            }}
          >
            <option value={5}>5</option>

            <option value={10}>10</option>

            <option value={20}>20</option>
          </select>

          {/* STATUS */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);

              setPage(1);
            }}
          >
            <option value="reserved">Đang chờ</option>

            <option value="completed">Hoàn thành</option>

            <option value="cancelled">Đã hủy</option>

            <option value="all">Tất cả</option>
          </select>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="reservation-loading">Loading...</div>
      ) : (
        <>
          {/* TABLE */}
          <table className="reservation-table">
            <thead>
              <tr>
                <th>#</th>

                <th>Khách hàng</th>

                <th>SĐT</th>

                <th>Bàn</th>

                <th>Thời gian đặt</th>

                <th>Khách</th>

                <th>Ghi chú</th>

                <th>Trạng thái</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {reservations?.length > 0 ? (
                reservations.map((item, index) => (
                  <tr key={item._id}>
                    <td>{(page - 1) * entries + index + 1}</td>

                    <td>{item.customerName}</td>

                    <td>{item.phone}</td>

                    <td>{item.tableName}</td>

                    <td>
                      {item.date} - {item.time}
                    </td>

                    <td>{item.guests}</td>

                    <td className="note-cell">
                      <span className="note-text">
                        {item.note || "Không có"}
                      </span>

                      {item.note && (
                        <div className="note-tooltip">{item.note}</div>
                      )}
                    </td>

                    <td>
                      <span className={`status ${item.status}`}>
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        {item.status === "reserved" && (
                          <>
                            <button
                              className="btn btn-complete"
                              onClick={() =>
                                handleStatus(item._id, "completed")
                              }
                            >
                              Xác nhận
                            </button>

                            <button
                              className="btn btn-cancel"
                              onClick={() =>
                                handleStatus(item._id, "cancelled")
                              }
                            >
                              Hủy
                            </button>
                          </>
                        )}

                        {item.status === "completed" && (
                          <span className="status-text completed-text">
                            Đã hoàn thành
                          </span>
                        )}

                        {item.status === "cancelled" && (
                          <span className="status-text cancelled-text">
                            Đã hủy
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="empty-data">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          {reservations?.length > 0 && totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      {/* MODAL */}
      <CreateReservationModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />
    </div>
  );
};

export default AdminTransferTable;
