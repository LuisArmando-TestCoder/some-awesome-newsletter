// sn strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale sn
export default {
  "welcome": {
    "title": "Mauya kutsamba remashoko",
    "invitedBy": "{configuratorId} akukokai kuti munyorese."
  },
  "email": {
    "title": "Tingatumira kupi chinyorwa chimwe nechimwe?",
    "placeholder": "Email yenyu"
  },
  "name": {
    "title": "Munonzi ani?",
    "placeholder": "Zita renyu"
  },
  "language": {
    "title": "Munoda kuverenga nemutauro upi?"
  },
  "subscribed": {
    "title": "Manyoresa",
    "subtitle": "Tarisai bhokisi renyu reemail kuti muone email yekusimbisa.",
    "continueTo": "Enderera ku",
    "finishingUp": "Munogona kuvhara peji iri."
  },
  "form": {
    "heading": "Nyoresai ku{title}",
    "headingFallback": "Nyoresai kutsamba remashoko iri",
    "intro": "Zvinyorwa zvitsva zvinouya ne-email, zvakanyorwa nemutauro wamunosarudza.",
    "from": "Kubva ku{sender}",
    "emailLabel": "Kero ye-email",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Zita rekutanga",
    "optional": "hazvimanikidzwi",
    "nameHint": "Tinorishandisa kukukwazisai. Mukarisiya risina chinhu, tinoshandisa kutanga kwekero yenyu ye-email.",
    "languageLabel": "Mutauro wezvinyorwa zvenyu",
    "languageSummary": "Zvinyorwa mu{language}.",
    "languageChange": "Chinja",
    "languageHint": "Takasarudza izvi kubva pamasetingi ebrowser yenyu.",
    "submit": "Nyoresa",
    "submitting": "Kunyoresa...",
    "consent": "Nekunyoresa, munobvuma kugamuchira maemail kubva ku{sender}. Email yega yega ine link yekumisa kunyoresa.",
    "privacy": "Mutemo wezvakavanzika",
    "loadingInfo": "Kurodha ruzivo rwetsamba remashoko"
  },
  "success": {
    "title": "Tarisai bhokisi renyu reemail",
    "body": "Tatumira email yekusimbisa ku{email}. Ivhurei mosarudza Simbisa kunyoresa.",
    "next": "Chinyorwa chenyu chekutanga chichauya mushure mekunge masimbisa, chakanyorwa mu{language}.",
    "spam": "Kana pasina chinouya mukati memaminitsi mashoma, tarisai muforodha ye-spam kana Promotions.",
    "changeEmail": "Shandisa imwe email",
    "continueTo": "Enderera ku{host}"
  },
  "errors": {
    "emailRequired": "Isai kero yenyu ye-email.",
    "emailInvalid": "Kero ye-email iyi inoita seisina kukwana. Itarisei moedza zvakare.",
    "missingLink": "Link yekunyoresa iyi haina ruzivo rwakakwana. Kumbirai link itsva kumutumiri.",
    "notFound": "Link yekunyoresa iyi haichashandi. Kumbirai link itsva kumutumiri.",
    "limit": "Tsamba remashoko iri harigoni kugamuchira vanyoresi vatsva parizvino. Edzai zvakare gare gare.",
    "invalid": "Hatina kukwanisa kugamuchira kero iyi. Itarisei moedza zvakare.",
    "server": "Hatina kukwanisa kuchengeta kunyoresa kwenyu. Edzai zvakare kwapera chinguva.",
    "network": "Hatina kukwanisa kusvika pa-server. Tarisai kubatana kwenyu moedza zvakare."
  },
  "confirm": {
    "title": "Simbisai kunyoresa kwenyu",
    "body": "Sarudzai bhatani kuti mutange kugamuchira zvinyorwa pa{email}.",
    "button": "Simbisa kunyoresa",
    "confirming": "Kusimbisa...",
    "consent": "Nekusimbisa, munobvuma kugamuchira tsamba remashoko iri ne-email. Munogona kumisa kunyoresa kubva pachinyorwa chipi zvacho.",
    "successTitle": "Manyoresa",
    "successBody": "Zvinyorwa zvitsva zvichasvika pa{email}.",
    "successTip": "Kuti zvisapinda mu-spam, wedzerai mutumiri kuvanhu vamunotaura navo.",
    "invalidTitle": "Link iyi haina kukwana",
    "invalidBody": "Vhurai zvakare email yekusimbisa mosarudza bhatani rayo. Kana musingaiwani, nyoresai zvakare kubva papeji yemutumiri.",
    "notFoundBody": "Hatina kuwana kunyoresa kwekero iyi. Nyoresai zvakare kubva papeji yemutumiri.",
    "errorBody": "Hatina kukwanisa kusimbisa kunyoresa kwenyu. Edzai zvakare kwapera chinguva.",
    "retry": "Edza zvakare",
    "home": "Enda kupeji yekutanga"
  },
  "embed": {
    "title": "Wedzerai fomu yekunyoresa pawebhusaiti yenyu",
    "intro": "Namatidzai imwe yemakodhi aya pawebhusaiti yenyu. Vanhu vanonyoresa vanogamuchira email yekusimbisa, vozogamuchira zvinyorwa zvenyu nemutauro wavo.",
    "linkLabel": "Link yepeji yekunyoresa",
    "linkHint": "Igovanei mu-bio yesocial media, siginecha ye-email, kana kodhi ye-QR.",
    "scriptLabel": "Tagi ye-script (inokurudzirwa)",
    "scriptHint": "Inamatidzei panofanira kuoneka fomu. Fomu inozvigadzirisa saizi yayo pachayo.",
    "iframeLabel": "Iframe",
    "iframeHint": "Shandisai iyi kana webhusaiti yenyu isingabvumiri ma-script.",
    "copy": "Kopa",
    "copied": "Zvakopwa",
    "copyFailed": "Sarudzai mavara mozvikopa nemaoko.",
    "options": "Sarudzo dzefomu",
    "accent": "Ruvara rwebhatani",
    "accentHint": "Rusiyei sezvarwuri kuti mushandise ruvara rwebhurandi yenyu.",
    "theme": "Dingindira",
    "themeAuto": "Tevedzera masetingi emushanyi",
    "themeLight": "Chiedza",
    "themeDark": "Rima",
    "layout": "Marongerwo",
    "layoutFull": "Rakazara (musoro, zita nemutauro)",
    "layoutCompact": "Diki (email nebhatani)",
    "preview": "Tarisa kutanga",
    "previewNote": "Kutarisa uku kunoshanda chaizvo. Kunyoresa pano kunogadzira munyoresi chaiye.",
    "missing": "Gadzirai tsamba remashoko kutanga. Fomu yekunyoresa ichaoneka pano kana iripo."
  },
  "page": {
    "poweredBy": "Inoshanda paAIBAN",
    "title": "Nyoresa"
  },
  "signature": {
    "title": "Siginecha ye-email",
    "intro": "Vaverengi vanoona izvi pakupera kwechinyorwa chimwe nechimwe. Dzvanyai chikamu chipi zvacho chekutarisa kuti muchigadzirise.",
    "show": "Ratidza siginecha yangu muchinyorwa chimwe nechimwe",
    "showHint": "Mukaidzima, zvinyorwa zvinopera mushure menyaya.",
    "preview": "Tarisa kutanga",
    "previewEmpty": "Siginecha yenyu haina chinhu. Wedzerai zita renyu kuti mutange.",
    "articleEnd": "Kupera kwenyaya",
    "tabContent": "Zviri mukati",
    "tabStyle": "Chimiro",
    "blocks": "Zvekuisa",
    "blocksHint": "Sarudzai tagi kuti muratidze kana kuvanza chikamu ichocho. Zvikamu zvakavanzwa zvinochengeta mavara azvo.",
    "layout": "Marongerwo",
    "layouts": {
      "bar": "Mutsetse une ruvara",
      "photo": "Mufananidzo",
      "stacked": "Pamusoro peumwe",
      "centered": "Pakati",
      "minimal": "Mavara chete"
    },
    "fields": {
      "name": "Zita",
      "role": "Chinzvimbo",
      "company": "Kambani",
      "phone": "Foni",
      "email": "Email",
      "website": "Webhusaiti",
      "address": "Kero",
      "photoUrl": "Mufananidzo",
      "logoUrl": "Logo",
      "socials": "Ma-link esocial media",
      "cta": "Bhatani",
      "disclaimer": "Chiziviso chemutemo"
    },
    "groups": {
      "about": "Nezvenyu",
      "contact": "Kutaura nesu",
      "images": "Mifananidzo",
      "socials": "Ma-link esocial media",
      "cta": "Bhatani",
      "disclaimer": "Chiziviso chemutemo"
    },
    "placeholders": {
      "name": "Rudo Moyo",
      "role": "Muvambi",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Main Street, Harare",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Rongai runhare",
      "ctaUrl": "https://"
    },
    "ctaText": "Mavara ebhatani",
    "ctaLink": "Link yebhatani",
    "hints": {
      "photoUrl": "Link kuPNG kana JPG ine mativi akaenzana, ingangoita 144 x 144 pixels uye iri pasi pe200 KB. Inoratidzwa pa72 x 72 pixels padivi pezita renyu.",
      "logoUrl": "Link kuPNG kana JPG ine kumashure kunoonekera kana kuchena, ingangoita 64 pixels kureba. Inoratidzwa ichireba 32 pixels.",
      "website": "Tinowedzera https:// kana mukasaisa.",
      "cta": "Mavara ne-link zvese zvinodiwa kuti bhatani rionekwe.",
      "disclaimer": "Mavara madiki pazasi, semuenzaniso chiziviso chekuvanzika. Siyai pasina chinhu kana musingachidi."
    },
    "style": {
      "accent": "Ruvara rwekusimbisa",
      "accentHint": "Runoshandiswa pamutsetse, ma-link nebhatani. Runotanga neruvara rwebhurandi yenyu.",
      "font": "Mavara",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Saizi yemavara",
      "sizeMd": "Zvakajairika",
      "sizeSm": "Diki",
      "shape": "Chimiro chemufananidzo",
      "shapeRound": "Kutenderera",
      "shapeSquare": "Mativi akaenzana"
    },
    "hidden": "zvakavanzwa",
    "reset": "Tanga patsva",
    "resetConfirm": "Sarudzai zvakare kuti mudzime minda yese"
  }
};
