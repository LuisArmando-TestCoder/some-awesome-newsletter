// nl strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale nl
export default {
  "welcome": {
    "title": "Welkom bij de nieuwsbrief",
    "invitedBy": "{configuratorId} heeft je uitgenodigd om je in te schrijven."
  },
  "email": {
    "title": "Waar mogen we elke editie naartoe sturen?",
    "placeholder": "Je e-mail"
  },
  "name": {
    "title": "Wat is je naam?",
    "placeholder": "Je naam"
  },
  "language": {
    "title": "In welke taal wil je lezen?"
  },
  "subscribed": {
    "title": "Je bent ingeschreven",
    "subtitle": "Kijk in je inbox voor een bevestigingsmail.",
    "continueTo": "Ga door naar",
    "finishingUp": "Je kunt deze pagina sluiten."
  },
  "form": {
    "heading": "Inschrijven voor {title}",
    "headingFallback": "Inschrijven voor deze nieuwsbrief",
    "intro": "Nieuwe edities komen per e-mail binnen, geschreven in de taal die je kiest.",
    "from": "Van {sender}",
    "emailLabel": "E-mailadres",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Voornaam",
    "optional": "optioneel",
    "nameHint": "We gebruiken je naam om je te begroeten. Laat je het leeg, dan gebruiken we het begin van je e-mailadres.",
    "languageLabel": "Taal van je edities",
    "languageSummary": "Edities in het {language}.",
    "languageChange": "Wijzigen",
    "languageHint": "We hebben dit gekozen op basis van je browserinstellingen.",
    "submit": "Inschrijven",
    "submitting": "Bezig met inschrijven...",
    "consent": "Door je in te schrijven ga je akkoord met e-mails van {sender}. Elke e-mail bevat een link om je uit te schrijven.",
    "privacy": "Privacybeleid",
    "loadingInfo": "Gegevens van de nieuwsbrief laden"
  },
  "success": {
    "title": "Kijk in je inbox",
    "body": "We hebben een bevestigingsmail gestuurd naar {email}. Open die en kies Inschrijving bevestigen.",
    "next": "Je eerste editie komt nadat je hebt bevestigd, geschreven in het {language}.",
    "spam": "Komt er binnen een paar minuten niets binnen? Kijk dan in je map Spam of Reclame.",
    "changeEmail": "Ander e-mailadres gebruiken",
    "continueTo": "Verder naar {host}"
  },
  "errors": {
    "emailRequired": "Vul je e-mailadres in.",
    "emailInvalid": "Dit e-mailadres lijkt onvolledig. Controleer het en probeer het opnieuw.",
    "missingLink": "Deze inschrijflink mist informatie. Vraag de afzender om een nieuwe link.",
    "notFound": "Deze inschrijflink werkt niet meer. Vraag de afzender om een nieuwe link.",
    "limit": "Deze nieuwsbrief kan op dit moment geen nieuwe abonnees aannemen. Probeer het later opnieuw.",
    "invalid": "We konden dit adres niet accepteren. Controleer het en probeer het opnieuw.",
    "server": "We konden je inschrijving niet opslaan. Probeer het zo meteen opnieuw.",
    "network": "We konden de server niet bereiken. Controleer je verbinding en probeer het opnieuw."
  },
  "confirm": {
    "title": "Bevestig je inschrijving",
    "body": "Kies de knop om edities te ontvangen op {email}.",
    "button": "Inschrijving bevestigen",
    "confirming": "Bezig met bevestigen...",
    "consent": "Door te bevestigen ga je akkoord met het ontvangen van deze nieuwsbrief per e-mail. Je kunt je vanuit elke editie uitschrijven.",
    "successTitle": "Je bent ingeschreven",
    "successBody": "Nieuwe edities komen binnen op {email}.",
    "successTip": "Voeg de afzender toe aan je contacten, dan komen ze niet in je spam terecht.",
    "invalidTitle": "Deze link is onvolledig",
    "invalidBody": "Open de bevestigingsmail opnieuw en kies de knop daarin. Kun je de mail niet vinden, schrijf je dan opnieuw in via de pagina van de afzender.",
    "notFoundBody": "We konden geen inschrijving voor dit adres vinden. Schrijf je opnieuw in via de pagina van de afzender.",
    "errorBody": "We konden je inschrijving niet bevestigen. Probeer het zo meteen opnieuw.",
    "retry": "Opnieuw proberen",
    "home": "Naar de startpagina"
  },
  "embed": {
    "title": "Een inschrijfformulier aan je site toevoegen",
    "intro": "Plak een van deze codes in je website. Wie zich inschrijft, krijgt een bevestigingsmail en daarna je edities in de eigen taal.",
    "linkLabel": "Link naar de inschrijfpagina",
    "linkHint": "Deel hem in een bio op sociale media, een e-mailhandtekening of een QR-code.",
    "scriptLabel": "Scripttag (aanbevolen)",
    "scriptHint": "Plak hem waar het formulier moet verschijnen. Het formulier past zijn grootte zelf aan.",
    "iframeLabel": "Iframe",
    "iframeHint": "Gebruik dit als je site geen scripts toestaat.",
    "copy": "Kopiëren",
    "copied": "Gekopieerd",
    "copyFailed": "Selecteer de tekst en kopieer hem zelf.",
    "options": "Formulieropties",
    "accent": "Knopkleur",
    "accentHint": "Laat dit zo om je merkkleur te gebruiken.",
    "theme": "Thema",
    "themeAuto": "Instelling van de bezoeker volgen",
    "themeLight": "Licht",
    "themeDark": "Donker",
    "layout": "Indeling",
    "layoutFull": "Volledig (titel, naam en taal)",
    "layoutCompact": "Compact (e-mail en knop)",
    "preview": "Voorbeeld",
    "previewNote": "Het voorbeeld is live. Een inschrijving hier maakt een echte abonnee aan.",
    "missing": "Maak eerst een nieuwsbrief. Het inschrijfformulier verschijnt hier zodra die bestaat."
  },
  "page": {
    "poweredBy": "Draait op AIBAN",
    "title": "Inschrijven"
  },
  "signature": {
    "title": "E-mailhandtekening",
    "intro": "Lezers zien dit aan het eind van elke editie. Klik op een deel van het voorbeeld om het te bewerken.",
    "show": "Mijn handtekening in elke editie tonen",
    "showHint": "Zet je dit uit, dan eindigen edities na het artikel.",
    "preview": "Voorbeeld",
    "previewEmpty": "Je handtekening is leeg. Voeg je naam toe om te beginnen.",
    "articleEnd": "Einde van het artikel",
    "tabContent": "Inhoud",
    "tabStyle": "Stijl",
    "blocks": "Wat je wilt tonen",
    "blocksHint": "Kies een label om dat deel te tonen of te verbergen. Verborgen delen houden hun tekst.",
    "layout": "Indeling",
    "layouts": {
      "bar": "Kleurbalk",
      "photo": "Foto",
      "stacked": "Gestapeld",
      "centered": "Gecentreerd",
      "minimal": "Alleen tekst"
    },
    "fields": {
      "name": "Naam",
      "role": "Functie",
      "company": "Bedrijf",
      "phone": "Telefoon",
      "email": "E-mail",
      "website": "Website",
      "address": "Adres",
      "photoUrl": "Foto",
      "logoUrl": "Logo",
      "socials": "Sociale links",
      "cta": "Knop",
      "disclaimer": "Juridische tekst"
    },
    "groups": {
      "about": "Over jou",
      "contact": "Contact",
      "images": "Afbeeldingen",
      "socials": "Sociale links",
      "cta": "Knop",
      "disclaimer": "Juridische tekst"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Oprichter",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Hoofdstraat 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Plan een gesprek",
      "ctaUrl": "https://"
    },
    "ctaText": "Knoptekst",
    "ctaLink": "Knoplink",
    "hints": {
      "photoUrl": "Link naar een vierkante PNG of JPG van minstens 144 bij 144 pixels en kleiner dan 200 KB. Wordt getoond op 72 bij 72 pixels naast je naam.",
      "logoUrl": "Link naar een PNG of JPG met een transparante of witte achtergrond, minstens 64 pixels hoog. Wordt 32 pixels hoog getoond.",
      "website": "We voegen https:// toe als je het weglaat.",
      "cta": "De knop verschijnt alleen als je zowel de tekst als de link invult.",
      "disclaimer": "Kleine lettertjes onderaan, bijvoorbeeld een vertrouwelijkheidsmelding. Laat het leeg als je er geen nodig hebt."
    },
    "style": {
      "accent": "Accentkleur",
      "accentHint": "Gebruikt voor de balk, links en de knop. Begint met je merkkleur.",
      "font": "Lettertype",
      "fontSans": "Schreefloos",
      "fontSerif": "Schreef",
      "size": "Tekstgrootte",
      "sizeMd": "Normaal",
      "sizeSm": "Klein",
      "shape": "Vorm van de foto",
      "shapeRound": "Rond",
      "shapeSquare": "Vierkant"
    },
    "hidden": "verborgen",
    "reset": "Opnieuw beginnen",
    "resetConfirm": "Kies nogmaals om alle velden te wissen"
  }
};
