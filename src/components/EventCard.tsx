import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"event">["data"];
}

export default function EventCard({ href, frontmatter }: Props) {
  const { title, eventDateTime, description } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-sm decoration-dashed hover:underline",
  };

  return (
    <li className="event-card my-2">
      <a
        href={href}
        className=" text-xs text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <h6 {...headerProps}>{title}</h6>
      </a>
      <Datetime itemDatetime={eventDateTime} />
      <p className="descr">{description}</p>
    </li>
  );
}
