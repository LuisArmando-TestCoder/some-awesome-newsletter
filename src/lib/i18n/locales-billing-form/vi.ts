// vi strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale vi
export default {
  "billing": {
    "header": {
      "title": "Thông tin thanh toán",
      "subtitle": "Chúng tôi ghi các thông tin này lên hóa đơn. Trang thanh toán sẽ hỏi thẻ của bạn ở bước tiếp theo."
    },
    "fields": {
      "firstName": {
        "label": "Tên",
        "placeholder": "Anh"
      },
      "lastName": {
        "label": "Họ",
        "placeholder": "Nguyễn"
      },
      "email": {
        "label": "Email nhận hóa đơn",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "Số điện thoại",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "Mã quốc gia",
        "placeholder": "VN"
      },
      "address": {
        "label": "Địa chỉ thanh toán",
        "placeholder": "123 Lê Lợi"
      },
      "city": {
        "label": "Thành phố",
        "placeholder": "Hà Nội"
      },
      "state": {
        "label": "Tỉnh hoặc thành phố",
        "placeholder": "TP. Hồ Chí Minh"
      },
      "zip": {
        "label": "Mã bưu chính",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "Hai chữ cái, ví dụ VN, US hoặc MX.",
      "state": "Không bắt buộc. Để trống nếu quốc gia của bạn không dùng.",
      "zip": "Không bắt buộc. Để trống nếu địa chỉ của bạn không có mã bưu chính."
    },
    "errors": {
      "required": "Điền trường này để tiếp tục.",
      "email": "Nhập địa chỉ email như ten@example.com.",
      "country": "Nhập mã quốc gia gồm hai chữ cái, ví dụ VN."
    },
    "optional": "Không bắt buộc"
  }
};
