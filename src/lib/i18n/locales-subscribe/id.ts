// id strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale id
export default {
  "welcome": {
    "title": "Selamat datang di buletin",
    "invitedBy": "{configuratorId} mengundang Anda untuk berlangganan."
  },
  "email": {
    "title": "Ke mana kami harus mengirim setiap edisi?",
    "placeholder": "Email Anda"
  },
  "name": {
    "title": "Siapa nama Anda?",
    "placeholder": "Nama Anda"
  },
  "language": {
    "title": "Dalam bahasa apa Anda ingin membaca?"
  },
  "subscribed": {
    "title": "Anda sudah berlangganan",
    "subtitle": "Periksa kotak masuk Anda untuk email konfirmasi.",
    "continueTo": "Lanjutkan ke",
    "finishingUp": "Anda bisa menutup halaman ini."
  },
  "form": {
    "heading": "Berlangganan {title}",
    "headingFallback": "Berlangganan buletin ini",
    "intro": "Edisi baru tiba lewat email, ditulis dalam bahasa yang Anda pilih.",
    "from": "Dari {sender}",
    "emailLabel": "Alamat email",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Nama depan",
    "optional": "opsional",
    "nameHint": "Kami memakainya untuk menyapa Anda. Jika kosong, kami memakai bagian awal alamat email Anda.",
    "languageLabel": "Bahasa edisi Anda",
    "languageSummary": "Edisi dalam bahasa {language}.",
    "languageChange": "Ubah",
    "languageHint": "Kami memilihnya dari pengaturan browser Anda.",
    "submit": "Berlangganan",
    "submitting": "Sedang mendaftarkan...",
    "consent": "Dengan berlangganan, Anda setuju menerima email dari {sender}. Setiap email memiliki tautan berhenti berlangganan.",
    "privacy": "Kebijakan privasi",
    "loadingInfo": "Memuat detail buletin"
  },
  "success": {
    "title": "Periksa kotak masuk Anda",
    "body": "Kami mengirim email konfirmasi ke {email}. Buka email itu dan pilih Konfirmasi langganan.",
    "next": "Edisi pertama Anda tiba setelah Anda mengonfirmasi, ditulis dalam bahasa {language}.",
    "spam": "Jika tidak ada yang masuk dalam beberapa menit, periksa folder spam atau Promosi.",
    "changeEmail": "Gunakan email lain",
    "continueTo": "Lanjutkan ke {host}"
  },
  "errors": {
    "emailRequired": "Masukkan alamat email Anda.",
    "emailInvalid": "Alamat email ini terlihat belum lengkap. Periksa dan coba lagi.",
    "missingLink": "Tautan pendaftaran ini kekurangan informasi. Minta tautan baru kepada pengirim.",
    "notFound": "Tautan pendaftaran ini sudah tidak berlaku. Minta tautan baru kepada pengirim.",
    "limit": "Buletin ini sedang tidak bisa menerima pelanggan baru. Coba lagi nanti.",
    "invalid": "Kami tidak bisa menerima alamat ini. Periksa dan coba lagi.",
    "server": "Kami tidak bisa menyimpan langganan Anda. Coba lagi sebentar lagi.",
    "network": "Kami tidak bisa menghubungi server. Periksa koneksi Anda dan coba lagi."
  },
  "confirm": {
    "title": "Konfirmasi langganan Anda",
    "body": "Pilih tombol untuk mulai menerima edisi di {email}.",
    "button": "Konfirmasi langganan",
    "confirming": "Mengonfirmasi...",
    "consent": "Dengan mengonfirmasi, Anda setuju menerima buletin ini lewat email. Anda bisa berhenti berlangganan dari edisi mana pun.",
    "successTitle": "Anda sudah berlangganan",
    "successBody": "Edisi baru akan dikirim ke {email}.",
    "successTip": "Agar tidak masuk spam, tambahkan pengirim ke kontak Anda.",
    "invalidTitle": "Tautan ini tidak lengkap",
    "invalidBody": "Buka lagi email konfirmasi dan pilih tombolnya. Jika Anda tidak menemukannya, daftar lagi dari halaman pengirim.",
    "notFoundBody": "Kami tidak menemukan pendaftaran untuk alamat ini. Daftar lagi dari halaman pengirim.",
    "errorBody": "Kami tidak bisa mengonfirmasi langganan Anda. Coba lagi sebentar lagi.",
    "retry": "Coba lagi",
    "home": "Ke beranda"
  },
  "embed": {
    "title": "Tambahkan formulir pendaftaran ke situs Anda",
    "intro": "Tempelkan salah satu potongan kode ini ke situs web Anda. Orang yang mendaftar akan menerima email konfirmasi, lalu edisi Anda dalam bahasa mereka sendiri.",
    "linkLabel": "Tautan halaman pendaftaran",
    "linkHint": "Bagikan di bio media sosial, tanda tangan email, atau kode QR.",
    "scriptLabel": "Tag script (disarankan)",
    "scriptHint": "Tempelkan di tempat formulir harus muncul. Ukuran formulir menyesuaikan sendiri.",
    "iframeLabel": "Iframe",
    "iframeHint": "Gunakan ini jika situs Anda tidak mengizinkan script.",
    "copy": "Salin",
    "copied": "Disalin",
    "copyFailed": "Pilih teksnya dan salin secara manual.",
    "options": "Opsi formulir",
    "accent": "Warna tombol",
    "accentHint": "Biarkan apa adanya untuk memakai warna merek Anda.",
    "theme": "Tema",
    "themeAuto": "Ikuti pengaturan pengunjung",
    "themeLight": "Terang",
    "themeDark": "Gelap",
    "layout": "Tata letak",
    "layoutFull": "Lengkap (judul, nama, dan bahasa)",
    "layoutCompact": "Ringkas (email dan tombol)",
    "preview": "Pratinjau",
    "previewNote": "Pratinjau ini aktif. Pendaftaran di sini membuat pelanggan sungguhan.",
    "missing": "Buat buletin terlebih dahulu. Formulir pendaftaran muncul di sini setelah buletin ada."
  },
  "page": {
    "poweredBy": "Berjalan dengan AIBAN",
    "title": "Berlangganan"
  },
  "signature": {
    "title": "Tanda tangan email",
    "intro": "Pembaca melihat ini di akhir setiap edisi. Klik bagian mana pun di pratinjau untuk mengeditnya.",
    "show": "Tampilkan tanda tangan saya di setiap edisi",
    "showHint": "Jika dinonaktifkan, edisi berakhir setelah artikel.",
    "preview": "Pratinjau",
    "previewEmpty": "Tanda tangan Anda kosong. Tambahkan nama Anda untuk memulai.",
    "articleEnd": "Akhir artikel",
    "tabContent": "Konten",
    "tabStyle": "Gaya",
    "blocks": "Apa yang disertakan",
    "blocksHint": "Pilih tag untuk menampilkan atau menyembunyikan bagian itu. Bagian yang disembunyikan tetap menyimpan teksnya.",
    "layout": "Tata letak",
    "layouts": {
      "bar": "Bilah warna",
      "photo": "Foto",
      "stacked": "Bertumpuk",
      "centered": "Rata tengah",
      "minimal": "Teks saja"
    },
    "fields": {
      "name": "Nama",
      "role": "Jabatan",
      "company": "Perusahaan",
      "phone": "Telepon",
      "email": "Email",
      "website": "Situs web",
      "address": "Alamat",
      "photoUrl": "Foto",
      "logoUrl": "Logo",
      "socials": "Tautan media sosial",
      "cta": "Tombol",
      "disclaimer": "Catatan hukum"
    },
    "groups": {
      "about": "Tentang Anda",
      "contact": "Kontak",
      "images": "Gambar",
      "socials": "Tautan media sosial",
      "cta": "Tombol",
      "disclaimer": "Catatan hukum"
    },
    "placeholders": {
      "name": "Rina Wijaya",
      "role": "Pendiri",
      "company": "Studio Tepi Sungai",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Jl. Merdeka No. 120, Bandung",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Jadwalkan panggilan",
      "ctaUrl": "https://"
    },
    "ctaText": "Teks tombol",
    "ctaLink": "Tautan tombol",
    "hints": {
      "photoUrl": "Tautan ke PNG atau JPG persegi, minimal 144 x 144 piksel dan di bawah 200 KB. Ditampilkan 72 x 72 piksel di samping nama Anda.",
      "logoUrl": "Tautan ke PNG atau JPG dengan latar transparan atau putih, tinggi minimal 64 piksel. Ditampilkan setinggi 32 piksel.",
      "website": "Kami menambahkan https:// jika Anda tidak menulisnya.",
      "cta": "Teks dan tautan sama-sama diperlukan agar tombol tampil.",
      "disclaimer": "Tulisan kecil di bagian bawah, misalnya catatan kerahasiaan. Kosongkan jika Anda tidak memerlukannya."
    },
    "style": {
      "accent": "Warna aksen",
      "accentHint": "Dipakai untuk bilah, tautan, dan tombol. Dimulai dengan warna merek Anda.",
      "font": "Font",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Ukuran teks",
      "sizeMd": "Normal",
      "sizeSm": "Kecil",
      "shape": "Bentuk foto",
      "shapeRound": "Bulat",
      "shapeSquare": "Persegi"
    },
    "hidden": "tersembunyi",
    "reset": "Mulai dari awal",
    "resetConfirm": "Pilih lagi untuk mengosongkan semua kolom"
  }
};
