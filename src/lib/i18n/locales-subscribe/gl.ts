// gl strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale gl
export default {
  "welcome": {
    "title": "Dámosche a benvida ao boletín",
    "invitedBy": "{configuratorId} convidoute a subscribirte."
  },
  "email": {
    "title": "Onde che enviamos cada número?",
    "placeholder": "O teu correo"
  },
  "name": {
    "title": "Como te chamas?",
    "placeholder": "O teu nome"
  },
  "language": {
    "title": "En que lingua queres ler?"
  },
  "subscribed": {
    "title": "Xa tes a subscrición activa",
    "subtitle": "Na caixa de entrada tes un correo de confirmación.",
    "continueTo": "Continuar a",
    "finishingUp": "Podes pechar esta páxina."
  },
  "form": {
    "heading": "Subscríbete a {title}",
    "headingFallback": "Subscríbete a este boletín",
    "intro": "Os números novos chegan por correo electrónico, escritos na lingua que escollas.",
    "from": "De {sender}",
    "emailLabel": "Enderezo de correo electrónico",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Nome",
    "optional": "opcional",
    "nameHint": "Usámolo para saudarte. Se o deixas baleiro, usaremos o comezo do teu enderezo de correo.",
    "languageLabel": "Lingua dos números",
    "languageSummary": "Números en {language}.",
    "languageChange": "Cambiar",
    "languageHint": "Escollémola segundo a configuración do teu navegador.",
    "submit": "Subscribirme",
    "submitting": "Subscribindo...",
    "consent": "Ao subscribirte, aceptas recibir correos de {sender}. Cada correo inclúe unha ligazón para darte de baixa.",
    "privacy": "Política de privacidade",
    "loadingInfo": "Cargando os datos do boletín"
  },
  "success": {
    "title": "Revisa a caixa de entrada",
    "body": "Enviamos un correo de confirmación a {email}. Ábreo e escolle Confirmar subscrición.",
    "next": "O primeiro número chega cando confirmes, escrito en {language}.",
    "spam": "Se non che chega nada nuns minutos, mira no cartafol de correo lixo ou de Promocións.",
    "changeEmail": "Usar outro correo",
    "continueTo": "Continuar a {host}"
  },
  "errors": {
    "emailRequired": "Escribe o teu enderezo de correo electrónico.",
    "emailInvalid": "Este enderezo parece incompleto. Revísao e téntao de novo.",
    "missingLink": "A esta ligazón de subscrición fáltalle información. Pídelle unha ligazón nova a quen cha enviou.",
    "notFound": "Esta ligazón de subscrición xa non funciona. Pídelle unha ligazón nova a quen cha enviou.",
    "limit": "Agora mesmo este boletín non pode aceptar subscritores novos. Téntao máis tarde.",
    "invalid": "Non puidemos aceptar este enderezo. Revísao e téntao de novo.",
    "server": "Non puidemos gardar a túa subscrición. Téntao de novo nun momento.",
    "network": "Non puidemos conectar co servidor. Revisa a conexión e téntao de novo."
  },
  "confirm": {
    "title": "Confirma a túa subscrición",
    "body": "Escolle o botón para comezar a recibir números en {email}.",
    "button": "Confirmar subscrición",
    "confirming": "Confirmando...",
    "consent": "Ao confirmar, aceptas recibir este boletín por correo electrónico. Podes darte de baixa desde calquera número.",
    "successTitle": "Xa tes a subscrición activa",
    "successBody": "Os números novos chegarán a {email}.",
    "successTip": "Engade o remitente aos teus contactos para que non acaben no correo lixo.",
    "invalidTitle": "Esta ligazón está incompleta",
    "invalidBody": "Abre de novo o correo de confirmación e escolle o botón que contén. Se non o atopas, volve subscribirte desde a páxina do remitente.",
    "notFoundBody": "Non atopamos ningunha subscrición para este enderezo. Volve subscribirte desde a páxina do remitente.",
    "errorBody": "Non puidemos confirmar a túa subscrición. Téntao de novo nun momento.",
    "retry": "Tentar de novo",
    "home": "Ir á páxina de inicio"
  },
  "embed": {
    "title": "Engade un formulario de subscrición á túa web",
    "intro": "Pega un destes fragmentos de código na túa web. Quen se subscriba recibirá un correo de confirmación e despois os teus números na súa lingua.",
    "linkLabel": "Ligazón á páxina de subscrición",
    "linkHint": "Compártea na bio dunha rede social, nunha sinatura de correo ou nun código QR.",
    "scriptLabel": "Etiqueta script (recomendado)",
    "scriptHint": "Pégaa onde queiras que apareza o formulario. O formulario axusta o seu tamaño só.",
    "iframeLabel": "Iframe",
    "iframeHint": "Usa esta opción se a túa web non permite scripts.",
    "copy": "Copiar",
    "copied": "Copiado",
    "copyFailed": "Selecciona o texto e cópiao manualmente.",
    "options": "Opcións do formulario",
    "accent": "Cor do botón",
    "accentHint": "Déixaa como está para usar a cor da túa marca.",
    "theme": "Tema",
    "themeAuto": "Segundo a configuración do visitante",
    "themeLight": "Claro",
    "themeDark": "Escuro",
    "layout": "Disposición",
    "layoutFull": "Completa (título, nome e lingua)",
    "layoutCompact": "Compacta (correo e botón)",
    "preview": "Vista previa",
    "previewNote": "A vista previa é real. Unha subscrición aquí crea un subscritor de verdade.",
    "missing": "Primeiro crea un boletín. O formulario de subscrición aparecerá aquí cando exista."
  },
  "page": {
    "poweredBy": "Funciona con AIBAN",
    "title": "Subscrición"
  },
  "signature": {
    "title": "Sinatura de correo",
    "intro": "Os lectores vena ao final de cada número. Fai clic en calquera parte da vista previa para editala.",
    "show": "Amosar a miña sinatura en cada número",
    "showHint": "Se a desactivas, os números rematan despois do artigo.",
    "preview": "Vista previa",
    "previewEmpty": "A túa sinatura está baleira. Engade o teu nome para comezar.",
    "articleEnd": "Fin do artigo",
    "tabContent": "Contido",
    "tabStyle": "Estilo",
    "blocks": "Que incluír",
    "blocksHint": "Escolle unha etiqueta para amosar ou agochar esa parte. As partes agochadas conservan o seu texto.",
    "layout": "Disposición",
    "layouts": {
      "bar": "Barra de cor",
      "photo": "Foto",
      "stacked": "Apilada",
      "centered": "Centrada",
      "minimal": "Só texto"
    },
    "fields": {
      "name": "Nome",
      "role": "Cargo",
      "company": "Empresa",
      "phone": "Teléfono",
      "email": "Correo electrónico",
      "website": "Sitio web",
      "address": "Enderezo",
      "photoUrl": "Foto",
      "logoUrl": "Logotipo",
      "socials": "Ligazóns sociais",
      "cta": "Botón",
      "disclaimer": "Nota legal"
    },
    "groups": {
      "about": "Sobre ti",
      "contact": "Contacto",
      "images": "Imaxes",
      "socials": "Ligazóns sociais",
      "cta": "Botón",
      "disclaimer": "Nota legal"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Fundadora",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Rúa Maior 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Reserva unha chamada",
      "ctaUrl": "https://"
    },
    "ctaText": "Texto do botón",
    "ctaLink": "Ligazón do botón",
    "hints": {
      "photoUrl": "Ligazón a unha imaxe PNG ou JPG cadrada, de polo menos 144 por 144 píxeles e de menos de 200 KB. Amósase a 72 por 72 píxeles xunto ao teu nome.",
      "logoUrl": "Ligazón a unha imaxe PNG ou JPG con fondo transparente ou branco, de polo menos 64 píxeles de alto. Amósase a 32 píxeles de alto.",
      "website": "Se non pos https://, engadímolo nós.",
      "cta": "O botón só aparece se enches tanto o texto como a ligazón.",
      "disclaimer": "Letra pequena na parte inferior, por exemplo un aviso de confidencialidade. Déixao baleiro se non o necesitas."
    },
    "style": {
      "accent": "Cor de realce",
      "accentHint": "Úsase para a barra, as ligazóns e o botón. Comeza coa cor da túa marca.",
      "font": "Tipo de letra",
      "fontSans": "Sen serifa",
      "fontSerif": "Con serifa",
      "size": "Tamaño do texto",
      "sizeMd": "Normal",
      "sizeSm": "Pequeno",
      "shape": "Forma da foto",
      "shapeRound": "Redonda",
      "shapeSquare": "Cadrada"
    },
    "hidden": "agochado",
    "reset": "Comezar de novo",
    "resetConfirm": "Escolle de novo para baleirar todos os campos"
  }
};
