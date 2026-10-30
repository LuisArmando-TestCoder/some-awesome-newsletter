// apc strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale apc
export default {
  "billing": {
    "header": {
      "title": "بيانات الفوترة",
      "subtitle": "منحط هالبيانات على فاتورتك. بعدها صفحة الدفع رح تطلب بيانات بطاقتك."
    },
    "fields": {
      "firstName": {
        "label": "الاسم الأول",
        "placeholder": "أحمد"
      },
      "lastName": {
        "label": "اسم العائلة",
        "placeholder": "الخطيب"
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
        "placeholder": "LB"
      },
      "address": {
        "label": "عنوان الفوترة",
        "placeholder": "123 الشارع الرئيسي"
      },
      "city": {
        "label": "المدينة",
        "placeholder": "بيروت"
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
      "state": "اختياري. اتركو فاضي إذا بلدك ما بتستعملو.",
      "zip": "اختياري. اتركو فاضي إذا عنوانك ما إلو رمز بريدي."
    },
    "errors": {
      "required": "عبّي هالخانة منشان تكمّل.",
      "email": "اكتب إيميل متل name@example.com.",
      "country": "اكتب رمز البلد يلي هو حرفين، مثلًا US."
    },
    "optional": "اختياري"
  }
};
