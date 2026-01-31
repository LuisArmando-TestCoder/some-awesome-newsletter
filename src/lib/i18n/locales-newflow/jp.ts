export default {
  step01: {
    title: "人間のような響きのAIが自動で購読者向けのニュースレターを書きます",
    subtitle: "どのくらいの頻度で、<u>毎月</u>か<u>毎週</u>か<u>毎日</u>か、または<u>何時</u>かを選択してください"
  },
  step02: {
    title: "ニュースレターの言語",
    subtitle: "「あなたのニュースレターは、異なる場合、各ユーザーの特定の言語でも送信されます」"
  },
  step03: {
    title: "リダイレクト（オプション）",
    subtitle: "ユーザーをあなたのページにリダイレクトしますか？",
    description: "ここにあなたのページへのリンクを貼り付けることができます。AIが作成したメールから何人が入ったかをカウントします",
    placeholder: "https://your-page.com"
  },
  step04: {
    title: "AIに選ばせたいニュースの種類",
    subtitle: "どの会話のテーマやトピック（リダイレクトリンクが設定されている場合はそこから推測、それ以外は空）",
    placeholder: "例：人工知能、マーケティング、健康..."
  },
  step05: {
    title: "署名をカスタマイズ",
    subtitle: "視覚的にデザインするか、コードを直接編集します",
    visualEditor: "ビジュアルエディタ",
    htmlSource: "HTMLソース",
    livePreview: "ライブプレビュー",
    yourName: "あなたの名前",
    yourTitle: "あなたの肩書き",
    facebookProfile: "Facebookプロフィール",
    instagramProfile: "Instagramプロフィール",
    editHtml: "HTMLを直接編集...",
    warning: "⚠️ ここで行った編集は、ビジュアルエディタに戻って変更を加えると上書きされます。"
  },
  step06: {
    title: "ニュースソース",
    subtitle: "どのニュースウェブサイトを使用したいですか？",
    description: "URLを入力するか、トピックに基づいて私たちがあなたのために選びます。",
    descriptionSmall: "最適なコンテンツを見つけるためにウェブサイトを分析します。これには数秒かかる場合があります。",
    placeholder: "https://example.com",
    analyzing: "分析中...",
    next: "次へ",
    errors: {
      failedToGenerate: "セレクターの生成に失敗しました。再試行するか、URLを確認してください。",
      errorGenerating: "セレクターの生成中にエラーが発生しました。",
      invalidUrl: "有効なURLを入力するか、ソースを選択してください。"
    }
  },
  step07: {
    title: "コンテンツセレクター",
    subtitle: "各ウェブサイトを<strong>独自のレイアウトを持つ図書館</strong>と考えてください。",
    explanation1: "この<strong>「セレクター」</strong>は、このウェブサイトのために作成した特定の地図です。メニューボタンや広告を無視して、必要な記事を取得するためにどこを探すべきかをシステムに正確に伝えます。",
    explanation2: "<strong>私たちはあなたのためにこの地図を自動的に入力しました。</strong>",
    placeholder: "セレクター文字列...",
    regenerate: "セレクターを再生成",
    regenerating: "再生成中...",
    errors: {
      noUrl: "ニュースソースのURLが見つかりません。",
      failedRegenerate: "セレクターの再生成に失敗しました。",
      errorRegenerate: "セレクターの再生成中にエラーが発生しました。"
    }
  },
  step08: {
    title: "プレビュー",
    placeholder: "最初のニュースレターを生成する準備はできましたか？",
    generateBtn: "ニュースレターメールを生成",
    sentBtn: "送信しました！メールを確認してください",
    sendTestBtn: "テストメールを送信",
    regenerateBtn: "再生成",
    loading: {
      initializing: "初期化中...",
      starting: "生成を開始しています...",
      scraping: "コンテンツをスクレイピング中...",
      translating: "記事を翻訳中...",
      formatting: "メールをフォーマット中...",
      sending: "メールプロバイダーに接続中...",
      authenticating: "認証中...",
      sendingArticle: "記事を送信中...",
      creating: "ニュースソースを作成中...",
      saving: "設定を保存中...",
      finalizing: "セットアップを完了中..."
    },
    errors: {
      generationFailed: "生成に失敗しました：",
      createFailed: "ニュースソースの作成に失敗しました。再試行してください。",
      errorCreating: "ニュースソースの作成エラー：",
      sendFailed: "メールの送信に失敗しました："
    },
    defaultSubject: "生成されたニュースレターのプレビュー"
  },
  step09: {
    title: "あなたのメールから記事を送信するために",
    subtitle: "アプリパスワード（オプション）",
    description: "（Gmailサービスをお持ちの場合は、ここにアプリパスワードを入力してください）",
    label: "アプリパスワード",
    placeholder: "あなたのアプリパスワード"
  },
  step10: {
    title: "Gmailアドレス（オプション）",
    subtitle: "Gmailメールアドレス",
    description: "特定のGmailアドレスから送信したい場合",
    placeholder: "your-email@gmail.com"
  },
  step11: {
    title: "テストメールを送信",
    subtitle: "設定を確認するために自分自身にテストメールを送信します。",
    sendNow: "今すぐ送信",
    sent: "送信しました！メールを確認してください",
    loading: {
      connecting: "メールプロバイダーに接続中...",
      authenticating: "認証中...",
      sending: "記事を送信中..."
    }
  },
  step12: {
    title: "このニュースレターをフォロワーと共有",
    subtitle: "購読ファネルへのリンク（メールの受信を開始する前に、彼らはあなたの招待を受け入れる必要があります）",
    copy: "コピー",
    copied: "リンクをコピーしました！"
  },
  step13: {
    title: "プランと制限",
    currentPlan: "現在のプラン：",
    limits: "制限：",
    unknown: "不明",
    changePlan: "プランを変更",
    advancedFeatures: "より高度な機能が必要ですか？",
    developerText: "このニュースレター購読ファネルをサーバーに統合し、生成されたすべての記事のブログを作成し、APIキーを使用してコードベースからユーザーを購読させるには、開発者セクションを確認してください。",
    dashboardBtn: "ダッシュボードへ",
    usage: "使用状況：",
    limitDetails: {
      free: "100ユーザー制限",
      starter: "5ソース、10万ユーザー",
      growth: "17ソース、25万ユーザー",
      pro: "25ソース、50万ユーザー",
      master: "50ソース、無制限ユーザー",
      vipfree: "VIP無料"
    }
  }
};
