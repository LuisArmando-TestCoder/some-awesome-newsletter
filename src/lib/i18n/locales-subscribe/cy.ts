// cy strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale cy
export default {
  "welcome": {
    "title": "Croeso i'r cylchlythyr",
    "invitedBy": "Mae {configuratorId} wedi eich gwahodd i danysgrifio."
  },
  "email": {
    "title": "I ble dylen ni anfon pob rhifyn?",
    "placeholder": "Eich e-bost"
  },
  "name": {
    "title": "Beth yw eich enw?",
    "placeholder": "Eich enw"
  },
  "language": {
    "title": "Ym mha iaith rydych chi eisiau darllen?"
  },
  "subscribed": {
    "title": "Rydych wedi tanysgrifio",
    "subtitle": "Mae e-bost cadarnhau yn aros amdanoch yn eich mewnflwch.",
    "continueTo": "Parhau i",
    "finishingUp": "Gallwch gau'r dudalen hon."
  },
  "form": {
    "heading": "Tanysgrifio i {title}",
    "headingFallback": "Tanysgrifio i'r cylchlythyr hwn",
    "intro": "Mae rhifynnau newydd yn cyrraedd drwy e-bost, wedi'u hysgrifennu yn yr iaith a ddewiswch.",
    "from": "Gan {sender}",
    "emailLabel": "Cyfeiriad e-bost",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Enw cyntaf",
    "optional": "dewisol",
    "nameHint": "Rydyn ni'n ei ddefnyddio i'ch cyfarch. Os byddwch yn ei adael yn wag, byddwn yn defnyddio dechrau eich cyfeiriad e-bost.",
    "languageLabel": "Iaith eich rhifynnau",
    "languageSummary": "Rhifynnau yn {language}.",
    "languageChange": "Newid",
    "languageHint": "Fe wnaethon ni ddewis hon yn ôl gosodiadau eich porwr.",
    "submit": "Tanysgrifio",
    "submitting": "Yn tanysgrifio...",
    "consent": "Drwy danysgrifio, rydych yn cytuno i gael e-byst gan {sender}. Mae dolen dad-danysgrifio ym mhob e-bost.",
    "privacy": "Polisi preifatrwydd",
    "loadingInfo": "Wrthi'n llwytho manylion y cylchlythyr"
  },
  "success": {
    "title": "Edrychwch yn eich mewnflwch",
    "body": "Rydyn ni wedi anfon e-bost cadarnhau at {email}. Agorwch ef a dewiswch Cadarnhau tanysgrifiad.",
    "next": "Bydd eich rhifyn cyntaf yn cyrraedd ar ôl i chi gadarnhau, wedi'i ysgrifennu yn {language}.",
    "spam": "Os nad oes dim yn cyrraedd o fewn ychydig funudau, edrychwch yn eich ffolder sbam neu Hyrwyddiadau.",
    "changeEmail": "Defnyddio e-bost gwahanol",
    "continueTo": "Parhau i {host}"
  },
  "errors": {
    "emailRequired": "Rhowch eich cyfeiriad e-bost.",
    "emailInvalid": "Mae'n ymddangos bod y cyfeiriad e-bost hwn yn anghyflawn. Gwiriwch ef a rhowch gynnig arall arni.",
    "missingLink": "Mae gwybodaeth ar goll o'r ddolen gofrestru hon. Gofynnwch i'r anfonwr am ddolen newydd.",
    "notFound": "Nid yw'r ddolen gofrestru hon yn gweithio mwyach. Gofynnwch i'r anfonwr am ddolen newydd.",
    "limit": "Ni all y cylchlythyr hwn dderbyn tanysgrifwyr newydd ar hyn o bryd. Rhowch gynnig arall arni nes ymlaen.",
    "invalid": "Doedden ni ddim yn gallu derbyn y cyfeiriad hwn. Gwiriwch ef a rhowch gynnig arall arni.",
    "server": "Doedden ni ddim yn gallu cadw eich tanysgrifiad. Rhowch gynnig arall arni mewn munud.",
    "network": "Doedden ni ddim yn gallu cyrraedd y gweinydd. Gwiriwch eich cysylltiad a rhowch gynnig arall arni."
  },
  "confirm": {
    "title": "Cadarnhewch eich tanysgrifiad",
    "body": "Dewiswch y botwm i ddechrau cael rhifynnau yn {email}.",
    "button": "Cadarnhau tanysgrifiad",
    "confirming": "Yn cadarnhau...",
    "consent": "Drwy gadarnhau, rydych yn cytuno i gael y cylchlythyr hwn drwy e-bost. Gallwch ddad-danysgrifio o unrhyw rifyn.",
    "successTitle": "Rydych wedi tanysgrifio",
    "successBody": "Bydd rhifynnau newydd yn cyrraedd {email}.",
    "successTip": "Ychwanegwch yr anfonwr at eich cysylltiadau fel nad ydyn nhw'n mynd i sbam.",
    "invalidTitle": "Mae'r ddolen hon yn anghyflawn",
    "invalidBody": "Agorwch yr e-bost cadarnhau eto a dewiswch y botwm ynddo. Os na allwch ddod o hyd iddo, cofrestrwch eto o dudalen yr anfonwr.",
    "notFoundBody": "Doedden ni ddim yn gallu dod o hyd i gofrestriad ar gyfer y cyfeiriad hwn. Cofrestrwch eto o dudalen yr anfonwr.",
    "errorBody": "Doedden ni ddim yn gallu cadarnhau eich tanysgrifiad. Rhowch gynnig arall arni mewn munud.",
    "retry": "Rhoi cynnig arall arni",
    "home": "Mynd i'r hafan"
  },
  "embed": {
    "title": "Ychwanegu ffurflen gofrestru at eich gwefan",
    "intro": "Gludwch un o'r pytiau cod hyn i'ch gwefan. Mae pobl sy'n cofrestru yn cael e-bost cadarnhau, ac yna eich rhifynnau yn eu hiaith eu hunain.",
    "linkLabel": "Dolen y dudalen gofrestru",
    "linkHint": "Rhannwch hi mewn bywgraffiad ar y cyfryngau cymdeithasol, llofnod e-bost neu god QR.",
    "scriptLabel": "Tag script (argymhellir)",
    "scriptHint": "Gludwch ef lle dylai'r ffurflen ymddangos. Mae'r ffurflen yn newid ei maint ei hun i ffitio.",
    "iframeLabel": "Iframe",
    "iframeHint": "Defnyddiwch hwn os nad yw eich gwefan yn caniatáu sgriptiau.",
    "copy": "Copïo",
    "copied": "Wedi'i gopïo",
    "copyFailed": "Dewiswch y testun a'i gopïo â llaw.",
    "options": "Dewisiadau'r ffurflen",
    "accent": "Lliw'r botwm",
    "accentHint": "Gadewch fel y mae i ddefnyddio lliw eich brand.",
    "theme": "Thema",
    "themeAuto": "Dilyn gosodiad yr ymwelydd",
    "themeLight": "Golau",
    "themeDark": "Tywyll",
    "layout": "Cynllun",
    "layoutFull": "Llawn (teitl, enw ac iaith)",
    "layoutCompact": "Cryno (e-bost a botwm)",
    "preview": "Rhagolwg",
    "previewNote": "Mae'r rhagolwg yn fyw. Mae cofrestru yma yn creu tanysgrifiwr go iawn.",
    "missing": "Crëwch gylchlythyr yn gyntaf. Bydd y ffurflen gofrestru yn ymddangos yma pan fydd yn bodoli."
  },
  "page": {
    "poweredBy": "Yn rhedeg ar AIBAN",
    "title": "Tanysgrifio"
  },
  "signature": {
    "title": "Llofnod e-bost",
    "intro": "Mae darllenwyr yn gweld hwn ar ddiwedd pob rhifyn. Cliciwch unrhyw ran o'r rhagolwg i'w golygu.",
    "show": "Dangos fy llofnod ym mhob rhifyn",
    "showHint": "Os byddwch yn ei ddiffodd, bydd rhifynnau'n gorffen ar ôl yr erthygl.",
    "preview": "Rhagolwg",
    "previewEmpty": "Mae eich llofnod yn wag. Ychwanegwch eich enw i ddechrau.",
    "articleEnd": "Diwedd yr erthygl",
    "tabContent": "Cynnwys",
    "tabStyle": "Arddull",
    "blocks": "Beth i'w gynnwys",
    "blocksHint": "Dewiswch dag i ddangos neu guddio'r rhan honno. Mae rhannau cudd yn cadw eu testun.",
    "layout": "Cynllun",
    "layouts": {
      "bar": "Bar lliw",
      "photo": "Llun",
      "stacked": "Wedi'u pentyrru",
      "centered": "Yn y canol",
      "minimal": "Testun yn unig"
    },
    "fields": {
      "name": "Enw",
      "role": "Teitl swydd",
      "company": "Cwmni",
      "phone": "Ffôn",
      "email": "E-bost",
      "website": "Gwefan",
      "address": "Cyfeiriad",
      "photoUrl": "Llun",
      "logoUrl": "Logo",
      "socials": "Dolenni cymdeithasol",
      "cta": "Botwm",
      "disclaimer": "Nodyn cyfreithiol"
    },
    "groups": {
      "about": "Amdanoch chi",
      "contact": "Cyswllt",
      "images": "Delweddau",
      "socials": "Dolenni cymdeithasol",
      "cta": "Botwm",
      "disclaimer": "Nodyn cyfreithiol"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Sylfaenydd",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Stryd Fawr, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Trefnu galwad",
      "ctaUrl": "https://"
    },
    "ctaText": "Testun y botwm",
    "ctaLink": "Dolen y botwm",
    "hints": {
      "photoUrl": "Dolen i ddelwedd PNG neu JPG sgwâr, o leiaf 144 wrth 144 picsel ac yn llai na 200 KB. Caiff ei dangos ar 72 wrth 72 picsel wrth ymyl eich enw.",
      "logoUrl": "Dolen i ddelwedd PNG neu JPG gyda chefndir tryloyw neu wyn, o leiaf 64 picsel o uchder. Caiff ei dangos 32 picsel o uchder.",
      "website": "Byddwn yn ychwanegu https:// os byddwch yn ei adael allan.",
      "cta": "Dim ond pan fydd y testun a'r ddolen wedi'u llenwi y bydd y botwm yn ymddangos.",
      "disclaimer": "Print mân ar y gwaelod, er enghraifft nodyn cyfrinachedd. Gadewch yn wag os nad oes angen un arnoch."
    },
    "style": {
      "accent": "Lliw acen",
      "accentHint": "Caiff ei ddefnyddio ar gyfer y bar, y dolenni a'r botwm. Mae'n dechrau gyda lliw eich brand.",
      "font": "Ffont",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Maint y testun",
      "sizeMd": "Arferol",
      "sizeSm": "Bach",
      "shape": "Siâp y llun",
      "shapeRound": "Crwn",
      "shapeSquare": "Sgwâr"
    },
    "hidden": "cudd",
    "reset": "Dechrau eto",
    "resetConfirm": "Dewiswch eto i glirio pob maes"
  }
};
