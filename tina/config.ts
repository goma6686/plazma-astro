import { Form, TinaCMS, defineConfig } from "tinacms";
import { galleryFields } from "./templates/gallery";
import { postFields } from "./templates/posts";
import { eventFields } from "./templates/events";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH  ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF  ||
  process.env.HEAD ||
  "main";

export default defineConfig({
    token:  process.env.TINA_TOKEN, // This should match the value in your .env file
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, // This should match the value in your .env file
    branch,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "event",
        label: "Events",
        format: "mdx",
        path: "src/content/event",
        fields: eventFields(),
      },
      {
        ui: {
          beforeSubmit: async ({
            form,
            cms,
            values,
          }: {
            form: Form
            cms: TinaCMS
            values: Record<string, any>
          }) => {
            if (form.crudType === 'create') {
              return {
                ...values,
                pubDatetime: new Date().toISOString()
              }
            }
          }
        },
        name: "post",
        label: "Posts",
        format: "mdx",
        path: "src/content/post",
        fields: postFields(),
        defaultItem: () => {
          return {
            pubDatetime: new Date().toISOString(),
            tags: ["elektroplazma"],
          }
        },
      },
      {
        name: "albums",
        label: "Albums",
        format: "mdx",
        path: "src/content/albums",
        fields: galleryFields()
      },
    ],
  },  
});
