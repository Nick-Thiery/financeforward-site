/*
 * Every public string on the site (public copy v0.2).
 *
 * Only publishable text belongs here. Edit wording in this file, not in the
 * components. Phrases that state how many languages Remlo has are built from
 * languages.ts, so they stay true when that list changes.
 */
import { languageCount } from './languages';
import { copySchema } from './schemas';

export const links = {
  remlo: 'https://remloapp.com',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.remlo.app',
  remloPrivacy: 'https://remloapp.com/privacy',
  remloTerms: 'https://remloapp.com/terms',
  email: 'financeforwardinitiative@gmail.com',
  mailto: 'mailto:financeforwardinitiative@gmail.com',
  mailtoCollaboration:
    'mailto:financeforwardinitiative@gmail.com?subject=Collaboration%20with%20FinanceForward',
  mailtoFeedback: 'mailto:financeforwardinitiative@gmail.com?subject=Remlo%20feedback',
  telScamShield: 'tel:1799',
  telEmergency: 'tel:999',
} as const;

const languagesPhrase = `${languageCount} languages`;

export const site = {
  meta: {
    title: 'FinanceForward — clearer information for everyday money decisions',
    description:
      'FinanceForward helps migrant workers in Singapore make more informed everyday financial decisions through practical education, community activities and Remlo, a free multilingual app.',
  },

  brand: {
    name: 'FinanceForward',
    logoAlt: 'FinanceForward',
  },

  header: {
    skipLink: 'Skip to main content',
    navLabel: 'Main',
    exploreRemlo: 'Explore Remlo',
    mobileRemlo: 'Remlo',
    menu: 'Menu',
    close: 'Close',
  },

  /** Nav labels, keyed by section id. Order here is the order in the header. */
  nav: {
    what: 'What we do',
    remlo: 'Remlo',
    approach: 'Approach',
    measure: 'How we measure',
    updates: 'Updates',
    team: 'Team',
    contact: 'Contact',
  },

  hero: {
    eyebrow: 'FinanceForward · Singapore',
    title: 'Clearer information for everyday money decisions.',
    lead: 'FinanceForward helps migrant workers in Singapore make more informed choices about sending money home, budgeting, saving and avoiding scams — through practical education, community activities and Remlo, our free multilingual app.',
    primary: 'Explore Remlo',
    secondary: 'Collaborate with us',
    buttonsNote: 'For organisations planning something small and worker-centred.',
    glanceLabel: 'Remlo at a glance',
    glance: [
      'Free to use',
      "Doesn't hold or transfer money",
      "Doesn't ask for bank passwords or banking OTPs",
    ],
    glanceLink: 'See what Remlo does',
    languagesLabel: 'Remlo is available in',
    languagesCaption: 'Language names as they appear in the app.',
    phoneAlt:
      'Remlo\'s welcome screen: a language selector, the message "Free money guidance for workers in Singapore", a Get started button and the note "No money transfers. No bank connection or banking passwords needed."',
  },

  why: {
    eyebrow: 'Why this matters',
    title: 'Everyday money decisions, across two countries.',
    body: "Anyone managing money weighs these choices. For people working in Singapore, they can also involve family in another country, two currencies, and information that isn't in their first language. Clear, neutral information should be easy to find and easy to use.",
    decisions: [
      {
        icon: 'transfer',
        title: 'Sending money home',
        body: "Fees and exchange rates differ between providers and change over time, so the better option isn't always obvious.",
      },
      {
        icon: 'calendar',
        title: "Making the month's pay work",
        body: 'Balancing rent, food, transport and money for family, and still setting something aside.',
      },
      {
        icon: 'shield-alert',
        title: 'Spotting scams',
        body: "Job offers, loan messages and calls that look official but aren't.",
      },
      {
        icon: 'search',
        title: 'Knowing where to check',
        body: 'Finding official sources and help in a language you read comfortably.',
      },
    ],
  },

  what: {
    eyebrow: 'What we do',
    title: 'Two connected offerings.',
    intro:
      'Sessions give people a supported way to try Remlo, and we want what they tell us to shape what we build next.',
    sessions: {
      label: 'In person',
      title: 'Practical sessions and community activities',
      topics: [
        { icon: 'transfer', label: 'Sending money home' },
        { icon: 'card', label: 'Budgeting' },
        { icon: 'dollar', label: 'Saving' },
        { icon: 'shield-alert', label: 'Recognising scams' },
      ],
      body: 'Hands-on sessions on sending money home, budgeting, saving and recognising scams. Sessions are designed so participants can try things on their own phones and ask questions. Taking part is voluntary.',
      link: 'How we work',
    },
    remlo: {
      label: 'On your phone',
      title: 'Remlo',
      panelName: 'Remlo',
      panelMeta: 'remloapp.com · Android',
      body: `A free web and Android app for comparing transfer estimates, planning a budget, tracking savings goals and learning to spot scams — in ${languagesPhrase}.`,
      exploreLink: 'Explore Remlo',
      featuresLink: 'See what it does',
    },
  },

  remlo: {
    eyebrow: 'Remlo',
    title: `Free money tools, in ${languagesPhrase}.`,
    lead: 'Use Remlo in your browser or install it on Android. You can start as a guest — an account is optional.',
    primary: 'Explore Remlo',
    googlePlay: 'Get it on Google Play',
    iphoneNote: 'On iPhone, use the web version.',
    languagesLabel: 'Languages in the app',
    featuresHeading: 'What you can do',
    swipe: 'Swipe',
    /** Rendered as "1 of 3"; the numbers come from the page. */
    positionOf: 'of',
    features: {
      estimates: {
        title: 'Compare transfer estimates',
        body: "See indicative fees and exchange rates for several providers, with the time the reference rate was fetched. They're estimates, not quotes: check with the provider before you send.",
        quote: 'Illustrative estimates, not provider quotes.',
        quoteDetail:
          'Fees, rates, speed and availability must be checked with the provider. Remlo does not transfer money.',
        quoteSource: "From Remlo's Exchange Rate screen",
      },
      budget: {
        title: 'Plan a budget and savings goals',
        body: "Plan the month's income and spending, including money for home, and track progress towards goals such as an emergency fund.",
        alt: "Remlo's Budget Planner: a monthly income field and example expense categories including rent or dormitory, groceries, transport and phone plan, each with a Log Spend button.",
      },
      scamQuiz: {
        title: 'Practise spotting scams',
        body: 'An eight-question scam quiz with an explanation for each answer, plus links to official help such as ScamShield.',
        alt: "Remlo's Scam Awareness Quiz, question 1 of 8: a message claiming to be from MOM asks for a SingPass login and password, with three possible responses to choose from.",
      },
    },
    boundaries: {
      title: "What Remlo doesn't do",
      items: [
        'Transfer or hold money',
        'Connect to your bank account',
        'Ask for your bank passwords or banking one-time passwords (OTPs)',
        'Give regulated financial advice',
      ],
      note: 'Transfer comparisons are illustrative estimates, not quotes or recommendations. Always check fees and rates with the provider.',
    },
  },

  approach: {
    eyebrow: 'Our approach',
    title: 'How we work.',
    principles: [
      {
        title: 'Taking part is voluntary',
        body: "Joining a session or using Remlo is always optional. Remlo works in a web browser, and you don't need an account.",
      },
      {
        title: 'One useful action, on your own phone',
        body: "We'd rather each person does one useful thing themselves than watches a long demo.",
      },
      {
        title: 'Accessible language',
        body: `Plain words, short sentences, and Remlo in ${languagesPhrase}.`,
      },
      {
        title: 'Privacy',
        body: "You can use Remlo as a guest, and it doesn't ask for bank passwords or banking OTPs. We don't publish personal information about the workers we meet.",
      },
      {
        title: 'Learn, then scale',
        body: 'We want worker feedback to shape Remlo before we try to reach more people.',
      },
    ],
  },

  measure: {
    eyebrow: 'How we measure',
    title: 'Useful actions, not just reach.',
    body: 'Visits, downloads and attendance tell us how many people we reached. We look more closely at whether someone completes a useful task in Remlo — like finishing the scam quiz or saving a budget — and whether they come back to use it again later.',
    caveat:
      "These signals show that Remlo is being used. On their own, they don't show that anyone's finances have improved.",
  },

  /** Only rendered once updates.ts has an approved entry. */
  updates: {
    eyebrow: 'Updates',
    title: 'Updates',
  },

  team: {
    eyebrow: 'Team',
    title: 'The people behind FinanceForward.',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Get in touch.',
    organisations: {
      title: 'Organisations',
      body: "If you work with migrant workers and would like to try something small together — one session, or a short pilot on people's own phones — tell us about your community and what you have in mind.",
    },
    feedback: {
      title: 'Feedback on Remlo',
      body: 'Something in Remlo confusing, missing or wrong? Tell us — it helps us decide what to fix.',
    },
    emailCard: {
      label: 'Email us',
      collaboration: 'Email about a collaboration',
      feedback: 'Send feedback on Remlo',
      note: "Please don't include bank details, passwords, OTPs or other sensitive personal information.",
    },
    help: {
      lead: 'Not for urgent help.',
      scamsBefore: 'For scams, call the ScamShield Helpline on',
      scamsNumber: '1799',
      emergencyBefore: 'In an emergency, call',
      emergencyNumber: '999',
    },
  },

  footer: {
    mission:
      'FinanceForward helps migrant workers in Singapore make more informed everyday financial decisions.',
    groups: {
      remlo: 'Remlo',
      financeForward: 'FinanceForward',
      contact: 'Contact',
    },
    remloLinks: {
      explore: 'Explore Remlo',
      googlePlay: 'Google Play',
      privacy: 'Remlo privacy policy',
      terms: 'Remlo terms',
    },
    disclaimer:
      "FinanceForward is not a bank, remittance company or licensed financial adviser, and doesn't hold or transfer money. Remlo offers general information and illustrative estimates, not financial advice. Showing a provider in a comparison is not an endorsement.",
    copyright: '© 2026 FinanceForward',
    backToTop: 'Back to top',
  },

  notFound: {
    title: "This page isn't here.",
    body: 'It may have moved. Go to the FinanceForward home page, or explore Remlo.',
    home: 'FinanceForward home',
    exploreRemlo: 'Explore Remlo',
  },
} as const;

copySchema.parse(site);
copySchema.parse(links);

export type Site = typeof site;
