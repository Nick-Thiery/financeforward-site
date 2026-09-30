// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

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
    // sitemap-index.xml + sitemap-0.xml; the 404 page is never listed.
    sitemap({ filter: (page) => !/\/404\/?$/.test(new URL(page).pathname) }),
  ],
});
