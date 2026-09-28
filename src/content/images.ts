/*
 * Image registry. A component shows an image only when its entry has
 * `approved: true`; otherwise it shows its finished fallback (initials tile,
 * topic panel, a text wordmark, or nothing). Never an empty box.
 *
 * The logo and the Remlo images were supplied by Nick for this build, so they
 * start approved. Add new images here with `approved: false` until Nick signs
 * them off.
 */
import ffLogo from '../assets/brand/financeforward-logo.png';
import remloIcon192 from '../assets/remlo/remlo-icon-192.png';
import remloIcon96 from '../assets/remlo/remlo-icon-96.png';
import remloWelcome from '../assets/screens/remlo-01-welcome.png';
import remloBudget from '../assets/screens/remlo-06-budget.png';
import remloScamQuiz from '../assets/screens/remlo-08-scam-quiz.png';
import { imagesSchema, type ImageEntry } from './schemas';
import { site } from './site';

const REMLO_COMMIT = '1eabe26';

export const images = imagesSchema.parse([
  {
    id: 'ff-logo',
    src: ffLogo,
    alt: site.brand.logoAlt,
    approved: true,
    source:
      "Old site's 1408×736 logo raster, approved as-is by Nick on 28 Sep 2026; uniform white margins trimmed to 949×288",
  },
  {
    id: 'remlo-icon',
    src: remloIcon192,
    alt: '',
    approved: true,
    source: 'Remlo public/pwa-512x512.png (2048×2048), resized to 192 px',
    capturedFromCommit: REMLO_COMMIT,
  },
  {
    id: 'remlo-icon-small',
    src: remloIcon96,
    alt: '',
    approved: true,
    source: 'Remlo public/pwa-512x512.png (2048×2048), resized to 96 px',
    capturedFromCommit: REMLO_COMMIT,
  },
  {
    id: 'remlo-welcome',
    src: remloWelcome,
    alt: site.hero.phoneAlt,
    approved: true,
    source: 'Remlo welcome screen, 390×844 @2x, guest mode, English, analytics off',
    capturedFromCommit: REMLO_COMMIT,
  },
  {
    id: 'remlo-budget',
    src: remloBudget,
    alt: site.remlo.features.budget.alt,
    approved: true,
    source: 'Remlo /budget, 390×844 @2x, guest mode, English, analytics off',
    capturedFromCommit: REMLO_COMMIT,
  },
  {
    id: 'remlo-scam-quiz',
    src: remloScamQuiz,
    alt: site.remlo.features.scamQuiz.alt,
    approved: true,
    source: 'Remlo /scam-quiz question 1, 390×844 @2x, guest mode, English, analytics off',
    capturedFromCommit: REMLO_COMMIT,
  },
]);

export type ImageId =
  | 'ff-logo'
  | 'remlo-icon'
  | 'remlo-icon-small'
  | 'remlo-welcome'
  | 'remlo-budget'
  | 'remlo-scam-quiz';

/** The image if it exists and is approved, otherwise `undefined`. */
export function approvedImage(id: ImageId): ImageEntry | undefined {
  const entry = images.find((image) => image.id === id);
  return entry?.approved ? entry : undefined;
}
