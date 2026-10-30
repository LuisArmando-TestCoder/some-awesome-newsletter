// zu strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale zu
export default {
  "welcome": {
    "title": "Siyakwamukela kuleli phephandaba",
    "invitedBy": "{configuratorId} ukumeme ukuthi ubhalisele."
  },
  "email": {
    "title": "Singathumela kuphi ushicilelo ngalunye?",
    "placeholder": "I-imeyili yakho"
  },
  "name": {
    "title": "Ubani igama lakho?",
    "placeholder": "Igama lakho"
  },
  "language": {
    "title": "Ufuna ukufunda ngaluphi ulimi?"
  },
  "subscribed": {
    "title": "Usubhalisile",
    "subtitle": "Hlola ibhokisi lakho lokungenayo ukuze uthole i-imeyili yokuqinisekisa.",
    "continueTo": "Qhubeka ku",
    "finishingUp": "Ungalivala leli khasi."
  },
  "form": {
    "heading": "Bhalisela i-{title}",
    "headingFallback": "Bhalisela leli phephandaba",
    "intro": "Ushicilelo olusha lufika nge-imeyili, lubhalwe ngolimi olukhethayo.",
    "from": "Kusuka ku-{sender}",
    "emailLabel": "Ikheli le-imeyili",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Igama lokuqala",
    "optional": "akuphoqelekile",
    "nameHint": "Silisebenzisa ukukubingelela. Uma ulishiya lingenalutho, sisebenzisa ingxenye yokuqala yekheli lakho le-imeyili.",
    "languageLabel": "Ulimi loshicilelo lwakho",
    "languageSummary": "Ushicilelo nge-{language}.",
    "languageChange": "Shintsha",
    "languageHint": "Lokhu sikukhethe kuzilungiselelo zesiphequluli sakho.",
    "submit": "Bhalisa",
    "submitting": "Iyabhalisa...",
    "consent": "Ngokubhalisa, uyavuma ukuthola ama-imeyili avela ku-{sender}. I-imeyili ngayinye inesixhumanisi sokuyeka ukubhalisa.",
    "privacy": "Inqubomgomo yobumfihlo",
    "loadingInfo": "Ilayisha imininingwane yephephandaba"
  },
  "success": {
    "title": "Hlola ibhokisi lakho lokungenayo",
    "body": "Sithumele i-imeyili yokuqinisekisa ku-{email}. Yivule bese ukhetha Qinisekisa ukubhalisa.",
    "next": "Ushicilelo lwakho lokuqala lufika ngemva kokuthi uqinisekise, lubhalwe nge-{language}.",
    "spam": "Uma kungafiki lutho emizuzwini embalwa, bheka kufolda ye-spam noma ye-Promotions.",
    "changeEmail": "Sebenzisa enye i-imeyili",
    "continueTo": "Qhubeka uye ku-{host}"
  },
  "errors": {
    "emailRequired": "Faka ikheli lakho le-imeyili.",
    "emailInvalid": "Leli kheli le-imeyili libonakala lingaphelele. Lihlole bese uzama futhi.",
    "missingLink": "Lesi sixhumanisi sokubhalisa asinalo lonke ulwazi. Cela isixhumanisi esisha kumthumeli.",
    "notFound": "Lesi sixhumanisi sokubhalisa asisasebenzi. Cela isixhumanisi esisha kumthumeli.",
    "limit": "Leli phephandaba alikwazi ukwamukela ababhalisile abasha okwamanje. Zama futhi kamuva.",
    "invalid": "Asikwazanga ukwamukela leli kheli. Lihlole bese uzama futhi.",
    "server": "Asikwazanga ukulondoloza ukubhalisa kwakho. Zama futhi ngemva kwesikhashana.",
    "network": "Asikwazanga ukufinyelela iseva. Hlola uxhumano lwakho bese uzama futhi."
  },
  "confirm": {
    "title": "Qinisekisa ukubhalisa kwakho",
    "body": "Khetha inkinobho ukuze uqale ukuthola ushicilelo ku-{email}.",
    "button": "Qinisekisa ukubhalisa",
    "confirming": "Iyaqinisekisa...",
    "consent": "Ngokuqinisekisa, uyavuma ukuthola leli phephandaba nge-imeyili. Ungayeka ukubhalisa kunoma yiluphi ushicilelo.",
    "successTitle": "Usubhalisile",
    "successBody": "Ushicilelo olusha luzofika ku-{email}.",
    "successTip": "Ukuze lungangeni ku-spam, engeza umthumeli koxhumana nabo.",
    "invalidTitle": "Lesi sixhumanisi asiphelele",
    "invalidBody": "Vula futhi i-imeyili yokuqinisekisa bese ukhetha inkinobho yayo. Uma ungayitholi, bhalisa futhi ekhasini lomthumeli.",
    "notFoundBody": "Asikutholanga ukubhalisa kwaleli kheli. Bhalisa futhi ekhasini lomthumeli.",
    "errorBody": "Asikwazanga ukuqinisekisa ukubhalisa kwakho. Zama futhi ngemva kwesikhashana.",
    "retry": "Zama futhi",
    "home": "Iya ekhasini lasekhaya"
  },
  "embed": {
    "title": "Engeza ifomu lokubhalisa kusayithi yakho",
    "intro": "Namathisela enye yalezi zingcezu zekhodi kuwebhusayithi yakho. Abantu ababhalisayo bathola i-imeyili yokuqinisekisa, bese bethola ushicilelo lwakho ngolimi lwabo.",
    "linkLabel": "Isixhumanisi sekhasi lokubhalisa",
    "linkHint": "Yabelana ngaso ku-bio yezokuxhumana, esiginesheni ye-imeyili, noma kukhodi ye-QR.",
    "scriptLabel": "Ithegi ye-script (inconywayo)",
    "scriptHint": "Yinamathisele lapho ifomu kufanele livele khona. Ifomu lizilungisela usayizi ngokwalo.",
    "iframeLabel": "Iframe",
    "iframeHint": "Sebenzisa lokhu uma isayithi yakho ingavumeli ama-script.",
    "copy": "Kopisha",
    "copied": "Kukopishiwe",
    "copyFailed": "Khetha umbhalo bese uwukopisha ngesandla.",
    "options": "Izinketho zefomu",
    "accent": "Umbala wenkinobho",
    "accentHint": "Yishiye injalo ukuze usebenzise umbala womkhiqizo wakho.",
    "theme": "Itimu",
    "themeAuto": "Landela isilungiselelo sesivakashi",
    "themeLight": "Ekhanyayo",
    "themeDark": "Emnyama",
    "layout": "Ukwakheka",
    "layoutFull": "Okugcwele (isihloko, igama nolimi)",
    "layoutCompact": "Okuncane (i-imeyili nenkinobho)",
    "preview": "Ukubuka kuqala",
    "previewNote": "Lokhu kubuka kuqala kuyasebenza ngempela. Ukubhalisa lapha kudala obhalisile wangempela.",
    "missing": "Qala ngokudala iphephandaba. Ifomu lokubhalisa lizovela lapha uma selikhona."
  },
  "page": {
    "poweredBy": "Isebenza nge-AIBAN",
    "title": "Bhalisa"
  },
  "signature": {
    "title": "Isiginesha ye-imeyili",
    "intro": "Abafundi babona lokhu ekugcineni koshicilelo ngalunye. Chofoza noma iyiphi ingxenye yokubuka kuqala ukuze uyihlele.",
    "show": "Bonisa isiginesha yami koshicilelo ngalunye",
    "showHint": "Uma uyicisha, ushicilelo luphela ngemva kwendatshana.",
    "preview": "Ukubuka kuqala",
    "previewEmpty": "Isiginesha yakho ayinalutho. Engeza igama lakho ukuze uqale.",
    "articleEnd": "Ukuphela kwendatshana",
    "tabContent": "Okuqukethwe",
    "tabStyle": "Isitayela",
    "blocks": "Okufanele kufakwe",
    "blocksHint": "Khetha ithegi ukuze ubonise noma ufihle leyo ngxenye. Izingxenye ezifihliwe zigcina umbhalo wazo.",
    "layout": "Ukwakheka",
    "layouts": {
      "bar": "Ibha enombala",
      "photo": "Isithombe",
      "stacked": "Phezu kwenye",
      "centered": "Phakathi",
      "minimal": "Umbhalo kuphela"
    },
    "fields": {
      "name": "Igama",
      "role": "Isikhundla",
      "company": "Inkampani",
      "phone": "Ucingo",
      "email": "I-imeyili",
      "website": "Iwebhusayithi",
      "address": "Ikheli",
      "photoUrl": "Isithombe",
      "logoUrl": "Ilogo",
      "socials": "Izixhumanisi zezokuxhumana",
      "cta": "Inkinobho",
      "disclaimer": "Inothi lezomthetho"
    },
    "groups": {
      "about": "Mayelana nawe",
      "contact": "Oxhumana naye",
      "images": "Izithombe",
      "socials": "Izixhumanisi zezokuxhumana",
      "cta": "Inkinobho",
      "disclaimer": "Inothi lezomthetho"
    },
    "placeholders": {
      "name": "Thandeka Dlamini",
      "role": "Umsunguli",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Main Street, eThekwini",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Bhukha ucingo",
      "ctaUrl": "https://"
    },
    "ctaText": "Umbhalo wenkinobho",
    "ctaLink": "Isixhumanisi senkinobho",
    "hints": {
      "photoUrl": "Isixhumanisi se-PNG noma i-JPG eyisikwele, okungenani ama-pixel angu-144 x 144 futhi ngaphansi kuka-200 KB. Kuboniswa ngama-pixel angu-72 x 72 eduze kwegama lakho.",
      "logoUrl": "Isixhumanisi se-PNG noma i-JPG enengemuva elibonakalisayo noma elimhlophe, okungenani ama-pixel angu-64 ubude. Kuboniswa ngobude bama-pixel angu-32.",
      "website": "Sengeza i-https:// uma uyishiya.",
      "cta": "Kudingeka kokubili umbhalo nesixhumanisi ukuze inkinobho ivele.",
      "disclaimer": "Umbhalo omncane phansi, isibonelo inothi lobumfihlo. Yishiye ingenalutho uma ungayidingi."
    },
    "style": {
      "accent": "Umbala wokugqamisa",
      "accentHint": "Usetshenziselwa ibha, izixhumanisi nenkinobho. Uqala ngombala womkhiqizo wakho.",
      "font": "Ifonti",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Usayizi wombhalo",
      "sizeMd": "Ojwayelekile",
      "sizeSm": "Omncane",
      "shape": "Isimo sesithombe",
      "shapeRound": "Okuyindilinga",
      "shapeSquare": "Okuyisikwele"
    },
    "hidden": "kufihliwe",
    "reset": "Qala phansi",
    "resetConfirm": "Khetha futhi ukuze usule zonke izinkambu"
  }
};
