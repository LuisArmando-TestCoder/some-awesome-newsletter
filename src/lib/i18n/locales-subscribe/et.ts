// et strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale et
export default {
  "welcome": {
    "title": "Tere tulemast uudiskirja juurde",
    "invitedBy": "{configuratorId} kutsus sind tellijaks."
  },
  "email": {
    "title": "Kuhu me iga numbri saadame?",
    "placeholder": "Sinu e-post"
  },
  "name": {
    "title": "Mis on sinu nimi?",
    "placeholder": "Sinu nimi"
  },
  "language": {
    "title": "Mis keeles soovid lugeda?"
  },
  "subscribed": {
    "title": "Oled nüüd tellija",
    "subtitle": "Vaata postkastist kinnituskirja.",
    "continueTo": "Jätka",
    "finishingUp": "Võid selle lehe sulgeda."
  },
  "form": {
    "heading": "Telli {title}",
    "headingFallback": "Telli see uudiskiri",
    "intro": "Uued numbrid saabuvad e-postiga ja on kirjutatud sinu valitud keeles.",
    "from": "Saatja: {sender}",
    "emailLabel": "E-posti aadress",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Eesnimi",
    "optional": "valikuline",
    "nameHint": "Kasutame seda sinu tervitamiseks. Kui jätad selle tühjaks, kasutame sinu e-posti aadressi algust.",
    "languageLabel": "Numbrite keel",
    "languageSummary": "Numbrid keeles {language}.",
    "languageChange": "Muuda",
    "languageHint": "Valisime selle sinu brauseri seadete põhjal.",
    "submit": "Telli",
    "submitting": "Tellimine...",
    "consent": "Tellides nõustud saama e-kirju saatjalt {sender}. Igas kirjas on link tellimusest loobumiseks.",
    "privacy": "Privaatsuspoliitika",
    "loadingInfo": "Uudiskirja andmete laadimine"
  },
  "success": {
    "title": "Vaata oma postkasti",
    "body": "Saatsime kinnituskirja aadressile {email}. Ava see ja vali Kinnita tellimus.",
    "next": "Esimene number saabub pärast kinnitamist, kirjutatud keeles {language}.",
    "spam": "Kui mõne minuti jooksul midagi ei saabu, vaata rämpsposti või kausta Pakkumised.",
    "changeEmail": "Kasuta teist e-posti aadressi",
    "continueTo": "Jätka lehele {host}"
  },
  "errors": {
    "emailRequired": "Sisesta oma e-posti aadress.",
    "emailInvalid": "See e-posti aadress tundub poolik. Kontrolli seda ja proovi uuesti.",
    "missingLink": "Sellest tellimislingist puudub teave. Küsi saatjalt uut linki.",
    "notFound": "See tellimislink enam ei tööta. Küsi saatjalt uut linki.",
    "limit": "See uudiskiri ei saa praegu uusi tellijaid vastu võtta. Proovi hiljem uuesti.",
    "invalid": "Me ei saanud seda aadressi vastu võtta. Kontrolli seda ja proovi uuesti.",
    "server": "Me ei saanud sinu tellimust salvestada. Proovi hetke pärast uuesti.",
    "network": "Me ei saanud serveriga ühendust. Kontrolli ühendust ja proovi uuesti."
  },
  "confirm": {
    "title": "Kinnita oma tellimus",
    "body": "Vali nupp, et hakata numbreid saama aadressile {email}.",
    "button": "Kinnita tellimus",
    "confirming": "Kinnitamine...",
    "consent": "Kinnitades nõustud saama seda uudiskirja e-postiga. Tellimusest saad loobuda iga numbri kaudu.",
    "successTitle": "Oled nüüd tellija",
    "successBody": "Uued numbrid saabuvad aadressile {email}.",
    "successTip": "Lisa saatja oma kontaktide hulka, siis ei satu kirjad rämpsposti.",
    "invalidTitle": "See link on poolik",
    "invalidBody": "Ava kinnituskiri uuesti ja vali selles olev nupp. Kui sa seda ei leia, telli uuesti saatja lehelt.",
    "notFoundBody": "Me ei leidnud selle aadressi tellimust. Telli uuesti saatja lehelt.",
    "errorBody": "Me ei saanud sinu tellimust kinnitada. Proovi hetke pärast uuesti.",
    "retry": "Proovi uuesti",
    "home": "Mine avalehele"
  },
  "embed": {
    "title": "Lisa oma veebisaidile tellimisvorm",
    "intro": "Kleebi üks neist koodijuppidest oma veebisaidile. Tellijad saavad kinnituskirja ja seejärel sinu numbrid oma keeles.",
    "linkLabel": "Tellimislehe link",
    "linkHint": "Jaga seda sotsiaalmeedia profiilis, e-kirja allkirjas või QR-koodina.",
    "scriptLabel": "Script-silt (soovitatav)",
    "scriptHint": "Kleebi see kohta, kus vorm peab olema. Vorm kohandab oma suuruse ise.",
    "iframeLabel": "Iframe",
    "iframeHint": "Kasuta seda, kui sinu veebisait ei luba skripte.",
    "copy": "Kopeeri",
    "copied": "Kopeeritud",
    "copyFailed": "Vali tekst ja kopeeri see käsitsi.",
    "options": "Vormi valikud",
    "accent": "Nupu värv",
    "accentHint": "Jäta muutmata, et kasutada oma brändi värvi.",
    "theme": "Teema",
    "themeAuto": "Külastaja seade järgi",
    "themeLight": "Hele",
    "themeDark": "Tume",
    "layout": "Paigutus",
    "layoutFull": "Täielik (pealkiri, nimi ja keel)",
    "layoutCompact": "Kompaktne (e-post ja nupp)",
    "preview": "Eelvaade",
    "previewNote": "Eelvaade töötab päriselt. Siin tehtud tellimus loob päris tellija.",
    "missing": "Loo kõigepealt uudiskiri. Tellimisvorm ilmub siia, kui uudiskiri on olemas."
  },
  "page": {
    "poweredBy": "Töötab AIBANi peal",
    "title": "Telli"
  },
  "signature": {
    "title": "E-kirja allkiri",
    "intro": "Lugejad näevad seda iga numbri lõpus. Muutmiseks klõpsa eelvaates soovitud osal.",
    "show": "Näita minu allkirja igas numbris",
    "showHint": "Kui lülitad selle välja, lõpevad numbrid artikliga.",
    "preview": "Eelvaade",
    "previewEmpty": "Sinu allkiri on tühi. Alustuseks lisa oma nimi.",
    "articleEnd": "Artikli lõpp",
    "tabContent": "Sisu",
    "tabStyle": "Stiil",
    "blocks": "Mida kuvada",
    "blocksHint": "Vali silt, et see osa kuvada või peita. Peidetud osad säilitavad oma teksti.",
    "layout": "Paigutus",
    "layouts": {
      "bar": "Värviriba",
      "photo": "Foto",
      "stacked": "Üksteise all",
      "centered": "Keskel",
      "minimal": "Ainult tekst"
    },
    "fields": {
      "name": "Nimi",
      "role": "Ametinimetus",
      "company": "Ettevõte",
      "phone": "Telefon",
      "email": "E-post",
      "website": "Veebisait",
      "address": "Aadress",
      "photoUrl": "Foto",
      "logoUrl": "Logo",
      "socials": "Sotsiaalmeedia lingid",
      "cta": "Nupp",
      "disclaimer": "Õiguslik märkus"
    },
    "groups": {
      "about": "Sinust",
      "contact": "Kontakt",
      "images": "Pildid",
      "socials": "Sotsiaalmeedia lingid",
      "cta": "Nupp",
      "disclaimer": "Õiguslik märkus"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Asutaja",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Peatänav 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Broneeri kõne",
      "ctaUrl": "https://"
    },
    "ctaText": "Nupu tekst",
    "ctaLink": "Nupu link",
    "hints": {
      "photoUrl": "Link ruudukujulisele PNG- või JPG-pildile, vähemalt 144 x 144 pikslit ja alla 200 KB. Kuvatakse sinu nime kõrval suuruses 72 x 72 pikslit.",
      "logoUrl": "Link läbipaistva või valge taustaga PNG- või JPG-pildile, vähemalt 64 pikslit kõrge. Kuvatakse 32 pikslit kõrgena.",
      "website": "Kui jätad https:// ära, lisame selle ise.",
      "cta": "Nupp kuvatakse ainult siis, kui nii tekst kui ka link on olemas.",
      "disclaimer": "Väike kiri allosas, näiteks konfidentsiaalsusmärkus. Jäta tühjaks, kui sul seda vaja pole."
    },
    "style": {
      "accent": "Rõhuvärv",
      "accentHint": "Kasutatakse riba, linkide ja nupu jaoks. Algväärtus on sinu brändi värv.",
      "font": "Kirjatüüp",
      "fontSans": "Seriifideta",
      "fontSerif": "Seriifidega",
      "size": "Teksti suurus",
      "sizeMd": "Tavaline",
      "sizeSm": "Väike",
      "shape": "Foto kuju",
      "shapeRound": "Ümar",
      "shapeSquare": "Ruut"
    },
    "hidden": "peidetud",
    "reset": "Alusta otsast",
    "resetConfirm": "Vali uuesti, et kõik väljad tühjendada"
  }
};
