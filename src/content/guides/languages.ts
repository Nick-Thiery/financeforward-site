/*
 * The seven languages of the guide pages: English and the six languages MOM's
 * Settling-In Programme is delivered in. All six are also Remlo languages
 * (see ../languages.ts). English lives at the site root; the others under
 * /<prefix>/.
 */

export const guideLangCodes = ['en', 'bn', 'my', 'zh', 'ta', 'th', 'vi'] as const;
export type GuideLang = (typeof guideLangCodes)[number];

export interface GuideLangMeta {
  code: GuideLang;
  /** URL prefix: '' for English, otherwise the first path segment. */
  prefix: string;
  /** Value of <html lang>. */
  htmlLang: string;
  /** Value of hreflang in <link rel="alternate"> and the sitemap. */
  hreflang: string;
  /** The language's name in its own script. */
  label: string;
  dir: 'ltr' | 'rtl';
  /** Facebook-style locale for og:locale. */
  ogLocale: string;
}

export const guideLangs: Record<GuideLang, GuideLangMeta> = {
  en: {
    code: 'en',
    prefix: '',
    htmlLang: 'en-SG',
    hreflang: 'en',
    label: 'English',
    dir: 'ltr',
    ogLocale: 'en_SG',
  },
  bn: {
    code: 'bn',
    prefix: 'bn',
    htmlLang: 'bn',
    hreflang: 'bn',
    label: 'বাংলা',
    dir: 'ltr',
    ogLocale: 'bn_BD',
  },
  my: {
    code: 'my',
    prefix: 'my',
    htmlLang: 'my',
    hreflang: 'my',
    label: 'မြန်မာ',
    dir: 'ltr',
    ogLocale: 'my_MM',
  },
  zh: {
    code: 'zh',
    prefix: 'zh',
    htmlLang: 'zh-Hans',
    hreflang: 'zh-Hans',
    label: '简体中文',
    dir: 'ltr',
    ogLocale: 'zh_CN',
  },
  ta: {
    code: 'ta',
    prefix: 'ta',
    htmlLang: 'ta',
    hreflang: 'ta',
    label: 'தமிழ்',
    dir: 'ltr',
    ogLocale: 'ta_IN',
  },
  th: {
    code: 'th',
    prefix: 'th',
    htmlLang: 'th',
    hreflang: 'th',
    label: 'ภาษาไทย',
    dir: 'ltr',
    ogLocale: 'th_TH',
  },
  vi: {
    code: 'vi',
    prefix: 'vi',
    htmlLang: 'vi',
    hreflang: 'vi',
    label: 'Tiếng Việt',
    dir: 'ltr',
    ogLocale: 'vi_VN',
  },
};

export const guideTopics = ['loan-sharks', 'sending-money-home'] as const;
export type GuideTopic = (typeof guideTopics)[number];
