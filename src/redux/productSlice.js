import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (params) => {
    const res = await axios.get(
      "http://localhost:5000/api/products/search", // ✅ đúng API
      { params },
    );
    return res.data;
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    page: 1,
    totalPages: 1,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.data || [];
        state.page = action.payload?.page || 1;
        state.totalPages = action.payload?.totalPages || 1;
      });
  },
});

export default productSlice.reducer;
