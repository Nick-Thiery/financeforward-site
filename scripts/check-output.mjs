#!/usr/bin/env node
/*
 * Output guard: the only publishing check. `npm run build` runs it after
 * `astro build`, for previews and production alike, and a failure fails the
 * build. It scans every text file in dist/ and fails on:
 *
 *   1. review markers: [VERIFY, [DECIDE, [HOLD, [PLACEHOLDER, TODO, TBD,
 *      FIXME, lorem
 *   2. any term from review/private-terms.txt (entities decoded, curly quotes
 *      straightened, case-insensitive, whole-word); a missing or empty terms
 *      file is itself a failure
 *   3. an <img> without an alt attribute
 *   4. a <section> without a heading or without text
 *   5. data-component="metrics" (the metrics panel must not be mounted)
 *   6. anything from review/ in dist/, or any src/ file importing from review/
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodeHTML } from 'entities';
import { parse } from 'node-html-parser';

const TEXT_EXTENSIONS = new Set([
  '.html',
  '.htm',
  '.css',
  '.js',
  '.mjs',
  '.cjs',
  '.json',
  '.txt',
  '.xml',
  '.svg',
  '.webmanifest',
  '.map',
  '.md',
]);

const MARKERS = [
  { label: '[VERIFY', pattern: /\[VERIFY/i },
  { label: '[DECIDE', pattern: /\[DECIDE/i },
  { label: '[HOLD', pattern: /\[HOLD/i },
  { label: '[PLACEHOLDER', pattern: /\[PLACEHOLDER/i },
  { label: 'TODO', pattern: /(?<![A-Za-z0-9])TODO(?![A-Za-z0-9])/ },
  { label: 'TBD', pattern: /(?<![A-Za-z0-9])TBD(?![A-Za-z0-9])/ },
  { label: 'FIXME', pattern: /(?<![A-Za-z0-9])FIXME(?![A-Za-z0-9])/ },
  { label: 'lorem', pattern: /(?<![A-Za-z])lorem/i },
];

/** Straighten curly apostrophes and quotes. */
export function normaliseQuotes(value) {
  return value.replace(/[‘’‚‛′ʼ]/g, "'").replace(/[“”„‟″]/g, '"');
}

/** Decode HTML entities (twice, to catch double-encoding) and straighten quotes. */
export function normaliseText(value) {
  return normaliseQuotes(decodeHTML(decodeHTML(value)));
}

/** Read the private terms file. Throws if it is missing or has no terms. */
export function readTerms(termsFile) {
  if (!existsSync(termsFile)) {
    throw new Error(`Private terms file not found: ${termsFile}`);
  }
  const terms = readFileSync(termsFile, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'));
  if (terms.length === 0) {
    throw new Error(`Private terms file has no terms: ${termsFile}`);
  }
  return terms;
}

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Case-insensitive whole-word matcher; internal spaces match any whitespace. */
export function termPattern(term) {
  const body = normaliseQuotes(term).split(/\s+/).map(escapeRegExp).join('\\s+');
  return new RegExp(`(?<!\\w)${body}(?!\\w)`, 'i');
}

function listFiles(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...listFiles(path));
    else out.push(path);
  }
  return out;
}

/** Line-break hints that can sit inside a word: <wbr>, soft hyphen, zero-width characters. */
const invisibleBreaks = (value) =>
  value.replace(/<wbr\s*\/?>/gi, '').replace(/[\u00AD\u200B-\u200D\u2060]/g, '');

/**
 * The ways a file's text is examined: as written (so attribute values such as
 * alt text are covered), and for HTML also as visible text, with tags turned
 * into spaces and whitespace collapsed (so terms split across tags or lines
 * are still found).
 */
function textViews(raw, isHtml) {
  const decoded = invisibleBreaks(normaliseText(raw));
  if (!isHtml) return [decoded];
  const visible = normaliseText(invisibleBreaks(raw).replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ');
  return [decoded, visible];
}

function checkHtml(html, file, problems) {
  const root = parse(html, { comment: false });

  for (const img of root.querySelectorAll('img')) {
    if (!img.hasAttribute('alt')) {
      problems.push(`${file}: <img src="${img.getAttribute('src') ?? ''}"> has no alt attribute`);
    }
  }

  root.querySelectorAll('section').forEach((section, index) => {
    const name = section.getAttribute('id') ? `#${section.getAttribute('id')}` : `#${index + 1}`;
    const headings = section.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]');
    const hasHeading = headings.some((heading) => heading.textContent.trim().length > 0);
    if (!hasHeading) problems.push(`${file}: <section> ${name} has no heading`);
    if (section.textContent.trim().length === 0) {
      problems.push(`${file}: <section> ${name} has no text content`);
    }
  });

  if (root.querySelector('[data-component="metrics"]')) {
    problems.push(`${file}: the metrics panel is mounted (data-component="metrics")`);
  }
}

/** Distinctive lines of the review files, used to spot leaked content. */
function reviewFingerprints(reviewDir) {
  const prints = [];
  for (const file of listFiles(reviewDir)) {
    const text = normaliseQuotes(readFileSync(file, 'utf8'));
    for (const line of text.split(/\r?\n/)) {
      const clean = line
        .replace(/^[\s#>*|-]+/, '')
        .replace(/[*`|]/g, '')
        .trim();
      if (clean.length >= 40) prints.push({ file: basename(file), text: clean });
    }
  }
  return prints;
}

/** src/ must never import or reference anything in review/. */
export function checkSourceImports(srcDir) {
  const problems = [];
  const reference =
    /(?:from\s+|import\s*\(\s*|import\s+|require\s*\(\s*|glob\s*\(\s*|url\s*\(\s*)['"`][^'"`]*(?:^|\/)review\//;
  const privateNames = /private-review-checklist|private-terms/;
  for (const file of listFiles(srcDir)) {
    const text = readFileSync(file, 'utf8');
    if (reference.test(text) || privateNames.test(text)) {
      problems.push(`${file}: references review/ (private files must never be imported)`);
    }
  }
  return problems;
}

/**
 * Check a build directory. Returns a list of problems (empty when clean).
 * Throws if the terms file is missing or empty.
 */
export function checkOutput({ distDir, termsFile, reviewDir, srcDir }) {
  const problems = [];
  const terms = readTerms(termsFile).map((term) => ({ term, pattern: termPattern(term) }));

  if (!existsSync(distDir)) {
    return [`Build output not found: ${distDir}`];
  }

  const files = listFiles(distDir);
  if (files.length === 0) problems.push(`${distDir} is empty`);

  const reviewFiles = reviewDir ? listFiles(reviewDir) : [];
  const reviewNames = new Set(reviewFiles.map((file) => basename(file)));
  const reviewBytes = reviewFiles.map((file) => readFileSync(file));
  const prints = reviewDir ? reviewFingerprints(reviewDir) : [];

  for (const path of files) {
    const file = relative(distDir, path) || basename(path);
    const bytes = readFileSync(path);

    if (reviewNames.has(basename(path)) || /(?:^|\/)review\//.test(file)) {
      problems.push(`${file}: file from review/ in the build output`);
    }
    if (reviewBytes.some((review) => review.equals(bytes))) {
      problems.push(`${file}: identical to a file in review/`);
    }

    if (!TEXT_EXTENSIONS.has(extname(path).toLowerCase())) continue;
    const raw = bytes.toString('utf8');
    const isHtml = /\.html?$/i.test(path);
    const views = textViews(raw, isHtml);

    for (const marker of MARKERS) {
      if (views.some((view) => marker.pattern.test(view))) {
        problems.push(`${file}: review marker "${marker.label}"`);
      }
    }

    for (const { term, pattern } of terms) {
      if (views.some((view) => pattern.test(view))) {
        problems.push(`${file}: private term "${term}"`);
      }
    }

    for (const print of prints) {
      if (views.some((view) => view.includes(print.text))) {
        problems.push(`${file}: contains text from review/${print.file}`);
        break;
      }
    }

    if (/data-component=["']?metrics/.test(raw) && !isHtml) {
      problems.push(`${file}: references the metrics panel (data-component="metrics")`);
    }

    if (isHtml) checkHtml(raw, file, problems);
  }

  if (srcDir) problems.push(...checkSourceImports(srcDir));

  return problems;
}

function main() {
  const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
  const options = {
    distDir: join(root, 'dist'),
    termsFile: join(root, 'review', 'private-terms.txt'),
    reviewDir: join(root, 'review'),
    srcDir: join(root, 'src'),
  };

  let problems;
  try {
    problems = checkOutput(options);
  } catch (error) {
    console.error(`\n✖ Output guard could not run: ${error.message}\n`);
    process.exit(1);
  }

  if (problems.length > 0) {
    console.error(`\n✖ Output guard failed with ${problems.length} problem(s):\n`);
    for (const problem of problems) console.error(`  - ${problem}`);
    console.error('\nNothing was published. Fix the content, then build again.\n');
    process.exit(1);
  }

  const count = listFiles(options.distDir).length;
  console.log(`✓ Output guard passed (${count} files in dist/ checked).`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
