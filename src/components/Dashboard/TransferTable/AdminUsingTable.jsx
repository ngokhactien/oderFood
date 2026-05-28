// AdminUsingTable.jsx

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Pagination from "../../Pagination";

import "./styles/AdminUsingTable.css";

import {
  fetchReservations,
  updateReservationStatus,
} from "../../../redux/admin/reservation/reservationSlice";
import {
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { formatReservationDateTime } from "../../../common/dateFormat";

export default function AdminUsingTable() {
  const dispatch = useDispatch();

  const { reservations, totalPages, loading } = useSelector(
    (state) => state.reservations,
  );

  const [page, setPage] = useState(1);

  const [entries, setEntries] = useState(5);

  const [search, setSearch] = useState("");

  const [tooltip, setTooltip] = useState({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

  // chỉ lấy completed hoặc using
  const status = "completed";

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
  }, [dispatch, page, entries, search]);

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
    <div className="using-table-page">
      {/* HEADER */}
      <div className="using-table-header">
        <h2>Bàn đang sử dụng</h2>

        <div className="using-table-filters">
          {/* SEARCH */}
          <div className="using-search-box">
            <MagnifyingGlassIcon className="using-search-icon" />

            <input
              type="text"
              placeholder="Tìm khách..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);

                setPage(1);
              }}
            />
          </div>

          {/* LIMIT */}
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
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="using-loading">Loading...</div>
      ) : (
        <>
          {/* TABLE */}
          <div className="using-table-wrap">
            <table className="using-table">
              <thead>
                <tr>
                  <th className="stt">#</th>

                  <th>Khách hàng</th>

                  <th>SĐT</th>

                  <th>Bàn</th>

                  <th>Thời gian</th>

                  <th>Số khách</th>

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

                      <td>{formatReservationDateTime(item.date, item.time)}</td>

                      <td>{item.guests}</td>

                      <td className="using-note-cell">
                        {item.note ? (
                          <div
                            className="using-note-wrapper"
                            onMouseEnter={(e) => {
                              const rect =
                                e.currentTarget.getBoundingClientRect();

                              setTooltip({
                                visible: true,
                                text: item.note,
                                x: rect.left + rect.width / 2,
                                y: rect.bottom + 14,
                              });
                            }}
                            onMouseLeave={() => {
                              setTooltip((prev) => ({
                                ...prev,
                                visible: false,
                              }));
                            }}
                          >
                            <ChatBubbleLeftEllipsisIcon className="using-note-icon" />
                          </div>
                        ) : (
                          <span className="using-no-note">—</span>
                        )}
                      </td>
                      <td>
                        <span className="using-status">Đang sử dụng</span>
                      </td>

                      <td>
                        <div className="using-actions">
                          {/* COMPLETE */}
                          <button
                            className="using-btn success"
                            onClick={() => handleStatus(item._id, "done")}
                          >
                            <CheckCircleIcon className="using-icon" />
                          </button>

                          {/* CANCEL */}
                          <button
                            className="using-btn danger"
                            onClick={() => handleStatus(item._id, "cancelled")}
                          >
                            <XCircleIcon className="using-icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="using-empty">
                      Không có bàn đang sử dụng
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

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
      {tooltip.visible && (
        <div
          className="global-tooltip"
          style={{
            left: tooltip.x,
            top: tooltip.y,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
