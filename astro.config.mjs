import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import mdx from '@astrojs/mdx';

import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [ mdx(),tailwind({
    applyBaseStyles: false
  }), react(),, sitemap(), sitemap(), sentry(), spotlightjs()],
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
  scopedStyleStrategy: "where"
});