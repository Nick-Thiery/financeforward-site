import { test as base, expect, type Page } from '@playwright/test';

/*
 * Every test page aborts requests that leave the local preview server, so a
 * test can never load remloapp.com (its analytics would count the visit) or
 * any other third party. Blocked requests and console errors are recorded so
 * tests can assert there were none.
 */
export interface Watch {
  blocked: string[];
  consoleErrors: string[];
}

export const test = base.extend<{ watch: Watch }>({
  watch: async ({ page }, use) => {
    const watch: Watch = { blocked: [], consoleErrors: [] };
    await page.route(
      (url) => url.hostname !== '127.0.0.1' && url.hostname !== 'localhost',
      async (route) => {
        watch.blocked.push(route.request().url());
        await route.abort('blockedbyclient');
      },
    );
    page.on('console', (message) => {
      if (message.type() === 'error') watch.consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => watch.consoleErrors.push(error.message));
    await use(watch);
  },
});

export { expect };

export const viewportWidth = (page: Page) => page.viewportSize()?.width ?? 0;
export const isDesktop = (page: Page) => viewportWidth(page) >= 1024;

export const REMLO = 'https://remloapp.com';
export const MAILTO = {
  plain: 'mailto:financeforwardinitiative@gmail.com',
  collaboration:
    'mailto:financeforwardinitiative@gmail.com?subject=Collaboration%20with%20FinanceForward',
  feedback: 'mailto:financeforwardinitiative@gmail.com?subject=Remlo%20feedback',
};
