// hr strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale hr
export default {
  "welcome": {
    "title": "Dobro došli u newsletter",
    "invitedBy": "{configuratorId} vas poziva da se pretplatite."
  },
  "email": {
    "title": "Kamo da vam šaljemo svako izdanje?",
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
    "subtitle": "U pretincu ćete pronaći e-poruku za potvrdu.",
    "continueTo": "Nastavi na",
    "finishingUp": "Ovu stranicu možete zatvoriti."
  },
  "form": {
    "heading": "Pretplatite se na {title}",
    "headingFallback": "Pretplatite se na ovaj newsletter",
    "intro": "Nova izdanja stižu e-poštom, napisana na jeziku koji odaberete.",
    "from": "Pošiljatelj: {sender}",
    "emailLabel": "Adresa e-pošte",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Ime",
    "optional": "nije obavezno",
    "nameHint": "Koristimo ga za pozdrav. Ako polje ostavite prazno, koristit ćemo početak vaše adrese e-pošte.",
    "languageLabel": "Jezik izdanja",
    "languageSummary": "Izdanja na jeziku: {language}.",
    "languageChange": "Promijeni",
    "languageHint": "Odabrali smo ga prema postavkama vašeg preglednika.",
    "submit": "Pretplati se",
    "submitting": "Pretplata u tijeku...",
    "consent": "Pretplatom pristajete na primanje e-pošte od {sender}. Svaka poruka ima poveznicu za odjavu.",
    "privacy": "Pravila privatnosti",
    "loadingInfo": "Učitavanje podataka o newsletteru"
  },
  "success": {
    "title": "Provjerite pretinac",
    "body": "Poslali smo e-poruku za potvrdu na {email}. Otvorite je i odaberite Potvrdi pretplatu.",
    "next": "Prvo izdanje stiže nakon potvrde, napisano na jeziku: {language}.",
    "spam": "Ako ništa ne stigne za nekoliko minuta, pogledajte u mapu neželjene pošte ili Promocije.",
    "changeEmail": "Koristi drugu adresu e-pošte",
    "continueTo": "Nastavi na {host}"
  },
  "errors": {
    "emailRequired": "Unesite svoju adresu e-pošte.",
    "emailInvalid": "Ova adresa e-pošte izgleda nepotpuno. Provjerite je i pokušajte ponovno.",
    "missingLink": "U ovoj poveznici za prijavu nedostaju podaci. Zatražite novu poveznicu od pošiljatelja.",
    "notFound": "Ova poveznica za prijavu više ne radi. Zatražite novu poveznicu od pošiljatelja.",
    "limit": "Ovaj newsletter trenutačno ne može primiti nove pretplatnike. Pokušajte kasnije.",
    "invalid": "Nismo mogli prihvatiti ovu adresu. Provjerite je i pokušajte ponovno.",
    "server": "Nismo mogli spremiti vašu pretplatu. Pokušajte ponovno za trenutak.",
    "network": "Nismo se mogli povezati s poslužiteljem. Provjerite vezu i pokušajte ponovno."
  },
  "confirm": {
    "title": "Potvrdite pretplatu",
    "body": "Odaberite gumb i izdanja će početi stizati na {email}.",
    "button": "Potvrdi pretplatu",
    "confirming": "Potvrđivanje...",
    "consent": "Potvrdom pristajete na primanje ovog newslettera e-poštom. Odjaviti se možete iz bilo kojeg izdanja.",
    "successTitle": "Pretplaćeni ste",
    "successBody": "Nova izdanja stizat će na {email}.",
    "successTip": "Dodajte pošiljatelja u kontakte kako izdanja ne bi završila u neželjenoj pošti.",
    "invalidTitle": "Ova poveznica nije potpuna",
    "invalidBody": "Ponovno otvorite e-poruku za potvrdu i odaberite gumb u njoj. Ako je ne možete pronaći, ponovno se prijavite na stranici pošiljatelja.",
    "notFoundBody": "Nismo pronašli prijavu za ovu adresu. Ponovno se prijavite na stranici pošiljatelja.",
    "errorBody": "Nismo mogli potvrditi vašu pretplatu. Pokušajte ponovno za trenutak.",
    "retry": "Pokušaj ponovno",
    "home": "Idi na početnu stranicu"
  },
  "embed": {
    "title": "Dodajte obrazac za prijavu na svoju stranicu",
    "intro": "Zalijepite jedan od ovih isječaka koda na svoju stranicu. Tko se prijavi, dobit će e-poruku za potvrdu, a zatim vaša izdanja na svojem jeziku.",
    "linkLabel": "Poveznica na stranicu za prijavu",
    "linkHint": "Podijelite je u opisu profila na društvenim mrežama, u potpisu e-pošte ili u QR kodu.",
    "scriptLabel": "Oznaka script (preporučeno)",
    "scriptHint": "Zalijepite je ondje gdje se obrazac treba pojaviti. Obrazac sam prilagođava svoju veličinu.",
    "iframeLabel": "Iframe",
    "iframeHint": "Koristite ovo ako vaša stranica ne dopušta skripte.",
    "copy": "Kopiraj",
    "copied": "Kopirano",
    "copyFailed": "Označite tekst i kopirajte ga ručno.",
    "options": "Mogućnosti obrasca",
    "accent": "Boja gumba",
    "accentHint": "Ostavite kako jest za boju svoje marke.",
    "theme": "Tema",
    "themeAuto": "Prema postavci posjetitelja",
    "themeLight": "Svijetla",
    "themeDark": "Tamna",
    "layout": "Raspored",
    "layoutFull": "Potpuni (naslov, ime i jezik)",
    "layoutCompact": "Sažeti (e-pošta i gumb)",
    "preview": "Pretpregled",
    "previewNote": "Pretpregled je stvaran. Prijava ovdje stvara pravog pretplatnika.",
    "missing": "Najprije izradite newsletter. Obrazac za prijavu pojavit će se ovdje kad newsletter postoji."
  },
  "page": {
    "poweredBy": "Pokreće AIBAN",
    "title": "Pretplata"
  },
  "signature": {
    "title": "Potpis e-pošte",
    "intro": "Čitatelji ga vide na kraju svakog izdanja. Kliknite bilo koji dio pretpregleda da biste ga uredili.",
    "show": "Prikaži moj potpis u svakom izdanju",
    "showHint": "Ako ga isključite, izdanja završavaju nakon članka.",
    "preview": "Pretpregled",
    "previewEmpty": "Vaš potpis je prazan. Za početak dodajte svoje ime.",
    "articleEnd": "Kraj članka",
    "tabContent": "Sadržaj",
    "tabStyle": "Stil",
    "blocks": "Što uključiti",
    "blocksHint": "Odaberite oznaku da biste taj dio prikazali ili sakrili. Skriveni dijelovi zadržavaju svoj tekst.",
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
      "company": "Tvrtka",
      "phone": "Telefon",
      "email": "E-pošta",
      "website": "Web-stranica",
      "address": "Adresa",
      "photoUrl": "Fotografija",
      "logoUrl": "Logotip",
      "socials": "Poveznice na društvene mreže",
      "cta": "Gumb",
      "disclaimer": "Pravna napomena"
    },
    "groups": {
      "about": "O vama",
      "contact": "Kontakt",
      "images": "Slike",
      "socials": "Društvene mreže",
      "cta": "Gumb",
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
      "ctaLabel": "Dogovorite poziv",
      "ctaUrl": "https://"
    },
    "ctaText": "Tekst gumba",
    "ctaLink": "Poveznica gumba",
    "hints": {
      "photoUrl": "Poveznica na kvadratnu sliku PNG ili JPG, najmanje 144 × 144 piksela i manju od 200 KB. Prikazuje se u veličini 72 × 72 piksela pokraj vašeg imena.",
      "logoUrl": "Poveznica na sliku PNG ili JPG s prozirnom ili bijelom pozadinom, visoku najmanje 64 piksela. Prikazuje se u visini od 32 piksela.",
      "website": "Ako izostavite https://, dodat ćemo ga.",
      "cta": "Gumb se prikazuje samo ako unesete i tekst i poveznicu.",
      "disclaimer": "Sitni tisak na dnu, na primjer napomena o povjerljivosti. Ostavite prazno ako vam ne treba."
    },
    "style": {
      "accent": "Boja naglaska",
      "accentHint": "Koristi se za traku, poveznice i gumb. Na početku je to boja vaše marke.",
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
    "resetConfirm": "Odaberite ponovno da biste ispraznili sva polja"
  }
};
