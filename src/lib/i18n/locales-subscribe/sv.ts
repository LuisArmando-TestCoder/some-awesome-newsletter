// sv strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale sv
export default {
  "welcome": {
    "title": "Välkommen till nyhetsbrevet",
    "invitedBy": "{configuratorId} har bjudit in dig att prenumerera."
  },
  "email": {
    "title": "Vart ska vi skicka varje utskick?",
    "placeholder": "Din e-post"
  },
  "name": {
    "title": "Vad heter du?",
    "placeholder": "Ditt namn"
  },
  "language": {
    "title": "Vilket språk vill du läsa på?"
  },
  "subscribed": {
    "title": "Du prenumererar nu",
    "subtitle": "Titta i inkorgen efter ett bekräftelsemejl.",
    "continueTo": "Fortsätt till",
    "finishingUp": "Du kan stänga den här sidan."
  },
  "form": {
    "heading": "Prenumerera på {title}",
    "headingFallback": "Prenumerera på det här nyhetsbrevet",
    "intro": "Nya utskick kommer via mejl, skrivna på det språk du väljer.",
    "from": "Från {sender}",
    "emailLabel": "E-postadress",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Förnamn",
    "optional": "valfritt",
    "nameHint": "Vi använder det för att hälsa på dig. Lämnar du det tomt använder vi början av din e-postadress.",
    "languageLabel": "Språk för dina utskick",
    "languageSummary": "Utskick på {language}.",
    "languageChange": "Ändra",
    "languageHint": "Vi valde detta utifrån inställningarna i din webbläsare.",
    "submit": "Prenumerera",
    "submitting": "Registrerar...",
    "consent": "När du prenumererar godkänner du att få mejl från {sender}. Varje mejl har en länk för att avsluta prenumerationen.",
    "privacy": "Integritetspolicy",
    "loadingInfo": "Hämtar information om nyhetsbrevet"
  },
  "success": {
    "title": "Titta i inkorgen",
    "body": "Vi har skickat ett bekräftelsemejl till {email}. Öppna det och välj Bekräfta prenumeration.",
    "next": "Ditt första utskick kommer när du har bekräftat, skrivet på {language}.",
    "spam": "Om inget kommer inom några minuter, titta i skräpposten eller fliken Kampanjer.",
    "changeEmail": "Använd en annan e-postadress",
    "continueTo": "Fortsätt till {host}"
  },
  "errors": {
    "emailRequired": "Ange din e-postadress.",
    "emailInvalid": "E-postadressen verkar ofullständig. Kontrollera den och försök igen.",
    "missingLink": "Den här registreringslänken saknar information. Be avsändaren om en ny länk.",
    "notFound": "Den här registreringslänken fungerar inte längre. Be avsändaren om en ny länk.",
    "limit": "Det här nyhetsbrevet kan inte ta emot nya prenumeranter just nu. Försök igen senare.",
    "invalid": "Vi kunde inte godta den här adressen. Kontrollera den och försök igen.",
    "server": "Vi kunde inte spara din prenumeration. Försök igen om en stund.",
    "network": "Vi nådde inte servern. Kontrollera din anslutning och försök igen."
  },
  "confirm": {
    "title": "Bekräfta din prenumeration",
    "body": "Välj knappen för att börja få utskick till {email}.",
    "button": "Bekräfta prenumeration",
    "confirming": "Bekräftar...",
    "consent": "När du bekräftar godkänner du att få det här nyhetsbrevet via mejl. Du kan avsluta prenumerationen från vilket utskick som helst.",
    "successTitle": "Du prenumererar nu",
    "successBody": "Nya utskick kommer till {email}.",
    "successTip": "Lägg till avsändaren bland dina kontakter så hamnar de inte i skräpposten.",
    "invalidTitle": "Länken är ofullständig",
    "invalidBody": "Öppna bekräftelsemejlet igen och välj knappen i det. Hittar du det inte kan du registrera dig igen på avsändarens sida.",
    "notFoundBody": "Vi hittade ingen registrering för den här adressen. Registrera dig igen på avsändarens sida.",
    "errorBody": "Vi kunde inte bekräfta din prenumeration. Försök igen om en stund.",
    "retry": "Försök igen",
    "home": "Till startsidan"
  },
  "embed": {
    "title": "Lägg till ett registreringsformulär på din webbplats",
    "intro": "Klistra in ett av de här kodavsnitten på din webbplats. De som registrerar sig får ett bekräftelsemejl och sedan dina utskick på sitt eget språk.",
    "linkLabel": "Länk till registreringssidan",
    "linkHint": "Dela den i en bio på sociala medier, en e-postsignatur eller en QR-kod.",
    "scriptLabel": "Script-tagg (rekommenderas)",
    "scriptHint": "Klistra in den där formuläret ska visas. Formuläret anpassar storleken själv.",
    "iframeLabel": "Iframe",
    "iframeHint": "Använd detta om din webbplats inte tillåter skript.",
    "copy": "Kopiera",
    "copied": "Kopierat",
    "copyFailed": "Markera texten och kopiera den manuellt.",
    "options": "Formulärinställningar",
    "accent": "Knappfärg",
    "accentHint": "Låt den vara som den är för att använda din varumärkesfärg.",
    "theme": "Tema",
    "themeAuto": "Följ besökarens inställning",
    "themeLight": "Ljust",
    "themeDark": "Mörkt",
    "layout": "Layout",
    "layoutFull": "Fullständig (rubrik, namn och språk)",
    "layoutCompact": "Kompakt (e-post och knapp)",
    "preview": "Förhandsvisning",
    "previewNote": "Förhandsvisningen är skarp. En registrering här skapar en riktig prenumerant.",
    "missing": "Skapa ett nyhetsbrev först. Registreringsformuläret visas här när det finns."
  },
  "page": {
    "poweredBy": "Drivs av AIBAN",
    "title": "Prenumerera"
  },
  "signature": {
    "title": "E-postsignatur",
    "intro": "Läsarna ser detta i slutet av varje utskick. Klicka på valfri del av förhandsvisningen för att redigera den.",
    "show": "Visa min signatur i varje utskick",
    "showHint": "Stänger du av den slutar utskicken efter artikeln.",
    "preview": "Förhandsvisning",
    "previewEmpty": "Din signatur är tom. Börja med att lägga till ditt namn.",
    "articleEnd": "Slut på artikeln",
    "tabContent": "Innehåll",
    "tabStyle": "Stil",
    "blocks": "Vad som ska ingå",
    "blocksHint": "Välj en tagg för att visa eller dölja den delen. Dolda delar behåller sin text.",
    "layout": "Layout",
    "layouts": {
      "bar": "Färgfält",
      "photo": "Foto",
      "stacked": "Staplad",
      "centered": "Centrerad",
      "minimal": "Bara text"
    },
    "fields": {
      "name": "Namn",
      "role": "Titel",
      "company": "Företag",
      "phone": "Telefon",
      "email": "E-post",
      "website": "Webbplats",
      "address": "Adress",
      "photoUrl": "Foto",
      "logoUrl": "Logotyp",
      "socials": "Sociala länkar",
      "cta": "Knapp",
      "disclaimer": "Juridisk text"
    },
    "groups": {
      "about": "Om dig",
      "contact": "Kontakt",
      "images": "Bilder",
      "socials": "Sociala länkar",
      "cta": "Knapp",
      "disclaimer": "Juridisk text"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Grundare",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Storgatan 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Boka ett samtal",
      "ctaUrl": "https://"
    },
    "ctaText": "Knapptext",
    "ctaLink": "Knapplänk",
    "hints": {
      "photoUrl": "Länk till en kvadratisk PNG eller JPG, minst 144 gånger 144 pixlar och under 200 KB. Visas i 72 gånger 72 pixlar bredvid ditt namn.",
      "logoUrl": "Länk till en PNG eller JPG med transparent eller vit bakgrund, minst 64 pixlar hög. Visas 32 pixlar hög.",
      "website": "Vi lägger till https:// om du utelämnar det.",
      "cta": "Knappen visas bara om både text och länk är ifyllda.",
      "disclaimer": "Finstilt text längst ner, till exempel en sekretessnotis. Lämna tomt om du inte behöver någon."
    },
    "style": {
      "accent": "Accentfärg",
      "accentHint": "Används för fältet, länkar och knappen. Börjar med din varumärkesfärg.",
      "font": "Typsnitt",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Textstorlek",
      "sizeMd": "Normal",
      "sizeSm": "Liten",
      "shape": "Fotots form",
      "shapeRound": "Rund",
      "shapeSquare": "Kvadratisk"
    },
    "hidden": "dold",
    "reset": "Börja om",
    "resetConfirm": "Välj igen för att rensa alla fält"
  }
};
