// bs strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale bs
export default {
  "welcome": {
    "title": "Dobro došli u newsletter",
    "invitedBy": "{configuratorId} vas poziva da se pretplatite."
  },
  "email": {
    "title": "Gdje da vam šaljemo svako izdanje?",
    "placeholder": "Vaš email"
  },
  "name": {
    "title": "Kako se zovete?",
    "placeholder": "Vaše ime"
  },
  "language": {
    "title": "Na kojem jeziku želite čitati?"
  },
  "subscribed": {
    "title": "Pretplaćeni ste",
    "subtitle": "U inboxu ćete naći email za potvrdu.",
    "continueTo": "Nastavi na",
    "finishingUp": "Ovu stranicu možete zatvoriti."
  },
  "form": {
    "heading": "Pretplatite se na {title}",
    "headingFallback": "Pretplatite se na ovaj newsletter",
    "intro": "Nova izdanja stižu emailom, napisana na jeziku koji izaberete.",
    "from": "Pošiljalac: {sender}",
    "emailLabel": "Email adresa",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Ime",
    "optional": "nije obavezno",
    "nameHint": "Koristimo ga za pozdrav. Ako polje ostavite prazno, koristit ćemo početak vaše email adrese.",
    "languageLabel": "Jezik izdanja",
    "languageSummary": "Izdanja na jeziku: {language}.",
    "languageChange": "Promijeni",
    "languageHint": "Izabrali smo ga prema postavkama vašeg preglednika.",
    "submit": "Pretplati se",
    "submitting": "Pretplata u toku...",
    "consent": "Pretplatom pristajete da primate emailove od {sender}. Svaki email ima link za odjavu.",
    "privacy": "Politika privatnosti",
    "loadingInfo": "Učitavanje podataka o newsletteru"
  },
  "success": {
    "title": "Provjerite inbox",
    "body": "Poslali smo email za potvrdu na {email}. Otvorite ga i izaberite Potvrdi pretplatu.",
    "next": "Prvo izdanje stiže nakon potvrde, napisano na jeziku: {language}.",
    "spam": "Ako ništa ne stigne za nekoliko minuta, pogledajte u folder neželjene pošte ili Promocije.",
    "changeEmail": "Koristi drugi email",
    "continueTo": "Nastavi na {host}"
  },
  "errors": {
    "emailRequired": "Unesite svoju email adresu.",
    "emailInvalid": "Ova email adresa izgleda nepotpuno. Provjerite je i pokušajte ponovo.",
    "missingLink": "U ovom linku za prijavu nedostaju podaci. Zatražite novi link od pošiljaoca.",
    "notFound": "Ovaj link za prijavu više ne radi. Zatražite novi link od pošiljaoca.",
    "limit": "Ovaj newsletter trenutno ne može primiti nove pretplatnike. Pokušajte kasnije.",
    "invalid": "Nismo mogli prihvatiti ovu adresu. Provjerite je i pokušajte ponovo.",
    "server": "Nismo mogli sačuvati vašu pretplatu. Pokušajte ponovo za trenutak.",
    "network": "Nismo se mogli povezati sa serverom. Provjerite vezu i pokušajte ponovo."
  },
  "confirm": {
    "title": "Potvrdite pretplatu",
    "body": "Izaberite dugme i izdanja će početi stizati na {email}.",
    "button": "Potvrdi pretplatu",
    "confirming": "Potvrđivanje...",
    "consent": "Potvrdom pristajete da ovaj newsletter primate emailom. Odjaviti se možete iz bilo kojeg izdanja.",
    "successTitle": "Pretplaćeni ste",
    "successBody": "Nova izdanja stizat će na {email}.",
    "successTip": "Dodajte pošiljaoca u kontakte da izdanja ne bi završila u neželjenoj pošti.",
    "invalidTitle": "Ovaj link nije potpun",
    "invalidBody": "Ponovo otvorite email za potvrdu i izaberite dugme u njemu. Ako ga ne možete naći, ponovo se prijavite na stranici pošiljaoca.",
    "notFoundBody": "Nismo našli prijavu za ovu adresu. Ponovo se prijavite na stranici pošiljaoca.",
    "errorBody": "Nismo mogli potvrditi vašu pretplatu. Pokušajte ponovo za trenutak.",
    "retry": "Pokušaj ponovo",
    "home": "Idi na početnu stranicu"
  },
  "embed": {
    "title": "Dodajte formular za prijavu na svoju stranicu",
    "intro": "Zalijepite jedan od ovih isječaka koda na svoju stranicu. Ko se prijavi, dobit će email za potvrdu, a zatim vaša izdanja na svom jeziku.",
    "linkLabel": "Link do stranice za prijavu",
    "linkHint": "Podijelite ga u opisu profila na društvenim mrežama, u email potpisu ili u QR kodu.",
    "scriptLabel": "Script tag (preporučeno)",
    "scriptHint": "Zalijepite ga tamo gdje formular treba da se pojavi. Formular sam prilagođava svoju veličinu.",
    "iframeLabel": "Iframe",
    "iframeHint": "Koristite ovo ako vaša stranica ne dozvoljava skripte.",
    "copy": "Kopiraj",
    "copied": "Kopirano",
    "copyFailed": "Označite tekst i kopirajte ga ručno.",
    "options": "Opcije formulara",
    "accent": "Boja dugmeta",
    "accentHint": "Ostavite kako jeste da bi se koristila boja vašeg brenda.",
    "theme": "Tema",
    "themeAuto": "Prema postavci posjetioca",
    "themeLight": "Svijetla",
    "themeDark": "Tamna",
    "layout": "Raspored",
    "layoutFull": "Puni (naslov, ime i jezik)",
    "layoutCompact": "Sažeti (email i dugme)",
    "preview": "Pregled",
    "previewNote": "Pregled je stvaran. Prijava ovdje pravi stvarnog pretplatnika.",
    "missing": "Prvo napravite newsletter. Formular za prijavu pojavit će se ovdje kada newsletter postoji."
  },
  "page": {
    "poweredBy": "Pokreće AIBAN",
    "title": "Pretplata"
  },
  "signature": {
    "title": "Email potpis",
    "intro": "Čitaoci ga vide na kraju svakog izdanja. Kliknite bilo koji dio pregleda da ga uredite.",
    "show": "Prikaži moj potpis u svakom izdanju",
    "showHint": "Ako ga isključite, izdanja završavaju nakon članka.",
    "preview": "Pregled",
    "previewEmpty": "Vaš potpis je prazan. Za početak dodajte svoje ime.",
    "articleEnd": "Kraj članka",
    "tabContent": "Sadržaj",
    "tabStyle": "Stil",
    "blocks": "Šta uključiti",
    "blocksHint": "Izaberite oznaku da taj dio prikažete ili sakrijete. Skriveni dijelovi zadržavaju svoj tekst.",
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
      "role": "Radno mjesto",
      "company": "Firma",
      "phone": "Telefon",
      "email": "Email",
      "website": "Web stranica",
      "address": "Adresa",
      "photoUrl": "Fotografija",
      "logoUrl": "Logo",
      "socials": "Linkovi na društvene mreže",
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
      "photoUrl": "Link na kvadratnu sliku PNG ili JPG, najmanje 144 × 144 piksela i manju od 200 KB. Prikazuje se u veličini 72 × 72 piksela pored vašeg imena.",
      "logoUrl": "Link na sliku PNG ili JPG s providnom ili bijelom pozadinom, visoku najmanje 64 piksela. Prikazuje se u visini od 32 piksela.",
      "website": "Ako izostavite https://, dodat ćemo ga.",
      "cta": "Dugme se prikazuje samo ako unesete i tekst i link.",
      "disclaimer": "Sitna slova na dnu, na primjer napomena o povjerljivosti. Ostavite prazno ako vam ne treba."
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
