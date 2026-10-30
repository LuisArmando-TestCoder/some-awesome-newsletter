// ar strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale ar
export default {
  "billing": {
    "header": {
      "title": "بيانات الفوترة",
      "subtitle": "نضع هذه البيانات على فاتورتك. بعد ذلك تطلب صفحة الدفع بيانات بطاقتك."
    },
    "fields": {
      "firstName": {
        "label": "الاسم الأول",
        "placeholder": "علي"
      },
      "lastName": {
        "label": "اسم العائلة",
        "placeholder": "الحمامي"
      },
      "email": {
        "label": "البريد الإلكتروني للفواتير",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "رقم الهاتف",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "رمز الدولة",
        "placeholder": "SA"
      },
      "address": {
        "label": "عنوان الفوترة",
        "placeholder": "123 الشارع الرئيسي"
      },
      "city": {
        "label": "المدينة",
        "placeholder": "الرياض"
      },
      "state": {
        "label": "الولاية أو المحافظة",
        "placeholder": "سان خوسيه"
      },
      "zip": {
        "label": "الرمز البريدي",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "حرفان، مثلًا US أو MX أو CR.",
      "state": "اختياري. اتركه فارغًا إذا كانت دولتك لا تستخدمه.",
      "zip": "اختياري. اتركه فارغًا إذا لم يكن لعنوانك رمز بريدي."
    },
    "errors": {
      "required": "املأ هذا الحقل للمتابعة.",
      "email": "أدخل عنوان بريد إلكتروني مثل name@example.com.",
      "country": "أدخل رمز الدولة المكوّن من حرفين، مثلًا US."
    },
    "optional": "اختياري"
  }
};
