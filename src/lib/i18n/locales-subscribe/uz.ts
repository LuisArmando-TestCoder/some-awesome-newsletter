// uz strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale uz
export default {
  "welcome": {
    "title": "Axborotnomaga xush kelibsiz",
    "invitedBy": "{configuratorId} sizni obuna bo'lishga taklif qildi."
  },
  "email": {
    "title": "Har bir sonni qayerga yuboraylik?",
    "placeholder": "Sizning emailingiz"
  },
  "name": {
    "title": "Ismingiz nima?",
    "placeholder": "Sizning ismingiz"
  },
  "language": {
    "title": "Qaysi tilda o'qishni xohlaysiz?"
  },
  "subscribed": {
    "title": "Obuna bo'ldingiz",
    "subtitle": "Tasdiqlash xati uchun pochta qutingizni tekshiring.",
    "continueTo": "Davom etish",
    "finishingUp": "Bu sahifani yopishingiz mumkin."
  },
  "form": {
    "heading": "{title} ga obuna bo'ling",
    "headingFallback": "Bu axborotnomaga obuna bo'ling",
    "intro": "Yangi sonlar siz tanlagan tilda yozilib, elektron pochta orqali keladi.",
    "from": "Yuboruvchi: {sender}",
    "emailLabel": "Elektron pochta manzili",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Ism",
    "optional": "ixtiyoriy",
    "nameHint": "Undan siz bilan salomlashish uchun foydalanamiz. Bo'sh qoldirsangiz, pochta manzilingizning boshini ishlatamiz.",
    "languageLabel": "Sonlar tili",
    "languageSummary": "Sonlar {language} tilida.",
    "languageChange": "O'zgartirish",
    "languageHint": "Buni brauzeringiz sozlamalaridan tanladik.",
    "submit": "Obuna bo'lish",
    "submitting": "Obuna bo'linmoqda...",
    "consent": "Obuna bo'lib, {sender} yuboradigan xatlarni olishga rozilik bildirasiz. Har bir xatda obunani bekor qilish havolasi bor.",
    "privacy": "Maxfiylik siyosati",
    "loadingInfo": "Axborotnoma ma'lumotlari yuklanmoqda"
  },
  "success": {
    "title": "Pochta qutingizni tekshiring",
    "body": "{email} manziliga tasdiqlash xatini yubordik. Uni oching va \"Obunani tasdiqlash\" tugmasini tanlang.",
    "next": "Tasdiqlaganingizdan keyin birinchi soningiz {language} tilida keladi.",
    "spam": "Bir necha daqiqada hech narsa kelmasa, spam yoki Aksiyalar jildini ko'ring.",
    "changeEmail": "Boshqa pochtadan foydalanish",
    "continueTo": "{host} saytiga o'tish"
  },
  "errors": {
    "emailRequired": "Elektron pochta manzilingizni kiriting.",
    "emailInvalid": "Bu pochta manzili to'liq emasga o'xshaydi. Tekshirib, qaytadan urinib ko'ring.",
    "missingLink": "Bu ro'yxatdan o'tish havolasida ma'lumot yetishmayapti. Yuboruvchidan yangi havola so'rang.",
    "notFound": "Bu ro'yxatdan o'tish havolasi endi ishlamaydi. Yuboruvchidan yangi havola so'rang.",
    "limit": "Bu axborotnoma hozir yangi obunachilarni qabul qila olmaydi. Keyinroq qaytadan urinib ko'ring.",
    "invalid": "Bu manzilni qabul qila olmadik. Tekshirib, qaytadan urinib ko'ring.",
    "server": "Obunangizni saqlay olmadik. Birozdan keyin qaytadan urinib ko'ring.",
    "network": "Serverga ulana olmadik. Internetni tekshirib, qaytadan urinib ko'ring."
  },
  "confirm": {
    "title": "Obunangizni tasdiqlang",
    "body": "{email} manziliga sonlarni olishni boshlash uchun tugmani tanlang.",
    "button": "Obunani tasdiqlash",
    "confirming": "Tasdiqlanmoqda...",
    "consent": "Tasdiqlab, bu axborotnomani elektron pochta orqali olishga rozilik bildirasiz. Istalgan sondan obunani bekor qilishingiz mumkin.",
    "successTitle": "Obuna bo'ldingiz",
    "successBody": "Yangi sonlar {email} manziliga keladi.",
    "successTip": "Xatlar spamga tushmasligi uchun yuboruvchini kontaktlaringizga qo'shing.",
    "invalidTitle": "Bu havola to'liq emas",
    "invalidBody": "Tasdiqlash xatini qayta oching va undagi tugmani tanlang. Topa olmasangiz, yuboruvchining sahifasidan qayta ro'yxatdan o'ting.",
    "notFoundBody": "Bu manzil uchun ro'yxatdan o'tish topilmadi. Yuboruvchining sahifasidan qayta ro'yxatdan o'ting.",
    "errorBody": "Obunangizni tasdiqlay olmadik. Birozdan keyin qaytadan urinib ko'ring.",
    "retry": "Qaytadan urinish",
    "home": "Bosh sahifaga o'tish"
  },
  "embed": {
    "title": "Saytingizga ro'yxatdan o'tish shaklini qo'shing",
    "intro": "Bu kodlardan birini saytingizga joylang. Ro'yxatdan o'tganlar tasdiqlash xatini, keyin esa sonlaringizni o'z tilida oladi.",
    "linkLabel": "Ro'yxatdan o'tish sahifasi havolasi",
    "linkHint": "Uni ijtimoiy tarmoqdagi profilda, pochta imzosida yoki QR kodda ulashing.",
    "scriptLabel": "Script tegi (tavsiya etiladi)",
    "scriptHint": "Shakl chiqishi kerak bo'lgan joyga joylang. Shakl o'lchami o'zi moslashadi.",
    "iframeLabel": "Iframe",
    "iframeHint": "Saytingiz skriptlarga ruxsat bermasa, shundan foydalaning.",
    "copy": "Nusxalash",
    "copied": "Nusxalandi",
    "copyFailed": "Matnni belgilab, qo'lda nusxalang.",
    "options": "Shakl sozlamalari",
    "accent": "Tugma rangi",
    "accentHint": "Brend rangingizdan foydalanish uchun o'zgartirmang.",
    "theme": "Mavzu",
    "themeAuto": "Tashrif buyuruvchi sozlamasiga mos",
    "themeLight": "Yorug'",
    "themeDark": "Qorong'i",
    "layout": "Joylashuv",
    "layoutFull": "To'liq (sarlavha, ism va til)",
    "layoutCompact": "Ixcham (pochta va tugma)",
    "preview": "Oldindan ko'rish",
    "previewNote": "Oldindan ko'rish haqiqiy ishlaydi. Bu yerda ro'yxatdan o'tish haqiqiy obunachi yaratadi.",
    "missing": "Avval axborotnoma yarating. U yaratilgach, ro'yxatdan o'tish shakli shu yerda chiqadi."
  },
  "page": {
    "poweredBy": "AIBAN asosida ishlaydi",
    "title": "Obuna bo'lish"
  },
  "signature": {
    "title": "Pochta imzosi",
    "intro": "O'quvchilar buni har bir sonning oxirida ko'radi. Tahrirlash uchun oldindan ko'rishning istalgan qismini bosing.",
    "show": "Imzomni har bir sonda ko'rsatish",
    "showHint": "O'chirsangiz, sonlar maqoladan keyin tugaydi.",
    "preview": "Oldindan ko'rish",
    "previewEmpty": "Imzongiz bo'sh. Boshlash uchun ismingizni qo'shing.",
    "articleEnd": "Maqola oxiri",
    "tabContent": "Mazmun",
    "tabStyle": "Uslub",
    "blocks": "Nimalar kiritilsin",
    "blocksHint": "O'sha qismni ko'rsatish yoki yashirish uchun tegni tanlang. Yashirilgan qismlarning matni saqlanadi.",
    "layout": "Joylashuv",
    "layouts": {
      "bar": "Rangli chiziq",
      "photo": "Surat",
      "stacked": "Ustma-ust",
      "centered": "Markazda",
      "minimal": "Faqat matn"
    },
    "fields": {
      "name": "Ism",
      "role": "Lavozim",
      "company": "Kompaniya",
      "phone": "Telefon",
      "email": "Pochta",
      "website": "Veb-sayt",
      "address": "Manzil",
      "photoUrl": "Surat",
      "logoUrl": "Logotip",
      "socials": "Ijtimoiy tarmoq havolalari",
      "cta": "Tugma",
      "disclaimer": "Huquqiy eslatma"
    },
    "groups": {
      "about": "Siz haqingizda",
      "contact": "Aloqa",
      "images": "Rasmlar",
      "socials": "Ijtimoiy tarmoq havolalari",
      "cta": "Tugma",
      "disclaimer": "Huquqiy eslatma"
    },
    "placeholders": {
      "name": "Dilnoza Karimova",
      "role": "Asoschi",
      "company": "Daryo bo'yi studiyasi",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Amir Temur ko'chasi 120, Toshkent",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Qo'ng'iroqqa yozilish",
      "ctaUrl": "https://"
    },
    "ctaText": "Tugma matni",
    "ctaLink": "Tugma havolasi",
    "hints": {
      "photoUrl": "Kvadrat PNG yoki JPG havolasi, kamida 144x144 piksel va 200 KB dan kichik. Ismingiz yonida 72x72 piksel o'lchamda ko'rsatiladi.",
      "logoUrl": "Shaffof yoki oq fonli PNG yoki JPG havolasi, balandligi kamida 64 piksel. Balandligi 32 piksel bo'lib ko'rsatiladi.",
      "website": "https:// yozmasangiz, o'zimiz qo'shamiz.",
      "cta": "Tugma chiqishi uchun matn ham, havola ham kerak.",
      "disclaimer": "Pastdagi mayda matn, masalan, maxfiylik haqida eslatma. Kerak bo'lmasa, bo'sh qoldiring."
    },
    "style": {
      "accent": "Urg'u rangi",
      "accentHint": "Chiziq, havolalar va tugma uchun ishlatiladi. Dastlab brend rangingiz turadi.",
      "font": "Shrift",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Matn o'lchami",
      "sizeMd": "Oddiy",
      "sizeSm": "Kichik",
      "shape": "Surat shakli",
      "shapeRound": "Dumaloq",
      "shapeSquare": "Kvadrat"
    },
    "hidden": "yashirin",
    "reset": "Boshidan boshlash",
    "resetConfirm": "Barcha maydonlarni tozalash uchun yana tanlang"
  }
};
