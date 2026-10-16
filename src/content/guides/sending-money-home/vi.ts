/*
 * Sending money home: Vietnamese. Machine-written; not yet checked by a native
 * speaker. See NATIVE-REVIEW.md before setting `reviewed: true`.
 */
import type { GuideContentInput } from '../types';

const page: GuideContentInput = {
  reviewed: false,
  title: 'Gửi tiền về nhà từ Singapore: cần kiểm tra gì trước khi gửi',
  description:
    'Trước khi gửi tiền về nhà từ Singapore, hãy kiểm tra đơn vị gửi tiền có giấy phép không, gia đình bạn thực nhận bao nhiêu, và phí cùng tỷ giá là bao nhiêu.',
  eyebrow: 'Hướng dẫn · Singapore',
  heading: 'Gửi tiền về nhà từ Singapore: cần kiểm tra gì trước khi gửi',
  lead: 'Một khoản chuyển trông rẻ vẫn có thể khiến gia đình bạn nhận được ít tiền hơn so với cách khác. Trước khi gửi, hãy kiểm tra đơn vị gửi tiền có giấy phép không, xem gia đình bạn thực nhận bao nhiêu và giữ lại biên lai. Đây là thông tin chung, không phải tư vấn tài chính. Trang này không giới thiệu bất kỳ đơn vị nào.',
  sections: [
    {
      id: 'licensed',
      heading: 'Đơn vị gửi tiền có giấy phép ở Singapore không?',
      paragraphs: [
        'Cơ quan Tiền tệ Singapore (Monetary Authority of Singapore, MAS) cấp phép cho các công ty gửi tiền ra nước ngoài và liệt kê họ trong Financial Institutions Directory. Bộ Nhân lực (MOM) khuyến cáo mạnh mẽ nên dùng đơn vị được MAS cấp phép, vì đơn vị không có giấy phép không chịu sự quản lý.',
      ],
      items: [
        'Tìm tên công ty trong danh bạ trước khi dùng dịch vụ.',
        'Dùng các điểm gửi tiền được cấp phép (kiosk) trong ký túc xá hoặc trung tâm giải trí, hoặc các dịch vụ trực tuyến và ứng dụng có giấy phép.',
        'Tránh gửi tiền qua WhatsApp hoặc các ứng dụng nhắn tin khác.',
        'Tránh các đại lý không có giấy phép như môi giới hawala hoặc hundi. Họ có thể cuỗm tiền của bạn bỏ trốn.',
      ],
      links: [{ ref: 'fid', label: 'Mở MAS Financial Institutions Directory' }],
    },
    {
      id: 'receive',
      heading: 'Gia đình tôi thực nhận được bao nhiêu?',
      paragraphs: [
        'Phí chỉ là một phần của chi phí. Phần còn lại là tỷ giá, và nó không được hiển thị như một khoản phí. Ngân hàng Thế giới tính tổng chi phí của một lần chuyển tiền là phí chuyển cộng với chênh lệch tỷ giá (margin). Vì vậy, một lần chuyển có phí thấp hoặc không có phí vẫn có thể khiến gia đình bạn nhận ít hơn nếu tỷ giá kém hơn.',
      ],
      items: [
        'Hỏi mỗi đơn vị cùng một câu: nếu tôi gửi số tiền này bằng đô la Singapore, gia đình tôi sẽ nhận được bao nhiêu bằng tiền của họ, sau khi trừ mọi khoản phí?',
        'So sánh vào cùng một thời điểm. Phí và tỷ giá khác nhau giữa các đơn vị và thay đổi theo thời gian.',
        'Hỏi xem việc chuyển mất bao lâu và gia đình bạn sẽ nhận tiền bằng cách nào.',
      ],
    },
    {
      id: 'show',
      heading: 'Đơn vị có giấy phép phải cho tôi xem những gì?',
      paragraphs: ['Quy định của MAS yêu cầu đơn vị có giấy phép phải làm hai việc.'],
      items: [
        'Cho bạn xem tỷ giá họ đưa ra, và khoản phí riêng nếu có, trước khi bạn dùng dịch vụ.',
        'Đưa biên lai cho khách hàng cá nhân với mọi giao dịch. Với chuyển tiền ra nước ngoài, biên lai ghi số tiền người nhận nhận được bằng tiền của họ, tỷ giá đã dùng, cùng mọi khoản hoa hồng và phí.',
      ],
      note: 'Giữ biên lai cho đến khi gia đình bạn đã nhận được tiền.',
    },
    {
      id: 'scams',
      heading: 'Làm sao tránh bị lừa khi gửi tiền?',
      items: [
        'Cán bộ nhà nước sẽ không bao giờ yêu cầu bạn chuyển tiền hoặc cung cấp thông tin đăng nhập ngân hàng qua điện thoại.',
        'Đừng chia sẻ thông tin ngân hàng, mật khẩu hay mật khẩu dùng một lần (OTP) với bất kỳ ai.',
        'Kiểm tra kỹ tên và thông tin tài khoản của người nhận trước khi xác nhận.',
        'Nếu bạn không chắc một cuộc gọi hay tin nhắn có phải lừa đảo không, hãy gọi đường dây ScamShield {tel:scamshield}. Đường dây mở 24 giờ.',
      ],
    },
  ],
  remlo: {
    heading: 'So sánh số liệu ước tính trong Remlo',
    body: 'Remlo là ứng dụng tiền bạc miễn phí cho người lao động ở Singapore, có {languages} ngôn ngữ. Màn hình Tỷ giá (Exchange Rate) của ứng dụng hiển thị cạnh nhau mức phí và tỷ giá tham khảo của một số đơn vị. Đó là số liệu ước tính minh họa, không phải báo giá, và việc hiển thị một đơn vị không có nghĩa là giới thiệu đơn vị đó. Luôn kiểm tra phí và tỷ giá cuối cùng với đơn vị trước khi gửi. Remlo không giữ hay chuyển tiền.',
  },
};

export default page;
