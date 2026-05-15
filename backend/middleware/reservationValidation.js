const reservationValidation = (
  req,
  res,
  next,
) => {
  const {
    customerName,
    phone,
    date,
    time,
    guests,
  } = req.body;

  if (!customerName) {
    return res.status(400).json({
      message: "Thiếu tên khách hàng",
    });
  }

  if (!phone) {
    return res.status(400).json({
      message: "Thiếu số điện thoại",
    });
  }

  if (!date) {
    return res.status(400).json({
      message: "Thiếu ngày đặt",
    });
  }

  if (!time) {
    return res.status(400).json({
      message: "Thiếu giờ đặt",
    });
  }

  if (!guests) {
    return res.status(400).json({
      message: "Thiếu số lượng khách",
    });
  }

  next();
};

export default reservationValidation;