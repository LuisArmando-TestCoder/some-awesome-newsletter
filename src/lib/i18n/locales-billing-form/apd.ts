// apd strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale apd
export default {
  "billing": {
    "header": {
      "title": "بيانات الفوترة",
      "subtitle": "بنختّ البيانات دي في فاتورتك. بعداك صفحة الدفع حتطلب بيانات بطاقتك."
    },
    "fields": {
      "firstName": {
        "label": "الاسم الأول",
        "placeholder": "محمد"
      },
      "lastName": {
        "label": "اسم العائلة",
        "placeholder": "أحمد"
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
        "placeholder": "SD"
      },
      "address": {
        "label": "عنوان الفوترة",
        "placeholder": "123 الشارع الرئيسي"
      },
      "city": {
        "label": "المدينة",
        "placeholder": "الخرطوم"
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
      "state": "اختياري. خليهو فاضي لو بلدك ما بتستخدمو.",
      "zip": "اختياري. خليهو فاضي لو عنوانك ما عندو رمز بريدي."
    },
    "errors": {
      "required": "املا الخانة دي عشان تواصل.",
      "email": "اكتب إيميل زي name@example.com.",
      "country": "اكتب رمز البلد البيكون حرفين، مثلًا US."
    },
    "optional": "اختياري"
  }
};
