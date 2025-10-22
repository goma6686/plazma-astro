import { type TinaField } from "tinacms";

export function galleryFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      required: false,
    },
    {
      type: "image",
      name: "cover",
      label: "Cover Image",
      required: false,
      ui: {
        component: "image",
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
          label: item?.alt || item?.image?.split('/').pop()|| 'Unnamed Image'
        })
      },
      fields: [
        {
          type: "image",
          name: "image",
          label: "Image",
          required: true,
          uploadDir: (formValues: { title: string; }) => {
            const title = (formValues.title).toLowerCase().replace(/\s+/g, '-') ? (formValues.title.toLowerCase().replace(/\s+/g, '-')).toLowerCase().replace(/\s+/g, '-') : 'untitled';
            return `${title}`;
          },
        },
        {
          type: "string",
          name: "alt",
          label: "Alt Text",
          required: false,
        }
      ]
    }
  ] as TinaField[];
}