/*
 * Loan sharks: Vietnamese. Machine-written; not yet checked by a native
 * speaker. See NATIVE-REVIEW.md before setting `reviewed: true`.
 */
import type { GuideContentInput } from '../types';

const page: GuideContentInput = {
  reviewed: false,
  title: 'Cho vay nặng lãi (tín dụng đen) ở Singapore: cách nhận biết và nơi nhờ giúp đỡ',
  description:
    'Cho vay tiền không có giấy phép là bất hợp pháp ở Singapore. Tìm hiểu dấu hiệu của tín dụng đen, cách kiểm tra bên cho vay có giấy phép hay không và gọi ai khi cần giúp đỡ.',
  eyebrow: 'Hướng dẫn · Singapore',
  heading:
    'Cho vay nặng lãi (tín dụng đen, bên cho vay không giấy phép) ở Singapore: cách nhận biết và nơi nhờ giúp đỡ',
  lead: 'Cho vay tiền không có giấy phép là bất hợp pháp ở Singapore. Những kẻ cho vay nặng lãi, còn gọi là “Ah Long”, thường nhắm vào người đang cần tiền gấp. Trang này giải thích các dấu hiệu cảnh báo, cách kiểm tra bên cho vay và ai có thể giúp bạn. Đây là thông tin chung, không phải tư vấn pháp lý.',
  callout: {
    title: 'Bạn đang gặp nguy hiểm hoặc đang bị đe dọa ngay lúc này?',
    body: 'Gọi {tel:emergency} để báo Cảnh sát. Nếu không khẩn cấp và bạn muốn tố giác kẻ cho vay nặng lãi, hãy gọi đường dây nóng của Cảnh sát {tel:police} hoặc [tố giác trực tuyến qua i-Witness](iwitness).',
  },
  sections: [
    {
      id: 'spot',
      heading: 'Làm sao biết bên cho vay là kẻ cho vay nặng lãi?',
      paragraphs: ['Hãy cảnh giác nếu có bất kỳ điều nào sau đây.'],
      items: [
        'Họ không có tên trong danh sách chính thức các bên cho vay có giấy phép.',
        'Họ liên lạc với bạn trước để mời vay, qua điện thoại, SMS, WhatsApp hoặc mạng xã hội. Bên cho vay có giấy phép không được phép làm vậy.',
        'Họ duyệt khoản vay mà không gặp bạn tại địa điểm kinh doanh của họ. Bên cho vay có giấy phép phải kiểm tra danh tính của bạn trực tiếp, và không được cho vay hoàn toàn trực tuyến.',
        'Họ yêu cầu bạn trả tiền trước, chẳng hạn “phí GST”, phí hành chính hoặc phí xử lý hồ sơ. Bên cho vay có giấy phép không đòi khoản này trước khi bạn nhận tiền vay.',
        'Họ hỏi mật khẩu SingPass, ngân hàng trực tuyến hoặc các mật khẩu khác của bạn, hoặc muốn giữ hộ chiếu, giấy phép lao động, thẻ ATM hay giấy tờ tùy thân khác của bạn. Bên cho vay có giấy phép không được làm vậy.',
        'Bạn biết họ qua tờ rơi, tin nhắn SMS hoặc ứng dụng nhắn tin. Bên cho vay có giấy phép chỉ được quảng cáo trong danh bạ doanh nghiệp, trên trang web của họ, và tại hoặc bên ngoài địa điểm kinh doanh của họ.',
      ],
      note: 'Nếu bên cho vay làm bất kỳ điều nào trong số này, họ hoặc không có giấy phép hoặc đang vi phạm quy định. Đừng vay của họ.',
    },
    {
      id: 'check',
      heading: 'Làm sao kiểm tra một bên cho vay có giấy phép?',
      paragraphs: [
        'Cơ quan Đăng ký Cho vay tiền (Registry of Moneylenders) thuộc Bộ Tư pháp công bố danh sách chính thức các bên cho vay có giấy phép. Hãy đối chiếu tên, địa chỉ thực tế và địa chỉ trang web của bên cho vay với danh sách đó, và chỉ dùng danh sách đó.',
        'Kẻ cho vay nặng lãi và kẻ lừa đảo có thể sao chép tên của một bên cho vay có giấy phép hoặc lập trang web giả giống hệt, nên chỉ khớp tên là chưa đủ.',
      ],
      links: [{ ref: 'list', label: 'Mở danh sách chính thức các bên cho vay có giấy phép' }],
      note: 'Không chắc một tin nhắn có phải lừa đảo không? Gọi đường dây ScamShield {tel:scamshield}. Đường dây mở 24 giờ.',
    },
    {
      id: 'risks',
      heading: 'Điều gì có thể xảy ra nếu tôi vay của, hoặc giúp, kẻ cho vay nặng lãi?',
      items: [
        'Lãi suất rất cao và không ai kiểm tra bạn có trả nổi hay không, có thể khiến bạn sa vào nợ nần.',
        'Quấy rối và đe dọa bạo lực để ép bạn trả tiền. Việc quấy rối có thể tiếp diễn ngay cả khi bạn đã trả hết nợ.',
        'Giấy phép lao động của bạn có thể gặp rủi ro. Bộ Tư pháp và Cảnh sát cảnh báo rằng người có giấy phép lao động dính líu đến bên cho vay không phép có thể bị thu hồi giấy phép lao động hoặc bị cấm làm việc tại Singapore.',
        'Giúp kẻ cho vay nặng lãi cũng là phạm tội. Nếu tài khoản ngân hàng, thẻ SIM, thẻ ATM hoặc thiết bị bảo mật ngân hàng trực tuyến của bạn bị dùng cho việc cho vay không phép, luật mặc định rằng bạn đã giúp sức. Với lần phạm tội đầu tiên, việc cho vay không phép hoặc giúp sức cho việc đó có thể bị phạt tù đến 4 năm, phạt tiền từ S$30,000 đến S$300,000 và đánh roi.',
      ],
    },
    {
      id: 'do',
      heading: 'Tôi nên làm gì nếu kẻ cho vay nặng lãi liên lạc, hoặc tôi đã lỡ nợ họ?',
      items: [
        'Đừng trả lời những lời mời vay mà bạn không yêu cầu. Chặn số và báo cáo là spam.',
        'Đừng trả bất kỳ khoản phí nào trước. Đừng đưa cho ai hộ chiếu, giấy phép lao động, SingPass hay thông tin ngân hàng của bạn.',
        'Giữ lại mọi tin nhắn, số điện thoại và biên lai. Đó là bằng chứng.',
        'Tố giác với Cảnh sát (xem “Tôi có thể gọi ai?” bên dưới). Cảnh sát cho biết mọi thông tin cung cấp đều được giữ bí mật.',
        'Nếu bên cho vay đe dọa, quấy rối hoặc phá hoại tài sản của bạn, hãy trình báo Cảnh sát. Nếu bạn đang gặp nguy hiểm, gọi {tel:emergency}.',
        'Nếu bạn đang chật vật vì nợ, hãy tìm giúp đỡ sớm. Cảnh sát và Cơ quan Đăng ký Cho vay tiền liệt kê Credit Counselling Singapore ({tel:ccs}) là nơi hỗ trợ về nợ. Hãy hỏi xem họ có giúp được bạn không.',
      ],
    },
  ],
  contacts: {
    heading: 'Tôi có thể gọi ai?',
    items: [
      { ref: 'emergency', label: 'Cảnh sát (khẩn cấp)', detail: 'Gọi khi bạn đang gặp nguy hiểm.' },
      {
        ref: 'police',
        label: 'Đường dây nóng của Cảnh sát',
        detail: 'Tố giác kẻ cho vay nặng lãi hoặc người giúp sức cho chúng.',
      },
      {
        ref: 'iwitness',
        label: 'Tố giác với Cảnh sát trực tuyến',
        detail: 'Tố giác việc cho vay không phép trên trang web của Cảnh sát.',
        linkLabel: 'Mở i-Witness',
      },
      {
        ref: 'scamshield',
        label: 'Đường dây ScamShield (24 giờ)',
        detail: 'Gọi khi bạn không chắc một lời mời hay tin nhắn có phải lừa đảo không.',
      },
      {
        ref: 'registry',
        label: 'Cơ quan Đăng ký Cho vay tiền',
        detail: 'Khiếu nại bên cho vay có giấy phép nhưng vi phạm quy định.',
      },
      {
        ref: 'ccs',
        label: 'Credit Counselling Singapore',
        detail: 'Tư vấn khi bạn đang mắc nợ.',
      },
    ],
    note: 'Cuộc gọi đến số 1800 từ điện thoại di động có thể bị tính cước.',
  },
  remlo: {
    heading: 'Kiểm tra dấu hiệu cảnh báo trong Remlo',
    body: 'Remlo là ứng dụng tiền bạc miễn phí cho người lao động ở Singapore, có {languages} ngôn ngữ. Mục Hướng dẫn về cho vay nặng lãi (Loan Shark Guide) có danh sách kiểm tra dấu hiệu cảnh báo và thông tin liên hệ để nhờ giúp đỡ. Remlo không cho bạn biết bên cho vay có giấy phép hay không: hãy dùng danh sách chính thức để kiểm tra. Remlo không đưa ra tư vấn pháp lý.',
  },
};

export default page;
