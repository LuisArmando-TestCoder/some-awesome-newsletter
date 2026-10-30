// ms strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale ms
export default {
  "welcome": {
    "title": "Selamat datang ke buletin ini",
    "invitedBy": "{configuratorId} menjemput anda untuk melanggan."
  },
  "email": {
    "title": "Ke mana kami patut hantar setiap terbitan?",
    "placeholder": "E-mel anda"
  },
  "name": {
    "title": "Siapa nama anda?",
    "placeholder": "Nama anda"
  },
  "language": {
    "title": "Dalam bahasa apa anda mahu membaca?"
  },
  "subscribed": {
    "title": "Anda sudah melanggan",
    "subtitle": "Semak peti masuk anda untuk e-mel pengesahan.",
    "continueTo": "Teruskan ke",
    "finishingUp": "Anda boleh tutup halaman ini."
  },
  "form": {
    "heading": "Langgan {title}",
    "headingFallback": "Langgan buletin ini",
    "intro": "Terbitan baharu tiba melalui e-mel, ditulis dalam bahasa yang anda pilih.",
    "from": "Daripada {sender}",
    "emailLabel": "Alamat e-mel",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Nama pertama",
    "optional": "pilihan",
    "nameHint": "Kami gunakannya untuk menyapa anda. Jika dibiarkan kosong, kami gunakan bahagian awal alamat e-mel anda.",
    "languageLabel": "Bahasa terbitan anda",
    "languageSummary": "Terbitan dalam {language}.",
    "languageChange": "Tukar",
    "languageHint": "Kami memilih ini berdasarkan tetapan pelayar anda.",
    "submit": "Langgan",
    "submitting": "Sedang melanggan...",
    "consent": "Dengan melanggan, anda bersetuju menerima e-mel daripada {sender}. Setiap e-mel ada pautan untuk berhenti melanggan.",
    "privacy": "Dasar privasi",
    "loadingInfo": "Memuatkan butiran buletin"
  },
  "success": {
    "title": "Semak peti masuk anda",
    "body": "Kami telah menghantar e-mel pengesahan ke {email}. Buka e-mel itu dan pilih Sahkan langganan.",
    "next": "Terbitan pertama anda tiba selepas anda mengesahkan, ditulis dalam {language}.",
    "spam": "Jika tiada apa-apa tiba dalam beberapa minit, semak folder spam atau Promosi.",
    "changeEmail": "Guna e-mel lain",
    "continueTo": "Teruskan ke {host}"
  },
  "errors": {
    "emailRequired": "Masukkan alamat e-mel anda.",
    "emailInvalid": "Alamat e-mel ini nampaknya tidak lengkap. Semak dan cuba lagi.",
    "missingLink": "Pautan pendaftaran ini kekurangan maklumat. Minta pautan baharu daripada penghantar.",
    "notFound": "Pautan pendaftaran ini tidak berfungsi lagi. Minta pautan baharu daripada penghantar.",
    "limit": "Buletin ini tidak dapat menerima pelanggan baharu buat masa ini. Cuba lagi kemudian.",
    "invalid": "Kami tidak dapat menerima alamat ini. Semak dan cuba lagi.",
    "server": "Kami tidak dapat menyimpan langganan anda. Cuba lagi sebentar lagi.",
    "network": "Kami tidak dapat menghubungi pelayan. Semak sambungan anda dan cuba lagi."
  },
  "confirm": {
    "title": "Sahkan langganan anda",
    "body": "Pilih butang untuk mula menerima terbitan di {email}.",
    "button": "Sahkan langganan",
    "confirming": "Sedang mengesahkan...",
    "consent": "Dengan mengesahkan, anda bersetuju menerima buletin ini melalui e-mel. Anda boleh berhenti melanggan daripada mana-mana terbitan.",
    "successTitle": "Anda sudah melanggan",
    "successBody": "Terbitan baharu akan tiba di {email}.",
    "successTip": "Supaya ia tidak masuk ke spam, tambahkan penghantar ke kenalan anda.",
    "invalidTitle": "Pautan ini tidak lengkap",
    "invalidBody": "Buka semula e-mel pengesahan dan pilih butangnya. Jika anda tidak menemuinya, daftar semula dari halaman penghantar.",
    "notFoundBody": "Kami tidak menemui pendaftaran untuk alamat ini. Daftar semula dari halaman penghantar.",
    "errorBody": "Kami tidak dapat mengesahkan langganan anda. Cuba lagi sebentar lagi.",
    "retry": "Cuba lagi",
    "home": "Pergi ke halaman utama"
  },
  "embed": {
    "title": "Tambah borang pendaftaran ke laman anda",
    "intro": "Tampal salah satu kod ini ke laman web anda. Orang yang mendaftar menerima e-mel pengesahan, kemudian terbitan anda dalam bahasa mereka sendiri.",
    "linkLabel": "Pautan halaman pendaftaran",
    "linkHint": "Kongsikannya dalam bio media sosial, tandatangan e-mel atau kod QR.",
    "scriptLabel": "Tag skrip (disyorkan)",
    "scriptHint": "Tampalkannya di tempat borang patut muncul. Saiz borang menyesuaikan diri secara automatik.",
    "iframeLabel": "Iframe",
    "iframeHint": "Gunakan ini jika laman anda tidak membenarkan skrip.",
    "copy": "Salin",
    "copied": "Disalin",
    "copyFailed": "Pilih teks dan salin secara manual.",
    "options": "Pilihan borang",
    "accent": "Warna butang",
    "accentHint": "Biarkan seperti asal untuk menggunakan warna jenama anda.",
    "theme": "Tema",
    "themeAuto": "Ikut tetapan pelawat",
    "themeLight": "Cerah",
    "themeDark": "Gelap",
    "layout": "Susun atur",
    "layoutFull": "Penuh (tajuk, nama dan bahasa)",
    "layoutCompact": "Padat (e-mel dan butang)",
    "preview": "Pratonton",
    "previewNote": "Pratonton ini berfungsi sebenar. Pendaftaran di sini mencipta pelanggan sebenar.",
    "missing": "Cipta buletin dahulu. Borang pendaftaran akan muncul di sini selepas itu."
  },
  "page": {
    "poweredBy": "Dijalankan oleh AIBAN",
    "title": "Langgan"
  },
  "signature": {
    "title": "Tandatangan e-mel",
    "intro": "Pembaca melihat ini di hujung setiap terbitan. Klik mana-mana bahagian pratonton untuk menyuntingnya.",
    "show": "Tunjukkan tandatangan saya dalam setiap terbitan",
    "showHint": "Jika dimatikan, terbitan berakhir selepas artikel.",
    "preview": "Pratonton",
    "previewEmpty": "Tandatangan anda kosong. Tambah nama anda untuk bermula.",
    "articleEnd": "Hujung artikel",
    "tabContent": "Kandungan",
    "tabStyle": "Gaya",
    "blocks": "Apa yang hendak dimasukkan",
    "blocksHint": "Pilih tag untuk menunjukkan atau menyembunyikan bahagian itu. Bahagian tersembunyi mengekalkan teksnya.",
    "layout": "Susun atur",
    "layouts": {
      "bar": "Bar warna",
      "photo": "Foto",
      "stacked": "Bertindan",
      "centered": "Di tengah",
      "minimal": "Teks sahaja"
    },
    "fields": {
      "name": "Nama",
      "role": "Jawatan",
      "company": "Syarikat",
      "phone": "Telefon",
      "email": "E-mel",
      "website": "Laman web",
      "address": "Alamat",
      "photoUrl": "Foto",
      "logoUrl": "Logo",
      "socials": "Pautan media sosial",
      "cta": "Butang",
      "disclaimer": "Nota undang-undang"
    },
    "groups": {
      "about": "Tentang anda",
      "contact": "Hubungan",
      "images": "Imej",
      "socials": "Pautan media sosial",
      "cta": "Butang",
      "disclaimer": "Nota undang-undang"
    },
    "placeholders": {
      "name": "Aisyah Rahman",
      "role": "Pengasas",
      "company": "Studio Tepi Sungai",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Jalan Utama, Kuala Lumpur",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Tempah panggilan",
      "ctaUrl": "https://"
    },
    "ctaText": "Teks butang",
    "ctaLink": "Pautan butang",
    "hints": {
      "photoUrl": "Pautan ke PNG atau JPG segi empat sama, sekurang-kurangnya 144 x 144 piksel dan di bawah 200 KB. Dipaparkan pada 72 x 72 piksel di sebelah nama anda.",
      "logoUrl": "Pautan ke PNG atau JPG dengan latar lutsinar atau putih, sekurang-kurangnya 64 piksel tinggi. Dipaparkan setinggi 32 piksel.",
      "website": "Kami tambah https:// jika anda tidak menulisnya.",
      "cta": "Teks dan pautan kedua-duanya diperlukan supaya butang dipaparkan.",
      "disclaimer": "Cetakan kecil di bahagian bawah, contohnya nota kerahsiaan. Biarkan kosong jika anda tidak memerlukannya."
    },
    "style": {
      "accent": "Warna aksen",
      "accentHint": "Digunakan untuk bar, pautan dan butang. Bermula dengan warna jenama anda.",
      "font": "Fon",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Saiz teks",
      "sizeMd": "Biasa",
      "sizeSm": "Kecil",
      "shape": "Bentuk foto",
      "shapeRound": "Bulat",
      "shapeSquare": "Segi empat"
    },
    "hidden": "tersembunyi",
    "reset": "Mula semula",
    "resetConfirm": "Pilih sekali lagi untuk mengosongkan semua medan"
  }
};
