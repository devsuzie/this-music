import { format, utcToZonedTime } from "date-fns-tz";

export const formatDate = (
  date = new Date(),
  dateFormat = "yyyy-MM-dd",
  timeZone = "Asia/Seoul"
) =>
  format(date, dateFormat, {
    timeZone,
  });

export const getDateByTimeZone = (date = new Date(), timeZone = "Asia/Seoul") =>
  utcToZonedTime(date, timeZone);
