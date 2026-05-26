import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

// =========================
// GET REVENUE
// =========================
export const getRevenue = createAsyncThunk(
  "adminRevenue/getRevenue",

  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/admin/revenue");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Lỗi server",
      );
    }
  },
);

const revenueSlice = createSlice({
  name: "adminRevenue",

  initialState: {
    orders: [],

    totalRevenue: 0,

    totalOrders: 0,

    totalProducts: 0,

    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getRevenue.pending, (state) => {
        state.loading = true;
      })

      .addCase(getRevenue.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload.orders;

        state.totalRevenue = action.payload.totalRevenue;

        state.totalOrders = action.payload.totalOrders;

        state.totalProducts = action.payload.totalProducts;
      })

      .addCase(getRevenue.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default revenueSlice.reducer;
