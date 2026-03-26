// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import rehypePrettyCode from 'rehype-pretty-code';

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: 'github-dark-default',
};

export default defineConfig({
  site: 'https://portfolio-v4-roan.vercel.app',
  prefetch: true,
  markdown: {
    syntaxHighlight: false,
  },

  integrations: [
    svelte(),
    sitemap(),
    mdx({
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
