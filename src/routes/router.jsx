import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import TableOrder from "../pages/TableOrder";
import Takeaway from "../pages/Takeaway";
import ProductDetail from "../pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout chứa Header/Footer
    children: [
      { index: true, element: <Home /> }, // Trang chủ
      { path: "table-order", element: <TableOrder /> },
      { path: "takeaway", element: <Takeaway /> },
      { path: "product/:id", element: <ProductDetail /> },
    //   { path: "s", element: <SearchPage /> },
    //   { path: "b", element: <CollectionPages /> },
    ],
  },
//   {
//     path: "*",
//     element: <NotFoundPage />, // Trang 404 không có Header/Footer
//   },
]);

export default router;