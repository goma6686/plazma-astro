import { getCollection } from "astro:content";

interface AlbumData {
  title: string;
  images?: {
    image: string;
    alt?: string;
  }[];
}

export async function getAlbumImagesWithMetadata(albumData: AlbumData) {
  if (albumData.images && albumData.images.length > 0) {
    return albumData.images.map((imgData: { image: string; alt?: string }) => {
      const cleanImagePath = imgData.image.startsWith("/")
        ? imgData.image
        : `/${imgData.image}`;

      return {
        src: cleanImagePath,
        alt: imgData.alt || `Image from ${albumData.title}`,
      };
    });
  }
  return [];
}

export async function getAllAlbumTitles() {
  const albums = await getCollection("albums");
  const albumsWithCovers = albums.map(album => {
    // Process the cover path if it exists
    const coverImage = album.data.cover
      ? album.data.cover.startsWith("/")
        ? album.data.cover
        : `/${album.data.cover}`
      : null;

    return {
      images: album.data.images,
      title: album.data.title,
      cover: coverImage,
      slug: album.slug,
    };
  });
  return albumsWithCovers;
}
