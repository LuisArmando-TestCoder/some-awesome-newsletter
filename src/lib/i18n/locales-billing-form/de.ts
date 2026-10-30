// de strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale de
export default {
  "billing": {
    "header": {
      "title": "Rechnungsdaten",
      "subtitle": "Diese Angaben stehen auf Ihrer Rechnung. Auf der Zahlungsseite werden Sie anschließend nach Ihrer Karte gefragt."
    },
    "fields": {
      "firstName": {
        "label": "Vorname",
        "placeholder": "Max"
      },
      "lastName": {
        "label": "Nachname",
        "placeholder": "Muster"
      },
      "email": {
        "label": "E-Mail für Rechnungen",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "Telefonnummer",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "Ländercode",
        "placeholder": "DE"
      },
      "address": {
        "label": "Rechnungsadresse",
        "placeholder": "Hauptstraße 123"
      },
      "city": {
        "label": "Stadt",
        "placeholder": "Berlin"
      },
      "state": {
        "label": "Bundesland oder Region",
        "placeholder": "Bayern"
      },
      "zip": {
        "label": "Postleitzahl",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "Zwei Buchstaben, zum Beispiel DE, AT oder CH.",
      "state": "Optional. Lassen Sie das Feld leer, wenn Ihr Land das nicht verwendet.",
      "zip": "Optional. Lassen Sie das Feld leer, wenn Ihre Adresse keine Postleitzahl hat."
    },
    "errors": {
      "required": "Füllen Sie dieses Feld aus, um fortzufahren.",
      "email": "Geben Sie eine E-Mail-Adresse wie name@example.com ein.",
      "country": "Geben Sie den zweistelligen Ländercode ein, zum Beispiel DE."
    },
    "optional": "Optional"
  }
};
