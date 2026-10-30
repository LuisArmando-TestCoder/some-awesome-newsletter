// tl strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale tl
export default {
  "billing": {
    "header": {
      "title": "Mga detalye sa billing",
      "subtitle": "Ilalagay namin ang mga detalyeng ito sa invoice mo. Sa susunod, hihingin ng payment page ang card mo."
    },
    "fields": {
      "firstName": {
        "label": "Pangalan",
        "placeholder": "Juan"
      },
      "lastName": {
        "label": "Apelyido",
        "placeholder": "Dela Cruz"
      },
      "email": {
        "label": "Email para sa mga invoice",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "Numero ng telepono",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "Code ng bansa",
        "placeholder": "PH"
      },
      "address": {
        "label": "Address para sa billing",
        "placeholder": "123 Rizal Street"
      },
      "city": {
        "label": "Lungsod",
        "placeholder": "Maynila"
      },
      "state": {
        "label": "Probinsya o estado",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "Postal o ZIP code",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "Dalawang letra, halimbawa US, MX o CR.",
      "state": "Opsyonal. Iwanang blangko kung hindi ito ginagamit sa bansa mo.",
      "zip": "Opsyonal. Iwanang blangko kung walang postal code ang address mo."
    },
    "errors": {
      "required": "Punan ang field na ito para makapagpatuloy.",
      "email": "Maglagay ng email address gaya ng pangalan@example.com.",
      "country": "Ilagay ang dalawang letrang country code, halimbawa US."
    },
    "optional": "Opsyonal"
  }
};
