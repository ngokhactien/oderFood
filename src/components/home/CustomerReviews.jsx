import "./styles/CustomerReviews.css";

const reviews = [
  {
    name: "Nhã Phương - Diễn viên",
    avatar: "https://i.pravatar.cc/100?img=1",
    rating: 3,
    content:
      "Mình đặt cơm trưa ở đây hàng ngày, món ăn ngon, đa dạng và giá cả hợp lý. Nhân viên phục vụ nhiệt tình, tư vấn menu chi tiết. Giao hàng đúng giờ, đồ ăn còn nóng hổi. Mình rất hài lòng và sẽ giới thiệu cho bạn bè!",
  },
  {
    name: "Ngọc Trinh - Người mẫu",
    avatar: "https://i.pravatar.cc/100?img=2",
    rating: 4,
    content:
      "Quán có nhiều món ăn đa dạng, từ món Việt, món Á đến món Âu. Không gian sạch sẽ, thoáng mát, phù hợp để họp mặt gia đình. Đặc biệt là chất lượng món ăn luôn đảm bảo, nguyên liệu tươi ngon.",
  },
  {
    name: "Trấn Thành - Danh hài",
    avatar: "https://i.pravatar.cc/100?img=3",
    rating: 5,
    content:
      "Mình hay đặt tiệc cho gia đình và công ty, quán này phục vụ nhanh, giá cả hợp lý. Có nhiều combo ưu đãi cho nhóm đông người. Uy tín lắm!",
  },
  {
    name: "Trường Giang - Danh hài",
    avatar: "https://i.pravatar.cc/100?img=4",
    rating: 4,
    content:
      "Quán có nhiều món ăn kèm và đồ uống đa dạng. Nhân viên nhiệt tình tư vấn món ăn phù hợp. Combo cơm + nước uống giảm giá khá nhiều.",
  },
];

const Star = ({ filled }) => (
  <span className={filled ? "star filled" : "star"}>★</span>
);

const ReviewCard = ({ review }) => {
  return (
    <div className="reviews--card">
      <div className="review-header">
        <img src={review.avatar} alt={review.name} />
        <div>
          <h4 className="name">{review.name}</h4>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} filled={i < review.rating} />
            ))}
          </div>
        </div>
      </div>
      <p>{review.content}</p>
    </div>
  );
};

export default function ReviewSection() {
  return (
    <div className="review-container">
      <h2>Đánh giá từ khách hàng</h2>
      <div className="review-grid">
        {reviews.map((r, i) => (
          <ReviewCard key={i} review={r} />
        ))}
      </div>
    </div>
  );
}
