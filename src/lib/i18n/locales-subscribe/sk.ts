// sk strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale sk
export default {
  "welcome": {
    "title": "Vitajte pri newsletteri",
    "invitedBy": "{configuratorId} vás pozýva na odber."
  },
  "email": {
    "title": "Kam vám máme posielať jednotlivé vydania?",
    "placeholder": "Váš e-mail"
  },
  "name": {
    "title": "Ako sa voláte?",
    "placeholder": "Vaše meno"
  },
  "language": {
    "title": "V akom jazyku chcete čítať?"
  },
  "subscribed": {
    "title": "Odber je prihlásený",
    "subtitle": "V schránke nájdete potvrdzovací e-mail.",
    "continueTo": "Pokračovať na",
    "finishingUp": "Túto stránku môžete zavrieť."
  },
  "form": {
    "heading": "Odoberať {title}",
    "headingFallback": "Odoberať tento newsletter",
    "intro": "Nové vydania chodia e-mailom v jazyku, ktorý si vyberiete.",
    "from": "Od: {sender}",
    "emailLabel": "E-mailová adresa",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Krstné meno",
    "optional": "nepovinné",
    "nameHint": "Použijeme ho v pozdrave. Ak pole necháte prázdne, použijeme začiatok vašej e-mailovej adresy.",
    "languageLabel": "Jazyk vydaní",
    "languageSummary": "Vydania v jazyku: {language}.",
    "languageChange": "Zmeniť",
    "languageHint": "Vybrali sme ho podľa nastavení vášho prehliadača.",
    "submit": "Odoberať",
    "submitting": "Prihlasujem...",
    "consent": "Prihlásením súhlasíte so zasielaním e-mailov od {sender}. Každý e-mail obsahuje odkaz na odhlásenie.",
    "privacy": "Zásady ochrany osobných údajov",
    "loadingInfo": "Načítavajú sa informácie o newsletteri"
  },
  "success": {
    "title": "Skontrolujte schránku",
    "body": "Na adresu {email} sme poslali potvrdzovací e-mail. Otvorte ho a zvoľte Potvrdiť odber.",
    "next": "Prvé vydanie príde po potvrdení, napísané v jazyku: {language}.",
    "spam": "Ak do niekoľkých minút nič nepríde, pozrite sa do priečinka Spam alebo Reklamy.",
    "changeEmail": "Použiť iný e-mail",
    "continueTo": "Pokračovať na {host}"
  },
  "errors": {
    "emailRequired": "Zadajte svoju e-mailovú adresu.",
    "emailInvalid": "Táto e-mailová adresa vyzerá neúplne. Skontrolujte ju a skúste to znova.",
    "missingLink": "V tomto odkaze na prihlásenie chýbajú údaje. Požiadajte odosielateľa o nový odkaz.",
    "notFound": "Tento odkaz na prihlásenie už nefunguje. Požiadajte odosielateľa o nový odkaz.",
    "limit": "Tento newsletter teraz nemôže prijímať nových odberateľov. Skúste to neskôr.",
    "invalid": "Túto adresu sme nemohli prijať. Skontrolujte ju a skúste to znova.",
    "server": "Váš odber sa nepodarilo uložiť. Skúste to o chvíľu znova.",
    "network": "Nepodarilo sa spojiť so serverom. Skontrolujte pripojenie a skúste to znova."
  },
  "confirm": {
    "title": "Potvrďte odber",
    "body": "Zvoľte tlačidlo a vydania vám začnú chodiť na {email}.",
    "button": "Potvrdiť odber",
    "confirming": "Potvrdzujem...",
    "consent": "Potvrdením súhlasíte so zasielaním tohto newslettera e-mailom. Odhlásiť sa môžete z ktoréhokoľvek vydania.",
    "successTitle": "Odber je prihlásený",
    "successBody": "Nové vydania budú chodiť na {email}.",
    "successTip": "Pridajte si odosielateľa do kontaktov, aby vydania nepadali do spamu.",
    "invalidTitle": "Tento odkaz je neúplný",
    "invalidBody": "Otvorte znova potvrdzovací e-mail a zvoľte tlačidlo v ňom. Ak ho nemôžete nájsť, prihláste sa znova na stránke odosielateľa.",
    "notFoundBody": "Pre túto adresu sme nenašli žiadne prihlásenie. Prihláste sa znova na stránke odosielateľa.",
    "errorBody": "Váš odber sa nepodarilo potvrdiť. Skúste to o chvíľu znova.",
    "retry": "Skúsiť znova",
    "home": "Prejsť na úvodnú stránku"
  },
  "embed": {
    "title": "Pridajte na svoj web prihlasovací formulár",
    "intro": "Vložte jeden z týchto úryvkov kódu na svoj web. Kto sa prihlási, dostane potvrdzovací e-mail a potom vaše vydania vo svojom jazyku.",
    "linkLabel": "Odkaz na prihlasovaciu stránku",
    "linkHint": "Zdieľajte ho v profile na sociálnych sieťach, v e-mailovom podpise alebo v QR kóde.",
    "scriptLabel": "Značka script (odporúčané)",
    "scriptHint": "Vložte ju tam, kde sa má formulár zobraziť. Formulár si veľkosť upraví sám.",
    "iframeLabel": "Iframe",
    "iframeHint": "Použite, ak váš web nepovoľuje skripty.",
    "copy": "Kopírovať",
    "copied": "Skopírované",
    "copyFailed": "Označte text a skopírujte ho ručne.",
    "options": "Možnosti formulára",
    "accent": "Farba tlačidla",
    "accentHint": "Nechajte bez zmeny, ak chcete použiť farbu svojej značky.",
    "theme": "Motív",
    "themeAuto": "Podľa nastavenia návštevníka",
    "themeLight": "Svetlý",
    "themeDark": "Tmavý",
    "layout": "Rozloženie",
    "layoutFull": "Úplné (nadpis, meno a jazyk)",
    "layoutCompact": "Kompaktné (e-mail a tlačidlo)",
    "preview": "Ukážka",
    "previewNote": "Ukážka je funkčná. Prihlásenie tu vytvorí skutočného odberateľa.",
    "missing": "Najprv vytvorte newsletter. Prihlasovací formulár sa tu zobrazí, keď bude existovať."
  },
  "page": {
    "poweredBy": "Beží na AIBAN",
    "title": "Odoberať"
  },
  "signature": {
    "title": "E-mailový podpis",
    "intro": "Čitatelia ho uvidia na konci každého vydania. Kliknutím na ľubovoľnú časť ukážky ju upravíte.",
    "show": "Zobrazovať môj podpis v každom vydaní",
    "showHint": "Keď ho vypnete, vydania sa skončia po článku.",
    "preview": "Ukážka",
    "previewEmpty": "Váš podpis je prázdny. Začnite tým, že pridáte svoje meno.",
    "articleEnd": "Koniec článku",
    "tabContent": "Obsah",
    "tabStyle": "Štýl",
    "blocks": "Čo zahrnúť",
    "blocksHint": "Zvoľte štítok a danú časť zobrazíte alebo skryjete. Skryté časti si svoj text ponechajú.",
    "layout": "Rozloženie",
    "layouts": {
      "bar": "Farebný pruh",
      "photo": "Fotka",
      "stacked": "Pod sebou",
      "centered": "Na stred",
      "minimal": "Len text"
    },
    "fields": {
      "name": "Meno",
      "role": "Pracovná pozícia",
      "company": "Firma",
      "phone": "Telefón",
      "email": "E-mail",
      "website": "Web",
      "address": "Adresa",
      "photoUrl": "Fotka",
      "logoUrl": "Logo",
      "socials": "Odkazy na sociálne siete",
      "cta": "Tlačidlo",
      "disclaimer": "Právna poznámka"
    },
    "groups": {
      "about": "O vás",
      "contact": "Kontakt",
      "images": "Obrázky",
      "socials": "Sociálne siete",
      "cta": "Tlačidlo",
      "disclaimer": "Právna poznámka"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Zakladateľka",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Hlavná 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Dohodnúť hovor",
      "ctaUrl": "https://"
    },
    "ctaText": "Text tlačidla",
    "ctaLink": "Odkaz tlačidla",
    "hints": {
      "photoUrl": "Odkaz na štvorcový obrázok PNG alebo JPG s rozmermi aspoň 144 × 144 pixelov a veľkosťou pod 200 KB. Zobrazí sa v rozmere 72 × 72 pixelov vedľa vášho mena.",
      "logoUrl": "Odkaz na obrázok PNG alebo JPG s priehľadným alebo bielym pozadím, vysoký aspoň 64 pixelov. Zobrazí sa vo výške 32 pixelov.",
      "website": "Ak https:// vynecháte, doplníme ho.",
      "cta": "Tlačidlo sa zobrazí, len keď vyplníte text aj odkaz.",
      "disclaimer": "Drobné písmo dole, napríklad upozornenie o dôvernosti. Ak ho nepotrebujete, nechajte pole prázdne."
    },
    "style": {
      "accent": "Farba zvýraznenia",
      "accentHint": "Používa sa pre pruh, odkazy a tlačidlo. Predvolená je farba vašej značky.",
      "font": "Písmo",
      "fontSans": "Bezpätkové",
      "fontSerif": "Pätkové",
      "size": "Veľkosť textu",
      "sizeMd": "Bežná",
      "sizeSm": "Malá",
      "shape": "Tvar fotky",
      "shapeRound": "Okrúhly",
      "shapeSquare": "Štvorcový"
    },
    "hidden": "skryté",
    "reset": "Začať odznova",
    "resetConfirm": "Zvoľte znova a všetky polia sa vymažú"
  }
};
