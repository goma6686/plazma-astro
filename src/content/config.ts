import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      title: z.string(),
      featured: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      description: z.string(),
      body: z.string(),
      featuredImage: image(),
      featuredImageAlt: z.string(),

      eventDatetime: z.date(),
      eventtitle: z.string(),
      eventdescription: z.string().optional(),
      eventbody: z.string().optional(),
      //eventImage: image().optional(),
      eventImage: z.string().optional(),
      eventBodyImage: z.string().optional(),
    }),
});

const event = defineCollection({
  type: "content", //data
  schema: ({ image }) =>
    z.object({
      eventDatetime: z.date(),
      title: z.string(),
      description: z.string().optional(),
      body: z.string().optional(),
      //eventImage: image().optional(),
      eventImage: z.string().optional(),
      eventBodyImage: z.string().optional(),
    }),
});

export const collections = {
  /*'blog': blog,
  'event': event*/ blog,
};
