import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test, viewportWidth } from './fixtures';

/*
 * The guide pages: two topics in seven languages. English is published; the
 * six translations are drafts (`reviewed: false`) until a native speaker has
 * checked them, so they are noindex and out of the sitemap and hreflang.
 */
const LANGS = [
  { code: 'en', prefix: '', html: 'en-SG', draft: false },
  { code: 'bn', prefix: '/bn', html: 'bn', draft: true },
  { code: 'my', prefix: '/my', html: 'my', draft: true },
  { code: 'zh', prefix: '/zh', html: 'zh-Hans', draft: true },
  { code: 'ta', prefix: '/ta', html: 'ta', draft: true },
  { code: 'th', prefix: '/th', html: 'th', draft: true },
  { code: 'vi', prefix: '/vi', html: 'vi', draft: true },
];
const TOPICS = ['loan-sharks', 'sending-money-home'];
const REMLO = 'https://remloapp.com';
const PLAY = 'https://play.google.com/store/apps/details?id=com.remlo.app';

for (const lang of LANGS) {
  for (const topic of TOPICS) {
    const path = `${lang.prefix}/${topic}/`;

    test.describe(path, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(path);
      });

      test.afterEach(async ({ watch }) => {
        expect(watch.consoleErrors, 'console errors').toEqual([]);
        expect(watch.blocked, 'requests that tried to leave the site').toEqual([]);
      });

      test('has the right language, indexing and links', async ({ page }) => {
        await expect(page.locator('html')).toHaveAttribute('lang', lang.html);
        await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
        await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
        const description = await page.locator('meta[name="description"]').getAttribute('content');
        expect((description ?? '').length).toBeGreaterThan(40);

        const robots = page.locator('meta[name="robots"]');
        const canonical = page.locator('link[rel="canonical"]');
        if (lang.draft) {
          await expect(robots).toHaveAttribute('content', 'noindex');
          await expect(canonical).toHaveCount(0);
          await expect(page.locator('link[rel="alternate"]')).toHaveCount(0);
          await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
          await expect(page.locator('[data-draft-notice]')).toBeVisible();
        } else {
          await expect(robots).toHaveCount(0);
          await expect(canonical).toHaveAttribute('href', `https://financeforwardsg.com${path}`);
          await expect(page.locator('[data-draft-notice]')).toHaveCount(0);
          const ld = JSON.parse(
            (await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}',
          );
          expect(ld['@type']).toBe('FAQPage');
          // every question in the data is a visible heading on the page
          for (const entity of ld.mainEntity) {
            await expect(
              page.getByRole('heading', { name: entity.name, exact: true }),
            ).toBeVisible();
          }
        }

        // Remlo is linked, and Google Play too; nothing recommends a provider.
        await expect(page.locator('#remlo').getByRole('link').first()).toHaveAttribute(
          'href',
          REMLO,
        );
        await expect(page.locator(`#remlo a[href="${PLAY}"]`)).toHaveCount(1);
      });

      test('has no horizontal overflow', async ({ page }) => {
        const width = viewportWidth(page);
        const overflow = await page.evaluate(() => {
          const offenders: string[] = [];
          for (const el of document.querySelectorAll<HTMLElement>('body *')) {
            if (el.closest('.skip-link')) continue;
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && (rect.right > window.innerWidth + 1 || rect.left < -1)) {
              offenders.push(`${el.tagName.toLowerCase()}.${el.className}`);
            }
          }
          return {
            scrollWidth: document.documentElement.scrollWidth,
            offenders: offenders.slice(0, 8),
          };
        });
        expect(overflow.scrollWidth).toBeLessThanOrEqual(width);
        expect(overflow.offenders).toEqual([]);
      });

      test('requests no web font unless it is English', async ({ page }) => {
        const fonts: string[] = [];
        page.on('request', (request) => {
          if (/\.woff2?$/.test(request.url())) fonts.push(request.url());
        });
        await page.reload();
        await page.evaluate(() => document.fonts.ready);
        if (lang.code === 'en') expect(fonts.length).toBeGreaterThan(0);
        else expect(fonts).toEqual([]);
      });
    });
  }
}

test('phone numbers are tap-to-call links with the verified numbers', async ({ page }) => {
  await page.goto('/loan-sharks/');
  const tel = async (name: string) =>
    page.locator('#contacts').getByRole('link', { name, exact: true }).getAttribute('href');
  expect(await tel('999')).toBe('tel:999');
  expect(await tel('1800-255-0000')).toBe('tel:18002550000');
  expect(await tel('1799')).toBe('tel:1799');
  expect(await tel('1800-2255-529')).toBe('tel:18002255529');
  expect(await tel('6225 5227')).toBe('tel:62255227');
  await expect(page.getByRole('link', { name: 'Open i-Witness' })).toHaveAttribute(
    'href',
    'https://www.police.gov.sg/I-Witness',
  );
  await expect(
    page.getByRole('link', { name: 'Open the official list of licensed moneylenders' }),
  ).toHaveAttribute(
    'href',
    'https://rom.mlaw.gov.sg/information-for-borrowers/list-of-licensed-moneylenders-in-singapore/',
  );
});

test('the English pages state when they were last checked and list their sources', async ({
  page,
}) => {
  for (const topic of TOPICS) {
    await page.goto(`/${topic}/`);
    const sources = page.locator('#sources');
    await expect(sources).toContainText('Last checked: 17 October 2026');
    expect(await sources.getByRole('listitem').count()).toBeGreaterThanOrEqual(6);
    for (const href of await sources
      .getByRole('link')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''))) {
      expect(href).toMatch(/^https:\/\/(www\.)?[a-z.]*\.(gov\.sg|worldbank\.org)\//);
    }
  }
});

test('the sending-money page names and recommends no provider', async ({ page }) => {
  await page.goto('/sending-money-home/');
  const text = (await page.locator('main').innerText()).toLowerCase();
  for (const name of ['wise', 'western union', 'remitly', 'instarem', 'moneygram', 'paynow']) {
    expect(text).not.toContain(name);
  }
  await expect(page.locator('#remlo')).toContainText('not a recommendation');
});

test('translations are not listed anywhere: no sitemap entry, no switcher, no hreflang', async ({
  page,
  request,
}) => {
  const sitemap = await (await request.get('/sitemap-0.xml')).text();
  expect(sitemap).not.toMatch(/\/(bn|my|zh|ta|th|vi)\//);
  expect(sitemap).not.toContain('xhtml:link');
  await page.goto('/loan-sharks/');
  await expect(page.getByRole('navigation', { name: 'Read this page in' })).toHaveCount(0);
  await expect(page.locator('link[rel="alternate"]')).toHaveCount(0);
  // ...and a reviewer who opens a draft sees only the English version beside it.
  await page.goto('/bn/loan-sharks/');
  const switcher = page.locator('.guide-switcher');
  await expect(switcher.getByRole('link')).toHaveText(['English', 'বাংলা']);
  await expect(switcher.getByRole('link', { name: 'বাংলা' })).toHaveAttribute(
    'aria-current',
    'page',
  );
});

test('the home page links to the two English guides', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer.getByRole('link', { name: 'Guide: loan sharks' })).toHaveAttribute(
    'href',
    '/loan-sharks/',
  );
  await expect(footer.getByRole('link', { name: 'Guide: sending money home' })).toHaveAttribute(
    'href',
    '/sending-money-home/',
  );
});

test('the vercel.json security headers block nothing on a guide page', async ({ page, watch }) => {
  const config = JSON.parse(readFileSync(join(process.cwd(), 'vercel.json'), 'utf8')) as {
    headers: { source: string; headers: { key: string; value: string }[] }[];
  };
  const siteHeaders = Object.fromEntries(
    config.headers
      .find((rule) => rule.source === '/(.*)')!
      .headers.map((header) => [header.key.toLowerCase(), header.value]),
  );
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
  for (const path of ['/loan-sharks/', '/th/sending-money-home/']) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((resolve) => setTimeout(resolve, 200));
    });
  }
  // The structured-data block is data, not a script, so the policy leaves it alone.
  expect(violations).toEqual([]);
  expect(watch.consoleErrors).toEqual([]);
});
