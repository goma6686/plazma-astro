import { getCollection } from "astro:content";

export async function getAlbumImagesWithMetadata(slug: string) {
  const albums = await getCollection("albums", entry => entry.slug === slug);
  if (albums.length === 0) return [];
  const albumData = albums[0].data;

  if (albumData.images && albumData.images.length > 0) {
    return albumData.images.map(
      (imgData: { image: string; alt?: string; show_on_cta?: boolean }) => {
        // Clean up the path and ensure it starts with /
        const cleanImagePath = imgData.image.startsWith("/")
          ? imgData.image
          : `/${imgData.image}`;

        return {
          src: cleanImagePath, // Return the path directly
          alt: imgData.alt || `Image from ${albumData.title}`,
          showOnCta: imgData.show_on_cta || false,
        };
      }
    );
  }
  return [];
}

export async function getAllAlbumTitles() {
  const albums = await getCollection("albums");

  const albumsWithCovers = await Promise.all(
    albums.map(async album => {
      let coverImage = null;
      if (album.data.cover) {
        try {
          const cleanImagePath = decodeURIComponent(
            album.data.cover.replace(/^\//, "")
          );
          const imageModule = await import(
            /* @vite-ignore */ `/public/${cleanImagePath}`
          );
          coverImage = imageModule.default;
        } catch (error) {
          console.error(`Failed to load image: ${album.data.cover}`, error);
        }
      }

      return {
        images: album.data.images,
        title: album.data.title,
        cover: coverImage,
        slug: album.slug,
      };
    })
  );
  return albumsWithCovers;
}
