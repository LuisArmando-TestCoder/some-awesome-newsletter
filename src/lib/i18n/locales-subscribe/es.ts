// es strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale es
export default {
  "welcome": {
    "title": "Te damos la bienvenida al newsletter",
    "invitedBy": "{configuratorId} te invitó a suscribirte."
  },
  "email": {
    "title": "¿A dónde enviamos cada edición?",
    "placeholder": "Tu correo electrónico"
  },
  "name": {
    "title": "¿Cómo te llamas?",
    "placeholder": "Tu nombre"
  },
  "language": {
    "title": "¿En qué idioma quieres leer?"
  },
  "subscribed": {
    "title": "Ya estás suscrito",
    "subtitle": "Revisa tu bandeja de entrada: te enviamos un correo de confirmación.",
    "continueTo": "Continuar a",
    "finishingUp": "Puedes cerrar esta página."
  },
  "form": {
    "heading": "Suscríbete a {title}",
    "headingFallback": "Suscríbete a este newsletter",
    "intro": "Las nuevas ediciones llegan por correo, escritas en el idioma que elijas.",
    "from": "De {sender}",
    "emailLabel": "Correo electrónico",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Nombre",
    "optional": "opcional",
    "nameHint": "Lo usamos para saludarte. Si lo dejas vacío, usamos el inicio de tu dirección de correo.",
    "languageLabel": "Idioma de tus ediciones",
    "languageSummary": "Ediciones en {language}.",
    "languageChange": "Cambiar",
    "languageHint": "Lo tomamos de la configuración de tu navegador.",
    "submit": "Suscribirme",
    "submitting": "Suscribiendo...",
    "consent": "Al suscribirte, aceptas recibir correos de {sender}. Cada correo tiene un enlace para darte de baja.",
    "privacy": "Política de privacidad",
    "loadingInfo": "Cargando los datos del newsletter"
  },
  "success": {
    "title": "Revisa tu bandeja de entrada",
    "body": "Enviamos un correo de confirmación a {email}. Ábrelo y selecciona Confirmar suscripción.",
    "next": "Tu primera edición llega después de que confirmes, escrita en {language}.",
    "spam": "Si no llega nada en unos minutos, busca en tu carpeta de spam o de Promociones.",
    "changeEmail": "Usar otro correo",
    "continueTo": "Continuar a {host}"
  },
  "errors": {
    "emailRequired": "Escribe tu dirección de correo.",
    "emailInvalid": "Esta dirección de correo parece incompleta. Revísala e inténtalo de nuevo.",
    "missingLink": "A este enlace de suscripción le falta información. Pide un enlace nuevo al remitente.",
    "notFound": "Este enlace de suscripción ya no funciona. Pide un enlace nuevo al remitente.",
    "limit": "Este newsletter no puede aceptar nuevos suscriptores en este momento. Inténtalo más tarde.",
    "invalid": "No pudimos aceptar esta dirección. Revísala e inténtalo de nuevo.",
    "server": "No pudimos guardar tu suscripción. Inténtalo de nuevo en un momento.",
    "network": "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo."
  },
  "confirm": {
    "title": "Confirma tu suscripción",
    "body": "Selecciona el botón para empezar a recibir ediciones en {email}.",
    "button": "Confirmar suscripción",
    "confirming": "Confirmando...",
    "consent": "Al confirmar, aceptas recibir este newsletter por correo. Puedes darte de baja desde cualquier edición.",
    "successTitle": "Ya estás suscrito",
    "successBody": "Las nuevas ediciones llegarán a {email}.",
    "successTip": "Para que no terminen en spam, agrega al remitente a tus contactos.",
    "invalidTitle": "Este enlace está incompleto",
    "invalidBody": "Abre de nuevo el correo de confirmación y selecciona su botón. Si no lo encuentras, vuelve a suscribirte desde la página del remitente.",
    "notFoundBody": "No encontramos una suscripción para esta dirección. Vuelve a suscribirte desde la página del remitente.",
    "errorBody": "No pudimos confirmar tu suscripción. Inténtalo de nuevo en un momento.",
    "retry": "Intentar de nuevo",
    "home": "Ir a la página de inicio"
  },
  "embed": {
    "title": "Agrega un formulario de suscripción a tu sitio",
    "intro": "Pega uno de estos fragmentos en tu sitio web. Quienes se suscriben reciben un correo de confirmación y después tus ediciones en su propio idioma.",
    "linkLabel": "Enlace a la página de suscripción",
    "linkHint": "Compártelo en la biografía de una red social, en una firma de correo o en un código QR.",
    "scriptLabel": "Etiqueta script (recomendada)",
    "scriptHint": "Pégala donde debe aparecer el formulario. El formulario ajusta su tamaño solo.",
    "iframeLabel": "Iframe",
    "iframeHint": "Usa esta opción si tu sitio no permite scripts.",
    "copy": "Copiar",
    "copied": "Copiado",
    "copyFailed": "Selecciona el texto y cópialo manualmente.",
    "options": "Opciones del formulario",
    "accent": "Color del botón",
    "accentHint": "Déjalo como está para usar el color de tu marca.",
    "theme": "Tema",
    "themeAuto": "Según la configuración del visitante",
    "themeLight": "Claro",
    "themeDark": "Oscuro",
    "layout": "Diseño",
    "layoutFull": "Completo (título, nombre e idioma)",
    "layoutCompact": "Compacto (correo y botón)",
    "preview": "Vista previa",
    "previewNote": "La vista previa es real. Una suscripción aquí crea un suscriptor real.",
    "missing": "Primero crea un newsletter. El formulario de suscripción aparece aquí cuando exista."
  },
  "page": {
    "poweredBy": "Funciona con AIBAN",
    "title": "Suscribirse"
  },
  "signature": {
    "title": "Firma de correo",
    "intro": "Los lectores ven esto al final de cada edición. Haz clic en cualquier parte de la vista previa para editarla.",
    "show": "Mostrar mi firma en cada edición",
    "showHint": "Si la desactivas, las ediciones terminan después del artículo.",
    "preview": "Vista previa",
    "previewEmpty": "Tu firma está vacía. Agrega tu nombre para empezar.",
    "articleEnd": "Fin del artículo",
    "tabContent": "Contenido",
    "tabStyle": "Estilo",
    "blocks": "Qué incluir",
    "blocksHint": "Selecciona una etiqueta para mostrar u ocultar esa parte. Las partes ocultas conservan su texto.",
    "layout": "Diseño",
    "layouts": {
      "bar": "Barra de color",
      "photo": "Foto",
      "stacked": "Apilado",
      "centered": "Centrado",
      "minimal": "Solo texto"
    },
    "fields": {
      "name": "Nombre",
      "role": "Cargo",
      "company": "Empresa",
      "phone": "Teléfono",
      "email": "Correo",
      "website": "Sitio web",
      "address": "Dirección",
      "photoUrl": "Foto",
      "logoUrl": "Logo",
      "socials": "Redes sociales",
      "cta": "Botón",
      "disclaimer": "Nota legal"
    },
    "groups": {
      "about": "Sobre ti",
      "contact": "Contacto",
      "images": "Imágenes",
      "socials": "Redes sociales",
      "cta": "Botón",
      "disclaimer": "Nota legal"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Fundadora",
      "company": "Estudio Ribera",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Calle Principal 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Agenda una llamada",
      "ctaUrl": "https://"
    },
    "ctaText": "Texto del botón",
    "ctaLink": "Enlace del botón",
    "hints": {
      "photoUrl": "Enlace a un PNG o JPG cuadrado, de al menos 144 por 144 píxeles y menos de 200 KB. Se muestra a 72 por 72 píxeles junto a tu nombre.",
      "logoUrl": "Enlace a un PNG o JPG con fondo transparente o blanco, de al menos 64 píxeles de alto. Se muestra con 32 píxeles de alto.",
      "website": "Agregamos https:// si no lo escribes.",
      "cta": "Para que el botón aparezca se necesitan el texto y el enlace.",
      "disclaimer": "Letra pequeña al final, por ejemplo una nota de confidencialidad. Déjalo vacío si no la necesitas."
    },
    "style": {
      "accent": "Color de acento",
      "accentHint": "Se usa en la barra, los enlaces y el botón. Empieza con el color de tu marca.",
      "font": "Fuente",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Tamaño del texto",
      "sizeMd": "Normal",
      "sizeSm": "Pequeño",
      "shape": "Forma de la foto",
      "shapeRound": "Redonda",
      "shapeSquare": "Cuadrada"
    },
    "hidden": "oculto",
    "reset": "Empezar de nuevo",
    "resetConfirm": "Selecciona otra vez para vaciar todos los campos"
  }
};
