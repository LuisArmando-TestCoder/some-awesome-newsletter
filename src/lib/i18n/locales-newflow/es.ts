// es strings for locales-newflow. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale es
export default {
  "onboarding": {
    "progress": "Paso {current} de {total}",
    "progressLabel": "Progreso de la configuración",
    "back": "Atrás",
    "skip": "Omitir este paso",
    "continue": "Continuar",
    "whyLabel": "Por qué lo preguntamos",
    "skipLabel": "Si lo omites",
    "working": "Procesando...",
    "start": {
      "title": "Crea tu newsletter",
      "opening": "Abriendo la configuración. Si no pasa nada,",
      "continueHere": "continúa aquí"
    },
    "tryAgain": "Intentar de nuevo",
    "website": {
      "title": "¿Cuál es tu sitio web?",
      "why": "Leemos tu sitio para encontrar los artículos con los que se armará tu newsletter y para deducir quiénes son tus lectores.",
      "skipNote": "Si todavía no tienes sitio web, elige un tema y usaremos un sitio de noticias sobre ese tema.",
      "label": "Dirección del sitio web",
      "hint": "Por ejemplo tuempresa.com o tuempresa.com/blog",
      "placeholder": "tuempresa.com",
      "submit": "Continuar",
      "checking": "Leyendo tu sitio...",
      "noWebsite": "No tengo sitio web",
      "haveWebsite": "Tengo un sitio web",
      "topicTitle": "Elige un tema",
      "topicHint": "Usaremos un sitio de noticias sobre este tema como tu primera fuente. Puedes cambiarlo después.",
      "errors": {
        "empty": "Escribe la dirección de tu sitio web para continuar.",
        "invalid": "Esto no parece una dirección web. Revisa cómo está escrita, por ejemplo tuempresa.com.",
        "unreachable": "No encontramos artículos en esta página. Prueba con tu blog o tu página de noticias, por ejemplo tuempresa.com/blog.",
        "network": "No pudimos conectar con nuestros servidores. Revisa tu conexión e inténtalo de nuevo."
      }
    },
    "readers": {
      "title": "¿Quién lee tu newsletter?",
      "why": "Escribimos cada edición para este lector y en este idioma. Los suscriptores que hablan otro idioma reciben su propia copia traducida.",
      "skipNote": "Completamos estos datos a partir de tu sitio. Cambia lo que no sea correcto.",
      "languageLabel": "Idioma principal",
      "languageHint": "Lo tomamos de la configuración de tu navegador.",
      "readerLabel": "Tu lector ideal",
      "readerHint": "Basta con una frase. Por ejemplo: dueños de pequeños restaurantes en Lisboa.",
      "readerPlaceholder": "¿Para quién es este newsletter?",
      "errors": {
        "reader": "Describe a tu lector en pocas palabras para saber para quién escribimos."
      }
    },
    "preview": {
      "title": "Esta es tu primera edición",
      "why": "Este es el correo que recibirán tus suscriptores, escrito a partir de tu último artículo. Todavía no se ha enviado nada.",
      "generating": "Estamos escribiendo tu primera edición a partir de tu último artículo. Suele tardar menos de un minuto.",
      "inboxFrom": "De",
      "inboxTo": "Para",
      "inboxSubject": "Asunto",
      "defaultSubject": "Tu primera edición",
      "sendTest": "Enviarme una prueba",
      "sendingTest": "Enviando...",
      "testSent": "Prueba enviada a {email}. Revisa tu bandeja de entrada y la carpeta de spam.",
      "regenerate": "Escribirla de nuevo",
      "looksGood": "Se ve bien, continuar",
      "skipPreview": "Continuar sin vista previa",
      "howTitle": "Cómo encontramos tus artículos",
      "howBody": "Guardamos una regla breve que nos indica dónde están los enlaces a los artículos en tu página, para ignorar menús y anuncios. Solo necesitas cambiarla si la vista previa tomó el contenido equivocado.",
      "ruleLabel": "Regla de artículos",
      "findAgain": "Buscar artículos de nuevo",
      "errors": {
        "generate": "No pudimos escribir la edición. Es posible que la página bloquee la lectura automática. Inténtalo de nuevo o vuelve atrás y usa la página de tu blog.",
        "test": "El correo de prueba no se envió. Inténtalo de nuevo en un momento."
      }
    },
    "senderName": {
      "title": "¿Cómo debe aparecer tu nombre en la bandeja de entrada?",
      "why": "Los suscriptores ven este nombre junto a cada edición, así lo reconocen y la abren.",
      "skipNote": "Si lo omites, el remitente aparece como AIBAN. Puedes cambiar el nombre después en Configuración.",
      "label": "Nombre del remitente",
      "hint": "Tu nombre, tu empresa o el nombre del newsletter. Hasta 60 caracteres.",
      "placeholder": "Estudio Silva",
      "previewLabel": "Cómo se ve en una bandeja de entrada",
      "previewBody": "Tu edición aparece con este nombre de remitente. Se envía desde la dirección de envío de AIBAN.",
      "save": "Guardar y continuar",
      "errors": {
        "empty": "Escribe un nombre de remitente de al menos 2 caracteres.",
        "long": "El nombre del remitente debe tener 60 caracteres o menos.",
        "save": "No pudimos guardar el nombre. Inténtalo de nuevo en un momento."
      }
    },
    "signature": {
      "title": "Firma de correo",
      "why": "Tu firma va al final de cada edición, para que los lectores sepan quién la escribió y cómo contactarte.",
      "skipNote": "Si lo omites, las ediciones terminan solo con el nombre de tu newsletter.",
      "nameLabel": "Tu nombre",
      "namePlaceholder": "Ana Silva",
      "roleLabel": "Cargo o empresa",
      "rolePlaceholder": "Fundadora, Estudio Silva",
      "linkLabel": "Enlace",
      "linkHint": "Tu sitio web o un perfil social. Opcional.",
      "linkPlaceholder": "tuempresa.com",
      "previewLabel": "Cómo se ve al final de un correo",
      "previewBody": "Gracias por leer. Nos vemos en la próxima edición.",
      "save": "Guardar firma",
      "existingNote": "Ya tienes una firma. Si guardas aquí, la reemplazas."
    },
    "schedule": {
      "title": "¿Cuándo deben enviarse las nuevas ediciones?",
      "why": "Revisamos tu sitio antes de cada envío y escribimos una nueva edición con los artículos más recientes.",
      "skipNote": "Puedes cambiar el día y la hora, o pausar los envíos, cuando quieras desde el panel.",
      "scheduleLabel": "Hora de envío",
      "frequencyLabel": "Frecuencia",
      "daily": "Todos los días",
      "weekly": "Todas las semanas",
      "monthly": "Cada mes, el día 1",
      "dayLabel": "Día",
      "timeLabel": "Hora",
      "timeHint": "En tu hora local.",
      "recipeTitle": "Enviar nuevas ediciones automáticamente",
      "recipeBody": "Con la frecuencia de arriba, elegimos tu mejor artículo nuevo, lo escribimos con tu voz, lo traducimos para cada lector y lo enviamos por correo.",
      "recipeOn": "Activado",
      "recipeOff": "Desactivado. Las ediciones solo se envían cuando pulsas Enviar.",
      "save": "Guardar y continuar",
      "saving": "Guardando tu newsletter...",
      "errors": {
        "create": "No pudimos guardar tu newsletter. Inténtalo de nuevo en un momento.",
        "limit": "Tu plan no permite otra fuente. Para agregar una, escríbenos y cambiaremos tu plan."
      }
    },
    "send": {
      "title": "Envía tu primera edición",
      "why": "Si la envías ahora, ves el recorrido completo: tu edición llega a una bandeja de entrada real, en el idioma del lector.",
      "skipNote": "Si lo omites, la primera edición se envía a la hora programada.",
      "youAreSubscribed": "Ya estás suscrito como {email}.",
      "othersLabel": "Invitar a otras personas (opcional)",
      "othersHint": "Pega direcciones de correo separadas por comas o saltos de línea. Cada persona recibe una invitación personal de tu parte. Solo reciben ediciones si aceptan, y eliminamos las invitaciones que nadie acepta después de 30 días.",
      "othersPlaceholder": "ana@example.com, li@example.com",
      "sendNow": "Enviar ahora",
      "sending": "Enviando tu primera edición...",
      "sentTitle": "Tu primera edición va en camino",
      "sentBody": "Se envía a todas las personas de tu lista que confirmaron su suscripción. Puede tardar unos minutos en llegar.",
      "invited": "Invitaciones enviadas a {count} personas. Se unen a tu lista cuando aceptan.",
      "invitesUnavailable": "Las invitaciones aún no están disponibles, así que no guardamos estas direcciones. En el siguiente paso, copia tu enlace de suscripción y envíaselo tú mismo.",
      "continue": "Continuar",
      "errors": {
        "invalidEmails": "Estas direcciones parecen incorrectas: {list}. Corrígelas o elimínalas.",
        "add": "No pudimos invitar a: {list}. Inténtalo más tarde desde Suscriptores.",
        "send": "La edición no se envió. Inténtalo de nuevo en un momento."
      }
    },
    "share": {
      "title": "Consigue tus primeros suscriptores",
      "why": "Quienes se suscriben aquí reciben cada edición en su propio idioma.",
      "skipNote": "Puedes encontrar este enlace y el código para insertar más adelante en Suscriptores, en Formulario de suscripción.",
      "linkLabel": "Página de suscripción",
      "linkHint": "Compártela en redes sociales, en el pie de tus correos o en un código QR.",
      "embedLabel": "Formulario de suscripción para tu sitio web",
      "embedHint": "Pega este código donde quieras que aparezca el formulario en tu sitio.",
      "copy": "Copiar",
      "copied": "Copiado",
      "open": "Abrir la página de suscripción"
    },
    "done": {
      "title": "Tu newsletter está configurado",
      "why": "Esto es lo que pasa ahora y lo que queda por hacer.",
      "planLine": "Plan actual: {plan}",
      "changePlan": "Ver planes",
      "toDashboard": "Ir al panel",
      "summarySource": "Fuente: {url}",
      "summarySchedule": "Frecuencia: {schedule}",
      "summaryAutomation": "Envío automático: {state}",
      "on": "activado",
      "off": "desactivado"
    }
  },
  "tutorial": {
    "checklistTitle": "Primeros pasos",
    "checklistProgress": "{done} de {total} completados",
    "checklistDone": "Todo listo. Tu newsletter ya funciona solo.",
    "dismiss": "Ocultar lista",
    "doneLabel": "hecho",
    "todoLabel": "pendiente",
    "show": "Mostrar primeros pasos",
    "items": {
      "source": {
        "title": "Agrega de dónde viene tu contenido",
        "body": "Un sitio web o blog que revisamos en busca de artículos nuevos."
      },
      "sender": {
        "title": "Elige tu nombre de remitente",
        "body": "El nombre que ven los suscriptores junto a cada edición."
      },
      "subscriber": {
        "title": "Consigue tu primer suscriptor",
        "body": "Alguien que no seas tú se suscribe o es agregado."
      },
      "send": {
        "title": "Envía tu primera edición",
        "body": "Una edición real llega a las personas de tu lista."
      },
      "automation": {
        "title": "Activa el envío automático",
        "body": "Las nuevas ediciones se envían según tu programación."
      },
      "widget": {
        "title": "Agrega el formulario de suscripción a tu sitio",
        "body": "Los visitantes pueden suscribirse sin salir de tu sitio."
      }
    },
    "open": "Abrir",
    "tour": {
      "start": "Hacer un recorrido rápido",
      "next": "Siguiente",
      "back": "Atrás",
      "skip": "Omitir recorrido",
      "finish": "Terminar",
      "stepOf": "{current} de {total}"
    },
    "help": {
      "whatIsThis": "¿Qué es esto?",
      "whyItMatters": "Por qué importa",
      "close": "Cerrar"
    }
  },
  "auth": {
    "emailLabel": "Correo electrónico",
    "emailHint": "Enviamos un código de 6 dígitos a esta dirección. No necesitas contraseña.",
    "codeTitle": "Revisa tu correo",
    "codeSentTo": "Enviamos un código de 6 dígitos a {email}.",
    "codeHint": "El código puede tardar un minuto en llegar. Revisa también tu carpeta de spam.",
    "changeEmail": "Usar otro correo",
    "resend": "Enviar un código nuevo",
    "resendIn": "Puedes pedir un código nuevo en {seconds} s",
    "resendLimit": "Si el código sigue sin llegar, escríbenos desde la página de Ayuda y lo resolveremos.",
    "resent": "Enviamos un código nuevo.",
    "verifying": "Comprobando tu código...",
    "errors": {
      "email": "Escribe un correo completo, por ejemplo tu@empresa.com.",
      "send": "No pudimos enviar el código. Revisa tu conexión e inténtalo de nuevo.",
      "code": "Ese código no funcionó. Revisa los 6 dígitos o pide un código nuevo."
    }
  }
};
