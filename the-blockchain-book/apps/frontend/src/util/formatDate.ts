export const formatDate = (dateInput, timeZone = "UTC") => {
  const date = new Date(dateInput);

  // Return an empty string or error handle if the date is invalid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date provided to formatDateToLongString");
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: timeZone,
  });
};
