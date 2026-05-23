// components/home/CustomerReviews.jsx

import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { useNavigate } from "react-router-dom";

import "./styles/CustomerReviews.css";

import { getPinnedComments } from "../../redux/commentSlice";

const Star = ({ filled }) => (
  <span
    className={
      filled
        ? "star filled"
        : "star"
    }
  >
    ★
  </span>
);

const ReviewCard = ({
  review,
  navigate,
}) => {
  const handleClick = () => {
    localStorage.setItem("product_tab", 'review');
    navigate(
      `/product/${review.product?._id}`,
      {
        state: {
          activeTab: "review",
          commentId: review._id,
        },
      },
    );
  };

  return (
    <div
      className="reviews--card"
      onClick={handleClick}
      style={{
        cursor: "pointer",
      }}
    >
      <div className="review-header">
        <img
          src={
            review.user?.avatar ||
            "https://i.pravatar.cc/100"
          }
          alt={review.user?.name}
        />

        <div>
          <h4 className="name">
            {review.user?.name}
          </h4>

          <div className="stars">
            {[...Array(5)].map(
              (_, i) => (
                <Star
                  key={i}
                  filled={
                    i <
                    (review.rating ||
                      0)
                  }
                />
              ),
            )}
          </div>
        </div>
      </div>

      <div className="review-product">
        {review.product?.name}
      </div>

      <p>{review.content}</p>
    </div>
  );
};

export default function ReviewSection() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    pinnedComments,
    loading,
  } = useSelector(
    (state) => state.comments,
  );

  useEffect(() => {
    dispatch(getPinnedComments());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="review-container">
        <h2>
          Đánh giá từ khách hàng
        </h2>

        <p>
          Đang tải đánh giá...
        </p>
      </div>
    );
  }

  if (
    !pinnedComments ||
    pinnedComments.length === 0
  ) {
    return null;
  }

  return (
    <div className="review-container">
      <h2>
        Đánh giá từ khách hàng
      </h2>

      <div className="review-grid">
        {pinnedComments.map(
          (review) => (
            <ReviewCard
              key={review._id}
              review={review}
              navigate={navigate}
            />
          ),
        )}
      </div>
    </div>
  );
} 