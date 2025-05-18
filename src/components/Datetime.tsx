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
  size = "sm",
  className,
}: Props) {
  return (
    <div className={`flex items-center space-x-2 opacity-80 ${className}`}>
      <button className="text-decoration-none" id="add-to-calendar-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            size === "sm" ? "scale-90" : "scale-100"
          } inline-block h-6 w-6 min-w-[1.375rem] fill-skin-base`}
          aria-hidden="true"
        >
          <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
          <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
        </svg>
      </button>
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
