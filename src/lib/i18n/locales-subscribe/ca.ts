// ca strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale ca
export default {
  "welcome": {
    "title": "Et donem la benvinguda al butlletí",
    "invitedBy": "{configuratorId} t'ha convidat a subscriure't."
  },
  "email": {
    "title": "On t'hem d'enviar cada número?",
    "placeholder": "El teu correu"
  },
  "name": {
    "title": "Com et dius?",
    "placeholder": "El teu nom"
  },
  "language": {
    "title": "En quina llengua vols llegir?"
  },
  "subscribed": {
    "title": "Ja tens la subscripció activa",
    "subtitle": "A la safata d'entrada tens un correu de confirmació.",
    "continueTo": "Continua a",
    "finishingUp": "Pots tancar aquesta pàgina."
  },
  "form": {
    "heading": "Subscriu-te a {title}",
    "headingFallback": "Subscriu-te a aquest butlletí",
    "intro": "Els números nous arriben per correu electrònic, escrits en la llengua que triïs.",
    "from": "De {sender}",
    "emailLabel": "Adreça electrònica",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Nom",
    "optional": "opcional",
    "nameHint": "El fem servir per saludar-te. Si el deixes en blanc, farem servir l'inici de la teva adreça electrònica.",
    "languageLabel": "Llengua dels números",
    "languageSummary": "Números en {language}.",
    "languageChange": "Canvia",
    "languageHint": "L'hem triada segons la configuració del teu navegador.",
    "submit": "Subscriu-me",
    "submitting": "S'està fent la subscripció...",
    "consent": "En subscriure't, acceptes rebre correus de {sender}. Cada correu inclou un enllaç per donar-te de baixa.",
    "privacy": "Política de privadesa",
    "loadingInfo": "S'estan carregant les dades del butlletí"
  },
  "success": {
    "title": "Revisa la safata d'entrada",
    "body": "Hem enviat un correu de confirmació a {email}. Obre'l i tria Confirma la subscripció.",
    "next": "El primer número arriba quan confirmis, escrit en {language}.",
    "spam": "Si no t'arriba res en uns minuts, mira a la carpeta de correu brossa o de Promocions.",
    "changeEmail": "Fes servir una altra adreça",
    "continueTo": "Continua a {host}"
  },
  "errors": {
    "emailRequired": "Escriu la teva adreça electrònica.",
    "emailInvalid": "Aquesta adreça sembla incompleta. Revisa-la i torna-ho a provar.",
    "missingLink": "A aquest enllaç de subscripció li falta informació. Demana un enllaç nou a qui te l'ha enviat.",
    "notFound": "Aquest enllaç de subscripció ja no funciona. Demana un enllaç nou a qui te l'ha enviat.",
    "limit": "Ara mateix aquest butlletí no pot acceptar subscriptors nous. Torna-ho a provar més tard.",
    "invalid": "No hem pogut acceptar aquesta adreça. Revisa-la i torna-ho a provar.",
    "server": "No hem pogut desar la teva subscripció. Torna-ho a provar d'aquí a un moment.",
    "network": "No hem pogut connectar amb el servidor. Revisa la connexió i torna-ho a provar."
  },
  "confirm": {
    "title": "Confirma la subscripció",
    "body": "Tria el botó per començar a rebre números a {email}.",
    "button": "Confirma la subscripció",
    "confirming": "S'està confirmant...",
    "consent": "En confirmar, acceptes rebre aquest butlletí per correu electrònic. Et pots donar de baixa des de qualsevol número.",
    "successTitle": "Ja tens la subscripció activa",
    "successBody": "Els números nous arribaran a {email}.",
    "successTip": "Afegeix el remitent als teus contactes perquè no vagin a parar al correu brossa.",
    "invalidTitle": "Aquest enllaç és incomplet",
    "invalidBody": "Torna a obrir el correu de confirmació i tria el botó que hi ha. Si no el trobes, torna't a subscriure des de la pàgina del remitent.",
    "notFoundBody": "No hem trobat cap subscripció per a aquesta adreça. Torna't a subscriure des de la pàgina del remitent.",
    "errorBody": "No hem pogut confirmar la teva subscripció. Torna-ho a provar d'aquí a un moment.",
    "retry": "Torna-ho a provar",
    "home": "Ves a la pàgina d'inici"
  },
  "embed": {
    "title": "Afegeix un formulari de subscripció al teu web",
    "intro": "Enganxa un d'aquests fragments de codi al teu web. Qui s'hi subscrigui rebrà un correu de confirmació i després els teus números en la seva llengua.",
    "linkLabel": "Enllaç a la pàgina de subscripció",
    "linkHint": "Comparteix-lo a la bio d'una xarxa social, en una signatura de correu o en un codi QR.",
    "scriptLabel": "Etiqueta script (recomanat)",
    "scriptHint": "Enganxa-la on vulguis que aparegui el formulari. El formulari ajusta la mida tot sol.",
    "iframeLabel": "Iframe",
    "iframeHint": "Fes servir aquesta opció si el teu web no permet scripts.",
    "copy": "Copia",
    "copied": "Copiat",
    "copyFailed": "Selecciona el text i copia'l manualment.",
    "options": "Opcions del formulari",
    "accent": "Color del botó",
    "accentHint": "Deixa'l tal com està per fer servir el color de la teva marca.",
    "theme": "Tema",
    "themeAuto": "Segons la configuració del visitant",
    "themeLight": "Clar",
    "themeDark": "Fosc",
    "layout": "Disposició",
    "layoutFull": "Completa (títol, nom i llengua)",
    "layoutCompact": "Compacta (correu i botó)",
    "preview": "Previsualització",
    "previewNote": "La previsualització és real. Una subscripció aquí crea un subscriptor de veritat.",
    "missing": "Primer crea un butlletí. El formulari de subscripció apareixerà aquí quan existeixi."
  },
  "page": {
    "poweredBy": "Funciona amb AIBAN",
    "title": "Subscripció"
  },
  "signature": {
    "title": "Signatura de correu",
    "intro": "Els lectors la veuen al final de cada número. Fes clic a qualsevol part de la previsualització per editar-la.",
    "show": "Mostra la meva signatura a cada número",
    "showHint": "Si la desactives, els números acaben després de l'article.",
    "preview": "Previsualització",
    "previewEmpty": "La teva signatura és buida. Afegeix el teu nom per començar.",
    "articleEnd": "Final de l'article",
    "tabContent": "Contingut",
    "tabStyle": "Estil",
    "blocks": "Què cal incloure",
    "blocksHint": "Tria una etiqueta per mostrar o amagar aquesta part. Les parts amagades conserven el text.",
    "layout": "Disposició",
    "layouts": {
      "bar": "Barra de color",
      "photo": "Foto",
      "stacked": "Apilada",
      "centered": "Centrada",
      "minimal": "Només text"
    },
    "fields": {
      "name": "Nom",
      "role": "Càrrec",
      "company": "Empresa",
      "phone": "Telèfon",
      "email": "Correu electrònic",
      "website": "Lloc web",
      "address": "Adreça",
      "photoUrl": "Foto",
      "logoUrl": "Logotip",
      "socials": "Enllaços socials",
      "cta": "Botó",
      "disclaimer": "Nota legal"
    },
    "groups": {
      "about": "Sobre tu",
      "contact": "Contacte",
      "images": "Imatges",
      "socials": "Enllaços socials",
      "cta": "Botó",
      "disclaimer": "Nota legal"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Fundadora",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Carrer Major 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Reserva una trucada",
      "ctaUrl": "https://"
    },
    "ctaText": "Text del botó",
    "ctaLink": "Enllaç del botó",
    "hints": {
      "photoUrl": "Enllaç a una imatge PNG o JPG quadrada, d'almenys 144 per 144 píxels i de menys de 200 KB. Es mostra a 72 per 72 píxels al costat del teu nom.",
      "logoUrl": "Enllaç a una imatge PNG o JPG amb fons transparent o blanc, d'almenys 64 píxels d'alçada. Es mostra a 32 píxels d'alçada.",
      "website": "Si no hi poses https://, l'afegim nosaltres.",
      "cta": "El botó només apareix si omples tant el text com l'enllaç.",
      "disclaimer": "Lletra petita a la part inferior, per exemple un avís de confidencialitat. Deixa-ho en blanc si no en necessites."
    },
    "style": {
      "accent": "Color d'èmfasi",
      "accentHint": "S'utilitza per a la barra, els enllaços i el botó. Comença amb el color de la teva marca.",
      "font": "Tipus de lletra",
      "fontSans": "Sense serif",
      "fontSerif": "Amb serif",
      "size": "Mida del text",
      "sizeMd": "Normal",
      "sizeSm": "Petita",
      "shape": "Forma de la foto",
      "shapeRound": "Rodona",
      "shapeSquare": "Quadrada"
    },
    "hidden": "amagat",
    "reset": "Torna a començar",
    "resetConfirm": "Torna a triar per esborrar tots els camps"
  }
};
