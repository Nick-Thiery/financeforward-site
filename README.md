# financeforward-site

FinanceForward's organisation website: a static Astro site for a Singapore initiative that helps migrant workers make more informed everyday financial decisions through practical education, community activities and Remlo, its free multilingual app.

This repository is private. Nothing here is deployed to production until Nick approves it.

## Working on the site

Requires Node 22.12 or later (`.nvmrc` pins 24).

```bash
npm ci
npm run dev          # local dev server
npm run build        # astro build + the output guard (fails on unpublishable content)
npm run preview      # serve dist/
```

Checks:

```bash
npm run lint         # ESLint + Prettier
npm run check        # astro check (TypeScript strict)
npm test             # Vitest: content schemas, output guard, MetricsPanel not mounted
npx playwright install chromium   # once
npm run build && npm run test:e2e # Playwright + axe at 320–1440px; screenshots in artifacts/screens/
npm run lhci         # Lighthouse CI, mobile and desktop; reports in artifacts/lighthouse/
```

## Editing content

All public copy lives in `src/content/` (see `CHANGES.md` for examples):

| File           | What it holds                                                  |
| -------------- | -------------------------------------------------------------- |
| `site.ts`      | Every public string on the page                                |
| `languages.ts` | Remlo's languages, copied from Remlo's source                  |
| `team.ts`      | Team members (`publish`, optional approved portrait)           |
| `updates.ts`   | Dated updates; the section appears only with an approved entry |
| `images.ts`    | Image registry; only `approved: true` images render            |
| `metrics.ts`   | Public figures: disabled, and the panel is not mounted         |

## Private files

- `review/` holds the private review checklist and `private-terms.txt`. Nothing in `src/` may import it, and the output guard fails the build if any of it reaches `dist/`.
- `design/` holds the design boards for reference; it is never served.
- `handoff/` (the original brief) is git-ignored and never committed or uploaded.

## Deploying

The site lives at https://financeforwardsg.com. `www.financeforwardsg.com` and `financeforward-site.vercel.app` both redirect there with a 308.

Always build locally, so the output guard runs on this machine and only the build output is uploaded. Deploy only with Nick's approval.

```bash
# Production (indexable: PUBLIC_SITE_INDEXABLE=true is set in Vercel's Production environment)
vercel pull --yes --environment=production
vercel build --prod
vercel deploy --prebuilt --prod

# Preview (noindex: the variable isn't set for Preview)
vercel pull --yes --environment=preview
vercel build
vercel deploy --prebuilt
```

The Vercel project is not connected to Git, and `vercel.json` disables Git deployments of `main` as a second safeguard, so pushing never deploys.
