/*
 * Page furniture for the guide pages, in each language: skip link, language
 * switcher, sources block, Remlo buttons and footer. Translations are
 * machine-written and checked by a native speaker through the same
 * `reviewed` flag as the page copy (a page is only published once its own
 * flag is true, and the furniture is checked in the same pass).
 */
import { guideUiSchema } from '../schemas';
import { site } from '../site';
import type { GuideLang } from './languages';
import type { GuideUiInput } from './types';

const ui: Record<GuideLang, GuideUiInput> = {
  en: {
    skipLink: site.header.skipLink,
    switcherLabel: 'Read this page in',
    relatedLabel: 'Also read',
    sourcesHeading: 'Sources and last checked',
    sourcesIntro:
      'Everything on this page comes from the official pages below. Phone numbers and rules can change, so check the official page if something looks different.',
    checkedLabel: 'Last checked',
    checkedOn: '17 October 2026',
    sourcesInEnglish: 'The official pages are in English.',
    remloExplore: site.remlo.primary,
    remloGooglePlay: site.remlo.googlePlay,
    remloIphone: site.remlo.iphoneNote,
    homeLink: 'FinanceForward home',
    disclaimer: site.footer.disclaimer,
    footerMission: site.footer.mission,
  },
  bn: {
    skipLink: 'মূল বিষয়বস্তুতে যান',
    switcherLabel: 'এই পাতা অন্য ভাষায় পড়ুন',
    relatedLabel: 'আরও পড়ুন',
    sourcesHeading: 'তথ্যসূত্র এবং সর্বশেষ যাচাই',
    sourcesIntro:
      'এই পাতার সব তথ্য নিচের সরকারি পাতাগুলো থেকে নেওয়া। ফোন নম্বর ও নিয়ম বদলাতে পারে, তাই কিছু আলাদা মনে হলে সরকারি পাতা দেখে নিন।',
    checkedLabel: 'সর্বশেষ যাচাই',
    checkedOn: '17 অক্টোবর 2026',
    sourcesInEnglish: 'সরকারি পাতাগুলো ইংরেজিতে।',
    remloExplore: 'Remlo দেখুন',
    remloGooglePlay: 'Google Play থেকে নিন',
    remloIphone: 'আইফোনে ওয়েব সংস্করণ ব্যবহার করুন।',
    homeLink: 'FinanceForward হোম',
    disclaimer:
      'FinanceForward কোনো ব্যাংক, রেমিট্যান্স কোম্পানি বা লাইসেন্সপ্রাপ্ত আর্থিক উপদেষ্টা নয় এবং টাকা রাখে বা পাঠায় না। Remlo সাধারণ তথ্য ও উদাহরণমূলক হিসাব দেয়, আর্থিক পরামর্শ নয়। তুলনায় কোনো প্রদানকারীর নাম দেখানো মানে তাকে সমর্থন করা নয়।',
    footerMission:
      'FinanceForward সিঙ্গাপুরের অভিবাসী কর্মীদের দৈনন্দিন আর্থিক সিদ্ধান্ত আরও ভালোভাবে নিতে সাহায্য করে।',
  },
  my: {
    skipLink: 'အဓိကအကြောင်းအရာသို့ ကျော်သွားရန်',
    switcherLabel: 'ဤစာမျက်နှာကို အခြားဘာသာစကားဖြင့် ဖတ်ရန်',
    relatedLabel: 'ဆက်လက်ဖတ်ရန်',
    sourcesHeading: 'ရင်းမြစ်များနှင့် နောက်ဆုံးစစ်ဆေးသည့်ရက်',
    sourcesIntro:
      'ဤစာမျက်နှာပါ အချက်အလက်အားလုံးကို အောက်ပါ အစိုးရတရားဝင်စာမျက်နှာများမှ ယူထားပါသည်။ ဖုန်းနံပါတ်များနှင့် စည်းမျဉ်းများ ပြောင်းလဲနိုင်သဖြင့် ကွဲလွဲနေသည်ဟု ထင်ပါက တရားဝင်စာမျက်နှာကို ပြန်စစ်ပါ။',
    checkedLabel: 'နောက်ဆုံးစစ်ဆေးသည့်ရက်',
    checkedOn: '2026 ခုနှစ် အောက်တိုဘာလ 17 ရက်',
    sourcesInEnglish: 'တရားဝင်စာမျက်နှာများသည် အင်္ဂလိပ်ဘာသာဖြင့် ဖြစ်ပါသည်။',
    remloExplore: 'Remlo ကို ကြည့်ရန်',
    remloGooglePlay: 'Google Play တွင် ရယူရန်',
    remloIphone: 'iPhone တွင် ဝဘ်ဗားရှင်းကို သုံးပါ။',
    homeLink: 'FinanceForward ပင်မစာမျက်နှာ',
    disclaimer:
      'FinanceForward သည် ဘဏ်၊ ငွေလွှဲကုမ္ပဏီ သို့မဟုတ် လိုင်စင်ရ ဘဏ္ဍာရေးအကြံပေးပုဂ္ဂိုလ် မဟုတ်ပါ။ ငွေကို သိမ်းဆည်းခြင်း သို့မဟုတ် လွှဲပို့ခြင်း မလုပ်ပါ။ Remlo သည် အထွေထွေအချက်အလက်နှင့် ဥပမာအနေဖြင့် ခန့်မှန်းတွက်ချက်မှုများကိုသာ ပေးပြီး ဘဏ္ဍာရေးအကြံပေးချက် မဟုတ်ပါ။ နှိုင်းယှဉ်ချက်တွင် ဝန်ဆောင်မှုပေးသူကို ပြသခြင်းသည် ထောက်ခံခြင်း မဟုတ်ပါ။',
    footerMission:
      'FinanceForward သည် စင်္ကာပူရှိ ရွှေ့ပြောင်းအလုပ်သမားများ နေ့စဉ်ငွေကြေးဆိုင်ရာ ဆုံးဖြတ်ချက်များကို ပိုမိုသိရှိပြီး ချမှတ်နိုင်စေရန် ကူညီပေးပါသည်။',
  },
  zh: {
    skipLink: '跳到主要内容',
    switcherLabel: '用其他语言阅读本页',
    relatedLabel: '延伸阅读',
    sourcesHeading: '资料来源与最近核对日期',
    sourcesIntro:
      '本页所有内容均来自下列官方页面。电话号码和规定可能会变，如果看到不一样的内容，请以官方页面为准。',
    checkedLabel: '最近核对',
    checkedOn: '2026年10月17日',
    sourcesInEnglish: '官方页面为英文。',
    remloExplore: '了解 Remlo',
    remloGooglePlay: '在 Google Play 获取',
    remloIphone: 'iPhone 请使用网页版。',
    homeLink: 'FinanceForward 首页',
    disclaimer:
      'FinanceForward 不是银行、汇款公司或持牌理财顾问，也不保管或转移资金。Remlo 提供一般信息和示例性估算，不构成理财建议。在比较中显示某家服务商，并不代表推荐。',
    footerMission: 'FinanceForward 帮助在新加坡的外籍劳工更明白地做出日常的财务决定。',
  },
  ta: {
    skipLink: 'முக்கிய உள்ளடக்கத்திற்குச் செல்லவும்',
    switcherLabel: 'இந்தப் பக்கத்தை வேறு மொழியில் படிக்க',
    relatedLabel: 'மேலும் படிக்க',
    sourcesHeading: 'ஆதாரங்கள் மற்றும் கடைசியாகச் சரிபார்த்த நாள்',
    sourcesIntro:
      'இந்தப் பக்கத்தில் உள்ள அனைத்துத் தகவலும் கீழே உள்ள அதிகாரப்பூர்வ பக்கங்களிலிருந்து எடுக்கப்பட்டவை. தொலைபேசி எண்களும் விதிகளும் மாறலாம்; வேறுபாடாகத் தெரிந்தால் அதிகாரப்பூர்வ பக்கத்தைப் பாருங்கள்.',
    checkedLabel: 'கடைசியாகச் சரிபார்த்தது',
    checkedOn: '17 அக்டோபர் 2026',
    sourcesInEnglish: 'அதிகாரப்பூர்வ பக்கங்கள் ஆங்கிலத்தில் உள்ளன.',
    remloExplore: 'Remlo-வைப் பாருங்கள்',
    remloGooglePlay: 'Google Play-யில் பெறுங்கள்',
    remloIphone: 'iPhone-இல் இணையப் பதிப்பைப் பயன்படுத்துங்கள்.',
    homeLink: 'FinanceForward முகப்பு',
    disclaimer:
      'FinanceForward ஒரு வங்கி, பணப் பரிமாற்ற நிறுவனம் அல்லது உரிமம் பெற்ற நிதி ஆலோசகர் அல்ல; பணத்தை வைத்திருப்பதோ அனுப்புவதோ இல்லை. Remlo பொதுவான தகவல்களையும் எடுத்துக்காட்டு மதிப்பீடுகளையும் மட்டுமே தருகிறது; இது நிதி ஆலோசனை அல்ல. ஒப்பீட்டில் ஒரு சேவை வழங்குநரைக் காட்டுவது அவரை ஆதரிப்பதாகாது.',
    footerMission:
      'சிங்கப்பூரில் உள்ள புலம்பெயர் தொழிலாளர்கள் அன்றாட நிதி முடிவுகளை நன்கு அறிந்து எடுக்க FinanceForward உதவுகிறது.',
  },
  th: {
    skipLink: 'ข้ามไปยังเนื้อหาหลัก',
    switcherLabel: 'อ่านหน้านี้เป็นภาษาอื่น',
    relatedLabel: 'อ่านต่อ',
    sourcesHeading: 'แหล่งข้อมูลและวันที่ตรวจสอบล่าสุด',
    sourcesIntro:
      'ข้อมูลทั้งหมดในหน้านี้มาจากหน้าทางการด้านล่าง เบอร์โทรและกฎอาจเปลี่ยนแปลงได้ หากเห็นว่าไม่ตรงกัน ให้ดูตามหน้าทางการ',
    checkedLabel: 'ตรวจสอบล่าสุด',
    checkedOn: '17 ตุลาคม ค.ศ. 2026',
    sourcesInEnglish: 'หน้าทางการเป็นภาษาอังกฤษ',
    remloExplore: 'ดู Remlo',
    remloGooglePlay: 'ดาวน์โหลดบน Google Play',
    remloIphone: 'บน iPhone ให้ใช้เวอร์ชันเว็บ',
    homeLink: 'หน้าแรก FinanceForward',
    disclaimer:
      'FinanceForward ไม่ใช่ธนาคาร บริษัทโอนเงิน หรือที่ปรึกษาทางการเงินที่ได้รับใบอนุญาต และไม่ได้เก็บหรือโอนเงิน Remlo ให้ข้อมูลทั่วไปและตัวเลขประมาณการเพื่อเป็นตัวอย่างเท่านั้น ไม่ใช่คำแนะนำทางการเงิน การแสดงผู้ให้บริการรายใดในการเปรียบเทียบไม่ได้หมายความว่าเราแนะนำรายนั้น',
    footerMission:
      'FinanceForward ช่วยให้แรงงานข้ามชาติในสิงคโปร์ตัดสินใจเรื่องเงินในชีวิตประจำวันได้อย่างรู้เท่าทันมากขึ้น',
  },
  vi: {
    skipLink: 'Chuyển đến nội dung chính',
    switcherLabel: 'Đọc trang này bằng ngôn ngữ khác',
    relatedLabel: 'Đọc thêm',
    sourcesHeading: 'Nguồn tham khảo và ngày kiểm tra gần nhất',
    sourcesIntro:
      'Mọi thông tin trên trang này lấy từ các trang chính thức dưới đây. Số điện thoại và quy định có thể thay đổi, nên nếu thấy khác, hãy xem lại trang chính thức.',
    checkedLabel: 'Kiểm tra gần nhất',
    checkedOn: 'ngày 17 tháng 10 năm 2026',
    sourcesInEnglish: 'Các trang chính thức bằng tiếng Anh.',
    remloExplore: 'Khám phá Remlo',
    remloGooglePlay: 'Tải trên Google Play',
    remloIphone: 'Trên iPhone, hãy dùng phiên bản web.',
    homeLink: 'Trang chủ FinanceForward',
    disclaimer:
      'FinanceForward không phải ngân hàng, công ty chuyển tiền hay cố vấn tài chính có giấy phép, và không giữ hay chuyển tiền. Remlo cung cấp thông tin chung và các ước tính minh họa, không phải lời khuyên tài chính. Việc hiển thị một nhà cung cấp trong bảng so sánh không có nghĩa là giới thiệu nhà cung cấp đó.',
    footerMission:
      'FinanceForward giúp người lao động nhập cư tại Singapore đưa ra các quyết định tài chính hằng ngày với nhiều thông tin hơn.',
  },
};

export const guideUi = Object.fromEntries(
  Object.entries(ui).map(([lang, value]) => [lang, guideUiSchema.parse(value)]),
) as Record<GuideLang, ReturnType<typeof guideUiSchema.parse>>;

/**
 * Shown, in English, on every page that has not been checked by a native
 * speaker yet (`reviewed: false`). It is for the reviewer and for anyone who
 * reaches the page by its address, so it is deliberately not translated.
 */
export const draftNotice = {
  title: 'Draft translation',
  text: 'This page has not been checked by a native speaker yet, so the wording may contain mistakes. The phone numbers and links come from official pages and are exact.',
  englishLink: 'Read the English version',
} as const;

/** Short labels for the English pages, used where the page is linked from the home page. */
export const guideNavLabels = {
  'loan-sharks': 'Guide: loan sharks',
  'sending-money-home': 'Guide: sending money home',
} as const;
