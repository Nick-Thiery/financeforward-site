# Private review checklist (never published)

This file is for Nick and the team only. The website must never import, render or deploy it. In the site repo it lives in `review/`, outside `src/` and `public/`.

None of these items block the v1 preview or launch. They decide what can be **added** to the site later, mainly the optional Updates section.

## Facts to confirm before any of them appear publicly

| Topic | What we have | What's needed |
| --- | --- | --- |
| Founding | FinanceForward founded January 2026 (Nick's account) | Confirm the month, and how the team wants to be described (students? volunteers? registered nonprofit or not?) |
| First workshops | Old site lists two sessions, 15 and 22 March, at Sembawang Recreation Centre | Confirm the dates. The host must agree to being named. No attendance figures |
| UWCSEA East workshop | Mentioned internally | Date, wording, and the host's OK to be named. No attendance figures |
| Remlo on Google Play | The listing shows an update on 3–4 July 2026; the first publication date is unknown | Check Play Console for the first-publication date |
| remloapp.com | Became the main domain in September 2026 (between 5 and 22 Sep) | Exact month, if an entry is wanted |
| Translation review | The repo audit recommends native-speaker review of the 12 languages | Is a review actually under way or done? Until confirmed, say nothing public about it |
| Worker research | Discovery sessions (~6–8 workers, observed use) are planned | Describe them only once they have happened. Never describe planned walkthroughs as done |
| Guest mode | Present in Remlo main at 1eabe26 and seen on production on 28 Sep | Recheck before each launch; the site says an account is optional |
| Remlo analytics privacy | The repo has an allow-list (`src/lib/analyticsPolicy.js`) excluding amounts, messages and contact details | Make no public claim until the deployed behaviour has been checked |

## Held items (wording and naming need Nick's approval)

- **LEO workshop:** a draft would read "A hands-on Remlo session at [host]". It needs a date, approved wording and host naming. The 70+ attendee figure is Nick's report, not an audited count, so don't use it.
- **Krsna poster placement:** a draft would read "Remlo posters placed at [venue]". Never publish the prepared "HOLD" graphics.
- **MWC:** Remlo was shared in the Migrant Workers' Centre's **ambassador groups**, not its general WhatsApp channel. Never imply general-channel distribution or endorsement. Ideally get MWC's OK before naming it.

## Team

- **Spelling:** ✅ Resolved 28 Sep 2026: "Ries" (Ries Joos).
- **Names:** ✅ Resolved 28 Sep 2026: full names confirmed by Nick and published: Marcus Magura, Christopher Chen, Ries Joos. ("Magura" removed from `private-terms.txt`.)
- **Consent:** each person confirms their title, one-line description and OK to appear. If someone doesn't, set `publish: false`; the grid reflows, and the section disappears if nobody is left.
- **Portraits:** optional. Get each person's consent, plus a parent or guardian's for anyone under 18.

## Brand and assets

- **FinanceForward logo:** ✅ Approved as-is by Nick on 28 Sep 2026: the old site's 1408×736 PNG with a white background (used with uniform white margins trimmed). A vector or transparent original can replace it later if one turns up.
- **Remlo mark:** only raster icons exist; no vector found.
- **Exchange Rate screenshot:** deliberately not used in v1. A live capture shows specific providers and rates, and one provider appears first while partnership talks are open. The feature card instead quotes the app's "Illustrative estimates, not provider quotes" label.
- **Photos:** none are approved. The layout needs none; add them later only with written web-use consent and host approval.

## Remlo app and listing wording (outside the website)

- The app's Home card says "Get personalised money tips based on your profile", which sits awkwardly beside "doesn't give personalised, regulated financial advice".
- The Play listing says "AI-powered scam detection"; the alerts are curated entries with AI translation.
- The Play listing's website field points to the old Lovable site, and its privacy link to remlo-iota.vercel.app/privacy.
- The old Lovable site still lists It's Raining Raincoats as a partner and shows unverified survey percentages.

## Kept internal on purpose

- The 10,000-worker figure is an ambition, not an achieved result. It is not on the site.
- Dashboard figures (21–27 Sep app openers, first-useful-action users, attribution gaps) are not validated. They are not on the site, and the metrics component stays disabled.
- To enable metrics later, each figure needs a definition, source, date range, caveat, and Nick's approval.

## Inspection log

- On 28 Sep, around 15:05 SGT, remloapp.com was loaded once in the desktop app's browser pane to compare production with the repo. Its analytics identifiers weren't captured, so this note doesn't classify it either way.
