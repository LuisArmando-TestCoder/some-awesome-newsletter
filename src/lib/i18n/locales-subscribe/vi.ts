// vi strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale vi
export default {
  "welcome": {
    "title": "Chào mừng bạn đến với bản tin",
    "invitedBy": "{configuratorId} đã mời bạn đăng ký."
  },
  "email": {
    "title": "Chúng tôi nên gửi mỗi số đến đâu?",
    "placeholder": "Email của bạn"
  },
  "name": {
    "title": "Bạn tên là gì?",
    "placeholder": "Tên của bạn"
  },
  "language": {
    "title": "Bạn muốn đọc bằng ngôn ngữ nào?"
  },
  "subscribed": {
    "title": "Bạn đã đăng ký",
    "subtitle": "Kiểm tra hộp thư để tìm email xác nhận.",
    "continueTo": "Tiếp tục đến",
    "finishingUp": "Bạn có thể đóng trang này."
  },
  "form": {
    "heading": "Đăng ký {title}",
    "headingFallback": "Đăng ký bản tin này",
    "intro": "Các số mới được gửi qua email, viết bằng ngôn ngữ bạn chọn.",
    "from": "Từ {sender}",
    "emailLabel": "Địa chỉ email",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Tên",
    "optional": "không bắt buộc",
    "nameHint": "Chúng tôi dùng để chào bạn. Nếu để trống, chúng tôi dùng phần đầu địa chỉ email của bạn.",
    "languageLabel": "Ngôn ngữ của các số bản tin",
    "languageSummary": "Các số bằng {language}.",
    "languageChange": "Đổi",
    "languageHint": "Chúng tôi chọn theo cài đặt trình duyệt của bạn.",
    "submit": "Đăng ký",
    "submitting": "Đang đăng ký...",
    "consent": "Khi đăng ký, bạn đồng ý nhận email từ {sender}. Mọi email đều có liên kết hủy đăng ký.",
    "privacy": "Chính sách quyền riêng tư",
    "loadingInfo": "Đang tải thông tin bản tin"
  },
  "success": {
    "title": "Kiểm tra hộp thư của bạn",
    "body": "Chúng tôi đã gửi email xác nhận đến {email}. Mở email và chọn Xác nhận đăng ký.",
    "next": "Số đầu tiên sẽ đến sau khi bạn xác nhận, viết bằng {language}.",
    "spam": "Nếu sau vài phút chưa thấy gì, hãy xem thư mục spam hoặc Quảng cáo.",
    "changeEmail": "Dùng email khác",
    "continueTo": "Tiếp tục đến {host}"
  },
  "errors": {
    "emailRequired": "Nhập địa chỉ email của bạn.",
    "emailInvalid": "Địa chỉ email này có vẻ chưa đầy đủ. Kiểm tra và thử lại.",
    "missingLink": "Liên kết đăng ký này thiếu thông tin. Hãy xin người gửi một liên kết mới.",
    "notFound": "Liên kết đăng ký này không còn hoạt động. Hãy xin người gửi một liên kết mới.",
    "limit": "Bản tin này hiện không nhận thêm người đăng ký. Thử lại sau.",
    "invalid": "Chúng tôi không chấp nhận được địa chỉ này. Kiểm tra và thử lại.",
    "server": "Chúng tôi không lưu được đăng ký của bạn. Thử lại sau ít phút.",
    "network": "Chúng tôi không kết nối được máy chủ. Kiểm tra kết nối và thử lại."
  },
  "confirm": {
    "title": "Xác nhận đăng ký của bạn",
    "body": "Chọn nút bên dưới để bắt đầu nhận các số tại {email}.",
    "button": "Xác nhận đăng ký",
    "confirming": "Đang xác nhận...",
    "consent": "Khi xác nhận, bạn đồng ý nhận bản tin này qua email. Bạn có thể hủy đăng ký từ bất kỳ số nào.",
    "successTitle": "Bạn đã đăng ký",
    "successBody": "Các số mới sẽ được gửi đến {email}.",
    "successTip": "Để thư không vào spam, hãy thêm người gửi vào danh bạ.",
    "invalidTitle": "Liên kết này chưa đầy đủ",
    "invalidBody": "Mở lại email xác nhận và chọn nút trong đó. Nếu không tìm thấy, hãy đăng ký lại từ trang của người gửi.",
    "notFoundBody": "Chúng tôi không tìm thấy lượt đăng ký cho địa chỉ này. Hãy đăng ký lại từ trang của người gửi.",
    "errorBody": "Chúng tôi không xác nhận được đăng ký của bạn. Thử lại sau ít phút.",
    "retry": "Thử lại",
    "home": "Về trang chủ"
  },
  "embed": {
    "title": "Thêm biểu mẫu đăng ký vào website",
    "intro": "Dán một trong các đoạn mã này vào website. Người đăng ký sẽ nhận email xác nhận, rồi nhận các số bản tin bằng ngôn ngữ của họ.",
    "linkLabel": "Liên kết trang đăng ký",
    "linkHint": "Chia sẻ trong phần giới thiệu mạng xã hội, chữ ký email hoặc mã QR.",
    "scriptLabel": "Thẻ script (khuyên dùng)",
    "scriptHint": "Dán vào nơi biểu mẫu cần xuất hiện. Biểu mẫu tự điều chỉnh kích thước.",
    "iframeLabel": "Iframe",
    "iframeHint": "Dùng cách này nếu website của bạn không cho phép script.",
    "copy": "Sao chép",
    "copied": "Đã sao chép",
    "copyFailed": "Chọn văn bản và sao chép thủ công.",
    "options": "Tùy chọn biểu mẫu",
    "accent": "Màu nút",
    "accentHint": "Giữ nguyên để dùng màu thương hiệu của bạn.",
    "theme": "Giao diện",
    "themeAuto": "Theo cài đặt của khách truy cập",
    "themeLight": "Sáng",
    "themeDark": "Tối",
    "layout": "Bố cục",
    "layoutFull": "Đầy đủ (tiêu đề, tên và ngôn ngữ)",
    "layoutCompact": "Gọn (email và nút)",
    "preview": "Xem trước",
    "previewNote": "Bản xem trước đang hoạt động thật. Đăng ký tại đây sẽ tạo một người đăng ký thật.",
    "missing": "Hãy tạo bản tin trước. Biểu mẫu đăng ký xuất hiện ở đây khi bản tin đã có."
  },
  "page": {
    "poweredBy": "Chạy trên AIBAN",
    "title": "Đăng ký"
  },
  "signature": {
    "title": "Chữ ký email",
    "intro": "Người đọc thấy phần này ở cuối mỗi số. Nhấp vào bất kỳ phần nào trong bản xem trước để sửa.",
    "show": "Hiện chữ ký của tôi trong mỗi số",
    "showHint": "Nếu tắt, các số kết thúc ngay sau bài viết.",
    "preview": "Xem trước",
    "previewEmpty": "Chữ ký của bạn đang trống. Thêm tên để bắt đầu.",
    "articleEnd": "Hết bài viết",
    "tabContent": "Nội dung",
    "tabStyle": "Kiểu dáng",
    "blocks": "Những gì cần đưa vào",
    "blocksHint": "Chọn một thẻ để hiện hoặc ẩn phần đó. Phần bị ẩn vẫn giữ nội dung.",
    "layout": "Bố cục",
    "layouts": {
      "bar": "Thanh màu",
      "photo": "Ảnh",
      "stacked": "Xếp chồng",
      "centered": "Căn giữa",
      "minimal": "Chỉ văn bản"
    },
    "fields": {
      "name": "Tên",
      "role": "Chức danh",
      "company": "Công ty",
      "phone": "Điện thoại",
      "email": "Email",
      "website": "Website",
      "address": "Địa chỉ",
      "photoUrl": "Ảnh",
      "logoUrl": "Logo",
      "socials": "Liên kết mạng xã hội",
      "cta": "Nút",
      "disclaimer": "Ghi chú pháp lý"
    },
    "groups": {
      "about": "Về bạn",
      "contact": "Liên hệ",
      "images": "Hình ảnh",
      "socials": "Liên kết mạng xã hội",
      "cta": "Nút",
      "disclaimer": "Ghi chú pháp lý"
    },
    "placeholders": {
      "name": "Nguyễn Thu Hà",
      "role": "Nhà sáng lập",
      "company": "Studio Ven Sông",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Lê Lợi, Đà Nẵng",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Đặt lịch gọi",
      "ctaUrl": "https://"
    },
    "ctaText": "Chữ trên nút",
    "ctaLink": "Liên kết của nút",
    "hints": {
      "photoUrl": "Liên kết đến ảnh PNG hoặc JPG hình vuông, tối thiểu 144 x 144 pixel và dưới 200 KB. Hiển thị 72 x 72 pixel cạnh tên bạn.",
      "logoUrl": "Liên kết đến ảnh PNG hoặc JPG nền trong suốt hoặc trắng, cao tối thiểu 64 pixel. Hiển thị cao 32 pixel.",
      "website": "Chúng tôi thêm https:// nếu bạn không ghi.",
      "cta": "Cần cả chữ và liên kết thì nút mới hiển thị.",
      "disclaimer": "Dòng chữ nhỏ ở cuối, ví dụ ghi chú bảo mật. Để trống nếu bạn không cần."
    },
    "style": {
      "accent": "Màu nhấn",
      "accentHint": "Dùng cho thanh màu, liên kết và nút. Mặc định là màu thương hiệu của bạn.",
      "font": "Phông chữ",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Cỡ chữ",
      "sizeMd": "Thường",
      "sizeSm": "Nhỏ",
      "shape": "Hình dạng ảnh",
      "shapeRound": "Tròn",
      "shapeSquare": "Vuông"
    },
    "hidden": "đã ẩn",
    "reset": "Làm lại từ đầu",
    "resetConfirm": "Chọn lần nữa để xóa mọi trường"
  }
};
