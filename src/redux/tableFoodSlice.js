import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// =====================
// TABLE FOOD API
// =====================
export const fetchTableProducts = createAsyncThunk(
  "tableProducts/fetchTableProducts",
  async (params) => {
    const res = await axios.get(
      "http://localhost:5000/api/products/table-food/search",
      { params }
    );

    return res.data;
  }
);

// =====================
// SLICE
// =====================
const tableProductSlice = createSlice({
  name: "tableProducts",
  initialState: {
    items: [],
    page: 1,
    totalPages: 1,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTableProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.data || [];
        state.page = action.payload?.page || 1;
        state.totalPages = action.payload?.totalPages || 1;
      })
      .addCase(fetchTableProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default tableProductSlice.reducer;