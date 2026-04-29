import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import leadReducer from "./slices/leadSlice";
import userReducer from "./slices/userSlice";
import teamReducer from "./slices/teamSlice";
import roleReducer from "./slices/roleSlice";
import permissionReducer from "./slices/permissionSlice";
import dashboardReducer from "./slices/dashboardSlice";
import pageActionReducer from "./slices/pageActionSlice";
import carTypeReducer from "./slices/carTypeSlice";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    leads: leadReducer,
    users: userReducer,
    teams: teamReducer,
    roles: roleReducer,
    permissions: permissionReducer,
    dashboard: dashboardReducer,
     pageActions: pageActionReducer,
      carTypes: carTypeReducer
  }
});