import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import mdx from '@astrojs/mdx';
import embeds from 'astro-embed/integration';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  output: "server",
  adapter: netlify(),
  integrations: [ embeds({
    services: {
    }
  }), mdx(),tailwind({
    applyBaseStyles: false
  }), react(), sitemap()],
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