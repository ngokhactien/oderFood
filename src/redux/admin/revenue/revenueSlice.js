import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

// =========================
// GET REVENUE
// =========================
export const getRevenue = createAsyncThunk(
  "adminRevenue/getRevenue",

  async (_, thunkAPI) => {
    try {
      // TOKEN
      const token = localStorage.getItem("token");

      // API
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/revenue`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      // ERROR
      if (!res.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const revenueSlice = createSlice({
  name: "adminRevenue",

  initialState: {
    loading: false,

    orders: [],

    totalRevenue: 0,

    totalOrders: 0,

    totalProducts: 0,

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // =========================
      // GET REVENUE
      // =========================
      .addCase(getRevenue.pending, (state) => {
        state.loading = true;
      })

      .addCase(getRevenue.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload.orders || [];

        state.totalRevenue = action.payload.totalRevenue || 0;

        state.totalOrders = action.payload.totalOrders || 0;

        state.totalProducts = action.payload.totalProducts || 0;
      })

      .addCase(getRevenue.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;

        toast.error(action.payload);
      });
  },
});

export default revenueSlice.reducer;
