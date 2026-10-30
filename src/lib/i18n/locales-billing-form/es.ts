// es strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale es
export default {
  "billing": {
    "header": {
      "title": "Datos de facturación",
      "subtitle": "Usamos estos datos en tu factura. Después, la página de pago te pide la tarjeta."
    },
    "fields": {
      "firstName": {
        "label": "Nombre",
        "placeholder": "Juan"
      },
      "lastName": {
        "label": "Apellido",
        "placeholder": "Perez"
      },
      "email": {
        "label": "Correo para facturas",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "Número de teléfono",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "Código de país",
        "placeholder": "ES"
      },
      "address": {
        "label": "Dirección de facturación",
        "placeholder": "Calle Principal 123"
      },
      "city": {
        "label": "Ciudad",
        "placeholder": "San José"
      },
      "state": {
        "label": "Estado o provincia",
        "placeholder": "San José"
      },
      "zip": {
        "label": "Código postal",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "Dos letras, por ejemplo US, MX o CR.",
      "state": "Opcional. Déjalo vacío si tu país no lo usa.",
      "zip": "Opcional. Déjalo vacío si tu dirección no tiene código postal."
    },
    "errors": {
      "required": "Completa este campo para continuar.",
      "email": "Escribe un correo como nombre@example.com.",
      "country": "Escribe el código de país de dos letras, por ejemplo US."
    },
    "optional": "Opcional"
  }
};
