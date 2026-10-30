// om strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale om
export default {
  "welcome": {
    "title": "Gara xalayaa oduu kanaatti baga nagaan dhuftan",
    "invitedBy": "{configuratorId} akka galmaa'tan isin afeereera."
  },
  "email": {
    "title": "Maxxansa tokkoon tokkoon eessatti haa ergamu?",
    "placeholder": "Email keessan"
  },
  "name": {
    "title": "Maqaan keessan eenyu?",
    "placeholder": "Maqaa kee"
  },
  "language": {
    "title": "Afaan kamiin dubbisuu barbaaddu?"
  },
  "subscribed": {
    "title": "Galmaa'aniittu",
    "subtitle": "Imeelii mirkaneessaa argachuuf saanduqa imeelii keessanii ilaalaa.",
    "continueTo": "Itti fufi",
    "finishingUp": "Fuula kana cufuu dandeessu."
  },
  "form": {
    "heading": "{title} irratti galmaa'aa",
    "headingFallback": "Xalayaa oduu kana irratti galmaa'aa",
    "intro": "Maxxansi haaraan afaan isin filattaniin barreeffamee imeeliin dhufa.",
    "from": "Erguu: {sender}",
    "emailLabel": "Teessoo imeelii",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Maqaa jalqabaa",
    "optional": "dirqama miti",
    "nameHint": "Isin nagaa gaafachuuf itti fayyadamna. Duwwaa yoo dhiiftan, jalqaba teessoo imeelii keessanii fayyadamna.",
    "languageLabel": "Afaan maxxansa keessanii",
    "languageSummary": "Maxxansi {language}n.",
    "languageChange": "Jijjiiri",
    "languageHint": "Kana qindaa'ina barbaadaa keessanii irraa filanne.",
    "submit": "Galmaa'i",
    "submitting": "Galmaa'aa jira...",
    "consent": "Galmaa'uun, imeelii {sender} irraa dhufu fudhachuuf walii galtu. Imeeliin hundi liinkii galmee dhaabuu qaba.",
    "privacy": "Imaammata dhuunfaa",
    "loadingInfo": "Odeeffannoon xalayaa oduu fe'amaa jira"
  },
  "success": {
    "title": "Saanduqa imeelii keessanii ilaalaa",
    "body": "Imeelii mirkaneessaa {email} tti ergineerra. Banaatii Galmee mirkaneessi filadhaa.",
    "next": "Maxxansi keessan jalqabaa erga mirkaneessitanii booda {language}n barreeffamee dhufa.",
    "spam": "Daqiiqaa muraasa keessatti homtuu yoo hin dhufin, kuusaa spam ykn Promotions ilaalaa.",
    "changeEmail": "Imeelii biraa fayyadami",
    "continueTo": "Gara {host} itti fufi"
  },
  "errors": {
    "emailRequired": "Teessoo imeelii keessanii galchaa.",
    "emailInvalid": "Teessoon imeelii kun guutuu kan hin taane fakkaata. Ilaalaatii irra deebi'aa yaalaa.",
    "missingLink": "Liinkiin galmee kun odeeffannoo hir'ata. Ergaa irraa liinkii haaraa gaafadhaa.",
    "notFound": "Liinkiin galmee kun kana booda hin hojjetu. Ergaa irraa liinkii haaraa gaafadhaa.",
    "limit": "Xalayaan oduu kun amma galmaa'aa haaraa fudhachuu hin danda'u. Booda irra deebi'aa yaalaa.",
    "invalid": "Teessoo kana fudhachuu hin dandeenye. Ilaalaatii irra deebi'aa yaalaa.",
    "server": "Galmee keessan olkaa'uu hin dandeenye. Yeroo muraasa booda irra deebi'aa yaalaa.",
    "network": "Sarvarii bira gahuu hin dandeenye. Walqunnamtii keessan ilaalaatii irra deebi'aa yaalaa."
  },
  "confirm": {
    "title": "Galmee keessan mirkaneessaa",
    "body": "{email} irratti maxxansa fudhachuu jalqabuuf qabduu filadhaa.",
    "button": "Galmee mirkaneessi",
    "confirming": "Mirkaneessaa jira...",
    "consent": "Mirkaneessuun, xalayaa oduu kana imeeliin fudhachuuf walii galtu. Maxxansa kamirraayyuu galmee dhaabuu dandeessu.",
    "successTitle": "Galmaa'aniittu",
    "successBody": "Maxxansi haaraan {email} tti dhufa.",
    "successTip": "Akka spam keessa hin seenneef, ergaa namoota quunnamtii keessanii itti dabalaa.",
    "invalidTitle": "Liinkiin kun guutuu miti",
    "invalidBody": "Imeelii mirkaneessaa irra deebi'aa banaatii qabduu isaa filadhaa. Yoo argachuu baattan, fuula ergaa irraa irra deebi'aa galmaa'aa.",
    "notFoundBody": "Teessoo kanaaf galmee hin arganne. Fuula ergaa irraa irra deebi'aa galmaa'aa.",
    "errorBody": "Galmee keessan mirkaneessuu hin dandeenye. Yeroo muraasa booda irra deebi'aa yaalaa.",
    "retry": "Irra deebi'ii yaali",
    "home": "Gara fuula jalqabaa deemi"
  },
  "embed": {
    "title": "Unka galmee marsariitii keessanitti dabalaa",
    "intro": "Koodii kana keessaa tokko marsariitii keessan irratti maxxansaa. Namoonni galmaa'an imeelii mirkaneessaa, achiis maxxansa keessan afaan isaaniitiin argatu.",
    "linkLabel": "Liinkii fuula galmee",
    "linkHint": "Bio miidiyaa hawaasaa, mallattoo imeelii ykn koodii QR irratti qoodaa.",
    "scriptLabel": "Mallattoo script (kan gorfamu)",
    "scriptHint": "Bakka unkichi itti mul'achuu qabutti maxxansaa. Unkichi bal'ina isaa ofumaan sirreeffata.",
    "iframeLabel": "Iframe",
    "iframeHint": "Marsariitiin keessan script yoo hin heyyamne kana fayyadamaa.",
    "copy": "Garagalchi",
    "copied": "Garagalfameera",
    "copyFailed": "Barreeffama filadhaatii harkaan garagalchaa.",
    "options": "Filannoo unkaa",
    "accent": "Halluu qabduu",
    "accentHint": "Halluu birandii keessanii fayyadamuuf akkuma jirutti dhiisaa.",
    "theme": "Bifa",
    "themeAuto": "Qindaa'ina daawwataa hordofi",
    "themeLight": "Ifaa",
    "themeDark": "Dukkana",
    "layout": "Qindaa'ina",
    "layoutFull": "Guutuu (mata duree, maqaa fi afaan)",
    "layoutCompact": "Gabaabaa (imeelii fi qabduu)",
    "preview": "Duraan ilaaluu",
    "previewNote": "Duraan ilaaluun kun dhugumaan hojjeta. Asitti galmaa'uun galmaa'aa dhugaa uuma.",
    "missing": "Jalqaba xalayaa oduu uumaa. Unki galmee yeroo jiraatu asitti mul'ata."
  },
  "page": {
    "poweredBy": "AIBAN irratti hojjeta",
    "title": "Galmaa'i"
  },
  "signature": {
    "title": "Mallattoo imeelii",
    "intro": "Dubbistoonni kana dhuma maxxansa hundaa irratti argu. Gulaaluuf kutaa duraan ilaaluu kamiyyuu tuqaa.",
    "show": "Maxxansa hunda keessatti mallattoo koo agarsiisi",
    "showHint": "Yoo cuftan, maxxansi barreeffamicha booda xumurama.",
    "preview": "Duraan ilaaluu",
    "previewEmpty": "Mallattoon keessan duwwaa dha. Jalqabuuf maqaa keessan dabalaa.",
    "articleEnd": "Dhuma barreeffamichaa",
    "tabContent": "Qabiyyee",
    "tabStyle": "Haala",
    "blocks": "Waan dabalamu",
    "blocksHint": "Kutaa sana agarsiisuu ykn dhoksuuf mallattoo filadhaa. Kutaaleen dhokfaman barreeffama isaanii eegatu.",
    "layout": "Qindaa'ina",
    "layouts": {
      "bar": "Sarara halluu",
      "photo": "Suuraa",
      "stacked": "Tokko tokko irra",
      "centered": "Gidduutti",
      "minimal": "Barreeffama qofa"
    },
    "fields": {
      "name": "Maqaa",
      "role": "Gahee hojii",
      "company": "Dhaabbata",
      "phone": "Bilbila",
      "email": "Imeelii",
      "website": "Marsariitii",
      "address": "Teessoo",
      "photoUrl": "Suuraa",
      "logoUrl": "Loogoo",
      "socials": "Liinkiiwwan miidiyaa hawaasaa",
      "cta": "Qabduu",
      "disclaimer": "Yaadannoo seeraa"
    },
    "groups": {
      "about": "Waa'ee keessan",
      "contact": "Quunnamtii",
      "images": "Suuraawwan",
      "socials": "Liinkiiwwan miidiyaa hawaasaa",
      "cta": "Qabduu",
      "disclaimer": "Yaadannoo seeraa"
    },
    "placeholders": {
      "name": "Caaltuu Gammachuu",
      "role": "Hundeessaa",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Main Street, Adaamaa",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Bilbila qabadhu",
      "ctaUrl": "https://"
    },
    "ctaText": "Barreeffama qabduu",
    "ctaLink": "Liinkii qabduu",
    "hints": {
      "photoUrl": "Liinkii PNG ykn JPG roga afurii walqixaa, yoo xiqqaate pixel 144 x 144 fi 200 KB gadi. Maqaa keessan cinaatti pixel 72 x 72n mul'ata.",
      "logoUrl": "Liinkii PNG ykn JPG duubni isaa ifa ykn adii ta'e, dheerinni yoo xiqqaate pixel 64. Dheerina pixel 32n mul'ata.",
      "website": "Yoo https:// dhiiftan, nuti ni daballa.",
      "cta": "Qabduun akka mul'atuuf barreeffamni fi liinkiin lachuu barbaachisu.",
      "disclaimer": "Barreeffama xiqqaa gubbaa jalaa, fakkeenyaaf yaadannoo iccitii. Yoo hin barbaachifne duwwaa dhiisaa."
    },
    "style": {
      "accent": "Halluu calaqqisaa",
      "accentHint": "Sararaaf, liinkiiwwaniif fi qabduuf oola. Halluu birandii keessaniitiin jalqaba.",
      "font": "Bifa qubee",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Hanga barreeffamaa",
      "sizeMd": "Idilee",
      "sizeSm": "Xiqqaa",
      "shape": "Boca suuraa",
      "shapeRound": "Geengoo",
      "shapeSquare": "Roga afurii"
    },
    "hidden": "dhokfame",
    "reset": "Haaraa jalqabi",
    "resetConfirm": "Iddoowwan hunda qulqulleessuuf irra deebi'aa filadhaa"
  }
};
