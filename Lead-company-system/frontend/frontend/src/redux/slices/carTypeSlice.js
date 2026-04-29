import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// GET CAR TYPES
export const fetchCarTypes = createAsyncThunk(
  "carTypes/fetchCarTypes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/car-types");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch car types"
      );
    }
  }
);

const carTypeSlice = createSlice({
  name: "carTypes",
  initialState: {
    carTypes: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.carTypes =
          action.payload.data ||
          action.payload.carTypes ||
          (Array.isArray(action.payload) ? action.payload : []);
      })
      .addCase(fetchCarTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default carTypeSlice.reducer;