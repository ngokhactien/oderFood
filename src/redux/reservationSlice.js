import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

// =========================
// CREATE RESERVATION
// =========================
export const createReservation =
  createAsyncThunk(
    "reservation/create",

    async (data, thunkAPI) => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/reservations",
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
// GET RESERVATIONS
// =========================
export const getReservations =
  createAsyncThunk(
    "reservation/getAll",

    async (_, thunkAPI) => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/reservations",
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

const reservationSlice = createSlice({
  name: "reservation",

  initialState: {
    reservations: [],

    loading: false,

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(
        createReservation.pending,
        (state) => {
          state.loading = true;
        },
      )

      .addCase(
        createReservation.fulfilled,
        (state, action) => {
          state.loading = false;

          state.reservations.unshift(
            action.payload,
          );
        },
      )

      .addCase(
        createReservation.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        },
      )

      // GET
      .addCase(
        getReservations.fulfilled,
        (state, action) => {
          state.reservations =
            action.payload;
        },
      );
  },
});

export default reservationSlice.reducer;