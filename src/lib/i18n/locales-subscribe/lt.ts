// lt strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale lt
export default {
  "welcome": {
    "title": "Sveiki atvykę į naujienlaiškį",
    "invitedBy": "{configuratorId} kviečia jus užsiprenumeruoti."
  },
  "email": {
    "title": "Kur siųsti kiekvieną numerį?",
    "placeholder": "Jūsų el. paštas"
  },
  "name": {
    "title": "Koks jūsų vardas?",
    "placeholder": "Jūsų vardas"
  },
  "language": {
    "title": "Kokia kalba norite skaityti?"
  },
  "subscribed": {
    "title": "Jūs užsiprenumeravote",
    "subtitle": "Patikrinkite pašto dėžutę, ten rasite patvirtinimo laišką.",
    "continueTo": "Tęsti į",
    "finishingUp": "Šį puslapį galite uždaryti."
  },
  "form": {
    "heading": "Prenumeruoti {title}",
    "headingFallback": "Prenumeruoti šį naujienlaiškį",
    "intro": "Nauji numeriai ateina el. paštu, parašyti jūsų pasirinkta kalba.",
    "from": "Siuntėjas: {sender}",
    "emailLabel": "El. pašto adresas",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Vardas",
    "optional": "neprivaloma",
    "nameHint": "Naudojame jį pasisveikinti. Jei paliksite tuščią, naudosime jūsų el. pašto adreso pradžią.",
    "languageLabel": "Numerių kalba",
    "languageSummary": "Numeriai kalba: {language}.",
    "languageChange": "Keisti",
    "languageHint": "Pasirinkome pagal jūsų naršyklės nustatymus.",
    "submit": "Prenumeruoti",
    "submitting": "Prenumeruojama...",
    "consent": "Prenumeruodami sutinkate gauti laiškus iš {sender}. Kiekviename laiške yra nuoroda prenumeratai atsisakyti.",
    "privacy": "Privatumo politika",
    "loadingInfo": "Įkeliama naujienlaiškio informacija"
  },
  "success": {
    "title": "Patikrinkite pašto dėžutę",
    "body": "Išsiuntėme patvirtinimo laišką adresu {email}. Atidarykite jį ir pasirinkite Patvirtinti prenumeratą.",
    "next": "Pirmasis numeris ateis jums patvirtinus, parašytas kalba: {language}.",
    "spam": "Jei per kelias minutes nieko negausite, pažiūrėkite šlamšto arba Reklamų aplanke.",
    "changeEmail": "Naudoti kitą el. paštą",
    "continueTo": "Tęsti į {host}"
  },
  "errors": {
    "emailRequired": "Įveskite savo el. pašto adresą.",
    "emailInvalid": "Šis el. pašto adresas atrodo nepilnas. Patikrinkite jį ir bandykite dar kartą.",
    "missingLink": "Šioje prenumeratos nuorodoje trūksta informacijos. Paprašykite siuntėjo naujos nuorodos.",
    "notFound": "Ši prenumeratos nuoroda nebeveikia. Paprašykite siuntėjo naujos nuorodos.",
    "limit": "Šis naujienlaiškis šiuo metu negali priimti naujų prenumeratorių. Bandykite vėliau.",
    "invalid": "Negalėjome priimti šio adreso. Patikrinkite jį ir bandykite dar kartą.",
    "server": "Nepavyko išsaugoti jūsų prenumeratos. Po akimirkos bandykite dar kartą.",
    "network": "Nepavyko susisiekti su serveriu. Patikrinkite ryšį ir bandykite dar kartą."
  },
  "confirm": {
    "title": "Patvirtinkite prenumeratą",
    "body": "Pasirinkite mygtuką ir pradėsite gauti numerius adresu {email}.",
    "button": "Patvirtinti prenumeratą",
    "confirming": "Tvirtinama...",
    "consent": "Patvirtindami sutinkate gauti šį naujienlaiškį el. paštu. Prenumeratos galite atsisakyti iš bet kurio numerio.",
    "successTitle": "Jūs užsiprenumeravote",
    "successBody": "Nauji numeriai ateis adresu {email}.",
    "successTip": "Įtraukite siuntėją į kontaktus, kad laiškai nepatektų į šlamštą.",
    "invalidTitle": "Ši nuoroda nepilna",
    "invalidBody": "Dar kartą atidarykite patvirtinimo laišką ir pasirinkite jame esantį mygtuką. Jei jo nerandate, užsiprenumeruokite iš naujo siuntėjo puslapyje.",
    "notFoundBody": "Neradome šio adreso prenumeratos. Užsiprenumeruokite iš naujo siuntėjo puslapyje.",
    "errorBody": "Nepavyko patvirtinti jūsų prenumeratos. Po akimirkos bandykite dar kartą.",
    "retry": "Bandyti dar kartą",
    "home": "Į pradžios puslapį"
  },
  "embed": {
    "title": "Pridėkite prenumeratos formą į savo svetainę",
    "intro": "Įklijuokite vieną iš šių kodo fragmentų į savo svetainę. Užsiprenumeravę žmonės gauna patvirtinimo laišką, o paskui jūsų numerius savo kalba.",
    "linkLabel": "Prenumeratos puslapio nuoroda",
    "linkHint": "Pasidalykite ja socialinių tinklų profilio aprašyme, el. laiško paraše arba QR kode.",
    "scriptLabel": "Script žyma (rekomenduojama)",
    "scriptHint": "Įklijuokite ją ten, kur turi būti forma. Forma pati prisitaiko prie dydžio.",
    "iframeLabel": "Iframe",
    "iframeHint": "Naudokite tai, jei jūsų svetainė neleidžia skriptų.",
    "copy": "Kopijuoti",
    "copied": "Nukopijuota",
    "copyFailed": "Pažymėkite tekstą ir nukopijuokite jį rankiniu būdu.",
    "options": "Formos parinktys",
    "accent": "Mygtuko spalva",
    "accentHint": "Palikite kaip yra, kad būtų naudojama jūsų prekės ženklo spalva.",
    "theme": "Tema",
    "themeAuto": "Pagal lankytojo nustatymą",
    "themeLight": "Šviesi",
    "themeDark": "Tamsi",
    "layout": "Išdėstymas",
    "layoutFull": "Pilnas (pavadinimas, vardas ir kalba)",
    "layoutCompact": "Kompaktiškas (el. paštas ir mygtukas)",
    "preview": "Peržiūra",
    "previewNote": "Peržiūra veikia tikrai. Čia užsiprenumeravus sukuriamas tikras prenumeratorius.",
    "missing": "Pirmiausia sukurkite naujienlaiškį. Prenumeratos forma atsiras čia, kai jis bus sukurtas."
  },
  "page": {
    "poweredBy": "Veikia su AIBAN",
    "title": "Prenumeruoti"
  },
  "signature": {
    "title": "El. laiško parašas",
    "intro": "Skaitytojai tai mato kiekvieno numerio pabaigoje. Spustelėkite bet kurią peržiūros dalį, kad ją redaguotumėte.",
    "show": "Rodyti mano parašą kiekviename numeryje",
    "showHint": "Jį išjungus, numeriai baigsis po straipsnio.",
    "preview": "Peržiūra",
    "previewEmpty": "Jūsų parašas tuščias. Pradėkite pridėdami savo vardą.",
    "articleEnd": "Straipsnio pabaiga",
    "tabContent": "Turinys",
    "tabStyle": "Stilius",
    "blocks": "Ką įtraukti",
    "blocksHint": "Pasirinkite žymą, kad parodytumėte ar paslėptumėte tą dalį. Paslėptos dalys išsaugo savo tekstą.",
    "layout": "Išdėstymas",
    "layouts": {
      "bar": "Spalvota juosta",
      "photo": "Nuotrauka",
      "stacked": "Vienas po kito",
      "centered": "Centruotas",
      "minimal": "Tik tekstas"
    },
    "fields": {
      "name": "Vardas",
      "role": "Pareigos",
      "company": "Įmonė",
      "phone": "Telefonas",
      "email": "El. paštas",
      "website": "Svetainė",
      "address": "Adresas",
      "photoUrl": "Nuotrauka",
      "logoUrl": "Logotipas",
      "socials": "Socialinių tinklų nuorodos",
      "cta": "Mygtukas",
      "disclaimer": "Teisinė pastaba"
    },
    "groups": {
      "about": "Apie jus",
      "contact": "Kontaktai",
      "images": "Vaizdai",
      "socials": "Socialinių tinklų nuorodos",
      "cta": "Mygtukas",
      "disclaimer": "Teisinė pastaba"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Įkūrėja",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Pagrindinė g. 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Užsisakyti skambutį",
      "ctaUrl": "https://"
    },
    "ctaText": "Mygtuko tekstas",
    "ctaLink": "Mygtuko nuoroda",
    "hints": {
      "photoUrl": "Nuoroda į kvadratinį PNG arba JPG vaizdą, ne mažesnį nei 144 x 144 pikselių ir mažesnį nei 200 KB. Rodomas 72 x 72 pikselių dydžio šalia jūsų vardo.",
      "logoUrl": "Nuoroda į PNG arba JPG vaizdą su permatomu arba baltu fonu, ne žemesnį nei 64 pikselių. Rodomas 32 pikselių aukščio.",
      "website": "Jei praleisite https://, pridėsime patys.",
      "cta": "Mygtukas rodomas tik tada, kai įvesti ir tekstas, ir nuoroda.",
      "disclaimer": "Smulkus tekstas apačioje, pavyzdžiui, konfidencialumo pastaba. Palikite tuščią, jei jos nereikia."
    },
    "style": {
      "accent": "Akcento spalva",
      "accentHint": "Naudojama juostai, nuorodoms ir mygtukui. Iš pradžių tai jūsų prekės ženklo spalva.",
      "font": "Šriftas",
      "fontSans": "Be užraitų",
      "fontSerif": "Su užraitais",
      "size": "Teksto dydis",
      "sizeMd": "Įprastas",
      "sizeSm": "Mažas",
      "shape": "Nuotraukos forma",
      "shapeRound": "Apvali",
      "shapeSquare": "Kvadratinė"
    },
    "hidden": "paslėpta",
    "reset": "Pradėti iš naujo",
    "resetConfirm": "Pasirinkite dar kartą, kad išvalytumėte visus laukus"
  }
};
