// it strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale it
export default {
  "billing": {
    "header": {
      "title": "Dati di fatturazione",
      "subtitle": "Inseriamo questi dati nella tua fattura. Nella pagina di pagamento ti verrà poi chiesta la carta."
    },
    "fields": {
      "firstName": {
        "label": "Nome",
        "placeholder": "Mario"
      },
      "lastName": {
        "label": "Cognome",
        "placeholder": "Rossi"
      },
      "email": {
        "label": "Email per le fatture",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "Numero di telefono",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "Codice del paese",
        "placeholder": "IT"
      },
      "address": {
        "label": "Indirizzo di fatturazione",
        "placeholder": "Via Roma 123"
      },
      "city": {
        "label": "Città",
        "placeholder": "Roma"
      },
      "state": {
        "label": "Provincia o regione",
        "placeholder": "Milano"
      },
      "zip": {
        "label": "CAP",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "Due lettere, per esempio IT, US o MX.",
      "state": "Facoltativo. Lascialo vuoto se il tuo paese non lo prevede.",
      "zip": "Facoltativo. Lascialo vuoto se il tuo indirizzo non ha un codice postale."
    },
    "errors": {
      "required": "Compila questo campo per continuare.",
      "email": "Inserisci un indirizzo email come nome@esempio.com.",
      "country": "Inserisci il codice del paese di due lettere, per esempio IT."
    },
    "optional": "Facoltativo"
  }
};
