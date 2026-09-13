// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import icon from "astro-icon";
import swup from "@swup/astro";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { remarkMark, remarkSubSuper } from "./src/lib/remark-plugins.mjs";

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
  markdown: {
    remarkPlugins: [remarkMath, remarkMark, remarkSubSuper],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    svelte(),
    icon(),
    swup({
      containers: ["#swup"],
      cache: true,
      updateHead: true,
      theme: false,
    }),
  ],
});
