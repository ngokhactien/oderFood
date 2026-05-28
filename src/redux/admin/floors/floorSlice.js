// redux/admin/floor/floorSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/floors";

// =========================
// GET FLOORS
// =========================

export const fetchFloors = createAsyncThunk(
  "floor/fetchFloors",

  async (_, thunkAPI) => {
    try {
      const res = await axios.get(BASE_URL);

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || err.message,
      );
    }
  },
);

// =========================
// CREATE FLOOR
// =========================

export const createFloor = createAsyncThunk(
  "floor/createFloor",

  async (data, thunkAPI) => {
    try {
      const res = await axios.post(BASE_URL, data);

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || err.message,
      );
    }
  },
);

// =========================
// UPDATE FLOOR
// =========================

export const updateFloor = createAsyncThunk(
  "floor/updateFloor",

  async ({ floorId, name }, thunkAPI) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/${floorId}`,
        {
          name,
        },
      );

      return {
        floorId,
        name,
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
// DELETE FLOOR
// =========================

export const deleteFloor = createAsyncThunk(
  "floor/deleteFloor",

  async (floorId, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/${floorId}`);

      return floorId;
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

const floorSlice = createSlice({
  name: "floor",

  initialState: {
    floors: [],

    loading: false,

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // =========================
      // FETCH
      // =========================

      .addCase(fetchFloors.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchFloors.fulfilled, (state, action) => {
        state.loading = false;

        state.floors = Array.isArray(action.payload)
          ? action.payload
          : [];
      })

      .addCase(fetchFloors.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // =========================
      // CREATE
      // =========================

      .addCase(createFloor.fulfilled, (state, action) => {
        state.floors.push(action.payload);
      })

      // =========================
      // UPDATE
      // =========================

      .addCase(updateFloor.fulfilled, (state, action) => {
        const index = state.floors.findIndex(
          (item) => item._id === action.payload.floorId,
        );

        if (index !== -1) {
          state.floors[index].name = action.payload.name;
        }
      })

      // =========================
      // DELETE
      // =========================

      .addCase(deleteFloor.fulfilled, (state, action) => {
        state.floors = state.floors.filter(
          (item) => item._id !== action.payload,
        );
      });
  },
});

export default floorSlice.reducer;