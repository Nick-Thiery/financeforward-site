// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { sitemapEntry } from './src/content/guides/seo.ts';

// Fully static output: no adapter, no server routes.
export default defineConfig({
  // The permanent address: used for canonical and og:url tags, the sitemap
  // and robots.txt.
  site: 'https://financeforwardsg.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // Keep every stylesheet and script in external files so the
    // Content-Security-Policy in vercel.json can stay 'self' without hashes.
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    // sitemap-index.xml + sitemap-0.xml. Never listed: the 404 page, and guide
    // pages whose translation has not been checked by a native speaker
    // (`reviewed: false`). Published guide pages carry hreflang alternates.
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        if (/\/404\/?$/.test(pathname)) return false;
        return sitemapEntry(pathname)?.published ?? true;
      },
      serialize: (item) => {
        const entry = sitemapEntry(new URL(item.url).pathname);
        if (!entry) return item;
        return {
          ...item,
          lastmod: entry.lastmod,
          links: entry.links.length > 0 ? entry.links : undefined,
        };
      },
    }),
  ],
});
