// af strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale af
export default {
  "welcome": {
    "title": "Welkom by die nuusbrief",
    "invitedBy": "{configuratorId} het jou genooi om in te teken."
  },
  "email": {
    "title": "Waarheen moet ons elke uitgawe stuur?",
    "placeholder": "Jou e-pos"
  },
  "name": {
    "title": "Wat is jou naam?",
    "placeholder": "Jou naam"
  },
  "language": {
    "title": "In watter taal wil jy lees?"
  },
  "subscribed": {
    "title": "Jy is ingeteken",
    "subtitle": "Kyk in jou inkassie vir 'n bevestigingse-pos.",
    "continueTo": "Gaan voort na",
    "finishingUp": "Jy kan hierdie bladsy toemaak."
  },
  "form": {
    "heading": "Teken in op {title}",
    "headingFallback": "Teken in op hierdie nuusbrief",
    "intro": "Nuwe uitgawes kom per e-pos, geskryf in die taal wat jy kies.",
    "from": "Van {sender}",
    "emailLabel": "E-posadres",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Voornaam",
    "optional": "opsioneel",
    "nameHint": "Ons gebruik dit om jou te groet. As jy dit leeg laat, gebruik ons die begin van jou e-posadres.",
    "languageLabel": "Taal van jou uitgawes",
    "languageSummary": "Uitgawes in {language}.",
    "languageChange": "Verander",
    "languageHint": "Ons het dit gekies op grond van jou blaaier se instellings.",
    "submit": "Teken in",
    "submitting": "Besig om in te teken...",
    "consent": "Deur in te teken, stem jy in om e-posse van {sender} te ontvang. Elke e-pos het 'n skakel om uit te teken.",
    "privacy": "Privaatheidsbeleid",
    "loadingInfo": "Laai tans nuusbriefbesonderhede"
  },
  "success": {
    "title": "Kyk in jou inkassie",
    "body": "Ons het 'n bevestigingse-pos na {email} gestuur. Maak dit oop en kies Bevestig intekening.",
    "next": "Jou eerste uitgawe kom nadat jy bevestig het, geskryf in {language}.",
    "spam": "As niks binne 'n paar minute aankom nie, kyk in jou gemorspos- of Promosies-lêer.",
    "changeEmail": "Gebruik 'n ander e-pos",
    "continueTo": "Gaan voort na {host}"
  },
  "errors": {
    "emailRequired": "Tik jou e-posadres in.",
    "emailInvalid": "Hierdie e-posadres lyk onvolledig. Kontroleer dit en probeer weer.",
    "missingLink": "Hierdie intekenskakel kort inligting. Vra die sender vir 'n nuwe skakel.",
    "notFound": "Hierdie intekenskakel werk nie meer nie. Vra die sender vir 'n nuwe skakel.",
    "limit": "Hierdie nuusbrief kan nie nou nuwe intekenaars aanvaar nie. Probeer later weer.",
    "invalid": "Ons kon nie hierdie adres aanvaar nie. Kontroleer dit en probeer weer.",
    "server": "Ons kon nie jou intekening stoor nie. Probeer oor 'n oomblik weer.",
    "network": "Ons kon nie die bediener bereik nie. Kontroleer jou verbinding en probeer weer."
  },
  "confirm": {
    "title": "Bevestig jou intekening",
    "body": "Kies die knoppie om uitgawes by {email} te begin ontvang.",
    "button": "Bevestig intekening",
    "confirming": "Bevestig tans...",
    "consent": "Deur te bevestig, stem jy in om hierdie nuusbrief per e-pos te ontvang. Jy kan by enige uitgawe uitteken.",
    "successTitle": "Jy is ingeteken",
    "successBody": "Nuwe uitgawes sal by {email} aankom.",
    "successTip": "Voeg die sender by jou kontakte sodat dit nie in gemorspos beland nie.",
    "invalidTitle": "Hierdie skakel is onvolledig",
    "invalidBody": "Maak die bevestigingse-pos weer oop en kies die knoppie daarin. As jy dit nie kan kry nie, teken weer in op die sender se bladsy.",
    "notFoundBody": "Ons kon geen intekening vir hierdie adres vind nie. Teken weer in op die sender se bladsy.",
    "errorBody": "Ons kon nie jou intekening bevestig nie. Probeer oor 'n oomblik weer.",
    "retry": "Probeer weer",
    "home": "Gaan na die tuisblad"
  },
  "embed": {
    "title": "Voeg 'n intekenvorm by jou webwerf",
    "intro": "Plak een van hierdie kodebrokkies in jou webwerf. Mense wat inteken, kry 'n bevestigingse-pos en dan jou uitgawes in hul eie taal.",
    "linkLabel": "Skakel na die intekenbladsy",
    "linkHint": "Deel dit in 'n sosiale media-bio, 'n e-poshandtekening of 'n QR-kode.",
    "scriptLabel": "Script-etiket (aanbeveel)",
    "scriptHint": "Plak dit waar die vorm moet verskyn. Die vorm pas self sy grootte aan.",
    "iframeLabel": "Iframe",
    "iframeHint": "Gebruik dit as jou webwerf nie skripte toelaat nie.",
    "copy": "Kopieer",
    "copied": "Gekopieer",
    "copyFailed": "Kies die teks en kopieer dit self.",
    "options": "Vormopsies",
    "accent": "Knoppiekleur",
    "accentHint": "Los dit soos dit is om jou handelsmerkkleur te gebruik.",
    "theme": "Tema",
    "themeAuto": "Volg die besoeker se instelling",
    "themeLight": "Lig",
    "themeDark": "Donker",
    "layout": "Uitleg",
    "layoutFull": "Volledig (titel, naam en taal)",
    "layoutCompact": "Kompak (e-pos en knoppie)",
    "preview": "Voorskou",
    "previewNote": "Die voorskou is regstreeks. 'n Intekening hier skep 'n regte intekenaar.",
    "missing": "Skep eers 'n nuusbrief. Die intekenvorm verskyn hier sodra dit bestaan."
  },
  "page": {
    "poweredBy": "Loop op AIBAN",
    "title": "Teken in"
  },
  "signature": {
    "title": "E-poshandtekening",
    "intro": "Lesers sien dit aan die einde van elke uitgawe. Klik op enige deel van die voorskou om dit te wysig.",
    "show": "Wys my handtekening in elke uitgawe",
    "showHint": "As jy dit afskakel, eindig uitgawes ná die artikel.",
    "preview": "Voorskou",
    "previewEmpty": "Jou handtekening is leeg. Voeg jou naam by om te begin.",
    "articleEnd": "Einde van die artikel",
    "tabContent": "Inhoud",
    "tabStyle": "Styl",
    "blocks": "Wat om in te sluit",
    "blocksHint": "Kies 'n etiket om daardie deel te wys of te versteek. Versteekte dele hou hul teks.",
    "layout": "Uitleg",
    "layouts": {
      "bar": "Kleurstreep",
      "photo": "Foto",
      "stacked": "Onder mekaar",
      "centered": "Gesentreer",
      "minimal": "Net teks"
    },
    "fields": {
      "name": "Naam",
      "role": "Postitel",
      "company": "Maatskappy",
      "phone": "Foon",
      "email": "E-pos",
      "website": "Webwerf",
      "address": "Adres",
      "photoUrl": "Foto",
      "logoUrl": "Logo",
      "socials": "Sosiale skakels",
      "cta": "Knoppie",
      "disclaimer": "Regsnota"
    },
    "groups": {
      "about": "Oor jou",
      "contact": "Kontak",
      "images": "Beelde",
      "socials": "Sosiale skakels",
      "cta": "Knoppie",
      "disclaimer": "Regsnota"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Stigter",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Hoofstraat 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Bespreek 'n oproep",
      "ctaUrl": "https://"
    },
    "ctaText": "Knoppieteks",
    "ctaLink": "Knoppieskakel",
    "hints": {
      "photoUrl": "Skakel na 'n vierkantige PNG of JPG van minstens 144 by 144 pixels en kleiner as 200 KB. Word as 72 by 72 pixels langs jou naam gewys.",
      "logoUrl": "Skakel na 'n PNG of JPG met 'n deursigtige of wit agtergrond, minstens 64 pixels hoog. Word 32 pixels hoog gewys.",
      "website": "Ons voeg https:// by as jy dit uitlaat.",
      "cta": "Die knoppie verskyn net as die teks en die skakel albei ingevul is.",
      "disclaimer": "Fynskrif onderaan, byvoorbeeld 'n vertroulikheidsnota. Laat dit leeg as jy nie een nodig het nie."
    },
    "style": {
      "accent": "Aksentkleur",
      "accentHint": "Word vir die streep, skakels en die knoppie gebruik. Begin met jou handelsmerkkleur.",
      "font": "Lettertipe",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Teksgrootte",
      "sizeMd": "Gewoon",
      "sizeSm": "Klein",
      "shape": "Fotovorm",
      "shapeRound": "Rond",
      "shapeSquare": "Vierkantig"
    },
    "hidden": "versteek",
    "reset": "Begin oor",
    "resetConfirm": "Kies weer om alle velde skoon te maak"
  }
};
