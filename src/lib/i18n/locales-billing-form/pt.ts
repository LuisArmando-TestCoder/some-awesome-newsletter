// pt strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale pt
export default {
  "billing": {
    "header": {
      "title": "Dados de cobrança",
      "subtitle": "Usamos estes dados na sua fatura. Em seguida, a página de pagamento pede seu cartão."
    },
    "fields": {
      "firstName": {
        "label": "Nome",
        "placeholder": "João"
      },
      "lastName": {
        "label": "Sobrenome",
        "placeholder": "Silva"
      },
      "email": {
        "label": "E-mail para faturas",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "Número de telefone",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "Código do país",
        "placeholder": "BR"
      },
      "address": {
        "label": "Endereço de cobrança",
        "placeholder": "Rua Principal, 123"
      },
      "city": {
        "label": "Cidade",
        "placeholder": "São Paulo"
      },
      "state": {
        "label": "Estado ou província",
        "placeholder": "San José"
      },
      "zip": {
        "label": "CEP ou código postal",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "Duas letras, por exemplo US, MX ou CR.",
      "state": "Opcional. Deixe em branco se seu país não usa.",
      "zip": "Opcional. Deixe em branco se seu endereço não tem código postal."
    },
    "errors": {
      "required": "Preencha este campo para continuar.",
      "email": "Digite um e-mail como nome@example.com.",
      "country": "Digite o código do país com duas letras, por exemplo US."
    },
    "optional": "Opcional"
  }
};
