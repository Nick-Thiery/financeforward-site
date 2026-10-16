/*
 * Loan sharks (unlicensed moneylenders): English. Sources and numbers are in
 * ../registry.ts and were checked on CHECKED_ON. English pages are indexed as
 * soon as they are built.
 */
import type { GuideContentInput } from '../types';

const page: GuideContentInput = {
  reviewed: true,
  title: 'Loan sharks in Singapore: how to spot them and where to get help',
  description:
    'Unlicensed moneylending is illegal in Singapore. Learn the warning signs of a loan shark, how to check that a lender is licensed, and who to call for help.',
  eyebrow: 'Guide · Singapore',
  heading:
    'Loan sharks (unlicensed moneylenders) in Singapore: how to spot them and where to get help',
  lead: 'Unlicensed moneylending is illegal in Singapore. Loan sharks, also called “Ah Longs”, often target people who need money urgently. This page explains the warning signs, how to check a lender, and who can help. It is general information, not legal advice.',
  callout: {
    title: 'In danger, or being threatened right now?',
    body: 'Call {tel:emergency} for the Police. To report a loan shark when it is not an emergency, call the Police hotline {tel:police} or [report online with i-Witness](iwitness).',
  },
  sections: [
    {
      id: 'spot',
      heading: 'How can I tell if a lender is a loan shark?',
      paragraphs: ['Be careful if any one of these is true.'],
      items: [
        'They are not on the official list of licensed moneylenders.',
        'They contact you first to offer a loan, by phone call, SMS, WhatsApp or social media. Licensed moneylenders are not allowed to do this.',
        'They approve a loan without meeting you at their business premises. Licensed moneylenders must check who you are in person, and fully online loans are not allowed.',
        'They ask you to pay money first, such as a “GST”, admin or processing fee. Licensed moneylenders do not ask for this before you get the loan.',
        'They ask for your SingPass, internet banking or other passwords, or want to keep your passport, work permit, ATM card or other ID. Licensed moneylenders must not do this.',
        'You found them through a flyer, an SMS or a messaging app. Licensed moneylenders may advertise only in business directories, on their own website, and at or outside their business premises.',
      ],
      note: 'If a lender does any of these, either they have no licence or they are breaking the rules. Do not borrow from them.',
    },
    {
      id: 'check',
      heading: 'How do I check that a moneylender is licensed?',
      paragraphs: [
        'The Registry of Moneylenders at the Ministry of Law publishes the official list of licensed moneylenders. Check the lender’s name, physical address and website address against that list, and use only that list.',
        'Loan sharks and scammers may copy the name of a licensed moneylender or build a look-alike website, so matching the name alone is not enough.',
      ],
      links: [{ ref: 'list', label: 'Open the official list of licensed moneylenders' }],
      note: 'Not sure whether a message is a scam? Call the ScamShield Helpline on {tel:scamshield}. It is open 24 hours.',
    },
    {
      id: 'risks',
      heading: 'What can happen if I borrow from, or help, a loan shark?',
      items: [
        'Very high interest and no check on whether you can repay, which can trap you in debt.',
        'Harassment and threats of violence to make you pay. The harassment can continue even after the debt is settled.',
        'Your work pass can be at risk. The Ministry of Law and the Police warn that work pass holders involved with unlicensed moneylenders can have their work pass revoked or be barred from working in Singapore.',
        'Helping a loan shark is also a crime. If your bank account, SIM card, ATM card or internet banking token is used for unlicensed moneylending, the law presumes that you helped. For a first offence, carrying on or helping unlicensed moneylending can mean up to 4 years in prison, a fine of S$30,000 to S$300,000, and caning.',
      ],
    },
    {
      id: 'do',
      heading: 'What should I do if a loan shark contacts me, or I already owe one?',
      items: [
        'Do not reply to loan offers that you did not ask for. Block the number and report it as spam.',
        'Do not pay any fee first. Do not give anyone your passport, work permit, SingPass or bank details.',
        'Keep every message, phone number and receipt. They are evidence.',
        'Report it to the Police (see “Who can I call?” below). The Police say all information given is kept confidential.',
        'If a lender threatens you, harasses you or damages property, make a police report. If you are in danger, call {tel:emergency}.',
        'If you are struggling with debt, get help early. Credit Counselling Singapore ({tel:ccs}) is listed by the Police and the Registry of Moneylenders as a place to get debt help. Ask whether they can help you.',
      ],
    },
  ],
  contacts: {
    heading: 'Who can I call?',
    items: [
      { ref: 'emergency', label: 'Police emergency', detail: 'Call if you are in danger.' },
      {
        ref: 'police',
        label: 'Police hotline',
        detail: 'Report a loan shark, or someone who helps one.',
      },
      {
        ref: 'iwitness',
        label: 'Report to the Police online',
        detail: 'Report unlicensed moneylending on the Police website.',
        linkLabel: 'Open i-Witness',
      },
      {
        ref: 'scamshield',
        label: 'ScamShield Helpline (24 hours)',
        detail: 'Call if you are not sure whether an offer or message is a scam.',
      },
      {
        ref: 'registry',
        label: 'Registry of Moneylenders',
        detail: 'Make a complaint about a licensed moneylender that breaks the rules.',
      },
      { ref: 'ccs', label: 'Credit Counselling Singapore', detail: 'Advice if you are in debt.' },
    ],
    note: 'Calls to 1800 numbers from a mobile phone may be charged airtime.',
  },
  remlo: {
    heading: 'Check the warning signs in Remlo',
    body: 'Remlo is a free money app for workers in Singapore, in {languages} languages. Its Loan Shark Guide has a checklist of warning signs and help contacts. Remlo cannot tell you whether a lender is licensed: use the official list for that. It does not give legal advice.',
  },
};

export default page;
