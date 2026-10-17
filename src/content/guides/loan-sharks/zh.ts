/*
 * Loan sharks: Simplified Chinese. Machine-written; not yet checked by a native
 * speaker. Set `reviewed: true` (with reviewedBy and reviewedOn) only after the
 * checklist in NATIVE-REVIEW.md is done.
 */
import type { GuideContentInput } from '../types';

const page: GuideContentInput = {
  reviewed: false,
  title: '新加坡的高利贷（非法放债人）：如何识别，以及去哪里求助',
  description:
    '在新加坡，无牌放债是违法的。了解如何识别高利贷的警示信号、如何查询放债人是否持牌，以及向谁求助。',
  eyebrow: '指南 · 新加坡',
  heading: '新加坡的高利贷（无牌放债人）：如何识别，以及去哪里求助',
  lead: '在新加坡，无牌放债是违法的。高利贷者，俗称“Ah Long”（大耳窿），常常盯上急需用钱的人。本页介绍警示信号、如何查证放债人，以及谁能帮助你。这只是一般信息，不是法律意见。',
  callout: {
    title: '现在有危险，或正在被威胁？',
    body: '请拨打 {tel:emergency} 报警。如果不是紧急情况，想举报高利贷，可拨打警方热线 {tel:police}，或[通过 i-Witness 在线举报](iwitness)。',
  },
  sections: [
    {
      id: 'spot',
      heading: '怎样判断放债人是不是高利贷？',
      paragraphs: ['只要符合下面任何一条，就要小心。'],
      items: [
        '他们不在持牌放债人的官方名单上。',
        '他们主动联系你推销贷款，方式有打电话、短信、WhatsApp 或社交媒体。持牌放债人不被允许这样做。',
        '他们没有在营业场所见你一面就批准贷款。持牌放债人必须当面核实你的身份，并且不允许完全在线放贷。',
        '他们要你先付钱，例如“GST”（消费税）、手续费或处理费。持牌放债人在你拿到贷款之前不会要这些钱。',
        '他们要你的 SingPass、网上银行或其他密码，或者想扣留你的护照、工作准证、提款卡（ATM 卡）或其他证件。持牌放债人不可以这样做。',
        '你是通过传单、短信或聊天软件找到他们的。持牌放债人只能在商业名录、自己的网站，以及自己营业场所内或门外做广告。',
      ],
      note: '放债人只要做了其中任何一件事，不是没有牌照，就是在违反规定。不要向他们借钱。',
    },
    {
      id: 'check',
      heading: '怎样查证放债人是不是持牌的？',
      paragraphs: [
        '律政部的放债人注册处（Registry of Moneylenders）公布持牌放债人的官方名单。请用该名单核对放债人的名称、实际地址和网址，并且只以这份名单为准。',
        '高利贷者和骗子可能冒用持牌放债人的名称，或做出一模一样的假网站，所以光是名称对得上还不够。',
      ],
      links: [{ ref: 'list', label: '打开持牌放债人官方名单' }],
      note: '不确定一条信息是不是诈骗？请拨打 ScamShield 热线 {tel:scamshield}，24 小时服务。',
    },
    {
      id: 'risks',
      heading: '向高利贷借钱，或帮高利贷做事，会有什么后果？',
      items: [
        '利息非常高，而且不会核实你有没有还款能力，你可能因此陷入债务泥潭。',
        '为了逼你还钱而骚扰，甚至以暴力相威胁。即使债务已经还清，骚扰也可能继续。',
        '你的工作准证可能有风险。律政部和警方警告，与无牌放债人有牵连的工作准证持有人，可能被吊销工作准证，或被禁止在新加坡工作。',
        '帮高利贷做事同样是犯罪。如果你的银行账户、SIM 卡、提款卡或网上银行验证器被用于无牌放债，法律会推定你参与了。初犯者经营或协助无牌放债，最高可被判 4 年监禁、罚款 S$30,000 至 S$300,000，并可能被鞭刑。',
      ],
    },
    {
      id: 'do',
      heading: '高利贷者联系我，或者我已经欠了他们的钱，该怎么办？',
      items: [
        '不要回复你没有要求过的贷款信息。拉黑这个号码，并作为垃圾信息举报。',
        '不要先付任何费用。不要把护照、工作准证、SingPass 或银行资料交给任何人。',
        '保留所有信息、电话号码和收据，它们都是证据。',
        '向警方举报（见下面的“可以打给谁？”）。警方表示，所提供的一切资料都会保密。',
        '如果放债人威胁你、骚扰你或破坏财物，请报警。如果你有危险，请拨打 {tel:emergency}。',
        '如果你被债务压得喘不过气，要早点求助。警方和放债人注册处都把新加坡信贷辅导机构（Credit Counselling Singapore，{tel:ccs}）列为可以获得债务协助的地方。请问问他们能不能帮到你。',
      ],
    },
  ],
  contacts: {
    heading: '可以打给谁？',
    items: [
      { ref: 'emergency', label: '警方紧急电话', detail: '有危险时请拨打。' },
      { ref: 'police', label: '警方热线', detail: '举报高利贷者，或协助他们的人。' },
      {
        ref: 'iwitness',
        label: '向警方在线举报',
        detail: '在警方网站上举报无牌放债。',
        linkLabel: '打开 i-Witness',
      },
      {
        ref: 'scamshield',
        label: 'ScamShield 热线（24 小时）',
        detail: '不确定某个优惠或信息是不是诈骗时请拨打。',
      },
      { ref: 'registry', label: '放债人注册处', detail: '投诉违反规定的持牌放债人。' },
      { ref: 'ccs', label: '新加坡信贷辅导机构', detail: '负债时的咨询建议。' },
    ],
    note: '用手机拨打 1800 号码，可能会按通话时间收费。',
  },
  remlo: {
    heading: '在 Remlo 里查看警示信号',
    body: 'Remlo 是为在新加坡工作的人准备的免费理财应用，支持 {languages} 种语言。它的“高利贷指南”（Loan Shark Guide）里有警示信号清单和求助联系方式。Remlo 无法告诉你某个放债人是否持牌，请用官方名单查证。它也不提供法律意见。',
  },
};

export default page;
