// tina/config.ts
import { defineConfig } from "tinacms";

// tina/templates/gallery.ts
import "tinacms";
function galleryFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      required: false
    },
    {
      type: "image",
      name: "cover",
      label: "Cover Image",
      required: false,
      ui: {
        component: "image"
      }
    },
    {
      type: "object",
      name: "images",
      label: "Images",
      list: true,
      required: true,
      ui: {
        itemProps: (item) => ({
          component: "image",
          label: item?.alt || item?.image?.split("/").pop() || "Unnamed Image"
        })
      },
      fields: [
        {
          type: "image",
          name: "image",
          label: "Image",
          required: true,
          uploadDir: (formValues) => {
            const title = formValues.title.toLowerCase().replace(/\s+/g, "-") ? formValues.title.toLowerCase().replace(/\s+/g, "-").toLowerCase().replace(/\s+/g, "-") : "untitled";
            return `${title}`;
          }
        },
        {
          type: "string",
          name: "alt",
          label: "Alt Text",
          required: false
        }
      ]
    }
  ];
}

// tina/templates/posts.ts
function postFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true
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
      required: false
    },
    {
      type: "image",
      name: "postImage",
      label: "Cover Image",
      required: false,
      ui: {
        component: "image"
      }
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      required: true,
      templates: [
        {
          name: "Image",
          label: "Image",
          fields: [
            {
              type: "object",
              label: "Image",
              name: "image",
              fields: [
                {
                  name: "src",
                  label: "Image Source",
                  type: "image"
                },
                {
                  name: "alt",
                  label: "Alt Text",
                  type: "string"
                },
                {
                  name: "caption",
                  label: "Caption Text",
                  type: "string"
                },
                {
                  name: "size",
                  label: "full width",
                  type: "boolean"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      required: true,
      ui: {
        component: "tags"
      }
    },
    {
      type: "datetime",
      name: "pubDatetime",
      label: "Date posted",
      ui: {
        defaultValue: (/* @__PURE__ */ new Date()).toISOString()
      }
    },
    {
      type: "boolean",
      name: "featured",
      label: "Featured",
      ui: {
        component: "toggle",
        defaultValue: false
      }
    }
  ];
}

// tina/templates/events.ts
function eventFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true
    },
    {
      name: "eventImage",
      type: "image",
      required: false,
      ui: {
        component: "image"
      }
    },
    {
      name: "eventImageUrl",
      type: "string",
      required: false
    },
    {
      type: "string",
      name: "description",
      label: "description",
      required: true
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      required: true
    },
    {
      type: "datetime",
      name: "eventDatetime",
      label: "When?",
      ui: {
        dateFormat: "DD MMMM YYYY",
        timeFormat: "HH:mm",
        defaultValue: (/* @__PURE__ */ new Date()).toISOString()
      },
      required: true
    },
    {
      type: "datetime",
      name: "eventEndDatetime",
      label: "Until?",
      ui: {
        dateFormat: "DD MMMM YYYY",
        timeFormat: "HH:mm",
        defaultValue: (/* @__PURE__ */ new Date()).toISOString()
      },
      required: true
    }
  ];
}

// tina/config.ts
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  token: process.env.TINA_TOKEN,
  // This should match the value in your .env file
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // This should match the value in your .env file
  branch,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "event",
        label: "Events",
        format: "mdx",
        path: "src/content/event",
        fields: eventFields()
      },
      {
        ui: {
          beforeSubmit: async ({
            form,
            cms,
            values
          }) => {
            if (form.crudType === "create") {
              return {
                ...values,
                pubDatetime: (/* @__PURE__ */ new Date()).toISOString()
              };
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
            pubDatetime: (/* @__PURE__ */ new Date()).toISOString(),
            tags: ["elektroplazma"]
          };
        }
      },
      {
        name: "albums",
        label: "Albums",
        format: "mdx",
        path: "src/content/albums",
        fields: galleryFields()
      }
    ]
  }
});
export {
  config_default as default
};
