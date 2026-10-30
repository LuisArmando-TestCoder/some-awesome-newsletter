// jp strings for locales. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale jp
export default {
  "auth": {
    "logo": "/icons/logo.png",
    "login": {
      "pageTitle": "ログイン",
      "title": "AIBAN にログイン",
      "subtitle": "接続して、中断したところから再開しましょう。",
      "google": "Google で続行",
      "or": "または",
      "emailPlaceholder": "you@example.com",
      "continueWithEmail": "メールアドレスで続行",
      "switchText": "アカウントをお持ちでないですか？",
      "switchLink": "新規登録",
      "switchHref": "/signup"
    },
    "signup": {
      "pageTitle": "新規登録",
      "title": "アカウントを作成",
      "subtitle": "クレジットカードは不要です。",
      "google": "Google で続行",
      "or": "または",
      "emailPlaceholder": "you@example.com",
      "continueWithEmail": "メールアドレスで続行",
      "switchText": "すでにアカウントをお持ちですか？",
      "switchLink": "ログイン",
      "switchHref": "/login"
    }
  },
  "landing": {
    "seo": {
      "title": "AIBAN | あなたのウェブサイトを、読者ごとの言語で届くニュースレターに",
      "description": "AIBAN は、すでに公開しているコンテンツを読み、あなたの言葉づかいでニュースレターの号を書き、あなたの名前で送ります。購読者はそれぞれ自分の言語で受け取ります。",
      "ogImageAlt": "AIBAN のロゴ"
    },
    "skipLink": "メインコンテンツへスキップ",
    "hero": {
      "eyebrow": "サービス業のためのニュースレター",
      "title": "あなたのウェブサイトが、読者ごとの言語で届く週刊ニュースレターになります",
      "lead": "AIBAN は、すでに公開しているコンテンツを読み、あなたの言葉づかいで号を書き、あなたの名前で送ります。購読者は全員、自分が読む言語で受け取ります。設定は一度だけで、その後は自動で続きます。",
      "formLabel": "あなたのウェブサイト",
      "formPlaceholder": "yourcompany.com",
      "formHint": "入力したアドレスからサンプル号を作成します。無料で始められ、カードは不要です。",
      "formSubmit": "ニュースレターをプレビュー",
      "formError": "yourcompany.com のようなウェブアドレスを入力してください。",
      "secondaryCta": "仕組みを見る"
    },
    "preview": {
      "badge": "サンプルプレビュー",
      "note": "これは仮のテキストを使ったサンプルレイアウトです。開始すると、AIBAN が最新の記事から実際の号を作成します。",
      "fromLabel": "差出人",
      "toLabel": "宛先",
      "subjectLabel": "件名",
      "languageLabel": "読者の言語",
      "readOnBlog": "ブログで読む",
      "startCta": "{site} で無料で始める",
      "startCtaGeneric": "無料で始める",
      "liveRegion": "{site} のサンプルプレビューを更新しました。"
    },
    "chain": {
      "eyebrow": "仕組み",
      "title": "入力は一度だけ。あとは自動で動きます",
      "lead": "ウェブサイトを AIBAN に一度登録するだけです。その後は、選んだスケジュールで以下の各ステップが自動で行われます。",
      "triggerLabel": "いつ",
      "actionLabel": "次に",
      "trigger": {
        "title": "月曜日の 9:00 になったら",
        "body": "毎日、毎週、毎月など、お好きなスケジュールを選べます。"
      },
      "steps": [
        {
          "title": "AIBAN が最新の記事を見つけます",
          "body": "ウェブサイトを確認し、理想の読者が最も関心を持ちそうな記事を選びます。"
        },
        {
          "title": "あなたの文体で号を作成します",
          "body": "サイトの書き方をもとに、あなたらしい文章に書き直します。"
        },
        {
          "title": "読者ごとに号を翻訳します",
          "body": "購読者は全員、登録時に選んだ言語で受け取ります。"
        },
        {
          "title": "あなたの名前で送信",
          "body": "読者にはあなたの名前が表示され、返信はあなたの受信トレイに届きます。"
        },
        {
          "title": "号をブログに公開します",
          "body": "各号には、専用リンク付きの公開記事ページも作成されます。"
        },
        {
          "title": "結果をお知らせします",
          "body": "ダッシュボードで、新しい購読者と読者がクリックしたリンクを確認できます。"
        }
      ],
      "alsoTitle": "次の場合にも動きます",
      "also": [
        {
          "title": "誰かがあなたのサイトで登録したとき",
          "body": "メールで確認すると、号の受信が始まります。"
        },
        {
          "title": "リンクやテキストを貼り付けたとき",
          "body": "AIBAN が同じ手順で、その内容についての号を作成して送信します。"
        },
        {
          "title": "連絡先リストをアップロードしたとき",
          "body": "AIBAN がリストを整理し、重複を削除し、各連絡先の言語を推定します。"
        }
      ]
    },
    "languages": {
      "eyebrow": "あらゆる言語",
      "title": "読者はそれぞれ自分の言語で号を受け取ります",
      "body": "言語ごとに別の版を書く必要はありません。AIBAN は各号を購読者が読むすべての言語に翻訳し、どの言語でもあなたのトーンを保ちます。対応言語には、スペイン語、ポルトガル語、フランス語、ドイツ語、ヒンディー語、アラビア語、日本語などがあります。",
      "sampleNote": "同じサンプル号を、3 人の読者が受け取る形で表示しています。"
    },
    "sender": {
      "eyebrow": "あなたのアドレス",
      "title": "あなたの名前で届きます",
      "body": "各号はあなたの名前とメール署名付きで届きます。AIBAN は自社の認証済みアドレスから送信するため、メールのパスワードを私たちに教える必要はありません。読者が返信すると、返信はあなたの受信トレイに届きます。",
      "inboxLabel": "読者の受信トレイでの表示",
      "inboxFrom": "あなた",
      "inboxSubject": "今週の {site}",
      "inboxSnippet": "最新記事の短い要約を、あなたの文体で。",
      "inboxTime": "9:00"
    },
    "grow": {
      "eyebrow": "リストを増やす",
      "title": "サイト用の登録フォームと、自動で更新されるブログ",
      "items": [
        {
          "title": "登録フォーム",
          "body": "AIBAN のフォームをウェブサイトに追加します。新しい読者は言語を選び、メールで登録を確認します。"
        },
        {
          "title": "自動ブログ",
          "body": "すべての号が公開記事ページになり、検索で見つけたりリンクで共有したりできます。"
        },
        {
          "title": "連絡先のインポート",
          "body": "既存の顧客を CSV や Excel ファイルから取り込むか、リストを貼り付けます。"
        }
      ]
    },
    "useCases": {
      "eyebrow": "対象",
      "title": "人とのつながりで成長するビジネスのために",
      "lead": "紹介や信頼から顧客が生まれるなら、定期的な便りがあなたを思い出してもらうきっかけになります。AIBAN がその便りを代わりに書きます。",
      "items": [
        {
          "title": "制作会社とウェブデザイナー",
          "body": "最新の実績や記事を毎週、顧客や見込み客に送れます。クライアントのサイトにも同じ設定を使えます。"
        },
        {
          "title": "IT 企業とソフトウェア企業",
          "body": "リリースノートやブログ記事を、各顧客が自分の言語で読める短いお知らせにします。"
        },
        {
          "title": "不動産",
          "body": "新着物件や市況の記事を、異なる言語を話す買い手や売り手と共有できます。"
        },
        {
          "title": "弁護士と会計士",
          "body": "普段から書いているテーマについて、落ち着いた一貫した形式で顧客に情報を届けます。"
        },
        {
          "title": "コーチとトレーナー",
          "body": "最新のレッスンや記事を、書き直すことなく決まった曜日にコミュニティへ送れます。"
        }
      ]
    },
    "pricingIntro": {
      "eyebrow": "料金",
      "title": "無料で始めて、リストが増えたらアップグレード",
      "lead": "無料プランには、ソース 1 件と最大 100 人の購読者が含まれます。有料プランでは、ソースと購読者の上限が増えます。"
    },
    "faqTitle": "始める前によくある質問",
    "faq": [
      {
        "id": "what-do-i-need",
        "q": "始めるには何が必要ですか？",
        "a": "ウェブサイトのアドレスとメールアドレスです。AIBAN はサイトを読み取り、扱うテーマと文体を学びます。"
      },
      {
        "id": "do-i-write",
        "q": "自分で何か書く必要がありますか？",
        "a": "必要ありません。AIBAN があなたのコンテンツから各号を作成します。特定の内容について号を作りたいときは、リンクやテキストを貼り付けられます。"
      },
      {
        "id": "languages",
        "q": "読者はどの言語で受け取れますか？",
        "a": "AIBAN は各号を、購読者それぞれが読む言語に翻訳します。対応言語の一覧は、ニュースレターの設定時に確認できます。"
      },
      {
        "id": "sender",
        "q": "メールは誰から届きますか？",
        "a": "AIBAN の送信用アドレスから、あなたの名前を送信者として送ります。返信はあなたの受信トレイに直接届きます。メールのパスワードを私たちに教える必要はありません。"
      },
      {
        "id": "contacts",
        "q": "既存の連絡先を取り込めますか？",
        "a": "はい。CSV や Excel ファイルをアップロードするか、リストを貼り付けてください。AIBAN が整理し、重複を削除し、各連絡先の言語を推定します。"
      },
      {
        "id": "schedule",
        "q": "号はどのくらいの頻度で送信されますか？",
        "a": "スケジュールは設定時に選び、ダッシュボードでいつでも変更できます。"
      },
      {
        "id": "free-plan",
        "q": "無料プランはありますか？",
        "a": "はい。無料プランには、ソース 1 件と最大 100 人の購読者が含まれます。有料プランでは、ソースと購読者の上限が増えます。"
      },
      {
        "id": "cancel",
        "q": "解約できますか？",
        "a": "はい。いつでも info@aiban.news にご連絡いただければ、有料プランを解約するか、無料プランに戻します。"
      }
    ],
    "finalCta": {
      "title": "まずはウェブサイトから",
      "body": "ウェブサイトを AIBAN に登録し、最初の号を確認して、準備ができたらオンにしてください。",
      "cta": "無料で始める",
      "secondary": "ヘルプセンターを読む"
    },
    "footer": {
      "tagline": "あなた自身のコンテンツから作成し、読者ごとの言語で送るニュースレター。",
      "product": "製品",
      "company": "会社",
      "legal": "法的情報",
      "links": {
        "howItWorks": "仕組み",
        "pricing": "料金",
        "demo": "デモ",
        "help": "ヘルプセンター",
        "about": "AIBAN について",
        "careers": "採用情報",
        "privacy": "プライバシーポリシー",
        "terms": "利用規約",
        "cookies": "Cookie ポリシー"
      },
      "contactLabel": "お問い合わせ",
      "rights": "All rights reserved."
    }
  },
  "help": {
    "title": "上限緩和のリクエスト",
    "subtitle": "必要な上限をお知らせください。メールでご返信します。",
    "contact": {
      "cta": "リクエストを送信",
      "successTitle": "リクエストの送信準備ができました",
      "successBody": "メールアプリにリクエストが入力された状態で開きました。そこから送信していただければ、メールでご返信します。",
      "learnMore": "/plans"
    },
    "questions": {
      "desiredLimitsHelp": "購読者数やソース数など、必要な上限をお知らせください。",
      "useCaseHelp": "何を、誰に、どのくらいの頻度で送るかを教えてください。",
      "expectedSpendHelp": "おおよその金額がわかると、プランをご提案しやすくなります。不明のままでもかまいません。"
    },
    "form": {
      "nameLabel": "お名前",
      "emailLabel": "メールアドレス",
      "companyLabel": "会社名",
      "optional": "（任意）",
      "limitsLabel": "必要な上限",
      "useCaseLabel": "AIBAN の使い方",
      "spendLabel": "想定している月額の費用",
      "spend": {
        "lt500": "$500 未満",
        "500_2k": "$500 から $2,000",
        "2k_10k": "$2,000 から $10,000",
        "gt10k": "$10,000 超",
        "unknown": "まだわかりません"
      },
      "urgencyLabel": "緊急度",
      "urgency": {
        "low": "低",
        "normal": "通常",
        "high": "高"
      },
      "replyLabel": "返信方法はどうしますか？",
      "reply": {
        "email": "メール",
        "call": "電話"
      },
      "payAsYouGo": "従量課金に興味があります",
      "sending": "送信中...",
      "sentTitle": "リクエストを送信しました",
      "sentBody": "リクエストを受け付けました。入力いただいたメールアドレスに返信します。",
      "retryBefore": "メールアプリが開かなかった場合は、",
      "retryLink": "リクエストをもう一度開く",
      "retryAfter": "か、次のアドレスにご連絡ください：",
      "errors": {
        "name": "お名前を入力してください（2 文字以上）。",
        "email": "返信先のメールアドレスを入力してください（例：name@example.com）。",
        "company": "2 文字以上入力するか、空欄のままにしてください。",
        "desiredLimits": "必要な上限を 10 文字以上で記入してください。",
        "useCase": "使い方を 20 文字以上で記入してください。"
      }
    },
    "faqs": [
      {
        "id": "limits-how",
        "q": "上限緩和はどのように行われますか？",
        "a": "必要な上限を記入してリクエストを送信してください。お客様のアカウントで選べる内容をメールでご返信します。"
      }
    ],
    "links": {
      "docs": "/plans",
      "community": "/help"
    }
  },
  "faq": [
    {
      "q": "AIBAN では何ができますか？",
      "a": "AIBAN は、Web サイト、ブログ、選んだニュースサイトなど、すでに公開しているコンテンツを読みます。それをもとにあなたの言葉づかいで新しい号を書き、ニュースレターとして送ります。購読者は自分が選んだ言語で受け取り、送信者にはあなたの名前が表示されます。"
    },
    {
      "q": "無料プランはありますか？",
      "a": "はい。無料プランにはソース 1 件と最大 100 人の購読者が含まれます。さらに必要な場合はご連絡ください。プランを変更します。"
    },
    {
      "q": "購読者はどのように自分の言語でニュースレターを受け取りますか？",
      "a": "購読者は登録時に希望の言語を選びます。AIBAN は送信前に、すべての号をその言語に翻訳します。"
    },
    {
      "q": "自分のメールアドレスから号を送信できますか？",
      "a": "各号は AIBAN の送信用アドレスから、あなたの名前とメール署名付きで送られ、返信はあなたの受信トレイに届きます。メールのパスワードをお聞きすることはないため、あなたのパスワードが漏れることもありません。"
    },
    {
      "q": "購読者はどうやって登録しますか？",
      "a": "登録ページと、ウェブサイトに設置できる登録ウィジェットが用意されます。自分で購読者を追加したり、リストをアップロードしたりもできます。"
    },
    {
      "q": "いつでも解約できますか？",
      "a": "はい。いつでも info@aiban.news にご連絡いただければ、有料プランを解約するか、無料プランに戻します。"
    }
  ],
  "plans": {
    "currency": "USD",
    "billingIntervals": [
      "月払い",
      "年払い"
    ],
    "currentPlan": "free",
    "plans": [
      {
        "id": "free",
        "name": "Free（無料）",
        "monthly": 0,
        "yearly": 0,
        "tagline": "ソース 1 件で AIBAN を試す",
        "featuresBase": [
          "ソース 1 件",
          "購読者 最大 100 人"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": 1,
          "users": 100
        },
        "ctaLabel": "現在のプラン",
        "tier": 0
      },
      {
        "id": "starter",
        "name": "Starter",
        "monthly": 17,
        "yearly": 132,
        "tagline": "成長中のニュースレター向け",
        "featuresBase": [
          "ソース 5 件",
          "購読者 最大 10 万人"
        ],
        "featuresDelta": [
          "メールサポート",
          "基本翻訳機能"
        ],
        "limits": {
          "newsSources": 5,
          "users": 100000
        },
        "ctaLabel": "Starter を選択",
        "productId": "prod_starter_id",
        "tier": 1
      },
      {
        "id": "growth",
        "name": "Growth",
        "monthly": 35,
        "yearly": 273,
        "tagline": "定着したニュースレター向け",
        "featuresBase": [
          "ソース 17 件",
          "購読者 最大 25 万人"
        ],
        "featuresDelta": [
          "カスタムブランディング",
          "高度な分析"
        ],
        "limits": {
          "newsSources": 17,
          "users": 250000
        },
        "ctaLabel": "Growth を選択",
        "productId": "prod_growth_id",
        "tier": 2
      },
      {
        "id": "pro",
        "name": "Pro",
        "monthly": 80,
        "yearly": 624,
        "tagline": "マーケティングのプロ向け",
        "featuresBase": [
          "ソース 25 件",
          "購読者 最大 50 万人"
        ],
        "featuresDelta": [
          "API アクセス",
          "優先処理"
        ],
        "limits": {
          "newsSources": 25,
          "users": 500000
        },
        "ctaLabel": "Pro を選択",
        "productId": "prod_pro_id",
        "tier": 3
      },
      {
        "id": "master",
        "name": "Master",
        "monthly": 150,
        "yearly": 1170,
        "tagline": "大規模な読者向け",
        "featuresBase": [
          "ソース 50 件",
          "購読者数 無制限"
        ],
        "featuresDelta": [
          "個別導入サポート",
          "カスタム Webhook"
        ],
        "limits": {
          "newsSources": 50,
          "users": -1
        },
        "ctaLabel": "Master を選択",
        "productId": "prod_master_id",
        "tier": 4
      },
      {
        "id": "vipfree",
        "name": "VIP 無料",
        "monthly": 0,
        "yearly": 0,
        "tagline": "パートナー向けフルアクセス",
        "featuresBase": [
          "ソース無制限",
          "購読者数 無制限"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": -1,
          "users": -1
        },
        "ctaLabel": "現在のプラン",
        "internalOnly": true,
        "tier": 5
      }
    ],
    "contact": {
      "text": "カスタムソリューションが必要ですか？",
      "cta": "お問い合わせ",
      "href": "/help"
    }
  },
  "article": {
    "notFound": "記事が見つかりませんでした。",
    "errorFetching": "この記事を読み込めませんでした。1 分ほどしてからページを再読み込みしてください。",
    "noArticleSpecified": "記事が指定されていません。",
    "goBack": "戻る",
    "loading": "読み込み中..."
  },
  "pricing": {
    "eyebrow": "料金",
    "title": "プランと料金",
    "currentPlan": "現在のプラン：",
    "monthly": "月払い",
    "yearly": "年払い",
    "yearlySave": "35% お得",
    "intervalLabel": "請求期間",
    "billedYearly": "年払いで請求",
    "perMonthShort": "/mo",
    "perYearShort": "/yr",
    "freeCta": "無料で始める",
    "processing": "決済ページを開いています...",
    "askMore": "すべてのアカウントは無料プランから始まります。さらに必要な場合は {email} までご連絡ください。プランを変更します。",
    "askFor": "{planName} を申し込む",
    "askAction": "お問い合わせ",
    "checkoutError": "決済ページを開けませんでした。少し時間をおいてもう一度お試しください。",
    "networkError": "サーバーに接続できませんでした。接続を確認して、もう一度お試しください。",
    "includes": "含まれるもの",
    "pageMetaTitle": "料金 | AIBAN",
    "pageMetaDescription": "AIBAN のプランと料金。ソース 1 件、購読者最大 100 人まで無料で始め、必要になったら月額または年額のプランに移行できます。",
    "pageTitle": "料金",
    "pageLead": "まずは無料プランで、ソース 1 件と購読者最大 100 人から始めましょう。ソースや購読者を増やしたいときはご連絡ください。月額または年額の有料プランに切り替えます。",
    "faqTitle": "請求に関する質問",
    "contactText": "より高い上限や個別の設定が必要ですか？",
    "contactCta": "お問い合わせ",
    "everythingIn": "前プランの全機能に加え:",
    "isCurrentPlan": "これは現在のプランです",
    "downgradeTo": "{planName} に切り替える",
    "upgradeTo": "{planName} を選ぶ",
    "mockMode": "テストモード",
    "mostPopular": "一番人気",
    "perMonth": "月あたり",
    "perYear": "年あたり",
    "youSave": "節約額:"
  },
  "confirmSubscription": {
    "title": "購読を確認してください",
    "goBack": "戻る",
    "pleaseAccept": "規約に同意して購読を完了してください。",
    "iAccept": "私は",
    "termsAndConditions": "利用規約",
    "and": "および",
    "privacyPolicy": "プライバシーポリシー",
    "confirm": "購読を確認する",
    "mustAccept": "購読するには規約への同意が必要です。",
    "invalidLink": "この確認リンクは不完全です。最新のメールを開き、その中のリンクを使ってください。"
  },
  "articles": {
    "title": "最新の記事",
    "subtitle": "AIBAN が配信するニュースレター用に書いた記事です。",
    "producedIn": "これらの記事が読める言語",
    "searchPlaceholder": "記事を検索...",
    "noArticlesFound": "記事が見つかりませんでした。",
    "created": "作成日:",
    "language": "言語:",
    "rightsReserved": "無断転載を禁じます。",
    "errorFetching": "記事を読み込めませんでした。1 分ほどしてからページを再読み込みしてください。"
  },
  "blog": {
    "metaTitle": "{name} のブログ",
    "metaDescription": "{name} の記事。購読すると新しい記事をメールで受け取れます。",
    "eyebrow": "ニュースレターのブログ",
    "heroFrom": "{name} の記事",
    "heroDescription": "このニュースレターがこれまでに公開した記事です。購読すると新しい記事をメールで受け取れます。",
    "subscribe": "購読する",
    "home": "ブログのホーム",
    "featured": "最新の記事",
    "latest": "最新の記事",
    "latestHint": "新しい順に表示しています。画像のない記事はテキストのみで表示されます。",
    "articleCount": "{language} の記事 {count} 件",
    "articleCountOne": "{language} の記事 1 件",
    "languages": "言語を選択",
    "minRead": "{n} 分で読めます",
    "readArticle": "記事を読む",
    "page": "{page} ページ",
    "newer": "新しい記事",
    "older": "以前の記事",
    "pagination": "記事のページ",
    "emptyTitle": "まだ記事がありません",
    "emptyBody": "このニュースレターはまだここに記事を公開していません。購読すると最初の記事をメールで受け取れます。",
    "endTitle": "これより前の記事はありません",
    "endBody": "一覧の最後まで表示しました。",
    "backToNewest": "最新の記事へ移動",
    "errorTitle": "記事を読み込めませんでした",
    "errorBody": "記事サーバーが時間内に応答しませんでした。1 分ほどしてからページを再読み込みしてください。",
    "reload": "ページを再読み込み",
    "missingHolder": "このブログのリンクは、どのブログを開くかが含まれていないため不完全です。ニュースレターの運営者に完全なリンクを確認してください。",
    "redirecting": "ブログを開いています...",
    "publishedWith": "AIBAN で公開",
    "cta": {
      "title": "次の記事をメールで受け取る",
      "body": "{name} を購読すると、新しい記事が受信トレイに届きます。購読はいつでも解除できます。",
      "button": "購読する"
    },
    "search": {
      "label": "記事を検索",
      "placeholder": "単語やフレーズで検索",
      "button": "検索",
      "suggestions": "候補",
      "recent": "最近の検索",
      "clearRecent": "最近の検索を消去",
      "title": "検索結果",
      "resultsFor": "「{q}」の検索結果",
      "count": "{count} 件の記事が見つかりました",
      "countOne": "1 件の記事が見つかりました",
      "searching": "記事を検索しています",
      "emptyTitle": "「{q}」に一致する記事はありません",
      "emptyBody": "つづりを確認するか、短い単語でお試しください。ブログのすべての記事を一覧で見ることもできます。",
      "browseAll": "すべての記事を見る",
      "noQuery": "このブログを検索するには、上に単語やフレーズを入力してください。",
      "error": "記事サーバーが応答しなかったため、検索が止まりました。1 分ほどしてからもう一度お試しください。",
      "tryAgain": "再試行",
      "limitNote": "最初の {count} 件を表示しています。絞り込むには、より具体的なフレーズを使ってください。"
    },
    "article": {
      "back": "すべての記事",
      "published": "{date} 公開",
      "by": "著者：{name}",
      "otherLanguages": "ほかの言語で読む",
      "otherLanguagesHint": "このニュースレターは以下の言語でも公開しています。各リンクから、その言語のブログが開きます。",
      "share": "この記事を共有",
      "copyLink": "リンクをコピー",
      "copied": "リンクをコピーしました。どこにでも貼り付けられます。",
      "copyFailed": "リンクをコピーできませんでした。ブラウザのアドレスバーからコピーしてください。",
      "notFoundTitle": "記事が見つかりません",
      "notFoundBody": "この記事は削除されたか、リンクが不完全な可能性があります。ブログを開いてほかの記事をご覧ください。",
      "errorTitle": "この記事を読み込めませんでした",
      "errorBody": "記事サーバーが時間内に応答しませんでした。1 分ほどしてからページを再読み込みしてください。",
      "goToBlog": "ブログへ移動"
    }
  },
  "nav": {
    "mainLabel": "メイン",
    "legalLabel": "法的情報",
    "home": "AIBAN ホーム",
    "menu": "メニュー",
    "openMenu": "メニューを開く",
    "closeMenu": "メニューを閉じる",
    "howItWorks": "仕組み",
    "pricing": "料金",
    "help": "ヘルプ",
    "about": "AIBAN について",
    "privacy": "プライバシー",
    "terms": "規約",
    "cookies": "Cookie",
    "signOut": "ログアウト",
    "chooseLanguage": "言語を選択",
    "currentLanguage": "言語：{name}"
  },
  "about": {
    "metaTitle": "AIBAN について | AIBAN",
    "metaDescription": "AIBAN は、企業がすでに公開しているコンテンツを、自動で配信されるニュースレターに変えます。購読者それぞれの言語で、オーナーの名前で届きます。",
    "eyebrow": "概要",
    "title": "AIBAN について",
    "lead": "AIBAN は、企業がすでに公開しているコンテンツを、自動で配信されるニュースレターに変えます。購読者はそれぞれ自分の言語で読み、ニュースレターはオーナーの名前で届きます。",
    "whatTitle": "AIBAN でできること",
    "whatBody": [
      "ウェブサイト、ブログ、フォローしているニュースサイトなど、コンテンツがある場所を AIBAN に伝えます。そこに新しいものが公開されると、AIBAN は指定された文体で号を作成し、選んだスケジュールで購読者に送信します。",
      "購読者は登録時に言語を選び、各号は送信前にその言語に翻訳されます。記事はウェブページとしても公開され、ご自身のサイトに送ることもできます。"
    ],
    "whoTitle": "開発者",
    "whoBody": [
      "AIBAN は、創業者の Luis Murillo Baltodano が開発しています。Luis は、コンピューターグラフィックスと自動化を専門とするクリエイティブエンジニアです。",
      "彼のオープンソースの成果の一部を以下に掲載しています。"
    ],
    "projectsTitle": "創業者のオープンソースの成果",
    "projects": [
      {
        "name": "Scene Preset",
        "url": "https://github.com/LuisArmando-TestCoder/scene-preset",
        "desc": "Three.js や 3D ウェブ API を扱う際の定型コードを減らすライブラリです。"
      },
      {
        "name": "Canvas Preset",
        "url": "https://github.com/LuisArmando-TestCoder/canvas-preset",
        "desc": "Canvas API でよく行う作業のためのヘルパーです。"
      },
      {
        "name": "Atomic Gatsby テンプレート",
        "url": "https://github.com/LuisArmando-TestCoder/atomic-gatsby-typescript-recoiljs",
        "desc": "アトミックデザインで構成したスターターテンプレートです。"
      }
    ],
    "githubLabel": "Luis の GitHub",
    "newTab": "（新しいタブで開きます）",
    "contactTitle": "お問い合わせ",
    "contactBody": "ご質問、ご意見、提携のご提案は info@aiban.news までお送りください。",
    "emailCta": "info@aiban.news にメールする",
    "startCta": "無料で始める",
    "helpCta": "ヘルプセンターを読む"
  },
  "careers": {
    "metaTitle": "採用情報 | AIBAN",
    "metaDescription": "AIBAN では現在募集中の職種はありません。info@aiban.news へのご連絡はいつでも受け付けています。",
    "eyebrow": "採用情報",
    "title": "AIBAN の採用情報",
    "lead": "AIBAN では現在募集中の職種はありません。",
    "body": "募集を開始したときは、このページに掲載します。将来 AIBAN に携わりたい方は、ご自身のことと作りたいものについて短いメッセージをお送りください。",
    "emailCta": "info@aiban.news にメールする",
    "emailSubject": "AIBAN で働くことについて",
    "aboutCta": "AIBAN について読む"
  },
  "legal": {
    "navLabel": "法的文書",
    "lastUpdated": "最終更新日：{date}",
    "privacy": {
      "title": "プライバシーポリシー",
      "metaTitle": "プライバシーポリシー | AIBAN",
      "metaDescription": "AIBAN がどのようにデータを収集、利用、保護するか、またデータに関する権利の行使方法について説明します。"
    },
    "terms": {
      "title": "利用規約",
      "metaTitle": "利用規約 | AIBAN",
      "metaDescription": "アカウントを作成して AIBAN を利用する際に適用される規約です。"
    },
    "cookies": {
      "title": "Cookie ポリシー",
      "metaTitle": "Cookie ポリシー | AIBAN",
      "metaDescription": "AIBAN が使用する Cookie の種類、その役割、保存期間、管理方法について説明します。"
    }
  },
  "demoPage": {
    "metaTitle": "デモ | AIBAN",
    "metaDescription": "AIBAN の紹介動画を見て、ウェブサイトの追加から最初の号の送信まで、登録後の流れを確認できます。",
    "eyebrow": "デモ",
    "title": "AIBAN の仕組みを見る",
    "lead": "紹介動画を見てから、登録後の流れをお読みください。",
    "videoTitle": "AIBAN の紹介動画",
    "playLabel": "紹介動画を再生",
    "videoNote": "動画は YouTube から再生されます。",
    "stepsTitle": "登録後の流れ",
    "steps": [
      {
        "title": "ウェブサイトを追加",
        "body": "あなたのサイト、ブログ、またはフォローしているニュースサイトのアドレスを入力します。AIBAN がそこから新しいコンテンツを読み取ります。"
      },
      {
        "title": "読者と文体を説明",
        "body": "ニュースレターの読者と、どんな語り口にしたいかを AIBAN に伝えます。サイトから説明文を提案させることもできます。"
      },
      {
        "title": "スケジュールを選択",
        "body": "号を送る頻度を選びます。あとからダッシュボードで変更できます。"
      },
      {
        "title": "購読者を追加",
        "body": "リストをアップロードする、1 人ずつ追加する、または登録ページやウィジェットを共有します。購読者はそれぞれ言語を選びます。"
      },
      {
        "title": "送信者名と署名を追加する",
        "body": "読者に表示される名前とメール署名を追加します。AIBAN は認証済みのアドレスからあなたの名前で各号を送り、返信はあなたの受信トレイに届きます。"
      }
    ],
    "ctaTitle": "ご自身のウェブサイトで試す",
    "ctaBody": "無料プランには、ソース 1 件と最大 100 人の購読者が含まれます。",
    "primaryCta": "無料で始める",
    "secondaryCta": "料金を見る"
  },
  "helpCenter": {
    "metaTitle": "ヘルプ | AIBAN",
    "metaDescription": "AIBAN の設定に関する回答：ソース、言語、あなたの名前での送信、購読者、登録ウィジェット、ブログ、請求。",
    "eyebrow": "ヘルプセンター",
    "title": "どのようなことでお困りですか？",
    "lead": "ニュースレターの設定と運用に関する回答をまとめています。探している情報が見つからない場合は、お問い合わせください。",
    "searchLabel": "ヘルプセンターを検索",
    "searchPlaceholder": "例：言語、ウィジェット、解約",
    "clearSearch": "検索をクリア",
    "resultsCount": "検索に一致する回答が {count} 件あります。",
    "noResults": "検索に一致する回答はありません。別の単語で試すか、info@aiban.news までメールしてください。",
    "topicsLabel": "トピック",
    "copyLink": "リンクをコピー",
    "linkCopied": "リンクをコピーしました",
    "contactTitle": "解決しませんでしたか？",
    "contactBody": "登録したメールアドレスを添えて、info@aiban.news までご連絡ください。",
    "emailCta": "info@aiban.news にメールする",
    "limitsTitle": "上限の引き上げをリクエスト",
    "limitsBody": "必要な上限をお知らせください。メールで返信します。このページからリクエストを送信できない場合は、内容が入力された状態でメールアプリが開くので、そのまま送ってください。",
    "faqFilterLabel": "質問を絞り込む",
    "faqNoMatch": "条件に一致する質問はありません。",
    "groups": [
      {
        "id": "getting-started",
        "title": "はじめに",
        "items": [
          {
            "id": "what-is-aiban",
            "q": "AIBAN とは何ですか？",
            "a": "AIBAN は、すでに公開しているコンテンツを定期的なニュースレターに変えます。ウェブサイト、ブログ、選んだニュースサイトを読み取り、あなたの文体で新しい号を作成して購読者に送信します。購読者はそれぞれ自分が選んだ言語で読みます。"
          },
          {
            "id": "how-to-start",
            "q": "どうやって始めればよいですか？",
            "a": "登録ページでアカウントを作成してください。設定では、サイトのアドレスと読者に関するいくつかの情報を入力します。その後、購読者を追加し、すべてをダッシュボードで管理できます。"
          },
          {
            "id": "change-settings",
            "q": "設定はあとから変更できますか？",
            "a": "はい。ソース、スケジュール、送信者情報、購読者は後からダッシュボードで変更できます。プランを変更するには info@aiban.news までご連絡ください。"
          }
        ]
      },
      {
        "id": "sources",
        "title": "ソースとコンテンツ",
        "items": [
          {
            "id": "what-is-a-source",
            "q": "何をソースとして使えますか？",
            "a": "ソースとは、AIBAN が新しいコンテンツを読み取るウェブアドレスです。あなたのウェブサイト、ブログ、フォローしているニュースサイトなどが該当します。ソースはダッシュボードで追加します。追加できる数はプランによって異なります。"
          },
          {
            "id": "how-often",
            "q": "ニュースレターはどのくらいの頻度で送信されますか？",
            "a": "公開の頻度は、ソースを設定するときに選びます。スケジュールはあとからダッシュボードで変更できます。"
          },
          {
            "id": "your-voice",
            "q": "AIBAN はどのように私の文体で書くのですか？",
            "a": "ニュースレターの個性を説明するか、AIBAN に説明文を生成させます。号はその説明をもとに作成されます。説明はダッシュボードでいつでも編集できます。"
          }
        ]
      },
      {
        "id": "languages",
        "title": "言語",
        "items": [
          {
            "id": "subscriber-language",
            "q": "購読者はどのように自分の言語でニュースレターを受け取りますか？",
            "a": "購読者は登録時に希望の言語を選びます。AIBAN は送信前に、すべての号をその言語に翻訳します。"
          },
          {
            "id": "site-language",
            "q": "サイトを自分の言語で使えますか？",
            "a": "はい。画面右下の言語ボタンで、サイトとダッシュボードの言語を切り替えられます。"
          }
        ]
      },
      {
        "id": "sending",
        "title": "あなたの名前で送信",
        "items": [
          {
            "id": "own-address",
            "q": "自分のメールアドレスから号を送信できますか？",
            "a": "各号は AIBAN の送信用アドレスから、あなたの送信者名とメール署名付きで送られ、返信はあなたの受信トレイに届きます。メールのパスワードをお聞きすることはないため、あなたのパスワードが漏れることもありません。"
          },
          {
            "id": "app-password",
            "q": "メールのパスワードを AIBAN に教える必要はありますか？",
            "a": "いいえ。AIBAN がメールのパスワードやアプリパスワードを求めることはありません。各号は AIBAN のアドレスからあなたの名前で送られ、返信はあなたに届きます。"
          }
        ]
      },
      {
        "id": "subscribers",
        "title": "購読者と登録ウィジェット",
        "items": [
          {
            "id": "add-subscribers",
            "q": "購読者はどうやって追加しますか？",
            "a": "ダッシュボードで 1 人ずつ追加するか、リストのファイルをアップロードできます。登録ページや登録ウィジェットから参加してもらうこともできます。"
          },
          {
            "id": "signup-widget",
            "q": "登録ウィジェットとは何ですか？",
            "a": "ウィジェットは、ご自身のウェブサイトに設置できる登録フォームです。訪問者がメールアドレスを入力して言語を選ぶと、リストに追加されます。"
          },
          {
            "id": "subscriber-limit",
            "q": "購読者数に上限はありますか？",
            "a": "プランごとに購読者数の上限があります。無料プランは最大 100 人までです。ほかのプランの上限は料金ページに記載しています。"
          }
        ]
      },
      {
        "id": "blog",
        "title": "ブログ",
        "items": [
          {
            "id": "blog-pages",
            "q": "ニュースレターの記事はウェブに公開されますか？",
            "a": "はい。AIBAN がニュースレター用に作成した記事はウェブページとしても公開され、受信トレイ以外でも読めます。"
          },
          {
            "id": "post-to-site",
            "q": "記事を自分のウェブサイトに投稿できますか？",
            "a": "はい。ダッシュボードで Webhook を設定すると、ニュースレターの各記事を投稿としてウェブサイトに送れます。WordPress のほか、標準的な REST コンテンツを受け付けるプラットフォームで使えます。"
          }
        ]
      },
      {
        "id": "billing",
        "title": "請求",
        "items": [
          {
            "id": "free-plan",
            "q": "無料プランはありますか？",
            "a": "はい。無料プランには、ソース 1 件と最大 100 人の購読者が含まれます。さらに必要になったら有料プランに移行できます。"
          },
          {
            "id": "monthly-yearly",
            "q": "月払いと年払いを選べますか？",
            "a": "はい。有料プランは月額または年額で請求されます。年額は、月額で 12 か月払うより 35% 安くなります。プランを選ぶには info@aiban.news までご連絡ください。"
          },
          {
            "id": "cancel",
            "q": "いつでも解約できますか？",
            "a": "はい。いつでも info@aiban.news にご連絡いただければ、有料プランを解約するか、無料プランに戻します。"
          },
          {
            "id": "higher-limits",
            "q": "最上位プランより多く必要な場合は？",
            "a": "ヘルプページのリクエストフォームから、必要な上限をお知らせください。メールでご返信します。"
          }
        ]
      }
    ]
  },
  "mainPage": {
    "skipToMainContent": "メインコンテンツへスキップ",
    "dismissAnnouncement": "お知らせを閉じる",
    "problem": "課題:",
    "outcome": "解決策:",
    "disclaimer": "35% の割引は年払いの場合にのみ適用されます。"
  },
  "authForm": {
    "emailValidation": "メールアドレスを入力してください（例：name@example.com）。",
    "failedToSendCode": "コードを送信できませんでした。メールアドレスを確認し、1 分ほどしてからもう一度お試しください。",
    "sending": "送信中...",
    "codeSent": "メールにコードを送信しました。",
    "invalidCode": "コードが正しくありません。最新のメールを確認するか、コードを再送信してください。",
    "regenerateCode": "コードを再送する",
    "back": "戻る",
    "byProceeding": "続行することで、以下に同意したことになります：",
    "termsOfService": "利用規約",
    "and": "および",
    "privacyPolicy": "プライバシーポリシー",
    "appName": "AI Newsletter"
  },
  "welcome": {
    "title": "自動ニュースレタージェネレーター",
    "setItOnce": "設定は一度だけ。",
    "useItForever": "その後は自動で続きます。"
  },
  "lead": {
    "title": "購読者をサイト訪問者に変える",
    "recommendation": "ウェブサイトを接続して、AI があなたのブランドを理解できるようにしましょう。",
    "question": "Web サイトはありますか？（任意、後から追加できます）",
    "placeholder": "https://your-site.com"
  },
  "newsSource": {
    "title": "コンテンツソースを接続",
    "subtitle": "フィードを取得するので、ゼロから作成する必要はありません。",
    "placeholder": "ブログや RSS リンク"
  },
  "subscribe": {
    "welcome": {
      "title": "ニュースレターへようこそ。",
      "invitedBy": "{configuratorId} さんからの招待です。"
    }
  },
  "header": {
    "goToWorkspace": "ダッシュボードを開く",
    "inBilling": "料金",
    "vip": "VIP",
    "plan": "{planName} プラン",
    "logIn": "ログイン",
    "getStarted": "無料で始める"
  },
  "fileInput": {
    "chooseFile": "ファイルを選択",
    "dropFile": "ここにドロップ",
    "release": "離してアップロード"
  },
  "billing": {
    "title": "請求とサブスクリプション",
    "currentPlanTitle": "現在のプラン",
    "upgradePlanTitle": "プランを変更",
    "manageSubscription": "サブスクリプションを管理",
    "vipPlanName": "VIP パートナー",
    "vipPlanDescription": "AIBAN から提供された無制限のアクセス。",
    "perMonth": "月あたり",
    "perYear": "年あたり",
    "monthAbbreviation": "月",
    "equivalentTo": "月額換算",
    "mostPopular": "一番人気",
    "upgradeTo": "アップグレード先：",
    "downgradeTo": "切り替え先：",
    "currentPlanButton": "ご利用中のプラン",
    "youSave": "節約額:",
    "users": "読者数",
    "newsSources": "ニュースソース",
    "monthly": "月払い",
    "yearly": "年払い",
    "loadingPlan": "プラン情報を読み込み中..."
  },
  "languages": [
    {
      "code": "ab",
      "name": "アブハズ語"
    },
    {
      "code": "aa",
      "name": "アファル語"
    },
    {
      "code": "af",
      "name": "アフリカーンス語"
    },
    {
      "code": "ak",
      "name": "アカン語"
    },
    {
      "code": "sq",
      "name": "アルバニア語"
    },
    {
      "code": "am",
      "name": "アムハラ語"
    },
    {
      "code": "ar",
      "name": "アラビア語"
    },
    {
      "code": "an",
      "name": "アラゴン語"
    },
    {
      "code": "hy",
      "name": "アルメニア語"
    },
    {
      "code": "as",
      "name": "アッサム語"
    },
    {
      "code": "av",
      "name": "アヴァル語"
    },
    {
      "code": "ae",
      "name": "アヴェスタ語"
    },
    {
      "code": "ay",
      "name": "アイマラ語"
    },
    {
      "code": "az",
      "name": "アゼルバイジャン語"
    },
    {
      "code": "bm",
      "name": "バンバラ語"
    },
    {
      "code": "ba",
      "name": "バシキール語"
    },
    {
      "code": "eu",
      "name": "バスク語"
    },
    {
      "code": "be",
      "name": "ベラルーシ語"
    },
    {
      "code": "bn",
      "name": "ベンガル語"
    },
    {
      "code": "bi",
      "name": "ビスラマ語"
    },
    {
      "code": "bs",
      "name": "ボスニア語"
    },
    {
      "code": "br",
      "name": "ブルトン語"
    },
    {
      "code": "bg",
      "name": "ブルガリア語"
    },
    {
      "code": "my",
      "name": "ビルマ語"
    },
    {
      "code": "ca",
      "name": "カタルーニャ語"
    },
    {
      "code": "ch",
      "name": "チャモロ語"
    },
    {
      "code": "ce",
      "name": "チェチェン語"
    },
    {
      "code": "ny",
      "name": "チェワ語"
    },
    {
      "code": "zh",
      "name": "中国語"
    },
    {
      "code": "cu",
      "name": "教会スラブ語"
    },
    {
      "code": "cv",
      "name": "チュヴァシ語"
    },
    {
      "code": "kw",
      "name": "コーンウォール語"
    },
    {
      "code": "co",
      "name": "コルシカ語"
    },
    {
      "code": "cr",
      "name": "クリー語"
    },
    {
      "code": "hr",
      "name": "クロアチア語"
    },
    {
      "code": "cs",
      "name": "チェコ語"
    },
    {
      "code": "da",
      "name": "デンマーク語"
    },
    {
      "code": "dv",
      "name": "ディベヒ語"
    },
    {
      "code": "nl",
      "name": "オランダ語"
    },
    {
      "code": "dz",
      "name": "ゾンカ語"
    },
    {
      "code": "en",
      "name": "英語"
    },
    {
      "code": "eo",
      "name": "エスペラント語"
    },
    {
      "code": "et",
      "name": "エストニア語"
    },
    {
      "code": "ee",
      "name": "エウェ語"
    },
    {
      "code": "fo",
      "name": "フェロー語"
    },
    {
      "code": "fj",
      "name": "フィジー語"
    },
    {
      "code": "fi",
      "name": "フィンランド語"
    },
    {
      "code": "fr",
      "name": "フランス語"
    },
    {
      "code": "fy",
      "name": "西フリジア語"
    },
    {
      "code": "ff",
      "name": "フラニ語"
    },
    {
      "code": "gd",
      "name": "スコットランド・ゲール語"
    },
    {
      "code": "gl",
      "name": "ガリシア語"
    },
    {
      "code": "lg",
      "name": "ガンダ語"
    },
    {
      "code": "ka",
      "name": "グルジア語"
    },
    {
      "code": "de",
      "name": "ドイツ語"
    },
    {
      "code": "el",
      "name": "ギリシャ語"
    },
    {
      "code": "kl",
      "name": "グリーンランド語"
    },
    {
      "code": "gn",
      "name": "グアラニー語"
    },
    {
      "code": "gu",
      "name": "グジャラート語"
    },
    {
      "code": "ht",
      "name": "ハイチ語"
    },
    {
      "code": "ha",
      "name": "ハウサ語"
    },
    {
      "code": "he",
      "name": "ヘブライ語"
    },
    {
      "code": "hz",
      "name": "ヘレロ語"
    },
    {
      "code": "hi",
      "name": "ヒンディー語"
    },
    {
      "code": "ho",
      "name": "ヒリモツ語"
    },
    {
      "code": "hu",
      "name": "ハンガリー語"
    },
    {
      "code": "is",
      "name": "アイスランド語"
    },
    {
      "code": "io",
      "name": "イド語"
    },
    {
      "code": "ig",
      "name": "イボ語"
    },
    {
      "code": "id",
      "name": "インドネシア語"
    },
    {
      "code": "ia",
      "name": "インターリングア"
    },
    {
      "code": "ie",
      "name": "インターリング"
    },
    {
      "code": "iu",
      "name": "イヌクティトゥット語"
    },
    {
      "code": "ik",
      "name": "イヌピアック語"
    },
    {
      "code": "ga",
      "name": "アイルランド語"
    },
    {
      "code": "it",
      "name": "イタリア語"
    },
    {
      "code": "ja",
      "name": "日本語"
    },
    {
      "code": "jv",
      "name": "ジャワ語"
    },
    {
      "code": "kn",
      "name": "カンナダ語"
    },
    {
      "code": "kr",
      "name": "カヌリ語"
    },
    {
      "code": "ks",
      "name": "カシミール語"
    },
    {
      "code": "kk",
      "name": "カザフ語"
    },
    {
      "code": "km",
      "name": "クメール語"
    },
    {
      "code": "ki",
      "name": "キクユ語"
    },
    {
      "code": "rw",
      "name": "ルワンダ語"
    },
    {
      "code": "ky",
      "name": "キルギス語"
    },
    {
      "code": "kv",
      "name": "コミ語"
    },
    {
      "code": "kg",
      "name": "コンゴ語"
    },
    {
      "code": "ko",
      "name": "韓国語"
    },
    {
      "code": "kj",
      "name": "クアニャマ語"
    },
    {
      "code": "ku",
      "name": "クルド語"
    },
    {
      "code": "lo",
      "name": "ラオ語"
    },
    {
      "code": "la",
      "name": "ラテン語"
    },
    {
      "code": "lv",
      "name": "ラトビア語"
    },
    {
      "code": "li",
      "name": "リンブルフ語"
    },
    {
      "code": "ln",
      "name": "リンガラ語"
    },
    {
      "code": "lt",
      "name": "リトアニア語"
    },
    {
      "code": "lu",
      "name": "ルバ・カタンガ語"
    },
    {
      "code": "lb",
      "name": "ルクセンブルク語"
    },
    {
      "code": "mk",
      "name": "マケドニア語"
    },
    {
      "code": "mg",
      "name": "マダガスカル語"
    },
    {
      "code": "ms",
      "name": "マレー語"
    },
    {
      "code": "ml",
      "name": "マラヤーラム語"
    },
    {
      "code": "mt",
      "name": "マルタ語"
    },
    {
      "code": "gv",
      "name": "マン島語"
    },
    {
      "code": "mi",
      "name": "マオリ語"
    },
    {
      "code": "mr",
      "name": "マラーティー語"
    },
    {
      "code": "mh",
      "name": "マーシャル語"
    },
    {
      "code": "mn",
      "name": "モンゴル語"
    },
    {
      "code": "na",
      "name": "ナウル語"
    },
    {
      "code": "nv",
      "name": "ナバホ語"
    },
    {
      "code": "nd",
      "name": "北ンデベレ語"
    },
    {
      "code": "nr",
      "name": "南ンデベレ語"
    },
    {
      "code": "ng",
      "name": "ンドンガ語"
    },
    {
      "code": "ne",
      "name": "ネパール語"
    },
    {
      "code": "no",
      "name": "ノルウェー語"
    },
    {
      "code": "nb",
      "name": "ノルウェー語（ブークモール）"
    },
    {
      "code": "nn",
      "name": "ノルウェー語（ニーノシュク）"
    },
    {
      "code": "oc",
      "name": "オック語"
    },
    {
      "code": "oj",
      "name": "オジブウェー語"
    },
    {
      "code": "or",
      "name": "オリヤー語"
    },
    {
      "code": "om",
      "name": "オロモ語"
    },
    {
      "code": "os",
      "name": "オセト語"
    },
    {
      "code": "pi",
      "name": "パーリ語"
    },
    {
      "code": "ps",
      "name": "パシュトー語"
    },
    {
      "code": "fa",
      "name": "ペルシャ語"
    },
    {
      "code": "pl",
      "name": "ポーランド語"
    },
    {
      "code": "pt",
      "name": "ポルトガル語"
    },
    {
      "code": "pa",
      "name": "パンジャブ語"
    },
    {
      "code": "qu",
      "name": "ケチュア語"
    },
    {
      "code": "ro",
      "name": "ルーマニア語"
    },
    {
      "code": "rm",
      "name": "ロマンシュ語"
    },
    {
      "code": "rn",
      "name": "ルンディ語"
    },
    {
      "code": "ru",
      "name": "ロシア語"
    },
    {
      "code": "se",
      "name": "北サーミ語"
    },
    {
      "code": "sm",
      "name": "サモア語"
    },
    {
      "code": "sg",
      "name": "サンゴ語"
    },
    {
      "code": "sa",
      "name": "サンスクリット語"
    },
    {
      "code": "sc",
      "name": "サルデーニャ語"
    },
    {
      "code": "sr",
      "name": "セルビア語"
    },
    {
      "code": "sn",
      "name": "ショナ語"
    },
    {
      "code": "ii",
      "name": "四川彝語"
    },
    {
      "code": "sd",
      "name": "シンド語"
    },
    {
      "code": "si",
      "name": "シンハラ語"
    },
    {
      "code": "sk",
      "name": "スロバキア語"
    },
    {
      "code": "sl",
      "name": "スロベニア語"
    },
    {
      "code": "so",
      "name": "ソマリ語"
    },
    {
      "code": "st",
      "name": "南ソト語"
    },
    {
      "code": "es",
      "name": "スペイン語"
    },
    {
      "code": "su",
      "name": "スンダ語"
    },
    {
      "code": "sw",
      "name": "スワヒリ語"
    },
    {
      "code": "ss",
      "name": "スワジ語"
    },
    {
      "code": "sv",
      "name": "スウェーデン語"
    },
    {
      "code": "tl",
      "name": "タガログ語"
    },
    {
      "code": "ty",
      "name": "タヒチ語"
    },
    {
      "code": "tg",
      "name": "タジク語"
    },
    {
      "code": "ta",
      "name": "タミル語"
    },
    {
      "code": "tt",
      "name": "タタール語"
    },
    {
      "code": "te",
      "name": "テルグ語"
    },
    {
      "code": "th",
      "name": "タイ語"
    },
    {
      "code": "bo",
      "name": "チベット語"
    },
    {
      "code": "ti",
      "name": "ティグリニャ語"
    },
    {
      "code": "to",
      "name": "トンガ語"
    },
    {
      "code": "ts",
      "name": "ツォンガ語"
    },
    {
      "code": "tn",
      "name": "ツワナ語"
    },
    {
      "code": "tr",
      "name": "トルコ語"
    },
    {
      "code": "tk",
      "name": "トルクメン語"
    },
    {
      "code": "tw",
      "name": "トウィ語"
    },
    {
      "code": "ug",
      "name": "ウイグル語"
    },
    {
      "code": "uk",
      "name": "ウクライナ語"
    },
    {
      "code": "ur",
      "name": "ウルドゥー語"
    },
    {
      "code": "uz",
      "name": "ウズベク語"
    },
    {
      "code": "ve",
      "name": "ベンダ語"
    },
    {
      "code": "vi",
      "name": "ベトナム語"
    },
    {
      "code": "vo",
      "name": "ヴォラピュク"
    },
    {
      "code": "wa",
      "name": "ワロン語"
    },
    {
      "code": "cy",
      "name": "ウェールズ語"
    },
    {
      "code": "wo",
      "name": "ウォロフ語"
    },
    {
      "code": "xh",
      "name": "コサ語"
    },
    {
      "code": "yi",
      "name": "イディッシュ語"
    },
    {
      "code": "yo",
      "name": "ヨルバ語"
    },
    {
      "code": "za",
      "name": "チワン語"
    },
    {
      "code": "zu",
      "name": "ズールー語"
    }
  ],
  "countries": [
    {
      "code": "AF",
      "name": "アフガニスタン"
    },
    {
      "code": "AL",
      "name": "アルバニア"
    },
    {
      "code": "DZ",
      "name": "アルジェリア"
    },
    {
      "code": "AS",
      "name": "米領サモア"
    },
    {
      "code": "AD",
      "name": "アンドラ"
    },
    {
      "code": "AO",
      "name": "アンゴラ"
    },
    {
      "code": "AI",
      "name": "アンギラ"
    },
    {
      "code": "AQ",
      "name": "南極"
    },
    {
      "code": "AG",
      "name": "アンティグア・バーブーダ"
    },
    {
      "code": "AR",
      "name": "アルゼンチン"
    },
    {
      "code": "AM",
      "name": "アルメニア"
    },
    {
      "code": "AW",
      "name": "アルバ"
    },
    {
      "code": "AU",
      "name": "オーストラリア"
    },
    {
      "code": "AT",
      "name": "オーストリア"
    },
    {
      "code": "AZ",
      "name": "アゼルバイジャン"
    },
    {
      "code": "BS",
      "name": "バハマ"
    },
    {
      "code": "BH",
      "name": "バーレーン"
    },
    {
      "code": "BD",
      "name": "バングラデシュ"
    },
    {
      "code": "BB",
      "name": "バルバドス"
    },
    {
      "code": "BY",
      "name": "ベラルーシ"
    },
    {
      "code": "BE",
      "name": "ベルギー"
    },
    {
      "code": "BZ",
      "name": "ベリーズ"
    },
    {
      "code": "BJ",
      "name": "ベナン"
    },
    {
      "code": "BM",
      "name": "バミューダ"
    },
    {
      "code": "BT",
      "name": "ブータン"
    },
    {
      "code": "BO",
      "name": "ボリビア"
    },
    {
      "code": "BA",
      "name": "ボスニア・ヘルツェゴビナ"
    },
    {
      "code": "BW",
      "name": "ボツワナ"
    },
    {
      "code": "BR",
      "name": "ブラジル"
    },
    {
      "code": "IO",
      "name": "英領インド洋地域"
    },
    {
      "code": "VG",
      "name": "英領ヴァージン諸島"
    },
    {
      "code": "BN",
      "name": "ブルネイ"
    },
    {
      "code": "BG",
      "name": "ブルガリア"
    },
    {
      "code": "BF",
      "name": "ブルキナファソ"
    },
    {
      "code": "BI",
      "name": "ブルンジ"
    },
    {
      "code": "KH",
      "name": "カンボジア"
    },
    {
      "code": "CM",
      "name": "カメルーン"
    },
    {
      "code": "CA",
      "name": "カナダ"
    },
    {
      "code": "CV",
      "name": "カーボベルデ"
    },
    {
      "code": "KY",
      "name": "ケイマン諸島"
    },
    {
      "code": "CF",
      "name": "中央アフリカ共和国"
    },
    {
      "code": "TD",
      "name": "チャド"
    },
    {
      "code": "CL",
      "name": "チリ"
    },
    {
      "code": "CN",
      "name": "中国"
    },
    {
      "code": "CX",
      "name": "クリスマス島"
    },
    {
      "code": "CC",
      "name": "ココス（キーリング）諸島"
    },
    {
      "code": "CO",
      "name": "コロンビア"
    },
    {
      "code": "KM",
      "name": "コモロ"
    },
    {
      "code": "CG",
      "name": "コンゴ共和国（ブラザビル）"
    },
    {
      "code": "CD",
      "name": "コンゴ民主共和国（キンシャサ）"
    },
    {
      "code": "CK",
      "name": "クック諸島"
    },
    {
      "code": "CR",
      "name": "コスタリカ"
    },
    {
      "code": "CI",
      "name": "コートジボワール"
    },
    {
      "code": "HR",
      "name": "クロアチア"
    },
    {
      "code": "CU",
      "name": "キューバ"
    },
    {
      "code": "CY",
      "name": "キプロス"
    },
    {
      "code": "CZ",
      "name": "チェコ"
    },
    {
      "code": "DK",
      "name": "デンマーク"
    },
    {
      "code": "DJ",
      "name": "ジブチ"
    },
    {
      "code": "DM",
      "name": "ドミニカ国"
    },
    {
      "code": "DO",
      "name": "ドミニカ共和国"
    },
    {
      "code": "EC",
      "name": "エクアドル"
    },
    {
      "code": "EG",
      "name": "エジプト"
    },
    {
      "code": "SV",
      "name": "エルサルバドル"
    },
    {
      "code": "GQ",
      "name": "赤道ギニア"
    },
    {
      "code": "ER",
      "name": "エリトリア"
    },
    {
      "code": "EE",
      "name": "エストニア"
    },
    {
      "code": "SZ",
      "name": "エスワティニ"
    },
    {
      "code": "ET",
      "name": "エチオピア"
    },
    {
      "code": "FJ",
      "name": "フィジー"
    },
    {
      "code": "FI",
      "name": "フィンランド"
    },
    {
      "code": "FR",
      "name": "フランス"
    },
    {
      "code": "GA",
      "name": "ガボン"
    },
    {
      "code": "GM",
      "name": "ガンビア"
    },
    {
      "code": "GE",
      "name": "ジョージア"
    },
    {
      "code": "DE",
      "name": "ドイツ"
    },
    {
      "code": "GH",
      "name": "ガーナ"
    },
    {
      "code": "GR",
      "name": "ギリシャ"
    },
    {
      "code": "GT",
      "name": "グアテマラ"
    },
    {
      "code": "GN",
      "name": "ギニア"
    },
    {
      "code": "GY",
      "name": "ガイアナ"
    },
    {
      "code": "HT",
      "name": "ハイチ"
    },
    {
      "code": "HN",
      "name": "ホンジュラス"
    },
    {
      "code": "HK",
      "name": "香港"
    },
    {
      "code": "HU",
      "name": "ハンガリー"
    },
    {
      "code": "IS",
      "name": "アイスランド"
    },
    {
      "code": "IN",
      "name": "インド"
    },
    {
      "code": "ID",
      "name": "インドネシア"
    },
    {
      "code": "IR",
      "name": "イラン"
    },
    {
      "code": "IQ",
      "name": "イラク"
    },
    {
      "code": "IE",
      "name": "アイルランド"
    },
    {
      "code": "IL",
      "name": "イスラエル"
    },
    {
      "code": "IT",
      "name": "イタリア"
    },
    {
      "code": "JM",
      "name": "ジャマイカ"
    },
    {
      "code": "JP",
      "name": "日本"
    },
    {
      "code": "JO",
      "name": "ヨルダン"
    },
    {
      "code": "KZ",
      "name": "カザフスタン"
    },
    {
      "code": "KE",
      "name": "ケニア"
    },
    {
      "code": "KR",
      "name": "韓国"
    },
    {
      "code": "KW",
      "name": "クウェート"
    },
    {
      "code": "KG",
      "name": "キルギス"
    },
    {
      "code": "LA",
      "name": "ラオス"
    },
    {
      "code": "LV",
      "name": "ラトビア"
    },
    {
      "code": "LB",
      "name": "レバノン"
    },
    {
      "code": "LS",
      "name": "レソト"
    },
    {
      "code": "LR",
      "name": "リベリア"
    },
    {
      "code": "LY",
      "name": "リビア"
    },
    {
      "code": "LI",
      "name": "リヒテンシュタイン"
    },
    {
      "code": "LT",
      "name": "リトアニア"
    },
    {
      "code": "LU",
      "name": "ルクセンブルク"
    },
    {
      "code": "MG",
      "name": "マダガスカル"
    },
    {
      "code": "MW",
      "name": "マラウイ"
    },
    {
      "code": "MY",
      "name": "マレーシア"
    },
    {
      "code": "MV",
      "name": "モルディブ"
    },
    {
      "code": "ML",
      "name": "マリ"
    },
    {
      "code": "MT",
      "name": "マルタ"
    },
    {
      "code": "MX",
      "name": "メキシコ"
    },
    {
      "code": "MD",
      "name": "モルドバ"
    },
    {
      "code": "MC",
      "name": "モナコ"
    },
    {
      "code": "MN",
      "name": "モンゴル"
    },
    {
      "code": "ME",
      "name": "モンテネグロ"
    },
    {
      "code": "MA",
      "name": "モロッコ"
    },
    {
      "code": "MZ",
      "name": "モザンビーク"
    },
    {
      "code": "MM",
      "name": "ミャンマー"
    },
    {
      "code": "NA",
      "name": "ナミビア"
    },
    {
      "code": "NP",
      "name": "ネパール"
    },
    {
      "code": "NL",
      "name": "オランダ"
    },
    {
      "code": "NZ",
      "name": "ニュージーランド"
    },
    {
      "code": "NI",
      "name": "ニカラグア"
    },
    {
      "code": "NE",
      "name": "ニジェール"
    },
    {
      "code": "NG",
      "name": "ナイジェリア"
    },
    {
      "code": "MK",
      "name": "北マケドニア"
    },
    {
      "code": "NO",
      "name": "ノルウェー"
    },
    {
      "code": "OM",
      "name": "オマーン"
    },
    {
      "code": "PK",
      "name": "パキスタン"
    },
    {
      "code": "PA",
      "name": "パナマ"
    },
    {
      "code": "PG",
      "name": "パプアニューギニア"
    },
    {
      "code": "PY",
      "name": "パラグアイ"
    },
    {
      "code": "PE",
      "name": "ペルー"
    },
    {
      "code": "PH",
      "name": "フィリピン"
    },
    {
      "code": "PL",
      "name": "ポーランド"
    },
    {
      "code": "PT",
      "name": "ポルトガル"
    },
    {
      "code": "QA",
      "name": "カタール"
    },
    {
      "code": "RO",
      "name": "ルーマニア"
    },
    {
      "code": "RU",
      "name": "ロシア"
    },
    {
      "code": "RW",
      "name": "ルワンダ"
    },
    {
      "code": "SA",
      "name": "サウジアラビア"
    },
    {
      "code": "SN",
      "name": "セネガル"
    },
    {
      "code": "RS",
      "name": "セルビア"
    },
    {
      "code": "SG",
      "name": "シンガポール"
    },
    {
      "code": "SK",
      "name": "スロバキア"
    },
    {
      "code": "SI",
      "name": "スロベニア"
    },
    {
      "code": "ZA",
      "name": "南アフリカ"
    },
    {
      "code": "ES",
      "name": "スペイン"
    },
    {
      "code": "LK",
      "name": "スリランカ"
    },
    {
      "code": "SE",
      "name": "スウェーデン"
    },
    {
      "code": "CH",
      "name": "スイス"
    },
    {
      "code": "TW",
      "name": "台湾"
    },
    {
      "code": "TH",
      "name": "タイ"
    },
    {
      "code": "TR",
      "name": "トルコ"
    },
    {
      "code": "UG",
      "name": "ウガンダ"
    },
    {
      "code": "UA",
      "name": "ウクライナ"
    },
    {
      "code": "AE",
      "name": "アラブ首長国連邦"
    },
    {
      "code": "GB",
      "name": "イギリス"
    },
    {
      "code": "US",
      "name": "アメリカ合衆国"
    },
    {
      "code": "UY",
      "name": "ウルグアイ"
    },
    {
      "code": "UZ",
      "name": "ウズベキスタン"
    },
    {
      "code": "VE",
      "name": "ベネズエラ"
    },
    {
      "code": "VN",
      "name": "ベトナム"
    },
    {
      "code": "YE",
      "name": "イエメン"
    },
    {
      "code": "ZM",
      "name": "ザンビア"
    },
    {
      "code": "ZW",
      "name": "ジンバブエ"
    }
  ]
};
