// tk strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale tk
export default {
  "welcome": {
    "title": "Habarnama hoş geldiňiz",
    "invitedBy": "{configuratorId} sizi abuna bolmaga çagyrdy."
  },
  "email": {
    "title": "Her sany nirä iberelli?",
    "placeholder": "Email"
  },
  "name": {
    "title": "Adyňyz näme?",
    "placeholder": "Adyňyz"
  },
  "language": {
    "title": "Haýsy dilde okamak isleýärsiňiz?"
  },
  "subscribed": {
    "title": "Siz abuna boldyňyz",
    "subtitle": "Tassyklama haty üçin gelen hatlar gutyňyzy barlaň.",
    "continueTo": "Dowam et",
    "finishingUp": "Bu sahypany ýapyp bilersiňiz."
  },
  "form": {
    "heading": "{title} habarnamasyna abuna boluň",
    "headingFallback": "Bu habarnama abuna boluň",
    "intro": "Täze sanlar siziň saýlan diliňizde ýazylyp, e-poçta arkaly gelýär.",
    "from": "Iberiji: {sender}",
    "emailLabel": "E-poçta salgysy",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Ady",
    "optional": "hökmany däl",
    "nameHint": "Muny size salam bermek üçin ulanýarys. Boş goýsaňyz, e-poçta salgyňyzyň başyny ulanýarys.",
    "languageLabel": "Sanlaryň dili",
    "languageSummary": "Sanlar {language} dilinde.",
    "languageChange": "Üýtget",
    "languageHint": "Muny brauzeriňiziň sazlamalaryndan saýladyk.",
    "submit": "Abuna bol",
    "submitting": "Abuna bolunýar...",
    "consent": "Abuna bolup, {sender} tarapyndan hat almaga razylyk berýärsiňiz. Her hatda abunalykdan çykmak üçin baglanyşyk bar.",
    "privacy": "Gizlinlik syýasaty",
    "loadingInfo": "Habarnamanyň maglumatlary ýüklenýär"
  },
  "success": {
    "title": "Gelen hatlar gutyňyzy barlaň",
    "body": "{email} salgysyna tassyklama hatyny iberdik. Ony açyň we \"Abunalygy tassykla\" düwmesini saýlaň.",
    "next": "Tassyklanyňyzdan soň ilkinji sanyňyz {language} dilinde geler.",
    "spam": "Birnäçe minutda hiç zat gelmese, spam ýa-da Mahabat bukjasyna serediň.",
    "changeEmail": "Başga e-poçta ulan",
    "continueTo": "{host} saýtyna geç"
  },
  "errors": {
    "emailRequired": "E-poçta salgyňyzy giriziň.",
    "emailInvalid": "Bu e-poçta salgysy doly däl ýaly. Barlap, gaýtadan synanyşyň.",
    "missingLink": "Bu hasaba alyş baglanyşygynda maglumat ýetmeýär. Iberijiden täze baglanyşyk soraň.",
    "notFound": "Bu hasaba alyş baglanyşygy indi işlemeýär. Iberijiden täze baglanyşyk soraň.",
    "limit": "Bu habarnama häzir täze abunaçy kabul edip bilmeýär. Soňrak gaýtadan synanyşyň.",
    "invalid": "Bu salgyny kabul edip bilmedik. Barlap, gaýtadan synanyşyň.",
    "server": "Abunalygyňyzy ýatda saklap bilmedik. Biraz soňra gaýtadan synanyşyň.",
    "network": "Serwere birigip bilmedik. Baglanyşygyňyzy barlap, gaýtadan synanyşyň."
  },
  "confirm": {
    "title": "Abunalygyňyzy tassyklaň",
    "body": "{email} salgysyna sanlary alyp başlamak üçin düwmäni saýlaň.",
    "button": "Abunalygy tassykla",
    "confirming": "Tassyklanýar...",
    "consent": "Tassyklap, bu habarnamany e-poçta arkaly almaga razylyk berýärsiňiz. Islendik sandan abunalykdan çykyp bilersiňiz.",
    "successTitle": "Siz abuna boldyňyz",
    "successBody": "Täze sanlar {email} salgysyna geler.",
    "successTip": "Spama düşmezligi üçin iberijini kontaktlaryňyza goşuň.",
    "invalidTitle": "Bu baglanyşyk doly däl",
    "invalidBody": "Tassyklama hatyny täzeden açyň we içindäki düwmäni saýlaň. Tapyp bilmeseňiz, iberijiniň sahypasyndan täzeden hasaba duruň.",
    "notFoundBody": "Bu salgy üçin hasaba alyş tapylmady. Iberijiniň sahypasyndan täzeden hasaba duruň.",
    "errorBody": "Abunalygyňyzy tassyklap bilmedik. Biraz soňra gaýtadan synanyşyň.",
    "retry": "Gaýtadan synanyş",
    "home": "Baş sahypa geç"
  },
  "embed": {
    "title": "Saýtyňyza hasaba alyş formasyny goşuň",
    "intro": "Bu kodlaryň birini saýtyňyza goýuň. Hasaba duranlar tassyklama hatyny, soňra bolsa siziň sanlaryňyzy öz dillerinde alýarlar.",
    "linkLabel": "Hasaba alyş sahypasynyň baglanyşygy",
    "linkHint": "Ony sosial ulgamdaky profilde, e-poçta golunda ýa-da QR kodda paýlaşyň.",
    "scriptLabel": "Script tegi (maslahat berilýär)",
    "scriptHint": "Formanyň görünmeli ýerine goýuň. Formanyň ölçegi özi laýyklaşýar.",
    "iframeLabel": "Iframe",
    "iframeHint": "Saýtyňyz skriptlere rugsat bermeýän bolsa, muny ulanyň.",
    "copy": "Göçür",
    "copied": "Göçürildi",
    "copyFailed": "Teksti saýlap, el bilen göçüriň.",
    "options": "Formanyň sazlamalary",
    "accent": "Düwmäniň reňki",
    "accentHint": "Brend reňkiňizi ulanmak üçin üýtgetmäň.",
    "theme": "Tema",
    "themeAuto": "Myhmanyň sazlamasyna görä",
    "themeLight": "Açyk",
    "themeDark": "Garaňky",
    "layout": "Ýerleşiş",
    "layoutFull": "Doly (sözbaşy, ady we dil)",
    "layoutCompact": "Ykjam (e-poçta we düwme)",
    "preview": "Öňünden görmek",
    "previewNote": "Öňünden görmek hakykatdan işleýär. Bu ýerde hasaba durmak hakyky abunaçy döredýär.",
    "missing": "Ilki bilen habarnama dörediň. Döredilenden soň hasaba alyş formasy şu ýerde görüner."
  },
  "page": {
    "poweredBy": "AIBAN esasynda işleýär",
    "title": "Abuna bol"
  },
  "signature": {
    "title": "E-poçta goly",
    "intro": "Okyjylar muny her sanyň ahyrynda görýärler. Üýtgetmek üçin öňünden görmegiň islendik bölegine basyň.",
    "show": "Golumy her sanda görkez",
    "showHint": "Öçürseňiz, sanlar makaladan soň gutarýar.",
    "preview": "Öňünden görmek",
    "previewEmpty": "Goluňyz boş. Başlamak üçin adyňyzy goşuň.",
    "articleEnd": "Makalanyň ahyry",
    "tabContent": "Mazmun",
    "tabStyle": "Stil",
    "blocks": "Nämeler goşulsyn",
    "blocksHint": "Şol bölegi görkezmek ýa-da gizlemek üçin tegi saýlaň. Gizlenen bölekleriň teksti saklanýar.",
    "layout": "Ýerleşiş",
    "layouts": {
      "bar": "Reňkli zolak",
      "photo": "Surat",
      "stacked": "Biri-biriniň aşagynda",
      "centered": "Ortada",
      "minimal": "Diňe tekst"
    },
    "fields": {
      "name": "Ady",
      "role": "Wezipesi",
      "company": "Kompaniýa",
      "phone": "Telefon",
      "email": "E-poçta",
      "website": "Web saýt",
      "address": "Salgy",
      "photoUrl": "Surat",
      "logoUrl": "Logotip",
      "socials": "Sosial ulgam baglanyşyklary",
      "cta": "Düwme",
      "disclaimer": "Hukuk belligi"
    },
    "groups": {
      "about": "Siz barada",
      "contact": "Habarlaşmak",
      "images": "Suratlar",
      "socials": "Sosial ulgam baglanyşyklary",
      "cta": "Düwme",
      "disclaimer": "Hukuk belligi"
    },
    "placeholders": {
      "name": "Aýna Annaýewa",
      "role": "Esaslandyryjy",
      "company": "Derýa kenary studiýasy",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Magtymguly şaýoly 120, Aşgabat",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Jaňa ýazyl",
      "ctaUrl": "https://"
    },
    "ctaText": "Düwmäniň teksti",
    "ctaLink": "Düwmäniň baglanyşygy",
    "hints": {
      "photoUrl": "Inedördül PNG ýa-da JPG baglanyşygy, iň az 144x144 piksel we 200 KB-dan kiçi. Adyňyzyň ýanynda 72x72 piksel ölçegde görkezilýär.",
      "logoUrl": "Aýna ýa-da ak fonly PNG ýa-da JPG baglanyşygy, beýikligi iň az 64 piksel. 32 piksel beýiklikde görkezilýär.",
      "website": "https:// ýazmasaňyz, özümiz goşýarys.",
      "cta": "Düwmäniň görünmegi üçin tekst hem, baglanyşyk hem gerek.",
      "disclaimer": "Aşakdaky ownuk tekst, meselem, gizlinlik barada bellik. Gerek bolmasa, boş goýuň."
    },
    "style": {
      "accent": "Esasy reňk",
      "accentHint": "Zolak, baglanyşyklar we düwme üçin ulanylýar. Başda brend reňkiňiz durýar.",
      "font": "Şrift",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Tekstiň ölçegi",
      "sizeMd": "Adaty",
      "sizeSm": "Kiçi",
      "shape": "Suratyň görnüşi",
      "shapeRound": "Tegelek",
      "shapeSquare": "Inedördül"
    },
    "hidden": "gizlin",
    "reset": "Başdan başla",
    "resetConfirm": "Ähli meýdanlary arassalamak üçin ýene saýlaň"
  }
};
