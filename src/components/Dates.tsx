import { LOCALE } from "@config";
import React from "react";

interface DateProps {
  startDate: string | Date;
  endDate: string | Date;
  title?: string;
  description?: string;
  location?: string;
}

interface Props extends DateProps {
  size?: "sm" | "lg";
  className?: string;
}

export default function Dates({
  startDate,
  endDate,
  title = "",
  description = "",
  location = "",
  size = "sm",
  className,
}: Props) {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

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
    <div
      className={`flex items-center space-x-2 opacity-80 ${className} mt-2 mb-2`}
    >
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
        <FormattedDate startDate={startDate} endDate={endDate} />
      </span>
    </div>
  );
}

const FormattedDate = ({ startDate, endDate }: DateProps) => {
  const FromDate = new Date(startDate);

  const startYear = FromDate.getFullYear();

  const fromDate = FromDate.toLocaleString(LOCALE.langTag, {
    month: "short",
    day: "2-digit",
    timeZone: "Europe/Vilnius",
  });

  const toDate = new Date(endDate).toLocaleString(LOCALE.langTag, {
    month: "short",
    day: "numeric",
    timeZone: "Europe/Vilnius",
  });

  return (
    <>
      <span className="text-nowrap">
        {startYear}, {fromDate}
        <span aria-hidden="true"> - </span>
        {toDate}
      </span>
      <span className="sr-only">&nbsp;at&nbsp;</span>
    </>
  );
};
