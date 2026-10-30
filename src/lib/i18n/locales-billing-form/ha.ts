// ha strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale ha
export default {
  "billing": {
    "header": {
      "title": "Bayanan biya",
      "subtitle": "Muna sanya waɗannan bayanan a takardar kuɗinku. Shafin biya zai tambayi katinku na gaba."
    },
    "fields": {
      "firstName": {
        "label": "Sunan farko",
        "placeholder": "Abdul"
      },
      "lastName": {
        "label": "Sunan ƙarshe",
        "placeholder": "Abubakar"
      },
      "email": {
        "label": "Imel don takardun kuɗi",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "Lambar waya",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "Lambar ƙasa",
        "placeholder": "NG"
      },
      "address": {
        "label": "Adireshin biya",
        "placeholder": "123 Main Street"
      },
      "city": {
        "label": "Gari",
        "placeholder": "Abuja"
      },
      "state": {
        "label": "Jiha ko lardi",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "Lambar gidan waya ko ZIP",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "Haruffa biyu, misali US, MX ko CR.",
      "state": "Na zaɓi ne. Bar shi babu komai idan ƙasarku ba ta amfani da shi.",
      "zip": "Na zaɓi ne. Bar shi babu komai idan adireshinku ba shi da lambar gidan waya."
    },
    "errors": {
      "required": "Cike wannan filin don ci gaba.",
      "email": "Shigar da adireshin imel kamar name@example.com.",
      "country": "Shigar da lambar ƙasa mai haruffa biyu, misali US."
    },
    "optional": "Na zaɓi"
  }
};
