// cs strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale cs
export default {
  "welcome": {
    "title": "Vítejte u newsletteru",
    "invitedBy": "{configuratorId} vás zve k odběru."
  },
  "email": {
    "title": "Kam vám máme posílat jednotlivá vydání?",
    "placeholder": "Váš e-mail"
  },
  "name": {
    "title": "Jak se jmenujete?",
    "placeholder": "Vaše jméno"
  },
  "language": {
    "title": "V jakém jazyce chcete číst?"
  },
  "subscribed": {
    "title": "Odběr je přihlášen",
    "subtitle": "Ve schránce najdete potvrzovací e-mail.",
    "continueTo": "Pokračovat na",
    "finishingUp": "Tuto stránku můžete zavřít."
  },
  "form": {
    "heading": "Odebírat {title}",
    "headingFallback": "Odebírat tento newsletter",
    "intro": "Nová vydání chodí e-mailem v jazyce, který si vyberete.",
    "from": "Od: {sender}",
    "emailLabel": "E-mailová adresa",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Křestní jméno",
    "optional": "nepovinné",
    "nameHint": "Použijeme ho v pozdravu. Když pole necháte prázdné, použijeme začátek vaší e-mailové adresy.",
    "languageLabel": "Jazyk vydání",
    "languageSummary": "Vydání v jazyce: {language}.",
    "languageChange": "Změnit",
    "languageHint": "Vybrali jsme ho podle nastavení vašeho prohlížeče.",
    "submit": "Odebírat",
    "submitting": "Přihlašuji...",
    "consent": "Přihlášením souhlasíte se zasíláním e-mailů od {sender}. Každý e-mail obsahuje odkaz pro odhlášení.",
    "privacy": "Zásady ochrany osobních údajů",
    "loadingInfo": "Načítání informací o newsletteru"
  },
  "success": {
    "title": "Zkontrolujte schránku",
    "body": "Na adresu {email} jsme poslali potvrzovací e-mail. Otevřete ho a zvolte Potvrdit odběr.",
    "next": "První vydání přijde po potvrzení, napsané v jazyce: {language}.",
    "spam": "Pokud do několika minut nic nepřijde, podívejte se do složky Spam nebo Promoakce.",
    "changeEmail": "Použít jiný e-mail",
    "continueTo": "Pokračovat na {host}"
  },
  "errors": {
    "emailRequired": "Zadejte svou e-mailovou adresu.",
    "emailInvalid": "Tato e-mailová adresa vypadá neúplně. Zkontrolujte ji a zkuste to znovu.",
    "missingLink": "V tomto odkazu k přihlášení chybí údaje. Požádejte odesílatele o nový odkaz.",
    "notFound": "Tento odkaz k přihlášení už nefunguje. Požádejte odesílatele o nový odkaz.",
    "limit": "Tento newsletter teď nemůže přijímat nové odběratele. Zkuste to později.",
    "invalid": "Tuto adresu jsme nemohli přijmout. Zkontrolujte ji a zkuste to znovu.",
    "server": "Váš odběr se nepodařilo uložit. Zkuste to za chvíli znovu.",
    "network": "Nepodařilo se spojit se serverem. Zkontrolujte připojení a zkuste to znovu."
  },
  "confirm": {
    "title": "Potvrďte odběr",
    "body": "Zvolte tlačítko a vydání vám začnou chodit na {email}.",
    "button": "Potvrdit odběr",
    "confirming": "Potvrzuji...",
    "consent": "Potvrzením souhlasíte se zasíláním tohoto newsletteru e-mailem. Odhlásit se můžete z kteréhokoli vydání.",
    "successTitle": "Odběr je přihlášen",
    "successBody": "Nová vydání budou chodit na {email}.",
    "successTip": "Přidejte si odesílatele do kontaktů, aby vydání nepadala do spamu.",
    "invalidTitle": "Tento odkaz je neúplný",
    "invalidBody": "Otevřete znovu potvrzovací e-mail a zvolte tlačítko v něm. Pokud ho nemůžete najít, přihlaste se znovu na stránce odesílatele.",
    "notFoundBody": "Pro tuto adresu jsme nenašli žádné přihlášení. Přihlaste se znovu na stránce odesílatele.",
    "errorBody": "Váš odběr se nepodařilo potvrdit. Zkuste to za chvíli znovu.",
    "retry": "Zkusit znovu",
    "home": "Přejít na úvodní stránku"
  },
  "embed": {
    "title": "Přidejte na svůj web přihlašovací formulář",
    "intro": "Vložte jeden z těchto úryvků kódu na svůj web. Kdo se přihlásí, dostane potvrzovací e-mail a pak vaše vydání ve svém jazyce.",
    "linkLabel": "Odkaz na přihlašovací stránku",
    "linkHint": "Sdílejte ho v profilu na sociálních sítích, v e-mailovém podpisu nebo v QR kódu.",
    "scriptLabel": "Značka script (doporučeno)",
    "scriptHint": "Vložte ji tam, kde se má formulář zobrazit. Formulář si velikost upraví sám.",
    "iframeLabel": "Iframe",
    "iframeHint": "Použijte, pokud váš web nepovoluje skripty.",
    "copy": "Kopírovat",
    "copied": "Zkopírováno",
    "copyFailed": "Označte text a zkopírujte ho ručně.",
    "options": "Možnosti formuláře",
    "accent": "Barva tlačítka",
    "accentHint": "Nechte beze změny, pokud chcete použít barvu své značky.",
    "theme": "Motiv",
    "themeAuto": "Podle nastavení návštěvníka",
    "themeLight": "Světlý",
    "themeDark": "Tmavý",
    "layout": "Rozvržení",
    "layoutFull": "Úplné (nadpis, jméno a jazyk)",
    "layoutCompact": "Kompaktní (e-mail a tlačítko)",
    "preview": "Náhled",
    "previewNote": "Náhled je funkční. Přihlášení zde vytvoří skutečného odběratele.",
    "missing": "Nejdřív vytvořte newsletter. Přihlašovací formulář se tu zobrazí, jakmile bude existovat."
  },
  "page": {
    "poweredBy": "Běží na AIBAN",
    "title": "Odebírat"
  },
  "signature": {
    "title": "E-mailový podpis",
    "intro": "Čtenáři ho uvidí na konci každého vydání. Kliknutím na libovolnou část náhledu ji upravíte.",
    "show": "Zobrazovat můj podpis v každém vydání",
    "showHint": "Když ho vypnete, vydání skončí po článku.",
    "preview": "Náhled",
    "previewEmpty": "Váš podpis je prázdný. Začněte tím, že přidáte své jméno.",
    "articleEnd": "Konec článku",
    "tabContent": "Obsah",
    "tabStyle": "Styl",
    "blocks": "Co zahrnout",
    "blocksHint": "Zvolte štítek a danou část zobrazíte nebo skryjete. Skryté části si svůj text ponechají.",
    "layout": "Rozvržení",
    "layouts": {
      "bar": "Barevný pruh",
      "photo": "Fotka",
      "stacked": "Pod sebou",
      "centered": "Na střed",
      "minimal": "Jen text"
    },
    "fields": {
      "name": "Jméno",
      "role": "Pracovní pozice",
      "company": "Firma",
      "phone": "Telefon",
      "email": "E-mail",
      "website": "Web",
      "address": "Adresa",
      "photoUrl": "Fotka",
      "logoUrl": "Logo",
      "socials": "Odkazy na sociální sítě",
      "cta": "Tlačítko",
      "disclaimer": "Právní poznámka"
    },
    "groups": {
      "about": "O vás",
      "contact": "Kontakt",
      "images": "Obrázky",
      "socials": "Sociální sítě",
      "cta": "Tlačítko",
      "disclaimer": "Právní poznámka"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Zakladatelka",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Hlavní 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Domluvit hovor",
      "ctaUrl": "https://"
    },
    "ctaText": "Text tlačítka",
    "ctaLink": "Odkaz tlačítka",
    "hints": {
      "photoUrl": "Odkaz na čtvercový obrázek PNG nebo JPG o rozměrech alespoň 144 × 144 pixelů a velikosti pod 200 KB. Zobrazí se v rozměru 72 × 72 pixelů vedle vašeho jména.",
      "logoUrl": "Odkaz na obrázek PNG nebo JPG s průhledným nebo bílým pozadím, vysoký alespoň 64 pixelů. Zobrazí se ve výšce 32 pixelů.",
      "website": "Pokud https:// vynecháte, doplníme ho.",
      "cta": "Tlačítko se zobrazí, jen když vyplníte text i odkaz.",
      "disclaimer": "Drobné písmo dole, například upozornění o důvěrnosti. Pokud ho nepotřebujete, nechte pole prázdné."
    },
    "style": {
      "accent": "Barva zvýraznění",
      "accentHint": "Používá se pro pruh, odkazy a tlačítko. Výchozí je barva vaší značky.",
      "font": "Písmo",
      "fontSans": "Bezpatkové",
      "fontSerif": "Patkové",
      "size": "Velikost textu",
      "sizeMd": "Běžná",
      "sizeSm": "Malá",
      "shape": "Tvar fotky",
      "shapeRound": "Kulatý",
      "shapeSquare": "Čtvercový"
    },
    "hidden": "skryto",
    "reset": "Začít znovu",
    "resetConfirm": "Zvolte znovu a všechna pole se vymažou"
  }
};
