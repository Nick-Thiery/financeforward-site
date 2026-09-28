// @ts-check
import { defineConfig } from 'astro/config';

// Fully static output: no adapter, no server routes.
export default defineConfig({
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
});
