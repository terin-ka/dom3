import React from "react";
import { format } from "date-fns";

export const CustomDateRenderer = (props) => {
  let formattedDate = "";
  if (props.value) {
    const date = new Date(props.value);
    formattedDate = format(date, "dd.MM.yyyy");
  }
  return <span>{formattedDate}</span>;
};

export const CustomDateTimeRenderer = (props) => {
  let formattedDate = "";
  if (props.value) {
    const date = new Date(props.value);
    formattedDate = format(date, "dd.MM.yy HH:mm");
  }
  return <span>{formattedDate}</span>;
};

export const isDateInRange = (dateToCheck, startDate, endDate) => {
  const date = new Date(dateToCheck);
  const start = new Date(startDate);
  const end = new Date(endDate);
  // Nastavení času na 00:00:00.000 pro všechny datumy, tímto zanedbáme časovou část
  date.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
};

export const isTodayInRange = (startDate, endDate) => {
  return isDateInRange(new Date(), startDate, endDate);
};

export const getTodayHistoryStatus = (startDate, endDate, total, used) => {
  if (total <= used) {
    return { bg: "dark", status: "vyčerpáno" };
  }
  if (isDateInRange(new Date(), startDate, endDate)) {
    return { bg: "success", status: "aktivní" };
  } else {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    // Nastavení času na 00:00:00.000 pro všechny datumy, tímto zanedbáme časovou část
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    if (today.getTime() > end.getTime()) {
      return { bg: "secondary", status: "expirováno" };
    } else {
      return { bg: "info", status: "čekající" };
    }
  }
};

export const getDateTimeFormatted = (value) => {
  const date = new Date(value);
  return format(date, "dd.MM.yy HH:mm");
};
