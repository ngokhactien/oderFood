import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import ProductCard from "../pages/ProductCard";
import AuthPage from "../pages/AuthPage";
import Profile from "../pages/Profile";
import ResetPassword from "../components/account/ResetPassword";
import ProtectedStaffRoute from "./ProtectedStaffRoute";

// chặn quyền truy cập
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";
import Address from "../components/profile/Address";
import ProfileInfo from "../components/profile/ProfileInfo";
import CheckoutPage from "../pages/CheckoutPage";
import POSLayout from "../pages/POSLayout";
import ProductDetail from "../pages/ProductDetail";

// admin
import AdminLayout from "../AdminLayout";
import OrdersTable from "../components/Dashboard/OrdersTable/OrdersTable";
import RevenueOverview from "../components/Dashboard/RevenueOverview/RevenueOverview";
import Products from "../components/Dashboard/Products/Products";
import OrderDetail from "../components/Dashboard/OrdersTable/OrderDetail";
import ProductForm from "../components/Dashboard/Products/ProductForm";
import AdminInventory from "../components/Dashboard/Inventory/AdminInventory";
import AdminImportInventory from "../components/Dashboard/Inventory/AdminImportInventory";
import AdminComments from "../components/Dashboard/Comments/AdminComments";
import AdminCommentDetail from "../components/Dashboard/Comments/AdminCommentDetail";
import AdminUsers from "../components/Dashboard/Users/AdminUsers";
import AdminCategories from "../components/Dashboard/Categories/AdminCategories";
import Dashboard from "../components/Dashboard/Home/AdminReport";
import AdminProductsReport from "../components/Dashboard/Reports/AdminProductsReport";
import AdminTransferTable from "../components/Dashboard/TransferTable/AdminTransferTable";
// import AdminInfo from "../components/Dashboard/AdminInfo";

const router = createBrowserRouter([
  //user
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "table-order",
        element: (
          <ProtectedStaffRoute>
            <POSLayout />
          </ProtectedStaffRoute>
        ),
      },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "product-card", element: <ProductCard /> }, //mang về
      { path: "checkout", element: <CheckoutPage /> }, //thanh toán momo

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
      // PROFILE
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "info",
            element: <ProfileInfo />,
          },
          {
            path: "address",
            element: <Address />,
          },
          // {
          //   path: "orders",
          //   element: <Orders />,
          // },
        ],
      },
    ],
  },

  // 🔥 ADMIN
  {
    path: "/admin",
    element: (
      <ProtectedRoute adminOnly={true}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "orders", element: <OrdersTable /> },
      { path: "orders/detail/:mode", element: <OrderDetail /> },
      { path: "products", element: <Products /> },
      { path: "products/form/:mode/:id", element: <ProductForm /> },
      { path: "products/form/add", element: <ProductForm /> },
      { path: "bookings", element: <AdminTransferTable /> },
      { path: "revenue", element: <RevenueOverview /> },
      { path: "inventory", element: <AdminInventory /> },
      { path: "inventory/import", element: <AdminImportInventory /> },
      { path: "comments", element: <AdminComments /> },
      { path: "comments/detail/:id", element: <AdminCommentDetail /> },
      { path: "members", element: <AdminUsers /> },
      { path: "categories", element: <AdminCategories /> },
      { path: "reports", element: <AdminProductsReport /> },
    ],
  },
]);

export default router;
