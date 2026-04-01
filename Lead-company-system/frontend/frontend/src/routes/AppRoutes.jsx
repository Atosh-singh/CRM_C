import { BrowserRouter, Routes, Route } from "react-router-dom";

import CRMLayout from "../layouts/CRMLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Dashboard from "../pages/dashboard/Dashboard";
import Leads from "../pages/leads/Leads";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import CreateUser from "../pages/users/CreateUser";
import Cars from "../pages/cars/Cars";

import Users from "../pages/users/Users";

import CreateRole from "../pages/roles/CreateRole";
import CreatePermission from "../pages/permissions/CreatePermission";

import Profile from "../pages/users/Profile";
import EditProfile from "../pages/users/EditProfile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


        

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <CRMLayout>
                <Dashboard />
              </CRMLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <CRMLayout>
                <Leads />
              </CRMLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <CRMLayout>
                <Users />
              </CRMLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/create"
          element={
            <ProtectedRoute>
              <CRMLayout>
                <CreateUser />
              </CRMLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/roles/create"
          element={
            <ProtectedRoute>
              <CRMLayout>
                <CreateRole />
              </CRMLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/permissions/create"
          element={
            <ProtectedRoute>
              <CRMLayout>
                <CreatePermission />
              </CRMLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/cars"
          element={
            <ProtectedRoute>
              <CRMLayout>
                <Cars />
              </CRMLayout>
            </ProtectedRoute>
          }
        />


     {/* Profile Routes */}
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <CRMLayout>
        <Profile />
      </CRMLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/edit-profile"
  element={
    <ProtectedRoute>
      <CRMLayout>
        <EditProfile />
      </CRMLayout>
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
