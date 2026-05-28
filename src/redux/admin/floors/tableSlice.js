// redux/admin/table/tableSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/floors";

// =========================
// ADD TABLE
// =========================

export const addTable = createAsyncThunk(
  "table/addTable",

  async ({ floorId, data }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/${floorId}/table`,
        data,
      );

      return {
        floorId,
        message: res.data,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || err.message,
      );
    }
  },
);

// =========================
// UPDATE TABLE
// =========================

export const updateTable = createAsyncThunk(
  "table/updateTable",

  async ({ tableId, data }, thunkAPI) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/table/${tableId}`,
        data,
      );

      return {
        tableId,
        data,
        message: res.data,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || err.message,
      );
    }
  },
);

// =========================
// UPDATE STATUS
// =========================

export const updateTableStatus = createAsyncThunk(
  "table/updateTableStatus",

  async ({ tableId, status }, thunkAPI) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/table/${tableId}/status`,
        {
          status,
        },
      );

      return {
        tableId,
        status,
        message: res.data,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || err.message,
      );
    }
  },
);

// =========================
// DELETE TABLE
// =========================

export const deleteTable = createAsyncThunk(
  "table/deleteTable",

  async ({ floorId, tableId }, thunkAPI) => {
    try {
      await axios.delete(
        `${BASE_URL}/${floorId}/table/${tableId}`,
      );

      return {
        floorId,
        tableId,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || err.message,
      );
    }
  },
);

// =========================
// SLICE
// =========================

const tableSlice = createSlice({
  name: "table",

  initialState: {
    loading: false,

    success: false,

    error: null,
  },

  reducers: {
    resetTableState: (state) => {
      state.loading = false;

      state.success = false;

      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // PENDING
      // =========================

      .addMatcher(
        (action) =>
          action.type.startsWith("table/") &&
          action.type.endsWith("/pending"),

        (state) => {
          state.loading = true;

          state.success = false;

          state.error = null;
        },
      )

      // =========================
      // FULFILLED
      // =========================

      .addMatcher(
        (action) =>
          action.type.startsWith("table/") &&
          action.type.endsWith("/fulfilled"),

        (state) => {
          state.loading = false;

          state.success = true;
        },
      )

      // =========================
      // REJECTED
      // =========================

      .addMatcher(
        (action) =>
          action.type.startsWith("table/") &&
          action.type.endsWith("/rejected"),

        (state, action) => {
          state.loading = false;

          state.success = false;

          state.error = action.payload;
        },
      );
  },
});

export const { resetTableState } = tableSlice.actions;

export default tableSlice.reducer;