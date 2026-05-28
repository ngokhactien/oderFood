import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const API = "http://localhost:5000/api/admin/categories";

//
// GET
//
export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    const { data } = await axios.get(API);

    return data;
  },
);

//
// CREATE
//
export const createCategory = createAsyncThunk(
  "categories/create",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(API, body);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Server error"
      );
    }
  }
);

//
// UPDATE
//
export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API}/${id}`,
        body
      );

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Có lỗi xảy ra"
      );
    }
  }
);

//
// DELETE
//
export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id) => {
    await axios.delete(`${API}/${id}`);

    return id;
  },
);

const categorySlice = createSlice({
  name: "categories",

  initialState: {
    categories: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      //
      // FETCH
      //
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchCategories.fulfilled,
        (state, action) => {
          state.loading = false;
          state.categories = action.payload;
        },
      )

      //
      // CREATE
      //
      .addCase(
        createCategory.fulfilled,
        (state, action) => {
          state.categories.unshift(action.payload);
        },
      )

      //
      // UPDATE
      //
      .addCase(
        updateCategory.fulfilled,
        (state, action) => {
          const index = state.categories.findIndex(
            (item) =>
              item._id === action.payload._id,
          );

          if (index !== -1) {
            state.categories[index] =
              action.payload;
          }
        },
      )

      //
      // DELETE
      //
      .addCase(
        deleteCategory.fulfilled,
        (state, action) => {
          state.categories =
            state.categories.filter(
              (item) =>
                item._id !== action.payload,
            );
        },
      );
  },
});

export default categorySlice.reducer;