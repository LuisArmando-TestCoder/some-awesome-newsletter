// sl strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale sl
export default {
  "welcome": {
    "title": "Dobrodošli pri e-novicah",
    "invitedBy": "{configuratorId} vas vabi k naročnini."
  },
  "email": {
    "title": "Kam naj pošiljamo posamezne izdaje?",
    "placeholder": "Vaš e-poštni naslov"
  },
  "name": {
    "title": "Kako vam je ime?",
    "placeholder": "Vaše ime"
  },
  "language": {
    "title": "V katerem jeziku želite brati?"
  },
  "subscribed": {
    "title": "Naročeni ste",
    "subtitle": "V nabiralniku boste našli potrditveno sporočilo.",
    "continueTo": "Nadaljuj na",
    "finishingUp": "To stran lahko zaprete."
  },
  "form": {
    "heading": "Naročite se na {title}",
    "headingFallback": "Naročite se na te e-novice",
    "intro": "Nove izdaje prihajajo po e-pošti, napisane v jeziku, ki ga izberete.",
    "from": "Pošiljatelj: {sender}",
    "emailLabel": "E-poštni naslov",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Ime",
    "optional": "neobvezno",
    "nameHint": "Uporabimo ga za pozdrav. Če polje pustite prazno, uporabimo začetek vašega e-poštnega naslova.",
    "languageLabel": "Jezik izdaj",
    "languageSummary": "Izdaje v jeziku: {language}.",
    "languageChange": "Spremeni",
    "languageHint": "Izbrali smo ga glede na nastavitve vašega brskalnika.",
    "submit": "Naroči se",
    "submitting": "Naročanje...",
    "consent": "Z naročilom se strinjate, da prejemate e-pošto od {sender}. Vsako sporočilo ima povezavo za odjavo.",
    "privacy": "Pravilnik o zasebnosti",
    "loadingInfo": "Nalaganje podatkov o e-novicah"
  },
  "success": {
    "title": "Preverite nabiralnik",
    "body": "Na {email} smo poslali potrditveno sporočilo. Odprite ga in izberite Potrdi naročnino.",
    "next": "Prva izdaja pride, ko potrdite, napisana v jeziku: {language}.",
    "spam": "Če v nekaj minutah ne prejmete ničesar, poglejte v mapo z vsiljeno pošto ali Promocije.",
    "changeEmail": "Uporabi drug e-poštni naslov",
    "continueTo": "Nadaljuj na {host}"
  },
  "errors": {
    "emailRequired": "Vnesite svoj e-poštni naslov.",
    "emailInvalid": "Ta e-poštni naslov se zdi nepopoln. Preverite ga in poskusite znova.",
    "missingLink": "V tej povezavi za prijavo manjkajo podatki. Pošiljatelja prosite za novo povezavo.",
    "notFound": "Ta povezava za prijavo ne deluje več. Pošiljatelja prosite za novo povezavo.",
    "limit": "Te e-novice trenutno ne sprejemajo novih naročnikov. Poskusite pozneje.",
    "invalid": "Tega naslova nismo mogli sprejeti. Preverite ga in poskusite znova.",
    "server": "Vaše naročnine nismo mogli shraniti. Čez trenutek poskusite znova.",
    "network": "Strežnika nismo mogli doseči. Preverite povezavo in poskusite znova."
  },
  "confirm": {
    "title": "Potrdite naročnino",
    "body": "Izberite gumb in izdaje bodo začele prihajati na {email}.",
    "button": "Potrdi naročnino",
    "confirming": "Potrjevanje...",
    "consent": "S potrditvijo se strinjate, da te e-novice prejemate po e-pošti. Odjavite se lahko iz katere koli izdaje.",
    "successTitle": "Naročeni ste",
    "successBody": "Nove izdaje bodo prihajale na {email}.",
    "successTip": "Pošiljatelja dodajte med stike, da izdaje ne bodo končale med vsiljeno pošto.",
    "invalidTitle": "Ta povezava je nepopolna",
    "invalidBody": "Znova odprite potrditveno sporočilo in izberite gumb v njem. Če ga ne najdete, se znova prijavite na strani pošiljatelja.",
    "notFoundBody": "Za ta naslov nismo našli prijave. Znova se prijavite na strani pošiljatelja.",
    "errorBody": "Vaše naročnine nismo mogli potrditi. Čez trenutek poskusite znova.",
    "retry": "Poskusi znova",
    "home": "Na domačo stran"
  },
  "embed": {
    "title": "Dodajte obrazec za prijavo na svojo spletno stran",
    "intro": "Prilepite enega od teh delčkov kode na svojo spletno stran. Kdor se prijavi, prejme potrditveno sporočilo, nato pa vaše izdaje v svojem jeziku.",
    "linkLabel": "Povezava do strani za prijavo",
    "linkHint": "Delite jo v opisu profila na družbenih omrežjih, v e-poštnem podpisu ali v kodi QR.",
    "scriptLabel": "Oznaka script (priporočeno)",
    "scriptHint": "Prilepite jo tja, kjer naj se prikaže obrazec. Obrazec sam prilagodi svojo velikost.",
    "iframeLabel": "Iframe",
    "iframeHint": "To uporabite, če vaša stran ne dovoljuje skript.",
    "copy": "Kopiraj",
    "copied": "Kopirano",
    "copyFailed": "Izberite besedilo in ga kopirajte ročno.",
    "options": "Možnosti obrazca",
    "accent": "Barva gumba",
    "accentHint": "Pustite, kot je, da se uporabi barva vaše blagovne znamke.",
    "theme": "Tema",
    "themeAuto": "Po nastavitvi obiskovalca",
    "themeLight": "Svetla",
    "themeDark": "Temna",
    "layout": "Postavitev",
    "layoutFull": "Polna (naslov, ime in jezik)",
    "layoutCompact": "Strnjena (e-pošta in gumb)",
    "preview": "Predogled",
    "previewNote": "Predogled deluje zares. Prijava tukaj ustvari pravega naročnika.",
    "missing": "Najprej ustvarite e-novice. Obrazec za prijavo se bo prikazal tukaj, ko bodo obstajale."
  },
  "page": {
    "poweredBy": "Deluje na AIBAN",
    "title": "Naročite se"
  },
  "signature": {
    "title": "E-poštni podpis",
    "intro": "Bralci ga vidijo na koncu vsake izdaje. Kliknite kateri koli del predogleda, da ga uredite.",
    "show": "Prikaži moj podpis v vsaki izdaji",
    "showHint": "Če ga izklopite, se izdaje končajo za člankom.",
    "preview": "Predogled",
    "previewEmpty": "Vaš podpis je prazen. Za začetek dodajte svoje ime.",
    "articleEnd": "Konec članka",
    "tabContent": "Vsebina",
    "tabStyle": "Slog",
    "blocks": "Kaj vključiti",
    "blocksHint": "Izberite oznako, da ta del prikažete ali skrijete. Skriti deli obdržijo svoje besedilo.",
    "layout": "Postavitev",
    "layouts": {
      "bar": "Barvna črta",
      "photo": "Fotografija",
      "stacked": "Eno pod drugim",
      "centered": "Na sredini",
      "minimal": "Samo besedilo"
    },
    "fields": {
      "name": "Ime",
      "role": "Delovno mesto",
      "company": "Podjetje",
      "phone": "Telefon",
      "email": "E-pošta",
      "website": "Spletna stran",
      "address": "Naslov",
      "photoUrl": "Fotografija",
      "logoUrl": "Logotip",
      "socials": "Povezave do družbenih omrežij",
      "cta": "Gumb",
      "disclaimer": "Pravno obvestilo"
    },
    "groups": {
      "about": "O vas",
      "contact": "Stik",
      "images": "Slike",
      "socials": "Družbena omrežja",
      "cta": "Gumb",
      "disclaimer": "Pravno obvestilo"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Ustanoviteljica",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Glavna ulica 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Dogovorite se za klic",
      "ctaUrl": "https://"
    },
    "ctaText": "Besedilo gumba",
    "ctaLink": "Povezava gumba",
    "hints": {
      "photoUrl": "Povezava do kvadratne slike PNG ali JPG, velike vsaj 144 × 144 slikovnih pik in manjše od 200 KB. Prikaže se v velikosti 72 × 72 slikovnih pik ob vašem imenu.",
      "logoUrl": "Povezava do slike PNG ali JPG s prosojnim ali belim ozadjem, visoke vsaj 64 slikovnih pik. Prikaže se v višini 32 slikovnih pik.",
      "website": "Če izpustite https://, ga dodamo mi.",
      "cta": "Gumb se prikaže le, če vnesete besedilo in povezavo.",
      "disclaimer": "Drobni tisk na dnu, na primer obvestilo o zaupnosti. Pustite prazno, če ga ne potrebujete."
    },
    "style": {
      "accent": "Poudarjalna barva",
      "accentHint": "Uporablja se za črto, povezave in gumb. Privzeto je barva vaše blagovne znamke.",
      "font": "Pisava",
      "fontSans": "Brez serifov",
      "fontSerif": "S serifi",
      "size": "Velikost besedila",
      "sizeMd": "Običajna",
      "sizeSm": "Majhna",
      "shape": "Oblika fotografije",
      "shapeRound": "Okrogla",
      "shapeSquare": "Kvadratna"
    },
    "hidden": "skrito",
    "reset": "Začni znova",
    "resetConfirm": "Izberite znova, da izpraznite vsa polja"
  }
};
