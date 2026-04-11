import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { canAccess } from "../utils/authUtils";

function PermissionGuard({ permission, children }) {
  const { user, token } = useSelector((state) => state.auth);

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (permission && !canAccess(user, permission)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PermissionGuard;