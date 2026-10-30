// tl strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale tl
export default {
  "welcome": {
    "title": "Maligayang pagdating sa newsletter",
    "invitedBy": "Inimbitahan ka ni {configuratorId} na mag-subscribe."
  },
  "email": {
    "title": "Saan namin ipapadala ang bawat isyu?",
    "placeholder": "Ang iyong email"
  },
  "name": {
    "title": "Ano ang pangalan mo?",
    "placeholder": "Ang iyong pangalan"
  },
  "language": {
    "title": "Anong wika ang gusto mong basahin?"
  },
  "subscribed": {
    "title": "Naka-subscribe ka na",
    "subtitle": "Tingnan ang inbox mo para sa confirmation email.",
    "continueTo": "Magpatuloy sa",
    "finishingUp": "Puwede mo nang isara ang pahinang ito."
  },
  "form": {
    "heading": "Mag-subscribe sa {title}",
    "headingFallback": "Mag-subscribe sa newsletter na ito",
    "intro": "Dumarating sa email ang mga bagong isyu, nakasulat sa wikang pipiliin mo.",
    "from": "Mula kay {sender}",
    "emailLabel": "Address ng email",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Pangalan",
    "optional": "opsyonal",
    "nameHint": "Ginagamit namin ito para batiin ka. Kapag iniwan mong blangko, gagamitin namin ang unang bahagi ng email address mo.",
    "languageLabel": "Wika ng mga isyu mo",
    "languageSummary": "Mga isyu sa {language}.",
    "languageChange": "Palitan",
    "languageHint": "Pinili namin ito mula sa settings ng browser mo.",
    "submit": "Mag-subscribe",
    "submitting": "Nagsu-subscribe...",
    "consent": "Sa pag-subscribe, pumapayag kang makatanggap ng mga email mula kay {sender}. May unsubscribe link ang bawat email.",
    "privacy": "Patakaran sa privacy",
    "loadingInfo": "Nilo-load ang mga detalye ng newsletter"
  },
  "success": {
    "title": "Tingnan ang inbox mo",
    "body": "Nagpadala kami ng confirmation email sa {email}. Buksan ito at piliin ang Kumpirmahin ang subscription.",
    "next": "Darating ang unang isyu mo pagkatapos mong kumpirmahin, nakasulat sa {language}.",
    "spam": "Kung walang dumating sa loob ng ilang minuto, tingnan ang spam o Promotions folder mo.",
    "changeEmail": "Gumamit ng ibang email",
    "continueTo": "Magpatuloy sa {host}"
  },
  "errors": {
    "emailRequired": "Ilagay ang email address mo.",
    "emailInvalid": "Mukhang kulang ang email address na ito. Tingnan ito at subukan ulit.",
    "missingLink": "May kulang na impormasyon sa signup link na ito. Humingi ng bagong link sa nagpadala.",
    "notFound": "Hindi na gumagana ang signup link na ito. Humingi ng bagong link sa nagpadala.",
    "limit": "Hindi makatanggap ng bagong subscriber ang newsletter na ito sa ngayon. Subukan ulit mamaya.",
    "invalid": "Hindi namin matanggap ang address na ito. Tingnan ito at subukan ulit.",
    "server": "Hindi namin ma-save ang subscription mo. Subukan ulit maya-maya.",
    "network": "Hindi namin maabot ang server. Tingnan ang koneksyon mo at subukan ulit."
  },
  "confirm": {
    "title": "Kumpirmahin ang subscription mo",
    "body": "Piliin ang button para magsimulang makatanggap ng mga isyu sa {email}.",
    "button": "Kumpirmahin ang subscription",
    "confirming": "Kinukumpirma...",
    "consent": "Sa pagkumpirma, pumapayag kang matanggap ang newsletter na ito sa email. Puwede kang mag-unsubscribe mula sa kahit anong isyu.",
    "successTitle": "Naka-subscribe ka na",
    "successBody": "Darating ang mga bagong isyu sa {email}.",
    "successTip": "Para hindi mapunta sa spam, idagdag ang nagpadala sa mga contact mo.",
    "invalidTitle": "Kulang ang link na ito",
    "invalidBody": "Buksan ulit ang confirmation email at piliin ang button nito. Kung hindi mo ito makita, mag-sign up ulit mula sa pahina ng nagpadala.",
    "notFoundBody": "Wala kaming nahanap na signup para sa address na ito. Mag-sign up ulit mula sa pahina ng nagpadala.",
    "errorBody": "Hindi namin makumpirma ang subscription mo. Subukan ulit maya-maya.",
    "retry": "Subukan ulit",
    "home": "Pumunta sa home page"
  },
  "embed": {
    "title": "Magdagdag ng signup form sa site mo",
    "intro": "I-paste ang isa sa mga snippet na ito sa website mo. Makakatanggap ang mga nag-sign up ng confirmation email, tapos ng mga isyu mo sa sarili nilang wika.",
    "linkLabel": "Link ng signup page",
    "linkHint": "Ibahagi ito sa social bio, email signature o QR code.",
    "scriptLabel": "Script tag (inirerekomenda)",
    "scriptHint": "I-paste ito kung saan dapat lumabas ang form. Kusang nag-a-adjust ang laki ng form.",
    "iframeLabel": "Iframe",
    "iframeHint": "Gamitin ito kung hindi pinapayagan ng site mo ang mga script.",
    "copy": "Kopyahin",
    "copied": "Nakopya",
    "copyFailed": "Piliin ang text at kopyahin ito nang mano-mano.",
    "options": "Mga opsyon ng form",
    "accent": "Kulay ng button",
    "accentHint": "Hayaan ito para gamitin ang kulay ng brand mo.",
    "theme": "Tema",
    "themeAuto": "Sundin ang setting ng bisita",
    "themeLight": "Maliwanag",
    "themeDark": "Madilim",
    "layout": "Layout",
    "layoutFull": "Buo (pamagat, pangalan at wika)",
    "layoutCompact": "Siksik (email at button)",
    "preview": "Preview",
    "previewNote": "Live ang preview. Ang signup dito ay gagawa ng totoong subscriber.",
    "missing": "Gumawa muna ng newsletter. Lalabas dito ang signup form kapag mayroon na."
  },
  "page": {
    "poweredBy": "Tumatakbo sa AIBAN",
    "title": "Mag-subscribe"
  },
  "signature": {
    "title": "Pirma sa email",
    "intro": "Nakikita ito ng mga mambabasa sa dulo ng bawat isyu. I-click ang kahit anong bahagi ng preview para i-edit ito.",
    "show": "Ipakita ang signature ko sa bawat isyu",
    "showHint": "Kapag naka-off, natatapos ang mga isyu pagkatapos ng artikulo.",
    "preview": "Preview",
    "previewEmpty": "Blangko ang signature mo. Idagdag ang pangalan mo para magsimula.",
    "articleEnd": "Dulo ng artikulo",
    "tabContent": "Content",
    "tabStyle": "Estilo",
    "blocks": "Ano ang isasama",
    "blocksHint": "Pumili ng tag para ipakita o itago ang bahaging iyon. Nananatili ang text ng mga nakatagong bahagi.",
    "layout": "Layout",
    "layouts": {
      "bar": "Guhit na may kulay",
      "photo": "Larawan",
      "stacked": "Nakapatong",
      "centered": "Nakagitna",
      "minimal": "Text lang"
    },
    "fields": {
      "name": "Pangalan",
      "role": "Posisyon",
      "company": "Kumpanya",
      "phone": "Telepono",
      "email": "Email",
      "website": "Website",
      "address": "Address",
      "photoUrl": "Larawan",
      "logoUrl": "Logo",
      "socials": "Mga social link",
      "cta": "Button",
      "disclaimer": "Legal na paalala"
    },
    "groups": {
      "about": "Tungkol sa iyo",
      "contact": "Contact",
      "images": "Mga larawan",
      "socials": "Mga social link",
      "cta": "Button",
      "disclaimer": "Legal na paalala"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Founder",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Rizal Street, Quezon City",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Mag-book ng tawag",
      "ctaUrl": "https://"
    },
    "ctaText": "Text ng button",
    "ctaLink": "Link ng button",
    "hints": {
      "photoUrl": "Link sa parisukat na PNG o JPG, hindi bababa sa 144 by 144 pixel at mas maliit sa 200 KB. Ipinapakita nang 72 by 72 pixel sa tabi ng pangalan mo.",
      "logoUrl": "Link sa PNG o JPG na transparent o puti ang background, hindi bababa sa 64 pixel ang taas. Ipinapakita nang 32 pixel ang taas.",
      "website": "Idadagdag namin ang https:// kung wala ito.",
      "cta": "Kailangan ang text at ang link para lumabas ang button.",
      "disclaimer": "Maliit na sulat sa ibaba, halimbawa paalala tungkol sa pagiging kumpidensyal. Iwanang blangko kung hindi mo kailangan."
    },
    "style": {
      "accent": "Accent na kulay",
      "accentHint": "Ginagamit para sa bar, mga link at button. Nagsisimula sa kulay ng brand mo.",
      "font": "Font",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Laki ng text",
      "sizeMd": "Karaniwan",
      "sizeSm": "Maliit",
      "shape": "Hugis ng larawan",
      "shapeRound": "Bilog",
      "shapeSquare": "Parisukat"
    },
    "hidden": "nakatago",
    "reset": "Magsimula ulit",
    "resetConfirm": "Piliin ulit para burahin ang lahat ng field"
  }
};
