import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures';

/* axe on the home page and the 404 page at every width: zero violations. */
for (const path of ['/', '/this-page-does-not-exist']) {
  test(`axe: no violations on ${path}`, async ({ page, watch }) => {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
      .analyze();
    const summary = results.violations.map(
      (v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`,
    );
    expect(summary).toEqual([]);
    expect(watch.blocked).toEqual([]);
  });
}

test('axe: no violations with the mobile menu open', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) >= 1024, 'the menu is below 1024px');
  await page.goto('/');
  await page.getByRole('button', { name: 'Menu' }).click();
  const results = await new AxeBuilder({ page }).include('dialog').analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});

/*
 * Serve the pages with the Content-Security-Policy and other headers from
 * vercel.json, and check that nothing the build emits is blocked.
 */
test('the vercel.json security headers block nothing the site uses', async ({ page, watch }) => {
  const config = JSON.parse(readFileSync(join(process.cwd(), 'vercel.json'), 'utf8')) as {
    headers: { source: string; headers: { key: string; value: string }[] }[];
  };
  const siteHeaders = Object.fromEntries(
    config.headers
      .find((rule) => rule.source === '/(.*)')!
      .headers.map((header) => [header.key.toLowerCase(), header.value]),
  );
  expect(siteHeaders['content-security-policy']).toContain("default-src 'self'");
  expect(siteHeaders['content-security-policy']).toContain("frame-ancestors 'none'");

  await page.route('http://127.0.0.1:4321/**', async (route) => {
    const response = await route.fetch();
    await route.fulfill({ response, headers: { ...response.headers(), ...siteHeaders } });
  });
  const violations: string[] = [];
  await page.exposeFunction('reportViolation', (v: string) => violations.push(v));
  await page.addInitScript(() => {
    document.addEventListener('securitypolicyviolation', (event) => {
      (window as unknown as { reportViolation: (v: string) => void }).reportViolation(
        `${event.violatedDirective} ${event.blockedURI}`,
      );
    });
  });

  const response = await page.goto('/');
  expect(response?.headers()['content-security-policy']).toBe(
    siteHeaders['content-security-policy'],
  );
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    for (const img of document.querySelectorAll('img')) img.loading = 'eager';
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((resolve) => setTimeout(resolve, 300));
  });
  // The script ran: the header noticed the scroll.
  await expect(page.locator('[data-site-header]')).toHaveAttribute('data-scrolled', '');
  expect(violations).toEqual([]);
  expect(watch.consoleErrors).toEqual([]);
});
