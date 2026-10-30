// ny strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale ny
export default {
  "welcome": {
    "title": "Takulandirani ku kalata yankhani",
    "invitedBy": "{configuratorId} wakuitanani kuti mulembetse."
  },
  "email": {
    "title": "Tizitumiza kuti kope lililonse?",
    "placeholder": "Imelo yanu"
  },
  "name": {
    "title": "Dzina lanu ndani?",
    "placeholder": "Dzina lanu"
  },
  "language": {
    "title": "Mukufuna kuwerenga m'chinenero chiti?"
  },
  "subscribed": {
    "title": "Mwalembetsa",
    "subtitle": "Onani bokosi lanu la imelo kuti mupeze imelo yotsimikizira.",
    "continueTo": "Pitirizani ku",
    "finishingUp": "Mutha kutseka tsamba ili."
  },
  "form": {
    "heading": "Lembetsani ku {title}",
    "headingFallback": "Lembetsani ku kalata yankhani iyi",
    "intro": "Makope atsopano amabwera kudzera pa imelo, olembedwa m'chinenero chomwe mwasankha.",
    "from": "Kuchokera kwa {sender}",
    "emailLabel": "Adilesi ya imelo",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Dzina loyamba",
    "optional": "sikofunikira",
    "nameHint": "Timaligwiritsa ntchito kukupatsani moni. Mukalisiya lopanda kanthu, timagwiritsa ntchito chiyambi cha adilesi yanu ya imelo.",
    "languageLabel": "Chinenero cha makope anu",
    "languageSummary": "Makope mu {language}.",
    "languageChange": "Sinthani",
    "languageHint": "Tasankha ichi kuchokera ku makonda a msakatuli wanu.",
    "submit": "Lembetsani",
    "submitting": "Tikulembetsa...",
    "consent": "Mukalembetsa, mukuvomera kulandira maimelo kuchokera kwa {sender}. Imelo iliyonse ili ndi ulalo wosiya kulembetsa.",
    "privacy": "Mfundo zachinsinsi",
    "loadingInfo": "Tikutsitsa zambiri za kalata yankhani"
  },
  "success": {
    "title": "Onani bokosi lanu la imelo",
    "body": "Tatumiza imelo yotsimikizira ku {email}. Itsegulani ndipo sankhani Tsimikizirani kulembetsa.",
    "next": "Kope lanu loyamba lidzabwera mukatsimikizira, lolembedwa mu {language}.",
    "spam": "Ngati palibe chomwe chafika pakatha mphindi zochepa, yang'anani mu foda ya spam kapena Promotions.",
    "changeEmail": "Gwiritsani ntchito imelo ina",
    "continueTo": "Pitirizani ku {host}"
  },
  "errors": {
    "emailRequired": "Lowetsani adilesi yanu ya imelo.",
    "emailInvalid": "Adilesi ya imelo iyi ikuoneka kuti siyokwanira. Ifufuzeni ndipo yesaninso.",
    "missingLink": "Ulalo wolembetsera uwu ulibe zambiri zokwanira. Pemphani ulalo watsopano kwa wotumiza.",
    "notFound": "Ulalo wolembetsera uwu sukugwiranso ntchito. Pemphani ulalo watsopano kwa wotumiza.",
    "limit": "Kalata yankhani iyi siingathe kulandira olembetsa atsopano pakadali pano. Yesaninso pambuyo pake.",
    "invalid": "Sitinathe kulandira adilesi iyi. Ifufuzeni ndipo yesaninso.",
    "server": "Sitinathe kusunga kulembetsa kwanu. Yesaninso pakapita kanthawi.",
    "network": "Sitinathe kufika pa seva. Fufuzani kulumikizana kwanu ndipo yesaninso."
  },
  "confirm": {
    "title": "Tsimikizirani kulembetsa kwanu",
    "body": "Sankhani batani kuti muyambe kulandira makope pa {email}.",
    "button": "Tsimikizirani kulembetsa",
    "confirming": "Tikutsimikizira...",
    "consent": "Mukatsimikizira, mukuvomera kulandira kalata yankhani iyi pa imelo. Mutha kusiya kulembetsa kuchokera ku kope lililonse.",
    "successTitle": "Mwalembetsa",
    "successBody": "Makope atsopano adzafika pa {email}.",
    "successTip": "Kuti asapite ku spam, onjezani wotumiza pa anthu omwe mumalumikizana nawo.",
    "invalidTitle": "Ulalo uwu siwokwanira",
    "invalidBody": "Tsegulaninso imelo yotsimikizira ndipo sankhani batani lake. Ngati simukuipeza, lembetsaninso kuchokera patsamba la wotumiza.",
    "notFoundBody": "Sitinapeze kulembetsa kwa adilesi iyi. Lembetsaninso kuchokera patsamba la wotumiza.",
    "errorBody": "Sitinathe kutsimikizira kulembetsa kwanu. Yesaninso pakapita kanthawi.",
    "retry": "Yesaninso",
    "home": "Pitani ku tsamba loyamba"
  },
  "embed": {
    "title": "Onjezani fomu yolembetsera pa tsamba lanu",
    "intro": "Matani imodzi mwa makhodi awa pa webusaiti yanu. Anthu omwe alembetsa amalandira imelo yotsimikizira, kenako makope anu m'chinenero chawo.",
    "linkLabel": "Ulalo wa tsamba lolembetsera",
    "linkHint": "Gawanani pa bio ya malo ochezera, siginecha ya imelo, kapena khodi ya QR.",
    "scriptLabel": "Chizindikiro cha script (chovomerezeka)",
    "scriptHint": "Matani pamalo omwe fomu iyenera kuonekera. Fomu imasintha kukula kwake yokha.",
    "iframeLabel": "Iframe",
    "iframeHint": "Gwiritsani ntchito ichi ngati tsamba lanu siililola ma script.",
    "copy": "Koperani",
    "copied": "Zakopedwa",
    "copyFailed": "Sankhani mawuwo ndipo akoperani nokha.",
    "options": "Zosankha za fomu",
    "accent": "Mtundu wa batani",
    "accentHint": "Musiyeni momwe ulili kuti mugwiritse ntchito mtundu wa chizindikiro chanu.",
    "theme": "Mutu",
    "themeAuto": "Tsatirani makonda a mlendo",
    "themeLight": "Kowala",
    "themeDark": "Kwamdima",
    "layout": "Kakonzedwe",
    "layoutFull": "Kwathunthu (mutu, dzina ndi chinenero)",
    "layoutCompact": "Kwachidule (imelo ndi batani)",
    "preview": "Chiwonetsero",
    "previewNote": "Chiwonetserochi chikugwira ntchito kwenikweni. Kulembetsa pano kumapanga wolembetsa weniweni.",
    "missing": "Pangani kalata yankhani choyamba. Fomu yolembetsera idzaonekera pano ikakhalapo."
  },
  "page": {
    "poweredBy": "Imagwira ntchito pa AIBAN",
    "title": "Lembetsani"
  },
  "signature": {
    "title": "Siginecha ya imelo",
    "intro": "Owerenga amaona izi kumapeto kwa kope lililonse. Dinani gawo lililonse la chiwonetsero kuti mulisinthe.",
    "show": "Onetsani siginecha yanga m'kope lililonse",
    "showHint": "Mukaizimitsa, makope amatha pambuyo pa nkhani.",
    "preview": "Chiwonetsero",
    "previewEmpty": "Siginecha yanu ilibe kanthu. Onjezani dzina lanu kuti muyambe.",
    "articleEnd": "Mapeto a nkhani",
    "tabContent": "Zomwe zili mkati",
    "tabStyle": "Kaonekedwe",
    "blocks": "Zoti muphatikize",
    "blocksHint": "Sankhani chizindikiro kuti muonetse kapena kubisa gawolo. Magawo obisika amasunga mawu awo.",
    "layout": "Kakonzedwe",
    "layouts": {
      "bar": "Mzere wamtundu",
      "photo": "Chithunzi",
      "stacked": "Pamwamba pa chinzake",
      "centered": "Pakati",
      "minimal": "Mawu okha"
    },
    "fields": {
      "name": "Dzina",
      "role": "Udindo",
      "company": "Kampani",
      "phone": "Foni",
      "email": "Imelo",
      "website": "Webusaiti",
      "address": "Adilesi",
      "photoUrl": "Chithunzi",
      "logoUrl": "Logo",
      "socials": "Maulalo a malo ochezera",
      "cta": "Batani",
      "disclaimer": "Chidziwitso chalamulo"
    },
    "groups": {
      "about": "Za inu",
      "contact": "Kulumikizana",
      "images": "Zithunzi",
      "socials": "Maulalo a malo ochezera",
      "cta": "Batani",
      "disclaimer": "Chidziwitso chalamulo"
    },
    "placeholders": {
      "name": "Chikondi Banda",
      "role": "Woyambitsa",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Main Street, Lilongwe",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Konzani foni",
      "ctaUrl": "https://"
    },
    "ctaText": "Mawu a batani",
    "ctaLink": "Ulalo wa batani",
    "hints": {
      "photoUrl": "Ulalo wa PNG kapena JPG yofanana mbali zonse, osachepera ma pixel 144 x 144 komanso pansi pa 200 KB. Imaonetsedwa pa ma pixel 72 x 72 pafupi ndi dzina lanu.",
      "logoUrl": "Ulalo wa PNG kapena JPG yokhala ndi kumbuyo kowonekera kapena koyera, yosachepera ma pixel 64 kutalika. Imaonetsedwa pa kutalika kwa ma pixel 32.",
      "website": "Timaonjezera https:// ngati simunalembe.",
      "cta": "Mawu ndi ulalo zonse zikufunika kuti batani lionekere.",
      "disclaimer": "Mawu ang'onoang'ono pansi, mwachitsanzo chidziwitso chachinsinsi. Siyani lopanda kanthu ngati simukulifuna."
    },
    "style": {
      "accent": "Mtundu wapadera",
      "accentHint": "Umagwiritsidwa ntchito pa mzere, maulalo ndi batani. Umayamba ndi mtundu wa chizindikiro chanu.",
      "font": "Kalembedwe ka zilembo",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Kukula kwa mawu",
      "sizeMd": "Pakati",
      "sizeSm": "Kang'ono",
      "shape": "Mawonekedwe a chithunzi",
      "shapeRound": "Chozungulira",
      "shapeSquare": "Chofanana mbali zonse"
    },
    "hidden": "chobisika",
    "reset": "Yambaninso",
    "resetConfirm": "Sankhaninso kuti mufufute minda yonse"
  }
};
