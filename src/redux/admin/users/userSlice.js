import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/admin/users";

// =========================
// CREATE USER
// =========================
export const createUser = createAsyncThunk(
  "users/createUser",

  async (data, thunkAPI) => {
    try {
      const res = await axios.post(BASE_URL, data);

      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// =========================
// GET USERS
// =========================
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page, limit, search }, thunkAPI) => {
    try {
      const res = await axios.get(
        `${BASE_URL}?page=${page}&limit=${limit}&search=${search}`,
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

// =========================
// DELETE USER
// =========================
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);

      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

// =========================
// UPDATE USER
// =========================
export const updateUser = createAsyncThunk(
  "users/updateUser",

  async ({ id, data }, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, data);

      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const userSlice = createSlice({
  name: "users",

  initialState: {
    users: [],
    totalPages: 1,
    total: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder;

    // =====================
    // FETCH
    // =====================

    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;

        state.users = action.payload.users;

        state.totalPages = action.payload.totalPages;

        state.total = action.payload.total;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =====================
    // CREATE
    // =====================

    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;

        state.users.unshift(action.payload);

        state.total += 1;
      })

      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =====================
    // UPDATE
    // =====================

    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.users.findIndex(
          (u) => u._id === action.payload._id,
        );

        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =====================
    // DELETE
    // =====================

    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;

        state.users = state.users.filter((u) => u._id !== action.payload);

        state.total -= 1;
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
