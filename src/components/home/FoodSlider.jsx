import { useState, useEffect } from 'react';
import "../styles/home/FoodSlider.css";
import foodMenu from '../../data/foodSlider'
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const FoodSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? foodMenu.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === foodMenu.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    // Thiết lập bộ hẹn giờ 5 giây (5000ms)
    const timer = setInterval(() => {
      goToNext();
    }, 5000);

    // QUAN TRỌNG: Xóa bộ hẹn giờ khi component bị đóng hoặc khi currentIndex thay đổi
    // Điều này tránh việc các bộ hẹn giờ bị chồng chéo lên nhau
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="food-slider">
      {/* Vùng chứa các ảnh */}
      <div 
        className="food-slider-wrapper" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {foodMenu.map((dish) => (
          <div 
            key={dish.id} 
            className="food-slide" 
            style={{ backgroundImage: `url(${dish.image})` }}
          >
            {/* Lớp phủ thông tin món ăn (giống Netflix style) */}
            <div className="food-info-overlay">
              <div className="food-info-content">
                <span className="food-tagline">MÓN NGON HÔM NAY</span>
                <h1 className="food-title">{dish.title}</h1>
                <p className="food-description">{dish.description}</p>
                <div className="food-actions">
                  <button className="btn-order"><ShoppingCartIcon className="icon" /> <span>Đặt Ngay</span></button>
                  <button className="btn-detail">Xem Chi Tiết</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nút điều hướng - Thiết kế lại cho đẹp */}
      <div className="arrow prev" onClick={goToPrev}>
        <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
      </div>
      <div className="arrow next" onClick={goToNext}>
        <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
      </div>
      
      {/* Phân trang (Dots) - Cho người dùng biết đang ở ảnh nào */}
      <div className="food-dots">
        {foodMenu.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default FoodSlider;