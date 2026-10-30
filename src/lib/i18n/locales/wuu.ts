// wuu strings for locales. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale wuu
export default {
  "auth": {
    "logo": "/icons/logo.png",
    "login": {
      "pageTitle": "登录",
      "title": "登录 AIBAN",
      "subtitle": "连上来，继续侬上趟朆做完个生活。",
      "google": "用 Google 继续",
      "or": "或者",
      "emailPlaceholder": "you@example.com",
      "continueWithEmail": "使用邮箱继续",
      "switchText": "还朆有账号？",
      "switchLink": "注册",
      "switchHref": "/signup"
    },
    "signup": {
      "pageTitle": "注册",
      "title": "开个新账号",
      "subtitle": "无需信用卡。",
      "google": "用 Google 继续",
      "or": "或者",
      "emailPlaceholder": "you@example.com",
      "continueWithEmail": "使用邮箱继续",
      "switchText": "已经有账号哉？",
      "switchLink": "登录",
      "switchHref": "/login"
    }
  },
  "landing": {
    "seo": {
      "title": "AIBAN | 把侬个网站变成新闻信，用每位读者个语言发送",
      "description": "AIBAN 读侬已经发布个内容，用侬个口气写一期新闻信，再用侬个名义发出去。每位订阅者收到个都是伊自家个语言。",
      "ogImageAlt": "AIBAN 标志"
    },
    "skipLink": "跳到主要内容",
    "hero": {
      "eyebrow": "为服务型企业打造个新闻信",
      "title": "侬个网站变成每周新闻信，用每位读者个语言送达",
      "lead": "AIBAN 读侬已经发布个内容，用侬个口气写一期新闻信，再用侬个名义发出去。每位订阅者收到个都是伊看得懂个语言。侬只要设置一趟，后头伊会自家一直跑下去。",
      "formLabel": "侬个网站",
      "formPlaceholder": "yourcompany.com",
      "formHint": "阿拉会根据侬输入个地址生成一期示例新闻信。免费开始，无需银行卡。",
      "formSubmit": "预览我个新闻信",
      "formError": "请输入网址，例如 yourcompany.com。",
      "secondaryCta": "了解运作方式"
    },
    "preview": {
      "badge": "示例预览",
      "note": "迭个是使用占位文字个示例版式。开始使用后，AIBAN 会根据侬最新个文章撰写真正个一期新闻信。",
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
      "lead": "侬只需把网站交拨 AIBAN 一次。之后，下面每个步骤侪会按侬选择个时间表自动进行。",
      "triggerLabel": "当",
      "actionLabel": "然后",
      "trigger": {
        "title": "现在是周一 9:00",
        "body": "也可以是侬选择个任何时间表：每天、每周或每月。"
      },
      "steps": [
        {
          "title": "AIBAN 寻到侬最新个文章",
          "body": "伊会检查侬个网站，挑出侬个理想读者最关心个内容。"
        },
        {
          "title": "用侬个口吻撰写新闻信",
          "body": "根据侬网站个写作风格改写文字，让伊读起来像侬写个。"
        },
        {
          "title": "为每位读者翻译新闻信",
          "body": "每位订阅者侪会收到注册时选择个语言版本。"
        },
        {
          "title": "用侬个名义发出去",
          "body": "读者看到个是侬个名字，伊拉个回复会进入侬个收件箱。"
        },
        {
          "title": "在侬个博客上发布新闻信",
          "body": "每期新闻信还会生成一个带独立链接个公开文章页面。"
        },
        {
          "title": "告诉侬发生了啥",
          "body": "侬个控制台会列出啥人加入了，以及读者点击了哪些链接。"
        }
      ],
      "alsoTitle": "以下情况也会触发",
      "also": [
        {
          "title": "有人在侬个网站上注册",
          "body": "伊拉通过邮件确认后，就会开始收到侬个新闻信。"
        },
        {
          "title": "侬粘贴一个链接或一段文字",
          "body": "AIBAN 会经过同样个步骤，撰写并发送一期相关新闻信。"
        },
        {
          "title": "侬上传联系人名单",
          "body": "AIBAN 会整理名单、去除重复项，并推测每位联系人个语言。"
        }
      ]
    },
    "languages": {
      "eyebrow": "所有语言",
      "title": "每位读者侪会收到自己语言个新闻信",
      "body": "侬弗用分别撰写弗一样版本。AIBAN 会把每期新闻信翻译成订阅者使用个每种语言，并在每个版本中保留侬个语气。支持个语言包括西班牙语、葡萄牙语、法语、德语、印地语、阿拉伯语、日语等。",
      "sampleNote": "同一期示例新闻信，三位读者收到个样子。"
    },
    "sender": {
      "eyebrow": "侬个地址",
      "title": "用侬个名义发出",
      "body": "每期新闻信侪带了侬个名字搭侬个邮件签名。AIBAN 用自家验证过个地址发出去，所以侬永远勿需要拿邮箱密码交拨阿拉。读者回复个辰光，回复会进侬个收件箱。",
      "inboxLabel": "在读者收件箱中个样子",
      "inboxFrom": "侬",
      "inboxSubject": "{site} 本周动态",
      "inboxSnippet": "用侬个口吻写成个最新文章简短摘要。",
      "inboxTime": "9:00"
    },
    "grow": {
      "eyebrow": "扩大侬个名单",
      "title": "适用于侬网站个订阅表单，以及自动更新个博客",
      "items": [
        {
          "title": "订阅表单",
          "body": "把 AIBAN 表单添加到侬个网站。新读者选择自己个语言，并通过邮件确认。"
        },
        {
          "title": "自动博客",
          "body": "每期新闻信侪会成为一个公开文章页面，可以被搜索到，也可以通过链接分享。"
        },
        {
          "title": "导入联系人",
          "body": "从 CSV 或 Excel 文件导入侬现有个客户，或直接粘贴名单。"
        }
      ]
    },
    "useCases": {
      "eyebrow": "适合啥人",
      "title": "为靠关系发展业务个企业而做",
      "lead": "如果侬个客户来自推荐和信任，定期收到侬个消息能让伊拉记得侬。AIBAN 会替侬写好迭份消息。",
      "items": [
        {
          "title": "代理公司和网页设计师",
          "body": "每周把最新作品和文章发拨客户和潜在客户，也可以为客户网站使用同样个设置。"
        },
        {
          "title": "IT 和软件公司",
          "body": "把版本说明和博客文章变成简短个更新，每位客户侪能用自己个语言阅读。"
        },
        {
          "title": "房地产",
          "body": "向说弗一样语言个买家和卖家分享新房源和市场文章。"
        },
        {
          "title": "律师和会计师",
          "body": "用平稳一致个格式，让客户了解侬一直在写个主题。"
        },
        {
          "title": "教练和培训师",
          "body": "在固定个日子把最新课程或文章发拨侬个社群，无需重新撰写。"
        }
      ]
    },
    "pricingIntro": {
      "eyebrow": "价格",
      "title": "免费开始，名单增长后再升级",
      "lead": "免费方案包含 1 个来源和最多 100 位订阅者。付费方案提供更多来源和更多订阅者。"
    },
    "faqTitle": "开始前大家常问个问题",
    "faq": [
      {
        "id": "what-do-i-need",
        "q": "开始需要准备啥？",
        "a": "侬个网站地址和一个邮箱地址。AIBAN 会读取侬个网站，了解侬个主题和写作方式。"
      },
      {
        "id": "do-i-write",
        "q": "我需要自己写内容伐？",
        "a": "弗需要。AIBAN 会根据侬个内容撰写每期新闻信。如果侬想就某个具体话题发一期，可以粘贴链接或文字。"
      },
      {
        "id": "languages",
        "q": "我个读者可以收到哪些语言？",
        "a": "AIBAN 会把每期新闻信翻译成每位订阅者阅读个语言。设置新闻信时可以查看完整个语言列表。"
      },
      {
        "id": "sender",
        "q": "邮件是啥人发出个？",
        "a": "从 AIBAN 个发件地址发出，发件人显示侬个名字。回复直接进侬个收件箱。侬永远勿需要拿邮箱密码交拨阿拉。"
      },
      {
        "id": "contacts",
        "q": "可以导入我现有个联系人伐？",
        "a": "可以。上传 CSV 或 Excel 文件，或粘贴名单。AIBAN 会整理名单、去除重复项，并推测每位联系人个语言。"
      },
      {
        "id": "schedule",
        "q": "新闻信多少辰光发送一次？",
        "a": "设置时由侬选择时间表，之后随时可以在控制台中更改。"
      },
      {
        "id": "free-plan",
        "q": "有免费方案伐？",
        "a": "有。免费方案包含 1 个来源和最多 100 位订阅者。付费方案提供更多来源和订阅者。"
      },
      {
        "id": "cancel",
        "q": "可以取消伐？",
        "a": "可以。侬随便啥辰光写信到 info@aiban.news，阿拉就会取消侬个付费方案，或者帮侬换回免费方案。"
      }
    ],
    "finalCta": {
      "title": "从侬个网站开始",
      "body": "把网站交拨 AIBAN，检查第一期新闻信，准备好后再开启。",
      "cta": "免费开始",
      "secondary": "查看帮助中心"
    },
    "footer": {
      "tagline": "用侬自己个内容写成，并以每位读者个语言发送个新闻信。",
      "product": "产品",
      "company": "公司",
      "legal": "法律信息",
      "links": {
        "howItWorks": "运作方式",
        "pricing": "价格",
        "demo": "演示",
        "help": "帮助中心",
        "about": "关于阿拉",
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
    "title": "申请调高额度",
    "subtitle": "告诉阿拉侬需要个额度，阿拉会通过邮件回复。",
    "contact": {
      "cta": "提交申请",
      "successTitle": "请求已可发送",
      "successBody": "侬个邮件应用已打开并填好了请求。请从伊面发送，阿拉会通过邮件回复。",
      "learnMore": "/plans"
    },
    "questions": {
      "desiredLimitsHelp": "告诉阿拉侬需要个额度，例如订阅者和来源个数量。",
      "useCaseHelp": "说明侬发送啥内容、发拨啥人、多少辰光发一次。",
      "expectedSpendHelp": "大致个估算能帮助阿拉推荐方案。也可以填写弗确定。"
    },
    "form": {
      "nameLabel": "名字",
      "emailLabel": "邮箱",
      "companyLabel": "公司",
      "optional": "（选填）",
      "limitsLabel": "侬需要个额度",
      "useCaseLabel": "侬哪能用 AIBAN",
      "spendLabel": "预计每个月个花费",
      "spend": {
        "lt500": "少于 $500",
        "500_2k": "$500 到 $2,000",
        "2k_10k": "$2,000 到 $10,000",
        "gt10k": "多于 $10,000",
        "unknown": "我还勿晓得"
      },
      "urgencyLabel": "急个程度",
      "urgency": {
        "low": "低",
        "normal": "一般",
        "high": "高"
      },
      "replyLabel": "阿拉应该哪能回复侬？",
      "reply": {
        "email": "发邮件",
        "call": "打电话"
      },
      "payAsYouGo": "我想按用量付钞票",
      "sending": "正在发送...",
      "sentTitle": "请求已经发出",
      "sentBody": "阿拉收到侬个请求了，会回复到侬填个邮箱地址。",
      "retryBefore": "如果侬个邮件应用呒没打开，",
      "retryLink": "再打开一趟请求",
      "retryAfter": "或者写信到",
      "errors": {
        "name": "请输入侬个名字（至少 2 个字符）。",
        "email": "请输入阿拉可以回复个邮箱地址，比方讲 name@example.com。",
        "company": "请输入至少 2 个字符，或者空着。",
        "desiredLimits": "请用至少 10 个字符讲讲侬需要个额度。",
        "useCase": "请用至少 20 个字符讲讲侬个用途。"
      }
    },
    "faqs": [
      {
        "id": "limits-how",
        "q": "调高额度哪能操作个？",
        "a": "发送一份写明所需额度个请求。阿拉会通过邮件回复适合侬账户个选项。"
      }
    ],
    "links": {
      "docs": "/plans",
      "community": "/help"
    }
  },
  "faq": [
    {
      "q": "AIBAN 是做啥个？",
      "a": "AIBAN 读侬已经发布个内容，比方讲侬个网站、侬个博客，或者侬挑个新闻网站。伊用侬个口气写新个一期，当新闻信发出去。每位订阅者收到个是伊挑个语言，发件人显示侬个名字。"
    },
    {
      "q": "有免费方案伐？",
      "a": "有个。免费方案包含 1 个来源搭最多 100 位订阅者。要更多个话，写信拨阿拉，阿拉会帮侬换方案。"
    },
    {
      "q": "订阅者如何收到自己语言个新闻信？",
      "a": "每位订阅者在注册时选择偏好语言。AIBAN 会在发送前把每期新闻信翻译成该语言。"
    },
    {
      "q": "新闻信可以从我自己个邮箱地址发出伐？",
      "a": "新闻信从 AIBAN 个发件地址发出，带了侬个名字搭邮件签名，回复会进侬个收件箱。阿拉勿会问侬要邮箱密码，所以侬个物事呒没啥好泄漏个。"
    },
    {
      "q": "别人如何订阅？",
      "a": "侬会得到一个订阅页面和一个可以放在网站上个订阅组件。侬也可以自己添加订阅者或上传名单。"
    },
    {
      "q": "可以随时取消伐？",
      "a": "可以。侬随便啥辰光写信到 info@aiban.news，阿拉就会取消侬个付费方案，或者帮侬换回免费方案。"
    }
  ],
  "plans": {
    "currency": "USD",
    "billingIntervals": [
      "按月",
      "按年"
    ],
    "currentPlan": "free",
    "plans": [
      {
        "id": "free",
        "name": "免费版",
        "monthly": 0,
        "yearly": 0,
        "tagline": "用一个来源试试看 AIBAN",
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
        "tagline": "拨勒拉壮大个电子报用",
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
        "ctaLabel": "选入门版",
        "productId": "prod_starter_id",
        "tier": 1
      },
      {
        "id": "growth",
        "name": "增长版",
        "monthly": 35,
        "yearly": 273,
        "tagline": "适合已经有规模个新闻信",
        "featuresBase": [
          "17 个来源",
          "最多 25 万位订阅者"
        ],
        "featuresDelta": [
          "定做品牌",
          "高级分析"
        ],
        "limits": {
          "newsSources": 17,
          "users": 250000
        },
        "ctaLabel": "选增长版",
        "productId": "prod_growth_id",
        "tier": 2
      },
      {
        "id": "pro",
        "name": "专业版",
        "monthly": 80,
        "yearly": 624,
        "tagline": "拨营销专家用",
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
        "ctaLabel": "选专业版",
        "productId": "prod_pro_id",
        "tier": 3
      },
      {
        "id": "master",
        "name": "大师版",
        "monthly": 150,
        "yearly": 1170,
        "tagline": "适合读者交关多个",
        "featuresBase": [
          "50 个来源",
          "订阅者数量勿限"
        ],
        "featuresDelta": [
          "一对一支持",
          "定做 Webhooks"
        ],
        "limits": {
          "newsSources": 50,
          "users": -1
        },
        "ctaLabel": "选大师版",
        "productId": "prod_master_id",
        "tier": 4
      },
      {
        "id": "vipfree",
        "name": "VIP 免费",
        "monthly": 0,
        "yearly": 0,
        "tagline": "合作伙伴专享全功能",
        "featuresBase": [
          "来源弗限",
          "订阅者数量勿限"
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
      "text": "需要定做个方案？",
      "cta": "联系阿拉",
      "href": "/help"
    }
  },
  "article": {
    "notFound": "寻弗到文章。",
    "errorFetching": "阿拉加载勿出迭篇文章。请等一分钟再重新加载页面。",
    "noArticleSpecified": "朆指定文章。",
    "goBack": "返回",
    "loading": "勒拉加载..."
  },
  "pricing": {
    "eyebrow": "价格",
    "title": "方案与价格",
    "currentPlan": "现在个方案：",
    "monthly": "按月算",
    "yearly": "按年",
    "yearlySave": "节省 35%",
    "intervalLabel": "计费周期",
    "billedYearly": "按年计费",
    "perMonthShort": "/mo",
    "perYearShort": "/yr",
    "freeCta": "免费开始",
    "processing": "正在打开结账页面...",
    "askMore": "每个账户侪从免费方案开始。要更多个话，写信到 {email}，阿拉会帮侬换方案。",
    "askFor": "申请 {planName}",
    "askAction": "写信拨阿拉",
    "checkoutError": "无法打开结账页面。请稍后再试。",
    "networkError": "无法连接到服务器。请检查网络连接后重试。",
    "includes": "包含",
    "pageMetaTitle": "价格 | AIBAN",
    "pageMetaDescription": "AIBAN 个方案搭价钿。先免费用 1 个来源搭最多 100 位订阅者，要更多个辰光再换按月或者按年个方案。",
    "pageTitle": "价格",
    "pageLead": "先用免费方案，有 1 个来源搭最多 100 位订阅者。要更多来源或者订阅者个辰光，写信拨阿拉，阿拉会帮侬换到付费方案，按月或者按年收费。",
    "faqTitle": "账单常见问题",
    "contactText": "需要更高额度或定制设置？",
    "contactCta": "联系阿拉",
    "everythingIn": "包括上一级计划个所有功能，再加上：",
    "isCurrentPlan": "箇是侬目前个计划",
    "downgradeTo": "切换到 {planName}",
    "upgradeTo": "选择 {planName}",
    "mockMode": "测试模式",
    "mostPopular": "最受欢迎",
    "perMonth": "每月",
    "perYear": "每年",
    "youSave": "侬省下来"
  },
  "confirmSubscription": {
    "title": "确认侬个订阅",
    "goBack": "返回",
    "pleaseAccept": "请同意条款来完成订阅。",
    "iAccept": "我同意",
    "termsAndConditions": "服务条款",
    "and": "搭拉",
    "privacyPolicy": "隐私政策",
    "confirm": "确认订阅",
    "mustAccept": "侬一定要同意条款才能订阅。",
    "invalidLink": "迭个确认链接勿完整。请打开阿拉最近发拨侬个邮件，用里向个链接。"
  },
  "articles": {
    "title": "最新文章",
    "subtitle": "AIBAN 为伊发出去个新闻信写个文章。",
    "producedIn": "迭眼文章有个语言",
    "searchPlaceholder": "寻文章...",
    "noArticlesFound": "寻弗到文章。",
    "created": "发布于：",
    "language": "语言：",
    "rightsReserved": "保留所有权利。",
    "errorFetching": "阿拉加载勿出文章。请等一分钟再重新加载页面。"
  },
  "blog": {
    "metaTitle": "{name} 个博客",
    "metaDescription": "来自 {name} 个文章。订阅即可通过邮件收到新文章。",
    "eyebrow": "新闻信博客",
    "heroFrom": "来自 {name} 个文章",
    "heroDescription": "迭些是迭份新闻信已发布个文章。订阅即可通过邮件收到新文章。",
    "subscribe": "订阅",
    "home": "博客首页",
    "featured": "最新文章",
    "latest": "最新文章",
    "latestHint": "按时间从新到旧排列。部分文章呒没图片，只显示文字。",
    "articleCount": "{language} 文章 {count} 篇",
    "articleCountOne": "{language} 文章 1 篇",
    "languages": "选择语言",
    "minRead": "阅读约 {n} 分钟",
    "readArticle": "阅读文章",
    "page": "第 {page} 页",
    "newer": "较新个文章",
    "older": "较早个文章",
    "pagination": "文章分页",
    "emptyTitle": "还呒没文章",
    "emptyBody": "迭份新闻信还呒没辣迭搭发布文章。订阅后，第一篇文章会通过邮件发拨侬。",
    "endTitle": "呒没更早个文章了",
    "endBody": "已经到列表末尾。",
    "backToNewest": "回到最新文章",
    "errorTitle": "无法加载迭些文章",
    "errorBody": "文章服务器呒没及时响应。请过一分钟后刷新页面重试。",
    "reload": "刷新页面",
    "missingHolder": "迭个博客链接弗完整，呒没指明要打开啥人个博客。请向新闻信个所有者索取完整链接。",
    "redirecting": "正在打开博客...",
    "publishedWith": "由 AIBAN 发布",
    "cta": {
      "title": "通过邮件接收下一篇文章",
      "body": "订阅 {name}，新文章会发送到侬个收件箱。侬可以随时退订。",
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
      "resultsFor": "“{q}”个搜索结果",
      "count": "寻到 {count} 篇文章",
      "countOne": "寻到 1 篇文章",
      "searching": "正在搜索文章",
      "emptyTitle": "呒没与“{q}”匹配个文章",
      "emptyBody": "请检查拼写，或试试更短个词。侬也可以浏览博客上个所有文章。",
      "browseAll": "浏览所有文章",
      "noQuery": "在上方输入词语或短语来搜索迭个博客。",
      "error": "文章服务器呒没响应，搜索已停止。请过一分钟后再试。",
      "tryAgain": "重试",
      "limitNote": "显示前 {count} 条匹配结果。使用更具体个短语可以缩小范围。"
    },
    "article": {
      "back": "所有文章",
      "published": "发布于 {date}",
      "by": "作者：{name}",
      "otherLanguages": "阅读其他语言版本",
      "otherLanguagesHint": "迭份新闻信也以迭些语言发布。每个链接侪会以对应语言打开博客。",
      "share": "分享迭篇文章",
      "copyLink": "复制链接",
      "copied": "链接已复制，可以粘贴到任何地方。",
      "copyFailed": "无法复制链接。请改从浏览器地址栏复制。",
      "notFoundTitle": "寻弗到文章",
      "notFoundBody": "迭篇文章可能已被删除，或链接弗完整。打开博客查看其他文章。",
      "errorTitle": "无法加载迭篇文章",
      "errorBody": "文章服务器呒没及时响应。请过一分钟后刷新页面重试。",
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
    "about": "关于阿拉",
    "privacy": "隐私",
    "terms": "条款",
    "cookies": "Cookie",
    "signOut": "退出登录",
    "chooseLanguage": "选择语言",
    "currentLanguage": "语言：{name}"
  },
  "about": {
    "metaTitle": "关于阿拉 | AIBAN",
    "metaDescription": "AIBAN 拿一家企业已经发布个内容变成一份自家会发出去个新闻信，用每位订阅者个语言，用老板个名义送到。",
    "eyebrow": "关于阿拉",
    "title": "关于 AIBAN",
    "lead": "AIBAN 拿一家企业已经发布个内容变成一份自家会发出去个新闻信。每位订阅者用自家个语言读，发件人是老板本人。",
    "whatTitle": "AIBAN 做啥",
    "whatBody": [
      "侬告诉 AIBAN 侬个内容在哪里：侬个网站、博客或侬关注个新闻网站。伊面出现新内容时，AIBAN 会用侬描述个口吻据此撰写一期新闻信，并按侬选择个时间表发拨订阅者。",
      "每位订阅者在注册时选择一种语言，每期新闻信发出前侪会翻译成该语言。文章还会发布为网页，侬也可以把伊拉发送到自己个网站。"
    ],
    "whoTitle": "开发者",
    "whoBody": [
      "AIBAN 由创始人 Luis Murillo Baltodano 开发。Luis 是一名创意工程师，背景是计算机图形和自动化。",
      "下面列出了伊个部分开源作品。"
    ],
    "projectsTitle": "创始人个开源作品",
    "projects": [
      {
        "name": "Scene Preset",
        "url": "https://github.com/LuisArmando-TestCoder/scene-preset",
        "desc": "一个在使用 Three.js 和 3D Web API 时减少样板代码个库。"
      },
      {
        "name": "Canvas Preset",
        "url": "https://github.com/LuisArmando-TestCoder/canvas-preset",
        "desc": "用于常见 Canvas API 任务个辅助工具。"
      },
      {
        "name": "Atomic Gatsby template",
        "url": "https://github.com/LuisArmando-TestCoder/atomic-gatsby-typescript-recoiljs",
        "desc": "按原子设计方法组织个入门模板。"
      }
    ],
    "githubLabel": "Luis 个 GitHub",
    "newTab": "（勒新标签页打开）",
    "contactTitle": "联系阿拉",
    "contactBody": "如有问题、反馈或合作想法，请写信至 info@aiban.news。",
    "emailCta": "发邮件至 info@aiban.news",
    "startCta": "免费开始",
    "helpCta": "查看帮助中心"
  },
  "careers": {
    "metaTitle": "招聘 | AIBAN",
    "metaDescription": "AIBAN 目前呒没开放职位。侬仍然可以写信至 info@aiban.news。",
    "eyebrow": "招聘",
    "title": "加入 AIBAN",
    "lead": "AIBAN 目前呒没开放职位。",
    "body": "有职位开放时，会在本页列出。如果侬以后想参与 AIBAN 个工作，请发一段简短个自我介绍，并说明侬想做啥。",
    "emailCta": "发邮件至 info@aiban.news",
    "emailSubject": "参与 AIBAN 个工作",
    "aboutCta": "了解 AIBAN"
  },
  "legal": {
    "navLabel": "法律文件",
    "lastUpdated": "最后更新：{date}",
    "privacy": {
      "title": "隐私政策",
      "metaTitle": "隐私政策 | AIBAN",
      "metaDescription": "AIBAN 哪能收集、使用搭保护侬个数据，还有侬哪能行使数据权利。"
    },
    "terms": {
      "title": "服务条款",
      "metaTitle": "服务条款 | AIBAN",
      "metaDescription": "侬开账户、用 AIBAN 个辰光适用个条款。"
    },
    "cookies": {
      "title": "Cookie 政策",
      "metaTitle": "Cookie 政策 | AIBAN",
      "metaDescription": "AIBAN 用啥个 Cookie、伊拉做啥、保留多少辰光，还有侬哪能控制伊拉。"
    }
  },
  "demoPage": {
    "metaTitle": "演示 | AIBAN",
    "metaDescription": "观看 AIBAN 个操作演示，了解注册后会发生啥：从添加网站到发送第一期新闻信。",
    "eyebrow": "演示",
    "title": "了解 AIBAN 如何运作",
    "lead": "先观看演示，再了解注册后会发生啥。",
    "videoTitle": "AIBAN 操作演示视频",
    "playLabel": "播放演示视频",
    "videoNote": "视频通过 YouTube 播放。",
    "stepsTitle": "注册后会发生啥",
    "steps": [
      {
        "title": "添加侬个网站",
        "body": "输入侬个网站、博客或侬关注个新闻网站个地址。AIBAN 会读取其中个新内容。"
      },
      {
        "title": "描述侬个读者和口吻",
        "body": "告诉 AIBAN 啥人在读侬个新闻信，以及伊应该是啥语气。侬也可以让伊根据侬个网站拨出描述建议。"
      },
      {
        "title": "选择时间表",
        "body": "选择新闻信个发送频率。之后可以在控制台中更改。"
      },
      {
        "title": "添加订阅者",
        "body": "上传名单、逐个添加，或分享侬个订阅页面和组件。每位订阅者侪会选择一种语言。"
      },
      {
        "title": "加上发件人名字搭签名",
        "body": "加上读者会看到个名字搭邮件签名。AIBAN 从验证过个地址用侬个名义发出每一期，回复会进侬个收件箱。"
      }
    ],
    "ctaTitle": "用侬自己个网站试一试",
    "ctaBody": "免费方案包含 1 个来源和最多 100 位订阅者。",
    "primaryCta": "免费开始",
    "secondaryCta": "查看价格"
  },
  "helpCenter": {
    "metaTitle": "帮助 | AIBAN",
    "metaDescription": "关于设置 AIBAN 个解答：来源、语言、用侬个名义发送、订阅者、订阅小组件、博客搭计费。",
    "eyebrow": "帮助中心",
    "title": "需要啥帮助？",
    "lead": "辣迭搭查寻设置和运营新闻信个解答。如果呒没寻到需要个内容，请写信拨阿拉。",
    "searchLabel": "搜索帮助中心",
    "searchPlaceholder": "试试搜索语言、组件或取消",
    "clearSearch": "清除搜索",
    "resultsCount": "有 {count} 条解答与侬个搜索匹配。",
    "noResults": "呒没与侬个搜索匹配个解答。请换个词试试，或发邮件至 info@aiban.news。",
    "topicsLabel": "主题",
    "copyLink": "复制链接",
    "linkCopied": "链接已复制",
    "contactTitle": "仍需要帮助？",
    "contactBody": "请写信至 info@aiban.news，并附上侬注册时使用个邮箱地址。",
    "emailCta": "发邮件至 info@aiban.news",
    "limitsTitle": "申请更高额度",
    "limitsBody": "告诉阿拉侬需要个额度，阿拉会用邮件回复。如果迭只页面发勿出请求，侬个邮件应用会打开，内容已经填好，侬直接发拨阿拉就可以了。",
    "faqFilterLabel": "筛选问题",
    "faqNoMatch": "呒没问题符合侬个筛选。",
    "groups": [
      {
        "id": "getting-started",
        "title": "入门",
        "items": [
          {
            "id": "what-is-aiban",
            "q": "AIBAN 是啥？",
            "a": "AIBAN 把侬已发布个内容变成定期发送个新闻信。伊读取侬个网站、博客或侬选择个新闻网站，用侬个口吻撰写新一期内容，并发拨侬个订阅者。每位订阅者侪用自己选择个语言阅读。"
          },
          {
            "id": "how-to-start",
            "q": "哪能开始？",
            "a": "在注册页面创建账户。设置过程中会要求填写侬个网站地址和一些关于读者个信息。之后侬就可以添加订阅者，并在控制台中管理一切。"
          },
          {
            "id": "change-settings",
            "q": "之后可以更改设置伐？",
            "a": "可以。侬后头可以勒控制台里改来源、发送时间、发件人信息搭订阅者。要换方案，请写信到 info@aiban.news。"
          }
        ]
      },
      {
        "id": "sources",
        "title": "来源和内容",
        "items": [
          {
            "id": "what-is-a-source",
            "q": "啥可以作为来源？",
            "a": "来源是 AIBAN 读取新内容个网址，例如侬个网站、博客或侬关注个新闻网站。侬可以在控制台中添加来源。可添加个数量取决于侬个方案。"
          },
          {
            "id": "how-often",
            "q": "我个新闻信多少辰光发送一次？",
            "a": "设置来源时由侬选择发布频率。之后可以在控制台中更改时间表。"
          },
          {
            "id": "your-voice",
            "q": "AIBAN 如何用我个口吻写作？",
            "a": "侬描述新闻信个风格，或让 AIBAN 为侬生成一段描述。每期新闻信侪会按照迭段描述撰写。侬随时可以在控制台中修改。"
          }
        ]
      },
      {
        "id": "languages",
        "title": "语言",
        "items": [
          {
            "id": "subscriber-language",
            "q": "订阅者如何收到自己语言个新闻信？",
            "a": "每位订阅者在注册时选择偏好语言。AIBAN 会在发送前把每期新闻信翻译成该语言。"
          },
          {
            "id": "site-language",
            "q": "可以用我个语言使用网站伐？",
            "a": "可以。使用屏幕右下角个语言按钮，即可切换网站和控制台个语言。"
          }
        ]
      },
      {
        "id": "sending",
        "title": "用侬个名义发送",
        "items": [
          {
            "id": "own-address",
            "q": "新闻信可以从我自己个邮箱地址发出伐？",
            "a": "新闻信从 AIBAN 个发件地址发出，带了侬个发件人名字搭邮件签名，回复会进侬个收件箱。阿拉勿会问侬要邮箱密码，所以侬个物事呒没啥好泄漏个。"
          },
          {
            "id": "app-password",
            "q": "我要拿邮箱密码交拨 AIBAN 哦？",
            "a": "勿要。AIBAN 从来勿问侬要邮箱密码或者应用专用密码。新闻信从 AIBAN 个地址用侬个名义发出，回复会到侬迭搭。"
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
            "a": "侬可以在控制台中逐个添加，或上传包含名单个文件。别人也可以通过侬个订阅页面或订阅组件加入。"
          },
          {
            "id": "signup-widget",
            "q": "啥是订阅组件？",
            "a": "订阅组件是一个可以放在侬自己网站上个订阅表单。访客输入邮箱地址并选择语言后，就会加入侬个名单。"
          },
          {
            "id": "subscriber-limit",
            "q": "订阅者数量有上限伐？",
            "a": "每个方案侪有自己个订阅者上限。免费方案最多包含 100 位订阅者。其他方案个上限请见价格页面。"
          }
        ]
      },
      {
        "id": "blog",
        "title": "博客",
        "items": [
          {
            "id": "blog-pages",
            "q": "我个新闻信文章会发布到网上伐？",
            "a": "会。AIBAN 为侬个新闻信撰写个文章也会发布为网页，读者可以在收件箱之外阅读。"
          },
          {
            "id": "post-to-site",
            "q": "可以把文章发布到我自己个网站伐？",
            "a": "可以。在控制台中，侬可以设置一个 webhook，把每篇新闻信文章作为帖子发送到侬个网站。伊适用于 WordPress，以及任何接受标准 REST 内容个平台。"
          }
        ]
      },
      {
        "id": "billing",
        "title": "账单",
        "items": [
          {
            "id": "free-plan",
            "q": "有免费方案伐？",
            "a": "有。免费方案包含 1 个来源和最多 100 位订阅者。需要更多时，可以升级到付费方案。"
          },
          {
            "id": "monthly-yearly",
            "q": "可以按月或按年付费伐？",
            "a": "是个。付费方案按月或者按年收费。按年付比按月连付 12 个月便宜 35%。要挑方案，请写信到 info@aiban.news。"
          },
          {
            "id": "cancel",
            "q": "可以随时取消伐？",
            "a": "可以。侬随便啥辰光写信到 info@aiban.news，阿拉就会取消侬个付费方案，或者帮侬换回免费方案。"
          },
          {
            "id": "higher-limits",
            "q": "如果我需要个超过最大方案哪能办？",
            "a": "请使用帮助页面上个申请表告诉阿拉侬需要个额度。阿拉会通过邮件回复。"
          }
        ]
      }
    ]
  },
  "mainPage": {
    "skipToMainContent": "直接跳到正文",
    "dismissAnnouncement": "关脱公告",
    "problem": "问题：",
    "outcome": "结果：",
    "disclaimer": "打六五折只针对年付用户。"
  },
  "authForm": {
    "emailValidation": "请输入邮箱地址，比方讲 name@example.com。",
    "failedToSendCode": "阿拉发勿出验证码。请检查邮箱地址，一分钟后再试。",
    "sending": "勒拉发...",
    "codeSent": "阿拉已经拿验证码发到侬个邮箱了。",
    "invalidCode": "验证码勿对。请看看阿拉最近发拨侬个邮件，或者重新发验证码。",
    "regenerateCode": "重发验证码",
    "back": "转去",
    "byProceeding": "继续操作代表侬同意",
    "termsOfService": "服务条款",
    "and": "搭拉",
    "privacyPolicy": "隐私政策",
    "appName": "AI 电子报"
  },
  "welcome": {
    "title": "全自动电子报生成器",
    "setItOnce": "设置一趟就可以了。",
    "useItForever": "后头伊会自家一直跑下去。"
  },
  "lead": {
    "title": "拿订户变成回头客",
    "recommendation": "连上侬个网站，帮 AI 晓得点侬品牌个腔调。",
    "question": "侬有网站哦？（选填，后头也可以加）",
    "placeholder": "https://your-site.com"
  },
  "newsSource": {
    "title": "连上侬个内容源",
    "subtitle": "阿拉会抓取侬个内容，侬就弗用从头开始做生活哉。",
    "placeholder": "侬个博客或者 RSS 链接"
  },
  "subscribe": {
    "welcome": {
      "title": "欢迎订阅迭份新闻信。",
      "invitedBy": "{configuratorId} 邀请了侬。"
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
    "dropFile": "掼到箇端来",
    "release": "松手上传"
  },
  "billing": {
    "title": "账单与订阅",
    "currentPlanTitle": "侬当前个方案",
    "upgradePlanTitle": "更改方案",
    "manageSubscription": "管理订阅",
    "vipPlanName": "VIP 合作伙伴",
    "vipPlanDescription": "AIBAN 送拨侬个无限制使用权限。",
    "perMonth": "每月",
    "perYear": "每年",
    "monthAbbreviation": "月",
    "equivalentTo": "相当于",
    "mostPopular": "最受欢迎",
    "upgradeTo": "升级到",
    "downgradeTo": "调成",
    "currentPlanButton": "侬个方案",
    "youSave": "侬省下来",
    "users": "个用户",
    "newsSources": "只新闻源",
    "monthly": "按月",
    "yearly": "按年",
    "loadingPlan": "加载计划数据中..."
  },
  "languages": [
    {
      "code": "ab",
      "name": "阿布哈兹语"
    },
    {
      "code": "aa",
      "name": "阿法尔语"
    },
    {
      "code": "af",
      "name": "南非荷兰语"
    },
    {
      "code": "ak",
      "name": "阿肯语"
    },
    {
      "code": "sq",
      "name": "阿尔巴尼亚语"
    },
    {
      "code": "am",
      "name": "阿姆哈拉语"
    },
    {
      "code": "ar",
      "name": "阿拉伯语"
    },
    {
      "code": "an",
      "name": "阿拉贡语"
    },
    {
      "code": "hy",
      "name": "亚美尼亚语"
    },
    {
      "code": "as",
      "name": "阿萨姆语"
    },
    {
      "code": "av",
      "name": "阿瓦尔语"
    },
    {
      "code": "ae",
      "name": "阿维斯陀语"
    },
    {
      "code": "ay",
      "name": "艾马拉语"
    },
    {
      "code": "az",
      "name": "阿塞拜疆语"
    },
    {
      "code": "bm",
      "name": "班巴拉语"
    },
    {
      "code": "ba",
      "name": "巴什基尔语"
    },
    {
      "code": "eu",
      "name": "巴斯克语"
    },
    {
      "code": "be",
      "name": "白俄罗斯语"
    },
    {
      "code": "bn",
      "name": "孟加拉语"
    },
    {
      "code": "bi",
      "name": "比斯拉马语"
    },
    {
      "code": "bs",
      "name": "波斯尼亚语"
    },
    {
      "code": "br",
      "name": "布列塔尼语"
    },
    {
      "code": "bg",
      "name": "保加利亚语"
    },
    {
      "code": "my",
      "name": "缅甸语"
    },
    {
      "code": "ca",
      "name": "加泰罗尼亚语"
    },
    {
      "code": "ch",
      "name": "查莫罗语"
    },
    {
      "code": "ce",
      "name": "车臣语"
    },
    {
      "code": "ny",
      "name": "齐切瓦语"
    },
    {
      "code": "zh",
      "name": "中文"
    },
    {
      "code": "cu",
      "name": "教会斯拉夫语"
    },
    {
      "code": "cv",
      "name": "楚瓦什语"
    },
    {
      "code": "kw",
      "name": "康沃尔语"
    },
    {
      "code": "co",
      "name": "科西嘉语"
    },
    {
      "code": "cr",
      "name": "克里语"
    },
    {
      "code": "hr",
      "name": "克罗地亚语"
    },
    {
      "code": "cs",
      "name": "捷克语"
    },
    {
      "code": "da",
      "name": "丹麦语"
    },
    {
      "code": "dv",
      "name": "迪维希语"
    },
    {
      "code": "nl",
      "name": "荷兰语"
    },
    {
      "code": "dz",
      "name": "宗卡语"
    },
    {
      "code": "en",
      "name": "英语"
    },
    {
      "code": "eo",
      "name": "世界语"
    },
    {
      "code": "et",
      "name": "爱沙尼亚语"
    },
    {
      "code": "ee",
      "name": "埃维语"
    },
    {
      "code": "fo",
      "name": "法罗语"
    },
    {
      "code": "fj",
      "name": "斐济语"
    },
    {
      "code": "fi",
      "name": "芬兰语"
    },
    {
      "code": "fr",
      "name": "法语"
    },
    {
      "code": "fy",
      "name": "西弗里西亚语"
    },
    {
      "code": "ff",
      "name": "富拉语"
    },
    {
      "code": "gd",
      "name": "苏格兰盖尔语"
    },
    {
      "code": "gl",
      "name": "加利西亚语"
    },
    {
      "code": "lg",
      "name": "干达语"
    },
    {
      "code": "ka",
      "name": "格鲁吉亚语"
    },
    {
      "code": "de",
      "name": "德语"
    },
    {
      "code": "el",
      "name": "希腊语"
    },
    {
      "code": "kl",
      "name": "格陵兰语"
    },
    {
      "code": "gn",
      "name": "瓜拉尼语"
    },
    {
      "code": "gu",
      "name": "古吉拉特语"
    },
    {
      "code": "ht",
      "name": "海地克里奥尔语"
    },
    {
      "code": "ha",
      "name": "豪萨语"
    },
    {
      "code": "he",
      "name": "希伯来语"
    },
    {
      "code": "hz",
      "name": "赫雷罗语"
    },
    {
      "code": "hi",
      "name": "印地语"
    },
    {
      "code": "ho",
      "name": "希里莫图语"
    },
    {
      "code": "hu",
      "name": "匈牙利语"
    },
    {
      "code": "is",
      "name": "冰岛语"
    },
    {
      "code": "io",
      "name": "伊多语"
    },
    {
      "code": "ig",
      "name": "伊博语"
    },
    {
      "code": "id",
      "name": "印度尼西亚语"
    },
    {
      "code": "ia",
      "name": "国际语A"
    },
    {
      "code": "ie",
      "name": "国际语E"
    },
    {
      "code": "iu",
      "name": "因纽特语"
    },
    {
      "code": "ik",
      "name": "依努皮亚克语"
    },
    {
      "code": "ga",
      "name": "爱尔兰语"
    },
    {
      "code": "it",
      "name": "意大利语"
    },
    {
      "code": "ja",
      "name": "日语"
    },
    {
      "code": "jv",
      "name": "爪哇语"
    },
    {
      "code": "kn",
      "name": "卡纳达语"
    },
    {
      "code": "kr",
      "name": "卡努里语"
    },
    {
      "code": "ks",
      "name": "克什米尔语"
    },
    {
      "code": "kk",
      "name": "哈萨克语"
    },
    {
      "code": "km",
      "name": "高棉语"
    },
    {
      "code": "ki",
      "name": "基库尤语"
    },
    {
      "code": "rw",
      "name": "卢旺达语"
    },
    {
      "code": "ky",
      "name": "吉尔吉斯语"
    },
    {
      "code": "kv",
      "name": "科米语"
    },
    {
      "code": "kg",
      "name": "刚果语"
    },
    {
      "code": "ko",
      "name": "韩语"
    },
    {
      "code": "kj",
      "name": "库瓦尼亚马语"
    },
    {
      "code": "ku",
      "name": "库尔德语"
    },
    {
      "code": "lo",
      "name": "老挝语"
    },
    {
      "code": "la",
      "name": "拉丁语"
    },
    {
      "code": "lv",
      "name": "拉脱维亚语"
    },
    {
      "code": "li",
      "name": "林堡语"
    },
    {
      "code": "ln",
      "name": "林加拉语"
    },
    {
      "code": "lt",
      "name": "立陶宛语"
    },
    {
      "code": "lu",
      "name": "卢巴-加丹加语"
    },
    {
      "code": "lb",
      "name": "卢森堡语"
    },
    {
      "code": "mk",
      "name": "马其顿语"
    },
    {
      "code": "mg",
      "name": "马达加斯加语"
    },
    {
      "code": "ms",
      "name": "马来语"
    },
    {
      "code": "ml",
      "name": "马拉雅拉姆语"
    },
    {
      "code": "mt",
      "name": "马耳他语"
    },
    {
      "code": "gv",
      "name": "马恩岛语"
    },
    {
      "code": "mi",
      "name": "毛利语"
    },
    {
      "code": "mr",
      "name": "马拉地语"
    },
    {
      "code": "mh",
      "name": "马绍尔语"
    },
    {
      "code": "mn",
      "name": "蒙古语"
    },
    {
      "code": "na",
      "name": "瑙鲁语"
    },
    {
      "code": "nv",
      "name": "纳瓦霍语"
    },
    {
      "code": "nd",
      "name": "北恩德贝勒语"
    },
    {
      "code": "nr",
      "name": "南恩德贝勒语"
    },
    {
      "code": "ng",
      "name": "恩东加语"
    },
    {
      "code": "ne",
      "name": "尼泊尔语"
    },
    {
      "code": "no",
      "name": "挪威语"
    },
    {
      "code": "nb",
      "name": "挪威书面语"
    },
    {
      "code": "nn",
      "name": "挪威新挪威语"
    },
    {
      "code": "oc",
      "name": "奥克西坦语"
    },
    {
      "code": "oj",
      "name": "奥吉布瓦语"
    },
    {
      "code": "or",
      "name": "奥里亚语"
    },
    {
      "code": "om",
      "name": "奥罗莫语"
    },
    {
      "code": "os",
      "name": "奥塞梯语"
    },
    {
      "code": "pi",
      "name": "巴利语"
    },
    {
      "code": "ps",
      "name": "普什图语"
    },
    {
      "code": "fa",
      "name": "波斯语"
    },
    {
      "code": "pl",
      "name": "波兰语"
    },
    {
      "code": "pt",
      "name": "葡萄牙语"
    },
    {
      "code": "pa",
      "name": "旁遮普语"
    },
    {
      "code": "qu",
      "name": "盖丘亚语"
    },
    {
      "code": "ro",
      "name": "罗马尼亚语"
    },
    {
      "code": "rm",
      "name": "罗曼什语"
    },
    {
      "code": "rn",
      "name": "隆迪语"
    },
    {
      "code": "ru",
      "name": "俄语"
    },
    {
      "code": "se",
      "name": "北萨米语"
    },
    {
      "code": "sm",
      "name": "萨摩亚语"
    },
    {
      "code": "sg",
      "name": "桑戈语"
    },
    {
      "code": "sa",
      "name": "梵语"
    },
    {
      "code": "sc",
      "name": "萨丁尼亚语"
    },
    {
      "code": "sr",
      "name": "塞尔维亚语"
    },
    {
      "code": "sn",
      "name": "绍纳语"
    },
    {
      "code": "ii",
      "name": "四川彝语"
    },
    {
      "code": "sd",
      "name": "信德语"
    },
    {
      "code": "si",
      "name": "僧伽罗语"
    },
    {
      "code": "sk",
      "name": "斯洛伐克语"
    },
    {
      "code": "sl",
      "name": "斯洛文尼亚语"
    },
    {
      "code": "so",
      "name": "索马里语"
    },
    {
      "code": "st",
      "name": "南索托语"
    },
    {
      "code": "es",
      "name": "西班牙语"
    },
    {
      "code": "su",
      "name": "巽他语"
    },
    {
      "code": "sw",
      "name": "斯瓦希里语"
    },
    {
      "code": "ss",
      "name": "斯瓦蒂语"
    },
    {
      "code": "sv",
      "name": "瑞典语"
    },
    {
      "code": "tl",
      "name": "他加禄语（菲律宾语）"
    },
    {
      "code": "ty",
      "name": "塔希提语"
    },
    {
      "code": "tg",
      "name": "塔吉克语"
    },
    {
      "code": "ta",
      "name": "泰米尔语"
    },
    {
      "code": "tt",
      "name": "鞑靼语"
    },
    {
      "code": "te",
      "name": "泰卢固语"
    },
    {
      "code": "th",
      "name": "泰语"
    },
    {
      "code": "bo",
      "name": "藏语"
    },
    {
      "code": "ti",
      "name": "提格里尼亚语"
    },
    {
      "code": "to",
      "name": "汤加语"
    },
    {
      "code": "ts",
      "name": "聪加语"
    },
    {
      "code": "tn",
      "name": "茨瓦纳语"
    },
    {
      "code": "tr",
      "name": "土耳其语"
    },
    {
      "code": "tk",
      "name": "土库曼语"
    },
    {
      "code": "tw",
      "name": "契维语"
    },
    {
      "code": "ug",
      "name": "维吾尔语"
    },
    {
      "code": "uk",
      "name": "乌克兰语"
    },
    {
      "code": "ur",
      "name": "乌尔都语"
    },
    {
      "code": "uz",
      "name": "乌兹别克语"
    },
    {
      "code": "ve",
      "name": "文达语"
    },
    {
      "code": "vi",
      "name": "越南语"
    },
    {
      "code": "vo",
      "name": "沃拉普克语"
    },
    {
      "code": "wa",
      "name": "瓦隆语"
    },
    {
      "code": "cy",
      "name": "威尔士语"
    },
    {
      "code": "wo",
      "name": "沃洛夫语"
    },
    {
      "code": "xh",
      "name": "科萨语"
    },
    {
      "code": "yi",
      "name": "意第绪语"
    },
    {
      "code": "yo",
      "name": "约鲁巴语"
    },
    {
      "code": "za",
      "name": "壮语"
    },
    {
      "code": "zu",
      "name": "祖鲁语"
    }
  ],
  "countries": [
    {
      "code": "AF",
      "name": "阿富汗"
    },
    {
      "code": "AL",
      "name": "阿尔巴尼亚"
    },
    {
      "code": "DZ",
      "name": "阿尔及利亚"
    },
    {
      "code": "AS",
      "name": "美属萨摩亚"
    },
    {
      "code": "AD",
      "name": "安道尔"
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
      "name": "南极洲"
    },
    {
      "code": "AG",
      "name": "安提瓜和巴布达"
    },
    {
      "code": "AR",
      "name": "阿根廷"
    },
    {
      "code": "AM",
      "name": "亚美尼亚"
    },
    {
      "code": "AW",
      "name": "阿鲁巴"
    },
    {
      "code": "AU",
      "name": "澳大利亚"
    },
    {
      "code": "AT",
      "name": "奥地利"
    },
    {
      "code": "AZ",
      "name": "阿塞拜疆"
    },
    {
      "code": "BS",
      "name": "巴哈马"
    },
    {
      "code": "BH",
      "name": "巴林"
    },
    {
      "code": "BD",
      "name": "孟加拉国"
    },
    {
      "code": "BB",
      "name": "巴巴多斯"
    },
    {
      "code": "BY",
      "name": "白俄罗斯"
    },
    {
      "code": "BE",
      "name": "比利时"
    },
    {
      "code": "BZ",
      "name": "伯利兹"
    },
    {
      "code": "BJ",
      "name": "贝宁"
    },
    {
      "code": "BM",
      "name": "百慕大"
    },
    {
      "code": "BT",
      "name": "不丹"
    },
    {
      "code": "BO",
      "name": "玻利维亚"
    },
    {
      "code": "BA",
      "name": "波斯尼亚和黑塞哥维那"
    },
    {
      "code": "BW",
      "name": "博茨瓦纳"
    },
    {
      "code": "BR",
      "name": "巴西"
    },
    {
      "code": "IO",
      "name": "英属印度洋领地"
    },
    {
      "code": "VG",
      "name": "英属维尔京群岛"
    },
    {
      "code": "BN",
      "name": "文莱"
    },
    {
      "code": "BG",
      "name": "保加利亚"
    },
    {
      "code": "BF",
      "name": "布基纳法索"
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
      "name": "喀麦隆"
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
      "name": "开曼群岛"
    },
    {
      "code": "CF",
      "name": "中非共和国"
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
      "name": "中国"
    },
    {
      "code": "CX",
      "name": "圣诞岛"
    },
    {
      "code": "CC",
      "name": "科科斯（基林）群岛"
    },
    {
      "code": "CO",
      "name": "哥伦比亚"
    },
    {
      "code": "KM",
      "name": "科摩罗"
    },
    {
      "code": "CG",
      "name": "刚果（布）"
    },
    {
      "code": "CD",
      "name": "刚果（金）"
    },
    {
      "code": "CK",
      "name": "库克群岛"
    },
    {
      "code": "CR",
      "name": "哥斯达黎加"
    },
    {
      "code": "CI",
      "name": "科特迪瓦"
    },
    {
      "code": "HR",
      "name": "克罗地亚"
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
      "name": "丹麦"
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
      "name": "多米尼加共和国"
    },
    {
      "code": "EC",
      "name": "厄瓜多尔"
    },
    {
      "code": "EG",
      "name": "埃及"
    },
    {
      "code": "SV",
      "name": "萨尔瓦多"
    },
    {
      "code": "GQ",
      "name": "赤道几内亚"
    },
    {
      "code": "ER",
      "name": "厄立特里亚"
    },
    {
      "code": "EE",
      "name": "爱沙尼亚"
    },
    {
      "code": "SZ",
      "name": "斯威士兰"
    },
    {
      "code": "ET",
      "name": "埃塞俄比亚"
    },
    {
      "code": "FJ",
      "name": "斐济"
    },
    {
      "code": "FI",
      "name": "芬兰"
    },
    {
      "code": "FR",
      "name": "法国"
    },
    {
      "code": "GA",
      "name": "加蓬"
    },
    {
      "code": "GM",
      "name": "冈比亚"
    },
    {
      "code": "GE",
      "name": "格鲁吉亚"
    },
    {
      "code": "DE",
      "name": "德国"
    },
    {
      "code": "GH",
      "name": "加纳"
    },
    {
      "code": "GR",
      "name": "希腊"
    },
    {
      "code": "GT",
      "name": "危地马拉"
    },
    {
      "code": "GN",
      "name": "几内亚"
    },
    {
      "code": "GY",
      "name": "圭亚那"
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
      "name": "冰岛"
    },
    {
      "code": "IN",
      "name": "印度"
    },
    {
      "code": "ID",
      "name": "印度尼西亚"
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
      "name": "爱尔兰"
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
      "name": "牙买加"
    },
    {
      "code": "JP",
      "name": "日本"
    },
    {
      "code": "JO",
      "name": "约旦"
    },
    {
      "code": "KZ",
      "name": "哈萨克斯坦"
    },
    {
      "code": "KE",
      "name": "肯尼亚"
    },
    {
      "code": "KR",
      "name": "韩国"
    },
    {
      "code": "KW",
      "name": "科威特"
    },
    {
      "code": "KG",
      "name": "吉尔吉斯斯坦"
    },
    {
      "code": "LA",
      "name": "老挝"
    },
    {
      "code": "LV",
      "name": "拉脱维亚"
    },
    {
      "code": "LB",
      "name": "黎巴嫩"
    },
    {
      "code": "LS",
      "name": "莱索托"
    },
    {
      "code": "LR",
      "name": "利比里亚"
    },
    {
      "code": "LY",
      "name": "利比亚"
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
      "name": "卢森堡"
    },
    {
      "code": "MG",
      "name": "马达加斯加"
    },
    {
      "code": "MW",
      "name": "马拉维"
    },
    {
      "code": "MY",
      "name": "马来西亚"
    },
    {
      "code": "MV",
      "name": "马尔代夫"
    },
    {
      "code": "ML",
      "name": "马里"
    },
    {
      "code": "MT",
      "name": "马耳他"
    },
    {
      "code": "MX",
      "name": "墨西哥"
    },
    {
      "code": "MD",
      "name": "摩尔多瓦"
    },
    {
      "code": "MC",
      "name": "摩纳哥"
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
      "name": "缅甸"
    },
    {
      "code": "NA",
      "name": "纳米比亚"
    },
    {
      "code": "NP",
      "name": "尼泊尔"
    },
    {
      "code": "NL",
      "name": "荷兰"
    },
    {
      "code": "NZ",
      "name": "新西兰"
    },
    {
      "code": "NI",
      "name": "尼加拉瓜"
    },
    {
      "code": "NE",
      "name": "尼日尔"
    },
    {
      "code": "NG",
      "name": "尼日利亚"
    },
    {
      "code": "MK",
      "name": "北马其顿"
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
      "name": "巴拿马"
    },
    {
      "code": "PG",
      "name": "巴布亚新几内亚"
    },
    {
      "code": "PY",
      "name": "巴拉圭"
    },
    {
      "code": "PE",
      "name": "秘鲁"
    },
    {
      "code": "PH",
      "name": "菲律宾"
    },
    {
      "code": "PL",
      "name": "波兰"
    },
    {
      "code": "PT",
      "name": "葡萄牙"
    },
    {
      "code": "QA",
      "name": "卡塔尔"
    },
    {
      "code": "RO",
      "name": "罗马尼亚"
    },
    {
      "code": "RU",
      "name": "俄罗斯"
    },
    {
      "code": "RW",
      "name": "卢旺达"
    },
    {
      "code": "SA",
      "name": "沙特阿拉伯"
    },
    {
      "code": "SN",
      "name": "塞内加尔"
    },
    {
      "code": "RS",
      "name": "塞尔维亚"
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
      "name": "斯洛文尼亚"
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
      "name": "斯里兰卡"
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
      "name": "台湾"
    },
    {
      "code": "TH",
      "name": "泰国"
    },
    {
      "code": "TR",
      "name": "土耳其"
    },
    {
      "code": "UG",
      "name": "乌干达"
    },
    {
      "code": "UA",
      "name": "乌克兰"
    },
    {
      "code": "AE",
      "name": "阿拉伯联合酋长国"
    },
    {
      "code": "GB",
      "name": "英国"
    },
    {
      "code": "US",
      "name": "美国"
    },
    {
      "code": "UY",
      "name": "乌拉圭"
    },
    {
      "code": "UZ",
      "name": "乌兹别克斯坦"
    },
    {
      "code": "VE",
      "name": "委内瑞拉"
    },
    {
      "code": "VN",
      "name": "越南"
    },
    {
      "code": "YE",
      "name": "也门"
    },
    {
      "code": "ZM",
      "name": "赞比亚"
    },
    {
      "code": "ZW",
      "name": "津巴布韦"
    }
  ]
};
