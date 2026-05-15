import {
  createReservation,
  getReservations,
} from "../services/tableReservationService.js";

// CREATE
export const create = async (
  req,
  res,
) => {
  try {
    const reservation =
      await createReservation(req.body);

    res.status(201).json(reservation);
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
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 5;

    const search =
      req.query.search || "";

    const data =
      await getReservations({
        page,
        limit,
        search,
      });

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};