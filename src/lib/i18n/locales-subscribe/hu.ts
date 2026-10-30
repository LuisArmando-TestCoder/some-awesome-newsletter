// hu strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale hu
export default {
  "welcome": {
    "title": "Üdv a hírlevélnél",
    "invitedBy": "{configuratorId} meghívott, hogy iratkozz fel."
  },
  "email": {
    "title": "Hová küldjük az egyes számokat?",
    "placeholder": "Az e-mail címed"
  },
  "name": {
    "title": "Hogy hívnak?",
    "placeholder": "A neved"
  },
  "language": {
    "title": "Milyen nyelven szeretnél olvasni?"
  },
  "subscribed": {
    "title": "Feliratkoztál",
    "subtitle": "A postafiókodban vár egy megerősítő e-mail.",
    "continueTo": "Tovább ide",
    "finishingUp": "Ezt az oldalt bezárhatod."
  },
  "form": {
    "heading": "Feliratkozás: {title}",
    "headingFallback": "Feliratkozás erre a hírlevélre",
    "intro": "Az új számok e-mailben érkeznek, a választott nyelven.",
    "from": "Feladó: {sender}",
    "emailLabel": "E-mail-cím",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Keresztnév",
    "optional": "nem kötelező",
    "nameHint": "Ezzel köszöntünk. Ha üresen hagyod, az e-mail-címed elejét használjuk.",
    "languageLabel": "A számok nyelve",
    "languageSummary": "Számok ezen a nyelven: {language}.",
    "languageChange": "Módosítás",
    "languageHint": "A böngésződ beállításai alapján választottuk.",
    "submit": "Feliratkozás",
    "submitting": "Feliratkozás...",
    "consent": "A feliratkozással elfogadod, hogy e-maileket kapsz tőle: {sender}. Minden e-mailben van leiratkozási link.",
    "privacy": "Adatvédelmi irányelvek",
    "loadingInfo": "A hírlevél adatainak betöltése"
  },
  "success": {
    "title": "Nézd meg a postafiókodat",
    "body": "Megerősítő e-mailt küldtünk ide: {email}. Nyisd meg, és válaszd a Feliratkozás megerősítése lehetőséget.",
    "next": "Az első szám a megerősítés után érkezik, ezen a nyelven: {language}.",
    "spam": "Ha néhány percen belül nem jön semmi, nézd meg a Spam vagy a Promóciók mappát.",
    "changeEmail": "Másik e-mail-cím használata",
    "continueTo": "Tovább ide: {host}"
  },
  "errors": {
    "emailRequired": "Add meg az e-mail-címedet.",
    "emailInvalid": "Ez az e-mail-cím hiányosnak tűnik. Ellenőrizd, és próbáld újra.",
    "missingLink": "Ebből a feliratkozási linkből hiányoznak adatok. Kérj új linket a feladótól.",
    "notFound": "Ez a feliratkozási link már nem működik. Kérj új linket a feladótól.",
    "limit": "Ez a hírlevél most nem tud új feliratkozókat fogadni. Próbáld újra később.",
    "invalid": "Ezt a címet nem tudtuk elfogadni. Ellenőrizd, és próbáld újra.",
    "server": "Nem tudtuk menteni a feliratkozásodat. Próbáld újra egy kis idő múlva.",
    "network": "Nem értük el a szervert. Ellenőrizd a kapcsolatot, és próbáld újra."
  },
  "confirm": {
    "title": "Erősítsd meg a feliratkozást",
    "body": "Válaszd a gombot, és a számok megérkeznek ide: {email}.",
    "button": "Feliratkozás megerősítése",
    "confirming": "Megerősítés...",
    "consent": "A megerősítéssel elfogadod, hogy ezt a hírlevelet e-mailben kapod. Bármelyik számból leiratkozhatsz.",
    "successTitle": "Feliratkoztál",
    "successBody": "Az új számok ide érkeznek: {email}.",
    "successTip": "Add hozzá a feladót a névjegyeidhez, így a levelek nem kerülnek a spambe.",
    "invalidTitle": "Ez a link hiányos",
    "invalidBody": "Nyisd meg újra a megerősítő e-mailt, és válaszd a benne lévő gombot. Ha nem találod, iratkozz fel újra a feladó oldalán.",
    "notFoundBody": "Ehhez a címhez nem találtunk feliratkozást. Iratkozz fel újra a feladó oldalán.",
    "errorBody": "Nem tudtuk megerősíteni a feliratkozásodat. Próbáld újra egy kis idő múlva.",
    "retry": "Újrapróbálás",
    "home": "Ugrás a kezdőlapra"
  },
  "embed": {
    "title": "Feliratkozási űrlap hozzáadása a webhelyedhez",
    "intro": "Illeszd be ezen kódrészletek egyikét a webhelyedre. Aki feliratkozik, megerősítő e-mailt kap, utána pedig a saját nyelvén olvassa a számaidat.",
    "linkLabel": "A feliratkozási oldal linkje",
    "linkHint": "Oszd meg egy közösségi profil bemutatkozásában, egy e-mail-aláírásban vagy QR-kódban.",
    "scriptLabel": "Script címke (ajánlott)",
    "scriptHint": "Illeszd be oda, ahol az űrlapnak meg kell jelennie. Az űrlap magától igazítja a méretét.",
    "iframeLabel": "Iframe",
    "iframeHint": "Ezt használd, ha a webhelyed nem engedélyezi a szkripteket.",
    "copy": "Másolás",
    "copied": "Kimásolva",
    "copyFailed": "Jelöld ki a szöveget, és másold ki kézzel.",
    "options": "Űrlapbeállítások",
    "accent": "Gomb színe",
    "accentHint": "Hagyd változatlanul, ha a márkád színét szeretnéd használni.",
    "theme": "Téma",
    "themeAuto": "A látogató beállítása szerint",
    "themeLight": "Világos",
    "themeDark": "Sötét",
    "layout": "Elrendezés",
    "layoutFull": "Teljes (cím, név és nyelv)",
    "layoutCompact": "Tömör (e-mail és gomb)",
    "preview": "Előnézet",
    "previewNote": "Az előnézet élő. Az itt végzett feliratkozás valódi feliratkozót hoz létre.",
    "missing": "Először hozz létre egy hírlevelet. A feliratkozási űrlap itt jelenik meg, amint létezik."
  },
  "page": {
    "poweredBy": "Az AIBAN működteti",
    "title": "Feliratkozás"
  },
  "signature": {
    "title": "E-mail-aláírás",
    "intro": "Az olvasók minden szám végén látják. Kattints az előnézet bármelyik részére a szerkesztéshez.",
    "show": "Az aláírásom megjelenítése minden számban",
    "showHint": "Ha kikapcsolod, a számok a cikk után véget érnek.",
    "preview": "Előnézet",
    "previewEmpty": "Az aláírásod üres. Kezdésként add meg a nevedet.",
    "articleEnd": "A cikk vége",
    "tabContent": "Tartalom",
    "tabStyle": "Stílus",
    "blocks": "Mi szerepeljen benne",
    "blocksHint": "Válassz egy címkét az adott rész megjelenítéséhez vagy elrejtéséhez. A rejtett részek megtartják a szövegüket.",
    "layout": "Elrendezés",
    "layouts": {
      "bar": "Színes sáv",
      "photo": "Fotó",
      "stacked": "Egymás alatt",
      "centered": "Középre igazított",
      "minimal": "Csak szöveg"
    },
    "fields": {
      "name": "Név",
      "role": "Beosztás",
      "company": "Cég",
      "phone": "Telefon",
      "email": "E-mail",
      "website": "Webhely",
      "address": "Cím",
      "photoUrl": "Fotó",
      "logoUrl": "Logó",
      "socials": "Közösségi linkek",
      "cta": "Gomb",
      "disclaimer": "Jogi megjegyzés"
    },
    "groups": {
      "about": "Rólad",
      "contact": "Elérhetőség",
      "images": "Képek",
      "socials": "Közösségi linkek",
      "cta": "Gomb",
      "disclaimer": "Jogi megjegyzés"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Alapító",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Springfield, Fő utca 120.",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Hívás egyeztetése",
      "ctaUrl": "https://"
    },
    "ctaText": "Gomb szövege",
    "ctaLink": "Gomb linkje",
    "hints": {
      "photoUrl": "Link egy négyzetes PNG vagy JPG képre, legalább 144 × 144 képpont és 200 KB alatti méret. A neved mellett 72 × 72 képpontos méretben jelenik meg.",
      "logoUrl": "Link egy átlátszó vagy fehér hátterű PNG vagy JPG képre, legalább 64 képpont magas. 32 képpont magasan jelenik meg.",
      "website": "Ha kihagyod a https:// részt, mi hozzáadjuk.",
      "cta": "A gomb csak akkor jelenik meg, ha a szöveget és a linket is megadod.",
      "disclaimer": "Apró betűs szöveg alul, például titoktartási megjegyzés. Hagyd üresen, ha nincs rá szükséged."
    },
    "style": {
      "accent": "Kiemelő szín",
      "accentHint": "A sávhoz, a linkekhez és a gombhoz használjuk. Kezdetben a márkád színe.",
      "font": "Betűtípus",
      "fontSans": "Talpatlan",
      "fontSerif": "Talpas",
      "size": "Szövegméret",
      "sizeMd": "Normál",
      "sizeSm": "Kicsi",
      "shape": "A fotó alakja",
      "shapeRound": "Kerek",
      "shapeSquare": "Négyzet"
    },
    "hidden": "rejtett",
    "reset": "Újrakezdés",
    "resetConfirm": "Válaszd újra az összes mező törléséhez"
  }
};
