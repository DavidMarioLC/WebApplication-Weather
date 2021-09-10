const options = {
  day: "numeric",
  weekday: "long",
  month: "long",
};

export function formatDate(date, defaultOptions = options) {
  return new Intl.DateTimeFormat("es", defaultOptions).format(date);
}
