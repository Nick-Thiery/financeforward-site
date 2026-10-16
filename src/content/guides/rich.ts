/*
 * The tiny markup used in guide copy. See the comment above `phonesSchema` in
 * ../schemas.ts for what each token means. Parsing is strict: a stray brace or
 * bracket, or an id that is not in the registry, is an error at build time.
 */
import { languageCount } from '../languages';
import { outlinks, phones, type OutlinkId, type PhoneId } from './registry';

export type RichSegment =
  | { kind: 'text'; text: string }
  | { kind: 'tel'; id: PhoneId }
  | { kind: 'link'; id: OutlinkId; text: string }
  | { kind: 'count' };

const TOKEN = /\{tel:([a-z0-9-]+)\}|\{languages\}|\[([^\]]+)\]\(([a-z0-9-]+)\)/g;

/** Split a string into text and tokens. Throws on an unknown id or a stray bracket. */
export function parseRich(input: string): RichSegment[] {
  const segments: RichSegment[] = [];
  let last = 0;
  const pushText = (text: string) => {
    if (/[{}[\]]/.test(text) || text.includes('](')) {
      throw new Error(`Unrecognised markup in guide copy: "${input}"`);
    }
    if (text) segments.push({ kind: 'text', text });
  };
  for (const match of input.matchAll(TOKEN)) {
    pushText(input.slice(last, match.index));
    last = match.index + match[0].length;
    const [whole, tel, linkText, linkId] = match;
    if (whole === '{languages}') {
      segments.push({ kind: 'count' });
    } else if (tel !== undefined) {
      if (!(tel in phones)) throw new Error(`Unknown phone id "${tel}" in: "${input}"`);
      segments.push({ kind: 'tel', id: tel as PhoneId });
    } else if (linkText !== undefined && linkId !== undefined) {
      if (!(linkId in outlinks)) throw new Error(`Unknown link id "${linkId}" in: "${input}"`);
      segments.push({ kind: 'link', id: linkId as OutlinkId, text: linkText });
    }
  }
  pushText(input.slice(last));
  return segments;
}

/** The text a reader sees, with tokens resolved (used for structured data). */
export function richPlain(input: string): string {
  return parseRich(input)
    .map((segment) => {
      if (segment.kind === 'text' || segment.kind === 'link') return segment.text;
      if (segment.kind === 'tel') return phones[segment.id].display;
      return String(languageCount);
    })
    .join('');
}
