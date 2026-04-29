import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  actions: [],
  filters: [],
  onSearch: null,
};

const pageActionSlice = createSlice({
  name: "pageActions",
  initialState,
  reducers: {
    setPageActions: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

// ✅ THIS LINE WAS MISSING / WRONG
export const { setPageActions } = pageActionSlice.actions;

// ✅ default export
export default pageActionSlice.reducer;