import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

interface RentData {
  title: string;
  description: string;
  price: number
  rentImage?: string;
}[]

export async function getAllStuffForRent() {
  const rentstuff = await getCollection("rent");
  const allRentables = rentstuff.map(thing => {
    console.log("rentstuff " + thing.data.title);
    return {
      title: thing.data.title,
      price: thing.data.price,
      description: thing.data.description,
      cover: thing.data.rentImage,
      slug: thing.slug,
    };
  });
  return allRentables;
}