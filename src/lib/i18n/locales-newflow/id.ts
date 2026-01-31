export default {
  step01: {
    title: "AI yang terdengar seperti manusia menulis buletin untuk pelanggan Anda secara otomatis",
    subtitle: "Seberapa sering, pilih <u>setiap bulan</u> atau <u>setiap minggu</u> atau <u>setiap hari</u> atau <u>pukul berapa</u>"
  },
  step02: {
    title: "Bahasa buletin",
    subtitle: "“buletin Anda juga akan dikirim dalam bahasa spesifik setiap pengguna jika berbeda”"
  },
  step03: {
    title: "Pengalihan (Opsional)",
    subtitle: "Apakah Anda ingin mengarahkan pengguna ke halaman Anda?",
    description: "Anda dapat menempelkan tautan ke halaman Anda di sini, kami akan menghitung berapa banyak yang masuk dari email yang dibuat AI",
    placeholder: "https://halaman-anda.com"
  },
  step04: {
    title: "Jenis berita yang Anda ingin AI pilih",
    subtitle: "Tema percakapan atau topik mana (disimpulkan dari tautan pengalihan jika disetel, jika tidak kosong)",
    placeholder: "mis. Kecerdasan Buatan, Pemasaran, Kesehatan..."
  },
  step05: {
    title: "Sesuaikan Tanda Tangan Anda",
    subtitle: "Desain secara visual atau edit kode secara langsung",
    visualEditor: "Editor Visual",
    htmlSource: "Sumber HTML",
    livePreview: "Pratinjau Langsung",
    yourName: "Nama Anda",
    yourTitle: "Gelar Anda",
    facebookProfile: "Profil Facebook",
    instagramProfile: "Profil Instagram",
    editHtml: "Edit HTML secara langsung...",
    warning: "⚠️ Edit yang dilakukan di sini akan ditimpa jika Anda beralih kembali ke Editor Visual dan membuat perubahan."
  },
  step06: {
    title: "Sumber Berita",
    subtitle: "Situs web berita mana yang ingin Anda gunakan?",
    description: "Masukkan URL atau biarkan kami memilih satu untuk Anda berdasarkan topik Anda.",
    descriptionSmall: "Kami akan menganalisis situs web untuk menemukan konten terbaik. Ini mungkin memakan waktu beberapa detik.",
    placeholder: "https://contoh.com",
    analyzing: "Menganalisis...",
    next: "Selanjutnya",
    errors: {
      failedToGenerate: "Gagal membuat pemilih. Silakan coba lagi atau periksa URL.",
      errorGenerating: "Terjadi kesalahan saat membuat pemilih.",
      invalidUrl: "Harap masukkan URL yang valid atau pilih sumber."
    }
  },
  step07: {
    title: "Pemilih Konten",
    subtitle: "Anggap setiap situs web sebagai <strong>perpustakaan dengan tata letak unik</strong>.",
    explanation1: "<strong>'Pemilih'</strong> ini adalah peta spesifik yang kami buat untuk situs web ini. Ini memberi tahu sistem kami dengan tepat di mana harus mencari untuk mengambil artikel yang Anda inginkan, sambil mengabaikan tombol menu dan iklan.",
    explanation2: "<strong>Kami telah mengisi peta ini untuk Anda secara otomatis.</strong>",
    placeholder: "String pemilih...",
    regenerate: "Buat Ulang Pemilih",
    regenerating: "Membuat ulang...",
    errors: {
      noUrl: "URL sumber berita tidak ditemukan.",
      failedRegenerate: "Gagal membuat ulang pemilih.",
      errorRegenerate: "Terjadi kesalahan saat membuat ulang pemilih."
    }
  },
  step08: {
    title: "Pratinjau",
    placeholder: "Siap membuat buletin pertama Anda?",
    generateBtn: "Buat Email Buletin",
    sentBtn: "Terkirim! Periksa email Anda",
    sendTestBtn: "Kirim Email Tes",
    regenerateBtn: "Buat Ulang",
    loading: {
      initializing: "Menginisialisasi...",
      starting: "Memulai pembuatan...",
      scraping: "Mengambil konten...",
      translating: "Menerjemahkan artikel...",
      formatting: "Memformat email...",
      sending: "Menghubungkan ke penyedia email...",
      authenticating: "Mengautentikasi...",
      sendingArticle: "Mengirim artikel...",
      creating: "Membuat sumber berita...",
      saving: "Menyimpan konfigurasi...",
      finalizing: "Menyelesaikan pengaturan..."
    },
    errors: {
      generationFailed: "Pembuatan gagal: ",
      createFailed: "Gagal membuat sumber berita. Silakan coba lagi.",
      errorCreating: "Kesalahan membuat sumber berita: ",
      sendFailed: "Gagal mengirim email: "
    },
    defaultSubject: "Pratinjau Buletin Anda yang Dibuat"
  },
  step09: {
    title: "Untuk mengirim artikel dari email Anda",
    subtitle: "Kata Sandi Aplikasi (Opsional)",
    description: "(Jika Anda memiliki layanan gmail, letakkan kata sandi aplikasi Anda di sini)",
    label: "Kata Sandi Aplikasi",
    placeholder: "Kata Sandi Aplikasi Anda"
  },
  step10: {
    title: "Alamat Gmail (Opsional)",
    subtitle: "Alamat Email Gmail",
    description: "Jika Anda ingin mengirim dari alamat Gmail tertentu",
    placeholder: "email-anda@gmail.com"
  },
  step11: {
    title: "Kirim Email Tes",
    subtitle: "Kirim email tes ke diri Anda sendiri untuk memverifikasi konfigurasi.",
    sendNow: "Kirim Sekarang",
    sent: "Terkirim! Periksa email Anda",
    loading: {
      connecting: "Menghubungkan ke penyedia email...",
      authenticating: "Mengautentikasi...",
      sending: "Mengirim artikel..."
    }
  },
  step12: {
    title: "Bagikan buletin ini dengan pengikut Anda",
    subtitle: "Tautan ke corong langganan (sebelum mereka mulai menerima email, mereka harus menerima undangan Anda)",
    copy: "Salin",
    copied: "Tautan disalin!"
  },
  step13: {
    title: "Rencana & Batas",
    currentPlan: "Rencana Saat Ini:",
    limits: "Batas:",
    unknown: "Tidak Diketahui",
    changePlan: "Ubah Rencana",
    advancedFeatures: "Butuh fitur lebih canggih?",
    developerText: "Lihat bagian pengembang kami untuk mengintegrasikan corong langganan buletin ini di server Anda, blog dari semua artikel yang Anda buat, dan berlangganan pengguna dari basis kode Anda dengan Kunci API kami.",
    dashboardBtn: "Pergi ke Dasbor",
    usage: "Penggunaan:",
    limitDetails: {
      free: "Batas 100 pengguna",
      starter: "5 sumber, 100rb pengguna",
      growth: "17 sumber, 250rb pengguna",
      pro: "25 sumber, 500rb pengguna",
      master: "50 sumber, pengguna tak terbatas",
      vipfree: "VIP Gratis"
    }
  }
};
