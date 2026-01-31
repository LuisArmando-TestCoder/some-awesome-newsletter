export default {
  step01: {
    title: "La IA que suena humana escribe boletines para tus suscriptores en automático",
    subtitle: "Con qué frecuencia, selecciona <u>cada mes</u> o <u>cada semana</u> o <u>cada día</u> o <u>a qué hora</u>"
  },
  step02: {
    title: "Idioma del boletín",
    subtitle: "“tu boletín también se enviará en el idioma específico de cada usuario si es diferente”"
  },
  step03: {
    title: "Redirección (Opcional)",
    subtitle: "¿Quieres redirigir al usuario a tu página?",
    description: "Puedes pegar un enlace a tu página aquí, contaremos cuántos entran desde los correos que crea la IA",
    placeholder: "https://tu-pagina.com"
  },
  step04: {
    title: "Tipo de noticias que quieres que la IA elija",
    subtitle: "Qué tema de conversación o tópico (inferido del enlace de redirección si está establecido, de lo contrario vacío)",
    placeholder: "ej. Inteligencia Artificial, Marketing, Salud..."
  },
  step05: {
    title: "Personaliza tu Firma",
    subtitle: "Diseña visualmente o edita el código directamente",
    visualEditor: "Editor Visual",
    htmlSource: "Fuente HTML",
    livePreview: "Vista Previa en Vivo",
    yourName: "Tu Nombre",
    yourTitle: "Tu Título",
    facebookProfile: "Perfil de Facebook",
    instagramProfile: "Perfil de Instagram",
    editHtml: "Editar HTML directamente...",
    warning: "⚠️ Las ediciones hechas aquí se sobrescribirán si vuelves al Editor Visual y haces cambios."
  },
  step06: {
    title: "Fuente de Noticias",
    subtitle: "¿Qué sitio web de noticias quieres usar?",
    description: "Ingresa una URL o déjanos elegir una por ti basada en tu tema.",
    descriptionSmall: "Analizaremos el sitio web para encontrar el mejor contenido. Esto puede tomar unos segundos.",
    placeholder: "https://ejemplo.com",
    analyzing: "Analizando...",
    next: "Siguiente",
    errors: {
      failedToGenerate: "Error al generar el selector. Por favor intenta de nuevo o verifica la URL.",
      errorGenerating: "Ocurrió un error al generar el selector.",
      invalidUrl: "Por favor ingresa una URL válida o elige una fuente."
    }
  },
  step07: {
    title: "Selector de Contenido",
    subtitle: "Piensa en cada sitio web como una <strong>biblioteca con un diseño único</strong>.",
    explanation1: "Este <strong>'Selector'</strong> es el mapa específico que creamos para este sitio web. Le dice a nuestro sistema exactamente dónde buscar para recoger los artículos que quieres, ignorando botones de menú y anuncios.",
    explanation2: "<strong>Hemos poblado este mapa para ti automáticamente.</strong>",
    placeholder: "Cadena del selector...",
    regenerate: "Regenerar Selector",
    regenerating: "Regenerando...",
    errors: {
      noUrl: "No se encontró URL de fuente de noticias.",
      failedRegenerate: "Error al regenerar el selector.",
      errorRegenerate: "Ocurrió un error al regenerar el selector."
    }
  },
  step08: {
    title: "Vista Previa",
    placeholder: "¿Listo para generar tu primer boletín?",
    generateBtn: "Generar Correo del Boletín",
    sentBtn: "¡Enviado! Revisa tu correo",
    sendTestBtn: "Enviar Correo de Prueba",
    regenerateBtn: "Regenerar",
    loading: {
      initializing: "Inicializando...",
      starting: "Iniciando generación...",
      scraping: "Extrayendo contenido...",
      translating: "Traduciendo artículo...",
      formatting: "Formateando correo...",
      sending: "Conectando al proveedor de correo...",
      authenticating: "Autenticando...",
      sendingArticle: "Enviando artículo...",
      creating: "Creando fuente de noticias...",
      saving: "Guardando configuración...",
      finalizing: "Finalizando configuración..."
    },
    errors: {
      generationFailed: "La generación falló: ",
      createFailed: "Error al crear la fuente de noticias. Por favor intenta de nuevo.",
      errorCreating: "Error creando fuente de noticias: ",
      sendFailed: "Error al enviar correo: "
    },
    defaultSubject: "Vista Previa de tu Boletín Generado"
  },
  step09: {
    title: "Para enviar el artículo desde tu correo",
    subtitle: "Contraseña de Aplicación (Opcional)",
    description: "(Si tienes servicios de gmail, pon tu contraseña de aplicación aquí)",
    label: "Contraseña de Aplicación",
    placeholder: "Tu Contraseña de Aplicación"
  },
  step10: {
    title: "Dirección de Gmail (Opcional)",
    subtitle: "Dirección de Correo Gmail",
    description: "Si quieres enviar desde una dirección de Gmail específica",
    placeholder: "tu-correo@gmail.com"
  },
  step11: {
    title: "Enviar Correo de Prueba",
    subtitle: "Envía un correo de prueba a ti mismo para verificar la configuración.",
    sendNow: "Enviar Ahora",
    sent: "¡Enviado! Revisa tu correo",
    loading: {
      connecting: "Conectando al proveedor de correo...",
      authenticating: "Autenticando...",
      sending: "Enviando artículo..."
    }
  },
  step12: {
    title: "Comparte este boletín con tus seguidores",
    subtitle: "Enlace al embudo de suscripción (antes de que empiecen a recibir correos, tendrían que aceptar tu invitación)",
    copy: "Copiar",
    copied: "¡Enlace copiado!"
  },
  step13: {
    title: "Plan y Límites",
    currentPlan: "Plan Actual:",
    limits: "Límites:",
    unknown: "Desconocido",
    changePlan: "Cambiar Plan",
    advancedFeatures: "¿Necesitas funciones más avanzadas?",
    developerText: "Revisa nuestra sección de desarrolladores para integrar este embudo de suscripción al boletín en tu servidor, un blog de todos tus artículos generados, y suscribir usuarios desde tu base de código con nuestra clave API.",
    dashboardBtn: "Ir al Panel",
    usage: "Uso:",
    limitDetails: {
      free: "Límite de 100 usuarios",
      starter: "5 fuentes, 100k usuarios",
      growth: "17 fuentes, 250k usuarios",
      pro: "25 fuentes, 500k usuarios",
      master: "50 fuentes, usuarios ilimitados",
      vipfree: "VIP Gratis"
    }
  }
};
