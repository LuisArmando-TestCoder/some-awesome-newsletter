// ro strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale ro
export default {
  "welcome": {
    "title": "Bun venit la newsletter",
    "invitedBy": "{configuratorId} te invită să te abonezi."
  },
  "email": {
    "title": "Unde să trimitem fiecare ediție?",
    "placeholder": "Email-ul tău"
  },
  "name": {
    "title": "Cum te numești?",
    "placeholder": "Numele tău"
  },
  "language": {
    "title": "În ce limbă vrei să citești?"
  },
  "subscribed": {
    "title": "Te-ai abonat",
    "subtitle": "În inbox te așteaptă un e-mail de confirmare.",
    "continueTo": "Continuă către",
    "finishingUp": "Poți închide această pagină."
  },
  "form": {
    "heading": "Abonează-te la {title}",
    "headingFallback": "Abonează-te la acest newsletter",
    "intro": "Edițiile noi sosesc pe e-mail, scrise în limba pe care o alegi.",
    "from": "De la {sender}",
    "emailLabel": "Adresă de e-mail",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Prenume",
    "optional": "opțional",
    "nameHint": "Îl folosim ca să te salutăm. Dacă îl lași gol, folosim începutul adresei tale de e-mail.",
    "languageLabel": "Limba edițiilor",
    "languageSummary": "Ediții în {language}.",
    "languageChange": "Schimbă",
    "languageHint": "Am ales-o după setările browserului tău.",
    "submit": "Abonează-te",
    "submitting": "Se face abonarea...",
    "consent": "Prin abonare, accepți să primești e-mailuri de la {sender}. Fiecare e-mail are un link de dezabonare.",
    "privacy": "Politica de confidențialitate",
    "loadingInfo": "Se încarcă detaliile newsletterului"
  },
  "success": {
    "title": "Verifică-ți inboxul",
    "body": "Am trimis un e-mail de confirmare la {email}. Deschide-l și alege Confirmă abonarea.",
    "next": "Prima ediție sosește după ce confirmi, scrisă în {language}.",
    "spam": "Dacă nu primești nimic în câteva minute, uită-te în dosarul Spam sau Promoții.",
    "changeEmail": "Folosește alt e-mail",
    "continueTo": "Continuă spre {host}"
  },
  "errors": {
    "emailRequired": "Introdu adresa de e-mail.",
    "emailInvalid": "Adresa de e-mail pare incompletă. Verific-o și încearcă din nou.",
    "missingLink": "Acestui link de abonare îi lipsesc informații. Cere-i expeditorului un link nou.",
    "notFound": "Acest link de abonare nu mai funcționează. Cere-i expeditorului un link nou.",
    "limit": "Acest newsletter nu poate primi abonați noi acum. Încearcă mai târziu.",
    "invalid": "Nu am putut accepta această adresă. Verific-o și încearcă din nou.",
    "server": "Nu am putut salva abonarea. Încearcă din nou peste câteva momente.",
    "network": "Nu am putut contacta serverul. Verifică-ți conexiunea și încearcă din nou."
  },
  "confirm": {
    "title": "Confirmă abonarea",
    "body": "Alege butonul ca să începi să primești ediții la {email}.",
    "button": "Confirmă abonarea",
    "confirming": "Se confirmă...",
    "consent": "Prin confirmare, accepți să primești acest newsletter pe e-mail. Te poți dezabona din orice ediție.",
    "successTitle": "Te-ai abonat",
    "successBody": "Edițiile noi vor sosi la {email}.",
    "successTip": "Ca să nu ajungă în spam, adaugă expeditorul în contactele tale.",
    "invalidTitle": "Acest link este incomplet",
    "invalidBody": "Deschide din nou e-mailul de confirmare și alege butonul din el. Dacă nu îl găsești, abonează-te din nou de pe pagina expeditorului.",
    "notFoundBody": "Nu am găsit nicio abonare pentru această adresă. Abonează-te din nou de pe pagina expeditorului.",
    "errorBody": "Nu am putut confirma abonarea. Încearcă din nou peste câteva momente.",
    "retry": "Încearcă din nou",
    "home": "Mergi la pagina principală"
  },
  "embed": {
    "title": "Adaugă un formular de abonare pe site-ul tău",
    "intro": "Lipește unul dintre aceste fragmente de cod pe site-ul tău. Cei care se abonează primesc un e-mail de confirmare, apoi edițiile tale în limba lor.",
    "linkLabel": "Linkul paginii de abonare",
    "linkHint": "Distribuie-l în descrierea unui profil social, într-o semnătură de e-mail sau într-un cod QR.",
    "scriptLabel": "Etichetă script (recomandat)",
    "scriptHint": "Lipește-o acolo unde trebuie să apară formularul. Formularul își ajustează singur dimensiunea.",
    "iframeLabel": "Iframe",
    "iframeHint": "Folosește această variantă dacă site-ul tău nu permite scripturi.",
    "copy": "Copiază",
    "copied": "Copiat",
    "copyFailed": "Selectează textul și copiază-l manual.",
    "options": "Opțiuni formular",
    "accent": "Culoarea butonului",
    "accentHint": "Las-o așa pentru a folosi culoarea brandului tău.",
    "theme": "Temă",
    "themeAuto": "După setarea vizitatorului",
    "themeLight": "Luminoasă",
    "themeDark": "Întunecată",
    "layout": "Aspect",
    "layoutFull": "Complet (titlu, nume și limbă)",
    "layoutCompact": "Compact (e-mail și buton)",
    "preview": "Previzualizare",
    "previewNote": "Previzualizarea funcționează real. O abonare aici creează un abonat real.",
    "missing": "Creează mai întâi un newsletter. Formularul de abonare apare aici după ce există."
  },
  "page": {
    "poweredBy": "Funcționează cu AIBAN",
    "title": "Abonare"
  },
  "signature": {
    "title": "Semnătură de e-mail",
    "intro": "Cititorii o văd la finalul fiecărei ediții. Dă clic pe orice parte a previzualizării ca s-o editezi.",
    "show": "Afișează semnătura mea în fiecare ediție",
    "showHint": "Dacă o dezactivezi, edițiile se termină după articol.",
    "preview": "Previzualizare",
    "previewEmpty": "Semnătura ta este goală. Adaugă-ți numele ca să începi.",
    "articleEnd": "Sfârșitul articolului",
    "tabContent": "Conținut",
    "tabStyle": "Stil",
    "blocks": "Ce să includă",
    "blocksHint": "Alege o etichetă ca să afișezi sau să ascunzi acea parte. Părțile ascunse își păstrează textul.",
    "layout": "Aspect",
    "layouts": {
      "bar": "Bară colorată",
      "photo": "Fotografie",
      "stacked": "Unul sub altul",
      "centered": "Centrat",
      "minimal": "Doar text"
    },
    "fields": {
      "name": "Nume",
      "role": "Funcție",
      "company": "Companie",
      "phone": "Telefon",
      "email": "E-mail",
      "website": "Site web",
      "address": "Adresă",
      "photoUrl": "Fotografie",
      "logoUrl": "Logo",
      "socials": "Linkuri sociale",
      "cta": "Buton",
      "disclaimer": "Notă legală"
    },
    "groups": {
      "about": "Despre tine",
      "contact": "Contact",
      "images": "Imagini",
      "socials": "Linkuri sociale",
      "cta": "Buton",
      "disclaimer": "Notă legală"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Fondatoare",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Strada Principală 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Programează o discuție",
      "ctaUrl": "https://"
    },
    "ctaText": "Textul butonului",
    "ctaLink": "Linkul butonului",
    "hints": {
      "photoUrl": "Link către o imagine PNG sau JPG pătrată, de cel puțin 144 pe 144 pixeli și sub 200 KB. Apare la 72 pe 72 pixeli lângă numele tău.",
      "logoUrl": "Link către o imagine PNG sau JPG cu fundal transparent sau alb, înaltă de cel puțin 64 pixeli. Apare cu înălțimea de 32 pixeli.",
      "website": "Adăugăm noi https:// dacă îl omiți.",
      "cta": "Butonul apare doar dacă completezi atât textul, cât și linkul.",
      "disclaimer": "Text mic în partea de jos, de exemplu o notă de confidențialitate. Lasă gol dacă nu ai nevoie."
    },
    "style": {
      "accent": "Culoare de accent",
      "accentHint": "Folosită pentru bară, linkuri și buton. Pornește de la culoarea brandului tău.",
      "font": "Font",
      "fontSans": "Fără serife",
      "fontSerif": "Cu serife",
      "size": "Dimensiunea textului",
      "sizeMd": "Normală",
      "sizeSm": "Mică",
      "shape": "Forma fotografiei",
      "shapeRound": "Rotundă",
      "shapeSquare": "Pătrată"
    },
    "hidden": "ascuns",
    "reset": "Începe de la zero",
    "resetConfirm": "Alege din nou pentru a goli toate câmpurile"
  }
};
