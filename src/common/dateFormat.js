export const formatDate = (date) => {
  if (!date) return "-";

  const d = new Date(date);

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = String(d.getFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
};

export const formatTime = (date) => {
  if (!date) return "-";

  const d = new Date(date);

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

/**
 * createdAt
 * => 10:45 21/5/26
 */
export const formatDateTime = (date) => {
  if (!date) return "-";

  return `${formatTime(date)} ${formatDate(date)}`;
};

/**
 * date + time
 * => 10:45 21/5/26
 */
export const formatReservationDateTime = (
  date,
  time,
) => {
  if (!date) return "-";

  return `${time} ${formatDate(date)}`;
};