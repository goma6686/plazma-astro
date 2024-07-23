import { Form, TinaCMS, defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH  ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF  ||
  process.env.HEAD

export default defineConfig({

    //...
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
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            name: "eventImage",
            type: "image",
            required: false,
            ui: {
              component: "image",
            }
          },
          {
            name: "eventImageUrl",
            type: "string",
            required: false,
            
          },
          {
            type: "string",
            name: "description",
            label: "description",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            required: true,
          },
          {
            type: 'datetime',
            name: 'eventDatetime',
            label: 'When?',
            ui: {
              dateFormat: "DD MMMM YYYY",
              timeFormat: "HH:mm",
              defaultValue: new Date().toISOString(),
            },
            required: true,
          },
          {
            type: 'datetime',
            name: 'eventEndDatetime',
            label: 'Until?',
            ui: {
              dateFormat: "DD MMMM YYYY",
              timeFormat: "HH:mm",
              defaultValue: new Date().toISOString(),
            },
            required: true,
          },
        ]
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
                pubDatetime: new Date().toISOString(),
              }
            }
          }
        },
        name: "post",
        label: "Posts",
        format: "mdx",
        path: "src/content/post",
        defaultItem: () => {
          return {
            pubDatetime: new Date().toISOString(),
            tags: ["elektroplazma"],
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            label: "Description",
            name: "description",
            type: "string",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            label: "Video",
            name: "video",
            type: "string",
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            required: true,
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
            required: true,
            ui: {
              component: 'tags',
            },
          },
          {
            type: 'datetime',
            name: 'pubDatetime',
            label: 'Date posted',
            ui: {
              defaultValue: new Date().toISOString(),
            },
          },
          {
            type: 'boolean',
            name: 'featured',
            label: 'Featured',
            ui: {
              component: 'toggle',
              defaultValue: false,
            },
          },
        ],
      },
    ],
  },
  
});
