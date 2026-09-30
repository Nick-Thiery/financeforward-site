/*
 * robots.txt: allow all crawling and point to the sitemap. Whether a page may
 * be indexed is decided by its robots meta tag (see BaseLayout), so preview
 * builds stay out of search results while still being crawlable.
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap-index.xml', site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
