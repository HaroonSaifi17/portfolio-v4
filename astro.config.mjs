// @ts-check

import mdx from '@astrojs/mdx';

import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import rehypePrettyCode from 'rehype-pretty-code';

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: 'github-dark-default',
};

export default defineConfig({
  prefetch: true,
  markdown: {
    syntaxHighlight: false,
  },

  integrations: [
    svelte(),
    mdx({
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
