// pcm strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale pcm
export default {
  "billing": {
    "header": {
      "title": "Payment details",
      "subtitle": "We dey put these details for your invoice. The payment page go ask for your card next."
    },
    "fields": {
      "firstName": {
        "label": "First name",
        "placeholder": "Chinedu"
      },
      "lastName": {
        "label": "Surname",
        "placeholder": "Okafor"
      },
      "email": {
        "label": "Email for invoices",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "Phone number",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "Country code",
        "placeholder": "NG"
      },
      "address": {
        "label": "Billing address",
        "placeholder": "123 Main Street"
      },
      "city": {
        "label": "City",
        "placeholder": "Lagos"
      },
      "state": {
        "label": "State or province",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "Postal or ZIP code",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "Two letters, like US, MX or CR.",
      "state": "You fit leave am. Leave am empty if your country no dey use am.",
      "zip": "You fit leave am. Leave am empty if your address no get postal code."
    },
    "errors": {
      "required": "Fill dis field to continue.",
      "email": "Put email address like name@example.com.",
      "country": "Put the two letter country code, like US."
    },
    "optional": "You fit leave am"
  }
};
