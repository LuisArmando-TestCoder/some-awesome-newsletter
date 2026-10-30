// ru strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale ru
export default {
  "billing": {
    "header": {
      "title": "Платежные данные",
      "subtitle": "Эти данные будут указаны в счете. Затем на странице оплаты понадобится ваша карта."
    },
    "fields": {
      "firstName": {
        "label": "Имя",
        "placeholder": "Иван"
      },
      "lastName": {
        "label": "Фамилия",
        "placeholder": "Иванов"
      },
      "email": {
        "label": "Email для счетов",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "Номер телефона",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "Код страны",
        "placeholder": "RU"
      },
      "address": {
        "label": "Платежный адрес",
        "placeholder": "ул. Ленина, 123"
      },
      "city": {
        "label": "Город",
        "placeholder": "Москва"
      },
      "state": {
        "label": "Регион или область",
        "placeholder": "Московская область"
      },
      "zip": {
        "label": "Почтовый индекс",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "Две буквы, например US, MX или CR.",
      "state": "Необязательно. Оставьте пустым, если в вашей стране это не используется.",
      "zip": "Необязательно. Оставьте пустым, если у вашего адреса нет почтового индекса."
    },
    "errors": {
      "required": "Заполните это поле, чтобы продолжить.",
      "email": "Введите email-адрес вида name@example.com.",
      "country": "Введите двухбуквенный код страны, например US."
    },
    "optional": "Необязательно"
  }
};
