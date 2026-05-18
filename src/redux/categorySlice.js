import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/categories";

// GET SHOW CATEGORY
export const getShowCategories = createAsyncThunk(
  "menuCategories/getShowCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/show`
      );

      return data.categories;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message
      );
    }
  }
);

const categorySlice = createSlice({
  name: "menuCategories",

  initialState: {
    categories: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // LOADING
      .addCase(
        getShowCategories.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      // SUCCESS
      .addCase(
        getShowCategories.fulfilled,
        (state, action) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )

      // FAILED
      .addCase(
        getShowCategories.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default categorySlice.reducer;