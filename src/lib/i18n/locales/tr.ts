// tr strings for locales. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale tr
export default {
  "auth": {
    "logo": "/icons/logo.png",
    "login": {
      "pageTitle": "Giriş yap",
      "title": "AIBAN'a giriş yapın",
      "subtitle": "Kaldığınız yerden devam etmek için bağlanın.",
      "google": "Google ile devam et",
      "or": "veya",
      "emailPlaceholder": "adiniz@ornek.com",
      "continueWithEmail": "E-posta ile devam et",
      "switchText": "Hesabınız yok mu?",
      "switchLink": "Kayıt ol",
      "switchHref": "/signup"
    },
    "signup": {
      "pageTitle": "Kayıt ol",
      "title": "Hesabınızı oluşturun",
      "subtitle": "Kredi kartına ihtiyacınız yok.",
      "google": "Google ile devam et",
      "or": "veya",
      "emailPlaceholder": "adiniz@ornek.com",
      "continueWithEmail": "E-posta ile devam et",
      "switchText": "Zaten bir hesabınız var mı?",
      "switchLink": "Giriş yap",
      "switchHref": "/login"
    }
  },
  "landing": {
    "seo": {
      "title": "AIBAN | Web siteniz, her okurun kendi dilinde bir bültene dönüşür",
      "description": "AIBAN zaten yayımladığınız içerikleri okur, sizin üslubunuzla bir bülten sayısı yazar ve sizin adınızla gönderir. Her abone sayıyı kendi dilinde alır.",
      "ogImageAlt": "AIBAN logosu"
    },
    "skipLink": "Ana içeriğe geç",
    "hero": {
      "eyebrow": "Hizmet işletmeleri için bültenler",
      "title": "Web siteniz, her okurun kendi dilinde haftalık bir bültene dönüşür",
      "lead": "AIBAN zaten yayımladığınız içerikleri okur, sizin üslubunuzla bir sayı yazar ve sizin adınızla gönderir. Her abone sayıyı okuduğu dilde alır. Bir kez kurarsınız, sonra kendi kendine çalışmaya devam eder.",
      "formLabel": "Web siteniz",
      "formPlaceholder": "sirketiniz.com",
      "formHint": "Girdiğiniz adresten örnek bir sayı hazırlarız. Başlamak ücretsizdir ve kart gerekmez.",
      "formSubmit": "Bültenimi önizle",
      "formError": "sirketiniz.com gibi bir web adresi girin.",
      "secondaryCta": "Nasıl çalıştığını görün"
    },
    "preview": {
      "badge": "Örnek önizleme",
      "note": "Bu, yer tutucu metin içeren örnek bir düzendir. Başladığınızda AIBAN gerçek sayıyı en yeni makalenizden yazar.",
      "fromLabel": "Gönderen",
      "toLabel": "Alıcı",
      "subjectLabel": "Konu",
      "languageLabel": "Okur dili",
      "readOnBlog": "Blogda oku",
      "startCta": "{site} ile ücretsiz başlayın",
      "startCtaGeneric": "Ücretsiz başlayın",
      "liveRegion": "Örnek önizleme {site} için güncellendi."
    },
    "chain": {
      "eyebrow": "Nasıl çalışır",
      "title": "Bir kez bilgi verirsiniz, sonra kendiliğinden çalışır",
      "lead": "Web sitenizi AIBAN'a bir kez verirsiniz. Ardından aşağıdaki her adım, seçtiğiniz takvimde kendiliğinden gerçekleşir.",
      "triggerLabel": "Ne zaman",
      "actionLabel": "Sonra",
      "trigger": {
        "title": "Pazartesi saat 9:00 olduğunda",
        "body": "Ya da seçtiğiniz herhangi bir takvim: günlük, haftalık veya aylık."
      },
      "steps": [
        {
          "title": "AIBAN en yeni makalenizi bulur",
          "body": "Web sitenizi kontrol eder ve ideal okurunuzun en çok ilgileneceği yazıyı seçer."
        },
        {
          "title": "Sayıyı sizin üslubunuzla yazar",
          "body": "Metin, sitenizin yazılış biçimine göre sizin gibi konuşacak şekilde yeniden yazılır."
        },
        {
          "title": "Sayıyı her okur için çevirir",
          "body": "Her abone, kaydolurken seçtiği dilde alır."
        },
        {
          "title": "Sizin adınızla gönderir",
          "body": "Okurlar sizin adınızı görür, yanıtları da gelen kutunuza düşer."
        },
        {
          "title": "Sayıyı blogunuzda yayımlar",
          "body": "Her sayının kendi bağlantısı olan herkese açık bir makale sayfası da olur."
        },
        {
          "title": "Neler olduğunu size gösterir",
          "body": "Panelinizde kimlerin katıldığı ve okurların hangi bağlantılara tıkladığı listelenir."
        }
      ],
      "alsoTitle": "Şu durumlarda da çalışır",
      "also": [
        {
          "title": "Biri sitenizden kaydolduğunda",
          "body": "E-postayla onaylar ve sayılarınızı almaya başlar."
        },
        {
          "title": "Bir bağlantı veya metin yapıştırdığınızda",
          "body": "AIBAN aynı adımlarla bu konuda bir sayı yazar ve gönderir."
        },
        {
          "title": "Bir kişi listesi yüklediğinizde",
          "body": "AIBAN listeyi temizler, tekrarları kaldırır ve her kişinin dilini tahmin eder."
        }
      ]
    },
    "languages": {
      "eyebrow": "Her dil",
      "title": "Her okur sayıyı kendi dilinde alır",
      "body": "Ayrı sürümler yazmanız gerekmez. AIBAN her sayıyı abonelerinizin okuduğu tüm dillere çevirir ve her birinde tonunuzu korur. Listede İspanyolca, Portekizce, Fransızca, Almanca, Hintçe, Arapça, Japonca ve daha birçok dil var.",
      "sampleNote": "Aynı örnek sayı, üç farklı okura ulaştığı haliyle."
    },
    "sender": {
      "eyebrow": "Adresiniz",
      "title": "Sizin adınızla gönderilir",
      "body": "Sayılar sizin adınız ve e-posta imzanızla gelir. AIBAN onları kendi doğrulanmış adresinden gönderir, bu yüzden bizimle hiçbir e-posta şifresi paylaşmazsınız. Bir okur yanıt verdiğinde yanıt sizin gelen kutunuza gider.",
      "inboxLabel": "Okurun gelen kutusunda nasıl görünür",
      "inboxFrom": "Siz",
      "inboxSubject": "Bu hafta {site} sitesinden",
      "inboxSnippet": "En yeni makalenizin sizin üslubunuzla yazılmış kısa bir özeti.",
      "inboxTime": "9:00"
    },
    "grow": {
      "eyebrow": "Listenizi büyütün",
      "title": "Siteniz için bir kayıt formu ve kendiliğinden dolan bir blog",
      "items": [
        {
          "title": "Kayıt formu",
          "body": "AIBAN formunu web sitenize ekleyin. Yeni okurlar dillerini seçer ve e-postayla onaylar."
        },
        {
          "title": "Otomatik blog",
          "body": "Her sayı, aramada bulunabilen ve bağlantıyla paylaşılabilen herkese açık bir makale sayfasına dönüşür."
        },
        {
          "title": "Kişi içe aktarma",
          "body": "Mevcut müşterilerinizi bir CSV veya Excel dosyasından getirin ya da bir liste yapıştırın."
        }
      ]
    },
    "useCases": {
      "eyebrow": "Kimler için",
      "title": "İlişkilerle büyüyen işletmeler için yapıldı",
      "lead": "Müşterileriniz tavsiye ve güvenle geliyorsa, sizden düzenli gelen bir not akıllarda kalmanızı sağlar. AIBAN bu notu sizin için yazar.",
      "items": [
        {
          "title": "Ajanslar ve web tasarımcıları",
          "body": "Müşterilerinize ve potansiyel müşterilerinize her hafta en yeni işlerinizi ve makalelerinizi gönderin, aynı kurulumu müşteri siteleri için de çalıştırın."
        },
        {
          "title": "BT ve yazılım firmaları",
          "body": "Sürüm notlarını ve blog yazılarını, her müşterinin kendi dilinde okuduğu kısa bir güncellemeye dönüştürün."
        },
        {
          "title": "Emlak",
          "body": "Yeni ilanları ve piyasa yazılarını farklı diller konuşan alıcı ve satıcılarla paylaşın."
        },
        {
          "title": "Avukatlar ve muhasebeciler",
          "body": "Müşterilerinizi zaten yazdığınız konular hakkında sakin ve tutarlı bir formatta bilgilendirin."
        },
        {
          "title": "Koçlar ve eğitmenler",
          "body": "En son dersinizi veya makalenizi, yeniden yazmadan belirli bir günde topluluğunuza gönderin."
        }
      ]
    },
    "pricingIntro": {
      "eyebrow": "Fiyatlandırma",
      "title": "Ücretsiz başlayın, listeniz büyüdükçe yükseltin",
      "lead": "Ücretsiz plan 1 kaynak ve en fazla 100 abone içerir. Ücretli planlar daha fazla kaynak ve abone ekler."
    },
    "faqTitle": "Başlamadan önce sorulan sorular",
    "faq": [
      {
        "id": "what-do-i-need",
        "q": "Başlamak için neye ihtiyacım var?",
        "a": "Web sitenizin adresine ve bir e-posta adresine. AIBAN konularınızı ve yazış biçiminizi öğrenmek için sitenizi okur."
      },
      {
        "id": "do-i-write",
        "q": "Bir şey yazmam gerekiyor mu?",
        "a": "Gerekmiyor. AIBAN her sayıyı içeriğinizden yazar. Belirli bir konuda sayı istediğinizde bir bağlantı veya metin yapıştırabilirsiniz."
      },
      {
        "id": "languages",
        "q": "Okurlarım hangi dillerde alabilir?",
        "a": "AIBAN her sayıyı her abonenin okuduğu dile çevirir. Bülteninizi kurarken dillerin tam listesini görebilirsiniz."
      },
      {
        "id": "sender",
        "q": "E-postalar kimden gelir?",
        "a": "AIBAN'ın gönderim adresinden, gönderen olarak sizin adınızla. Yanıtlar doğrudan gelen kutunuza gider. Bize hiçbir zaman e-posta şifrenizi vermezsiniz."
      },
      {
        "id": "contacts",
        "q": "Mevcut kişilerimi getirebilir miyim?",
        "a": "Evet. Bir CSV veya Excel dosyası yükleyin ya da bir liste yapıştırın. AIBAN listeyi temizler, tekrarları kaldırır ve her kişinin dilini tahmin eder."
      },
      {
        "id": "schedule",
        "q": "Sayılar ne sıklıkla gönderilir?",
        "a": "Takvimi kurulum sırasında siz seçersiniz ve panelinizden istediğiniz zaman değiştirebilirsiniz."
      },
      {
        "id": "free-plan",
        "q": "Ücretsiz bir plan var mı?",
        "a": "Evet. Ücretsiz plan 1 kaynak ve en fazla 100 abone içerir. Ücretli planlar daha fazla kaynak ve abone ekler."
      },
      {
        "id": "cancel",
        "q": "İptal edebilir miyim?",
        "a": "Evet. İstediğiniz zaman info@aiban.news adresine yazın, ücretli planınızı iptal edelim veya sizi Ücretsiz plana geri alalım."
      }
    ],
    "finalCta": {
      "title": "Web sitenizle başlayın",
      "body": "Web sitenizi AIBAN'a verin, ilk sayınızı kontrol edin, hazır olduğunuzda açın.",
      "cta": "Ücretsiz başlayın",
      "secondary": "Yardım merkezini okuyun"
    },
    "footer": {
      "tagline": "Kendi içeriğinizden yazılan ve her okura kendi dilinde gönderilen bültenler.",
      "product": "Ürün",
      "company": "Şirket",
      "legal": "Yasal",
      "links": {
        "howItWorks": "Nasıl çalışır",
        "pricing": "Fiyatlandırma",
        "demo": "Demo",
        "help": "Yardım merkezi",
        "about": "Hakkımızda",
        "careers": "Kariyer",
        "privacy": "Gizlilik politikası",
        "terms": "Hizmet şartları",
        "cookies": "Çerez politikası"
      },
      "contactLabel": "İletişim",
      "rights": "Tüm hakları saklıdır."
    }
  },
  "help": {
    "title": "Daha yüksek limitler talep edin",
    "subtitle": "İhtiyacınız olan limitleri bize bildirin, size e-postayla dönelim.",
    "contact": {
      "cta": "Talep gönder",
      "successTitle": "Talebiniz gönderilmeye hazır",
      "successBody": "E-posta uygulamanız talebinizle birlikte açıldı. Oradan gönderin, size e-postayla yanıt verelim.",
      "learnMore": "/plans"
    },
    "questions": {
      "desiredLimitsHelp": "İhtiyacınız olan limitleri yazın, örneğin kaç abone ve kaç kaynak.",
      "useCaseHelp": "Ne gönderdiğinizi, kime ve ne sıklıkla gönderdiğinizi anlatın.",
      "expectedSpendHelp": "Kabaca bir tahmin, size plan önermemize yardımcı olur. Bilinmiyor olarak bırakabilirsiniz."
    },
    "form": {
      "nameLabel": "Ad",
      "emailLabel": "E-posta",
      "companyLabel": "Şirket",
      "optional": "(isteğe bağlı)",
      "limitsLabel": "İhtiyacınız olan limitler",
      "useCaseLabel": "AIBAN'ı nasıl kullanıyorsunuz",
      "spendLabel": "Beklenen aylık harcama",
      "spend": {
        "lt500": "500 $'dan az",
        "500_2k": "500 $ ile 2.000 $ arası",
        "2k_10k": "2.000 $ ile 10.000 $ arası",
        "gt10k": "10.000 $'dan fazla",
        "unknown": "Henüz bilmiyorum"
      },
      "urgencyLabel": "Aciliyet",
      "urgency": {
        "low": "Düşük",
        "normal": "Normal",
        "high": "Yüksek"
      },
      "replyLabel": "Size nasıl yanıt verelim?",
      "reply": {
        "email": "E-postayla",
        "call": "Telefonla"
      },
      "payAsYouGo": "Kullandıkça ödemekle ilgileniyorum",
      "sending": "Gönderiliyor...",
      "sentTitle": "Talep gönderildi",
      "sentBody": "Talebinizi aldık. Verdiğiniz e-posta adresine yanıt vereceğiz.",
      "retryBefore": "E-posta uygulamanız açılmadıysa",
      "retryLink": "talebi yeniden açın",
      "retryAfter": "veya şu adrese yazın:",
      "errors": {
        "name": "Adınızı girin (en az 2 karakter).",
        "email": "Yanıt verebileceğimiz bir e-posta adresi girin, örneğin ad@ornek.com.",
        "company": "En az 2 karakter girin veya bu alanı boş bırakın.",
        "desiredLimits": "İhtiyacınız olan limitleri en az 10 karakterle açıklayın.",
        "useCase": "Kullanım şeklinizi en az 20 karakterle açıklayın."
      }
    },
    "faqs": [
      {
        "id": "limits-how",
        "q": "Daha yüksek limitler nasıl çalışır?",
        "a": "İhtiyacınız olan limitlerle bir talep gönderin. Hesabınıza uygun seçeneklerle e-postayla yanıt veririz."
      }
    ],
    "links": {
      "docs": "/plans",
      "community": "/help"
    }
  },
  "faq": [
    {
      "q": "AIBAN ne yapar?",
      "a": "AIBAN web siteniz, blogunuz veya seçtiğiniz haber siteleri gibi zaten yayımladığınız içerikleri okur. Sizin üslubunuzla yeni sayılar yazar ve bunları bülten olarak gönderir. Her abone sayıyı seçtiği dilde, gönderen olarak sizin adınızla alır."
    },
    {
      "q": "Ücretsiz bir plan var mı?",
      "a": "Evet. Ücretsiz plan 1 kaynak ve en fazla 100 abone içerir. Daha fazlasına ihtiyacınız varsa bize yazın, planınızı değiştirelim."
    },
    {
      "q": "Aboneler bülteni kendi dillerinde nasıl alır?",
      "a": "Her abone kaydolurken tercih ettiği dili seçer. AIBAN her sayıyı göndermeden önce o dile çevirir."
    },
    {
      "q": "Sayılar kendi e-posta adresimden gelebilir mi?",
      "a": "Sayılar AIBAN'ın gönderim adresinden sizin adınız ve e-posta imzanızla çıkar, yanıtlar gelen kutunuza gelir. E-posta şifrenizi istemeyiz, bu yüzden sızabilecek hiçbir bilginiz olmaz."
    },
    {
      "q": "İnsanlar nasıl abone olur?",
      "a": "Bir kayıt sayfası ve web sitenize yerleştirebileceğiniz bir kayıt bileşeni alırsınız. Kişileri kendiniz de ekleyebilir veya bir liste yükleyebilirsiniz."
    },
    {
      "q": "İstediğim zaman iptal edebilir miyim?",
      "a": "Evet. İstediğiniz zaman info@aiban.news adresine yazın, ücretli planınızı iptal edelim veya sizi Ücretsiz plana geri alalım."
    }
  ],
  "plans": {
    "currency": "USD",
    "billingIntervals": [
      "aylık",
      "yıllık"
    ],
    "currentPlan": "free",
    "plans": [
      {
        "id": "free",
        "name": "Ücretsiz",
        "monthly": 0,
        "yearly": 0,
        "tagline": "AIBAN'ı tek bir kaynakla deneyin",
        "featuresBase": [
          "1 kaynak",
          "En fazla 100 abone"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": 1,
          "users": 100
        },
        "ctaLabel": "Mevcut plan",
        "tier": 0
      },
      {
        "id": "starter",
        "name": "Starter",
        "monthly": 17,
        "yearly": 132,
        "tagline": "Büyüyen bültenler için",
        "featuresBase": [
          "5 kaynak",
          "En fazla 100 bin abone"
        ],
        "featuresDelta": [
          "E-posta desteği",
          "Temel çeviri"
        ],
        "limits": {
          "newsSources": 5,
          "users": 100000
        },
        "ctaLabel": "Starter planını seç",
        "productId": "prod_starter_id",
        "tier": 1
      },
      {
        "id": "growth",
        "name": "Growth",
        "monthly": 35,
        "yearly": 273,
        "tagline": "Yerleşik bültenler için",
        "featuresBase": [
          "17 kaynak",
          "En fazla 250 bin abone"
        ],
        "featuresDelta": [
          "Özel markalama",
          "Gelişmiş analitik"
        ],
        "limits": {
          "newsSources": 17,
          "users": 250000
        },
        "ctaLabel": "Growth planını seç",
        "productId": "prod_growth_id",
        "tier": 2
      },
      {
        "id": "pro",
        "name": "Pro",
        "monthly": 80,
        "yearly": 624,
        "tagline": "Pazarlama profesyonelleri için",
        "featuresBase": [
          "25 kaynak",
          "En fazla 500 bin abone"
        ],
        "featuresDelta": [
          "API erişimi",
          "Öncelikli işleme"
        ],
        "limits": {
          "newsSources": 25,
          "users": 500000
        },
        "ctaLabel": "Pro planını seç",
        "productId": "prod_pro_id",
        "tier": 3
      },
      {
        "id": "master",
        "name": "Master",
        "monthly": 150,
        "yearly": 1170,
        "tagline": "Büyük kitleler için",
        "featuresBase": [
          "50 kaynak",
          "Sınırsız abone"
        ],
        "featuresDelta": [
          "Birebir destek",
          "Özel webhook'lar"
        ],
        "limits": {
          "newsSources": 50,
          "users": -1
        },
        "ctaLabel": "Master planını seç",
        "productId": "prod_master_id",
        "tier": 4
      },
      {
        "id": "vipfree",
        "name": "Ücretsiz VIP",
        "monthly": 0,
        "yearly": 0,
        "tagline": "Partnerler için tam erişim",
        "featuresBase": [
          "Sınırsız kaynak",
          "Sınırsız abone"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": -1,
          "users": -1
        },
        "ctaLabel": "Mevcut plan",
        "internalOnly": true,
        "tier": 5
      }
    ],
    "contact": {
      "text": "Özel bir çözüme mi ihtiyacınız var?",
      "cta": "Bize ulaşın",
      "href": "/help"
    }
  },
  "article": {
    "notFound": "Makale bulunamadı.",
    "errorFetching": "Bu makaleyi yükleyemedik. Bir dakika sonra sayfayı yenileyip tekrar deneyin.",
    "noArticleSpecified": "Makale belirtilmedi.",
    "goBack": "Geri dön",
    "loading": "Yükleniyor..."
  },
  "pricing": {
    "eyebrow": "Fiyatlandırma",
    "title": "Planlar ve fiyatlar",
    "currentPlan": "Mevcut plan:",
    "monthly": "Aylık",
    "yearly": "Yıllık",
    "yearlySave": "%35 tasarruf",
    "intervalLabel": "Fatura dönemi",
    "billedYearly": "yıllık faturalandırılır",
    "perMonthShort": "/mo",
    "perYearShort": "/yr",
    "freeCta": "Ücretsiz başlayın",
    "processing": "Ödeme sayfası açılıyor...",
    "askMore": "Her hesap Ücretsiz planla başlar. Daha fazlasına ihtiyacınız varsa {email} adresinden bize yazın, planınızı değiştirelim.",
    "askFor": "{planName} planını isteyin",
    "askAction": "Bize yazın",
    "checkoutError": "Ödeme sayfasını açamadık. Lütfen biraz sonra tekrar deneyin.",
    "networkError": "Sunucuya ulaşamadık. Bağlantınızı kontrol edip tekrar deneyin.",
    "includes": "Şunları içerir",
    "pageMetaTitle": "Fiyatlandırma | AIBAN",
    "pageMetaDescription": "AIBAN planları ve fiyatları. 1 kaynak ve en fazla 100 aboneyle ücretsiz başlayın, daha fazlasına ihtiyacınız olduğunda aylık veya yıllık bir plana geçin.",
    "pageTitle": "Fiyatlandırma",
    "pageLead": "1 kaynak ve en fazla 100 abone içeren Ücretsiz planla başlayın. Daha fazla kaynağa veya aboneye ihtiyacınız olduğunda bize yazın, sizi aylık veya yıllık faturalandırılan ücretli bir plana geçirelim.",
    "faqTitle": "Faturalandırma soruları",
    "contactText": "Daha yüksek limitlere veya özel bir kuruluma mı ihtiyacınız var?",
    "contactCta": "Bize ulaşın",
    "everythingIn": "Önceki plandaki her şey ve:",
    "isCurrentPlan": "Bu sizin mevcut planınız",
    "downgradeTo": "{planName} planına geç",
    "upgradeTo": "{planName} planını seç",
    "mockMode": "Test modu",
    "mostPopular": "En popüler",
    "perMonth": "aylık",
    "perYear": "yıllık",
    "youSave": "Kazancınız"
  },
  "confirmSubscription": {
    "title": "Aboneliğinizi onaylayın",
    "goBack": "Geri dön",
    "pleaseAccept": "Aboneliğinizi tamamlamak için lütfen şartları kabul edin.",
    "iAccept": "Şunları kabul ediyorum:",
    "termsAndConditions": "Şartlar ve koşullar",
    "and": "ve",
    "privacyPolicy": "Gizlilik politikası",
    "confirm": "Aboneliği onayla",
    "mustAccept": "Abone olmak için şartları kabul etmelisiniz.",
    "invalidLink": "Bu onay bağlantısı eksik. Size gönderdiğimiz en son e-postayı açın ve içindeki bağlantıyı kullanın."
  },
  "articles": {
    "title": "Son makaleler",
    "subtitle": "AIBAN'ın gönderdiği bültenler için yazdığı makaleler.",
    "producedIn": "Bu makalelerin bulunduğu diller",
    "searchPlaceholder": "Makalelerde ara...",
    "noArticlesFound": "Makale bulunamadı.",
    "created": "Oluşturulma:",
    "language": "Dil:",
    "rightsReserved": "Tüm hakları saklıdır.",
    "errorFetching": "Makaleleri yükleyemedik. Bir dakika sonra sayfayı yenileyip tekrar deneyin."
  },
  "blog": {
    "metaTitle": "{name} blogu",
    "metaDescription": "{name} makaleleri. Yenilerini e-postayla almak için abone olun.",
    "eyebrow": "Bülten blogu",
    "heroFrom": "{name} makaleleri",
    "heroDescription": "Bunlar bu bültenin yayımladığı makaleler. Yenilerini e-postayla almak için abone olun.",
    "subscribe": "Abone ol",
    "home": "Blog ana sayfası",
    "featured": "Son makale",
    "latest": "Son makaleler",
    "latestHint": "En yeniler önce. Bazı makalelerin görseli yoktur, bu yüzden yalnızca metin olarak görünürler.",
    "articleCount": "{language} dilinde {count} makale",
    "articleCountOne": "{language} dilinde 1 makale",
    "languages": "Bir dil seçin",
    "minRead": "{n} dk okuma",
    "readArticle": "Makaleyi oku",
    "page": "Sayfa {page}",
    "newer": "Daha yeni makaleler",
    "older": "Daha eski makaleler",
    "pagination": "Makale sayfaları",
    "emptyTitle": "Henüz makale yok",
    "emptyBody": "Bu bülten burada henüz makale yayımlamadı. İlkini e-postayla almak için abone olun.",
    "endTitle": "Daha eski makale yok",
    "endBody": "Listenin sonuna ulaştınız.",
    "backToNewest": "En yeni makalelere git",
    "errorTitle": "Bu makaleleri yükleyemedik",
    "errorBody": "Makale sunucusu zamanında yanıt vermedi. Tekrar denemek için bir dakika sonra sayfayı yenileyin.",
    "reload": "Sayfayı yenile",
    "missingHolder": "Bu blog bağlantısı eksik, çünkü hangi blogun açılacağını belirtmiyor. Tam bağlantıyı bülten sahibinden isteyin.",
    "redirecting": "Blog açılıyor...",
    "publishedWith": "AIBAN ile yayımlandı",
    "cta": {
      "title": "Sonraki makaleyi e-postayla alın",
      "body": "{name} bültenine abone olun, yeni makaleler gelen kutunuza gelsin. İstediğiniz zaman abonelikten çıkabilirsiniz.",
      "button": "Abone ol"
    },
    "search": {
      "label": "Makalelerde ara",
      "placeholder": "Kelime veya ifadeyle arayın",
      "button": "Ara",
      "suggestions": "Öneriler",
      "recent": "Son aramalar",
      "clearRecent": "Son aramaları temizle",
      "title": "Arama sonuçları",
      "resultsFor": "\"{q}\" için sonuçlar",
      "count": "{count} makale bulundu",
      "countOne": "1 makale bulundu",
      "searching": "Makaleler aranıyor",
      "emptyTitle": "\"{q}\" ile eşleşen makale yok",
      "emptyBody": "Yazımı kontrol edin veya daha kısa bir kelime deneyin. Blogdaki tüm makalelere de göz atabilirsiniz.",
      "browseAll": "Tüm makalelere göz at",
      "noQuery": "Bu blogda arama yapmak için yukarıya bir kelime veya ifade yazın.",
      "error": "Makale sunucusu yanıt vermediği için arama durdu. Bir dakika sonra tekrar deneyin.",
      "tryAgain": "Tekrar dene",
      "limitNote": "İlk {count} eşleşme gösteriliyor. Listeyi daraltmak için daha belirli bir ifade kullanın."
    },
    "article": {
      "back": "Tüm makaleler",
      "published": "Yayımlanma: {date}",
      "by": "Yazan: {name}",
      "otherLanguages": "Diğer dillerde okuyun",
      "otherLanguagesHint": "Bu bülten şu dillerde de yayımlanıyor. Her bağlantı blogu o dilde açar.",
      "share": "Bu makaleyi paylaş",
      "copyLink": "Bağlantıyı kopyala",
      "copied": "Bağlantı kopyalandı. İstediğiniz yere yapıştırabilirsiniz.",
      "copyFailed": "Bağlantı kopyalanamadı. Bunun yerine tarayıcınızın adres çubuğundan kopyalayın.",
      "notFoundTitle": "Makale bulunamadı",
      "notFoundBody": "Bu makale kaldırılmış olabilir veya bağlantı eksik. Diğer makaleleri görmek için blogu açın.",
      "errorTitle": "Bu makaleyi yükleyemedik",
      "errorBody": "Makale sunucusu zamanında yanıt vermedi. Tekrar denemek için bir dakika sonra sayfayı yenileyin.",
      "goToBlog": "Bloga git"
    }
  },
  "nav": {
    "mainLabel": "Ana menü",
    "legalLabel": "Yasal",
    "home": "AIBAN ana sayfası",
    "menu": "Menü",
    "openMenu": "Menüyü aç",
    "closeMenu": "Menüyü kapat",
    "howItWorks": "Nasıl çalışır",
    "pricing": "Fiyatlandırma",
    "help": "Yardım",
    "about": "Hakkımızda",
    "privacy": "Gizlilik",
    "terms": "Şartlar",
    "cookies": "Çerezler",
    "signOut": "Çıkış yap",
    "chooseLanguage": "Dil seçin",
    "currentLanguage": "Dil: {name}"
  },
  "about": {
    "metaTitle": "Hakkımızda | AIBAN",
    "metaDescription": "AIBAN, bir işletmenin zaten yayımladığı içerikleri kendi kendine giden bir bültene dönüştürür. Bülten her abonenin dilinde ve işletme sahibinin adıyla gönderilir.",
    "eyebrow": "Hakkımızda",
    "title": "AIBAN hakkında",
    "lead": "AIBAN, bir işletmenin zaten yayımladığı içerikleri kendi kendine giden bir bültene dönüştürür. Her abone bülteni kendi dilinde okur ve bülten işletme sahibinin adıyla gelir.",
    "whatTitle": "AIBAN ne yapar",
    "whatBody": [
      "İçeriğinizin nerede olduğunu AIBAN'a söylersiniz: web siteniz, blogunuz veya takip ettiğiniz haber siteleri. Orada yeni bir şey çıktığında AIBAN, tarif ettiğiniz üslupla bir sayı yazar ve seçtiğiniz takvimde abonelerinize gönderir.",
      "Her abone kaydolurken bir dil seçer ve her sayı gönderilmeden önce o dile çevrilir. Makaleler web sayfası olarak da yayımlanır ve bunları kendi sitenize de gönderebilirsiniz."
    ],
    "whoTitle": "Kim yapıyor",
    "whoBody": [
      "AIBAN'ı kurucusu Luis Murillo Baltodano geliştiriyor. Luis, bilgisayar grafikleri ve otomasyon geçmişine sahip yaratıcı bir mühendis.",
      "Açık kaynak çalışmalarından bazıları aşağıda listelenmiştir."
    ],
    "projectsTitle": "Kurucunun açık kaynak çalışmaları",
    "projects": [
      {
        "name": "Scene Preset",
        "url": "https://github.com/LuisArmando-TestCoder/scene-preset",
        "desc": "Three.js ve 3D web API'leriyle çalışırken tekrar eden kodu ortadan kaldıran bir kütüphane."
      },
      {
        "name": "Canvas Preset",
        "url": "https://github.com/LuisArmando-TestCoder/canvas-preset",
        "desc": "Yaygın Canvas API işleri için yardımcı araçlar."
      },
      {
        "name": "Atomic Gatsby şablonu",
        "url": "https://github.com/LuisArmando-TestCoder/atomic-gatsby-typescript-recoiljs",
        "desc": "Atomik tasarıma göre düzenlenmiş bir başlangıç şablonu."
      }
    ],
    "githubLabel": "Luis GitHub'da",
    "newTab": "(yeni sekmede açılır)",
    "contactTitle": "Bize ulaşın",
    "contactBody": "Sorular, geri bildirim veya iş birliği fikirleri için info@aiban.news adresine yazın.",
    "emailCta": "info@aiban.news adresine yazın",
    "startCta": "Ücretsiz başlayın",
    "helpCta": "Yardım merkezini okuyun"
  },
  "careers": {
    "metaTitle": "Kariyer | AIBAN",
    "metaDescription": "AIBAN'da şu anda açık pozisyon yok. Yine de info@aiban.news adresinden bize yazabilirsiniz.",
    "eyebrow": "Kariyer",
    "title": "AIBAN'da kariyer",
    "lead": "AIBAN'da şu anda açık pozisyon yok.",
    "body": "Bir pozisyon açıldığında bu sayfada listelenecek. İleride AIBAN üzerinde çalışmak isterseniz, kendinizi ve ne geliştirmek istediğinizi anlatan kısa bir not gönderin.",
    "emailCta": "info@aiban.news adresine yazın",
    "emailSubject": "AIBAN üzerinde çalışmak",
    "aboutCta": "AIBAN hakkında okuyun"
  },
  "legal": {
    "navLabel": "Yasal belgeler",
    "lastUpdated": "Son güncelleme: {date}",
    "privacy": {
      "title": "Gizlilik politikası",
      "metaTitle": "Gizlilik politikası | AIBAN",
      "metaDescription": "AIBAN'ın verilerinizi nasıl topladığı, kullandığı ve koruduğu ile veri haklarınızı nasıl kullanabileceğiniz."
    },
    "terms": {
      "title": "Hizmet şartları",
      "metaTitle": "Hizmet şartları | AIBAN",
      "metaDescription": "Hesap oluşturduğunuzda ve AIBAN'ı kullandığınızda geçerli olan şartlar."
    },
    "cookies": {
      "title": "Çerez politikası",
      "metaTitle": "Çerez politikası | AIBAN",
      "metaDescription": "AIBAN'ın hangi çerezleri kullandığı, ne işe yaradıkları, ne kadar süre kaldıkları ve bunları nasıl kontrol edebileceğiniz."
    }
  },
  "demoPage": {
    "metaTitle": "Demo | AIBAN",
    "metaDescription": "AIBAN'ın tanıtım videosunu izleyin ve kaydolduktan sonra, web sitenizi eklemekten ilk sayınızı göndermeye kadar neler olduğunu görün.",
    "eyebrow": "Demo",
    "title": "AIBAN'ın nasıl çalıştığını görün",
    "lead": "Tanıtım videosunu izleyin, ardından kaydolduktan sonra neler olduğunu okuyun.",
    "videoTitle": "AIBAN tanıtım videosu",
    "playLabel": "Tanıtım videosunu oynat",
    "videoNote": "Video YouTube üzerinden oynatılır.",
    "stepsTitle": "Kaydolduktan sonra neler olur",
    "steps": [
      {
        "title": "Web sitenizi ekleyin",
        "body": "Sitenizin, blogunuzun veya takip ettiğiniz bir haber sitesinin adresini girin. AIBAN yeni içerik için orayı okur."
      },
      {
        "title": "Okurlarınızı ve üslubunuzu tarif edin",
        "body": "Bülteninizi kimin okuduğunu ve nasıl bir dille yazılması gerektiğini AIBAN'a anlatın. Sitenizden bir açıklama önermesine de izin verebilirsiniz."
      },
      {
        "title": "Bir takvim seçin",
        "body": "Sayıların ne sıklıkla gönderileceğini seçin. Daha sonra panelinizden değiştirebilirsiniz."
      },
      {
        "title": "Abone ekleyin",
        "body": "Bir liste yükleyin, kişileri tek tek ekleyin veya kayıt sayfanızı ve bileşeninizi paylaşın. Her abone bir dil seçer."
      },
      {
        "title": "Gönderen adınızı ve imzanızı ekleyin",
        "body": "Okurların göreceği adı ve e-posta imzasını ekleyin. AIBAN her sayıyı kendi doğrulanmış adresinden sizin adınızla gönderir, yanıtlar gelen kutunuza gelir."
      }
    ],
    "ctaTitle": "Kendi web sitenizle deneyin",
    "ctaBody": "Ücretsiz plan 1 kaynak ve en fazla 100 abone içerir.",
    "primaryCta": "Ücretsiz başlayın",
    "secondaryCta": "Fiyatları görün"
  },
  "helpCenter": {
    "metaTitle": "Yardım | AIBAN",
    "metaDescription": "AIBAN kurulumuyla ilgili yanıtlar: kaynaklar, diller, sizin adınızla gönderim, aboneler, kayıt widget'ı, blog ve faturalandırma.",
    "eyebrow": "Yardım merkezi",
    "title": "Size nasıl yardımcı olabiliriz?",
    "lead": "Bülteninizi kurma ve yönetme hakkında yanıtlar bulun. Aradığınızı bulamazsanız bize yazın.",
    "searchLabel": "Yardım merkezinde ara",
    "searchPlaceholder": "Dil, bileşen veya iptal gibi kelimeler deneyin",
    "clearSearch": "Aramayı temizle",
    "resultsCount": "Aramanızla eşleşen {count} yanıt var.",
    "noResults": "Aramanızla eşleşen yanıt yok. Başka bir kelime deneyin veya info@aiban.news adresine yazın.",
    "topicsLabel": "Konular",
    "copyLink": "Bağlantıyı kopyala",
    "linkCopied": "Bağlantı kopyalandı",
    "contactTitle": "Hâlâ yardıma mı ihtiyacınız var?",
    "contactBody": "info@aiban.news adresine yazın ve kaydolduğunuz e-posta adresini ekleyin.",
    "emailCta": "info@aiban.news adresine yazın",
    "limitsTitle": "Daha yüksek limit talep edin",
    "limitsBody": "İhtiyacınız olan limitleri bize bildirin, size e-postayla yanıt verelim. Talep bu sayfadan gönderilemezse e-posta uygulamanız talep doldurulmuş olarak açılır, siz de bize gönderebilirsiniz.",
    "faqFilterLabel": "Soruları filtrele",
    "faqNoMatch": "Filtrenize uyan soru yok.",
    "groups": [
      {
        "id": "getting-started",
        "title": "Başlarken",
        "items": [
          {
            "id": "what-is-aiban",
            "q": "AIBAN nedir?",
            "a": "AIBAN, zaten yayımladığınız içerikleri düzenli bir bültene dönüştürür. Web sitenizi, blogunuzu veya seçtiğiniz haber sitelerini okur, sizin üslubunuzla yeni sayılar yazar ve abonelerinize gönderir. Her abone bülteni seçtiği dilde okur."
          },
          {
            "id": "how-to-start",
            "q": "Nasıl başlarım?",
            "a": "Kayıt sayfasında bir hesap oluşturun. Kurulum sırasında sitenizin adresi ve okurlarınız hakkında birkaç bilgi istenir. Ardından abone ekleyebilir ve her şeyi panelinizden yönetebilirsiniz."
          },
          {
            "id": "change-settings",
            "q": "Kurulumumu daha sonra değiştirebilir miyim?",
            "a": "Evet. Kaynakları, zamanlamayı, gönderen bilgilerini ve aboneleri daha sonra panelinizden değiştirebilirsiniz. Planınızı değiştirmek için info@aiban.news adresine yazın."
          }
        ]
      },
      {
        "id": "sources",
        "title": "Kaynaklar ve içerik",
        "items": [
          {
            "id": "what-is-a-source",
            "q": "Kaynak olarak neyi kullanabilirim?",
            "a": "Kaynak, AIBAN'ın yeni içerik için okuduğu bir web adresidir; örneğin web siteniz, blogunuz veya takip ettiğiniz bir haber sitesi. Kaynakları panelinizden eklersiniz. Kaç kaynak ekleyebileceğiniz planınıza bağlıdır."
          },
          {
            "id": "how-often",
            "q": "Bültenim ne sıklıkla gönderilir?",
            "a": "Bir kaynak kurarken ne sıklıkla yayımlanacağını siz seçersiniz. Takvimi daha sonra panelinizden değiştirebilirsiniz."
          },
          {
            "id": "your-voice",
            "q": "AIBAN benim üslubumla nasıl yazar?",
            "a": "Bülteninizin kişiliğini siz tarif edersiniz ya da açıklamayı AIBAN'ın oluşturmasına izin verirsiniz. Sayılar bu açıklamaya göre yazılır. Açıklamayı panelinizden istediğiniz zaman düzenleyebilirsiniz."
          }
        ]
      },
      {
        "id": "languages",
        "title": "Diller",
        "items": [
          {
            "id": "subscriber-language",
            "q": "Aboneler bülteni kendi dillerinde nasıl alır?",
            "a": "Her abone kaydolurken tercih ettiği dili seçer. AIBAN her sayıyı göndermeden önce o dile çevirir."
          },
          {
            "id": "site-language",
            "q": "Siteyi kendi dilimde kullanabilir miyim?",
            "a": "Evet. Sitenin ve panelin dilini değiştirmek için ekranın sağ altındaki dil düğmesini kullanın."
          }
        ]
      },
      {
        "id": "sending",
        "title": "Sizin adınızla gönderim",
        "items": [
          {
            "id": "own-address",
            "q": "Sayılar kendi e-posta adresimden gelebilir mi?",
            "a": "Sayılar AIBAN'ın gönderim adresinden gönderen adınız ve e-posta imzanızla çıkar, yanıtlar gelen kutunuza gelir. E-posta şifrenizi istemeyiz, bu yüzden sızabilecek hiçbir bilginiz olmaz."
          },
          {
            "id": "app-password",
            "q": "AIBAN'a e-posta şifremi vermem gerekiyor mu?",
            "a": "Hayır. AIBAN e-posta şifrenizi veya bir uygulama şifresini hiçbir zaman istemez. Sayılar AIBAN'ın adresinden sizin adınızla gönderilir, yanıtlar size gelir."
          }
        ]
      },
      {
        "id": "subscribers",
        "title": "Aboneler ve kayıt bileşeni",
        "items": [
          {
            "id": "add-subscribers",
            "q": "Nasıl abone eklerim?",
            "a": "Kişileri panelinizden tek tek ekleyebilir veya listenizi içeren bir dosya yükleyebilirsiniz. İnsanlar kayıt sayfanız veya kayıt bileşeni üzerinden de katılabilir."
          },
          {
            "id": "signup-widget",
            "q": "Kayıt bileşeni nedir?",
            "a": "Bileşen, kendi web sitenize yerleştirebileceğiniz bir kayıt formudur. Ziyaretçiler e-posta adreslerini girer, dillerini seçer ve listenize katılır."
          },
          {
            "id": "subscriber-limit",
            "q": "Abone sayısında bir limit var mı?",
            "a": "Her planın kendi abone limiti vardır. Ücretsiz plan en fazla 100 abone içerir. Diğer planların limitleri fiyatlandırma sayfasında listelenir."
          }
        ]
      },
      {
        "id": "blog",
        "title": "Blog",
        "items": [
          {
            "id": "blog-pages",
            "q": "Bülten makalelerim web'de yayımlanır mı?",
            "a": "Evet. AIBAN'ın bülteniniz için yazdığı makaleler web sayfası olarak da yayımlanır, böylece insanlar onları gelen kutuları dışında da okuyabilir."
          },
          {
            "id": "post-to-site",
            "q": "Makaleleri kendi web siteme gönderebilir miyim?",
            "a": "Evet. Panelinizden, her bülten makalesini web sitenize yazı olarak gönderen bir webhook kurabilirsiniz. WordPress ile ve standart REST içeriği kabul eden her platformla çalışır."
          }
        ]
      },
      {
        "id": "billing",
        "title": "Faturalandırma",
        "items": [
          {
            "id": "free-plan",
            "q": "Ücretsiz bir plan var mı?",
            "a": "Evet. Ücretsiz plan 1 kaynak ve en fazla 100 abone içerir. Daha fazlasına ihtiyaç duyduğunuzda ücretli bir plana geçebilirsiniz."
          },
          {
            "id": "monthly-yearly",
            "q": "Aylık veya yıllık ödeyebilir miyim?",
            "a": "Evet. Ücretli planlar aylık veya yıllık faturalandırılır. Yıllık fiyat, 12 ay boyunca aylık ödemekten %35 daha düşüktür. Plan seçmek için info@aiban.news adresine yazın."
          },
          {
            "id": "cancel",
            "q": "İstediğim zaman iptal edebilir miyim?",
            "a": "Evet. İstediğiniz zaman info@aiban.news adresine yazın, ücretli planınızı iptal edelim veya sizi Ücretsiz plana geri alalım."
          },
          {
            "id": "higher-limits",
            "q": "En büyük plandan fazlasına ihtiyacım olursa ne olur?",
            "a": "İhtiyacınız olan limitleri bize bildirmek için yardım sayfasındaki talep formunu kullanın. E-postayla yanıt veririz."
          }
        ]
      }
    ]
  },
  "mainPage": {
    "skipToMainContent": "Ana içeriğe atla",
    "dismissAnnouncement": "Duyuruyu kapat",
    "problem": "Sorun:",
    "outcome": "Sonuç:",
    "disclaimer": "%35 tasarruf yalnızca yıllık faturalandırmada geçerlidir."
  },
  "authForm": {
    "emailValidation": "ad@ornek.com gibi bir e-posta adresi girin.",
    "failedToSendCode": "Kodu gönderemedik. E-posta adresini kontrol edip bir dakika sonra tekrar deneyin.",
    "sending": "Gönderiliyor...",
    "codeSent": "E-posta adresinize bir kod gönderdik.",
    "invalidCode": "Bu kod doğru değil. Size gönderdiğimiz en son e-postayı kontrol edin veya kodu yeniden gönderin.",
    "regenerateCode": "Kodu tekrar gönder",
    "back": "Geri",
    "byProceeding": "Devam ederek şunları kabul etmiş olursunuz:",
    "termsOfService": "Hizmet şartları",
    "and": "ve",
    "privacyPolicy": "Gizlilik politikası",
    "appName": "AI Newsletter"
  },
  "welcome": {
    "title": "Otomatik bülten oluşturucu",
    "setItOnce": "Bir kez kurun.",
    "useItForever": "Sonrasında kendi kendine çalışmaya devam eder."
  },
  "lead": {
    "title": "Aboneleri ziyaretçiye dönüştürün",
    "recommendation": "Web sitenizi bağlayarak yapay zekamızın markanızı anlamasına yardımcı olun.",
    "question": "Web siteniz var mı? (isteğe bağlı, daha sonra ekleyebilirsiniz)",
    "placeholder": "https://siteniz.com"
  },
  "newsSource": {
    "title": "İçerik kaynağınızı bağlayın",
    "subtitle": "Sıfırdan başlamamanız için akışınızı (feed) çekeceğiz.",
    "placeholder": "Blog veya RSS bağlantınız"
  },
  "subscribe": {
    "welcome": {
      "title": "Bültene hoş geldiniz.",
      "invitedBy": "{configuratorId} tarafından davet edildiniz."
    }
  },
  "header": {
    "goToWorkspace": "Paneli aç",
    "inBilling": "Fiyatlandırma",
    "vip": "VIP",
    "plan": "{planName} planı",
    "logIn": "Giriş yap",
    "getStarted": "Ücretsiz başlayın"
  },
  "fileInput": {
    "chooseFile": "Dosya seç",
    "dropFile": "Buraya bırakın",
    "release": "Yüklemek için bırakın"
  },
  "billing": {
    "title": "Faturalandırma ve abonelik",
    "currentPlanTitle": "Mevcut planınız",
    "upgradePlanTitle": "Planınızı değiştirin",
    "manageSubscription": "Aboneliği yönet",
    "vipPlanName": "VIP Partner",
    "vipPlanDescription": "AIBAN tarafından sağlanan sınırsız erişim.",
    "perMonth": "aylık",
    "perYear": "yıllık",
    "monthAbbreviation": "ay",
    "equivalentTo": "şuna eşdeğer:",
    "mostPopular": "En popüler",
    "upgradeTo": "Şuna yükselt:",
    "downgradeTo": "Şuna geç:",
    "currentPlanButton": "Planınız",
    "youSave": "Kazancınız",
    "users": "kullanıcı",
    "newsSources": "haber kaynağı",
    "monthly": "Aylık",
    "yearly": "Yıllık",
    "loadingPlan": "Plan verileri yükleniyor..."
  },
  "languages": [
    {
      "code": "ab",
      "name": "Abhazca"
    },
    {
      "code": "aa",
      "name": "Afarca"
    },
    {
      "code": "af",
      "name": "Afrikaanca"
    },
    {
      "code": "ak",
      "name": "Akanca"
    },
    {
      "code": "sq",
      "name": "Arnavutça"
    },
    {
      "code": "am",
      "name": "Amharca"
    },
    {
      "code": "ar",
      "name": "Arapça"
    },
    {
      "code": "an",
      "name": "Aragonca"
    },
    {
      "code": "hy",
      "name": "Ermenice"
    },
    {
      "code": "as",
      "name": "Assamca"
    },
    {
      "code": "av",
      "name": "Avarca"
    },
    {
      "code": "ae",
      "name": "Avestçe"
    },
    {
      "code": "ay",
      "name": "Aymaraca"
    },
    {
      "code": "az",
      "name": "Azerice"
    },
    {
      "code": "bm",
      "name": "Bambaraca"
    },
    {
      "code": "ba",
      "name": "Başkurtça"
    },
    {
      "code": "eu",
      "name": "Baskça"
    },
    {
      "code": "be",
      "name": "Belarusça"
    },
    {
      "code": "bn",
      "name": "Bengalce"
    },
    {
      "code": "bi",
      "name": "Bislama"
    },
    {
      "code": "bs",
      "name": "Boşnakça"
    },
    {
      "code": "br",
      "name": "Bretonca"
    },
    {
      "code": "bg",
      "name": "Bulgarca"
    },
    {
      "code": "my",
      "name": "Birmanca"
    },
    {
      "code": "ca",
      "name": "Katalanca"
    },
    {
      "code": "ch",
      "name": "Çamorroca"
    },
    {
      "code": "ce",
      "name": "Çeçence"
    },
    {
      "code": "ny",
      "name": "Nyanja"
    },
    {
      "code": "zh",
      "name": "Çince"
    },
    {
      "code": "cu",
      "name": "Kilise Slavcası"
    },
    {
      "code": "cv",
      "name": "Çuvaşça"
    },
    {
      "code": "kw",
      "name": "Kernevekçe"
    },
    {
      "code": "co",
      "name": "Korsikaca"
    },
    {
      "code": "cr",
      "name": "Krice"
    },
    {
      "code": "hr",
      "name": "Hırvatça"
    },
    {
      "code": "cs",
      "name": "Çekçe"
    },
    {
      "code": "da",
      "name": "Danca"
    },
    {
      "code": "dv",
      "name": "Divehice"
    },
    {
      "code": "nl",
      "name": "Felemekçe"
    },
    {
      "code": "dz",
      "name": "Dzongka"
    },
    {
      "code": "en",
      "name": "İngilizce"
    },
    {
      "code": "eo",
      "name": "Esperanto"
    },
    {
      "code": "et",
      "name": "Estonca"
    },
    {
      "code": "ee",
      "name": "Evece"
    },
    {
      "code": "fo",
      "name": "Faroece"
    },
    {
      "code": "fj",
      "name": "Ficice"
    },
    {
      "code": "fi",
      "name": "Fince"
    },
    {
      "code": "fr",
      "name": "Fransızca"
    },
    {
      "code": "fy",
      "name": "Batı Frizcesi"
    },
    {
      "code": "ff",
      "name": "Fula dili"
    },
    {
      "code": "gd",
      "name": "İskoç Galcesi"
    },
    {
      "code": "gl",
      "name": "Galiçyaca"
    },
    {
      "code": "lg",
      "name": "Luganda"
    },
    {
      "code": "ka",
      "name": "Gürcüce"
    },
    {
      "code": "de",
      "name": "Almanca"
    },
    {
      "code": "el",
      "name": "Yunanca"
    },
    {
      "code": "kl",
      "name": "Grönlandca"
    },
    {
      "code": "gn",
      "name": "Guaranice"
    },
    {
      "code": "gu",
      "name": "Guceratça"
    },
    {
      "code": "ht",
      "name": "Haiti Kreyolu"
    },
    {
      "code": "ha",
      "name": "Hausaca"
    },
    {
      "code": "he",
      "name": "İbranice"
    },
    {
      "code": "hz",
      "name": "Hereroca"
    },
    {
      "code": "hi",
      "name": "Hintçe"
    },
    {
      "code": "ho",
      "name": "Hiri Motu"
    },
    {
      "code": "hu",
      "name": "Macarca"
    },
    {
      "code": "is",
      "name": "İzlandaca"
    },
    {
      "code": "io",
      "name": "İdo"
    },
    {
      "code": "ig",
      "name": "İgbo dili"
    },
    {
      "code": "id",
      "name": "Endonezce"
    },
    {
      "code": "ia",
      "name": "İnterlingua"
    },
    {
      "code": "ie",
      "name": "Interlingue"
    },
    {
      "code": "iu",
      "name": "İnuitçe"
    },
    {
      "code": "ik",
      "name": "İnupiaq"
    },
    {
      "code": "ga",
      "name": "İrlandaca"
    },
    {
      "code": "it",
      "name": "İtalyanca"
    },
    {
      "code": "ja",
      "name": "Japonca"
    },
    {
      "code": "jv",
      "name": "Cava dili"
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
      "name": "Keşmirce"
    },
    {
      "code": "kk",
      "name": "Kazakça"
    },
    {
      "code": "km",
      "name": "Kmerce"
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
      "name": "Kırgızca"
    },
    {
      "code": "kv",
      "name": "Komice"
    },
    {
      "code": "kg",
      "name": "Kongoca"
    },
    {
      "code": "ko",
      "name": "Korece"
    },
    {
      "code": "kj",
      "name": "Kuanyama"
    },
    {
      "code": "ku",
      "name": "Kürtçe"
    },
    {
      "code": "lo",
      "name": "Laoca"
    },
    {
      "code": "la",
      "name": "Latince"
    },
    {
      "code": "lv",
      "name": "Letonca"
    },
    {
      "code": "li",
      "name": "Limburgca"
    },
    {
      "code": "ln",
      "name": "Lingala"
    },
    {
      "code": "lt",
      "name": "Litvanca"
    },
    {
      "code": "lu",
      "name": "Luba-Katanga"
    },
    {
      "code": "lb",
      "name": "Lüksemburgca"
    },
    {
      "code": "mk",
      "name": "Makedonca"
    },
    {
      "code": "mg",
      "name": "Malgaşça"
    },
    {
      "code": "ms",
      "name": "Malayca"
    },
    {
      "code": "ml",
      "name": "Malayalam"
    },
    {
      "code": "mt",
      "name": "Maltaca"
    },
    {
      "code": "gv",
      "name": "Manks"
    },
    {
      "code": "mi",
      "name": "Maori dili"
    },
    {
      "code": "mr",
      "name": "Marathi"
    },
    {
      "code": "mh",
      "name": "Marshallca"
    },
    {
      "code": "mn",
      "name": "Moğolca"
    },
    {
      "code": "na",
      "name": "Nauruca"
    },
    {
      "code": "nv",
      "name": "Navahoca"
    },
    {
      "code": "nd",
      "name": "Kuzey Ndebele"
    },
    {
      "code": "nr",
      "name": "Güney Ndebele"
    },
    {
      "code": "ng",
      "name": "Ndonga"
    },
    {
      "code": "ne",
      "name": "Nepalce"
    },
    {
      "code": "no",
      "name": "Norveççe"
    },
    {
      "code": "nb",
      "name": "Bokmål Norveççe"
    },
    {
      "code": "nn",
      "name": "Nynorsk Norveççe"
    },
    {
      "code": "oc",
      "name": "Oksitanca"
    },
    {
      "code": "oj",
      "name": "Ojibwa"
    },
    {
      "code": "or",
      "name": "Oriya dili"
    },
    {
      "code": "om",
      "name": "Oromca"
    },
    {
      "code": "os",
      "name": "Osetçe"
    },
    {
      "code": "pi",
      "name": "Palice"
    },
    {
      "code": "ps",
      "name": "Peştuca"
    },
    {
      "code": "fa",
      "name": "Farsça"
    },
    {
      "code": "pl",
      "name": "Polonyaca"
    },
    {
      "code": "pt",
      "name": "Portekizce"
    },
    {
      "code": "pa",
      "name": "Pencapça"
    },
    {
      "code": "qu",
      "name": "Keçuva dili"
    },
    {
      "code": "ro",
      "name": "Rumence"
    },
    {
      "code": "rm",
      "name": "Romanşça"
    },
    {
      "code": "rn",
      "name": "Kirundi"
    },
    {
      "code": "ru",
      "name": "Rusça"
    },
    {
      "code": "se",
      "name": "Kuzey Laponca"
    },
    {
      "code": "sm",
      "name": "Samoaca"
    },
    {
      "code": "sg",
      "name": "Sango"
    },
    {
      "code": "sa",
      "name": "Sanskritçe"
    },
    {
      "code": "sc",
      "name": "Sardunyaca"
    },
    {
      "code": "sr",
      "name": "Sırpça"
    },
    {
      "code": "sn",
      "name": "Şonaca"
    },
    {
      "code": "ii",
      "name": "Siçuan Yi"
    },
    {
      "code": "sd",
      "name": "Sindhi"
    },
    {
      "code": "si",
      "name": "Sinhali dili"
    },
    {
      "code": "sk",
      "name": "Slovakça"
    },
    {
      "code": "sl",
      "name": "Slovence"
    },
    {
      "code": "so",
      "name": "Somalice"
    },
    {
      "code": "st",
      "name": "Güney Sotho"
    },
    {
      "code": "es",
      "name": "İspanyolca"
    },
    {
      "code": "su",
      "name": "Sundaca"
    },
    {
      "code": "sw",
      "name": "Svahili"
    },
    {
      "code": "ss",
      "name": "Swati"
    },
    {
      "code": "sv",
      "name": "İsveççe"
    },
    {
      "code": "tl",
      "name": "Tagalogca"
    },
    {
      "code": "ty",
      "name": "Tahiti dili"
    },
    {
      "code": "tg",
      "name": "Tacikçe"
    },
    {
      "code": "ta",
      "name": "Tamilce"
    },
    {
      "code": "tt",
      "name": "Tatarca"
    },
    {
      "code": "te",
      "name": "Teluguca"
    },
    {
      "code": "th",
      "name": "Tayca"
    },
    {
      "code": "bo",
      "name": "Tibetçe"
    },
    {
      "code": "ti",
      "name": "Tigrinya dili"
    },
    {
      "code": "to",
      "name": "Tongaca"
    },
    {
      "code": "ts",
      "name": "Tsongaca"
    },
    {
      "code": "tn",
      "name": "Tsvana dili"
    },
    {
      "code": "tr",
      "name": "Türkçe"
    },
    {
      "code": "tk",
      "name": "Türkmence"
    },
    {
      "code": "tw",
      "name": "Twi dili"
    },
    {
      "code": "ug",
      "name": "Uygurca"
    },
    {
      "code": "uk",
      "name": "Ukraynaca"
    },
    {
      "code": "ur",
      "name": "Urduca"
    },
    {
      "code": "uz",
      "name": "Özbekçe"
    },
    {
      "code": "ve",
      "name": "Vendaca"
    },
    {
      "code": "vi",
      "name": "Vietnamca"
    },
    {
      "code": "vo",
      "name": "Volapük"
    },
    {
      "code": "wa",
      "name": "Valonca"
    },
    {
      "code": "cy",
      "name": "Galce"
    },
    {
      "code": "wo",
      "name": "Wolof dili"
    },
    {
      "code": "xh",
      "name": "Xhosa dili"
    },
    {
      "code": "yi",
      "name": "Yidiş"
    },
    {
      "code": "yo",
      "name": "Yorubaca"
    },
    {
      "code": "za",
      "name": "Zhuangca"
    },
    {
      "code": "zu",
      "name": "Zuluca"
    }
  ],
  "countries": [
    {
      "code": "AF",
      "name": "Afganistan"
    },
    {
      "code": "AL",
      "name": "Arnavutluk"
    },
    {
      "code": "DZ",
      "name": "Cezayir"
    },
    {
      "code": "AS",
      "name": "Amerikan Samoası"
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
      "name": "Antarktika"
    },
    {
      "code": "AG",
      "name": "Antigua ve Barbuda"
    },
    {
      "code": "AR",
      "name": "Arjantin"
    },
    {
      "code": "AM",
      "name": "Ermenistan"
    },
    {
      "code": "AW",
      "name": "Aruba"
    },
    {
      "code": "AU",
      "name": "Avustralya"
    },
    {
      "code": "AT",
      "name": "Avusturya"
    },
    {
      "code": "AZ",
      "name": "Azerbaycan"
    },
    {
      "code": "BS",
      "name": "Bahamalar"
    },
    {
      "code": "BH",
      "name": "Bahreyn"
    },
    {
      "code": "BD",
      "name": "Bangladeş"
    },
    {
      "code": "BB",
      "name": "Barbados"
    },
    {
      "code": "BY",
      "name": "Beyaz Rusya"
    },
    {
      "code": "BE",
      "name": "Belçika"
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
      "name": "Butan"
    },
    {
      "code": "BO",
      "name": "Bolivya"
    },
    {
      "code": "BA",
      "name": "Bosna-Hersek"
    },
    {
      "code": "BW",
      "name": "Botsvana"
    },
    {
      "code": "BR",
      "name": "Brezilya"
    },
    {
      "code": "IO",
      "name": "Britanya Hint Okyanusu Toprakları"
    },
    {
      "code": "VG",
      "name": "Britanya Virjin Adaları"
    },
    {
      "code": "BN",
      "name": "Brunei"
    },
    {
      "code": "BG",
      "name": "Bulgaristan"
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
      "name": "Kamboçya"
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
      "name": "Yeşil Burun Adaları"
    },
    {
      "code": "KY",
      "name": "Cayman Adaları"
    },
    {
      "code": "CF",
      "name": "Orta Afrika Cumhuriyeti"
    },
    {
      "code": "TD",
      "name": "Çad"
    },
    {
      "code": "CL",
      "name": "Şili"
    },
    {
      "code": "CN",
      "name": "Çin"
    },
    {
      "code": "CX",
      "name": "Christmas Adası"
    },
    {
      "code": "CC",
      "name": "Cocos (Keeling) Adaları"
    },
    {
      "code": "CO",
      "name": "Kolombiya"
    },
    {
      "code": "KM",
      "name": "Komorlar"
    },
    {
      "code": "CG",
      "name": "Kongo - Brazzaville"
    },
    {
      "code": "CD",
      "name": "Kongo - Kinşasa"
    },
    {
      "code": "CK",
      "name": "Cook Adaları"
    },
    {
      "code": "CR",
      "name": "Kosta Rika"
    },
    {
      "code": "CI",
      "name": "Fildişi Sahili"
    },
    {
      "code": "HR",
      "name": "Hırvatistan"
    },
    {
      "code": "CU",
      "name": "Küba"
    },
    {
      "code": "CY",
      "name": "Kıbrıs"
    },
    {
      "code": "CZ",
      "name": "Çekya"
    },
    {
      "code": "DK",
      "name": "Danimarka"
    },
    {
      "code": "DJ",
      "name": "Cibuti"
    },
    {
      "code": "DM",
      "name": "Dominika"
    },
    {
      "code": "DO",
      "name": "Dominik Cumhuriyeti"
    },
    {
      "code": "EC",
      "name": "Ekvador"
    },
    {
      "code": "EG",
      "name": "Mısır"
    },
    {
      "code": "SV",
      "name": "El Salvador"
    },
    {
      "code": "GQ",
      "name": "Ekvator Ginesi"
    },
    {
      "code": "ER",
      "name": "Eritre"
    },
    {
      "code": "EE",
      "name": "Estonya"
    },
    {
      "code": "SZ",
      "name": "Esvatini"
    },
    {
      "code": "ET",
      "name": "Etiyopya"
    },
    {
      "code": "FJ",
      "name": "Fiji"
    },
    {
      "code": "FI",
      "name": "Finlandiya"
    },
    {
      "code": "FR",
      "name": "Fransa"
    },
    {
      "code": "GA",
      "name": "Gabon"
    },
    {
      "code": "GM",
      "name": "Gambiya"
    },
    {
      "code": "GE",
      "name": "Gürcistan"
    },
    {
      "code": "DE",
      "name": "Almanya"
    },
    {
      "code": "GH",
      "name": "Gana"
    },
    {
      "code": "GR",
      "name": "Yunanistan"
    },
    {
      "code": "GT",
      "name": "Guatemala"
    },
    {
      "code": "GN",
      "name": "Gine"
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
      "name": "Macaristan"
    },
    {
      "code": "IS",
      "name": "İzlanda"
    },
    {
      "code": "IN",
      "name": "Hindistan"
    },
    {
      "code": "ID",
      "name": "Endonezya"
    },
    {
      "code": "IR",
      "name": "İran"
    },
    {
      "code": "IQ",
      "name": "Irak"
    },
    {
      "code": "IE",
      "name": "İrlanda"
    },
    {
      "code": "IL",
      "name": "İsrail"
    },
    {
      "code": "IT",
      "name": "İtalya"
    },
    {
      "code": "JM",
      "name": "Jamaika"
    },
    {
      "code": "JP",
      "name": "Japonya"
    },
    {
      "code": "JO",
      "name": "Ürdün"
    },
    {
      "code": "KZ",
      "name": "Kazakistan"
    },
    {
      "code": "KE",
      "name": "Kenya"
    },
    {
      "code": "KR",
      "name": "Güney Kore"
    },
    {
      "code": "KW",
      "name": "Kuveyt"
    },
    {
      "code": "KG",
      "name": "Kırgızistan"
    },
    {
      "code": "LA",
      "name": "Laos"
    },
    {
      "code": "LV",
      "name": "Letonya"
    },
    {
      "code": "LB",
      "name": "Lübnan"
    },
    {
      "code": "LS",
      "name": "Lesotho"
    },
    {
      "code": "LR",
      "name": "Liberya"
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
      "name": "Litvanya"
    },
    {
      "code": "LU",
      "name": "Lüksemburg"
    },
    {
      "code": "MG",
      "name": "Madagaskar"
    },
    {
      "code": "MW",
      "name": "Malavi"
    },
    {
      "code": "MY",
      "name": "Malezya"
    },
    {
      "code": "MV",
      "name": "Maldivler"
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
      "name": "Meksika"
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
      "name": "Moğolistan"
    },
    {
      "code": "ME",
      "name": "Karadağ"
    },
    {
      "code": "MA",
      "name": "Fas"
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
      "name": "Namibya"
    },
    {
      "code": "NP",
      "name": "Nepal"
    },
    {
      "code": "NL",
      "name": "Hollanda"
    },
    {
      "code": "NZ",
      "name": "Yeni Zelanda"
    },
    {
      "code": "NI",
      "name": "Nikaragua"
    },
    {
      "code": "NE",
      "name": "Nijer"
    },
    {
      "code": "NG",
      "name": "Nijerya"
    },
    {
      "code": "MK",
      "name": "Kuzey Makedonya"
    },
    {
      "code": "NO",
      "name": "Norveç"
    },
    {
      "code": "OM",
      "name": "Umman"
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
      "name": "Papua Yeni Gine"
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
      "name": "Filipinler"
    },
    {
      "code": "PL",
      "name": "Polonya"
    },
    {
      "code": "PT",
      "name": "Portekiz"
    },
    {
      "code": "QA",
      "name": "Katar"
    },
    {
      "code": "RO",
      "name": "Romanya"
    },
    {
      "code": "RU",
      "name": "Rusya"
    },
    {
      "code": "RW",
      "name": "Ruanda"
    },
    {
      "code": "SA",
      "name": "Suudi Arabistan"
    },
    {
      "code": "SN",
      "name": "Senegal"
    },
    {
      "code": "RS",
      "name": "Sırbistan"
    },
    {
      "code": "SG",
      "name": "Singapur"
    },
    {
      "code": "SK",
      "name": "Slovakya"
    },
    {
      "code": "SI",
      "name": "Slovenya"
    },
    {
      "code": "ZA",
      "name": "Güney Afrika"
    },
    {
      "code": "ES",
      "name": "İspanya"
    },
    {
      "code": "LK",
      "name": "Sri Lanka"
    },
    {
      "code": "SE",
      "name": "İsveç"
    },
    {
      "code": "CH",
      "name": "İsviçre"
    },
    {
      "code": "TW",
      "name": "Tayvan"
    },
    {
      "code": "TH",
      "name": "Tayland"
    },
    {
      "code": "TR",
      "name": "Türkiye"
    },
    {
      "code": "UG",
      "name": "Uganda"
    },
    {
      "code": "UA",
      "name": "Ukrayna"
    },
    {
      "code": "AE",
      "name": "Birleşik Arap Emirlikleri"
    },
    {
      "code": "GB",
      "name": "Birleşik Krallık"
    },
    {
      "code": "US",
      "name": "Amerika Birleşik Devletleri"
    },
    {
      "code": "UY",
      "name": "Uruguay"
    },
    {
      "code": "UZ",
      "name": "Özbekistan"
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
      "name": "Yemen"
    },
    {
      "code": "ZM",
      "name": "Zambiya"
    },
    {
      "code": "ZW",
      "name": "Zimbabve"
    }
  ]
};
