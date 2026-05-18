import axios from "axios";

const BASE_URL =
  "http://localhost:5000/api/reservations";

export const getReservationsApi =
  async ({
    page,
    limit,
    search,
    status,
  }) => {
    const res = await axios.get(
      `${BASE_URL}?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    );

    return res.data;
  };

export const updateReservationStatusApi =
  async (id, status) => {
    const res = await axios.patch(
      `${BASE_URL}/${id}`,
      {
        status,
      },
    );

    return res.data;
  };