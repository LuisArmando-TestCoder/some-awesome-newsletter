// tr strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale tr
export default {
  "welcome": {
    "title": "Bültene hoş geldiniz",
    "invitedBy": "{configuratorId} sizi abone olmaya davet etti."
  },
  "email": {
    "title": "Her sayıyı nereye gönderelim?",
    "placeholder": "E-postanız"
  },
  "name": {
    "title": "Adınız nedir?",
    "placeholder": "İsminiz"
  },
  "language": {
    "title": "Hangi dilde okumak istersiniz?"
  },
  "subscribed": {
    "title": "Abone oldunuz",
    "subtitle": "Onay e-postası için gelen kutunuzu kontrol edin.",
    "continueTo": "Devam et",
    "finishingUp": "Bu sayfayı kapatabilirsiniz."
  },
  "form": {
    "heading": "{title} bültenine abone olun",
    "headingFallback": "Bu bültene abone olun",
    "intro": "Yeni sayılar, seçtiğiniz dilde yazılmış olarak e-postayla gelir.",
    "from": "Gönderen: {sender}",
    "emailLabel": "E-posta adresi",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Ad",
    "optional": "isteğe bağlı",
    "nameHint": "Sizi selamlamak için kullanırız. Boş bırakırsanız e-posta adresinizin başını kullanırız.",
    "languageLabel": "Sayılarınızın dili",
    "languageSummary": "Sayılar {language} dilinde.",
    "languageChange": "Değiştir",
    "languageHint": "Bunu tarayıcı ayarlarınızdan seçtik.",
    "submit": "Abone ol",
    "submitting": "Abone olunuyor...",
    "consent": "Abone olarak {sender} tarafından e-posta almayı kabul edersiniz. Her e-postada abonelikten çıkma bağlantısı bulunur.",
    "privacy": "Gizlilik politikası",
    "loadingInfo": "Bülten bilgileri yükleniyor"
  },
  "success": {
    "title": "Gelen kutunuzu kontrol edin",
    "body": "{email} adresine bir onay e-postası gönderdik. Açın ve Aboneliği onayla'yı seçin.",
    "next": "İlk sayınız, onayladıktan sonra {language} dilinde yazılmış olarak gelir.",
    "spam": "Birkaç dakika içinde bir şey gelmezse spam veya Promosyonlar klasörünüze bakın.",
    "changeEmail": "Farklı bir e-posta kullan",
    "continueTo": "{host} sitesine devam et"
  },
  "errors": {
    "emailRequired": "E-posta adresinizi girin.",
    "emailInvalid": "Bu e-posta adresi eksik görünüyor. Kontrol edip tekrar deneyin.",
    "missingLink": "Bu kayıt bağlantısında eksik bilgi var. Gönderenden yeni bir bağlantı isteyin.",
    "notFound": "Bu kayıt bağlantısı artık çalışmıyor. Gönderenden yeni bir bağlantı isteyin.",
    "limit": "Bu bülten şu anda yeni abone alamıyor. Daha sonra tekrar deneyin.",
    "invalid": "Bu adresi kabul edemedik. Kontrol edip tekrar deneyin.",
    "server": "Aboneliğinizi kaydedemedik. Biraz sonra tekrar deneyin.",
    "network": "Sunucuya ulaşamadık. Bağlantınızı kontrol edip tekrar deneyin."
  },
  "confirm": {
    "title": "Aboneliğinizi onaylayın",
    "body": "{email} adresine sayı almaya başlamak için düğmeyi seçin.",
    "button": "Aboneliği onayla",
    "confirming": "Onaylanıyor...",
    "consent": "Onaylayarak bu bülteni e-postayla almayı kabul edersiniz. Herhangi bir sayıdan abonelikten çıkabilirsiniz.",
    "successTitle": "Abone oldunuz",
    "successBody": "Yeni sayılar {email} adresine gelecek.",
    "successTip": "Spam'e düşmemeleri için göndereni kişilerinize ekleyin.",
    "invalidTitle": "Bu bağlantı eksik",
    "invalidBody": "Onay e-postasını tekrar açın ve içindeki düğmeyi seçin. Bulamıyorsanız gönderenin sayfasından yeniden kaydolun.",
    "notFoundBody": "Bu adres için bir kayıt bulamadık. Gönderenin sayfasından yeniden kaydolun.",
    "errorBody": "Aboneliğinizi onaylayamadık. Biraz sonra tekrar deneyin.",
    "retry": "Tekrar dene",
    "home": "Ana sayfaya git"
  },
  "embed": {
    "title": "Sitenize bir kayıt formu ekleyin",
    "intro": "Bu kod parçalarından birini web sitenize yapıştırın. Kaydolan kişiler bir onay e-postası, ardından sayılarınızı kendi dillerinde alır.",
    "linkLabel": "Kayıt sayfası bağlantısı",
    "linkHint": "Bir sosyal medya biyografisinde, e-posta imzasında veya QR kodunda paylaşın.",
    "scriptLabel": "Script etiketi (önerilen)",
    "scriptHint": "Formun görünmesi gereken yere yapıştırın. Form boyutunu kendisi ayarlar.",
    "iframeLabel": "Iframe",
    "iframeHint": "Siteniz script'lere izin vermiyorsa bunu kullanın.",
    "copy": "Kopyala",
    "copied": "Kopyalandı",
    "copyFailed": "Metni seçip elle kopyalayın.",
    "options": "Form seçenekleri",
    "accent": "Düğme rengi",
    "accentHint": "Marka renginizi kullanmak için olduğu gibi bırakın.",
    "theme": "Tema",
    "themeAuto": "Ziyaretçinin ayarına uy",
    "themeLight": "Açık",
    "themeDark": "Koyu",
    "layout": "Düzen",
    "layoutFull": "Tam (başlık, ad ve dil)",
    "layoutCompact": "Kompakt (e-posta ve düğme)",
    "preview": "Önizleme",
    "previewNote": "Önizleme canlıdır. Buradan yapılan bir kayıt gerçek bir abone oluşturur.",
    "missing": "Önce bir bülten oluşturun. Bülten oluşunca kayıt formu burada görünür."
  },
  "page": {
    "poweredBy": "AIBAN ile çalışır",
    "title": "Abone ol"
  },
  "signature": {
    "title": "E-posta imzası",
    "intro": "Okurlar bunu her sayının sonunda görür. Düzenlemek için önizlemenin herhangi bir bölümüne tıklayın.",
    "show": "İmzamı her sayıda göster",
    "showHint": "Kapatırsanız sayılar makaleden sonra biter.",
    "preview": "Önizleme",
    "previewEmpty": "İmzanız boş. Başlamak için adınızı ekleyin.",
    "articleEnd": "Makalenin sonu",
    "tabContent": "İçerik",
    "tabStyle": "Stil",
    "blocks": "Neler yer alsın",
    "blocksHint": "Bir bölümü göstermek veya gizlemek için etiketini seçin. Gizli bölümler metinlerini korur.",
    "layout": "Düzen",
    "layouts": {
      "bar": "Renk çubuğu",
      "photo": "Fotoğraf",
      "stacked": "Alt alta",
      "centered": "Ortalanmış",
      "minimal": "Yalnızca metin"
    },
    "fields": {
      "name": "Ad",
      "role": "Unvan",
      "company": "Şirket",
      "phone": "Telefon",
      "email": "E-posta",
      "website": "Web sitesi",
      "address": "Adres",
      "photoUrl": "Fotoğraf",
      "logoUrl": "Logo",
      "socials": "Sosyal medya bağlantıları",
      "cta": "Düğme",
      "disclaimer": "Yasal not"
    },
    "groups": {
      "about": "Hakkınızda",
      "contact": "İletişim",
      "images": "Görseller",
      "socials": "Sosyal medya bağlantıları",
      "cta": "Düğme",
      "disclaimer": "Yasal not"
    },
    "placeholders": {
      "name": "Ayşe Yılmaz",
      "role": "Kurucu",
      "company": "Kıyı Stüdyo",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Atatürk Caddesi No: 120, İzmir",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Görüşme planlayın",
      "ctaUrl": "https://"
    },
    "ctaText": "Düğme metni",
    "ctaLink": "Düğme bağlantısı",
    "hints": {
      "photoUrl": "Kare bir PNG veya JPG bağlantısı; en az 144 x 144 piksel ve 200 KB'tan küçük olmalı. Adınızın yanında 72 x 72 piksel gösterilir.",
      "logoUrl": "Şeffaf veya beyaz arka planlı bir PNG ya da JPG bağlantısı; en az 64 piksel yüksekliğinde olmalı. 32 piksel yüksekliğinde gösterilir.",
      "website": "Yazmazsanız https:// ekleriz.",
      "cta": "Düğmenin görünmesi için hem metin hem bağlantı gerekir.",
      "disclaimer": "Altta küçük yazı, örneğin bir gizlilik notu. İhtiyacınız yoksa boş bırakın."
    },
    "style": {
      "accent": "Vurgu rengi",
      "accentHint": "Çubuk, bağlantılar ve düğme için kullanılır. Marka renginizle başlar.",
      "font": "Yazı tipi",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Metin boyutu",
      "sizeMd": "Normal",
      "sizeSm": "Küçük",
      "shape": "Fotoğraf şekli",
      "shapeRound": "Yuvarlak",
      "shapeSquare": "Kare"
    },
    "hidden": "gizli",
    "reset": "Baştan başla",
    "resetConfirm": "Tüm alanları temizlemek için tekrar seçin"
  }
};
