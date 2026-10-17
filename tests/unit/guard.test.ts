import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import {
  checkOutput,
  checkSourceImports,
  readTerms,
  termPattern,
} from '../../scripts/check-output.mjs';

type Files = Record<string, string>;

const roots: string[] = [];
afterAll(() => roots.forEach((root) => rmSync(root, { recursive: true, force: true })));

function writeTree(root: string, files: Files) {
  for (const [path, content] of Object.entries(files)) {
    const full = join(root, path);
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, content);
  }
}

const TERMS = [
  '# comment line',
  'LEO',
  "Migrant Workers' Centre",
  '70+',
  '86.7',
  "It's Raining Raincoats",
  'Wise',
].join('\n');

const REVIEW_NOTE =
  'The founding month and the first workshop dates still need to be confirmed with the host.';

/** A fixture project: dist/, review/ and src/. Returns the guard's problems. */
function run(dist: Files, options: { terms?: string | null; src?: Files } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'ff-guard-'));
  roots.push(root);
  writeTree(join(root, 'dist'), dist);
  const review: Files = { 'notes.md': `# Private\n\n- ${REVIEW_NOTE}\n` };
  if (options.terms !== null) review['private-terms.txt'] = options.terms ?? TERMS;
  writeTree(join(root, 'review'), review);
  writeTree(join(root, 'src'), options.src ?? { 'pages/index.astro': '<h1>Hi</h1>' });
  return checkOutput({
    distDir: join(root, 'dist'),
    termsFile: join(root, 'review', 'private-terms.txt'),
    reviewDir: join(root, 'review'),
    srcDir: join(root, 'src'),
  }) as string[];
}

const page = (body: string) =>
  `<!doctype html><html lang="en"><head><title>T</title></head><body>${body}</body></html>`;
const section = (inner: string) => `<section id="s"><h2>Heading</h2><p>${inner}</p></section>`;

describe('output guard: clean output passes', () => {
  it('passes a clean page, CSS and JS', () => {
    const problems = run({
      'index.html': page(
        section(
          'Otherwise, likewise: Leonard and Leopold read about Wiseman’s leopards. ' +
            'Compare 170+ and 870+ values, 186.7 and 86.75.',
        ) + '<img src="/a.png" alt="A picture"><img src="/b.png" alt="">',
      ),
      '_astro/site.css': '.a{width:87.86%;color:#16181d}',
      '_astro/site.js': 'const leopard=1;export{leopard};',
      'photo.png': 'binary-ish TODO content is not scanned',
    });
    expect(problems).toEqual([]);
  });
});

describe('output guard: markers fail', () => {
  it.each([
    ['[VERIFY', '<p>Founded in [VERIFY month] 2026</p>'],
    ['[DECIDE', '<p>[DECIDE: wording]</p>'],
    ['[HOLD', '<p>[HOLD] poster</p>'],
    ['[PLACEHOLDER', '<p>[PLACEHOLDER image]</p>'],
    ['TODO', '<p>TODO: write this</p>'],
    ['TBD', '<p>Date TBD</p>'],
    ['FIXME', '<p>FIXME</p>'],
    ['lorem', '<p>Lorem ipsum dolor</p>'],
  ])('fails on %s', (label, html) => {
    const problems = run({ 'index.html': page(section('ok') + html) });
    expect(problems.join('\n')).toContain(`review marker "${label}"`);
  });

  it('also scans CSS and JS', () => {
    const problems = run({
      'index.html': page(section('ok')),
      '_astro/a.js': '// TODO remove',
    });
    expect(problems.join('\n')).toContain('_astro/a.js: review marker "TODO"');
  });
});

describe('output guard: private terms fail', () => {
  it.each([
    ['an entity-encoded apostrophe', 'It&#39;s Raining Raincoats', "It's Raining Raincoats"],
    ['a named entity', 'It&apos;s Raining Raincoats', "It's Raining Raincoats"],
    ['a curly apostrophe', 'It’s raining raincoats', "It's Raining Raincoats"],
    ['a term split by tags', 'It’s <em>Raining</em>\n Raincoats', "It's Raining Raincoats"],
    ['a trailing plus', 'We met 70+ people', '70+'],
    ['a decimal figure', 'Survey: 86.7% agreed', '86.7'],
    ['different case', 'the leo workshop', 'LEO'],
    ['a curly apostrophe in a term', 'Migrant Workers’ Centre', "Migrant Workers' Centre"],
    ['a word on its own', 'Providers such as Wise.', 'Wise'],
  ])('fails on %s', (_label, text, term) => {
    const problems = run({ 'index.html': page(section(text)) });
    expect(problems.join('\n')).toContain(`private term "${term}"`);
  });

  it('finds a term split by <wbr> or a soft hyphen', () => {
    const problems = run({ 'index.html': page(section('Supported by Wi<wbr>se and Wi&shy;se')) });
    expect(problems.join('\n')).toContain('private term "Wise"');
  });

  it('does not join words across separate elements', () => {
    // Adjacent labels such as "Remlo" + "Remlo" must not read as "loRem".
    const problems = run({
      'index.html': page(section('ok') + '<a href="#a">Explore Remlo</a><a href="#b">Remlo</a>'),
    });
    expect(problems).toEqual([]);
  });

  it('checks attribute values such as alt text', () => {
    const problems = run({
      'index.html': page(section('ok') + '<img src="/a.png" alt="LEO session photo">'),
    });
    expect(problems.join('\n')).toContain('private term "LEO"');
  });

  it('throws when the terms file is missing', () => {
    expect(() => run({ 'index.html': page(section('ok')) }, { terms: null })).toThrow(/not found/);
  });

  it('throws when the terms file has only comments', () => {
    expect(() => run({ 'index.html': page(section('ok')) }, { terms: '# nothing\n\n' })).toThrow(
      /no terms/,
    );
  });

  it('matches whole words only', () => {
    expect(termPattern('Wise').test('otherwise')).toBe(false);
    expect(termPattern('70+').test('170+')).toBe(false);
    expect(termPattern('70+').test('70+ attendees')).toBe(true);
    expect(termPattern("It's Raining Raincoats").test("it's raining  raincoats")).toBe(true);
  });
});

describe('output guard: structure', () => {
  it('fails on an <img> without alt', () => {
    const problems = run({ 'index.html': page(section('ok') + '<img src="/a.png">') });
    expect(problems.join('\n')).toContain('has no alt attribute');
  });

  it('fails on a section with no heading', () => {
    const problems = run({ 'index.html': page('<section id="x"><p>Text only</p></section>') });
    expect(problems.join('\n')).toContain('<section> #x has no heading');
  });

  it('fails on an empty section', () => {
    const problems = run({ 'index.html': page('<section id="y"><h2> </h2></section>') });
    const text = problems.join('\n');
    expect(text).toContain('<section> #y has no heading');
    expect(text).toContain('<section> #y has no text content');
  });

  it('fails if the metrics panel is mounted', () => {
    const problems = run({
      'index.html': page(section('ok') + '<div data-component="metrics"></div>'),
    });
    expect(problems.join('\n')).toContain('metrics panel is mounted');
  });
});

describe('output guard: review/ never ships', () => {
  it('fails when a review file is copied into dist', () => {
    const problems = run({ 'index.html': page(section('ok')), 'private-terms.txt': 'LEO' });
    expect(problems.join('\n')).toContain('private-terms.txt: file from review/');
  });

  it('fails when review notes appear in a page', () => {
    const problems = run({ 'index.html': page(section(REVIEW_NOTE)) });
    expect(problems.join('\n')).toContain('contains text from review/notes.md');
  });

  it('fails when src imports from review/', () => {
    const problems = run(
      { 'index.html': page(section('ok')) },
      { src: { 'content/x.ts': "import terms from '../../review/private-terms.txt?raw';" } },
    );
    expect(problems.join('\n')).toContain('references review/');
  });

  it('checkSourceImports passes the real src/ directory', () => {
    expect(checkSourceImports(join(process.cwd(), 'src'))).toEqual([]);
  });

  it('the real terms file exists and has the seeded terms', () => {
    const terms = readTerms(join(process.cwd(), 'review', 'private-terms.txt')) as string[];
    expect(terms).toContain("It's Raining Raincoats");
    expect(terms).toContain('70+');
    // "Magura" was removed once Marcus Magura's surname was confirmed for publication.
    expect(terms).not.toContain('Magura');
    expect(terms.length).toBeGreaterThanOrEqual(18);
  });
});

describe('output guard: search-engine consistency', () => {
  const ORIGIN = 'https://financeforwardsg.com';
  const alt = (hreflang: string, path: string) =>
    `<link rel="alternate" hreflang="${hreflang}" href="${ORIGIN}${path}">`;
  const guide = (path: string, options: { robots?: string; alternates?: string[] } = {}) =>
    `<!doctype html><html lang="en"><head><title>T</title>` +
    (options.robots ? `<meta name="robots" content="${options.robots}">` : '') +
    (options.robots === 'noindex' ? '' : `<link rel="canonical" href="${ORIGIN}${path}">`) +
    (options.alternates ?? []).join('') +
    `</head><body>${section('Text')}</body></html>`;
  const sitemap = (...paths: string[]) =>
    `<urlset>${paths.map((p) => `<url><loc>${ORIGIN}${p}</loc></url>`).join('')}</urlset>`;

  // English and Bengali, both published and pointing at each other.
  const pair = [alt('en', '/g/'), alt('bn', '/bn/g/'), alt('x-default', '/g/')];

  it('passes published pages with reciprocal hreflang, and a draft that is left out', () => {
    expect(
      run({
        'g/index.html': guide('/g/', { alternates: pair }),
        'bn/g/index.html': guide('/bn/g/', { alternates: pair }),
        'th/g/index.html': guide('/th/g/', { robots: 'noindex' }),
        'sitemap-0.xml': sitemap('/g/', '/bn/g/'),
      }),
    ).toEqual([]);
  });

  it('fails a draft page that is in the sitemap', () => {
    const problems = run({
      'g/index.html': guide('/g/'),
      'th/g/index.html': guide('/th/g/', { robots: 'noindex' }),
      'sitemap-0.xml': sitemap('/g/', '/th/g/'),
    });
    expect(problems).toContain('th/g/index.html: a draft page is in the sitemap');
  });

  it('fails a draft page with a canonical or hreflang, or one that others point at', () => {
    const problems = run({
      'g/index.html': guide('/g/', {
        alternates: [alt('en', '/g/'), alt('th', '/th/g/'), alt('x-default', '/g/')],
      }),
      'th/g/index.html':
        '<!doctype html><html lang="th"><head><title>T</title><meta name="robots" content="noindex">' +
        `<link rel="canonical" href="${ORIGIN}/th/g/">${alt('en', '/g/')}</head><body>${section('Text')}</body></html>`,
      'sitemap-0.xml': sitemap('/g/'),
    });
    expect(problems).toEqual(
      expect.arrayContaining([
        'th/g/index.html: a draft page (noindex) has a canonical',
        'th/g/index.html: a draft page has hreflang',
        "th/g/index.html: a draft page is the target of another page's hreflang",
        'g/index.html: hreflang points at a draft page /th/g/',
      ]),
    );
  });

  it('fails hreflang that is not reciprocal, lacks x-default or self-reference', () => {
    const problems = run({
      'g/index.html': guide('/g/', { alternates: pair }),
      'bn/g/index.html': guide('/bn/g/', {
        alternates: [alt('bn', '/bn/g/'), alt('x-default', '/g/')],
      }),
      'sitemap-0.xml': sitemap('/g/', '/bn/g/'),
    });
    expect(problems.some((p) => p.includes('not reciprocal'))).toBe(true);
    const noDefault = run({
      'g/index.html': guide('/g/', { alternates: [alt('en', '/g/'), alt('bn', '/bn/g/')] }),
      'bn/g/index.html': guide('/bn/g/', { alternates: [alt('en', '/g/'), alt('bn', '/bn/g/')] }),
      'sitemap-0.xml': sitemap('/g/', '/bn/g/'),
    });
    expect(noDefault).toEqual(
      expect.arrayContaining([
        'g/index.html: hreflang needs exactly one x-default',
        'bn/g/index.html: hreflang needs exactly one x-default',
      ]),
    );
    const noSelf = run({
      'g/index.html': guide('/g/', { alternates: [alt('bn', '/bn/g/'), alt('x-default', '/g/')] }),
      'bn/g/index.html': guide('/bn/g/'),
      'sitemap-0.xml': sitemap('/g/', '/bn/g/'),
    });
    expect(noSelf).toContain('g/index.html: hreflang does not include the page itself');
  });

  it('fails hreflang that points at a missing page or at a page not in the sitemap', () => {
    const problems = run({
      'g/index.html': guide('/g/', { alternates: pair }),
      'sitemap-0.xml': sitemap('/g/'),
    });
    expect(problems).toContain(
      'g/index.html: hreflang points at /bn/g/, which is not in the build',
    );
    const unlisted = run({
      'g/index.html': guide('/g/', { alternates: pair }),
      'bn/g/index.html': guide('/bn/g/', { alternates: pair }),
      'sitemap-0.xml': sitemap('/g/'),
    });
    expect(unlisted.some((p) => p.includes('not in the sitemap'))).toBe(true);
  });

  it('fails a sitemap entry for a page that does not exist', () => {
    expect(
      run({ 'index.html': page(section('Hi')), 'sitemap-0.xml': sitemap('/', '/gone/') }),
    ).toContain('sitemap: /gone/ is not in the build');
  });
});
