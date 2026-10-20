type FormatDateProps = {
  dateInput: string | number | Date;
  timeZone?: string | undefined;
  format?: "long" | "short" | undefined;
};
export const formatDate = ({
  dateInput,
  timeZone = "UTC",
  format = "long",
}: FormatDateProps) => {
  const date = new Date(dateInput);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: timeZone,
  };

  if (format === "long") {
    options.month = "long";
    options.day = "numeric";
    options.year = "numeric";
  } else if (format === "short") {
    options.month = "2-digit";
    options.day = "2-digit";
    options.year = "2-digit";
  }

  return date.toLocaleDateString("en-US", options);
};
