import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios.js";

// 🔹 FETCH LEADS
export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async ({ page, limit, search, status, assignedTo }, { rejectWithValue }) => {
    try {
      const res = await API.get("/leads", {
        params: {
          page,
          limit,
          search,
          status,
          assignedTo
        }
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch leads"
      );
    }
  }
);

// 🔹 CREATE LEAD
export const createLead = createAsyncThunk(
  "leads/createLead",
  async (leadData, { rejectWithValue }) => {
    try {
      const res = await API.post("/leads", leadData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create lead"
      );
    }
  }
);

// 🔹 UPDATE LEAD
export const updateLead = createAsyncThunk(
  "leads/updateLead",
  async ({ id, leadData }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/leads/${id}`, leadData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update lead"
      );
    }
  }
);

// 🔹 UPDATE LEAD STATUS
export const updateLeadStatus = createAsyncThunk(
  "leads/updateLeadStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/leads/${id}/status`, { status });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update lead status"
      );
    }
  }
);

// 🔹 ASSIGN LEAD
export const assignLead = createAsyncThunk(
  "leads/assignLead",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/leads/${id}/assign`, { userId });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to assign lead"
      );
    }
  }
);

// 🔹 DELETE LEAD
export const deleteLead = createAsyncThunk(
  "leads/deleteLead",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/leads/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete lead"
      );
    }
  }
);

const leadSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    pagination: {},
    selectedLead: null,
    loading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    error: null
  },
  reducers: {
    clearLeads: (state) => {
      state.leads = [];
      state.pagination = {};
      state.selectedLead = null;
      state.error = null;
    },
    setSelectedLead: (state, action) => {
      state.selectedLead = action.payload;
    },
    clearSelectedLead: (state) => {
      state.selectedLead = null;
    },
    clearLeadError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload.data || action.payload.leads || [];
        state.pagination = action.payload.pagination || {};
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createLead.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.createLoading = false;
        const newLead = action.payload.data || action.payload.lead || action.payload;
        if (newLead) {
          state.leads.unshift(newLead);
        }
      })
      .addCase(createLead.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateLead.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        state.updateLoading = false;
        const updatedLead = action.payload.data || action.payload.lead || action.payload;

        if (updatedLead) {
          state.leads = state.leads.map((lead) =>
            lead._id === updatedLead._id ? updatedLead : lead
          );

          if (state.selectedLead?._id === updatedLead._id) {
            state.selectedLead = updatedLead;
          }
        }
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })

      // UPDATE STATUS
      .addCase(updateLeadStatus.pending, (state) => {
        state.error = null;
      })
      .addCase(updateLeadStatus.fulfilled, (state, action) => {
        const updatedLead = action.payload.lead || action.payload.data || action.payload;

        if (updatedLead) {
          state.leads = state.leads.map((lead) =>
            lead._id === updatedLead._id ? updatedLead : lead
          );

          if (state.selectedLead?._id === updatedLead._id) {
            state.selectedLead = updatedLead;
          }
        }
      })
      .addCase(updateLeadStatus.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ASSIGN LEAD
      .addCase(assignLead.pending, (state) => {
        state.error = null;
      })
      .addCase(assignLead.fulfilled, (state, action) => {
        const updatedLead = action.payload.data || action.payload.lead || action.payload;

        if (updatedLead) {
          state.leads = state.leads.map((lead) =>
            lead._id === updatedLead._id ? updatedLead : lead
          );

          if (state.selectedLead?._id === updatedLead._id) {
            state.selectedLead = updatedLead;
          }
        }
      })
      .addCase(assignLead.rejected, (state, action) => {
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteLead.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.leads = state.leads.filter((lead) => lead._id !== action.payload);

        if (state.selectedLead?._id === action.payload) {
          state.selectedLead = null;
        }
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  }
});

export const {
  clearLeads,
  setSelectedLead,
  clearSelectedLead,
  clearLeadError
} = leadSlice.actions;

export default leadSlice.reducer;