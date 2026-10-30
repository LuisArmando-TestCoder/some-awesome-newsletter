// zh strings for locales. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale zh
export default {
  "auth": {
    "logo": "/icons/logo.png",
    "login": {
      "pageTitle": "登录",
      "title": "登录 AIBAN",
      "subtitle": "连接以继续您之前的进度。",
      "google": "使用 Google 继续",
      "or": "或",
      "emailPlaceholder": "you@example.com",
      "continueWithEmail": "使用邮箱继续",
      "switchText": "还没有账号？",
      "switchLink": "注册",
      "switchHref": "/signup"
    },
    "signup": {
      "pageTitle": "注册",
      "title": "创建您的账号",
      "subtitle": "无需信用卡。",
      "google": "使用 Google 继续",
      "or": "或",
      "emailPlaceholder": "you@example.com",
      "continueWithEmail": "使用邮箱继续",
      "switchText": "已经有账号了？",
      "switchLink": "登录",
      "switchHref": "/login"
    }
  },
  "landing": {
    "seo": {
      "title": "AIBAN | 把您的网站变成新闻简报，用每位读者的语言发送",
      "description": "AIBAN 读取您已经发布的内容，用您的口吻撰写一期新闻简报，并以您的名义发送。每位订阅者都会收到自己语言的版本。",
      "ogImageAlt": "AIBAN 标志"
    },
    "skipLink": "跳到主要内容",
    "hero": {
      "eyebrow": "为服务型企业打造的新闻简报",
      "title": "您的网站变成每周新闻简报，用每位读者的语言送达",
      "lead": "AIBAN 读取您已经发布的内容，用您的口吻撰写一期简报，并以您的名义发送。每位订阅者都会用自己阅读的语言收到它。您只需设置一次，之后它会自动运行。",
      "formLabel": "您的网站",
      "formPlaceholder": "yourcompany.com",
      "formHint": "我们会根据您输入的地址生成一期示例简报。免费开始，无需银行卡。",
      "formSubmit": "预览我的新闻简报",
      "formError": "请输入网址，例如 yourcompany.com。",
      "secondaryCta": "了解运作方式"
    },
    "preview": {
      "badge": "示例预览",
      "note": "这是使用占位文字的示例版式。开始使用后，AIBAN 会根据您最新的文章撰写真正的一期简报。",
      "fromLabel": "发件人",
      "toLabel": "收件人",
      "subjectLabel": "主题",
      "languageLabel": "读者语言",
      "readOnBlog": "在博客上阅读",
      "startCta": "用 {site} 免费开始",
      "startCtaGeneric": "免费开始",
      "liveRegion": "已为 {site} 更新示例预览。"
    },
    "chain": {
      "eyebrow": "运作方式",
      "title": "只需输入一次，之后自动运行",
      "lead": "您只需把网站交给 AIBAN 一次。之后，下面每个步骤都会按您选择的时间表自动进行。",
      "triggerLabel": "当",
      "actionLabel": "然后",
      "trigger": {
        "title": "现在是周一 9:00",
        "body": "也可以是您选择的任何时间表：每天、每周或每月。"
      },
      "steps": [
        {
          "title": "AIBAN 找到您最新的文章",
          "body": "它会检查您的网站，挑出您的理想读者最关心的内容。"
        },
        {
          "title": "用您的口吻撰写简报",
          "body": "根据您网站的写作风格改写文字，让它读起来像您写的。"
        },
        {
          "title": "为每位读者翻译简报",
          "body": "每位订阅者都会收到注册时选择的语言版本。"
        },
        {
          "title": "以您的名义发送",
          "body": "读者看到的是您的名字，他们的回复会进入您的收件箱。"
        },
        {
          "title": "在您的博客上发布简报",
          "body": "每期简报还会生成一个带独立链接的公开文章页面。"
        },
        {
          "title": "告诉您发生了什么",
          "body": "您的控制台会列出谁加入了，以及读者点击了哪些链接。"
        }
      ],
      "alsoTitle": "以下情况也会触发",
      "also": [
        {
          "title": "有人在您的网站上注册",
          "body": "他们通过邮件确认后，就会开始收到您的简报。"
        },
        {
          "title": "您粘贴一个链接或一段文字",
          "body": "AIBAN 会经过同样的步骤，撰写并发送一期相关简报。"
        },
        {
          "title": "您上传联系人名单",
          "body": "AIBAN 会整理名单、去除重复项，并推测每位联系人的语言。"
        }
      ]
    },
    "languages": {
      "eyebrow": "所有语言",
      "title": "每位读者都会收到自己语言的简报",
      "body": "您不用分别撰写不同版本。AIBAN 会把每期简报翻译成订阅者使用的每种语言，并在每个版本中保留您的语气。支持的语言包括西班牙语、葡萄牙语、法语、德语、印地语、阿拉伯语、日语等。",
      "sampleNote": "同一期示例简报，三位读者收到的样子。"
    },
    "sender": {
      "eyebrow": "您的地址",
      "title": "以您的名义发送",
      "body": "每期简报都带有您的名字和邮件签名。AIBAN 从自己经过验证的地址发送，所以您永远不需要把邮箱密码交给我们。读者回复时，回复会进入您的收件箱。",
      "inboxLabel": "在读者收件箱中的样子",
      "inboxFrom": "您",
      "inboxSubject": "{site} 本周动态",
      "inboxSnippet": "用您的口吻写成的最新文章简短摘要。",
      "inboxTime": "9:00"
    },
    "grow": {
      "eyebrow": "扩大您的名单",
      "title": "适用于您网站的订阅表单，以及自动更新的博客",
      "items": [
        {
          "title": "订阅表单",
          "body": "把 AIBAN 表单添加到您的网站。新读者选择自己的语言，并通过邮件确认。"
        },
        {
          "title": "自动博客",
          "body": "每期简报都会成为一个公开文章页面，可以被搜索到，也可以通过链接分享。"
        },
        {
          "title": "导入联系人",
          "body": "从 CSV 或 Excel 文件导入您现有的客户，或直接粘贴名单。"
        }
      ]
    },
    "useCases": {
      "eyebrow": "适合谁",
      "title": "为靠关系发展业务的企业而做",
      "lead": "如果您的客户来自推荐和信任，定期收到您的消息能让他们记得您。AIBAN 会替您写好这份消息。",
      "items": [
        {
          "title": "代理公司和网页设计师",
          "body": "每周把最新作品和文章发给客户和潜在客户，也可以为客户网站使用同样的设置。"
        },
        {
          "title": "IT 和软件公司",
          "body": "把版本说明和博客文章变成简短的更新，每位客户都能用自己的语言阅读。"
        },
        {
          "title": "房地产",
          "body": "向说不同语言的买家和卖家分享新房源和市场文章。"
        },
        {
          "title": "律师和会计师",
          "body": "用平稳一致的格式，让客户了解您一直在写的主题。"
        },
        {
          "title": "教练和培训师",
          "body": "在固定的日子把最新课程或文章发给您的社群，无需重新撰写。"
        }
      ]
    },
    "pricingIntro": {
      "eyebrow": "价格",
      "title": "免费开始，名单增长后再升级",
      "lead": "免费方案包含 1 个来源和最多 100 位订阅者。付费方案提供更多来源和更多订阅者。"
    },
    "faqTitle": "开始前大家常问的问题",
    "faq": [
      {
        "id": "what-do-i-need",
        "q": "开始需要准备什么？",
        "a": "您的网站地址和一个邮箱地址。AIBAN 会读取您的网站，了解您的主题和写作方式。"
      },
      {
        "id": "do-i-write",
        "q": "我需要自己写内容吗？",
        "a": "不需要。AIBAN 会根据您的内容撰写每期简报。如果您想就某个具体话题发一期，可以粘贴链接或文字。"
      },
      {
        "id": "languages",
        "q": "我的读者可以收到哪些语言？",
        "a": "AIBAN 会把每期简报翻译成每位订阅者阅读的语言。设置新闻简报时可以查看完整的语言列表。"
      },
      {
        "id": "sender",
        "q": "邮件是谁发出的？",
        "a": "从 AIBAN 的发件地址发出，发件人显示为您的名字。回复会直接进入您的收件箱。您永远不需要把邮箱密码交给我们。"
      },
      {
        "id": "contacts",
        "q": "可以导入我现有的联系人吗？",
        "a": "可以。上传 CSV 或 Excel 文件，或粘贴名单。AIBAN 会整理名单、去除重复项，并推测每位联系人的语言。"
      },
      {
        "id": "schedule",
        "q": "简报多久发送一次？",
        "a": "设置时由您选择时间表，之后随时可以在控制台中更改。"
      },
      {
        "id": "free-plan",
        "q": "有免费方案吗？",
        "a": "有。免费方案包含 1 个来源和最多 100 位订阅者。付费方案提供更多来源和订阅者。"
      },
      {
        "id": "cancel",
        "q": "可以取消吗？",
        "a": "可以。您随时可以写信到 info@aiban.news，我们会取消您的付费方案，或把您改回免费方案。"
      }
    ],
    "finalCta": {
      "title": "从您的网站开始",
      "body": "把网站交给 AIBAN，检查第一期简报，准备好后再开启。",
      "cta": "免费开始",
      "secondary": "查看帮助中心"
    },
    "footer": {
      "tagline": "用您自己的内容写成，并以每位读者的语言发送的新闻简报。",
      "product": "产品",
      "company": "公司",
      "legal": "法律信息",
      "links": {
        "howItWorks": "运作方式",
        "pricing": "价格",
        "demo": "演示",
        "help": "帮助中心",
        "about": "关于我们",
        "careers": "招聘",
        "privacy": "隐私政策",
        "terms": "服务条款",
        "cookies": "Cookie 政策"
      },
      "contactLabel": "联系方式",
      "rights": "保留所有权利。"
    }
  },
  "help": {
    "title": "请求提高配额",
    "subtitle": "告诉我们您需要的额度，我们会通过邮件回复。",
    "contact": {
      "cta": "提交请求",
      "successTitle": "请求已可发送",
      "successBody": "您的邮件应用已打开并填好了请求。请从那里发送，我们会通过邮件回复。",
      "learnMore": "/plans"
    },
    "questions": {
      "desiredLimitsHelp": "告诉我们您需要的额度，例如订阅者和来源的数量。",
      "useCaseHelp": "说明您发送什么内容、发给谁、多久发一次。",
      "expectedSpendHelp": "大致的估算能帮助我们推荐方案。也可以填写不确定。"
    },
    "form": {
      "nameLabel": "姓名",
      "emailLabel": "邮箱",
      "companyLabel": "公司",
      "optional": "（选填）",
      "limitsLabel": "您需要的额度",
      "useCaseLabel": "您如何使用 AIBAN",
      "spendLabel": "预计每月花费",
      "spend": {
        "lt500": "低于 $500",
        "500_2k": "$500 至 $2,000",
        "2k_10k": "$2,000 至 $10,000",
        "gt10k": "高于 $10,000",
        "unknown": "目前还不确定"
      },
      "urgencyLabel": "紧急程度",
      "urgency": {
        "low": "低",
        "normal": "普通",
        "high": "高"
      },
      "replyLabel": "我们应如何回复您？",
      "reply": {
        "email": "通过邮件",
        "call": "通过电话"
      },
      "payAsYouGo": "我想按用量付费",
      "sending": "正在发送...",
      "sentTitle": "请求已发送",
      "sentBody": "我们已收到您的请求，会回复到您填写的邮箱地址。",
      "retryBefore": "如果您的邮件应用没有打开，",
      "retryLink": "请重新打开请求",
      "retryAfter": "或写信到",
      "errors": {
        "name": "请输入您的姓名（至少 2 个字符）。",
        "email": "请输入我们可以回复的邮箱地址，例如 name@example.com。",
        "company": "请输入至少 2 个字符，或留空。",
        "desiredLimits": "请用至少 10 个字符说明您需要的额度。",
        "useCase": "请用至少 20 个字符说明您的用途。"
      }
    },
    "faqs": [
      {
        "id": "limits-how",
        "q": "更高配额如何运作？",
        "a": "发送一份写明所需额度的请求。我们会通过邮件回复适合您账户的选项。"
      }
    ],
    "links": {
      "docs": "/plans",
      "community": "/help"
    }
  },
  "faq": [
    {
      "q": "AIBAN 是做什么的？",
      "a": "AIBAN 读取您已经发布的内容，例如您的网站、博客或您选择的新闻网站。它用您的口吻撰写新的一期简报，并作为新闻简报发送。每位订阅者都会收到自己所选语言的版本，发件人显示为您的名字。"
    },
    {
      "q": "有免费方案吗？",
      "a": "有。免费方案包含 1 个来源和最多 100 位订阅者。需要更多时，请写信给我们，我们会为您更改方案。"
    },
    {
      "q": "订阅者如何收到自己语言的简报？",
      "a": "每位订阅者在注册时选择偏好语言。AIBAN 会在发送前把每期简报翻译成该语言。"
    },
    {
      "q": "简报可以从我自己的邮箱地址发出吗？",
      "a": "简报从 AIBAN 的发件地址发出，带有您的名字和邮件签名，回复会进入您的收件箱。我们不会索要您的邮箱密码，所以不存在您的密码泄露的问题。"
    },
    {
      "q": "别人如何订阅？",
      "a": "您会得到一个订阅页面和一个可以放在网站上的订阅组件。您也可以自己添加订阅者或上传名单。"
    },
    {
      "q": "可以随时取消吗？",
      "a": "可以。您随时可以写信到 info@aiban.news，我们会取消您的付费方案，或把您改回免费方案。"
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
        "name": "免费版",
        "monthly": 0,
        "yearly": 0,
        "tagline": "用一个来源试用 AIBAN",
        "featuresBase": [
          "1 个来源",
          "最多 100 位订阅者"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": 1,
          "users": 100
        },
        "ctaLabel": "当前方案",
        "tier": 0
      },
      {
        "id": "starter",
        "name": "入门版",
        "monthly": 17,
        "yearly": 132,
        "tagline": "适用于成长的邮件通讯",
        "featuresBase": [
          "5 个来源",
          "最多 10 万位订阅者"
        ],
        "featuresDelta": [
          "邮件支持",
          "基础翻译"
        ],
        "limits": {
          "newsSources": 5,
          "users": 100000
        },
        "ctaLabel": "选择入门版",
        "productId": "prod_starter_id",
        "tier": 1
      },
      {
        "id": "growth",
        "name": "增长版",
        "monthly": 35,
        "yearly": 273,
        "tagline": "适合已有规模的新闻简报",
        "featuresBase": [
          "17 个来源",
          "最多 25 万位订阅者"
        ],
        "featuresDelta": [
          "自定义品牌",
          "高级分析"
        ],
        "limits": {
          "newsSources": 17,
          "users": 250000
        },
        "ctaLabel": "选择增长版",
        "productId": "prod_growth_id",
        "tier": 2
      },
      {
        "id": "pro",
        "name": "专业版",
        "monthly": 80,
        "yearly": 624,
        "tagline": "为营销专家打造",
        "featuresBase": [
          "25 个来源",
          "最多 50 万位订阅者"
        ],
        "featuresDelta": [
          "API 访问",
          "优先处理"
        ],
        "limits": {
          "newsSources": 25,
          "users": 500000
        },
        "ctaLabel": "选择专业版",
        "productId": "prod_pro_id",
        "tier": 3
      },
      {
        "id": "master",
        "name": "大师版",
        "monthly": 150,
        "yearly": 1170,
        "tagline": "适合大量读者",
        "featuresBase": [
          "50 个来源",
          "订阅者数量不限"
        ],
        "featuresDelta": [
          "尊享支持",
          "自定义 Webhooks"
        ],
        "limits": {
          "newsSources": 50,
          "users": -1
        },
        "ctaLabel": "选择大师版",
        "productId": "prod_master_id",
        "tier": 4
      },
      {
        "id": "vipfree",
        "name": "VIP 免费版",
        "monthly": 0,
        "yearly": 0,
        "tagline": "合作伙伴完全访问权",
        "featuresBase": [
          "无限新闻源",
          "订阅者数量不限"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": -1,
          "users": -1
        },
        "ctaLabel": "当前方案",
        "internalOnly": true,
        "tier": 5
      }
    ],
    "contact": {
      "text": "需要定制方案？",
      "cta": "联系我们",
      "href": "/help"
    }
  },
  "article": {
    "notFound": "未找到文章。",
    "errorFetching": "我们无法加载这篇文章。请稍等一分钟后重新加载页面。",
    "noArticleSpecified": "未指定文章。",
    "goBack": "返回",
    "loading": "加载中..."
  },
  "pricing": {
    "eyebrow": "定价",
    "title": "方案与价格",
    "currentPlan": "当前方案：",
    "monthly": "按月计费",
    "yearly": "按年",
    "yearlySave": "节省 35%",
    "intervalLabel": "计费周期",
    "billedYearly": "按年计费",
    "perMonthShort": "/mo",
    "perYearShort": "/yr",
    "freeCta": "免费开始",
    "processing": "正在打开结账页面...",
    "askMore": "每个账户都从免费方案开始。需要更多时，请写信到 {email}，我们会为您更改方案。",
    "askFor": "申请 {planName}",
    "askAction": "写信给我们",
    "checkoutError": "无法打开结账页面。请稍后再试。",
    "networkError": "无法连接到服务器。请检查网络连接后重试。",
    "includes": "包含",
    "pageMetaTitle": "价格 | AIBAN",
    "pageMetaDescription": "AIBAN 的方案和价格。先免费使用 1 个来源和最多 100 位订阅者，需要更多时再改用按月或按年计费的方案。",
    "pageTitle": "价格",
    "pageLead": "先使用免费方案，包含 1 个来源和最多 100 位订阅者。需要更多来源或订阅者时，请写信给我们，我们会把您改为付费方案，按月或按年计费。",
    "faqTitle": "账单常见问题",
    "contactText": "需要更高额度或定制设置？",
    "contactCta": "联系我们",
    "everythingIn": "包含前一计划的所有功能，外加：",
    "isCurrentPlan": "这是您当前的计划",
    "downgradeTo": "切换到 {planName}",
    "upgradeTo": "选择 {planName}",
    "mockMode": "测试模式",
    "mostPopular": "最受欢迎",
    "perMonth": "每月",
    "perYear": "每年",
    "youSave": "您节省了"
  },
  "confirmSubscription": {
    "title": "确认您的订阅",
    "goBack": "返回",
    "pleaseAccept": "请接受条款以完成订阅。",
    "iAccept": "我接受",
    "termsAndConditions": "条款与条件",
    "and": "以及",
    "privacyPolicy": "隐私政策",
    "confirm": "确认订阅",
    "mustAccept": "您必须接受条款才能订阅。",
    "invalidLink": "这个确认链接不完整。请打开我们最近发给您的邮件，使用其中的链接。"
  },
  "articles": {
    "title": "最新文章",
    "subtitle": "AIBAN 为其发送的新闻简报撰写的文章。",
    "producedIn": "这些文章提供的语言",
    "searchPlaceholder": "搜索文章...",
    "noArticlesFound": "未找到文章。",
    "created": "创建于：",
    "language": "语言：",
    "rightsReserved": "保留所有权利。",
    "errorFetching": "我们无法加载文章。请稍等一分钟后重新加载页面。"
  },
  "blog": {
    "metaTitle": "{name} 的博客",
    "metaDescription": "来自 {name} 的文章。订阅即可通过邮件收到新文章。",
    "eyebrow": "新闻简报博客",
    "heroFrom": "来自 {name} 的文章",
    "heroDescription": "这些是这份新闻简报已发布的文章。订阅即可通过邮件收到新文章。",
    "subscribe": "订阅",
    "home": "博客首页",
    "featured": "最新文章",
    "latest": "最新文章",
    "latestHint": "按时间从新到旧排列。部分文章没有图片，只显示文字。",
    "articleCount": "{language} 文章 {count} 篇",
    "articleCountOne": "{language} 文章 1 篇",
    "languages": "选择语言",
    "minRead": "阅读约 {n} 分钟",
    "readArticle": "阅读文章",
    "page": "第 {page} 页",
    "newer": "较新的文章",
    "older": "较早的文章",
    "pagination": "文章分页",
    "emptyTitle": "还没有文章",
    "emptyBody": "这份新闻简报还没有在这里发布文章。订阅后，第一篇文章会通过邮件发给您。",
    "endTitle": "没有更早的文章了",
    "endBody": "已经到列表末尾。",
    "backToNewest": "回到最新文章",
    "errorTitle": "无法加载这些文章",
    "errorBody": "文章服务器没有及时响应。请过一分钟后刷新页面重试。",
    "reload": "刷新页面",
    "missingHolder": "这个博客链接不完整，没有指明要打开谁的博客。请向新闻简报的所有者索取完整链接。",
    "redirecting": "正在打开博客...",
    "publishedWith": "由 AIBAN 发布",
    "cta": {
      "title": "通过邮件接收下一篇文章",
      "body": "订阅 {name}，新文章会发送到您的收件箱。您可以随时退订。",
      "button": "订阅"
    },
    "search": {
      "label": "搜索文章",
      "placeholder": "按词语或短语搜索",
      "button": "搜索",
      "suggestions": "建议",
      "recent": "最近搜索",
      "clearRecent": "清除最近搜索",
      "title": "搜索结果",
      "resultsFor": "“{q}”的搜索结果",
      "count": "找到 {count} 篇文章",
      "countOne": "找到 1 篇文章",
      "searching": "正在搜索文章",
      "emptyTitle": "没有与“{q}”匹配的文章",
      "emptyBody": "请检查拼写，或试试更短的词。您也可以浏览博客上的所有文章。",
      "browseAll": "浏览所有文章",
      "noQuery": "在上方输入词语或短语来搜索这个博客。",
      "error": "文章服务器没有响应，搜索已停止。请过一分钟后再试。",
      "tryAgain": "重试",
      "limitNote": "显示前 {count} 条匹配结果。使用更具体的短语可以缩小范围。"
    },
    "article": {
      "back": "所有文章",
      "published": "发布于 {date}",
      "by": "作者：{name}",
      "otherLanguages": "阅读其他语言版本",
      "otherLanguagesHint": "这份新闻简报也以这些语言发布。每个链接都会以对应语言打开博客。",
      "share": "分享这篇文章",
      "copyLink": "复制链接",
      "copied": "链接已复制，可以粘贴到任何地方。",
      "copyFailed": "无法复制链接。请改从浏览器地址栏复制。",
      "notFoundTitle": "找不到文章",
      "notFoundBody": "这篇文章可能已被删除，或链接不完整。打开博客查看其他文章。",
      "errorTitle": "无法加载这篇文章",
      "errorBody": "文章服务器没有及时响应。请过一分钟后刷新页面重试。",
      "goToBlog": "前往博客"
    }
  },
  "nav": {
    "mainLabel": "主导航",
    "legalLabel": "法律信息",
    "home": "AIBAN 首页",
    "menu": "菜单",
    "openMenu": "打开菜单",
    "closeMenu": "关闭菜单",
    "howItWorks": "运作方式",
    "pricing": "价格",
    "help": "帮助",
    "about": "关于我们",
    "privacy": "隐私",
    "terms": "条款",
    "cookies": "Cookie",
    "signOut": "退出登录",
    "chooseLanguage": "选择语言",
    "currentLanguage": "语言：{name}"
  },
  "about": {
    "metaTitle": "关于我们 | AIBAN",
    "metaDescription": "AIBAN 把企业已经发布的内容变成一份自动发送的新闻简报，以每位订阅者的语言、以店主的名义送达。",
    "eyebrow": "关于我们",
    "title": "关于 AIBAN",
    "lead": "AIBAN 把企业已经发布的内容变成一份自动发送的新闻简报。每位订阅者都用自己的语言阅读，发件人是企业主本人。",
    "whatTitle": "AIBAN 做什么",
    "whatBody": [
      "您告诉 AIBAN 您的内容在哪里：您的网站、博客或您关注的新闻网站。那里出现新内容时，AIBAN 会用您描述的口吻据此撰写一期简报，并按您选择的时间表发给订阅者。",
      "每位订阅者在注册时选择一种语言，每期简报发出前都会翻译成该语言。文章还会发布为网页，您也可以把它们发送到自己的网站。"
    ],
    "whoTitle": "开发者",
    "whoBody": [
      "AIBAN 由创始人 Luis Murillo Baltodano 开发。Luis 是一名创意工程师，背景是计算机图形和自动化。",
      "下面列出了他的部分开源作品。"
    ],
    "projectsTitle": "创始人的开源作品",
    "projects": [
      {
        "name": "Scene Preset",
        "url": "https://github.com/LuisArmando-TestCoder/scene-preset",
        "desc": "一个在使用 Three.js 和 3D Web API 时减少样板代码的库。"
      },
      {
        "name": "Canvas Preset",
        "url": "https://github.com/LuisArmando-TestCoder/canvas-preset",
        "desc": "用于常见 Canvas API 任务的辅助工具。"
      },
      {
        "name": "Atomic Gatsby template",
        "url": "https://github.com/LuisArmando-TestCoder/atomic-gatsby-typescript-recoiljs",
        "desc": "按原子设计方法组织的入门模板。"
      }
    ],
    "githubLabel": "Luis 的 GitHub",
    "newTab": "（在新标签页中打开）",
    "contactTitle": "联系我们",
    "contactBody": "如有问题、反馈或合作想法，请写信至 info@aiban.news。",
    "emailCta": "发邮件至 info@aiban.news",
    "startCta": "免费开始",
    "helpCta": "查看帮助中心"
  },
  "careers": {
    "metaTitle": "招聘 | AIBAN",
    "metaDescription": "AIBAN 目前没有开放职位。您仍然可以写信至 info@aiban.news。",
    "eyebrow": "招聘",
    "title": "加入 AIBAN",
    "lead": "AIBAN 目前没有开放职位。",
    "body": "有职位开放时，会在本页列出。如果您以后想参与 AIBAN 的工作，请发一段简短的自我介绍，并说明您想做什么。",
    "emailCta": "发邮件至 info@aiban.news",
    "emailSubject": "参与 AIBAN 的工作",
    "aboutCta": "了解 AIBAN"
  },
  "legal": {
    "navLabel": "法律文件",
    "lastUpdated": "最后更新：{date}",
    "privacy": {
      "title": "隐私政策",
      "metaTitle": "隐私政策 | AIBAN",
      "metaDescription": "AIBAN 如何收集、使用和保护您的数据，以及您如何行使数据权利。"
    },
    "terms": {
      "title": "服务条款",
      "metaTitle": "服务条款 | AIBAN",
      "metaDescription": "您创建账户并使用 AIBAN 时适用的条款。"
    },
    "cookies": {
      "title": "Cookie 政策",
      "metaTitle": "Cookie 政策 | AIBAN",
      "metaDescription": "AIBAN 使用哪些 Cookie、它们的作用、保留多久，以及您如何控制它们。"
    }
  },
  "demoPage": {
    "metaTitle": "演示 | AIBAN",
    "metaDescription": "观看 AIBAN 的操作演示，了解注册后会发生什么：从添加网站到发送第一期简报。",
    "eyebrow": "演示",
    "title": "了解 AIBAN 如何运作",
    "lead": "先观看演示，再了解注册后会发生什么。",
    "videoTitle": "AIBAN 操作演示视频",
    "playLabel": "播放演示视频",
    "videoNote": "视频通过 YouTube 播放。",
    "stepsTitle": "注册后会发生什么",
    "steps": [
      {
        "title": "添加您的网站",
        "body": "输入您的网站、博客或您关注的新闻网站的地址。AIBAN 会读取其中的新内容。"
      },
      {
        "title": "描述您的读者和口吻",
        "body": "告诉 AIBAN 谁在读您的新闻简报，以及它应该是什么语气。您也可以让它根据您的网站给出描述建议。"
      },
      {
        "title": "选择时间表",
        "body": "选择简报的发送频率。之后可以在控制台中更改。"
      },
      {
        "title": "添加订阅者",
        "body": "上传名单、逐个添加，或分享您的订阅页面和组件。每位订阅者都会选择一种语言。"
      },
      {
        "title": "添加发件人名称和签名",
        "body": "添加读者会看到的名称和邮件签名。AIBAN 从经过验证的地址以您的名义发送每期简报，回复会进入您的收件箱。"
      }
    ],
    "ctaTitle": "用您自己的网站试一试",
    "ctaBody": "免费方案包含 1 个来源和最多 100 位订阅者。",
    "primaryCta": "免费开始",
    "secondaryCta": "查看价格"
  },
  "helpCenter": {
    "metaTitle": "帮助 | AIBAN",
    "metaDescription": "关于设置 AIBAN 的解答：来源、语言、以您的名义发送、订阅者、订阅小组件、博客和计费。",
    "eyebrow": "帮助中心",
    "title": "需要什么帮助？",
    "lead": "在这里查找设置和运营新闻简报的解答。如果没有找到需要的内容，请写信给我们。",
    "searchLabel": "搜索帮助中心",
    "searchPlaceholder": "试试搜索语言、组件或取消",
    "clearSearch": "清除搜索",
    "resultsCount": "有 {count} 条解答与您的搜索匹配。",
    "noResults": "没有与您的搜索匹配的解答。请换个词试试，或发邮件至 info@aiban.news。",
    "topicsLabel": "主题",
    "copyLink": "复制链接",
    "linkCopied": "链接已复制",
    "contactTitle": "仍需要帮助？",
    "contactBody": "请写信至 info@aiban.news，并附上您注册时使用的邮箱地址。",
    "emailCta": "发邮件至 info@aiban.news",
    "limitsTitle": "申请更高额度",
    "limitsBody": "告诉我们您需要的额度，我们会通过邮件回复。如果无法从此页面发送请求，您的邮件应用会打开并自动填好内容，您直接发给我们即可。",
    "faqFilterLabel": "筛选问题",
    "faqNoMatch": "没有符合筛选条件的问题。",
    "groups": [
      {
        "id": "getting-started",
        "title": "入门",
        "items": [
          {
            "id": "what-is-aiban",
            "q": "AIBAN 是什么？",
            "a": "AIBAN 把您已发布的内容变成定期发送的新闻简报。它读取您的网站、博客或您选择的新闻网站，用您的口吻撰写新一期内容，并发给您的订阅者。每位订阅者都用自己选择的语言阅读。"
          },
          {
            "id": "how-to-start",
            "q": "怎样开始？",
            "a": "在注册页面创建账户。设置过程中会要求填写您的网站地址和一些关于读者的信息。之后您就可以添加订阅者，并在控制台中管理一切。"
          },
          {
            "id": "change-settings",
            "q": "之后可以更改设置吗？",
            "a": "可以。您之后可以在控制台中更改来源、发送时间、发件人信息和订阅者。如需更改方案，请写信到 info@aiban.news。"
          }
        ]
      },
      {
        "id": "sources",
        "title": "来源和内容",
        "items": [
          {
            "id": "what-is-a-source",
            "q": "什么可以作为来源？",
            "a": "来源是 AIBAN 读取新内容的网址，例如您的网站、博客或您关注的新闻网站。您可以在控制台中添加来源。可添加的数量取决于您的方案。"
          },
          {
            "id": "how-often",
            "q": "我的新闻简报多久发送一次？",
            "a": "设置来源时由您选择发布频率。之后可以在控制台中更改时间表。"
          },
          {
            "id": "your-voice",
            "q": "AIBAN 如何用我的口吻写作？",
            "a": "您描述新闻简报的风格，或让 AIBAN 为您生成一段描述。每期简报都会按照这段描述撰写。您随时可以在控制台中修改。"
          }
        ]
      },
      {
        "id": "languages",
        "title": "语言",
        "items": [
          {
            "id": "subscriber-language",
            "q": "订阅者如何收到自己语言的简报？",
            "a": "每位订阅者在注册时选择偏好语言。AIBAN 会在发送前把每期简报翻译成该语言。"
          },
          {
            "id": "site-language",
            "q": "可以用我的语言使用网站吗？",
            "a": "可以。使用屏幕右下角的语言按钮，即可切换网站和控制台的语言。"
          }
        ]
      },
      {
        "id": "sending",
        "title": "以您的名义发送",
        "items": [
          {
            "id": "own-address",
            "q": "简报可以从我自己的邮箱地址发出吗？",
            "a": "简报从 AIBAN 的发件地址发出，带有您的发件人名称和邮件签名，回复会进入您的收件箱。我们不会索要您的邮箱密码，所以不存在您的密码泄露的问题。"
          },
          {
            "id": "app-password",
            "q": "我需要把邮箱密码交给 AIBAN 吗？",
            "a": "不需要。AIBAN 从不索要您的邮箱密码或应用专用密码。简报从 AIBAN 的地址以您的名义发出，回复会发给您。"
          }
        ]
      },
      {
        "id": "subscribers",
        "title": "订阅者和订阅组件",
        "items": [
          {
            "id": "add-subscribers",
            "q": "如何添加订阅者？",
            "a": "您可以在控制台中逐个添加，或上传包含名单的文件。别人也可以通过您的订阅页面或订阅组件加入。"
          },
          {
            "id": "signup-widget",
            "q": "什么是订阅组件？",
            "a": "订阅组件是一个可以放在您自己网站上的订阅表单。访客输入邮箱地址并选择语言后，就会加入您的名单。"
          },
          {
            "id": "subscriber-limit",
            "q": "订阅者数量有上限吗？",
            "a": "每个方案都有自己的订阅者上限。免费方案最多包含 100 位订阅者。其他方案的上限请见价格页面。"
          }
        ]
      },
      {
        "id": "blog",
        "title": "博客",
        "items": [
          {
            "id": "blog-pages",
            "q": "我的新闻简报文章会发布到网上吗？",
            "a": "会。AIBAN 为您的新闻简报撰写的文章也会发布为网页，读者可以在收件箱之外阅读。"
          },
          {
            "id": "post-to-site",
            "q": "可以把文章发布到我自己的网站吗？",
            "a": "可以。在控制台中，您可以设置一个 webhook，把每篇新闻简报文章作为帖子发送到您的网站。它适用于 WordPress，以及任何接受标准 REST 内容的平台。"
          }
        ]
      },
      {
        "id": "billing",
        "title": "账单",
        "items": [
          {
            "id": "free-plan",
            "q": "有免费方案吗？",
            "a": "有。免费方案包含 1 个来源和最多 100 位订阅者。需要更多时，可以升级到付费方案。"
          },
          {
            "id": "monthly-yearly",
            "q": "可以按月或按年付费吗？",
            "a": "可以。付费方案按月或按年计费。按年付费比按月连续付 12 个月便宜 35%。如需选择方案，请写信到 info@aiban.news。"
          },
          {
            "id": "cancel",
            "q": "可以随时取消吗？",
            "a": "可以。您随时可以写信到 info@aiban.news，我们会取消您的付费方案，或把您改回免费方案。"
          },
          {
            "id": "higher-limits",
            "q": "如果我需要的超过最大方案怎么办？",
            "a": "请使用帮助页面上的申请表告诉我们您需要的额度。我们会通过邮件回复。"
          }
        ]
      }
    ]
  },
  "mainPage": {
    "skipToMainContent": "跳转到主要内容",
    "dismissAnnouncement": "关闭公告",
    "problem": "问题：",
    "outcome": "结果：",
    "disclaimer": "35% 的优惠仅适用于年度账单。"
  },
  "authForm": {
    "emailValidation": "请输入邮箱地址，例如 name@example.com。",
    "failedToSendCode": "我们无法发送验证码。请检查邮箱地址，一分钟后再试。",
    "sending": "发送中...",
    "codeSent": "我们已把验证码发送到您的邮箱。",
    "invalidCode": "验证码不正确。请查看我们最近发给您的邮件，或重新发送验证码。",
    "regenerateCode": "重新发送验证码",
    "back": "返回",
    "byProceeding": "继续操作即表示您同意",
    "termsOfService": "服务条款",
    "and": "以及",
    "privacyPolicy": "隐私政策",
    "appName": "AI Newsletter"
  },
  "welcome": {
    "title": "自动化邮件通讯生成器",
    "setItOnce": "只需设置一次。",
    "useItForever": "之后它会自动运行。"
  },
  "lead": {
    "title": "将订阅者转化为访问者",
    "recommendation": "通过连接您的网站，帮助我们的 AI 理解您的品牌。",
    "question": "您有网站吗？（选填，之后也可以添加）",
    "placeholder": "https://your-site.com"
  },
  "newsSource": {
    "title": "连接您的内容源",
    "subtitle": "我们将提取您的 Feed，这样您就无需从零开始。",
    "placeholder": "您的博客或 RSS 链接"
  },
  "subscribe": {
    "welcome": {
      "title": "欢迎订阅本新闻简报。",
      "invitedBy": "您是由 {configuratorId} 邀请的。"
    }
  },
  "header": {
    "goToWorkspace": "打开控制台",
    "inBilling": "价格",
    "vip": "VIP",
    "plan": "{planName} 计划",
    "logIn": "登录",
    "getStarted": "免费开始"
  },
  "fileInput": {
    "chooseFile": "选择文件",
    "dropFile": "拖拽至此处",
    "release": "释放以上传"
  },
  "billing": {
    "title": "账单与订阅",
    "currentPlanTitle": "您当前的方案",
    "upgradePlanTitle": "更改方案",
    "manageSubscription": "管理订阅",
    "vipPlanName": "VIP 合作伙伴",
    "vipPlanDescription": "由 AIBAN 提供的无限制使用权限。",
    "perMonth": "每月",
    "perYear": "每年",
    "monthAbbreviation": "月",
    "equivalentTo": "相当于",
    "mostPopular": "最受欢迎",
    "upgradeTo": "升级至",
    "downgradeTo": "切换至",
    "currentPlanButton": "您的方案",
    "youSave": "您节省了",
    "users": "受众用户",
    "newsSources": "新闻源",
    "monthly": "按月",
    "yearly": "按年",
    "loadingPlan": "正在加载计划数据..."
  },
  "languages": [
    {
      "code": "ab",
      "name": "阿布哈茲語"
    },
    {
      "code": "aa",
      "name": "阿法爾語"
    },
    {
      "code": "af",
      "name": "南非語"
    },
    {
      "code": "ak",
      "name": "阿肯語"
    },
    {
      "code": "sq",
      "name": "阿爾巴尼亞語"
    },
    {
      "code": "am",
      "name": "阿姆哈拉語"
    },
    {
      "code": "ar",
      "name": "阿拉伯語"
    },
    {
      "code": "an",
      "name": "阿拉貢語"
    },
    {
      "code": "hy",
      "name": "亞美尼亞語"
    },
    {
      "code": "as",
      "name": "阿薩姆語"
    },
    {
      "code": "av",
      "name": "阿瓦爾語"
    },
    {
      "code": "ae",
      "name": "阿維斯陀語"
    },
    {
      "code": "ay",
      "name": "艾馬拉語"
    },
    {
      "code": "az",
      "name": "亞塞拜然語"
    },
    {
      "code": "bm",
      "name": "班巴拉語"
    },
    {
      "code": "ba",
      "name": "巴什基爾語"
    },
    {
      "code": "eu",
      "name": "巴斯克語"
    },
    {
      "code": "be",
      "name": "白俄羅斯語"
    },
    {
      "code": "bn",
      "name": "孟加拉語"
    },
    {
      "code": "bi",
      "name": "比斯拉馬語"
    },
    {
      "code": "bs",
      "name": "波士尼亞語"
    },
    {
      "code": "br",
      "name": "布列塔尼語"
    },
    {
      "code": "bg",
      "name": "保加利亞語"
    },
    {
      "code": "my",
      "name": "緬甸語"
    },
    {
      "code": "ca",
      "name": "加泰隆尼亞語"
    },
    {
      "code": "ch",
      "name": "查莫羅語"
    },
    {
      "code": "ce",
      "name": "車臣語"
    },
    {
      "code": "ny",
      "name": "齊切瓦語"
    },
    {
      "code": "zh",
      "name": "中文"
    },
    {
      "code": "cu",
      "name": "教會斯拉夫語"
    },
    {
      "code": "cv",
      "name": "楚瓦什語"
    },
    {
      "code": "kw",
      "name": "康瓦爾語"
    },
    {
      "code": "co",
      "name": "科西嘉語"
    },
    {
      "code": "cr",
      "name": "克里語"
    },
    {
      "code": "hr",
      "name": "克羅埃西亞語"
    },
    {
      "code": "cs",
      "name": "捷克語"
    },
    {
      "code": "da",
      "name": "丹麥語"
    },
    {
      "code": "dv",
      "name": "迪維希語"
    },
    {
      "code": "nl",
      "name": "荷蘭語"
    },
    {
      "code": "dz",
      "name": "宗喀語"
    },
    {
      "code": "en",
      "name": "英語"
    },
    {
      "code": "eo",
      "name": "世界語"
    },
    {
      "code": "et",
      "name": "愛沙尼亞語"
    },
    {
      "code": "ee",
      "name": "埃維語"
    },
    {
      "code": "fo",
      "name": "法羅語"
    },
    {
      "code": "fj",
      "name": "斐濟語"
    },
    {
      "code": "fi",
      "name": "芬蘭語"
    },
    {
      "code": "fr",
      "name": "法語"
    },
    {
      "code": "fy",
      "name": "西弗里斯語"
    },
    {
      "code": "ff",
      "name": "富拉語"
    },
    {
      "code": "gd",
      "name": "蘇格蘭蓋爾語"
    },
    {
      "code": "gl",
      "name": "加利西亞語"
    },
    {
      "code": "lg",
      "name": "干達語"
    },
    {
      "code": "ka",
      "name": "喬治亞語"
    },
    {
      "code": "de",
      "name": "德語"
    },
    {
      "code": "el",
      "name": "希臘語"
    },
    {
      "code": "kl",
      "name": "格陵蘭語"
    },
    {
      "code": "gn",
      "name": "瓜拉尼語"
    },
    {
      "code": "gu",
      "name": "古吉拉特語"
    },
    {
      "code": "ht",
      "name": "海地克里奧爾語"
    },
    {
      "code": "ha",
      "name": "豪薩語"
    },
    {
      "code": "he",
      "name": "希伯來語"
    },
    {
      "code": "hz",
      "name": "赫雷羅語"
    },
    {
      "code": "hi",
      "name": "印地語"
    },
    {
      "code": "ho",
      "name": "希里莫圖語"
    },
    {
      "code": "hu",
      "name": "匈牙利語"
    },
    {
      "code": "is",
      "name": "冰島語"
    },
    {
      "code": "io",
      "name": "伊多語"
    },
    {
      "code": "ig",
      "name": "伊博語"
    },
    {
      "code": "id",
      "name": "印尼語"
    },
    {
      "code": "ia",
      "name": "國際語"
    },
    {
      "code": "ie",
      "name": "國際語E"
    },
    {
      "code": "iu",
      "name": "伊努克提圖特語"
    },
    {
      "code": "ik",
      "name": "依努皮亞克語"
    },
    {
      "code": "ga",
      "name": "愛爾蘭語"
    },
    {
      "code": "it",
      "name": "義大利語"
    },
    {
      "code": "ja",
      "name": "日語"
    },
    {
      "code": "jv",
      "name": "爪哇語"
    },
    {
      "code": "kn",
      "name": "卡納達語"
    },
    {
      "code": "kr",
      "name": "卡努里語"
    },
    {
      "code": "ks",
      "name": "喀什米爾語"
    },
    {
      "code": "kk",
      "name": "哈薩克語"
    },
    {
      "code": "km",
      "name": "高棉語"
    },
    {
      "code": "ki",
      "name": "基庫尤語"
    },
    {
      "code": "rw",
      "name": "盧安達語"
    },
    {
      "code": "ky",
      "name": "吉爾吉斯語"
    },
    {
      "code": "kv",
      "name": "科米語"
    },
    {
      "code": "kg",
      "name": "剛果語"
    },
    {
      "code": "ko",
      "name": "韓語"
    },
    {
      "code": "kj",
      "name": "庫瓦尼亞馬語"
    },
    {
      "code": "ku",
      "name": "庫德語"
    },
    {
      "code": "lo",
      "name": "寮語"
    },
    {
      "code": "la",
      "name": "拉丁語"
    },
    {
      "code": "lv",
      "name": "拉脫維亞語"
    },
    {
      "code": "li",
      "name": "林堡語"
    },
    {
      "code": "ln",
      "name": "林加拉語"
    },
    {
      "code": "lt",
      "name": "立陶宛語"
    },
    {
      "code": "lu",
      "name": "盧巴-加丹加語"
    },
    {
      "code": "lb",
      "name": "盧森堡語"
    },
    {
      "code": "mk",
      "name": "馬其頓語"
    },
    {
      "code": "mg",
      "name": "馬達加斯加語"
    },
    {
      "code": "ms",
      "name": "馬來語"
    },
    {
      "code": "ml",
      "name": "馬拉雅拉姆語"
    },
    {
      "code": "mt",
      "name": "馬爾他語"
    },
    {
      "code": "gv",
      "name": "曼島語"
    },
    {
      "code": "mi",
      "name": "毛利語"
    },
    {
      "code": "mr",
      "name": "馬拉地語"
    },
    {
      "code": "mh",
      "name": "馬紹爾語"
    },
    {
      "code": "mn",
      "name": "蒙古語"
    },
    {
      "code": "na",
      "name": "諾魯語"
    },
    {
      "code": "nv",
      "name": "納瓦荷語"
    },
    {
      "code": "nd",
      "name": "北恩德貝勒語"
    },
    {
      "code": "nr",
      "name": "南恩德貝勒語"
    },
    {
      "code": "ng",
      "name": "恩敦加語"
    },
    {
      "code": "ne",
      "name": "尼泊爾語"
    },
    {
      "code": "no",
      "name": "挪威語"
    },
    {
      "code": "nb",
      "name": "挪威語巴克摩"
    },
    {
      "code": "nn",
      "name": "挪威語耐諾斯克"
    },
    {
      "code": "oc",
      "name": "奧克西坦語"
    },
    {
      "code": "oj",
      "name": "奧傑布瓦語"
    },
    {
      "code": "or",
      "name": "奧里亞語"
    },
    {
      "code": "om",
      "name": "奧羅莫語"
    },
    {
      "code": "os",
      "name": "奧塞提語"
    },
    {
      "code": "pi",
      "name": "巴利語"
    },
    {
      "code": "ps",
      "name": "普什圖語"
    },
    {
      "code": "fa",
      "name": "波斯語"
    },
    {
      "code": "pl",
      "name": "波蘭語"
    },
    {
      "code": "pt",
      "name": "葡萄牙語"
    },
    {
      "code": "pa",
      "name": "旁遮普語"
    },
    {
      "code": "qu",
      "name": "克丘亞語"
    },
    {
      "code": "ro",
      "name": "羅馬尼亞語"
    },
    {
      "code": "rm",
      "name": "羅曼什語"
    },
    {
      "code": "rn",
      "name": "隆迪語"
    },
    {
      "code": "ru",
      "name": "俄語"
    },
    {
      "code": "se",
      "name": "北薩米語"
    },
    {
      "code": "sm",
      "name": "薩摩亞語"
    },
    {
      "code": "sg",
      "name": "桑戈語"
    },
    {
      "code": "sa",
      "name": "梵語"
    },
    {
      "code": "sc",
      "name": "薩丁尼亞語"
    },
    {
      "code": "sr",
      "name": "塞爾維亞語"
    },
    {
      "code": "sn",
      "name": "紹納語"
    },
    {
      "code": "ii",
      "name": "四川彝語"
    },
    {
      "code": "sd",
      "name": "信德語"
    },
    {
      "code": "si",
      "name": "僧伽羅語"
    },
    {
      "code": "sk",
      "name": "斯洛伐克語"
    },
    {
      "code": "sl",
      "name": "斯洛維尼亞語"
    },
    {
      "code": "so",
      "name": "索馬利語"
    },
    {
      "code": "st",
      "name": "南索托語"
    },
    {
      "code": "es",
      "name": "西班牙語"
    },
    {
      "code": "su",
      "name": "巽他語"
    },
    {
      "code": "sw",
      "name": "史瓦希里語"
    },
    {
      "code": "ss",
      "name": "史瓦帝語"
    },
    {
      "code": "sv",
      "name": "瑞典語"
    },
    {
      "code": "tl",
      "name": "他加祿語"
    },
    {
      "code": "ty",
      "name": "大溪地語"
    },
    {
      "code": "tg",
      "name": "塔吉克語"
    },
    {
      "code": "ta",
      "name": "坦米爾語"
    },
    {
      "code": "tt",
      "name": "韃靼語"
    },
    {
      "code": "te",
      "name": "泰盧固語"
    },
    {
      "code": "th",
      "name": "泰語"
    },
    {
      "code": "bo",
      "name": "藏語"
    },
    {
      "code": "ti",
      "name": "提格利尼亞語"
    },
    {
      "code": "to",
      "name": "東加語"
    },
    {
      "code": "ts",
      "name": "聰加語"
    },
    {
      "code": "tn",
      "name": "札那語"
    },
    {
      "code": "tr",
      "name": "土耳其語"
    },
    {
      "code": "tk",
      "name": "土庫曼語"
    },
    {
      "code": "tw",
      "name": "契維語"
    },
    {
      "code": "ug",
      "name": "維吾爾語"
    },
    {
      "code": "uk",
      "name": "烏克蘭語"
    },
    {
      "code": "ur",
      "name": "烏爾都語"
    },
    {
      "code": "uz",
      "name": "烏茲別克語"
    },
    {
      "code": "ve",
      "name": "文達語"
    },
    {
      "code": "vi",
      "name": "越南語"
    },
    {
      "code": "vo",
      "name": "沃拉普克語"
    },
    {
      "code": "wa",
      "name": "瓦隆語"
    },
    {
      "code": "cy",
      "name": "威爾斯語"
    },
    {
      "code": "wo",
      "name": "沃洛夫語"
    },
    {
      "code": "xh",
      "name": "科薩語"
    },
    {
      "code": "yi",
      "name": "意第緒語"
    },
    {
      "code": "yo",
      "name": "約魯巴語"
    },
    {
      "code": "za",
      "name": "壯語"
    },
    {
      "code": "zu",
      "name": "祖魯語"
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
      "name": "安地卡及巴布達"
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
      "name": "阿路巴"
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
      "name": "亞塞拜然"
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
      "name": "巴貝多"
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
      "name": "貝里斯"
    },
    {
      "code": "BJ",
      "name": "貝南"
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
      "name": "波士尼亞與赫塞哥維納"
    },
    {
      "code": "BW",
      "name": "波札那"
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
      "name": "英屬維京群島"
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
      "name": "布吉納法索"
    },
    {
      "code": "BI",
      "name": "蒲隆地"
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
      "name": "維德角"
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
      "name": "查德"
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
      "name": "葛摩"
    },
    {
      "code": "CG",
      "name": "剛果（布拉薩）"
    },
    {
      "code": "CD",
      "name": "剛果（金夏沙）"
    },
    {
      "code": "CK",
      "name": "庫克群島"
    },
    {
      "code": "CR",
      "name": "哥斯大黎加"
    },
    {
      "code": "CI",
      "name": "科特迪瓦"
    },
    {
      "code": "HR",
      "name": "克羅埃西亞"
    },
    {
      "code": "CU",
      "name": "古巴"
    },
    {
      "code": "CY",
      "name": "賽普勒斯"
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
      "name": "吉布地"
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
      "name": "厄瓜多"
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
      "name": "厄利垂亞"
    },
    {
      "code": "EE",
      "name": "愛沙尼亞"
    },
    {
      "code": "SZ",
      "name": "史瓦帝尼"
    },
    {
      "code": "ET",
      "name": "衣索比亞"
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
      "name": "加彭"
    },
    {
      "code": "GM",
      "name": "甘比亞"
    },
    {
      "code": "GE",
      "name": "喬治亞"
    },
    {
      "code": "DE",
      "name": "德國"
    },
    {
      "code": "GH",
      "name": "迦納"
    },
    {
      "code": "GR",
      "name": "希臘"
    },
    {
      "code": "GT",
      "name": "瓜地馬拉"
    },
    {
      "code": "GN",
      "name": "幾內亞"
    },
    {
      "code": "GY",
      "name": "蓋亞那"
    },
    {
      "code": "HT",
      "name": "海地"
    },
    {
      "code": "HN",
      "name": "宏都拉斯"
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
      "name": "義大利"
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
      "name": "哈薩克"
    },
    {
      "code": "KE",
      "name": "肯亞"
    },
    {
      "code": "KR",
      "name": "南韓"
    },
    {
      "code": "KW",
      "name": "科威特"
    },
    {
      "code": "KG",
      "name": "吉爾吉斯"
    },
    {
      "code": "LA",
      "name": "寮國"
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
      "name": "賴索托"
    },
    {
      "code": "LR",
      "name": "賴比瑞亞"
    },
    {
      "code": "LY",
      "name": "利比亞"
    },
    {
      "code": "LI",
      "name": "列支敦斯登"
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
      "name": "馬拉威"
    },
    {
      "code": "MY",
      "name": "馬來西亞"
    },
    {
      "code": "MV",
      "name": "馬爾地夫"
    },
    {
      "code": "ML",
      "name": "馬利"
    },
    {
      "code": "MT",
      "name": "馬爾他"
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
      "name": "蒙特內哥羅"
    },
    {
      "code": "MA",
      "name": "摩洛哥"
    },
    {
      "code": "MZ",
      "name": "莫三比克"
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
      "name": "紐西蘭"
    },
    {
      "code": "NI",
      "name": "尼加拉瓜"
    },
    {
      "code": "NE",
      "name": "尼日"
    },
    {
      "code": "NG",
      "name": "奈及利亞"
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
      "name": "巴布亞紐幾內亞"
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
      "name": "卡達"
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
      "name": "盧安達"
    },
    {
      "code": "SA",
      "name": "沙烏地阿拉伯"
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
      "name": "斯洛維尼亞"
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
      "name": "阿拉伯聯合大公國"
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
      "name": "烏茲別克"
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
      "name": "葉門"
    },
    {
      "code": "ZM",
      "name": "尚比亞"
    },
    {
      "code": "ZW",
      "name": "辛巴威"
    }
  ]
};
