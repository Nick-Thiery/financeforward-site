/*
 * Remlo's languages, copied from Nick-Thiery/remlo `src/lib/languages.js`
 * at commit 1eabe26adebca296ddab96353e0323ab01df6d5e (checked 28 Sep 2026).
 *
 * The hero language panel, the Remlo section's chips and every "N languages"
 * phrase are derived from this list, so update it only to match Remlo's code.
 * `dir` is added here: Urdu is written right to left.
 */
import { languagesSchema } from './schemas';

export const languages = languagesSchema.parse([
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'ta', label: 'தமிழ்', dir: 'ltr' },
  { code: 'hi', label: 'हिंदी', dir: 'ltr' },
  { code: 'bn', label: 'বাংলা', dir: 'ltr' },
  { code: 'my', label: 'မြန်မာ', dir: 'ltr' },
  { code: 'si', label: 'සිංහල', dir: 'ltr' },
  { code: 'fil', label: 'Filipino', dir: 'ltr' },
  { code: 'id', label: 'Indonesia', dir: 'ltr' },
  { code: 'zh', label: '中文', dir: 'ltr' },
  { code: 'th', label: 'ภาษาไทย', dir: 'ltr' },
  { code: 'ur', label: 'اردو', dir: 'rtl' },
  { code: 'ne', label: 'नेपाली', dir: 'ltr' },
]);

export const languageCount = languages.length;
