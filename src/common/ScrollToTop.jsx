import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuộn lên đầu trang khi đường dẫn thay đổi
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Có thể đổi thành "auto" nếu không muốn hiệu ứng mượt
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;