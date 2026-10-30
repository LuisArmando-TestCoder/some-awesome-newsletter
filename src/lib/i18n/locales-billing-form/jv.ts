// jv strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale jv
export default {
  "billing": {
    "header": {
      "title": "Data tagihan",
      "subtitle": "Kita nglebokake data iki ing invoice sampeyan. Sabanjure kaca pembayaran njaluk kertu sampeyan."
    },
    "fields": {
      "firstName": {
        "label": "Jeneng ngarep",
        "placeholder": "Budi"
      },
      "lastName": {
        "label": "Jeneng mburi",
        "placeholder": "Santoso"
      },
      "email": {
        "label": "Email kanggo invoice",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "Nomer telpon",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "Kode negara",
        "placeholder": "ID"
      },
      "address": {
        "label": "Alamat tagihan",
        "placeholder": "Jl. Malioboro 123"
      },
      "city": {
        "label": "Kutha",
        "placeholder": "Yogyakarta"
      },
      "state": {
        "label": "Provinsi utawa negara bagian",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "Kode pos",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "Rong aksara, contone US, MX utawa CR.",
      "state": "Opsional. Kosongake yen negara sampeyan ora nganggo.",
      "zip": "Opsional. Kosongake yen alamat sampeyan ora duwe kode pos."
    },
    "errors": {
      "required": "Isi kolom iki kanggo nerusake.",
      "email": "Lebokake alamat email kaya jeneng@example.com.",
      "country": "Lebokake kode negara rong aksara, contone US."
    },
    "optional": "Opsional"
  }
};
