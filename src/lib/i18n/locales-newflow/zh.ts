// zh strings for locales-newflow. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale zh
export default {
  "onboarding": {
    "progress": "第 {current} 步，共 {total} 步",
    "progressLabel": "设置进度",
    "back": "返回",
    "skip": "跳过此步",
    "continue": "继续",
    "whyLabel": "为什么要问",
    "skipLabel": "如果跳过",
    "working": "处理中...",
    "start": {
      "title": "开始您的新闻简报",
      "opening": "正在打开设置。如果没有反应，",
      "continueHere": "请在这里继续"
    },
    "tryAgain": "重试",
    "website": {
      "title": "您的网站是什么？",
      "why": "我们会读取您的网站，找到用来制作新闻简报的文章，并推测您的读者是谁。",
      "skipNote": "如果您还没有网站，请选择一个主题，我们会使用相关的新闻网站。",
      "label": "网站地址",
      "hint": "例如 yourcompany.com 或 yourcompany.com/blog",
      "placeholder": "yourcompany.com",
      "submit": "继续",
      "checking": "正在读取您的网站...",
      "noWebsite": "我没有网站",
      "haveWebsite": "我有网站",
      "topicTitle": "选择一个主题",
      "topicHint": "我们会把关于这个主题的新闻网站作为您的第一个来源。之后可以更改。",
      "errors": {
        "empty": "请输入网站地址后继续。",
        "invalid": "这看起来不是网址。请检查拼写，例如 yourcompany.com。",
        "unreachable": "我们在这个页面上没有找到文章。请试试您的博客或新闻页面，例如 yourcompany.com/blog。",
        "network": "无法连接到我们的服务器。请检查网络连接后重试。"
      }
    },
    "readers": {
      "title": "谁会阅读您的新闻简报？",
      "why": "每期简报都会为这位读者、用这种语言撰写。使用其他语言的订阅者会收到各自的翻译版本。",
      "skipNote": "我们已根据您的网站填好这些内容。如有不对，请直接修改。",
      "languageLabel": "主要语言",
      "languageHint": "这是根据您的浏览器设置选择的。",
      "readerLabel": "您的理想读者",
      "readerHint": "一句话就够了。例如：里斯本的小餐馆老板。",
      "readerPlaceholder": "这份新闻简报是写给谁的？",
      "errors": {
        "reader": "请用几个词描述您的读者，让我们知道为谁写作。"
      }
    },
    "preview": {
      "title": "这是您的第一期简报",
      "why": "这就是订阅者会收到的邮件，根据您最新的文章撰写。目前还没有发送任何内容。",
      "generating": "正在根据您最新的文章撰写第一期简报，通常不到一分钟。",
      "inboxFrom": "发件人",
      "inboxTo": "收件人",
      "inboxSubject": "主题",
      "defaultSubject": "您的第一期简报",
      "sendTest": "给我发一封测试邮件",
      "sendingTest": "正在发送...",
      "testSent": "测试邮件已发送至 {email}。请查看收件箱和垃圾邮件文件夹。",
      "regenerate": "重新撰写",
      "looksGood": "没问题，继续",
      "skipPreview": "不预览，直接继续",
      "howTitle": "我们如何找到您的文章",
      "howBody": "我们保存了一条简短规则，用来标明您页面上文章链接的位置，这样菜单和广告会被忽略。只有当预览选错了内容时，您才需要修改它。",
      "ruleLabel": "文章规则",
      "findAgain": "重新查找文章",
      "errors": {
        "generate": "无法撰写这期简报。该页面可能阻止了自动读取。请重试，或返回并改用您的博客页面。",
        "test": "测试邮件没有发出。请稍后再试。"
      }
    },
    "senderName": {
      "title": "您的名字在收件箱中应如何显示？",
      "why": "订阅者会在每期简报旁看到这个名字，便于认出并打开。",
      "skipNote": "如果跳过，发件人会显示为 AIBAN。之后可以在设置中更改名字。",
      "label": "发件人名称",
      "hint": "您的名字、公司名或新闻简报的名称。最多 60 个字符。",
      "placeholder": "Silva Studio",
      "previewLabel": "在收件箱中的样子",
      "previewBody": "您的简报会以这个发件人名称显示，并从 AIBAN 的发信地址发出。",
      "save": "保存并继续",
      "errors": {
        "empty": "请输入至少 2 个字符的发件人名称。",
        "long": "发件人名称请不要超过 60 个字符。",
        "save": "无法保存名称。请稍后再试。"
      }
    },
    "signature": {
      "title": "邮件签名",
      "why": "签名会出现在每期简报的末尾，让读者知道是谁写的、怎样联系您。",
      "skipNote": "如果跳过，简报末尾只显示新闻简报的名称。",
      "nameLabel": "您的名字",
      "namePlaceholder": "Ana Silva",
      "roleLabel": "职位或公司",
      "rolePlaceholder": "创始人，Silva Studio",
      "linkLabel": "链接",
      "linkHint": "您的网站或社交媒体主页。可选。",
      "linkPlaceholder": "yourcompany.com",
      "previewLabel": "在邮件末尾的样子",
      "previewBody": "感谢阅读，下期再见。",
      "save": "保存签名",
      "existingNote": "您已经有签名了。在这里保存会替换它。"
    },
    "schedule": {
      "title": "新一期简报应在什么时候发送？",
      "why": "每次发送前，我们都会检查您的网站，并根据最新文章撰写新一期简报。",
      "skipNote": "您随时可以在控制台中更改日期和时间，或暂停发送。",
      "scheduleLabel": "发送时间",
      "frequencyLabel": "频率",
      "daily": "每天",
      "weekly": "每周",
      "monthly": "每月 1 日",
      "dayLabel": "日期",
      "timeLabel": "时间",
      "timeHint": "使用您的当地时间。",
      "recipeTitle": "自动发送新一期简报",
      "recipeBody": "按照上面的时间表，我们会挑选您最好的新文章，用您的口吻撰写，为每位读者翻译，然后通过邮件发送。",
      "recipeOn": "开启",
      "recipeOff": "关闭。只有当您点击“发送”时才会发出简报。",
      "save": "保存并继续",
      "saving": "正在保存您的新闻简报...",
      "errors": {
        "create": "无法保存您的新闻简报。请稍后再试。",
        "limit": "您的方案不允许再添加来源。如需添加，请写信给我们，我们会为您更改方案。"
      }
    },
    "send": {
      "title": "发送第一期简报",
      "why": "现在发送可以让您看到完整流程：简报会以读者的语言送达真实的收件箱。",
      "skipNote": "如果跳过，第一期简报会在您设定的时间发出。",
      "youAreSubscribed": "您已用 {email} 订阅。",
      "othersLabel": "邀请他人（可选）",
      "othersHint": "粘贴邮箱地址，用逗号或换行分隔。每个人都会收到一封来自您的个人邀请。只有接受邀请的人才会收到简报，30 天内无人接受的邀请会被删除。",
      "othersPlaceholder": "ana@example.com, li@example.com",
      "sendNow": "立即发送",
      "sending": "正在发送第一期简报...",
      "sentTitle": "第一期简报已在路上",
      "sentBody": "它会发给名单上所有已确认订阅的人。送达可能需要几分钟。",
      "invited": "已向 {count} 人发送邀请。他们接受后会加入您的名单。",
      "invitesUnavailable": "邀请功能暂不可用，所以我们没有保存这些地址。请在下一步复制您的订阅链接，自己发给他们。",
      "continue": "继续",
      "errors": {
        "invalidEmails": "这些地址看起来有误：{list}。请修改或删除。",
        "add": "无法邀请：{list}。请稍后在“订阅者”中重试。",
        "send": "简报没有发出。请稍后再试。"
      }
    },
    "share": {
      "title": "获得第一批订阅者",
      "why": "在这里注册的人会以自己的语言收到每期简报。",
      "skipNote": "之后您可以在“订阅者”中的“订阅表单”下找到这个链接和嵌入代码。",
      "linkLabel": "订阅页面",
      "linkHint": "分享到社交媒体、邮件页脚或二维码上。",
      "embedLabel": "用于您网站的订阅表单",
      "embedHint": "把这段代码粘贴到您网站上想显示表单的位置。",
      "copy": "复制",
      "copied": "已复制",
      "open": "打开订阅页面"
    },
    "done": {
      "title": "您的新闻简报已设置好",
      "why": "以下是接下来会发生的事，以及还需要完成的事项。",
      "planLine": "当前方案：{plan}",
      "changePlan": "查看方案",
      "toDashboard": "前往控制台",
      "summarySource": "来源：{url}",
      "summarySchedule": "时间表：{schedule}",
      "summaryAutomation": "自动发送：{state}",
      "on": "开启",
      "off": "关闭"
    }
  },
  "tutorial": {
    "checklistTitle": "入门",
    "checklistProgress": "已完成 {done}/{total}",
    "checklistDone": "全部完成。您的新闻简报现在会自动运行。",
    "dismiss": "隐藏清单",
    "doneLabel": "已完成",
    "todoLabel": "待完成",
    "show": "显示入门指南",
    "items": {
      "source": {
        "title": "添加内容来源",
        "body": "我们会检查新文章的网站或博客。"
      },
      "sender": {
        "title": "选择发件人名称",
        "body": "订阅者在每期简报旁看到的名字。"
      },
      "subscriber": {
        "title": "获得第一位订阅者",
        "body": "除您之外的某人注册或被添加。"
      },
      "send": {
        "title": "发送第一期简报",
        "body": "一期真实的简报会送到您名单上的人手中。"
      },
      "automation": {
        "title": "开启自动发送",
        "body": "新一期简报会按您的时间表发出。"
      },
      "widget": {
        "title": "把订阅表单添加到您的网站",
        "body": "访客不用离开您的网站就能订阅。"
      }
    },
    "open": "打开",
    "tour": {
      "start": "快速导览",
      "next": "下一步",
      "back": "返回",
      "skip": "跳过导览",
      "finish": "完成",
      "stepOf": "{current}/{total}"
    },
    "help": {
      "whatIsThis": "这是什么？",
      "whyItMatters": "为什么重要",
      "close": "关闭"
    }
  },
  "auth": {
    "emailLabel": "邮箱地址",
    "emailHint": "我们会向这个地址发送 6 位验证码。您不需要密码。",
    "codeTitle": "请查收邮件",
    "codeSentTo": "我们已向 {email} 发送 6 位验证码。",
    "codeHint": "验证码可能需要一分钟才能送达。也请查看垃圾邮件文件夹。",
    "changeEmail": "使用其他邮箱",
    "resend": "发送新验证码",
    "resendIn": "{seconds} 秒后可重新获取验证码",
    "resendLimit": "如果验证码仍未收到，请在帮助页面写信给我们，我们会帮您解决。",
    "resent": "我们已发送新验证码。",
    "verifying": "正在核对验证码...",
    "errors": {
      "email": "请输入完整的邮箱地址，例如 you@company.com。",
      "send": "无法发送验证码。请检查网络连接后重试。",
      "code": "验证码无效。请检查这 6 位数字，或获取新验证码。"
    }
  }
};
