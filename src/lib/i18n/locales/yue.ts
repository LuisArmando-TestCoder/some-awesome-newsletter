// yue strings for locales. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale yue
export default {
  "auth": {
    "logo": "/icons/logo.png",
    "login": {
      "pageTitle": "登入",
      "title": "登入 AIBAN",
      "subtitle": "連線之後就可以繼續上次未搞掂嘅嘢。",
      "google": "用 Google 帳號登入",
      "or": "或者",
      "emailPlaceholder": "you@example.com",
      "continueWithEmail": "用電郵繼續",
      "switchText": "未有帳號？",
      "switchLink": "註冊",
      "switchHref": "/signup"
    },
    "signup": {
      "pageTitle": "註冊",
      "title": "建立你嘅帳號",
      "subtitle": "唔使信用卡。",
      "google": "用 Google 帳號註冊",
      "or": "或者",
      "emailPlaceholder": "you@example.com",
      "continueWithEmail": "用電郵繼續",
      "switchText": "已經有帳號？",
      "switchLink": "登入",
      "switchHref": "/login"
    }
  },
  "landing": {
    "seo": {
      "title": "AIBAN | 將你嘅網站變成電子報，用每位讀者嘅語言發送",
      "description": "AIBAN 會讀你已經發佈嘅內容，用你嘅語氣寫一期電子報，再用你個名寄出。每位訂閱者都會收到自己語言嘅版本。",
      "ogImageAlt": "AIBAN 標誌"
    },
    "skipLink": "跳到主要內容",
    "hero": {
      "eyebrow": "為服務型企業而設嘅電子報",
      "title": "你嘅網站變成每週電子報，用每位讀者嘅語言送到",
      "lead": "AIBAN 會讀你已經發佈嘅內容，用你嘅語氣寫一期電子報，再用你個名寄出。每位訂閱者都會用自己睇嘅語言收到。你設定一次，之後佢會自己繼續運作。",
      "formLabel": "你嘅網站",
      "formPlaceholder": "yourcompany.com",
      "formHint": "我哋會根據你輸入嘅地址整一期示範電子報。免費開始，唔使提供信用卡。",
      "formSubmit": "預覽我嘅電子報",
      "formError": "請輸入網址，例如 yourcompany.com。",
      "secondaryCta": "睇吓點運作"
    },
    "preview": {
      "badge": "示範預覽",
      "note": "呢個係用示範文字嘅版面。開始使用之後，AIBAN 會根據你最新嘅文章寫出真正嘅一期。",
      "fromLabel": "寄件人",
      "toLabel": "收件人",
      "subjectLabel": "主旨",
      "languageLabel": "讀者語言",
      "readOnBlog": "喺網誌閱讀",
      "startCta": "用 {site} 免費開始",
      "startCtaGeneric": "免費開始",
      "liveRegion": "已經為 {site} 更新示範預覽。"
    },
    "chain": {
      "eyebrow": "點樣運作",
      "title": "輸入一次，之後自動運作",
      "lead": "你只需要將網站交畀 AIBAN 一次。之後，下面每個步驟都會按你揀嘅時間表自動進行。",
      "triggerLabel": "當",
      "actionLabel": "然後",
      "trigger": {
        "title": "而家係星期一 9:00",
        "body": "或者任何你揀嘅時間表：每日、每週或者每月。"
      },
      "steps": [
        {
          "title": "AIBAN 搵到你最新嘅文章",
          "body": "佢會檢查你嘅網站，揀出你理想讀者最關心嘅內容。"
        },
        {
          "title": "用你嘅語氣寫電子報",
          "body": "根據你網站嘅寫作風格改寫文字，等佢讀落似你寫嘅。"
        },
        {
          "title": "為每位讀者翻譯",
          "body": "每位訂閱者都會收到佢註冊時揀嘅語言版本。"
        },
        {
          "title": "用你個名寄出",
          "body": "讀者見到嘅係你個名，佢哋嘅回覆會去你嘅收件匣。"
        },
        {
          "title": "喺你嘅網誌發佈",
          "body": "每期電子報都會有一個有獨立連結嘅公開文章頁面。"
        },
        {
          "title": "話你知發生咗咩事",
          "body": "你嘅控制面板會列出邊個加入咗，同埋讀者撳咗邊啲連結。"
        }
      ],
      "alsoTitle": "以下情況都會觸發",
      "also": [
        {
          "title": "有人喺你網站註冊",
          "body": "佢哋用電郵確認之後，就會開始收到你嘅電子報。"
        },
        {
          "title": "你貼上一條連結或者一段文字",
          "body": "AIBAN 會經同樣嘅步驟，寫一期相關嘅電子報再寄出。"
        },
        {
          "title": "你上載聯絡人名單",
          "body": "AIBAN 會整理名單、刪走重複項，同埋估計每位聯絡人嘅語言。"
        }
      ]
    },
    "languages": {
      "eyebrow": "所有語言",
      "title": "每位讀者都收到自己語言嘅電子報",
      "body": "你唔使分開寫唔同版本。AIBAN 會將每期電子報翻譯成訂閱者用嘅每種語言，而且每個版本都保留你嘅語氣。支援嘅語言包括西班牙文、葡萄牙文、法文、德文、印地文、阿拉伯文、日文等等。",
      "sampleNote": "同一期示範電子報，三位讀者收到嘅樣。"
    },
    "sender": {
      "eyebrow": "你嘅地址",
      "title": "用你個名寄出",
      "body": "每期電子報都會有你個名同你嘅電郵簽名。AIBAN 用自己已驗證嘅地址寄出，所以你永遠唔使將電郵密碼畀我哋。讀者回覆嘅時候，回覆會去你嘅收件匣。",
      "inboxLabel": "喺讀者收件匣嘅樣",
      "inboxFrom": "你",
      "inboxSubject": "{site} 本週動態",
      "inboxSnippet": "用你嘅語氣寫嘅最新文章簡短摘要。",
      "inboxTime": "9:00"
    },
    "grow": {
      "eyebrow": "擴大你嘅名單",
      "title": "網站用嘅訂閱表格，加一個自動更新嘅網誌",
      "items": [
        {
          "title": "訂閱表格",
          "body": "將 AIBAN 表格加到你嘅網站。新讀者揀自己嘅語言，再用電郵確認。"
        },
        {
          "title": "自動網誌",
          "body": "每期電子報都會變成一個公開文章頁面，可以喺搜尋搵到，亦可以用連結分享。"
        },
        {
          "title": "匯入聯絡人",
          "body": "由 CSV 或 Excel 檔案匯入你現有嘅客戶，或者直接貼上名單。"
        }
      ]
    },
    "useCases": {
      "eyebrow": "適合邊個",
      "title": "為靠關係發展業務嘅企業而設",
      "lead": "如果你嘅客戶係靠轉介同信任而嚟，定期收到你嘅消息可以令佢哋記得你。AIBAN 會幫你寫好呢份消息。",
      "items": [
        {
          "title": "代理公司同網頁設計師",
          "body": "每星期將最新作品同文章寄畀客戶同潛在客戶，亦可以為客戶網站用同一套設定。"
        },
        {
          "title": "IT 同軟件公司",
          "body": "將版本說明同網誌文章變成簡短更新，每位客戶都可以用自己嘅語言閱讀。"
        },
        {
          "title": "地產",
          "body": "同講唔同語言嘅買家同賣家分享新樓盤同市場文章。"
        },
        {
          "title": "律師同會計師",
          "body": "用平穩一致嘅格式，等客戶了解你一直寫開嘅題目。"
        },
        {
          "title": "教練同導師",
          "body": "喺固定日子將最新課堂或文章寄畀你嘅社群，唔使重新寫過。"
        }
      ]
    },
    "pricingIntro": {
      "eyebrow": "價錢",
      "title": "免費開始，名單大咗再升級",
      "lead": "免費方案包括 1 個來源同最多 100 位訂閱者。付費方案有更多來源同更多訂閱者。"
    },
    "faqTitle": "開始之前大家常問嘅問題",
    "faq": [
      {
        "id": "what-do-i-need",
        "q": "開始要準備啲咩？",
        "a": "你嘅網站地址同一個電郵地址。AIBAN 會讀你嘅網站，了解你嘅題目同寫作方式。"
      },
      {
        "id": "do-i-write",
        "q": "我要自己寫嘢嗎？",
        "a": "唔使。AIBAN 會根據你嘅內容寫每期電子報。如果你想就某個題目出一期，可以貼上連結或者文字。"
      },
      {
        "id": "languages",
        "q": "我嘅讀者可以收到邊啲語言？",
        "a": "AIBAN 會將每期電子報翻譯成每位訂閱者閱讀嘅語言。設定電子報嘅時候可以睇到完整嘅語言列表。"
      },
      {
        "id": "sender",
        "q": "電郵係邊個寄出嘅？",
        "a": "由 AIBAN 嘅寄件地址寄出，寄件人會顯示你個名。回覆會直接去你嘅收件匣。你永遠唔使將電郵密碼畀我哋。"
      },
      {
        "id": "contacts",
        "q": "可以匯入我現有嘅聯絡人嗎？",
        "a": "可以。上載 CSV 或 Excel 檔案，或者貼上名單。AIBAN 會整理名單、刪走重複項，同埋估計每位聯絡人嘅語言。"
      },
      {
        "id": "schedule",
        "q": "幾耐寄一期？",
        "a": "設定嘅時候由你揀時間表，之後隨時可以喺控制面板更改。"
      },
      {
        "id": "free-plan",
        "q": "有冇免費方案？",
        "a": "有。免費方案包括 1 個來源同最多 100 位訂閱者。付費方案有更多來源同訂閱者。"
      },
      {
        "id": "cancel",
        "q": "可以取消嗎？",
        "a": "可以。你隨時寫信去 info@aiban.news，我哋會取消你嘅付費方案，或者將你轉返免費方案。"
      }
    ],
    "finalCta": {
      "title": "由你嘅網站開始",
      "body": "將網站交畀 AIBAN，檢查第一期電子報，準備好就開啟。",
      "cta": "免費開始",
      "secondary": "睇幫助中心"
    },
    "footer": {
      "tagline": "用你自己嘅內容寫成，再用每位讀者嘅語言寄出嘅電子報。",
      "product": "產品",
      "company": "公司",
      "legal": "法律資訊",
      "links": {
        "howItWorks": "點樣運作",
        "pricing": "價錢",
        "demo": "示範",
        "help": "幫助中心",
        "about": "關於我哋",
        "careers": "招聘",
        "privacy": "私隱政策",
        "terms": "服務條款",
        "cookies": "Cookie 政策"
      },
      "contactLabel": "聯絡",
      "rights": "版權所有。"
    }
  },
  "help": {
    "title": "申請調高配額",
    "subtitle": "話我哋知你需要嘅額度，我哋會用電郵回覆。",
    "contact": {
      "cta": "提交申請",
      "successTitle": "申請可以寄出",
      "successBody": "你嘅電郵程式已經打開，並填好咗申請。請喺嗰度寄出，我哋會用電郵回覆。",
      "learnMore": "/plans"
    },
    "questions": {
      "desiredLimitsHelp": "話我哋知你需要嘅額度，例如訂閱者同來源嘅數量。",
      "useCaseHelp": "講吓你寄咩內容、寄畀邊個、幾耐寄一次。",
      "expectedSpendHelp": "大概估計可以幫我哋建議方案。唔肯定都可以填唔知道。"
    },
    "form": {
      "nameLabel": "名稱",
      "emailLabel": "電郵",
      "companyLabel": "公司",
      "optional": "（可選）",
      "limitsLabel": "你需要嘅上限",
      "useCaseLabel": "你點樣用 AIBAN",
      "spendLabel": "預計每月開支",
      "spend": {
        "lt500": "少過 $500",
        "500_2k": "$500 至 $2,000",
        "2k_10k": "$2,000 至 $10,000",
        "gt10k": "多過 $10,000",
        "unknown": "我暫時未知"
      },
      "urgencyLabel": "緊急程度",
      "urgency": {
        "low": "低",
        "normal": "一般",
        "high": "高"
      },
      "replyLabel": "我哋應該點樣回覆你？",
      "reply": {
        "email": "用電郵",
        "call": "打電話"
      },
      "payAsYouGo": "我有興趣按用量付款",
      "sending": "寄緊...",
      "sentTitle": "請求已寄出",
      "sentBody": "我哋收到你嘅請求，會回覆去你填寫嘅電郵地址。",
      "retryBefore": "如果你嘅電郵程式冇打開，",
      "retryLink": "再打開一次請求",
      "retryAfter": "或者寫信去",
      "errors": {
        "name": "請輸入你嘅名稱（最少 2 個字元）。",
        "email": "請輸入我哋可以回覆嘅電郵地址，例如 name@example.com。",
        "company": "請輸入最少 2 個字元，或者留空。",
        "desiredLimits": "請用最少 10 個字元講你需要嘅上限。",
        "useCase": "請用最少 20 個字元講你嘅用途。"
      }
    },
    "faqs": [
      {
        "id": "limits-how",
        "q": "調高配額係點樣運作㗎？",
        "a": "寄一份寫明所需額度嘅申請。我哋會用電郵回覆適合你帳戶嘅選擇。"
      }
    ],
    "links": {
      "docs": "/plans",
      "community": "/help"
    }
  },
  "faq": [
    {
      "q": "AIBAN 做啲咩？",
      "a": "AIBAN 會讀你已經發佈嘅內容，例如你個網站、你個網誌，或者你揀嘅新聞網站。佢會用你嘅語氣寫新一期，當電子報寄出。每位訂閱者都會收到佢揀嘅語言版本，寄件人顯示你個名。"
    },
    {
      "q": "有冇免費方案？",
      "a": "有。免費方案包括 1 個來源同最多 100 位訂閱者。如果你需要更多，寫信畀我哋，我哋會幫你改方案。"
    },
    {
      "q": "訂閱者點樣收到自己語言嘅電子報？",
      "a": "每位訂閱者註冊時會揀偏好語言。AIBAN 會喺寄出前將每期電子報翻譯成嗰種語言。"
    },
    {
      "q": "電子報可以由我自己嘅電郵地址寄出嗎？",
      "a": "電子報由 AIBAN 嘅寄件地址寄出，有你個名同你嘅電郵簽名，回覆會去你嘅收件匣。我哋唔會問你攞電郵密碼，所以冇任何屬於你嘅嘢會洩漏。"
    },
    {
      "q": "人哋點樣訂閱？",
      "a": "你會有一個訂閱頁面同一個可以放喺網站嘅訂閱小工具。你亦可以自己加人或者上載名單。"
    },
    {
      "q": "可以隨時取消嗎？",
      "a": "可以。你隨時寫信去 info@aiban.news，我哋會取消你嘅付費方案，或者將你轉返免費方案。"
    }
  ],
  "plans": {
    "currency": "USD",
    "billingIntervals": [
      "每月",
      "每年"
    ],
    "currentPlan": "free",
    "plans": [
      {
        "id": "free",
        "name": "免費",
        "monthly": 0,
        "yearly": 0,
        "tagline": "用一個來源試下 AIBAN",
        "featuresBase": [
          "1 個來源",
          "最多 100 位訂閱者"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": 1,
          "users": 100
        },
        "ctaLabel": "目前方案",
        "tier": 0
      },
      {
        "id": "starter",
        "name": "入門",
        "monthly": 17,
        "yearly": 132,
        "tagline": "適合增長中嘅電子報",
        "featuresBase": [
          "5 個來源",
          "最多 10 萬位訂閱者"
        ],
        "featuresDelta": [
          "Email 支援",
          "基本翻譯"
        ],
        "limits": {
          "newsSources": 5,
          "users": 100000
        },
        "ctaLabel": "選擇入門版",
        "productId": "prod_starter_id",
        "tier": 1
      },
      {
        "id": "growth",
        "name": "增長",
        "monthly": 35,
        "yearly": 273,
        "tagline": "適合已有規模嘅電子報",
        "featuresBase": [
          "17 個來源",
          "最多 25 萬位訂閱者"
        ],
        "featuresDelta": [
          "自定義品牌風格",
          "高級分析"
        ],
        "limits": {
          "newsSources": 17,
          "users": 250000
        },
        "ctaLabel": "選擇增長版",
        "productId": "prod_growth_id",
        "tier": 2
      },
      {
        "id": "pro",
        "name": "專業",
        "monthly": 80,
        "yearly": 624,
        "tagline": "營銷專家之選",
        "featuresBase": [
          "25 個來源",
          "最多 50 萬位訂閱者"
        ],
        "featuresDelta": [
          "API 存取",
          "優先處理"
        ],
        "limits": {
          "newsSources": 25,
          "users": 500000
        },
        "ctaLabel": "選擇專業版",
        "productId": "prod_pro_id",
        "tier": 3
      },
      {
        "id": "master",
        "name": "大師",
        "monthly": 150,
        "yearly": 1170,
        "tagline": "適合大量讀者",
        "featuresBase": [
          "50 個來源",
          "訂閱者數目不限"
        ],
        "featuresDelta": [
          "貼身技術支援",
          "自定義 Webhooks"
        ],
        "limits": {
          "newsSources": 50,
          "users": -1
        },
        "ctaLabel": "選擇大師版",
        "productId": "prod_master_id",
        "tier": 4
      },
      {
        "id": "vipfree",
        "name": "VIP 免費",
        "monthly": 0,
        "yearly": 0,
        "tagline": "合作夥伴專享",
        "featuresBase": [
          "無限來源",
          "訂閱者數目不限"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": -1,
          "users": -1
        },
        "ctaLabel": "目前方案",
        "internalOnly": true,
        "tier": 5
      }
    ],
    "contact": {
      "text": "需要特別定制方案？",
      "cta": "聯絡我哋",
      "href": "/help"
    }
  },
  "article": {
    "notFound": "搵唔到文章。",
    "errorFetching": "我哋載入唔到呢篇文章。請等一分鐘再重新載入頁面。",
    "noArticleSpecified": "未有指定文章。",
    "goBack": "返回",
    "loading": "讀取中..."
  },
  "pricing": {
    "eyebrow": "價錢計劃",
    "title": "方案同價錢",
    "currentPlan": "目前方案：",
    "monthly": "每月",
    "yearly": "按年",
    "yearlySave": "慳 35%",
    "intervalLabel": "收費週期",
    "billedYearly": "按年收費",
    "perMonthShort": "/mo",
    "perYearShort": "/yr",
    "freeCta": "免費開始",
    "processing": "正在打開付款頁面...",
    "askMore": "每個帳戶都由免費方案開始。如果你需要更多，寫信去 {email}，我哋會幫你改方案。",
    "askFor": "申請 {planName}",
    "askAction": "寫信畀我哋",
    "checkoutError": "打唔開付款頁面。請遲啲再試。",
    "networkError": "連唔到伺服器。請檢查網絡連線再試。",
    "includes": "包括",
    "pageMetaTitle": "價錢 | AIBAN",
    "pageMetaDescription": "AIBAN 嘅方案同價錢。先免費用 1 個來源同最多 100 位訂閱者，需要更多嘅時候再轉月費或者年費方案。",
    "pageTitle": "價錢",
    "pageLead": "先用免費方案，有 1 個來源同最多 100 位訂閱者。需要更多來源或者訂閱者嘅時候，寫信畀我哋，我哋會將你轉去付費方案，按月或者按年收費。",
    "faqTitle": "收費問題",
    "contactText": "需要更高額度或者度身訂造嘅設定？",
    "contactCta": "聯絡我哋",
    "everythingIn": "包埋之前嗰個計劃嘅所有嘢，再加：",
    "isCurrentPlan": "呢個係你目前用緊嘅計劃",
    "downgradeTo": "轉去 {planName}",
    "upgradeTo": "揀 {planName}",
    "mockMode": "測試模式",
    "mostPopular": "最受歡迎",
    "perMonth": "每個月",
    "perYear": "每一年",
    "youSave": "你慳咗"
  },
  "confirmSubscription": {
    "title": "確認你嘅訂閱",
    "goBack": "返回",
    "pleaseAccept": "請同意服務條款嚟完成訂閱。",
    "iAccept": "我同意",
    "termsAndConditions": "條款及細則",
    "and": "同埋",
    "privacyPolicy": "私隱政策",
    "confirm": "確認訂閱",
    "mustAccept": "你一定要同意條款先可以訂閱。",
    "invalidLink": "呢條確認連結唔完整。請打開我哋最近寄畀你嘅電郵，用入面嘅連結。"
  },
  "articles": {
    "title": "最新文章",
    "subtitle": "AIBAN 為佢寄出嘅電子報寫嘅文章。",
    "producedIn": "呢啲文章提供嘅語言",
    "searchPlaceholder": "搜尋文章...",
    "noArticlesFound": "搵唔到相關文章。",
    "created": "建立日期：",
    "language": "語言：",
    "rightsReserved": "版權所有。",
    "errorFetching": "我哋載入唔到文章。請等一分鐘再重新載入頁面。"
  },
  "blog": {
    "metaTitle": "{name} 嘅網誌",
    "metaDescription": "嚟自 {name} 嘅文章。訂閱就可以用電郵收到新文章。",
    "eyebrow": "電子報網誌",
    "heroFrom": "嚟自 {name} 嘅文章",
    "heroDescription": "呢啲係呢份電子報已經發佈嘅文章。訂閱就可以用電郵收到新文章。",
    "subscribe": "訂閱",
    "home": "網誌主頁",
    "featured": "最新文章",
    "latest": "最新文章",
    "latestHint": "由新到舊排列。部分文章冇圖片，所以只顯示文字。",
    "articleCount": "{language}文章 {count} 篇",
    "articleCountOne": "{language}文章 1 篇",
    "languages": "揀語言",
    "minRead": "閱讀約 {n} 分鐘",
    "readArticle": "閱讀文章",
    "page": "第 {page} 頁",
    "newer": "較新嘅文章",
    "older": "較舊嘅文章",
    "pagination": "文章分頁",
    "emptyTitle": "仲未有文章",
    "emptyBody": "呢份電子報仲未喺呢度發佈文章。訂閱之後，第一篇文章會用電郵寄畀你。",
    "endTitle": "冇更舊嘅文章",
    "endBody": "已經去到列表尾。",
    "backToNewest": "返去最新文章",
    "errorTitle": "載入唔到呢啲文章",
    "errorBody": "文章伺服器冇及時回應。請過一分鐘再重新載入頁面。",
    "reload": "重新載入頁面",
    "missingHolder": "呢條網誌連結唔完整，冇講明要打開邊個嘅網誌。請向電子報擁有人攞完整連結。",
    "redirecting": "正在打開網誌...",
    "publishedWith": "由 AIBAN 發佈",
    "cta": {
      "title": "用電郵收下一篇文章",
      "body": "訂閱 {name}，新文章會寄到你嘅收件匣。你隨時可以取消訂閱。",
      "button": "訂閱"
    },
    "search": {
      "label": "搜尋文章",
      "placeholder": "用字詞或者短句搜尋",
      "button": "搜尋",
      "suggestions": "建議",
      "recent": "最近搜尋",
      "clearRecent": "清除最近搜尋",
      "title": "搜尋結果",
      "resultsFor": "「{q}」嘅搜尋結果",
      "count": "搵到 {count} 篇文章",
      "countOne": "搵到 1 篇文章",
      "searching": "正在搜尋文章",
      "emptyTitle": "冇文章符合「{q}」",
      "emptyBody": "請檢查串字，或者試吓短啲嘅字。你亦可以瀏覽網誌上所有文章。",
      "browseAll": "瀏覽所有文章",
      "noQuery": "喺上面輸入字詞或短句嚟搜尋呢個網誌。",
      "error": "文章伺服器冇回應，搜尋停咗。請過一分鐘再試。",
      "tryAgain": "再試一次",
      "limitNote": "顯示頭 {count} 個符合結果。用更具體嘅短句可以收窄範圍。"
    },
    "article": {
      "back": "所有文章",
      "published": "發佈於 {date}",
      "by": "作者：{name}",
      "otherLanguages": "睇其他語言版本",
      "otherLanguagesHint": "呢份電子報亦有用呢啲語言發佈。每條連結都會用對應語言打開網誌。",
      "share": "分享呢篇文章",
      "copyLink": "複製連結",
      "copied": "已複製連結，可以貼喺任何地方。",
      "copyFailed": "複製唔到連結。請改為由瀏覽器網址列複製。",
      "notFoundTitle": "搵唔到文章",
      "notFoundBody": "呢篇文章可能已經刪除，或者連結唔完整。打開網誌睇其他文章。",
      "errorTitle": "載入唔到呢篇文章",
      "errorBody": "文章伺服器冇及時回應。請過一分鐘再重新載入頁面。",
      "goToBlog": "去網誌"
    }
  },
  "nav": {
    "mainLabel": "主選單",
    "legalLabel": "法律資訊",
    "home": "AIBAN 主頁",
    "menu": "選單",
    "openMenu": "打開選單",
    "closeMenu": "關閉選單",
    "howItWorks": "點樣運作",
    "pricing": "價錢",
    "help": "幫助",
    "about": "關於我哋",
    "privacy": "私隱",
    "terms": "條款",
    "cookies": "Cookie",
    "signOut": "登出",
    "chooseLanguage": "揀語言",
    "currentLanguage": "語言：{name}"
  },
  "about": {
    "metaTitle": "關於我哋 | AIBAN",
    "metaDescription": "AIBAN 將一間公司已經發佈嘅內容變成一份自動寄出嘅電子報，用每位訂閱者嘅語言，以老闆嘅名義寄出。",
    "eyebrow": "關於我哋",
    "title": "關於 AIBAN",
    "lead": "AIBAN 將一間公司已經發佈嘅內容變成一份自動寄出嘅電子報。每位訂閱者都用自己嘅語言閱讀，寄件人係老闆本人。",
    "whatTitle": "AIBAN 做啲咩",
    "whatBody": [
      "你話 AIBAN 知你嘅內容喺邊：你嘅網站、網誌或者你追蹤嘅新聞網站。嗰度一有新內容，AIBAN 就會用你描述嘅語氣寫一期電子報，再按你揀嘅時間表寄畀訂閱者。",
      "每位訂閱者註冊時會揀一種語言，每期電子報寄出前都會翻譯成嗰種語言。文章亦會發佈成網頁，你亦可以將佢哋傳送到你自己嘅網站。"
    ],
    "whoTitle": "邊個整嘅",
    "whoBody": [
      "AIBAN 由創辦人 Luis Murillo Baltodano 開發。Luis 係一位創意工程師，背景係電腦圖像同自動化。",
      "以下列出佢部分開源作品。"
    ],
    "projectsTitle": "創辦人嘅開源作品",
    "projects": [
      {
        "name": "Scene Preset",
        "url": "https://github.com/LuisArmando-TestCoder/scene-preset",
        "desc": "一個用 Three.js 同 3D Web API 時減少樣板程式碼嘅函式庫。"
      },
      {
        "name": "Canvas Preset",
        "url": "https://github.com/LuisArmando-TestCoder/canvas-preset",
        "desc": "處理常見 Canvas API 工作嘅輔助工具。"
      },
      {
        "name": "Atomic Gatsby template",
        "url": "https://github.com/LuisArmando-TestCoder/atomic-gatsby-typescript-recoiljs",
        "desc": "按原子設計方法組織嘅入門範本。"
      }
    ],
    "githubLabel": "Luis 嘅 GitHub",
    "newTab": "（喺新分頁打開）",
    "contactTitle": "聯絡我哋",
    "contactBody": "如果有問題、意見或者合作想法，請寫信去 info@aiban.news。",
    "emailCta": "寄電郵去 info@aiban.news",
    "startCta": "免費開始",
    "helpCta": "睇幫助中心"
  },
  "careers": {
    "metaTitle": "招聘 | AIBAN",
    "metaDescription": "AIBAN 暫時冇空缺。你仍然可以寫信去 info@aiban.news。",
    "eyebrow": "招聘",
    "title": "加入 AIBAN",
    "lead": "AIBAN 暫時冇空缺。",
    "body": "有空缺嘅時候會喺呢頁列出。如果你將來想參與 AIBAN，請寄一段簡短自我介紹，講吓你想做啲咩。",
    "emailCta": "寄電郵去 info@aiban.news",
    "emailSubject": "參與 AIBAN 嘅工作",
    "aboutCta": "了解 AIBAN"
  },
  "legal": {
    "navLabel": "法律文件",
    "lastUpdated": "最後更新：{date}",
    "privacy": {
      "title": "私隱政策",
      "metaTitle": "私隱政策 | AIBAN",
      "metaDescription": "AIBAN 點樣收集、使用同保護你嘅資料，同埋你點樣行使你嘅資料權利。"
    },
    "terms": {
      "title": "服務條款",
      "metaTitle": "服務條款 | AIBAN",
      "metaDescription": "你開帳戶同使用 AIBAN 時適用嘅條款。"
    },
    "cookies": {
      "title": "Cookie 政策",
      "metaTitle": "Cookie 政策 | AIBAN",
      "metaDescription": "AIBAN 用咗邊啲 Cookie、佢哋做咩、保留幾耐，同埋你點樣控制佢哋。"
    }
  },
  "demoPage": {
    "metaTitle": "示範 | AIBAN",
    "metaDescription": "睇 AIBAN 嘅操作示範，了解註冊之後會發生咩事：由加網站到寄出第一期電子報。",
    "eyebrow": "示範",
    "title": "睇吓 AIBAN 點樣運作",
    "lead": "先睇示範片，再了解註冊之後會發生咩事。",
    "videoTitle": "AIBAN 操作示範影片",
    "playLabel": "播放示範影片",
    "videoNote": "影片經 YouTube 播放。",
    "stepsTitle": "註冊之後會發生咩事",
    "steps": [
      {
        "title": "加入你嘅網站",
        "body": "輸入你嘅網站、網誌或者你追蹤嘅新聞網站地址。AIBAN 會讀取入面嘅新內容。"
      },
      {
        "title": "描述你嘅讀者同語氣",
        "body": "話 AIBAN 知邊個睇你嘅電子報，同埋應該用咩語氣。你亦可以叫佢根據你嘅網站建議一段描述。"
      },
      {
        "title": "揀時間表",
        "body": "揀電子報幾耐寄一次。之後可以喺控制面板更改。"
      },
      {
        "title": "加入訂閱者",
        "body": "上載名單、逐個加，或者分享你嘅訂閱頁面同小工具。每位訂閱者都會揀一種語言。"
      },
      {
        "title": "加入寄件人名稱同簽名",
        "body": "加入讀者會見到嘅名稱同電郵簽名。AIBAN 會由已驗證嘅地址用你個名寄出每一期，回覆會去你嘅收件匣。"
      }
    ],
    "ctaTitle": "用你自己嘅網站試吓",
    "ctaBody": "免費方案包括 1 個來源同最多 100 位訂閱者。",
    "primaryCta": "免費開始",
    "secondaryCta": "睇價錢"
  },
  "helpCenter": {
    "metaTitle": "幫助 | AIBAN",
    "metaDescription": "關於設定 AIBAN 嘅解答：來源、語言、用你個名寄出、訂閱者、訂閱小工具、網誌同收費。",
    "eyebrow": "幫助中心",
    "title": "有咩可以幫到你？",
    "lead": "喺呢度搵設定同運作電子報嘅解答。如果搵唔到你需要嘅，請寫信畀我哋。",
    "searchLabel": "搜尋幫助中心",
    "searchPlaceholder": "試吓搜尋語言、小工具或者取消",
    "clearSearch": "清除搜尋",
    "resultsCount": "有 {count} 個解答符合你嘅搜尋。",
    "noResults": "冇解答符合你嘅搜尋。請試吓第二個字，或者寄電郵去 info@aiban.news。",
    "topicsLabel": "主題",
    "copyLink": "複製連結",
    "linkCopied": "已複製連結",
    "contactTitle": "仲需要幫助？",
    "contactBody": "請寫信去 info@aiban.news，並附上你註冊時用嘅電郵地址。",
    "emailCta": "寄電郵去 info@aiban.news",
    "limitsTitle": "申請更高額度",
    "limitsBody": "話畀我哋知你需要嘅上限，我哋會用電郵回覆。如果呢個頁面寄唔到請求，你嘅電郵程式會打開並填好內容，你直接寄畀我哋就得。",
    "faqFilterLabel": "篩選問題",
    "faqNoMatch": "冇問題符合你嘅篩選。",
    "groups": [
      {
        "id": "getting-started",
        "title": "入門",
        "items": [
          {
            "id": "what-is-aiban",
            "q": "AIBAN 係咩？",
            "a": "AIBAN 將你已經發佈嘅內容變成定期寄出嘅電子報。佢會讀你嘅網站、網誌或者你揀嘅新聞網站，用你嘅語氣寫新一期，再寄畀你嘅訂閱者。每位訂閱者都用自己揀嘅語言閱讀。"
          },
          {
            "id": "how-to-start",
            "q": "點樣開始？",
            "a": "喺註冊頁面開帳戶。設定過程會問你網站地址同一啲關於讀者嘅資料。之後你就可以加訂閱者，並喺控制面板管理所有嘢。"
          },
          {
            "id": "change-settings",
            "q": "之後可以改設定嗎？",
            "a": "可以。你之後可以喺控制台改來源、寄送時間、寄件人資料同訂閱者。如果想改方案，請寫信去 info@aiban.news。"
          }
        ]
      },
      {
        "id": "sources",
        "title": "來源同內容",
        "items": [
          {
            "id": "what-is-a-source",
            "q": "咩可以做來源？",
            "a": "來源係 AIBAN 讀取新內容嘅網址，例如你嘅網站、網誌或者你追蹤嘅新聞網站。你可以喺控制面板加來源。可以加幾多個視乎你嘅方案。"
          },
          {
            "id": "how-often",
            "q": "我嘅電子報幾耐寄一次？",
            "a": "設定來源時由你揀發佈頻率。之後可以喺控制面板更改時間表。"
          },
          {
            "id": "your-voice",
            "q": "AIBAN 點樣用我嘅語氣寫？",
            "a": "你描述電子報嘅風格，或者叫 AIBAN 幫你生成一段描述。每期電子報都會按呢段描述去寫。你隨時可以喺控制面板修改。"
          }
        ]
      },
      {
        "id": "languages",
        "title": "語言",
        "items": [
          {
            "id": "subscriber-language",
            "q": "訂閱者點樣收到自己語言嘅電子報？",
            "a": "每位訂閱者註冊時會揀偏好語言。AIBAN 會喺寄出前將每期電子報翻譯成嗰種語言。"
          },
          {
            "id": "site-language",
            "q": "可以用我嘅語言使用網站嗎？",
            "a": "可以。用畫面右下角嘅語言按鈕，就可以切換網站同控制面板嘅語言。"
          }
        ]
      },
      {
        "id": "sending",
        "title": "用你個名寄出",
        "items": [
          {
            "id": "own-address",
            "q": "電子報可以由我自己嘅電郵地址寄出嗎？",
            "a": "電子報由 AIBAN 嘅寄件地址寄出，有你嘅寄件人名稱同電郵簽名，回覆會去你嘅收件匣。我哋唔會問你攞電郵密碼，所以冇任何屬於你嘅嘢會洩漏。"
          },
          {
            "id": "app-password",
            "q": "我使唔使將電郵密碼畀 AIBAN？",
            "a": "唔使。AIBAN 永遠唔會問你攞電郵密碼或者應用程式密碼。電子報由 AIBAN 嘅地址用你個名寄出，回覆會寄返畀你。"
          }
        ]
      },
      {
        "id": "subscribers",
        "title": "訂閱者同訂閱小工具",
        "items": [
          {
            "id": "add-subscribers",
            "q": "點樣加訂閱者？",
            "a": "你可以喺控制面板逐個加，或者上載有名單嘅檔案。人哋亦可以經你嘅訂閱頁面或者訂閱小工具加入。"
          },
          {
            "id": "signup-widget",
            "q": "咩係訂閱小工具？",
            "a": "訂閱小工具係一個可以放喺你自己網站嘅訂閱表格。訪客輸入電郵地址同揀語言之後，就會加入你嘅名單。"
          },
          {
            "id": "subscriber-limit",
            "q": "訂閱者數量有冇上限？",
            "a": "每個方案都有自己嘅訂閱者上限。免費方案最多包括 100 位訂閱者。其他方案嘅上限可以喺價錢頁面睇到。"
          }
        ]
      },
      {
        "id": "blog",
        "title": "網誌",
        "items": [
          {
            "id": "blog-pages",
            "q": "我嘅電子報文章會發佈上網嗎？",
            "a": "會。AIBAN 為你電子報寫嘅文章亦會發佈成網頁，等人可以喺收件匣以外閱讀。"
          },
          {
            "id": "post-to-site",
            "q": "可以將文章發佈到我自己嘅網站嗎？",
            "a": "可以。喺控制面板，你可以設定一個 webhook，將每篇電子報文章以帖文形式傳送到你嘅網站。佢適用於 WordPress，同埋任何接受標準 REST 內容嘅平台。"
          }
        ]
      },
      {
        "id": "billing",
        "title": "收費",
        "items": [
          {
            "id": "free-plan",
            "q": "有冇免費方案？",
            "a": "有。免費方案包括 1 個來源同最多 100 位訂閱者。需要更多嘅時候，可以轉用付費方案。"
          },
          {
            "id": "monthly-yearly",
            "q": "可以按月或按年付款嗎？",
            "a": "係。付費方案按月或者按年收費。年費比連續 12 個月月費平 35%。想揀方案，請寫信去 info@aiban.news。"
          },
          {
            "id": "cancel",
            "q": "可以隨時取消嗎？",
            "a": "可以。你隨時寫信去 info@aiban.news，我哋會取消你嘅付費方案，或者將你轉返免費方案。"
          },
          {
            "id": "higher-limits",
            "q": "如果我需要嘅多過最大嘅方案點算？",
            "a": "請用幫助頁面上嘅申請表話我哋知你需要嘅額度。我哋會用電郵回覆。"
          }
        ]
      }
    ]
  },
  "mainPage": {
    "skipToMainContent": "跳至主要內容",
    "dismissAnnouncement": "隱藏公告",
    "problem": "問題：",
    "outcome": "結果：",
    "disclaimer": "六五折優惠只適用於年費計劃。"
  },
  "authForm": {
    "emailValidation": "請輸入電郵地址，例如 name@example.com。",
    "failedToSendCode": "我哋寄唔到驗證碼。請檢查電郵地址，一分鐘後再試。",
    "sending": "傳送中...",
    "codeSent": "我哋已經寄咗驗證碼去你嘅電郵。",
    "invalidCode": "驗證碼唔啱。請睇下我哋最近寄畀你嘅電郵，或者重新寄驗證碼。",
    "regenerateCode": "重新傳送驗證碼",
    "back": "返去",
    "byProceeding": "如果你繼續，即係代表你同意",
    "termsOfService": "服務條款",
    "and": "同埋",
    "privacyPolicy": "私隱政策",
    "appName": "AI 電子報"
  },
  "welcome": {
    "title": "自動電子報生成器",
    "setItOnce": "設定一次。",
    "useItForever": "之後佢會自己繼續運作。"
  },
  "lead": {
    "title": "將訂戶變做訪客",
    "recommendation": "連埋你個網頁，等 AI 了解下你嘅品牌風格。",
    "question": "你有冇網站？（可選，之後都可以加）",
    "placeholder": "https://your-site.com"
  },
  "newsSource": {
    "title": "連接你嘅內容來源",
    "subtitle": "我哋會自動抓取你個 feed，咁你就唔使由零開始啦。",
    "placeholder": "你嘅 Blog 或者 RSS 連結"
  },
  "subscribe": {
    "welcome": {
      "title": "歡迎訂閱呢份電子報。",
      "invitedBy": "你係由 {configuratorId} 邀請入嚟嘅。"
    }
  },
  "header": {
    "goToWorkspace": "打開控制面板",
    "inBilling": "價錢",
    "vip": "VIP",
    "plan": "{planName} 計劃",
    "logIn": "登入",
    "getStarted": "免費開始"
  },
  "fileInput": {
    "chooseFile": "揀檔案",
    "dropFile": "擺喺呢度",
    "release": "鬆手就上傳"
  },
  "billing": {
    "title": "收費同訂閱",
    "currentPlanTitle": "你目前嘅方案",
    "upgradePlanTitle": "更改方案",
    "manageSubscription": "管理訂閱",
    "vipPlanName": "VIP 合作夥伴",
    "vipPlanDescription": "由 AIBAN 提供嘅無限制使用權。",
    "perMonth": "每個月",
    "perYear": "每一年",
    "monthAbbreviation": "月",
    "equivalentTo": "等同於",
    "mostPopular": "最受歡迎",
    "upgradeTo": "升級至",
    "downgradeTo": "轉用",
    "currentPlanButton": "你嘅方案",
    "youSave": "你慳咗",
    "users": "用戶",
    "newsSources": "新聞來源",
    "monthly": "月費",
    "yearly": "年費",
    "loadingPlan": "讀取計劃資料中..."
  },
  "languages": [
    {
      "code": "ab",
      "name": "阿布哈茲文"
    },
    {
      "code": "aa",
      "name": "阿法爾文"
    },
    {
      "code": "af",
      "name": "南非荷蘭文"
    },
    {
      "code": "ak",
      "name": "阿肯文"
    },
    {
      "code": "sq",
      "name": "阿爾巴尼亞文"
    },
    {
      "code": "am",
      "name": "阿姆哈拉文"
    },
    {
      "code": "ar",
      "name": "阿拉伯文"
    },
    {
      "code": "an",
      "name": "阿拉貢文"
    },
    {
      "code": "hy",
      "name": "亞美尼亞文"
    },
    {
      "code": "as",
      "name": "阿薩姆文"
    },
    {
      "code": "av",
      "name": "阿瓦爾文"
    },
    {
      "code": "ae",
      "name": "阿維斯陀文"
    },
    {
      "code": "ay",
      "name": "艾馬拉文"
    },
    {
      "code": "az",
      "name": "阿塞拜疆文"
    },
    {
      "code": "bm",
      "name": "班巴拉文"
    },
    {
      "code": "ba",
      "name": "巴什基爾文"
    },
    {
      "code": "eu",
      "name": "巴斯克文"
    },
    {
      "code": "be",
      "name": "白俄羅斯文"
    },
    {
      "code": "bn",
      "name": "孟加拉文"
    },
    {
      "code": "bi",
      "name": "比斯拉馬文"
    },
    {
      "code": "bs",
      "name": "波斯尼亞文"
    },
    {
      "code": "br",
      "name": "布列塔尼文"
    },
    {
      "code": "bg",
      "name": "保加利亞文"
    },
    {
      "code": "my",
      "name": "緬甸文"
    },
    {
      "code": "ca",
      "name": "加泰羅尼亞文"
    },
    {
      "code": "ch",
      "name": "查莫羅文"
    },
    {
      "code": "ce",
      "name": "車臣文"
    },
    {
      "code": "ny",
      "name": "齊切瓦文"
    },
    {
      "code": "zh",
      "name": "中文"
    },
    {
      "code": "cu",
      "name": "教會斯拉夫文"
    },
    {
      "code": "cv",
      "name": "楚瓦什文"
    },
    {
      "code": "kw",
      "name": "康和文"
    },
    {
      "code": "co",
      "name": "科西嘉文"
    },
    {
      "code": "cr",
      "name": "克里文"
    },
    {
      "code": "hr",
      "name": "克羅地亞文"
    },
    {
      "code": "cs",
      "name": "捷克文"
    },
    {
      "code": "da",
      "name": "丹麥文"
    },
    {
      "code": "dv",
      "name": "迪維希文"
    },
    {
      "code": "nl",
      "name": "荷蘭文"
    },
    {
      "code": "dz",
      "name": "宗卡文"
    },
    {
      "code": "en",
      "name": "英文"
    },
    {
      "code": "eo",
      "name": "世界語"
    },
    {
      "code": "et",
      "name": "愛沙尼亞文"
    },
    {
      "code": "ee",
      "name": "埃維文"
    },
    {
      "code": "fo",
      "name": "法羅文"
    },
    {
      "code": "fj",
      "name": "斐濟文"
    },
    {
      "code": "fi",
      "name": "芬蘭文"
    },
    {
      "code": "fr",
      "name": "法文"
    },
    {
      "code": "fy",
      "name": "西弗里西亞文"
    },
    {
      "code": "ff",
      "name": "富拉文"
    },
    {
      "code": "gd",
      "name": "蘇格蘭蓋爾文"
    },
    {
      "code": "gl",
      "name": "加利西亞文"
    },
    {
      "code": "lg",
      "name": "干達文"
    },
    {
      "code": "ka",
      "name": "格魯吉亞文"
    },
    {
      "code": "de",
      "name": "德文"
    },
    {
      "code": "el",
      "name": "希臘文"
    },
    {
      "code": "kl",
      "name": "格陵蘭文"
    },
    {
      "code": "gn",
      "name": "瓜拉尼文"
    },
    {
      "code": "gu",
      "name": "古吉拉特文"
    },
    {
      "code": "ht",
      "name": "海地克里奧爾文"
    },
    {
      "code": "ha",
      "name": "豪薩文"
    },
    {
      "code": "he",
      "name": "希伯來文"
    },
    {
      "code": "hz",
      "name": "赫雷羅文"
    },
    {
      "code": "hi",
      "name": "印地文"
    },
    {
      "code": "ho",
      "name": "希里莫圖文"
    },
    {
      "code": "hu",
      "name": "匈牙利文"
    },
    {
      "code": "is",
      "name": "冰島文"
    },
    {
      "code": "io",
      "name": "伊多文"
    },
    {
      "code": "ig",
      "name": "伊博文"
    },
    {
      "code": "id",
      "name": "印尼文"
    },
    {
      "code": "ia",
      "name": "國際語A"
    },
    {
      "code": "ie",
      "name": "國際語E"
    },
    {
      "code": "iu",
      "name": "因紐特文"
    },
    {
      "code": "ik",
      "name": "依努皮亞克文"
    },
    {
      "code": "ga",
      "name": "愛爾蘭文"
    },
    {
      "code": "it",
      "name": "意大利文"
    },
    {
      "code": "ja",
      "name": "日文"
    },
    {
      "code": "jv",
      "name": "爪哇文"
    },
    {
      "code": "kn",
      "name": "卡納達文"
    },
    {
      "code": "kr",
      "name": "卡努里文"
    },
    {
      "code": "ks",
      "name": "克什米爾文"
    },
    {
      "code": "kk",
      "name": "哈薩克文"
    },
    {
      "code": "km",
      "name": "高棉文"
    },
    {
      "code": "ki",
      "name": "基庫尤文"
    },
    {
      "code": "rw",
      "name": "盧旺達文"
    },
    {
      "code": "ky",
      "name": "吉爾吉斯文"
    },
    {
      "code": "kv",
      "name": "科米文"
    },
    {
      "code": "kg",
      "name": "剛果文"
    },
    {
      "code": "ko",
      "name": "韓文"
    },
    {
      "code": "kj",
      "name": "庫瓦尼亞馬文"
    },
    {
      "code": "ku",
      "name": "庫爾德文"
    },
    {
      "code": "lo",
      "name": "老撾文"
    },
    {
      "code": "la",
      "name": "拉丁文"
    },
    {
      "code": "lv",
      "name": "拉脫維亞文"
    },
    {
      "code": "li",
      "name": "林堡文"
    },
    {
      "code": "ln",
      "name": "林加拉文"
    },
    {
      "code": "lt",
      "name": "立陶宛文"
    },
    {
      "code": "lu",
      "name": "盧巴-加丹加文"
    },
    {
      "code": "lb",
      "name": "盧森堡文"
    },
    {
      "code": "mk",
      "name": "馬其頓文"
    },
    {
      "code": "mg",
      "name": "馬拉加斯文"
    },
    {
      "code": "ms",
      "name": "馬來文"
    },
    {
      "code": "ml",
      "name": "馬拉雅拉姆文"
    },
    {
      "code": "mt",
      "name": "馬耳他文"
    },
    {
      "code": "gv",
      "name": "曼島文"
    },
    {
      "code": "mi",
      "name": "毛利文"
    },
    {
      "code": "mr",
      "name": "馬拉地文"
    },
    {
      "code": "mh",
      "name": "馬紹爾文"
    },
    {
      "code": "mn",
      "name": "蒙古文"
    },
    {
      "code": "na",
      "name": "瑙魯文"
    },
    {
      "code": "nv",
      "name": "納瓦霍文"
    },
    {
      "code": "nd",
      "name": "北恩德貝勒文"
    },
    {
      "code": "nr",
      "name": "南恩德貝勒文"
    },
    {
      "code": "ng",
      "name": "恩東加文"
    },
    {
      "code": "ne",
      "name": "尼泊爾文"
    },
    {
      "code": "no",
      "name": "挪威文"
    },
    {
      "code": "nb",
      "name": "挪威書面語"
    },
    {
      "code": "nn",
      "name": "挪威新挪威語"
    },
    {
      "code": "oc",
      "name": "奧克西坦文"
    },
    {
      "code": "oj",
      "name": "奧吉布瓦文"
    },
    {
      "code": "or",
      "name": "奧里亞文"
    },
    {
      "code": "om",
      "name": "奧羅莫文"
    },
    {
      "code": "os",
      "name": "奧塞梯文"
    },
    {
      "code": "pi",
      "name": "巴利文"
    },
    {
      "code": "ps",
      "name": "普什圖文"
    },
    {
      "code": "fa",
      "name": "波斯文"
    },
    {
      "code": "pl",
      "name": "波蘭文"
    },
    {
      "code": "pt",
      "name": "葡萄牙文"
    },
    {
      "code": "pa",
      "name": "旁遮普文"
    },
    {
      "code": "qu",
      "name": "蓋丘亞文"
    },
    {
      "code": "ro",
      "name": "羅馬尼亞文"
    },
    {
      "code": "rm",
      "name": "羅曼什文"
    },
    {
      "code": "rn",
      "name": "隆迪文"
    },
    {
      "code": "ru",
      "name": "俄文"
    },
    {
      "code": "se",
      "name": "北薩米文"
    },
    {
      "code": "sm",
      "name": "薩摩亞文"
    },
    {
      "code": "sg",
      "name": "桑戈文"
    },
    {
      "code": "sa",
      "name": "梵文"
    },
    {
      "code": "sc",
      "name": "薩丁尼亞文"
    },
    {
      "code": "sr",
      "name": "塞爾維亞文"
    },
    {
      "code": "sn",
      "name": "紹納文"
    },
    {
      "code": "ii",
      "name": "四川彝文"
    },
    {
      "code": "sd",
      "name": "信德文"
    },
    {
      "code": "si",
      "name": "僧伽羅文"
    },
    {
      "code": "sk",
      "name": "斯洛伐克文"
    },
    {
      "code": "sl",
      "name": "斯洛文尼亞文"
    },
    {
      "code": "so",
      "name": "索馬里文"
    },
    {
      "code": "st",
      "name": "南索托文"
    },
    {
      "code": "es",
      "name": "西班牙文"
    },
    {
      "code": "su",
      "name": "巽他文"
    },
    {
      "code": "sw",
      "name": "斯瓦希里文"
    },
    {
      "code": "ss",
      "name": "斯瓦蒂文"
    },
    {
      "code": "sv",
      "name": "瑞典文"
    },
    {
      "code": "tl",
      "name": "他加祿文（菲律賓文）"
    },
    {
      "code": "ty",
      "name": "塔希提文"
    },
    {
      "code": "tg",
      "name": "塔吉克文"
    },
    {
      "code": "ta",
      "name": "泰米爾文"
    },
    {
      "code": "tt",
      "name": "韃靼文"
    },
    {
      "code": "te",
      "name": "泰盧固文"
    },
    {
      "code": "th",
      "name": "泰文"
    },
    {
      "code": "bo",
      "name": "藏文"
    },
    {
      "code": "ti",
      "name": "提格里尼亞文"
    },
    {
      "code": "to",
      "name": "湯加文"
    },
    {
      "code": "ts",
      "name": "聰加文"
    },
    {
      "code": "tn",
      "name": "茨瓦納文"
    },
    {
      "code": "tr",
      "name": "土耳其文"
    },
    {
      "code": "tk",
      "name": "土庫曼文"
    },
    {
      "code": "tw",
      "name": "契維文"
    },
    {
      "code": "ug",
      "name": "維吾爾文"
    },
    {
      "code": "uk",
      "name": "烏克蘭文"
    },
    {
      "code": "ur",
      "name": "烏爾都文"
    },
    {
      "code": "uz",
      "name": "烏茲別克文"
    },
    {
      "code": "ve",
      "name": "文達文"
    },
    {
      "code": "vi",
      "name": "越南文"
    },
    {
      "code": "vo",
      "name": "沃拉普克文"
    },
    {
      "code": "wa",
      "name": "瓦隆文"
    },
    {
      "code": "cy",
      "name": "威爾斯文"
    },
    {
      "code": "wo",
      "name": "沃洛夫文"
    },
    {
      "code": "xh",
      "name": "科薩文"
    },
    {
      "code": "yi",
      "name": "意第緒文"
    },
    {
      "code": "yo",
      "name": "約魯巴文"
    },
    {
      "code": "za",
      "name": "壯文"
    },
    {
      "code": "zu",
      "name": "祖魯文"
    }
  ],
  "countries": [
    {
      "code": "AF",
      "name": "阿富汗"
    },
    {
      "code": "AL",
      "name": "阿爾巴尼亞"
    },
    {
      "code": "DZ",
      "name": "阿爾及利亞"
    },
    {
      "code": "AS",
      "name": "美屬薩摩亞"
    },
    {
      "code": "AD",
      "name": "安道爾"
    },
    {
      "code": "AO",
      "name": "安哥拉"
    },
    {
      "code": "AI",
      "name": "安圭拉"
    },
    {
      "code": "AQ",
      "name": "南極洲"
    },
    {
      "code": "AG",
      "name": "安提瓜和巴布達"
    },
    {
      "code": "AR",
      "name": "阿根廷"
    },
    {
      "code": "AM",
      "name": "亞美尼亞"
    },
    {
      "code": "AW",
      "name": "阿魯巴"
    },
    {
      "code": "AU",
      "name": "澳洲"
    },
    {
      "code": "AT",
      "name": "奧地利"
    },
    {
      "code": "AZ",
      "name": "阿塞拜疆"
    },
    {
      "code": "BS",
      "name": "巴哈馬"
    },
    {
      "code": "BH",
      "name": "巴林"
    },
    {
      "code": "BD",
      "name": "孟加拉"
    },
    {
      "code": "BB",
      "name": "巴巴多斯"
    },
    {
      "code": "BY",
      "name": "白俄羅斯"
    },
    {
      "code": "BE",
      "name": "比利時"
    },
    {
      "code": "BZ",
      "name": "伯利茲"
    },
    {
      "code": "BJ",
      "name": "貝寧"
    },
    {
      "code": "BM",
      "name": "百慕達"
    },
    {
      "code": "BT",
      "name": "不丹"
    },
    {
      "code": "BO",
      "name": "玻利維亞"
    },
    {
      "code": "BA",
      "name": "波斯尼亞和黑塞哥維那"
    },
    {
      "code": "BW",
      "name": "博茨瓦納"
    },
    {
      "code": "BR",
      "name": "巴西"
    },
    {
      "code": "IO",
      "name": "英屬印度洋領地"
    },
    {
      "code": "VG",
      "name": "英屬維爾京群島"
    },
    {
      "code": "BN",
      "name": "汶萊"
    },
    {
      "code": "BG",
      "name": "保加利亞"
    },
    {
      "code": "BF",
      "name": "布基納法索"
    },
    {
      "code": "BI",
      "name": "布隆迪"
    },
    {
      "code": "KH",
      "name": "柬埔寨"
    },
    {
      "code": "CM",
      "name": "喀麥隆"
    },
    {
      "code": "CA",
      "name": "加拿大"
    },
    {
      "code": "CV",
      "name": "佛得角"
    },
    {
      "code": "KY",
      "name": "開曼群島"
    },
    {
      "code": "CF",
      "name": "中非共和國"
    },
    {
      "code": "TD",
      "name": "乍得"
    },
    {
      "code": "CL",
      "name": "智利"
    },
    {
      "code": "CN",
      "name": "中國"
    },
    {
      "code": "CX",
      "name": "聖誕島"
    },
    {
      "code": "CC",
      "name": "科科斯（基林）群島"
    },
    {
      "code": "CO",
      "name": "哥倫比亞"
    },
    {
      "code": "KM",
      "name": "科摩羅"
    },
    {
      "code": "CG",
      "name": "剛果（布）"
    },
    {
      "code": "CD",
      "name": "剛果（金）"
    },
    {
      "code": "CK",
      "name": "庫克群島"
    },
    {
      "code": "CR",
      "name": "哥斯達黎加"
    },
    {
      "code": "CI",
      "name": "象牙海岸"
    },
    {
      "code": "HR",
      "name": "克羅地亞"
    },
    {
      "code": "CU",
      "name": "古巴"
    },
    {
      "code": "CY",
      "name": "塞浦路斯"
    },
    {
      "code": "CZ",
      "name": "捷克"
    },
    {
      "code": "DK",
      "name": "丹麥"
    },
    {
      "code": "DJ",
      "name": "吉布提"
    },
    {
      "code": "DM",
      "name": "多米尼克"
    },
    {
      "code": "DO",
      "name": "多明尼加共和國"
    },
    {
      "code": "EC",
      "name": "厄瓜多爾"
    },
    {
      "code": "EG",
      "name": "埃及"
    },
    {
      "code": "SV",
      "name": "薩爾瓦多"
    },
    {
      "code": "GQ",
      "name": "赤道幾內亞"
    },
    {
      "code": "ER",
      "name": "厄立特里亞"
    },
    {
      "code": "EE",
      "name": "愛沙尼亞"
    },
    {
      "code": "SZ",
      "name": "斯威士蘭"
    },
    {
      "code": "ET",
      "name": "埃塞俄比亞"
    },
    {
      "code": "FJ",
      "name": "斐濟"
    },
    {
      "code": "FI",
      "name": "芬蘭"
    },
    {
      "code": "FR",
      "name": "法國"
    },
    {
      "code": "GA",
      "name": "加蓬"
    },
    {
      "code": "GM",
      "name": "岡比亞"
    },
    {
      "code": "GE",
      "name": "格魯吉亞"
    },
    {
      "code": "DE",
      "name": "德國"
    },
    {
      "code": "GH",
      "name": "加納"
    },
    {
      "code": "GR",
      "name": "希臘"
    },
    {
      "code": "GT",
      "name": "危地馬拉"
    },
    {
      "code": "GN",
      "name": "幾內亞"
    },
    {
      "code": "GY",
      "name": "圭亞那"
    },
    {
      "code": "HT",
      "name": "海地"
    },
    {
      "code": "HN",
      "name": "洪都拉斯"
    },
    {
      "code": "HK",
      "name": "香港"
    },
    {
      "code": "HU",
      "name": "匈牙利"
    },
    {
      "code": "IS",
      "name": "冰島"
    },
    {
      "code": "IN",
      "name": "印度"
    },
    {
      "code": "ID",
      "name": "印尼"
    },
    {
      "code": "IR",
      "name": "伊朗"
    },
    {
      "code": "IQ",
      "name": "伊拉克"
    },
    {
      "code": "IE",
      "name": "愛爾蘭"
    },
    {
      "code": "IL",
      "name": "以色列"
    },
    {
      "code": "IT",
      "name": "意大利"
    },
    {
      "code": "JM",
      "name": "牙買加"
    },
    {
      "code": "JP",
      "name": "日本"
    },
    {
      "code": "JO",
      "name": "約旦"
    },
    {
      "code": "KZ",
      "name": "哈薩克斯坦"
    },
    {
      "code": "KE",
      "name": "肯尼亞"
    },
    {
      "code": "KR",
      "name": "韓國"
    },
    {
      "code": "KW",
      "name": "科威特"
    },
    {
      "code": "KG",
      "name": "吉爾吉斯斯坦"
    },
    {
      "code": "LA",
      "name": "老撾"
    },
    {
      "code": "LV",
      "name": "拉脫維亞"
    },
    {
      "code": "LB",
      "name": "黎巴嫩"
    },
    {
      "code": "LS",
      "name": "萊索托"
    },
    {
      "code": "LR",
      "name": "利比里亞"
    },
    {
      "code": "LY",
      "name": "利比亞"
    },
    {
      "code": "LI",
      "name": "列支敦士登"
    },
    {
      "code": "LT",
      "name": "立陶宛"
    },
    {
      "code": "LU",
      "name": "盧森堡"
    },
    {
      "code": "MG",
      "name": "馬達加斯加"
    },
    {
      "code": "MW",
      "name": "馬拉維"
    },
    {
      "code": "MY",
      "name": "馬來西亞"
    },
    {
      "code": "MV",
      "name": "馬爾代夫"
    },
    {
      "code": "ML",
      "name": "馬里"
    },
    {
      "code": "MT",
      "name": "馬耳他"
    },
    {
      "code": "MX",
      "name": "墨西哥"
    },
    {
      "code": "MD",
      "name": "摩爾多瓦"
    },
    {
      "code": "MC",
      "name": "摩納哥"
    },
    {
      "code": "MN",
      "name": "蒙古"
    },
    {
      "code": "ME",
      "name": "黑山"
    },
    {
      "code": "MA",
      "name": "摩洛哥"
    },
    {
      "code": "MZ",
      "name": "莫桑比克"
    },
    {
      "code": "MM",
      "name": "緬甸"
    },
    {
      "code": "NA",
      "name": "納米比亞"
    },
    {
      "code": "NP",
      "name": "尼泊爾"
    },
    {
      "code": "NL",
      "name": "荷蘭"
    },
    {
      "code": "NZ",
      "name": "新西蘭"
    },
    {
      "code": "NI",
      "name": "尼加拉瓜"
    },
    {
      "code": "NE",
      "name": "尼日爾"
    },
    {
      "code": "NG",
      "name": "尼日利亞"
    },
    {
      "code": "MK",
      "name": "北馬其頓"
    },
    {
      "code": "NO",
      "name": "挪威"
    },
    {
      "code": "OM",
      "name": "阿曼"
    },
    {
      "code": "PK",
      "name": "巴基斯坦"
    },
    {
      "code": "PA",
      "name": "巴拿馬"
    },
    {
      "code": "PG",
      "name": "巴布亞新幾內亞"
    },
    {
      "code": "PY",
      "name": "巴拉圭"
    },
    {
      "code": "PE",
      "name": "秘魯"
    },
    {
      "code": "PH",
      "name": "菲律賓"
    },
    {
      "code": "PL",
      "name": "波蘭"
    },
    {
      "code": "PT",
      "name": "葡萄牙"
    },
    {
      "code": "QA",
      "name": "卡塔爾"
    },
    {
      "code": "RO",
      "name": "羅馬尼亞"
    },
    {
      "code": "RU",
      "name": "俄羅斯"
    },
    {
      "code": "RW",
      "name": "盧旺達"
    },
    {
      "code": "SA",
      "name": "沙地阿拉伯"
    },
    {
      "code": "SN",
      "name": "塞內加爾"
    },
    {
      "code": "RS",
      "name": "塞爾維亞"
    },
    {
      "code": "SG",
      "name": "新加坡"
    },
    {
      "code": "SK",
      "name": "斯洛伐克"
    },
    {
      "code": "SI",
      "name": "斯洛文尼亞"
    },
    {
      "code": "ZA",
      "name": "南非"
    },
    {
      "code": "ES",
      "name": "西班牙"
    },
    {
      "code": "LK",
      "name": "斯里蘭卡"
    },
    {
      "code": "SE",
      "name": "瑞典"
    },
    {
      "code": "CH",
      "name": "瑞士"
    },
    {
      "code": "TW",
      "name": "台灣"
    },
    {
      "code": "TH",
      "name": "泰國"
    },
    {
      "code": "TR",
      "name": "土耳其"
    },
    {
      "code": "UG",
      "name": "烏干達"
    },
    {
      "code": "UA",
      "name": "烏克蘭"
    },
    {
      "code": "AE",
      "name": "阿拉伯聯合酋長國"
    },
    {
      "code": "GB",
      "name": "英國"
    },
    {
      "code": "US",
      "name": "美國"
    },
    {
      "code": "UY",
      "name": "烏拉圭"
    },
    {
      "code": "UZ",
      "name": "烏茲別克斯坦"
    },
    {
      "code": "VE",
      "name": "委內瑞拉"
    },
    {
      "code": "VN",
      "name": "越南"
    },
    {
      "code": "YE",
      "name": "也門"
    },
    {
      "code": "ZM",
      "name": "贊比亞"
    },
    {
      "code": "ZW",
      "name": "津巴布韋"
    }
  ]
};
