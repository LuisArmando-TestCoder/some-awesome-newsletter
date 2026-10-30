// jp strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale jp
export default {
  "billing": {
    "header": {
      "title": "請求先情報",
      "subtitle": "これらの情報は請求書に記載されます。次の決済ページでカード情報を入力します。"
    },
    "fields": {
      "firstName": {
        "label": "名",
        "placeholder": "太郎"
      },
      "lastName": {
        "label": "姓",
        "placeholder": "山田"
      },
      "email": {
        "label": "請求書送付先のメールアドレス",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "電話番号",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "国コード",
        "placeholder": "JP"
      },
      "address": {
        "label": "請求先住所",
        "placeholder": "123 Main Street"
      },
      "city": {
        "label": "市区町村",
        "placeholder": "東京"
      },
      "state": {
        "label": "都道府県・州",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "郵便番号",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "2 文字で入力します（例：US、MX、CR）。",
      "state": "任意。お住まいの国で使わない場合は空欄のままにしてください。",
      "zip": "任意。住所に郵便番号がない場合は空欄のままにしてください。"
    },
    "errors": {
      "required": "続行するには、この項目を入力してください。",
      "email": "name@example.com のような形式でメールアドレスを入力してください。",
      "country": "2 文字の国コードを入力してください（例：US）。"
    },
    "optional": "任意"
  }
};
