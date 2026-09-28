import { mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, isDesktop, MAILTO, REMLO, test, viewportWidth } from './fixtures';

const NAV = [
  { id: 'what', label: 'What we do' },
  { id: 'remlo', label: 'Remlo' },
  { id: 'approach', label: 'Approach' },
  { id: 'measure', label: 'How we measure' },
  { id: 'team', label: 'Team' },
  { id: 'contact', label: 'Contact' },
];

test.beforeEach(async ({ page, watch }) => {
  void watch;
  await page.goto('/');
});

test.afterEach(async ({ watch }) => {
  expect(watch.consoleErrors, 'console errors').toEqual([]);
  expect(watch.blocked, 'requests that tried to leave the site').toEqual([]);
});

test('renders the page with no horizontal overflow', async ({ page }) => {
  const width = viewportWidth(page);
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    const offenders: string[] = [];
    for (const el of document.querySelectorAll<HTMLElement>('body *')) {
      // The mobile feature row scrolls sideways on purpose.
      if (el.closest('[data-feature-scroller]') || el.closest('dialog:not([open])')) continue;
      if (el.closest('.skip-link')) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && (rect.right > window.innerWidth + 1 || rect.left < -1)) {
        offenders.push(`${el.tagName.toLowerCase()}.${el.className} → ${Math.round(rect.right)}`);
      }
    }
    return { scrollWidth: doc.scrollWidth, offenders: offenders.slice(0, 10) };
  });
  expect(overflow.scrollWidth).toBeLessThanOrEqual(width);
  expect(overflow.offenders).toEqual([]);
});

test('saves a full-page screenshot', async ({ page }) => {
  const dir = join(process.cwd(), 'artifacts', 'screens');
  mkdirSync(dir, { recursive: true });
  await page.evaluate(() => document.fonts.ready);
  // Load every lazy image before the capture.
  await page.evaluate(async () => {
    for (const img of document.querySelectorAll('img')) img.loading = 'eager';
    await Promise.all(
      [...document.images].map((img) =>
        img.complete ? null : new Promise((resolve) => img.addEventListener('load', resolve)),
      ),
    );
  });
  await page.screenshot({ path: join(dir, `${viewportWidth(page)}.png`), fullPage: true });
});

test('header nav lists the rendered sections and reaches each one', async ({ page }) => {
  test.skip(!isDesktop(page), 'desktop header nav');
  const nav = page.getByRole('navigation', { name: 'Main' });
  await expect(nav.getByRole('link')).toHaveText([...NAV.map((n) => n.label), /Explore Remlo/]);

  for (const { id, label } of NAV) {
    const link = nav.getByRole('link', { name: label, exact: true });
    await link.click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expectSectionReached(page, id);
    await expect(link).toHaveAttribute('aria-current', 'location');
    await expect(nav.locator('[aria-current="location"]')).toHaveCount(1);
  }
});

test('the header gains a shadow after scrolling', async ({ page }) => {
  const header = page.locator('[data-site-header]');
  await expect(header).not.toHaveAttribute('data-scrolled');
  await page.mouse.wheel(0, 600);
  await expect(header).toHaveAttribute('data-scrolled', '');
});

test('no nav item is current in the hero', async ({ page }) => {
  await expect(page.locator('[data-nav-link][aria-current]')).toHaveCount(0);
});

test('mobile menu: dialog, focus trap, Esc, focus return and scroll lock', async ({ page }) => {
  test.skip(isDesktop(page), 'the menu is below 1024px');
  const menuButton = page.getByRole('button', { name: 'Menu' });
  const dialog = page.getByRole('dialog', { name: 'Menu' });
  await expect(dialog).toBeHidden();

  await menuButton.click();
  await expect(dialog).toBeVisible();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(dialog.getByRole('button', { name: 'Close' })).toBeFocused();
  await expect(page.locator('html')).toHaveClass(/is-menu-open/);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe(
    'hidden',
  );

  await expect(dialog.getByRole('link')).toHaveText([...NAV.map((n) => n.label), /Explore Remlo/]);

  // Tab through everything and past the end: focus never leaves the dialog.
  const count = await dialog.locator('a[href], button').count();
  for (let i = 0; i < count + 2; i += 1) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
  }
  // Shift+Tab from the first item wraps to the last.
  await dialog.getByRole('button', { name: 'Close' }).focus();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('link', { name: /Explore Remlo/ })).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(menuButton).toBeFocused();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('html')).not.toHaveClass(/is-menu-open/);

  // The Close button closes it too, with the same focus return.
  await menuButton.click();
  await dialog.getByRole('button', { name: 'Close' }).click();
  await expect(dialog).toBeHidden();
  await expect(menuButton).toBeFocused();
});

test('mobile menu links reach their sections and mark the current one', async ({ page }) => {
  test.skip(isDesktop(page), 'the menu is below 1024px');
  const menuButton = page.getByRole('button', { name: 'Menu' });
  const dialog = page.getByRole('dialog', { name: 'Menu' });
  for (const { id, label } of NAV) {
    await menuButton.click();
    await dialog.getByRole('link', { name: label, exact: true }).click();
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expectSectionReached(page, id);
    await expect(page.locator(`dialog [data-nav-link="${id}"]`)).toHaveAttribute(
      'aria-current',
      'location',
    );
  }
});

test('every "Explore Remlo" link opens exactly https://remloapp.com', async ({ page }) => {
  const explore = page.locator('a', { hasText: 'Explore Remlo' });
  expect(await explore.count()).toBeGreaterThanOrEqual(6);
  for (const href of await explore.evaluateAll((els) => els.map((el) => el.getAttribute('href')))) {
    expect(href).toBe(REMLO);
  }
  // The mobile "Remlo ↗" pill too; and nothing links to remloapp.com with extras.
  const remloLinks = await page
    .locator('a[href*="remloapp.com"]')
    .evaluateAll((els) => els.map((el) => el.getAttribute('href')));
  expect(new Set(remloLinks)).toEqual(new Set([REMLO, `${REMLO}/privacy`, `${REMLO}/terms`]));
  for (const href of remloLinks) expect(href).not.toMatch(/utm_|[?#]/);
});

test('"See what Remlo does" goes to #remlo', async ({ page }) => {
  const link = page.getByRole('link', { name: /See what Remlo does/ });
  await expect(link).toHaveAttribute('href', '#remlo');
  await link.click();
  await expect(page).toHaveURL(/#remlo$/);
  await expectSectionReached(page, 'remlo');
  await expect(page.getByRole('link', { name: /See what it does/ })).toHaveAttribute(
    'href',
    '#remlo',
  );
});

test('mailto and tel links match the brief exactly', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Email about a collaboration' })).toHaveAttribute(
    'href',
    MAILTO.collaboration,
  );
  await expect(page.getByRole('link', { name: 'Send feedback on Remlo' })).toHaveAttribute(
    'href',
    MAILTO.feedback,
  );
  const mailtos = await page
    .locator('a[href^="mailto:"]')
    .evaluateAll((els) => els.map((el) => el.getAttribute('href')));
  expect(new Set(mailtos)).toEqual(new Set(Object.values(MAILTO)));
  await expect(
    page.locator('#contact a[href="mailto:financeforwardinitiative@gmail.com"]'),
  ).toHaveText('financeforwardinitiative@gmail.com');
  expect(await page.locator('#contact a[href^="mailto:"] wbr').count()).toBe(1);

  const tels = await page
    .locator('a[href^="tel:"]')
    .evaluateAll((els) => els.map((el) => el.getAttribute('href')));
  expect(tels).toEqual(['tel:1799', 'tel:999']);
  await expect(page.locator('form')).toHaveCount(0);
});

test('external links carry rel and open in the same tab', async ({ page }) => {
  const external = await page.locator('a[href^="http"]').evaluateAll((els) =>
    els.map((el) => ({
      href: el.getAttribute('href'),
      rel: el.getAttribute('rel') ?? '',
      target: el.getAttribute('target'),
    })),
  );
  expect(external.length).toBeGreaterThan(0);
  for (const link of external) {
    expect(link.rel, link.href ?? '').toContain('noopener');
    expect(link.target, link.href ?? '').toBeNull();
  }
  const playLinks = external.filter((l) => l.href?.includes('play.google.com'));
  expect(new Set(playLinks.map((l) => l.href))).toEqual(
    new Set(['https://play.google.com/store/apps/details?id=com.remlo.app']),
  );
});

test('Updates and metrics are absent; Team and the rest render', async ({ page }) => {
  await expect(page.locator('#updates')).toHaveCount(0);
  await expect(page.locator('a[href="#updates"]')).toHaveCount(0);
  await expect(page.getByText('Updates', { exact: true })).toHaveCount(0);
  await expect(page.locator('[data-component="metrics"]')).toHaveCount(0);
  for (const { id } of NAV) await expect(page.locator(`section#${id}`)).toHaveCount(1);
  await expect(page.locator('#team li')).toHaveCount(5);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Clearer information for everyday money decisions.',
  );
});

test('review/ content is absent from the page and the server', async ({ page, request }) => {
  const text = await page.locator('body').innerText();
  const html = await page.content();
  const checklist = readFileSync(
    join(process.cwd(), 'review', 'private-review-checklist.md'),
    'utf8',
  );
  for (const line of checklist.split('\n')) {
    const clean = line
      .replace(/^[\s#>*|-]+/, '')
      .replace(/[*`|]/g, '')
      .trim();
    if (clean.length >= 40) expect(html).not.toContain(clean);
  }
  for (const phrase of ['Private review checklist', 'Reese or Ries', 'Magura', 'LEO workshop']) {
    expect(text).not.toContain(phrase);
  }
  for (const path of [
    '/review/private-terms.txt',
    '/review/private-review-checklist.md',
    '/private-terms.txt',
    '/private-review-checklist.md',
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
  }
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
});

test('the feature row scrolls natively with a position indicator', async ({ page }) => {
  const scroller = page.locator('[data-feature-scroller]');
  if (isDesktop(page)) {
    await expect(page.locator('[data-feature-position]')).toBeHidden();
    await expect(scroller).not.toHaveAttribute('tabindex');
    return;
  }
  const position = page.locator('[data-feature-position]');
  await expect(position).toHaveText('1');
  await expect(scroller).toHaveAttribute('tabindex', '0');
  await scroller.evaluate((el) => el.scrollTo({ left: el.scrollWidth, behavior: 'instant' }));
  await expect(position).toHaveText('3');
  await scroller.evaluate((el) => el.scrollTo({ left: 0, behavior: 'instant' }));
  await expect(position).toHaveText('1');
});

test('404 page', async ({ page, watch }) => {
  const response = await page.goto('/this-page-does-not-exist');
  expect(response?.status()).toBe(404);
  // Chrome logs the document's own (intended) 404 status as a console error.
  watch.consoleErrors = watch.consoleErrors.filter((message) => !message.includes('status of 404'));
  await expect(page.getByRole('heading', { level: 1 })).toHaveText("This page isn't here.");
  await expect(page.getByRole('link', { name: 'FinanceForward home' })).toHaveAttribute(
    'href',
    '/',
  );
  await expect(page.getByRole('link', { name: /Explore Remlo/ })).toHaveAttribute('href', REMLO);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
});

async function expectSectionReached(page: import('@playwright/test').Page, id: string) {
  await expect
    .poll(async () =>
      page.evaluate((sectionId) => {
        const section = document.getElementById(sectionId);
        const header = document.querySelector('[data-site-header]');
        if (!section || !header) return 'missing';
        const top = section.getBoundingClientRect().top;
        const headerBottom = header.getBoundingClientRect().bottom;
        const atBottom =
          Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight;
        // The section starts just under the sticky header, or the page can't
        // scroll any further and the section is on screen.
        if (Math.abs(top - headerBottom) <= 2) return 'ok';
        if (atBottom && top >= headerBottom - 2 && top < window.innerHeight) return 'ok';
        return `top=${Math.round(top)} header=${Math.round(headerBottom)}`;
      }, id),
    )
    .toBe('ok');
}
