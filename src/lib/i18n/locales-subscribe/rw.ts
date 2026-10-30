// rw strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale rw
export default {
  "welcome": {
    "title": "Murakaza neza ku kinyamakuru",
    "invitedBy": "{configuratorId} yagutumiye kwiyandikisha."
  },
  "email": {
    "title": "Twohereza he buri nomero?",
    "placeholder": "Imeri yawe"
  },
  "name": {
    "title": "Witwa nde?",
    "placeholder": "Izina ryawe"
  },
  "language": {
    "title": "Ushaka gusoma mu ruhe rurimi?"
  },
  "subscribed": {
    "title": "Wiyandikishije",
    "subtitle": "Reba muri email zawe winjiye usange email yo kwemeza.",
    "continueTo": "Komeza kuri",
    "finishingUp": "Ushobora gufunga iyi paji."
  },
  "form": {
    "heading": "Iyandikishe kuri {title}",
    "headingFallback": "Iyandikishe kuri iki kinyamakuru",
    "intro": "Nomero nshya zigera kuri email yawe, zanditse mu rurimi uhitamo.",
    "from": "Kuva kuri {sender}",
    "emailLabel": "Aderesi ya email",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Izina",
    "optional": "si ngombwa",
    "nameHint": "Turarikoresha tugusuhuza. Niba urisize ubusa, dukoresha intangiriro ya aderesi ya email yawe.",
    "languageLabel": "Ururimi rwa nomero zawe",
    "languageSummary": "Nomero mu {language}.",
    "languageChange": "Hindura",
    "languageHint": "Twabihisemo duhereye ku igenamiterere rya mushakisha yawe.",
    "submit": "Iyandikishe",
    "submitting": "Kwiyandikisha...",
    "consent": "Iyo wiyandikishije, wemera kwakira email ziturutse kuri {sender}. Buri email ifite umurongo wo guhagarika kwiyandikisha.",
    "privacy": "Politiki y'ibanga",
    "loadingInfo": "Turimo gufungura amakuru y'ikinyamakuru"
  },
  "success": {
    "title": "Reba muri email zawe",
    "body": "Twohereje email yo kwemeza kuri {email}. Yifungure uhitemo Emeza kwiyandikisha.",
    "next": "Nomero yawe ya mbere izagera nyuma yo kwemeza, yanditse mu {language}.",
    "spam": "Niba nta kintu kigeze mu minota mike, reba muri spam cyangwa Promotions.",
    "changeEmail": "Koresha indi email",
    "continueTo": "Komeza kuri {host}"
  },
  "errors": {
    "emailRequired": "Andika aderesi ya email yawe.",
    "emailInvalid": "Iyi aderesi ya email isa n'ituzuye. Yigenzure wongere ugerageze.",
    "missingLink": "Uyu murongo wo kwiyandikisha ubura amakuru. Saba uwohereje umurongo mushya.",
    "notFound": "Uyu murongo wo kwiyandikisha ntugikora. Saba uwohereje umurongo mushya.",
    "limit": "Iki kinyamakuru ntigishobora kwakira abiyandikisha bashya ubu. Ongera ugerageze nyuma.",
    "invalid": "Ntitwashoboye kwakira iyi aderesi. Yigenzure wongere ugerageze.",
    "server": "Ntitwashoboye kubika kwiyandikisha kwawe. Ongera ugerageze mu kanya.",
    "network": "Ntitwashoboye kugera kuri seriveri. Genzura murandasi yawe wongere ugerageze."
  },
  "confirm": {
    "title": "Emeza kwiyandikisha kwawe",
    "body": "Hitamo buto kugira ngo utangire kwakira nomero kuri {email}.",
    "button": "Emeza kwiyandikisha",
    "confirming": "Kwemeza...",
    "consent": "Iyo wemeje, wemera kwakira iki kinyamakuru kuri email. Ushobora guhagarika kwiyandikisha uhereye kuri nomero iyo ari yo yose.",
    "successTitle": "Wiyandikishije",
    "successBody": "Nomero nshya zizagera kuri {email}.",
    "successTip": "Kugira ngo zitajya muri spam, ongeraho uwohereza mu bo muvugana.",
    "invalidTitle": "Uyu murongo ntuzuye",
    "invalidBody": "Ongera ufungure email yo kwemeza uhitemo buto yayo. Niba utayibona, ongera wiyandikishe uhereye ku paji y'uwohereza.",
    "notFoundBody": "Ntitwabonye kwiyandikisha kw'iyi aderesi. Ongera wiyandikishe uhereye ku paji y'uwohereza.",
    "errorBody": "Ntitwashoboye kwemeza kwiyandikisha kwawe. Ongera ugerageze mu kanya.",
    "retry": "Ongera ugerageze",
    "home": "Jya ku ipaji y'ibanze"
  },
  "embed": {
    "title": "Ongeraho ifishi yo kwiyandikisha ku rubuga rwawe",
    "intro": "Shyira imwe muri izi kode ku rubuga rwawe. Abiyandikisha babona email yo kwemeza, hanyuma bakabona nomero zawe mu rurimi rwabo.",
    "linkLabel": "Umurongo wa paji yo kwiyandikisha",
    "linkHint": "Usangize muri bio y'imbuga nkoranyambaga, umukono wa email, cyangwa kode ya QR.",
    "scriptLabel": "Tagi ya script (irasabwa)",
    "scriptHint": "Yishyire aho ifishi igomba kugaragara. Ifishi yihindurira ingano ubwayo.",
    "iframeLabel": "Iframe",
    "iframeHint": "Koresha iyi niba urubuga rwawe rutemera script.",
    "copy": "Koporora",
    "copied": "Byakoporowe",
    "copyFailed": "Hitamo inyandiko uyikoporore n'intoki.",
    "options": "Amahitamo y'ifishi",
    "accent": "Ibara rya buto",
    "accentHint": "Bireke uko biri kugira ngo ukoreshe ibara ry'ikirango cyawe.",
    "theme": "Insanganyamatsiko",
    "themeAuto": "Bihuze n'igenamiterere ry'usura",
    "themeLight": "Urumuri",
    "themeDark": "Umwijima",
    "layout": "Imiterere",
    "layoutFull": "Yuzuye (umutwe, izina n'ururimi)",
    "layoutCompact": "Ngufi (email na buto)",
    "preview": "Igaragaza",
    "previewNote": "Iri garagaza rirakora by'ukuri. Kwiyandikisha hano bikora uwiyandikishije nyawe.",
    "missing": "Banza ukore ikinyamakuru. Ifishi yo kwiyandikisha izagaragara hano nikimara kubaho."
  },
  "page": {
    "poweredBy": "Bikoreshwa na AIBAN",
    "title": "Iyandikishe"
  },
  "signature": {
    "title": "Umukono wa email",
    "intro": "Abasomyi babona ibi ku iherezo rya buri nomero. Kanda ku gice icyo ari cyo cyose cy'igaragaza ngo ugihindure.",
    "show": "Erekana umukono wanjye muri buri nomero",
    "showHint": "Niba uwuzimije, nomero zirangirira nyuma y'inkuru.",
    "preview": "Igaragaza",
    "previewEmpty": "Umukono wawe nta kintu urimo. Ongeraho izina ryawe kugira ngo utangire.",
    "articleEnd": "Iherezo ry'inkuru",
    "tabContent": "Ibirimo",
    "tabStyle": "Imiterere",
    "blocks": "Ibyo gushyiramo",
    "blocksHint": "Hitamo tagi kugira ngo werekane cyangwa uhishe icyo gice. Ibice byahishwe bigumana inyandiko yabyo.",
    "layout": "Imiterere",
    "layouts": {
      "bar": "Umurongo w'ibara",
      "photo": "Ifoto",
      "stacked": "Bimwe hejuru y'ibindi",
      "centered": "Hagati",
      "minimal": "Inyandiko gusa"
    },
    "fields": {
      "name": "Izina",
      "role": "Umwanya w'akazi",
      "company": "Ikigo",
      "phone": "Telefoni",
      "email": "Email",
      "website": "Urubuga",
      "address": "Aderesi",
      "photoUrl": "Ifoto",
      "logoUrl": "Ikirango",
      "socials": "Imirongo y'imbuga nkoranyambaga",
      "cta": "Buto",
      "disclaimer": "Icyitonderwa cy'amategeko"
    },
    "groups": {
      "about": "Ibikwerekeye",
      "contact": "Aho wabonerwa",
      "images": "Amafoto",
      "socials": "Imirongo y'imbuga nkoranyambaga",
      "cta": "Buto",
      "disclaimer": "Icyitonderwa cy'amategeko"
    },
    "placeholders": {
      "name": "Uwase Aline",
      "role": "Washinze",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "KN 120 St, Kigali",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Saba guhamagarwa",
      "ctaUrl": "https://"
    },
    "ctaText": "Inyandiko ya buto",
    "ctaLink": "Umurongo wa buto",
    "hints": {
      "photoUrl": "Umurongo ujya kuri PNG cyangwa JPG ya kare, nibura pigiseli 144 kuri 144 kandi itarenze 200 KB. Igaragara ingana na pigiseli 72 kuri 72 iruhande rw'izina ryawe.",
      "logoUrl": "Umurongo ujya kuri PNG cyangwa JPG ifite inyuma igaragaza cyangwa yera, nibura pigiseli 64 z'uburebure. Igaragara ifite uburebure bwa pigiseli 32.",
      "website": "Twongeraho https:// niba utayanditse.",
      "cta": "Inyandiko n'umurongo byombi birakenewe kugira ngo buto igaragare.",
      "disclaimer": "Inyandiko nto hasi, urugero icyitonderwa cy'ibanga. Bisige ubusa niba utabikeneye."
    },
    "style": {
      "accent": "Ibara ry'ingenzi",
      "accentHint": "Rikoreshwa ku murongo, imirongo ihuza na buto. Ritangirana n'ibara ry'ikirango cyawe.",
      "font": "Imyandikire",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Ingano y'inyandiko",
      "sizeMd": "Isanzwe",
      "sizeSm": "Nto",
      "shape": "Ishusho y'ifoto",
      "shapeRound": "Uruziga",
      "shapeSquare": "Kare"
    },
    "hidden": "byahishwe",
    "reset": "Tangira bundi bushya",
    "resetConfirm": "Ongera uhitemo kugira ngo usibe ibisabwa byose"
  }
};
