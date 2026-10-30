// fr strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale fr
export default {
  "billing": {
    "header": {
      "title": "Informations de facturation",
      "subtitle": "Ces informations figurent sur votre facture. La page de paiement vous demande ensuite votre carte."
    },
    "fields": {
      "firstName": {
        "label": "Prénom",
        "placeholder": "Jean"
      },
      "lastName": {
        "label": "Nom",
        "placeholder": "Dupont"
      },
      "email": {
        "label": "E-mail pour les factures",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "Numéro de téléphone",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "Code pays",
        "placeholder": "FR"
      },
      "address": {
        "label": "Adresse de facturation",
        "placeholder": "123 rue Principale"
      },
      "city": {
        "label": "Ville",
        "placeholder": "Paris"
      },
      "state": {
        "label": "État ou province",
        "placeholder": "San José"
      },
      "zip": {
        "label": "Code postal",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "Deux lettres, par exemple US, MX ou CR.",
      "state": "Facultatif. Laissez vide si votre pays n'en utilise pas.",
      "zip": "Facultatif. Laissez vide si votre adresse n'a pas de code postal."
    },
    "errors": {
      "required": "Remplissez ce champ pour continuer.",
      "email": "Saisissez une adresse e-mail comme nom@example.com.",
      "country": "Saisissez le code pays à deux lettres, par exemple US."
    },
    "optional": "Facultatif"
  }
};
