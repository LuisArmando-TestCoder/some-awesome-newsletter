// so strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale so
export default {
  "welcome": {
    "title": "Ku soo dhowow warsidahan",
    "invitedBy": "{configuratorId} ayaa kuu casuumay inaad isdiiwaangeliso."
  },
  "email": {
    "title": "Xaggee baan u dirnaa cadad kasta?",
    "placeholder": "Emailkaaga"
  },
  "name": {
    "title": "Magacaa?",
    "placeholder": "Magacaaga"
  },
  "language": {
    "title": "Luqaddee ayaad rabtaa inaad ku akhrido?"
  },
  "subscribed": {
    "title": "Waad isdiiwaangelisay",
    "subtitle": "Ka eeg sanduuqaaga iimaylka iimaylka xaqiijinta.",
    "continueTo": "Sii wad",
    "finishingUp": "Waad xiri kartaa boggan."
  },
  "form": {
    "heading": "Isdiiwaangeli {title}",
    "headingFallback": "Isdiiwaangeli warsidahan",
    "intro": "Cadadyada cusub waxay ku yimaadaan iimayl, iyagoo ku qoran luqadda aad doorato.",
    "from": "Ka yimid {sender}",
    "emailLabel": "Cinwaanka iimaylka",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Magaca koowaad",
    "optional": "ikhtiyaari",
    "nameHint": "Waxaan u isticmaalnaa inaan kugu salaanno. Haddii aad madhan ka tagto, waxaan isticmaalnaa bilowga cinwaankaaga iimaylka.",
    "languageLabel": "Luqadda cadadyadaada",
    "languageSummary": "Cadadyada oo ku qoran {language}.",
    "languageChange": "Beddel",
    "languageHint": "Waxaan tan ka doorannay dejimaha biraawsarkaaga.",
    "submit": "Isdiiwaangeli",
    "submitting": "Waa la isdiiwaangelinayaa...",
    "consent": "Markaad isdiiwaangeliso, waxaad ogolaatay inaad hesho iimaylo ka yimid {sender}. Iimayl kasta wuxuu leeyahay xiriiriye lagu joojiyo diiwaangelinta.",
    "privacy": "Siyaasadda arrimaha gaarka ah",
    "loadingInfo": "Waa la soo rarayaa faahfaahinta warsidaha"
  },
  "success": {
    "title": "Eeg sanduuqaaga iimaylka",
    "body": "Waxaan iimayl xaqiijin ah u dirnay {email}. Fur oo dooro Xaqiiji diiwaangelinta.",
    "next": "Cadadkaaga koowaad wuxuu imanayaa markaad xaqiijiso, isagoo ku qoran {language}.",
    "spam": "Haddii aanay waxba imaan dhowr daqiiqo gudahood, eeg galka spam ama Promotions.",
    "changeEmail": "Isticmaal iimayl kale",
    "continueTo": "U sii gudub {host}"
  },
  "errors": {
    "emailRequired": "Geli cinwaankaaga iimaylka.",
    "emailInvalid": "Cinwaankan iimaylku wuxuu u muuqdaa mid aan dhammaystirnayn. Hubi oo isku day mar kale.",
    "missingLink": "Xiriiriyahan diiwaangelinta macluumaad ayaa ka maqan. Ka codso diraha xiriiriye cusub.",
    "notFound": "Xiriiriyahan diiwaangelinta mar dambe ma shaqeeyo. Ka codso diraha xiriiriye cusub.",
    "limit": "Warsidahan hadda ma qaadan karo isdiiwaangeliyeyaal cusub. Isku day mar kale goor dambe.",
    "invalid": "Ma aanaan aqbali karin cinwaankan. Hubi oo isku day mar kale.",
    "server": "Ma aanaan kaydin karin diiwaangelintaada. Isku day mar kale wax yar kadib.",
    "network": "Ma aanaan gaari karin server-ka. Hubi xiriirkaaga oo isku day mar kale."
  },
  "confirm": {
    "title": "Xaqiiji diiwaangelintaada",
    "body": "Dooro badhanka si aad u bilowdo inaad cadadyada ku hesho {email}.",
    "button": "Xaqiiji diiwaangelinta",
    "confirming": "Waa la xaqiijinayaa...",
    "consent": "Markaad xaqiijiso, waxaad ogolaatay inaad warsidahan ku hesho iimayl. Waxaad ka bixi kartaa cadad kasta.",
    "successTitle": "Waad isdiiwaangelisay",
    "successBody": "Cadadyada cusub waxay iman doonaan {email}.",
    "successTip": "Si aanay ugu dhicin spam, ku dar diraha xiriirradaada.",
    "invalidTitle": "Xiriiriyahan ma dhammaystirna",
    "invalidBody": "Mar kale fur iimaylka xaqiijinta oo dooro badhankiisa. Haddii aadan heli karin, mar kale iska diiwaangeli bogga diraha.",
    "notFoundBody": "Ma aanaan helin diiwaangelin cinwaankan ah. Mar kale iska diiwaangeli bogga diraha.",
    "errorBody": "Ma aanaan xaqiijin karin diiwaangelintaada. Isku day mar kale wax yar kadib.",
    "retry": "Isku day mar kale",
    "home": "Tag bogga hore"
  },
  "embed": {
    "title": "Ku dar foom diiwaangelin boggaaga",
    "intro": "Ku dheji mid ka mid ah koodhadhkan websaydhkaaga. Dadka isdiiwaangeliya waxay helayaan iimayl xaqiijin ah, kadibna cadadyadaada oo ku qoran luqaddooda.",
    "linkLabel": "Xiriiriyaha bogga diiwaangelinta",
    "linkHint": "Ku wadaag bio-ga baraha bulshada, saxiixa iimaylka, ama koodh QR.",
    "scriptLabel": "Calaamadda script (lagu talinayo)",
    "scriptHint": "Ku dheji meesha foomku ka muuqanayo. Foomku isagaa cabbirkiisa la qabsada.",
    "iframeLabel": "Iframe",
    "iframeHint": "Isticmaal tan haddii boggaagu uusan oggolayn script-yada.",
    "copy": "Koobiyee",
    "copied": "Waa la koobiyeeyay",
    "copyFailed": "Dooro qoraalka oo gacanta ku koobiyee.",
    "options": "Doorashooyinka foomka",
    "accent": "Midabka badhanka",
    "accentHint": "Sidiisa u dhaaf si loo isticmaalo midabka summaddaada.",
    "theme": "Muuqaal",
    "themeAuto": "Raac dejinta booqdaha",
    "themeLight": "Iftiin",
    "themeDark": "Mugdi",
    "layout": "Qaabka",
    "layoutFull": "Buuxa (cinwaan, magac iyo luqad)",
    "layoutCompact": "Kooban (iimayl iyo badhan)",
    "preview": "Hordhac",
    "previewNote": "Hordhacani si dhab ah ayuu u shaqeeyaa. Diiwaangelinta halkan waxay abuurtaa isdiiwaangeliye dhab ah.",
    "missing": "Marka hore samee warside. Foomka diiwaangelintu halkan ayuu ka muuqan doonaa marka uu jiro."
  },
  "page": {
    "poweredBy": "Waxay ku shaqaysaa AIBAN",
    "title": "Isdiiwaangeli"
  },
  "signature": {
    "title": "Saxiixa iimaylka",
    "intro": "Akhristayaashu waxay tan ku arkaan dhammaadka cadad kasta. Guji qayb kasta oo hordhaca ah si aad u wax ka beddesho.",
    "show": "Ku tus saxiixayga cadad kasta",
    "showHint": "Haddii aad damiso, cadadyadu waxay ku dhammaanayaan maqaalka kadib.",
    "preview": "Hordhac",
    "previewEmpty": "Saxiixaagu waa madhan yahay. Ku dar magacaaga si aad u bilowdo.",
    "articleEnd": "Dhammaadka maqaalka",
    "tabContent": "Nuxurka",
    "tabStyle": "Qaabka",
    "blocks": "Waxa lagu darayo",
    "blocksHint": "Dooro calaamad si aad u muujiso ama u qariso qaybtaas. Qaybaha la qariyay qoraalkooda way haystaan.",
    "layout": "Qaabka",
    "layouts": {
      "bar": "Xariiq midab leh",
      "photo": "Sawir",
      "stacked": "Mid kor saaran kan kale",
      "centered": "Bartamaha",
      "minimal": "Qoraal keliya"
    },
    "fields": {
      "name": "Magac",
      "role": "Jagada shaqada",
      "company": "Shirkad",
      "phone": "Telefoon",
      "email": "Iimayl",
      "website": "Websaydh",
      "address": "Cinwaan",
      "photoUrl": "Sawir",
      "logoUrl": "Astaan",
      "socials": "Xiriiriyeyaasha baraha bulshada",
      "cta": "Badhan",
      "disclaimer": "Xusuusin sharci"
    },
    "groups": {
      "about": "Adiga ku saabsan",
      "contact": "Xiriir",
      "images": "Sawirro",
      "socials": "Xiriiriyeyaasha baraha bulshada",
      "cta": "Badhan",
      "disclaimer": "Xusuusin sharci"
    },
    "placeholders": {
      "name": "Hodan Cali",
      "role": "Aasaasaha",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Main Street, Hargeysa",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Ballan wac",
      "ctaUrl": "https://"
    },
    "ctaText": "Qoraalka badhanka",
    "ctaLink": "Xiriiriyaha badhanka",
    "hints": {
      "photoUrl": "Xiriiriye u socda PNG ama JPG laba jibbaaran, ugu yaraan 144 x 144 pixel oo ka yar 200 KB. Waxa lagu muujiyaa 72 x 72 pixel magacaaga agtiisa.",
      "logoUrl": "Xiriiriye u socda PNG ama JPG leh gadaal hufan ama cad, dhererkiisu ugu yaraan 64 pixel. Waxa lagu muujiyaa dherer 32 pixel ah.",
      "website": "Waxaan ku darnaa https:// haddii aad ka tagto.",
      "cta": "Qoraalka iyo xiriiriyaha labaduba waa loo baahan yahay si badhanku u muuqdo.",
      "disclaimer": "Qoraal yar oo hoose ah, tusaale ahaan xusuusin sirta. Madhan ka tag haddii aadan u baahnayn."
    },
    "style": {
      "accent": "Midabka muuqda",
      "accentHint": "Waxa loo isticmaalaa xariiqda, xiriiriyeyaasha iyo badhanka. Wuxuu ku bilaabmaa midabka summaddaada.",
      "font": "Farta",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Cabbirka qoraalka",
      "sizeMd": "Caadi",
      "sizeSm": "Yar",
      "shape": "Qaabka sawirka",
      "shapeRound": "Wareeg",
      "shapeSquare": "Laba jibbaaran"
    },
    "hidden": "la qariyay",
    "reset": "Dib u bilow",
    "resetConfirm": "Mar kale dooro si aad u tirtirto dhammaan meelaha"
  }
};
