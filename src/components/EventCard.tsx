import { slugifyStr } from "@utils/slugify";
import Dates from "./Dates";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"event">["data"];
  className?: string;
  drawLine?: boolean;
}

export default function EventCard({
  href,
  frontmatter,
  drawLine,
  className = "w-full",
}: Props) {
  const {
    title,
    eventDatetime,
    eventEndDatetime,
    eventImage,
    description,
    eventImageUrl,
  } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  const imgSrc = eventImageUrl || eventImage;

  return (
    <>
      <li className="event-card my-2">
        <a
          href={href}
          className=" text-xs text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
        >
          <h6 {...headerProps}>{title}</h6>
        </a>
        <Dates startDate={eventDatetime} endDate={eventEndDatetime} />

        <div>
          <p className="line-clamp-5">{description}</p>
        </div>
        {imgSrc ? (
          <div className={`${className} mx-auto px-0`}>
            <img
              src={imgSrc}
              className="w-screen post-image p-2 size-full"
              style={{ maxWidth: "100%", margin: "auto" }}
              alt={title || "Event image"}
              loading="lazy"
              width="800"
              height="500"
            />
          </div>
        ) : null}
      </li>
      {drawLine ? (
        <div className={`w-full mx-auto px-0`}>
          <hr className="border-skin-line" aria-hidden={true} />
        </div>
      ) : null}
    </>
  );
}
