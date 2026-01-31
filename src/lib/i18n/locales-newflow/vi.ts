export default {
  step01: {
    title: "AI có giọng điệu giống con người tự động viết bản tin cho người đăng ký của bạn",
    subtitle: "Tần suất như thế nào, chọn <u>mỗi tháng</u> hoặc <u>mỗi tuần</u> hoặc <u>mỗi ngày</u> hoặc <u>vào lúc mấy giờ</u>"
  },
  step02: {
    title: "Ngôn ngữ của bản tin",
    subtitle: "“bản tin của bạn cũng sẽ được gửi bằng ngôn ngữ cụ thể của từng người dùng nếu chúng khác nhau”"
  },
  step03: {
    title: "Chuyển hướng (Tùy chọn)",
    subtitle: "Bạn có muốn chuyển hướng người dùng đến trang của mình không?",
    description: "Bạn có thể dán liên kết đến trang của mình ở đây, chúng tôi sẽ đếm xem có bao nhiêu người truy cập từ các email mà AI tạo ra",
    placeholder: "https://trang-cua-ban.com"
  },
  step04: {
    title: "Loại tin tức mà bạn muốn AI chọn",
    subtitle: "Chủ đề trò chuyện hoặc chủ đề nào (được suy ra từ liên kết chuyển hướng nếu được đặt, nếu không thì để trống)",
    placeholder: "ví dụ: Trí tuệ nhân tạo, Tiếp thị, Sức khỏe..."
  },
  step05: {
    title: "Tùy chỉnh Chữ ký của bạn",
    subtitle: "Thiết kế trực quan hoặc chỉnh sửa mã trực tiếp",
    visualEditor: "Trình chỉnh sửa trực quan",
    htmlSource: "Nguồn HTML",
    livePreview: "Xem trước trực tiếp",
    yourName: "Tên của bạn",
    yourTitle: "Chức danh của bạn",
    facebookProfile: "Hồ sơ Facebook",
    instagramProfile: "Hồ sơ Instagram",
    editHtml: "Chỉnh sửa HTML trực tiếp...",
    warning: "⚠️ Các chỉnh sửa được thực hiện ở đây sẽ bị ghi đè nếu bạn chuyển về Trình chỉnh sửa trực quan và thực hiện thay đổi."
  },
  step06: {
    title: "Nguồn tin tức",
    subtitle: "Bạn muốn sử dụng trang web tin tức nào?",
    description: "Nhập URL hoặc để chúng tôi chọn một cho bạn dựa trên chủ đề của bạn.",
    descriptionSmall: "Chúng tôi sẽ phân tích trang web để tìm nội dung tốt nhất. Việc này có thể mất vài giây.",
    placeholder: "https://vidu.com",
    analyzing: "Đang phân tích...",
    next: "Tiếp theo",
    errors: {
      failedToGenerate: "Không tạo được bộ chọn. Vui lòng thử lại hoặc kiểm tra URL.",
      errorGenerating: "Đã xảy ra lỗi khi tạo bộ chọn.",
      invalidUrl: "Vui lòng nhập URL hợp lệ hoặc chọn một nguồn."
    }
  },
  step07: {
    title: "Bộ chọn nội dung",
    subtitle: "Hãy coi mỗi trang web như một <strong>thư viện với bố cục độc đáo</strong>.",
    explanation1: "<strong>'Bộ chọn'</strong> này là bản đồ cụ thể mà chúng tôi đã tạo cho trang web này. Nó cho hệ thống của chúng tôi biết chính xác nơi cần tìm để lấy các bài viết bạn muốn, trong khi bỏ qua các nút menu và quảng cáo.",
    explanation2: "<strong>Chúng tôi đã tự động điền bản đồ này cho bạn.</strong>",
    placeholder: "Chuỗi bộ chọn...",
    regenerate: "Tạo lại Bộ chọn",
    regenerating: "Đang tạo lại...",
    errors: {
      noUrl: "Không tìm thấy URL nguồn tin tức.",
      failedRegenerate: "Không tạo lại được bộ chọn.",
      errorRegenerate: "Đã xảy ra lỗi khi tạo lại bộ chọn."
    }
  },
  step08: {
    title: "Xem trước",
    placeholder: "Sẵn sàng tạo bản tin đầu tiên của bạn chưa?",
    generateBtn: "Tạo Email Bản tin",
    sentBtn: "Đã gửi! Kiểm tra email của bạn",
    sendTestBtn: "Gửi Email Thử nghiệm",
    regenerateBtn: "Tạo lại",
    loading: {
      initializing: "Đang khởi tạo...",
      starting: "Bắt đầu tạo...",
      scraping: "Đang lấy nội dung...",
      translating: "Đang dịch bài viết...",
      formatting: "Đang định dạng email...",
      sending: "Đang kết nối với nhà cung cấp email...",
      authenticating: "Đang xác thực...",
      sendingArticle: "Đang gửi bài viết...",
      creating: "Đang tạo nguồn tin tức...",
      saving: "Đang lưu cấu hình...",
      finalizing: "Đang hoàn tất thiết lập..."
    },
    errors: {
      generationFailed: "Tạo thất bại: ",
      createFailed: "Không tạo được nguồn tin tức. Vui lòng thử lại.",
      errorCreating: "Lỗi khi tạo nguồn tin tức: ",
      sendFailed: "Không gửi được email: "
    },
    defaultSubject: "Xem trước Bản tin đã tạo của bạn"
  },
  step09: {
    title: "Để gửi bài viết từ email của bạn",
    subtitle: "Mật khẩu Ứng dụng (Tùy chọn)",
    description: "(Nếu bạn có dịch vụ gmail, hãy đặt mật khẩu ứng dụng của bạn ở đây)",
    label: "Mật khẩu Ứng dụng",
    placeholder: "Mật khẩu Ứng dụng của bạn"
  },
  step10: {
    title: "Địa chỉ Gmail (Tùy chọn)",
    subtitle: "Địa chỉ Email Gmail",
    description: "Nếu bạn muốn gửi từ một địa chỉ Gmail cụ thể",
    placeholder: "email-cua-ban@gmail.com"
  },
  step11: {
    title: "Gửi Email Thử nghiệm",
    subtitle: "Gửi email thử nghiệm cho chính bạn để xác minh cấu hình.",
    sendNow: "Gửi Ngay",
    sent: "Đã gửi! Kiểm tra email của bạn",
    loading: {
      connecting: "Đang kết nối với nhà cung cấp email...",
      authenticating: "Đang xác thực...",
      sending: "Đang gửi bài viết..."
    }
  },
  step12: {
    title: "Chia sẻ bản tin này với những người theo dõi bạn",
    subtitle: "Liên kết đến phễu đăng ký (trước khi họ bắt đầu nhận email, họ sẽ phải chấp nhận lời mời của bạn)",
    copy: "Sao chép",
    copied: "Đã sao chép liên kết!"
  },
  step13: {
    title: "Gói & Giới hạn",
    currentPlan: "Gói Hiện tại:",
    limits: "Giới hạn:",
    unknown: "Không xác định",
    changePlan: "Đổi Gói",
    advancedFeatures: "Cần các tính năng nâng cao hơn?",
    developerText: "Kiểm tra phần dành cho nhà phát triển của chúng tôi để tích hợp phễu đăng ký bản tin này trên máy chủ của bạn, blog của tất cả các bài viết đã tạo của bạn và đăng ký người dùng từ cơ sở mã của bạn bằng Khóa API của chúng tôi.",
    dashboardBtn: "Đi tới Bảng điều khiển",
    usage: "Sử dụng:",
    limitDetails: {
      free: "Giới hạn 100 người dùng",
      starter: "5 nguồn, 100k người dùng",
      growth: "17 nguồn, 250k người dùng",
      pro: "25 nguồn, 500k người dùng",
      master: "50 nguồn, người dùng không giới hạn",
      vipfree: "VIP Miễn phí"
    }
  }
};
