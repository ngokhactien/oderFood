// src/routes/AuthRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AuthRoute({ children }) {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}