import { describe, expect, it } from 'vitest';
import {
  buildGuidePages,
  getGuide,
  guidePages,
  guidePath,
  guideSources,
  type GuidePageData,
} from '../../src/content/guides';
import { translationProblems } from '../../src/content/guides/checks';
import { guideLangCodes, guideLangs, guideTopics } from '../../src/content/guides/languages';
import { outlinks, phones, sources, SITE_ORIGIN } from '../../src/content/guides/registry';
import { parseRich, richPlain } from '../../src/content/guides/rich';
import { alternatesFor, faqJsonLd, sitemapEntry } from '../../src/content/guides/seo';
import { guideUi } from '../../src/content/guides/ui';
import { languageCount } from '../../src/content/languages';

type Sources = typeof guideSources;

/** The shipped sources with some pages marked as checked by a native speaker. */
function withReviewed(langs: string[], topics: string[] = [...guideTopics]): GuidePageData[] {
  const copy = structuredClone(guideSources) as Sources;
  for (const topic of topics) {
    for (const lang of langs) {
      const page = copy[topic as keyof Sources][lang as keyof Sources[keyof Sources]];
      page.reviewed = true;
      page.reviewedBy = 'A. Volunteer';
      page.reviewedOn = '2026-11-01';
    }
  }
  return buildGuidePages(copy);
}

const find = (pages: GuidePageData[], topic: string, lang: string) =>
  pages.find((p) => p.topic === topic && p.lang === lang)!;

describe('guide pages as shipped', () => {
  it('has two topics in seven languages, 14 pages', () => {
    expect(guideTopics).toHaveLength(2);
    expect(guideLangCodes).toHaveLength(7);
    expect(guidePages).toHaveLength(14);
    expect(guidePath('loan-sharks', 'en')).toBe('/loan-sharks/');
    expect(guidePath('sending-money-home', 'bn')).toBe('/bn/sending-money-home/');
  });

  it('publishes the English pages and holds back the translations until reviewed', () => {
    for (const page of guidePages) {
      if (page.lang === 'en') expect(page.content.reviewed).toBe(true);
      else if (!page.content.reviewed) {
        expect(page.content.reviewedBy).toBeUndefined();
      } else {
        expect(page.content.reviewedBy).toBeTruthy();
        expect(page.content.reviewedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
    // Nothing has been through a native speaker yet.
    expect(guidePages.filter((p) => p.lang !== 'en' && p.content.reviewed)).toEqual([]);
  });

  it('every language has its own html lang, hreflang and page furniture', () => {
    for (const lang of guideLangCodes) {
      expect(guideLangs[lang].htmlLang.length).toBeGreaterThan(1);
      expect(guideUi[lang].skipLink.length).toBeGreaterThan(0);
    }
    expect(guideLangs.zh.hreflang).toBe('zh-Hans');
    expect(new Set(guideLangCodes.map((l) => guideLangs[l].prefix)).size).toBe(7);
  });

  it('English pages have the sources and a last-checked date, and no provider is named', () => {
    expect(guideUi.en.checkedOn).toBe('17 October 2026');
    for (const id of Object.keys(sources))
      expect(sources[id as keyof typeof sources].url).toMatch(/^https:\/\//);
    const text = JSON.stringify(getGuide('sending-money-home', 'en').content);
    for (const name of [
      'Wise',
      'Western Union',
      'Remitly',
      'InstaReM',
      'DBS',
      'PayNow',
      'MoneyGram',
    ]) {
      expect(text).not.toContain(name);
    }
  });

  it('never calls FinanceForward a nonprofit, in any language', () => {
    for (const page of guidePages) {
      expect(JSON.stringify(page.content)).not.toMatch(/non-?profit/i);
    }
  });

  it('phone numbers are the verified ones', () => {
    expect(Object.fromEntries(Object.entries(phones).map(([k, v]) => [k, v.display]))).toEqual({
      emergency: '999',
      police: '1800-255-0000',
      scamshield: '1799',
      registry: '1800-2255-529',
      ccs: '6225 5227',
    });
    expect(outlinks.iwitness.url).toBe('https://www.police.gov.sg/I-Witness');
  });

  it('the production origin matches astro.config.mjs', async () => {
    const { readFileSync } = await import('node:fs');
    expect(readFileSync('astro.config.mjs', 'utf8')).toContain(`site: '${SITE_ORIGIN}'`);
  });
});

describe('guide markup', () => {
  it('parses tokens and rejects stray or unknown ones', () => {
    expect(parseRich('Call {tel:police} or [report](iwitness).')).toEqual([
      { kind: 'text', text: 'Call ' },
      { kind: 'tel', id: 'police' },
      { kind: 'text', text: ' or ' },
      { kind: 'link', id: 'iwitness', text: 'report' },
      { kind: 'text', text: '.' },
    ]);
    expect(() => parseRich('{tel:nope}')).toThrow(/Unknown phone id/);
    expect(() => parseRich('[x](nope)')).toThrow(/Unknown link id/);
    expect(() => parseRich('stray { brace')).toThrow(/Unrecognised markup/);
    expect(richPlain('{tel:scamshield} in {languages} languages')).toBe(
      `1799 in ${languageCount} languages`,
    );
  });
});

describe('translation consistency checks', () => {
  const clone = () => structuredClone(guideSources) as Sources;
  const build = (mutate: (s: Sources) => void) => {
    const copy = clone();
    mutate(copy);
    return () => buildGuidePages(copy);
  };

  it('accepts the shipped pages', () => {
    expect(() => buildGuidePages(clone())).not.toThrow();
  });

  it('fails when a translation changes a phone number token', () => {
    expect(
      build((s) => {
        s['loan-sharks'].th.callout!.body = s['loan-sharks'].th.callout!.body.replace(
          '{tel:police}',
          '{tel:scamshield}',
        );
      }),
    ).toThrow(/tokens differ/);
  });

  it('fails when a translation types a phone number instead of using the token', () => {
    expect(
      build((s) => {
        s['loan-sharks'].vi.callout!.body = s['loan-sharks'].vi.callout!.body.replace(
          '{tel:emergency}',
          '999',
        );
      }),
    ).toThrow(/tokens differ|as a \{tel/);
  });

  it('fails when a figure changes', () => {
    expect(
      build((s) => {
        const items = s['loan-sharks'].zh.sections[2]!.items!;
        items[3] = items[3]!.replace('300,000', '30,000');
      }),
    ).toThrow(/figures differ/);
  });

  it('fails on non-0-9 digits', () => {
    expect(
      build((s) => {
        s['loan-sharks'].bn.sections[1]!.note = s['loan-sharks'].bn.sections[1]!.note!.replace(
          '{tel:scamshield}',
          '{tel:scamshield} ২৪',
        );
      }),
    ).toThrow(/0-9 digits only/);
  });

  it('fails when a section or item is dropped', () => {
    expect(build((s) => s['sending-money-home'].my.sections.pop())).toThrow(/missing|extra/);
    expect(build((s) => s['loan-sharks'].ta.sections[0]!.items!.pop())).toThrow(/missing/);
  });

  it('fails when the review record is missing on a reviewed translation', () => {
    expect(
      build((s) => {
        s['loan-sharks'].th.reviewed = true;
      }),
    ).toThrow(/reviewedBy and reviewedOn/);
  });

  it('reports which page and field differ', () => {
    const en = getGuide('loan-sharks', 'en').content;
    const bad = structuredClone(getGuide('loan-sharks', 'bn').content);
    bad.callout!.body = 'no tokens here';
    expect(translationProblems(en, bad, 'loan-sharks/bn')[0]).toContain('callout.body');
  });
});

describe('the reviewed flag drives indexing, hreflang and the sitemap', () => {
  it('as shipped: only English is in the sitemap, with no hreflang', () => {
    for (const page of guidePages) {
      const entry = sitemapEntry(page.path)!;
      expect(entry.published).toBe(page.lang === 'en');
      expect(alternatesFor(page)).toEqual([]);
      expect(entry.links).toEqual([]);
    }
    expect(sitemapEntry('/')).toBeUndefined();
    expect(sitemapEntry('/loan-sharks')?.published).toBe(true);
  });

  it('an unreviewed page has no structured data; a reviewed one has FAQ data from its visible text', () => {
    expect(faqJsonLd(getGuide('loan-sharks', 'bn'))).toBeUndefined();
    const ld = faqJsonLd(getGuide('loan-sharks', 'en'))!;
    expect(ld['@type']).toBe('FAQPage');
    expect(ld.inLanguage).toBe('en-SG');
    expect(ld.mainEntity).toHaveLength(4);
    expect(ld.mainEntity[0]!.name).toBe('How can I tell if a lender is a loan shark?');
    // tokens are resolved to the numbers a reader sees
    const text = JSON.stringify(ld);
    expect(text).toContain('1799');
    expect(text).not.toContain('{tel:');
  });

  it('flipping Bengali to reviewed publishes it with reciprocal hreflang and x-default', () => {
    const pages = withReviewed(['bn'], ['loan-sharks']);
    const bn = find(pages, 'loan-sharks', 'bn');
    const en = find(pages, 'loan-sharks', 'en');
    const expected = [
      { hreflang: 'en', href: 'https://financeforwardsg.com/loan-sharks/' },
      { hreflang: 'bn', href: 'https://financeforwardsg.com/bn/loan-sharks/' },
      { hreflang: 'x-default', href: 'https://financeforwardsg.com/loan-sharks/' },
    ];
    expect(alternatesFor(bn, pages)).toEqual(expected);
    expect(alternatesFor(en, pages)).toEqual(expected);
    expect(sitemapEntry('/bn/loan-sharks/', pages)).toMatchObject({ published: true });
    expect(sitemapEntry('/bn/loan-sharks/', pages)!.links).toHaveLength(3);
    // The other topic is unaffected: Bengali sending-money-home stays out.
    const other = find(pages, 'sending-money-home', 'bn');
    expect(alternatesFor(other, pages)).toEqual([]);
    expect(sitemapEntry(other.path, pages)!.published).toBe(false);
    expect(alternatesFor(find(pages, 'sending-money-home', 'en'), pages)).toEqual([]);
    expect(faqJsonLd(bn)!.inLanguage).toBe('bn');
  });

  it('uses zh-Hans for Chinese and lists every reviewed language once', () => {
    const pages = withReviewed(['zh', 'th']);
    const codes = alternatesFor(find(pages, 'sending-money-home', 'zh'), pages).map(
      (a) => a.hreflang,
    );
    expect(codes).toEqual(['en', 'zh-Hans', 'th', 'x-default']);
  });
});
