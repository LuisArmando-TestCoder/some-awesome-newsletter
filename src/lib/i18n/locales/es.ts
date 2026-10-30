// es strings for locales. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale es
export default {
  "auth": {
    "logo": "/icons/logo.png",
    "login": {
      "pageTitle": "Iniciar sesión",
      "title": "Inicia sesión en AIBAN",
      "subtitle": "Conéctate para continuar donde lo dejaste.",
      "google": "Continuar con Google",
      "or": "o",
      "emailPlaceholder": "tu@ejemplo.com",
      "continueWithEmail": "Continuar con correo",
      "switchText": "¿No tienes una cuenta?",
      "switchLink": "Regístrate",
      "switchHref": "/signup"
    },
    "signup": {
      "pageTitle": "Crear cuenta",
      "title": "Crea tu cuenta",
      "subtitle": "No necesitas tarjeta de crédito.",
      "google": "Continuar con Google",
      "or": "o",
      "emailPlaceholder": "tu@ejemplo.com",
      "continueWithEmail": "Continuar con correo",
      "switchText": "¿Ya tienes una cuenta?",
      "switchLink": "Inicia sesión",
      "switchHref": "/login"
    }
  },
  "landing": {
    "seo": {
      "title": "AIBAN | Tu sitio web convertido en un newsletter en el idioma de cada lector",
      "description": "AIBAN lee lo que ya publicas, escribe una edición del newsletter con tu voz y la envía con tu nombre. Cada suscriptor la recibe en su propio idioma.",
      "ogImageAlt": "Logo de AIBAN"
    },
    "skipLink": "Saltar al contenido principal",
    "hero": {
      "eyebrow": "Newsletters para empresas de servicios",
      "title": "Tu sitio web se convierte en un newsletter semanal, en el idioma de cada lector",
      "lead": "AIBAN lee el contenido que ya publicas, escribe una edición con tu voz y la envía con tu nombre. Cada suscriptor la recibe en el idioma en que lee. Lo configuras una vez y sigue funcionando.",
      "formLabel": "Tu sitio web",
      "formPlaceholder": "tuempresa.com",
      "formHint": "Creamos una edición de muestra a partir de la dirección que escribas. Empezar es gratis y no necesitas tarjeta.",
      "formSubmit": "Ver mi newsletter",
      "formError": "Escribe una dirección web, por ejemplo tuempresa.com.",
      "secondaryCta": "Ver cómo funciona"
    },
    "preview": {
      "badge": "Vista previa de muestra",
      "note": "Este es un diseño de muestra con texto de relleno. Cuando empiezas, AIBAN escribe la edición real a partir de tu artículo más reciente.",
      "fromLabel": "De",
      "toLabel": "Para",
      "subjectLabel": "Asunto",
      "languageLabel": "Idioma del lector",
      "readOnBlog": "Leer en el blog",
      "startCta": "Empieza gratis con {site}",
      "startCtaGeneric": "Empieza gratis",
      "liveRegion": "Vista previa de muestra actualizada para {site}."
    },
    "chain": {
      "eyebrow": "Cómo funciona",
      "title": "Lo configuras una vez y después funciona solo",
      "lead": "Le das a AIBAN tu sitio web una sola vez. Después, cada paso de abajo ocurre por sí solo, con la frecuencia que elijas.",
      "triggerLabel": "Cuando",
      "actionLabel": "Entonces",
      "trigger": {
        "title": "Es lunes a las 9:00",
        "body": "O la frecuencia que elijas: diaria, semanal o mensual."
      },
      "steps": [
        {
          "title": "AIBAN encuentra tu artículo más reciente",
          "body": "Revisa tu sitio web y elige el contenido que más le interesará a tu lector ideal."
        },
        {
          "title": "Escribe la edición con tu voz",
          "body": "El texto se reescribe para que suene como tú, según cómo está escrito tu sitio."
        },
        {
          "title": "Traduce la edición para cada lector",
          "body": "Cada suscriptor la recibe en el idioma que eligió al registrarse."
        },
        {
          "title": "Se envía con tu nombre",
          "body": "Los lectores ven tu nombre y sus respuestas llegan a tu bandeja de entrada."
        },
        {
          "title": "Publica la edición en tu blog",
          "body": "Cada edición también tiene una página pública de artículo con su propio enlace."
        },
        {
          "title": "Te muestra lo que pasó",
          "body": "Tu panel muestra quién se suscribió y en qué enlaces hicieron clic los lectores."
        }
      ],
      "alsoTitle": "También funciona cuando",
      "also": [
        {
          "title": "Alguien se suscribe en tu sitio",
          "body": "Confirma por correo y empieza a recibir tus ediciones."
        },
        {
          "title": "Pegas un enlace o un texto",
          "body": "AIBAN escribe y envía una edición sobre ese tema con los mismos pasos."
        },
        {
          "title": "Subes una lista de contactos",
          "body": "AIBAN limpia la lista, elimina duplicados y deduce el idioma de cada contacto."
        }
      ]
    },
    "languages": {
      "eyebrow": "Todos los idiomas",
      "title": "Cada lector recibe la edición en su propio idioma",
      "body": "No tienes que escribir versiones separadas. AIBAN traduce cada edición a todos los idiomas que leen tus suscriptores y mantiene tu tono en cada uno. La lista incluye español, portugués, francés, alemán, hindi, árabe, japonés y muchos más.",
      "sampleNote": "La misma edición de muestra, tal como la recibirían tres lectores."
    },
    "sender": {
      "eyebrow": "Tu dirección",
      "title": "Enviado con tu nombre",
      "body": "Las ediciones llegan con tu nombre y tu firma de correo. AIBAN las envía desde su propia dirección verificada, así que nunca nos das la contraseña de tu correo. Cuando un lector responde, la respuesta llega a tu bandeja de entrada.",
      "inboxLabel": "Cómo se ve en la bandeja de entrada de un lector",
      "inboxFrom": "Tú",
      "inboxSubject": "Esta semana en {site}",
      "inboxSnippet": "Un breve resumen de tu artículo más reciente, escrito con tu voz.",
      "inboxTime": "9:00"
    },
    "grow": {
      "eyebrow": "Haz crecer tu lista",
      "title": "Un formulario de suscripción para tu sitio y un blog que se llena solo",
      "items": [
        {
          "title": "Formulario de suscripción",
          "body": "Agrega el formulario de AIBAN a tu sitio web. Los nuevos lectores eligen su idioma y confirman por correo."
        },
        {
          "title": "Blog automático",
          "body": "Cada edición se convierte en una página pública de artículo que la gente puede encontrar en buscadores y compartir con un enlace."
        },
        {
          "title": "Importación de contactos",
          "body": "Trae a los clientes que ya tienes desde un archivo CSV o Excel, o pega una lista."
        }
      ]
    },
    "useCases": {
      "eyebrow": "Para quién es",
      "title": "Hecho para negocios que crecen gracias a sus relaciones",
      "lead": "Si tus clientes llegan por recomendaciones y confianza, una nota tuya con regularidad hace que te tengan presente. AIBAN escribe esa nota por ti.",
      "items": [
        {
          "title": "Agencias y diseñadores web",
          "body": "Envía cada semana tus trabajos y artículos más recientes a clientes y prospectos, y usa la misma configuración para los sitios de tus clientes."
        },
        {
          "title": "Empresas de TI y software",
          "body": "Convierte notas de versión y artículos del blog en una actualización breve que cada cliente lee en su idioma."
        },
        {
          "title": "Bienes raíces",
          "body": "Comparte nuevas propiedades y artículos sobre el mercado con compradores y vendedores que hablan distintos idiomas."
        },
        {
          "title": "Abogados y contadores",
          "body": "Mantén a tus clientes informados sobre los temas de los que ya escribes, con un formato tranquilo y constante."
        },
        {
          "title": "Coaches y formadores",
          "body": "Envía tu última lección o artículo a tu comunidad en un día fijo, sin tener que escribirlo de nuevo."
        }
      ]
    },
    "pricingIntro": {
      "eyebrow": "Precios",
      "title": "Empieza gratis y cambia de plan cuando tu lista crezca",
      "lead": "El plan gratuito incluye 1 fuente y hasta 100 suscriptores. Los planes de pago agregan más fuentes y más suscriptores."
    },
    "faqTitle": "Preguntas frecuentes antes de empezar",
    "faq": [
      {
        "id": "what-do-i-need",
        "q": "¿Qué necesito para empezar?",
        "a": "La dirección de tu sitio web y una dirección de correo. AIBAN lee tu sitio para conocer tus temas y tu forma de escribir."
      },
      {
        "id": "do-i-write",
        "q": "¿Tengo que escribir algo?",
        "a": "No es necesario. AIBAN escribe cada edición a partir de tu contenido. Si quieres una edición sobre algo concreto, puedes pegar un enlace o un texto."
      },
      {
        "id": "languages",
        "q": "¿En qué idiomas pueden recibirlo mis lectores?",
        "a": "AIBAN traduce cada edición al idioma que lee cada suscriptor. Puedes ver la lista completa de idiomas al configurar tu newsletter."
      },
      {
        "id": "sender",
        "q": "¿Desde qué dirección llegan los correos?",
        "a": "Desde la dirección de envío de AIBAN, con tu nombre como remitente. Las respuestas llegan directamente a tu bandeja de entrada. Nunca nos das la contraseña de tu correo."
      },
      {
        "id": "contacts",
        "q": "¿Puedo traer mis contactos actuales?",
        "a": "Sí. Sube un archivo CSV o Excel, o pega una lista. AIBAN la limpia, elimina duplicados y deduce el idioma de cada contacto."
      },
      {
        "id": "schedule",
        "q": "¿Con qué frecuencia se envían las ediciones?",
        "a": "Eliges la frecuencia durante la configuración y puedes cambiarla cuando quieras desde tu panel."
      },
      {
        "id": "free-plan",
        "q": "¿Hay un plan gratuito?",
        "a": "Sí. El plan gratuito incluye 1 fuente y hasta 100 suscriptores. Los planes de pago agregan más fuentes y suscriptores."
      },
      {
        "id": "cancel",
        "q": "¿Puedo cancelar?",
        "a": "Sí. Escribe a info@aiban.news cuando quieras y cancelaremos tu plan de pago o te pasaremos de nuevo al plan gratis."
      }
    ],
    "finalCta": {
      "title": "Empieza con tu sitio web",
      "body": "Dale a AIBAN tu sitio web, revisa tu primera edición y actívalo cuando estés listo.",
      "cta": "Empieza gratis",
      "secondary": "Leer el centro de ayuda"
    },
    "footer": {
      "tagline": "Newsletters escritos a partir de tu propio contenido y enviados en el idioma de cada lector.",
      "product": "Producto",
      "company": "Empresa",
      "legal": "Legal",
      "links": {
        "howItWorks": "Cómo funciona",
        "pricing": "Precios",
        "demo": "Demo",
        "help": "Centro de ayuda",
        "about": "Acerca de",
        "careers": "Empleo",
        "privacy": "Política de privacidad",
        "terms": "Términos del servicio",
        "cookies": "Política de cookies"
      },
      "contactLabel": "Contacto",
      "rights": "Todos los derechos reservados."
    }
  },
  "help": {
    "title": "Solicitar límites más altos",
    "subtitle": "Cuéntanos los límites que necesitas y te responderemos por correo.",
    "contact": {
      "cta": "Enviar solicitud",
      "successTitle": "Solicitud lista para enviar",
      "successBody": "Tu aplicación de correo se abrió con tu solicitud. Envíala desde ahí y te responderemos por correo.",
      "learnMore": "/plans"
    },
    "questions": {
      "desiredLimitsHelp": "Indica los límites que necesitas, por ejemplo cuántos suscriptores y fuentes.",
      "useCaseHelp": "Describe qué envías, a quién y con qué frecuencia.",
      "expectedSpendHelp": "Un cálculo aproximado nos ayuda a sugerirte un plan. Puedes dejarlo como desconocido."
    },
    "form": {
      "nameLabel": "Nombre",
      "emailLabel": "Correo electrónico",
      "companyLabel": "Empresa",
      "optional": "(opcional)",
      "limitsLabel": "Límites que necesitas",
      "useCaseLabel": "Cómo usas AIBAN",
      "spendLabel": "Gasto mensual previsto",
      "spend": {
        "lt500": "Menos de $500",
        "500_2k": "De $500 a $2,000",
        "2k_10k": "De $2,000 a $10,000",
        "gt10k": "Más de $10,000",
        "unknown": "Todavía no lo sé"
      },
      "urgencyLabel": "Urgencia",
      "urgency": {
        "low": "Baja",
        "normal": "Normal",
        "high": "Alta"
      },
      "replyLabel": "¿Cómo prefieres que te respondamos?",
      "reply": {
        "email": "Por correo electrónico",
        "call": "Por llamada telefónica"
      },
      "payAsYouGo": "Me interesa pagar según lo que use",
      "sending": "Enviando...",
      "sentTitle": "Solicitud enviada",
      "sentBody": "Recibimos tu solicitud y te responderemos en el correo que nos diste.",
      "retryBefore": "Si tu aplicación de correo no se abrió,",
      "retryLink": "abre la solicitud de nuevo",
      "retryAfter": "o escribe a",
      "errors": {
        "name": "Escribe tu nombre (al menos 2 caracteres).",
        "email": "Escribe un correo al que podamos responder, por ejemplo nombre@ejemplo.com.",
        "company": "Escribe al menos 2 caracteres o deja este campo vacío.",
        "desiredLimits": "Describe los límites que necesitas en al menos 10 caracteres.",
        "useCase": "Describe cómo lo usas en al menos 20 caracteres."
      }
    },
    "faqs": [
      {
        "id": "limits-how",
        "q": "¿Cómo funcionan los límites más altos?",
        "a": "Envía una solicitud con los límites que necesitas. Te responderemos por correo con las opciones para tu cuenta."
      }
    ],
    "links": {
      "docs": "/plans",
      "community": "/help"
    }
  },
  "faq": [
    {
      "q": "¿Qué hace AIBAN?",
      "a": "AIBAN lee contenido que ya publicas, como tu sitio web, tu blog o los sitios de noticias que elijas. Escribe nuevas ediciones con tu voz y las envía como newsletter. Cada suscriptor la recibe en el idioma que eligió, con tu nombre como remitente."
    },
    {
      "q": "¿Hay un plan gratuito?",
      "a": "Sí. El plan gratis incluye 1 fuente y hasta 100 suscriptores. Si necesitas más, escríbenos y cambiaremos tu plan."
    },
    {
      "q": "¿Cómo reciben los suscriptores el newsletter en su idioma?",
      "a": "Cada suscriptor elige un idioma preferido al registrarse. AIBAN traduce cada edición a ese idioma antes de enviarla."
    },
    {
      "q": "¿Las ediciones pueden salir desde mi propio correo?",
      "a": "Las ediciones salen desde la dirección de envío de AIBAN con tu nombre y tu firma de correo, y las respuestas llegan a tu bandeja de entrada. No te pedimos la contraseña de tu correo, así que no hay nada tuyo que se pueda filtrar."
    },
    {
      "q": "¿Cómo se suscribe la gente?",
      "a": "Tienes una página de suscripción y un widget de suscripción que puedes poner en tu sitio web. También puedes agregar personas tú mismo o subir una lista."
    },
    {
      "q": "¿Puedo cancelar cuando quiera?",
      "a": "Sí. Escribe a info@aiban.news cuando quieras y cancelaremos tu plan de pago o te pasaremos de nuevo al plan gratis."
    }
  ],
  "plans": {
    "currency": "USD",
    "billingIntervals": [
      "mensual",
      "anual"
    ],
    "currentPlan": "free",
    "plans": [
      {
        "id": "free",
        "name": "Gratis",
        "monthly": 0,
        "yearly": 0,
        "tagline": "Prueba AIBAN con una fuente",
        "featuresBase": [
          "1 fuente",
          "Hasta 100 suscriptores"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": 1,
          "users": 100
        },
        "ctaLabel": "Plan actual",
        "tier": 0
      },
      {
        "id": "starter",
        "name": "Starter",
        "monthly": 17,
        "yearly": 132,
        "tagline": "Para newsletters en crecimiento",
        "featuresBase": [
          "5 fuentes",
          "Hasta 100k suscriptores"
        ],
        "featuresDelta": [
          "Soporte por correo",
          "Traducción básica"
        ],
        "limits": {
          "newsSources": 5,
          "users": 100000
        },
        "ctaLabel": "Elegir Starter",
        "productId": "prod_starter_id",
        "tier": 1
      },
      {
        "id": "growth",
        "name": "Growth",
        "monthly": 35,
        "yearly": 273,
        "tagline": "Para newsletters ya consolidados",
        "featuresBase": [
          "17 fuentes",
          "Hasta 250k suscriptores"
        ],
        "featuresDelta": [
          "Branding personalizado",
          "Analítica avanzada"
        ],
        "limits": {
          "newsSources": 17,
          "users": 250000
        },
        "ctaLabel": "Elegir Growth",
        "productId": "prod_growth_id",
        "tier": 2
      },
      {
        "id": "pro",
        "name": "Pro",
        "monthly": 80,
        "yearly": 624,
        "tagline": "Para profesionales del marketing",
        "featuresBase": [
          "25 fuentes",
          "Hasta 500k suscriptores"
        ],
        "featuresDelta": [
          "Acceso a la API",
          "Procesamiento prioritario"
        ],
        "limits": {
          "newsSources": 25,
          "users": 500000
        },
        "ctaLabel": "Elegir Pro",
        "productId": "prod_pro_id",
        "tier": 3
      },
      {
        "id": "master",
        "name": "Master",
        "monthly": 150,
        "yearly": 1170,
        "tagline": "Para audiencias grandes",
        "featuresBase": [
          "50 fuentes",
          "Suscriptores ilimitados"
        ],
        "featuresDelta": [
          "Soporte guante blanco",
          "Webhooks personalizados"
        ],
        "limits": {
          "newsSources": 50,
          "users": -1
        },
        "ctaLabel": "Elegir Master",
        "productId": "prod_master_id",
        "tier": 4
      },
      {
        "id": "vipfree",
        "name": "VIP Gratis",
        "monthly": 0,
        "yearly": 0,
        "tagline": "Acceso total para socios",
        "featuresBase": [
          "Fuentes ilimitadas",
          "Suscriptores ilimitados"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": -1,
          "users": -1
        },
        "ctaLabel": "Plan actual",
        "internalOnly": true,
        "tier": 5
      }
    ],
    "contact": {
      "text": "¿Necesitas una solución a medida?",
      "cta": "Contáctanos",
      "href": "/help"
    }
  },
  "article": {
    "notFound": "Artículo no encontrado.",
    "errorFetching": "No pudimos cargar este artículo. Vuelve a cargar la página en un minuto para intentarlo de nuevo.",
    "noArticleSpecified": "No se especificó ningún artículo.",
    "goBack": "Volver",
    "loading": "Cargando..."
  },
  "pricing": {
    "eyebrow": "Precios",
    "title": "Planes y precios",
    "currentPlan": "Plan actual:",
    "monthly": "Mensual",
    "yearly": "Anual",
    "yearlySave": "Ahorra 35%",
    "intervalLabel": "Periodo de facturación",
    "billedYearly": "facturado anualmente",
    "perMonthShort": "/mo",
    "perYearShort": "/yr",
    "freeCta": "Empieza gratis",
    "processing": "Abriendo el pago...",
    "askMore": "Todas las cuentas empiezan en el plan Gratis. Si necesitas más, escríbenos a {email} y cambiaremos tu plan.",
    "askFor": "Pedir {planName}",
    "askAction": "Escríbenos",
    "checkoutError": "No pudimos abrir el pago. Inténtalo de nuevo en un momento.",
    "networkError": "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.",
    "includes": "Incluye",
    "pageMetaTitle": "Precios | AIBAN",
    "pageMetaDescription": "Planes y precios de AIBAN. Empieza gratis con 1 fuente y hasta 100 suscriptores, y pasa a un plan mensual o anual cuando necesites más.",
    "pageTitle": "Precios",
    "pageLead": "Empieza en el plan gratis con 1 fuente y hasta 100 suscriptores. Cuando necesites más fuentes o más suscriptores, escríbenos y te pasaremos a un plan de pago, con cobro mensual o anual.",
    "faqTitle": "Preguntas sobre facturación",
    "contactText": "¿Necesitas límites más altos o una configuración a medida?",
    "contactCta": "Contáctanos",
    "everythingIn": "Todo lo del plan anterior, más:",
    "isCurrentPlan": "Este es tu plan actual",
    "downgradeTo": "Cambiar a {planName}",
    "upgradeTo": "Elegir {planName}",
    "mockMode": "Modo de prueba",
    "mostPopular": "Más popular",
    "perMonth": "por mes",
    "perYear": "por año",
    "youSave": "Ahorras"
  },
  "confirmSubscription": {
    "title": "Confirma tu suscripción",
    "goBack": "Volver",
    "pleaseAccept": "Por favor, acepta los términos para completar tu suscripción.",
    "iAccept": "Acepto los",
    "termsAndConditions": "Términos y condiciones",
    "and": "y la",
    "privacyPolicy": "Política de privacidad",
    "confirm": "Confirmar suscripción",
    "mustAccept": "Debes aceptar los términos para suscribirte.",
    "invalidLink": "Este enlace de confirmación está incompleto. Abre el último correo que te enviamos y usa el enlace que contiene."
  },
  "articles": {
    "title": "Últimos artículos",
    "subtitle": "Artículos que AIBAN escribió para los newsletters que envía.",
    "producedIn": "Idiomas en los que están disponibles estos artículos",
    "searchPlaceholder": "Buscar artículos...",
    "noArticlesFound": "No se encontraron artículos.",
    "created": "Creado:",
    "language": "Idioma:",
    "rightsReserved": "Todos los derechos reservados.",
    "errorFetching": "No pudimos cargar los artículos. Vuelve a cargar la página en un minuto para intentarlo de nuevo."
  },
  "blog": {
    "metaTitle": "Blog de {name}",
    "metaDescription": "Artículos de {name}. Suscríbete para recibir los nuevos por correo.",
    "eyebrow": "Blog del newsletter",
    "heroFrom": "Artículos de {name}",
    "heroDescription": "Estos son los artículos que ha publicado este newsletter. Suscríbete para recibir los nuevos por correo.",
    "subscribe": "Suscribirse",
    "home": "Inicio del blog",
    "featured": "Último artículo",
    "latest": "Últimos artículos",
    "latestHint": "Los más recientes primero. Algunos artículos no tienen imagen, así que se muestran solo como texto.",
    "articleCount": "{count} artículos en {language}",
    "articleCountOne": "1 artículo en {language}",
    "languages": "Elige un idioma",
    "minRead": "{n} min de lectura",
    "readArticle": "Leer artículo",
    "page": "Página {page}",
    "newer": "Artículos más recientes",
    "older": "Artículos anteriores",
    "pagination": "Páginas de artículos",
    "emptyTitle": "Todavía no hay artículos",
    "emptyBody": "Este newsletter aún no ha publicado artículos aquí. Suscríbete para recibir el primero por correo.",
    "endTitle": "No hay artículos anteriores",
    "endBody": "Llegaste al final de la lista.",
    "backToNewest": "Ir a los artículos más recientes",
    "errorTitle": "No pudimos cargar estos artículos",
    "errorBody": "El servidor de artículos no respondió a tiempo. Vuelve a cargar la página en un minuto para intentarlo de nuevo.",
    "reload": "Volver a cargar la página",
    "missingHolder": "Este enlace del blog está incompleto porque no indica de quién es el blog. Pide el enlace completo al dueño del newsletter.",
    "redirecting": "Abriendo el blog...",
    "publishedWith": "Publicado con AIBAN",
    "cta": {
      "title": "Recibe el próximo artículo por correo",
      "body": "Suscríbete a {name} y los nuevos artículos llegarán a tu bandeja de entrada. Puedes darte de baja cuando quieras.",
      "button": "Suscribirse"
    },
    "search": {
      "label": "Buscar artículos",
      "placeholder": "Busca por palabra o frase",
      "button": "Buscar",
      "suggestions": "Sugerencias",
      "recent": "Búsquedas recientes",
      "clearRecent": "Borrar búsquedas recientes",
      "title": "Resultados de búsqueda",
      "resultsFor": "Resultados para \"{q}\"",
      "count": "{count} artículos encontrados",
      "countOne": "1 artículo encontrado",
      "searching": "Buscando artículos",
      "emptyTitle": "Ningún artículo coincide con \"{q}\"",
      "emptyBody": "Revisa la ortografía o prueba con una palabra más corta. También puedes ver todos los artículos del blog.",
      "browseAll": "Ver todos los artículos",
      "noQuery": "Escribe una palabra o frase arriba para buscar en este blog.",
      "error": "La búsqueda se detuvo porque el servidor de artículos no respondió. Inténtalo de nuevo en un minuto.",
      "tryAgain": "Intentar de nuevo",
      "limitNote": "Se muestran las primeras {count} coincidencias. Usa una frase más específica para acotar la lista."
    },
    "article": {
      "back": "Todos los artículos",
      "published": "Publicado el {date}",
      "by": "Por {name}",
      "otherLanguages": "Leer más en otros idiomas",
      "otherLanguagesHint": "Este newsletter también publica en estos idiomas. Cada enlace abre el blog en ese idioma.",
      "share": "Compartir este artículo",
      "copyLink": "Copiar enlace",
      "copied": "Enlace copiado. Puedes pegarlo donde quieras.",
      "copyFailed": "No se pudo copiar el enlace. Cópialo desde la barra de direcciones del navegador.",
      "notFoundTitle": "Artículo no encontrado",
      "notFoundBody": "Es posible que este artículo se haya eliminado o que el enlace esté incompleto. Abre el blog para ver los demás artículos.",
      "errorTitle": "No pudimos cargar este artículo",
      "errorBody": "El servidor de artículos no respondió a tiempo. Vuelve a cargar la página en un minuto para intentarlo de nuevo.",
      "goToBlog": "Ir al blog"
    }
  },
  "nav": {
    "mainLabel": "Principal",
    "legalLabel": "Legal",
    "home": "Inicio de AIBAN",
    "menu": "Menú",
    "openMenu": "Abrir menú",
    "closeMenu": "Cerrar menú",
    "howItWorks": "Cómo funciona",
    "pricing": "Precios",
    "help": "Ayuda",
    "about": "Acerca de",
    "privacy": "Privacidad",
    "terms": "Términos",
    "cookies": "Cookies",
    "signOut": "Cerrar sesión",
    "chooseLanguage": "Elige un idioma",
    "currentLanguage": "Idioma: {name}"
  },
  "about": {
    "metaTitle": "Acerca de | AIBAN",
    "metaDescription": "AIBAN convierte el contenido que una empresa ya publica en un newsletter que sale solo, en el idioma de cada suscriptor y con el nombre del dueño.",
    "eyebrow": "Acerca de",
    "title": "Acerca de AIBAN",
    "lead": "AIBAN convierte el contenido que una empresa ya publica en un newsletter que sale solo. Cada suscriptor lo lee en su propio idioma y le llega con el nombre del dueño.",
    "whatTitle": "Qué hace AIBAN",
    "whatBody": [
      "Le indicas a AIBAN dónde está tu contenido: tu sitio web, tu blog o los sitios de noticias que sigues. Cuando aparece algo nuevo, AIBAN escribe una edición a partir de eso con la voz que describiste y la envía a tus suscriptores con la frecuencia que elegiste.",
      "Cada suscriptor elige un idioma al registrarse, y cada edición se traduce a ese idioma antes de enviarse. Los artículos también se publican como páginas web, y puedes enviarlos a tu propio sitio."
    ],
    "whoTitle": "Quién lo hace",
    "whoBody": [
      "AIBAN lo desarrolla Luis Murillo Baltodano, su fundador. Luis es un ingeniero creativo con experiencia en gráficos por computadora y automatización.",
      "Abajo aparece parte de su trabajo de código abierto."
    ],
    "projectsTitle": "Trabajo de código abierto del fundador",
    "projects": [
      {
        "name": "Scene Preset",
        "url": "https://github.com/LuisArmando-TestCoder/scene-preset",
        "desc": "Una librería que elimina el código repetitivo al trabajar con Three.js y las API web de 3D."
      },
      {
        "name": "Canvas Preset",
        "url": "https://github.com/LuisArmando-TestCoder/canvas-preset",
        "desc": "Utilidades para tareas comunes con la API de Canvas."
      },
      {
        "name": "Plantilla Atomic Gatsby",
        "url": "https://github.com/LuisArmando-TestCoder/atomic-gatsby-typescript-recoiljs",
        "desc": "Una plantilla inicial organizada con diseño atómico."
      }
    ],
    "githubLabel": "Luis en GitHub",
    "newTab": "(se abre en una pestaña nueva)",
    "contactTitle": "Ponte en contacto",
    "contactBody": "Para preguntas, comentarios o propuestas de colaboración, escribe a info@aiban.news.",
    "emailCta": "Escribir a info@aiban.news",
    "startCta": "Empieza gratis",
    "helpCta": "Leer el centro de ayuda"
  },
  "careers": {
    "metaTitle": "Empleo | AIBAN",
    "metaDescription": "AIBAN no tiene vacantes abiertas en este momento. Aun así, puedes escribirnos a info@aiban.news.",
    "eyebrow": "Empleo",
    "title": "Trabaja en AIBAN",
    "lead": "AIBAN no tiene vacantes abiertas en este momento.",
    "body": "Cuando se abra una vacante, aparecerá en esta página. Si más adelante te gustaría trabajar en AIBAN, envía una nota breve sobre ti y lo que te gustaría construir.",
    "emailCta": "Escribir a info@aiban.news",
    "emailSubject": "Trabajar en AIBAN",
    "aboutCta": "Leer sobre AIBAN"
  },
  "legal": {
    "navLabel": "Documentos legales",
    "lastUpdated": "Última actualización: {date}",
    "privacy": {
      "title": "Política de privacidad",
      "metaTitle": "Política de privacidad | AIBAN",
      "metaDescription": "Cómo AIBAN recopila, usa y protege tus datos, y cómo ejercer tus derechos sobre ellos."
    },
    "terms": {
      "title": "Términos del servicio",
      "metaTitle": "Términos del servicio | AIBAN",
      "metaDescription": "Los términos que se aplican cuando creas una cuenta y usas AIBAN."
    },
    "cookies": {
      "title": "Política de cookies",
      "metaTitle": "Política de cookies | AIBAN",
      "metaDescription": "Qué cookies usa AIBAN, para qué sirven, cuánto duran y cómo puedes controlarlas."
    }
  },
  "demoPage": {
    "metaTitle": "Demo | AIBAN",
    "metaDescription": "Mira un recorrido por AIBAN y descubre qué pasa después de registrarte, desde agregar tu sitio web hasta enviar tu primera edición.",
    "eyebrow": "Demo",
    "title": "Mira cómo funciona AIBAN",
    "lead": "Mira el recorrido y luego lee qué pasa después de registrarte.",
    "videoTitle": "Video del recorrido por AIBAN",
    "playLabel": "Reproducir el video del recorrido",
    "videoNote": "El video se reproduce desde YouTube.",
    "stepsTitle": "Qué pasa después de registrarte",
    "steps": [
      {
        "title": "Agrega tu sitio web",
        "body": "Escribe la dirección de tu sitio, tu blog o un sitio de noticias que sigas. AIBAN lo revisa en busca de contenido nuevo."
      },
      {
        "title": "Describe a tus lectores y tu voz",
        "body": "Cuéntale a AIBAN quién lee tu newsletter y cómo debe sonar. También puedes dejar que sugiera una descripción a partir de tu sitio."
      },
      {
        "title": "Elige una frecuencia",
        "body": "Elige cada cuánto se envían las ediciones. Puedes cambiarlo después en tu panel."
      },
      {
        "title": "Agrega suscriptores",
        "body": "Sube una lista, agrega personas una por una o comparte tu página y tu widget de suscripción. Cada suscriptor elige un idioma."
      },
      {
        "title": "Agrega tu nombre de remitente y tu firma",
        "body": "Agrega el nombre y la firma de correo que verán los lectores. AIBAN envía cada edición desde su dirección verificada con tu nombre, y las respuestas llegan a tu bandeja de entrada."
      }
    ],
    "ctaTitle": "Pruébalo con tu propio sitio web",
    "ctaBody": "El plan gratuito incluye 1 fuente y hasta 100 suscriptores.",
    "primaryCta": "Empieza gratis",
    "secondaryCta": "Ver precios"
  },
  "helpCenter": {
    "metaTitle": "Ayuda | AIBAN",
    "metaDescription": "Respuestas sobre cómo configurar AIBAN: fuentes, idiomas, envío con tu nombre, suscriptores, el widget de suscripción, el blog y la facturación.",
    "eyebrow": "Centro de ayuda",
    "title": "¿Cómo podemos ayudarte?",
    "lead": "Encuentra respuestas sobre cómo configurar y gestionar tu newsletter. Si no encuentras lo que necesitas, escríbenos.",
    "searchLabel": "Buscar en el centro de ayuda",
    "searchPlaceholder": "Prueba con idioma, widget o cancelar",
    "clearSearch": "Borrar búsqueda",
    "resultsCount": "{count} respuestas coinciden con tu búsqueda.",
    "noResults": "Ninguna respuesta coincide con tu búsqueda. Prueba con otra palabra o escribe a info@aiban.news.",
    "topicsLabel": "Temas",
    "copyLink": "Copiar enlace",
    "linkCopied": "Enlace copiado",
    "contactTitle": "¿Todavía necesitas ayuda?",
    "contactBody": "Escribe a info@aiban.news e incluye el correo con el que te registraste.",
    "emailCta": "Escribir a info@aiban.news",
    "limitsTitle": "Solicitar límites más altos",
    "limitsBody": "Cuéntanos qué límites necesitas y te responderemos por correo. Si la solicitud no se puede enviar desde esta página, se abre tu aplicación de correo con todo rellenado para que nos la envíes.",
    "faqFilterLabel": "Filtrar preguntas",
    "faqNoMatch": "Ninguna pregunta coincide con tu filtro.",
    "groups": [
      {
        "id": "getting-started",
        "title": "Primeros pasos",
        "items": [
          {
            "id": "what-is-aiban",
            "q": "¿Qué es AIBAN?",
            "a": "AIBAN convierte el contenido que ya publicas en un newsletter periódico. Lee tu sitio web, tu blog o los sitios de noticias que elijas, escribe nuevas ediciones con tu voz y las envía a tus suscriptores. Cada suscriptor lo lee en el idioma que eligió."
          },
          {
            "id": "how-to-start",
            "q": "¿Cómo empiezo?",
            "a": "Crea una cuenta en la página de registro. La configuración te pide la dirección de tu sitio y algunos datos sobre tus lectores. Después puedes agregar suscriptores y gestionar todo desde tu panel."
          },
          {
            "id": "change-settings",
            "q": "¿Puedo cambiar la configuración más adelante?",
            "a": "Sí. Puedes cambiar las fuentes, el horario, los datos del remitente y los suscriptores más adelante en tu panel. Para cambiar de plan, escribe a info@aiban.news."
          }
        ]
      },
      {
        "id": "sources",
        "title": "Fuentes y contenido",
        "items": [
          {
            "id": "what-is-a-source",
            "q": "¿Qué puedo usar como fuente?",
            "a": "Una fuente es una dirección web que AIBAN revisa en busca de contenido nuevo, como tu sitio web, tu blog o un sitio de noticias que sigas. Las fuentes se agregan en tu panel. Cuántas puedes agregar depende de tu plan."
          },
          {
            "id": "how-often",
            "q": "¿Con qué frecuencia se envía mi newsletter?",
            "a": "Eliges con qué frecuencia se publica al configurar una fuente. Puedes cambiar la frecuencia después en tu panel."
          },
          {
            "id": "your-voice",
            "q": "¿Cómo escribe AIBAN con mi voz?",
            "a": "Describes la personalidad de tu newsletter o dejas que AIBAN genere una descripción por ti. Las ediciones se escriben según esa descripción. Puedes editarla cuando quieras en tu panel."
          }
        ]
      },
      {
        "id": "languages",
        "title": "Idiomas",
        "items": [
          {
            "id": "subscriber-language",
            "q": "¿Cómo reciben los suscriptores el newsletter en su idioma?",
            "a": "Cada suscriptor elige un idioma preferido al registrarse. AIBAN traduce cada edición a ese idioma antes de enviarla."
          },
          {
            "id": "site-language",
            "q": "¿Puedo usar el sitio en mi idioma?",
            "a": "Sí. Usa el botón de idioma en la esquina inferior derecha de la pantalla para cambiar el idioma del sitio y del panel."
          }
        ]
      },
      {
        "id": "sending",
        "title": "Envío con tu nombre",
        "items": [
          {
            "id": "own-address",
            "q": "¿Las ediciones pueden salir desde mi propio correo?",
            "a": "Las ediciones salen desde la dirección de envío de AIBAN con tu nombre de remitente y tu firma de correo, y las respuestas llegan a tu bandeja de entrada. No te pedimos la contraseña de tu correo, así que no hay nada tuyo que se pueda filtrar."
          },
          {
            "id": "app-password",
            "q": "¿Tengo que darle a AIBAN la contraseña de mi correo?",
            "a": "No. AIBAN nunca te pide la contraseña de tu correo ni una contraseña de aplicación. Las ediciones se envían desde la dirección de AIBAN con tu nombre, y las respuestas te llegan a ti."
          }
        ]
      },
      {
        "id": "subscribers",
        "title": "Suscriptores y widget de suscripción",
        "items": [
          {
            "id": "add-subscribers",
            "q": "¿Cómo agrego suscriptores?",
            "a": "Puedes agregar personas una por una en tu panel o subir un archivo con tu lista. La gente también puede unirse desde tu página de suscripción o el widget de suscripción."
          },
          {
            "id": "signup-widget",
            "q": "¿Qué es el widget de suscripción?",
            "a": "El widget es un formulario de suscripción que puedes poner en tu propio sitio web. Los visitantes escriben su correo, eligen su idioma y se unen a tu lista."
          },
          {
            "id": "subscriber-limit",
            "q": "¿Hay un límite de suscriptores?",
            "a": "Cada plan tiene su propio límite de suscriptores. El plan gratuito incluye hasta 100 suscriptores. La página de precios muestra los límites de los demás planes."
          }
        ]
      },
      {
        "id": "blog",
        "title": "Blog",
        "items": [
          {
            "id": "blog-pages",
            "q": "¿Los artículos de mi newsletter se publican en la web?",
            "a": "Sí. Los artículos que AIBAN escribe para tu newsletter también se publican como páginas web, para que la gente pueda leerlos fuera de su bandeja de entrada."
          },
          {
            "id": "post-to-site",
            "q": "¿Puedo publicar los artículos en mi propio sitio web?",
            "a": "Sí. En tu panel puedes configurar un webhook que envía cada artículo del newsletter a tu sitio web como entrada. Funciona con WordPress y con cualquier plataforma que acepte contenido REST estándar."
          }
        ]
      },
      {
        "id": "billing",
        "title": "Facturación",
        "items": [
          {
            "id": "free-plan",
            "q": "¿Hay un plan gratuito?",
            "a": "Sí. El plan gratuito incluye 1 fuente y hasta 100 suscriptores. Puedes pasar a un plan de pago cuando necesites más."
          },
          {
            "id": "monthly-yearly",
            "q": "¿Puedo pagar mensual o anualmente?",
            "a": "Sí. Los planes de pago se cobran de forma mensual o anual. El precio anual es un 35% más bajo que pagar 12 meses por separado. Escribe a info@aiban.news para elegir un plan."
          },
          {
            "id": "cancel",
            "q": "¿Puedo cancelar cuando quiera?",
            "a": "Sí. Escribe a info@aiban.news cuando quieras y cancelaremos tu plan de pago o te pasaremos de nuevo al plan gratis."
          },
          {
            "id": "higher-limits",
            "q": "¿Qué pasa si necesito más de lo que ofrece el plan más grande?",
            "a": "Usa el formulario de solicitud de la página de ayuda para indicarnos los límites que necesitas. Te responderemos por correo."
          }
        ]
      }
    ]
  },
  "mainPage": {
    "skipToMainContent": "Saltar al contenido principal",
    "dismissAnnouncement": "Cerrar anuncio",
    "problem": "Problema:",
    "outcome": "Resultado:",
    "disclaimer": "El ahorro del 35% aplica solo a la facturación anual."
  },
  "authForm": {
    "emailValidation": "Escribe un correo como nombre@ejemplo.com.",
    "failedToSendCode": "No pudimos enviar el código. Revisa el correo e inténtalo de nuevo en un minuto.",
    "sending": "Enviando...",
    "codeSent": "Te enviamos un código a tu correo.",
    "invalidCode": "Ese código no es correcto. Revisa el último correo que te enviamos o pide que te reenviemos el código.",
    "regenerateCode": "Reenviar código",
    "back": "Volver",
    "byProceeding": "Al proceder, aceptas los",
    "termsOfService": "Términos del servicio",
    "and": "y la",
    "privacyPolicy": "Política de privacidad",
    "appName": "AI Newsletter"
  },
  "welcome": {
    "title": "Generador automático de newsletters",
    "setItOnce": "Configúralo una vez.",
    "useItForever": "Después sigue funcionando solo."
  },
  "lead": {
    "title": "Convierte suscriptores en visitantes",
    "recommendation": "Ayuda a nuestra IA a entender tu marca conectando tu sitio web.",
    "question": "¿Tienes un sitio web? (opcional, puedes agregarlo después)",
    "placeholder": "https://tu-sitio.com"
  },
  "newsSource": {
    "title": "Conecta tu fuente de contenido",
    "subtitle": "Extraeremos tu feed para que no empieces de cero.",
    "placeholder": "Tu blog o enlace RSS"
  },
  "subscribe": {
    "welcome": {
      "title": "Te damos la bienvenida al newsletter.",
      "invitedBy": "Has sido invitado por {configuratorId}."
    }
  },
  "header": {
    "goToWorkspace": "Abrir panel",
    "inBilling": "Precios",
    "vip": "VIP",
    "plan": "Plan {planName}",
    "logIn": "Iniciar sesión",
    "getStarted": "Empieza gratis"
  },
  "fileInput": {
    "chooseFile": "Elegir archivo",
    "dropFile": "Suelta aquí",
    "release": "Suelta para subir"
  },
  "billing": {
    "title": "Facturación y suscripción",
    "currentPlanTitle": "Tu plan actual",
    "upgradePlanTitle": "Cambia tu plan",
    "manageSubscription": "Gestionar suscripción",
    "vipPlanName": "Socio VIP",
    "vipPlanDescription": "Acceso ilimitado, cortesía de AIBAN.",
    "perMonth": "por mes",
    "perYear": "por año",
    "monthAbbreviation": "mes",
    "equivalentTo": "equivalente a",
    "mostPopular": "El más elegido",
    "upgradeTo": "Mejorar a",
    "downgradeTo": "Cambiar a",
    "currentPlanButton": "Tu plan",
    "youSave": "Ahorras",
    "users": "usuarios",
    "newsSources": "fuentes de noticias",
    "monthly": "Mensual",
    "yearly": "Anual",
    "loadingPlan": "Cargando datos del plan..."
  },
  "languages": [
    {
      "code": "ab",
      "name": "Abjasio"
    },
    {
      "code": "aa",
      "name": "Afar"
    },
    {
      "code": "af",
      "name": "Afrikáans"
    },
    {
      "code": "ak",
      "name": "Akán"
    },
    {
      "code": "sq",
      "name": "Albanés"
    },
    {
      "code": "am",
      "name": "Amárico"
    },
    {
      "code": "ar",
      "name": "Árabe"
    },
    {
      "code": "an",
      "name": "Aragonés"
    },
    {
      "code": "hy",
      "name": "Armenio"
    },
    {
      "code": "as",
      "name": "Asamés"
    },
    {
      "code": "av",
      "name": "Avar"
    },
    {
      "code": "ae",
      "name": "Avéstico"
    },
    {
      "code": "ay",
      "name": "Aimara"
    },
    {
      "code": "az",
      "name": "Azerí"
    },
    {
      "code": "bm",
      "name": "Bambara"
    },
    {
      "code": "ba",
      "name": "Baskir"
    },
    {
      "code": "eu",
      "name": "Vasco"
    },
    {
      "code": "be",
      "name": "Bielorruso"
    },
    {
      "code": "bn",
      "name": "Bengalí"
    },
    {
      "code": "bi",
      "name": "Bislama"
    },
    {
      "code": "bs",
      "name": "Bosnio"
    },
    {
      "code": "br",
      "name": "Bretón"
    },
    {
      "code": "bg",
      "name": "Búlgaro"
    },
    {
      "code": "my",
      "name": "Birmano"
    },
    {
      "code": "ca",
      "name": "Catalán"
    },
    {
      "code": "ch",
      "name": "Chamorro"
    },
    {
      "code": "ce",
      "name": "Checheno"
    },
    {
      "code": "ny",
      "name": "Chichewa"
    },
    {
      "code": "zh",
      "name": "Chino"
    },
    {
      "code": "cu",
      "name": "Eslavo Eclesiástico"
    },
    {
      "code": "cv",
      "name": "Chuvasio"
    },
    {
      "code": "kw",
      "name": "Córnico"
    },
    {
      "code": "co",
      "name": "Corso"
    },
    {
      "code": "cr",
      "name": "Cree"
    },
    {
      "code": "hr",
      "name": "Croata"
    },
    {
      "code": "cs",
      "name": "Checo"
    },
    {
      "code": "da",
      "name": "Danés"
    },
    {
      "code": "dv",
      "name": "Divehi"
    },
    {
      "code": "nl",
      "name": "Neerlandés"
    },
    {
      "code": "dz",
      "name": "Dzongkha"
    },
    {
      "code": "en",
      "name": "Inglés"
    },
    {
      "code": "eo",
      "name": "Esperanto"
    },
    {
      "code": "et",
      "name": "Estonio"
    },
    {
      "code": "ee",
      "name": "Ewe"
    },
    {
      "code": "fo",
      "name": "Feroés"
    },
    {
      "code": "fj",
      "name": "Fiyiano"
    },
    {
      "code": "fi",
      "name": "Finlandés"
    },
    {
      "code": "fr",
      "name": "Francés"
    },
    {
      "code": "fy",
      "name": "Frisón Occidental"
    },
    {
      "code": "ff",
      "name": "Fula"
    },
    {
      "code": "gd",
      "name": "Gaélico Escocés"
    },
    {
      "code": "gl",
      "name": "Gallego"
    },
    {
      "code": "lg",
      "name": "Ganda"
    },
    {
      "code": "ka",
      "name": "Georgiano"
    },
    {
      "code": "de",
      "name": "Alemán"
    },
    {
      "code": "el",
      "name": "Griego"
    },
    {
      "code": "kl",
      "name": "Kalaallisut (Groenlandés)"
    },
    {
      "code": "gn",
      "name": "Guaraní"
    },
    {
      "code": "gu",
      "name": "Guyaratí"
    },
    {
      "code": "ht",
      "name": "Criollo Haitiano"
    },
    {
      "code": "ha",
      "name": "Hausa"
    },
    {
      "code": "he",
      "name": "Hebreo"
    },
    {
      "code": "hz",
      "name": "Herero"
    },
    {
      "code": "hi",
      "name": "Hindi"
    },
    {
      "code": "ho",
      "name": "Hiri motu"
    },
    {
      "code": "hu",
      "name": "Húngaro"
    },
    {
      "code": "is",
      "name": "Islandés"
    },
    {
      "code": "io",
      "name": "Ido"
    },
    {
      "code": "ig",
      "name": "Igbo"
    },
    {
      "code": "id",
      "name": "Indonesio"
    },
    {
      "code": "ia",
      "name": "Interlingua"
    },
    {
      "code": "ie",
      "name": "Interlingue"
    },
    {
      "code": "iu",
      "name": "Inuktitut"
    },
    {
      "code": "ik",
      "name": "Inupiaq"
    },
    {
      "code": "ga",
      "name": "Irlandés"
    },
    {
      "code": "it",
      "name": "Italiano"
    },
    {
      "code": "ja",
      "name": "Japonés"
    },
    {
      "code": "jv",
      "name": "Javanés"
    },
    {
      "code": "kn",
      "name": "Canarés"
    },
    {
      "code": "kr",
      "name": "Kanuri"
    },
    {
      "code": "ks",
      "name": "Cachemiro"
    },
    {
      "code": "kk",
      "name": "Kazajo"
    },
    {
      "code": "km",
      "name": "Jemer"
    },
    {
      "code": "ki",
      "name": "Kikuyu"
    },
    {
      "code": "rw",
      "name": "Kinyarwanda"
    },
    {
      "code": "ky",
      "name": "Kirguís"
    },
    {
      "code": "kv",
      "name": "Komi"
    },
    {
      "code": "kg",
      "name": "Kongo"
    },
    {
      "code": "ko",
      "name": "Coreano"
    },
    {
      "code": "kj",
      "name": "Kuanyama"
    },
    {
      "code": "ku",
      "name": "Kurdo"
    },
    {
      "code": "lo",
      "name": "Lao"
    },
    {
      "code": "la",
      "name": "Latín"
    },
    {
      "code": "lv",
      "name": "Letón"
    },
    {
      "code": "li",
      "name": "Limburgués"
    },
    {
      "code": "ln",
      "name": "Lingala"
    },
    {
      "code": "lt",
      "name": "Lituano"
    },
    {
      "code": "lu",
      "name": "Luba-Katanga"
    },
    {
      "code": "lb",
      "name": "Luxemburgués"
    },
    {
      "code": "mk",
      "name": "Macedonio"
    },
    {
      "code": "mg",
      "name": "Malgache"
    },
    {
      "code": "ms",
      "name": "Malayo"
    },
    {
      "code": "ml",
      "name": "Malayalam"
    },
    {
      "code": "mt",
      "name": "Maltés"
    },
    {
      "code": "gv",
      "name": "Manés"
    },
    {
      "code": "mi",
      "name": "Maorí"
    },
    {
      "code": "mr",
      "name": "Maratí"
    },
    {
      "code": "mh",
      "name": "Marshalés"
    },
    {
      "code": "mn",
      "name": "Mongol"
    },
    {
      "code": "na",
      "name": "Nauruano"
    },
    {
      "code": "nv",
      "name": "Navajo"
    },
    {
      "code": "nd",
      "name": "Ndebele del Norte"
    },
    {
      "code": "nr",
      "name": "Ndebele del Sur"
    },
    {
      "code": "ng",
      "name": "Ndonga"
    },
    {
      "code": "ne",
      "name": "Nepalí"
    },
    {
      "code": "no",
      "name": "Noruego"
    },
    {
      "code": "nb",
      "name": "Noruego Bokmål"
    },
    {
      "code": "nn",
      "name": "Noruego Nynorsk"
    },
    {
      "code": "oc",
      "name": "Occitano"
    },
    {
      "code": "oj",
      "name": "Ojibwa"
    },
    {
      "code": "or",
      "name": "Oriya"
    },
    {
      "code": "om",
      "name": "Oromo"
    },
    {
      "code": "os",
      "name": "Osetio"
    },
    {
      "code": "pi",
      "name": "Pali"
    },
    {
      "code": "ps",
      "name": "Pastún"
    },
    {
      "code": "fa",
      "name": "Persa (Farsi)"
    },
    {
      "code": "pl",
      "name": "Polaco"
    },
    {
      "code": "pt",
      "name": "Portugués"
    },
    {
      "code": "pa",
      "name": "Punyabí"
    },
    {
      "code": "qu",
      "name": "Quechua"
    },
    {
      "code": "ro",
      "name": "Rumano"
    },
    {
      "code": "rm",
      "name": "Romanche"
    },
    {
      "code": "rn",
      "name": "Rundi"
    },
    {
      "code": "ru",
      "name": "Ruso"
    },
    {
      "code": "se",
      "name": "Sami Septentrional"
    },
    {
      "code": "sm",
      "name": "Samoano"
    },
    {
      "code": "sg",
      "name": "Sango"
    },
    {
      "code": "sa",
      "name": "Sánscrito"
    },
    {
      "code": "sc",
      "name": "Sardo"
    },
    {
      "code": "sr",
      "name": "Serbio"
    },
    {
      "code": "sn",
      "name": "Shona"
    },
    {
      "code": "ii",
      "name": "Yi de Sichuán"
    },
    {
      "code": "sd",
      "name": "Sindhi"
    },
    {
      "code": "si",
      "name": "Cingalés"
    },
    {
      "code": "sk",
      "name": "Eslovaco"
    },
    {
      "code": "sl",
      "name": "Esloveno"
    },
    {
      "code": "so",
      "name": "Somalí"
    },
    {
      "code": "st",
      "name": "Sesotho del Sur"
    },
    {
      "code": "es",
      "name": "Español"
    },
    {
      "code": "su",
      "name": "Sundanés"
    },
    {
      "code": "sw",
      "name": "Suajili"
    },
    {
      "code": "ss",
      "name": "Swati"
    },
    {
      "code": "sv",
      "name": "Sueco"
    },
    {
      "code": "tl",
      "name": "Tagalo (Filipino)"
    },
    {
      "code": "ty",
      "name": "Tahitiano"
    },
    {
      "code": "tg",
      "name": "Tayiko"
    },
    {
      "code": "ta",
      "name": "Tamil"
    },
    {
      "code": "tt",
      "name": "Tártaro"
    },
    {
      "code": "te",
      "name": "Telugu"
    },
    {
      "code": "th",
      "name": "Tailandés"
    },
    {
      "code": "bo",
      "name": "Tibetano"
    },
    {
      "code": "ti",
      "name": "Tigriña"
    },
    {
      "code": "to",
      "name": "Tongano"
    },
    {
      "code": "ts",
      "name": "Tsonga"
    },
    {
      "code": "tn",
      "name": "Tswana"
    },
    {
      "code": "tr",
      "name": "Turco"
    },
    {
      "code": "tk",
      "name": "Turcomano"
    },
    {
      "code": "tw",
      "name": "Twi"
    },
    {
      "code": "ug",
      "name": "Uigur"
    },
    {
      "code": "uk",
      "name": "Ucraniano"
    },
    {
      "code": "ur",
      "name": "Urdu"
    },
    {
      "code": "uz",
      "name": "Uzbeko"
    },
    {
      "code": "ve",
      "name": "Venda"
    },
    {
      "code": "vi",
      "name": "Vietnamita"
    },
    {
      "code": "vo",
      "name": "Volapük"
    },
    {
      "code": "wa",
      "name": "Valón"
    },
    {
      "code": "cy",
      "name": "Galés"
    },
    {
      "code": "wo",
      "name": "Wolof"
    },
    {
      "code": "xh",
      "name": "Xhosa"
    },
    {
      "code": "yi",
      "name": "Yidis"
    },
    {
      "code": "yo",
      "name": "Yoruba"
    },
    {
      "code": "za",
      "name": "Zhuang"
    },
    {
      "code": "zu",
      "name": "Zulú"
    }
  ],
  "countries": [
    {
      "code": "AF",
      "name": "Afganistán"
    },
    {
      "code": "AL",
      "name": "Albania"
    },
    {
      "code": "DZ",
      "name": "Argelia"
    },
    {
      "code": "AS",
      "name": "Samoa Americana"
    },
    {
      "code": "AD",
      "name": "Andorra"
    },
    {
      "code": "AO",
      "name": "Angola"
    },
    {
      "code": "AI",
      "name": "Anguila"
    },
    {
      "code": "AQ",
      "name": "Antártida"
    },
    {
      "code": "AG",
      "name": "Antigua y Barbuda"
    },
    {
      "code": "AR",
      "name": "Argentina"
    },
    {
      "code": "AM",
      "name": "Armenia"
    },
    {
      "code": "AW",
      "name": "Aruba"
    },
    {
      "code": "AU",
      "name": "Australia"
    },
    {
      "code": "AT",
      "name": "Austria"
    },
    {
      "code": "AZ",
      "name": "Azerbaiyán"
    },
    {
      "code": "BS",
      "name": "Bahamas"
    },
    {
      "code": "BH",
      "name": "Baréin"
    },
    {
      "code": "BD",
      "name": "Bangladés"
    },
    {
      "code": "BB",
      "name": "Barbados"
    },
    {
      "code": "BY",
      "name": "Bielorrusia"
    },
    {
      "code": "BE",
      "name": "Bélgica"
    },
    {
      "code": "BZ",
      "name": "Belice"
    },
    {
      "code": "BJ",
      "name": "Benín"
    },
    {
      "code": "BM",
      "name": "Bermudas"
    },
    {
      "code": "BT",
      "name": "Bután"
    },
    {
      "code": "BO",
      "name": "Bolivia"
    },
    {
      "code": "BA",
      "name": "Bosnia y Herzegovina"
    },
    {
      "code": "BW",
      "name": "Botsuana"
    },
    {
      "code": "BR",
      "name": "Brasil"
    },
    {
      "code": "IO",
      "name": "Territorio Británico del Océano Índico"
    },
    {
      "code": "VG",
      "name": "Islas Vírgenes Británicas"
    },
    {
      "code": "BN",
      "name": "Brunéi"
    },
    {
      "code": "BG",
      "name": "Bulgaria"
    },
    {
      "code": "BF",
      "name": "Burkina Faso"
    },
    {
      "code": "BI",
      "name": "Burundi"
    },
    {
      "code": "KH",
      "name": "Camboya"
    },
    {
      "code": "CM",
      "name": "Camerún"
    },
    {
      "code": "CA",
      "name": "Canadá"
    },
    {
      "code": "CV",
      "name": "Cabo Verde"
    },
    {
      "code": "KY",
      "name": "Islas Caimán"
    },
    {
      "code": "CF",
      "name": "República Centroafricana"
    },
    {
      "code": "TD",
      "name": "Chad"
    },
    {
      "code": "CL",
      "name": "Chile"
    },
    {
      "code": "CN",
      "name": "China"
    },
    {
      "code": "CX",
      "name": "Isla de Navidad"
    },
    {
      "code": "CC",
      "name": "Islas Cocos (Keeling)"
    },
    {
      "code": "CO",
      "name": "Colombia"
    },
    {
      "code": "KM",
      "name": "Comoras"
    },
    {
      "code": "CG",
      "name": "Congo - Brazzaville"
    },
    {
      "code": "CD",
      "name": "Congo - Kinshasa"
    },
    {
      "code": "CK",
      "name": "Islas Cook"
    },
    {
      "code": "CR",
      "name": "Costa Rica"
    },
    {
      "code": "CI",
      "name": "Costa de Marfil"
    },
    {
      "code": "HR",
      "name": "Croacia"
    },
    {
      "code": "CU",
      "name": "Cuba"
    },
    {
      "code": "CY",
      "name": "Chipre"
    },
    {
      "code": "CZ",
      "name": "Chequia"
    },
    {
      "code": "DK",
      "name": "Dinamarca"
    },
    {
      "code": "DJ",
      "name": "Yibuti"
    },
    {
      "code": "DM",
      "name": "Dominica"
    },
    {
      "code": "DO",
      "name": "República Dominicana"
    },
    {
      "code": "EC",
      "name": "Ecuador"
    },
    {
      "code": "EG",
      "name": "Egipto"
    },
    {
      "code": "SV",
      "name": "El Salvador"
    },
    {
      "code": "GQ",
      "name": "Guinea Ecuatorial"
    },
    {
      "code": "ER",
      "name": "Eritrea"
    },
    {
      "code": "EE",
      "name": "Estonia"
    },
    {
      "code": "SZ",
      "name": "Esuatini"
    },
    {
      "code": "ET",
      "name": "Etiopía"
    },
    {
      "code": "FJ",
      "name": "Fiyi"
    },
    {
      "code": "FI",
      "name": "Finlandia"
    },
    {
      "code": "FR",
      "name": "Francia"
    },
    {
      "code": "GA",
      "name": "Gabón"
    },
    {
      "code": "GM",
      "name": "Gambia"
    },
    {
      "code": "GE",
      "name": "Georgia"
    },
    {
      "code": "DE",
      "name": "Alemania"
    },
    {
      "code": "GH",
      "name": "Ghana"
    },
    {
      "code": "GR",
      "name": "Grecia"
    },
    {
      "code": "GT",
      "name": "Guatemala"
    },
    {
      "code": "GN",
      "name": "Guinea"
    },
    {
      "code": "GY",
      "name": "Guyana"
    },
    {
      "code": "HT",
      "name": "Haití"
    },
    {
      "code": "HN",
      "name": "Honduras"
    },
    {
      "code": "HK",
      "name": "Hong Kong"
    },
    {
      "code": "HU",
      "name": "Hungría"
    },
    {
      "code": "IS",
      "name": "Islandia"
    },
    {
      "code": "IN",
      "name": "India"
    },
    {
      "code": "ID",
      "name": "Indonesia"
    },
    {
      "code": "IR",
      "name": "Irán"
    },
    {
      "code": "IQ",
      "name": "Irak"
    },
    {
      "code": "IE",
      "name": "Irlanda"
    },
    {
      "code": "IL",
      "name": "Israel"
    },
    {
      "code": "IT",
      "name": "Italia"
    },
    {
      "code": "JM",
      "name": "Jamaica"
    },
    {
      "code": "JP",
      "name": "Japón"
    },
    {
      "code": "JO",
      "name": "Jordania"
    },
    {
      "code": "KZ",
      "name": "Kazajistán"
    },
    {
      "code": "KE",
      "name": "Kenia"
    },
    {
      "code": "KR",
      "name": "Corea del Sur"
    },
    {
      "code": "KW",
      "name": "Kuwait"
    },
    {
      "code": "KG",
      "name": "Kirguistán"
    },
    {
      "code": "LA",
      "name": "Laos"
    },
    {
      "code": "LV",
      "name": "Letonia"
    },
    {
      "code": "LB",
      "name": "Líbano"
    },
    {
      "code": "LS",
      "name": "Lesoto"
    },
    {
      "code": "LR",
      "name": "Liberia"
    },
    {
      "code": "LY",
      "name": "Libia"
    },
    {
      "code": "LI",
      "name": "Liechtenstein"
    },
    {
      "code": "LT",
      "name": "Lituania"
    },
    {
      "code": "LU",
      "name": "Luxemburgo"
    },
    {
      "code": "MG",
      "name": "Madagascar"
    },
    {
      "code": "MW",
      "name": "Malaui"
    },
    {
      "code": "MY",
      "name": "Malasia"
    },
    {
      "code": "MV",
      "name": "Maldivas"
    },
    {
      "code": "ML",
      "name": "Malí"
    },
    {
      "code": "MT",
      "name": "Malta"
    },
    {
      "code": "MX",
      "name": "México"
    },
    {
      "code": "MD",
      "name": "Moldavia"
    },
    {
      "code": "MC",
      "name": "Mónaco"
    },
    {
      "code": "MN",
      "name": "Mongolia"
    },
    {
      "code": "ME",
      "name": "Montenegro"
    },
    {
      "code": "MA",
      "name": "Marruecos"
    },
    {
      "code": "MZ",
      "name": "Mozambique"
    },
    {
      "code": "MM",
      "name": "Myanmar"
    },
    {
      "code": "NA",
      "name": "Namibia"
    },
    {
      "code": "NP",
      "name": "Nepal"
    },
    {
      "code": "NL",
      "name": "Países Bajos"
    },
    {
      "code": "NZ",
      "name": "Nueva Zelanda"
    },
    {
      "code": "NI",
      "name": "Nicaragua"
    },
    {
      "code": "NE",
      "name": "Níger"
    },
    {
      "code": "NG",
      "name": "Nigeria"
    },
    {
      "code": "MK",
      "name": "Macedonia del Norte"
    },
    {
      "code": "NO",
      "name": "Noruega"
    },
    {
      "code": "OM",
      "name": "Omán"
    },
    {
      "code": "PK",
      "name": "Pakistán"
    },
    {
      "code": "PA",
      "name": "Panamá"
    },
    {
      "code": "PG",
      "name": "Papúa Nueva Guinea"
    },
    {
      "code": "PY",
      "name": "Paraguay"
    },
    {
      "code": "PE",
      "name": "Perú"
    },
    {
      "code": "PH",
      "name": "Filipinas"
    },
    {
      "code": "PL",
      "name": "Polonia"
    },
    {
      "code": "PT",
      "name": "Portugal"
    },
    {
      "code": "QA",
      "name": "Catar"
    },
    {
      "code": "RO",
      "name": "Rumania"
    },
    {
      "code": "RU",
      "name": "Rusia"
    },
    {
      "code": "RW",
      "name": "Ruanda"
    },
    {
      "code": "SA",
      "name": "Arabia Saudita"
    },
    {
      "code": "SN",
      "name": "Senegal"
    },
    {
      "code": "RS",
      "name": "Serbia"
    },
    {
      "code": "SG",
      "name": "Singapur"
    },
    {
      "code": "SK",
      "name": "Eslovaquia"
    },
    {
      "code": "SI",
      "name": "Eslovenia"
    },
    {
      "code": "ZA",
      "name": "Sudáfrica"
    },
    {
      "code": "ES",
      "name": "España"
    },
    {
      "code": "LK",
      "name": "Sri Lanka"
    },
    {
      "code": "SE",
      "name": "Suecia"
    },
    {
      "code": "CH",
      "name": "Suiza"
    },
    {
      "code": "TW",
      "name": "Taiwán"
    },
    {
      "code": "TH",
      "name": "Tailandia"
    },
    {
      "code": "TR",
      "name": "Turquía"
    },
    {
      "code": "UG",
      "name": "Uganda"
    },
    {
      "code": "UA",
      "name": "Ucrania"
    },
    {
      "code": "AE",
      "name": "Emiratos Árabes Unidos"
    },
    {
      "code": "GB",
      "name": "Reino Unido"
    },
    {
      "code": "US",
      "name": "Estados Unidos"
    },
    {
      "code": "UY",
      "name": "Uruguay"
    },
    {
      "code": "UZ",
      "name": "Uzbekistán"
    },
    {
      "code": "VE",
      "name": "Venezuela"
    },
    {
      "code": "VN",
      "name": "Vietnam"
    },
    {
      "code": "YE",
      "name": "Yemen"
    },
    {
      "code": "ZM",
      "name": "Zambia"
    },
    {
      "code": "ZW",
      "name": "Zimbabue"
    }
  ]
};
