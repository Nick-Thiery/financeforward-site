/*
 * Sending money home: English. Sources and numbers are in ../registry.ts and
 * were checked on CHECKED_ON. No provider is named or recommended.
 */
import type { GuideContentInput } from '../types';

const page: GuideContentInput = {
  reviewed: true,
  title: 'Sending money home from Singapore: what to check before you send',
  description:
    'Before you send money home from Singapore, check that the provider is licensed, how much your family will really receive, and what the fees and exchange rate are.',
  eyebrow: 'Guide · Singapore',
  heading: 'Sending money home from Singapore: what to check before you send',
  lead: 'A transfer that looks cheap can leave your family with less money than another one. Before you send, check that the provider is licensed, see how much your family will actually receive, and keep your receipt. This is general information, not financial advice. It does not recommend any provider.',
  sections: [
    {
      id: 'licensed',
      heading: 'Is the provider licensed in Singapore?',
      paragraphs: [
        'The Monetary Authority of Singapore (MAS) licenses companies that send money abroad, and lists them in its Financial Institutions Directory. The Ministry of Manpower (MOM) strongly advises people to use providers licensed by MAS, because unlicensed providers are not regulated.',
      ],
      items: [
        'Search for the company’s name in the directory before you use it.',
        'Use the authorised remittance kiosks in dormitories or recreation centres, or licensed online services and apps.',
        'Avoid sending money through WhatsApp or other messaging apps.',
        'Avoid unlicensed agents such as hawala or hundi brokers. They may run away with your money.',
      ],
      links: [{ ref: 'fid', label: 'Open the MAS Financial Institutions Directory' }],
    },
    {
      id: 'receive',
      heading: 'How much will my family actually receive?',
      paragraphs: [
        'The fee is only part of the cost. The exchange rate is the other part, and it is not shown as a fee. The World Bank counts the total cost of a transfer as the transfer fee plus the exchange-rate margin. So a transfer with a low fee, or no fee, can still give your family less if the exchange rate is worse.',
      ],
      items: [
        'Ask each provider the same question: if I send this amount in Singapore dollars, how much will my family receive in their own currency, after all fees?',
        'Compare at the same time. Fees and exchange rates differ between providers and change over time.',
        'Ask how long the transfer takes and how your family will get the money.',
      ],
    },
    {
      id: 'show',
      heading: 'What must a licensed provider show me?',
      paragraphs: ['MAS rules require a licensed provider to do two things.'],
      items: [
        'Show the exchange rate it offers, and any separate fee, before you use the service.',
        'Give an individual customer a receipt for every transaction. For a transfer abroad, the receipt shows the amount the receiver gets in their own currency, the exchange rate used, and any commission and charges.',
      ],
      note: 'Keep your receipt until your family has received the money.',
    },
    {
      id: 'scams',
      heading: 'How do I avoid scams when sending money?',
      items: [
        'Government officials will never ask you to transfer money or share bank log-in details over a phone call.',
        'Do not share your bank details, passwords or one-time passwords (OTPs) with anyone.',
        'Check your receiver’s name and account details carefully before you confirm.',
        'If you are not sure whether a call or message is a scam, call the ScamShield Helpline on {tel:scamshield}. It is open 24 hours.',
      ],
    },
  ],
  remlo: {
    heading: 'Compare estimates in Remlo',
    body: 'Remlo is a free money app for workers in Singapore, in {languages} languages. Its Exchange Rate screen shows indicative fees and exchange rates for several providers side by side. They are illustrative estimates, not quotes, and showing a provider is not a recommendation. Always check the final fee and rate with the provider before you send. Remlo does not hold or transfer money.',
  },
};

export default page;
