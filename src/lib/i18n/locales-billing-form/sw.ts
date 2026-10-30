// sw strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale sw
export default {
  "billing": {
    "header": {
      "title": "Maelezo ya malipo",
      "subtitle": "Tunaweka maelezo haya kwenye ankara yako. Kisha ukurasa wa malipo utaomba kadi yako."
    },
    "fields": {
      "firstName": {
        "label": "Jina la kwanza",
        "placeholder": "Amina"
      },
      "lastName": {
        "label": "Jina la ukoo",
        "placeholder": "Mwangi"
      },
      "email": {
        "label": "Barua pepe ya ankara",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "Namba ya simu",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "Msimbo wa nchi",
        "placeholder": "KE"
      },
      "address": {
        "label": "Anwani ya malipo",
        "placeholder": "Barabara ya Uhuru 123"
      },
      "city": {
        "label": "Jiji",
        "placeholder": "Nairobi"
      },
      "state": {
        "label": "Mkoa au jimbo",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "Msimbo wa posta",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "Herufi mbili, kwa mfano US, MX au CR.",
      "state": "Si lazima. Acha wazi kama nchi yako haitumii.",
      "zip": "Si lazima. Acha wazi kama anwani yako haina msimbo wa posta."
    },
    "errors": {
      "required": "Jaza sehemu hii ili kuendelea.",
      "email": "Weka anwani ya barua pepe kama jina@example.com.",
      "country": "Weka msimbo wa nchi wa herufi mbili, kwa mfano US."
    },
    "optional": "Si lazima"
  }
};
