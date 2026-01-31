export default {
  step01: {
    title: "Die menschlich klingende KI schreibt Newsletter für Ihre Abonnenten automatisch",
    subtitle: "Wie häufig, wählen Sie <u>jeden Monat</u> oder <u>jede Woche</u> oder <u>jeden Tag</u> oder <u>um wie viel Uhr</u>"
  },
  step02: {
    title: "Sprache des Newsletters",
    subtitle: "„Ihr Newsletter wird auch in der spezifischen Sprache jedes Benutzers gesendet, falls diese unterschiedlich ist“"
  },
  step03: {
    title: "Weiterleitung (Optional)",
    subtitle: "Möchten Sie den Benutzer auf Ihre Seite weiterleiten?",
    description: "Sie können hier einen Link zu Ihrer Seite einfügen, wir zählen, wie viele über die von der KI erstellten E-Mails eintreten",
    placeholder: "https://ihre-seite.de"
  },
  step04: {
    title: "Art der Nachrichten, die die KI auswählen soll",
    subtitle: "Welches Gesprächsthema oder Thema (abgeleitet vom Weiterleitungslink, falls gesetzt, sonst leer)",
    placeholder: "z.B. Künstliche Intelligenz, Marketing, Gesundheit..."
  },
  step05: {
    title: "Personalisieren Sie Ihre Signatur",
    subtitle: "Entwerfen Sie visuell oder bearbeiten Sie den Code direkt",
    visualEditor: "Visueller Editor",
    htmlSource: "HTML-Quelle",
    livePreview: "Live-Vorschau",
    yourName: "Ihr Name",
    yourTitle: "Ihr Titel",
    facebookProfile: "Facebook-Profil",
    instagramProfile: "Instagram-Profil",
    editHtml: "HTML direkt bearbeiten...",
    warning: "⚠️ Hier vorgenommene Änderungen werden überschrieben, wenn Sie zum visuellen Editor zurückwechseln und Änderungen vornehmen."
  },
  step06: {
    title: "Nachrichtenquelle",
    subtitle: "Welche Nachrichten-Website möchten Sie verwenden?",
    description: "Geben Sie eine URL ein oder lassen Sie uns eine basierend auf Ihrem Thema für Sie auswählen.",
    descriptionSmall: "Wir analysieren die Website, um den besten Inhalt zu finden. Dies kann einige Sekunden dauern.",
    placeholder: "https://beispiel.de",
    analyzing: "Analysiere...",
    next: "Weiter",
    errors: {
      failedToGenerate: "Selektor konnte nicht generiert werden. Bitte versuchen Sie es erneut oder überprüfen Sie die URL.",
      errorGenerating: "Ein Fehler ist beim Generieren des Selektors aufgetreten.",
      invalidUrl: "Bitte geben Sie eine gültige URL ein oder wählen Sie eine Quelle."
    }
  },
  step07: {
    title: "Inhaltsselektor",
    subtitle: "Stellen Sie sich jede Website als eine <strong>Bibliothek mit einem einzigartigen Layout</strong> vor.",
    explanation1: "Dieser <strong>'Selektor'</strong> ist die spezifische Karte, die wir für diese Website erstellt haben. Er sagt unserem System genau, wo es suchen muss, um die gewünschten Artikel aufzunehmen, während Menüschaltflächen und Werbung ignoriert werden.",
    explanation2: "<strong>Wir haben diese Karte automatisch für Sie ausgefüllt.</strong>",
    placeholder: "Selektor-String...",
    regenerate: "Selektor regenerieren",
    regenerating: "Regeneriere...",
    errors: {
      noUrl: "Keine Nachrichtenquellen-URL gefunden.",
      failedRegenerate: "Selektor konnte nicht regeneriert werden.",
      errorRegenerate: "Ein Fehler ist beim Regenerieren des Selektors aufgetreten."
    }
  },
  step08: {
    title: "Vorschau",
    placeholder: "Bereit, Ihren ersten Newsletter zu generieren?",
    generateBtn: "Newsletter-E-Mail generieren",
    sentBtn: "Gesendet! Überprüfen Sie Ihre E-Mail",
    sendTestBtn: "Test-E-Mail senden",
    regenerateBtn: "Regenerieren",
    loading: {
      initializing: "Initialisiere...",
      starting: "Starte Generierung...",
      scraping: "Extrahiere Inhalt...",
      translating: "Übersetze Artikel...",
      formatting: "Formatiere E-Mail...",
      sending: "Verbinde mit E-Mail-Anbieter...",
      authenticating: "Authentifiziere...",
      sendingArticle: "Sende Artikel...",
      creating: "Erstelle Nachrichtenquelle...",
      saving: "Speichere Konfiguration...",
      finalizing: "Schließe Einrichtung ab..."
    },
    errors: {
      generationFailed: "Generierung fehlgeschlagen: ",
      createFailed: "Nachrichtenquelle konnte nicht erstellt werden. Bitte versuchen Sie es erneut.",
      errorCreating: "Fehler beim Erstellen der Nachrichtenquelle: ",
      sendFailed: "Senden der E-Mail fehlgeschlagen: "
    },
    defaultSubject: "Vorschau Ihres generierten Newsletters"
  },
  step09: {
    title: "Um den Artikel von Ihrer E-Mail zu senden",
    subtitle: "App-Passwort (Optional)",
    description: "(Wenn Sie Gmail-Dienste haben, geben Sie hier Ihr App-Passwort ein)",
    label: "App-Passwort",
    placeholder: "Ihr App-Passwort"
  },
  step10: {
    title: "Gmail-Adresse (Optional)",
    subtitle: "Gmail-E-Mail-Adresse",
    description: "Wenn Sie von einer bestimmten Gmail-Adresse senden möchten",
    placeholder: "ihre-email@gmail.com"
  },
  step11: {
    title: "Test-E-Mail senden",
    subtitle: "Senden Sie sich selbst eine Test-E-Mail, um die Konfiguration zu überprüfen.",
    sendNow: "Jetzt senden",
    sent: "Gesendet! Überprüfen Sie Ihre E-Mail",
    loading: {
      connecting: "Verbinde mit E-Mail-Anbieter...",
      authenticating: "Authentifiziere...",
      sending: "Sende Artikel..."
    }
  },
  step12: {
    title: "Teilen Sie diesen Newsletter mit Ihren Followern",
    subtitle: "Link zum Abonnententrichter (bevor sie E-Mails erhalten, müssen sie Ihre Einladung annehmen)",
    copy: "Kopieren",
    copied: "Link kopiert!"
  },
  step13: {
    title: "Plan & Limits",
    currentPlan: "Aktueller Plan:",
    limits: "Limits:",
    unknown: "Unbekannt",
    changePlan: "Plan ändern",
    advancedFeatures: "Benötigen Sie fortgeschrittenere Funktionen?",
    developerText: "Besuchen Sie unseren Entwicklerbereich, um diesen Newsletter-Abonnententrichter auf Ihrem Server zu integrieren, einen Blog aller generierten Artikel und das Abonnieren von Benutzern aus Ihrer Codebasis mit unserem API-Schlüssel.",
    dashboardBtn: "Zum Dashboard",
    usage: "Nutzung:",
    limitDetails: {
      free: "Limit von 100 Benutzern",
      starter: "5 Quellen, 100k Benutzer",
      growth: "17 Quellen, 250k Benutzer",
      pro: "25 Quellen, 500k Benutzer",
      master: "50 Quellen, unbegrenzte Benutzer",
      vipfree: "VIP Kostenlos"
    }
  }
};
