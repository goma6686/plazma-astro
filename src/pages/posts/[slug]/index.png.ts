import { getCollection } from "astro:content";
import { slugifyStr } from "@utils/slugify";

export async function getStaticPaths() {
  const posts = await getCollection("post"); /*.then(p =>
    p.filter(({ data }) => !data.draft)
  );*/

  return posts.map(post => ({
    params: { slug: slugifyStr(post.data.title) },
    props: post,
  }));
}
