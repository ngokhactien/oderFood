import React from "react";

const ProductDescription = ({ description, ingredients }) => {
  return (
    <div className="desc">
      <p>
        {description || "Sản phẩm chất lượng cao, thơm ngon hấp dẫn."}
      </p>

      {ingredients.length > 0 && (
        <>
          <h4>Nguyên liệu:</h4>

          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ProductDescription;