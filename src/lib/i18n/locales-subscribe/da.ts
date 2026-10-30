// da strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale da
export default {
  "welcome": {
    "title": "Velkommen til nyhedsbrevet",
    "invitedBy": "{configuratorId} har inviteret dig til at tilmelde dig."
  },
  "email": {
    "title": "Hvor skal vi sende hver udgave hen?",
    "placeholder": "Din email"
  },
  "name": {
    "title": "Hvad hedder du?",
    "placeholder": "Dit navn"
  },
  "language": {
    "title": "Hvilket sprog vil du læse på?"
  },
  "subscribed": {
    "title": "Du er tilmeldt",
    "subtitle": "Se efter en bekræftelsesmail i din indbakke.",
    "continueTo": "Fortsæt til",
    "finishingUp": "Du kan lukke denne side."
  },
  "form": {
    "heading": "Tilmeld dig {title}",
    "headingFallback": "Tilmeld dig dette nyhedsbrev",
    "intro": "Nye udgaver kommer på mail, skrevet på det sprog, du vælger.",
    "from": "Fra {sender}",
    "emailLabel": "E-mailadresse",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Fornavn",
    "optional": "valgfrit",
    "nameHint": "Vi bruger det til at hilse på dig. Lader du feltet stå tomt, bruger vi starten af din e-mailadresse.",
    "languageLabel": "Sprog for dine udgaver",
    "languageSummary": "Udgaver på {language}.",
    "languageChange": "Skift",
    "languageHint": "Vi valgte det ud fra indstillingerne i din browser.",
    "submit": "Tilmeld",
    "submitting": "Tilmelder...",
    "consent": "Når du tilmelder dig, accepterer du at få mails fra {sender}. Alle mails har et link til at afmelde dig.",
    "privacy": "Privatlivspolitik",
    "loadingInfo": "Henter oplysninger om nyhedsbrevet"
  },
  "success": {
    "title": "Tjek din indbakke",
    "body": "Vi har sendt en bekræftelsesmail til {email}. Åbn den, og vælg Bekræft tilmelding.",
    "next": "Din første udgave kommer, når du har bekræftet, skrevet på {language}.",
    "spam": "Hvis der ikke kommer noget inden for et par minutter, så kig i din spammappe eller under Kampagner.",
    "changeEmail": "Brug en anden e-mail",
    "continueTo": "Fortsæt til {host}"
  },
  "errors": {
    "emailRequired": "Skriv din e-mailadresse.",
    "emailInvalid": "Denne e-mailadresse ser ufuldstændig ud. Tjek den, og prøv igen.",
    "missingLink": "Der mangler oplysninger i dette tilmeldingslink. Bed afsenderen om et nyt link.",
    "notFound": "Dette tilmeldingslink virker ikke længere. Bed afsenderen om et nyt link.",
    "limit": "Dette nyhedsbrev kan ikke tage imod nye abonnenter lige nu. Prøv igen senere.",
    "invalid": "Vi kunne ikke godkende denne adresse. Tjek den, og prøv igen.",
    "server": "Vi kunne ikke gemme din tilmelding. Prøv igen om lidt.",
    "network": "Vi kunne ikke få forbindelse til serveren. Tjek din forbindelse, og prøv igen."
  },
  "confirm": {
    "title": "Bekræft din tilmelding",
    "body": "Vælg knappen for at begynde at få udgaver på {email}.",
    "button": "Bekræft tilmelding",
    "confirming": "Bekræfter...",
    "consent": "Når du bekræfter, accepterer du at få dette nyhedsbrev på mail. Du kan afmelde dig fra enhver udgave.",
    "successTitle": "Du er tilmeldt",
    "successBody": "Nye udgaver kommer til {email}.",
    "successTip": "Føj afsenderen til dine kontakter, så de ikke havner i spam.",
    "invalidTitle": "Linket er ufuldstændigt",
    "invalidBody": "Åbn bekræftelsesmailen igen, og vælg knappen i den. Kan du ikke finde den, så tilmeld dig igen på afsenderens side.",
    "notFoundBody": "Vi kunne ikke finde en tilmelding for denne adresse. Tilmeld dig igen på afsenderens side.",
    "errorBody": "Vi kunne ikke bekræfte din tilmelding. Prøv igen om lidt.",
    "retry": "Prøv igen",
    "home": "Gå til forsiden"
  },
  "embed": {
    "title": "Føj en tilmeldingsformular til dit websted",
    "intro": "Indsæt et af disse kodestykker på dit websted. Dem, der tilmelder sig, får en bekræftelsesmail og derefter dine udgaver på deres eget sprog.",
    "linkLabel": "Link til tilmeldingssiden",
    "linkHint": "Del det i en bio på sociale medier, en e-mailsignatur eller en QR-kode.",
    "scriptLabel": "Script-tag (anbefalet)",
    "scriptHint": "Indsæt det, hvor formularen skal vises. Formularen tilpasser selv sin størrelse.",
    "iframeLabel": "Iframe",
    "iframeHint": "Brug dette, hvis dit websted ikke tillader scripts.",
    "copy": "Kopiér",
    "copied": "Kopieret",
    "copyFailed": "Markér teksten, og kopiér den manuelt.",
    "options": "Formularindstillinger",
    "accent": "Knapfarve",
    "accentHint": "Lad den være, som den er, for at bruge din brandfarve.",
    "theme": "Tema",
    "themeAuto": "Følg den besøgendes indstilling",
    "themeLight": "Lyst",
    "themeDark": "Mørkt",
    "layout": "Layout",
    "layoutFull": "Fuld (titel, navn og sprog)",
    "layoutCompact": "Kompakt (e-mail og knap)",
    "preview": "Eksempel",
    "previewNote": "Eksemplet er live. En tilmelding her opretter en rigtig abonnent.",
    "missing": "Opret først et nyhedsbrev. Tilmeldingsformularen vises her, når det findes."
  },
  "page": {
    "poweredBy": "Kører på AIBAN",
    "title": "Tilmelding"
  },
  "signature": {
    "title": "E-mailsignatur",
    "intro": "Læserne ser dette nederst i hver udgave. Klik på en del af eksemplet for at redigere den.",
    "show": "Vis min signatur i hver udgave",
    "showHint": "Slår du den fra, slutter udgaverne efter artiklen.",
    "preview": "Eksempel",
    "previewEmpty": "Din signatur er tom. Start med at tilføje dit navn.",
    "articleEnd": "Slut på artiklen",
    "tabContent": "Indhold",
    "tabStyle": "Stil",
    "blocks": "Hvad skal med",
    "blocksHint": "Vælg et mærke for at vise eller skjule den del. Skjulte dele beholder deres tekst.",
    "layout": "Layout",
    "layouts": {
      "bar": "Farvebjælke",
      "photo": "Foto",
      "stacked": "Stablet",
      "centered": "Centreret",
      "minimal": "Kun tekst"
    },
    "fields": {
      "name": "Navn",
      "role": "Stilling",
      "company": "Virksomhed",
      "phone": "Telefon",
      "email": "E-mail",
      "website": "Websted",
      "address": "Adresse",
      "photoUrl": "Foto",
      "logoUrl": "Logo",
      "socials": "Sociale links",
      "cta": "Knap",
      "disclaimer": "Juridisk note"
    },
    "groups": {
      "about": "Om dig",
      "contact": "Kontakt",
      "images": "Billeder",
      "socials": "Sociale links",
      "cta": "Knap",
      "disclaimer": "Juridisk note"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Stifter",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Hovedgaden 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Book et opkald",
      "ctaUrl": "https://"
    },
    "ctaText": "Knaptekst",
    "ctaLink": "Knaplink",
    "hints": {
      "photoUrl": "Link til en kvadratisk PNG eller JPG på mindst 144 gange 144 pixels og under 200 KB. Vises i 72 gange 72 pixels ved siden af dit navn.",
      "logoUrl": "Link til en PNG eller JPG med gennemsigtig eller hvid baggrund, mindst 64 pixels høj. Vises 32 pixels høj.",
      "website": "Vi tilføjer https://, hvis du udelader det.",
      "cta": "Knappen vises kun, hvis både tekst og link er udfyldt.",
      "disclaimer": "Småt nederst, for eksempel en fortrolighedsnote. Lad feltet stå tomt, hvis du ikke har brug for en."
    },
    "style": {
      "accent": "Accentfarve",
      "accentHint": "Bruges til bjælken, links og knappen. Starter med din brandfarve.",
      "font": "Skrifttype",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Tekststørrelse",
      "sizeMd": "Normal",
      "sizeSm": "Lille",
      "shape": "Fotoets form",
      "shapeRound": "Rund",
      "shapeSquare": "Firkantet"
    },
    "hidden": "skjult",
    "reset": "Start forfra",
    "resetConfirm": "Vælg igen for at rydde alle felter"
  }
};
