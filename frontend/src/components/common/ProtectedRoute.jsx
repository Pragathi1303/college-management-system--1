import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Protected route wrapper that redirects to login if not authenticated.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.redirectTo - Where to redirect if not authenticated
 * @param {boolean} props.requireAdmin - Whether admin role is required
 */
function ProtectedRoute({ children, redirectTo = "/login", requireAdmin = false }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;