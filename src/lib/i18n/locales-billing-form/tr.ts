// tr strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale tr
export default {
  "billing": {
    "header": {
      "title": "Fatura bilgileri",
      "subtitle": "Bu bilgileri faturanıza yazarız. Ödeme sayfası ardından kartınızı ister."
    },
    "fields": {
      "firstName": {
        "label": "Ad",
        "placeholder": "Ahmet"
      },
      "lastName": {
        "label": "Soyad",
        "placeholder": "Yılmaz"
      },
      "email": {
        "label": "Faturalar için e-posta",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "Telefon numarası",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "Ülke kodu",
        "placeholder": "TR"
      },
      "address": {
        "label": "Fatura adresi",
        "placeholder": "Atatürk Caddesi No: 123"
      },
      "city": {
        "label": "Şehir",
        "placeholder": "İstanbul"
      },
      "state": {
        "label": "İl veya eyalet",
        "placeholder": "İstanbul"
      },
      "zip": {
        "label": "Posta kodu",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "İki harf, örneğin TR, US veya MX.",
      "state": "İsteğe bağlı. Ülkeniz kullanmıyorsa boş bırakın.",
      "zip": "İsteğe bağlı. Adresinizde posta kodu yoksa boş bırakın."
    },
    "errors": {
      "required": "Devam etmek için bu alanı doldurun.",
      "email": "ad@example.com gibi bir e-posta adresi girin.",
      "country": "İki harfli ülke kodunu girin, örneğin TR."
    },
    "optional": "İsteğe bağlı"
  }
};
