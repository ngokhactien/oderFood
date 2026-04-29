import "../styles/home/FoodHeroBanner.css";

const PIZZA_REAL_IMG =
  "https://media.istockphoto.com/id/534000017/vi/anh/pizza-ngon-v%C3%A0-g%C3%A0-r%C3%A1n.jpg?s=1024x1024&w=is&k=20&c=EQ256G40ArEhwO0Z1fDj0GEGHi21hE-E2Yu44BFm5F4=";

const FoodHeroBanner = () => {
  return (
    <div className="hero-banner-container">
      {/* Lớp phủ Gradient tạo hiệu ứng sáng từ tâm ảnh Pizza */}
      <div className="hero-radial-spotlight"></div>

      <div className="hero-overlay-gradient">
        <div className="hero-content-left">
          <span className="hero-badge-red">ƯU ĐÃI ĐẶC BIỆT</span>
          <h1 className="hero-main-title">
            PIZZA THẬT
            <br />
            NGON NHẤT
          </h1>
          <p className="hero-description">Giảm ngay 45% - Chỉ trong hôm nay!</p>

          <button className="hero-order-btn">
            CHỐT ĐƠN LIỀN TAY <span className="arrow-icon">➜</span>
          </button>
        </div>
      </div>

      {/* Nhãn 45% Off - Đã chỉnh đậm và cố định */}
      <div className="fixed-discount-tag">
        <span className="discount-num">45%</span>
        <span className="discount-text">OFF</span>
      </div>

      <div className="hero-image-pizza-wrapper">
        <img
          src={PIZZA_REAL_IMG}
          alt="Pizza Seafood"
          className="pizza-main-img"
          referrerPolicy="no-referrer"
        />
      </div>

      <img
        src="https://cdn-icons-png.flaticon.com/512/1041/1041926.png"
        className="deco-item leaf-top-left"
        alt=""
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/1147/1147814.png"
        className="deco-item tomato-bottom-right"
        alt=""
      />
    </div>
  );
};

export default FoodHeroBanner;
