// sr strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale sr
export default {
  "welcome": {
    "title": "Dobro došli u bilten",
    "invitedBy": "{configuratorId} vas poziva da se pretplatite."
  },
  "email": {
    "title": "Gde da vam šaljemo svako izdanje?",
    "placeholder": "Vaš email"
  },
  "name": {
    "title": "Kako se zovete?",
    "placeholder": "Vaše ime"
  },
  "language": {
    "title": "Na kom jeziku želite da čitate?"
  },
  "subscribed": {
    "title": "Pretplaćeni ste",
    "subtitle": "U prijemnom sandučetu ćete naći imejl za potvrdu.",
    "continueTo": "Nastavi na",
    "finishingUp": "Ovu stranicu možete da zatvorite."
  },
  "form": {
    "heading": "Pretplatite se na {title}",
    "headingFallback": "Pretplatite se na ovaj bilten",
    "intro": "Nova izdanja stižu imejlom, napisana na jeziku koji izaberete.",
    "from": "Pošiljalac: {sender}",
    "emailLabel": "Imejl adresa",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Ime",
    "optional": "nije obavezno",
    "nameHint": "Koristimo ga za pozdrav. Ako polje ostavite prazno, koristićemo početak vaše imejl adrese.",
    "languageLabel": "Jezik izdanja",
    "languageSummary": "Izdanja na jeziku: {language}.",
    "languageChange": "Promeni",
    "languageHint": "Izabrali smo ga prema podešavanjima vašeg pregledača.",
    "submit": "Pretplati se",
    "submitting": "Pretplata u toku...",
    "consent": "Pretplatom pristajete da primate imejlove od {sender}. Svaki imejl ima link za odjavu.",
    "privacy": "Politika privatnosti",
    "loadingInfo": "Učitavanje podataka o biltenu"
  },
  "success": {
    "title": "Proverite prijemno sanduče",
    "body": "Poslali smo imejl za potvrdu na {email}. Otvorite ga i izaberite Potvrdi pretplatu.",
    "next": "Prvo izdanje stiže posle potvrde, napisano na jeziku: {language}.",
    "spam": "Ako ništa ne stigne za nekoliko minuta, pogledajte u fasciklu za neželjenu poštu ili Promocije.",
    "changeEmail": "Koristi drugi imejl",
    "continueTo": "Nastavi na {host}"
  },
  "errors": {
    "emailRequired": "Unesite svoju imejl adresu.",
    "emailInvalid": "Ova imejl adresa izgleda nepotpuno. Proverite je i pokušajte ponovo.",
    "missingLink": "U ovom linku za prijavu nedostaju podaci. Zatražite novi link od pošiljaoca.",
    "notFound": "Ovaj link za prijavu više ne radi. Zatražite novi link od pošiljaoca.",
    "limit": "Ovaj bilten trenutno ne može da primi nove pretplatnike. Pokušajte kasnije.",
    "invalid": "Nismo mogli da prihvatimo ovu adresu. Proverite je i pokušajte ponovo.",
    "server": "Nismo mogli da sačuvamo vašu pretplatu. Pokušajte ponovo za trenutak.",
    "network": "Nismo mogli da se povežemo sa serverom. Proverite vezu i pokušajte ponovo."
  },
  "confirm": {
    "title": "Potvrdite pretplatu",
    "body": "Izaberite dugme i izdanja će početi da stižu na {email}.",
    "button": "Potvrdi pretplatu",
    "confirming": "Potvrđivanje...",
    "consent": "Potvrdom pristajete da ovaj bilten primate imejlom. Možete da se odjavite iz bilo kog izdanja.",
    "successTitle": "Pretplaćeni ste",
    "successBody": "Nova izdanja će stizati na {email}.",
    "successTip": "Dodajte pošiljaoca u kontakte da izdanja ne bi završila u neželjenoj pošti.",
    "invalidTitle": "Ovaj link nije potpun",
    "invalidBody": "Ponovo otvorite imejl za potvrdu i izaberite dugme u njemu. Ako ne možete da ga nađete, ponovo se prijavite na stranici pošiljaoca.",
    "notFoundBody": "Nismo našli prijavu za ovu adresu. Ponovo se prijavite na stranici pošiljaoca.",
    "errorBody": "Nismo mogli da potvrdimo vašu pretplatu. Pokušajte ponovo za trenutak.",
    "retry": "Pokušaj ponovo",
    "home": "Idi na početnu stranicu"
  },
  "embed": {
    "title": "Dodajte formular za prijavu na svoj sajt",
    "intro": "Nalepite jedan od ovih isečaka koda na svoj sajt. Ko se prijavi, dobiće imejl za potvrdu, a zatim vaša izdanja na svom jeziku.",
    "linkLabel": "Link do stranice za prijavu",
    "linkHint": "Podelite ga u opisu profila na društvenim mrežama, u imejl potpisu ili u QR kodu.",
    "scriptLabel": "Script tag (preporučeno)",
    "scriptHint": "Nalepite ga tamo gde formular treba da se pojavi. Formular sam prilagođava svoju veličinu.",
    "iframeLabel": "Iframe",
    "iframeHint": "Koristite ovo ako vaš sajt ne dozvoljava skripte.",
    "copy": "Kopiraj",
    "copied": "Kopirano",
    "copyFailed": "Označite tekst i kopirajte ga ručno.",
    "options": "Opcije formulara",
    "accent": "Boja dugmeta",
    "accentHint": "Ostavite kako jeste da bi se koristila boja vašeg brenda.",
    "theme": "Tema",
    "themeAuto": "Prema podešavanju posetioca",
    "themeLight": "Svetla",
    "themeDark": "Tamna",
    "layout": "Raspored",
    "layoutFull": "Pun (naslov, ime i jezik)",
    "layoutCompact": "Sažet (imejl i dugme)",
    "preview": "Pregled",
    "previewNote": "Pregled je stvaran. Prijava ovde pravi pravog pretplatnika.",
    "missing": "Prvo napravite bilten. Formular za prijavu pojaviće se ovde kada bilten postoji."
  },
  "page": {
    "poweredBy": "Pokreće AIBAN",
    "title": "Pretplata"
  },
  "signature": {
    "title": "Imejl potpis",
    "intro": "Čitaoci ga vide na kraju svakog izdanja. Kliknite bilo koji deo pregleda da ga izmenite.",
    "show": "Prikaži moj potpis u svakom izdanju",
    "showHint": "Ako ga isključite, izdanja se završavaju posle članka.",
    "preview": "Pregled",
    "previewEmpty": "Vaš potpis je prazan. Za početak dodajte svoje ime.",
    "articleEnd": "Kraj članka",
    "tabContent": "Sadržaj",
    "tabStyle": "Stil",
    "blocks": "Šta uključiti",
    "blocksHint": "Izaberite oznaku da taj deo prikažete ili sakrijete. Skriveni delovi zadržavaju svoj tekst.",
    "layout": "Raspored",
    "layouts": {
      "bar": "Traka u boji",
      "photo": "Fotografija",
      "stacked": "Jedno ispod drugog",
      "centered": "Centrirano",
      "minimal": "Samo tekst"
    },
    "fields": {
      "name": "Ime",
      "role": "Radno mesto",
      "company": "Firma",
      "phone": "Telefon",
      "email": "Imejl",
      "website": "Sajt",
      "address": "Adresa",
      "photoUrl": "Fotografija",
      "logoUrl": "Logo",
      "socials": "Linkovi ka društvenim mrežama",
      "cta": "Dugme",
      "disclaimer": "Pravna napomena"
    },
    "groups": {
      "about": "O vama",
      "contact": "Kontakt",
      "images": "Slike",
      "socials": "Društvene mreže",
      "cta": "Dugme",
      "disclaimer": "Pravna napomena"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Osnivačica",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Glavna ulica 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Zakažite poziv",
      "ctaUrl": "https://"
    },
    "ctaText": "Tekst dugmeta",
    "ctaLink": "Link dugmeta",
    "hints": {
      "photoUrl": "Link ka kvadratnoj slici PNG ili JPG, najmanje 144 × 144 piksela i manjoj od 200 KB. Prikazuje se u veličini 72 × 72 piksela pored vašeg imena.",
      "logoUrl": "Link ka slici PNG ili JPG sa providnom ili belom pozadinom, visokoj najmanje 64 piksela. Prikazuje se u visini od 32 piksela.",
      "website": "Ako izostavite https://, dodaćemo ga.",
      "cta": "Dugme se prikazuje samo ako unesete i tekst i link.",
      "disclaimer": "Sitna slova na dnu, na primer napomena o poverljivosti. Ostavite prazno ako vam ne treba."
    },
    "style": {
      "accent": "Boja naglaska",
      "accentHint": "Koristi se za traku, linkove i dugme. Na početku je to boja vašeg brenda.",
      "font": "Font",
      "fontSans": "Bez serifa",
      "fontSerif": "Sa serifima",
      "size": "Veličina teksta",
      "sizeMd": "Uobičajena",
      "sizeSm": "Mala",
      "shape": "Oblik fotografije",
      "shapeRound": "Okrugli",
      "shapeSquare": "Kvadratni"
    },
    "hidden": "skriveno",
    "reset": "Počni ispočetka",
    "resetConfirm": "Izaberite ponovo da ispraznite sva polja"
  }
};
