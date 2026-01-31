export default {
  step01: {
    title: "İnsan gibi duyulan yapay zeka, aboneleriniz için otomatik olarak haber bültenleri yazar",
    subtitle: "Ne sıklıkla, <u>her ay</u> veya <u>her hafta</u> veya <u>her gün</u> veya <u>ne zaman</u> seçin"
  },
  step02: {
    title: "Haber bülteninin dili",
    subtitle: "“haber bülteniniz, farklıysa her kullanıcının kendi dilinde de gönderilecektir”"
  },
  step03: {
    title: "Yönlendirme (İsteğe Bağlı)",
    subtitle: "Kullanıcıyı sayfanıza yönlendirmek istiyor musunuz?",
    description: "Sayfanızın bağlantısını buraya yapıştırabilirsiniz, yapay zekanın oluşturduğu e-postalardan kaç kişinin girdiğini sayacağız",
    placeholder: "https://sayfaniz.com"
  },
  step04: {
    title: "Yapay zekanın seçmesini istediğiniz haber türü",
    subtitle: "Hangi konuşma teması veya konusu (ayarlanmışsa yönlendirme bağlantısından çıkarılır, aksi takdirde boş)",
    placeholder: "örn. Yapay Zeka, Pazarlama, Sağlık..."
  },
  step05: {
    title: "İmzanızı Özelleştirin",
    subtitle: "Görsel olarak tasarlayın veya kodu doğrudan düzenleyin",
    visualEditor: "Görsel Düzenleyici",
    htmlSource: "HTML Kaynağı",
    livePreview: "Canlı Önizleme",
    yourName: "Adınız",
    yourTitle: "Unvanınız",
    facebookProfile: "Facebook Profili",
    instagramProfile: "Instagram Profili",
    editHtml: "HTML'i doğrudan düzenle...",
    warning: "⚠️ Görsel Düzenleyiciye geri dönüp değişiklik yaparsanız burada yapılan düzenlemelerin üzerine yazılacaktır."
  },
  step06: {
    title: "Haber Kaynağı",
    subtitle: "Hangi haber web sitesini kullanmak istiyorsunuz?",
    description: "Bir URL girin veya konunuza göre sizin için bir tane seçmemize izin verin.",
    descriptionSmall: "En iyi içeriği bulmak için web sitesini analiz edeceğiz. Bu birkaç saniye sürebilir.",
    placeholder: "https://ornek.com",
    analyzing: "Analiz ediliyor...",
    next: "İleri",
    errors: {
      failedToGenerate: "Seçici oluşturulamadı. Lütfen tekrar deneyin veya URL'yi kontrol edin.",
      errorGenerating: "Seçici oluşturulurken bir hata oluştu.",
      invalidUrl: "Lütfen geçerli bir URL girin veya bir kaynak seçin."
    }
  },
  step07: {
    title: "İçerik Seçici",
    subtitle: "Her web sitesini <strong>benzersiz bir düzeni olan bir kütüphane</strong> olarak düşünün.",
    explanation1: "Bu <strong>'Seçici'</strong>, bu web sitesi için oluşturduğumuz özel haritadır. Sistemimize, menü düğmelerini ve reklamları görmezden gelerek istediğiniz makaleleri almak için tam olarak nereye bakması gerektiğini söyler.",
    explanation2: "<strong>Bu haritayı sizin için otomatik olarak doldurduk.</strong>",
    placeholder: "Seçici dizesi...",
    regenerate: "Seçiciyi Yeniden Oluştur",
    regenerating: "Yeniden oluşturuluyor...",
    errors: {
      noUrl: "Haber kaynağı URL'si bulunamadı.",
      failedRegenerate: "Seçici yeniden oluşturulamadı.",
      errorRegenerate: "Seçici yeniden oluşturulurken bir hata oluştu."
    }
  },
  step08: {
    title: "Önizleme",
    placeholder: "İlk haber bülteninizi oluşturmaya hazır mısınız?",
    generateBtn: "Haber Bülteni E-postası Oluştur",
    sentBtn: "Gönderildi! E-postanızı kontrol edin",
    sendTestBtn: "Test E-postası Gönder",
    regenerateBtn: "Yeniden Oluştur",
    loading: {
      initializing: "Başlatılıyor...",
      starting: "Oluşturma başlatılıyor...",
      scraping: "İçerik kazınıyor...",
      translating: "Makale çevriliyor...",
      formatting: "E-posta biçimlendiriliyor...",
      sending: "E-posta sağlayıcısına bağlanılıyor...",
      authenticating: "Kimlik doğrulanıyor...",
      sendingArticle: "Makale gönderiliyor...",
      creating: "Haber kaynağı oluşturuluyor...",
      saving: "Yapılandırma kaydediliyor...",
      finalizing: "Kurulum tamamlanıyor..."
    },
    errors: {
      generationFailed: "Oluşturma başarısız: ",
      createFailed: "Haber kaynağı oluşturulamadı. Lütfen tekrar deneyin.",
      errorCreating: "Haber kaynağı oluşturma hatası: ",
      sendFailed: "E-posta gönderilemedi: "
    },
    defaultSubject: "Oluşturulan Haber Bülteni Önizlemeniz"
  },
  step09: {
    title: "Makaleyi e-postanızdan göndermek için",
    subtitle: "Uygulama Şifresi (İsteğe Bağlı)",
    description: "(Gmail hizmetleriniz varsa, uygulama şifrenizi buraya koyun)",
    label: "Uygulama Şifresi",
    placeholder: "Uygulama Şifreniz"
  },
  step10: {
    title: "Gmail Adresi (İsteğe Bağlı)",
    subtitle: "Gmail E-posta Adresi",
    description: "Belirli bir Gmail adresinden göndermek istiyorsanız",
    placeholder: "e-postaniz@gmail.com"
  },
  step11: {
    title: "Test E-postası Gönder",
    subtitle: "Yapılandırmayı doğrulamak için kendinize bir test e-postası gönderin.",
    sendNow: "Şimdi Gönder",
    sent: "Gönderildi! E-postanızı kontrol edin",
    loading: {
      connecting: "E-posta sağlayıcısına bağlanılıyor...",
      authenticating: "Kimlik doğrulanıyor...",
      sending: "Makale gönderiliyor..."
    }
  },
  step12: {
    title: "Bu haber bültenini takipçilerinizle paylaşın",
    subtitle: "Abonelik hunisine bağlantı (e-posta almaya başlamadan önce davetinizi kabul etmeleri gerekecektir)",
    copy: "Kopyala",
    copied: "Bağlantı kopyalandı!"
  },
  step13: {
    title: "Plan ve Sınırlar",
    currentPlan: "Mevcut Plan:",
    limits: "Sınırlar:",
    unknown: "Bilinmiyor",
    changePlan: "Planı Değiştir",
    advancedFeatures: "Daha gelişmiş özelliklere mi ihtiyacınız var?",
    developerText: "Bu haber bülteni abonelik hunisini sunucunuza entegre etmek, oluşturulan tüm makalelerinizin bir blogu ve API Anahtarımızla kod tabanınızdan kullanıcıları abone yapmak için geliştirici bölümümüze göz atın.",
    dashboardBtn: "Panoya Git",
    usage: "Kullanım:",
    limitDetails: {
      free: "100 kullanıcı sınırı",
      starter: "5 kaynak, 100k kullanıcı",
      growth: "17 kaynak, 250k kullanıcı",
      pro: "25 kaynak, 500k kullanıcı",
      master: "50 kaynak, sınırsız kullanıcı",
      vipfree: "VIP Ücretsiz"
    }
  }
};
