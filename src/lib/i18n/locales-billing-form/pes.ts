// pes strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale pes
export default {
  "billing": {
    "header": {
      "title": "مشخصات صورت‌حساب",
      "subtitle": "این مشخصات را روی فاکتور شما درج می‌کنیم. صفحه پرداخت پس از این اطلاعات کارت شما را می‌خواهد."
    },
    "fields": {
      "firstName": {
        "label": "نام",
        "placeholder": "علی"
      },
      "lastName": {
        "label": "نام خانوادگی",
        "placeholder": "رضایی"
      },
      "email": {
        "label": "ایمیل برای فاکتورها",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "شماره تلفن",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "کد کشور",
        "placeholder": "IR"
      },
      "address": {
        "label": "نشانی صورت‌حساب",
        "placeholder": "خیابان اصلی، پلاک 123"
      },
      "city": {
        "label": "شهر",
        "placeholder": "تهران"
      },
      "state": {
        "label": "استان یا ایالت",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "کد پستی",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "دو حرف، برای مثال US، MX یا CR.",
      "state": "اختیاری. اگر کشور شما استان یا ایالت ندارد، خالی بگذارید.",
      "zip": "اختیاری. اگر نشانی شما کد پستی ندارد، خالی بگذارید."
    },
    "errors": {
      "required": "برای ادامه این فیلد را پر کنید.",
      "email": "یک نشانی ایمیل مثل name@example.com وارد کنید.",
      "country": "کد دوحرفی کشور را وارد کنید، برای مثال US."
    },
    "optional": "اختیاری"
  }
};
