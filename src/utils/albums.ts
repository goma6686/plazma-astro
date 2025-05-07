import { getCollection } from "astro:content";

export async function getAlbumImagesWithMetadata(slug: string) {
  const albums = await getCollection("albums", entry => entry.slug === slug);

  if (albums.length === 0) return [];

  const albumData = albums[0].data;

  if (albumData.images && albumData.images.length > 0) {
    const imagePromises = albumData.images.map(
      async (imgData: {
        image: string;
        alt?: string;
        show_on_cta?: boolean;
      }) => {
        try {
          const cleanImagePath = decodeURIComponent(
            imgData.image.replace(/^\//, "")
          );
          const imageModule = await import(`/public/${cleanImagePath}`);
          return {
            src: imageModule.default,
            alt: imgData.alt || `Image from ${albumData.title}`,
            showOnCta: imgData.show_on_cta || false,
          };
        } catch (error) {
          console.error(`Failed to load image: ${imgData.image}`, error);
          return null;
        }
      }
    );

    const resolvedImages = await Promise.all(imagePromises);

    return resolvedImages.filter(img => img !== null);
  }
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
