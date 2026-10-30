// mt strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale mt
export default {
  "welcome": {
    "title": "Merħba fin-newsletter",
    "invitedBy": "{configuratorId} stiednek tabbona."
  },
  "email": {
    "title": "Fejn għandna nibagħtulek kull ħarġa?",
    "placeholder": "L-email tiegħek"
  },
  "name": {
    "title": "X'jismek?",
    "placeholder": "Ismek"
  },
  "language": {
    "title": "B'liema lingwa trid taqra?"
  },
  "subscribed": {
    "title": "Issa int abbonat",
    "subtitle": "Fl-inbox għandek email ta' konferma.",
    "continueTo": "Kompli għal",
    "finishingUp": "Tista' tagħlaq din il-paġna."
  },
  "form": {
    "heading": "Abbona għal {title}",
    "headingFallback": "Abbona għal din in-newsletter",
    "intro": "Il-ħarġiet il-ġodda jaslu bl-email, miktuba bil-lingwa li tagħżel.",
    "from": "Minn {sender}",
    "emailLabel": "Indirizz tal-email",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Isem",
    "optional": "mhux obbligatorju",
    "nameHint": "Nużawh biex insellmulek. Jekk tħallih vojt, nużaw il-bidu tal-indirizz tal-email tiegħek.",
    "languageLabel": "Lingwa tal-ħarġiet",
    "languageSummary": "Ħarġiet bil-lingwa: {language}.",
    "languageChange": "Biddel",
    "languageHint": "Għażilniha skont is-settings tal-browser tiegħek.",
    "submit": "Abbona",
    "submitting": "Qed nabbonawk...",
    "consent": "Meta tabbona, taqbel li tirċievi emails minn {sender}. Kull email fiha link biex tneħħi l-abbonament.",
    "privacy": "Politika tal-privatezza",
    "loadingInfo": "Qed jitgħabbew id-dettalji tan-newsletter"
  },
  "success": {
    "title": "Iċċekkja l-inbox tiegħek",
    "body": "Bgħatna email ta' konferma lil {email}. Iftaħha u agħżel Ikkonferma l-abbonament.",
    "next": "L-ewwel ħarġa tasal wara li tikkonferma, miktuba bil-lingwa: {language}.",
    "spam": "Jekk ma jasal xejn fi ftit minuti, ħares fil-folder tal-ispam jew tal-Promozzjonijiet.",
    "changeEmail": "Uża email oħra",
    "continueTo": "Kompli għal {host}"
  },
  "errors": {
    "emailRequired": "Daħħal l-indirizz tal-email tiegħek.",
    "emailInvalid": "Dan l-indirizz tal-email jidher mhux komplut. Iċċekkjah u erġa' pprova.",
    "missingLink": "Din il-link tal-abbonament m'għandhiex l-informazzjoni kollha. Itlob link ġdida lil min bagħathielek.",
    "notFound": "Din il-link tal-abbonament ma għadhiex taħdem. Itlob link ġdida lil min bagħathielek.",
    "limit": "Din in-newsletter ma tistax tieħu abbonati ġodda bħalissa. Erġa' pprova aktar tard.",
    "invalid": "Ma stajniex naċċettaw dan l-indirizz. Iċċekkjah u erġa' pprova.",
    "server": "Ma stajniex nissejvjaw l-abbonament tiegħek. Erġa' pprova fi ftit mumenti.",
    "network": "Ma stajniex nikkomunikaw mas-server. Iċċekkja l-konnessjoni u erġa' pprova."
  },
  "confirm": {
    "title": "Ikkonferma l-abbonament tiegħek",
    "body": "Agħżel il-buttuna biex tibda tirċievi l-ħarġiet fuq {email}.",
    "button": "Ikkonferma l-abbonament",
    "confirming": "Qed nikkonfermaw...",
    "consent": "Meta tikkonferma, taqbel li tirċievi din in-newsletter bl-email. Tista' tneħħi l-abbonament minn kwalunkwe ħarġa.",
    "successTitle": "Issa int abbonat",
    "successBody": "Il-ħarġiet il-ġodda se jaslu fuq {email}.",
    "successTip": "Żid lil min jibgħathom mal-kuntatti tiegħek biex ma jispiċċawx fl-ispam.",
    "invalidTitle": "Din il-link mhix kompluta",
    "invalidBody": "Erġa' iftaħ l-email ta' konferma u agħżel il-buttuna li fiha. Jekk ma ssibhiex, erġa' abbona mill-paġna ta' min jibgħat.",
    "notFoundBody": "Ma sibna l-ebda abbonament għal dan l-indirizz. Erġa' abbona mill-paġna ta' min jibgħat.",
    "errorBody": "Ma stajniex nikkonfermaw l-abbonament tiegħek. Erġa' pprova fi ftit mumenti.",
    "retry": "Erġa' pprova",
    "home": "Mur il-paġna ewlenija"
  },
  "embed": {
    "title": "Żid formola tal-abbonament fis-sit tiegħek",
    "intro": "Waħħal waħda minn dawn il-biċċiet tal-kodiċi fis-sit tiegħek. Min jabbona jirċievi email ta' konferma, imbagħad il-ħarġiet tiegħek bil-lingwa tiegħu.",
    "linkLabel": "Link tal-paġna tal-abbonament",
    "linkHint": "Aqsamha f'bio fuq il-midja soċjali, f'firma tal-email jew f'kodiċi QR.",
    "scriptLabel": "Tag script (rakkomandat)",
    "scriptHint": "Waħħalha fejn trid li tidher il-formola. Il-formola taġġusta d-daqs tagħha waħedha.",
    "iframeLabel": "Iframe",
    "iframeHint": "Uża dan jekk is-sit tiegħek ma jippermettix scripts.",
    "copy": "Ikkopja",
    "copied": "Ikkupjat",
    "copyFailed": "Agħżel it-test u kkopjah int stess.",
    "options": "Għażliet tal-formola",
    "accent": "Kulur tal-buttuna",
    "accentHint": "Ħallih kif inhu biex tuża l-kulur tal-marka tiegħek.",
    "theme": "Tema",
    "themeAuto": "Skont is-setting tal-viżitatur",
    "themeLight": "Ċar",
    "themeDark": "Skur",
    "layout": "Tqassim",
    "layoutFull": "Sħiħ (titlu, isem u lingwa)",
    "layoutCompact": "Kompatt (email u buttuna)",
    "preview": "Dehra minn qabel",
    "previewNote": "Id-dehra minn qabel hija ħajja. Abbonament hawn joħloq abbonat veru.",
    "missing": "L-ewwel oħloq newsletter. Il-formola tal-abbonament tidher hawn meta jkun hemm in-newsletter."
  },
  "page": {
    "poweredBy": "Taħdem b'AIBAN",
    "title": "Abbona"
  },
  "signature": {
    "title": "Firma tal-email",
    "intro": "Il-qarrejja jarawha fl-aħħar ta' kull ħarġa. Ikklikkja fuq kwalunkwe parti tad-dehra minn qabel biex teditjaha.",
    "show": "Uri l-firma tiegħi f'kull ħarġa",
    "showHint": "Jekk titfiha, il-ħarġiet jispiċċaw wara l-artiklu.",
    "preview": "Dehra minn qabel",
    "previewEmpty": "Il-firma tiegħek hija vojta. Żid ismek biex tibda.",
    "articleEnd": "Tmiem l-artiklu",
    "tabContent": "Kontenut",
    "tabStyle": "Stil",
    "blocks": "X'għandu jkun inkluż",
    "blocksHint": "Agħżel tikketta biex turi jew taħbi dik il-parti. Il-partijiet moħbija jżommu t-test tagħhom.",
    "layout": "Tqassim",
    "layouts": {
      "bar": "Strixxa kkulurita",
      "photo": "Ritratt",
      "stacked": "Wieħed taħt l-ieħor",
      "centered": "Iċċentrat",
      "minimal": "Test biss"
    },
    "fields": {
      "name": "Isem",
      "role": "Titlu tax-xogħol",
      "company": "Kumpanija",
      "phone": "Telefon",
      "email": "Email",
      "website": "Sit web",
      "address": "Indirizz",
      "photoUrl": "Ritratt",
      "logoUrl": "Logo",
      "socials": "Links soċjali",
      "cta": "Buttuna",
      "disclaimer": "Nota legali"
    },
    "groups": {
      "about": "Dwarek",
      "contact": "Kuntatt",
      "images": "Stampi",
      "socials": "Links soċjali",
      "cta": "Buttuna",
      "disclaimer": "Nota legali"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Fundatriċi",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Triq il-Kbira, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Ibbukkja telefonata",
      "ctaUrl": "https://"
    },
    "ctaText": "Test tal-buttuna",
    "ctaLink": "Link tal-buttuna",
    "hints": {
      "photoUrl": "Link għal PNG jew JPG kwadru, ta' mill-inqas 144 b'144 pixel u inqas minn 200 KB. Jidher f'72 b'72 pixel ħdejn ismek.",
      "logoUrl": "Link għal PNG jew JPG bi sfond trasparenti jew abjad, għoli mill-inqas 64 pixel. Jidher b'għoli ta' 32 pixel.",
      "website": "Inżidu https:// jekk tħallih barra.",
      "cta": "Il-buttuna tidher biss meta jkunu mimlija kemm it-test kif ukoll il-link.",
      "disclaimer": "Kitba żgħira fil-qiegħ, pereżempju nota ta' kunfidenzjalità. Ħallih vojt jekk ma għandekx bżonnha."
    },
    "style": {
      "accent": "Kulur ta' enfasi",
      "accentHint": "Jintuża għall-istrixxa, il-links u l-buttuna. Jibda bil-kulur tal-marka tiegħek.",
      "font": "Tipa",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Daqs tat-test",
      "sizeMd": "Normali",
      "sizeSm": "Żgħir",
      "shape": "Forma tar-ritratt",
      "shapeRound": "Tond",
      "shapeSquare": "Kwadru"
    },
    "hidden": "moħbi",
    "reset": "Ibda mill-ġdid",
    "resetConfirm": "Agħżel għal darb'oħra biex tbattal il-kaxxi kollha"
  }
};
