import type { TinaField } from "tinacms";

export function eventFields() {
    return [
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
            timeFormat: "HH:mm"
          },
          required: true,
        },
        {
          type: 'datetime',
          name: 'eventEndDatetime',
          label: 'Until?',
          ui: {
            dateFormat: "DD MMMM YYYY",
            timeFormat: "HH:mm"
          },
          required: true,
        },
        {
          name: "location",
          type: "string",
          required: false,
        },
      ] as TinaField[]
}