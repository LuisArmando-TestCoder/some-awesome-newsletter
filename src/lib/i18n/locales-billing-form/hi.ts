// hi strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale hi
export default {
  "billing": {
    "header": {
      "title": "बिलिंग की जानकारी",
      "subtitle": "हम यह जानकारी आपके इनवॉइस पर लिखते हैं। इसके बाद पेमेंट पेज आपके कार्ड की जानकारी माँगेगा।"
    },
    "fields": {
      "firstName": {
        "label": "पहला नाम",
        "placeholder": "राम"
      },
      "lastName": {
        "label": "उपनाम",
        "placeholder": "कुमार"
      },
      "email": {
        "label": "इनवॉइस के लिए ईमेल",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "फ़ोन नंबर",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "देश का कोड",
        "placeholder": "IN"
      },
      "address": {
        "label": "बिलिंग पता",
        "placeholder": "123 Main Street"
      },
      "city": {
        "label": "शहर",
        "placeholder": "दिल्ली"
      },
      "state": {
        "label": "राज्य या प्रांत",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "पिन या ZIP कोड",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "दो अक्षर, जैसे US, MX या CR।",
      "state": "वैकल्पिक। अगर आपके देश में राज्य नहीं होते, तो इसे खाली छोड़ दें।",
      "zip": "वैकल्पिक। अगर आपके पते में पिन कोड नहीं है, तो इसे खाली छोड़ दें।"
    },
    "errors": {
      "required": "जारी रखने के लिए यह फ़ील्ड भरें।",
      "email": "name@example.com जैसा ईमेल पता दर्ज करें।",
      "country": "देश का दो अक्षरों वाला कोड दर्ज करें, जैसे US।"
    },
    "optional": "वैकल्पिक"
  }
};
