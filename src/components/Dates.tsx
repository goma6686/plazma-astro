import { LOCALE } from "@config";
import React from "react";

interface DateProps {
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  title?: string;
  description?: string;
  location?: string;
}

interface Props extends DateProps {
  size?: "sm" | "lg";
  className?: string;
}

export default function Dates({
  startDate = null,
  endDate = null,
  title = "",
  description = "",
  location = "",
  size = "sm",
  className,
}: Props) {
  const buttonId = `atc-btn-${title?.replace(/\s+/g, "-").toLowerCase() || ""}-${ new Date(startDate ?? '')?.getTime()}`;

  return (
    <div
      className={`flex items-center space-x-2 opacity-80 ${className} mt-2 mb-2`}
    >
      {startDate || endDate ? 
          <button
          className="text-decoration-none hover:opacity-70 transition-opacity"
          id={buttonId}
          data-title={title}
          data-description={description}
          data-location={location}
          data-start-date={startDate?.toString()}
          data-end-date={endDate?.toString()}
        >
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
        : null
      }
      <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
        {startDate ? 
        <FormattedDate startDate={startDate} endDate={endDate} />
      : null}
      </span>
    </div>
  );
}

const FormattedDate = ({ startDate, endDate }: DateProps) => {
  const FromDate = startDate ? new Date(startDate) : null;
  const startYear = FromDate?.getFullYear();
  const fromDate = FromDate?.toLocaleString(LOCALE.langTag, {
    month: "short",
    day: "2-digit",
    timeZone: "Europe/Vilnius",
  });
  const toDate = endDate ? new Date(endDate).toLocaleString(LOCALE.langTag, {
    month: "short",
    day: "numeric",
    timeZone: "Europe/Vilnius",
  }) : null;
  return (
    <>
      <span className="text-nowrap">
        {startYear}, {fromDate}
        <span aria-hidden="true"> - </span>
        {toDate}
      </span>
    </>
  );
};
