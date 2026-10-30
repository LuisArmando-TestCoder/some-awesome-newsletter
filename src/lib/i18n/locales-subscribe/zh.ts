// zh strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale zh
export default {
  "welcome": {
    "title": "欢迎订阅",
    "invitedBy": "{configuratorId} 邀请您订阅。"
  },
  "email": {
    "title": "每期简报应发送到哪里？",
    "placeholder": "您的电子邮箱"
  },
  "name": {
    "title": "您叫什么名字？",
    "placeholder": "您的名字"
  },
  "language": {
    "title": "您想用哪种语言阅读？"
  },
  "subscribed": {
    "title": "您已订阅",
    "subtitle": "请在收件箱中查收确认邮件。",
    "continueTo": "继续",
    "finishingUp": "您可以关闭此页面了。"
  },
  "form": {
    "heading": "订阅 {title}",
    "headingFallback": "订阅这份新闻简报",
    "intro": "新一期会通过邮件送达，并以您选择的语言撰写。",
    "from": "来自 {sender}",
    "emailLabel": "邮箱地址",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "名字",
    "optional": "可选",
    "nameHint": "我们用它来称呼您。如果留空，我们会使用您邮箱地址的开头部分。",
    "languageLabel": "简报语言",
    "languageSummary": "简报语言：{language}。",
    "languageChange": "更改",
    "languageHint": "这是根据您的浏览器设置选择的。",
    "submit": "订阅",
    "submitting": "正在订阅...",
    "consent": "订阅即表示您同意接收来自 {sender} 的邮件。每封邮件都有退订链接。",
    "privacy": "隐私政策",
    "loadingInfo": "正在加载新闻简报信息"
  },
  "success": {
    "title": "请查收邮件",
    "body": "我们已向 {email} 发送确认邮件。请打开邮件并选择“确认订阅”。",
    "next": "确认后，您会收到第一期简报，以{language}撰写。",
    "spam": "如果几分钟内没有收到，请查看垃圾邮件或“推广”文件夹。",
    "changeEmail": "使用其他邮箱",
    "continueTo": "继续前往 {host}"
  },
  "errors": {
    "emailRequired": "请输入您的邮箱地址。",
    "emailInvalid": "这个邮箱地址似乎不完整。请检查后重试。",
    "missingLink": "这个订阅链接缺少信息。请向发件人索取新链接。",
    "notFound": "这个订阅链接已失效。请向发件人索取新链接。",
    "limit": "这份新闻简报目前无法接受新订阅者。请稍后再试。",
    "invalid": "我们无法接受这个地址。请检查后重试。",
    "server": "无法保存您的订阅。请稍后再试。",
    "network": "无法连接到服务器。请检查网络连接后重试。"
  },
  "confirm": {
    "title": "确认您的订阅",
    "body": "选择下面的按钮，开始在 {email} 接收简报。",
    "button": "确认订阅",
    "confirming": "正在确认...",
    "consent": "确认即表示您同意通过邮件接收这份新闻简报。您可以在任何一期中退订。",
    "successTitle": "您已订阅",
    "successBody": "新一期简报会发送到 {email}。",
    "successTip": "为避免简报进入垃圾邮件，请把发件人添加到联系人。",
    "invalidTitle": "这个链接不完整",
    "invalidBody": "请重新打开确认邮件并选择其中的按钮。如果找不到，请在发件人的页面重新注册。",
    "notFoundBody": "找不到这个地址的注册记录。请在发件人的页面重新注册。",
    "errorBody": "无法确认您的订阅。请稍后再试。",
    "retry": "重试",
    "home": "前往首页"
  },
  "embed": {
    "title": "在您的网站上添加订阅表单",
    "intro": "把下面任一段代码粘贴到您的网站。注册的人会先收到一封确认邮件，之后以自己的语言收到您的简报。",
    "linkLabel": "订阅页面链接",
    "linkHint": "可以分享在社交媒体简介、邮件签名或二维码中。",
    "scriptLabel": "Script 标签（推荐）",
    "scriptHint": "粘贴到表单要显示的位置。表单会自动调整大小。",
    "iframeLabel": "Iframe",
    "iframeHint": "如果您的网站不允许使用脚本，请用这个。",
    "copy": "复制",
    "copied": "已复制",
    "copyFailed": "请选中文字后手动复制。",
    "options": "表单选项",
    "accent": "按钮颜色",
    "accentHint": "保持不变即使用您的品牌颜色。",
    "theme": "主题",
    "themeAuto": "跟随访客的设置",
    "themeLight": "浅色",
    "themeDark": "深色",
    "layout": "版式",
    "layoutFull": "完整（标题、姓名和语言）",
    "layoutCompact": "紧凑（邮箱和按钮）",
    "preview": "预览",
    "previewNote": "预览是实时的。在这里注册会创建一位真实的订阅者。",
    "missing": "请先创建新闻简报。创建后，订阅表单会显示在这里。"
  },
  "page": {
    "poweredBy": "由 AIBAN 提供支持",
    "title": "订阅"
  },
  "signature": {
    "title": "邮件签名",
    "intro": "读者会在每期简报末尾看到它。点击预览中的任何部分即可编辑。",
    "show": "在每期简报中显示我的签名",
    "showHint": "关闭后，简报会在文章结束处结束。",
    "preview": "预览",
    "previewEmpty": "您的签名是空的。先添加您的名字吧。",
    "articleEnd": "文章结束",
    "tabContent": "内容",
    "tabStyle": "样式",
    "blocks": "包含哪些内容",
    "blocksHint": "选择标签即可显示或隐藏对应部分。隐藏的部分会保留文字。",
    "layout": "版式",
    "layouts": {
      "bar": "色条",
      "photo": "照片",
      "stacked": "堆叠",
      "centered": "居中",
      "minimal": "仅文字"
    },
    "fields": {
      "name": "姓名",
      "role": "职位",
      "company": "公司",
      "phone": "电话",
      "email": "邮箱",
      "website": "网站",
      "address": "地址",
      "photoUrl": "照片",
      "logoUrl": "标志",
      "socials": "社交链接",
      "cta": "按钮",
      "disclaimer": "法律声明"
    },
    "groups": {
      "about": "关于您",
      "contact": "联系方式",
      "images": "图片",
      "socials": "社交链接",
      "cta": "按钮",
      "disclaimer": "法律声明"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "创始人",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Main Street, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "预约通话",
      "ctaUrl": "https://"
    },
    "ctaText": "按钮文字",
    "ctaLink": "按钮链接",
    "hints": {
      "photoUrl": "方形 PNG 或 JPG 的链接，至少 144×144 像素，小于 200 KB。以 72×72 像素显示在您的名字旁。",
      "logoUrl": "透明或白色背景的 PNG 或 JPG 链接，高度至少 64 像素。以 32 像素高度显示。",
      "website": "如果您没有填写 https://，我们会自动加上。",
      "cta": "按钮需要同时填写文字和链接才会显示。",
      "disclaimer": "底部的小字，例如保密声明。不需要可以留空。"
    },
    "style": {
      "accent": "强调色",
      "accentHint": "用于色条、链接和按钮。默认使用您的品牌颜色。",
      "font": "字体",
      "fontSans": "无衬线",
      "fontSerif": "衬线",
      "size": "文字大小",
      "sizeMd": "常规",
      "sizeSm": "小",
      "shape": "照片形状",
      "shapeRound": "圆形",
      "shapeSquare": "方形"
    },
    "hidden": "已隐藏",
    "reset": "重新开始",
    "resetConfirm": "再次选择即可清空所有字段"
  }
};
