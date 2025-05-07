import type { TinaField } from "tinacms";

export function postFields() {
    return [
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
            type: "image",
            name: "postImage",
            label: "Cover Image",
            required: true,
            ui: {
              component: "image",
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
                name: 'Image',
                label: 'Image',
                fields: [
                    {
                        type: 'object',
                        label: 'Image',
                        name: 'image',
                        fields: [
                            {
                                name: 'src',
                                label: 'Image Source',
                                type: 'image',
                            },
                            {
                                name: 'alt',
                                label: 'Alt Text',
                                type: 'string',
                            },
                            {
                                name: 'caption',
                                label: 'Caption Text',
                                type: 'string',
                            },
                            {
                                name: 'size',
                                label: 'full width',
                                type: 'boolean',
                            },
                        ],
                    },
                ],
            },
            ],
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
    ] as TinaField[]
}