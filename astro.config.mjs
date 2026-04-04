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

const enableCsp = process.env.ASTRO_ENABLE_CSP === 'true';

export default defineConfig({
  site: 'https://portfolio-v4-roan.vercel.app',
  prefetch: true,
  security: enableCsp
    ? {
        csp: {
          directives: [
            "default-src 'self'",
            "base-uri 'self'",
            "object-src 'none'",
            "frame-ancestors 'none'",
          ],
        },
      }
    : undefined,
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
    plugins: [
      tailwindcss(),
      {
        name: 'watcher-max-listeners',
        configureServer(server) {
          server.watcher.setMaxListeners(50);
        },
      },
    ],
    resolve: {
      noExternal: ['@lucide/svelte', /^@lucide\/svelte/],
    },
    ssr: {
      noExternal: ['@lucide/svelte', /^@lucide\/svelte/],
    },
  },
});
