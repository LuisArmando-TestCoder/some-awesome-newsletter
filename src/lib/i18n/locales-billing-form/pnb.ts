// pnb strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale pnb
export default {
  "billing": {
    "header": {
      "title": "بلنگ دی تفصیل",
      "subtitle": "اسیں ایہہ تفصیل تہاڈی انوائس تے لکھدے آں۔ ایہدے مگروں ادائیگی والا صفحہ تہاڈے کارڈ دی معلومات منگے گا۔"
    },
    "fields": {
      "firstName": {
        "label": "پہلا ناں",
        "placeholder": "علی"
      },
      "lastName": {
        "label": "آخری ناں",
        "placeholder": "خان"
      },
      "email": {
        "label": "انوائس لئی ای میل",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "فون نمبر",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "ملک دا کوڈ",
        "placeholder": "PK"
      },
      "address": {
        "label": "بلنگ دا پتہ",
        "placeholder": "مکان 123، مین روڈ"
      },
      "city": {
        "label": "شہر",
        "placeholder": "لاہور"
      },
      "state": {
        "label": "صوبہ یا ریاست",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "پوسٹل یا ZIP کوڈ",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "دو حرف، جیویں US، MX یا CR۔",
      "state": "اختیاری۔ جے تہاڈے ملک وچ صوبہ یا ریاست نہیں ورتی جاندی تاں خالی چھڈ دیو۔",
      "zip": "اختیاری۔ جے تہاڈے پتے وچ پوسٹل کوڈ نہیں تاں خالی چھڈ دیو۔"
    },
    "errors": {
      "required": "جاری رکھن لئی ایہہ خانہ بھرو۔",
      "email": "name@example.com ورگا ای میل پتہ لکھو۔",
      "country": "ملک دا دو حرفی کوڈ لکھو، جیویں US۔"
    },
    "optional": "اختیاری"
  }
};
