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
      message: "Thiếu tên khách",
    });
  }

  if (!phone) {
    return res.status(400).json({
      message: "Thiếu số điện thoại",
    });
  }

  if (!date) {
    return res.status(400).json({
      message: "Thiếu ngày",
    });
  }

  if (!time) {
    return res.status(400).json({
      message: "Thiếu giờ",
    });
  }

  if (!guests) {
    return res.status(400).json({
      message: "Thiếu số khách",
    });
  }

  next();
};

export default reservationValidation;