import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import mdx from '@astrojs/mdx';
import embeds from 'astro-embed/integration';

import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";
//import { YouTube } from "astro-embed";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [ embeds({
    services: {
    }
  }), mdx(),tailwind({
    applyBaseStyles: false
  }), react(), sitemap(), sentry(), spotlightjs()],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, {
      test: "Table of contents"
    }]],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true
    }
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    }
  },
  scopedStyleStrategy: "where",
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        cache: true,
      }
    }
  }
});