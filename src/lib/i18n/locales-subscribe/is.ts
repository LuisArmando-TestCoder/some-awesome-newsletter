// is strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale is
export default {
  "welcome": {
    "title": "Velkomin á fréttabréfið",
    "invitedBy": "{configuratorId} bauð þér að gerast áskrifandi."
  },
  "email": {
    "title": "Hvert eigum við að senda hvert tölublað?",
    "placeholder": "Netfangið þitt"
  },
  "name": {
    "title": "Hvað heitirðu?",
    "placeholder": "Nafnið þitt"
  },
  "language": {
    "title": "Á hvaða tungumáli viltu lesa?"
  },
  "subscribed": {
    "title": "Þú ert áskrifandi",
    "subtitle": "Í pósthólfinu bíður þín staðfestingarpóstur.",
    "continueTo": "Halda áfram í",
    "finishingUp": "Þú getur lokað þessari síðu."
  },
  "form": {
    "heading": "Gerast áskrifandi að {title}",
    "headingFallback": "Gerast áskrifandi að þessu fréttabréfi",
    "intro": "Ný tölublöð berast í tölvupósti, skrifuð á tungumálinu sem þú velur.",
    "from": "Frá {sender}",
    "emailLabel": "Netfang",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Fornafn",
    "optional": "valfrjálst",
    "nameHint": "Við notum það til að heilsa þér. Ef þú skilur það eftir autt notum við upphaf netfangsins þíns.",
    "languageLabel": "Tungumál tölublaða",
    "languageSummary": "Tölublöð á tungumálinu {language}.",
    "languageChange": "Breyta",
    "languageHint": "Við völdum þetta út frá stillingum vafrans þíns.",
    "submit": "Gerast áskrifandi",
    "submitting": "Skráir...",
    "consent": "Með áskrift samþykkir þú að fá tölvupóst frá {sender}. Í hverjum pósti er tengill til að segja upp áskrift.",
    "privacy": "Persónuverndarstefna",
    "loadingInfo": "Sæki upplýsingar um fréttabréfið"
  },
  "success": {
    "title": "Athugaðu pósthólfið",
    "body": "Við sendum staðfestingarpóst á {email}. Opnaðu hann og veldu Staðfesta áskrift.",
    "next": "Fyrsta tölublaðið berst eftir að þú staðfestir, skrifað á tungumálinu {language}.",
    "spam": "Ef ekkert berst innan nokkurra mínútna skaltu skoða ruslpóstinn eða flipann Tilboð.",
    "changeEmail": "Nota annað netfang",
    "continueTo": "Halda áfram á {host}"
  },
  "errors": {
    "emailRequired": "Sláðu inn netfangið þitt.",
    "emailInvalid": "Þetta netfang virðist ófullgert. Athugaðu það og reyndu aftur.",
    "missingLink": "Upplýsingar vantar í þennan skráningartengil. Biddu sendandann um nýjan tengil.",
    "notFound": "Þessi skráningartengill virkar ekki lengur. Biddu sendandann um nýjan tengil.",
    "limit": "Þetta fréttabréf getur ekki tekið við nýjum áskrifendum núna. Reyndu aftur síðar.",
    "invalid": "Við gátum ekki samþykkt þetta netfang. Athugaðu það og reyndu aftur.",
    "server": "Við gátum ekki vistað áskriftina þína. Reyndu aftur eftir smástund.",
    "network": "Við náðum ekki sambandi við þjóninn. Athugaðu tenginguna og reyndu aftur."
  },
  "confirm": {
    "title": "Staðfestu áskriftina",
    "body": "Veldu hnappinn til að byrja að fá tölublöð á {email}.",
    "button": "Staðfesta áskrift",
    "confirming": "Staðfestir...",
    "consent": "Með staðfestingu samþykkir þú að fá þetta fréttabréf í tölvupósti. Þú getur sagt upp áskrift úr hvaða tölublaði sem er.",
    "successTitle": "Þú ert áskrifandi",
    "successBody": "Ný tölublöð berast á {email}.",
    "successTip": "Bættu sendandanum við tengiliðina þína svo póstarnir lendi ekki í ruslpósti.",
    "invalidTitle": "Þessi tengill er ófullgerður",
    "invalidBody": "Opnaðu staðfestingarpóstinn aftur og veldu hnappinn í honum. Ef þú finnur hann ekki skaltu skrá þig aftur á síðu sendandans.",
    "notFoundBody": "Við fundum enga skráningu fyrir þetta netfang. Skráðu þig aftur á síðu sendandans.",
    "errorBody": "Við gátum ekki staðfest áskriftina þína. Reyndu aftur eftir smástund.",
    "retry": "Reyna aftur",
    "home": "Fara á forsíðu"
  },
  "embed": {
    "title": "Bættu skráningarformi við vefinn þinn",
    "intro": "Límdu einn af þessum kóðabútum inn á vefinn þinn. Þeir sem skrá sig fá staðfestingarpóst og síðan tölublöðin þín á sínu eigin tungumáli.",
    "linkLabel": "Tengill á skráningarsíðu",
    "linkHint": "Deildu honum í lýsingu á samfélagsmiðlum, í undirskrift tölvupósts eða í QR-kóða.",
    "scriptLabel": "Script-merki (mælt með)",
    "scriptHint": "Límdu það þar sem formið á að birtast. Formið aðlagar stærðina sjálft.",
    "iframeLabel": "Iframe",
    "iframeHint": "Notaðu þetta ef vefurinn þinn leyfir ekki skriftur.",
    "copy": "Afrita",
    "copied": "Afritað",
    "copyFailed": "Veldu textann og afritaðu hann handvirkt.",
    "options": "Valkostir forms",
    "accent": "Litur hnapps",
    "accentHint": "Láttu hann vera óbreyttan til að nota lit vörumerkisins þíns.",
    "theme": "Þema",
    "themeAuto": "Fylgja stillingu gestsins",
    "themeLight": "Ljóst",
    "themeDark": "Dökkt",
    "layout": "Útlit",
    "layoutFull": "Fullt (titill, nafn og tungumál)",
    "layoutCompact": "Þjappað (netfang og hnappur)",
    "preview": "Forskoðun",
    "previewNote": "Forskoðunin er virk. Skráning hér býr til raunverulegan áskrifanda.",
    "missing": "Búðu fyrst til fréttabréf. Skráningarformið birtist hér þegar það er til."
  },
  "page": {
    "poweredBy": "Keyrt á AIBAN",
    "title": "Áskrift"
  },
  "signature": {
    "title": "Undirskrift tölvupósts",
    "intro": "Lesendur sjá þetta í lok hvers tölublaðs. Smelltu á hvaða hluta forskoðunarinnar sem er til að breyta honum.",
    "show": "Sýna undirskriftina mína í hverju tölublaði",
    "showHint": "Ef þú slekkur á henni enda tölublöðin á greininni.",
    "preview": "Forskoðun",
    "previewEmpty": "Undirskriftin þín er tóm. Byrjaðu á því að bæta við nafninu þínu.",
    "articleEnd": "Lok greinarinnar",
    "tabContent": "Efni",
    "tabStyle": "Stíll",
    "blocks": "Hvað á að vera með",
    "blocksHint": "Veldu merki til að sýna eða fela þann hluta. Faldir hlutar halda textanum sínum.",
    "layout": "Útlit",
    "layouts": {
      "bar": "Litaborði",
      "photo": "Mynd",
      "stacked": "Hvert undir öðru",
      "centered": "Miðjað",
      "minimal": "Aðeins texti"
    },
    "fields": {
      "name": "Nafn",
      "role": "Starfsheiti",
      "company": "Fyrirtæki",
      "phone": "Sími",
      "email": "Netfang",
      "website": "Vefsíða",
      "address": "Heimilisfang",
      "photoUrl": "Mynd",
      "logoUrl": "Merki",
      "socials": "Tenglar á samfélagsmiðla",
      "cta": "Hnappur",
      "disclaimer": "Lagalegur fyrirvari"
    },
    "groups": {
      "about": "Um þig",
      "contact": "Samband",
      "images": "Myndir",
      "socials": "Samfélagsmiðlar",
      "cta": "Hnappur",
      "disclaimer": "Lagalegur fyrirvari"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Stofnandi",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Aðalstræti 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Bóka símtal",
      "ctaUrl": "https://"
    },
    "ctaText": "Texti hnapps",
    "ctaLink": "Tengill hnapps",
    "hints": {
      "photoUrl": "Tengill á ferhyrnda PNG- eða JPG-mynd, að minnsta kosti 144 sinnum 144 dílar og undir 200 KB. Birtist í 72 sinnum 72 dílum við hliðina á nafninu þínu.",
      "logoUrl": "Tengill á PNG- eða JPG-mynd með gegnsæjum eða hvítum bakgrunni, að minnsta kosti 64 dílar á hæð. Birtist 32 dílar á hæð.",
      "website": "Við bætum við https:// ef þú sleppir því.",
      "cta": "Hnappurinn birtist aðeins ef bæði texti og tengill eru útfyllt.",
      "disclaimer": "Smáa letrið neðst, til dæmis trúnaðaryfirlýsing. Skildu eftir autt ef þú þarft hana ekki."
    },
    "style": {
      "accent": "Áherslulitur",
      "accentHint": "Notaður fyrir borðann, tengla og hnappinn. Byrjar sem litur vörumerkisins þíns.",
      "font": "Leturgerð",
      "fontSans": "Steinskrift",
      "fontSerif": "Fótaletur",
      "size": "Leturstærð",
      "sizeMd": "Venjuleg",
      "sizeSm": "Lítil",
      "shape": "Lögun myndar",
      "shapeRound": "Hringlaga",
      "shapeSquare": "Ferhyrnd"
    },
    "hidden": "falið",
    "reset": "Byrja upp á nýtt",
    "resetConfirm": "Veldu aftur til að hreinsa alla reiti"
  }
};
