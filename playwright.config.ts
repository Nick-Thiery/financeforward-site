import { defineConfig } from '@playwright/test';

/*
 * End-to-end tests run against `astro preview` of the built site (run
 * `npm run build` first). One project per width in the brief. Reduced motion
 * keeps scrolling instant and every section visible for screenshots.
 */
const widths = [320, 375, 390, 768, 1024, 1440];
const PORT = 4321;

export default defineConfig({
  testDir: 'tests/e2e',
  outputDir: 'test-results',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    contextOptions: { reducedMotion: 'reduce' },
    colorScheme: 'light',
  },
  projects: widths.map((width) => ({
    name: `w${width}`,
    use: { viewport: { width, height: 900 }, deviceScaleFactor: 1 },
  })),
  webServer: {
    // --ignore-lock keeps Astro 7 from backgrounding the server when run by an agent.
    command: `npx astro preview --host 127.0.0.1 --port ${PORT} --ignore-lock`,
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: false,
    env: { ASTRO_TELEMETRY_DISABLED: '1' },
  },
});
