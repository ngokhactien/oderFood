import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import TableOrder from "../pages/TableOrder";
import Detail from "../pages/Detail";
import Cart from "../pages/Cart";
import ProductCard from "../pages/ProductCard";
import AuthPage from "../pages/AuthPage";
import Profile from "../pages/Profile";
import ResetPassword from "../components/account/ResetPassword";

// chặn quyền truy cập
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "table-order", element: <TableOrder /> },
      { path: "product/:id", element: <Detail /> },
      { path: "cart", element: <Cart /> },
      { path: "product-card/:id", element: <ProductCard /> }, //mang về

      // ❌ nếu đã login thì không vào được
      {
        path: "login",
        element: (
          <AuthRoute>
            <AuthPage mode="login" />
          </AuthRoute>
        ),
      },
      {
        path: "register",
        element: (
          <AuthRoute>
            <AuthPage mode="register" />
          </AuthRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <AuthRoute>
            <AuthPage mode="forgot" />
          </AuthRoute>
        ),
      },
      {
        path: "reset-password",
        element: (
          <AuthRoute>
            <ResetPassword />
          </AuthRoute>
        ),
      },

      // ✅ phải login mới vào được
      {
        path: "info",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
