import type { CollectionEntry } from "astro:content";

const getSortedImages = (images: CollectionEntry<"image">[]) => {
  return images.sort(
    (a, b) =>
      +new Date(a.data.uploadedDateTime) - +new Date(b.data.uploadedDateTime)
  );
};

export default getSortedImages;
