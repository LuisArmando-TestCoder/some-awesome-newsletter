// ja strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale ja
export default {
  "welcome": {
    "title": "ニュースレターへようこそ",
    "invitedBy": "{configuratorId} さんから登録の招待が届いています。"
  },
  "email": {
    "title": "各号をどのメールアドレスに送りますか？",
    "placeholder": "メールアドレス"
  },
  "name": {
    "title": "お名前を教えてください",
    "placeholder": "お名前"
  },
  "language": {
    "title": "どの言語で読みますか？"
  },
  "subscribed": {
    "title": "登録しました",
    "subtitle": "受信トレイに届く確認メールをご確認ください。",
    "continueTo": "次へ",
    "finishingUp": "このページは閉じてかまいません。"
  },
  "form": {
    "heading": "{title} に登録",
    "headingFallback": "このニュースレターに登録",
    "intro": "新しい号は、選んだ言語でメールで届きます。",
    "from": "配信者：{sender}",
    "emailLabel": "メールアドレス",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "名前",
    "optional": "任意",
    "nameHint": "あいさつに使います。空欄の場合は、メールアドレスの先頭部分を使います。",
    "languageLabel": "配信の言語",
    "languageSummary": "{language}で配信します。",
    "languageChange": "変更",
    "languageHint": "ブラウザの設定から選びました。",
    "submit": "登録する",
    "submitting": "登録しています...",
    "consent": "登録すると、{sender} からのメール受信に同意したことになります。すべてのメールに配信停止リンクがあります。",
    "privacy": "プライバシーポリシー",
    "loadingInfo": "ニュースレターの情報を読み込んでいます"
  },
  "success": {
    "title": "受信トレイをご確認ください",
    "body": "{email} に確認メールを送りました。メールを開いて「登録を確定」を選んでください。",
    "next": "確定すると、{language}で書かれた最初の号が届きます。",
    "spam": "数分たっても届かない場合は、迷惑メールフォルダやプロモーションフォルダをご確認ください。",
    "changeEmail": "別のメールアドレスを使う",
    "continueTo": "{host} に進む"
  },
  "errors": {
    "emailRequired": "メールアドレスを入力してください。",
    "emailInvalid": "メールアドレスが不完全なようです。確認してもう一度お試しください。",
    "missingLink": "この登録リンクには情報が足りません。配信者に新しいリンクを依頼してください。",
    "notFound": "この登録リンクは使えなくなりました。配信者に新しいリンクを依頼してください。",
    "limit": "このニュースレターは現在、新しい登録を受け付けていません。時間をおいてもう一度お試しください。",
    "invalid": "このアドレスは受け付けられませんでした。確認してもう一度お試しください。",
    "server": "登録を保存できませんでした。少し待ってからもう一度お試しください。",
    "network": "サーバーに接続できませんでした。接続を確認してもう一度お試しください。"
  },
  "confirm": {
    "title": "登録を確定してください",
    "body": "ボタンを選ぶと、{email} で配信の受け取りが始まります。",
    "button": "登録を確定",
    "confirming": "確定しています...",
    "consent": "確定すると、このニュースレターをメールで受け取ることに同意したことになります。配信停止はどの号からでもできます。",
    "successTitle": "登録しました",
    "successBody": "新しい号は {email} に届きます。",
    "successTip": "迷惑メールに振り分けられないよう、配信者を連絡先に追加してください。",
    "invalidTitle": "このリンクは不完全です",
    "invalidBody": "確認メールをもう一度開いて、メール内のボタンを選んでください。見つからない場合は、配信者のページからもう一度登録してください。",
    "notFoundBody": "このアドレスの登録が見つかりませんでした。配信者のページからもう一度登録してください。",
    "errorBody": "登録を確定できませんでした。少し待ってからもう一度お試しください。",
    "retry": "もう一度試す",
    "home": "ホームページへ"
  },
  "embed": {
    "title": "サイトに登録フォームを追加",
    "intro": "次のコードのいずれかをウェブサイトに貼り付けてください。登録した人には確認メールが届き、その後はその人の言語で各号が届きます。",
    "linkLabel": "登録ページのリンク",
    "linkHint": "SNSのプロフィール、メール署名、QRコードで共有できます。",
    "scriptLabel": "スクリプトタグ（おすすめ）",
    "scriptHint": "フォームを表示したい場所に貼り付けてください。フォームの大きさは自動で調整されます。",
    "iframeLabel": "iframe",
    "iframeHint": "サイトでスクリプトが使えない場合はこちらを使ってください。",
    "copy": "コピー",
    "copied": "コピーしました",
    "copyFailed": "テキストを選択して手動でコピーしてください。",
    "options": "フォームの設定",
    "accent": "ボタンの色",
    "accentHint": "そのままにすると、ブランドカラーを使います。",
    "theme": "テーマ",
    "themeAuto": "訪問者の設定に合わせる",
    "themeLight": "ライト",
    "themeDark": "ダーク",
    "layout": "レイアウト",
    "layoutFull": "フル（タイトル、名前、言語）",
    "layoutCompact": "コンパクト（メールとボタン）",
    "preview": "プレビュー",
    "previewNote": "このプレビューは実際に動きます。ここで登録すると、本当の登録者が作成されます。",
    "missing": "先にニュースレターを作成してください。作成すると、ここに登録フォームが表示されます。"
  },
  "page": {
    "poweredBy": "AIBAN で運営",
    "title": "登録"
  },
  "signature": {
    "title": "メール署名",
    "intro": "読者は各号の最後にこの署名を見ます。プレビューのどこかをクリックすると編集できます。",
    "show": "すべての号に署名を表示する",
    "showHint": "オフにすると、各号は記事の終わりで終わります。",
    "preview": "プレビュー",
    "previewEmpty": "署名が空です。まず名前を追加してください。",
    "articleEnd": "記事の終わり",
    "tabContent": "内容",
    "tabStyle": "スタイル",
    "blocks": "含める項目",
    "blocksHint": "タグを選ぶと、その部分の表示と非表示を切り替えます。非表示にしてもテキストは残ります。",
    "layout": "レイアウト",
    "layouts": {
      "bar": "カラーバー",
      "photo": "写真",
      "stacked": "縦並び",
      "centered": "中央揃え",
      "minimal": "テキストのみ"
    },
    "fields": {
      "name": "名前",
      "role": "役職",
      "company": "会社",
      "phone": "電話",
      "email": "メール",
      "website": "ウェブサイト",
      "address": "住所",
      "photoUrl": "写真",
      "logoUrl": "ロゴ",
      "socials": "SNSリンク",
      "cta": "ボタン",
      "disclaimer": "法的注記"
    },
    "groups": {
      "about": "あなたについて",
      "contact": "連絡先",
      "images": "画像",
      "socials": "SNSリンク",
      "cta": "ボタン",
      "disclaimer": "法的注記"
    },
    "placeholders": {
      "name": "山田 花子",
      "role": "代表",
      "company": "リバーサイド・スタジオ",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "東京都千代田区丸の内1-2-3",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "相談を予約",
      "ctaUrl": "https://"
    },
    "ctaText": "ボタンのテキスト",
    "ctaLink": "ボタンのリンク",
    "hints": {
      "photoUrl": "正方形のPNGまたはJPGへのリンク。144×144ピクセル以上、200 KB未満。名前の横に72×72ピクセルで表示されます。",
      "logoUrl": "背景が透明または白のPNGまたはJPGへのリンク。高さ64ピクセル以上。高さ32ピクセルで表示されます。",
      "website": "https:// を省略した場合は自動で追加します。",
      "cta": "ボタンを表示するには、テキストとリンクの両方が必要です。",
      "disclaimer": "下部に表示する小さな文字です。例：機密保持に関する注記。不要なら空欄のままにしてください。"
    },
    "style": {
      "accent": "アクセントカラー",
      "accentHint": "バー、リンク、ボタンに使います。最初はブランドカラーが入っています。",
      "font": "フォント",
      "fontSans": "ゴシック体",
      "fontSerif": "明朝体",
      "size": "文字サイズ",
      "sizeMd": "標準",
      "sizeSm": "小",
      "shape": "写真の形",
      "shapeRound": "丸",
      "shapeSquare": "四角"
    },
    "hidden": "非表示",
    "reset": "最初からやり直す",
    "resetConfirm": "もう一度選ぶと、すべての項目が消去されます"
  }
};
