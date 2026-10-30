// mr strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale mr
export default {
  "billing": {
    "header": {
      "title": "बिलिंग तपशील",
      "subtitle": "आम्ही हे तपशील तुमच्या इनव्हॉइसवर लिहितो. त्यानंतर पेमेंट पेज तुमच्या कार्डची माहिती विचारेल."
    },
    "fields": {
      "firstName": {
        "label": "पहिले नाव",
        "placeholder": "राज"
      },
      "lastName": {
        "label": "आडनाव",
        "placeholder": "शेट्टी"
      },
      "email": {
        "label": "इनव्हॉइससाठी ईमेल",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "फोन नंबर",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "देशाचा कोड",
        "placeholder": "IN"
      },
      "address": {
        "label": "बिलिंग पत्ता",
        "placeholder": "123 Main Street"
      },
      "city": {
        "label": "शहर",
        "placeholder": "मुंबई"
      },
      "state": {
        "label": "राज्य किंवा प्रांत",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "पिन किंवा ZIP कोड",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "दोन अक्षरे, उदा. US, MX किंवा CR.",
      "state": "ऐच्छिक. तुमच्या देशात राज्य नसेल तर हे रिकामे सोडा.",
      "zip": "ऐच्छिक. तुमच्या पत्त्यात पिन कोड नसेल तर हे रिकामे सोडा."
    },
    "errors": {
      "required": "पुढे जाण्यासाठी हे फील्ड भरा.",
      "email": "name@example.com सारखा ईमेल पत्ता टाका.",
      "country": "देशाचा दोन अक्षरी कोड टाका, उदा. US."
    },
    "optional": "ऐच्छिक"
  }
};
