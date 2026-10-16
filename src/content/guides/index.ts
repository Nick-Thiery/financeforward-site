/*
 * The guide pages: every topic in every language, parsed and checked.
 *
 * Content files live in ./<topic>/<lang>.ts. Importing this module fails (so
 * the build fails) if a page does not match its schema, uses an unknown
 * phone/link id, or drifts from the English page. Which pages are published
 * is decided by `reviewed` on each page (see ./seo.ts and NATIVE-REVIEW.md).
 */
import { guideContentSchema } from '../schemas';
import { pageProblems, translationProblems } from './checks';
import { phones, outlinks, type SourceId } from './registry';
import {
  guideLangCodes,
  guideLangs,
  guideTopics,
  type GuideLang,
  type GuideTopic,
} from './languages';
import type { GuideContent, GuideContentInput } from './types';

import sharksEn from './loan-sharks/en';
import sharksBn from './loan-sharks/bn';
import sharksMy from './loan-sharks/my';
import sharksZh from './loan-sharks/zh';
import sharksTa from './loan-sharks/ta';
import sharksTh from './loan-sharks/th';
import sharksVi from './loan-sharks/vi';
import sendingEn from './sending-money-home/en';
import sendingBn from './sending-money-home/bn';
import sendingMy from './sending-money-home/my';
import sendingZh from './sending-money-home/zh';
import sendingTa from './sending-money-home/ta';
import sendingTh from './sending-money-home/th';
import sendingVi from './sending-money-home/vi';

/** The raw content files, for tests that check what happens when a page is altered. */
export const guideSources: Record<GuideTopic, Record<GuideLang, GuideContentInput>> = {
  'loan-sharks': {
    en: sharksEn,
    bn: sharksBn,
    my: sharksMy,
    zh: sharksZh,
    ta: sharksTa,
    th: sharksTh,
    vi: sharksVi,
  },
  'sending-money-home': {
    en: sendingEn,
    bn: sendingBn,
    my: sendingMy,
    zh: sendingZh,
    ta: sendingTa,
    th: sendingTh,
    vi: sendingVi,
  },
};

/** The official pages each topic relies on (shown, with the check date, on the page). */
export const topicSources: Record<GuideTopic, SourceId[]> = {
  'loan-sharks': [
    'spf-uml',
    'spf-2024',
    'rom-list',
    'rom-home',
    'rom-faq',
    'rom-complaint',
    'minlaw-2019',
  ],
  'sending-money-home': [
    'mas-fid',
    'mas-faq',
    'mas-psn07',
    'mom-2026',
    'mom-guide',
    'wb-method',
    'wb-issue49',
  ],
};

export interface GuidePageData {
  topic: GuideTopic;
  lang: GuideLang;
  content: GuideContent;
  /** The path with a trailing slash: /loan-sharks/ or /bn/loan-sharks/. */
  path: string;
}

/** The path of a guide page: English at the root, others under /<lang>/. */
export function guidePath(topic: GuideTopic, lang: GuideLang): string {
  const prefix = guideLangs[lang].prefix;
  return prefix ? `/${prefix}/${topic}/` : `/${topic}/`;
}

/** Parse, check and assemble the pages. Exported so tests can run it on altered input. */
export function buildGuidePages(
  source: Record<GuideTopic, Record<GuideLang, GuideContentInput>>,
): GuidePageData[] {
  const pages: GuidePageData[] = [];
  const problems: string[] = [];
  for (const topic of guideTopics) {
    const english = guideContentSchema.parse(source[topic].en);
    for (const lang of guideLangCodes) {
      const name = `${topic}/${lang}`;
      const content = lang === 'en' ? english : guideContentSchema.parse(source[topic][lang]);
      problems.push(...pageProblems(content, name, lang));
      if (lang !== 'en') problems.push(...translationProblems(english, content, name));
      for (const section of content.sections) {
        for (const link of section.links ?? []) {
          if (!(link.ref in outlinks)) problems.push(`${name}: unknown link "${link.ref}"`);
        }
      }
      for (const item of content.contacts?.items ?? []) {
        if (item.ref in phones) continue;
        if (item.ref in outlinks && item.linkLabel) continue;
        problems.push(
          `${name}: contact "${item.ref}" is not a phone, or is a link without linkLabel`,
        );
      }
      pages.push({ topic, lang, content, path: guidePath(topic, lang) });
    }
  }
  if (problems.length > 0) {
    throw new Error(`Guide content problems:\n  - ${problems.join('\n  - ')}`);
  }
  return pages;
}

export const guidePages = buildGuidePages(guideSources);

export function getGuide(topic: GuideTopic, lang: GuideLang): GuidePageData {
  const page = guidePages.find((p) => p.topic === topic && p.lang === lang);
  if (!page) throw new Error(`No guide page for ${topic}/${lang}`);
  return page;
}

export { guideLangs, guideLangCodes, guideTopics };
export type { GuideLang, GuideTopic, GuideContent };
