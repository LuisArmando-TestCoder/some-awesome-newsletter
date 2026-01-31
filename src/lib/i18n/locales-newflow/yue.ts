export default {
  step01: {
    title: "聽起來像人類的AI自動為您的訂閱者撰寫新聞通訊",
    subtitle: "多長時間一次，選擇<u>每個月</u>或<u>每週</u>或<u>每天</u>或<u>什麼時間</u>"
  },
  step02: {
    title: "新聞通訊的語言",
    subtitle: "“如果不同，您的新聞通訊也將以每個用戶的特定語言發送”"
  },
  step03: {
    title: "重定向（可選）",
    subtitle: "您想將用戶重定向到您的頁面嗎？",
    description: "您可以在這裡粘貼您的頁面鏈接，我們將計算有多少人從AI創建的電子郵件中進入",
    placeholder: "https://your-page.com"
  },
  step04: {
    title: "您希望AI選擇的新聞類型",
    subtitle: "哪個對話主題或話題（如果設置了重定向鏈接則從中推斷，否則為空）",
    placeholder: "例如 人工智能、營銷、健康..."
  },
  step05: {
    title: "自定義您的簽名",
    subtitle: "可視化設計或直接編輯代碼",
    visualEditor: "可視化編輯器",
    htmlSource: "HTML源碼",
    livePreview: "實時預覽",
    yourName: "您的名字",
    yourTitle: "您的頭銜",
    facebookProfile: "Facebook個人資料",
    instagramProfile: "Instagram個人資料",
    editHtml: "直接編輯HTML...",
    warning: "⚠️ 如果您切換回可視化編輯器並進行更改，此處所做的編輯將被覆蓋。"
  },
  step06: {
    title: "新聞來源",
    subtitle: "您想使用哪個新聞網站？",
    description: "輸入URL或讓我們根據您的主題為您選擇一個。",
    descriptionSmall: "我們將分析該網站以找到最佳內容。這可能需要幾秒鐘。",
    placeholder: "https://example.com",
    analyzing: "正在分析...",
    next: "下一步",
    errors: {
      failedToGenerate: "生成選擇器失敗。請重試或檢查URL。",
      errorGenerating: "生成選擇器時發生錯誤。",
      invalidUrl: "請輸入有效的URL或選擇一個來源。"
    }
  },
  step07: {
    title: "內容選擇器",
    subtitle: "將每個網站視為一個<strong>佈局獨特的圖書館</strong>。",
    explanation1: "這個<strong>'選擇器'</strong>是我們為該網站創建的特定地圖。它告訴我們的系統確切去哪裡查找您想要的文章，同時忽略菜單按鈕和廣告。",
    explanation2: "<strong>我們已為您自動填充此地圖。</strong>",
    placeholder: "選擇器字符串...",
    regenerate: "重新生成選擇器",
    regenerating: "正在重新生成...",
    errors: {
      noUrl: "未找到新聞來源URL。",
      failedRegenerate: "重新生成選擇器失敗。",
      errorRegenerate: "重新生成選擇器時發生錯誤。"
    }
  },
  step08: {
    title: "預覽",
    placeholder: "準備好生成您的第一份新聞通訊了嗎？",
    generateBtn: "生成新聞通訊電子郵件",
    sentBtn: "已發送！檢查您的電子郵件",
    sendTestBtn: "發送測試電子郵件",
    regenerateBtn: "重新生成",
    loading: {
      initializing: "正在初始化...",
      starting: "開始生成...",
      scraping: "正在抓取內容...",
      translating: "正在翻譯文章...",
      formatting: "正在格式化電子郵件...",
      sending: "正在連接到電子郵件提供商...",
      authenticating: "正在驗證...",
      sendingArticle: "正在發送文章...",
      creating: "正在創建新聞來源...",
      saving: "正在保存配置...",
      finalizing: "正在完成設置..."
    },
    errors: {
      generationFailed: "生成失敗：",
      createFailed: "創建新聞來源失敗。請重試。",
      errorCreating: "創建新聞來源時出錯：",
      sendFailed: "發送電子郵件失敗："
    },
    defaultSubject: "您生成的新聞通訊預覽"
  },
  step09: {
    title: "從您的電子郵件發送文章",
    subtitle: "應用密碼（可選）",
    description: "（如果您有gmail服務，請在此處輸入您的應用密碼）",
    label: "應用密碼",
    placeholder: "您的應用密碼"
  },
  step10: {
    title: "Gmail地址（可選）",
    subtitle: "Gmail電子郵件地址",
    description: "如果您想從特定的Gmail地址發送",
    placeholder: "your-email@gmail.com"
  },
  step11: {
    title: "發送測試電子郵件",
    subtitle: "給自己發送一封測試電子郵件以驗證配置。",
    sendNow: "立即發送",
    sent: "已發送！檢查您的電子郵件",
    loading: {
      connecting: "正在連接到電子郵件提供商...",
      authenticating: "正在驗證...",
      sending: "正在發送文章..."
    }
  },
  step12: {
    title: "與您的關注者分享此時事通訊",
    subtitle: "訂閱漏斗的鏈接（在他們開始接收電子郵件之前，他們必須接受您的邀請）",
    copy: "複製",
    copied: "鏈接已複製！"
  },
  step13: {
    title: "計劃和限制",
    currentPlan: "當前計劃：",
    limits: "限制：",
    unknown: "未知",
    changePlan: "更改計劃",
    advancedFeatures: "需要更高級的功能？",
    developerText: "查看我們的開發者部分，將此新聞通訊訂閱漏斗集成到您的服務器上，包括您所有生成的文章的博客，並使用我們的API密鑰從您的代碼庫訂閱用戶。",
    dashboardBtn: "前往儀表板",
    usage: "使用情況：",
    limitDetails: {
      free: "100個用戶限制",
      starter: "5個來源，10萬用戶",
      growth: "17個來源，25萬用戶",
      pro: "25個來源，50萬用戶",
      master: "50個來源，無限用戶",
      vipfree: "VIP免費"
    }
  }
};
