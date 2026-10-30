// xh strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale xh
export default {
  "welcome": {
    "title": "Wamkelekile kule ncwadana yeendaba",
    "invitedBy": "{configuratorId} ukumeme ukuba ubhalise."
  },
  "email": {
    "title": "Sithumele phi ushicilelo ngalunye?",
    "placeholder": "I-imeyile"
  },
  "name": {
    "title": "Ngubani igama lakho?",
    "placeholder": "Igama"
  },
  "language": {
    "title": "Ufuna ukufunda ngeyiphi ilwimi?"
  },
  "subscribed": {
    "title": "Ubhalisile",
    "subtitle": "Jonga ibhokisi lakho le-imeyile ezingenayo ukuze ufumane i-imeyile yokuqinisekisa.",
    "continueTo": "Qhubeka",
    "finishingUp": "Ungalivala eli phepha."
  },
  "form": {
    "heading": "Bhalisela i-{title}",
    "headingFallback": "Bhalisela le ncwadana yeendaba",
    "intro": "Ushicilelo olutsha lufika nge-imeyile, lubhalwe ngolwimi oluchongileyo.",
    "from": "Ivela ku-{sender}",
    "emailLabel": "Idilesi ye-imeyile",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Igama lokuqala",
    "optional": "akunyanzelekanga",
    "nameHint": "Silisebenzisela ukukubulisa. Ukuba ulishiya lingenanto, sisebenzisa isiqalo sedilesi yakho ye-imeyile.",
    "languageLabel": "Ulwimi loshicilelo lwakho",
    "languageSummary": "Ushicilelo nge-{language}.",
    "languageChange": "Tshintsha",
    "languageHint": "Sikhethe oku kwiisetingi zesikhangeli sakho.",
    "submit": "Bhalisa",
    "submitting": "Iyabhalisa...",
    "consent": "Ngokubhalisa, uyavuma ukufumana ii-imeyile ezivela ku-{sender}. I-imeyile nganye inelinki yokuyeka ukubhalisa.",
    "privacy": "Umgaqo-nkqubo wabucala",
    "loadingInfo": "Ilayisha iinkcukacha zencwadana yeendaba"
  },
  "success": {
    "title": "Jonga ibhokisi lakho le-imeyile ezingenayo",
    "body": "Sithumele i-imeyile yokuqinisekisa ku-{email}. Yivule uze ukhethe Qinisekisa ubhaliso.",
    "next": "Ushicilelo lwakho lokuqala lufika emva kokuba uqinisekisile, lubhalwe nge-{language}.",
    "spam": "Ukuba akukho nto ifikayo kwimizuzu embalwa, jonga kwifolda ye-spam okanye ye-Promotions.",
    "changeEmail": "Sebenzisa enye i-imeyile",
    "continueTo": "Qhubeka uye ku-{host}"
  },
  "errors": {
    "emailRequired": "Faka idilesi yakho ye-imeyile.",
    "emailInvalid": "Le dilesi ye-imeyile ibonakala ingaphelelanga. Yijonge uze uzame kwakhona.",
    "missingLink": "Le linki yobhaliso ayinalo lonke ulwazi. Cela ilinki entsha kumthumeli.",
    "notFound": "Le linki yobhaliso ayisasebenzi. Cela ilinki entsha kumthumeli.",
    "limit": "Le ncwadana yeendaba ayikwazi ukwamkela ababhalisi abatsha okwangoku. Zama kwakhona kamva.",
    "invalid": "Asikwazanga ukwamkela le dilesi. Yijonge uze uzame kwakhona.",
    "server": "Asikwazanga ukugcina ubhaliso lwakho. Zama kwakhona emva kwexeshana.",
    "network": "Asikwazanga ukufikelela kwiseva. Jonga uqhagamshelo lwakho uze uzame kwakhona."
  },
  "confirm": {
    "title": "Qinisekisa ubhaliso lwakho",
    "body": "Khetha iqhosha ukuze uqalise ukufumana ushicilelo ku-{email}.",
    "button": "Qinisekisa ubhaliso",
    "confirming": "Iyaqinisekisa...",
    "consent": "Ngokuqinisekisa, uyavuma ukufumana le ncwadana yeendaba nge-imeyile. Ungayeka ukubhalisa kulo naluphi na ushicilelo.",
    "successTitle": "Ubhalisile",
    "successBody": "Ushicilelo olutsha luza kufika ku-{email}.",
    "successTip": "Ukuze lungangeni kwi-spam, yongeza umthumeli koonxibelelana nabo.",
    "invalidTitle": "Le linki ayiphelelanga",
    "invalidBody": "Vula kwakhona i-imeyile yokuqinisekisa uze ukhethe iqhosha layo. Ukuba awuyifumani, bhalisa kwakhona kwiphepha lomthumeli.",
    "notFoundBody": "Asibufumananga ubhaliso lwale dilesi. Bhalisa kwakhona kwiphepha lomthumeli.",
    "errorBody": "Asikwazanga ukuqinisekisa ubhaliso lwakho. Zama kwakhona emva kwexeshana.",
    "retry": "Zama kwakhona",
    "home": "Yiya kwiphepha lasekhaya"
  },
  "embed": {
    "title": "Yongeza ifomu yobhaliso kwisayithi yakho",
    "intro": "Ncamathisela enye yezi khowudi kwiwebhusayithi yakho. Abantu ababhalisayo bafumana i-imeyile yokuqinisekisa, emva koko bafumane ushicilelo lwakho ngolwimi lwabo.",
    "linkLabel": "Ilinki yephepha lobhaliso",
    "linkHint": "Yabelana ngayo kwi-bio yeendaba zentlalo, kwisignesha ye-imeyile, okanye kwikhowudi ye-QR.",
    "scriptLabel": "Ithegi ye-script (iyacetyiswa)",
    "scriptHint": "Yincamathisele apho ifomu kufuneka ivele khona. Ifomu ilungisa ubungakanani bayo ngokwayo.",
    "iframeLabel": "Iframe",
    "iframeHint": "Sebenzisa oku ukuba isayithi yakho ayivumeli ii-script.",
    "copy": "Kopa",
    "copied": "Ikopiwe",
    "copyFailed": "Khetha umbhalo uze uwukope ngesandla.",
    "options": "Iinketho zefomu",
    "accent": "Umbala weqhosha",
    "accentHint": "Yishiye injalo ukuze usebenzise umbala wophawu lwakho.",
    "theme": "Umxholo",
    "themeAuto": "Landela isetingi yondwendwe",
    "themeLight": "Ekhanyayo",
    "themeDark": "Emnyama",
    "layout": "Uyilo",
    "layoutFull": "Opheleleyo (isihloko, igama nolwimi)",
    "layoutCompact": "Omncinci (i-imeyile neqhosha)",
    "preview": "Imbonakalo yangaphambili",
    "previewNote": "Le mbonakalo yangaphambili iyasebenza ngokwenene. Ukubhalisa apha kwenza umbhalisi wokwenene.",
    "missing": "Qala wenze incwadana yeendaba. Ifomu yobhaliso iza kuvela apha xa ikhona."
  },
  "page": {
    "poweredBy": "Isebenza nge-AIBAN",
    "title": "Bhalisa"
  },
  "signature": {
    "title": "Isignesha ye-imeyile",
    "intro": "Abafundi babona oku ekupheleni koshicilelo ngalunye. Cofa nayiphi na indawo yembonakalo yangaphambili ukuze uyihlele.",
    "show": "Bonisa isignesha yam kushicilelo ngalunye",
    "showHint": "Ukuba uyicima, ushicilelo luphela emva kwenqaku.",
    "preview": "Imbonakalo yangaphambili",
    "previewEmpty": "Isignesha yakho ayinanto. Yongeza igama lakho ukuze uqalise.",
    "articleEnd": "Isiphelo senqaku",
    "tabContent": "Umxholo",
    "tabStyle": "Isimbo",
    "blocks": "Into ekufuneka ifakwe",
    "blocksHint": "Khetha ithegi ukuze ubonise okanye ufihle elo candelo. Amacandelo afihliweyo agcina umbhalo wawo.",
    "layout": "Uyilo",
    "layouts": {
      "bar": "Ibha enombala",
      "photo": "Ifoto",
      "stacked": "Phezu kwenye",
      "centered": "Embindini",
      "minimal": "Umbhalo kuphela"
    },
    "fields": {
      "name": "Igama",
      "role": "Isikhundla",
      "company": "Inkampani",
      "phone": "Ifowuni",
      "email": "I-imeyile",
      "website": "Iwebhusayithi",
      "address": "Idilesi",
      "photoUrl": "Ifoto",
      "logoUrl": "Ilogo",
      "socials": "Iilinki zeendaba zentlalo",
      "cta": "Iqhosha",
      "disclaimer": "Inqaku lezomthetho"
    },
    "groups": {
      "about": "Malunga nawe",
      "contact": "Unxibelelwano",
      "images": "Imifanekiso",
      "socials": "Iilinki zeendaba zentlalo",
      "cta": "Iqhosha",
      "disclaimer": "Inqaku lezomthetho"
    },
    "placeholders": {
      "name": "Nomsa Mahlangu",
      "role": "Umseki",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Main Street, eMonti",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Bhukisha umnxeba",
      "ctaUrl": "https://"
    },
    "ctaText": "Umbhalo weqhosha",
    "ctaLink": "Ilinki yeqhosha",
    "hints": {
      "photoUrl": "Ilinki eya kwi-PNG okanye i-JPG esisikwere, ubuncinci ii-pixel ezili-144 x 144 kwaye ingaphantsi kwe-200 KB. Iboniswa ngee-pixel ezingama-72 x 72 ecaleni kwegama lakho.",
      "logoUrl": "Ilinki eya kwi-PNG okanye i-JPG enomva obonakalayo okanye omhlophe, ubuncinci ii-pixel ezingama-64 ukuphakama. Iboniswa ngokuphakama kwee-pixel ezingama-32.",
      "website": "Songeza i-https:// ukuba uyishiyile.",
      "cta": "Kufuneka zombini umbhalo nelinki ukuze iqhosha libonakale.",
      "disclaimer": "Umbhalo omncinci ezantsi, umzekelo inqaku lemfihlo. Yishiye ingenanto ukuba awuyidingi."
    },
    "style": {
      "accent": "Umbala wokugxininisa",
      "accentHint": "Usetyenziselwa ibha, iilinki neqhosha. Uqala ngombala wophawu lwakho.",
      "font": "Ifonti",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Ubungakanani bombhalo",
      "sizeMd": "Oqhelekileyo",
      "sizeSm": "Omncinci",
      "shape": "Imo yefoto",
      "shapeRound": "Ingqukuva",
      "shapeSquare": "Isikwere"
    },
    "hidden": "ifihliwe",
    "reset": "Qala kwakhona",
    "resetConfirm": "Khetha kwakhona ukuze ucime onke amasimi"
  }
};
