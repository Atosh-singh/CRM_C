import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// GET ROLES
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/roles");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch roles"
      );
    }
  }
);

// CREATE ROLE
export const createRole = createAsyncThunk(
  "roles/createRole",
  async (roleData, { rejectWithValue }) => {
    try {
      const res = await API.post("/roles", roleData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create role"
      );
    }
  }
);

// UPDATE ROLE
export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async ({ id, roleData }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/roles/${id}`, roleData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update role"
      );
    }
  }
);

// DELETE ROLE
export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/roles/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete role"
      );
    }
  }
);

const roleSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
    selectedRole: null,
    loading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    error: null
  },
  reducers: {
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
    clearSelectedRole: (state) => {
      state.selectedRole = null;
    },
    clearRoleError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload.data || action.payload.roles || (Array.isArray(action.payload) ? action.payload : []);
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createRole.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.createLoading = false;
        const newRole = action.payload.data || action.payload.role;
        if (newRole) {
          state.roles.unshift(newRole);
        }
      })
      .addCase(createRole.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      .addCase(updateRole.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.updateLoading = false;
        const updatedRole = action.payload.data || action.payload.role;
        if (updatedRole) {
          state.roles = state.roles.map((role) =>
            role._id === updatedRole._id ? updatedRole : role
          );
        }
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteRole.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.roles = state.roles.filter((role) => role._id !== action.payload);
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  }
});

export const { setSelectedRole, clearSelectedRole, clearRoleError } =
  roleSlice.actions;

export default roleSlice.reducer;