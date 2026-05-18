import TableReservation from "../../models/TableReservation.js";

// AUTO CANCEL QUÁ NGÀY
const autoCancelExpired = async () => {
  const now = new Date();

  // format YYYY-MM-DD
  const today = now
    .toISOString()
    .split("T")[0];

  const reservations =
    await TableReservation.find({
      status: "reserved",
    });

  for (const item of reservations) {
    // chỉ hủy nếu ngày nhỏ hơn hôm nay
    if (item.date < today) {
      item.status = "cancelled";

      item.cancelledAt =
        new Date();

      await item.save();
    }
  }
};

// CREATE
export const create = async (
  req,
  res,
) => {
  try {
    const reservation =
      await TableReservation.create({
        ...req.body,

        // mặc định khi tạo mới
        status: "reserved",
      });

    res.status(201).json(
      reservation,
    );
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// GET ALL
export const getAll = async (
  req,
  res,
) => {
  try {
    await autoCancelExpired();

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 5;

    const search =
      req.query.search || "";

    const status =
      req.query.status ||
      "reserved";

    const query = {
      customerName: {
        $regex: search,
        $options: "i",
      },
    };

    // filter status
    if (status !== "all") {
      query.status = status;
    }

    const total =
      await TableReservation.countDocuments(
        query,
      );

    const reservations =
      await TableReservation.find(
        query,
      )
        .sort({
          date: 1,
          time: 1,
        })
        .skip((page - 1) * limit)
        .limit(limit);

    res.json({
      reservations,
      total,
      currentPage: page,
      totalPages: Math.ceil(
        total / limit,
      ),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// GET TODAY
export const getTodayReservations =
  async (req, res) => {
    try {
      await autoCancelExpired();

      // YYYY-MM-DD
      const today = new Date()
        .toISOString()
        .split("T")[0];

      const reservations =
        await TableReservation.find({
          date: today,
          status: "reserved",
        }).sort({
          time: 1,
        });

      res.json(reservations);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };
// UPDATE STATUS
export const updateStatus =
  async (req, res) => {
    try {
      const updateData = {
        status: req.body.status,
      };

      if (
        req.body.status ===
        "cancelled"
      ) {
        updateData.cancelledAt =
          new Date();

        updateData.completedAt =
          null;
      } else if (
        req.body.status ===
        "completed"
      ) {
        updateData.completedAt =
          new Date();

        updateData.cancelledAt =
          null;
      }

      const reservation =
        await TableReservation.findByIdAndUpdate(
          req.params.id,
          updateData,
          {
            new: true,
          },
        );

      res.json(reservation);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };