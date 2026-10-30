// lb strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale lb
export default {
  "welcome": {
    "title": "Wëllkomm beim Newsletter",
    "invitedBy": "{configuratorId} invitéiert dech, dech anzeschreiwen."
  },
  "email": {
    "title": "Wou solle mir all Editioun hinschécken?",
    "placeholder": "Deng E-Mail"
  },
  "name": {
    "title": "Wéi heeschs du?",
    "placeholder": "Däin Numm"
  },
  "language": {
    "title": "A wéi enger Sprooch wëlls du liesen?"
  },
  "subscribed": {
    "title": "Du bass ageschriwwen",
    "subtitle": "An dengem Postfach waart eng Confirmatiouns-E-Mail op dech.",
    "continueTo": "Weider op",
    "finishingUp": "Du kanns dës Säit zoumaachen."
  },
  "form": {
    "heading": "{title} abonnéieren",
    "headingFallback": "Dësen Newsletter abonnéieren",
    "intro": "Nei Editioune kommen per E-Mail, geschriwwen an der Sprooch, déi s du auswiels.",
    "from": "Vu(n) {sender}",
    "emailLabel": "E-Mail-Adress",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Virnumm",
    "optional": "fakultativ",
    "nameHint": "Mir benotzen en, fir dech ze begréissen. Wann s du et eidel léiss, huele mir den Ufank vun denger E-Mail-Adress.",
    "languageLabel": "Sprooch vun den Editiounen",
    "languageSummary": "Editiounen op {language}.",
    "languageChange": "Änneren",
    "languageHint": "Mir hunn dat no den Astellunge vun dengem Browser ausgewielt.",
    "submit": "Abonnéieren",
    "submitting": "Gëtt ageschriwwen...",
    "consent": "Mat dengem Abonnement bass du d'accord, E-Maile vu(n) {sender} ze kréien. All E-Mail huet e Link fir dech auszeschreiwen.",
    "privacy": "Dateschutzerklärung",
    "loadingInfo": "Detailer vum Newsletter gi gelueden"
  },
  "success": {
    "title": "Kuck an däin Postfach",
    "body": "Mir hunn eng Confirmatiouns-E-Mail un {email} geschéckt. Maach se op a wiel Abonnement confirméieren.",
    "next": "Deng éischt Editioun kënnt, nodeems s du confirméiert hues, geschriwwen op {language}.",
    "spam": "Wann an e puer Minutten näischt ukënnt, kuck an dengem Spam- oder Promotiounen-Dossier.",
    "changeEmail": "Eng aner E-Mail benotzen",
    "continueTo": "Weider op {host}"
  },
  "errors": {
    "emailRequired": "Gëff deng E-Mail-Adress an.",
    "emailInvalid": "Dës E-Mail-Adress gesäit net komplett aus. Kontrolléier se a prouf nach eng Kéier.",
    "missingLink": "An dësem Umeldungslink feelen Informatiounen. Fro de Sender no engem neie Link.",
    "notFound": "Dësen Umeldungslink funktionéiert net méi. Fro de Sender no engem neie Link.",
    "limit": "Dësen Newsletter kann am Moment keng nei Abonnenten ophuelen. Prouf et méi spéit nach eng Kéier.",
    "invalid": "Mir konnten dës Adress net akzeptéieren. Kontrolléier se a prouf nach eng Kéier.",
    "server": "Mir konnten däin Abonnement net späicheren. Prouf et an engem Moment nach eng Kéier.",
    "network": "Mir konnten de Server net erreechen. Kontrolléier deng Verbindung a prouf nach eng Kéier."
  },
  "confirm": {
    "title": "Confirméier däin Abonnement",
    "body": "Wiel de Knäppchen, fir Editiounen op {email} ze kréien.",
    "button": "Abonnement confirméieren",
    "confirming": "Gëtt confirméiert...",
    "consent": "Mat der Confirmatioun bass du d'accord, dësen Newsletter per E-Mail ze kréien. Du kanns dech aus all Editioun ausschreiwen.",
    "successTitle": "Du bass ageschriwwen",
    "successBody": "Nei Editioune kommen op {email}.",
    "successTip": "Setz de Sender an deng Kontakter, da lande se net am Spam.",
    "invalidTitle": "Dëse Link ass net komplett",
    "invalidBody": "Maach d'Confirmatiouns-E-Mail nach eng Kéier op a wiel de Knäppchen dran. Wann s du se net fënns, schreif dech op der Säit vum Sender nei an.",
    "notFoundBody": "Mir hu keng Umeldung fir dës Adress fonnt. Schreif dech op der Säit vum Sender nei an.",
    "errorBody": "Mir konnten däin Abonnement net confirméieren. Prouf et an engem Moment nach eng Kéier.",
    "retry": "Nach eng Kéier probéieren",
    "home": "Op d'Startsäit"
  },
  "embed": {
    "title": "Setz en Umeldungsformular op deng Websäit",
    "intro": "Paste ee vun dëse Code-Snippeten op deng Websäit. Wien sech umellt, kritt eng Confirmatiouns-E-Mail an duerno deng Editiounen a senger eegener Sprooch.",
    "linkLabel": "Link op d'Umeldungssäit",
    "linkHint": "Deel en an enger Bio op de soziale Medien, an enger E-Mail-Ënnerschrëft oder an engem QR-Code.",
    "scriptLabel": "Script-Tag (recommandéiert)",
    "scriptHint": "Paste en do, wou de Formular erschéngen soll. De Formular passt seng Gréisst selwer un.",
    "iframeLabel": "Iframe",
    "iframeHint": "Benotz dat, wann deng Websäit keng Skripter erlaabt.",
    "copy": "Kopéieren",
    "copied": "Kopéiert",
    "copyFailed": "Markéier den Text a kopéier en manuell.",
    "options": "Optioune vum Formular",
    "accent": "Faarf vum Knäppchen",
    "accentHint": "Looss et esou, fir d'Faarf vun denger Mark ze benotzen.",
    "theme": "Thema",
    "themeAuto": "No der Astellung vum Visiteur",
    "themeLight": "Hell",
    "themeDark": "Däischter",
    "layout": "Layout",
    "layoutFull": "Komplett (Titel, Numm a Sprooch)",
    "layoutCompact": "Kompakt (E-Mail a Knäppchen)",
    "preview": "Virschau",
    "previewNote": "D'Virschau ass live. Eng Umeldung hei mécht e richtegen Abonnent.",
    "missing": "Maach als éischt en Newsletter. Den Umeldungsformular erschéngt hei, soubal en existéiert."
  },
  "page": {
    "poweredBy": "Leeft mat AIBAN",
    "title": "Abonnéieren"
  },
  "signature": {
    "title": "E-Mail-Ënnerschrëft",
    "intro": "Lieser gesinn dat um Enn vun all Editioun. Klick op en Deel vun der Virschau, fir en z'änneren.",
    "show": "Meng Ënnerschrëft an all Editioun weisen",
    "showHint": "Wann s du se ausschalts, hale d'Editiounen nom Artikel op.",
    "preview": "Virschau",
    "previewEmpty": "Deng Ënnerschrëft ass eidel. Setz fir unzefänken däin Numm derbäi.",
    "articleEnd": "Enn vum Artikel",
    "tabContent": "Inhalt",
    "tabStyle": "Stil",
    "blocks": "Wat soll dra sinn",
    "blocksHint": "Wiel e Label, fir deen Deel ze weisen oder ze verstoppen. Verstoppten Deeler behalen hiren Text.",
    "layout": "Layout",
    "layouts": {
      "bar": "Faarfbalk",
      "photo": "Foto",
      "stacked": "Ënnerteneen",
      "centered": "Zentréiert",
      "minimal": "Nëmmen Text"
    },
    "fields": {
      "name": "Numm",
      "role": "Beruffstitel",
      "company": "Firma",
      "phone": "Telefon",
      "email": "E-Mail",
      "website": "Websäit",
      "address": "Adress",
      "photoUrl": "Foto",
      "logoUrl": "Logo",
      "socials": "Social-Media-Linken",
      "cta": "Knäppchen",
      "disclaimer": "Juristesche Hiweis"
    },
    "groups": {
      "about": "Iwwer dech",
      "contact": "Kontakt",
      "images": "Biller",
      "socials": "Social-Media-Linken",
      "cta": "Knäppchen",
      "disclaimer": "Juristesche Hiweis"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Grënnerin",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Haaptstrooss, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "En Uruff reservéieren",
      "ctaUrl": "https://"
    },
    "ctaText": "Text vum Knäppchen",
    "ctaLink": "Link vum Knäppchen",
    "hints": {
      "photoUrl": "Link op e quadratescht PNG oder JPG vu mindestens 144 op 144 Pixel an ënner 200 KB. Gëtt mat 72 op 72 Pixel nieft dengem Numm gewisen.",
      "logoUrl": "Link op e PNG oder JPG mat transparentem oder wäissem Hannergrond, mindestens 64 Pixel héich. Gëtt 32 Pixel héich gewisen.",
      "website": "Mir setzen https:// derbäi, wann s du et ewechléiss.",
      "cta": "De Knäppchen erschéngt nëmmen, wann Text a Link allebéid ausgefëllt sinn.",
      "disclaimer": "Klengt Gedréckst ënnen, zum Beispill e Vertraulechkeetshiweis. Looss et eidel, wann s du keen brauchs."
    },
    "style": {
      "accent": "Akzentfaarf",
      "accentHint": "Gëtt fir de Balk, d'Linken an de Knäppchen benotzt. Fänkt mat der Faarf vun denger Mark un.",
      "font": "Schrëft",
      "fontSans": "Ouni Serifen",
      "fontSerif": "Mat Serifen",
      "size": "Textgréisst",
      "sizeMd": "Normal",
      "sizeSm": "Kleng",
      "shape": "Form vum Foto",
      "shapeRound": "Ronn",
      "shapeSquare": "Quadratesch"
    },
    "hidden": "verstoppt",
    "reset": "Nei ufänken",
    "resetConfirm": "Wiel nach eng Kéier, fir all d'Felder eidel ze maachen"
  }
};
