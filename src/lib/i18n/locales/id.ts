// id strings for locales. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale id
export default {
  "auth": {
    "logo": "/icons/logo.png",
    "login": {
      "pageTitle": "Masuk",
      "title": "Masuk ke AIBAN",
      "subtitle": "Hubungkan untuk melanjutkan aktivitas terakhir Anda.",
      "google": "Lanjutkan dengan Google",
      "or": "atau",
      "emailPlaceholder": "anda@contoh.com",
      "continueWithEmail": "Lanjutkan dengan email",
      "switchText": "Belum punya akun?",
      "switchLink": "Daftar",
      "switchHref": "/signup"
    },
    "signup": {
      "pageTitle": "Daftar",
      "title": "Buat akun Anda",
      "subtitle": "Anda tidak memerlukan kartu kredit.",
      "google": "Lanjutkan dengan Google",
      "or": "atau",
      "emailPlaceholder": "anda@contoh.com",
      "continueWithEmail": "Lanjutkan dengan email",
      "switchText": "Sudah punya akun?",
      "switchLink": "Masuk",
      "switchHref": "/login"
    }
  },
  "landing": {
    "seo": {
      "title": "AIBAN | Situs web Anda, diubah menjadi buletin dalam bahasa setiap pembaca",
      "description": "AIBAN membaca apa yang sudah Anda terbitkan, menulis edisi buletin dengan gaya bahasa Anda, dan mengirimkannya atas nama Anda. Setiap pelanggan menerimanya dalam bahasa mereka sendiri.",
      "ogImageAlt": "Logo AIBAN"
    },
    "skipLink": "Langsung ke konten utama",
    "hero": {
      "eyebrow": "Buletin untuk bisnis jasa",
      "title": "Situs web Anda menjadi buletin mingguan, dalam bahasa setiap pembaca",
      "lead": "AIBAN membaca konten yang sudah Anda terbitkan, menulis edisi dengan gaya bahasa Anda, dan mengirimkannya atas nama Anda. Setiap pelanggan menerimanya dalam bahasa yang mereka baca. Anda cukup menyiapkannya sekali, lalu buletin terus berjalan.",
      "formLabel": "Situs web Anda",
      "formPlaceholder": "perusahaananda.com",
      "formHint": "Kami membuat contoh edisi dari alamat yang Anda masukkan. Memulai itu gratis dan Anda tidak memerlukan kartu.",
      "formSubmit": "Pratinjau buletin saya",
      "formError": "Masukkan alamat web seperti perusahaananda.com.",
      "secondaryCta": "Lihat cara kerjanya"
    },
    "preview": {
      "badge": "Contoh pratinjau",
      "note": "Ini contoh tata letak dengan teks pengganti. Saat Anda mulai, AIBAN menulis edisi sebenarnya dari artikel terbaru Anda.",
      "fromLabel": "Dari",
      "toLabel": "Kepada",
      "subjectLabel": "Subjek",
      "languageLabel": "Bahasa pembaca",
      "readOnBlog": "Baca di blog",
      "startCta": "Mulai gratis dengan {site}",
      "startCtaGeneric": "Mulai gratis",
      "liveRegion": "Contoh pratinjau diperbarui untuk {site}."
    },
    "chain": {
      "eyebrow": "Cara kerjanya",
      "title": "Satu masukan, lalu berjalan sendiri",
      "lead": "Anda memberikan situs web Anda kepada AIBAN sekali. Setelah itu, setiap langkah di bawah terjadi dengan sendirinya, sesuai jadwal yang Anda pilih.",
      "triggerLabel": "Ketika",
      "actionLabel": "Lalu",
      "trigger": {
        "title": "Saat Senin pukul 9.00",
        "body": "Atau jadwal apa pun yang Anda pilih: harian, mingguan, atau bulanan."
      },
      "steps": [
        {
          "title": "AIBAN menemukan artikel terbaru Anda",
          "body": "AIBAN memeriksa situs web Anda dan memilih tulisan yang paling menarik bagi pembaca ideal Anda."
        },
        {
          "title": "AIBAN menulis edisi dengan gaya bahasa Anda",
          "body": "Teksnya ditulis ulang agar terdengar seperti Anda, berdasarkan cara situs Anda ditulis."
        },
        {
          "title": "AIBAN menerjemahkan edisi untuk setiap pembaca",
          "body": "Setiap pelanggan menerima bahasa yang mereka pilih saat mendaftar."
        },
        {
          "title": "Dikirim atas nama Anda",
          "body": "Pembaca melihat nama Anda, dan balasan mereka masuk ke kotak masuk Anda."
        },
        {
          "title": "AIBAN menerbitkan edisi di blog Anda",
          "body": "Setiap edisi juga mendapat halaman artikel publik dengan tautannya sendiri."
        },
        {
          "title": "AIBAN menunjukkan apa yang terjadi",
          "body": "Dasbor Anda mencantumkan siapa yang bergabung dan tautan mana yang diklik pembaca."
        }
      ],
      "alsoTitle": "AIBAN juga berjalan saat",
      "also": [
        {
          "title": "Seseorang mendaftar di situs Anda",
          "body": "Mereka mengonfirmasi lewat email dan mulai menerima edisi Anda."
        },
        {
          "title": "Anda menempelkan tautan atau teks",
          "body": "AIBAN menulis dan mengirim edisi tentang hal itu melalui langkah yang sama."
        },
        {
          "title": "Anda mengunggah daftar kontak",
          "body": "AIBAN membersihkan daftar, menghapus duplikat, dan menebak bahasa setiap kontak."
        }
      ]
    },
    "languages": {
      "eyebrow": "Setiap bahasa",
      "title": "Setiap pembaca menerima edisi dalam bahasanya sendiri",
      "body": "Anda tidak perlu menulis versi terpisah. AIBAN menerjemahkan setiap edisi ke semua bahasa yang dibaca pelanggan Anda dan menjaga nada Anda di masing-masing bahasa. Daftarnya mencakup bahasa Spanyol, Portugis, Prancis, Jerman, Hindi, Arab, Jepang, dan banyak lagi.",
      "sampleNote": "Contoh edisi yang sama, seperti yang diterima tiga pembaca."
    },
    "sender": {
      "eyebrow": "Alamat Anda",
      "title": "Dikirim atas nama Anda",
      "body": "Edisi tiba dengan nama dan tanda tangan email Anda. AIBAN mengirimkannya dari alamatnya sendiri yang sudah terverifikasi, jadi Anda tidak perlu membagikan kata sandi email kepada kami. Saat pembaca membalas, balasannya masuk ke kotak masuk Anda.",
      "inboxLabel": "Tampilannya di kotak masuk pembaca",
      "inboxFrom": "Anda",
      "inboxSubject": "Minggu ini dari {site}",
      "inboxSnippet": "Ringkasan singkat artikel terbaru Anda, ditulis dengan gaya bahasa Anda.",
      "inboxTime": "9:00"
    },
    "grow": {
      "eyebrow": "Kembangkan daftar Anda",
      "title": "Formulir pendaftaran untuk situs Anda dan blog yang terisi sendiri",
      "items": [
        {
          "title": "Formulir pendaftaran",
          "body": "Tambahkan formulir AIBAN ke situs web Anda. Pembaca baru memilih bahasa mereka dan mengonfirmasi lewat email."
        },
        {
          "title": "Blog otomatis",
          "body": "Setiap edisi menjadi halaman artikel publik yang bisa ditemukan di mesin pencari dan dibagikan lewat tautan."
        },
        {
          "title": "Impor kontak",
          "body": "Bawa klien yang sudah Anda miliki dari file CSV atau Excel, atau tempelkan daftar."
        }
      ]
    },
    "useCases": {
      "eyebrow": "Untuk siapa",
      "title": "Dibuat untuk bisnis yang tumbuh lewat hubungan",
      "lead": "Jika klien Anda datang dari rekomendasi dan kepercayaan, catatan rutin dari Anda membuat mereka tetap ingat Anda. AIBAN menuliskan catatan itu untuk Anda.",
      "items": [
        {
          "title": "Agensi dan desainer web",
          "body": "Kirim karya dan artikel terbaru Anda kepada klien dan calon klien setiap minggu, dan jalankan pengaturan yang sama untuk situs klien."
        },
        {
          "title": "Perusahaan TI dan perangkat lunak",
          "body": "Ubah catatan rilis dan postingan blog menjadi pembaruan singkat yang dibaca setiap klien dalam bahasanya."
        },
        {
          "title": "Properti",
          "body": "Bagikan listing baru dan tulisan tentang pasar kepada pembeli dan penjual yang berbicara bahasa berbeda."
        },
        {
          "title": "Pengacara dan akuntan",
          "body": "Beri klien informasi tentang topik yang sudah Anda tulis, dalam format yang tenang dan konsisten."
        },
        {
          "title": "Coach dan pelatih",
          "body": "Kirim pelajaran atau artikel terbaru Anda ke komunitas pada hari tertentu, tanpa menulisnya lagi."
        }
      ]
    },
    "pricingIntro": {
      "eyebrow": "Harga",
      "title": "Mulai gratis, tingkatkan saat daftar Anda bertambah",
      "lead": "Paket gratis mencakup 1 sumber dan hingga 100 pelanggan. Paket berbayar menambah sumber dan pelanggan."
    },
    "faqTitle": "Pertanyaan yang sering diajukan sebelum memulai",
    "faq": [
      {
        "id": "what-do-i-need",
        "q": "Apa yang saya perlukan untuk memulai?",
        "a": "Alamat situs web Anda dan alamat email. AIBAN membaca situs Anda untuk mempelajari topik dan cara Anda menulis."
      },
      {
        "id": "do-i-write",
        "q": "Apakah saya harus menulis sesuatu?",
        "a": "Tidak harus. AIBAN menulis setiap edisi dari konten Anda. Jika Anda ingin edisi tentang hal tertentu, Anda bisa menempelkan tautan atau teks."
      },
      {
        "id": "languages",
        "q": "Dalam bahasa apa pembaca saya bisa menerimanya?",
        "a": "AIBAN menerjemahkan setiap edisi ke bahasa yang dibaca setiap pelanggan. Anda bisa melihat daftar lengkap bahasa saat menyiapkan buletin."
      },
      {
        "id": "sender",
        "q": "Dari siapa email dikirim?",
        "a": "Dari alamat pengiriman AIBAN, dengan nama Anda sebagai pengirim. Balasan langsung masuk ke kotak masuk Anda. Anda tidak pernah memberi kami kata sandi email."
      },
      {
        "id": "contacts",
        "q": "Bisakah saya membawa kontak yang sudah ada?",
        "a": "Bisa. Unggah file CSV atau Excel, atau tempelkan daftar. AIBAN membersihkannya, menghapus duplikat, dan menebak bahasa setiap kontak."
      },
      {
        "id": "schedule",
        "q": "Seberapa sering edisi dikirim?",
        "a": "Anda memilih jadwal saat penyiapan, dan Anda bisa mengubahnya kapan saja di dasbor."
      },
      {
        "id": "free-plan",
        "q": "Apakah ada paket gratis?",
        "a": "Ada. Paket gratis mencakup 1 sumber dan hingga 100 pelanggan. Paket berbayar menambah sumber dan pelanggan."
      },
      {
        "id": "cancel",
        "q": "Bisakah saya membatalkan?",
        "a": "Bisa. Tulis ke info@aiban.news kapan saja dan kami akan membatalkan paket berbayar Anda atau mengembalikan Anda ke paket Gratis."
      }
    ],
    "finalCta": {
      "title": "Mulai dengan situs web Anda",
      "body": "Berikan situs web Anda kepada AIBAN, periksa edisi pertama Anda, lalu aktifkan saat Anda siap.",
      "cta": "Mulai gratis",
      "secondary": "Baca pusat bantuan"
    },
    "footer": {
      "tagline": "Buletin yang ditulis dari konten Anda sendiri dan dikirim dalam bahasa setiap pembaca.",
      "product": "Produk",
      "company": "Perusahaan",
      "legal": "Legal",
      "links": {
        "howItWorks": "Cara kerjanya",
        "pricing": "Harga",
        "demo": "Demo",
        "help": "Pusat bantuan",
        "about": "Tentang",
        "careers": "Karier",
        "privacy": "Kebijakan privasi",
        "terms": "Ketentuan layanan",
        "cookies": "Kebijakan cookie"
      },
      "contactLabel": "Kontak",
      "rights": "Hak cipta dilindungi."
    }
  },
  "help": {
    "title": "Minta batas yang lebih tinggi",
    "subtitle": "Beri tahu kami batas yang Anda perlukan dan kami akan membalas lewat email.",
    "contact": {
      "cta": "Kirim permintaan",
      "successTitle": "Permintaan siap dikirim",
      "successBody": "Aplikasi email Anda terbuka dengan permintaan Anda. Kirim dari sana dan kami akan membalas lewat email.",
      "learnMore": "/plans"
    },
    "questions": {
      "desiredLimitsHelp": "Tulis batas yang Anda perlukan, misalnya berapa pelanggan dan sumber.",
      "useCaseHelp": "Jelaskan apa yang Anda kirim, kepada siapa, dan seberapa sering.",
      "expectedSpendHelp": "Perkiraan kasar membantu kami menyarankan paket. Anda bisa membiarkannya sebagai tidak diketahui."
    },
    "form": {
      "nameLabel": "Nama",
      "emailLabel": "Email",
      "companyLabel": "Perusahaan",
      "optional": "(opsional)",
      "limitsLabel": "Batas yang Anda perlukan",
      "useCaseLabel": "Cara Anda menggunakan AIBAN",
      "spendLabel": "Perkiraan pengeluaran bulanan",
      "spend": {
        "lt500": "Kurang dari $500",
        "500_2k": "$500 sampai $2.000",
        "2k_10k": "$2.000 sampai $10.000",
        "gt10k": "Lebih dari $10.000",
        "unknown": "Saya belum tahu"
      },
      "urgencyLabel": "Tingkat urgensi",
      "urgency": {
        "low": "Rendah",
        "normal": "Normal",
        "high": "Tinggi"
      },
      "replyLabel": "Bagaimana sebaiknya kami membalas?",
      "reply": {
        "email": "Lewat email",
        "call": "Lewat telepon"
      },
      "payAsYouGo": "Saya tertarik membayar sesuai pemakaian",
      "sending": "Mengirim...",
      "sentTitle": "Permintaan terkirim",
      "sentBody": "Kami sudah menerima permintaan Anda dan akan membalas ke alamat email yang Anda berikan.",
      "retryBefore": "Jika aplikasi email Anda tidak terbuka,",
      "retryLink": "buka permintaan itu lagi",
      "retryAfter": "atau tulis ke",
      "errors": {
        "name": "Masukkan nama Anda (minimal 2 karakter).",
        "email": "Masukkan alamat email yang bisa kami balas, misalnya nama@contoh.com.",
        "company": "Masukkan minimal 2 karakter, atau biarkan kosong.",
        "desiredLimits": "Jelaskan batas yang Anda perlukan dalam minimal 10 karakter.",
        "useCase": "Jelaskan penggunaan Anda dalam minimal 20 karakter."
      }
    },
    "faqs": [
      {
        "id": "limits-how",
        "q": "Bagaimana cara kerja batas yang lebih tinggi?",
        "a": "Kirim permintaan dengan batas yang Anda perlukan. Kami membalas lewat email dengan pilihan untuk akun Anda."
      }
    ],
    "links": {
      "docs": "/plans",
      "community": "/help"
    }
  },
  "faq": [
    {
      "q": "Apa yang dilakukan AIBAN?",
      "a": "AIBAN membaca konten yang sudah Anda terbitkan, seperti situs web, blog, atau situs berita yang Anda pilih. AIBAN menulis edisi baru dengan gaya bahasa Anda dan mengirimkannya sebagai buletin. Setiap pelanggan menerimanya dalam bahasa yang mereka pilih, dengan nama Anda sebagai pengirim."
    },
    {
      "q": "Apakah ada paket gratis?",
      "a": "Ada. Paket Gratis mencakup 1 sumber dan hingga 100 pelanggan. Jika Anda memerlukan lebih banyak, tulis kepada kami dan kami akan mengubah paket Anda."
    },
    {
      "q": "Bagaimana pelanggan menerima buletin dalam bahasa mereka?",
      "a": "Setiap pelanggan memilih bahasa pilihan saat mendaftar. AIBAN menerjemahkan setiap edisi ke bahasa itu sebelum mengirimkannya."
    },
    {
      "q": "Bisakah edisi dikirim dari alamat email saya sendiri?",
      "a": "Edisi dikirim dari alamat pengiriman AIBAN dengan nama dan tanda tangan email Anda, dan balasan masuk ke kotak masuk Anda. Kami tidak meminta kata sandi email Anda, jadi tidak ada data Anda yang bisa bocor."
    },
    {
      "q": "Bagaimana orang berlangganan?",
      "a": "Anda mendapat halaman pendaftaran dan widget pendaftaran yang bisa dipasang di situs web Anda. Anda juga bisa menambahkan orang sendiri atau mengunggah daftar."
    },
    {
      "q": "Bisakah saya membatalkan kapan saja?",
      "a": "Bisa. Tulis ke info@aiban.news kapan saja dan kami akan membatalkan paket berbayar Anda atau mengembalikan Anda ke paket Gratis."
    }
  ],
  "plans": {
    "currency": "USD",
    "billingIntervals": [
      "bulanan",
      "tahunan"
    ],
    "currentPlan": "gratis",
    "plans": [
      {
        "id": "free",
        "name": "Gratis",
        "monthly": 0,
        "yearly": 0,
        "tagline": "Coba AIBAN dengan satu sumber",
        "featuresBase": [
          "1 sumber",
          "Hingga 100 pelanggan"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": 1,
          "users": 100
        },
        "ctaLabel": "Paket saat ini",
        "tier": 0
      },
      {
        "id": "starter",
        "name": "Starter",
        "monthly": 17,
        "yearly": 132,
        "tagline": "Untuk buletin yang sedang berkembang",
        "featuresBase": [
          "5 sumber",
          "Hingga 100 ribu pelanggan"
        ],
        "featuresDelta": [
          "Dukungan email",
          "Terjemahan dasar"
        ],
        "limits": {
          "newsSources": 5,
          "users": 100000
        },
        "ctaLabel": "Pilih Starter",
        "productId": "prod_starter_id",
        "tier": 1
      },
      {
        "id": "growth",
        "name": "Growth",
        "monthly": 35,
        "yearly": 273,
        "tagline": "Untuk buletin yang sudah mapan",
        "featuresBase": [
          "17 sumber",
          "Hingga 250 ribu pelanggan"
        ],
        "featuresDelta": [
          "Branding khusus",
          "Analitik lanjutan"
        ],
        "limits": {
          "newsSources": 17,
          "users": 250000
        },
        "ctaLabel": "Pilih Growth",
        "productId": "prod_growth_id",
        "tier": 2
      },
      {
        "id": "pro",
        "name": "Pro",
        "monthly": 80,
        "yearly": 624,
        "tagline": "Untuk profesional pemasaran",
        "featuresBase": [
          "25 sumber",
          "Hingga 500 ribu pelanggan"
        ],
        "featuresDelta": [
          "Akses API",
          "Pemrosesan prioritas"
        ],
        "limits": {
          "newsSources": 25,
          "users": 500000
        },
        "ctaLabel": "Pilih Pro",
        "productId": "prod_pro_id",
        "tier": 3
      },
      {
        "id": "master",
        "name": "Master",
        "monthly": 150,
        "yearly": 1170,
        "tagline": "Untuk audiens besar",
        "featuresBase": [
          "50 sumber",
          "Pelanggan tanpa batas"
        ],
        "featuresDelta": [
          "Dukungan layanan prima",
          "Webhook khusus"
        ],
        "limits": {
          "newsSources": 50,
          "users": -1
        },
        "ctaLabel": "Pilih Master",
        "productId": "prod_master_id",
        "tier": 4
      },
      {
        "id": "vipfree",
        "name": "VIP Gratis",
        "monthly": 0,
        "yearly": 0,
        "tagline": "Akses penuh untuk mitra",
        "featuresBase": [
          "Sumber berita tanpa batas",
          "Pelanggan tanpa batas"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": -1,
          "users": -1
        },
        "ctaLabel": "Paket saat ini",
        "internalOnly": true,
        "tier": 5
      }
    ],
    "contact": {
      "text": "Butuh solusi khusus?",
      "cta": "Hubungi kami",
      "href": "/help"
    }
  },
  "article": {
    "notFound": "Artikel tidak ditemukan.",
    "errorFetching": "Kami tidak dapat memuat artikel ini. Muat ulang halaman sebentar lagi untuk mencoba lagi.",
    "noArticleSpecified": "Tidak ada artikel yang ditentukan.",
    "goBack": "Kembali",
    "loading": "Memuat..."
  },
  "pricing": {
    "eyebrow": "Harga",
    "title": "Paket dan harga",
    "currentPlan": "Paket saat ini:",
    "monthly": "Bulanan",
    "yearly": "Tahunan",
    "yearlySave": "Hemat 35%",
    "intervalLabel": "Periode penagihan",
    "billedYearly": "ditagih tahunan",
    "perMonthShort": "/mo",
    "perYearShort": "/yr",
    "freeCta": "Mulai gratis",
    "processing": "Membuka halaman pembayaran...",
    "askMore": "Setiap akun dimulai dengan paket Gratis. Jika Anda memerlukan lebih banyak, tulis kepada kami di {email} dan kami akan mengubah paket Anda.",
    "askFor": "Minta paket {planName}",
    "askAction": "Tulis kepada kami",
    "checkoutError": "Kami tidak bisa membuka halaman pembayaran. Silakan coba lagi sebentar lagi.",
    "networkError": "Kami tidak bisa menghubungi server. Periksa koneksi Anda dan coba lagi.",
    "includes": "Termasuk",
    "pageMetaTitle": "Harga | AIBAN",
    "pageMetaDescription": "Paket dan harga AIBAN. Mulai gratis dengan 1 sumber dan hingga 100 pelanggan, lalu pindah ke paket bulanan atau tahunan saat Anda memerlukan lebih banyak.",
    "pageTitle": "Harga",
    "pageLead": "Mulai dengan paket Gratis yang mencakup 1 sumber dan hingga 100 pelanggan. Saat Anda memerlukan lebih banyak sumber atau pelanggan, tulis kepada kami dan kami akan memindahkan Anda ke paket berbayar, ditagih bulanan atau tahunan.",
    "faqTitle": "Pertanyaan tentang penagihan",
    "contactText": "Perlu batas lebih tinggi atau pengaturan khusus?",
    "contactCta": "Hubungi kami",
    "everythingIn": "Semua yang ada di paket sebelumnya, ditambah:",
    "isCurrentPlan": "Ini adalah paket Anda saat ini",
    "downgradeTo": "Beralih ke {planName}",
    "upgradeTo": "Pilih {planName}",
    "mockMode": "Mode uji",
    "mostPopular": "Paling populer",
    "perMonth": "per bulan",
    "perYear": "per tahun",
    "youSave": "Anda hemat"
  },
  "confirmSubscription": {
    "title": "Konfirmasi langganan Anda",
    "goBack": "Kembali",
    "pleaseAccept": "Harap setujui persyaratan untuk menyelesaikan langganan Anda.",
    "iAccept": "Saya menerima",
    "termsAndConditions": "Syarat dan ketentuan",
    "and": "dan",
    "privacyPolicy": "Kebijakan privasi",
    "confirm": "Konfirmasi langganan",
    "mustAccept": "Anda harus menyetujui persyaratan untuk berlangganan.",
    "invalidLink": "Tautan konfirmasi ini tidak lengkap. Buka email terbaru yang kami kirim dan gunakan tautan di dalamnya."
  },
  "articles": {
    "title": "Artikel terbaru",
    "subtitle": "Artikel yang ditulis AIBAN untuk buletin yang dikirimnya.",
    "producedIn": "Bahasa yang tersedia untuk artikel ini",
    "searchPlaceholder": "Cari artikel...",
    "noArticlesFound": "Artikel tidak ditemukan.",
    "created": "Dibuat:",
    "language": "Bahasa:",
    "rightsReserved": "Hak cipta dilindungi.",
    "errorFetching": "Kami tidak dapat memuat artikel. Muat ulang halaman sebentar lagi untuk mencoba lagi."
  },
  "blog": {
    "metaTitle": "Blog {name}",
    "metaDescription": "Artikel dari {name}. Berlangganan untuk menerima artikel baru lewat email.",
    "eyebrow": "Blog buletin",
    "heroFrom": "Artikel dari {name}",
    "heroDescription": "Ini artikel yang telah diterbitkan buletin ini. Berlangganan untuk menerima artikel baru lewat email.",
    "subscribe": "Berlangganan",
    "home": "Beranda blog",
    "featured": "Artikel terbaru",
    "latest": "Artikel terbaru",
    "latestHint": "Terbaru lebih dulu. Beberapa artikel tidak memiliki gambar, jadi tampil sebagai teks saja.",
    "articleCount": "{count} artikel dalam bahasa {language}",
    "articleCountOne": "1 artikel dalam bahasa {language}",
    "languages": "Pilih bahasa",
    "minRead": "{n} menit baca",
    "readArticle": "Baca artikel",
    "page": "Halaman {page}",
    "newer": "Artikel lebih baru",
    "older": "Artikel lebih lama",
    "pagination": "Halaman artikel",
    "emptyTitle": "Belum ada artikel",
    "emptyBody": "Buletin ini belum menerbitkan artikel di sini. Berlangganan untuk menerima artikel pertama lewat email.",
    "endTitle": "Tidak ada artikel yang lebih lama",
    "endBody": "Anda sudah sampai di akhir daftar.",
    "backToNewest": "Ke artikel terbaru",
    "errorTitle": "Kami tidak bisa memuat artikel ini",
    "errorBody": "Server artikel tidak merespons tepat waktu. Muat ulang halaman dalam semenit untuk mencoba lagi.",
    "reload": "Muat ulang halaman",
    "missingHolder": "Tautan blog ini tidak lengkap karena tidak menyebutkan blog siapa yang harus dibuka. Minta tautan lengkap kepada pemilik buletin.",
    "redirecting": "Membuka blog...",
    "publishedWith": "Diterbitkan dengan AIBAN",
    "cta": {
      "title": "Dapatkan artikel berikutnya lewat email",
      "body": "Berlangganan {name} dan artikel baru akan masuk ke kotak masuk Anda. Anda bisa berhenti berlangganan kapan saja.",
      "button": "Berlangganan"
    },
    "search": {
      "label": "Cari artikel",
      "placeholder": "Cari dengan kata atau frasa",
      "button": "Cari",
      "suggestions": "Saran",
      "recent": "Pencarian terakhir",
      "clearRecent": "Hapus pencarian terakhir",
      "title": "Hasil pencarian",
      "resultsFor": "Hasil untuk \"{q}\"",
      "count": "{count} artikel ditemukan",
      "countOne": "1 artikel ditemukan",
      "searching": "Mencari artikel",
      "emptyTitle": "Tidak ada artikel yang cocok dengan \"{q}\"",
      "emptyBody": "Periksa ejaan atau coba kata yang lebih pendek. Anda juga bisa menelusuri semua artikel di blog.",
      "browseAll": "Telusuri semua artikel",
      "noQuery": "Ketik kata atau frasa di atas untuk mencari di blog ini.",
      "error": "Pencarian berhenti karena server artikel tidak merespons. Coba lagi dalam semenit.",
      "tryAgain": "Coba lagi",
      "limitNote": "Menampilkan {count} hasil pertama. Gunakan frasa yang lebih spesifik untuk mempersempit daftar."
    },
    "article": {
      "back": "Semua artikel",
      "published": "Diterbitkan {date}",
      "by": "Oleh {name}",
      "otherLanguages": "Baca dalam bahasa lain",
      "otherLanguagesHint": "Buletin ini juga terbit dalam bahasa-bahasa ini. Setiap tautan membuka blog dalam bahasa tersebut.",
      "share": "Bagikan artikel ini",
      "copyLink": "Salin tautan",
      "copied": "Tautan disalin. Anda bisa menempelkannya di mana saja.",
      "copyFailed": "Tautan tidak bisa disalin. Salin dari bilah alamat browser Anda.",
      "notFoundTitle": "Artikel tidak ditemukan",
      "notFoundBody": "Artikel ini mungkin sudah dihapus, atau tautannya tidak lengkap. Buka blog untuk melihat artikel lainnya.",
      "errorTitle": "Kami tidak bisa memuat artikel ini",
      "errorBody": "Server artikel tidak merespons tepat waktu. Muat ulang halaman dalam semenit untuk mencoba lagi.",
      "goToBlog": "Ke blog"
    }
  },
  "nav": {
    "mainLabel": "Utama",
    "legalLabel": "Legal",
    "home": "Beranda AIBAN",
    "menu": "Menu",
    "openMenu": "Buka menu",
    "closeMenu": "Tutup menu",
    "howItWorks": "Cara kerjanya",
    "pricing": "Harga",
    "help": "Bantuan",
    "about": "Tentang",
    "privacy": "Privasi",
    "terms": "Ketentuan",
    "cookies": "Cookie",
    "signOut": "Keluar",
    "chooseLanguage": "Pilih bahasa",
    "currentLanguage": "Bahasa: {name}"
  },
  "about": {
    "metaTitle": "Tentang | AIBAN",
    "metaDescription": "AIBAN mengubah konten yang sudah diterbitkan sebuah bisnis menjadi buletin yang terkirim dengan sendirinya, dalam bahasa setiap pelanggan, atas nama pemiliknya.",
    "eyebrow": "Tentang",
    "title": "Tentang AIBAN",
    "lead": "AIBAN mengubah konten yang sudah diterbitkan sebuah bisnis menjadi buletin yang terkirim dengan sendirinya. Setiap pelanggan membacanya dalam bahasa mereka sendiri, dan buletin tiba atas nama pemiliknya.",
    "whatTitle": "Apa yang dilakukan AIBAN",
    "whatBody": [
      "Anda memberi tahu AIBAN di mana konten Anda berada: situs web, blog, atau situs berita yang Anda ikuti. Saat ada yang baru di sana, AIBAN menulis edisi darinya dengan gaya bahasa yang Anda jelaskan dan mengirimkannya ke pelanggan sesuai jadwal yang Anda pilih.",
      "Setiap pelanggan memilih bahasa saat mendaftar, dan setiap edisi diterjemahkan ke bahasa itu sebelum dikirim. Artikelnya juga diterbitkan sebagai halaman web, dan Anda bisa mengirimkannya ke situs Anda sendiri."
    ],
    "whoTitle": "Siapa pembuatnya",
    "whoBody": [
      "AIBAN dibuat oleh pendirinya, Luis Murillo Baltodano. Luis adalah insinyur kreatif dengan latar belakang grafika komputer dan otomasi.",
      "Sebagian karya open source-nya tercantum di bawah."
    ],
    "projectsTitle": "Karya open source dari pendiri",
    "projects": [
      {
        "name": "Scene Preset",
        "url": "https://github.com/LuisArmando-TestCoder/scene-preset",
        "desc": "Pustaka yang menghilangkan kode berulang saat bekerja dengan Three.js dan API web 3D."
      },
      {
        "name": "Canvas Preset",
        "url": "https://github.com/LuisArmando-TestCoder/canvas-preset",
        "desc": "Fungsi bantu untuk tugas umum Canvas API."
      },
      {
        "name": "Template Atomic Gatsby",
        "url": "https://github.com/LuisArmando-TestCoder/atomic-gatsby-typescript-recoiljs",
        "desc": "Template awal yang disusun dengan atomic design."
      }
    ],
    "githubLabel": "Luis di GitHub",
    "newTab": "(terbuka di tab baru)",
    "contactTitle": "Hubungi kami",
    "contactBody": "Untuk pertanyaan, masukan, atau ide kemitraan, tulis ke info@aiban.news.",
    "emailCta": "Kirim email ke info@aiban.news",
    "startCta": "Mulai gratis",
    "helpCta": "Baca pusat bantuan"
  },
  "careers": {
    "metaTitle": "Karier | AIBAN",
    "metaDescription": "AIBAN belum membuka lowongan saat ini. Anda tetap bisa menulis kepada kami di info@aiban.news.",
    "eyebrow": "Karier",
    "title": "Karier di AIBAN",
    "lead": "AIBAN belum membuka lowongan saat ini.",
    "body": "Saat ada lowongan, lowongan itu akan dicantumkan di halaman ini. Jika Anda ingin bekerja di AIBAN nanti, kirim catatan singkat tentang diri Anda dan apa yang ingin Anda bangun.",
    "emailCta": "Kirim email ke info@aiban.news",
    "emailSubject": "Bekerja di AIBAN",
    "aboutCta": "Baca tentang AIBAN"
  },
  "legal": {
    "navLabel": "Dokumen hukum",
    "lastUpdated": "Terakhir diperbarui: {date}",
    "privacy": {
      "title": "Kebijakan privasi",
      "metaTitle": "Kebijakan privasi | AIBAN",
      "metaDescription": "Cara AIBAN mengumpulkan, menggunakan, dan melindungi data Anda, serta cara menggunakan hak atas data Anda."
    },
    "terms": {
      "title": "Ketentuan layanan",
      "metaTitle": "Ketentuan layanan | AIBAN",
      "metaDescription": "Ketentuan yang berlaku saat Anda membuat akun dan menggunakan AIBAN."
    },
    "cookies": {
      "title": "Kebijakan cookie",
      "metaTitle": "Kebijakan cookie | AIBAN",
      "metaDescription": "Cookie apa saja yang digunakan AIBAN, apa fungsinya, berapa lama disimpan, dan cara Anda mengendalikannya."
    }
  },
  "demoPage": {
    "metaTitle": "Demo | AIBAN",
    "metaDescription": "Tonton panduan AIBAN dan lihat apa yang terjadi setelah Anda mendaftar, mulai dari menambahkan situs web hingga mengirim edisi pertama.",
    "eyebrow": "Demo",
    "title": "Lihat cara kerja AIBAN",
    "lead": "Tonton panduannya, lalu baca apa yang terjadi setelah Anda mendaftar.",
    "videoTitle": "Video panduan AIBAN",
    "playLabel": "Putar video panduan",
    "videoNote": "Video diputar dari YouTube.",
    "stepsTitle": "Apa yang terjadi setelah Anda mendaftar",
    "steps": [
      {
        "title": "Tambahkan situs web Anda",
        "body": "Masukkan alamat situs, blog, atau situs berita yang Anda ikuti. AIBAN membacanya untuk mencari konten baru."
      },
      {
        "title": "Jelaskan pembaca dan gaya bahasa Anda",
        "body": "Beri tahu AIBAN siapa yang membaca buletin Anda dan bagaimana nadanya. Anda juga bisa membiarkan AIBAN menyarankan deskripsi dari situs Anda."
      },
      {
        "title": "Pilih jadwal",
        "body": "Pilih seberapa sering edisi dikirim. Anda bisa mengubahnya nanti di dasbor."
      },
      {
        "title": "Tambahkan pelanggan",
        "body": "Unggah daftar, tambahkan orang satu per satu, atau bagikan halaman dan widget pendaftaran. Setiap pelanggan memilih bahasa."
      },
      {
        "title": "Tambahkan nama pengirim dan tanda tangan Anda",
        "body": "Tambahkan nama dan tanda tangan email yang akan dilihat pembaca. AIBAN mengirim setiap edisi dari alamatnya yang terverifikasi atas nama Anda, dan balasan masuk ke kotak masuk Anda."
      }
    ],
    "ctaTitle": "Coba dengan situs web Anda sendiri",
    "ctaBody": "Paket gratis mencakup 1 sumber dan hingga 100 pelanggan.",
    "primaryCta": "Mulai gratis",
    "secondaryCta": "Lihat harga"
  },
  "helpCenter": {
    "metaTitle": "Bantuan | AIBAN",
    "metaDescription": "Jawaban seputar penyiapan AIBAN: sumber, bahasa, pengiriman atas nama Anda, pelanggan, widget pendaftaran, blog, dan penagihan.",
    "eyebrow": "Pusat bantuan",
    "title": "Apa yang bisa kami bantu?",
    "lead": "Temukan jawaban tentang menyiapkan dan menjalankan buletin Anda. Jika tidak menemukan yang Anda perlukan, tulis kepada kami.",
    "searchLabel": "Cari di pusat bantuan",
    "searchPlaceholder": "Coba bahasa, widget, atau batal",
    "clearSearch": "Hapus pencarian",
    "resultsCount": "{count} jawaban cocok dengan pencarian Anda.",
    "noResults": "Tidak ada jawaban yang cocok. Coba kata lain atau email info@aiban.news.",
    "topicsLabel": "Topik",
    "copyLink": "Salin tautan",
    "linkCopied": "Tautan disalin",
    "contactTitle": "Masih perlu bantuan?",
    "contactBody": "Tulis ke info@aiban.news dan sertakan alamat email yang Anda gunakan saat mendaftar.",
    "emailCta": "Kirim email ke info@aiban.news",
    "limitsTitle": "Minta batas lebih tinggi",
    "limitsBody": "Beri tahu kami batas yang Anda perlukan dan kami akan membalas lewat email. Jika permintaan tidak bisa dikirim dari halaman ini, aplikasi email Anda akan terbuka dengan isian yang sudah terisi agar Anda bisa mengirimkannya kepada kami.",
    "faqFilterLabel": "Saring pertanyaan",
    "faqNoMatch": "Tidak ada pertanyaan yang cocok dengan saringan Anda.",
    "groups": [
      {
        "id": "getting-started",
        "title": "Memulai",
        "items": [
          {
            "id": "what-is-aiban",
            "q": "Apa itu AIBAN?",
            "a": "AIBAN mengubah konten yang sudah Anda terbitkan menjadi buletin rutin. AIBAN membaca situs web, blog, atau situs berita yang Anda pilih, menulis edisi baru dengan gaya bahasa Anda, dan mengirimkannya ke pelanggan. Setiap pelanggan membacanya dalam bahasa yang mereka pilih."
          },
          {
            "id": "how-to-start",
            "q": "Bagaimana cara memulai?",
            "a": "Buat akun di halaman pendaftaran. Penyiapan meminta alamat situs Anda dan beberapa detail tentang pembaca Anda. Setelah itu Anda bisa menambahkan pelanggan dan mengelola semuanya dari dasbor."
          },
          {
            "id": "change-settings",
            "q": "Bisakah saya mengubah pengaturan nanti?",
            "a": "Bisa. Anda dapat mengubah sumber, jadwal, detail pengirim, dan pelanggan nanti di dasbor Anda. Untuk mengubah paket, tulis ke info@aiban.news."
          }
        ]
      },
      {
        "id": "sources",
        "title": "Sumber dan konten",
        "items": [
          {
            "id": "what-is-a-source",
            "q": "Apa yang bisa saya gunakan sebagai sumber?",
            "a": "Sumber adalah alamat web yang dibaca AIBAN untuk mencari konten baru, seperti situs web, blog, atau situs berita yang Anda ikuti. Anda menambahkan sumber di dasbor. Jumlah yang bisa ditambahkan tergantung paket Anda."
          },
          {
            "id": "how-often",
            "q": "Seberapa sering buletin saya dikirim?",
            "a": "Anda memilih seberapa sering buletin terbit saat menyiapkan sumber. Anda bisa mengubah jadwal nanti di dasbor."
          },
          {
            "id": "your-voice",
            "q": "Bagaimana AIBAN menulis dengan gaya bahasa saya?",
            "a": "Anda menjelaskan karakter buletin Anda, atau membiarkan AIBAN membuat deskripsinya. Edisi ditulis berdasarkan deskripsi itu. Anda bisa mengeditnya kapan saja di dasbor."
          }
        ]
      },
      {
        "id": "languages",
        "title": "Bahasa",
        "items": [
          {
            "id": "subscriber-language",
            "q": "Bagaimana pelanggan menerima buletin dalam bahasa mereka?",
            "a": "Setiap pelanggan memilih bahasa pilihan saat mendaftar. AIBAN menerjemahkan setiap edisi ke bahasa itu sebelum mengirimkannya."
          },
          {
            "id": "site-language",
            "q": "Bisakah saya menggunakan situs ini dalam bahasa saya?",
            "a": "Bisa. Gunakan tombol bahasa di kanan bawah layar untuk mengganti bahasa situs dan dasbor."
          }
        ]
      },
      {
        "id": "sending",
        "title": "Mengirim atas nama Anda",
        "items": [
          {
            "id": "own-address",
            "q": "Bisakah edisi dikirim dari alamat email saya sendiri?",
            "a": "Edisi dikirim dari alamat pengiriman AIBAN dengan nama pengirim dan tanda tangan email Anda, dan balasan masuk ke kotak masuk Anda. Kami tidak meminta kata sandi email Anda, jadi tidak ada data Anda yang bisa bocor."
          },
          {
            "id": "app-password",
            "q": "Apakah saya perlu memberikan kata sandi email saya kepada AIBAN?",
            "a": "Tidak. AIBAN tidak pernah meminta kata sandi email atau kata sandi aplikasi Anda. Edisi dikirim dari alamat AIBAN atas nama Anda, dan balasan masuk kepada Anda."
          }
        ]
      },
      {
        "id": "subscribers",
        "title": "Pelanggan dan widget pendaftaran",
        "items": [
          {
            "id": "add-subscribers",
            "q": "Bagaimana cara menambahkan pelanggan?",
            "a": "Anda bisa menambahkan orang satu per satu di dasbor atau mengunggah file berisi daftar Anda. Orang juga bisa bergabung lewat halaman pendaftaran atau widget pendaftaran."
          },
          {
            "id": "signup-widget",
            "q": "Apa itu widget pendaftaran?",
            "a": "Widget adalah formulir pendaftaran yang bisa Anda pasang di situs web Anda sendiri. Pengunjung memasukkan alamat email, memilih bahasa, lalu bergabung ke daftar Anda."
          },
          {
            "id": "subscriber-limit",
            "q": "Apakah ada batas jumlah pelanggan?",
            "a": "Setiap paket punya batas pelanggannya sendiri. Paket gratis mencakup hingga 100 pelanggan. Halaman harga mencantumkan batas paket lainnya."
          }
        ]
      },
      {
        "id": "blog",
        "title": "Blog",
        "items": [
          {
            "id": "blog-pages",
            "q": "Apakah artikel buletin saya diterbitkan di web?",
            "a": "Ya. Artikel yang ditulis AIBAN untuk buletin Anda juga diterbitkan sebagai halaman web, sehingga orang bisa membacanya di luar kotak masuk."
          },
          {
            "id": "post-to-site",
            "q": "Bisakah saya memposting artikel ke situs web saya sendiri?",
            "a": "Bisa. Di dasbor, Anda bisa menyiapkan webhook yang mengirim setiap artikel buletin ke situs web Anda sebagai postingan. Ini bekerja dengan WordPress dan dengan platform apa pun yang menerima konten REST standar."
          }
        ]
      },
      {
        "id": "billing",
        "title": "Penagihan",
        "items": [
          {
            "id": "free-plan",
            "q": "Apakah ada paket gratis?",
            "a": "Ada. Paket gratis mencakup 1 sumber dan hingga 100 pelanggan. Anda bisa pindah ke paket berbayar saat memerlukan lebih banyak."
          },
          {
            "id": "monthly-yearly",
            "q": "Bisakah saya membayar bulanan atau tahunan?",
            "a": "Bisa. Paket berbayar ditagih bulanan atau tahunan. Harga tahunan 35% lebih murah daripada membayar bulanan selama 12 bulan. Tulis ke info@aiban.news untuk memilih paket."
          },
          {
            "id": "cancel",
            "q": "Bisakah saya membatalkan kapan saja?",
            "a": "Bisa. Tulis ke info@aiban.news kapan saja dan kami akan membatalkan paket berbayar Anda atau mengembalikan Anda ke paket Gratis."
          },
          {
            "id": "higher-limits",
            "q": "Bagaimana jika saya perlu lebih dari paket terbesar?",
            "a": "Gunakan formulir permintaan di halaman bantuan untuk memberi tahu kami batas yang Anda perlukan. Kami membalas lewat email."
          }
        ]
      }
    ]
  },
  "mainPage": {
    "skipToMainContent": "Lanjutkan ke konten utama",
    "dismissAnnouncement": "Tutup pengumuman",
    "problem": "Masalah:",
    "outcome": "Hasil:",
    "disclaimer": "Hemat 35% hanya berlaku untuk penagihan tahunan."
  },
  "authForm": {
    "emailValidation": "Masukkan alamat email seperti nama@contoh.com.",
    "failedToSendCode": "Kami tidak dapat mengirim kode. Periksa alamat email dan coba lagi sebentar lagi.",
    "sending": "Mengirim...",
    "codeSent": "Kami sudah mengirim kode ke email Anda.",
    "invalidCode": "Kode itu tidak benar. Periksa email terbaru yang kami kirim, atau kirim ulang kodenya.",
    "regenerateCode": "Kirim ulang kode",
    "back": "Kembali",
    "byProceeding": "Dengan melanjutkan, Anda menyetujui",
    "termsOfService": "Syarat layanan",
    "and": "dan",
    "privacyPolicy": "Kebijakan privasi",
    "appName": "AI Newsletter"
  },
  "welcome": {
    "title": "Generator buletin otomatis",
    "setItOnce": "Siapkan sekali.",
    "useItForever": "Setelah itu, buletin terus berjalan."
  },
  "lead": {
    "title": "Ubah pelanggan menjadi pengunjung",
    "recommendation": "Bantu AI kami memahami merek Anda dengan menghubungkan situs web Anda.",
    "question": "Apakah Anda punya situs web? (opsional, bisa ditambahkan nanti)",
    "placeholder": "https://situs-anda.com"
  },
  "newsSource": {
    "title": "Hubungkan sumber konten Anda",
    "subtitle": "Kami akan menarik umpan Anda sehingga Anda tidak perlu mulai dari nol.",
    "placeholder": "Blog atau tautan RSS Anda"
  },
  "subscribe": {
    "welcome": {
      "title": "Selamat datang di buletin.",
      "invitedBy": "Anda telah diundang oleh {configuratorId}."
    }
  },
  "header": {
    "goToWorkspace": "Buka dasbor",
    "inBilling": "Harga",
    "vip": "VIP",
    "plan": "Paket {planName}",
    "logIn": "Masuk",
    "getStarted": "Mulai gratis"
  },
  "fileInput": {
    "chooseFile": "Pilih file",
    "dropFile": "Lepaskan di sini",
    "release": "Lepaskan untuk mengunggah"
  },
  "billing": {
    "title": "Penagihan dan langganan",
    "currentPlanTitle": "Paket Anda saat ini",
    "upgradePlanTitle": "Ubah paket Anda",
    "manageSubscription": "Kelola langganan",
    "vipPlanName": "VIP Partner",
    "vipPlanDescription": "Akses tanpa batas dari AIBAN.",
    "perMonth": "per bulan",
    "perYear": "per tahun",
    "monthAbbreviation": "bln",
    "equivalentTo": "setara dengan",
    "mostPopular": "Paling populer",
    "upgradeTo": "Tingkatkan ke",
    "downgradeTo": "Beralih ke",
    "currentPlanButton": "Paket Anda",
    "youSave": "Anda hemat",
    "users": "pengguna",
    "newsSources": "sumber berita",
    "monthly": "Bulanan",
    "yearly": "Tahunan",
    "loadingPlan": "Memuat data paket..."
  },
  "languages": [
    {
      "code": "ab",
      "name": "Abkhazia"
    },
    {
      "code": "aa",
      "name": "Afar"
    },
    {
      "code": "af",
      "name": "Afrikaans"
    },
    {
      "code": "ak",
      "name": "Akan"
    },
    {
      "code": "sq",
      "name": "Albania"
    },
    {
      "code": "am",
      "name": "Amharik"
    },
    {
      "code": "ar",
      "name": "Arab"
    },
    {
      "code": "an",
      "name": "Aragon"
    },
    {
      "code": "hy",
      "name": "Armenia"
    },
    {
      "code": "as",
      "name": "Assam"
    },
    {
      "code": "av",
      "name": "Avarik"
    },
    {
      "code": "ae",
      "name": "Avestan"
    },
    {
      "code": "ay",
      "name": "Aymara"
    },
    {
      "code": "az",
      "name": "Azerbaijan"
    },
    {
      "code": "bm",
      "name": "Bambara"
    },
    {
      "code": "ba",
      "name": "Bashkir"
    },
    {
      "code": "eu",
      "name": "Basque"
    },
    {
      "code": "be",
      "name": "Belarus"
    },
    {
      "code": "bn",
      "name": "Bengali"
    },
    {
      "code": "bi",
      "name": "Bislama"
    },
    {
      "code": "bs",
      "name": "Bosnia"
    },
    {
      "code": "br",
      "name": "Breton"
    },
    {
      "code": "bg",
      "name": "Bulgaria"
    },
    {
      "code": "my",
      "name": "Burma"
    },
    {
      "code": "ca",
      "name": "Katalan"
    },
    {
      "code": "ch",
      "name": "Chamorro"
    },
    {
      "code": "ce",
      "name": "Chechen"
    },
    {
      "code": "ny",
      "name": "Chichewa"
    },
    {
      "code": "zh",
      "name": "Mandarin"
    },
    {
      "code": "cu",
      "name": "Slavia Gereja"
    },
    {
      "code": "cv",
      "name": "Chuvash"
    },
    {
      "code": "kw",
      "name": "Cornish"
    },
    {
      "code": "co",
      "name": "Korsika"
    },
    {
      "code": "cr",
      "name": "Cree"
    },
    {
      "code": "hr",
      "name": "Kroasia"
    },
    {
      "code": "cs",
      "name": "Ceko"
    },
    {
      "code": "da",
      "name": "Denmark"
    },
    {
      "code": "dv",
      "name": "Divehi"
    },
    {
      "code": "nl",
      "name": "Belanda"
    },
    {
      "code": "dz",
      "name": "Dzongkha"
    },
    {
      "code": "en",
      "name": "Inggris"
    },
    {
      "code": "eo",
      "name": "Esperanto"
    },
    {
      "code": "et",
      "name": "Estonia"
    },
    {
      "code": "ee",
      "name": "Ewe"
    },
    {
      "code": "fo",
      "name": "Faroe"
    },
    {
      "code": "fj",
      "name": "Fiji"
    },
    {
      "code": "fi",
      "name": "Finlandia"
    },
    {
      "code": "fr",
      "name": "Prancis"
    },
    {
      "code": "fy",
      "name": "Frisia Barat"
    },
    {
      "code": "ff",
      "name": "Fula"
    },
    {
      "code": "gd",
      "name": "Gaelik Skotlandia"
    },
    {
      "code": "gl",
      "name": "Galisia"
    },
    {
      "code": "lg",
      "name": "Ganda"
    },
    {
      "code": "ka",
      "name": "Georgia"
    },
    {
      "code": "de",
      "name": "Jerman"
    },
    {
      "code": "el",
      "name": "Yunani"
    },
    {
      "code": "kl",
      "name": "Greenland"
    },
    {
      "code": "gn",
      "name": "Guarani"
    },
    {
      "code": "gu",
      "name": "Gujarati"
    },
    {
      "code": "ht",
      "name": "Kreol Haiti"
    },
    {
      "code": "ha",
      "name": "Hausa"
    },
    {
      "code": "he",
      "name": "Ibrani"
    },
    {
      "code": "hz",
      "name": "Herero"
    },
    {
      "code": "hi",
      "name": "Hindi"
    },
    {
      "code": "ho",
      "name": "Hiri Motu"
    },
    {
      "code": "hu",
      "name": "Hungaria"
    },
    {
      "code": "is",
      "name": "Islandia"
    },
    {
      "code": "io",
      "name": "Ido"
    },
    {
      "code": "ig",
      "name": "Igbo"
    },
    {
      "code": "id",
      "name": "Indonesia"
    },
    {
      "code": "ia",
      "name": "Interlingua"
    },
    {
      "code": "ie",
      "name": "Interlingue"
    },
    {
      "code": "iu",
      "name": "Inuktitut"
    },
    {
      "code": "ik",
      "name": "Inupiaq"
    },
    {
      "code": "ga",
      "name": "Irlandia"
    },
    {
      "code": "it",
      "name": "Italia"
    },
    {
      "code": "ja",
      "name": "Jepang"
    },
    {
      "code": "jv",
      "name": "Jawa"
    },
    {
      "code": "kn",
      "name": "Kannada"
    },
    {
      "code": "kr",
      "name": "Kanuri"
    },
    {
      "code": "ks",
      "name": "Kashmir"
    },
    {
      "code": "kk",
      "name": "Kazakh"
    },
    {
      "code": "km",
      "name": "Khmer"
    },
    {
      "code": "ki",
      "name": "Kikuyu"
    },
    {
      "code": "rw",
      "name": "Kinyarwanda"
    },
    {
      "code": "ky",
      "name": "Kirgiz"
    },
    {
      "code": "kv",
      "name": "Komi"
    },
    {
      "code": "kg",
      "name": "Kongo"
    },
    {
      "code": "ko",
      "name": "Korea"
    },
    {
      "code": "kj",
      "name": "Kuanyama"
    },
    {
      "code": "ku",
      "name": "Kurdi"
    },
    {
      "code": "lo",
      "name": "Lao"
    },
    {
      "code": "la",
      "name": "Latin"
    },
    {
      "code": "lv",
      "name": "Latvia"
    },
    {
      "code": "li",
      "name": "Limburg"
    },
    {
      "code": "ln",
      "name": "Lingala"
    },
    {
      "code": "lt",
      "name": "Lithuania"
    },
    {
      "code": "lu",
      "name": "Luba-Katanga"
    },
    {
      "code": "lb",
      "name": "Luksemburg"
    },
    {
      "code": "mk",
      "name": "Makedonia"
    },
    {
      "code": "mg",
      "name": "Malagasi"
    },
    {
      "code": "ms",
      "name": "Melayu"
    },
    {
      "code": "ml",
      "name": "Malayalam"
    },
    {
      "code": "mt",
      "name": "Malta"
    },
    {
      "code": "gv",
      "name": "Manx"
    },
    {
      "code": "mi",
      "name": "Maori"
    },
    {
      "code": "mr",
      "name": "Marathi"
    },
    {
      "code": "mh",
      "name": "Marshall"
    },
    {
      "code": "mn",
      "name": "Mongolia"
    },
    {
      "code": "na",
      "name": "Nauru"
    },
    {
      "code": "nv",
      "name": "Navajo"
    },
    {
      "code": "nd",
      "name": "Ndebele Utara"
    },
    {
      "code": "nr",
      "name": "Ndebele Selatan"
    },
    {
      "code": "ng",
      "name": "Ndonga"
    },
    {
      "code": "ne",
      "name": "Nepal"
    },
    {
      "code": "no",
      "name": "Norwegia"
    },
    {
      "code": "nb",
      "name": "Bokmål Norwegia"
    },
    {
      "code": "nn",
      "name": "Nynorsk Norwegia"
    },
    {
      "code": "oc",
      "name": "Oksitan"
    },
    {
      "code": "oj",
      "name": "Ojibwa"
    },
    {
      "code": "or",
      "name": "Odia"
    },
    {
      "code": "om",
      "name": "Oromo"
    },
    {
      "code": "os",
      "name": "Ossetia"
    },
    {
      "code": "pi",
      "name": "Pali"
    },
    {
      "code": "ps",
      "name": "Pashto"
    },
    {
      "code": "fa",
      "name": "Persia"
    },
    {
      "code": "pl",
      "name": "Polandia"
    },
    {
      "code": "pt",
      "name": "Portugis"
    },
    {
      "code": "pa",
      "name": "Punjabi"
    },
    {
      "code": "qu",
      "name": "Quechua"
    },
    {
      "code": "ro",
      "name": "Rumania"
    },
    {
      "code": "rm",
      "name": "Reto-Roman"
    },
    {
      "code": "rn",
      "name": "Rundi"
    },
    {
      "code": "ru",
      "name": "Rusia"
    },
    {
      "code": "se",
      "name": "Sami Utara"
    },
    {
      "code": "sm",
      "name": "Samoa"
    },
    {
      "code": "sg",
      "name": "Sango"
    },
    {
      "code": "sa",
      "name": "Sanskerta"
    },
    {
      "code": "sc",
      "name": "Sardinia"
    },
    {
      "code": "sr",
      "name": "Serbia"
    },
    {
      "code": "sn",
      "name": "Shona"
    },
    {
      "code": "ii",
      "name": "Sichuan Yi"
    },
    {
      "code": "sd",
      "name": "Sindhi"
    },
    {
      "code": "si",
      "name": "Sinhala"
    },
    {
      "code": "sk",
      "name": "Slovak"
    },
    {
      "code": "sl",
      "name": "Slovenia"
    },
    {
      "code": "so",
      "name": "Somalia"
    },
    {
      "code": "st",
      "name": "Sotho Selatan"
    },
    {
      "code": "es",
      "name": "Spanyol"
    },
    {
      "code": "su",
      "name": "Sunda"
    },
    {
      "code": "sw",
      "name": "Swahili"
    },
    {
      "code": "ss",
      "name": "Swati"
    },
    {
      "code": "sv",
      "name": "Swedia"
    },
    {
      "code": "tl",
      "name": "Tagalog"
    },
    {
      "code": "ty",
      "name": "Tahiti"
    },
    {
      "code": "tg",
      "name": "Tajik"
    },
    {
      "code": "ta",
      "name": "Tamil"
    },
    {
      "code": "tt",
      "name": "Tatar"
    },
    {
      "code": "te",
      "name": "Telugu"
    },
    {
      "code": "th",
      "name": "Thai"
    },
    {
      "code": "bo",
      "name": "Tibet"
    },
    {
      "code": "ti",
      "name": "Tigrinya"
    },
    {
      "code": "to",
      "name": "Tonga"
    },
    {
      "code": "ts",
      "name": "Tsonga"
    },
    {
      "code": "tn",
      "name": "Tswana"
    },
    {
      "code": "tr",
      "name": "Turki"
    },
    {
      "code": "tk",
      "name": "Turkmen"
    },
    {
      "code": "tw",
      "name": "Twi"
    },
    {
      "code": "ug",
      "name": "Uighur"
    },
    {
      "code": "uk",
      "name": "Ukraina"
    },
    {
      "code": "ur",
      "name": "Urdu"
    },
    {
      "code": "uz",
      "name": "Uzbek"
    },
    {
      "code": "ve",
      "name": "Venda"
    },
    {
      "code": "vi",
      "name": "Vietnam"
    },
    {
      "code": "vo",
      "name": "Volapük"
    },
    {
      "code": "wa",
      "name": "Walloon"
    },
    {
      "code": "cy",
      "name": "Wales"
    },
    {
      "code": "wo",
      "name": "Wolof"
    },
    {
      "code": "xh",
      "name": "Xhosa"
    },
    {
      "code": "yi",
      "name": "Yiddish"
    },
    {
      "code": "yo",
      "name": "Yoruba"
    },
    {
      "code": "za",
      "name": "Zhuang"
    },
    {
      "code": "zu",
      "name": "Zulu"
    }
  ],
  "countries": [
    {
      "code": "AF",
      "name": "Afganistan"
    },
    {
      "code": "AL",
      "name": "Albania"
    },
    {
      "code": "DZ",
      "name": "Aljazair"
    },
    {
      "code": "AS",
      "name": "Samoa Amerika"
    },
    {
      "code": "AD",
      "name": "Andorra"
    },
    {
      "code": "AO",
      "name": "Angola"
    },
    {
      "code": "AI",
      "name": "Anguilla"
    },
    {
      "code": "AQ",
      "name": "Antartika"
    },
    {
      "code": "AG",
      "name": "Antigua dan Barbuda"
    },
    {
      "code": "AR",
      "name": "Argentina"
    },
    {
      "code": "AM",
      "name": "Armenia"
    },
    {
      "code": "AW",
      "name": "Aruba"
    },
    {
      "code": "AU",
      "name": "Australia"
    },
    {
      "code": "AT",
      "name": "Austria"
    },
    {
      "code": "AZ",
      "name": "Azerbaijan"
    },
    {
      "code": "BS",
      "name": "Bahama"
    },
    {
      "code": "BH",
      "name": "Bahrain"
    },
    {
      "code": "BD",
      "name": "Bangladesh"
    },
    {
      "code": "BB",
      "name": "Barbados"
    },
    {
      "code": "BY",
      "name": "Belarus"
    },
    {
      "code": "BE",
      "name": "Belgia"
    },
    {
      "code": "BZ",
      "name": "Belize"
    },
    {
      "code": "BJ",
      "name": "Benin"
    },
    {
      "code": "BM",
      "name": "Bermuda"
    },
    {
      "code": "BT",
      "name": "Bhutan"
    },
    {
      "code": "BO",
      "name": "Bolivia"
    },
    {
      "code": "BA",
      "name": "Bosnia dan Herzegovina"
    },
    {
      "code": "BW",
      "name": "Botswana"
    },
    {
      "code": "BR",
      "name": "Brasil"
    },
    {
      "code": "IO",
      "name": "Wilayah Inggris di Samudra Hindia"
    },
    {
      "code": "VG",
      "name": "Kepulauan Virgin Britania"
    },
    {
      "code": "BN",
      "name": "Brunei"
    },
    {
      "code": "BG",
      "name": "Bulgaria"
    },
    {
      "code": "BF",
      "name": "Burkina Faso"
    },
    {
      "code": "BI",
      "name": "Burundi"
    },
    {
      "code": "KH",
      "name": "Kamboja"
    },
    {
      "code": "CM",
      "name": "Kamerun"
    },
    {
      "code": "CA",
      "name": "Kanada"
    },
    {
      "code": "CV",
      "name": "Tanjung Verde"
    },
    {
      "code": "KY",
      "name": "Kepulauan Cayman"
    },
    {
      "code": "CF",
      "name": "Republik Afrika Tengah"
    },
    {
      "code": "TD",
      "name": "Chad"
    },
    {
      "code": "CL",
      "name": "Chili"
    },
    {
      "code": "CN",
      "name": "Tiongkok"
    },
    {
      "code": "CX",
      "name": "Pulau Natal"
    },
    {
      "code": "CC",
      "name": "Kepulauan Cocos"
    },
    {
      "code": "CO",
      "name": "Kolombia"
    },
    {
      "code": "KM",
      "name": "Komoro"
    },
    {
      "code": "CG",
      "name": "Kongo - Brazzaville"
    },
    {
      "code": "CD",
      "name": "Kongo - Kinshasa"
    },
    {
      "code": "CK",
      "name": "Kepulauan Cook"
    },
    {
      "code": "CR",
      "name": "Kosta Rika"
    },
    {
      "code": "CI",
      "name": "Pantai Gading"
    },
    {
      "code": "HR",
      "name": "Kroasia"
    },
    {
      "code": "CU",
      "name": "Kuba"
    },
    {
      "code": "CY",
      "name": "Siprus"
    },
    {
      "code": "CZ",
      "name": "Ceko"
    },
    {
      "code": "DK",
      "name": "Denmark"
    },
    {
      "code": "DJ",
      "name": "Djibouti"
    },
    {
      "code": "DM",
      "name": "Dominika"
    },
    {
      "code": "DO",
      "name": "Republik Dominika"
    },
    {
      "code": "EC",
      "name": "Ekuador"
    },
    {
      "code": "EG",
      "name": "Mesir"
    },
    {
      "code": "SV",
      "name": "El Salvador"
    },
    {
      "code": "GQ",
      "name": "Guinea Khatulistiwa"
    },
    {
      "code": "ER",
      "name": "Eritrea"
    },
    {
      "code": "EE",
      "name": "Estonia"
    },
    {
      "code": "SZ",
      "name": "Eswatini"
    },
    {
      "code": "ET",
      "name": "Etiopia"
    },
    {
      "code": "FJ",
      "name": "Fiji"
    },
    {
      "code": "FI",
      "name": "Finlandia"
    },
    {
      "code": "FR",
      "name": "Prancis"
    },
    {
      "code": "GA",
      "name": "Gabon"
    },
    {
      "code": "GM",
      "name": "Gambia"
    },
    {
      "code": "GE",
      "name": "Georgia"
    },
    {
      "code": "DE",
      "name": "Jerman"
    },
    {
      "code": "GH",
      "name": "Ghana"
    },
    {
      "code": "GR",
      "name": "Yunani"
    },
    {
      "code": "GT",
      "name": "Guatemala"
    },
    {
      "code": "GN",
      "name": "Guinea"
    },
    {
      "code": "GY",
      "name": "Guyana"
    },
    {
      "code": "HT",
      "name": "Haiti"
    },
    {
      "code": "HN",
      "name": "Honduras"
    },
    {
      "code": "HK",
      "name": "Hong Kong"
    },
    {
      "code": "HU",
      "name": "Hungaria"
    },
    {
      "code": "IS",
      "name": "Islandia"
    },
    {
      "code": "IN",
      "name": "India"
    },
    {
      "code": "ID",
      "name": "Indonesia"
    },
    {
      "code": "IR",
      "name": "Iran"
    },
    {
      "code": "IQ",
      "name": "Irak"
    },
    {
      "code": "IE",
      "name": "Irlandia"
    },
    {
      "code": "IL",
      "name": "Israel"
    },
    {
      "code": "IT",
      "name": "Italia"
    },
    {
      "code": "JM",
      "name": "Jamaika"
    },
    {
      "code": "JP",
      "name": "Jepang"
    },
    {
      "code": "JO",
      "name": "Yordania"
    },
    {
      "code": "KZ",
      "name": "Kazakhstan"
    },
    {
      "code": "KE",
      "name": "Kenya"
    },
    {
      "code": "KR",
      "name": "Korea Selatan"
    },
    {
      "code": "KW",
      "name": "Kuwait"
    },
    {
      "code": "KG",
      "name": "Kirgizstan"
    },
    {
      "code": "LA",
      "name": "Laos"
    },
    {
      "code": "LV",
      "name": "Latvia"
    },
    {
      "code": "LB",
      "name": "Lebanon"
    },
    {
      "code": "LS",
      "name": "Lesotho"
    },
    {
      "code": "LR",
      "name": "Liberia"
    },
    {
      "code": "LY",
      "name": "Libya"
    },
    {
      "code": "LI",
      "name": "Liechtenstein"
    },
    {
      "code": "LT",
      "name": "Lithuania"
    },
    {
      "code": "LU",
      "name": "Luksemburg"
    },
    {
      "code": "MG",
      "name": "Madagaskar"
    },
    {
      "code": "MW",
      "name": "Malawi"
    },
    {
      "code": "MY",
      "name": "Malaysia"
    },
    {
      "code": "MV",
      "name": "Maladewa"
    },
    {
      "code": "ML",
      "name": "Mali"
    },
    {
      "code": "MT",
      "name": "Malta"
    },
    {
      "code": "MX",
      "name": "Meksiko"
    },
    {
      "code": "MD",
      "name": "Moldova"
    },
    {
      "code": "MC",
      "name": "Monako"
    },
    {
      "code": "MN",
      "name": "Mongolia"
    },
    {
      "code": "ME",
      "name": "Montenegro"
    },
    {
      "code": "MA",
      "name": "Maroko"
    },
    {
      "code": "MZ",
      "name": "Mozambik"
    },
    {
      "code": "MM",
      "name": "Myanmar"
    },
    {
      "code": "NA",
      "name": "Namibia"
    },
    {
      "code": "NP",
      "name": "Nepal"
    },
    {
      "code": "NL",
      "name": "Belanda"
    },
    {
      "code": "NZ",
      "name": "Selandia Baru"
    },
    {
      "code": "NI",
      "name": "Nikaragua"
    },
    {
      "code": "NE",
      "name": "Niger"
    },
    {
      "code": "NG",
      "name": "Nigeria"
    },
    {
      "code": "MK",
      "name": "Makedonia Utara"
    },
    {
      "code": "NO",
      "name": "Norwegia"
    },
    {
      "code": "OM",
      "name": "Oman"
    },
    {
      "code": "PK",
      "name": "Pakistan"
    },
    {
      "code": "PA",
      "name": "Panama"
    },
    {
      "code": "PG",
      "name": "Papua Nugini"
    },
    {
      "code": "PY",
      "name": "Paraguay"
    },
    {
      "code": "PE",
      "name": "Peru"
    },
    {
      "code": "PH",
      "name": "Filipina"
    },
    {
      "code": "PL",
      "name": "Polandia"
    },
    {
      "code": "PT",
      "name": "Portugal"
    },
    {
      "code": "QA",
      "name": "Qatar"
    },
    {
      "code": "RO",
      "name": "Rumania"
    },
    {
      "code": "RU",
      "name": "Rusia"
    },
    {
      "code": "RW",
      "name": "Rwanda"
    },
    {
      "code": "SA",
      "name": "Arab Saudi"
    },
    {
      "code": "SN",
      "name": "Senegal"
    },
    {
      "code": "RS",
      "name": "Serbia"
    },
    {
      "code": "SG",
      "name": "Singapura"
    },
    {
      "code": "SK",
      "name": "Slovakia"
    },
    {
      "code": "SI",
      "name": "Slovenia"
    },
    {
      "code": "ZA",
      "name": "Afrika Selatan"
    },
    {
      "code": "ES",
      "name": "Spanyol"
    },
    {
      "code": "LK",
      "name": "Sri Lanka"
    },
    {
      "code": "SE",
      "name": "Swedia"
    },
    {
      "code": "CH",
      "name": "Swiss"
    },
    {
      "code": "TW",
      "name": "Taiwan"
    },
    {
      "code": "TH",
      "name": "Thailand"
    },
    {
      "code": "TR",
      "name": "Turki"
    },
    {
      "code": "UG",
      "name": "Uganda"
    },
    {
      "code": "UA",
      "name": "Ukraina"
    },
    {
      "code": "AE",
      "name": "Uni Emirat Arab"
    },
    {
      "code": "GB",
      "name": "Britania Raya"
    },
    {
      "code": "US",
      "name": "Amerika Serikat"
    },
    {
      "code": "UY",
      "name": "Uruguay"
    },
    {
      "code": "UZ",
      "name": "Uzbekistan"
    },
    {
      "code": "VE",
      "name": "Venezuela"
    },
    {
      "code": "VN",
      "name": "Vietnam"
    },
    {
      "code": "YE",
      "name": "Yaman"
    },
    {
      "code": "ZM",
      "name": "Zambia"
    },
    {
      "code": "ZW",
      "name": "Zimbabwe"
    }
  ]
};
