/*
 * Facts that must never be retyped in a translation: phone numbers, official
 * links and the sources behind the guide pages.
 *
 * Page copy refers to these by id ({tel:police}, [text](list)), so a
 * translator cannot change a number or a URL. Every entry was read from the
 * official page named in `sources` on CHECKED_ON. Phone numbers and rules
 * change: when you re-check a page, update the entry and CHECKED_ON together.
 */
import { outlinksSchema, phonesSchema, sourcesSchema } from '../schemas';

/** The day every number, link and rule on the guide pages was last checked. */
export const CHECKED_ON = '2026-10-17';

/** The production origin; the same as `site` in astro.config.mjs. */
export const SITE_ORIGIN = 'https://financeforwardsg.com';

/** Singapore numbers, as dialled in Singapore. `display` is what the page shows. */
export const phones = {
  emergency: { display: '999' },
  police: { display: '1800-255-0000' },
  scamshield: { display: '1799' },
  registry: { display: '1800-2255-529' },
  ccs: { display: '6225 5227' },
} as const;
phonesSchema.parse(phones);

export type PhoneId = keyof typeof phones;

/** The `tel:` link for a number: digits only. */
export const telHref = (display: string) => `tel:${display.replace(/\D/g, '')}`;

export const outlinks = {
  iwitness: { url: 'https://www.police.gov.sg/I-Witness' },
  list: {
    url: 'https://rom.mlaw.gov.sg/information-for-borrowers/list-of-licensed-moneylenders-in-singapore/',
  },
  fid: { url: 'https://eservices.mas.gov.sg/fid/' },
} as const;
outlinksSchema.parse(outlinks);

export type OutlinkId = keyof typeof outlinks;

/** Official pages. Titles and dates are shown in English, as the pages state them. */
export const sources = {
  'spf-uml': {
    publisher: 'Singapore Police Force',
    title: 'Unlicensed Moneylending (advisory)',
    url: 'https://www.police.gov.sg/Advisories/Unlicensed-Moneylending',
    dated: 'Page last updated 11 September 2025',
  },
  'spf-2024': {
    publisher: 'Singapore Police Force',
    title: 'Ten persons arrested for loansharking activities',
    url: 'https://www.police.gov.sg/media-hub/news/2024/20241112_ten_persons_arrested_for_loansharking_activites',
    dated: 'News release, 12 November 2024',
  },
  'rom-list': {
    publisher: 'Ministry of Law, Registry of Moneylenders',
    title: 'List of Licensed Moneylenders in Singapore',
    url: 'https://rom.mlaw.gov.sg/information-for-borrowers/list-of-licensed-moneylenders-in-singapore/',
    dated: 'Page last updated 30 September 2026',
  },
  'rom-home': {
    publisher: 'Ministry of Law, Registry of Moneylenders',
    title: 'Registry of Moneylenders (home page)',
    url: 'https://rom.mlaw.gov.sg/',
    dated: 'Page last updated 30 September 2026',
  },
  'rom-faq': {
    publisher: 'Ministry of Law, Registry of Moneylenders',
    title: 'FAQs on Borrowing From Licensed Moneylenders',
    url: 'https://rom.mlaw.gov.sg/information-for-borrowers/guide-to-borrowing-from-licensed-moneylenders-english/',
    dated: 'No date shown on the page',
  },
  'rom-complaint': {
    publisher: 'Ministry of Law (ask.gov.sg)',
    title: 'How do I make a complaint about a moneylender?',
    url: 'https://ask.gov.sg/mlaw/questions/cmf0tebqt01nred2hx70822br',
    dated: 'No date shown on the page',
  },
  'minlaw-2019': {
    publisher: 'Ministry of Law',
    title: 'New Measures to Stem the Increase in Moneylending Activities Targeting Foreigners',
    url: 'https://www.mlaw.gov.sg/news/press-releases/press-release-new-measures-to-stem-the-increase-in-moneylending-activities-targeting-foreigners/',
    dated: 'Press release, 15 July 2019',
  },
  'mas-fid': {
    publisher: 'Monetary Authority of Singapore',
    title: 'Financial Institutions Directory',
    url: 'https://eservices.mas.gov.sg/fid/',
    dated: 'Online directory',
  },
  'mas-faq': {
    publisher: 'Monetary Authority of Singapore',
    title: 'Payment Services Licensing FAQs',
    url: 'https://www.mas.gov.sg/contact-us/faqs/payments-faqs/payments-service-licensing-faqs',
    dated: 'No date shown on the page',
  },
  'mas-psn07': {
    publisher: 'Monetary Authority of Singapore',
    title: 'Notice PSN07: Notice on Conduct (Payment Services Act 2019)',
    url: 'https://www.mas.gov.sg/-/media/MAS/Regulations-and-Financial-Stability/Regulations-Guidance-and-Licensing/Money-Changing-and-Remittance-Businesses/Notices/Payment-Services-Act-Notices/PSN07-Notice-on-Conduct.pdf',
    dated: 'Notice issued 5 December 2019',
  },
  'mom-2026': {
    publisher: 'Ministry of Manpower',
    title:
      'Two Men To Be Charged For Providing Payment Services Without Licence Under The Payment Services Act 2019 …',
    url: 'https://www.mom.gov.sg/newsroom/press-releases/2026/0423-2-men-charged-for-unlicensed-remittance-activities-and-efma-offences',
    dated: 'Press release, 23 April 2026',
  },
  'mom-guide': {
    publisher: 'Ministry of Manpower',
    title: 'A Guide for Migrant Workers (PDF)',
    url: 'https://www.mom.gov.sg/-/media/mom/documents/publications/mw-guides/mw-handy-guide-english.pdf',
    dated: 'No date shown in the document',
  },
  'wb-method': {
    publisher: 'World Bank',
    title: 'Remittance Prices Worldwide: Methodology',
    url: 'https://remittanceprices.worldbank.org/methodology',
    dated: 'No date shown on the page',
  },
  'wb-issue49': {
    publisher: 'World Bank',
    title: 'Remittance Prices Worldwide, Issue 49 (PDF)',
    url: 'https://remittanceprices.worldbank.org/sites/default/files/rpw_main_report_and_annex_q124_final.pdf',
    dated: 'March 2024',
  },
} as const;
sourcesSchema.parse(sources);

export type SourceId = keyof typeof sources;
