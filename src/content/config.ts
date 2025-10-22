import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    author: z.string().default(SITE.author),
    pubDatetime: z.date(),
    title: z.string(),
    featured: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    description: z.string(),
    video: z.string().optional(),
    postImage: z.string().optional(),
  }),
});

const eventsCollection = defineCollection({
  schema: z.object({
    eventDatetime: z.date(),
    eventEndDatetime: z.date(),
    eventImageUrl: z.string().optional(),
    title: z.string(),
    description: z.string(),
    eventImage: z.string().optional(),
    body: z.string().optional(),
    location: z.string().optional(),
  }),
});

const rentCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    price: z.string(),
    rentImage: z.string().optional(),
    body: z.string().optional(),
  }),
});

const albumSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  cover: z.string().optional(),
  images: z
    .array(
      z.object({
        image: z.string(),
        alt: z.string().optional(),
      })
    )
    .optional(),
});

export const collections = {
  post: blog,
  event: eventsCollection,
  rent: rentCollection,
  albums: defineCollection({
    schema: albumSchema,
    type: "content",
  })
};

