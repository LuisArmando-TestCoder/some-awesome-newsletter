// bho strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale bho
export default {
  "billing": {
    "header": {
      "title": "बिलिंग के जानकारी",
      "subtitle": "हमनी ई जानकारी राउर इनवॉइस पर लिखीले। एकरा बाद पेमेंट पेज राउर कार्ड के जानकारी माँगी।"
    },
    "fields": {
      "firstName": {
        "label": "पहिला नाम",
        "placeholder": "राम"
      },
      "lastName": {
        "label": "उपनाम",
        "placeholder": "शर्मा"
      },
      "email": {
        "label": "इनवॉइस खातिर ईमेल",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "फोन नंबर",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "देश के कोड",
        "placeholder": "IN"
      },
      "address": {
        "label": "बिलिंग पता",
        "placeholder": "123 Main Street"
      },
      "city": {
        "label": "सहर",
        "placeholder": "पटना"
      },
      "state": {
        "label": "राज्य भा प्रांत",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "पिन भा ZIP कोड",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "दू गो अक्षर, जइसे US, MX भा CR।",
      "state": "वैकल्पिक। अगर राउर देश में राज्य ना होला, त एकरा के खाली छोड़ दीं।",
      "zip": "वैकल्पिक। अगर राउर पता में पिन कोड नइखे, त एकरा के खाली छोड़ दीं।"
    },
    "errors": {
      "required": "आगे बढ़े खातिर ई फील्ड भरीं।",
      "email": "name@example.com जइसन ईमेल पता डालीं।",
      "country": "देश के दू अक्षर वाला कोड डालीं, जइसे US।"
    },
    "optional": "वैकल्पिक"
  }
};
