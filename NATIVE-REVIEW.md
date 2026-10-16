# Native-speaker review of the guide pages

Six translations of two guide pages were written by an AI model and have **not** been checked by a native speaker. Until someone has, each one is a draft: it is built, but it says `noindex`, has no canonical link, is not in the sitemap, is not an `hreflang` alternate and is not linked from any other page. A reader can reach it only by typing its address, and it carries an English notice saying so.

Wrong words on these pages could send someone to the wrong place or scare them away from help, so please do not skip the "riskiest sentences" below.

## The pages

| Language   | Loan sharks        | Sending money home        |
| ---------- | ------------------ | ------------------------- |
| Bengali    | `/bn/loan-sharks/` | `/bn/sending-money-home/` |
| Burmese    | `/my/loan-sharks/` | `/my/sending-money-home/` |
| Chinese    | `/zh/loan-sharks/` | `/zh/sending-money-home/` |
| Tamil      | `/ta/loan-sharks/` | `/ta/sending-money-home/` |
| Thai       | `/th/loan-sharks/` | `/th/sending-money-home/` |
| Vietnamese | `/vi/loan-sharks/` | `/vi/sending-money-home/` |

The English pages (`/loan-sharks/`, `/sending-money-home/`) are the reference. They are the source of truth for meaning. The text lives in `src/content/guides/<topic>/<language>.ts`, and the page furniture (skip link, "Last checked", footer, buttons) in `src/content/guides/ui.ts`.

## What to check, in this order

1. **Numbers and links first.** They cannot be changed in the text (phone numbers and official links are filled in by the build from one list), but check that each sentence still says the right thing next to them: 999 is the Police emergency number; 1800-255-0000 the Police hotline; 1799 the ScamShield Helpline (open 24 hours); 1800-2255-529 the Registry of Moneylenders; 6225 5227 Credit Counselling Singapore.
2. **Meaning.** Read each sentence against the English. Mark anything that says more, less or something different.
3. **The riskiest sentences** (list below), twice.
4. **Terms.** Does the page use the words workers in Singapore actually use? Note where a different word is better (see "Terms we chose").
5. **Tone.** It should be calm and plain, never frightening, never blaming the borrower.
6. **Reading level.** A tired reader on a phone, in a second language at times. Shorter is better.
7. **Look on a real phone.** Open the page on an Android phone (and an iPhone if you can). Is every letter shaped properly, with no boxes, no broken joins, no text cut off at the edge?
8. **Headings.** Each section heading is a question, because the sections are also the page's FAQ for search engines. Does each read as a natural question someone would type?
9. **Title and description.** They appear in search results. Are they natural, not a word-for-word copy of the English?

## The riskiest sentences

These are the ones where a mistake does real harm. In each topic file they are under the section named.

**Loan sharks**

- **Callout (top of page):** who to call in an emergency, and who to call to report. Make sure "emergency" and "not an emergency" are clearly different.
- **`spot`, items 2 to 6:** what licensed moneylenders may and may not do (contact you first, approve a loan without meeting you, charge a fee first, ask for passwords or keep your passport, advertise by SMS or messaging app). These must not read as the reverse.
- **`check`:** "matching the name alone is not enough". It must not suggest that a matching name proves a lender is safe. Remlo "cannot tell you whether a lender is licensed" must stay a refusal, not a promise.
- **`risks`, item 3 (work pass):** the sentence says a work pass **can** be revoked, not that it **will** be. Check the strength of the verb.
- **`risks`, item 4 (helping a loan shark):** "the law presumes that you helped", and the penalty ("up to 4 years in prison, a fine of S$30,000 to S$300,000, and caning", first offence). Check that it says "up to", that the money amounts are exactly 30,000 and 300,000, and that caning is not dropped or softened. The figures are written with 0-9 digits in every language on purpose.
- **`do`, item 4:** "all information given is kept confidential" is what the Police say. It must not become a stronger promise such as "you will never be in trouble".
- **`do`, item 6 and the contact list:** Credit Counselling Singapore is "listed" as a place to get debt help, and the reader is asked to "ask whether they can help". It must not read as a guarantee.
- **Contact note:** "may be charged airtime" (1800 numbers from a mobile phone).

**Sending money home**

- **`licensed`:** MAS licenses; MOM "strongly advises" licensed providers; unlicensed providers "are not regulated"; hawala and hundi brokers "may run away with your money". The last one must not accuse any named group of people.
- **`receive`:** the total cost is the fee **plus** the exchange rate margin, so "low fee" can still mean less money. This is the central idea of the page; check it reads clearly.
- **`show`:** what a licensed provider **must** show and give you (rate and fee before you use the service; a receipt for every transaction, showing the amount received in the receiver's currency, the rate, commission and charges).
- **`scams`:** "Government officials will never ask you to transfer money or share bank log-in details over a phone call."
- **Remlo box:** the estimates are "illustrative, not quotes", "showing a provider is not a recommendation", "Remlo does not hold or transfer money". None of these may become stronger or weaker.
- **The whole page:** it must not recommend, rank or name any provider.

## Terms we chose (please correct)

| Language   | Loan shark / unlicensed lender                                  | Notes                                                                                               |
| ---------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Bengali    | লোন শার্ক, লাইসেন্সবিহীন ঋণদাতা                                 | Is there a more common word than ঋণদাতা among workers?                                              |
| Burmese    | Loan Shark (kept in English letters), လိုင်စင်မရှိသော ငွေချေးသူ | Is Loan Shark in English letters understood, or is there a Burmese word?                            |
| Chinese    | 高利贷者, 无牌放债人 (the Registry is 放债人注册处)             | 放债人 is the Singapore term; check it is clear to workers from China. 大耳窿 is given for Ah Long. |
| Tamil      | லோன் ஷார்க், உரிமம் இல்லாத கடன் கொடுப்பவர்                      | Check the transliteration of "Loan Shark" and "Ah Long".                                            |
| Thai       | โลนชาร์ก, เจ้าหนี้นอกระบบ, ผู้ให้กู้เงินที่มีใบอนุญาต           | เจ้าหนี้นอกระบบ is the usual word for informal lenders in Thailand; check it fits.                  |
| Vietnamese | cho vay nặng lãi (tín dụng đen), bên cho vay không giấy phép    | Check whether "tín dụng đen" is the term workers use.                                               |

Official names stay in English next to a translation where one is used (Ministry of Law, MAS, MOM, Registry of Moneylenders, ScamShield, i-Witness, Credit Counselling Singapore), because that is what workers will see on official pages, signs and in messages.

## Script and font notes

- **Digits:** all pages use 0-9 digits, including in Bengali, Burmese, Tamil and Thai, because that is what a phone keypad, a receipt and an official page show. If your readers expect another digit set for the dates or figures, say so. Do not change the digits inside the file yourself.
- **Burmese encoding:** the Burmese text is written in **Unicode (Myanmar3 / Pyidaungsu standard)**. Some phones in Myanmar still use the older **Zawgyi** encoding, in which Unicode text can look broken. Please open the Burmese pages on both kinds of phone if you can, and tell us whether the page is readable on a Zawgyi phone. If it is not, a Zawgyi-friendly alternative is a separate decision for Nick.
- **Fonts:** the pages download no font for these languages; they use the phone's own. Look for boxes, missing marks, or lines that look crowded or cut.
- **Right to left:** none of these six languages is right to left.

## How a reviewer reports a problem

Edit nothing. Send a list: page address, the sentence (copied), what is wrong, what it should say (in your language and, if you can, in English). Mark each as "wrong meaning", "unnatural", or "wrong term".

## How Nick publishes a page after review

For each reviewed page, in `src/content/guides/<topic>/<language>.ts`, change:

```ts
reviewed: false,
```

to

```ts
reviewed: true,
reviewedBy: 'Reviewer name or initials',
reviewedOn: '2026-11-01', // the date of the review
```

The build refuses `reviewed: true` on a translation without `reviewedBy` and `reviewedOn`. Then run `npm test` and `npm run build`. A page that is now reviewed:

- loses `noindex` and the draft notice, and gets a canonical link and FAQ structured data;
- is added to the sitemap with `hreflang` alternates, in both directions, with English as `x-default`;
- appears in the "Read this page in" list on the other published versions of the same topic.

Each topic and language is switched on separately, so Bengali loan sharks can go live before Bengali sending money home. The output guard fails the build if a draft page is in the sitemap or an `hreflang` set is not reciprocal.

Please also re-check the page furniture in `src/content/guides/ui.ts` for the same language (the sources note, the buttons, the footer text). It is shared by both topics.

## Not covered by this review

Phone numbers, official links and the "last checked" date are re-checked against the official pages by whoever updates the English page (`src/content/guides/registry.ts`, `CHECKED_ON`). They are not the reviewer's job, and they are the same in every language.
