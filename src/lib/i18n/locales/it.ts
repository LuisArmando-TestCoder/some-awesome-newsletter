// it strings for locales. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale it
export default {
  "auth": {
    "logo": "/icons/logo.png",
    "login": {
      "pageTitle": "Accedi",
      "title": "Accedi ad AIBAN",
      "subtitle": "Connettiti per riprendere da dove avevi lasciato.",
      "google": "Continua con Google",
      "or": "oppure",
      "emailPlaceholder": "tu@esempio.com",
      "continueWithEmail": "Continua con l'email",
      "switchText": "Non hai un account?",
      "switchLink": "Registrati",
      "switchHref": "/signup"
    },
    "signup": {
      "pageTitle": "Registrati",
      "title": "Crea il tuo account",
      "subtitle": "Non serve una carta di credito.",
      "google": "Continua con Google",
      "or": "oppure",
      "emailPlaceholder": "tu@esempio.com",
      "continueWithEmail": "Continua con l'email",
      "switchText": "Hai già un account?",
      "switchLink": "Accedi",
      "switchHref": "/login"
    }
  },
  "landing": {
    "seo": {
      "title": "AIBAN | Il tuo sito diventa una newsletter nella lingua di ogni lettore",
      "description": "AIBAN legge ciò che pubblichi già, scrive un numero della newsletter con la tua voce e lo invia a tuo nome. Ogni iscritto lo riceve nella propria lingua.",
      "ogImageAlt": "Logo di AIBAN"
    },
    "skipLink": "Vai al contenuto principale",
    "hero": {
      "eyebrow": "Newsletter per aziende di servizi",
      "title": "Il tuo sito diventa una newsletter settimanale, nella lingua di ogni lettore",
      "lead": "AIBAN legge i contenuti che pubblichi già, scrive un numero con la tua voce e lo invia a tuo nome. Ogni iscritto lo riceve nella lingua in cui legge. Lo configuri una volta e continua a funzionare.",
      "formLabel": "Il tuo sito web",
      "formPlaceholder": "tuaazienda.it",
      "formHint": "Creiamo un numero di prova dall'indirizzo che inserisci. Iniziare è gratis e non serve una carta.",
      "formSubmit": "Vedi l'anteprima della mia newsletter",
      "formError": "Inserisci un indirizzo web, per esempio tuaazienda.it.",
      "secondaryCta": "Scopri come funziona"
    },
    "preview": {
      "badge": "Anteprima di esempio",
      "note": "Questo è un layout di esempio con testo segnaposto. Quando inizi, AIBAN scrive il numero vero a partire dal tuo articolo più recente.",
      "fromLabel": "Da",
      "toLabel": "A",
      "subjectLabel": "Oggetto",
      "languageLabel": "Lingua del lettore",
      "readOnBlog": "Leggi sul blog",
      "startCta": "Inizia gratis con {site}",
      "startCtaGeneric": "Inizia gratis",
      "liveRegion": "Anteprima di esempio aggiornata per {site}."
    },
    "chain": {
      "eyebrow": "Come funziona",
      "title": "Lo imposti una volta, poi procede da solo",
      "lead": "Indichi ad AIBAN il tuo sito una sola volta. Da lì in poi ogni passaggio qui sotto avviene da solo, con la frequenza che scegli.",
      "triggerLabel": "Quando",
      "actionLabel": "Allora",
      "trigger": {
        "title": "È lunedì alle 9:00",
        "body": "Oppure la frequenza che preferisci: giornaliera, settimanale o mensile."
      },
      "steps": [
        {
          "title": "AIBAN trova il tuo articolo più recente",
          "body": "Controlla il tuo sito e sceglie il contenuto che interesserà di più al tuo lettore ideale."
        },
        {
          "title": "Scrive il numero con il tuo stile",
          "body": "Il testo viene riscritto per suonare come te, in base a come è scritto il tuo sito."
        },
        {
          "title": "Traduce il numero per ogni lettore",
          "body": "Ogni iscritto lo riceve nella lingua che ha scelto al momento dell'iscrizione."
        },
        {
          "title": "Lo invia a tuo nome",
          "body": "I lettori vedono il tuo nome e le loro risposte arrivano nella tua casella di posta."
        },
        {
          "title": "Pubblica il numero sul tuo blog",
          "body": "Ogni numero ha anche una pagina pubblica con un proprio link."
        },
        {
          "title": "Ti mostra cosa è successo",
          "body": "La tua dashboard elenca chi si è iscritto e quali link hanno cliccato i lettori."
        }
      ],
      "alsoTitle": "Si avvia anche quando",
      "also": [
        {
          "title": "Qualcuno si iscrive sul tuo sito",
          "body": "Conferma via email e inizia a ricevere i tuoi numeri."
        },
        {
          "title": "Incolli un link o un testo",
          "body": "AIBAN scrive e invia un numero su quell'argomento seguendo gli stessi passaggi."
        },
        {
          "title": "Carichi un elenco di contatti",
          "body": "AIBAN pulisce l'elenco, rimuove i duplicati e stima la lingua di ogni contatto."
        }
      ]
    },
    "languages": {
      "eyebrow": "Ogni lingua",
      "title": "Ogni lettore riceve il numero nella propria lingua",
      "body": "Non devi scrivere versioni separate. AIBAN traduce ogni numero in tutte le lingue dei tuoi iscritti e mantiene il tuo tono in ciascuna. L'elenco comprende spagnolo, portoghese, francese, tedesco, hindi, arabo, giapponese e molte altre.",
      "sampleNote": "Lo stesso numero di esempio, come lo riceverebbero tre lettori diversi."
    },
    "sender": {
      "eyebrow": "Il tuo indirizzo",
      "title": "Inviato a tuo nome",
      "body": "I numeri arrivano con il tuo nome e la tua firma email. AIBAN li invia dal proprio indirizzo verificato, quindi non devi mai darci la password della tua email. Quando un lettore risponde, la risposta arriva nella tua casella di posta.",
      "inboxLabel": "Come appare nella casella di un lettore",
      "inboxFrom": "Tu",
      "inboxSubject": "Questa settimana da {site}",
      "inboxSnippet": "Un breve riassunto del tuo articolo più recente, scritto con il tuo stile.",
      "inboxTime": "9:00"
    },
    "grow": {
      "eyebrow": "Fai crescere la tua lista",
      "title": "Un modulo di iscrizione per il tuo sito e un blog che si aggiorna da solo",
      "items": [
        {
          "title": "Modulo di iscrizione",
          "body": "Aggiungi il modulo di AIBAN al tuo sito. I nuovi lettori scelgono la lingua e confermano via email."
        },
        {
          "title": "Blog automatico",
          "body": "Ogni numero diventa una pagina pubblica che si può trovare con i motori di ricerca e condividere con un link."
        },
        {
          "title": "Importazione dei contatti",
          "body": "Porta i clienti che hai già da un file CSV o Excel, oppure incolla un elenco."
        }
      ]
    },
    "useCases": {
      "eyebrow": "A chi è rivolto",
      "title": "Pensato per le aziende che crescono grazie alle relazioni",
      "lead": "Se i tuoi clienti arrivano dal passaparola e dalla fiducia, un messaggio regolare da parte tua ti tiene presente nella loro mente. AIBAN scrive quel messaggio per te.",
      "items": [
        {
          "title": "Agenzie e web designer",
          "body": "Invia ogni settimana a clienti e potenziali clienti i tuoi lavori e articoli più recenti, e usa la stessa configurazione per i siti dei clienti."
        },
        {
          "title": "Aziende IT e di software",
          "body": "Trasforma note di rilascio e articoli del blog in un breve aggiornamento che ogni cliente legge nella propria lingua."
        },
        {
          "title": "Immobiliare",
          "body": "Condividi nuovi immobili e articoli sul mercato con acquirenti e venditori che parlano lingue diverse."
        },
        {
          "title": "Avvocati e commercialisti",
          "body": "Tieni informati i clienti sui temi di cui scrivi già, con un formato pacato e costante."
        },
        {
          "title": "Coach e formatori",
          "body": "Invia la tua ultima lezione o il tuo ultimo articolo alla tua community in un giorno fisso, senza riscriverlo."
        }
      ]
    },
    "pricingIntro": {
      "eyebrow": "Prezzi",
      "title": "Inizia gratis, passa a un piano superiore quando la lista cresce",
      "lead": "Il piano gratuito include 1 fonte e fino a 100 iscritti. I piani a pagamento aggiungono più fonti e più iscritti."
    },
    "faqTitle": "Domande frequenti prima di iniziare",
    "faq": [
      {
        "id": "what-do-i-need",
        "q": "Cosa mi serve per iniziare?",
        "a": "L'indirizzo del tuo sito e un indirizzo email. AIBAN legge il tuo sito per capire i tuoi temi e come scrivi."
      },
      {
        "id": "do-i-write",
        "q": "Devo scrivere qualcosa?",
        "a": "No, non è necessario. AIBAN scrive ogni numero a partire dai tuoi contenuti. Se vuoi un numero su un argomento preciso, puoi incollare un link o un testo."
      },
      {
        "id": "languages",
        "q": "In quali lingue possono riceverla i miei lettori?",
        "a": "AIBAN traduce ogni numero nella lingua che legge ciascun iscritto. Puoi vedere l'elenco completo delle lingue quando configuri la newsletter."
      },
      {
        "id": "sender",
        "q": "Da chi arrivano le email?",
        "a": "Dall'indirizzo di invio di AIBAN, con il tuo nome come mittente. Le risposte arrivano direttamente nella tua casella di posta. Non ci dai mai la password della tua email."
      },
      {
        "id": "contacts",
        "q": "Posso importare i contatti che ho già?",
        "a": "Sì. Carica un file CSV o Excel, oppure incolla un elenco. AIBAN lo pulisce, rimuove i duplicati e stima la lingua di ogni contatto."
      },
      {
        "id": "schedule",
        "q": "Con quale frequenza vengono inviati i numeri?",
        "a": "Scegli tu la frequenza durante la configurazione e puoi cambiarla in qualsiasi momento dalla dashboard."
      },
      {
        "id": "free-plan",
        "q": "Esiste un piano gratuito?",
        "a": "Sì. Il piano gratuito include 1 fonte e fino a 100 iscritti. I piani a pagamento aggiungono più fonti e iscritti."
      },
      {
        "id": "cancel",
        "q": "Posso disdire?",
        "a": "Sì. Scrivi a info@aiban.news quando vuoi e annulleremo il tuo piano a pagamento o ti riporteremo al piano gratuito."
      }
    ],
    "finalCta": {
      "title": "Inizia dal tuo sito web",
      "body": "Indica ad AIBAN il tuo sito, controlla il primo numero e attivalo quando sei pronto.",
      "cta": "Inizia gratis",
      "secondary": "Leggi il centro assistenza"
    },
    "footer": {
      "tagline": "Newsletter scritte a partire dai tuoi contenuti e inviate nella lingua di ogni lettore.",
      "product": "Prodotto",
      "company": "Azienda",
      "legal": "Note legali",
      "links": {
        "howItWorks": "Come funziona",
        "pricing": "Prezzi",
        "demo": "Demo",
        "help": "Centro assistenza",
        "about": "Chi siamo",
        "careers": "Lavora con noi",
        "privacy": "Informativa sulla privacy",
        "terms": "Termini di servizio",
        "cookies": "Informativa sui cookie"
      },
      "contactLabel": "Contatti",
      "rights": "Tutti i diritti riservati."
    }
  },
  "help": {
    "title": "Richiedi limiti più elevati",
    "subtitle": "Indicaci i limiti di cui hai bisogno e ti risponderemo via email.",
    "contact": {
      "cta": "Invia richiesta",
      "successTitle": "Richiesta pronta da inviare",
      "successBody": "Si è aperta la tua app di posta con la richiesta. Inviala da lì e ti risponderemo via email.",
      "learnMore": "/plans"
    },
    "questions": {
      "desiredLimitsHelp": "Indicaci i limiti che ti servono, per esempio quanti iscritti e quante fonti.",
      "useCaseHelp": "Descrivi cosa invii, a chi e con quale frequenza.",
      "expectedSpendHelp": "Una stima approssimativa ci aiuta a suggerirti un piano. Puoi lasciarlo come non noto."
    },
    "form": {
      "nameLabel": "Nome",
      "emailLabel": "Email",
      "companyLabel": "Azienda",
      "optional": "(facoltativo)",
      "limitsLabel": "Limiti di cui hai bisogno",
      "useCaseLabel": "Come usi AIBAN",
      "spendLabel": "Spesa mensile prevista",
      "spend": {
        "lt500": "Meno di 500 $",
        "500_2k": "Da 500 $ a 2.000 $",
        "2k_10k": "Da 2.000 $ a 10.000 $",
        "gt10k": "Più di 10.000 $",
        "unknown": "Non lo so ancora"
      },
      "urgencyLabel": "Urgenza",
      "urgency": {
        "low": "Bassa",
        "normal": "Normale",
        "high": "Alta"
      },
      "replyLabel": "Come preferisci che ti rispondiamo?",
      "reply": {
        "email": "Via email",
        "call": "Con una telefonata"
      },
      "payAsYouGo": "Mi interessa pagare in base all'uso",
      "sending": "Invio in corso...",
      "sentTitle": "Richiesta inviata",
      "sentBody": "Abbiamo ricevuto la tua richiesta e ti risponderemo all'indirizzo email che hai indicato.",
      "retryBefore": "Se la tua app di posta non si è aperta,",
      "retryLink": "apri di nuovo la richiesta",
      "retryAfter": "oppure scrivi a",
      "errors": {
        "name": "Inserisci il tuo nome (almeno 2 caratteri).",
        "email": "Inserisci un indirizzo email a cui possiamo rispondere, ad esempio nome@esempio.com.",
        "company": "Inserisci almeno 2 caratteri oppure lascia vuoto.",
        "desiredLimits": "Descrivi i limiti di cui hai bisogno in almeno 10 caratteri.",
        "useCase": "Descrivi come lo usi in almeno 20 caratteri."
      }
    },
    "faqs": [
      {
        "id": "limits-how",
        "q": "Come funzionano i limiti più elevati?",
        "a": "Invia una richiesta con i limiti che ti servono. Ti rispondiamo via email con le opzioni per il tuo account."
      }
    ],
    "links": {
      "docs": "/plans",
      "community": "/help"
    }
  },
  "faq": [
    {
      "q": "Cosa fa AIBAN?",
      "a": "AIBAN legge i contenuti che pubblichi già, come il tuo sito, il tuo blog o i siti di notizie che scegli. Scrive nuovi numeri con la tua voce e li invia come newsletter. Ogni iscritto la riceve nella lingua che ha scelto, con il tuo nome come mittente."
    },
    {
      "q": "Esiste un piano gratuito?",
      "a": "Sì. Il piano gratuito include 1 fonte e fino a 100 iscritti. Se ti serve di più, scrivici e cambieremo il tuo piano."
    },
    {
      "q": "Come ricevono gli iscritti la newsletter nella loro lingua?",
      "a": "Ogni iscritto sceglie una lingua preferita al momento dell'iscrizione. AIBAN traduce ogni numero in quella lingua prima di inviarlo."
    },
    {
      "q": "I numeri possono partire dal mio indirizzo email?",
      "a": "I numeri partono dall'indirizzo di invio di AIBAN con il tuo nome e la tua firma email, e le risposte arrivano nella tua casella di posta. Non ti chiediamo la password della tua email, quindi non c'è nulla di tuo che possa trapelare."
    },
    {
      "q": "Come si iscrivono le persone?",
      "a": "Hai una pagina di iscrizione e un widget di iscrizione da inserire nel tuo sito. Puoi anche aggiungere le persone tu stesso o caricare un elenco."
    },
    {
      "q": "Posso disdire in qualsiasi momento?",
      "a": "Sì. Scrivi a info@aiban.news quando vuoi e annulleremo il tuo piano a pagamento o ti riporteremo al piano gratuito."
    }
  ],
  "plans": {
    "currency": "USD",
    "billingIntervals": [
      "mensile",
      "annuale"
    ],
    "currentPlan": "free",
    "plans": [
      {
        "id": "free",
        "name": "Gratis",
        "monthly": 0,
        "yearly": 0,
        "tagline": "Prova AIBAN con una fonte",
        "featuresBase": [
          "1 fonte",
          "Fino a 100 iscritti"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": 1,
          "users": 100
        },
        "ctaLabel": "Piano attuale",
        "tier": 0
      },
      {
        "id": "starter",
        "name": "Starter",
        "monthly": 17,
        "yearly": 132,
        "tagline": "Per newsletter in crescita",
        "featuresBase": [
          "5 fonti",
          "Fino a 100.000 iscritti"
        ],
        "featuresDelta": [
          "Supporto via email",
          "Traduzione di base"
        ],
        "limits": {
          "newsSources": 5,
          "users": 100000
        },
        "ctaLabel": "Scegli Starter",
        "productId": "prod_starter_id",
        "tier": 1
      },
      {
        "id": "growth",
        "name": "Growth",
        "monthly": 35,
        "yearly": 273,
        "tagline": "Per newsletter già avviate",
        "featuresBase": [
          "17 fonti",
          "Fino a 250.000 iscritti"
        ],
        "featuresDelta": [
          "Branding personalizzato",
          "Analisi avanzate"
        ],
        "limits": {
          "newsSources": 17,
          "users": 250000
        },
        "ctaLabel": "Scegli Growth",
        "productId": "prod_growth_id",
        "tier": 2
      },
      {
        "id": "pro",
        "name": "Pro",
        "monthly": 80,
        "yearly": 624,
        "tagline": "Per i professionisti del marketing",
        "featuresBase": [
          "25 fonti",
          "Fino a 500.000 iscritti"
        ],
        "featuresDelta": [
          "Accesso alle API",
          "Elaborazione prioritaria"
        ],
        "limits": {
          "newsSources": 25,
          "users": 500000
        },
        "ctaLabel": "Scegli Pro",
        "productId": "prod_pro_id",
        "tier": 3
      },
      {
        "id": "master",
        "name": "Master",
        "monthly": 150,
        "yearly": 1170,
        "tagline": "Per un pubblico ampio",
        "featuresBase": [
          "50 fonti",
          "Iscritti illimitati"
        ],
        "featuresDelta": [
          "Supporto dedicato",
          "Webhook personalizzati"
        ],
        "limits": {
          "newsSources": 50,
          "users": -1
        },
        "ctaLabel": "Scegli Master",
        "productId": "prod_master_id",
        "tier": 4
      },
      {
        "id": "vipfree",
        "name": "VIP Gratis",
        "monthly": 0,
        "yearly": 0,
        "tagline": "Accesso completo per i partner",
        "featuresBase": [
          "Fonti illimitate",
          "Iscritti illimitati"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": -1,
          "users": -1
        },
        "ctaLabel": "Piano attuale",
        "internalOnly": true,
        "tier": 5
      }
    ],
    "contact": {
      "text": "Hai bisogno di una soluzione su misura?",
      "cta": "Contattaci",
      "href": "/help"
    }
  },
  "article": {
    "notFound": "Articolo non trovato.",
    "errorFetching": "Non siamo riusciti a caricare questo articolo. Ricarica la pagina tra un minuto per riprovare.",
    "noArticleSpecified": "Nessun articolo specificato.",
    "goBack": "Torna indietro",
    "loading": "Caricamento..."
  },
  "pricing": {
    "eyebrow": "Prezzi",
    "title": "Piani e prezzi",
    "currentPlan": "Piano attuale:",
    "monthly": "Mensile",
    "yearly": "Annuale",
    "yearlySave": "Risparmia il 35%",
    "intervalLabel": "Periodo di fatturazione",
    "billedYearly": "fatturato annualmente",
    "perMonthShort": "/mo",
    "perYearShort": "/yr",
    "freeCta": "Inizia gratis",
    "processing": "Apertura del checkout...",
    "askMore": "Ogni account parte dal piano Gratis. Se ti serve di più, scrivici a {email} e cambieremo il tuo piano.",
    "askFor": "Richiedi {planName}",
    "askAction": "Scrivici",
    "checkoutError": "Non siamo riusciti ad aprire il checkout. Riprova tra un momento.",
    "networkError": "Non siamo riusciti a raggiungere il server. Controlla la connessione e riprova.",
    "includes": "Include",
    "pageMetaTitle": "Prezzi | AIBAN",
    "pageMetaDescription": "Piani e prezzi di AIBAN. Inizia gratis con 1 fonte e fino a 100 iscritti, poi passa a un piano mensile o annuale quando ti serve di più.",
    "pageTitle": "Prezzi",
    "pageLead": "Inizia con il piano gratuito: 1 fonte e fino a 100 iscritti. Quando ti servono più fonti o più iscritti, scrivici e ti passeremo a un piano a pagamento, con fatturazione mensile o annuale.",
    "faqTitle": "Domande sulla fatturazione",
    "contactText": "Ti servono limiti più alti o una configurazione personalizzata?",
    "contactCta": "Contattaci",
    "everythingIn": "Tutto ciò che è nel piano precedente, più:",
    "isCurrentPlan": "Questo è il tuo piano attuale",
    "downgradeTo": "Passa a {planName}",
    "upgradeTo": "Scegli {planName}",
    "mockMode": "Modalità di prova",
    "mostPopular": "Il più scelto",
    "perMonth": "al mese",
    "perYear": "all'anno",
    "youSave": "Risparmi"
  },
  "confirmSubscription": {
    "title": "Conferma la tua iscrizione",
    "goBack": "Torna indietro",
    "pleaseAccept": "Accetta i termini per completare l'iscrizione.",
    "iAccept": "Accetto i",
    "termsAndConditions": "Termini e condizioni",
    "and": "e la",
    "privacyPolicy": "Informativa sulla privacy",
    "confirm": "Conferma l'iscrizione",
    "mustAccept": "Devi accettare i termini per iscriverti.",
    "invalidLink": "Questo link di conferma è incompleto. Apri l'ultima email che ti abbiamo inviato e usa il link che contiene."
  },
  "articles": {
    "title": "Ultimi articoli",
    "subtitle": "Articoli che AIBAN ha scritto per le newsletter che invia.",
    "producedIn": "Lingue in cui sono disponibili questi articoli",
    "searchPlaceholder": "Cerca articoli...",
    "noArticlesFound": "Nessun articolo trovato.",
    "created": "Creato il:",
    "language": "Lingua:",
    "rightsReserved": "Tutti i diritti riservati.",
    "errorFetching": "Non siamo riusciti a caricare gli articoli. Ricarica la pagina tra un minuto per riprovare."
  },
  "blog": {
    "metaTitle": "Blog di {name}",
    "metaDescription": "Articoli di {name}. Iscriviti per ricevere i nuovi via email.",
    "eyebrow": "Blog della newsletter",
    "heroFrom": "Articoli di {name}",
    "heroDescription": "Questi sono gli articoli pubblicati da questa newsletter. Iscriviti per ricevere i nuovi via email.",
    "subscribe": "Iscriviti",
    "home": "Home del blog",
    "featured": "Ultimo articolo",
    "latest": "Ultimi articoli",
    "latestHint": "Dal più recente. Alcuni articoli non hanno un'immagine e quindi appaiono solo come testo.",
    "articleCount": "{count} articoli in {language}",
    "articleCountOne": "1 articolo in {language}",
    "languages": "Scegli una lingua",
    "minRead": "{n} min di lettura",
    "readArticle": "Leggi l'articolo",
    "page": "Pagina {page}",
    "newer": "Articoli più recenti",
    "older": "Articoli meno recenti",
    "pagination": "Pagine degli articoli",
    "emptyTitle": "Ancora nessun articolo",
    "emptyBody": "Questa newsletter non ha ancora pubblicato articoli qui. Iscriviti per ricevere il primo via email.",
    "endTitle": "Non ci sono articoli meno recenti",
    "endBody": "Sei arrivato alla fine dell'elenco.",
    "backToNewest": "Vai agli articoli più recenti",
    "errorTitle": "Non siamo riusciti a caricare questi articoli",
    "errorBody": "Il server degli articoli non ha risposto in tempo. Ricarica la pagina tra un minuto per riprovare.",
    "reload": "Ricarica la pagina",
    "missingHolder": "Questo link al blog è incompleto perché non indica quale blog aprire. Chiedi il link completo al proprietario della newsletter.",
    "redirecting": "Apertura del blog...",
    "publishedWith": "Pubblicato con AIBAN",
    "cta": {
      "title": "Ricevi il prossimo articolo via email",
      "body": "Iscriviti a {name} e i nuovi articoli arriveranno nella tua casella. Puoi annullare l'iscrizione in qualsiasi momento.",
      "button": "Iscriviti"
    },
    "search": {
      "label": "Cerca negli articoli",
      "placeholder": "Cerca una parola o una frase",
      "button": "Cerca",
      "suggestions": "Suggerimenti",
      "recent": "Ricerche recenti",
      "clearRecent": "Cancella le ricerche recenti",
      "title": "Risultati della ricerca",
      "resultsFor": "Risultati per \"{q}\"",
      "count": "{count} articoli trovati",
      "countOne": "1 articolo trovato",
      "searching": "Ricerca degli articoli in corso",
      "emptyTitle": "Nessun articolo corrisponde a \"{q}\"",
      "emptyBody": "Controlla l'ortografia o prova con una parola più breve. Puoi anche sfogliare tutti gli articoli del blog.",
      "browseAll": "Sfoglia tutti gli articoli",
      "noQuery": "Scrivi una parola o una frase qui sopra per cercare in questo blog.",
      "error": "La ricerca si è interrotta perché il server degli articoli non ha risposto. Riprova tra un minuto.",
      "tryAgain": "Riprova",
      "limitNote": "Vengono mostrati i primi {count} risultati. Usa una frase più specifica per restringere l'elenco."
    },
    "article": {
      "back": "Tutti gli articoli",
      "published": "Pubblicato il {date}",
      "by": "Di {name}",
      "otherLanguages": "Leggi in altre lingue",
      "otherLanguagesHint": "Questa newsletter pubblica anche in queste lingue. Ogni link apre il blog in quella lingua.",
      "share": "Condividi questo articolo",
      "copyLink": "Copia il link",
      "copied": "Link copiato. Puoi incollarlo dove vuoi.",
      "copyFailed": "Non è stato possibile copiare il link. Copialo dalla barra degli indirizzi del browser.",
      "notFoundTitle": "Articolo non trovato",
      "notFoundBody": "Questo articolo potrebbe essere stato rimosso, oppure il link è incompleto. Apri il blog per vedere gli altri articoli.",
      "errorTitle": "Non siamo riusciti a caricare questo articolo",
      "errorBody": "Il server degli articoli non ha risposto in tempo. Ricarica la pagina tra un minuto per riprovare.",
      "goToBlog": "Vai al blog"
    }
  },
  "nav": {
    "mainLabel": "Principale",
    "legalLabel": "Note legali",
    "home": "Home di AIBAN",
    "menu": "Menu",
    "openMenu": "Apri il menu",
    "closeMenu": "Chiudi il menu",
    "howItWorks": "Come funziona",
    "pricing": "Prezzi",
    "help": "Assistenza",
    "about": "Chi siamo",
    "privacy": "Privacy",
    "terms": "Termini",
    "cookies": "Cookie",
    "signOut": "Esci",
    "chooseLanguage": "Scegli una lingua",
    "currentLanguage": "Lingua: {name}"
  },
  "about": {
    "metaTitle": "Chi siamo | AIBAN",
    "metaDescription": "AIBAN trasforma i contenuti che un'azienda pubblica già in una newsletter che parte da sola, nella lingua di ogni iscritto e a nome del titolare.",
    "eyebrow": "Chi siamo",
    "title": "Chi è AIBAN",
    "lead": "AIBAN trasforma i contenuti che un'azienda pubblica già in una newsletter che parte da sola. Ogni iscritto la legge nella propria lingua, e arriva a nome del titolare.",
    "whatTitle": "Cosa fa AIBAN",
    "whatBody": [
      "Indichi ad AIBAN dove si trovano i tuoi contenuti: il tuo sito, il tuo blog o i siti di notizie che segui. Quando lì compare qualcosa di nuovo, AIBAN ne ricava un numero con lo stile che hai descritto e lo invia ai tuoi iscritti con la frequenza che hai scelto.",
      "Ogni iscritto sceglie una lingua al momento dell'iscrizione e ogni numero viene tradotto in quella lingua prima dell'invio. Gli articoli vengono pubblicati anche come pagine web e puoi inviarli al tuo sito."
    ],
    "whoTitle": "Chi lo realizza",
    "whoBody": [
      "AIBAN è sviluppato da Luis Murillo Baltodano, il suo fondatore. Luis è un ingegnere creativo con esperienza in computer grafica e automazione.",
      "Qui sotto trovi alcuni dei suoi progetti open source."
    ],
    "projectsTitle": "Progetti open source del fondatore",
    "projects": [
      {
        "name": "Scene Preset",
        "url": "https://github.com/LuisArmando-TestCoder/scene-preset",
        "desc": "Una libreria che elimina il codice ripetitivo quando si lavora con Three.js e le API 3D per il web."
      },
      {
        "name": "Canvas Preset",
        "url": "https://github.com/LuisArmando-TestCoder/canvas-preset",
        "desc": "Funzioni di supporto per le operazioni comuni con la Canvas API."
      },
      {
        "name": "Atomic Gatsby template",
        "url": "https://github.com/LuisArmando-TestCoder/atomic-gatsby-typescript-recoiljs",
        "desc": "Un modello di partenza organizzato secondo l'atomic design."
      }
    ],
    "githubLabel": "Luis su GitHub",
    "newTab": "(si apre in una nuova scheda)",
    "contactTitle": "Contattaci",
    "contactBody": "Per domande, feedback o proposte di collaborazione, scrivi a info@aiban.news.",
    "emailCta": "Scrivi a info@aiban.news",
    "startCta": "Inizia gratis",
    "helpCta": "Leggi il centro assistenza"
  },
  "careers": {
    "metaTitle": "Lavora con noi | AIBAN",
    "metaDescription": "Al momento AIBAN non ha posizioni aperte. Puoi comunque scriverci a info@aiban.news.",
    "eyebrow": "Lavora con noi",
    "title": "Lavorare in AIBAN",
    "lead": "Al momento AIBAN non ha posizioni aperte.",
    "body": "Quando si aprirà una posizione, la troverai in questa pagina. Se in futuro ti piacerebbe lavorare su AIBAN, mandaci due righe su di te e su cosa vorresti costruire.",
    "emailCta": "Scrivi a info@aiban.news",
    "emailSubject": "Lavorare su AIBAN",
    "aboutCta": "Scopri AIBAN"
  },
  "legal": {
    "navLabel": "Documenti legali",
    "lastUpdated": "Ultimo aggiornamento: {date}",
    "privacy": {
      "title": "Informativa sulla privacy",
      "metaTitle": "Informativa sulla privacy | AIBAN",
      "metaDescription": "Come AIBAN raccoglie, usa e protegge i tuoi dati, e come esercitare i tuoi diritti su di essi."
    },
    "terms": {
      "title": "Termini di servizio",
      "metaTitle": "Termini di servizio | AIBAN",
      "metaDescription": "I termini che si applicano quando crei un account e usi AIBAN."
    },
    "cookies": {
      "title": "Cookie policy",
      "metaTitle": "Cookie policy | AIBAN",
      "metaDescription": "Quali cookie usa AIBAN, a cosa servono, quanto durano e come puoi gestirli."
    }
  },
  "demoPage": {
    "metaTitle": "Demo | AIBAN",
    "metaDescription": "Guarda una presentazione di AIBAN e scopri cosa succede dopo l'iscrizione, dall'aggiunta del tuo sito all'invio del primo numero.",
    "eyebrow": "Demo",
    "title": "Scopri come funziona AIBAN",
    "lead": "Guarda la presentazione, poi leggi cosa succede dopo l'iscrizione.",
    "videoTitle": "Video di presentazione di AIBAN",
    "playLabel": "Riproduci il video di presentazione",
    "videoNote": "Il video viene riprodotto da YouTube.",
    "stepsTitle": "Cosa succede dopo l'iscrizione",
    "steps": [
      {
        "title": "Aggiungi il tuo sito",
        "body": "Inserisci l'indirizzo del tuo sito, del tuo blog o di un sito di notizie che segui. AIBAN lo legge per trovare contenuti nuovi."
      },
      {
        "title": "Descrivi i tuoi lettori e il tuo stile",
        "body": "Indica ad AIBAN chi legge la tua newsletter e che tono deve avere. Puoi anche lasciare che proponga una descrizione a partire dal tuo sito."
      },
      {
        "title": "Scegli una frequenza",
        "body": "Scegli ogni quanto partono i numeri. Puoi cambiarla in seguito dalla dashboard."
      },
      {
        "title": "Aggiungi gli iscritti",
        "body": "Carica un elenco, aggiungi le persone una per una o condividi la tua pagina e il tuo widget di iscrizione. Ogni iscritto sceglie una lingua."
      },
      {
        "title": "Aggiungi il nome del mittente e la firma",
        "body": "Aggiungi il nome e la firma email che vedranno i lettori. AIBAN invia ogni numero dal suo indirizzo verificato a tuo nome, e le risposte arrivano nella tua casella di posta."
      }
    ],
    "ctaTitle": "Provalo con il tuo sito",
    "ctaBody": "Il piano gratuito include 1 fonte e fino a 100 iscritti.",
    "primaryCta": "Inizia gratis",
    "secondaryCta": "Vedi i prezzi"
  },
  "helpCenter": {
    "metaTitle": "Assistenza | AIBAN",
    "metaDescription": "Risposte sulla configurazione di AIBAN: fonti, lingue, invio a tuo nome, iscritti, widget di iscrizione, blog e fatturazione.",
    "eyebrow": "Centro assistenza",
    "title": "Come possiamo aiutarti?",
    "lead": "Trova risposte su come configurare e gestire la tua newsletter. Se non trovi ciò che ti serve, scrivici.",
    "searchLabel": "Cerca nel centro assistenza",
    "searchPlaceholder": "Prova con lingua, widget o disdetta",
    "clearSearch": "Cancella la ricerca",
    "resultsCount": "{count} risposte corrispondono alla ricerca.",
    "noResults": "Nessuna risposta corrisponde alla ricerca. Prova con un'altra parola o scrivi a info@aiban.news.",
    "topicsLabel": "Argomenti",
    "copyLink": "Copia il link",
    "linkCopied": "Link copiato",
    "contactTitle": "Ti serve ancora aiuto?",
    "contactBody": "Scrivi a info@aiban.news indicando l'indirizzo email con cui ti sei registrato.",
    "emailCta": "Scrivi a info@aiban.news",
    "limitsTitle": "Richiedi limiti più alti",
    "limitsBody": "Dicci di quali limiti hai bisogno e ti risponderemo via email. Se la richiesta non si può inviare da questa pagina, si apre la tua app di posta con la richiesta già compilata, così puoi inviarcela.",
    "faqFilterLabel": "Filtra le domande",
    "faqNoMatch": "Nessuna domanda corrisponde al filtro.",
    "groups": [
      {
        "id": "getting-started",
        "title": "Primi passi",
        "items": [
          {
            "id": "what-is-aiban",
            "q": "Che cos'è AIBAN?",
            "a": "AIBAN trasforma i contenuti che pubblichi già in una newsletter periodica. Legge il tuo sito, il tuo blog o i siti di notizie che scegli, scrive nuovi numeri con il tuo stile e li invia ai tuoi iscritti. Ogni iscritto la legge nella lingua che ha scelto."
          },
          {
            "id": "how-to-start",
            "q": "Come inizio?",
            "a": "Crea un account dalla pagina di registrazione. La configurazione ti chiede l'indirizzo del tuo sito e qualche informazione sui tuoi lettori. Dopo puoi aggiungere gli iscritti e gestire tutto dalla dashboard."
          },
          {
            "id": "change-settings",
            "q": "Posso modificare la configurazione in seguito?",
            "a": "Sì. Puoi modificare in seguito fonti, programmazione, dati del mittente e iscritti dalla tua dashboard. Per cambiare piano, scrivi a info@aiban.news."
          }
        ]
      },
      {
        "id": "sources",
        "title": "Fonti e contenuti",
        "items": [
          {
            "id": "what-is-a-source",
            "q": "Cosa posso usare come fonte?",
            "a": "Una fonte è un indirizzo web che AIBAN legge per trovare contenuti nuovi, come il tuo sito, il tuo blog o un sito di notizie che segui. Le fonti si aggiungono dalla dashboard. Quante puoi aggiungerne dipende dal tuo piano."
          },
          {
            "id": "how-often",
            "q": "Con quale frequenza parte la mia newsletter?",
            "a": "Scegli la frequenza di pubblicazione quando configuri una fonte. Puoi cambiarla in seguito dalla dashboard."
          },
          {
            "id": "your-voice",
            "q": "Come fa AIBAN a scrivere con il mio stile?",
            "a": "Descrivi la personalità della tua newsletter, oppure lascia che AIBAN generi una descrizione per te. I numeri vengono scritti in base a quella descrizione. Puoi modificarla in qualsiasi momento dalla dashboard."
          }
        ]
      },
      {
        "id": "languages",
        "title": "Lingue",
        "items": [
          {
            "id": "subscriber-language",
            "q": "Come ricevono gli iscritti la newsletter nella loro lingua?",
            "a": "Ogni iscritto sceglie una lingua preferita al momento dell'iscrizione. AIBAN traduce ogni numero in quella lingua prima di inviarlo."
          },
          {
            "id": "site-language",
            "q": "Posso usare il sito nella mia lingua?",
            "a": "Sì. Usa il pulsante della lingua in basso a destra dello schermo per cambiare la lingua del sito e della dashboard."
          }
        ]
      },
      {
        "id": "sending",
        "title": "Invio a tuo nome",
        "items": [
          {
            "id": "own-address",
            "q": "I numeri possono partire dal mio indirizzo email?",
            "a": "I numeri partono dall'indirizzo di invio di AIBAN con il tuo nome del mittente e la tua firma email, e le risposte arrivano nella tua casella di posta. Non ti chiediamo la password della tua email, quindi non c'è nulla di tuo che possa trapelare."
          },
          {
            "id": "app-password",
            "q": "Devo dare ad AIBAN la password della mia email?",
            "a": "No. AIBAN non ti chiede mai la password della tua email né una password per app. I numeri partono dall'indirizzo di AIBAN a tuo nome, e le risposte arrivano a te."
          }
        ]
      },
      {
        "id": "subscribers",
        "title": "Iscritti e widget di iscrizione",
        "items": [
          {
            "id": "add-subscribers",
            "q": "Come aggiungo gli iscritti?",
            "a": "Puoi aggiungere le persone una per una dalla dashboard oppure caricare un file con il tuo elenco. Le persone possono anche iscriversi dalla tua pagina di iscrizione o dal widget di iscrizione."
          },
          {
            "id": "signup-widget",
            "q": "Che cos'è il widget di iscrizione?",
            "a": "Il widget è un modulo di iscrizione che puoi inserire nel tuo sito. I visitatori inseriscono il loro indirizzo email, scelgono la lingua ed entrano nella tua lista."
          },
          {
            "id": "subscriber-limit",
            "q": "C'è un limite di iscritti?",
            "a": "Ogni piano ha il suo limite di iscritti. Il piano gratuito include fino a 100 iscritti. Nella pagina dei prezzi trovi i limiti degli altri piani."
          }
        ]
      },
      {
        "id": "blog",
        "title": "Blog",
        "items": [
          {
            "id": "blog-pages",
            "q": "Gli articoli della mia newsletter vengono pubblicati sul web?",
            "a": "Sì. Gli articoli che AIBAN scrive per la tua newsletter vengono pubblicati anche come pagine web, così si possono leggere anche fuori dalla casella di posta."
          },
          {
            "id": "post-to-site",
            "q": "Posso pubblicare gli articoli sul mio sito?",
            "a": "Sì. Dalla dashboard puoi configurare un webhook che invia ogni articolo della newsletter al tuo sito come post. Funziona con WordPress e con qualsiasi piattaforma che accetti contenuti REST standard."
          }
        ]
      },
      {
        "id": "billing",
        "title": "Fatturazione",
        "items": [
          {
            "id": "free-plan",
            "q": "Esiste un piano gratuito?",
            "a": "Sì. Il piano gratuito include 1 fonte e fino a 100 iscritti. Puoi passare a un piano a pagamento quando ti serve di più."
          },
          {
            "id": "monthly-yearly",
            "q": "Posso pagare mensilmente o annualmente?",
            "a": "Sì. I piani a pagamento si fatturano mensilmente o annualmente. Il prezzo annuale è inferiore del 35% rispetto a 12 mesi pagati mese per mese. Scrivi a info@aiban.news per scegliere un piano."
          },
          {
            "id": "cancel",
            "q": "Posso disdire in qualsiasi momento?",
            "a": "Sì. Scrivi a info@aiban.news quando vuoi e annulleremo il tuo piano a pagamento o ti riporteremo al piano gratuito."
          },
          {
            "id": "higher-limits",
            "q": "E se mi serve più del piano più grande?",
            "a": "Usa il modulo di richiesta nella pagina di assistenza per indicarci i limiti che ti servono. Ti rispondiamo via email."
          }
        ]
      }
    ]
  },
  "mainPage": {
    "skipToMainContent": "Passa al contenuto principale",
    "dismissAnnouncement": "Chiudi annuncio",
    "problem": "Problema:",
    "outcome": "Risultato:",
    "disclaimer": "Il risparmio del 35% si applica solo alla fatturazione annuale."
  },
  "authForm": {
    "emailValidation": "Inserisci un indirizzo email come nome@esempio.com.",
    "failedToSendCode": "Non siamo riusciti a inviare il codice. Controlla l'indirizzo email e riprova tra un minuto.",
    "sending": "Invio in corso...",
    "codeSent": "Ti abbiamo inviato un codice via email.",
    "invalidCode": "Il codice non è corretto. Controlla l'ultima email che ti abbiamo inviato oppure fatti inviare di nuovo il codice.",
    "regenerateCode": "Invia nuovamente il codice",
    "back": "Indietro",
    "byProceeding": "Procedendo, accetti i",
    "termsOfService": "Termini di servizio",
    "and": "e la",
    "privacyPolicy": "Informativa sulla privacy",
    "appName": "AI Newsletter"
  },
  "welcome": {
    "title": "Generatore automatico di newsletter",
    "setItOnce": "Lo configuri una volta.",
    "useItForever": "Poi continua a funzionare."
  },
  "lead": {
    "title": "Trasforma gli iscritti in visitatori",
    "recommendation": "Aiuta la nostra AI a capire il tuo brand collegando il tuo sito web.",
    "question": "Hai un sito web? (facoltativo, puoi aggiungerlo più tardi)",
    "placeholder": "https://tuosito.com"
  },
  "newsSource": {
    "title": "Collega la tua fonte di contenuti",
    "subtitle": "Recupereremo il tuo feed così non dovrai iniziare da zero.",
    "placeholder": "Il tuo blog o link RSS"
  },
  "subscribe": {
    "welcome": {
      "title": "Benvenuto nella newsletter.",
      "invitedBy": "Sei stato invitato da {configuratorId}."
    }
  },
  "header": {
    "goToWorkspace": "Apri la dashboard",
    "inBilling": "Prezzi",
    "vip": "VIP",
    "plan": "Piano {planName}",
    "logIn": "Accedi",
    "getStarted": "Inizia gratis"
  },
  "fileInput": {
    "chooseFile": "Scegli file",
    "dropFile": "Trascina qui",
    "release": "Rilascia per caricare"
  },
  "billing": {
    "title": "Fatturazione e abbonamento",
    "currentPlanTitle": "Il tuo piano attuale",
    "upgradePlanTitle": "Cambia piano",
    "manageSubscription": "Gestisci abbonamento",
    "vipPlanName": "Partner VIP",
    "vipPlanDescription": "Accesso illimitato offerto da AIBAN.",
    "perMonth": "al mese",
    "perYear": "all'anno",
    "monthAbbreviation": "mese",
    "equivalentTo": "equivalente a",
    "mostPopular": "Il più scelto",
    "upgradeTo": "Passa a",
    "downgradeTo": "Passa a",
    "currentPlanButton": "Il tuo piano",
    "youSave": "Risparmi",
    "users": "utenti",
    "newsSources": "fonti di notizie",
    "monthly": "Mensile",
    "yearly": "Annuale",
    "loadingPlan": "Caricamento dati piano..."
  },
  "languages": [
    {
      "code": "ab",
      "name": "Abcaso"
    },
    {
      "code": "aa",
      "name": "Afar"
    },
    {
      "code": "af",
      "name": "Afrikaans"
    },
    {
      "code": "ak",
      "name": "Akan"
    },
    {
      "code": "sq",
      "name": "Albanese"
    },
    {
      "code": "am",
      "name": "Amarico"
    },
    {
      "code": "ar",
      "name": "Arabo"
    },
    {
      "code": "an",
      "name": "Aragonese"
    },
    {
      "code": "hy",
      "name": "Armeno"
    },
    {
      "code": "as",
      "name": "Assamese"
    },
    {
      "code": "av",
      "name": "Avaro"
    },
    {
      "code": "ae",
      "name": "Avestico"
    },
    {
      "code": "ay",
      "name": "Aymara"
    },
    {
      "code": "az",
      "name": "Azero"
    },
    {
      "code": "bm",
      "name": "Bambara"
    },
    {
      "code": "ba",
      "name": "Baschiro"
    },
    {
      "code": "eu",
      "name": "Basco"
    },
    {
      "code": "be",
      "name": "Bielorusso"
    },
    {
      "code": "bn",
      "name": "Bengalese"
    },
    {
      "code": "bi",
      "name": "Bislama"
    },
    {
      "code": "bs",
      "name": "Bosniaco"
    },
    {
      "code": "br",
      "name": "Bretone"
    },
    {
      "code": "bg",
      "name": "Bulgaro"
    },
    {
      "code": "my",
      "name": "Birmano"
    },
    {
      "code": "ca",
      "name": "Catalano"
    },
    {
      "code": "ch",
      "name": "Chamorro"
    },
    {
      "code": "ce",
      "name": "Ceceno"
    },
    {
      "code": "ny",
      "name": "Chichewa"
    },
    {
      "code": "zh",
      "name": "Cinese"
    },
    {
      "code": "cu",
      "name": "Slavo ecclesiastico"
    },
    {
      "code": "cv",
      "name": "Ciuvascio"
    },
    {
      "code": "kw",
      "name": "Cornico"
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
      "name": "Croato"
    },
    {
      "code": "cs",
      "name": "Ceco"
    },
    {
      "code": "da",
      "name": "Danese"
    },
    {
      "code": "dv",
      "name": "Divehi"
    },
    {
      "code": "nl",
      "name": "Olandese"
    },
    {
      "code": "dz",
      "name": "Dzongkha"
    },
    {
      "code": "en",
      "name": "Inglese"
    },
    {
      "code": "eo",
      "name": "Esperanto"
    },
    {
      "code": "et",
      "name": "Estone"
    },
    {
      "code": "ee",
      "name": "Ewe"
    },
    {
      "code": "fo",
      "name": "Faroese"
    },
    {
      "code": "fj",
      "name": "Figiano"
    },
    {
      "code": "fi",
      "name": "Finlandese"
    },
    {
      "code": "fr",
      "name": "Francese"
    },
    {
      "code": "fy",
      "name": "Frisone occidentale"
    },
    {
      "code": "ff",
      "name": "Fula"
    },
    {
      "code": "gd",
      "name": "Gaelico scozzese"
    },
    {
      "code": "gl",
      "name": "Galiziano"
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
      "name": "Tedesco"
    },
    {
      "code": "el",
      "name": "Greco"
    },
    {
      "code": "kl",
      "name": "Kalaallisut (Groenlandese)"
    },
    {
      "code": "gn",
      "name": "Guaraní"
    },
    {
      "code": "gu",
      "name": "Gujarati"
    },
    {
      "code": "ht",
      "name": "Creolo haitiano"
    },
    {
      "code": "ha",
      "name": "Hausa"
    },
    {
      "code": "he",
      "name": "Ebraico"
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
      "name": "Hiri Motu"
    },
    {
      "code": "hu",
      "name": "Ungherese"
    },
    {
      "code": "is",
      "name": "Islandese"
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
      "name": "Indonesiano"
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
      "name": "Irlandese"
    },
    {
      "code": "it",
      "name": "Italiano"
    },
    {
      "code": "ja",
      "name": "Giapponese"
    },
    {
      "code": "jv",
      "name": "Giavanese"
    },
    {
      "code": "kn",
      "name": "Kannada"
    },
    {
      "code": "kr",
      "name": "Kanuri"
    },
    {
      "code": "ks",
      "name": "Kashmiri"
    },
    {
      "code": "kk",
      "name": "Kazako"
    },
    {
      "code": "km",
      "name": "Khmer"
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
      "name": "Kirghiso"
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
      "name": "Curdo"
    },
    {
      "code": "lo",
      "name": "Lao"
    },
    {
      "code": "la",
      "name": "Latino"
    },
    {
      "code": "lv",
      "name": "Lettone"
    },
    {
      "code": "li",
      "name": "Limburghese"
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
      "name": "Lussemburghese"
    },
    {
      "code": "mk",
      "name": "Macedone"
    },
    {
      "code": "mg",
      "name": "Malgascio"
    },
    {
      "code": "ms",
      "name": "Malese"
    },
    {
      "code": "ml",
      "name": "Malayalam"
    },
    {
      "code": "mt",
      "name": "Maltese"
    },
    {
      "code": "gv",
      "name": "Mannese"
    },
    {
      "code": "mi",
      "name": "Maori"
    },
    {
      "code": "mr",
      "name": "Marathi"
    },
    {
      "code": "mh",
      "name": "Marshallese"
    },
    {
      "code": "mn",
      "name": "Mongolo"
    },
    {
      "code": "na",
      "name": "Nauru"
    },
    {
      "code": "nv",
      "name": "Navajo"
    },
    {
      "code": "nd",
      "name": "Ndebele del nord"
    },
    {
      "code": "nr",
      "name": "Ndebele del sud"
    },
    {
      "code": "ng",
      "name": "Ndonga"
    },
    {
      "code": "ne",
      "name": "Nepalese"
    },
    {
      "code": "no",
      "name": "Norvegese"
    },
    {
      "code": "nb",
      "name": "Norvegese bokmål"
    },
    {
      "code": "nn",
      "name": "Norvegese nynorsk"
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
      "name": "Osseto"
    },
    {
      "code": "pi",
      "name": "Pali"
    },
    {
      "code": "ps",
      "name": "Pashto"
    },
    {
      "code": "fa",
      "name": "Persiano (Farsi)"
    },
    {
      "code": "pl",
      "name": "Polacco"
    },
    {
      "code": "pt",
      "name": "Portoghese"
    },
    {
      "code": "pa",
      "name": "Punjabi"
    },
    {
      "code": "qu",
      "name": "Quechua"
    },
    {
      "code": "ro",
      "name": "Rumeno"
    },
    {
      "code": "rm",
      "name": "Romancio"
    },
    {
      "code": "rn",
      "name": "Rundi"
    },
    {
      "code": "ru",
      "name": "Russo"
    },
    {
      "code": "se",
      "name": "Sami del nord"
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
      "name": "Sanscrito"
    },
    {
      "code": "sc",
      "name": "Sardo"
    },
    {
      "code": "sr",
      "name": "Serbo"
    },
    {
      "code": "sn",
      "name": "Shona"
    },
    {
      "code": "ii",
      "name": "Sichuan Yi"
    },
    {
      "code": "sd",
      "name": "Sindhi"
    },
    {
      "code": "si",
      "name": "Singalese"
    },
    {
      "code": "sk",
      "name": "Slovacco"
    },
    {
      "code": "sl",
      "name": "Sloveno"
    },
    {
      "code": "so",
      "name": "Somalo"
    },
    {
      "code": "st",
      "name": "Sotho del sud"
    },
    {
      "code": "es",
      "name": "Spagnolo"
    },
    {
      "code": "su",
      "name": "Sundanese"
    },
    {
      "code": "sw",
      "name": "Swahili"
    },
    {
      "code": "ss",
      "name": "Swati"
    },
    {
      "code": "sv",
      "name": "Svedese"
    },
    {
      "code": "tl",
      "name": "Tagalog (Filippino)"
    },
    {
      "code": "ty",
      "name": "Taitiano"
    },
    {
      "code": "tg",
      "name": "Tagico"
    },
    {
      "code": "ta",
      "name": "Tamil"
    },
    {
      "code": "tt",
      "name": "Tataro"
    },
    {
      "code": "te",
      "name": "Telugu"
    },
    {
      "code": "th",
      "name": "Thailandese"
    },
    {
      "code": "bo",
      "name": "Tibetano"
    },
    {
      "code": "ti",
      "name": "Tigrino"
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
      "name": "Turkmeno"
    },
    {
      "code": "tw",
      "name": "Twi"
    },
    {
      "code": "ug",
      "name": "Uiguro"
    },
    {
      "code": "uk",
      "name": "Ucraino"
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
      "name": "Vallone"
    },
    {
      "code": "cy",
      "name": "Gallese"
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
      "name": "Yiddish"
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
      "name": "Zulu"
    }
  ],
  "countries": [
    {
      "code": "AF",
      "name": "Afghanistan"
    },
    {
      "code": "AL",
      "name": "Albania"
    },
    {
      "code": "DZ",
      "name": "Algeria"
    },
    {
      "code": "AS",
      "name": "Samoa Americane"
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
      "name": "Anguilla"
    },
    {
      "code": "AQ",
      "name": "Antartide"
    },
    {
      "code": "AG",
      "name": "Antigua e Barbuda"
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
      "name": "Azerbaigian"
    },
    {
      "code": "BS",
      "name": "Bahamas"
    },
    {
      "code": "BH",
      "name": "Bahrein"
    },
    {
      "code": "BD",
      "name": "Bangladesh"
    },
    {
      "code": "BB",
      "name": "Barbados"
    },
    {
      "code": "BY",
      "name": "Bielorussia"
    },
    {
      "code": "BE",
      "name": "Belgio"
    },
    {
      "code": "BZ",
      "name": "Belize"
    },
    {
      "code": "BJ",
      "name": "Benin"
    },
    {
      "code": "BM",
      "name": "Bermuda"
    },
    {
      "code": "BT",
      "name": "Bhutan"
    },
    {
      "code": "BO",
      "name": "Bolivia"
    },
    {
      "code": "BA",
      "name": "Bosnia ed Erzegovina"
    },
    {
      "code": "BW",
      "name": "Botswana"
    },
    {
      "code": "BR",
      "name": "Brasile"
    },
    {
      "code": "IO",
      "name": "Territorio Britannico dell'Oceano Indiano"
    },
    {
      "code": "VG",
      "name": "Isole Vergini Britanniche"
    },
    {
      "code": "BN",
      "name": "Brunei"
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
      "name": "Cambogia"
    },
    {
      "code": "CM",
      "name": "Camerun"
    },
    {
      "code": "CA",
      "name": "Canada"
    },
    {
      "code": "CV",
      "name": "Capo Verde"
    },
    {
      "code": "KY",
      "name": "Isole Cayman"
    },
    {
      "code": "CF",
      "name": "Repubblica Centrafricana"
    },
    {
      "code": "TD",
      "name": "Ciad"
    },
    {
      "code": "CL",
      "name": "Cile"
    },
    {
      "code": "CN",
      "name": "Cina"
    },
    {
      "code": "CX",
      "name": "Isola di Natale"
    },
    {
      "code": "CC",
      "name": "Isole Cocos (Keeling)"
    },
    {
      "code": "CO",
      "name": "Colombia"
    },
    {
      "code": "KM",
      "name": "Comore"
    },
    {
      "code": "CG",
      "name": "Congo-Brazzaville"
    },
    {
      "code": "CD",
      "name": "Congo-Kinshasa"
    },
    {
      "code": "CK",
      "name": "Isole Cook"
    },
    {
      "code": "CR",
      "name": "Costa Rica"
    },
    {
      "code": "CI",
      "name": "Costa d'Avorio"
    },
    {
      "code": "HR",
      "name": "Croazia"
    },
    {
      "code": "CU",
      "name": "Cuba"
    },
    {
      "code": "CY",
      "name": "Cipro"
    },
    {
      "code": "CZ",
      "name": "Cechia"
    },
    {
      "code": "DK",
      "name": "Danimarca"
    },
    {
      "code": "DJ",
      "name": "Gibuti"
    },
    {
      "code": "DM",
      "name": "Dominica"
    },
    {
      "code": "DO",
      "name": "Repubblica Dominicana"
    },
    {
      "code": "EC",
      "name": "Ecuador"
    },
    {
      "code": "EG",
      "name": "Egitto"
    },
    {
      "code": "SV",
      "name": "El Salvador"
    },
    {
      "code": "GQ",
      "name": "Guinea Equatoriale"
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
      "name": "Eswatini"
    },
    {
      "code": "ET",
      "name": "Etiopia"
    },
    {
      "code": "FJ",
      "name": "Figi"
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
      "name": "Gabon"
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
      "name": "Germania"
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
      "name": "Haiti"
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
      "name": "Ungheria"
    },
    {
      "code": "IS",
      "name": "Islanda"
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
      "name": "Iran"
    },
    {
      "code": "IQ",
      "name": "Iraq"
    },
    {
      "code": "IE",
      "name": "Irlanda"
    },
    {
      "code": "IL",
      "name": "Israele"
    },
    {
      "code": "IT",
      "name": "Italia"
    },
    {
      "code": "JM",
      "name": "Giamaica"
    },
    {
      "code": "JP",
      "name": "Giappone"
    },
    {
      "code": "JO",
      "name": "Giordania"
    },
    {
      "code": "KZ",
      "name": "Kazakistan"
    },
    {
      "code": "KE",
      "name": "Kenya"
    },
    {
      "code": "KR",
      "name": "Corea del Sud"
    },
    {
      "code": "KW",
      "name": "Kuwait"
    },
    {
      "code": "KG",
      "name": "Kirghizistan"
    },
    {
      "code": "LA",
      "name": "Laos"
    },
    {
      "code": "LV",
      "name": "Lettonia"
    },
    {
      "code": "LB",
      "name": "Libano"
    },
    {
      "code": "LS",
      "name": "Lesotho"
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
      "name": "Lussemburgo"
    },
    {
      "code": "MG",
      "name": "Madagascar"
    },
    {
      "code": "MW",
      "name": "Malawi"
    },
    {
      "code": "MY",
      "name": "Malesia"
    },
    {
      "code": "MV",
      "name": "Maldive"
    },
    {
      "code": "ML",
      "name": "Mali"
    },
    {
      "code": "MT",
      "name": "Malta"
    },
    {
      "code": "MX",
      "name": "Messico"
    },
    {
      "code": "MD",
      "name": "Moldavia"
    },
    {
      "code": "MC",
      "name": "Monaco"
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
      "name": "Marocco"
    },
    {
      "code": "MZ",
      "name": "Mozambico"
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
      "name": "Paesi Bassi"
    },
    {
      "code": "NZ",
      "name": "Nuova Zelanda"
    },
    {
      "code": "NI",
      "name": "Nicaragua"
    },
    {
      "code": "NE",
      "name": "Niger"
    },
    {
      "code": "NG",
      "name": "Nigeria"
    },
    {
      "code": "MK",
      "name": "Macedonia del Nord"
    },
    {
      "code": "NO",
      "name": "Norvegia"
    },
    {
      "code": "OM",
      "name": "Oman"
    },
    {
      "code": "PK",
      "name": "Pakistan"
    },
    {
      "code": "PA",
      "name": "Panama"
    },
    {
      "code": "PG",
      "name": "Papua Nuova Guinea"
    },
    {
      "code": "PY",
      "name": "Paraguay"
    },
    {
      "code": "PE",
      "name": "Perù"
    },
    {
      "code": "PH",
      "name": "Filippine"
    },
    {
      "code": "PL",
      "name": "Polonia"
    },
    {
      "code": "PT",
      "name": "Portogallo"
    },
    {
      "code": "QA",
      "name": "Qatar"
    },
    {
      "code": "RO",
      "name": "Romania"
    },
    {
      "code": "RU",
      "name": "Russia"
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
      "name": "Singapore"
    },
    {
      "code": "SK",
      "name": "Slovacchia"
    },
    {
      "code": "SI",
      "name": "Slovenia"
    },
    {
      "code": "ZA",
      "name": "Sudafrica"
    },
    {
      "code": "ES",
      "name": "Spagna"
    },
    {
      "code": "LK",
      "name": "Sri Lanka"
    },
    {
      "code": "SE",
      "name": "Svezia"
    },
    {
      "code": "CH",
      "name": "Svizzera"
    },
    {
      "code": "TW",
      "name": "Taiwan"
    },
    {
      "code": "TH",
      "name": "Thailandia"
    },
    {
      "code": "TR",
      "name": "Turchia"
    },
    {
      "code": "UG",
      "name": "Uganda"
    },
    {
      "code": "UA",
      "name": "Ucraina"
    },
    {
      "code": "AE",
      "name": "Emirati Arabi Uniti"
    },
    {
      "code": "GB",
      "name": "Regno Unito"
    },
    {
      "code": "US",
      "name": "Stati Uniti"
    },
    {
      "code": "UY",
      "name": "Uruguay"
    },
    {
      "code": "UZ",
      "name": "Uzbekistan"
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
      "name": "Zimbabwe"
    }
  ]
};
