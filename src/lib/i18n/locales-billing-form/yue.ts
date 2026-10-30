// yue strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale yue
export default {
  "billing": {
    "header": {
      "title": "收費資料",
      "subtitle": "呢啲資料會印喺你嘅發票上。下一步，付款頁面會叫你輸入信用卡。"
    },
    "fields": {
      "firstName": {
        "label": "名",
        "placeholder": "明"
      },
      "lastName": {
        "label": "姓",
        "placeholder": "陳"
      },
      "email": {
        "label": "收發票嘅電郵",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "電話號碼",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "國家代碼",
        "placeholder": "HK"
      },
      "address": {
        "label": "帳單地址",
        "placeholder": "123 Main Street"
      },
      "city": {
        "label": "城市",
        "placeholder": "香港"
      },
      "state": {
        "label": "州或省",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "郵政編碼",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "兩個字母，例如 US、MX 或 CR。",
      "state": "可選。如果你嘅國家唔使，請留空。",
      "zip": "可選。如果你嘅地址冇郵政編碼，請留空。"
    },
    "errors": {
      "required": "請填好呢個欄位先可以繼續。",
      "email": "請輸入好似 name@example.com 嘅電郵地址。",
      "country": "請輸入兩個字母嘅國家代碼，例如 US。"
    },
    "optional": "可選"
  }
};
