// lv strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale lv
export default {
  "welcome": {
    "title": "Laipni lūdzam jaunumu vēstulē",
    "invitedBy": "{configuratorId} aicina jūs pierakstīties."
  },
  "email": {
    "title": "Kur sūtīt katru izdevumu?",
    "placeholder": "Jūsu e-pasts"
  },
  "name": {
    "title": "Kā jūs sauc?",
    "placeholder": "Jūsu vārds"
  },
  "language": {
    "title": "Kādā valodā vēlaties lasīt?"
  },
  "subscribed": {
    "title": "Jūs esat pierakstījies",
    "subtitle": "Pārbaudiet iesūtni, tur jābūt apstiprinājuma e-pastam.",
    "continueTo": "Turpināt uz",
    "finishingUp": "Varat aizvērt šo lapu."
  },
  "form": {
    "heading": "Pierakstīties: {title}",
    "headingFallback": "Pierakstīties šai jaunumu vēstulei",
    "intro": "Jaunie izdevumi pienāk e-pastā jūsu izvēlētajā valodā.",
    "from": "No: {sender}",
    "emailLabel": "E-pasta adrese",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Vārds",
    "optional": "pēc izvēles",
    "nameHint": "Mēs to izmantojam, lai jūs uzrunātu. Ja atstāsiet tukšu, izmantosim jūsu e-pasta adreses sākumu.",
    "languageLabel": "Izdevumu valoda",
    "languageSummary": "Izdevumi valodā: {language}.",
    "languageChange": "Mainīt",
    "languageHint": "Mēs to izvēlējāmies pēc jūsu pārlūka iestatījumiem.",
    "submit": "Pierakstīties",
    "submitting": "Pierakstām...",
    "consent": "Pierakstoties jūs piekrītat saņemt e-pastus no {sender}. Katrā e-pastā ir saite, lai atrakstītos.",
    "privacy": "Privātuma politika",
    "loadingInfo": "Ielādē jaunumu vēstules informāciju"
  },
  "success": {
    "title": "Pārbaudiet iesūtni",
    "body": "Mēs nosūtījām apstiprinājuma e-pastu uz {email}. Atveriet to un izvēlieties Apstiprināt pierakstīšanos.",
    "next": "Pirmais izdevums pienāks pēc apstiprināšanas, rakstīts valodā: {language}.",
    "spam": "Ja dažu minūšu laikā nekas nepienāk, ieskatieties surogātpasta vai Akciju mapē.",
    "changeEmail": "Izmantot citu e-pastu",
    "continueTo": "Turpināt uz {host}"
  },
  "errors": {
    "emailRequired": "Ievadiet savu e-pasta adresi.",
    "emailInvalid": "Šī e-pasta adrese izskatās nepilnīga. Pārbaudiet to un mēģiniet vēlreiz.",
    "missingLink": "Šai pierakstīšanās saitei trūkst informācijas. Palūdziet sūtītājam jaunu saiti.",
    "notFound": "Šī pierakstīšanās saite vairs nedarbojas. Palūdziet sūtītājam jaunu saiti.",
    "limit": "Šī jaunumu vēstule pašlaik nevar pieņemt jaunus abonentus. Mēģiniet vēlāk.",
    "invalid": "Mēs nevarējām pieņemt šo adresi. Pārbaudiet to un mēģiniet vēlreiz.",
    "server": "Mēs nevarējām saglabāt jūsu pierakstīšanos. Pēc brīža mēģiniet vēlreiz.",
    "network": "Mēs nevarējām sazināties ar serveri. Pārbaudiet savienojumu un mēģiniet vēlreiz."
  },
  "confirm": {
    "title": "Apstipriniet pierakstīšanos",
    "body": "Izvēlieties pogu, lai sāktu saņemt izdevumus uz {email}.",
    "button": "Apstiprināt pierakstīšanos",
    "confirming": "Apstiprinām...",
    "consent": "Apstiprinot jūs piekrītat saņemt šo jaunumu vēstuli e-pastā. Atrakstīties varat no jebkura izdevuma.",
    "successTitle": "Jūs esat pierakstījies",
    "successBody": "Jaunie izdevumi pienāks uz {email}.",
    "successTip": "Pievienojiet sūtītāju saviem kontaktiem, lai vēstules nenonāktu surogātpastā.",
    "invalidTitle": "Šī saite ir nepilnīga",
    "invalidBody": "Vēlreiz atveriet apstiprinājuma e-pastu un izvēlieties tajā esošo pogu. Ja nevarat to atrast, pierakstieties vēlreiz sūtītāja lapā.",
    "notFoundBody": "Mēs neatradām pierakstīšanos šai adresei. Pierakstieties vēlreiz sūtītāja lapā.",
    "errorBody": "Mēs nevarējām apstiprināt jūsu pierakstīšanos. Pēc brīža mēģiniet vēlreiz.",
    "retry": "Mēģināt vēlreiz",
    "home": "Uz sākumlapu"
  },
  "embed": {
    "title": "Pievienojiet pierakstīšanās formu savai vietnei",
    "intro": "Ielīmējiet vienu no šiem koda fragmentiem savā vietnē. Tie, kas pierakstās, saņem apstiprinājuma e-pastu un pēc tam jūsu izdevumus savā valodā.",
    "linkLabel": "Pierakstīšanās lapas saite",
    "linkHint": "Kopīgojiet to sociālo tīklu profila aprakstā, e-pasta parakstā vai QR kodā.",
    "scriptLabel": "Script tags (ieteicams)",
    "scriptHint": "Ielīmējiet to vietā, kur jāparādās formai. Forma pati pielāgo savu izmēru.",
    "iframeLabel": "Iframe",
    "iframeHint": "Izmantojiet šo, ja jūsu vietne neatļauj skriptus.",
    "copy": "Kopēt",
    "copied": "Nokopēts",
    "copyFailed": "Atlasiet tekstu un nokopējiet to manuāli.",
    "options": "Formas iestatījumi",
    "accent": "Pogas krāsa",
    "accentHint": "Atstājiet, kā ir, lai izmantotu sava zīmola krāsu.",
    "theme": "Motīvs",
    "themeAuto": "Pēc apmeklētāja iestatījuma",
    "themeLight": "Gaišs",
    "themeDark": "Tumšs",
    "layout": "Izkārtojums",
    "layoutFull": "Pilns (virsraksts, vārds un valoda)",
    "layoutCompact": "Kompakts (e-pasts un poga)",
    "preview": "Priekšskatījums",
    "previewNote": "Priekšskatījums darbojas pa īstam. Pierakstīšanās šeit izveido īstu abonentu.",
    "missing": "Vispirms izveidojiet jaunumu vēstuli. Pierakstīšanās forma parādīsies šeit, kad tā būs izveidota."
  },
  "page": {
    "poweredBy": "Darbojas ar AIBAN",
    "title": "Pierakstīties"
  },
  "signature": {
    "title": "E-pasta paraksts",
    "intro": "Lasītāji to redz katra izdevuma beigās. Noklikšķiniet uz jebkuras priekšskatījuma daļas, lai to rediģētu.",
    "show": "Rādīt manu parakstu katrā izdevumā",
    "showHint": "Ja to izslēgsiet, izdevumi beigsies pēc raksta.",
    "preview": "Priekšskatījums",
    "previewEmpty": "Jūsu paraksts ir tukšs. Sāciet, pievienojot savu vārdu.",
    "articleEnd": "Raksta beigas",
    "tabContent": "Saturs",
    "tabStyle": "Stils",
    "blocks": "Ko iekļaut",
    "blocksHint": "Izvēlieties birku, lai parādītu vai paslēptu šo daļu. Paslēptās daļas saglabā savu tekstu.",
    "layout": "Izkārtojums",
    "layouts": {
      "bar": "Krāsu josla",
      "photo": "Foto",
      "stacked": "Vienu zem otra",
      "centered": "Centrēts",
      "minimal": "Tikai teksts"
    },
    "fields": {
      "name": "Vārds",
      "role": "Amats",
      "company": "Uzņēmums",
      "phone": "Tālrunis",
      "email": "E-pasts",
      "website": "Vietne",
      "address": "Adrese",
      "photoUrl": "Foto",
      "logoUrl": "Logotips",
      "socials": "Sociālo tīklu saites",
      "cta": "Poga",
      "disclaimer": "Juridiska piezīme"
    },
    "groups": {
      "about": "Par jums",
      "contact": "Kontakti",
      "images": "Attēli",
      "socials": "Sociālo tīklu saites",
      "cta": "Poga",
      "disclaimer": "Juridiska piezīme"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Dibinātāja",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Galvenā iela 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Pieteikt zvanu",
      "ctaUrl": "https://"
    },
    "ctaText": "Pogas teksts",
    "ctaLink": "Pogas saite",
    "hints": {
      "photoUrl": "Saite uz kvadrātveida PNG vai JPG attēlu, vismaz 144 x 144 pikseļi un mazāks par 200 KB. Tiek rādīts 72 x 72 pikseļu izmērā blakus jūsu vārdam.",
      "logoUrl": "Saite uz PNG vai JPG attēlu ar caurspīdīgu vai baltu fonu, vismaz 64 pikseļus augstu. Tiek rādīts 32 pikseļu augstumā.",
      "website": "Ja izlaidīsiet https://, mēs to pievienosim.",
      "cta": "Poga parādās tikai tad, ja ir aizpildīts gan teksts, gan saite.",
      "disclaimer": "Sīkā drukā apakšā, piemēram, konfidencialitātes piezīme. Atstājiet tukšu, ja tā nav vajadzīga."
    },
    "style": {
      "accent": "Akcenta krāsa",
      "accentHint": "Tiek izmantota joslai, saitēm un pogai. Sākotnēji tā ir jūsu zīmola krāsa.",
      "font": "Fonts",
      "fontSans": "Bez serifiem",
      "fontSerif": "Ar serifiem",
      "size": "Teksta lielums",
      "sizeMd": "Parasts",
      "sizeSm": "Mazs",
      "shape": "Foto forma",
      "shapeRound": "Apaļa",
      "shapeSquare": "Kvadrātveida"
    },
    "hidden": "paslēpts",
    "reset": "Sākt no jauna",
    "resetConfirm": "Izvēlieties vēlreiz, lai notīrītu visus laukus"
  }
};
