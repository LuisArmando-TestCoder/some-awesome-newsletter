// it strings for locales-newflow. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale it
export default {
  "onboarding": {
    "progress": "Passaggio {current} di {total}",
    "progressLabel": "Avanzamento della configurazione",
    "back": "Indietro",
    "skip": "Salta questo passaggio",
    "continue": "Continua",
    "whyLabel": "Perché lo chiediamo",
    "skipLabel": "Se lo salti",
    "working": "Elaborazione in corso...",
    "start": {
      "title": "Avvia la tua newsletter",
      "opening": "Apertura della configurazione. Se non succede nulla,",
      "continueHere": "continua da qui"
    },
    "tryAgain": "Riprova",
    "website": {
      "title": "Qual è il tuo sito web?",
      "why": "Leggiamo il tuo sito per trovare gli articoli da cui nascerà la tua newsletter e per capire chi sono i tuoi lettori.",
      "skipNote": "Se non hai ancora un sito, scegli un argomento e useremo un sito di notizie su quel tema.",
      "label": "Indirizzo del sito",
      "hint": "Per esempio tuaazienda.it o tuaazienda.it/blog",
      "placeholder": "tuaazienda.it",
      "submit": "Continua",
      "checking": "Lettura del tuo sito...",
      "noWebsite": "Non ho un sito web",
      "haveWebsite": "Ho un sito web",
      "topicTitle": "Scegli un argomento",
      "topicHint": "Useremo un sito di notizie su questo argomento come prima fonte. Puoi cambiarlo in seguito.",
      "errors": {
        "empty": "Inserisci l'indirizzo del tuo sito per continuare.",
        "invalid": "Non sembra un indirizzo web. Controlla come l'hai scritto, per esempio tuaazienda.it.",
        "unreachable": "Non abbiamo trovato articoli in questa pagina. Prova con la pagina del blog o delle notizie, per esempio tuaazienda.it/blog.",
        "network": "Non siamo riusciti a raggiungere i nostri server. Controlla la connessione e riprova."
      }
    },
    "readers": {
      "title": "Chi legge la tua newsletter?",
      "why": "Scriviamo ogni numero per questo lettore e in questa lingua. Gli iscritti che parlano un'altra lingua ricevono una copia tradotta.",
      "skipNote": "Abbiamo compilato questi campi a partire dal tuo sito. Modifica ciò che non ti sembra corretto.",
      "languageLabel": "Lingua principale",
      "languageHint": "L'abbiamo ricavata dalle impostazioni del tuo browser.",
      "readerLabel": "Il tuo lettore ideale",
      "readerHint": "Basta una frase. Per esempio: titolari di piccoli ristoranti a Lisbona.",
      "readerPlaceholder": "A chi è rivolta questa newsletter?",
      "errors": {
        "reader": "Descrivi il tuo lettore in poche parole, così sappiamo per chi scrivere."
      }
    },
    "preview": {
      "title": "Ecco il tuo primo numero",
      "why": "Questa è l'email che riceveranno i tuoi iscritti, scritta a partire dal tuo ultimo articolo. Non è ancora stato inviato nulla.",
      "generating": "Stiamo scrivendo il tuo primo numero dal tuo ultimo articolo. Di solito serve meno di un minuto.",
      "inboxFrom": "Da",
      "inboxTo": "A",
      "inboxSubject": "Oggetto",
      "defaultSubject": "Il tuo primo numero",
      "sendTest": "Inviami una prova",
      "sendingTest": "Invio in corso...",
      "testSent": "Prova inviata a {email}. Controlla la posta in arrivo e la cartella spam.",
      "regenerate": "Riscrivilo",
      "looksGood": "Va bene, continua",
      "skipPreview": "Continua senza anteprima",
      "howTitle": "Come troviamo i tuoi articoli",
      "howBody": "Abbiamo salvato una breve regola che ci dice dove si trovano i link agli articoli nella tua pagina, così menu e pubblicità vengono ignorati. Devi modificarla solo se l'anteprima ha scelto il contenuto sbagliato.",
      "ruleLabel": "Regola degli articoli",
      "findAgain": "Cerca di nuovo gli articoli",
      "errors": {
        "generate": "Non siamo riusciti a scrivere il numero. La pagina potrebbe bloccare la lettura automatica. Riprova, oppure torna indietro e usa la pagina del tuo blog.",
        "test": "L'email di prova non è partita. Riprova tra un momento."
      }
    },
    "senderName": {
      "title": "Come deve apparire il tuo nome nella casella di posta?",
      "why": "Gli iscritti vedono questo nome accanto a ogni numero, così lo riconoscono e lo aprono.",
      "skipNote": "Se lo salti, il mittente appare come AIBAN. Puoi cambiare il nome in seguito in Impostazioni.",
      "label": "Nome del mittente",
      "hint": "Il tuo nome, quello della tua azienda o della newsletter. Massimo 60 caratteri.",
      "placeholder": "Studio Silva",
      "previewLabel": "Come appare nella casella di posta",
      "previewBody": "Il tuo numero appare con questo nome del mittente. Viene inviato dall'indirizzo di invio di AIBAN.",
      "save": "Salva e continua",
      "errors": {
        "empty": "Inserisci un nome del mittente di almeno 2 caratteri.",
        "long": "Il nome del mittente può avere al massimo 60 caratteri.",
        "save": "Non siamo riusciti a salvare il nome. Riprova tra un momento."
      }
    },
    "signature": {
      "title": "Firma email",
      "why": "La tua firma compare alla fine di ogni numero, così i lettori sanno chi l'ha scritto e come contattarti.",
      "skipNote": "Se lo salti, i numeri terminano solo con il nome della tua newsletter.",
      "nameLabel": "Il tuo nome",
      "namePlaceholder": "Ana Silva",
      "roleLabel": "Ruolo o azienda",
      "rolePlaceholder": "Fondatrice, Studio Silva",
      "linkLabel": "Link",
      "linkHint": "Il tuo sito o un profilo social. Facoltativo.",
      "linkPlaceholder": "tuaazienda.it",
      "previewLabel": "Come appare alla fine di un'email",
      "previewBody": "Grazie per aver letto. Ci sentiamo al prossimo numero.",
      "save": "Salva la firma",
      "existingNote": "Hai già una firma. Salvando qui la sostituisci."
    },
    "schedule": {
      "title": "Quando devono partire i nuovi numeri?",
      "why": "Prima di ogni invio controlliamo il tuo sito e scriviamo un nuovo numero dagli articoli più recenti.",
      "skipNote": "Puoi cambiare giorno e ora, o sospendere gli invii, in qualsiasi momento dalla dashboard.",
      "scheduleLabel": "Orario di invio",
      "frequencyLabel": "Frequenza",
      "daily": "Ogni giorno",
      "weekly": "Ogni settimana",
      "monthly": "Ogni mese, il giorno 1",
      "dayLabel": "Giorno",
      "timeLabel": "Ora",
      "timeHint": "Nel tuo fuso orario.",
      "recipeTitle": "Invia i nuovi numeri in automatico",
      "recipeBody": "Con la frequenza indicata sopra, scegliamo il tuo miglior articolo nuovo, lo scriviamo con il tuo stile, lo traduciamo per ogni lettore e lo inviamo via email.",
      "recipeOn": "Attivo",
      "recipeOff": "Disattivo. I numeri partono solo quando premi Invia.",
      "save": "Salva e continua",
      "saving": "Salvataggio della newsletter...",
      "errors": {
        "create": "Non siamo riusciti a salvare la tua newsletter. Riprova tra un momento.",
        "limit": "Il tuo piano non consente un'altra fonte. Per aggiungerne una, scrivici e cambieremo il tuo piano."
      }
    },
    "send": {
      "title": "Invia il tuo primo numero",
      "why": "Inviandolo ora vedi l'intero percorso: il numero arriva in una vera casella di posta, nella lingua del lettore.",
      "skipNote": "Se lo salti, il primo numero parte all'orario programmato.",
      "youAreSubscribed": "Sei già iscritto come {email}.",
      "othersLabel": "Invita altre persone (facoltativo)",
      "othersHint": "Incolla gli indirizzi email separati da virgole o da un a capo. Ogni persona riceve un invito personale da parte tua. Riceveranno i numeri solo se accettano, e dopo 30 giorni eliminiamo gli inviti non accettati.",
      "othersPlaceholder": "ana@example.com, li@example.com",
      "sendNow": "Invia ora",
      "sending": "Invio del primo numero...",
      "sentTitle": "Il tuo primo numero è in viaggio",
      "sentBody": "Arriva a tutte le persone della tua lista che hanno confermato l'iscrizione. Possono servire alcuni minuti.",
      "invited": "Inviti inviati a {count} persone. Entrano nella tua lista quando accettano.",
      "invitesUnavailable": "Gli inviti non sono ancora disponibili, quindi non abbiamo salvato questi indirizzi. Nel prossimo passaggio copia il tuo link di iscrizione e invialo tu a queste persone.",
      "continue": "Continua",
      "errors": {
        "invalidEmails": "Questi indirizzi non sembrano corretti: {list}. Correggili o rimuovili.",
        "add": "Non siamo riusciti a invitare: {list}. Riprova più tardi da Iscritti.",
        "send": "Il numero non è partito. Riprova tra un momento."
      }
    },
    "share": {
      "title": "Trova i tuoi primi iscritti",
      "why": "Chi si iscrive qui riceve ogni numero nella propria lingua.",
      "skipNote": "Trovi questo link e il codice da incorporare anche più tardi in Iscritti, sotto Modulo di iscrizione.",
      "linkLabel": "Pagina di iscrizione",
      "linkHint": "Condividila sui social, nel piè di pagina delle tue email o con un codice QR.",
      "embedLabel": "Modulo di iscrizione per il tuo sito",
      "embedHint": "Incolla questo codice nel punto del tuo sito in cui vuoi che appaia il modulo.",
      "copy": "Copia",
      "copied": "Copiato",
      "open": "Apri la pagina di iscrizione"
    },
    "done": {
      "title": "La tua newsletter è configurata",
      "why": "Ecco cosa succede adesso e cosa resta da fare.",
      "planLine": "Piano attuale: {plan}",
      "changePlan": "Vedi i piani",
      "toDashboard": "Vai alla dashboard",
      "summarySource": "Fonte: {url}",
      "summarySchedule": "Frequenza: {schedule}",
      "summaryAutomation": "Invio automatico: {state}",
      "on": "attivo",
      "off": "disattivo"
    }
  },
  "tutorial": {
    "checklistTitle": "Primi passi",
    "checklistProgress": "{done} di {total} completati",
    "checklistDone": "Tutto pronto. Ora la tua newsletter procede da sola.",
    "dismiss": "Nascondi la lista",
    "doneLabel": "fatto",
    "todoLabel": "da fare",
    "show": "Mostra i primi passi",
    "items": {
      "source": {
        "title": "Aggiungi da dove arrivano i tuoi contenuti",
        "body": "Un sito o un blog in cui cerchiamo nuovi articoli."
      },
      "sender": {
        "title": "Scegli il nome del mittente",
        "body": "Il nome che gli iscritti vedono accanto a ogni numero."
      },
      "subscriber": {
        "title": "Trova il tuo primo iscritto",
        "body": "Una persona diversa da te si iscrive o viene aggiunta."
      },
      "send": {
        "title": "Invia il tuo primo numero",
        "body": "Un numero vero arriva alle persone della tua lista."
      },
      "automation": {
        "title": "Attiva l'invio automatico",
        "body": "I nuovi numeri partono secondo la tua programmazione."
      },
      "widget": {
        "title": "Aggiungi il modulo di iscrizione al tuo sito",
        "body": "I visitatori possono iscriversi senza lasciare il tuo sito."
      }
    },
    "open": "Apri",
    "tour": {
      "start": "Fai un giro veloce",
      "next": "Avanti",
      "back": "Indietro",
      "skip": "Salta il giro",
      "finish": "Fine",
      "stepOf": "{current} di {total}"
    },
    "help": {
      "whatIsThis": "Che cos'è?",
      "whyItMatters": "Perché è importante",
      "close": "Chiudi"
    }
  },
  "auth": {
    "emailLabel": "Indirizzo email",
    "emailHint": "Inviamo un codice di 6 cifre a questo indirizzo. Non ti serve una password.",
    "codeTitle": "Controlla la tua email",
    "codeSentTo": "Abbiamo inviato un codice di 6 cifre a {email}.",
    "codeHint": "Il codice può impiegare un minuto ad arrivare. Controlla anche la cartella spam.",
    "changeEmail": "Usa un'altra email",
    "resend": "Invia un nuovo codice",
    "resendIn": "Puoi richiedere un nuovo codice tra {seconds} s",
    "resendLimit": "Se il codice non è ancora arrivato, scrivici dalla pagina Assistenza e risolveremo il problema.",
    "resent": "Ti abbiamo inviato un nuovo codice.",
    "verifying": "Verifica del codice...",
    "errors": {
      "email": "Inserisci un indirizzo email completo, per esempio tu@azienda.it.",
      "send": "Non siamo riusciti a inviare il codice. Controlla la connessione e riprova.",
      "code": "Il codice non funziona. Controlla le 6 cifre o richiedi un nuovo codice."
    }
  }
};
