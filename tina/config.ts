import { Form, TinaCMS, defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "master";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: '60dd9ff7-63dd-4cac-a491-c606e64d9901',
  // Get this from tina.io
  token: '5c0a3075720e6e64b9e05c921da1dbd298633e70',

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
        path: "src/content/event",
        format: "mdx",
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
            required: true,
            ui: {
              component: "image",
            }
          },
          {
            type: "string",
            name: "description",
            label: "description",
            required: true,
          },
          {
            type: 'rich-text',
            label: 'Post Body',
            name: 'body',
            isBody: true,
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
