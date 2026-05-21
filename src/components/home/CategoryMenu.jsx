import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import { getShowCategories } from "../../redux/categorySlice";

import "./styles/CategoryMenu.css";

const CategoryMenu = () => {
  const dispatch = useDispatch();

  const {
    categories,
    loading,
    error,
  } = useSelector(
    (state) => state.menuCategories
  );

  useEffect(() => {
    dispatch(getShowCategories());
  }, [dispatch]);

  return (
    <section className="menu-section">
      <h2 className="menu-title">
        Lựa chọn thực đơn
      </h2>

      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="category-container">
          {categories?.map((item) => (
            <NavLink
              key={item._id}
              to={`/product-card?category=${item.slug}&page=1`}
              className="category-card"
            >
              <div className="image-circle">
                <img
                  src={item.image}
                  alt={item.name}
                />
              </div>

              <p className="category-name">
                {item.name}
              </p>
            </NavLink>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryMenu;