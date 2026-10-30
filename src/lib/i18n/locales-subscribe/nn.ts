// nn strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale nn
export default {
  "welcome": {
    "title": "Velkomen til nyheitsbrevet",
    "invitedBy": "{configuratorId} har invitert deg til å abonnere."
  },
  "email": {
    "title": "Kvar skal vi sende kvar utgåve?",
    "placeholder": "Din e-post"
  },
  "name": {
    "title": "Kva heiter du?",
    "placeholder": "Ditt namn"
  },
  "language": {
    "title": "Kva språk vil du lese på?"
  },
  "subscribed": {
    "title": "No abonnerer du",
    "subtitle": "Sjå etter ei stadfesting på e-post i innboksen din.",
    "continueTo": "Hald fram til",
    "finishingUp": "Du kan lukke denne sida."
  },
  "form": {
    "heading": "Abonner på {title}",
    "headingFallback": "Abonner på dette nyheitsbrevet",
    "intro": "Nye utgåver kjem på e-post, skrivne på språket du vel.",
    "from": "Frå {sender}",
    "emailLabel": "E-postadresse",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Førenamn",
    "optional": "valfritt",
    "nameHint": "Vi brukar det til å helse på deg. Lèt du feltet stå tomt, brukar vi starten av e-postadressa di.",
    "languageLabel": "Språk for utgåvene dine",
    "languageSummary": "Utgåver på {language}.",
    "languageChange": "Endre",
    "languageHint": "Vi valde dette ut frå innstillingane i nettlesaren din.",
    "submit": "Abonner",
    "submitting": "Registrerer...",
    "consent": "Når du abonnerer, godtek du å få e-post frå {sender}. Kvar e-post har ei lenkje for å avslutte abonnementet.",
    "privacy": "Personvernerklæring",
    "loadingInfo": "Hentar informasjon om nyheitsbrevet"
  },
  "success": {
    "title": "Sjekk innboksen din",
    "body": "Vi har sendt ei stadfesting til {email}. Opne e-posten og vel Stadfest abonnement.",
    "next": "Den første utgåva kjem etter at du har stadfesta, skriven på {language}.",
    "spam": "Viss ingenting kjem i løpet av nokre minutt, sjå i søppelpost eller fana Kampanjar.",
    "changeEmail": "Bruk ei anna e-postadresse",
    "continueTo": "Hald fram til {host}"
  },
  "errors": {
    "emailRequired": "Skriv inn e-postadressa di.",
    "emailInvalid": "Denne e-postadressa ser ufullstendig ut. Sjekk ho og prøv igjen.",
    "missingLink": "Denne registreringslenkja manglar informasjon. Be avsendaren om ei ny lenkje.",
    "notFound": "Denne registreringslenkja verkar ikkje lenger. Be avsendaren om ei ny lenkje.",
    "limit": "Dette nyheitsbrevet kan ikkje ta imot nye abonnentar akkurat no. Prøv igjen seinare.",
    "invalid": "Vi kunne ikkje godta denne adressa. Sjekk ho og prøv igjen.",
    "server": "Vi kunne ikkje lagre abonnementet ditt. Prøv igjen om litt.",
    "network": "Vi fekk ikkje kontakt med tenaren. Sjekk tilkoplinga og prøv igjen."
  },
  "confirm": {
    "title": "Stadfest abonnementet ditt",
    "body": "Vel knappen for å byrje å få utgåver på {email}.",
    "button": "Stadfest abonnement",
    "confirming": "Stadfestar...",
    "consent": "Når du stadfestar, godtek du å få dette nyheitsbrevet på e-post. Du kan avslutte abonnementet frå kva utgåve som helst.",
    "successTitle": "No abonnerer du",
    "successBody": "Nye utgåver kjem til {email}.",
    "successTip": "Legg til avsendaren i kontaktane dine, så hamnar dei ikkje i søppelpost.",
    "invalidTitle": "Lenkja er ufullstendig",
    "invalidBody": "Opne stadfestinga på e-post igjen og vel knappen i ho. Finn du ho ikkje, kan du registrere deg på nytt frå sida til avsendaren.",
    "notFoundBody": "Vi fann inga registrering for denne adressa. Registrer deg på nytt frå sida til avsendaren.",
    "errorBody": "Vi kunne ikkje stadfeste abonnementet ditt. Prøv igjen om litt.",
    "retry": "Prøv igjen",
    "home": "Gå til framsida"
  },
  "embed": {
    "title": "Legg til eit registreringsskjema på nettstaden din",
    "intro": "Lim inn ein av desse kodebitane på nettstaden din. Dei som registrerer seg, får ei stadfesting på e-post og deretter utgåvene dine på sitt eige språk.",
    "linkLabel": "Lenkje til registreringssida",
    "linkHint": "Del ho i ein bio på sosiale medium, ein e-postsignatur eller ein QR-kode.",
    "scriptLabel": "Script-tagg (tilrådd)",
    "scriptHint": "Lim han inn der skjemaet skal visast. Skjemaet tilpassar storleiken sjølv.",
    "iframeLabel": "Iframe",
    "iframeHint": "Bruk denne viss nettstaden din ikkje tillèt skript.",
    "copy": "Kopier",
    "copied": "Kopiert",
    "copyFailed": "Merk teksten og kopier han manuelt.",
    "options": "Skjemaval",
    "accent": "Knappefarge",
    "accentHint": "La han vere som han er for å bruke merkevarefargen din.",
    "theme": "Tema",
    "themeAuto": "Følg innstillinga til den besøkjande",
    "themeLight": "Lyst",
    "themeDark": "Mørkt",
    "layout": "Oppsett",
    "layoutFull": "Fullt (tittel, namn og språk)",
    "layoutCompact": "Kompakt (e-post og knapp)",
    "preview": "Førehandsvising",
    "previewNote": "Førehandsvisinga er ekte. Ei registrering her opprettar ein ekte abonnent.",
    "missing": "Opprett eit nyheitsbrev først. Registreringsskjemaet blir vist her når det finst."
  },
  "page": {
    "poweredBy": "Driven av AIBAN",
    "title": "Abonner"
  },
  "signature": {
    "title": "E-postsignatur",
    "intro": "Lesarane ser dette nedst i kvar utgåve. Klikk på ein del av førehandsvisinga for å redigere han.",
    "show": "Vis signaturen min i kvar utgåve",
    "showHint": "Slår du han av, sluttar utgåvene etter artikkelen.",
    "preview": "Førehandsvising",
    "previewEmpty": "Signaturen din er tom. Byrj med å leggje til namnet ditt.",
    "articleEnd": "Slutten av artikkelen",
    "tabContent": "Innhald",
    "tabStyle": "Stil",
    "blocks": "Kva som skal vere med",
    "blocksHint": "Vel ein etikett for å vise eller skjule den delen. Skjulte delar held på teksten sin.",
    "layout": "Oppsett",
    "layouts": {
      "bar": "Fargestripe",
      "photo": "Bilete",
      "stacked": "Stabla",
      "centered": "Sentrert",
      "minimal": "Berre tekst"
    },
    "fields": {
      "name": "Namn",
      "role": "Stilling",
      "company": "Bedrift",
      "phone": "Telefon",
      "email": "E-post",
      "website": "Nettstad",
      "address": "Adresse",
      "photoUrl": "Bilete",
      "logoUrl": "Logo",
      "socials": "Sosiale lenkjer",
      "cta": "Knapp",
      "disclaimer": "Juridisk merknad"
    },
    "groups": {
      "about": "Om deg",
      "contact": "Kontakt",
      "images": "Bilete",
      "socials": "Sosiale lenkjer",
      "cta": "Knapp",
      "disclaimer": "Juridisk merknad"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Grunnleggjar",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Storgata 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Bestill ein samtale",
      "ctaUrl": "https://"
    },
    "ctaText": "Knappetekst",
    "ctaLink": "Knappelenkje",
    "hints": {
      "photoUrl": "Lenkje til ein kvadratisk PNG eller JPG på minst 144 gonger 144 pikslar og under 200 KB. Blir vist i 72 gonger 72 pikslar ved sida av namnet ditt.",
      "logoUrl": "Lenkje til ein PNG eller JPG med gjennomsiktig eller kvit bakgrunn, minst 64 pikslar høg. Blir vist 32 pikslar høg.",
      "website": "Vi legg til https:// viss du utelèt det.",
      "cta": "Knappen blir berre vist når både tekst og lenkje er fylte ut.",
      "disclaimer": "Liten skrift nedst, til dømes ein merknad om teieplikt. La feltet stå tomt viss du ikkje treng det."
    },
    "style": {
      "accent": "Aksentfarge",
      "accentHint": "Blir brukt til stripa, lenkjer og knappen. Startar med merkevarefargen din.",
      "font": "Skrift",
      "fontSans": "Utan seriffar",
      "fontSerif": "Med seriffar",
      "size": "Tekststorleik",
      "sizeMd": "Normal",
      "sizeSm": "Liten",
      "shape": "Biletform",
      "shapeRound": "Rund",
      "shapeSquare": "Kvadratisk"
    },
    "hidden": "skjult",
    "reset": "Start på nytt",
    "resetConfirm": "Vel igjen for å tømme alle felta"
  }
};
