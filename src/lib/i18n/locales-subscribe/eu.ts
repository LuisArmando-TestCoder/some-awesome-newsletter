// eu strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale eu
export default {
  "welcome": {
    "title": "Ongi etorri buletinera",
    "invitedBy": "{configuratorId} erabiltzaileak harpidetzera gonbidatu zaitu."
  },
  "email": {
    "title": "Nora bidali behar dizugu ale bakoitza?",
    "placeholder": "Zure eposta"
  },
  "name": {
    "title": "Nola duzu izena?",
    "placeholder": "Zure izena"
  },
  "language": {
    "title": "Zein hizkuntzatan irakurri nahi duzu?"
  },
  "subscribed": {
    "title": "Harpidetuta zaude",
    "subtitle": "Sarrera-ontzian berrespen-mezu bat duzu zain.",
    "continueTo": "Jarraitu",
    "finishingUp": "Orri hau itxi dezakezu."
  },
  "form": {
    "heading": "Harpidetu: {title}",
    "headingFallback": "Harpidetu buletin honetara",
    "intro": "Ale berriak posta elektronikoz iristen dira, zuk aukeratutako hizkuntzan idatzita.",
    "from": "Igorlea: {sender}",
    "emailLabel": "Helbide elektronikoa",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Izena",
    "optional": "aukerakoa",
    "nameHint": "Agurtzeko erabiltzen dugu. Hutsik uzten baduzu, zure helbide elektronikoaren hasiera erabiliko dugu.",
    "languageLabel": "Aleen hizkuntza",
    "languageSummary": "Aleak hizkuntza honetan: {language}.",
    "languageChange": "Aldatu",
    "languageHint": "Zure nabigatzailearen ezarpenen arabera aukeratu dugu.",
    "submit": "Harpidetu",
    "submitting": "Harpidetzen...",
    "consent": "Harpidetzean, {sender} igorlearen mezuak jasotzea onartzen duzu. Mezu guztiek harpidetza kentzeko esteka dute.",
    "privacy": "Pribatutasun-politika",
    "loadingInfo": "Buletinaren xehetasunak kargatzen"
  },
  "success": {
    "title": "Begiratu sarrera-ontzia",
    "body": "Berrespen-mezu bat bidali dugu {email} helbidera. Ireki eta aukeratu Berretsi harpidetza.",
    "next": "Lehen alea berretsi ondoren iritsiko da, hizkuntza honetan idatzita: {language}.",
    "spam": "Minutu gutxiren buruan ezer iristen ez bada, begiratu spam karpetan edo Sustapenak karpetan.",
    "changeEmail": "Erabili beste helbide bat",
    "continueTo": "Jarraitu {host} gunera"
  },
  "errors": {
    "emailRequired": "Idatzi zure helbide elektronikoa.",
    "emailInvalid": "Helbide elektroniko hau osatu gabe dagoela dirudi. Egiaztatu eta saiatu berriro.",
    "missingLink": "Harpidetza-esteka honek informazioa falta du. Eskatu esteka berri bat igorleari.",
    "notFound": "Harpidetza-esteka honek ez du gehiago funtzionatzen. Eskatu esteka berri bat igorleari.",
    "limit": "Buletin honek ezin du harpidedun berririk onartu orain. Saiatu geroago.",
    "invalid": "Ezin izan dugu helbide hau onartu. Egiaztatu eta saiatu berriro.",
    "server": "Ezin izan dugu zure harpidetza gorde. Saiatu berriro une batean.",
    "network": "Ezin izan dugu zerbitzariarekin konektatu. Egiaztatu konexioa eta saiatu berriro."
  },
  "confirm": {
    "title": "Berretsi zure harpidetza",
    "body": "Aukeratu botoia aleak {email} helbidean jasotzen hasteko.",
    "button": "Berretsi harpidetza",
    "confirming": "Berresten...",
    "consent": "Berrestean, buletin hau posta elektronikoz jasotzea onartzen duzu. Edozein aletatik kendu dezakezu harpidetza.",
    "successTitle": "Harpidetuta zaude",
    "successBody": "Ale berriak {email} helbidera iritsiko dira.",
    "successTip": "Gehitu igorlea zure kontaktuetara, spamera joan ez daitezen.",
    "invalidTitle": "Esteka hau osatu gabe dago",
    "invalidBody": "Ireki berriro berrespen-mezua eta aukeratu bertako botoia. Aurkitzen ez baduzu, harpidetu berriro igorlearen orritik.",
    "notFoundBody": "Ez dugu helbide honetarako harpidetzarik aurkitu. Harpidetu berriro igorlearen orritik.",
    "errorBody": "Ezin izan dugu zure harpidetza berretsi. Saiatu berriro une batean.",
    "retry": "Saiatu berriro",
    "home": "Joan hasierako orrira"
  },
  "embed": {
    "title": "Gehitu harpidetza-inprimaki bat zure webgunean",
    "intro": "Itsatsi kode zati hauetako bat zure webgunean. Harpidetzen direnek berrespen-mezu bat jasoko dute, eta gero zure aleak beren hizkuntzan.",
    "linkLabel": "Harpidetza-orriaren esteka",
    "linkHint": "Partekatu sare sozialetako profil batean, posta elektronikoko sinadura batean edo QR kode batean.",
    "scriptLabel": "Script etiketa (gomendatua)",
    "scriptHint": "Itsatsi inprimakia agertu behar den lekuan. Inprimakiak berak egokitzen du bere tamaina.",
    "iframeLabel": "Iframe",
    "iframeHint": "Erabili hau zure webguneak scriptik onartzen ez badu.",
    "copy": "Kopiatu",
    "copied": "Kopiatuta",
    "copyFailed": "Hautatu testua eta kopiatu eskuz.",
    "options": "Inprimakiaren aukerak",
    "accent": "Botoiaren kolorea",
    "accentHint": "Utzi dagoen bezala zure markaren kolorea erabiltzeko.",
    "theme": "Gaia",
    "themeAuto": "Bisitariaren ezarpenaren arabera",
    "themeLight": "Argia",
    "themeDark": "Iluna",
    "layout": "Diseinua",
    "layoutFull": "Osoa (izenburua, izena eta hizkuntza)",
    "layoutCompact": "Trinkoa (helbide elektronikoa eta botoia)",
    "preview": "Aurrebista",
    "previewNote": "Aurrebista benetakoa da. Hemen harpidetzeak benetako harpidedun bat sortzen du.",
    "missing": "Sortu buletin bat lehenik. Harpidetza-inprimakia hemen agertuko da buletina dagoenean."
  },
  "page": {
    "poweredBy": "AIBAN-ekin dabil",
    "title": "Harpidetu"
  },
  "signature": {
    "title": "Posta elektronikoko sinadura",
    "intro": "Irakurleek ale bakoitzaren amaieran ikusten dute. Egin klik aurrebistaren edozein zatitan editatzeko.",
    "show": "Erakutsi nire sinadura ale guztietan",
    "showHint": "Desaktibatzen baduzu, aleak artikuluaren ondoren amaituko dira.",
    "preview": "Aurrebista",
    "previewEmpty": "Zure sinadura hutsik dago. Hasteko, gehitu zure izena.",
    "articleEnd": "Artikuluaren amaiera",
    "tabContent": "Edukia",
    "tabStyle": "Estiloa",
    "blocks": "Zer sartu",
    "blocksHint": "Aukeratu etiketa bat zati hori erakusteko edo ezkutatzeko. Ezkutatutako zatiek beren testua gordetzen dute.",
    "layout": "Diseinua",
    "layouts": {
      "bar": "Kolore-barra",
      "photo": "Argazkia",
      "stacked": "Bata bestearen azpian",
      "centered": "Erdian",
      "minimal": "Testua soilik"
    },
    "fields": {
      "name": "Izena",
      "role": "Kargua",
      "company": "Enpresa",
      "phone": "Telefonoa",
      "email": "Helbide elektronikoa",
      "website": "Webgunea",
      "address": "Helbidea",
      "photoUrl": "Argazkia",
      "logoUrl": "Logotipoa",
      "socials": "Sare sozialetako estekak",
      "cta": "Botoia",
      "disclaimer": "Lege-oharra"
    },
    "groups": {
      "about": "Zuri buruz",
      "contact": "Kontaktua",
      "images": "Irudiak",
      "socials": "Sare sozialak",
      "cta": "Botoia",
      "disclaimer": "Lege-oharra"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Sortzailea",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Kale Nagusia 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Erreserbatu dei bat",
      "ctaUrl": "https://"
    },
    "ctaText": "Botoiaren testua",
    "ctaLink": "Botoiaren esteka",
    "hints": {
      "photoUrl": "PNG edo JPG irudi karratu baterako esteka, gutxienez 144 x 144 pixelekoa eta 200 KB baino txikiagoa. 72 x 72 pixeleko tamainan agertzen da zure izenaren ondoan.",
      "logoUrl": "Atzeko plano garden edo zuriko PNG edo JPG irudi baterako esteka, gutxienez 64 pixeleko altuerakoa. 32 pixeleko altueran agertzen da.",
      "website": "https:// jartzen ez baduzu, guk gehituko dugu.",
      "cta": "Botoia testua eta esteka biak beteta daudenean bakarrik agertzen da.",
      "disclaimer": "Letra txikia behealdean, adibidez konfidentzialtasun-ohar bat. Utzi hutsik behar ez baduzu."
    },
    "style": {
      "accent": "Nabarmentze-kolorea",
      "accentHint": "Barran, esteketan eta botoian erabiltzen da. Hasieran zure markaren kolorea da.",
      "font": "Letra-tipoa",
      "fontSans": "Serif gabea",
      "fontSerif": "Serifduna",
      "size": "Testuaren tamaina",
      "sizeMd": "Arrunta",
      "sizeSm": "Txikia",
      "shape": "Argazkiaren forma",
      "shapeRound": "Biribila",
      "shapeSquare": "Karratua"
    },
    "hidden": "ezkutatuta",
    "reset": "Hasi berriro",
    "resetConfirm": "Aukeratu berriro eremu guztiak garbitzeko"
  }
};
