import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parse } from 'node-html-parser';
import { afterEach, describe, expect, it, vi } from 'vitest';
import GuidePage from '../../src/components/GuidePage.astro';
import { getGuide } from '../../src/content/guides';

/*
 * Renders a real guide page and reads the head the build would emit. The
 * `reviewed` flag is flipped on a copy of the page, as Nick will do in the
 * content module.
 */
afterEach(() => vi.unstubAllEnvs());

async function render(lang: 'en' | 'bn', reviewed: boolean) {
  vi.stubEnv('PUBLIC_SITE_INDEXABLE', 'true');
  const original = getGuide('loan-sharks', lang);
  const page = {
    ...original,
    content: {
      ...original.content,
      reviewed,
      ...(reviewed && lang !== 'en'
        ? { reviewedBy: 'A. Volunteer', reviewedOn: '2026-11-01' }
        : {}),
    },
  };
  const container = await AstroContainer.create({
    astroConfig: { site: 'https://financeforwardsg.com' },
  });
  const html = await container.renderToString(GuidePage, {
    props: { page },
    request: new Request(`https://financeforwardsg.com${page.path}`),
  });
  return parse(html);
}

describe('guide page head', () => {
  it('an unreviewed translation is noindex with no canonical, hreflang or structured data', async () => {
    const root = await render('bn', false);
    expect(root.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex');
    expect(root.querySelector('link[rel="canonical"]')).toBeNull();
    expect(root.querySelectorAll('link[rel="alternate"]')).toHaveLength(0);
    expect(root.querySelector('script[type="application/ld+json"]')).toBeNull();
    expect(root.querySelector('html')?.getAttribute('lang')).toBe('bn');
    expect(root.querySelector('[data-draft-notice]')?.textContent).toContain('not been checked');
  });

  it('a reviewed translation is indexable with canonical, its own language and no draft notice', async () => {
    const root = await render('bn', true);
    expect(root.querySelector('meta[name="robots"]')).toBeNull();
    expect(root.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://financeforwardsg.com/bn/loan-sharks/',
    );
    expect(root.querySelector('[data-draft-notice]')).toBeNull();
    expect(root.querySelector('script[type="application/ld+json"]')).not.toBeNull();
    expect(root.querySelector('title')?.textContent).toContain('সিঙ্গাপুর');
    expect(root.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(
      'সিঙ্গাপুর',
    );
  });

  it('the English page is indexable straight away', async () => {
    const root = await render('en', true);
    expect(root.querySelector('meta[name="robots"]')).toBeNull();
    expect(root.querySelector('html')?.getAttribute('lang')).toBe('en-SG');
    expect(root.querySelector('script[type="application/ld+json"]')?.textContent).toContain(
      '"FAQPage"',
    );
  });

  it('flipping English to unreviewed would make it noindex too', async () => {
    const root = await render('en', false);
    expect(root.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex');
  });
});
