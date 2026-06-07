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
  site: 'https://www.haroonsaifi.dev',
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
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        const isHome = item.url === 'https://www.haroonsaifi.dev/';
        const isBlog =
          item.url.includes('/blog/') && !item.url.endsWith('/blog/');
        const isCaseStudy =
          item.url.includes('/case-studies/') &&
          !item.url.endsWith('/case-studies/');
        const isList =
          item.url.endsWith('/blog/') ||
          item.url.endsWith('/case-studies/') ||
          item.url.endsWith('/blog/topics/') ||
          item.url.includes('/blog/topics/');
        let priority = 0.7;
        if (isHome) priority = 1.0;
        else if (isBlog || isCaseStudy) priority = 0.9;
        else if (isList) priority = 0.6;
        return {
          ...item,
          priority,
          changefreq: isHome ? 'weekly' : isList ? 'weekly' : 'monthly',
        };
      },
    }),
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
