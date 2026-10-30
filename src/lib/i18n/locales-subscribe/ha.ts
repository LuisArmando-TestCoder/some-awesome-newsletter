// ha strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale ha
export default {
  "welcome": {
    "title": "Barka da zuwa wasiƙar labarai",
    "invitedBy": "{configuratorId} ya gayyace ku don yin rajista."
  },
  "email": {
    "title": "Ina za mu aika kowace fitowa?",
    "placeholder": "Imel naka"
  },
  "name": {
    "title": "Menene sunanku?",
    "placeholder": "Sunanka"
  },
  "language": {
    "title": "A wane harshe kuke son karantawa?"
  },
  "subscribed": {
    "title": "Kun yi rajista",
    "subtitle": "Duba akwatin saƙonku don imel na tabbatarwa.",
    "continueTo": "Ci gaba da",
    "finishingUp": "Kuna iya rufe wannan shafi."
  },
  "form": {
    "heading": "Yi rajista da {title}",
    "headingFallback": "Yi rajista da wannan wasiƙar labarai",
    "intro": "Sababbin fitowowi suna zuwa ta imel, a rubuce a harshen da kuka zaɓa.",
    "from": "Daga {sender}",
    "emailLabel": "Adireshin imel",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Sunan farko",
    "optional": "na zaɓi",
    "nameHint": "Muna amfani da shi don gaishe ku. Idan kun bar shi babu komai, za mu yi amfani da farkon adireshin imel ɗinku.",
    "languageLabel": "Harshen fitowowinku",
    "languageSummary": "Fitowowi a {language}.",
    "languageChange": "Canza",
    "languageHint": "Mun zaɓi wannan daga saitunan burauzarku.",
    "submit": "Yi rajista",
    "submitting": "Ana rajista...",
    "consent": "Ta yin rajista, kun amince da karɓar imel daga {sender}. Kowane imel yana da hanyar haɗin cire rajista.",
    "privacy": "Manufar sirri",
    "loadingInfo": "Ana loda bayanan wasiƙar labarai"
  },
  "success": {
    "title": "Duba akwatin saƙonku",
    "body": "Mun aika imel na tabbatarwa zuwa {email}. Buɗe shi kuma ku zaɓi Tabbatar da rajista.",
    "next": "Fitowarku ta farko za ta iso bayan kun tabbatar, a rubuce a {language}.",
    "spam": "Idan babu abin da ya iso cikin 'yan mintuna, duba babban fayil na spam ko na tallace-tallace.",
    "changeEmail": "Yi amfani da wani imel",
    "continueTo": "Ci gaba zuwa {host}"
  },
  "errors": {
    "emailRequired": "Shigar da adireshin imel ɗinku.",
    "emailInvalid": "Wannan adireshin imel bai cika ba. Duba shi kuma ku sake gwadawa.",
    "missingLink": "Wannan hanyar haɗin rajista ba ta da cikakken bayani. Nemi sabuwar hanyar haɗi daga mai aikawa.",
    "notFound": "Wannan hanyar haɗin rajista ba ta aiki yanzu. Nemi sabuwar hanyar haɗi daga mai aikawa.",
    "limit": "Wannan wasiƙar labarai ba za ta iya karɓar sababbin masu biyan kuɗi a yanzu ba. Sake gwadawa daga baya.",
    "invalid": "Ba mu iya karɓar wannan adireshin ba. Duba shi kuma ku sake gwadawa.",
    "server": "Ba mu iya ajiye rajistarku ba. Sake gwadawa nan ba da jimawa ba.",
    "network": "Ba mu iya isa sabar ba. Duba haɗinku kuma ku sake gwadawa."
  },
  "confirm": {
    "title": "Tabbatar da rajistarku",
    "body": "Zaɓi maɓallin don fara karɓar fitowowi a {email}.",
    "button": "Tabbatar da rajista",
    "confirming": "Ana tabbatarwa...",
    "consent": "Ta tabbatarwa, kun amince da karɓar wannan wasiƙar labarai ta imel. Kuna iya cire rajista daga kowace fitowa.",
    "successTitle": "Kun yi rajista",
    "successBody": "Sababbin fitowowi za su iso a {email}.",
    "successTip": "Don hana su shiga spam, ƙara mai aikawa cikin lambobin sadarwarku.",
    "invalidTitle": "Wannan hanyar haɗi ba ta cika ba",
    "invalidBody": "Sake buɗe imel ɗin tabbatarwa kuma ku zaɓi maɓallinsa. Idan ba ku same shi ba, sake yin rajista daga shafin mai aikawa.",
    "notFoundBody": "Ba mu sami rajista don wannan adireshin ba. Sake yin rajista daga shafin mai aikawa.",
    "errorBody": "Ba mu iya tabbatar da rajistarku ba. Sake gwadawa nan ba da jimawa ba.",
    "retry": "Sake gwadawa",
    "home": "Je zuwa shafin farko"
  },
  "embed": {
    "title": "Ƙara fom ɗin rajista a gidan yanar gizonku",
    "intro": "Liƙa ɗaya daga cikin waɗannan lambobin a gidan yanar gizonku. Mutanen da suka yi rajista suna samun imel na tabbatarwa, sannan fitowowinku a harshensu.",
    "linkLabel": "Hanyar haɗin shafin rajista",
    "linkHint": "Raba ta a bayanin kafofin sada zumunta, sa hannun imel ko lambar QR.",
    "scriptLabel": "Alamar script (an ba da shawara)",
    "scriptHint": "Liƙa ta inda fom ɗin zai bayyana. Fom ɗin yana daidaita girmansa da kansa.",
    "iframeLabel": "Iframe",
    "iframeHint": "Yi amfani da wannan idan gidan yanar gizonku bai yarda da scripts ba.",
    "copy": "Kwafi",
    "copied": "An kwafa",
    "copyFailed": "Zaɓi rubutun kuma ku kwafe shi da hannu.",
    "options": "Zaɓuɓɓukan fom",
    "accent": "Launin maɓalli",
    "accentHint": "Bar shi yadda yake don amfani da launin alamarku.",
    "theme": "Jigo",
    "themeAuto": "Bi saitin baƙo",
    "themeLight": "Haske",
    "themeDark": "Duhu",
    "layout": "Tsari",
    "layoutFull": "Cikakke (take, suna da harshe)",
    "layoutCompact": "Ƙarami (imel da maɓalli)",
    "preview": "Samfurin gani",
    "previewNote": "Samfurin yana aiki kai tsaye. Rajista a nan tana ƙirƙirar mai biyan kuɗi na gaske.",
    "missing": "Ƙirƙiri wasiƙar labarai da farko. Fom ɗin rajista zai bayyana a nan idan ta kasance."
  },
  "page": {
    "poweredBy": "Yana aiki da AIBAN",
    "title": "Yi rajista"
  },
  "signature": {
    "title": "Sa hannun imel",
    "intro": "Masu karatu suna ganin wannan a ƙarshen kowace fitowa. Danna kowane sashe na samfurin don gyara shi.",
    "show": "Nuna sa hannuna a kowace fitowa",
    "showHint": "Idan kun kashe shi, fitowowi za su ƙare bayan maƙalar.",
    "preview": "Samfurin gani",
    "previewEmpty": "Sa hannunku babu komai. Ƙara sunanku don farawa.",
    "articleEnd": "Ƙarshen maƙalar",
    "tabContent": "Abun ciki",
    "tabStyle": "Salo",
    "blocks": "Abin da za a haɗa",
    "blocksHint": "Zaɓi alama don nunawa ko ɓoye wannan sashe. Sassan da aka ɓoye suna riƙe rubutunsu.",
    "layout": "Tsari",
    "layouts": {
      "bar": "Sandar launi",
      "photo": "Hoto",
      "stacked": "A jere",
      "centered": "A tsakiya",
      "minimal": "Rubutu kawai"
    },
    "fields": {
      "name": "Suna",
      "role": "Matsayin aiki",
      "company": "Kamfani",
      "phone": "Waya",
      "email": "Imel",
      "website": "Gidan yanar gizo",
      "address": "Adireshi",
      "photoUrl": "Hoto",
      "logoUrl": "Tambari",
      "socials": "Hanyoyin sada zumunta",
      "cta": "Maɓalli",
      "disclaimer": "Bayanin doka"
    },
    "groups": {
      "about": "Game da ku",
      "contact": "Tuntuɓa",
      "images": "Hotuna",
      "socials": "Hanyoyin sada zumunta",
      "cta": "Maɓalli",
      "disclaimer": "Bayanin doka"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Wanda ya kafa",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Main Street, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Tsara kira",
      "ctaUrl": "https://"
    },
    "ctaText": "Rubutun maɓalli",
    "ctaLink": "Hanyar haɗin maɓalli",
    "hints": {
      "photoUrl": "Hanyar haɗi zuwa PNG ko JPG mai murabba'i, aƙalla pixels 144 da 144 kuma ƙasa da 200 KB. Ana nuna shi a pixels 72 da 72 kusa da sunanku.",
      "logoUrl": "Hanyar haɗi zuwa PNG ko JPG mai bango mara launi ko fari, tsayinsa aƙalla pixels 64. Ana nuna shi a tsayin pixels 32.",
      "website": "Muna ƙara https:// idan kun bar shi.",
      "cta": "Ana buƙatar rubutun da hanyar haɗin duka domin maɓallin ya bayyana.",
      "disclaimer": "Ƙaramin rubutu a ƙasa, misali bayanin sirri. Bar shi babu komai idan ba ku buƙata."
    },
    "style": {
      "accent": "Launin ado",
      "accentHint": "Ana amfani da shi don sandar, hanyoyin haɗi da maɓalli. Yana farawa da launin alamarku.",
      "font": "Rubutu",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Girman rubutu",
      "sizeMd": "Na yau da kullum",
      "sizeSm": "Ƙarami",
      "shape": "Siffar hoto",
      "shapeRound": "Zagaye",
      "shapeSquare": "Murabba'i"
    },
    "hidden": "an ɓoye",
    "reset": "Fara daga farko",
    "resetConfirm": "Sake zaɓa don share kowane fili"
  }
};
