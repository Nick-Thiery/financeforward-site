/*
 * Everything search engines are told about the guide pages, in one place so
 * that it can be tested without building the site:
 *
 *  - which pages are published: `reviewed: true` pages only. An unreviewed
 *    page is still built (so a reviewer can open it by its address) but is
 *    noindex, has no canonical or hreflang, and is not in the sitemap.
 *  - hreflang: reviewed pages of one topic point at each other (every page
 *    lists all reviewed versions, itself included), with x-default on English.
 *  - structured data: a FAQPage built from the visible sections.
 */
import { CHECKED_ON, SITE_ORIGIN } from './registry';
import { guideLangs } from './languages';
import { guidePages, getGuide, type GuidePageData } from './index';
import { richPlain } from './rich';

export const isPublished = (page: GuidePageData) => page.content.reviewed;

export const absoluteUrl = (path: string) => new URL(path, SITE_ORIGIN).href;

/** The published pages of the page's topic, English first. */
export function publishedVersions(
  page: GuidePageData,
  pages: GuidePageData[] = guidePages,
): GuidePageData[] {
  return pages.filter((other) => other.topic === page.topic && isPublished(other));
}

export interface Alternate {
  hreflang: string;
  href: string;
}

/**
 * hreflang annotations for a page. Empty for an unreviewed page, and when the
 * topic has only one published version (nothing to point at).
 */
export function alternatesFor(
  page: GuidePageData,
  pages: GuidePageData[] = guidePages,
): Alternate[] {
  if (!isPublished(page)) return [];
  const versions = publishedVersions(page, pages);
  if (versions.length < 2) return [];
  const alternates = versions.map((version) => ({
    hreflang: guideLangs[version.lang].hreflang,
    href: absoluteUrl(version.path),
  }));
  const english = versions.find((version) => version.lang === 'en');
  if (english) alternates.push({ hreflang: 'x-default', href: absoluteUrl(english.path) });
  return alternates;
}

/** What the sitemap needs to know about a pathname, or undefined if it is not a guide page. */
export function sitemapEntry(pathname: string, pages: GuidePageData[] = guidePages) {
  const normal = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const page = pages.find((candidate) => candidate.path === normal);
  if (!page) return undefined;
  return {
    published: isPublished(page),
    lastmod: CHECKED_ON,
    links: alternatesFor(page, pages).map((alternate) => ({
      url: alternate.href,
      lang: alternate.hreflang,
    })),
  };
}

/** The visible text of a section, as one answer. */
function answerText(section: GuidePageData['content']['sections'][number]): string {
  return [
    ...(section.paragraphs ?? []),
    ...(section.items ?? []),
    ...(section.note ? [section.note] : []),
  ]
    .map(richPlain)
    .join(' ');
}

/** FAQPage JSON-LD: each section heading is a question and its text is the answer. Undefined if unpublished. */
export function faqJsonLd(page: GuidePageData) {
  if (!isPublished(page)) return undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: page.content.heading,
    url: absoluteUrl(page.path),
    inLanguage: guideLangs[page.lang].htmlLang,
    mainEntity: page.content.sections.map((section) => ({
      '@type': 'Question',
      name: section.heading,
      acceptedAnswer: { '@type': 'Answer', text: answerText(section) },
    })),
  };
}

export { getGuide };
