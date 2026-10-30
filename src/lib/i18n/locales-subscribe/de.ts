// de strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale de
export default {
  "welcome": {
    "title": "Willkommen beim Newsletter",
    "invitedBy": "{configuratorId} hat Sie zum Abonnieren eingeladen."
  },
  "email": {
    "title": "Wohin sollen wir jede Ausgabe senden?",
    "placeholder": "Deine E-Mail"
  },
  "name": {
    "title": "Wie heißen Sie?",
    "placeholder": "Dein Name"
  },
  "language": {
    "title": "In welcher Sprache möchten Sie lesen?"
  },
  "subscribed": {
    "title": "Sie sind angemeldet",
    "subtitle": "In Ihrem Posteingang wartet eine Bestätigungs-E-Mail.",
    "continueTo": "Weiter zu",
    "finishingUp": "Sie können diese Seite schließen."
  },
  "form": {
    "heading": "{title} abonnieren",
    "headingFallback": "Diesen Newsletter abonnieren",
    "intro": "Neue Ausgaben kommen per E-Mail, in der Sprache, die Sie wählen.",
    "from": "Von {sender}",
    "emailLabel": "E-Mail-Adresse",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Vorname",
    "optional": "optional",
    "nameHint": "Damit begrüßen wir Sie. Wenn Sie das Feld leer lassen, verwenden wir den Anfang Ihrer E-Mail-Adresse.",
    "languageLabel": "Sprache Ihrer Ausgaben",
    "languageSummary": "Ausgaben auf {language}.",
    "languageChange": "Ändern",
    "languageHint": "Diese Sprache haben wir aus Ihren Browsereinstellungen übernommen.",
    "submit": "Abonnieren",
    "submitting": "Wird abonniert...",
    "consent": "Mit dem Abonnieren stimmen Sie zu, E-Mails von {sender} zu erhalten. Jede E-Mail enthält einen Link zum Abmelden.",
    "privacy": "Datenschutzerklärung",
    "loadingInfo": "Newsletter-Details werden geladen"
  },
  "success": {
    "title": "Prüfen Sie Ihren Posteingang",
    "body": "Wir haben eine Bestätigungs-E-Mail an {email} gesendet. Öffnen Sie sie und wählen Sie Abonnement bestätigen.",
    "next": "Ihre erste Ausgabe kommt nach der Bestätigung, auf {language}.",
    "spam": "Wenn innerhalb weniger Minuten nichts ankommt, sehen Sie im Spam- oder Werbung-Ordner nach.",
    "changeEmail": "Andere E-Mail-Adresse verwenden",
    "continueTo": "Weiter zu {host}"
  },
  "errors": {
    "emailRequired": "Geben Sie Ihre E-Mail-Adresse ein.",
    "emailInvalid": "Diese E-Mail-Adresse scheint unvollständig zu sein. Prüfen Sie sie und versuchen Sie es erneut.",
    "missingLink": "In diesem Anmeldelink fehlen Angaben. Bitten Sie den Absender um einen neuen Link.",
    "notFound": "Dieser Anmeldelink funktioniert nicht mehr. Bitten Sie den Absender um einen neuen Link.",
    "limit": "Dieser Newsletter kann gerade keine neuen Abonnenten aufnehmen. Versuchen Sie es später erneut.",
    "invalid": "Diese Adresse konnten wir nicht annehmen. Prüfen Sie sie und versuchen Sie es erneut.",
    "server": "Ihr Abonnement konnte nicht gespeichert werden. Versuchen Sie es gleich noch einmal.",
    "network": "Der Server ist nicht erreichbar. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut."
  },
  "confirm": {
    "title": "Bestätigen Sie Ihr Abonnement",
    "body": "Wählen Sie die Schaltfläche, um Ausgaben an {email} zu erhalten.",
    "button": "Abonnement bestätigen",
    "confirming": "Wird bestätigt...",
    "consent": "Mit der Bestätigung stimmen Sie zu, diesen Newsletter per E-Mail zu erhalten. Sie können sich über jede Ausgabe abmelden.",
    "successTitle": "Sie sind angemeldet",
    "successBody": "Neue Ausgaben kommen an {email}.",
    "successTip": "Damit sie nicht im Spam landen, fügen Sie den Absender zu Ihren Kontakten hinzu.",
    "invalidTitle": "Dieser Link ist unvollständig",
    "invalidBody": "Öffnen Sie die Bestätigungs-E-Mail noch einmal und wählen Sie die Schaltfläche darin. Wenn Sie sie nicht finden, melden Sie sich über die Seite des Absenders erneut an.",
    "notFoundBody": "Für diese Adresse haben wir keine Anmeldung gefunden. Melden Sie sich über die Seite des Absenders erneut an.",
    "errorBody": "Ihr Abonnement konnte nicht bestätigt werden. Versuchen Sie es gleich noch einmal.",
    "retry": "Erneut versuchen",
    "home": "Zur Startseite"
  },
  "embed": {
    "title": "Anmeldeformular auf Ihrer Website einbinden",
    "intro": "Fügen Sie eines dieser Code-Snippets in Ihre Website ein. Wer sich anmeldet, erhält eine Bestätigungs-E-Mail und danach Ihre Ausgaben in der eigenen Sprache.",
    "linkLabel": "Link zur Anmeldeseite",
    "linkHint": "Teilen Sie ihn in einer Social-Media-Bio, einer E-Mail-Signatur oder als QR-Code.",
    "scriptLabel": "Script-Tag (empfohlen)",
    "scriptHint": "Fügen Sie ihn dort ein, wo das Formular erscheinen soll. Das Formular passt seine Größe selbst an.",
    "iframeLabel": "Iframe",
    "iframeHint": "Verwenden Sie dies, wenn Ihre Website keine Skripte erlaubt.",
    "copy": "Kopieren",
    "copied": "Kopiert",
    "copyFailed": "Markieren Sie den Text und kopieren Sie ihn manuell.",
    "options": "Formularoptionen",
    "accent": "Farbe der Schaltfläche",
    "accentHint": "Lassen Sie den Wert unverändert, um Ihre Markenfarbe zu verwenden.",
    "theme": "Design",
    "themeAuto": "Einstellung des Besuchers übernehmen",
    "themeLight": "Hell",
    "themeDark": "Dunkel",
    "layout": "Layout",
    "layoutFull": "Vollständig (Titel, Name und Sprache)",
    "layoutCompact": "Kompakt (E-Mail und Schaltfläche)",
    "preview": "Vorschau",
    "previewNote": "Die Vorschau ist live. Eine Anmeldung hier erzeugt einen echten Abonnenten.",
    "missing": "Erstellen Sie zuerst einen Newsletter. Das Anmeldeformular erscheint hier, sobald er existiert."
  },
  "page": {
    "poweredBy": "Läuft mit AIBAN",
    "title": "Abonnieren"
  },
  "signature": {
    "title": "E-Mail-Signatur",
    "intro": "Leser sehen sie am Ende jeder Ausgabe. Klicken Sie auf einen beliebigen Teil der Vorschau, um ihn zu bearbeiten.",
    "show": "Meine Signatur in jeder Ausgabe anzeigen",
    "showHint": "Wenn Sie sie ausschalten, enden die Ausgaben nach dem Artikel.",
    "preview": "Vorschau",
    "previewEmpty": "Ihre Signatur ist leer. Fügen Sie zuerst Ihren Namen hinzu.",
    "articleEnd": "Ende des Artikels",
    "tabContent": "Inhalt",
    "tabStyle": "Stil",
    "blocks": "Was enthalten sein soll",
    "blocksHint": "Wählen Sie ein Element, um diesen Teil ein- oder auszublenden. Ausgeblendete Teile behalten ihren Text.",
    "layout": "Layout",
    "layouts": {
      "bar": "Farbbalken",
      "photo": "Foto",
      "stacked": "Gestapelt",
      "centered": "Zentriert",
      "minimal": "Nur Text"
    },
    "fields": {
      "name": "Name",
      "role": "Berufsbezeichnung",
      "company": "Firma",
      "phone": "Telefon",
      "email": "E-Mail",
      "website": "Website",
      "address": "Adresse",
      "photoUrl": "Foto",
      "logoUrl": "Logo",
      "socials": "Social-Media-Links",
      "cta": "Schaltfläche",
      "disclaimer": "Rechtlicher Hinweis"
    },
    "groups": {
      "about": "Über Sie",
      "contact": "Kontakt",
      "images": "Bilder",
      "socials": "Social-Media-Links",
      "cta": "Schaltfläche",
      "disclaimer": "Rechtlicher Hinweis"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Gründerin",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Hauptstraße 120, Musterstadt",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Termin buchen",
      "ctaUrl": "https://"
    },
    "ctaText": "Text der Schaltfläche",
    "ctaLink": "Link der Schaltfläche",
    "hints": {
      "photoUrl": "Link zu einem quadratischen PNG oder JPG, mindestens 144 x 144 Pixel und unter 200 KB. Wird mit 72 x 72 Pixeln neben Ihrem Namen angezeigt.",
      "logoUrl": "Link zu einem PNG oder JPG mit transparentem oder weißem Hintergrund, mindestens 64 Pixel hoch. Wird 32 Pixel hoch angezeigt.",
      "website": "Wenn Sie https:// weglassen, ergänzen wir es.",
      "cta": "Damit die Schaltfläche erscheint, brauchen Sie sowohl Text als auch Link.",
      "disclaimer": "Kleingedrucktes am Ende, zum Beispiel ein Vertraulichkeitshinweis. Lassen Sie das Feld leer, wenn Sie keinen brauchen."
    },
    "style": {
      "accent": "Akzentfarbe",
      "accentHint": "Für den Balken, die Links und die Schaltfläche. Startet mit Ihrer Markenfarbe.",
      "font": "Schriftart",
      "fontSans": "Serifenlos",
      "fontSerif": "Mit Serifen",
      "size": "Textgröße",
      "sizeMd": "Normal",
      "sizeSm": "Klein",
      "shape": "Fotoform",
      "shapeRound": "Rund",
      "shapeSquare": "Quadratisch"
    },
    "hidden": "ausgeblendet",
    "reset": "Von vorn beginnen",
    "resetConfirm": "Erneut wählen, um alle Felder zu leeren"
  }
};
