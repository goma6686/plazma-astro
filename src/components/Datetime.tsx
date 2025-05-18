import { LOCALE } from "@config";
import React from "react";

interface DatetimesProps {
  itemDatetime: string | Date;
  eventEndDatetime: string | Date;
  title?: string;
  description?: string;
  location?: string;
}

interface Props extends DatetimesProps {
  size?: "sm" | "lg";
  className?: string;
}

export default function Datetime({
  itemDatetime,
  eventEndDatetime,
  title = "",
  description = "",
  location = "",
  size = "sm",
  className,
}: Props) {
  const startDateObj = new Date(itemDatetime);
  const endDateObj = new Date(eventEndDatetime);

  const formatAddEventDate = (date: Date) => {
    return date.toLocaleString("lt-LT", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Europe/Vilnius",
    });
  };

  const atcStartDate = formatAddEventDate(startDateObj);
  const atcEndDate = formatAddEventDate(endDateObj);

  return (
    <div className={`flex items-center space-x-2 opacity-80 ${className}`}>
      <div
        title="Add to Calendar"
        className="addeventatc"
        data-styling="none"
        data-dropdown-y="down"
      >
        <img
          src="https://cdn.addevent.com/libs/imgs/icon-calendar-fff-t1.svg"
          alt=""
          style={{ width: 18 }}
        />
        <span className="start">{atcStartDate}</span>
        <span className="end">{atcEndDate}</span>
        <span className="timezone">Europe/Vilnius</span>
        <span className="title">{title}</span>
        <span className="description">{description}</span>
        <span className="location">{location}</span>
      </div>
      <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
        <FormattedDatetime
          itemDatetime={itemDatetime}
          eventEndDatetime={eventEndDatetime}
        />
      </span>
    </div>
  );
}

const FormattedDatetime = ({
  itemDatetime,
  eventEndDatetime,
}: DatetimesProps) => {
  const startDatetime = new Date(itemDatetime);
  const endDatetime = new Date(eventEndDatetime);

  const startYear = startDatetime.getFullYear();

  const startDate = startDatetime.toLocaleString(LOCALE.langTag, {
    month: "short",
    day: "2-digit",
    timeZone: "Europe/Vilnius",
    hour: "numeric",
    minute: "2-digit",
  });

  const endDate = endDatetime.toLocaleTimeString(LOCALE.langTag, {
    month: "short",
    day: "2-digit",
    timeZone: "Europe/Vilnius",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <>
      <span className="text-nowrap">
        {startYear}
        <span aria-hidden="true"> </span>
        {startDate}
      </span>
      <span className="sr-only">&nbsp;at&nbsp;</span>
      <span aria-hidden="true"> | </span>
      <span className="text-nowrap">{endDate}</span>
    </>
  );
};
