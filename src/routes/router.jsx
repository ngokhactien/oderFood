import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import TableOrder from "../pages/TableOrder";
import Detail from "../pages/Detail";
import Cart from "../pages/Cart";
import ProductCard from "../pages/ProductCard";
import AuthPage from "../pages/AuthPage";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout chứa Header/Footer
    children: [
      { index: true, element: <Home /> }, // Trang chủ
      { path: "table-order", element: <TableOrder /> },
      { path: "product/:id", element: <Detail /> },
      { path: "cart", element: <Cart /> },
      { path: "product-card/:id", element: <ProductCard /> },
      // login
      { path: "login", element: <AuthPage mode="login" /> },
      { path: "register", element: <AuthPage mode="register" /> },
      { path: "forgot-password", element: <AuthPage mode="forgot" /> },

      // INFO
      { path: "info", element: <Profile mode="forgot" /> },
    ],
  },
  //   {
  //     path: "*",
  //     element: <NotFoundPage />, // Trang 404 không có Header/Footer
  //   },
]);

export default router;
