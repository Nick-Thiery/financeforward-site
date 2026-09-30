/*
 * Shared Lighthouse CI settings. Thresholds from the brief:
 * Performance ≥ 0.95, Accessibility 1, Best Practices ≥ 0.95, SEO ≥ 0.95
 * (scored on the indexable production build, so is-crawlable counts), LCP ≤ 2.0 s,
 * CLS ≤ 0.02, home page JS ≤ 25 KB and CSS ≤ 30 KB (transfer size, gzipped).
 * Requests to other hosts are blocked, so remloapp.com is never loaded.
 */
module.exports = ({ preset }) => ({
  ci: {
    collect: {
      startServerCommand:
        'PUBLIC_SITE_INDEXABLE=true npm run build && npx astro preview --host 127.0.0.1 --port 4322 --ignore-lock',
      startServerReadyPattern: '4322',
      url: ['http://127.0.0.1:4322/'],
      numberOfRuns: 3,
      settings: {
        ...(preset === 'desktop' ? { preset: 'desktop' } : {}),
        blockedUrlPatterns: ['*remloapp.com*', '*play.google.com*'],
        chromeFlags: '--headless=new --no-sandbox',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.02 }],
        'resource-summary:script:size': ['error', { maxNumericValue: 25600 }],
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 30720 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: `./artifacts/lighthouse/${preset}`,
    },
  },
});
