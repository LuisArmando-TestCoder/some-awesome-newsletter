// wuu strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale wuu
export default {
  "billing": {
    "header": {
      "title": "账单信息",
      "subtitle": "迭些信息会显示在侬个发票上。下一步，付款页面会要求侬输入银行卡。"
    },
    "fields": {
      "firstName": {
        "label": "名",
        "placeholder": "小明"
      },
      "lastName": {
        "label": "姓",
        "placeholder": "张"
      },
      "email": {
        "label": "接收发票个邮箱",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "电话号码",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "国家代码",
        "placeholder": "CN"
      },
      "address": {
        "label": "账单地址",
        "placeholder": "123 Main Street"
      },
      "city": {
        "label": "城市",
        "placeholder": "上海"
      },
      "state": {
        "label": "州或省",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "邮政编码",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "两个字母，例如 US、MX 或 CR。",
      "state": "可选。如果侬个国家弗使用，请留空。",
      "zip": "可选。如果侬个地址呒没邮政编码，请留空。"
    },
    "errors": {
      "required": "请填写此字段后继续。",
      "email": "请输入类似 name@example.com 个邮箱地址。",
      "country": "请输入两个字母个国家代码，例如 US。"
    },
    "optional": "可选"
  }
};
