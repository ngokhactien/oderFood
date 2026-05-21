import { useState, useEffect } from 'react';
import "./styles/PromoHeader.css";

const PromoHeader = ({title, hour}) => {
  // Thiết lập thời gian ban đầu (Giờ:Phút:Giây)
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 59,
    seconds: 31
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else {
            if (hours > 0) {
              hours--;
              minutes = 59;
              seconds = 59;
            } else {
              clearInterval(timer); // Hết giờ thì dừng
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Hàm thêm số 0 phía trước nếu số < 10 (ví dụ: 05)
  const formatTime = (time) => String(time).padStart(2, '0');

  return (
    <div className="promo-container">
      <h2 className="promo-title">{title}</h2>

     {hour == true ? (<div className="countdown-badge">
        <span className="promo-text">Chương trình sẽ bắt đầu sau</span>
        <div className="timer-box">
          <span className="time-num">{formatTime(timeLeft.hours)}</span>
          <span className="time-num">{formatTime(timeLeft.minutes)}</span>
          <span className="time-num">{formatTime(timeLeft.seconds)}</span>
        </div>
      </div>): <></>}
    </div>
  );
};

export default PromoHeader;