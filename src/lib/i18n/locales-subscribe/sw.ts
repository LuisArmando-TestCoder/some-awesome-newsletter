// sw strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale sw
export default {
  "welcome": {
    "title": "Karibu kwenye jarida",
    "invitedBy": "{configuratorId} amekualika ujisajili."
  },
  "email": {
    "title": "Tutume kila toleo wapi?",
    "placeholder": "Barua pepe yako"
  },
  "name": {
    "title": "Jina lako ni nani?",
    "placeholder": "Jina lako"
  },
  "language": {
    "title": "Unataka kusoma kwa lugha gani?"
  },
  "subscribed": {
    "title": "Umejisajili",
    "subtitle": "Angalia kikasha chako kwa barua pepe ya uthibitisho.",
    "continueTo": "Endelea hadi",
    "finishingUp": "Unaweza kufunga ukurasa huu."
  },
  "form": {
    "heading": "Jisajili kwa {title}",
    "headingFallback": "Jisajili kwa jarida hili",
    "intro": "Matoleo mapya hufika kwa barua pepe, yakiwa yameandikwa kwa lugha unayochagua.",
    "from": "Kutoka {sender}",
    "emailLabel": "Anwani ya barua pepe",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Jina la kwanza",
    "optional": "si lazima",
    "nameHint": "Tunalitumia kukusalimu. Ukiacha wazi tutatumia mwanzo wa anwani yako ya barua pepe.",
    "languageLabel": "Lugha ya matoleo yako",
    "languageSummary": "Matoleo kwa {language}.",
    "languageChange": "Badilisha",
    "languageHint": "Tumechagua hii kutoka kwa mipangilio ya kivinjari chako.",
    "submit": "Jisajili",
    "submitting": "Inasajili...",
    "consent": "Kwa kujisajili, unakubali kupokea barua pepe kutoka {sender}. Kila barua pepe ina kiungo cha kujiondoa.",
    "privacy": "Sera ya faragha",
    "loadingInfo": "Inapakia maelezo ya jarida"
  },
  "success": {
    "title": "Angalia kikasha chako",
    "body": "Tumetuma barua pepe ya uthibitisho kwa {email}. Ifungue na uchague Thibitisha usajili.",
    "next": "Toleo lako la kwanza litafika baada ya kuthibitisha, likiwa limeandikwa kwa {language}.",
    "spam": "Kama hakuna kinachofika ndani ya dakika chache, angalia folda ya barua taka au ya Matangazo.",
    "changeEmail": "Tumia barua pepe nyingine",
    "continueTo": "Endelea hadi {host}"
  },
  "errors": {
    "emailRequired": "Weka anwani yako ya barua pepe.",
    "emailInvalid": "Anwani hii ya barua pepe inaonekana haijakamilika. Iangalie na ujaribu tena.",
    "missingLink": "Kiungo hiki cha kujisajili kinakosa taarifa. Muombe mtumaji kiungo kipya.",
    "notFound": "Kiungo hiki cha kujisajili hakifanyi kazi tena. Muombe mtumaji kiungo kipya.",
    "limit": "Jarida hili haliwezi kupokea waliojisajili wapya kwa sasa. Jaribu tena baadaye.",
    "invalid": "Hatukuweza kukubali anwani hii. Iangalie na ujaribu tena.",
    "server": "Hatukuweza kuhifadhi usajili wako. Jaribu tena baada ya muda mfupi.",
    "network": "Hatukuweza kufikia seva. Angalia muunganisho wako na ujaribu tena."
  },
  "confirm": {
    "title": "Thibitisha usajili wako",
    "body": "Chagua kitufe ili kuanza kupokea matoleo kwenye {email}.",
    "button": "Thibitisha usajili",
    "confirming": "Inathibitisha...",
    "consent": "Kwa kuthibitisha, unakubali kupokea jarida hili kwa barua pepe. Unaweza kujiondoa kutoka kwa toleo lolote.",
    "successTitle": "Umejisajili",
    "successBody": "Matoleo mapya yatafika kwenye {email}.",
    "successTip": "Ili yasiende kwenye barua taka, ongeza mtumaji kwenye anwani zako.",
    "invalidTitle": "Kiungo hiki hakijakamilika",
    "invalidBody": "Fungua tena barua pepe ya uthibitisho na uchague kitufe chake. Usipoipata, jisajili tena kutoka kwa ukurasa wa mtumaji.",
    "notFoundBody": "Hatukupata usajili wa anwani hii. Jisajili tena kutoka kwa ukurasa wa mtumaji.",
    "errorBody": "Hatukuweza kuthibitisha usajili wako. Jaribu tena baada ya muda mfupi.",
    "retry": "Jaribu tena",
    "home": "Nenda kwenye ukurasa wa mwanzo"
  },
  "embed": {
    "title": "Ongeza fomu ya kujisajili kwenye tovuti yako",
    "intro": "Bandika mojawapo ya vipande hivi vya msimbo kwenye tovuti yako. Wanaojisajili hupokea barua pepe ya uthibitisho, kisha matoleo yako kwa lugha yao.",
    "linkLabel": "Kiungo cha ukurasa wa kujisajili",
    "linkHint": "Kishiriki kwenye wasifu wa mitandao ya kijamii, sahihi ya barua pepe au msimbo wa QR.",
    "scriptLabel": "Tagi ya script (inapendekezwa)",
    "scriptHint": "Ibandike mahali fomu inapopaswa kuonekana. Fomu hujirekebisha ukubwa yenyewe.",
    "iframeLabel": "Iframe",
    "iframeHint": "Tumia hii kama tovuti yako hairuhusu script.",
    "copy": "Nakili",
    "copied": "Imenakiliwa",
    "copyFailed": "Chagua maandishi na uyanakili mwenyewe.",
    "options": "Chaguo za fomu",
    "accent": "Rangi ya kitufe",
    "accentHint": "Iache ilivyo ili kutumia rangi ya chapa yako.",
    "theme": "Mandhari",
    "themeAuto": "Fuata mpangilio wa mgeni",
    "themeLight": "Angavu",
    "themeDark": "Giza",
    "layout": "Mpangilio",
    "layoutFull": "Kamili (kichwa, jina na lugha)",
    "layoutCompact": "Fupi (barua pepe na kitufe)",
    "preview": "Onyesho",
    "previewNote": "Onyesho hili ni hai. Kujisajili hapa kunaunda aliyejisajili halisi.",
    "missing": "Unda jarida kwanza. Fomu ya kujisajili itaonekana hapa likishakuwepo."
  },
  "page": {
    "poweredBy": "Inaendeshwa na AIBAN",
    "title": "Jisajili"
  },
  "signature": {
    "title": "Sahihi ya barua pepe",
    "intro": "Wasomaji huona hii mwishoni mwa kila toleo. Bofya sehemu yoyote ya onyesho ili kuihariri.",
    "show": "Onyesha sahihi yangu katika kila toleo",
    "showHint": "Ukiizima, matoleo huishia baada ya makala.",
    "preview": "Onyesho",
    "previewEmpty": "Sahihi yako ni tupu. Ongeza jina lako ili kuanza.",
    "articleEnd": "Mwisho wa makala",
    "tabContent": "Maudhui",
    "tabStyle": "Mtindo",
    "blocks": "Cha kujumuisha",
    "blocksHint": "Chagua tagi ili kuonyesha au kuficha sehemu hiyo. Sehemu zilizofichwa huhifadhi maandishi yake.",
    "layout": "Mpangilio",
    "layouts": {
      "bar": "Upau wa rangi",
      "photo": "Picha",
      "stacked": "Zilizopangwa juu kwa juu",
      "centered": "Katikati",
      "minimal": "Maandishi pekee"
    },
    "fields": {
      "name": "Jina",
      "role": "Cheo",
      "company": "Kampuni",
      "phone": "Simu",
      "email": "Barua pepe",
      "website": "Tovuti",
      "address": "Anwani",
      "photoUrl": "Picha",
      "logoUrl": "Nembo",
      "socials": "Viungo vya mitandao ya kijamii",
      "cta": "Kitufe",
      "disclaimer": "Tangazo la kisheria"
    },
    "groups": {
      "about": "Kukuhusu",
      "contact": "Mawasiliano",
      "images": "Picha",
      "socials": "Viungo vya mitandao ya kijamii",
      "cta": "Kitufe",
      "disclaimer": "Tangazo la kisheria"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Mwanzilishi",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Barabara ya Uhuru 120, Dar es Salaam",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Panga simu",
      "ctaUrl": "https://"
    },
    "ctaText": "Maandishi ya kitufe",
    "ctaLink": "Kiungo cha kitufe",
    "hints": {
      "photoUrl": "Kiungo cha PNG au JPG ya mraba, angalau pikseli 144 kwa 144 na chini ya KB 200. Huonyeshwa kwa pikseli 72 kwa 72 kando ya jina lako.",
      "logoUrl": "Kiungo cha PNG au JPG yenye mandharinyuma angavu au nyeupe, urefu wa angalau pikseli 64. Huonyeshwa kwa urefu wa pikseli 32.",
      "website": "Tunaongeza https:// ukiiacha.",
      "cta": "Maandishi na kiungo vyote vinahitajika ili kitufe kionekane.",
      "disclaimer": "Maandishi madogo chini, kwa mfano tangazo la usiri. Acha wazi kama huhitaji."
    },
    "style": {
      "accent": "Rangi ya msisitizo",
      "accentHint": "Hutumika kwa upau, viungo na kitufe. Huanza na rangi ya chapa yako.",
      "font": "Fonti",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Ukubwa wa maandishi",
      "sizeMd": "Wa kawaida",
      "sizeSm": "Mdogo",
      "shape": "Umbo la picha",
      "shapeRound": "Duara",
      "shapeSquare": "Mraba"
    },
    "hidden": "imefichwa",
    "reset": "Anza upya",
    "resetConfirm": "Chagua tena ili kufuta kila sehemu"
  }
};
