// Tính giá sau khi giảm
export const calculatePrice = (oldPrice, discount) => {  
  if (!oldPrice || !discount) return oldPrice;
  return Math.round(oldPrice * (1 - discount / 100));
};

export const calculateFinalPriceWithDiscounts = (oldPrice, discounts = []) => {
  if (!oldPrice || discounts.length === 0) return oldPrice;

  let finalPrice = oldPrice;

  discounts.forEach((d) => {
    const percent = parseInt(d.replace("%", "").replace("-", ""));
    finalPrice = finalPrice * (1 - percent / 100);
  });

  return Math.round(finalPrice);
};

// Format tiền VND
export const formatPrice = (value) => {
  if (!value) return "0đ";
  return value.toLocaleString("vi-VN") + "đ";
};
