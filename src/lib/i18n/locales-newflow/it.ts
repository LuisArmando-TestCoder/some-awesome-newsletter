export default {
  step01: {
    title: "L'IA dal suono umano scrive newsletter per i tuoi abbonati in automatico",
    subtitle: "Quanto frequente, seleziona <u>ogni mese</u> o <u>ogni settimana</u> o <u>ogni giorno</u> o <u>a che ora</u>"
  },
  step02: {
    title: "Lingua della newsletter",
    subtitle: "“la tua newsletter verrà inviata anche nella lingua specifica di ogni utente se sono diverse”"
  },
  step03: {
    title: "Reindirizzamento (Opzionale)",
    subtitle: "Vuoi reindirizzare l'utente alla tua pagina?",
    description: "Puoi incollare qui un link alla tua pagina, conteremo quanti entrano dalle email create dall'IA",
    placeholder: "https://tua-pagina.com"
  },
  step04: {
    title: "Tipo di notizie che vuoi che l'IA scelga",
    subtitle: "Quale tema di conversazione o argomento (dedotto dal link di reindirizzamento se impostato, altrimenti vuoto)",
    placeholder: "es. Intelligenza Artificiale, Marketing, Salute..."
  },
  step05: {
    title: "Personalizza la tua Firma",
    subtitle: "Progetta visivamente o modifica il codice direttamente",
    visualEditor: "Editor Visuale",
    htmlSource: "Sorgente HTML",
    livePreview: "Anteprima dal Vivo",
    yourName: "Tuo Nome",
    yourTitle: "Tuo Titolo",
    facebookProfile: "Profilo Facebook",
    instagramProfile: "Profilo Instagram",
    editHtml: "Modifica HTML direttamente...",
    warning: "⚠️ Le modifiche apportate qui verranno sovrascritte se torni all'Editor Visuale e apporti modifiche."
  },
  step06: {
    title: "Fonte di Notizie",
    subtitle: "Quale sito di notizie vuoi usare?",
    description: "Inserisci un URL o lasciaci sceglierne uno per te basato sul tuo argomento.",
    descriptionSmall: "Analizzeremo il sito web per trovare il miglior contenuto. Questo potrebbe richiedere alcuni secondi.",
    placeholder: "https://esempio.com",
    analyzing: "Analizzando...",
    next: "Avanti",
    errors: {
      failedToGenerate: "Impossibile generare il selettore. Riprova o controlla l'URL.",
      errorGenerating: "Si è verificato un errore durante la generazione del selettore.",
      invalidUrl: "Inserisci un URL valido o scegli una fonte."
    }
  },
  step07: {
    title: "Selettore di Contenuto",
    subtitle: "Pensa a ogni sito web come a una <strong>biblioteca con un layout unico</strong>.",
    explanation1: "Questo <strong>'Selettore'</strong> è la mappa specifica che abbiamo creato per questo sito web. Dice al nostro sistema esattamente dove cercare per raccogliere gli articoli che vuoi, ignorando pulsanti di menu e pubblicità.",
    explanation2: "<strong>Abbiamo popolato questa mappa per te automaticamente.</strong>",
    placeholder: "Stringa del selettore...",
    regenerate: "Rigenera Selettore",
    regenerating: "Rigenerazione...",
    errors: {
      noUrl: "Nessun URL di fonte di notizie trovato.",
      failedRegenerate: "Impossibile rigenerare il selettore.",
      errorRegenerate: "Si è verificato un errore durante la rigenerazione del selettore."
    }
  },
  step08: {
    title: "Anteprima",
    placeholder: "Pronto a generare la tua prima newsletter?",
    generateBtn: "Genera Email Newsletter",
    sentBtn: "Inviato! Controlla la tua email",
    sendTestBtn: "Invia Email di Test",
    regenerateBtn: "Rigenera",
    loading: {
      initializing: "Inizializzazione...",
      starting: "Avvio generazione...",
      scraping: "Estrazione contenuto...",
      translating: "Traduzione articolo...",
      formatting: "Formattazione email...",
      sending: "Connessione al provider email...",
      authenticating: "Autenticazione...",
      sendingArticle: "Invio articolo...",
      creating: "Creazione fonte di notizie...",
      saving: "Salvataggio configurazione...",
      finalizing: "Finalizzazione configurazione..."
    },
    errors: {
      generationFailed: "Generazione fallita: ",
      createFailed: "Impossibile creare la fonte di notizie. Riprova.",
      errorCreating: "Errore durante la creazione della fonte di notizie: ",
      sendFailed: "Impossibile inviare email: "
    },
    defaultSubject: "Anteprima della tua Newsletter Generata"
  },
  step09: {
    title: "Per inviare l'articolo dalla tua email",
    subtitle: "Password App (Opzionale)",
    description: "(Se hai servizi gmail, metti la tua password app qui)",
    label: "Password App",
    placeholder: "La tua Password App"
  },
  step10: {
    title: "Indirizzo Gmail (Opzionale)",
    subtitle: "Indirizzo Email Gmail",
    description: "Se vuoi inviare da un indirizzo Gmail specifico",
    placeholder: "tua-email@gmail.com"
  },
  step11: {
    title: "Invia Email di Test",
    subtitle: "Inviati un'email di test per verificare la configurazione.",
    sendNow: "Invia Ora",
    sent: "Inviato! Controlla la tua email",
    loading: {
      connecting: "Connessione al provider email...",
      authenticating: "Autenticazione...",
      sending: "Invio articolo..."
    }
  },
  step12: {
    title: "Condividi questa newsletter con i tuoi follower",
    subtitle: "Link al funnel di iscrizione (prima di iniziare a ricevere email, dovranno accettare il tuo invito)",
    copy: "Copia",
    copied: "Link copiato!"
  },
  step13: {
    title: "Piano e Limiti",
    currentPlan: "Piano Attuale:",
    limits: "Limiti:",
    unknown: "Sconosciuto",
    changePlan: "Cambia Piano",
    advancedFeatures: "Hai bisogno di funzionalità più avanzate?",
    developerText: "Dai un'occhiata alla nostra sezione sviluppatori per integrare questo funnel di iscrizione alla newsletter sul tuo server, un blog di tutti i tuoi articoli generati, e iscrivere utenti dalla tua codebase con la nostra chiave API.",
    dashboardBtn: "Vai alla Dashboard",
    usage: "Utilizzo:",
    limitDetails: {
      free: "Limite di 100 utenti",
      starter: "5 fonti, 100k utenti",
      growth: "17 fonti, 250k utenti",
      pro: "25 fonti, 500k utenti",
      master: "50 fonti, utenti illimitati",
      vipfree: "VIP Gratuito"
    }
  }
};
