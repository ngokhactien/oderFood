import { useSelector } from "react-redux";

const useMenuItems = () => {
  const user = useSelector((state) => state.auth.user);

  const menuItems = [
    { name: "Trang chủ", link: "/" },

    { name: "Mua sắm", link: "/product-card" },

    // chỉ admin/staff mới hiện
    ...(user?.role === "admin" ||
    user?.role === "staff"
      ? [
          {
            name: "Tại bàn",
            link: "/table-order",
          },
        ]
      : []),
  ];

  return menuItems;
};

export default useMenuItems;