import { slugifyStr } from "@utils/slugify";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"image">["data"];
}

export default function Card({ href, frontmatter }: Props) {
  const { title, description, image, imageUrl } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title ?? "lol") },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="post-card my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <h3 {...headerProps}>{title}</h3>
      </a>

      <img
        src={imageUrl ?? image}
        className="post-image pt-2"
        style={{ maxWidth: "50%", margin: "auto" }}
      />
      <p className="line-clamp-5">{description ?? "XD"}</p>
    </li>
  );
}
