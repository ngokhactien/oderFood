import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

const BASE_URL =
  "http://localhost:5000/api/reservations";

// =========================
// CREATE RESERVATION
// =========================
export const createReservation =
  createAsyncThunk(
    "reservation/create",

    async (data, thunkAPI) => {
      try {
        const res = await axios.post(
          BASE_URL,
          data,
        );

        return res.data;
      } catch (err) {
        return thunkAPI.rejectWithValue(
          err.response?.data ||
            err.message,
        );
      }
    },
  );

// =========================
// GET TODAY RESERVATIONS
// dùng cho TableManager
// =========================
export const getReservations =
  createAsyncThunk(
    "reservation/getToday",

    async (_, thunkAPI) => {
      try {
        const res = await axios.get(
          `${BASE_URL}/today`,
        );

        return res.data;
      } catch (err) {
        return thunkAPI.rejectWithValue(
          err.response?.data ||
            err.message,
        );
      }
    },
  );

// =========================
// ADMIN GET ALL
// search + page + status
// =========================
export const fetchReservations =
  createAsyncThunk(
    "reservation/fetchAll",

    async (
      {
        page,
        limit,
        search,
        status,
      },
      thunkAPI,
    ) => {
      try {
        const res =
          await axios.get(
            `${BASE_URL}?page=${page}&limit=${limit}&search=${search}&status=${status}`,
          );

        return res.data;
      } catch (err) {
        return thunkAPI.rejectWithValue(
          err.response?.data ||
            err.message,
        );
      }
    },
  );

// =========================
// UPDATE STATUS
// =========================
export const updateReservationStatus =
  createAsyncThunk(
    "reservation/updateStatus",

    async (
      { id, status },
      thunkAPI,
    ) => {
      try {
        const res =
          await axios.patch(
            `${BASE_URL}/${id}`,
            {
              status,
            },
          );

        return res.data;
      } catch (err) {
        return thunkAPI.rejectWithValue(
          err.response?.data ||
            err.message,
        );
      }
    },
  );

const reservationSlice =
  createSlice({
    name: "reservation",

    initialState: {
      reservations: [],

      totalPages: 1,

      total: 0,

      loading: false,

      error: null,
    },

    reducers: {},

    extraReducers: (
      builder,
    ) => {
      builder

        // =====================
        // CREATE
        // =====================
        .addCase(
          createReservation.pending,
          (state) => {
            state.loading = true;
          },
        )

        .addCase(
          createReservation.fulfilled,
          (
            state,
            action,
          ) => {
            state.loading = false;

            state.reservations.unshift(
              action.payload,
            );
          },
        )

        .addCase(
          createReservation.rejected,
          (
            state,
            action,
          ) => {
            state.loading = false;

            state.error =
              action.payload;
          },
        )

        // =====================
        // GET TODAY
        // =====================
        .addCase(
          getReservations.pending,
          (state) => {
            state.loading = true;
          },
        )

        .addCase(
          getReservations.fulfilled,
          (
            state,
            action,
          ) => {
            state.loading = false;

            state.reservations =
              action.payload;
          },
        )

        .addCase(
          getReservations.rejected,
          (
            state,
            action,
          ) => {
            state.loading = false;

            state.error =
              action.payload;
          },
        )

        // =====================
        // ADMIN GET ALL
        // =====================
        .addCase(
          fetchReservations.pending,
          (state) => {
            state.loading = true;
          },
        )

        .addCase(
          fetchReservations.fulfilled,
          (
            state,
            action,
          ) => {
            state.loading = false;

            state.reservations =
              action.payload.reservations;

            state.totalPages =
              action.payload.totalPages;

            state.total =
              action.payload.total;
          },
        )

        .addCase(
          fetchReservations.rejected,
          (
            state,
            action,
          ) => {
            state.loading = false;

            state.error =
              action.payload;
          },
        )

        // =====================
        // UPDATE STATUS
        // =====================
        .addCase(
          updateReservationStatus.fulfilled,
          (
            state,
            action,
          ) => {
            const index =
              state.reservations.findIndex(
                (r) =>
                  r._id ===
                  action.payload._id,
              );

            if (
              index !== -1
            ) {
              state.reservations[
                index
              ] =
                action.payload;
            }
          },
        );
    },
  });

export default reservationSlice.reducer;