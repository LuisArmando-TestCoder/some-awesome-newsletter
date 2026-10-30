// gu strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale gu
export default {
  "billing": {
    "header": {
      "title": "બિલિંગની વિગતો",
      "subtitle": "આ વિગતો અમે તમારા ઇનવોઇસ પર મૂકીએ છીએ. પછી પેમેન્ટ પેજ પર તમારા કાર્ડની વિગતો પૂછાશે."
    },
    "fields": {
      "firstName": {
        "label": "પહેલું નામ",
        "placeholder": "રહુલ"
      },
      "lastName": {
        "label": "અટક",
        "placeholder": "પટેલ"
      },
      "email": {
        "label": "ઇનવોઇસ માટે ઇમેઇલ",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "ફોન નંબર",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "દેશનો કોડ",
        "placeholder": "IN"
      },
      "address": {
        "label": "બિલિંગ સરનામું",
        "placeholder": "123 Main Street"
      },
      "city": {
        "label": "શહેર",
        "placeholder": "અમદાવાદ"
      },
      "state": {
        "label": "રાજ્ય કે પ્રાંત",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "પોસ્ટલ કે ZIP કોડ",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "બે અક્ષર, જેમ કે US, MX કે CR.",
      "state": "વૈકલ્પિક. તમારા દેશમાં તે વપરાતું ન હોય તો ખાલી રાખો.",
      "zip": "વૈકલ્પિક. તમારા સરનામામાં પોસ્ટલ કોડ ન હોય તો ખાલી રાખો."
    },
    "errors": {
      "required": "આગળ વધવા આ ફીલ્ડ ભરો.",
      "email": "name@example.com જેવું ઇમેઇલ સરનામું દાખલ કરો.",
      "country": "બે અક્ષરનો દેશનો કોડ દાખલ કરો, જેમ કે US."
    },
    "optional": "વૈકલ્પિક"
  }
};
