// yo strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale yo
export default {
  "welcome": {
    "title": "Ẹ kú àbọ̀ sí ìwé ìròyìn yìí",
    "invitedBy": "{configuratorId} pè yín láti forúkọsílẹ̀."
  },
  "email": {
    "title": "Ibo ni ká máa fi ẹ̀dà kọ̀ọ̀kan ránṣẹ́ sí?",
    "placeholder": "Imeeli rẹ"
  },
  "name": {
    "title": "Kí ni orúkọ yín?",
    "placeholder": "Orukọ rẹ"
  },
  "language": {
    "title": "Èdè wo ni ẹ fẹ́ máa kà á?"
  },
  "subscribed": {
    "title": "Ẹ ti forúkọsílẹ̀",
    "subtitle": "Ẹ wo àpótí ìwé yín fún ímeèlì ìjẹ́rìísí.",
    "continueTo": "Tẹsiwaju si",
    "finishingUp": "Ẹ lè pa ojú-ìwé yìí dé."
  },
  "form": {
    "heading": "Forúkọsílẹ̀ fún {title}",
    "headingFallback": "Forúkọsílẹ̀ fún ìwé ìròyìn yìí",
    "intro": "Àwọn ẹ̀dà tuntun máa dé nípasẹ̀ ímeèlì, ní èdè tí ẹ yàn.",
    "from": "Láti ọ̀dọ̀ {sender}",
    "emailLabel": "Àdírẹ́sì ímeèlì",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Orúkọ àkọ́kọ́",
    "optional": "kò pọn dandan",
    "nameHint": "A máa ń lò ó láti kí yín. Tí ẹ bá fi sílẹ̀ ní òfo, a máa lo ìbẹ̀rẹ̀ àdírẹ́sì ímeèlì yín.",
    "languageLabel": "Èdè fún àwọn ẹ̀dà yín",
    "languageSummary": "Àwọn ẹ̀dà ní {language}.",
    "languageChange": "Yí padà",
    "languageHint": "A yan èyí láti inú ètò aṣàwákiri yín.",
    "submit": "Forúkọsílẹ̀",
    "submitting": "Ń forúkọsílẹ̀...",
    "consent": "Nípa fíforúkọsílẹ̀, ẹ gbà láti máa gba ímeèlì láti ọ̀dọ̀ {sender}. Gbogbo ímeèlì ló ní ìjápọ̀ láti dá ìforúkọsílẹ̀ dúró.",
    "privacy": "Ìlànà àṣírí",
    "loadingInfo": "Ń ṣí àlàyé ìwé ìròyìn"
  },
  "success": {
    "title": "Ẹ wo àpótí ìwé yín",
    "body": "A ti fi ímeèlì ìjẹ́rìísí ránṣẹ́ sí {email}. Ẹ ṣí i, kí ẹ sì yan \"Jẹ́rìísí ìforúkọsílẹ̀\".",
    "next": "Ẹ̀dà àkọ́kọ́ yín máa dé lẹ́yìn tí ẹ bá jẹ́rìísí, ní {language}.",
    "spam": "Tí nǹkan kan kò bá dé láàárín ìṣẹ́jú díẹ̀, ẹ wo fódà spam tàbí Promotions.",
    "changeEmail": "Lo ímeèlì mìíràn",
    "continueTo": "Tẹ̀síwájú sí {host}"
  },
  "errors": {
    "emailRequired": "Ẹ tẹ àdírẹ́sì ímeèlì yín.",
    "emailInvalid": "Àdírẹ́sì ímeèlì yìí dà bí ẹni pé kò pé. Ẹ ṣàyẹ̀wò rẹ̀ kí ẹ sì gbìyànjú lẹ́ẹ̀kan sí i.",
    "missingLink": "Ìjápọ̀ ìforúkọsílẹ̀ yìí kò ní àlàyé tó péye. Ẹ béèrè ìjápọ̀ tuntun lọ́wọ́ ẹni tó fi ránṣẹ́.",
    "notFound": "Ìjápọ̀ ìforúkọsílẹ̀ yìí kò ṣiṣẹ́ mọ́. Ẹ béèrè ìjápọ̀ tuntun lọ́wọ́ ẹni tó fi ránṣẹ́.",
    "limit": "Ìwé ìròyìn yìí kò lè gba olùforúkọsílẹ̀ tuntun báyìí. Ẹ gbìyànjú lẹ́ẹ̀kan sí i nígbà míì.",
    "invalid": "A kò lè gba àdírẹ́sì yìí. Ẹ ṣàyẹ̀wò rẹ̀ kí ẹ sì gbìyànjú lẹ́ẹ̀kan sí i.",
    "server": "A kò lè fi ìforúkọsílẹ̀ yín pamọ́. Ẹ gbìyànjú lẹ́ẹ̀kan sí i láìpẹ́.",
    "network": "A kò lè dé ọ̀dọ̀ sáfà. Ẹ ṣàyẹ̀wò ìsopọ̀ yín kí ẹ sì gbìyànjú lẹ́ẹ̀kan sí i."
  },
  "confirm": {
    "title": "Ẹ jẹ́rìísí ìforúkọsílẹ̀ yín",
    "body": "Ẹ yan bọ́tìnnì náà láti bẹ̀rẹ̀ sí í gba àwọn ẹ̀dà ní {email}.",
    "button": "Jẹ́rìísí ìforúkọsílẹ̀",
    "confirming": "Ń jẹ́rìísí...",
    "consent": "Nípa jíjẹ́rìísí, ẹ gbà láti máa gba ìwé ìròyìn yìí nípasẹ̀ ímeèlì. Ẹ lè dá ìforúkọsílẹ̀ dúró láti inú ẹ̀dà èyíkéyìí.",
    "successTitle": "Ẹ ti forúkọsílẹ̀",
    "successBody": "Àwọn ẹ̀dà tuntun máa dé sí {email}.",
    "successTip": "Kí wọ́n má baà bọ́ sínú spam, ẹ fi ẹni tó ń fi ránṣẹ́ kún àwọn olùbásọ̀rọ̀ yín.",
    "invalidTitle": "Ìjápọ̀ yìí kò pé",
    "invalidBody": "Ẹ tún ṣí ímeèlì ìjẹ́rìísí náà, kí ẹ sì yan bọ́tìnnì rẹ̀. Tí ẹ kò bá rí i, ẹ forúkọsílẹ̀ lẹ́ẹ̀kan sí i láti ojú-ìwé ẹni tó fi ránṣẹ́.",
    "notFoundBody": "A kò rí ìforúkọsílẹ̀ kankan fún àdírẹ́sì yìí. Ẹ forúkọsílẹ̀ lẹ́ẹ̀kan sí i láti ojú-ìwé ẹni tó fi ránṣẹ́.",
    "errorBody": "A kò lè jẹ́rìísí ìforúkọsílẹ̀ yín. Ẹ gbìyànjú lẹ́ẹ̀kan sí i láìpẹ́.",
    "retry": "Gbìyànjú lẹ́ẹ̀kan sí i",
    "home": "Lọ sí ojú-ìwé àkọ́kọ́"
  },
  "embed": {
    "title": "Fi fọ́ọ̀mù ìforúkọsílẹ̀ kún ojú-òpó yín",
    "intro": "Ẹ lẹ ọ̀kan nínú àwọn kóòdù wọ̀nyí sí ojú-òpó wẹ́ẹ̀bù yín. Àwọn tó bá forúkọsílẹ̀ máa gba ímeèlì ìjẹ́rìísí, lẹ́yìn náà àwọn ẹ̀dà yín ní èdè tiwọn.",
    "linkLabel": "Ìjápọ̀ ojú-ìwé ìforúkọsílẹ̀",
    "linkHint": "Ẹ pín in sí bio ìkànnì àjọlò, ìbuwọ́lù ímeèlì, tàbí kóòdù QR.",
    "scriptLabel": "Àmì script (a dámọ̀ràn rẹ̀)",
    "scriptHint": "Ẹ lẹ ẹ́ síbi tí fọ́ọ̀mù náà yẹ kó hàn. Fọ́ọ̀mù náà máa ń ṣàtúnṣe ìwọ̀n ara rẹ̀.",
    "iframeLabel": "Iframe",
    "iframeHint": "Ẹ lo èyí tí ojú-òpó yín kò bá gba script láàyè.",
    "copy": "Ṣẹ̀dà",
    "copied": "A ti ṣẹ̀dà",
    "copyFailed": "Ẹ yan ọ̀rọ̀ náà kí ẹ sì ṣẹ̀dà rẹ̀ fúnra yín.",
    "options": "Àwọn àṣàyàn fọ́ọ̀mù",
    "accent": "Àwọ̀ bọ́tìnnì",
    "accentHint": "Ẹ fi sílẹ̀ bó ṣe wà láti lo àwọ̀ brand yín.",
    "theme": "Àwòṣe",
    "themeAuto": "Bá ètò àlejò mu",
    "themeLight": "Ìmọ́lẹ̀",
    "themeDark": "Òkùnkùn",
    "layout": "Ìtòlẹ́sẹẹsẹ",
    "layoutFull": "Kíkún (àkọlé, orúkọ àti èdè)",
    "layoutCompact": "Kékeré (ímeèlì àti bọ́tìnnì)",
    "preview": "Àyẹ̀wò",
    "previewNote": "Àyẹ̀wò yìí ń ṣiṣẹ́ gidi. Ìforúkọsílẹ̀ níbí máa ṣẹ̀dá olùforúkọsílẹ̀ gidi.",
    "missing": "Ẹ kọ́kọ́ ṣẹ̀dá ìwé ìròyìn kan. Fọ́ọ̀mù ìforúkọsílẹ̀ máa hàn níbí nígbà tó bá wà."
  },
  "page": {
    "poweredBy": "Ń ṣiṣẹ́ lórí AIBAN",
    "title": "Forúkọsílẹ̀"
  },
  "signature": {
    "title": "Ìbuwọ́lù ímeèlì",
    "intro": "Àwọn òǹkàwé máa ń rí èyí ní òpin ẹ̀dà kọ̀ọ̀kan. Ẹ tẹ apá èyíkéyìí nínú àyẹ̀wò láti ṣàtúnṣe rẹ̀.",
    "show": "Fi ìbuwọ́lù mi hàn nínú gbogbo ẹ̀dà",
    "showHint": "Tí ẹ bá pa á, àwọn ẹ̀dà máa parí lẹ́yìn àpilẹ̀kọ náà.",
    "preview": "Àyẹ̀wò",
    "previewEmpty": "Ìbuwọ́lù yín ṣófo. Ẹ fi orúkọ yín kún un láti bẹ̀rẹ̀.",
    "articleEnd": "Òpin àpilẹ̀kọ",
    "tabContent": "Àkóónú",
    "tabStyle": "Ìrísí",
    "blocks": "Ohun tí a máa fi kún un",
    "blocksHint": "Ẹ yan àmì kan láti fi apá yẹn hàn tàbí láti fi pamọ́. Àwọn apá tí a fi pamọ́ ṣì ní ọ̀rọ̀ wọn.",
    "layout": "Ìtòlẹ́sẹẹsẹ",
    "layouts": {
      "bar": "Ọ̀pá àwọ̀",
      "photo": "Fọ́tò",
      "stacked": "Lórí ara wọn",
      "centered": "Ní àárín",
      "minimal": "Ọ̀rọ̀ nìkan"
    },
    "fields": {
      "name": "Orúkọ",
      "role": "Ipò iṣẹ́",
      "company": "Ilé-iṣẹ́",
      "phone": "Fóònù",
      "email": "Ímeèlì",
      "website": "Ojú-òpó wẹ́ẹ̀bù",
      "address": "Àdírẹ́sì",
      "photoUrl": "Fọ́tò",
      "logoUrl": "Lógò",
      "socials": "Àwọn ìjápọ̀ ìkànnì àjọlò",
      "cta": "Bọ́tìnnì",
      "disclaimer": "Àkíyèsí òfin"
    },
    "groups": {
      "about": "Nípa yín",
      "contact": "Ìbánisọ̀rọ̀",
      "images": "Àwọn àwòrán",
      "socials": "Àwọn ìjápọ̀ ìkànnì àjọlò",
      "cta": "Bọ́tìnnì",
      "disclaimer": "Àkíyèsí òfin"
    },
    "placeholders": {
      "name": "Adùnní Àlàbí",
      "role": "Olùdásílẹ̀",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Main Street, Ìbàdàn",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Ṣètò ìpè",
      "ctaUrl": "https://"
    },
    "ctaText": "Ọ̀rọ̀ bọ́tìnnì",
    "ctaLink": "Ìjápọ̀ bọ́tìnnì",
    "hints": {
      "photoUrl": "Ìjápọ̀ sí PNG tàbí JPG onígun mẹ́rin dọ́gba, ó kéré tán 144 x 144 pixel, tí kò sì ju 200 KB lọ. Ó máa hàn ní 72 x 72 pixel lẹ́gbẹ̀ẹ́ orúkọ yín.",
      "logoUrl": "Ìjápọ̀ sí PNG tàbí JPG tí ẹ̀yìn rẹ̀ jẹ́ àfihàn-gbangba tàbí funfun, ó kéré tán 64 pixel ní gíga. Ó máa hàn ní 32 pixel ní gíga.",
      "website": "A máa fi https:// kún un tí ẹ kò bá kọ ọ́.",
      "cta": "A nílò ọ̀rọ̀ àti ìjápọ̀ méjèèjì kí bọ́tìnnì náà tó hàn.",
      "disclaimer": "Ọ̀rọ̀ kékeré ní ìsàlẹ̀, fún àpẹẹrẹ àkíyèsí àṣírí. Ẹ fi sílẹ̀ ní òfo tí ẹ kò bá nílò rẹ̀."
    },
    "style": {
      "accent": "Àwọ̀ àfihàn",
      "accentHint": "A máa ń lò ó fún ọ̀pá, àwọn ìjápọ̀ àti bọ́tìnnì. Ó bẹ̀rẹ̀ pẹ̀lú àwọ̀ brand yín.",
      "font": "Fọ́ǹtì",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Ìwọ̀n ọ̀rọ̀",
      "sizeMd": "Déédé",
      "sizeSm": "Kékeré",
      "shape": "Ìrísí fọ́tò",
      "shapeRound": "Ribiti",
      "shapeSquare": "Onígun mẹ́rin"
    },
    "hidden": "a fi pamọ́",
    "reset": "Bẹ̀rẹ̀ lákọ̀tun",
    "resetConfirm": "Ẹ tún yàn án láti pa gbogbo àwọn àpótí rẹ́"
  }
};
