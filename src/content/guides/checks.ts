/*
 * Consistency checks for guide copy. They run at build time (from ./index.ts)
 * and in the unit tests. A translation may change every word, but it must not
 * change what the page promises: the same sections, the same phone numbers and
 * links (tokens), the same figures, and 0-9 digits only.
 */
import { parseRich } from './rich';
import { phones } from './registry';
import type { GuideContent } from './types';

/** Every string of a page with the path it sits at, e.g. "sections.0.items.2". */
export function flattenGuide(content: GuideContent): [string, string][] {
  const out: [string, string][] = [];
  const walk = (value: unknown, path: string) => {
    if (typeof value === 'string') out.push([path, value]);
    else if (Array.isArray(value)) value.forEach((item, i) => walk(item, `${path}.${i}`));
    else if (value && typeof value === 'object') {
      for (const [key, inner] of Object.entries(value)) {
        // ids, refs and the review record are not copy
        if (['id', 'ref', 'reviewedBy', 'reviewedOn'].includes(key)) continue;
        walk(inner, path ? `${path}.${key}` : key);
      }
    }
  };
  walk(content, '');
  return out;
}

/** Digits other than 0-9 (Arabic-Indic, Bengali, Tamil, Thai, Myanmar, full-width). */
const NON_ASCII_DIGIT = /[٠-٩۰-۹०-९০-৯௦-௯๐-๙၀-၉０-９]/;

/** Figures in a string: runs of 0-9 digits with , or . inside (30,000), tokens excluded. */
function figures(text: string): string[] {
  const plain = parseRich(text)
    .map((segment) => (segment.kind === 'text' ? segment.text : ' '))
    .join('');
  return (plain.match(/\d+(?:[.,]\d+)*/g) ?? []).sort();
}

/** The non-text parts of a string, as a sorted list: tel:police, link:list, count. */
function tokens(text: string): string[] {
  return parseRich(text)
    .flatMap((segment) => {
      if (segment.kind === 'tel') return [`tel:${segment.id}`];
      if (segment.kind === 'link') return [`link:${segment.id}`];
      if (segment.kind === 'count') return ['count'];
      return [];
    })
    .sort();
}

/** Problems with one page on its own (any language). */
export function pageProblems(content: GuideContent, name: string, lang: string): string[] {
  const problems: string[] = [];
  const reading = flattenGuide(content);
  for (const [path, text] of reading) {
    try {
      parseRich(text);
    } catch (error) {
      problems.push(`${name} ${path}: ${(error as Error).message}`);
      continue;
    }
    if (NON_ASCII_DIGIT.test(text)) problems.push(`${name} ${path}: use 0-9 digits only`);
    for (const { display } of Object.values(phones)) {
      if (text.includes(display)) {
        problems.push(`${name} ${path}: write the phone number "${display}" as a {tel:...} token`);
      }
    }
    if (/non-?profit/i.test(text)) {
      problems.push(`${name} ${path}: FinanceForward is not described as a nonprofit`);
    }
  }
  if (content.reviewed && (!content.reviewedBy || !content.reviewedOn) && lang !== 'en') {
    problems.push(`${name}: reviewed pages need reviewedBy and reviewedOn`);
  }
  return problems;
}

/** Problems with a translation compared with the English page of the same topic. */
export function translationProblems(
  english: GuideContent,
  translated: GuideContent,
  name: string,
): string[] {
  const problems: string[] = [];
  const en = new Map(flattenGuide(english));
  const tr = new Map(flattenGuide(translated));
  for (const path of en.keys()) {
    if (!tr.has(path)) problems.push(`${name}: missing ${path}`);
  }
  for (const path of tr.keys()) {
    if (!en.has(path)) problems.push(`${name}: extra ${path} (not in the English page)`);
  }
  for (const [path, englishText] of en) {
    const translatedText = tr.get(path);
    if (translatedText === undefined) continue;
    try {
      const a = tokens(englishText).join();
      const b = tokens(translatedText).join();
      if (a !== b)
        problems.push(
          `${name} ${path}: tokens differ (English: ${a || 'none'}; here: ${b || 'none'})`,
        );
      const x = figures(englishText).join(' ');
      const y = figures(translatedText).join(' ');
      if (x !== y)
        problems.push(
          `${name} ${path}: figures differ (English: ${x || 'none'}; here: ${y || 'none'})`,
        );
    } catch {
      // reported by pageProblems
    }
  }
  return problems;
}
