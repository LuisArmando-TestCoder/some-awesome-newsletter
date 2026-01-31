export default {
  step01: {
    title: "听起来像人类的AI自动为您的订阅者撰写新闻通讯",
    subtitle: "多长时间一次，选择<u>每个月</u>或<u>每周</u>或<u>每天</u>或<u>什么时间</u>"
  },
  step02: {
    title: "新闻通讯的语言",
    subtitle: "“如果不同，您的新闻通讯也将以每个用户的特定语言发送”"
  },
  step03: {
    title: "重定向（可选）",
    subtitle: "您想将用户重定向到您的页面吗？",
    description: "您可以在这里粘贴您的页面链接，我们将计算有多少人从AI创建的电子邮件中进入",
    placeholder: "https://your-page.com"
  },
  step04: {
    title: "您希望AI选择的新闻类型",
    subtitle: "哪个对话主题或话题（如果设置了重定向链接则从中推断，否则为空）",
    placeholder: "例如 人工智能、营销、健康..."
  },
  step05: {
    title: "自定义您的签名",
    subtitle: "可视化设计或直接编辑代码",
    visualEditor: "可视化编辑器",
    htmlSource: "HTML源码",
    livePreview: "实时预览",
    yourName: "您的名字",
    yourTitle: "您的头衔",
    facebookProfile: "Facebook个人资料",
    instagramProfile: "Instagram个人资料",
    editHtml: "直接编辑HTML...",
    warning: "⚠️ 如果您切换回可视化编辑器并进行更改，此处所做的编辑将被覆盖。"
  },
  step06: {
    title: "新闻来源",
    subtitle: "您想使用哪个新闻网站？",
    description: "输入URL或让我们根据您的主题为您选择一个。",
    descriptionSmall: "我们将分析该网站以找到最佳内容。这可能需要几秒钟。",
    placeholder: "https://example.com",
    analyzing: "正在分析...",
    next: "下一步",
    errors: {
      failedToGenerate: "生成选择器失败。请重试或检查URL。",
      errorGenerating: "生成选择器时发生错误。",
      invalidUrl: "请输入有效的URL或选择一个来源。"
    }
  },
  step07: {
    title: "内容选择器",
    subtitle: "将每个网站视为一个<strong>布局独特的图书馆</strong>。",
    explanation1: "这个<strong>'选择器'</strong>是我们为该网站创建的特定地图。它告诉我们的系统确切去哪里查找您想要的文章，同时忽略菜单按钮和广告。",
    explanation2: "<strong>我们已为您自动填充此地图。</strong>",
    placeholder: "选择器字符串...",
    regenerate: "重新生成选择器",
    regenerating: "正在重新生成...",
    errors: {
      noUrl: "未找到新闻来源URL。",
      failedRegenerate: "重新生成选择器失败。",
      errorRegenerate: "重新生成选择器时发生错误。"
    }
  },
  step08: {
    title: "预览",
    placeholder: "准备好生成您的第一份新闻通讯了吗？",
    generateBtn: "生成新闻通讯电子邮件",
    sentBtn: "已发送！检查您的电子邮件",
    sendTestBtn: "发送测试电子邮件",
    regenerateBtn: "重新生成",
    loading: {
      initializing: "正在初始化...",
      starting: "开始生成...",
      scraping: "正在抓取内容...",
      translating: "正在翻译文章...",
      formatting: "正在格式化电子邮件...",
      sending: "正在连接到电子邮件提供商...",
      authenticating: "正在验证...",
      sendingArticle: "正在发送文章...",
      creating: "正在创建新闻来源...",
      saving: "正在保存配置...",
      finalizing: "正在完成设置..."
    },
    errors: {
      generationFailed: "生成失败：",
      createFailed: "创建新闻来源失败。请重试。",
      errorCreating: "创建新闻来源时出错：",
      sendFailed: "发送电子邮件失败："
    },
    defaultSubject: "您生成的新闻通讯预览"
  },
  step09: {
    title: "从您的电子邮件发送文章",
    subtitle: "应用密码（可选）",
    description: "（如果您有gmail服务，请在此处输入您的应用密码）",
    label: "应用密码",
    placeholder: "您的应用密码"
  },
  step10: {
    title: "Gmail地址（可选）",
    subtitle: "Gmail电子邮件地址",
    description: "如果您想从特定的Gmail地址发送",
    placeholder: "your-email@gmail.com"
  },
  step11: {
    title: "发送测试电子邮件",
    subtitle: "给自己发送一封测试电子邮件以验证配置。",
    sendNow: "立即发送",
    sent: "已发送！检查您的电子邮件",
    loading: {
      connecting: "正在连接到电子邮件提供商...",
      authenticating: "正在验证...",
      sending: "正在发送文章..."
    }
  },
  step12: {
    title: "与您的关注者分享此时事通讯",
    subtitle: "订阅漏斗的链接（在他们开始接收电子邮件之前，他们必须接受您的邀请）",
    copy: "复制",
    copied: "链接已复制！"
  },
  step13: {
    title: "计划和限制",
    currentPlan: "当前计划：",
    limits: "限制：",
    unknown: "未知",
    changePlan: "更改计划",
    advancedFeatures: "需要更高级的功能？",
    developerText: "查看我们的开发者部分，将此新闻通讯订阅漏斗集成到您的服务器上，包括您所有生成的文章的博客，并使用我们的API密钥从您的代码库订阅用户。",
    dashboardBtn: "前往仪表板",
    usage: "使用情况：",
    limitDetails: {
      free: "100个用户限制",
      starter: "5个来源，10万用户",
      growth: "17个来源，25万用户",
      pro: "25个来源，50万用户",
      master: "50个来源，无限用户",
      vipfree: "VIP免费"
    }
  }
};
