import { useState } from "react";

import { useDispatch } from "react-redux";
import { createReservation } from "../../../redux/admin/reservation/reservationSlice";


export default function ReserveTableModal({ table, open, onClose }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    note: "",
  });

  if (!open || !table) return null;

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async () => {
    const newErrors = {};

    // validate
    if (!form.customerName.trim()) {
      newErrors.customerName = "Nhập tên khách";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Nhập số điện thoại";
    }

    if (!form.date) {
      newErrors.date = "Chọn ngày";
    }

    if (!form.time) {
      newErrors.time = "Chọn giờ";
    }

    // có lỗi
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    try {
      setLoading(true);

      await dispatch(
        createReservation({
          ...form,

          tableId: table.id,

          tableName: table.displayName,
        }),
      ).unwrap();

      // reset
      setForm({
        customerName: "",
        phone: "",
        date: "",
        time: "",
        guests: 1,
        note: "",
      });

      setErrors({});

      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Đặt trước {table.displayName}</h3>

        {errors.customerName && (
          <span className="error-text">{errors.customerName}</span>
        )}
        <input
          className={errors.customerName ? "error" : ""}
          placeholder="Tên khách"
          value={form.customerName}
          onChange={(e) => {
            setForm({
              ...form,
              customerName: e.target.value,
            });

            setErrors({
              ...errors,
              customerName: "",
            });
          }}
        />

        {errors.phone && <span className="error-text">{errors.phone}</span>}
        <input
          className={errors.phone ? "error" : ""}
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={(e) => {
            setForm({
              ...form,
              phone: e.target.value,
            });

            setErrors({
              ...errors,
              phone: "",
            });
          }}
        />

        {/* DATE */}
        {errors.date && <span className="error-text">{errors.date}</span>}
        <input
          type="date"
          className={errors.date ? "error" : ""}
          min={new Date().toISOString().split("T")[0]}
          value={form.date}
          onChange={(e) => {
            setForm({
              ...form,
              date: e.target.value,
            });

            setErrors({
              ...errors,
              date: "",
            });
          }}
        />

        {/* TIME */}
        {errors.time && <span className="error-text">{errors.time}</span>}
        <input
          type="time"
          className={errors.time ? "error" : ""}
          value={form.time}
          onChange={(e) => {
            setForm({
              ...form,
              time: e.target.value,
            });

            setErrors({
              ...errors,
              time: "",
            });
          }}
        />

        <input
          type="number"
          min="1"
          placeholder="Số khách"
          value={form.guests}
          onChange={(e) =>
            setForm({
              ...form,
              guests: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Ghi chú"
          value={form.note}
          onChange={(e) =>
            setForm({
              ...form,
              note: e.target.value,
            })
          }
        />

        <div className="actions">
          <button onClick={onClose} disabled={loading}>
            Huỷ
          </button>

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}
