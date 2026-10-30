// am strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale am
export default {
  "billing": {
    "header": {
      "title": "የክፍያ ዝርዝሮች",
      "subtitle": "እነዚህን ዝርዝሮች በደረሰኝዎ ላይ እናስቀምጣለን። ቀጥሎ የክፍያ ገጹ ካርድዎን ይጠይቃል።"
    },
    "fields": {
      "firstName": {
        "label": "የመጀመሪያ ስም",
        "placeholder": "ሀይለ"
      },
      "lastName": {
        "label": "የአባት ስም",
        "placeholder": "ደስታ"
      },
      "email": {
        "label": "ለደረሰኞች የሚሆን ኢሜል",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "ስልክ ቁጥር",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "የሀገር ኮድ",
        "placeholder": "ET"
      },
      "address": {
        "label": "የክፍያ አድራሻ",
        "placeholder": "123 Main Street"
      },
      "city": {
        "label": "ከተማ",
        "placeholder": "አዲስ አበባ"
      },
      "state": {
        "label": "ክልል ወይም አውራጃ",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "የፖስታ ኮድ",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "ሁለት ፊደላት፣ ለምሳሌ US፣ MX ወይም CR።",
      "state": "አማራጭ ነው። ሀገርዎ የማይጠቀምበት ከሆነ ባዶ ይተዉት።",
      "zip": "አማራጭ ነው። አድራሻዎ የፖስታ ኮድ ከሌለው ባዶ ይተዉት።"
    },
    "errors": {
      "required": "ለመቀጠል ይህን መስክ ይሙሉ።",
      "email": "እንደ name@example.com ያለ የኢሜል አድራሻ ያስገቡ።",
      "country": "ባለ ሁለት ፊደል የሀገር ኮድ ያስገቡ፣ ለምሳሌ US።"
    },
    "optional": "አማራጭ"
  }
};
