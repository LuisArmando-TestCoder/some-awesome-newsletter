// st strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale st
export default {
  "welcome": {
    "title": "Rea u amohela lengolong la litaba",
    "invitedBy": "{configuratorId} o u memile hore u ingolise."
  },
  "email": {
    "title": "Re romele khatiso ka 'ngoe kae?",
    "placeholder": "Imeile"
  },
  "name": {
    "title": "Lebitso la hao ke mang?",
    "placeholder": "Lebitso"
  },
  "language": {
    "title": "U batla ho bala ka puo efe?"
  },
  "subscribed": {
    "title": "U ingolisitse",
    "subtitle": "Sheba lebokose la hao la email bakeng sa email ea netefatso.",
    "continueTo": "Tswela pele",
    "finishingUp": "U ka koala leqephe lena."
  },
  "form": {
    "heading": "Ingolisa ho {title}",
    "headingFallback": "Ingolisa lengolong lena la litaba",
    "intro": "Likhatiso tse ncha li fihla ka email, li ngotsoe ka puo eo u e khethang.",
    "from": "Ho tsoa ho {sender}",
    "emailLabel": "Aterese ea email",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Lebitso la pele",
    "optional": "ha ho tlame",
    "nameHint": "Re le sebelisa ho u lumelisa. Ha u le siea le se na letho, re sebelisa qalo ea aterese ea hao ea email.",
    "languageLabel": "Puo ea likhatiso tsa hao",
    "languageSummary": "Likhatiso ka {language}.",
    "languageChange": "Fetola",
    "languageHint": "Re khethile sena ho tsoa ho litlhophiso tsa sebatli sa hao.",
    "submit": "Ingolisa",
    "submitting": "Ho ingolisa...",
    "consent": "Ka ho ingolisa, u lumela ho amohela li-email ho tsoa ho {sender}. Email e 'ngoe le e 'ngoe e na le sehokelo sa ho emisa ho ingolisa.",
    "privacy": "Leano la lekunutu",
    "loadingInfo": "Ho kenya lintlha tsa lengolo la litaba"
  },
  "success": {
    "title": "Sheba lebokose la hao la email",
    "body": "Re rometse email ea netefatso ho {email}. E bule 'me u khethe Netefatsa ho ingolisa.",
    "next": "Khatiso ea hao ea pele e tla fihla ka mor'a hore u netefatse, e ngotsoe ka {language}.",
    "spam": "Haeba ho se letho le fihlang ka mor'a metsotso e seng mekae, sheba ho foldara ea spam kapa Promotions.",
    "changeEmail": "Sebelisa email e 'ngoe",
    "continueTo": "Tsoela pele ho {host}"
  },
  "errors": {
    "emailRequired": "Kenya aterese ea hao ea email.",
    "emailInvalid": "Aterese ena ea email e bonahala e sa phethahala. E hlahlobe 'me u leke hape.",
    "missingLink": "Sehokelo sena sa ho ingolisa se haelloa ke lintlha. Kopa sehokelo se secha ho moromeli.",
    "notFound": "Sehokelo sena sa ho ingolisa ha se sa sebetsa. Kopa sehokelo se secha ho moromeli.",
    "limit": "Lengolo lena la litaba le ke ke la amohela bangolisi ba bacha hona joale. Leka hape hamorao.",
    "invalid": "Re sitiloe ho amohela aterese ena. E hlahlobe 'me u leke hape.",
    "server": "Re sitiloe ho boloka ho ingolisa ha hao. Leka hape kapele.",
    "network": "Re sitiloe ho fihla ho seva. Hlahloba khokahano ea hao 'me u leke hape."
  },
  "confirm": {
    "title": "Netefatsa ho ingolisa ha hao",
    "body": "Khetha konopo ho qala ho amohela likhatiso ho {email}.",
    "button": "Netefatsa ho ingolisa",
    "confirming": "Ho netefatsa...",
    "consent": "Ka ho netefatsa, u lumela ho amohela lengolo lena la litaba ka email. U ka emisa ho ingolisa ho tsoa khatisong efe kapa efe.",
    "successTitle": "U ingolisitse",
    "successBody": "Likhatiso tse ncha li tla fihla ho {email}.",
    "successTip": "Hore li se ke tsa kena ho spam, kenya moromeli ho batho bao u buisanang le bona.",
    "invalidTitle": "Sehokelo sena ha se a phethahala",
    "invalidBody": "Bula email ea netefatso hape 'me u khethe konopo ea eona. Haeba u sa e fumane, ingolise hape ho tsoa leqepheng la moromeli.",
    "notFoundBody": "Ha rea fumana ho ingolisa ha aterese ena. Ingolise hape ho tsoa leqepheng la moromeli.",
    "errorBody": "Re sitiloe ho netefatsa ho ingolisa ha hao. Leka hape kapele.",
    "retry": "Leka hape",
    "home": "Eya leqepheng la lehae"
  },
  "embed": {
    "title": "Kenya foromo ea ho ingolisa websaeteng ea hao",
    "intro": "Khomaretsa e 'ngoe ea likhoutu tsena websaeteng ea hao. Batho ba ingolisang ba fumana email ea netefatso, ebe ba fumana likhatiso tsa hao ka puo ea bona.",
    "linkLabel": "Sehokelo sa leqephe la ho ingolisa",
    "linkHint": "Se arolelane ho bio ea litaba tsa sechaba, ho tekeno ea email, kapa ho khoutu ea QR.",
    "scriptLabel": "Tag ea script (e khothalletsoa)",
    "scriptHint": "E khomaretse moo foromo e lokelang ho hlaha teng. Foromo e fetola boholo ba eona ka bo eona.",
    "iframeLabel": "Iframe",
    "iframeHint": "Sebelisa sena haeba websaete ea hao e sa lumelle li-script.",
    "copy": "Kopitsa",
    "copied": "E kopitsitsoe",
    "copyFailed": "Khetha mongolo 'me u o kopitse ka letsoho.",
    "options": "Likhetho tsa foromo",
    "accent": "'Mala oa konopo",
    "accentHint": "O tlohele joalo ho sebelisa 'mala oa brand ea hao.",
    "theme": "Sebopeho",
    "themeAuto": "Latela tlhophiso ea moeti",
    "themeLight": "Khanya",
    "themeDark": "Lefifi",
    "layout": "Moralo",
    "layoutFull": "E feletseng (sehlooho, lebitso le puo)",
    "layoutCompact": "E nyane (email le konopo)",
    "preview": "Ponelopele",
    "previewNote": "Ponelopele ena ea sebetsa ka 'nete. Ho ingolisa mona ho theha mongolisi oa 'nete.",
    "missing": "Theha lengolo la litaba pele. Foromo ea ho ingolisa e tla hlaha mona ha e se e le teng."
  },
  "page": {
    "poweredBy": "E sebetsa ka AIBAN",
    "title": "Ingolisa"
  },
  "signature": {
    "title": "Tekeno ea email",
    "intro": "Babali ba bona sena qetellong ea khatiso e 'ngoe le e 'ngoe. Tobetsa karolo efe kapa efe ea ponelopele ho e fetola.",
    "show": "Bontša tekeno ea ka khatisong e 'ngoe le e 'ngoe",
    "showHint": "Ha u e tima, likhatiso li fela ka mor'a sengoloa.",
    "preview": "Ponelopele",
    "previewEmpty": "Tekeno ea hao ha e na letho. Kenya lebitso la hao ho qala.",
    "articleEnd": "Qetello ea sengoloa",
    "tabContent": "Litaba",
    "tabStyle": "Setaele",
    "blocks": "Seo u ka se kenyang",
    "blocksHint": "Khetha tag ho bontša kapa ho pata karolo eo. Likarolo tse patiloeng li boloka mongolo oa tsona.",
    "layout": "Moralo",
    "layouts": {
      "bar": "Lebanta la 'mala",
      "photo": "Foto",
      "stacked": "Ka holim'a e 'ngoe",
      "centered": "Bohareng",
      "minimal": "Mongolo feela"
    },
    "fields": {
      "name": "Lebitso",
      "role": "Boemo ba mosebetsi",
      "company": "Khamphani",
      "phone": "Mohala",
      "email": "Email",
      "website": "Websaete",
      "address": "Aterese",
      "photoUrl": "Foto",
      "logoUrl": "Logo",
      "socials": "Lihokelo tsa litaba tsa sechaba",
      "cta": "Konopo",
      "disclaimer": "Tlhokomeliso ea molao"
    },
    "groups": {
      "about": "Ka uena",
      "contact": "Ikopanye",
      "images": "Litšoantšo",
      "socials": "Lihokelo tsa litaba tsa sechaba",
      "cta": "Konopo",
      "disclaimer": "Tlhokomeliso ea molao"
    },
    "placeholders": {
      "name": "Palesa Mokoena",
      "role": "Mothehi",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Main Street, Maseru",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Beha nako ea mohala",
      "ctaUrl": "https://"
    },
    "ctaText": "Mongolo oa konopo",
    "ctaLink": "Sehokelo sa konopo",
    "hints": {
      "photoUrl": "Sehokelo sa PNG kapa JPG e lisekoere, bonyane li-pixel tse 144 x 144 'me e le ka tlase ho 200 KB. E bontšoa ka li-pixel tse 72 x 72 haufi le lebitso la hao.",
      "logoUrl": "Sehokelo sa PNG kapa JPG e nang le bokamorao bo bonaletsang kapa bo bosoeu, bonyane li-pixel tse 64 bophahamo. E bontšoa ka bophahamo ba li-pixel tse 32.",
      "website": "Re kenya https:// haeba u sa e ngola.",
      "cta": "Mongolo le sehokelo ka bobeli lia hlokahala hore konopo e hlahe.",
      "disclaimer": "Mongolo o monyane ka tlase, mohlala tlhokomeliso ea lekunutu. E siee e se na letho haeba u sa e hloke."
    },
    "style": {
      "accent": "'Mala o hlahelletseng",
      "accentHint": "O sebelisoa bakeng sa lebanta, lihokelo le konopo. O qala ka 'mala oa brand ea hao.",
      "font": "Fonte",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Boholo ba mongolo",
      "sizeMd": "E tloaelehileng",
      "sizeSm": "E nyane",
      "shape": "Sebopeho sa foto",
      "shapeRound": "Chitja",
      "shapeSquare": "Sekoere"
    },
    "hidden": "e patiloe",
    "reset": "Qala bocha",
    "resetConfirm": "Khetha hape ho hlakola masimo 'ohle"
  }
};
