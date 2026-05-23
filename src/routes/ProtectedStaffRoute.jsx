// src/routes/ProtectedStaffRoute.jsx

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedStaffRoute({
  children,
}) {
  const user = useSelector((state) => state.auth.user);

  // chưa login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // chỉ admin hoặc staff
  if (
    user.role !== "admin" &&
    user.role !== "staff"
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}