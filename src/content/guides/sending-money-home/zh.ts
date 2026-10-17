/*
 * Sending money home: Simplified Chinese. Machine-written; not yet checked by a
 * native speaker. See NATIVE-REVIEW.md before setting `reviewed: true`.
 */
import type { GuideContentInput } from '../types';

const page: GuideContentInput = {
  reviewed: false,
  title: '从新加坡汇款回家：汇款前要检查什么',
  description:
    '从新加坡汇款回家之前，请先检查服务商是否持牌、家人实际能收到多少钱，以及手续费和汇率是多少。',
  eyebrow: '指南 · 新加坡',
  heading: '从新加坡汇款回家：汇款前要检查什么',
  lead: '一笔看起来便宜的汇款，家人收到的钱可能反而比另一笔少。汇款前，先确认服务商是否持牌，看看家人实际能收到多少，并保存好收据。这只是一般信息，不是理财建议，也不推荐任何服务商。',
  sections: [
    {
      id: 'licensed',
      heading: '服务商在新加坡有牌照吗？',
      paragraphs: [
        '新加坡金融管理局（MAS）向办理跨境汇款的公司发牌，并把它们列在“金融机构名录”（Financial Institutions Directory）里。人力部（MOM）强烈建议大家使用 MAS 持牌的服务商，因为无牌服务商不受监管。',
      ],
      items: [
        '使用之前，先在名录里搜索这家公司的名称。',
        '使用宿舍或康乐中心里的授权汇款机（kiosk），或持牌的网上服务和应用程序。',
        '避免通过 WhatsApp 或其他聊天软件汇款。',
        '避免使用哈瓦拉（hawala）、洪地（hundi）这类无牌的汇款中间人。他们可能卷款跑掉。',
      ],
      links: [{ ref: 'fid', label: '打开 MAS 金融机构名录' }],
    },
    {
      id: 'receive',
      heading: '我的家人实际能收到多少钱？',
      paragraphs: [
        '手续费只是成本的一部分。另一部分是汇率，而且汇率不会显示为一笔费用。世界银行把一笔汇款的总成本算作汇款手续费加上汇率差价。所以，手续费很低甚至没有手续费的汇款，如果汇率更差，家人仍然可能收到更少的钱。',
      ],
      items: [
        '向每家服务商问同一个问题：如果我用新加坡元汇这个金额，扣掉所有费用后，我的家人能收到多少当地货币？',
        '在同一时间比较。手续费和汇率因服务商而异，也会随时间变化。',
        '问清楚汇款要多久，以及家人要怎么领取这笔钱。',
      ],
    },
    {
      id: 'show',
      heading: '持牌服务商必须向我展示什么？',
      paragraphs: ['MAS 的规定要求持牌服务商做到两点。'],
      items: [
        '在你使用服务之前，展示它提供的汇率，以及任何单独收取的费用。',
        '为个人客户的每一笔交易提供收据。对于汇往海外的款项，收据会显示收款人以当地货币收到的金额、所用汇率，以及佣金和其他费用。',
      ],
      note: '在家人收到钱之前，请保留好收据。',
    },
    {
      id: 'scams',
      heading: '汇款时怎样避免被骗？',
      items: [
        '政府官员绝不会在电话里要求你转账或提供银行登录资料。',
        '不要把银行资料、密码或一次性密码（OTP）告诉任何人。',
        '确认之前，仔细核对收款人的姓名和账户资料。',
        '如果不确定一个电话或信息是不是诈骗，请拨打 ScamShield 热线 {tel:scamshield}，24 小时服务。',
      ],
    },
  ],
  remlo: {
    heading: '在 Remlo 里比较估算',
    body: 'Remlo 是为在新加坡工作的人准备的免费理财应用，支持 {languages} 种语言。它的“汇率”（Exchange Rate）页面会并排显示几家服务商的参考手续费和汇率。这些只是示例性估算，不是报价，显示某家服务商也不代表推荐。汇款前，一定要向服务商确认最终的手续费和汇率。Remlo 不保管也不转移资金。',
  },
};

export default page;
