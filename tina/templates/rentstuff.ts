import type { TinaField } from "tinacms";

export function rentFields() {
    return [
        {
          type: "string",
          name: "title",
          label: "Title",
          isTitle: true,
          required: true,
        },
        {
          type: 'string',
          name: "description",
          label: "description",
          required: true,
          ui: {
            component: "textarea"
          }
        },
        {
          type: "string",
          name: "price",
          label: "Price",
          required: true,
          ui: {
            component: "text",
            validate: (value) => {
              // Optional: Add validation regex if you want to enforce specific patterns
              if (!value) return "Price is required";
              
              // Allow formats like: 11.11, 11.11 eur, 11/11 eur/h
              const pricePattern = /^\d+([.,\/]\d+)?(\s*(eur|usd|gbp))?(\s*\/\s*h)?$/i;
              
              if (!pricePattern.test(value.trim())) {
                return "Invalid price format. Use formats like: 11.11, 11.11 eur, or 11/11 eur/h";
              }
            }
          }
        },
        {
          type: "image",
          name: "rentImage",
          label: "Item image",
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
          required: false,
        }
      ] as TinaField[]
}