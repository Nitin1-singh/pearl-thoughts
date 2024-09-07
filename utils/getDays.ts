import dayjs, { Dayjs } from "dayjs";

export function getDates({
  date,
  recurrenceType,
  recurrenceTypeC,
  selectedDate,
  intervalChange,
  selectedDays,
  weekInterval,
}: {
  date: any;
  recurrenceType: any;
  recurrenceTypeC: any;
  selectedDate: any;
  intervalChange: any;
  selectedDays: any;
  weekInterval: any;
}) {
  if (recurrenceType === "daily" && recurrenceTypeC === "none") {
    return selectedDate && dayjs(date).isAfter(selectedDate);
  } else if (recurrenceType === "weekly" && recurrenceTypeC === "none") {
    // Check if a date has been selected and the current date is after the selected date
    if (selectedDate && dayjs(date).isAfter(selectedDate)) {
      // Return true if the day of the week is the same
      return dayjs(date).day() === dayjs(selectedDate).day();
    }
    return false;
  } else if (recurrenceType === "monthly" && recurrenceTypeC === "none") {
    // Check if a date has been selected and the current date is after the selected date
    if (selectedDate && dayjs(date).isAfter(selectedDate, "day")) {
      // Return true if the day of the month is the same
      return dayjs(date).date() === dayjs(selectedDate).date();
    }
    return false;
  } else if (recurrenceType === "yearly") {
    if (selectedDate && dayjs(date).isAfter(selectedDate, "day")) {
      // Return true if the month and day are the same
      return (
        dayjs(date).month() === dayjs(selectedDate).month() &&
        dayjs(date).date() === dayjs(selectedDate).date()
      );
    }
    return false;
  }
  if (recurrenceTypeC === "daily") {
    const selectedDay = dayjs(selectedDate);
    const currentDay = dayjs(date);
    console.log(selectedDate, selectedDay);
    return (
      currentDay.isAfter(selectedDay) &&
      currentDay.diff(selectedDay, "day") % intervalChange === 0
    );
  }
  if (recurrenceTypeC === "weekly") {
    const selectedDay = dayjs(selectedDate);
    const currentDay = dayjs(date);
    return (
      currentDay.isAfter(selectedDay) &&
      currentDay.diff(selectedDay, "week") % intervalChange === 0 &&
      currentDay.day() === selectedDay.day()
    ); // Check if day of week matches
  }
  if (recurrenceTypeC === "monthly") {
    if (!selectedDate) return false;

    const selectedDay = dayjs(selectedDate);
    const currentDay = dayjs(date);

    // Check if the current date is after the selected date
    const isAfterSelectedDate = currentDay.isAfter(selectedDay, "day");

    // Check if the date matches the same day of the month every X months
    const matchesSameDayOfMonth = currentDay.date() === selectedDay.date();
    const fitsInterval =
      currentDay.diff(selectedDay, "month") % intervalChange === 0;

    return isAfterSelectedDate && matchesSameDayOfMonth && fitsInterval;
  }
  if (recurrenceTypeC === "yearly") {
    if (!selectedDate) return false;

    const selectedDay = dayjs(selectedDate);
    const currentDay = dayjs(date);

    // Check if the current date is after the selected date
    const isAfterSelectedDate = currentDay.isAfter(selectedDay, "day");

    // Check if the date matches the same day of the year every X years
    const matchesSameDayOfYear =
      currentDay.date() === selectedDay.date() &&
      currentDay.month() === selectedDay.month();
    const fitsInterval =
      currentDay.diff(selectedDay, "year") % intervalChange === 0;

    return isAfterSelectedDate && matchesSameDayOfYear && fitsInterval;
  }

  if (selectedDays.length !== 0) {
    console.log(selectedDays, selectedDate, date);
    const selectedDay = dayjs(selectedDate);
    const currentDay = dayjs(date);

    // Check if the current date is after or the same as the selected date
    const isAfterOrSameDate = !currentDay.isBefore(selectedDay, "day");

    // Check if the day of the week matches any of the selected days
    const matchesDayOfWeek = selectedDays.has(currentDay.day());

    // Calculate the number of weeks between the current date and the selected date
    const weeksDiff = currentDay.diff(selectedDay, "week");

    // Check if the date fits the recurrence interval in weeks
    const fitsInterval = weeksDiff >= 0 && weeksDiff % weekInterval === 0;

    return isAfterOrSameDate && matchesDayOfWeek && fitsInterval;
  }
}
