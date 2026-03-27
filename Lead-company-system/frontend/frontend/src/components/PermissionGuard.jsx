import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { canAccess } from "../utils/authUtils";

function PermissionGuard({ permission, children }) {

  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Use centralized permission logic
  if (!canAccess(user, permission)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PermissionGuard;