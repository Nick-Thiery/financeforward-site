# FinanceForward website v1: what was built

A static Astro site for FinanceForward, built from the v0.2 handoff: the design in `design/` and public copy v0.2 (the brief's Appendix A), verbatim. This PR is a draft for review. Nothing has been merged.

**Preview:** https://financeforward-site-oel0i2u3n-nick-thierys-projects.vercel.app (Vercel Authentication: sign in with your Vercel account.)

> **Needs your decision: an unintended production deployment exists.** Vercel promoted the project's _first_ deployment to production, even though it was built and deployed with `--target=preview`. It is `dpl_8znTCpUVenBaEgCMLVEqJdpdM3qF`, aliased to `financeforward-site.vercel.app` and `financeforward-site-nick-thierys-projects.vercel.app`. It has the same content as the preview. It is protected by Vercel Authentication (anonymous visitors get a 302 to the Vercel sign-in page), is `noindex, nofollow`, and has no custom domain. Removing it touches production, so I left it for you. See "Deployment" below.

## Why a separate repo and Vercel project

- Remlo's `vercel.json` rewrites every path to its app and redirects the old host, so a site can't live beside it.
- Remlo's service worker controls its whole origin.
- Every merge to Remlo's `main` redeploys the live app.
- The site's drafts don't belong in Remlo's public repo.

## What was built

- **Pages:** `/`, one page with anchors: Hero, Why this matters, What we do, Remlo, Our approach, How we measure, Team and Contact. There is also a 404 page. Updates is built but omitted, because there are no approved entries.
- **Stack:**
  - Astro 7.3.5 with fully static output and no adapter.
  - TypeScript strict and plain CSS tokens.
  - Zod-validated content modules.
  - Self-hosted Fontsource fonts (Latin subset, `font-display: swap`), with Newsreader 500 and Atkinson 400 preloaded.
  - `astro:assets` `<Picture>`, serving AVIF and WebP.
- **JavaScript:** one module script, 1.7 KB transferred. It handles:
  - the header shadow
  - current-section highlighting (`aria-current="location"`)
  - the mobile menu dialog
  - the section fade-in
  - the "1 of 3" indicator on the mobile feature row, which uses native scroll-snap, not a JS carousel
- **No inline code:** no inline scripts, styles or `style=""` attributes, so the Content-Security-Policy can stay `'self'` with no hashes.

### File tree

```
.
├── CHANGES.md · README.md · vercel.json · .vercelignore · .nvmrc
├── astro.config.mjs · tsconfig.json · eslint.config.js · .prettierrc.json
├── vitest.config.ts · playwright.config.ts · lighthouserc.{shared,mobile,desktop}.cjs
├── design/{clean,annotated}/*.png      reference boards (never served)
├── review/                             private: checklist + private-terms.txt (never built)
├── public/favicon.svg                  blank, transparent icon (see choices)
├── scripts/check-output.mjs            the output guard
├── src/
│   ├── assets/brand/financeforward-logo.png
│   ├── assets/remlo/remlo-icon-{192,96,48}.png
│   ├── assets/screens/remlo-{01-welcome,06-budget,08-scam-quiz}.png
│   ├── components/  BoundaryList Button DecisionGrid EmailCard EstimateQuote Eyebrow
│   │                FeatureCard HelpNote Icon LanguageList Logo MeasureNote MetricsPanel
│   │                MobileMenu OfferingCard PhoneFrame PrincipleList Section SiteFooter
│   │                SiteHeader SkipLink TeamCard TextLink TopicPanel UpdatesTimeline
│   ├── content/     site.ts languages.ts team.ts updates.ts images.ts metrics.ts
│   │                schemas.ts sections.ts
│   ├── layouts/BaseLayout.astro
│   ├── pages/index.astro · pages/404.astro
│   ├── scripts/site.ts
│   └── styles/tokens.css (provisional v0.1) · fonts.css · global.css
└── tests/
    ├── unit/   schemas · guard · metrics-unmounted
    └── e2e/    site · a11y (axe + CSP) · fixtures
```

## Editing content

Edit the files in `src/content/`, not the components. Every file is validated when you build: a missing field, an empty string or a review marker fails `npm run build` with a readable message.

**Change wording:** edit `src/content/site.ts`. The "12 languages" phrases and the H2 count come from `languages.ts`, so don't type the number.

**Add an update.** In `src/content/updates.ts`:

```ts
export const updates = updatesSchema.parse([
  { date: '2026-10', text: 'One short, confirmed sentence.', approved: true },
]);
```

The Updates section and its nav and footer links appear automatically once one entry has `approved: true`. Entries show newest first, as "October 2026". Before enabling it, set the section heading in `site.ts` → `updates`; it currently reads just "Updates".

**Hide or publish a team member.** In `src/content/team.ts`, set `publish: false` to hide someone. The grid reflows. If nobody is published, the Team section and its nav and footer links disappear.

**Approve a portrait.** Put the image in `src/assets/team/`, import it at the top of `team.ts`, and add:

```ts
import nickPortrait from '../assets/team/nick.jpg';
// …
{
  name: 'Nick Thiery',
  // …
  portrait: {
    src: nickPortrait,
    alt: 'Portrait of Nick Thiery, Founder at FinanceForward.',
    approved: true,
  },
},
```

The photo replaces the initials tile only while `approved: true`.

**Other images:** register them in `src/content/images.ts`. Only entries with `approved: true` render. Otherwise the component shows its finished fallback, never an empty box.

**Metrics:** `src/content/metrics.ts` stays `{ enabled: false, items: [] }`. `MetricsPanel` exists but no page imports it, and a unit test and the output guard both enforce that.

**Indexing:** every page is `noindex, nofollow` unless `PUBLIC_SITE_INDEXABLE=true` is set at build time. It is unset. The 404 page is always noindex.

## The output guard

`npm run build` runs `astro build`, then `node scripts/check-output.mjs`. The same build runs locally, inside `vercel build`, and for production later. The guard scans every text file in `dist/` and fails the build on:

1. **Review markers:** `[VERIFY`, `[DECIDE`, `[HOLD`, `[PLACEHOLDER`, `TODO`, `TBD`, `FIXME` and `lorem`.
2. **Private terms** from `review/private-terms.txt`, seeded from the brief's Appendix C.
   - Before matching, HTML entities are decoded, curly quotes straightened, and `<wbr>`, soft hyphens and zero-width characters removed.
   - Matching is case-insensitive and whole-word, `(?<!\w)term(?!\w)`, against both the raw file (which covers `alt` text) and the visible text, so a term split across tags still matches.
   - A missing or empty terms file fails the guard.
3. **Images:** an `<img>` without an `alt` attribute.
4. **Sections:** a `<section>` with no heading or no text.
5. **Metrics:** `data-component="metrics"` anywhere in the output.
6. **The review folder:**
   - any file from `review/` in `dist/`, whether matched by name or by identical bytes;
   - any line of 40 or more characters from a `review/` file appearing in the output;
   - any `src/` file importing or naming a `review/` path.

The guard caught one real problem during the build, which led to a fix. My first version joined text across tags, so the adjacent menu labels "Remlo" and "Remlo" read as "…loRem…" and matched `lorem`. Tags now become spaces, `lorem` must start a word, and both cases have regression tests.

## Remlo facts and screenshots

- **Remlo clone:** read-only, in `$TMPDIR/remlo-ro`, at HEAD `1eabe26adebca296ddab96353e0323ab01df6d5e`. Nothing was committed, pushed, built or run there.
- **Appendix B:** every fact still holds at that commit, so no public sentence needed narrowing:
  - the 12 languages, with Urdu right to left
  - "Continue as Guest" and "Guest data is saved on this device only."
  - email and password sign-in (`signInWithPassword`) with no OTP
  - ScamShield and "Call 1799" on the Scams page
  - 8 quiz questions
  - the Budget guide's "Send Home" share, the "Emergency Fund" goal and the `/emergency-fund` calculator
  - the quoted estimate strings
  - `com.remlo.app`
- **Screenshots:** all three are reused. Remlo's HEAD is `1eabe26`, the capture commit, so `git diff --stat 1eabe26 HEAD -- <the listed files>` is empty. Nothing was recaptured, and remloapp.com was never loaded.
- **FinanceForward logo:** uniform white margins trimmed from the 1408×736 reference to 949×288. That is pixel-identical to the design's own trimmed asset. It is not recoloured or redrawn.
- **Remlo icon:** Remlo's `public/pwa-512x512.png` (2048×2048), resized to 192, 96 and 48 px. The 48 px file is kept for completeness; the page derives its 1× and 2× sizes from the 192 and 96 files.

## Test results

| Check                                                               | Result                                                                              |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `npm run lint` (ESLint and Prettier)                                | Pass                                                                                |
| `npm run check` (astro check)                                       | 0 errors, 0 warnings, 0 hints                                                       |
| `npm test` (Vitest)                                                 | 50 passed: schemas, output guard fixtures, MetricsPanel not mounted                 |
| `npm run build` and output guard                                    | Pass (93 files checked)                                                             |
| Playwright at 320, 375, 390, 768, 1024 and 1440                     | 104 passed, 10 skipped (desktop-nav tests below 1024; menu tests at 1024 and above) |
| axe on `/` and the 404, all six widths, plus the open menu          | 0 violations                                                                        |
| CSP check: the `vercel.json` headers replayed on the preview server | 0 violations, 0 console errors                                                      |

The e2e suite checks:

- no horizontal overflow
- each nav anchor lands under the sticky header, with `aria-current="location"`
- the menu dialog: focus trap in both directions, Esc, Close, focus return and scroll lock
- every "Explore Remlo" link is exactly `https://remloapp.com`, with no UTM parameters
- "See what Remlo does" → `#remlo`
- the three mailto `href`s and both `tel:` links
- `rel="noopener"` on every external link, and no `target`
- Updates and metrics are absent
- nothing from `review/` is in the page or served
- noindex is present
- the 404 returns status 404
- no request leaves `127.0.0.1`: all others are aborted, and the test fails if any were attempted

Full-page screenshots are written to `artifacts/screens/{width}.png`, which is git-ignored and regenerated by `npm run test:e2e`. I compared them with `design/clean/` by eye:

- Desktop at 1440 and mobile at 390 match the boards closely.
- Tablet and 1024 have no design board; see the layout choices below.

**Lighthouse CI** ran three times per preset against `astro preview`, with remloapp.com blocked. SEO excludes `is-crawlable` while the site is noindex.

| Preset  | Performance   | Accessibility | Best Practices | SEO | LCP         | CLS    | TBT  | JS     | CSS    |
| ------- | ------------- | ------------- | -------------- | --- | ----------- | ------ | ---- | ------ | ------ |
| Mobile  | 99 / 99 / 100 | 100           | 100            | 100 | 1.73–1.76 s | 0.0001 | 0 ms | 1.7 KB | 9.0 KB |
| Desktop | 100           | 100           | 100            | 100 | 0.39–0.41 s | 0      | 0 ms | 1.7 KB | 9.0 KB |

JS and CSS are transfer sizes. Reports are in `artifacts/lighthouse/`.

## Deployment

- **Project:** Vercel project `financeforward-site`, created with `vercel project add` and linked with `vercel link` run from a folder with no `.git`, so it cannot be connected to Git. `vercel project inspect` and the API both show no Git repository (`link: null`). `vercel.json` also sets `git.deploymentEnabled.main: false`.
- **Build and upload:** `vercel pull --environment=preview`, then `vercel build --target=preview`, which runs the guard on this machine, then `vercel deploy --prebuilt`. Only `.vercel/output` was uploaded. `.vercelignore` also lists `handoff/`, `review/`, `design/`, `artifacts/` and `tests/`.
- **Headers** in `vercel.json`:
  - Content-Security-Policy: `default-src 'self'`, with `script-src`, `style-src`, `img-src`, `font-src` and `connect-src` all `'self'`, plus `object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests`. No hashes are needed because the build emits no inline code.
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- **Deployment Protection:** on. Vercel Authentication covers all deployments except custom domains, which was the project default on this plan.
- **Vercel Toolbar:** turned off for this project (`enablePreviewFeedback: false`), so previews don't inject the third-party `vercel.live` script.
- **Browser check:** I opened the preview in Chrome while signed in. It made same-origin requests only, with no CSP errors and no toolbar.
- **What went wrong:** the project's first deployment, `dpl_8znTCpUVenBaEgCMLVEqJdpdM3qF`, was promoted to **production** by Vercel even though `.vercel/output/builds.json` records `"target": "preview"`. Vercel promotes a project's first deployment when it has no production deployment yet. I did not run `--prod`, `promote`, `alias`, `domains` or `dns`. The second deployment, the preview above, is a normal preview with no aliases.
- **Options for the production deployment** (I have done neither):
  - Leave it: it is protected, noindex and identical to the preview.
  - Remove it: `vercel remove dpl_8znTCpUVenBaEgCMLVEqJdpdM3qF`. Removing it may just move the project back to "no production deployment", so a later deploy could be auto-promoted again.

## Choices I made

- **Tablet (640–1023):**
  - the compact header with the Menu dialog
  - the hero stacked, with the phone and language panel composition centred below the text
  - the feature row stays a scroll-snap row, as on mobile
  - principles in 2 columns, or 3 from 800 px
  - the team in an auto-fill grid
  - the "What we do" cards side by side from 900 px
- **At 1024–1439:**
  - the hero visual scales with `clamp(380px, 36vw, 520px)`, and its language names size to the panel with container query units
  - the H1 steps from 52 to 64 px
- **Touch targets:** at least 44 px everywhere, including footer and card text links. The footer link lists are therefore a little taller than the board, whose 12 px gaps give roughly 38 px rows.
- **Mobile feature cards:** 286 px as designed, narrowed on very small phones (320) so the next card peeks in as a swipe cue.
- **Section fade-in:** only for sections that start below the fold, so nothing on screen is ever hidden. It is never used without JavaScript, and it is off under `prefers-reduced-motion`.
- **Mobile menu:** a native `<dialog>` opened with `showModal()`, plus an explicit Tab trap. A section link closes the menu and follows the anchor, so focus goes with the reader. Esc and Close return focus to Menu.
- **Current section:** the footer counts as part of Contact, so "Contact" stays current at the bottom of the page.
- **Accessible names:** use the copy. For example, the at-a-glance list is labelled "Remlo at a glance", and the language lists and feature row are labelled by their visible labels. The mobile "Swipe · 1 of 3" hint is `aria-hidden`, since the list already announces its length.
- **Font fallbacks:** metric-matched fallback faces (Georgia and Arial with `size-adjust` and ascent/descent overrides) keep text from shifting when the web fonts load.
- **Favicon:** a blank, transparent `favicon.svg`, so browsers don't log a missing `/favicon.ico`. Neither logo works as a favicon without cropping or redrawing, which the brief rules out. Swap it in once you have an approved mark.
- **Extra design tokens:** a few secondary colours from the design exports aren't in the token table, such as the header hairline `#ECE8DF`, the email card ground `#FBFAF7`, the Remlo chip line `#F0D9C4` and the Remlo outline border `#E3B999`. They are added to `tokens.css` as named tokens.
- **Updates heading:** the Updates section needs a heading, and the copy only names it "Updates". `site.ts` uses that word until you write one; it isn't rendered in v1.
- **Tooling adjustments:**
  - TypeScript is pinned to 6.0.3, because `@astrojs/check` and `typescript-eslint` don't support TypeScript 7 yet.
  - Astro 7 backgrounds `astro preview` when it detects an agent, so the test and Lighthouse configs pass `--ignore-lock` to keep it in the foreground.
  - Astro telemetry is disabled in the npm scripts.
- **Dependencies:**
  - Production dependencies have 0 known vulnerabilities.
  - `npm audit` reports 10 advisories in `@lhci/cli`'s dev-only dependency tree (`tmp`, `extract-zip`, `uuid`). They are never shipped, and I left them rather than force-upgrade `@lhci/cli`.

## Confirmations

- **Production and domains:** no domain, alias, DNS or promotion command was run. However, Vercel auto-promoted the first deployment to production; see "Deployment". `PUBLIC_SITE_INDEXABLE` is unset.
- **Remlo:** untouched. It was cloned read-only to a temp directory, and nothing was committed, pushed, deployed or run there, including its backend scripts, Supabase CLI and tests. remloapp.com was never loaded; tests abort any request to it.
- **Outreach and tracking:** no email was sent, no accounts were created, and no analytics, cookies, forms or third-party requests were added.
- **Private material:** `handoff/` is git-ignored and was never committed or uploaded. `review/` is committed to this private repo but never built or uploaded.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
