// yue strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale yue
export default {
  "welcome": {
    "title": "歡迎訂閱",
    "invitedBy": "{configuratorId} 邀請你訂閱。"
  },
  "email": {
    "title": "每期應該寄去邊度？",
    "placeholder": "你嘅電郵"
  },
  "name": {
    "title": "你叫咩名？",
    "placeholder": "你嘅名"
  },
  "language": {
    "title": "你想用邊種語言閱讀？"
  },
  "subscribed": {
    "title": "你已經訂閱",
    "subtitle": "請喺收件匣睇吓確認電郵。",
    "continueTo": "繼續去",
    "finishingUp": "你可以關閉呢頁。"
  },
  "form": {
    "heading": "訂閱 {title}",
    "headingFallback": "訂閱呢份電子報",
    "intro": "新一期會用電郵送到，並用你揀嘅語言寫。",
    "from": "嚟自 {sender}",
    "emailLabel": "電郵地址",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "名",
    "optional": "可選",
    "nameHint": "我哋用佢嚟稱呼你。如果留空，我哋會用你電郵地址開頭嘅部分。",
    "languageLabel": "電子報語言",
    "languageSummary": "電子報語言：{language}。",
    "languageChange": "更改",
    "languageHint": "呢個係根據你嘅瀏覽器設定揀嘅。",
    "submit": "訂閱",
    "submitting": "訂閱緊...",
    "consent": "訂閱即表示你同意收 {sender} 嘅電郵。每封電郵都有取消訂閱連結。",
    "privacy": "私隱政策",
    "loadingInfo": "載入緊電子報資料"
  },
  "success": {
    "title": "請睇吓你嘅收件匣",
    "body": "我哋已經寄咗確認電郵去 {email}。請打開佢再揀「確認訂閱」。",
    "next": "確認之後，你會收到第一期，用{language}寫。",
    "spam": "如果幾分鐘內都收唔到，請睇吓垃圾郵件或者「推廣」資料夾。",
    "changeEmail": "用另一個電郵",
    "continueTo": "繼續去 {host}"
  },
  "errors": {
    "emailRequired": "請輸入你嘅電郵地址。",
    "emailInvalid": "呢個電郵地址好似唔完整。請檢查再試。",
    "missingLink": "呢條訂閱連結欠資料。請向寄件人攞過條新連結。",
    "notFound": "呢條訂閱連結已經失效。請向寄件人攞過條新連結。",
    "limit": "呢份電子報暫時唔接受新訂閱者。請遲啲再試。",
    "invalid": "我哋接受唔到呢個地址。請檢查再試。",
    "server": "儲存唔到你嘅訂閱。請遲啲再試。",
    "network": "連唔到伺服器。請檢查網絡連線再試。"
  },
  "confirm": {
    "title": "確認你嘅訂閱",
    "body": "揀下面個按鈕，開始喺 {email} 收電子報。",
    "button": "確認訂閱",
    "confirming": "確認緊...",
    "consent": "確認即表示你同意用電郵收呢份電子報。你可以喺任何一期取消訂閱。",
    "successTitle": "你已經訂閱",
    "successBody": "新一期會寄去 {email}。",
    "successTip": "為咗唔好入垃圾郵件，請將寄件人加入聯絡人。",
    "invalidTitle": "呢條連結唔完整",
    "invalidBody": "請再打開確認電郵，揀入面嘅按鈕。如果搵唔到，請喺寄件人嘅頁面重新註冊。",
    "notFoundBody": "搵唔到呢個地址嘅註冊記錄。請喺寄件人嘅頁面重新註冊。",
    "errorBody": "確認唔到你嘅訂閱。請遲啲再試。",
    "retry": "再試一次",
    "home": "去主頁"
  },
  "embed": {
    "title": "喺你嘅網站加訂閱表格",
    "intro": "將下面任何一段程式碼貼落你嘅網站。註冊嘅人會先收到確認電郵，之後用自己嘅語言收到你嘅電子報。",
    "linkLabel": "訂閱頁面連結",
    "linkHint": "可以分享喺社交平台簡介、電郵簽名或者二維碼。",
    "scriptLabel": "Script 標籤（建議）",
    "scriptHint": "貼喺表格要顯示嘅位置。表格會自動調整大小。",
    "iframeLabel": "Iframe",
    "iframeHint": "如果你嘅網站唔准用 script，就用呢個。",
    "copy": "複製",
    "copied": "已複製",
    "copyFailed": "請揀選文字再自己複製。",
    "options": "表格選項",
    "accent": "按鈕顏色",
    "accentHint": "唔改就會用你嘅品牌顏色。",
    "theme": "主題",
    "themeAuto": "跟訪客嘅設定",
    "themeLight": "淺色",
    "themeDark": "深色",
    "layout": "版面",
    "layoutFull": "完整（標題、名同語言）",
    "layoutCompact": "精簡（電郵同按鈕）",
    "preview": "預覽",
    "previewNote": "預覽係即時嘅。喺呢度註冊會建立一位真正嘅訂閱者。",
    "missing": "請先建立電子報。建立之後，訂閱表格會喺呢度顯示。"
  },
  "page": {
    "poweredBy": "由 AIBAN 提供",
    "title": "訂閱"
  },
  "signature": {
    "title": "電郵簽名",
    "intro": "讀者會喺每期結尾見到佢。撳預覽入面任何部分就可以編輯。",
    "show": "喺每期顯示我嘅簽名",
    "showHint": "關閉之後，電子報會喺文章完結時結束。",
    "preview": "預覽",
    "previewEmpty": "你嘅簽名係空嘅。先加你個名開始。",
    "articleEnd": "文章完",
    "tabContent": "內容",
    "tabStyle": "樣式",
    "blocks": "包括啲咩",
    "blocksHint": "揀標籤就可以顯示或隱藏嗰部分。隱藏咗嘅部分會保留文字。",
    "layout": "版面",
    "layouts": {
      "bar": "色條",
      "photo": "相片",
      "stacked": "上下排列",
      "centered": "置中",
      "minimal": "只有文字"
    },
    "fields": {
      "name": "名",
      "role": "職銜",
      "company": "公司",
      "phone": "電話",
      "email": "電郵",
      "website": "網站",
      "address": "地址",
      "photoUrl": "相片",
      "logoUrl": "標誌",
      "socials": "社交連結",
      "cta": "按鈕",
      "disclaimer": "法律聲明"
    },
    "groups": {
      "about": "關於你",
      "contact": "聯絡",
      "images": "圖片",
      "socials": "社交連結",
      "cta": "按鈕",
      "disclaimer": "法律聲明"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "創辦人",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Main Street, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "預約通話",
      "ctaUrl": "https://"
    },
    "ctaText": "按鈕文字",
    "ctaLink": "按鈕連結",
    "hints": {
      "photoUrl": "正方形 PNG 或 JPG 嘅連結，最少 144×144 像素，細過 200 KB。會以 72×72 像素顯示喺你個名旁邊。",
      "logoUrl": "透明或白色背景嘅 PNG 或 JPG 連結，高度最少 64 像素。會以 32 像素高顯示。",
      "website": "如果你冇寫 https://，我哋會幫你加。",
      "cta": "按鈕要同時有文字同連結先會顯示。",
      "disclaimer": "底部嘅細字，例如保密聲明。唔需要可以留空。"
    },
    "style": {
      "accent": "強調色",
      "accentHint": "用喺色條、連結同按鈕。預設係你嘅品牌顏色。",
      "font": "字型",
      "fontSans": "無襯線",
      "fontSerif": "襯線",
      "size": "文字大小",
      "sizeMd": "正常",
      "sizeSm": "細",
      "shape": "相片形狀",
      "shapeRound": "圓形",
      "shapeSquare": "正方形"
    },
    "hidden": "已隱藏",
    "reset": "重新開始",
    "resetConfirm": "再揀一次就會清空所有欄位"
  }
};
