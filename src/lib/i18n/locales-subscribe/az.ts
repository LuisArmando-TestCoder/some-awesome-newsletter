// az strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale az
export default {
  "welcome": {
    "title": "Bülletenə xoş gəlmisiniz",
    "invitedBy": "{configuratorId} sizi abunə olmağa dəvət etdi."
  },
  "email": {
    "title": "Hər buraxılışı hara göndərək?",
    "placeholder": "E-poçtunuz"
  },
  "name": {
    "title": "Adınız nədir?",
    "placeholder": "Adınız"
  },
  "language": {
    "title": "Hansı dildə oxumaq istəyirsiniz?"
  },
  "subscribed": {
    "title": "Abunə oldunuz",
    "subtitle": "Təsdiq e-poçtu üçün gələnlər qutunuzu yoxlayın.",
    "continueTo": "Davam edin",
    "finishingUp": "Bu səhifəni bağlaya bilərsiniz."
  },
  "form": {
    "heading": "{title} bülleteninə abunə olun",
    "headingFallback": "Bu bülletenə abunə olun",
    "intro": "Yeni buraxılışlar seçdiyiniz dildə yazılaraq e-poçtla gəlir.",
    "from": "Göndərən: {sender}",
    "emailLabel": "E-poçt ünvanı",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Ad",
    "optional": "istəyə bağlı",
    "nameHint": "Sizi salamlamaq üçün istifadə edirik. Boş qoysanız, e-poçt ünvanınızın əvvəlindən istifadə edirik.",
    "languageLabel": "Buraxılışların dili",
    "languageSummary": "Buraxılışlar {language} dilində.",
    "languageChange": "Dəyiş",
    "languageHint": "Bunu brauzerinizin ayarlarına əsasən seçdik.",
    "submit": "Abunə ol",
    "submitting": "Abunə olunur...",
    "consent": "Abunə olmaqla {sender} tərəfindən e-poçt almağa razılıq verirsiniz. Hər e-poçtda abunəlikdən çıxmaq üçün keçid var.",
    "privacy": "Məxfilik siyasəti",
    "loadingInfo": "Bülleten məlumatları yüklənir"
  },
  "success": {
    "title": "Gələnlər qutunuzu yoxlayın",
    "body": "{email} ünvanına təsdiq e-poçtu göndərdik. Onu açın və \"Abunəliyi təsdiqlə\" düyməsini seçin.",
    "next": "Təsdiqlədikdən sonra ilk buraxılışınız {language} dilində gələcək.",
    "spam": "Bir neçə dəqiqə ərzində heç nə gəlməsə, spam və ya Promo qovluğuna baxın.",
    "changeEmail": "Başqa e-poçt istifadə edin",
    "continueTo": "{host} saytına keçin"
  },
  "errors": {
    "emailRequired": "E-poçt ünvanınızı daxil edin.",
    "emailInvalid": "Bu e-poçt ünvanı natamam görünür. Yoxlayıb yenidən cəhd edin.",
    "missingLink": "Bu qeydiyyat keçidində məlumat çatışmır. Göndərəndən yeni keçid istəyin.",
    "notFound": "Bu qeydiyyat keçidi artıq işləmir. Göndərəndən yeni keçid istəyin.",
    "limit": "Bu bülleten hazırda yeni abunəçi qəbul edə bilmir. Bir az sonra yenidən cəhd edin.",
    "invalid": "Bu ünvanı qəbul edə bilmədik. Yoxlayıb yenidən cəhd edin.",
    "server": "Abunəliyinizi yadda saxlaya bilmədik. Bir azdan yenidən cəhd edin.",
    "network": "Serverə qoşula bilmədik. İnternet bağlantınızı yoxlayıb yenidən cəhd edin."
  },
  "confirm": {
    "title": "Abunəliyinizi təsdiqləyin",
    "body": "{email} ünvanına buraxılışlar almağa başlamaq üçün düyməni seçin.",
    "button": "Abunəliyi təsdiqlə",
    "confirming": "Təsdiqlənir...",
    "consent": "Təsdiqləməklə bu bülleteni e-poçtla almağa razılıq verirsiniz. İstənilən buraxılışdan abunəlikdən çıxa bilərsiniz.",
    "successTitle": "Abunə oldunuz",
    "successBody": "Yeni buraxılışlar {email} ünvanına gələcək.",
    "successTip": "Spama düşməməsi üçün göndərəni kontaktlarınıza əlavə edin.",
    "invalidTitle": "Bu keçid natamamdır",
    "invalidBody": "Təsdiq e-poçtunu yenidən açın və içindəki düyməni seçin. Tapa bilmirsinizsə, göndərənin səhifəsindən yenidən qeydiyyatdan keçin.",
    "notFoundBody": "Bu ünvan üçün qeydiyyat tapmadıq. Göndərənin səhifəsindən yenidən qeydiyyatdan keçin.",
    "errorBody": "Abunəliyinizi təsdiqləyə bilmədik. Bir azdan yenidən cəhd edin.",
    "retry": "Yenidən cəhd edin",
    "home": "Ana səhifəyə keçin"
  },
  "embed": {
    "title": "Saytınıza qeydiyyat forması əlavə edin",
    "intro": "Bu kodlardan birini saytınıza yapışdırın. Qeydiyyatdan keçənlər təsdiq e-poçtu, sonra isə buraxılışlarınızı öz dillərində alırlar.",
    "linkLabel": "Qeydiyyat səhifəsinin keçidi",
    "linkHint": "Onu sosial şəbəkə bioqrafiyasında, e-poçt imzasında və ya QR kodda paylaşın.",
    "scriptLabel": "Script teqi (tövsiyə olunur)",
    "scriptHint": "Formanın görünməli olduğu yerə yapışdırın. Formanın ölçüsü özü uyğunlaşır.",
    "iframeLabel": "Iframe",
    "iframeHint": "Saytınız skriptlərə icazə vermirsə, bundan istifadə edin.",
    "copy": "Kopyala",
    "copied": "Kopyalandı",
    "copyFailed": "Mətni seçib əl ilə kopyalayın.",
    "options": "Forma seçimləri",
    "accent": "Düymənin rəngi",
    "accentHint": "Brend rənginizdən istifadə etmək üçün olduğu kimi saxlayın.",
    "theme": "Mövzu",
    "themeAuto": "Ziyarətçinin ayarına uyğun",
    "themeLight": "Açıq",
    "themeDark": "Tünd",
    "layout": "Düzülüş",
    "layoutFull": "Tam (başlıq, ad və dil)",
    "layoutCompact": "Yığcam (e-poçt və düymə)",
    "preview": "Önizləmə",
    "previewNote": "Önizləmə canlıdır. Burada qeydiyyat real abunəçi yaradır.",
    "missing": "Əvvəlcə bülleten yaradın. Yaratdıqdan sonra qeydiyyat forması burada görünəcək."
  },
  "page": {
    "poweredBy": "AIBAN ilə işləyir",
    "title": "Abunə ol"
  },
  "signature": {
    "title": "E-poçt imzası",
    "intro": "Oxucular bunu hər buraxılışın sonunda görür. Redaktə etmək üçün önizləmənin istənilən hissəsinə klikləyin.",
    "show": "İmzamı hər buraxılışda göstər",
    "showHint": "Söndürsəniz, buraxılışlar məqalədən sonra bitir.",
    "preview": "Önizləmə",
    "previewEmpty": "İmzanız boşdur. Başlamaq üçün adınızı əlavə edin.",
    "articleEnd": "Məqalənin sonu",
    "tabContent": "Məzmun",
    "tabStyle": "Üslub",
    "blocks": "Nələr daxil edilsin",
    "blocksHint": "Həmin hissəni göstərmək və ya gizlətmək üçün teq seçin. Gizli hissələrin mətni saxlanılır.",
    "layout": "Düzülüş",
    "layouts": {
      "bar": "Rəngli zolaq",
      "photo": "Foto",
      "stacked": "Alt-alta",
      "centered": "Mərkəzdə",
      "minimal": "Yalnız mətn"
    },
    "fields": {
      "name": "Ad",
      "role": "Vəzifə",
      "company": "Şirkət",
      "phone": "Telefon",
      "email": "E-poçt",
      "website": "Vebsayt",
      "address": "Ünvan",
      "photoUrl": "Foto",
      "logoUrl": "Loqo",
      "socials": "Sosial şəbəkə keçidləri",
      "cta": "Düymə",
      "disclaimer": "Hüquqi qeyd"
    },
    "groups": {
      "about": "Haqqınızda",
      "contact": "Əlaqə",
      "images": "Şəkillər",
      "socials": "Sosial şəbəkə keçidləri",
      "cta": "Düymə",
      "disclaimer": "Hüquqi qeyd"
    },
    "placeholders": {
      "name": "Leyla Məmmədova",
      "role": "Təsisçi",
      "company": "Sahil Studiyası",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Nizami küçəsi 120, Bakı",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Zəng sifariş edin",
      "ctaUrl": "https://"
    },
    "ctaText": "Düymənin mətni",
    "ctaLink": "Düymənin keçidi",
    "hints": {
      "photoUrl": "Kvadrat PNG və ya JPG keçidi, ən azı 144x144 piksel və 200 KB-dan kiçik. Adınızın yanında 72x72 piksel ölçüdə göstərilir.",
      "logoUrl": "Şəffaf və ya ağ fonlu PNG və ya JPG keçidi, hündürlüyü ən azı 64 piksel. 32 piksel hündürlükdə göstərilir.",
      "website": "https:// yazmasanız, biz əlavə edirik.",
      "cta": "Düymənin görünməsi üçün həm mətn, həm keçid lazımdır.",
      "disclaimer": "Aşağıda kiçik şriftlə mətn, məsələn, məxfilik qeydi. Lazım deyilsə, boş qoyun."
    },
    "style": {
      "accent": "Vurğu rəngi",
      "accentHint": "Zolaq, keçidlər və düymə üçün istifadə olunur. Brend rənginizlə başlayır.",
      "font": "Şrift",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Mətn ölçüsü",
      "sizeMd": "Adi",
      "sizeSm": "Kiçik",
      "shape": "Fotonun forması",
      "shapeRound": "Dairəvi",
      "shapeSquare": "Kvadrat"
    },
    "hidden": "gizli",
    "reset": "Yenidən başla",
    "resetConfirm": "Bütün sahələri təmizləmək üçün yenidən seçin"
  }
};
