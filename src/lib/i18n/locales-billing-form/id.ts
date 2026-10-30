// id strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale id
export default {
  "billing": {
    "header": {
      "title": "Detail penagihan",
      "subtitle": "Kami mencantumkan detail ini di faktur Anda. Halaman pembayaran akan meminta kartu Anda setelahnya."
    },
    "fields": {
      "firstName": {
        "label": "Nama depan",
        "placeholder": "Budi"
      },
      "lastName": {
        "label": "Nama belakang",
        "placeholder": "Sutanto"
      },
      "email": {
        "label": "Email untuk faktur",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "Nomor telepon",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "Kode negara",
        "placeholder": "ID"
      },
      "address": {
        "label": "Alamat penagihan",
        "placeholder": "Jl. Sudirman No. 123"
      },
      "city": {
        "label": "Kota",
        "placeholder": "Jakarta"
      },
      "state": {
        "label": "Provinsi",
        "placeholder": "DKI Jakarta"
      },
      "zip": {
        "label": "Kode pos",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "Dua huruf, misalnya ID, US, atau MX.",
      "state": "Opsional. Kosongkan jika negara Anda tidak menggunakannya.",
      "zip": "Opsional. Kosongkan jika alamat Anda tidak punya kode pos."
    },
    "errors": {
      "required": "Isi kolom ini untuk melanjutkan.",
      "email": "Masukkan alamat email seperti nama@example.com.",
      "country": "Masukkan kode negara dua huruf, misalnya ID."
    },
    "optional": "Opsional"
  }
};
