// CreateReservationModal.jsx

import { useState } from "react";

import axios from "axios";

import "./styles/CreateReservationModal.css";

const initialState = {
  customerName: "",

  phone: "",

  tableId: "",

  tableName: "",

  date: "",

  time: "",

  guests: 1,

  note: "",
};

const CreateReservationModal = ({
  open,
  onClose,
}) => {
  const [form, setForm] =
    useState(initialState);

  const [loading, setLoading] =
    useState(false);

  // =========================
  // TODAY
  // =========================
  const today = new Date()
    .toISOString()
    .split("T")[0];

  // =========================
  // CURRENT TIME
  // =========================
  const currentTime = new Date()
    .toTimeString()
    .slice(0, 5);

  if (!open) {
    return null;
  }

  // =========================
  // CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await axios.post(
          "http://localhost:5000/api/reservations",
          form,
        );

        setForm(initialState);

        onClose();

        window.location.reload();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="modal-overlay">
      <div className="reservation-modal">
        <h3>Đặt bàn</h3>

        <form
          onSubmit={
            handleSubmit
          }
        >
          {/* NAME */}
          <input
            type="text"
            name="customerName"
            placeholder="Tên khách"
            value={
              form.customerName
            }
            onChange={
              handleChange
            }
            required
          />

          {/* PHONE */}
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={
              handleChange
            }
            required
          />

          {/* TABLE */}
          <input
            type="text"
            name="tableName"
            placeholder="Tên bàn"
            value={
              form.tableName
            }
            onChange={
              handleChange
            }
            required
          />

          {/* DATE */}
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={
              handleChange
            }
            min={today}
            required
          />

          {/* TIME */}
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={
              handleChange
            }
            min={
              form.date ===
              today
                ? currentTime
                : undefined
            }
            required
          />

          {/* GUESTS */}
          <input
            type="number"
            name="guests"
            placeholder="Số khách"
            value={
              form.guests
            }
            onChange={
              handleChange
            }
            min={1}
            required
          />

          {/* NOTE */}
          <textarea
            name="note"
            placeholder="Ghi chú"
            value={form.note}
            onChange={
              handleChange
            }
          />

          {/* ACTIONS */}
          <div className="modal-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
            >
              Đóng
            </button>

            <button
              type="submit"
              className="btn-save"
              disabled={loading}
            >
              {loading
                ? "Đang lưu..."
                : "Đặt bàn"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReservationModal;