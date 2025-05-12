export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function getDatesInRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const date = new Date(start);
  const dates = [];

  while (date <= end) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}