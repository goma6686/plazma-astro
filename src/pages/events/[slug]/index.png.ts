import { getCollection } from "astro:content";
import { slugifyStr } from "@utils/slugify";

export async function getStaticPaths() {
  const events = await getCollection("event").then(p =>
    p.filter(({ data }) => data)
  );

  return events.map(event => ({
    params: { slug: slugifyStr(event.slug) },
    props: event,
  }));
}
