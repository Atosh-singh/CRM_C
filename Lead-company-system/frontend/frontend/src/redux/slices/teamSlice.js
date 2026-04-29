import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// GET TEAMS
export const fetchTeams = createAsyncThunk(
  "teams/fetchTeams",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await API.get("/teams", { params });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch teams"
      );
    }
  }
);

// CREATE TEAM
export const createTeam = createAsyncThunk(
  "teams/createTeam",
  async (teamData, { rejectWithValue }) => {
    try {
      const res = await API.post("/teams", teamData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create team"
      );
    }
  }
);

// UPDATE TEAM
export const updateTeam = createAsyncThunk(
  "teams/updateTeam",
  async ({ id, teamData }, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/teams/${id}`, teamData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update team"
      );
    }
  }
);

// DELETE TEAM
export const deleteTeam = createAsyncThunk(
  "teams/deleteTeam",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/teams/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete team"
      );
    }
  }
);

// RESTORE TEAM
export const restoreTeam = createAsyncThunk(
  "teams/restoreTeam",
  async (id, { rejectWithValue }) => {
    try {
      await API.patch(`/teams/restore/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue("Failed to restore team");
    }
  }
);

const teamSlice = createSlice({
  name: "teams",
  initialState: {
    teams: [],
    selectedTeam: null,
    loading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    error: null
  },
  reducers: {
    setSelectedTeam: (state, action) => {
      state.selectedTeam = action.payload;
    },
    clearSelectedTeam: (state) => {
      state.selectedTeam = null;
    },
    clearTeamError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload.data || [];
state.total = action.payload.total || 0;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createTeam.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.createLoading = false;
        const newTeam = action.payload.data || action.payload.team;
        if (newTeam) {
          state.teams.unshift(newTeam);
        }
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      .addCase(updateTeam.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.updateLoading = false;
        const updatedTeam = action.payload.data || action.payload.team;
        if (updatedTeam) {
          state.teams = state.teams.map((team) =>
            team._id === updatedTeam._id ? updatedTeam : team
          );
        }
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteTeam.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.teams = state.teams.filter((team) => team._id !== action.payload);
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })


      .addCase(restoreTeam.fulfilled, (state, action) => {
  state.teams = state.teams.map((team) =>
    team._id === action.payload
      ? { ...team, removed: false, enabled: true }
      : team
  );
})

      
  }
});

export const { setSelectedTeam, clearSelectedTeam, clearTeamError } =
  teamSlice.actions;

export default teamSlice.reducer;