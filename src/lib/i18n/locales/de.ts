// de strings for locales. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale de
export default {
  "auth": {
    "logo": "/icons/logo.png",
    "login": {
      "pageTitle": "Anmelden",
      "title": "Bei AIBAN anmelden",
      "subtitle": "Verbinden Sie sich, um dort fortzufahren, wo Sie aufgehört haben.",
      "google": "Mit Google fortfahren",
      "or": "oder",
      "emailPlaceholder": "name@beispiel.de",
      "continueWithEmail": "Mit E-Mail fortfahren",
      "switchText": "Noch kein Konto?",
      "switchLink": "Registrieren",
      "switchHref": "/signup"
    },
    "signup": {
      "pageTitle": "Registrieren",
      "title": "Konto erstellen",
      "subtitle": "Sie brauchen keine Kreditkarte.",
      "google": "Mit Google fortfahren",
      "or": "oder",
      "emailPlaceholder": "name@beispiel.de",
      "continueWithEmail": "Mit E-Mail fortfahren",
      "switchText": "Bereits ein Konto?",
      "switchLink": "Anmelden",
      "switchHref": "/login"
    }
  },
  "landing": {
    "seo": {
      "title": "AIBAN | Ihre Website als Newsletter in der Sprache jedes Lesers",
      "description": "AIBAN liest, was Sie bereits veröffentlichen, schreibt eine Newsletter-Ausgabe in Ihrem Ton und versendet sie unter Ihrem Namen. Jeder Abonnent erhält sie in seiner eigenen Sprache.",
      "ogImageAlt": "AIBAN-Logo"
    },
    "skipLink": "Zum Hauptinhalt springen",
    "hero": {
      "eyebrow": "Newsletter für Dienstleistungsunternehmen",
      "title": "Aus Ihrer Website wird ein wöchentlicher Newsletter, in der Sprache jedes Lesers",
      "lead": "AIBAN liest die Inhalte, die Sie bereits veröffentlichen, schreibt eine Ausgabe in Ihrem Ton und versendet sie unter Ihrem Namen. Jeder Abonnent erhält sie in der Sprache, die er liest. Sie richten es einmal ein, danach läuft es weiter.",
      "formLabel": "Ihre Website",
      "formPlaceholder": "ihrefirma.de",
      "formHint": "Wir erstellen eine Beispielausgabe aus der Adresse, die Sie eingeben. Der Einstieg ist kostenlos und Sie brauchen keine Karte.",
      "formSubmit": "Vorschau meines Newsletters",
      "formError": "Geben Sie eine Webadresse ein, zum Beispiel ihrefirma.de.",
      "secondaryCta": "So funktioniert es"
    },
    "preview": {
      "badge": "Beispielvorschau",
      "note": "Dies ist ein Beispiellayout mit Platzhaltertext. Wenn Sie starten, schreibt AIBAN die echte Ausgabe aus Ihrem neuesten Artikel.",
      "fromLabel": "Von",
      "toLabel": "An",
      "subjectLabel": "Betreff",
      "languageLabel": "Sprache des Lesers",
      "readOnBlog": "Im Blog lesen",
      "startCta": "Kostenlos mit {site} starten",
      "startCtaGeneric": "Kostenlos starten",
      "liveRegion": "Beispielvorschau für {site} aktualisiert."
    },
    "chain": {
      "eyebrow": "So funktioniert es",
      "title": "Einmal einrichten, danach läuft es von selbst",
      "lead": "Sie nennen AIBAN einmal Ihre Website. Danach läuft jeder der folgenden Schritte von selbst, in dem Rhythmus, den Sie wählen.",
      "triggerLabel": "Wenn",
      "actionLabel": "Dann",
      "trigger": {
        "title": "Es ist Montag, 9:00 Uhr",
        "body": "Oder ein anderer Rhythmus Ihrer Wahl: täglich, wöchentlich oder monatlich."
      },
      "steps": [
        {
          "title": "AIBAN findet Ihren neuesten Artikel",
          "body": "Es prüft Ihre Website und wählt den Beitrag, der Ihren idealen Leser am meisten interessiert."
        },
        {
          "title": "Es schreibt die Ausgabe in Ihrem Stil",
          "body": "Der Text wird so umgeschrieben, dass er nach Ihnen klingt, auf Grundlage der Texte auf Ihrer Website."
        },
        {
          "title": "Es übersetzt die Ausgabe für jeden Leser",
          "body": "Jeder Abonnent erhält die Sprache, die er bei der Anmeldung gewählt hat."
        },
        {
          "title": "Versand unter Ihrem Namen",
          "body": "Die Leser sehen Ihren Namen und ihre Antworten landen in Ihrem Posteingang."
        },
        {
          "title": "Es veröffentlicht die Ausgabe in Ihrem Blog",
          "body": "Jede Ausgabe erhält außerdem eine öffentliche Artikelseite mit eigenem Link."
        },
        {
          "title": "Es zeigt Ihnen, was passiert ist",
          "body": "Ihr Dashboard zeigt, wer sich angemeldet hat und welche Links die Leser angeklickt haben."
        }
      ],
      "alsoTitle": "Es startet auch, wenn",
      "also": [
        {
          "title": "sich jemand auf Ihrer Website anmeldet",
          "body": "Die Person bestätigt per E-Mail und erhält ab dann Ihre Ausgaben."
        },
        {
          "title": "Sie einen Link oder Text einfügen",
          "body": "AIBAN schreibt dazu eine Ausgabe und versendet sie über dieselben Schritte."
        },
        {
          "title": "Sie eine Kontaktliste hochladen",
          "body": "AIBAN bereinigt die Liste, entfernt Duplikate und schätzt die Sprache jedes Kontakts."
        }
      ]
    },
    "languages": {
      "eyebrow": "Jede Sprache",
      "title": "Jeder Leser erhält die Ausgabe in seiner eigenen Sprache",
      "body": "Sie schreiben keine getrennten Versionen. AIBAN übersetzt jede Ausgabe in alle Sprachen Ihrer Abonnenten und behält dabei Ihren Ton bei. Die Liste umfasst Spanisch, Portugiesisch, Französisch, Deutsch, Hindi, Arabisch, Japanisch und viele weitere.",
      "sampleNote": "Dieselbe Beispielausgabe, so wie drei Leser sie erhalten würden."
    },
    "sender": {
      "eyebrow": "Ihre Adresse",
      "title": "Unter Ihrem Namen versendet",
      "body": "Ausgaben kommen mit Ihrem Namen und Ihrer E-Mail-Signatur an. AIBAN versendet sie von einer eigenen, verifizierten Adresse, Sie geben uns also nie ein E-Mail-Passwort. Wenn ein Leser antwortet, landet die Antwort in Ihrem Posteingang.",
      "inboxLabel": "So sieht es im Posteingang eines Lesers aus",
      "inboxFrom": "Sie",
      "inboxSubject": "Diese Woche von {site}",
      "inboxSnippet": "Eine kurze Zusammenfassung Ihres neuesten Artikels, in Ihrem Stil geschrieben.",
      "inboxTime": "9:00"
    },
    "grow": {
      "eyebrow": "Mehr Abonnenten gewinnen",
      "title": "Ein Anmeldeformular für Ihre Website und ein Blog, der sich von selbst füllt",
      "items": [
        {
          "title": "Anmeldeformular",
          "body": "Fügen Sie das AIBAN-Formular in Ihre Website ein. Neue Leser wählen ihre Sprache und bestätigen per E-Mail."
        },
        {
          "title": "Automatischer Blog",
          "body": "Jede Ausgabe wird zu einer öffentlichen Artikelseite, die man über Suchmaschinen findet und per Link teilen kann."
        },
        {
          "title": "Kontaktimport",
          "body": "Übernehmen Sie Ihre bestehenden Kunden aus einer CSV- oder Excel-Datei oder fügen Sie eine Liste ein."
        }
      ]
    },
    "useCases": {
      "eyebrow": "Für wen es gedacht ist",
      "title": "Für Unternehmen, die über Beziehungen wachsen",
      "lead": "Wenn Ihre Kunden über Empfehlungen und Vertrauen kommen, sorgt eine regelmäßige Nachricht von Ihnen dafür, dass man an Sie denkt. AIBAN schreibt diese Nachricht für Sie.",
      "items": [
        {
          "title": "Agenturen und Webdesigner",
          "body": "Schicken Sie Kunden und Interessenten jede Woche Ihre neuesten Arbeiten und Artikel und nutzen Sie dieselbe Einrichtung für Kundenwebsites."
        },
        {
          "title": "IT- und Softwareunternehmen",
          "body": "Machen Sie aus Release Notes und Blogbeiträgen ein kurzes Update, das jeder Kunde in seiner Sprache liest."
        },
        {
          "title": "Immobilien",
          "body": "Teilen Sie neue Objekte und Marktberichte mit Käufern und Verkäufern, die verschiedene Sprachen sprechen."
        },
        {
          "title": "Anwälte und Steuerberater",
          "body": "Informieren Sie Ihre Mandanten über die Themen, über die Sie ohnehin schreiben, in einem ruhigen und einheitlichen Format."
        },
        {
          "title": "Coaches und Trainer",
          "body": "Senden Sie Ihre neueste Lektion oder Ihren neuesten Artikel an einem festen Tag an Ihre Community, ohne ihn neu zu schreiben."
        }
      ]
    },
    "pricingIntro": {
      "eyebrow": "Preise",
      "title": "Kostenlos starten, upgraden, wenn Ihre Liste wächst",
      "lead": "Der kostenlose Tarif umfasst 1 Quelle und bis zu 100 Abonnenten. Kostenpflichtige Tarife bieten mehr Quellen und mehr Abonnenten."
    },
    "faqTitle": "Häufige Fragen vor dem Start",
    "faq": [
      {
        "id": "what-do-i-need",
        "q": "Was brauche ich für den Start?",
        "a": "Die Adresse Ihrer Website und eine E-Mail-Adresse. AIBAN liest Ihre Website, um Ihre Themen und Ihren Schreibstil kennenzulernen."
      },
      {
        "id": "do-i-write",
        "q": "Muss ich selbst etwas schreiben?",
        "a": "Nein, das müssen Sie nicht. AIBAN schreibt jede Ausgabe aus Ihren Inhalten. Wenn Sie eine Ausgabe zu einem bestimmten Thema möchten, können Sie einen Link oder Text einfügen."
      },
      {
        "id": "languages",
        "q": "In welchen Sprachen können meine Leser den Newsletter erhalten?",
        "a": "AIBAN übersetzt jede Ausgabe in die Sprache, die der jeweilige Abonnent liest. Die vollständige Liste der Sprachen sehen Sie, wenn Sie Ihren Newsletter einrichten."
      },
      {
        "id": "sender",
        "q": "Von wem kommen die E-Mails?",
        "a": "Von der Versandadresse von AIBAN, mit Ihrem Namen als Absender. Antworten gehen direkt in Ihren Posteingang. Sie geben uns nie ein E-Mail-Passwort."
      },
      {
        "id": "contacts",
        "q": "Kann ich meine bestehenden Kontakte mitbringen?",
        "a": "Ja. Laden Sie eine CSV- oder Excel-Datei hoch oder fügen Sie eine Liste ein. AIBAN bereinigt sie, entfernt Duplikate und schätzt die Sprache jedes Kontakts."
      },
      {
        "id": "schedule",
        "q": "Wie oft werden Ausgaben versendet?",
        "a": "Sie wählen den Rhythmus bei der Einrichtung und können ihn jederzeit in Ihrem Dashboard ändern."
      },
      {
        "id": "free-plan",
        "q": "Gibt es einen kostenlosen Tarif?",
        "a": "Ja. Der kostenlose Tarif umfasst 1 Quelle und bis zu 100 Abonnenten. Kostenpflichtige Tarife bieten mehr Quellen und Abonnenten."
      },
      {
        "id": "cancel",
        "q": "Kann ich kündigen?",
        "a": "Ja. Schreiben Sie jederzeit an info@aiban.news, dann kündigen wir Ihren kostenpflichtigen Tarif oder stellen Sie wieder auf den kostenlosen Tarif um."
      }
    ],
    "finalCta": {
      "title": "Starten Sie mit Ihrer Website",
      "body": "Nennen Sie AIBAN Ihre Website, prüfen Sie Ihre erste Ausgabe und schalten Sie den Versand ein, wenn Sie bereit sind.",
      "cta": "Kostenlos starten",
      "secondary": "Zum Hilfecenter"
    },
    "footer": {
      "tagline": "Newsletter, geschrieben aus Ihren eigenen Inhalten und versendet in der Sprache jedes Lesers.",
      "product": "Produkt",
      "company": "Unternehmen",
      "legal": "Rechtliches",
      "links": {
        "howItWorks": "So funktioniert es",
        "pricing": "Preise",
        "demo": "Demo",
        "help": "Hilfecenter",
        "about": "Über uns",
        "careers": "Karriere",
        "privacy": "Datenschutzerklärung",
        "terms": "Nutzungsbedingungen",
        "cookies": "Cookie-Richtlinie"
      },
      "contactLabel": "Kontakt",
      "rights": "Alle Rechte vorbehalten."
    }
  },
  "help": {
    "title": "Höhere Limits anfordern",
    "subtitle": "Nennen Sie uns die Limits, die Sie brauchen, und wir antworten per E-Mail.",
    "contact": {
      "cta": "Anfrage senden",
      "successTitle": "Anfrage bereit zum Senden",
      "successBody": "Ihre E-Mail-App wurde mit Ihrer Anfrage geöffnet. Senden Sie sie von dort, und wir antworten per E-Mail.",
      "learnMore": "/plans"
    },
    "questions": {
      "desiredLimitsHelp": "Nennen Sie uns die Limits, die Sie brauchen, zum Beispiel wie viele Abonnenten und Quellen.",
      "useCaseHelp": "Beschreiben Sie, was Sie versenden, an wen und wie oft.",
      "expectedSpendHelp": "Eine grobe Schätzung hilft uns, einen Tarif vorzuschlagen. Sie können es auch auf unbekannt lassen."
    },
    "form": {
      "nameLabel": "Name",
      "emailLabel": "E-Mail",
      "companyLabel": "Unternehmen",
      "optional": "(optional)",
      "limitsLabel": "Benötigte Limits",
      "useCaseLabel": "Wie Sie AIBAN nutzen",
      "spendLabel": "Erwartete monatliche Ausgaben",
      "spend": {
        "lt500": "Weniger als 500 $",
        "500_2k": "500 $ bis 2.000 $",
        "2k_10k": "2.000 $ bis 10.000 $",
        "gt10k": "Mehr als 10.000 $",
        "unknown": "Weiß ich noch nicht"
      },
      "urgencyLabel": "Dringlichkeit",
      "urgency": {
        "low": "Niedrig",
        "normal": "Normal",
        "high": "Hoch"
      },
      "replyLabel": "Wie sollen wir antworten?",
      "reply": {
        "email": "Per E-Mail",
        "call": "Per Telefon"
      },
      "payAsYouGo": "Ich interessiere mich für nutzungsbasierte Bezahlung",
      "sending": "Wird gesendet...",
      "sentTitle": "Anfrage gesendet",
      "sentBody": "Wir haben Ihre Anfrage erhalten und antworten an die angegebene E-Mail-Adresse.",
      "retryBefore": "Wenn sich Ihr E-Mail-Programm nicht geöffnet hat,",
      "retryLink": "öffnen Sie die Anfrage erneut",
      "retryAfter": "oder schreiben Sie an",
      "errors": {
        "name": "Geben Sie Ihren Namen ein (mindestens 2 Zeichen).",
        "email": "Geben Sie eine E-Mail-Adresse ein, an die wir antworten können, zum Beispiel name@beispiel.de.",
        "company": "Geben Sie mindestens 2 Zeichen ein oder lassen Sie das Feld leer.",
        "desiredLimits": "Beschreiben Sie die benötigten Limits in mindestens 10 Zeichen.",
        "useCase": "Beschreiben Sie Ihre Nutzung in mindestens 20 Zeichen."
      }
    },
    "faqs": [
      {
        "id": "limits-how",
        "q": "Wie funktionieren höhere Limits?",
        "a": "Senden Sie eine Anfrage mit den Limits, die Sie brauchen. Wir antworten per E-Mail mit den Optionen für Ihr Konto."
      }
    ],
    "links": {
      "docs": "/plans",
      "community": "/help"
    }
  },
  "faq": [
    {
      "q": "Was macht AIBAN?",
      "a": "AIBAN liest Inhalte, die Sie bereits veröffentlichen, etwa Ihre Website, Ihren Blog oder Nachrichtenseiten Ihrer Wahl. Es schreibt neue Ausgaben in Ihrem Ton und versendet sie als Newsletter. Jeder Abonnent erhält ihn in der Sprache, die er gewählt hat, mit Ihrem Namen als Absender."
    },
    {
      "q": "Gibt es einen kostenlosen Tarif?",
      "a": "Ja. Der kostenlose Tarif umfasst 1 Quelle und bis zu 100 Abonnenten. Wenn Sie mehr brauchen, schreiben Sie uns, und wir ändern Ihren Tarif."
    },
    {
      "q": "Wie erhalten Abonnenten den Newsletter in ihrer Sprache?",
      "a": "Jeder Abonnent wählt bei der Anmeldung eine bevorzugte Sprache. AIBAN übersetzt jede Ausgabe vor dem Versand in diese Sprache."
    },
    {
      "q": "Können Ausgaben von meiner eigenen E-Mail-Adresse kommen?",
      "a": "Ausgaben gehen von der Versandadresse von AIBAN mit Ihrem Namen und Ihrer E-Mail-Signatur hinaus, und Antworten landen in Ihrem Posteingang. Wir fragen nicht nach Ihrem E-Mail-Passwort, es gibt also nichts von Ihnen, das nach außen gelangen könnte."
    },
    {
      "q": "Wie melden sich Leute an?",
      "a": "Sie erhalten eine Anmeldeseite und ein Anmelde-Widget, das Sie auf Ihrer Website einbinden können. Sie können Personen auch selbst hinzufügen oder eine Liste hochladen."
    },
    {
      "q": "Kann ich jederzeit kündigen?",
      "a": "Ja. Schreiben Sie jederzeit an info@aiban.news, dann kündigen wir Ihren kostenpflichtigen Tarif oder stellen Sie wieder auf den kostenlosen Tarif um."
    }
  ],
  "plans": {
    "currency": "USD",
    "billingIntervals": [
      "monatlich",
      "jährlich"
    ],
    "currentPlan": "free",
    "plans": [
      {
        "id": "free",
        "name": "Gratis",
        "monthly": 0,
        "yearly": 0,
        "tagline": "AIBAN mit einer Quelle ausprobieren",
        "featuresBase": [
          "1 Quelle",
          "Bis zu 100 Abonnenten"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": 1,
          "users": 100
        },
        "ctaLabel": "Aktueller Tarif",
        "tier": 0
      },
      {
        "id": "starter",
        "name": "Starter",
        "monthly": 17,
        "yearly": 132,
        "tagline": "Für wachsende Newsletter",
        "featuresBase": [
          "5 Quellen",
          "Bis zu 100.000 Abonnenten"
        ],
        "featuresDelta": [
          "E-Mail-Support",
          "Basis-Übersetzung"
        ],
        "limits": {
          "newsSources": 5,
          "users": 100000
        },
        "ctaLabel": "Starter wählen",
        "productId": "prod_starter_id",
        "tier": 1
      },
      {
        "id": "growth",
        "name": "Growth",
        "monthly": 35,
        "yearly": 273,
        "tagline": "Für etablierte Newsletter",
        "featuresBase": [
          "17 Quellen",
          "Bis zu 250.000 Abonnenten"
        ],
        "featuresDelta": [
          "Eigenes Branding",
          "Erweiterte Analysen"
        ],
        "limits": {
          "newsSources": 17,
          "users": 250000
        },
        "ctaLabel": "Growth wählen",
        "productId": "prod_growth_id",
        "tier": 2
      },
      {
        "id": "pro",
        "name": "Pro",
        "monthly": 80,
        "yearly": 624,
        "tagline": "Für Marketing-Profis",
        "featuresBase": [
          "25 Quellen",
          "Bis zu 500.000 Abonnenten"
        ],
        "featuresDelta": [
          "API-Zugang",
          "Priorisierte Verarbeitung"
        ],
        "limits": {
          "newsSources": 25,
          "users": 500000
        },
        "ctaLabel": "Pro wählen",
        "productId": "prod_pro_id",
        "tier": 3
      },
      {
        "id": "master",
        "name": "Master",
        "monthly": 150,
        "yearly": 1170,
        "tagline": "Für große Zielgruppen",
        "featuresBase": [
          "50 Quellen",
          "Unbegrenzt viele Abonnenten"
        ],
        "featuresDelta": [
          "Premium-Support",
          "Eigene Webhooks"
        ],
        "limits": {
          "newsSources": 50,
          "users": -1
        },
        "ctaLabel": "Master wählen",
        "productId": "prod_master_id",
        "tier": 4
      },
      {
        "id": "vipfree",
        "name": "VIP Gratis",
        "monthly": 0,
        "yearly": 0,
        "tagline": "Vollzugriff für Partner",
        "featuresBase": [
          "Unbegrenzte Quellen",
          "Unbegrenzt viele Abonnenten"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": -1,
          "users": -1
        },
        "ctaLabel": "Aktueller Tarif",
        "internalOnly": true,
        "tier": 5
      }
    ],
    "contact": {
      "text": "Benötigen Sie eine maßgeschneiderte Lösung?",
      "cta": "Kontakt aufnehmen",
      "href": "/help"
    }
  },
  "article": {
    "notFound": "Artikel nicht gefunden.",
    "errorFetching": "Wir konnten diesen Artikel nicht laden. Laden Sie die Seite in einer Minute neu, um es erneut zu versuchen.",
    "noArticleSpecified": "Kein Artikel angegeben.",
    "goBack": "Zurück",
    "loading": "Lädt..."
  },
  "pricing": {
    "eyebrow": "Preise",
    "title": "Tarife und Preise",
    "currentPlan": "Aktueller Tarif:",
    "monthly": "Monatlich",
    "yearly": "Jährlich",
    "yearlySave": "35 % sparen",
    "intervalLabel": "Abrechnungszeitraum",
    "billedYearly": "jährliche Abrechnung",
    "perMonthShort": "/mo",
    "perYearShort": "/yr",
    "freeCta": "Kostenlos starten",
    "processing": "Checkout wird geöffnet...",
    "askMore": "Jedes Konto startet im Tarif Gratis. Wenn Sie mehr brauchen, schreiben Sie uns an {email}, und wir ändern Ihren Tarif.",
    "askFor": "{planName} anfragen",
    "askAction": "Schreiben Sie uns",
    "checkoutError": "Der Checkout konnte nicht geöffnet werden. Bitte versuchen Sie es gleich noch einmal.",
    "networkError": "Der Server ist nicht erreichbar. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut.",
    "includes": "Enthalten",
    "pageMetaTitle": "Preise | AIBAN",
    "pageMetaDescription": "Tarife und Preise von AIBAN. Starten Sie kostenlos mit 1 Quelle und bis zu 100 Abonnenten und wechseln Sie zu einem Monats- oder Jahrestarif, wenn Sie mehr brauchen.",
    "pageTitle": "Preise",
    "pageLead": "Starten Sie im kostenlosen Tarif mit 1 Quelle und bis zu 100 Abonnenten. Wenn Sie mehr Quellen oder mehr Abonnenten brauchen, schreiben Sie uns, und wir stellen Sie auf einen kostenpflichtigen Tarif um, monatlich oder jährlich abgerechnet.",
    "faqTitle": "Fragen zur Abrechnung",
    "contactText": "Brauchen Sie höhere Limits oder eine individuelle Einrichtung?",
    "contactCta": "Kontakt aufnehmen",
    "everythingIn": "Alles aus dem vorherigen Tarif, plus:",
    "isCurrentPlan": "Dies ist Ihr aktueller Tarif",
    "downgradeTo": "Zu {planName} wechseln",
    "upgradeTo": "{planName} wählen",
    "mockMode": "Testmodus",
    "mostPopular": "Am beliebtesten",
    "perMonth": "pro Monat",
    "perYear": "pro Jahr",
    "youSave": "Ersparnis:"
  },
  "confirmSubscription": {
    "title": "Bestätigen Sie Ihr Abonnement",
    "goBack": "Zurück",
    "pleaseAccept": "Bitte akzeptieren Sie die Bedingungen, um den Kauf abzuschließen.",
    "iAccept": "Ich akzeptiere die",
    "termsAndConditions": "Allgemeinen Geschäftsbedingungen",
    "and": "und die",
    "privacyPolicy": "Datenschutzerklärung",
    "confirm": "Abonnement bestätigen",
    "mustAccept": "Sie müssen die Bedingungen akzeptieren.",
    "invalidLink": "Dieser Bestätigungslink ist unvollständig. Öffnen Sie die neueste E-Mail von uns und verwenden Sie den Link darin."
  },
  "articles": {
    "title": "Neueste Artikel",
    "subtitle": "Artikel, die AIBAN für die versendeten Newsletter geschrieben hat.",
    "producedIn": "Sprachen, in denen diese Artikel verfügbar sind",
    "searchPlaceholder": "Artikel suchen...",
    "noArticlesFound": "Keine Artikel gefunden.",
    "created": "Erstellt am:",
    "language": "Sprache:",
    "rightsReserved": "Alle Rechte vorbehalten.",
    "errorFetching": "Wir konnten die Artikel nicht laden. Laden Sie die Seite in einer Minute neu, um es erneut zu versuchen."
  },
  "blog": {
    "metaTitle": "Blog von {name}",
    "metaDescription": "Artikel von {name}. Abonnieren Sie, um neue Artikel per E-Mail zu erhalten.",
    "eyebrow": "Newsletter-Blog",
    "heroFrom": "Artikel von {name}",
    "heroDescription": "Hier finden Sie die Artikel, die dieser Newsletter veröffentlicht hat. Abonnieren Sie, um neue per E-Mail zu erhalten.",
    "subscribe": "Abonnieren",
    "home": "Blog-Startseite",
    "featured": "Neuester Artikel",
    "latest": "Neueste Artikel",
    "latestHint": "Neueste zuerst. Manche Artikel haben kein Bild und erscheinen daher nur als Text.",
    "articleCount": "{count} Artikel auf {language}",
    "articleCountOne": "1 Artikel auf {language}",
    "languages": "Sprache wählen",
    "minRead": "{n} Min. Lesezeit",
    "readArticle": "Artikel lesen",
    "page": "Seite {page}",
    "newer": "Neuere Artikel",
    "older": "Ältere Artikel",
    "pagination": "Artikelseiten",
    "emptyTitle": "Noch keine Artikel",
    "emptyBody": "Dieser Newsletter hat hier noch keine Artikel veröffentlicht. Abonnieren Sie, um den ersten per E-Mail zu erhalten.",
    "endTitle": "Keine älteren Artikel",
    "endBody": "Sie haben das Ende der Liste erreicht.",
    "backToNewest": "Zu den neuesten Artikeln",
    "errorTitle": "Diese Artikel konnten nicht geladen werden",
    "errorBody": "Der Artikelserver hat nicht rechtzeitig geantwortet. Laden Sie die Seite in einer Minute neu, um es erneut zu versuchen.",
    "reload": "Seite neu laden",
    "missingHolder": "Dieser Blog-Link ist unvollständig, weil er nicht angibt, welcher Blog geöffnet werden soll. Bitten Sie den Betreiber des Newsletters um den vollständigen Link.",
    "redirecting": "Blog wird geöffnet...",
    "publishedWith": "Veröffentlicht mit AIBAN",
    "cta": {
      "title": "Den nächsten Artikel per E-Mail erhalten",
      "body": "Abonnieren Sie {name}, dann kommen neue Artikel in Ihren Posteingang. Sie können sich jederzeit abmelden.",
      "button": "Abonnieren"
    },
    "search": {
      "label": "Artikel durchsuchen",
      "placeholder": "Nach Wort oder Satz suchen",
      "button": "Suchen",
      "suggestions": "Vorschläge",
      "recent": "Letzte Suchen",
      "clearRecent": "Letzte Suchen löschen",
      "title": "Suchergebnisse",
      "resultsFor": "Ergebnisse für „{q}“",
      "count": "{count} Artikel gefunden",
      "countOne": "1 Artikel gefunden",
      "searching": "Artikel werden durchsucht",
      "emptyTitle": "Keine Artikel zu „{q}“",
      "emptyBody": "Prüfen Sie die Schreibweise oder versuchen Sie ein kürzeres Wort. Sie können auch alle Artikel im Blog durchsehen.",
      "browseAll": "Alle Artikel ansehen",
      "noQuery": "Geben Sie oben ein Wort oder einen Satz ein, um diesen Blog zu durchsuchen.",
      "error": "Die Suche wurde abgebrochen, weil der Artikelserver nicht geantwortet hat. Versuchen Sie es in einer Minute erneut.",
      "tryAgain": "Erneut versuchen",
      "limitNote": "Es werden die ersten {count} Treffer angezeigt. Verwenden Sie einen genaueren Begriff, um die Liste einzugrenzen."
    },
    "article": {
      "back": "Alle Artikel",
      "published": "Veröffentlicht am {date}",
      "by": "Von {name}",
      "otherLanguages": "In anderen Sprachen lesen",
      "otherLanguagesHint": "Dieser Newsletter erscheint auch in diesen Sprachen. Jeder Link öffnet den Blog in der jeweiligen Sprache.",
      "share": "Diesen Artikel teilen",
      "copyLink": "Link kopieren",
      "copied": "Link kopiert. Sie können ihn überall einfügen.",
      "copyFailed": "Der Link konnte nicht kopiert werden. Kopieren Sie ihn stattdessen aus der Adressleiste Ihres Browsers.",
      "notFoundTitle": "Artikel nicht gefunden",
      "notFoundBody": "Dieser Artikel wurde möglicherweise entfernt oder der Link ist unvollständig. Öffnen Sie den Blog, um die anderen Artikel zu sehen.",
      "errorTitle": "Dieser Artikel konnte nicht geladen werden",
      "errorBody": "Der Artikelserver hat nicht rechtzeitig geantwortet. Laden Sie die Seite in einer Minute neu, um es erneut zu versuchen.",
      "goToBlog": "Zum Blog"
    }
  },
  "nav": {
    "mainLabel": "Hauptmenü",
    "legalLabel": "Rechtliches",
    "home": "AIBAN-Startseite",
    "menu": "Menü",
    "openMenu": "Menü öffnen",
    "closeMenu": "Menü schließen",
    "howItWorks": "So funktioniert es",
    "pricing": "Preise",
    "help": "Hilfe",
    "about": "Über uns",
    "privacy": "Datenschutz",
    "terms": "Nutzungsbedingungen",
    "cookies": "Cookies",
    "signOut": "Abmelden",
    "chooseLanguage": "Sprache wählen",
    "currentLanguage": "Sprache: {name}"
  },
  "about": {
    "metaTitle": "Über uns | AIBAN",
    "metaDescription": "AIBAN macht aus den Inhalten, die ein Unternehmen bereits veröffentlicht, einen Newsletter, der von selbst versendet wird, in der Sprache jedes Abonnenten und unter dem Namen des Inhabers.",
    "eyebrow": "Über uns",
    "title": "Über AIBAN",
    "lead": "AIBAN macht aus den Inhalten, die ein Unternehmen bereits veröffentlicht, einen Newsletter, der von selbst versendet wird. Jeder Abonnent liest ihn in seiner eigenen Sprache, und er kommt unter dem Namen des Inhabers an.",
    "whatTitle": "Was AIBAN macht",
    "whatBody": [
      "Sie sagen AIBAN, wo Ihre Inhalte liegen: Ihre Website, Ihr Blog oder Nachrichtenseiten, denen Sie folgen. Sobald dort etwas Neues erscheint, schreibt AIBAN daraus eine Ausgabe in dem Stil, den Sie beschrieben haben, und versendet sie in dem von Ihnen gewählten Rhythmus an Ihre Abonnenten.",
      "Jeder Abonnent wählt bei der Anmeldung eine Sprache, und jede Ausgabe wird vor dem Versand in diese Sprache übersetzt. Die Artikel werden außerdem als Webseiten veröffentlicht, und Sie können sie an Ihre eigene Website senden."
    ],
    "whoTitle": "Wer dahintersteht",
    "whoBody": [
      "AIBAN wird von Luis Murillo Baltodano entwickelt, dem Gründer. Luis ist ein kreativer Ingenieur mit Erfahrung in Computergrafik und Automatisierung.",
      "Einige seiner Open-Source-Projekte finden Sie unten."
    ],
    "projectsTitle": "Open-Source-Projekte des Gründers",
    "projects": [
      {
        "name": "Scene Preset",
        "url": "https://github.com/LuisArmando-TestCoder/scene-preset",
        "desc": "Eine Bibliothek, die Boilerplate-Code bei der Arbeit mit Three.js und 3D-Web-APIs überflüssig macht."
      },
      {
        "name": "Canvas Preset",
        "url": "https://github.com/LuisArmando-TestCoder/canvas-preset",
        "desc": "Hilfsfunktionen für häufige Aufgaben mit der Canvas API."
      },
      {
        "name": "Atomic Gatsby template",
        "url": "https://github.com/LuisArmando-TestCoder/atomic-gatsby-typescript-recoiljs",
        "desc": "Eine Startvorlage, die nach Atomic Design aufgebaut ist."
      }
    ],
    "githubLabel": "Luis auf GitHub",
    "newTab": "(öffnet sich in einem neuen Tab)",
    "contactTitle": "Kontakt aufnehmen",
    "contactBody": "Für Fragen, Feedback oder Ideen für eine Zusammenarbeit schreiben Sie an info@aiban.news.",
    "emailCta": "E-Mail an info@aiban.news",
    "startCta": "Kostenlos starten",
    "helpCta": "Zum Hilfecenter"
  },
  "careers": {
    "metaTitle": "Karriere | AIBAN",
    "metaDescription": "Bei AIBAN gibt es derzeit keine offenen Stellen. Sie können uns trotzdem an info@aiban.news schreiben.",
    "eyebrow": "Karriere",
    "title": "Karriere bei AIBAN",
    "lead": "Bei AIBAN gibt es derzeit keine offenen Stellen.",
    "body": "Sobald eine Stelle frei wird, finden Sie sie auf dieser Seite. Wenn Sie später an AIBAN mitarbeiten möchten, schicken Sie uns ein paar Zeilen über sich und darüber, was Sie gerne bauen würden.",
    "emailCta": "E-Mail an info@aiban.news",
    "emailSubject": "Mitarbeit an AIBAN",
    "aboutCta": "Mehr über AIBAN"
  },
  "legal": {
    "navLabel": "Rechtliche Dokumente",
    "lastUpdated": "Zuletzt aktualisiert: {date}",
    "privacy": {
      "title": "Datenschutzerklärung",
      "metaTitle": "Datenschutzerklärung | AIBAN",
      "metaDescription": "Wie AIBAN Ihre Daten erhebt, nutzt und schützt und wie Sie Ihre Rechte an Ihren Daten ausüben."
    },
    "terms": {
      "title": "Nutzungsbedingungen",
      "metaTitle": "Nutzungsbedingungen | AIBAN",
      "metaDescription": "Die Bedingungen, die gelten, wenn Sie ein Konto erstellen und AIBAN nutzen."
    },
    "cookies": {
      "title": "Cookie-Richtlinie",
      "metaTitle": "Cookie-Richtlinie | AIBAN",
      "metaDescription": "Welche Cookies AIBAN verwendet, wofür sie da sind, wie lange sie gespeichert bleiben und wie Sie sie steuern können."
    }
  },
  "demoPage": {
    "metaTitle": "Demo | AIBAN",
    "metaDescription": "Sehen Sie sich eine Vorführung von AIBAN an und erfahren Sie, was nach der Registrierung passiert, vom Hinzufügen Ihrer Website bis zum Versand Ihrer ersten Ausgabe.",
    "eyebrow": "Demo",
    "title": "So funktioniert AIBAN",
    "lead": "Sehen Sie sich die Vorführung an und lesen Sie dann, was nach der Registrierung passiert.",
    "videoTitle": "AIBAN-Vorführungsvideo",
    "playLabel": "Vorführungsvideo abspielen",
    "videoNote": "Das Video wird über YouTube abgespielt.",
    "stepsTitle": "Was nach der Registrierung passiert",
    "steps": [
      {
        "title": "Website hinzufügen",
        "body": "Geben Sie die Adresse Ihrer Website, Ihres Blogs oder einer Nachrichtenseite ein, der Sie folgen. AIBAN liest sie auf neue Inhalte."
      },
      {
        "title": "Leser und Stil beschreiben",
        "body": "Sagen Sie AIBAN, wer Ihren Newsletter liest und wie er klingen soll. Sie können AIBAN auch eine Beschreibung aus Ihrer Website vorschlagen lassen."
      },
      {
        "title": "Rhythmus wählen",
        "body": "Legen Sie fest, wie oft Ausgaben versendet werden. Sie können das später im Dashboard ändern."
      },
      {
        "title": "Abonnenten hinzufügen",
        "body": "Laden Sie eine Liste hoch, fügen Sie Personen einzeln hinzu oder teilen Sie Ihre Anmeldeseite und Ihr Widget. Jeder Abonnent wählt eine Sprache."
      },
      {
        "title": "Absendernamen und Signatur hinzufügen",
        "body": "Fügen Sie den Namen und die E-Mail-Signatur hinzu, die Leser sehen. AIBAN versendet jede Ausgabe von seiner verifizierten Adresse unter Ihrem Namen, und Antworten landen in Ihrem Posteingang."
      }
    ],
    "ctaTitle": "Probieren Sie es mit Ihrer eigenen Website aus",
    "ctaBody": "Der kostenlose Tarif umfasst 1 Quelle und bis zu 100 Abonnenten.",
    "primaryCta": "Kostenlos starten",
    "secondaryCta": "Preise ansehen"
  },
  "helpCenter": {
    "metaTitle": "Hilfe | AIBAN",
    "metaDescription": "Antworten zur Einrichtung von AIBAN: Quellen, Sprachen, Versand unter Ihrem Namen, Abonnenten, das Anmelde-Widget, der Blog und die Abrechnung.",
    "eyebrow": "Hilfecenter",
    "title": "Wie können wir helfen?",
    "lead": "Hier finden Sie Antworten zur Einrichtung und zum Betrieb Ihres Newsletters. Wenn Sie nicht finden, was Sie suchen, schreiben Sie uns.",
    "searchLabel": "Hilfecenter durchsuchen",
    "searchPlaceholder": "Zum Beispiel Sprache, Widget oder kündigen",
    "clearSearch": "Suche löschen",
    "resultsCount": "{count} Antworten passen zu Ihrer Suche.",
    "noResults": "Keine Antwort passt zu Ihrer Suche. Versuchen Sie ein anderes Wort oder schreiben Sie an info@aiban.news.",
    "topicsLabel": "Themen",
    "copyLink": "Link kopieren",
    "linkCopied": "Link kopiert",
    "contactTitle": "Brauchen Sie weitere Hilfe?",
    "contactBody": "Schreiben Sie an info@aiban.news und geben Sie die E-Mail-Adresse an, mit der Sie sich registriert haben.",
    "emailCta": "E-Mail an info@aiban.news",
    "limitsTitle": "Höhere Limits anfragen",
    "limitsBody": "Nennen Sie uns die Limits, die Sie brauchen, und wir antworten per E-Mail. Wenn die Anfrage nicht über diese Seite gesendet werden kann, öffnet sich Ihr E-Mail-Programm mit der ausgefüllten Anfrage, damit Sie sie uns schicken können.",
    "faqFilterLabel": "Fragen filtern",
    "faqNoMatch": "Keine Frage passt zu Ihrem Filter.",
    "groups": [
      {
        "id": "getting-started",
        "title": "Erste Schritte",
        "items": [
          {
            "id": "what-is-aiban",
            "q": "Was ist AIBAN?",
            "a": "AIBAN macht aus Inhalten, die Sie bereits veröffentlichen, einen regelmäßigen Newsletter. Es liest Ihre Website, Ihren Blog oder Nachrichtenseiten Ihrer Wahl, schreibt neue Ausgaben in Ihrem Stil und versendet sie an Ihre Abonnenten. Jeder Abonnent liest ihn in der Sprache, die er gewählt hat."
          },
          {
            "id": "how-to-start",
            "q": "Wie fange ich an?",
            "a": "Erstellen Sie auf der Registrierungsseite ein Konto. Bei der Einrichtung werden die Adresse Ihrer Website und einige Angaben zu Ihren Lesern abgefragt. Danach können Sie Abonnenten hinzufügen und alles über Ihr Dashboard verwalten."
          },
          {
            "id": "change-settings",
            "q": "Kann ich meine Einrichtung später ändern?",
            "a": "Ja. Quellen, Zeitplan, Absenderangaben und Abonnenten können Sie später in Ihrem Dashboard ändern. Um Ihren Tarif zu ändern, schreiben Sie an info@aiban.news."
          }
        ]
      },
      {
        "id": "sources",
        "title": "Quellen und Inhalte",
        "items": [
          {
            "id": "what-is-a-source",
            "q": "Was kann ich als Quelle verwenden?",
            "a": "Eine Quelle ist eine Webadresse, die AIBAN auf neue Inhalte liest, zum Beispiel Ihre Website, Ihr Blog oder eine Nachrichtenseite, der Sie folgen. Quellen fügen Sie im Dashboard hinzu. Wie viele Sie hinzufügen können, hängt von Ihrem Tarif ab."
          },
          {
            "id": "how-often",
            "q": "Wie oft wird mein Newsletter versendet?",
            "a": "Sie legen beim Einrichten einer Quelle fest, wie oft veröffentlicht wird. Den Rhythmus können Sie später im Dashboard ändern."
          },
          {
            "id": "your-voice",
            "q": "Wie schreibt AIBAN in meinem Stil?",
            "a": "Sie beschreiben die Persönlichkeit Ihres Newsletters oder lassen AIBAN eine Beschreibung für Sie erstellen. Die Ausgaben werden auf Grundlage dieser Beschreibung geschrieben. Sie können sie jederzeit im Dashboard bearbeiten."
          }
        ]
      },
      {
        "id": "languages",
        "title": "Sprachen",
        "items": [
          {
            "id": "subscriber-language",
            "q": "Wie erhalten Abonnenten den Newsletter in ihrer Sprache?",
            "a": "Jeder Abonnent wählt bei der Anmeldung eine bevorzugte Sprache. AIBAN übersetzt jede Ausgabe vor dem Versand in diese Sprache."
          },
          {
            "id": "site-language",
            "q": "Kann ich die Website in meiner Sprache nutzen?",
            "a": "Ja. Mit der Sprachschaltfläche unten rechts auf dem Bildschirm wechseln Sie die Sprache der Website und des Dashboards."
          }
        ]
      },
      {
        "id": "sending",
        "title": "Versand unter Ihrem Namen",
        "items": [
          {
            "id": "own-address",
            "q": "Können Ausgaben von meiner eigenen E-Mail-Adresse kommen?",
            "a": "Ausgaben gehen von der Versandadresse von AIBAN mit Ihrem Absendernamen und Ihrer E-Mail-Signatur hinaus, und Antworten landen in Ihrem Posteingang. Wir fragen nicht nach Ihrem E-Mail-Passwort, es gibt also nichts von Ihnen, das nach außen gelangen könnte."
          },
          {
            "id": "app-password",
            "q": "Muss ich AIBAN mein E-Mail-Passwort geben?",
            "a": "Nein. AIBAN fragt nie nach Ihrem E-Mail-Passwort oder einem App-Passwort. Ausgaben werden von der Adresse von AIBAN unter Ihrem Namen versendet, und Antworten gehen an Sie."
          }
        ]
      },
      {
        "id": "subscribers",
        "title": "Abonnenten und Anmelde-Widget",
        "items": [
          {
            "id": "add-subscribers",
            "q": "Wie füge ich Abonnenten hinzu?",
            "a": "Sie können Personen einzeln im Dashboard hinzufügen oder eine Datei mit Ihrer Liste hochladen. Außerdem können sich Leute über Ihre Anmeldeseite oder das Anmelde-Widget eintragen."
          },
          {
            "id": "signup-widget",
            "q": "Was ist das Anmelde-Widget?",
            "a": "Das Widget ist ein Anmeldeformular, das Sie auf Ihrer eigenen Website einbinden können. Besucher geben ihre E-Mail-Adresse ein, wählen ihre Sprache und kommen so auf Ihre Liste."
          },
          {
            "id": "subscriber-limit",
            "q": "Gibt es ein Limit für Abonnenten?",
            "a": "Jeder Tarif hat ein eigenes Abonnentenlimit. Der kostenlose Tarif umfasst bis zu 100 Abonnenten. Die Limits der anderen Tarife finden Sie auf der Preisseite."
          }
        ]
      },
      {
        "id": "blog",
        "title": "Blog",
        "items": [
          {
            "id": "blog-pages",
            "q": "Werden meine Newsletter-Artikel im Web veröffentlicht?",
            "a": "Ja. Die Artikel, die AIBAN für Ihren Newsletter schreibt, werden auch als Webseiten veröffentlicht, sodass man sie auch außerhalb des Posteingangs lesen kann."
          },
          {
            "id": "post-to-site",
            "q": "Kann ich Artikel auf meiner eigenen Website veröffentlichen?",
            "a": "Ja. Im Dashboard können Sie einen Webhook einrichten, der jeden Newsletter-Artikel als Beitrag an Ihre Website sendet. Das funktioniert mit WordPress und mit jeder Plattform, die Standard-REST-Inhalte annimmt."
          }
        ]
      },
      {
        "id": "billing",
        "title": "Abrechnung",
        "items": [
          {
            "id": "free-plan",
            "q": "Gibt es einen kostenlosen Tarif?",
            "a": "Ja. Der kostenlose Tarif umfasst 1 Quelle und bis zu 100 Abonnenten. Wenn Sie mehr brauchen, können Sie in einen kostenpflichtigen Tarif wechseln."
          },
          {
            "id": "monthly-yearly",
            "q": "Kann ich monatlich oder jährlich zahlen?",
            "a": "Ja. Kostenpflichtige Tarife werden monatlich oder jährlich abgerechnet. Der Jahrespreis ist 35 % günstiger als 12 Monate bei monatlicher Zahlung. Schreiben Sie an info@aiban.news, um einen Tarif zu wählen."
          },
          {
            "id": "cancel",
            "q": "Kann ich jederzeit kündigen?",
            "a": "Ja. Schreiben Sie jederzeit an info@aiban.news, dann kündigen wir Ihren kostenpflichtigen Tarif oder stellen Sie wieder auf den kostenlosen Tarif um."
          },
          {
            "id": "higher-limits",
            "q": "Was, wenn ich mehr brauche als der größte Tarif bietet?",
            "a": "Nennen Sie uns über das Anfrageformular auf der Hilfeseite die Limits, die Sie brauchen. Wir antworten per E-Mail."
          }
        ]
      }
    ]
  },
  "mainPage": {
    "skipToMainContent": "Zum Hauptinhalt springen",
    "dismissAnnouncement": "Ankündigung schließen",
    "problem": "Problem:",
    "outcome": "Ergebnis:",
    "disclaimer": "Die Ersparnis von 35% gilt nur bei jährlicher Abrechnung."
  },
  "authForm": {
    "emailValidation": "Geben Sie eine E-Mail-Adresse ein, zum Beispiel name@beispiel.de.",
    "failedToSendCode": "Wir konnten den Code nicht senden. Prüfen Sie die E-Mail-Adresse und versuchen Sie es in einer Minute erneut.",
    "sending": "Wird gesendet...",
    "codeSent": "Wir haben Ihnen einen Code per E-Mail geschickt.",
    "invalidCode": "Dieser Code ist nicht korrekt. Prüfen Sie die neueste E-Mail von uns oder lassen Sie sich den Code erneut senden.",
    "regenerateCode": "Code erneut senden",
    "back": "Zurück",
    "byProceeding": "Mit dem Fortfahren akzeptieren Sie die",
    "termsOfService": "Nutzungsbedingungen",
    "and": "und die",
    "privacyPolicy": "Datenschutzerklärung",
    "appName": "AI Newsletter"
  },
  "welcome": {
    "title": "Automatischer Newsletter-Generator",
    "setItOnce": "Einmal einrichten.",
    "useItForever": "Danach läuft es weiter."
  },
  "lead": {
    "title": "Verwandeln Sie Abonnenten in Besucher",
    "recommendation": "Helfen Sie unserer KI, Ihre Marke zu verstehen, indem Sie Ihre Website verbinden.",
    "question": "Haben Sie eine Website? (optional, Sie können sie später hinzufügen)",
    "placeholder": "https://ihre-seite.de"
  },
  "newsSource": {
    "title": "Content-Quelle verbinden",
    "subtitle": "Wir ziehen Ihren Feed ein, damit Sie nicht bei Null anfangen müssen.",
    "placeholder": "Ihr Blog oder RSS-Link"
  },
  "subscribe": {
    "welcome": {
      "title": "Willkommen beim Newsletter.",
      "invitedBy": "Sie wurden von {configuratorId} eingeladen."
    }
  },
  "header": {
    "goToWorkspace": "Dashboard öffnen",
    "inBilling": "Preise",
    "vip": "VIP",
    "plan": "{planName}-Tarif",
    "logIn": "Anmelden",
    "getStarted": "Kostenlos starten"
  },
  "fileInput": {
    "chooseFile": "Datei auswählen",
    "dropFile": "Hier ablegen",
    "release": "Loslassen zum Hochladen"
  },
  "billing": {
    "title": "Abrechnung und Abonnement",
    "currentPlanTitle": "Ihr aktueller Tarif",
    "upgradePlanTitle": "Tarif ändern",
    "manageSubscription": "Abonnement verwalten",
    "vipPlanName": "VIP-Partner",
    "vipPlanDescription": "Unbegrenzter Zugang, bereitgestellt von AIBAN.",
    "perMonth": "pro Monat",
    "perYear": "pro Jahr",
    "monthAbbreviation": "Mon.",
    "equivalentTo": "entspricht",
    "mostPopular": "Am beliebtesten",
    "upgradeTo": "Upgrade auf",
    "downgradeTo": "Wechseln zu",
    "currentPlanButton": "Ihr Tarif",
    "youSave": "Ersparnis:",
    "users": "Nutzer",
    "newsSources": "News-Quellen",
    "monthly": "Monatlich",
    "yearly": "Jährlich",
    "loadingPlan": "Lade Tarifdaten..."
  },
  "languages": [
    {
      "code": "ab",
      "name": "Abchasisch"
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
      "name": "Albanisch"
    },
    {
      "code": "am",
      "name": "Amharisch"
    },
    {
      "code": "ar",
      "name": "Arabisch"
    },
    {
      "code": "an",
      "name": "Aragonesisch"
    },
    {
      "code": "hy",
      "name": "Armenisch"
    },
    {
      "code": "as",
      "name": "Assamesisch"
    },
    {
      "code": "av",
      "name": "Awarisch"
    },
    {
      "code": "ae",
      "name": "Awestisch"
    },
    {
      "code": "ay",
      "name": "Aymara"
    },
    {
      "code": "az",
      "name": "Aserbaidschanisch"
    },
    {
      "code": "bm",
      "name": "Bambara"
    },
    {
      "code": "ba",
      "name": "Baschkirisch"
    },
    {
      "code": "eu",
      "name": "Baskisch"
    },
    {
      "code": "be",
      "name": "Belarussisch"
    },
    {
      "code": "bn",
      "name": "Bengalisch"
    },
    {
      "code": "bi",
      "name": "Bislama"
    },
    {
      "code": "bs",
      "name": "Bosnisch"
    },
    {
      "code": "br",
      "name": "Bretonisch"
    },
    {
      "code": "bg",
      "name": "Bulgarisch"
    },
    {
      "code": "my",
      "name": "Birmanisch"
    },
    {
      "code": "ca",
      "name": "Katalanisch"
    },
    {
      "code": "ch",
      "name": "Chamorro"
    },
    {
      "code": "ce",
      "name": "Tschetschenisch"
    },
    {
      "code": "ny",
      "name": "Chichewa"
    },
    {
      "code": "zh",
      "name": "Chinesisch"
    },
    {
      "code": "cu",
      "name": "Kirchenslawisch"
    },
    {
      "code": "cv",
      "name": "Tschuwaschisch"
    },
    {
      "code": "kw",
      "name": "Kornisch"
    },
    {
      "code": "co",
      "name": "Korsisch"
    },
    {
      "code": "cr",
      "name": "Cree"
    },
    {
      "code": "hr",
      "name": "Kroatisch"
    },
    {
      "code": "cs",
      "name": "Tschechisch"
    },
    {
      "code": "da",
      "name": "Dänisch"
    },
    {
      "code": "dv",
      "name": "Maledivisch"
    },
    {
      "code": "nl",
      "name": "Niederländisch"
    },
    {
      "code": "dz",
      "name": "Dzongkha"
    },
    {
      "code": "en",
      "name": "Englisch"
    },
    {
      "code": "eo",
      "name": "Esperanto"
    },
    {
      "code": "et",
      "name": "Estnisch"
    },
    {
      "code": "ee",
      "name": "Ewe"
    },
    {
      "code": "fo",
      "name": "Färöisch"
    },
    {
      "code": "fj",
      "name": "Fidschi"
    },
    {
      "code": "fi",
      "name": "Finnisch"
    },
    {
      "code": "fr",
      "name": "Französisch"
    },
    {
      "code": "fy",
      "name": "Westfriesisch"
    },
    {
      "code": "ff",
      "name": "Ful"
    },
    {
      "code": "gd",
      "name": "Schottisch-Gälisch"
    },
    {
      "code": "gl",
      "name": "Galicisch"
    },
    {
      "code": "lg",
      "name": "Luganda"
    },
    {
      "code": "ka",
      "name": "Georgisch"
    },
    {
      "code": "de",
      "name": "Deutsch"
    },
    {
      "code": "el",
      "name": "Griechisch"
    },
    {
      "code": "kl",
      "name": "Grönländisch"
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
      "name": "Haitianisch"
    },
    {
      "code": "ha",
      "name": "Hausa"
    },
    {
      "code": "he",
      "name": "Hebräisch"
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
      "name": "Ungarisch"
    },
    {
      "code": "is",
      "name": "Isländisch"
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
      "name": "Indonesisch"
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
      "name": "Inupiak"
    },
    {
      "code": "ga",
      "name": "Irisch"
    },
    {
      "code": "it",
      "name": "Italienisch"
    },
    {
      "code": "ja",
      "name": "Japanisch"
    },
    {
      "code": "jv",
      "name": "Javanisch"
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
      "name": "Kaschmirisch"
    },
    {
      "code": "kk",
      "name": "Kasachisch"
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
      "name": "Kirgisisch"
    },
    {
      "code": "kv",
      "name": "Syrjänisch"
    },
    {
      "code": "kg",
      "name": "Kikongo"
    },
    {
      "code": "ko",
      "name": "Koreanisch"
    },
    {
      "code": "kj",
      "name": "Kwanyama"
    },
    {
      "code": "ku",
      "name": "Kurdisch"
    },
    {
      "code": "lo",
      "name": "Laotisch"
    },
    {
      "code": "la",
      "name": "Latein"
    },
    {
      "code": "lv",
      "name": "Lettisch"
    },
    {
      "code": "li",
      "name": "Limburgisch"
    },
    {
      "code": "ln",
      "name": "Lingala"
    },
    {
      "code": "lt",
      "name": "Litauisch"
    },
    {
      "code": "lu",
      "name": "Luba-Katanga"
    },
    {
      "code": "lb",
      "name": "Luxemburgisch"
    },
    {
      "code": "mk",
      "name": "Mazedonisch"
    },
    {
      "code": "mg",
      "name": "Madagassisch"
    },
    {
      "code": "ms",
      "name": "Malaiisch"
    },
    {
      "code": "ml",
      "name": "Malayalam"
    },
    {
      "code": "mt",
      "name": "Maltesisch"
    },
    {
      "code": "gv",
      "name": "Manx"
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
      "name": "Marshallisch"
    },
    {
      "code": "mn",
      "name": "Mongolisch"
    },
    {
      "code": "na",
      "name": "Nauruisch"
    },
    {
      "code": "nv",
      "name": "Navajo"
    },
    {
      "code": "nd",
      "name": "Nord-Ndebele"
    },
    {
      "code": "nr",
      "name": "Süd-Ndebele"
    },
    {
      "code": "ng",
      "name": "Ndonga"
    },
    {
      "code": "ne",
      "name": "Nepali"
    },
    {
      "code": "no",
      "name": "Norwegisch"
    },
    {
      "code": "nb",
      "name": "Norwegisch Bokmål"
    },
    {
      "code": "nn",
      "name": "Norwegisch Nynorsk"
    },
    {
      "code": "oc",
      "name": "Okzitanisch"
    },
    {
      "code": "oj",
      "name": "Ojibwe"
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
      "name": "Ossetisch"
    },
    {
      "code": "pi",
      "name": "Pali"
    },
    {
      "code": "ps",
      "name": "Paschtu"
    },
    {
      "code": "fa",
      "name": "Persisch"
    },
    {
      "code": "pl",
      "name": "Polnisch"
    },
    {
      "code": "pt",
      "name": "Portugiesisch"
    },
    {
      "code": "pa",
      "name": "Pandschabi"
    },
    {
      "code": "qu",
      "name": "Quechua"
    },
    {
      "code": "ro",
      "name": "Rumänisch"
    },
    {
      "code": "rm",
      "name": "Rätoromanisch"
    },
    {
      "code": "rn",
      "name": "Kirundi"
    },
    {
      "code": "ru",
      "name": "Russisch"
    },
    {
      "code": "se",
      "name": "Nordsamisch"
    },
    {
      "code": "sm",
      "name": "Samoanisch"
    },
    {
      "code": "sg",
      "name": "Sango"
    },
    {
      "code": "sa",
      "name": "Sanskrit"
    },
    {
      "code": "sc",
      "name": "Sardisch"
    },
    {
      "code": "sr",
      "name": "Serbisch"
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
      "name": "Singhalesisch"
    },
    {
      "code": "sk",
      "name": "Slowakisch"
    },
    {
      "code": "sl",
      "name": "Slowenisch"
    },
    {
      "code": "so",
      "name": "Somali"
    },
    {
      "code": "st",
      "name": "Süd-Sotho"
    },
    {
      "code": "es",
      "name": "Spanisch"
    },
    {
      "code": "su",
      "name": "Sundanesisch"
    },
    {
      "code": "sw",
      "name": "Suaheli"
    },
    {
      "code": "ss",
      "name": "Swasi"
    },
    {
      "code": "sv",
      "name": "Schwedisch"
    },
    {
      "code": "tl",
      "name": "Tagalog"
    },
    {
      "code": "ty",
      "name": "Tahitianisch"
    },
    {
      "code": "tg",
      "name": "Tadschikisch"
    },
    {
      "code": "ta",
      "name": "Tamil"
    },
    {
      "code": "tt",
      "name": "Tatarisch"
    },
    {
      "code": "te",
      "name": "Telugu"
    },
    {
      "code": "th",
      "name": "Thai"
    },
    {
      "code": "bo",
      "name": "Tibetisch"
    },
    {
      "code": "ti",
      "name": "Tigrinya"
    },
    {
      "code": "to",
      "name": "Tongaisch"
    },
    {
      "code": "ts",
      "name": "Tsonga"
    },
    {
      "code": "tn",
      "name": "Setswana"
    },
    {
      "code": "tr",
      "name": "Türkisch"
    },
    {
      "code": "tk",
      "name": "Turkmenisch"
    },
    {
      "code": "tw",
      "name": "Twi"
    },
    {
      "code": "ug",
      "name": "Uigurisch"
    },
    {
      "code": "uk",
      "name": "Ukrainisch"
    },
    {
      "code": "ur",
      "name": "Urdu"
    },
    {
      "code": "uz",
      "name": "Usbekisch"
    },
    {
      "code": "ve",
      "name": "Venda"
    },
    {
      "code": "vi",
      "name": "Vietnamesisch"
    },
    {
      "code": "vo",
      "name": "Volapük"
    },
    {
      "code": "wa",
      "name": "Wallonisch"
    },
    {
      "code": "cy",
      "name": "Walisisch"
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
      "name": "Jiddisch"
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
      "name": "Albanien"
    },
    {
      "code": "DZ",
      "name": "Algerien"
    },
    {
      "code": "AS",
      "name": "Amerikanisch-Samoa"
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
      "name": "Antarktis"
    },
    {
      "code": "AG",
      "name": "Antigua und Barbuda"
    },
    {
      "code": "AR",
      "name": "Argentinien"
    },
    {
      "code": "AM",
      "name": "Armenien"
    },
    {
      "code": "AW",
      "name": "Aruba"
    },
    {
      "code": "AU",
      "name": "Australien"
    },
    {
      "code": "AT",
      "name": "Österreich"
    },
    {
      "code": "AZ",
      "name": "Aserbaidschan"
    },
    {
      "code": "BS",
      "name": "Bahamas"
    },
    {
      "code": "BH",
      "name": "Bahrain"
    },
    {
      "code": "BD",
      "name": "Bangladesch"
    },
    {
      "code": "BB",
      "name": "Barbados"
    },
    {
      "code": "BY",
      "name": "Belarus"
    },
    {
      "code": "BE",
      "name": "Belgien"
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
      "name": "Bolivien"
    },
    {
      "code": "BA",
      "name": "Bosnien und Herzegowina"
    },
    {
      "code": "BW",
      "name": "Botswana"
    },
    {
      "code": "BR",
      "name": "Brasilien"
    },
    {
      "code": "IO",
      "name": "Britisches Territorium im Indischen Ozean"
    },
    {
      "code": "VG",
      "name": "Britische Jungferninseln"
    },
    {
      "code": "BN",
      "name": "Brunei Darussalam"
    },
    {
      "code": "BG",
      "name": "Bulgarien"
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
      "name": "Kambodscha"
    },
    {
      "code": "CM",
      "name": "Kamerun"
    },
    {
      "code": "CA",
      "name": "Kanada"
    },
    {
      "code": "CV",
      "name": "Cabo Verde"
    },
    {
      "code": "KY",
      "name": "Kaimaninseln"
    },
    {
      "code": "CF",
      "name": "Zentralafrikanische Republik"
    },
    {
      "code": "TD",
      "name": "Tschad"
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
      "name": "Weihnachtsinsel"
    },
    {
      "code": "CC",
      "name": "Kokosinseln"
    },
    {
      "code": "CO",
      "name": "Kolumbien"
    },
    {
      "code": "KM",
      "name": "Komoren"
    },
    {
      "code": "CG",
      "name": "Kongo-Brazzaville"
    },
    {
      "code": "CD",
      "name": "Kongo-Kinshasa"
    },
    {
      "code": "CK",
      "name": "Cookinseln"
    },
    {
      "code": "CR",
      "name": "Costa Rica"
    },
    {
      "code": "CI",
      "name": "Elfenbeinküste"
    },
    {
      "code": "HR",
      "name": "Kroatien"
    },
    {
      "code": "CU",
      "name": "Kuba"
    },
    {
      "code": "CY",
      "name": "Zypern"
    },
    {
      "code": "CZ",
      "name": "Tschechien"
    },
    {
      "code": "DK",
      "name": "Dänemark"
    },
    {
      "code": "DJ",
      "name": "Dschibuti"
    },
    {
      "code": "DM",
      "name": "Dominica"
    },
    {
      "code": "DO",
      "name": "Dominikanische Republik"
    },
    {
      "code": "EC",
      "name": "Ecuador"
    },
    {
      "code": "EG",
      "name": "Ägypten"
    },
    {
      "code": "SV",
      "name": "El Salvador"
    },
    {
      "code": "GQ",
      "name": "Äquatorialguinea"
    },
    {
      "code": "ER",
      "name": "Eritrea"
    },
    {
      "code": "EE",
      "name": "Estland"
    },
    {
      "code": "SZ",
      "name": "Eswatini"
    },
    {
      "code": "ET",
      "name": "Äthiopien"
    },
    {
      "code": "FJ",
      "name": "Fidschi"
    },
    {
      "code": "FI",
      "name": "Finnland"
    },
    {
      "code": "FR",
      "name": "Frankreich"
    },
    {
      "code": "GA",
      "name": "Gabun"
    },
    {
      "code": "GM",
      "name": "Gambia"
    },
    {
      "code": "GE",
      "name": "Georgien"
    },
    {
      "code": "DE",
      "name": "Deutschland"
    },
    {
      "code": "GH",
      "name": "Ghana"
    },
    {
      "code": "GR",
      "name": "Griechenland"
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
      "name": "Sonderverwaltungszone Hongkong"
    },
    {
      "code": "HU",
      "name": "Ungarn"
    },
    {
      "code": "IS",
      "name": "Island"
    },
    {
      "code": "IN",
      "name": "Indien"
    },
    {
      "code": "ID",
      "name": "Indonesien"
    },
    {
      "code": "IR",
      "name": "Iran"
    },
    {
      "code": "IQ",
      "name": "Irak"
    },
    {
      "code": "IE",
      "name": "Irland"
    },
    {
      "code": "IL",
      "name": "Israel"
    },
    {
      "code": "IT",
      "name": "Italien"
    },
    {
      "code": "JM",
      "name": "Jamaika"
    },
    {
      "code": "JP",
      "name": "Japan"
    },
    {
      "code": "JO",
      "name": "Jordanien"
    },
    {
      "code": "KZ",
      "name": "Kasachstan"
    },
    {
      "code": "KE",
      "name": "Kenia"
    },
    {
      "code": "KR",
      "name": "Südkorea"
    },
    {
      "code": "KW",
      "name": "Kuwait"
    },
    {
      "code": "KG",
      "name": "Kirgisistan"
    },
    {
      "code": "LA",
      "name": "Laos"
    },
    {
      "code": "LV",
      "name": "Lettland"
    },
    {
      "code": "LB",
      "name": "Libanon"
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
      "name": "Libyen"
    },
    {
      "code": "LI",
      "name": "Liechtenstein"
    },
    {
      "code": "LT",
      "name": "Litauen"
    },
    {
      "code": "LU",
      "name": "Luxemburg"
    },
    {
      "code": "MG",
      "name": "Madagaskar"
    },
    {
      "code": "MW",
      "name": "Malawi"
    },
    {
      "code": "MY",
      "name": "Malaysia"
    },
    {
      "code": "MV",
      "name": "Malediven"
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
      "name": "Mexiko"
    },
    {
      "code": "MD",
      "name": "Moldau"
    },
    {
      "code": "MC",
      "name": "Monaco"
    },
    {
      "code": "MN",
      "name": "Mongolei"
    },
    {
      "code": "ME",
      "name": "Montenegro"
    },
    {
      "code": "MA",
      "name": "Marokko"
    },
    {
      "code": "MZ",
      "name": "Mosambik"
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
      "name": "Niederlande"
    },
    {
      "code": "NZ",
      "name": "Neuseeland"
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
      "name": "Nordmazedonien"
    },
    {
      "code": "NO",
      "name": "Norwegen"
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
      "name": "Papua-Neuguinea"
    },
    {
      "code": "PY",
      "name": "Paraguay"
    },
    {
      "code": "PE",
      "name": "Peru"
    },
    {
      "code": "PH",
      "name": "Philippinen"
    },
    {
      "code": "PL",
      "name": "Polen"
    },
    {
      "code": "PT",
      "name": "Portugal"
    },
    {
      "code": "QA",
      "name": "Katar"
    },
    {
      "code": "RO",
      "name": "Rumänien"
    },
    {
      "code": "RU",
      "name": "Russland"
    },
    {
      "code": "RW",
      "name": "Ruanda"
    },
    {
      "code": "SA",
      "name": "Saudi-Arabien"
    },
    {
      "code": "SN",
      "name": "Senegal"
    },
    {
      "code": "RS",
      "name": "Serbien"
    },
    {
      "code": "SG",
      "name": "Singapur"
    },
    {
      "code": "SK",
      "name": "Slowakei"
    },
    {
      "code": "SI",
      "name": "Slowenien"
    },
    {
      "code": "ZA",
      "name": "Südafrika"
    },
    {
      "code": "ES",
      "name": "Spanien"
    },
    {
      "code": "LK",
      "name": "Sri Lanka"
    },
    {
      "code": "SE",
      "name": "Schweden"
    },
    {
      "code": "CH",
      "name": "Schweiz"
    },
    {
      "code": "TW",
      "name": "Taiwan"
    },
    {
      "code": "TH",
      "name": "Thailand"
    },
    {
      "code": "TR",
      "name": "Türkei"
    },
    {
      "code": "UG",
      "name": "Uganda"
    },
    {
      "code": "UA",
      "name": "Ukraine"
    },
    {
      "code": "AE",
      "name": "Vereinigte Arabische Emirate"
    },
    {
      "code": "GB",
      "name": "Vereinigtes Königreich"
    },
    {
      "code": "US",
      "name": "Vereinigte Staaten"
    },
    {
      "code": "UY",
      "name": "Uruguay"
    },
    {
      "code": "UZ",
      "name": "Usbekistan"
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
      "name": "Jemen"
    },
    {
      "code": "ZM",
      "name": "Sambia"
    },
    {
      "code": "ZW",
      "name": "Simbabwe"
    }
  ]
};
