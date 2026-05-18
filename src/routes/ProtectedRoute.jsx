// src/routes/ProtectedRoute.jsx

import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  adminOnly = false,
}) {
  const user = useSelector((state) => state.auth.user);

  // chưa login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // chỉ admin mới vào được
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}