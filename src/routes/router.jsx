import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import TableOrder from "../pages/TableOrder";
import Detail from "../pages/Detail";
import Cart from "../pages/Cart";
import ProductCard from "../pages/ProductCard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout chứa Header/Footer
    children: [
      { index: true, element: <Home /> }, // Trang chủ
      { path: "table-order", element: <TableOrder /> },
      { path: "product/:id", element: <Detail /> },
      { path: "cart", element: <Cart /> },
      { path: "product-card/:id", element: <ProductCard/> },
    ],
  },
//   {
//     path: "*",
//     element: <NotFoundPage />, // Trang 404 không có Header/Footer
//   },
]);

export default router;