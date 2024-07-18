import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"event">["data"];
}

export default function EventCard({ href, frontmatter }: Props) {
  const {
    title,
    eventDatetime,
    eventEndDatetime,
    description,
    eventImage,
    body,
  } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg decoration-dashed hover:underline",
  };
  return (
    <li className="event-card my-2">
      <a
        href={href}
        className=" text-xs text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <h6 {...headerProps}>{title}</h6>
      </a>
      <Datetime
        itemDatetime={eventDatetime}
        eventEndDatetime={eventEndDatetime}
      />
      <p className="descr">{description}</p>
      <img src={eventImage} className="w-50" />
    </li>
  );
}
