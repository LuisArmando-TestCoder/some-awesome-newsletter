// ga strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale ga
export default {
  "welcome": {
    "title": "Fáilte chuig an nuachtlitir",
    "invitedBy": "Thug {configuratorId} cuireadh duit liostáil."
  },
  "email": {
    "title": "Cá seolfaimid gach eagrán?",
    "placeholder": "Do ríomhphost"
  },
  "name": {
    "title": "Cad is ainm duit?",
    "placeholder": "D'ainm"
  },
  "language": {
    "title": "Cén teanga ar mhaith leat léamh inti?"
  },
  "subscribed": {
    "title": "Tá tú liostáilte",
    "subtitle": "Tá ríomhphost deimhnithe ag fanacht leat i do bhosca isteach.",
    "continueTo": "Lean ar aghaidh go",
    "finishingUp": "Is féidir leat an leathanach seo a dhúnadh."
  },
  "form": {
    "heading": "Liostáil le {title}",
    "headingFallback": "Liostáil leis an nuachtlitir seo",
    "intro": "Tagann eagráin nua trí ríomhphost, scríofa sa teanga a roghnaíonn tú.",
    "from": "Ó {sender}",
    "emailLabel": "Seoladh ríomhphoist",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Céadainm",
    "optional": "roghnach",
    "nameHint": "Úsáidimid é le beannú duit. Má fhágann tú folamh é, úsáidimid tús do sheoladh ríomhphoist.",
    "languageLabel": "Teanga na n-eagrán",
    "languageSummary": "Eagráin i {language}.",
    "languageChange": "Athraigh",
    "languageHint": "Roghnaíomar é seo bunaithe ar shocruithe do bhrabhsálaí.",
    "submit": "Liostáil",
    "submitting": "Ag liostáil...",
    "consent": "Trí liostáil, aontaíonn tú ríomhphoist a fháil ó {sender}. Tá nasc díliostála i ngach ríomhphost.",
    "privacy": "Polasaí príobháideachais",
    "loadingInfo": "Sonraí na nuachtlitreach á lódáil"
  },
  "success": {
    "title": "Seiceáil do bhosca isteach",
    "body": "Sheolamar ríomhphost deimhnithe chuig {email}. Oscail é agus roghnaigh Deimhnigh an síntiús.",
    "next": "Tiocfaidh do chéad eagrán tar éis duit é a dheimhniú, scríofa i {language}.",
    "spam": "Mura dtagann aon rud laistigh de chúpla nóiméad, féach i d'fhillteán turscair nó Cur Chun Cinn.",
    "changeEmail": "Úsáid ríomhphost eile",
    "continueTo": "Lean ar aghaidh chuig {host}"
  },
  "errors": {
    "emailRequired": "Cuir isteach do sheoladh ríomhphoist.",
    "emailInvalid": "Is cosúil go bhfuil an seoladh ríomhphoist seo neamhiomlán. Seiceáil é agus bain triail eile as.",
    "missingLink": "Tá eolas in easnamh ar an nasc liostála seo. Iarr nasc nua ar an seoltóir.",
    "notFound": "Ní oibríonn an nasc liostála seo a thuilleadh. Iarr nasc nua ar an seoltóir.",
    "limit": "Ní féidir leis an nuachtlitir seo liostálaithe nua a ghlacadh faoi láthair. Bain triail eile as ar ball.",
    "invalid": "Níorbh fhéidir linn an seoladh seo a ghlacadh. Seiceáil é agus bain triail eile as.",
    "server": "Níorbh fhéidir linn do shíntiús a shábháil. Bain triail eile as i gceann nóiméid.",
    "network": "Níorbh fhéidir linn teacht ar an bhfreastalaí. Seiceáil do cheangal agus bain triail eile as."
  },
  "confirm": {
    "title": "Deimhnigh do shíntiús",
    "body": "Roghnaigh an cnaipe chun tosú ag fáil eagrán ag {email}.",
    "button": "Deimhnigh an síntiús",
    "confirming": "Á dheimhniú...",
    "consent": "Trí dheimhniú, aontaíonn tú an nuachtlitir seo a fháil trí ríomhphost. Is féidir leat díliostáil ó aon eagrán.",
    "successTitle": "Tá tú liostáilte",
    "successBody": "Tiocfaidh eagráin nua chuig {email}.",
    "successTip": "Cuir an seoltóir le do theagmhálaithe ionas nach rachaidh siad isteach sa turscar.",
    "invalidTitle": "Tá an nasc seo neamhiomlán",
    "invalidBody": "Oscail an ríomhphost deimhnithe arís agus roghnaigh an cnaipe atá ann. Mura bhfuil tú in ann é a aimsiú, liostáil arís ó leathanach an tseoltóra.",
    "notFoundBody": "Níor aimsíomar aon liostáil don seoladh seo. Liostáil arís ó leathanach an tseoltóra.",
    "errorBody": "Níorbh fhéidir linn do shíntiús a dheimhniú. Bain triail eile as i gceann nóiméid.",
    "retry": "Bain triail eile as",
    "home": "Téigh go dtí an leathanach baile"
  },
  "embed": {
    "title": "Cuir foirm liostála le do shuíomh",
    "intro": "Greamaigh ceann de na blúirí cóid seo isteach i do shuíomh gréasáin. Faigheann daoine a liostálann ríomhphost deimhnithe, agus ansin d'eagráin ina dteanga féin.",
    "linkLabel": "Nasc an leathanaigh liostála",
    "linkHint": "Roinn é i mbeathaisnéis ar na meáin shóisialta, i síniú ríomhphoist nó i gcód QR.",
    "scriptLabel": "Clib script (molta)",
    "scriptHint": "Greamaigh é san áit ar cheart don fhoirm a bheith. Athraíonn an fhoirm a méid féin chun luí isteach.",
    "iframeLabel": "Iframe",
    "iframeHint": "Úsáid é seo mura gceadaíonn do shuíomh scripteanna.",
    "copy": "Cóipeáil",
    "copied": "Cóipeáilte",
    "copyFailed": "Roghnaigh an téacs agus cóipeáil de láimh é.",
    "options": "Roghanna na foirme",
    "accent": "Dath an chnaipe",
    "accentHint": "Fág mar atá é chun dath do bhranda a úsáid.",
    "theme": "Téama",
    "themeAuto": "De réir shocrú an chuairteora",
    "themeLight": "Geal",
    "themeDark": "Dorcha",
    "layout": "Leagan amach",
    "layoutFull": "Iomlán (teideal, ainm agus teanga)",
    "layoutCompact": "Dlúth (ríomhphost agus cnaipe)",
    "preview": "Réamhamharc",
    "previewNote": "Tá an réamhamharc beo. Cruthaíonn liostáil anseo liostálaí fíor.",
    "missing": "Cruthaigh nuachtlitir ar dtús. Taispeánfar an fhoirm liostála anseo nuair a bheidh sí ann."
  },
  "page": {
    "poweredBy": "Á rith ar AIBAN",
    "title": "Liostáil"
  },
  "signature": {
    "title": "Síniú ríomhphoist",
    "intro": "Feiceann léitheoirí é seo ag deireadh gach eagráin. Cliceáil ar aon chuid den réamhamharc chun é a chur in eagar.",
    "show": "Taispeáin mo shíniú i ngach eagrán",
    "showHint": "Má mhúchann tú é, críochnaíonn eagráin tar éis an ailt.",
    "preview": "Réamhamharc",
    "previewEmpty": "Tá do shíniú folamh. Cuir d'ainm leis chun tosú.",
    "articleEnd": "Deireadh an ailt",
    "tabContent": "Ábhar",
    "tabStyle": "Stíl",
    "blocks": "Cad atá le cur san áireamh",
    "blocksHint": "Roghnaigh clib chun an chuid sin a thaispeáint nó a fholú. Coinníonn codanna folaithe a dtéacs.",
    "layout": "Leagan amach",
    "layouts": {
      "bar": "Barra daite",
      "photo": "Grianghraf",
      "stacked": "Ceann faoi cheann",
      "centered": "Láraithe",
      "minimal": "Téacs amháin"
    },
    "fields": {
      "name": "Ainm",
      "role": "Teideal poist",
      "company": "Comhlacht",
      "phone": "Fón",
      "email": "Ríomhphost",
      "website": "Suíomh gréasáin",
      "address": "Seoladh",
      "photoUrl": "Grianghraf",
      "logoUrl": "Lógó",
      "socials": "Naisc shóisialta",
      "cta": "Cnaipe",
      "disclaimer": "Nóta dlíthiúil"
    },
    "groups": {
      "about": "Fút féin",
      "contact": "Teagmháil",
      "images": "Íomhánna",
      "socials": "Naisc shóisialta",
      "cta": "Cnaipe",
      "disclaimer": "Nóta dlíthiúil"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Bunaitheoir",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 an tSráid Mhór, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Cuir glao in áirithe",
      "ctaUrl": "https://"
    },
    "ctaText": "Téacs an chnaipe",
    "ctaLink": "Nasc an chnaipe",
    "hints": {
      "photoUrl": "Nasc chuig íomhá chearnach PNG nó JPG, 144 faoi 144 picteilín ar a laghad agus faoi bhun 200 KB. Taispeántar í ag 72 faoi 72 picteilín in aice le d'ainm.",
      "logoUrl": "Nasc chuig íomhá PNG nó JPG le cúlra trédhearcach nó bán, 64 picteilín ar airde ar a laghad. Taispeántar í 32 picteilín ar airde.",
      "website": "Cuirfimid https:// leis má fhágann tú ar lár é.",
      "cta": "Ní thaispeántar an cnaipe ach amháin nuair atá an téacs agus an nasc araon ann.",
      "disclaimer": "Cló beag ag an mbun, mar shampla nóta rúndachta. Fág folamh é mura bhfuil sé uait."
    },
    "style": {
      "accent": "Dath aibhsithe",
      "accentHint": "Úsáidtear é don bharra, do na naisc agus don chnaipe. Tosaíonn sé le dath do bhranda.",
      "font": "Cló",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Méid an téacs",
      "sizeMd": "Gnáth",
      "sizeSm": "Beag",
      "shape": "Cruth an ghrianghraif",
      "shapeRound": "Cruinn",
      "shapeSquare": "Cearnach"
    },
    "hidden": "folaithe",
    "reset": "Tosaigh as an nua",
    "resetConfirm": "Roghnaigh arís chun gach réimse a ghlanadh"
  }
};
