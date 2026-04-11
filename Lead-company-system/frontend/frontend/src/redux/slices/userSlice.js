import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// GET USERS
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await API.get("/users", { params });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

// CREATE USER
export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await API.post("/users", userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create user"
      );
    }
  }
);

// UPDATE USER
export const updateUserById = createAsyncThunk(
  "users/updateUserById",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/users/${id}`, userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

// DELETE USER
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/users/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    pagination: {},
    selectedUser: null,
    loading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    error: null
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    clearUserError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data || action.payload.users || [];
        state.pagination = action.payload.pagination || {};
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createUser.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createLoading = false;
        const newUser = action.payload.data || action.payload.user;
        if (newUser) {
          state.users.unshift(newUser);
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateUserById.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.updateLoading = false;
        const updatedUser = action.payload.data || action.payload.user;
        if (updatedUser) {
          state.users = state.users.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          );
          if (state.selectedUser?._id === updatedUser._id) {
            state.selectedUser = updatedUser;
          }
        }
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteUser.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  }
});

export const { setSelectedUser, clearSelectedUser, clearUserError } =
  userSlice.actions;

export default userSlice.reducer;