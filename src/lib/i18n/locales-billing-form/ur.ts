// ur strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale ur
export default {
  "billing": {
    "header": {
      "title": "بلنگ کی تفصیلات",
      "subtitle": "ہم یہ تفصیلات آپ کی انوائس پر درج کرتے ہیں۔ اس کے بعد ادائیگی کا صفحہ آپ کے کارڈ کی معلومات مانگے گا۔"
    },
    "fields": {
      "firstName": {
        "label": "پہلا نام",
        "placeholder": "علی"
      },
      "lastName": {
        "label": "آخری نام",
        "placeholder": "حسین"
      },
      "email": {
        "label": "انوائس کے لیے ای میل",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "فون نمبر",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "ملک کا کوڈ",
        "placeholder": "PK"
      },
      "address": {
        "label": "بلنگ کا پتہ",
        "placeholder": "مکان 123، مین روڈ"
      },
      "city": {
        "label": "شہر",
        "placeholder": "کراچی"
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
      "country": "دو حروف، مثلاً US، MX یا CR۔",
      "state": "اختیاری۔ اگر آپ کے ملک میں صوبہ یا ریاست استعمال نہیں ہوتی تو خالی چھوڑ دیں۔",
      "zip": "اختیاری۔ اگر آپ کے پتے میں پوسٹل کوڈ نہیں تو خالی چھوڑ دیں۔"
    },
    "errors": {
      "required": "جاری رکھنے کے لیے یہ خانہ پُر کریں۔",
      "email": "name@example.com جیسا ای میل پتہ درج کریں۔",
      "country": "ملک کا دو حرفی کوڈ درج کریں، مثلاً US۔"
    },
    "optional": "اختیاری"
  }
};
