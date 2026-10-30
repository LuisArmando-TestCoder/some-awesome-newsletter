// arz strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale arz
export default {
  "billing": {
    "header": {
      "title": "بيانات الفوترة",
      "subtitle": "بنحط البيانات دي على الفاتورة بتاعتك. بعدها صفحة الدفع هتطلب بيانات الكارت."
    },
    "fields": {
      "firstName": {
        "label": "الاسم الأول",
        "placeholder": "أحمد"
      },
      "lastName": {
        "label": "اسم العائلة",
        "placeholder": "حسين"
      },
      "email": {
        "label": "الإيميل للفواتير",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "رقم الهاتف",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "رمز الدولة",
        "placeholder": "EG"
      },
      "address": {
        "label": "عنوان الفوترة",
        "placeholder": "123 الشارع الرئيسي"
      },
      "city": {
        "label": "المدينة",
        "placeholder": "القاهرة"
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
      "country": "حرفين، مثلًا US أو MX أو CR.",
      "state": "اختياري. سيبه فاضي لو بلدك مش بتستخدمه.",
      "zip": "اختياري. سيبه فاضي لو عنوانك معندوش رمز بريدي."
    },
    "errors": {
      "required": "املا الخانة دي عشان تكمّل.",
      "email": "اكتب إيميل زي name@example.com.",
      "country": "اكتب رمز البلد اللي هو حرفين، مثلًا US."
    },
    "optional": "اختياري"
  }
};
