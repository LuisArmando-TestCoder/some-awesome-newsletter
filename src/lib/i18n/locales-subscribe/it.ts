// it strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale it
export default {
  "welcome": {
    "title": "Benvenuto nella newsletter",
    "invitedBy": "{configuratorId} ti ha invitato a iscriverti."
  },
  "email": {
    "title": "Dove dobbiamo inviarti ogni numero?",
    "placeholder": "La tua email"
  },
  "name": {
    "title": "Come ti chiami?",
    "placeholder": "Il tuo nome"
  },
  "language": {
    "title": "In quale lingua vuoi leggere?"
  },
  "subscribed": {
    "title": "Ti sei iscritto",
    "subtitle": "Controlla la tua casella: ti abbiamo inviato un'email di conferma.",
    "continueTo": "Continua a",
    "finishingUp": "Puoi chiudere questa pagina."
  },
  "form": {
    "heading": "Iscriviti a {title}",
    "headingFallback": "Iscriviti a questa newsletter",
    "intro": "I nuovi numeri arrivano via email, scritti nella lingua che scegli.",
    "from": "Da {sender}",
    "emailLabel": "Indirizzo email",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Nome",
    "optional": "facoltativo",
    "nameHint": "Lo usiamo per salutarti. Se lo lasci vuoto, usiamo la prima parte del tuo indirizzo email.",
    "languageLabel": "Lingua dei tuoi numeri",
    "languageSummary": "Numeri in {language}.",
    "languageChange": "Cambia",
    "languageHint": "L'abbiamo ricavata dalle impostazioni del tuo browser.",
    "submit": "Iscriviti",
    "submitting": "Iscrizione in corso...",
    "consent": "Iscrivendoti accetti di ricevere email da {sender}. Ogni email contiene un link per annullare l'iscrizione.",
    "privacy": "Informativa sulla privacy",
    "loadingInfo": "Caricamento dei dettagli della newsletter"
  },
  "success": {
    "title": "Controlla la tua casella",
    "body": "Abbiamo inviato un'email di conferma a {email}. Aprila e seleziona Conferma l'iscrizione.",
    "next": "Il tuo primo numero arriva dopo la conferma, scritto in {language}.",
    "spam": "Se entro qualche minuto non arriva nulla, controlla la cartella spam o Promozioni.",
    "changeEmail": "Usa un'altra email",
    "continueTo": "Continua su {host}"
  },
  "errors": {
    "emailRequired": "Inserisci il tuo indirizzo email.",
    "emailInvalid": "Questo indirizzo email sembra incompleto. Controllalo e riprova.",
    "missingLink": "In questo link di iscrizione mancano delle informazioni. Chiedi un nuovo link al mittente.",
    "notFound": "Questo link di iscrizione non funziona più. Chiedi un nuovo link al mittente.",
    "limit": "Al momento questa newsletter non può accettare nuovi iscritti. Riprova più tardi.",
    "invalid": "Non abbiamo potuto accettare questo indirizzo. Controllalo e riprova.",
    "server": "Non siamo riusciti a salvare la tua iscrizione. Riprova tra un momento.",
    "network": "Non siamo riusciti a raggiungere il server. Controlla la connessione e riprova."
  },
  "confirm": {
    "title": "Conferma la tua iscrizione",
    "body": "Seleziona il pulsante per iniziare a ricevere i numeri all'indirizzo {email}.",
    "button": "Conferma l'iscrizione",
    "confirming": "Conferma in corso...",
    "consent": "Confermando accetti di ricevere questa newsletter via email. Puoi annullare l'iscrizione da qualsiasi numero.",
    "successTitle": "Ti sei iscritto",
    "successBody": "I nuovi numeri arriveranno all'indirizzo {email}.",
    "successTip": "Per evitare che finiscano nello spam, aggiungi il mittente ai tuoi contatti.",
    "invalidTitle": "Questo link è incompleto",
    "invalidBody": "Apri di nuovo l'email di conferma e seleziona il pulsante. Se non la trovi, iscriviti di nuovo dalla pagina del mittente.",
    "notFoundBody": "Non abbiamo trovato un'iscrizione per questo indirizzo. Iscriviti di nuovo dalla pagina del mittente.",
    "errorBody": "Non siamo riusciti a confermare la tua iscrizione. Riprova tra un momento.",
    "retry": "Riprova",
    "home": "Vai alla home page"
  },
  "embed": {
    "title": "Aggiungi un modulo di iscrizione al tuo sito",
    "intro": "Incolla uno di questi frammenti di codice nel tuo sito. Chi si iscrive riceve un'email di conferma e poi i tuoi numeri nella propria lingua.",
    "linkLabel": "Link alla pagina di iscrizione",
    "linkHint": "Condividilo nella bio di un profilo social, in una firma email o con un codice QR.",
    "scriptLabel": "Tag script (consigliato)",
    "scriptHint": "Incollalo dove deve apparire il modulo. Il modulo si ridimensiona da solo.",
    "iframeLabel": "Iframe",
    "iframeHint": "Usalo se il tuo sito non consente gli script.",
    "copy": "Copia",
    "copied": "Copiato",
    "copyFailed": "Seleziona il testo e copialo manualmente.",
    "options": "Opzioni del modulo",
    "accent": "Colore del pulsante",
    "accentHint": "Lascialo così per usare il colore del tuo marchio.",
    "theme": "Tema",
    "themeAuto": "Segui l'impostazione del visitatore",
    "themeLight": "Chiaro",
    "themeDark": "Scuro",
    "layout": "Layout",
    "layoutFull": "Completo (titolo, nome e lingua)",
    "layoutCompact": "Compatto (email e pulsante)",
    "preview": "Anteprima",
    "previewNote": "L'anteprima è attiva. Un'iscrizione fatta qui crea un iscritto reale.",
    "missing": "Crea prima una newsletter. Il modulo di iscrizione apparirà qui quando esisterà."
  },
  "page": {
    "poweredBy": "Funziona con AIBAN",
    "title": "Iscriviti"
  },
  "signature": {
    "title": "Firma email",
    "intro": "I lettori la vedono alla fine di ogni numero. Fai clic su una parte qualsiasi dell'anteprima per modificarla.",
    "show": "Mostra la mia firma in ogni numero",
    "showHint": "Se la disattivi, i numeri terminano dopo l'articolo.",
    "preview": "Anteprima",
    "previewEmpty": "La tua firma è vuota. Aggiungi il tuo nome per iniziare.",
    "articleEnd": "Fine dell'articolo",
    "tabContent": "Contenuto",
    "tabStyle": "Stile",
    "blocks": "Cosa includere",
    "blocksHint": "Seleziona un'etichetta per mostrare o nascondere quella parte. Le parti nascoste mantengono il loro testo.",
    "layout": "Layout",
    "layouts": {
      "bar": "Barra colorata",
      "photo": "Foto",
      "stacked": "In colonna",
      "centered": "Centrato",
      "minimal": "Solo testo"
    },
    "fields": {
      "name": "Nome",
      "role": "Ruolo",
      "company": "Azienda",
      "phone": "Telefono",
      "email": "Email",
      "website": "Sito web",
      "address": "Indirizzo",
      "photoUrl": "Foto",
      "logoUrl": "Logo",
      "socials": "Link social",
      "cta": "Pulsante",
      "disclaimer": "Nota legale"
    },
    "groups": {
      "about": "Su di te",
      "contact": "Contatti",
      "images": "Immagini",
      "socials": "Link social",
      "cta": "Pulsante",
      "disclaimer": "Nota legale"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Fondatrice",
      "company": "Studio Riverside",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "esempio.it",
      "address": "Via Roma 120, Milano",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Prenota una chiamata",
      "ctaUrl": "https://"
    },
    "ctaText": "Testo del pulsante",
    "ctaLink": "Link del pulsante",
    "hints": {
      "photoUrl": "Link a un'immagine PNG o JPG quadrata, di almeno 144 per 144 pixel e sotto i 200 KB. Viene mostrata a 72 per 72 pixel accanto al tuo nome.",
      "logoUrl": "Link a un'immagine PNG o JPG con sfondo trasparente o bianco, alta almeno 64 pixel. Viene mostrata alta 32 pixel.",
      "website": "Se lo ometti, aggiungiamo noi https://.",
      "cta": "Per mostrare il pulsante servono sia il testo sia il link.",
      "disclaimer": "Testo in piccolo in fondo, per esempio una nota di riservatezza. Lascialo vuoto se non ti serve."
    },
    "style": {
      "accent": "Colore principale",
      "accentHint": "Usato per la barra, i link e il pulsante. Parte dal colore del tuo marchio.",
      "font": "Carattere",
      "fontSans": "Senza grazie",
      "fontSerif": "Con grazie",
      "size": "Dimensione del testo",
      "sizeMd": "Normale",
      "sizeSm": "Piccola",
      "shape": "Forma della foto",
      "shapeRound": "Rotonda",
      "shapeSquare": "Quadrata"
    },
    "hidden": "nascosto",
    "reset": "Ricomincia",
    "resetConfirm": "Seleziona di nuovo per svuotare tutti i campi"
  }
};
