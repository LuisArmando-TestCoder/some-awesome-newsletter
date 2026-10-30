// no strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale no
export default {
  "welcome": {
    "title": "Velkommen til nyhetsbrevet",
    "invitedBy": "{configuratorId} har invitert deg til å abonnere."
  },
  "email": {
    "title": "Hvor skal vi sende hver utgave?",
    "placeholder": "Din e-post"
  },
  "name": {
    "title": "Hva heter du?",
    "placeholder": "Ditt navn"
  },
  "language": {
    "title": "Hvilket språk vil du lese på?"
  },
  "subscribed": {
    "title": "Du abonnerer nå",
    "subtitle": "Se etter en bekreftelse på e-post i innboksen din.",
    "continueTo": "Fortsett til",
    "finishingUp": "Du kan lukke denne siden."
  },
  "form": {
    "heading": "Abonner på {title}",
    "headingFallback": "Abonner på dette nyhetsbrevet",
    "intro": "Nye utgaver kommer på e-post, skrevet på språket du velger.",
    "from": "Fra {sender}",
    "emailLabel": "E-postadresse",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Fornavn",
    "optional": "valgfritt",
    "nameHint": "Vi bruker det til å hilse på deg. Lar du feltet stå tomt, bruker vi starten av e-postadressen din.",
    "languageLabel": "Språk for utgavene dine",
    "languageSummary": "Utgaver på {language}.",
    "languageChange": "Endre",
    "languageHint": "Vi valgte dette ut fra innstillingene i nettleseren din.",
    "submit": "Abonner",
    "submitting": "Registrerer...",
    "consent": "Når du abonnerer, godtar du å få e-post fra {sender}. Hver e-post har en lenke for å avslutte abonnementet.",
    "privacy": "Personvernerklæring",
    "loadingInfo": "Henter informasjon om nyhetsbrevet"
  },
  "success": {
    "title": "Sjekk innboksen din",
    "body": "Vi har sendt en bekreftelse til {email}. Åpne e-posten og velg Bekreft abonnement.",
    "next": "Den første utgaven kommer etter at du har bekreftet, skrevet på {language}.",
    "spam": "Hvis ingenting kommer i løpet av noen minutter, se i søppelpost eller fanen Kampanjer.",
    "changeEmail": "Bruk en annen e-postadresse",
    "continueTo": "Fortsett til {host}"
  },
  "errors": {
    "emailRequired": "Skriv inn e-postadressen din.",
    "emailInvalid": "Denne e-postadressen ser ufullstendig ut. Sjekk den og prøv igjen.",
    "missingLink": "Denne registreringslenken mangler informasjon. Be avsenderen om en ny lenke.",
    "notFound": "Denne registreringslenken virker ikke lenger. Be avsenderen om en ny lenke.",
    "limit": "Dette nyhetsbrevet kan ikke ta imot nye abonnenter akkurat nå. Prøv igjen senere.",
    "invalid": "Vi kunne ikke godta denne adressen. Sjekk den og prøv igjen.",
    "server": "Vi kunne ikke lagre abonnementet ditt. Prøv igjen om litt.",
    "network": "Vi fikk ikke kontakt med serveren. Sjekk tilkoblingen og prøv igjen."
  },
  "confirm": {
    "title": "Bekreft abonnementet ditt",
    "body": "Velg knappen for å begynne å få utgaver på {email}.",
    "button": "Bekreft abonnement",
    "confirming": "Bekrefter...",
    "consent": "Når du bekrefter, godtar du å få dette nyhetsbrevet på e-post. Du kan avslutte abonnementet fra hvilken som helst utgave.",
    "successTitle": "Du abonnerer nå",
    "successBody": "Nye utgaver kommer til {email}.",
    "successTip": "Legg til avsenderen i kontaktene dine, så havner de ikke i søppelpost.",
    "invalidTitle": "Lenken er ufullstendig",
    "invalidBody": "Åpne bekreftelsen på e-post igjen og velg knappen i den. Finner du den ikke, kan du registrere deg på nytt fra avsenderens side.",
    "notFoundBody": "Vi fant ingen registrering for denne adressen. Registrer deg på nytt fra avsenderens side.",
    "errorBody": "Vi kunne ikke bekrefte abonnementet ditt. Prøv igjen om litt.",
    "retry": "Prøv igjen",
    "home": "Gå til forsiden"
  },
  "embed": {
    "title": "Legg til et registreringsskjema på nettstedet ditt",
    "intro": "Lim inn en av disse kodebitene på nettstedet ditt. De som registrerer seg, får en bekreftelse på e-post og deretter utgavene dine på sitt eget språk.",
    "linkLabel": "Lenke til registreringssiden",
    "linkHint": "Del den i en bio på sosiale medier, en e-postsignatur eller en QR-kode.",
    "scriptLabel": "Script-tagg (anbefalt)",
    "scriptHint": "Lim den inn der skjemaet skal vises. Skjemaet tilpasser størrelsen selv.",
    "iframeLabel": "Iframe",
    "iframeHint": "Bruk denne hvis nettstedet ditt ikke tillater skript.",
    "copy": "Kopier",
    "copied": "Kopiert",
    "copyFailed": "Merk teksten og kopier den manuelt.",
    "options": "Skjemaalternativer",
    "accent": "Knappefarge",
    "accentHint": "La den være som den er for å bruke merkevarefargen din.",
    "theme": "Tema",
    "themeAuto": "Følg innstillingen til den besøkende",
    "themeLight": "Lyst",
    "themeDark": "Mørkt",
    "layout": "Oppsett",
    "layoutFull": "Fullt (tittel, navn og språk)",
    "layoutCompact": "Kompakt (e-post og knapp)",
    "preview": "Forhåndsvisning",
    "previewNote": "Forhåndsvisningen er ekte. En registrering her oppretter en ekte abonnent.",
    "missing": "Opprett et nyhetsbrev først. Registreringsskjemaet vises her når det finnes."
  },
  "page": {
    "poweredBy": "Drevet av AIBAN",
    "title": "Abonner"
  },
  "signature": {
    "title": "E-postsignatur",
    "intro": "Leserne ser dette nederst i hver utgave. Klikk på en del av forhåndsvisningen for å redigere den.",
    "show": "Vis signaturen min i hver utgave",
    "showHint": "Slår du den av, slutter utgavene etter artikkelen.",
    "preview": "Forhåndsvisning",
    "previewEmpty": "Signaturen din er tom. Begynn med å legge til navnet ditt.",
    "articleEnd": "Slutten av artikkelen",
    "tabContent": "Innhold",
    "tabStyle": "Stil",
    "blocks": "Hva som skal være med",
    "blocksHint": "Velg en etikett for å vise eller skjule den delen. Skjulte deler beholder teksten sin.",
    "layout": "Oppsett",
    "layouts": {
      "bar": "Fargestripe",
      "photo": "Bilde",
      "stacked": "Stablet",
      "centered": "Sentrert",
      "minimal": "Bare tekst"
    },
    "fields": {
      "name": "Navn",
      "role": "Stilling",
      "company": "Bedrift",
      "phone": "Telefon",
      "email": "E-post",
      "website": "Nettsted",
      "address": "Adresse",
      "photoUrl": "Bilde",
      "logoUrl": "Logo",
      "socials": "Sosiale lenker",
      "cta": "Knapp",
      "disclaimer": "Juridisk merknad"
    },
    "groups": {
      "about": "Om deg",
      "contact": "Kontakt",
      "images": "Bilder",
      "socials": "Sosiale lenker",
      "cta": "Knapp",
      "disclaimer": "Juridisk merknad"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Gründer",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Storgata 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Bestill en samtale",
      "ctaUrl": "https://"
    },
    "ctaText": "Knappetekst",
    "ctaLink": "Knappelenke",
    "hints": {
      "photoUrl": "Lenke til en kvadratisk PNG eller JPG på minst 144 ganger 144 piksler og under 200 KB. Vises i 72 ganger 72 piksler ved siden av navnet ditt.",
      "logoUrl": "Lenke til en PNG eller JPG med gjennomsiktig eller hvit bakgrunn, minst 64 piksler høy. Vises 32 piksler høy.",
      "website": "Vi legger til https:// hvis du utelater det.",
      "cta": "Knappen vises bare når både tekst og lenke er fylt ut.",
      "disclaimer": "Liten skrift nederst, for eksempel en merknad om taushetsplikt. La feltet stå tomt hvis du ikke trenger det."
    },
    "style": {
      "accent": "Aksentfarge",
      "accentHint": "Brukes til stripen, lenker og knappen. Starter med merkevarefargen din.",
      "font": "Skrift",
      "fontSans": "Uten seriffer",
      "fontSerif": "Med seriffer",
      "size": "Tekststørrelse",
      "sizeMd": "Normal",
      "sizeSm": "Liten",
      "shape": "Bildeform",
      "shapeRound": "Rund",
      "shapeSquare": "Kvadratisk"
    },
    "hidden": "skjult",
    "reset": "Start på nytt",
    "resetConfirm": "Velg igjen for å tømme alle feltene"
  }
};
