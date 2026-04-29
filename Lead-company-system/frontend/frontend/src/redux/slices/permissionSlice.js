import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// GET PERMISSIONS
export const fetchPermissions = createAsyncThunk(
  "permissions/fetchPermissions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/permissions");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch permissions"
      );
    }
  }
);

// CREATE PERMISSION
export const createPermission = createAsyncThunk(
  "permissions/createPermission",
  async (permissionData, { rejectWithValue }) => {
    try {
      const res = await API.post("/permissions", permissionData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create permission"
      );
    }
  }
);

// UPDATE PERMISSION
export const updatePermission = createAsyncThunk(
  "permissions/updatePermission",
  async ({ id, permissionData }, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/permissions/${id}`, permissionData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update permission"
      );
    }
  }
);

// RESTORE PERMISSION
export const restorePermission = createAsyncThunk(
  "permissions/restorePermission",
  async (id, { rejectWithValue }) => {
    try {
      await API.patch(`/permissions/restore/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to restore permission"
      );
    }
  }
);

// DELETE PERMISSION
export const deletePermission = createAsyncThunk(
  "permissions/deletePermission",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/permissions/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete permission"
      );
    }
  }
);

const permissionSlice = createSlice({
  name: "permissions",
  initialState: {
    permissions: [],
    selectedPermission: null,
    loading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    error: null
  },
  reducers: {
    setSelectedPermission: (state, action) => {
      state.selectedPermission = action.payload;
    },
    clearSelectedPermission: (state) => {
      state.selectedPermission = null;
    },
    clearPermissionError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions =
          action.payload.data || action.payload.permissions || (Array.isArray(action.payload) ? action.payload : []);
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createPermission.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.createLoading = false;
        const newPermission =
          action.payload.data || action.payload.permission;
        if (newPermission) {
          state.permissions.unshift(newPermission);
        }
      })
      .addCase(createPermission.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      .addCase(updatePermission.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updatePermission.fulfilled, (state, action) => {
        state.updateLoading = false;
        const updatedPermission =
          action.payload.data || action.payload.permission;
        if (updatedPermission) {
          state.permissions = state.permissions.map((permission) =>
            permission._id === updatedPermission._id
              ? updatedPermission
              : permission
          );
        }
      })
      .addCase(updatePermission.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })

      .addCase(restorePermission.fulfilled, (state, action) => {
  state.permissions = state.permissions.map((p) =>
    p._id === action.payload
      ? { ...p, removed: false, enabled: true }
      : p
  );
})

      .addCase(deletePermission.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.permissions = state.permissions.filter(
          (permission) => permission._id !== action.payload
        );
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  }
});

export const {
  setSelectedPermission,
  clearSelectedPermission,
  clearPermissionError
} = permissionSlice.actions;

export default permissionSlice.reducer;