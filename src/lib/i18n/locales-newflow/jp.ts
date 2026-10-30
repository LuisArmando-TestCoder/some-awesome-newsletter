// jp strings for locales-newflow. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale jp
export default {
  "onboarding": {
    "progress": "ステップ {current}/{total}",
    "progressLabel": "設定の進捗",
    "back": "戻る",
    "skip": "このステップをスキップ",
    "continue": "続行",
    "whyLabel": "お聞きする理由",
    "skipLabel": "スキップした場合",
    "working": "処理中...",
    "start": {
      "title": "ニュースレターを始める",
      "opening": "設定を開いています。何も起こらない場合は、",
      "continueHere": "こちらから続行してください"
    },
    "tryAgain": "再試行",
    "website": {
      "title": "あなたのウェブサイトはどこですか？",
      "why": "サイトを読み取り、ニュースレターのもとになる記事を探し、読者がどんな人かを推定します。",
      "skipNote": "まだウェブサイトがない場合は、トピックを選んでください。そのトピックのニュースサイトを使います。",
      "label": "ウェブサイトのアドレス",
      "hint": "例：yourcompany.com、yourcompany.com/blog",
      "placeholder": "yourcompany.com",
      "submit": "続行",
      "checking": "サイトを読み取っています...",
      "noWebsite": "ウェブサイトを持っていません",
      "haveWebsite": "ウェブサイトを持っています",
      "topicTitle": "トピックを選択",
      "topicHint": "このトピックのニュースサイトを最初のソースとして使います。あとから変更できます。",
      "errors": {
        "empty": "続行するには、ウェブサイトのアドレスを入力してください。",
        "invalid": "ウェブアドレスの形式ではないようです。つづりを確認してください（例：yourcompany.com）。",
        "unreachable": "このページで記事が見つかりませんでした。ブログやニュースのページを試してください（例：yourcompany.com/blog）。",
        "network": "サーバーに接続できませんでした。接続を確認して、もう一度お試しください。"
      }
    },
    "readers": {
      "title": "ニュースレターの読者は誰ですか？",
      "why": "すべての号を、この読者に向けてこの言語で作成します。ほかの言語を話す購読者には、それぞれ翻訳版が届きます。",
      "skipNote": "サイトの内容をもとに入力しました。違っている箇所があれば変更してください。",
      "languageLabel": "メインの言語",
      "languageHint": "ブラウザの設定から選びました。",
      "readerLabel": "理想の読者",
      "readerHint": "1 文で十分です。例：リスボンで小さなレストランを営むオーナー。",
      "readerPlaceholder": "このニュースレターは誰に向けたものですか？",
      "errors": {
        "reader": "誰に向けて書くかがわかるように、読者を数語で説明してください。"
      }
    },
    "preview": {
      "title": "最初の号ができました",
      "why": "最新の記事から作成した、購読者に届くメールです。まだ何も送信していません。",
      "generating": "最新の記事から最初の号を作成しています。通常 1 分以内に完了します。",
      "inboxFrom": "差出人",
      "inboxTo": "宛先",
      "inboxSubject": "件名",
      "defaultSubject": "最初の号",
      "sendTest": "テストを自分に送信",
      "sendingTest": "送信中...",
      "testSent": "{email} にテストを送信しました。受信トレイと迷惑メールフォルダを確認してください。",
      "regenerate": "もう一度作成",
      "looksGood": "問題ないので続行",
      "skipPreview": "プレビューなしで続行",
      "howTitle": "記事の見つけ方",
      "howBody": "ページ内の記事リンクの場所を示す短いルールを保存したので、メニューや広告は無視されます。プレビューで違う内容が選ばれた場合にだけ変更してください。",
      "ruleLabel": "記事のルール",
      "findAgain": "記事を再検出",
      "errors": {
        "generate": "号を作成できませんでした。ページが自動での読み取りをブロックしている可能性があります。もう一度試すか、戻ってブログのページを使ってください。",
        "test": "テストメールを送信できませんでした。少し時間をおいてもう一度お試しください。"
      }
    },
    "senderName": {
      "title": "受信トレイでの名前の表示",
      "why": "購読者は各号の横にこの名前を見て、あなたからのメールだと気づいて開きます。",
      "skipNote": "スキップすると、送信者は AIBAN と表示されます。名前はあとから設定で変更できます。",
      "label": "送信者名",
      "hint": "あなたの名前、会社名、またはニュースレター名。60 文字以内。",
      "placeholder": "Silva Studio",
      "previewLabel": "受信トレイでの表示",
      "previewBody": "号はこの送信者名で表示されます。送信は AIBAN の送信用アドレスから行われます。",
      "save": "保存して続行",
      "errors": {
        "empty": "2 文字以上の送信者名を入力してください。",
        "long": "送信者名は 60 文字以内にしてください。",
        "save": "名前を保存できませんでした。少し時間をおいてもう一度お試しください。"
      }
    },
    "signature": {
      "title": "メール署名",
      "why": "署名はすべての号の最後に入るため、読者は誰が書いたのか、どう連絡すればよいのかがわかります。",
      "skipNote": "スキップすると、号の最後にはニュースレター名だけが入ります。",
      "nameLabel": "お名前",
      "namePlaceholder": "Ana Silva",
      "roleLabel": "役職または会社",
      "rolePlaceholder": "Silva Studio 創業者",
      "linkLabel": "リンク",
      "linkHint": "ウェブサイトまたは SNS のプロフィール。任意です。",
      "linkPlaceholder": "yourcompany.com",
      "previewLabel": "メールの最後での表示",
      "previewBody": "お読みいただきありがとうございます。次の号でまたお会いしましょう。",
      "save": "署名を保存",
      "existingNote": "すでに署名があります。ここで保存すると置き換わります。"
    },
    "schedule": {
      "title": "新しい号をいつ送りますか？",
      "why": "送信のたびに事前にサイトを確認し、最新の記事から新しい号を作成します。",
      "skipNote": "曜日や時刻の変更、送信の一時停止は、ダッシュボードでいつでも行えます。",
      "scheduleLabel": "送信時刻",
      "frequencyLabel": "頻度",
      "daily": "毎日",
      "weekly": "毎週",
      "monthly": "毎月 1 日",
      "dayLabel": "曜日",
      "timeLabel": "時刻",
      "timeHint": "現地時間です。",
      "recipeTitle": "新しい号を自動で送信",
      "recipeBody": "上記のスケジュールで、新しい記事から最適なものを選び、あなたの文体で書き、読者ごとに翻訳して、メールで送ります。",
      "recipeOn": "オン",
      "recipeOff": "オフ。号は「送信」を押したときだけ送られます。",
      "save": "保存して続行",
      "saving": "ニュースレターを保存しています...",
      "errors": {
        "create": "ニュースレターを保存できませんでした。少し時間をおいてもう一度お試しください。",
        "limit": "現在のプランではソースをこれ以上追加できません。追加するにはご連絡ください。プランを変更します。"
      }
    },
    "send": {
      "title": "最初の号を送信",
      "why": "今送信すると、全体の流れを確認できます。号が実際の受信トレイに、読者の言語で届きます。",
      "skipNote": "スキップすると、最初の号は予定の時刻に送信されます。",
      "youAreSubscribed": "{email} としてすでに購読しています。",
      "othersLabel": "招待する（任意）",
      "othersHint": "メールアドレスをカンマまたは改行で区切って貼り付けてください。各自にあなたからの個別の招待が届きます。承諾した人にだけ号が届き、30 日以内に承諾されなかった招待は削除されます。",
      "othersPlaceholder": "ana@example.com, li@example.com",
      "sendNow": "今すぐ送信",
      "sending": "最初の号を送信しています...",
      "sentTitle": "最初の号を送信しました",
      "sentBody": "リストのうち、購読を確認したすべての人に届きます。届くまで数分かかることがあります。",
      "invited": "{count} 人に招待を送信しました。承諾するとリストに追加されます。",
      "invitesUnavailable": "招待機能はまだ利用できないため、これらのアドレスは保存していません。次のステップで登録リンクをコピーし、ご自身で送ってください。",
      "continue": "続行",
      "errors": {
        "invalidEmails": "次のアドレスが正しくないようです：{list}。修正するか削除してください。",
        "add": "招待できませんでした：{list}。あとで「購読者」からもう一度お試しください。",
        "send": "号を送信できませんでした。少し時間をおいてもう一度お試しください。"
      }
    },
    "share": {
      "title": "最初の購読者を集める",
      "why": "ここから登録した人は、すべての号を自分の言語で受け取ります。",
      "skipNote": "このリンクと埋め込みコードは、後から「購読者」の「登録フォーム」で確認できます。",
      "linkLabel": "登録ページ",
      "linkHint": "SNS、メールのフッター、QR コードなどで共有してください。",
      "embedLabel": "ウェブサイト用の登録フォーム",
      "embedHint": "サイト内でフォームを表示したい場所にこのコードを貼り付けてください。",
      "copy": "コピー",
      "copied": "コピーしました",
      "open": "登録ページを開く"
    },
    "done": {
      "title": "ニュースレターの設定が完了しました",
      "why": "このあと行われることと、残りの作業です。",
      "planLine": "現在のプラン：{plan}",
      "changePlan": "プランを見る",
      "toDashboard": "ダッシュボードへ移動",
      "summarySource": "ソース：{url}",
      "summarySchedule": "スケジュール：{schedule}",
      "summaryAutomation": "自動送信：{state}",
      "on": "オン",
      "off": "オフ"
    }
  },
  "tutorial": {
    "checklistTitle": "はじめに",
    "checklistProgress": "{total} 件中 {done} 件完了",
    "checklistDone": "準備が整いました。これでニュースレターは自動で動きます。",
    "dismiss": "チェックリストを非表示",
    "doneLabel": "完了",
    "todoLabel": "未完了",
    "show": "はじめにを表示",
    "items": {
      "source": {
        "title": "コンテンツの取得元を追加",
        "body": "新しい記事を確認するウェブサイトやブログです。"
      },
      "sender": {
        "title": "送信者名を選ぶ",
        "body": "購読者が各号の横で見る名前です。"
      },
      "subscriber": {
        "title": "最初の購読者を獲得",
        "body": "あなた以外の誰かが登録するか、追加されます。"
      },
      "send": {
        "title": "最初の号を送信",
        "body": "実際の号が 1 通、リストの読者に届きます。"
      },
      "automation": {
        "title": "自動送信をオンにする",
        "body": "新しい号がスケジュールどおりに送信されます。"
      },
      "widget": {
        "title": "サイトに登録フォームを追加",
        "body": "訪問者はサイトを離れずに購読できます。"
      }
    },
    "open": "開く",
    "tour": {
      "start": "簡単なツアーを見る",
      "next": "次へ",
      "back": "戻る",
      "skip": "ツアーをスキップ",
      "finish": "完了",
      "stepOf": "{current}/{total}"
    },
    "help": {
      "whatIsThis": "これは何ですか？",
      "whyItMatters": "大切な理由",
      "close": "閉じる"
    }
  },
  "auth": {
    "emailLabel": "メールアドレス",
    "emailHint": "このアドレスに 6 桁のコードを送ります。パスワードは不要です。",
    "codeTitle": "メールを確認してください",
    "codeSentTo": "{email} に 6 桁のコードを送りました。",
    "codeHint": "コードが届くまで 1 分ほどかかることがあります。迷惑メールフォルダも確認してください。",
    "changeEmail": "別のメールアドレスを使う",
    "resend": "新しいコードを送信",
    "resendIn": "{seconds} 秒後に新しいコードをリクエストできます",
    "resendLimit": "それでもコードが届かない場合は、ヘルプページからご連絡ください。対応いたします。",
    "resent": "新しいコードを送りました。",
    "verifying": "コードを確認しています...",
    "errors": {
      "email": "メールアドレスをすべて入力してください（例：you@company.com）。",
      "send": "コードを送信できませんでした。接続を確認して、もう一度お試しください。",
      "code": "このコードは使えませんでした。6 桁を確認するか、新しいコードをリクエストしてください。"
    }
  }
};
