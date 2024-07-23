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

    /* eventDatetime: z.date(),
      eventtitle: z.string(),
      eventdescription: z.string().optional(),
      eventbody: z.string().optional(),
      //eventImage: image().optional(),
      eventImage: z.string().optional(),
      eventBodyImage: z.string().optional(),*/
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
  }),
});

export const collections = {
  post: blog,
  event: eventsCollection,
};
