// fr strings for locales. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale fr
export default {
  "auth": {
    "logo": "/icons/logo.png",
    "login": {
      "pageTitle": "Connexion",
      "title": "Connectez-vous à AIBAN",
      "subtitle": "Connectez-vous pour reprendre là où vous vous étiez arrêté.",
      "google": "Continuer avec Google",
      "or": "ou",
      "emailPlaceholder": "vous@exemple.com",
      "continueWithEmail": "Continuer avec l'e-mail",
      "switchText": "Vous n'avez pas de compte ?",
      "switchLink": "Créer un compte",
      "switchHref": "/signup"
    },
    "signup": {
      "pageTitle": "Inscription",
      "title": "Créez votre compte",
      "subtitle": "Aucune carte bancaire n'est demandée.",
      "google": "Continuer avec Google",
      "or": "ou",
      "emailPlaceholder": "vous@exemple.com",
      "continueWithEmail": "Continuer avec l'e-mail",
      "switchText": "Vous avez déjà un compte ?",
      "switchLink": "Se connecter",
      "switchHref": "/login"
    }
  },
  "landing": {
    "seo": {
      "title": "AIBAN | Votre site transformé en newsletter dans la langue de chaque lecteur",
      "description": "AIBAN lit ce que vous publiez déjà, rédige un numéro de newsletter avec votre ton et l'envoie sous votre nom. Chaque abonné le reçoit dans sa propre langue.",
      "ogImageAlt": "Logo AIBAN"
    },
    "skipLink": "Aller au contenu principal",
    "hero": {
      "eyebrow": "Newsletters pour les entreprises de services",
      "title": "Votre site devient une newsletter hebdomadaire, dans la langue de chaque lecteur",
      "lead": "AIBAN lit le contenu que vous publiez déjà, rédige un numéro avec votre ton et l'envoie sous votre nom. Chaque abonné le reçoit dans la langue qu'il lit. Vous configurez une fois, et tout continue de tourner.",
      "formLabel": "Votre site web",
      "formPlaceholder": "votreentreprise.com",
      "formHint": "Nous créons un numéro d'exemple à partir de l'adresse que vous saisissez. Commencer est gratuit et aucune carte n'est demandée.",
      "formSubmit": "Voir ma newsletter",
      "formError": "Saisissez une adresse web, par exemple votreentreprise.com.",
      "secondaryCta": "Voir comment ça marche"
    },
    "preview": {
      "badge": "Aperçu d'exemple",
      "note": "Ceci est une mise en page d'exemple avec du texte provisoire. Quand vous commencez, AIBAN rédige le vrai numéro à partir de votre article le plus récent.",
      "fromLabel": "De",
      "toLabel": "À",
      "subjectLabel": "Objet",
      "languageLabel": "Langue du lecteur",
      "readOnBlog": "Lire sur le blog",
      "startCta": "Commencer gratuitement avec {site}",
      "startCtaGeneric": "Commencer gratuitement",
      "liveRegion": "Aperçu d'exemple mis à jour pour {site}."
    },
    "chain": {
      "eyebrow": "Comment ça marche",
      "title": "Vous le configurez une fois, ensuite il tourne seul",
      "lead": "Vous indiquez votre site à AIBAN une seule fois. Ensuite, chaque étape ci-dessous se fait toute seule, au rythme que vous choisissez.",
      "triggerLabel": "Quand",
      "actionLabel": "Alors",
      "trigger": {
        "title": "Lundi, 9 h 00",
        "body": "Ou le rythme que vous choisissez : quotidien, hebdomadaire ou mensuel."
      },
      "steps": [
        {
          "title": "AIBAN trouve votre article le plus récent",
          "body": "Il consulte votre site et choisit le contenu qui intéressera le plus votre lecteur idéal."
        },
        {
          "title": "Il rédige le numéro avec votre voix",
          "body": "Le texte est réécrit pour vous ressembler, d'après la façon dont votre site est écrit."
        },
        {
          "title": "Il traduit le numéro pour chaque lecteur",
          "body": "Chaque abonné le reçoit dans la langue choisie lors de son inscription."
        },
        {
          "title": "L'envoi se fait sous votre nom",
          "body": "Les lecteurs voient votre nom, et leurs réponses arrivent dans votre boîte de réception."
        },
        {
          "title": "Il publie le numéro sur votre blog",
          "body": "Chaque numéro a aussi une page d'article publique avec son propre lien."
        },
        {
          "title": "Il vous montre ce qui s'est passé",
          "body": "Votre tableau de bord indique qui s'est inscrit et sur quels liens les lecteurs ont cliqué."
        }
      ],
      "alsoTitle": "Il fonctionne aussi quand",
      "also": [
        {
          "title": "Quelqu'un s'inscrit sur votre site",
          "body": "La personne confirme par e-mail et commence à recevoir vos numéros."
        },
        {
          "title": "Vous collez un lien ou un texte",
          "body": "AIBAN rédige et envoie un numéro sur ce sujet en suivant les mêmes étapes."
        },
        {
          "title": "Vous importez une liste de contacts",
          "body": "AIBAN nettoie la liste, supprime les doublons et devine la langue de chaque contact."
        }
      ]
    },
    "languages": {
      "eyebrow": "Toutes les langues",
      "title": "Chaque lecteur reçoit le numéro dans sa propre langue",
      "body": "Vous n'écrivez pas de versions séparées. AIBAN traduit chaque numéro dans toutes les langues que lisent vos abonnés et garde votre ton dans chacune. La liste comprend l'espagnol, le portugais, le français, l'allemand, l'hindi, l'arabe, le japonais et bien d'autres.",
      "sampleNote": "Le même numéro d'exemple, tel que trois lecteurs le recevraient."
    },
    "sender": {
      "eyebrow": "Votre adresse",
      "title": "Envoyé sous votre nom",
      "body": "Les numéros arrivent avec votre nom et votre signature e-mail. AIBAN les envoie depuis sa propre adresse vérifiée, vous n'avez donc jamais à nous confier le mot de passe de votre messagerie. Quand un lecteur répond, la réponse arrive dans votre boîte de réception.",
      "inboxLabel": "Ce que voit un lecteur dans sa boîte de réception",
      "inboxFrom": "Vous",
      "inboxSubject": "Cette semaine chez {site}",
      "inboxSnippet": "Un court résumé de votre article le plus récent, écrit avec votre voix.",
      "inboxTime": "9:00"
    },
    "grow": {
      "eyebrow": "Développez votre liste",
      "title": "Un formulaire d'inscription pour votre site et un blog qui se remplit tout seul",
      "items": [
        {
          "title": "Formulaire d'inscription",
          "body": "Ajoutez le formulaire AIBAN à votre site. Les nouveaux lecteurs choisissent leur langue et confirment par e-mail."
        },
        {
          "title": "Blog automatique",
          "body": "Chaque numéro devient une page d'article publique que l'on peut trouver dans les moteurs de recherche et partager avec un lien."
        },
        {
          "title": "Import de contacts",
          "body": "Ajoutez les clients que vous avez déjà depuis un fichier CSV ou Excel, ou collez une liste."
        }
      ]
    },
    "useCases": {
      "eyebrow": "Pour qui",
      "title": "Conçu pour les entreprises qui se développent grâce aux relations",
      "lead": "Si vos clients viennent par recommandation et par confiance, un message régulier de votre part fait qu'ils pensent à vous. AIBAN écrit ce message pour vous.",
      "items": [
        {
          "title": "Agences et web designers",
          "body": "Envoyez chaque semaine vos derniers travaux et articles à vos clients et prospects, et utilisez la même configuration pour les sites de vos clients."
        },
        {
          "title": "Entreprises informatiques et éditeurs de logiciels",
          "body": "Transformez vos notes de version et articles de blog en une courte mise à jour que chaque client lit dans sa langue."
        },
        {
          "title": "Immobilier",
          "body": "Partagez vos nouveaux biens et vos articles sur le marché avec des acheteurs et des vendeurs qui parlent des langues différentes."
        },
        {
          "title": "Avocats et comptables",
          "body": "Tenez vos clients informés des sujets sur lesquels vous écrivez déjà, dans un format calme et régulier."
        },
        {
          "title": "Coachs et formateurs",
          "body": "Envoyez votre dernière leçon ou votre dernier article à votre communauté un jour fixe, sans avoir à le réécrire."
        }
      ]
    },
    "pricingIntro": {
      "eyebrow": "Tarifs",
      "title": "Commencez gratuitement, changez de formule quand votre liste grandit",
      "lead": "La formule gratuite comprend 1 source et jusqu'à 100 abonnés. Les formules payantes ajoutent plus de sources et plus d'abonnés."
    },
    "faqTitle": "Questions fréquentes avant de commencer",
    "faq": [
      {
        "id": "what-do-i-need",
        "q": "De quoi ai-je besoin pour commencer ?",
        "a": "L'adresse de votre site et une adresse e-mail. AIBAN lit votre site pour connaître vos sujets et votre façon d'écrire."
      },
      {
        "id": "do-i-write",
        "q": "Dois-je écrire quelque chose ?",
        "a": "Ce n'est pas nécessaire. AIBAN rédige chaque numéro à partir de votre contenu. Si vous voulez un numéro sur un sujet précis, vous pouvez coller un lien ou un texte."
      },
      {
        "id": "languages",
        "q": "Dans quelles langues mes lecteurs peuvent-ils la recevoir ?",
        "a": "AIBAN traduit chaque numéro dans la langue que lit chaque abonné. Vous voyez la liste complète des langues lors de la configuration de votre newsletter."
      },
      {
        "id": "sender",
        "q": "De qui viennent les e-mails ?",
        "a": "Depuis l'adresse d'envoi d'AIBAN, avec votre nom comme expéditeur. Les réponses arrivent directement dans votre boîte de réception. Vous ne nous donnez jamais le mot de passe de votre messagerie."
      },
      {
        "id": "contacts",
        "q": "Puis-je importer mes contacts existants ?",
        "a": "Oui. Importez un fichier CSV ou Excel, ou collez une liste. AIBAN la nettoie, supprime les doublons et devine la langue de chaque contact."
      },
      {
        "id": "schedule",
        "q": "À quelle fréquence les numéros sont-ils envoyés ?",
        "a": "Vous choisissez le rythme lors de la configuration et pouvez le modifier à tout moment dans votre tableau de bord."
      },
      {
        "id": "free-plan",
        "q": "Existe-t-il une formule gratuite ?",
        "a": "Oui. La formule gratuite comprend 1 source et jusqu'à 100 abonnés. Les formules payantes ajoutent plus de sources et d'abonnés."
      },
      {
        "id": "cancel",
        "q": "Puis-je résilier ?",
        "a": "Oui. Écrivez à info@aiban.news à tout moment et nous annulerons votre formule payante ou vous remettrons sur la formule gratuite."
      }
    ],
    "finalCta": {
      "title": "Commencez avec votre site",
      "body": "Indiquez votre site à AIBAN, vérifiez votre premier numéro, puis activez-le quand vous êtes prêt.",
      "cta": "Commencer gratuitement",
      "secondary": "Lire le centre d'aide"
    },
    "footer": {
      "tagline": "Des newsletters écrites à partir de votre propre contenu et envoyées dans la langue de chaque lecteur.",
      "product": "Produit",
      "company": "Entreprise",
      "legal": "Mentions légales",
      "links": {
        "howItWorks": "Comment ça marche",
        "pricing": "Tarifs",
        "demo": "Démo",
        "help": "Centre d'aide",
        "about": "À propos",
        "careers": "Carrières",
        "privacy": "Politique de confidentialité",
        "terms": "Conditions d'utilisation",
        "cookies": "Politique relative aux cookies"
      },
      "contactLabel": "Contact",
      "rights": "Tous droits réservés."
    }
  },
  "help": {
    "title": "Demander des limites plus élevées",
    "subtitle": "Indiquez-nous les limites dont vous avez besoin et nous vous répondrons par e-mail.",
    "contact": {
      "cta": "Envoyer la demande",
      "successTitle": "Demande prête à envoyer",
      "successBody": "Votre application de messagerie s'est ouverte avec votre demande. Envoyez-la depuis celle-ci et nous vous répondrons par e-mail.",
      "learnMore": "/plans"
    },
    "questions": {
      "desiredLimitsHelp": "Indiquez les limites dont vous avez besoin, par exemple le nombre d'abonnés et de sources.",
      "useCaseHelp": "Décrivez ce que vous envoyez, à qui et à quelle fréquence.",
      "expectedSpendHelp": "Une estimation approximative nous aide à vous proposer une formule. Vous pouvez laisser « inconnu »."
    },
    "form": {
      "nameLabel": "Nom",
      "emailLabel": "E-mail",
      "companyLabel": "Entreprise",
      "optional": "(facultatif)",
      "limitsLabel": "Limites dont vous avez besoin",
      "useCaseLabel": "Votre utilisation d'AIBAN",
      "spendLabel": "Budget mensuel prévu",
      "spend": {
        "lt500": "Moins de 500 $",
        "500_2k": "De 500 $ à 2 000 $",
        "2k_10k": "De 2 000 $ à 10 000 $",
        "gt10k": "Plus de 10 000 $",
        "unknown": "Je ne sais pas encore"
      },
      "urgencyLabel": "Urgence",
      "urgency": {
        "low": "Faible",
        "normal": "Normale",
        "high": "Élevée"
      },
      "replyLabel": "Comment souhaitez-vous que nous répondions ?",
      "reply": {
        "email": "Par e-mail",
        "call": "Par téléphone"
      },
      "payAsYouGo": "Je suis intéressé par un paiement à l'usage",
      "sending": "Envoi...",
      "sentTitle": "Demande envoyée",
      "sentBody": "Nous avons reçu votre demande et répondrons à l'adresse e-mail indiquée.",
      "retryBefore": "Si votre messagerie ne s'est pas ouverte,",
      "retryLink": "rouvrez la demande",
      "retryAfter": "ou écrivez à",
      "errors": {
        "name": "Saisissez votre nom (au moins 2 caractères).",
        "email": "Saisissez une adresse e-mail à laquelle nous pouvons répondre, par exemple nom@exemple.com.",
        "company": "Saisissez au moins 2 caractères, ou laissez ce champ vide.",
        "desiredLimits": "Décrivez les limites dont vous avez besoin en au moins 10 caractères.",
        "useCase": "Décrivez votre utilisation en au moins 20 caractères."
      }
    },
    "faqs": [
      {
        "id": "limits-how",
        "q": "Comment fonctionnent les limites plus élevées ?",
        "a": "Envoyez une demande avec les limites dont vous avez besoin. Nous vous répondons par e-mail avec les options pour votre compte."
      }
    ],
    "links": {
      "docs": "/plans",
      "community": "/help"
    }
  },
  "faq": [
    {
      "q": "Que fait AIBAN ?",
      "a": "AIBAN lit le contenu que vous publiez déjà, comme votre site, votre blog ou des sites d'actualité de votre choix. Il rédige de nouveaux numéros avec votre ton et les envoie sous forme de newsletter. Chaque abonné la reçoit dans la langue qu'il a choisie, avec votre nom comme expéditeur."
    },
    {
      "q": "Existe-t-il une formule gratuite ?",
      "a": "Oui. La formule gratuite comprend 1 source et jusqu'à 100 abonnés. Si vous avez besoin de plus, écrivez-nous et nous changerons votre formule."
    },
    {
      "q": "Comment les abonnés reçoivent-ils la newsletter dans leur langue ?",
      "a": "Chaque abonné choisit une langue préférée lors de son inscription. AIBAN traduit chaque numéro dans cette langue avant de l'envoyer."
    },
    {
      "q": "Les numéros peuvent-ils partir de ma propre adresse e-mail ?",
      "a": "Les numéros partent de l'adresse d'envoi d'AIBAN avec votre nom et votre signature e-mail, et les réponses arrivent dans votre boîte de réception. Nous ne vous demandons pas le mot de passe de votre messagerie, il n'y a donc rien de vous qui puisse fuiter."
    },
    {
      "q": "Comment les gens s'inscrivent-ils ?",
      "a": "Vous disposez d'une page d'inscription et d'un widget d'inscription à placer sur votre site. Vous pouvez aussi ajouter des personnes vous-même ou importer une liste."
    },
    {
      "q": "Puis-je résilier à tout moment ?",
      "a": "Oui. Écrivez à info@aiban.news à tout moment et nous annulerons votre formule payante ou vous remettrons sur la formule gratuite."
    }
  ],
  "plans": {
    "currency": "USD",
    "billingIntervals": [
      "mensuel",
      "annuel"
    ],
    "currentPlan": "free",
    "plans": [
      {
        "id": "free",
        "name": "Gratuit",
        "monthly": 0,
        "yearly": 0,
        "tagline": "Essayez AIBAN avec une source",
        "featuresBase": [
          "1 source",
          "Jusqu'à 100 abonnés"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": 1,
          "users": 100
        },
        "ctaLabel": "Formule actuelle",
        "tier": 0
      },
      {
        "id": "starter",
        "name": "Starter",
        "monthly": 17,
        "yearly": 132,
        "tagline": "Pour les newsletters en croissance",
        "featuresBase": [
          "5 sources",
          "Jusqu'à 100 k abonnés"
        ],
        "featuresDelta": [
          "Support e-mail",
          "Traduction de base"
        ],
        "limits": {
          "newsSources": 5,
          "users": 100000
        },
        "ctaLabel": "Choisir Starter",
        "productId": "prod_starter_id",
        "tier": 1
      },
      {
        "id": "growth",
        "name": "Growth",
        "monthly": 35,
        "yearly": 273,
        "tagline": "Pour les newsletters déjà installées",
        "featuresBase": [
          "17 sources",
          "Jusqu'à 250 k abonnés"
        ],
        "featuresDelta": [
          "Branding personnalisé",
          "Analyses avancées"
        ],
        "limits": {
          "newsSources": 17,
          "users": 250000
        },
        "ctaLabel": "Choisir Growth",
        "productId": "prod_growth_id",
        "tier": 2
      },
      {
        "id": "pro",
        "name": "Pro",
        "monthly": 80,
        "yearly": 624,
        "tagline": "Pour les professionnels du marketing",
        "featuresBase": [
          "25 sources",
          "Jusqu'à 500 k abonnés"
        ],
        "featuresDelta": [
          "Accès à l'API",
          "Traitement prioritaire"
        ],
        "limits": {
          "newsSources": 25,
          "users": 500000
        },
        "ctaLabel": "Choisir Pro",
        "productId": "prod_pro_id",
        "tier": 3
      },
      {
        "id": "master",
        "name": "Master",
        "monthly": 150,
        "yearly": 1170,
        "tagline": "Pour les grandes audiences",
        "featuresBase": [
          "50 sources",
          "Abonnés illimités"
        ],
        "featuresDelta": [
          "Support VIP",
          "Webhooks personnalisés"
        ],
        "limits": {
          "newsSources": 50,
          "users": -1
        },
        "ctaLabel": "Choisir Master",
        "productId": "prod_master_id",
        "tier": 4
      },
      {
        "id": "vipfree",
        "name": "VIP Gratuit",
        "monthly": 0,
        "yearly": 0,
        "tagline": "Accès complet pour les partenaires",
        "featuresBase": [
          "Sources illimitées",
          "Abonnés illimités"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": -1,
          "users": -1
        },
        "ctaLabel": "Formule actuelle",
        "internalOnly": true,
        "tier": 5
      }
    ],
    "contact": {
      "text": "Besoin d'une solution sur mesure ?",
      "cta": "Nous contacter",
      "href": "/help"
    }
  },
  "article": {
    "notFound": "Article non trouvé.",
    "errorFetching": "Nous n'avons pas pu charger cet article. Rechargez la page dans une minute pour réessayer.",
    "noArticleSpecified": "Aucun article spécifié.",
    "goBack": "Retour",
    "loading": "Chargement..."
  },
  "pricing": {
    "eyebrow": "Tarification",
    "title": "Formules et tarifs",
    "currentPlan": "Formule actuelle :",
    "monthly": "Mensuel",
    "yearly": "Annuel",
    "yearlySave": "Économisez 35 %",
    "intervalLabel": "Période de facturation",
    "billedYearly": "facturé annuellement",
    "perMonthShort": "/mo",
    "perYearShort": "/yr",
    "freeCta": "Commencer gratuitement",
    "processing": "Ouverture du paiement...",
    "askMore": "Chaque compte démarre sur la formule Gratuit. Si vous avez besoin de plus, écrivez-nous à {email} et nous changerons votre formule.",
    "askFor": "Demander {planName}",
    "askAction": "Nous écrire",
    "checkoutError": "Nous n'avons pas pu ouvrir le paiement. Réessayez dans un instant.",
    "networkError": "Nous n'avons pas pu joindre le serveur. Vérifiez votre connexion et réessayez.",
    "includes": "Comprend",
    "pageMetaTitle": "Tarifs | AIBAN",
    "pageMetaDescription": "Formules et tarifs d'AIBAN. Commencez gratuitement avec 1 source et jusqu'à 100 abonnés, puis passez à une formule mensuelle ou annuelle quand vous avez besoin de plus.",
    "pageTitle": "Tarifs",
    "pageLead": "Commencez avec la formule gratuite : 1 source et jusqu'à 100 abonnés. Quand il vous faut plus de sources ou d'abonnés, écrivez-nous et nous vous passerons sur une formule payante, facturée au mois ou à l'année.",
    "faqTitle": "Questions sur la facturation",
    "contactText": "Besoin de limites plus élevées ou d'une configuration sur mesure ?",
    "contactCta": "Nous contacter",
    "everythingIn": "Tout ce qui est dans le plan précédent, plus :",
    "isCurrentPlan": "Ceci est votre plan actuel",
    "downgradeTo": "Passer à {planName}",
    "upgradeTo": "Choisir {planName}",
    "mockMode": "Mode test",
    "mostPopular": "La plus choisie",
    "perMonth": "par mois",
    "perYear": "par an",
    "youSave": "Vous économisez"
  },
  "confirmSubscription": {
    "title": "Confirmez votre inscription",
    "goBack": "Retour",
    "pleaseAccept": "Veuillez accepter les conditions pour finaliser votre abonnement.",
    "iAccept": "J'accepte les",
    "termsAndConditions": "Conditions générales",
    "and": "et la",
    "privacyPolicy": "Politique de confidentialité",
    "confirm": "Confirmer l'abonnement",
    "mustAccept": "Vous devez accepter les conditions pour vous abonner.",
    "invalidLink": "Ce lien de confirmation est incomplet. Ouvrez le dernier e-mail que nous vous avons envoyé et utilisez le lien qu'il contient."
  },
  "articles": {
    "title": "Derniers articles",
    "subtitle": "Articles rédigés par AIBAN pour les newsletters qu'il envoie.",
    "producedIn": "Langues dans lesquelles ces articles sont disponibles",
    "searchPlaceholder": "Rechercher des articles...",
    "noArticlesFound": "Aucun article trouvé.",
    "created": "Créé le :",
    "language": "Langue :",
    "rightsReserved": "Tous droits réservés.",
    "errorFetching": "Nous n'avons pas pu charger les articles. Rechargez la page dans une minute pour réessayer."
  },
  "blog": {
    "metaTitle": "Blog de {name}",
    "metaDescription": "Articles de {name}. Abonnez-vous pour recevoir les nouveaux par e-mail.",
    "eyebrow": "Blog de la newsletter",
    "heroFrom": "Articles de {name}",
    "heroDescription": "Voici les articles publiés par cette newsletter. Abonnez-vous pour recevoir les nouveaux par e-mail.",
    "subscribe": "S'abonner",
    "home": "Accueil du blog",
    "featured": "Dernier article",
    "latest": "Derniers articles",
    "latestHint": "Les plus récents d'abord. Certains articles n'ont pas d'image et s'affichent uniquement en texte.",
    "articleCount": "{count} articles en {language}",
    "articleCountOne": "1 article en {language}",
    "languages": "Choisissez une langue",
    "minRead": "{n} min de lecture",
    "readArticle": "Lire l'article",
    "page": "Page {page}",
    "newer": "Articles plus récents",
    "older": "Articles plus anciens",
    "pagination": "Pages d'articles",
    "emptyTitle": "Aucun article pour l'instant",
    "emptyBody": "Cette newsletter n'a encore publié aucun article ici. Abonnez-vous pour recevoir le premier par e-mail.",
    "endTitle": "Aucun article plus ancien",
    "endBody": "Vous êtes arrivé à la fin de la liste.",
    "backToNewest": "Aller aux articles les plus récents",
    "errorTitle": "Nous n'avons pas pu charger ces articles",
    "errorBody": "Le serveur d'articles n'a pas répondu à temps. Rechargez la page dans une minute pour réessayer.",
    "reload": "Recharger la page",
    "missingHolder": "Ce lien de blog est incomplet, car il n'indique pas quel blog ouvrir. Demandez le lien complet au propriétaire de la newsletter.",
    "redirecting": "Ouverture du blog...",
    "publishedWith": "Publié avec AIBAN",
    "cta": {
      "title": "Recevez le prochain article par e-mail",
      "body": "Abonnez-vous à {name} et les nouveaux articles arriveront dans votre boîte de réception. Vous pouvez vous désabonner à tout moment.",
      "button": "S'abonner"
    },
    "search": {
      "label": "Rechercher des articles",
      "placeholder": "Rechercher un mot ou une expression",
      "button": "Rechercher",
      "suggestions": "Suggestions",
      "recent": "Recherches récentes",
      "clearRecent": "Effacer les recherches récentes",
      "title": "Résultats de recherche",
      "resultsFor": "Résultats pour « {q} »",
      "count": "{count} articles trouvés",
      "countOne": "1 article trouvé",
      "searching": "Recherche d'articles",
      "emptyTitle": "Aucun article ne correspond à « {q} »",
      "emptyBody": "Vérifiez l'orthographe ou essayez un mot plus court. Vous pouvez aussi parcourir tous les articles du blog.",
      "browseAll": "Parcourir tous les articles",
      "noQuery": "Saisissez un mot ou une expression ci-dessus pour rechercher dans ce blog.",
      "error": "La recherche s'est arrêtée, car le serveur d'articles n'a pas répondu. Réessayez dans une minute.",
      "tryAgain": "Réessayer",
      "limitNote": "Affichage des {count} premiers résultats. Utilisez une expression plus précise pour affiner la liste."
    },
    "article": {
      "back": "Tous les articles",
      "published": "Publié le {date}",
      "by": "Par {name}",
      "otherLanguages": "Lire dans d'autres langues",
      "otherLanguagesHint": "Cette newsletter publie aussi dans ces langues. Chaque lien ouvre le blog dans la langue correspondante.",
      "share": "Partager cet article",
      "copyLink": "Copier le lien",
      "copied": "Lien copié. Vous pouvez le coller où vous voulez.",
      "copyFailed": "Impossible de copier le lien. Copiez-le depuis la barre d'adresse de votre navigateur.",
      "notFoundTitle": "Article introuvable",
      "notFoundBody": "Cet article a peut-être été supprimé, ou le lien est incomplet. Ouvrez le blog pour voir les autres articles.",
      "errorTitle": "Nous n'avons pas pu charger cet article",
      "errorBody": "Le serveur d'articles n'a pas répondu à temps. Rechargez la page dans une minute pour réessayer.",
      "goToBlog": "Aller au blog"
    }
  },
  "nav": {
    "mainLabel": "Principal",
    "legalLabel": "Mentions légales",
    "home": "Accueil AIBAN",
    "menu": "Menu",
    "openMenu": "Ouvrir le menu",
    "closeMenu": "Fermer le menu",
    "howItWorks": "Comment ça marche",
    "pricing": "Tarifs",
    "help": "Aide",
    "about": "À propos",
    "privacy": "Confidentialité",
    "terms": "Conditions",
    "cookies": "Cookies",
    "signOut": "Se déconnecter",
    "chooseLanguage": "Choisir une langue",
    "currentLanguage": "Langue : {name}"
  },
  "about": {
    "metaTitle": "À propos | AIBAN",
    "metaDescription": "AIBAN transforme le contenu qu'une entreprise publie déjà en une newsletter qui part toute seule, dans la langue de chaque abonné, sous le nom du dirigeant.",
    "eyebrow": "À propos",
    "title": "À propos d'AIBAN",
    "lead": "AIBAN transforme le contenu qu'une entreprise publie déjà en une newsletter qui part toute seule. Chaque abonné la lit dans sa propre langue, et elle arrive sous le nom du dirigeant.",
    "whatTitle": "Ce que fait AIBAN",
    "whatBody": [
      "Vous indiquez à AIBAN où se trouve votre contenu : votre site, votre blog ou des sites d'actualité que vous suivez. Quand quelque chose de nouveau y apparaît, AIBAN en tire un numéro avec la voix que vous avez décrite et l'envoie à vos abonnés au rythme que vous avez choisi.",
      "Chaque abonné choisit une langue lors de son inscription, et chaque numéro est traduit dans cette langue avant l'envoi. Les articles sont aussi publiés comme pages web, et vous pouvez les envoyer vers votre propre site."
    ],
    "whoTitle": "Qui le développe",
    "whoBody": [
      "AIBAN est développé par Luis Murillo Baltodano, son fondateur. Luis est un ingénieur créatif spécialisé en infographie et en automatisation.",
      "Une partie de ses projets open source est présentée ci-dessous."
    ],
    "projectsTitle": "Projets open source du fondateur",
    "projects": [
      {
        "name": "Scene Preset",
        "url": "https://github.com/LuisArmando-TestCoder/scene-preset",
        "desc": "Une bibliothèque qui supprime le code répétitif quand on travaille avec Three.js et les API web 3D."
      },
      {
        "name": "Canvas Preset",
        "url": "https://github.com/LuisArmando-TestCoder/canvas-preset",
        "desc": "Des utilitaires pour les tâches courantes avec l'API Canvas."
      },
      {
        "name": "Modèle Atomic Gatsby",
        "url": "https://github.com/LuisArmando-TestCoder/atomic-gatsby-typescript-recoiljs",
        "desc": "Un modèle de départ organisé selon l'atomic design."
      }
    ],
    "githubLabel": "Luis sur GitHub",
    "newTab": "(s'ouvre dans un nouvel onglet)",
    "contactTitle": "Nous contacter",
    "contactBody": "Pour vos questions, vos retours ou vos idées de partenariat, écrivez à info@aiban.news.",
    "emailCta": "Écrire à info@aiban.news",
    "startCta": "Commencer gratuitement",
    "helpCta": "Lire le centre d'aide"
  },
  "careers": {
    "metaTitle": "Carrières | AIBAN",
    "metaDescription": "AIBAN n'a aucun poste ouvert pour le moment. Vous pouvez tout de même nous écrire à info@aiban.news.",
    "eyebrow": "Carrières",
    "title": "Carrières chez AIBAN",
    "lead": "AIBAN n'a aucun poste ouvert pour le moment.",
    "body": "Quand un poste s'ouvrira, il sera publié sur cette page. Si vous souhaitez travailler sur AIBAN plus tard, envoyez un court message sur vous et sur ce que vous aimeriez construire.",
    "emailCta": "Écrire à info@aiban.news",
    "emailSubject": "Travailler sur AIBAN",
    "aboutCta": "En savoir plus sur AIBAN"
  },
  "legal": {
    "navLabel": "Documents juridiques",
    "lastUpdated": "Dernière mise à jour : {date}",
    "privacy": {
      "title": "Politique de confidentialité",
      "metaTitle": "Politique de confidentialité | AIBAN",
      "metaDescription": "Comment AIBAN collecte, utilise et protège vos données, et comment exercer vos droits sur celles-ci."
    },
    "terms": {
      "title": "Conditions d'utilisation",
      "metaTitle": "Conditions d'utilisation | AIBAN",
      "metaDescription": "Les conditions qui s'appliquent lorsque vous créez un compte et utilisez AIBAN."
    },
    "cookies": {
      "title": "Politique relative aux cookies",
      "metaTitle": "Politique relative aux cookies | AIBAN",
      "metaDescription": "Les cookies qu'utilise AIBAN, leur rôle, leur durée et comment vous pouvez les contrôler."
    }
  },
  "demoPage": {
    "metaTitle": "Démo | AIBAN",
    "metaDescription": "Regardez une présentation d'AIBAN et découvrez ce qui se passe après l'inscription, de l'ajout de votre site à l'envoi de votre premier numéro.",
    "eyebrow": "Démo",
    "title": "Découvrez comment fonctionne AIBAN",
    "lead": "Regardez la présentation, puis lisez ce qui se passe après l'inscription.",
    "videoTitle": "Vidéo de présentation d'AIBAN",
    "playLabel": "Lire la vidéo de présentation",
    "videoNote": "La vidéo est lue depuis YouTube.",
    "stepsTitle": "Ce qui se passe après l'inscription",
    "steps": [
      {
        "title": "Ajoutez votre site",
        "body": "Saisissez l'adresse de votre site, de votre blog ou d'un site d'actualité que vous suivez. AIBAN le consulte pour y trouver du nouveau contenu."
      },
      {
        "title": "Décrivez vos lecteurs et votre voix",
        "body": "Indiquez à AIBAN qui lit votre newsletter et quel ton elle doit avoir. Vous pouvez aussi le laisser proposer une description à partir de votre site."
      },
      {
        "title": "Choisissez un rythme",
        "body": "Choisissez la fréquence d'envoi des numéros. Vous pourrez la modifier plus tard dans votre tableau de bord."
      },
      {
        "title": "Ajoutez des abonnés",
        "body": "Importez une liste, ajoutez des personnes une par une ou partagez votre page et votre widget d'inscription. Chaque abonné choisit une langue."
      },
      {
        "title": "Ajoutez votre nom d'expéditeur et votre signature",
        "body": "Ajoutez le nom et la signature e-mail que verront les lecteurs. AIBAN envoie chaque numéro depuis son adresse vérifiée sous votre nom, et les réponses arrivent dans votre boîte de réception."
      }
    ],
    "ctaTitle": "Essayez avec votre propre site",
    "ctaBody": "La formule gratuite comprend 1 source et jusqu'à 100 abonnés.",
    "primaryCta": "Commencer gratuitement",
    "secondaryCta": "Voir les tarifs"
  },
  "helpCenter": {
    "metaTitle": "Aide | AIBAN",
    "metaDescription": "Réponses sur la configuration d'AIBAN : sources, langues, envoi sous votre nom, abonnés, widget d'inscription, blog et facturation.",
    "eyebrow": "Centre d'aide",
    "title": "Comment pouvons-nous vous aider ?",
    "lead": "Trouvez des réponses sur la configuration et la gestion de votre newsletter. Si vous ne trouvez pas ce qu'il vous faut, écrivez-nous.",
    "searchLabel": "Rechercher dans le centre d'aide",
    "searchPlaceholder": "Essayez langue, widget ou résilier",
    "clearSearch": "Effacer la recherche",
    "resultsCount": "{count} réponses correspondent à votre recherche.",
    "noResults": "Aucune réponse ne correspond à votre recherche. Essayez un autre mot ou écrivez à info@aiban.news.",
    "topicsLabel": "Rubriques",
    "copyLink": "Copier le lien",
    "linkCopied": "Lien copié",
    "contactTitle": "Besoin d'aide supplémentaire ?",
    "contactBody": "Écrivez à info@aiban.news en indiquant l'adresse e-mail utilisée lors de votre inscription.",
    "emailCta": "Écrire à info@aiban.news",
    "limitsTitle": "Demander des limites plus élevées",
    "limitsBody": "Indiquez-nous les limites dont vous avez besoin et nous vous répondrons par e-mail. Si la demande ne peut pas partir depuis cette page, votre messagerie s'ouvre avec la demande déjà remplie pour que vous nous l'envoyiez.",
    "faqFilterLabel": "Filtrer les questions",
    "faqNoMatch": "Aucune question ne correspond à votre filtre.",
    "groups": [
      {
        "id": "getting-started",
        "title": "Premiers pas",
        "items": [
          {
            "id": "what-is-aiban",
            "q": "Qu'est-ce qu'AIBAN ?",
            "a": "AIBAN transforme le contenu que vous publiez déjà en une newsletter régulière. Il lit votre site, votre blog ou des sites d'actualité de votre choix, rédige de nouveaux numéros avec votre voix et les envoie à vos abonnés. Chaque abonné la lit dans la langue qu'il a choisie."
          },
          {
            "id": "how-to-start",
            "q": "Comment commencer ?",
            "a": "Créez un compte sur la page d'inscription. La configuration vous demande l'adresse de votre site et quelques informations sur vos lecteurs. Ensuite, vous pouvez ajouter des abonnés et tout gérer depuis votre tableau de bord."
          },
          {
            "id": "change-settings",
            "q": "Puis-je modifier ma configuration plus tard ?",
            "a": "Oui. Vous pouvez modifier plus tard les sources, le calendrier, les informations d'expéditeur et les abonnés dans votre tableau de bord. Pour changer de formule, écrivez à info@aiban.news."
          }
        ]
      },
      {
        "id": "sources",
        "title": "Sources et contenu",
        "items": [
          {
            "id": "what-is-a-source",
            "q": "Que puis-je utiliser comme source ?",
            "a": "Une source est une adresse web qu'AIBAN consulte pour y trouver du nouveau contenu, comme votre site, votre blog ou un site d'actualité que vous suivez. Vous ajoutez les sources dans votre tableau de bord. Leur nombre dépend de votre formule."
          },
          {
            "id": "how-often",
            "q": "À quelle fréquence ma newsletter est-elle envoyée ?",
            "a": "Vous choisissez la fréquence de publication lorsque vous configurez une source. Vous pouvez modifier ce rythme plus tard dans votre tableau de bord."
          },
          {
            "id": "your-voice",
            "q": "Comment AIBAN écrit-il avec ma voix ?",
            "a": "Vous décrivez la personnalité de votre newsletter, ou vous laissez AIBAN générer une description pour vous. Les numéros sont rédigés selon cette description. Vous pouvez la modifier à tout moment dans votre tableau de bord."
          }
        ]
      },
      {
        "id": "languages",
        "title": "Langues",
        "items": [
          {
            "id": "subscriber-language",
            "q": "Comment les abonnés reçoivent-ils la newsletter dans leur langue ?",
            "a": "Chaque abonné choisit une langue préférée lors de son inscription. AIBAN traduit chaque numéro dans cette langue avant de l'envoyer."
          },
          {
            "id": "site-language",
            "q": "Puis-je utiliser le site dans ma langue ?",
            "a": "Oui. Utilisez le bouton de langue en bas à droite de l'écran pour changer la langue du site et du tableau de bord."
          }
        ]
      },
      {
        "id": "sending",
        "title": "Envoi sous votre nom",
        "items": [
          {
            "id": "own-address",
            "q": "Les numéros peuvent-ils partir de ma propre adresse e-mail ?",
            "a": "Les numéros partent de l'adresse d'envoi d'AIBAN avec votre nom d'expéditeur et votre signature e-mail, et les réponses arrivent dans votre boîte de réception. Nous ne vous demandons pas le mot de passe de votre messagerie, il n'y a donc rien de vous qui puisse fuiter."
          },
          {
            "id": "app-password",
            "q": "Dois-je donner à AIBAN le mot de passe de ma messagerie ?",
            "a": "Non. AIBAN ne vous demande jamais le mot de passe de votre messagerie ni un mot de passe d'application. Les numéros partent de l'adresse d'AIBAN sous votre nom, et les réponses vous parviennent."
          }
        ]
      },
      {
        "id": "subscribers",
        "title": "Abonnés et widget d'inscription",
        "items": [
          {
            "id": "add-subscribers",
            "q": "Comment ajouter des abonnés ?",
            "a": "Vous pouvez ajouter des personnes une par une dans votre tableau de bord ou importer un fichier contenant votre liste. Les gens peuvent aussi s'inscrire via votre page d'inscription ou le widget d'inscription."
          },
          {
            "id": "signup-widget",
            "q": "Qu'est-ce que le widget d'inscription ?",
            "a": "Le widget est un formulaire d'inscription que vous pouvez placer sur votre propre site. Les visiteurs saisissent leur adresse e-mail, choisissent leur langue et rejoignent votre liste."
          },
          {
            "id": "subscriber-limit",
            "q": "Le nombre d'abonnés est-il limité ?",
            "a": "Chaque formule a sa propre limite d'abonnés. La formule gratuite comprend jusqu'à 100 abonnés. La page des tarifs indique les limites des autres formules."
          }
        ]
      },
      {
        "id": "blog",
        "title": "Blog",
        "items": [
          {
            "id": "blog-pages",
            "q": "Les articles de ma newsletter sont-ils publiés sur le web ?",
            "a": "Oui. Les articles qu'AIBAN rédige pour votre newsletter sont aussi publiés comme pages web, pour qu'on puisse les lire en dehors de sa boîte de réception."
          },
          {
            "id": "post-to-site",
            "q": "Puis-je publier les articles sur mon propre site ?",
            "a": "Oui. Dans votre tableau de bord, vous pouvez configurer un webhook qui envoie chaque article de la newsletter vers votre site sous forme d'article. Cela fonctionne avec WordPress et avec toute plateforme qui accepte du contenu REST standard."
          }
        ]
      },
      {
        "id": "billing",
        "title": "Facturation",
        "items": [
          {
            "id": "free-plan",
            "q": "Existe-t-il une formule gratuite ?",
            "a": "Oui. La formule gratuite comprend 1 source et jusqu'à 100 abonnés. Vous pouvez passer à une formule payante quand vous avez besoin de plus."
          },
          {
            "id": "monthly-yearly",
            "q": "Puis-je payer au mois ou à l'année ?",
            "a": "Oui. Les formules payantes sont facturées au mois ou à l'année. Le prix annuel est inférieur de 35 % à 12 mois payés au mois. Écrivez à info@aiban.news pour choisir une formule."
          },
          {
            "id": "cancel",
            "q": "Puis-je résilier à tout moment ?",
            "a": "Oui. Écrivez à info@aiban.news à tout moment et nous annulerons votre formule payante ou vous remettrons sur la formule gratuite."
          },
          {
            "id": "higher-limits",
            "q": "Et si j'ai besoin de plus que la formule la plus grande ?",
            "a": "Utilisez le formulaire de demande de la page d'aide pour nous indiquer les limites dont vous avez besoin. Nous vous répondons par e-mail."
          }
        ]
      }
    ]
  },
  "mainPage": {
    "skipToMainContent": "Passer au contenu principal",
    "dismissAnnouncement": "Masquer l'annonce",
    "problem": "Problème :",
    "outcome": "Résultat :",
    "disclaimer": "L'économie de 35% s'applique uniquement à la facturation annuelle."
  },
  "authForm": {
    "emailValidation": "Saisissez une adresse e-mail, par exemple nom@exemple.com.",
    "failedToSendCode": "Nous n'avons pas pu envoyer le code. Vérifiez l'adresse e-mail et réessayez dans une minute.",
    "sending": "Envoi en cours...",
    "codeSent": "Nous avons envoyé un code à votre adresse e-mail.",
    "invalidCode": "Ce code n'est pas correct. Consultez le dernier e-mail que nous vous avons envoyé ou demandez un nouveau code.",
    "regenerateCode": "Renvoyer le code",
    "back": "Retour",
    "byProceeding": "En continuant, vous acceptez les",
    "termsOfService": "Conditions d'utilisation",
    "and": "et la",
    "privacyPolicy": "Politique de confidentialité",
    "appName": "AI Newsletter"
  },
  "welcome": {
    "title": "Générateur automatique de newsletters",
    "setItOnce": "Configurez-le une fois.",
    "useItForever": "Ensuite, il continue tout seul."
  },
  "lead": {
    "title": "Transformez vos abonnés en visiteurs",
    "recommendation": "Aidez notre IA à comprendre votre marque en connectant votre site web.",
    "question": "Avez-vous un site web ? (facultatif, vous pourrez l'ajouter plus tard)",
    "placeholder": "https://votre-site.com"
  },
  "newsSource": {
    "title": "Connectez votre source de contenu",
    "subtitle": "Nous récupérerons votre flux pour que vous n'ayez pas à partir de zéro.",
    "placeholder": "Votre blog ou lien RSS"
  },
  "subscribe": {
    "welcome": {
      "title": "Bienvenue dans la newsletter.",
      "invitedBy": "Vous avez été invité par {configuratorId}."
    }
  },
  "header": {
    "goToWorkspace": "Ouvrir le tableau de bord",
    "inBilling": "Tarifs",
    "vip": "VIP",
    "plan": "Plan {planName}",
    "logIn": "Se connecter",
    "getStarted": "Commencer gratuitement"
  },
  "fileInput": {
    "chooseFile": "Choisir un fichier",
    "dropFile": "Déposez ici",
    "release": "Relâchez pour télécharger"
  },
  "billing": {
    "title": "Facturation et abonnement",
    "currentPlanTitle": "Votre formule actuelle",
    "upgradePlanTitle": "Changer de formule",
    "manageSubscription": "Gérer l'abonnement",
    "vipPlanName": "Partenaire VIP",
    "vipPlanDescription": "Accès illimité offert par AIBAN.",
    "perMonth": "par mois",
    "perYear": "par an",
    "monthAbbreviation": "m",
    "equivalentTo": "équivalent à",
    "mostPopular": "La plus choisie",
    "upgradeTo": "Passer à",
    "downgradeTo": "Basculer vers",
    "currentPlanButton": "Votre formule",
    "youSave": "Économisez",
    "users": "utilisateurs",
    "newsSources": "sources d'actualités",
    "monthly": "Mensuel",
    "yearly": "Annuel",
    "loadingPlan": "Chargement des données du plan..."
  },
  "languages": [
    {
      "code": "ab",
      "name": "Abkhaze"
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
      "name": "Albanais"
    },
    {
      "code": "am",
      "name": "Amharique"
    },
    {
      "code": "ar",
      "name": "Arabe"
    },
    {
      "code": "an",
      "name": "Aragonais"
    },
    {
      "code": "hy",
      "name": "Arménien"
    },
    {
      "code": "as",
      "name": "Assamais"
    },
    {
      "code": "av",
      "name": "Avar"
    },
    {
      "code": "ae",
      "name": "Avestique"
    },
    {
      "code": "ay",
      "name": "Aymara"
    },
    {
      "code": "az",
      "name": "Azéri"
    },
    {
      "code": "bm",
      "name": "Bambara"
    },
    {
      "code": "ba",
      "name": "Bachkir"
    },
    {
      "code": "eu",
      "name": "Basque"
    },
    {
      "code": "be",
      "name": "Biélorusse"
    },
    {
      "code": "bn",
      "name": "Bengali"
    },
    {
      "code": "bi",
      "name": "Bichelamar"
    },
    {
      "code": "bs",
      "name": "Bosnien"
    },
    {
      "code": "br",
      "name": "Breton"
    },
    {
      "code": "bg",
      "name": "Bulgare"
    },
    {
      "code": "my",
      "name": "Birman"
    },
    {
      "code": "ca",
      "name": "Catalan"
    },
    {
      "code": "ch",
      "name": "Chamorro"
    },
    {
      "code": "ce",
      "name": "Tchétchène"
    },
    {
      "code": "ny",
      "name": "Chichewa"
    },
    {
      "code": "zh",
      "name": "Chinois"
    },
    {
      "code": "cu",
      "name": "Vieux-slave"
    },
    {
      "code": "cv",
      "name": "Tchouvache"
    },
    {
      "code": "kw",
      "name": "Cornique"
    },
    {
      "code": "co",
      "name": "Corse"
    },
    {
      "code": "cr",
      "name": "Cri"
    },
    {
      "code": "hr",
      "name": "Croate"
    },
    {
      "code": "cs",
      "name": "Tchèque"
    },
    {
      "code": "da",
      "name": "Danois"
    },
    {
      "code": "dv",
      "name": "Divehi"
    },
    {
      "code": "nl",
      "name": "Néerlandais"
    },
    {
      "code": "dz",
      "name": "Dzongkha"
    },
    {
      "code": "en",
      "name": "Anglais"
    },
    {
      "code": "eo",
      "name": "Espéranto"
    },
    {
      "code": "et",
      "name": "Estonien"
    },
    {
      "code": "ee",
      "name": "Ewe"
    },
    {
      "code": "fo",
      "name": "Féroïen"
    },
    {
      "code": "fj",
      "name": "Fidjien"
    },
    {
      "code": "fi",
      "name": "Finnois"
    },
    {
      "code": "fr",
      "name": "Français"
    },
    {
      "code": "fy",
      "name": "Frison Occidental"
    },
    {
      "code": "ff",
      "name": "Peul"
    },
    {
      "code": "gd",
      "name": "Gaélique Écossais"
    },
    {
      "code": "gl",
      "name": "Galicien"
    },
    {
      "code": "lg",
      "name": "Ganda"
    },
    {
      "code": "ka",
      "name": "Géorgien"
    },
    {
      "code": "de",
      "name": "Allemand"
    },
    {
      "code": "el",
      "name": "Grec"
    },
    {
      "code": "kl",
      "name": "Kalaallisut (Groenlandais)"
    },
    {
      "code": "gn",
      "name": "Guarani"
    },
    {
      "code": "gu",
      "name": "Gujarati"
    },
    {
      "code": "ht",
      "name": "Créole Haïtien"
    },
    {
      "code": "ha",
      "name": "Haoussa"
    },
    {
      "code": "he",
      "name": "Hébreu"
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
      "name": "Hongrois"
    },
    {
      "code": "is",
      "name": "Islandais"
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
      "name": "Indonésien"
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
      "name": "Irlandais"
    },
    {
      "code": "it",
      "name": "Italien"
    },
    {
      "code": "ja",
      "name": "Japonais"
    },
    {
      "code": "jv",
      "name": "Javanais"
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
      "name": "Cachemiri"
    },
    {
      "code": "kk",
      "name": "Kazakh"
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
      "name": "Kirghize"
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
      "name": "Coréen"
    },
    {
      "code": "kj",
      "name": "Kuanyama"
    },
    {
      "code": "ku",
      "name": "Kurde"
    },
    {
      "code": "lo",
      "name": "Lao"
    },
    {
      "code": "la",
      "name": "Latin"
    },
    {
      "code": "lv",
      "name": "Letton"
    },
    {
      "code": "li",
      "name": "Limbourgeois"
    },
    {
      "code": "ln",
      "name": "Lingala"
    },
    {
      "code": "lt",
      "name": "Lituanien"
    },
    {
      "code": "lu",
      "name": "Luba-Katanga"
    },
    {
      "code": "lb",
      "name": "Luxembourgeois"
    },
    {
      "code": "mk",
      "name": "Macédonien"
    },
    {
      "code": "mg",
      "name": "Malgache"
    },
    {
      "code": "ms",
      "name": "Malais"
    },
    {
      "code": "ml",
      "name": "Malayalam"
    },
    {
      "code": "mt",
      "name": "Maltais"
    },
    {
      "code": "gv",
      "name": "Mannois"
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
      "name": "Marshallais"
    },
    {
      "code": "mn",
      "name": "Mongol"
    },
    {
      "code": "na",
      "name": "Nauruan"
    },
    {
      "code": "nv",
      "name": "Navajo"
    },
    {
      "code": "nd",
      "name": "Ndébélé du Nord"
    },
    {
      "code": "nr",
      "name": "Ndébélé du Sud"
    },
    {
      "code": "ng",
      "name": "Ndonga"
    },
    {
      "code": "ne",
      "name": "Népalais"
    },
    {
      "code": "no",
      "name": "Norvégien"
    },
    {
      "code": "nb",
      "name": "Norvégien Bokmål"
    },
    {
      "code": "nn",
      "name": "Norvégien Nynorsk"
    },
    {
      "code": "oc",
      "name": "Occitan"
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
      "name": "Ossète"
    },
    {
      "code": "pi",
      "name": "Pali"
    },
    {
      "code": "ps",
      "name": "Pachto"
    },
    {
      "code": "fa",
      "name": "Persan (Farsi)"
    },
    {
      "code": "pl",
      "name": "Polonais"
    },
    {
      "code": "pt",
      "name": "Portugais"
    },
    {
      "code": "pa",
      "name": "Pendjabi"
    },
    {
      "code": "qu",
      "name": "Quechua"
    },
    {
      "code": "ro",
      "name": "Roumain"
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
      "name": "Russe"
    },
    {
      "code": "se",
      "name": "Sami du Nord"
    },
    {
      "code": "sm",
      "name": "Samoan"
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
      "name": "Sarde"
    },
    {
      "code": "sr",
      "name": "Serbe"
    },
    {
      "code": "sn",
      "name": "Shona"
    },
    {
      "code": "ii",
      "name": "Yi de Sichuan"
    },
    {
      "code": "sd",
      "name": "Sindhi"
    },
    {
      "code": "si",
      "name": "Cingalais"
    },
    {
      "code": "sk",
      "name": "Slovaque"
    },
    {
      "code": "sl",
      "name": "Slovène"
    },
    {
      "code": "so",
      "name": "Somali"
    },
    {
      "code": "st",
      "name": "Sotho du Sud"
    },
    {
      "code": "es",
      "name": "Espagnol"
    },
    {
      "code": "su",
      "name": "Soundanais"
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
      "name": "Suédois"
    },
    {
      "code": "tl",
      "name": "Tagalog (Philippin)"
    },
    {
      "code": "ty",
      "name": "Tahitien"
    },
    {
      "code": "tg",
      "name": "Tadjik"
    },
    {
      "code": "ta",
      "name": "Tamoul"
    },
    {
      "code": "tt",
      "name": "Tatar"
    },
    {
      "code": "te",
      "name": "Télougou"
    },
    {
      "code": "th",
      "name": "Thaï"
    },
    {
      "code": "bo",
      "name": "Tibétain"
    },
    {
      "code": "ti",
      "name": "Tigrigna"
    },
    {
      "code": "to",
      "name": "Tongan"
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
      "name": "Turc"
    },
    {
      "code": "tk",
      "name": "Turkmène"
    },
    {
      "code": "tw",
      "name": "Twi"
    },
    {
      "code": "ug",
      "name": "Ouïghour"
    },
    {
      "code": "uk",
      "name": "Ukrainien"
    },
    {
      "code": "ur",
      "name": "Ourdou"
    },
    {
      "code": "uz",
      "name": "Ouzbek"
    },
    {
      "code": "ve",
      "name": "Venda"
    },
    {
      "code": "vi",
      "name": "Vietnamien"
    },
    {
      "code": "vo",
      "name": "Volapük"
    },
    {
      "code": "wa",
      "name": "Wallon"
    },
    {
      "code": "cy",
      "name": "Gallois"
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
      "name": "Zoulou"
    }
  ],
  "countries": [
    {
      "code": "AF",
      "name": "Afghanistan"
    },
    {
      "code": "AL",
      "name": "Albanie"
    },
    {
      "code": "DZ",
      "name": "Algérie"
    },
    {
      "code": "AS",
      "name": "Samoa Américaines"
    },
    {
      "code": "AD",
      "name": "Andorre"
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
      "name": "Antarctique"
    },
    {
      "code": "AG",
      "name": "Antigua-et-Barbuda"
    },
    {
      "code": "AR",
      "name": "Argentine"
    },
    {
      "code": "AM",
      "name": "Arménie"
    },
    {
      "code": "AW",
      "name": "Aruba"
    },
    {
      "code": "AU",
      "name": "Australie"
    },
    {
      "code": "AT",
      "name": "Autriche"
    },
    {
      "code": "AZ",
      "name": "Azerbaïdjan"
    },
    {
      "code": "BS",
      "name": "Bahamas"
    },
    {
      "code": "BH",
      "name": "Bahreïn"
    },
    {
      "code": "BD",
      "name": "Bangladesh"
    },
    {
      "code": "BB",
      "name": "Barbade"
    },
    {
      "code": "BY",
      "name": "Biélorussie"
    },
    {
      "code": "BE",
      "name": "Belgique"
    },
    {
      "code": "BZ",
      "name": "Belize"
    },
    {
      "code": "BJ",
      "name": "Bénin"
    },
    {
      "code": "BM",
      "name": "Bermudes"
    },
    {
      "code": "BT",
      "name": "Bhoutan"
    },
    {
      "code": "BO",
      "name": "Bolivie"
    },
    {
      "code": "BA",
      "name": "Bosnie-Herzégovine"
    },
    {
      "code": "BW",
      "name": "Botswana"
    },
    {
      "code": "BR",
      "name": "Brésil"
    },
    {
      "code": "IO",
      "name": "Territoire Britannique de l'Océan Indien"
    },
    {
      "code": "VG",
      "name": "Îles Vierges Britanniques"
    },
    {
      "code": "BN",
      "name": "Brunéi"
    },
    {
      "code": "BG",
      "name": "Bulgarie"
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
      "name": "Cambodge"
    },
    {
      "code": "CM",
      "name": "Cameroun"
    },
    {
      "code": "CA",
      "name": "Canada"
    },
    {
      "code": "CV",
      "name": "Cap-Vert"
    },
    {
      "code": "KY",
      "name": "Îles Caïmans"
    },
    {
      "code": "CF",
      "name": "République Centrafricaine"
    },
    {
      "code": "TD",
      "name": "Tchad"
    },
    {
      "code": "CL",
      "name": "Chili"
    },
    {
      "code": "CN",
      "name": "Chine"
    },
    {
      "code": "CX",
      "name": "Île Christmas"
    },
    {
      "code": "CC",
      "name": "Îles Cocos (Keeling)"
    },
    {
      "code": "CO",
      "name": "Colombie"
    },
    {
      "code": "KM",
      "name": "Comores"
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
      "name": "Îles Cook"
    },
    {
      "code": "CR",
      "name": "Costa Rica"
    },
    {
      "code": "CI",
      "name": "Côte d'Ivoire"
    },
    {
      "code": "HR",
      "name": "Croatie"
    },
    {
      "code": "CU",
      "name": "Cuba"
    },
    {
      "code": "CY",
      "name": "Chypre"
    },
    {
      "code": "CZ",
      "name": "Tchéquie"
    },
    {
      "code": "DK",
      "name": "Danemark"
    },
    {
      "code": "DJ",
      "name": "Djibouti"
    },
    {
      "code": "DM",
      "name": "Dominique"
    },
    {
      "code": "DO",
      "name": "République Dominicaine"
    },
    {
      "code": "EC",
      "name": "Équateur"
    },
    {
      "code": "EG",
      "name": "Égypte"
    },
    {
      "code": "SV",
      "name": "El Salvador"
    },
    {
      "code": "GQ",
      "name": "Guinée Équatoriale"
    },
    {
      "code": "ER",
      "name": "Érythrée"
    },
    {
      "code": "EE",
      "name": "Estonie"
    },
    {
      "code": "SZ",
      "name": "Eswatini"
    },
    {
      "code": "ET",
      "name": "Éthiopie"
    },
    {
      "code": "FJ",
      "name": "Fidji"
    },
    {
      "code": "FI",
      "name": "Finlande"
    },
    {
      "code": "FR",
      "name": "France"
    },
    {
      "code": "GA",
      "name": "Gabon"
    },
    {
      "code": "GM",
      "name": "Gambie"
    },
    {
      "code": "GE",
      "name": "Géorgie"
    },
    {
      "code": "DE",
      "name": "Allemagne"
    },
    {
      "code": "GH",
      "name": "Ghana"
    },
    {
      "code": "GR",
      "name": "Grèce"
    },
    {
      "code": "GT",
      "name": "Guatemala"
    },
    {
      "code": "GN",
      "name": "Guinée"
    },
    {
      "code": "GY",
      "name": "Guyana"
    },
    {
      "code": "HT",
      "name": "Haïti"
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
      "name": "Hongrie"
    },
    {
      "code": "IS",
      "name": "Islande"
    },
    {
      "code": "IN",
      "name": "Inde"
    },
    {
      "code": "ID",
      "name": "Indonésie"
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
      "name": "Irlande"
    },
    {
      "code": "IL",
      "name": "Israël"
    },
    {
      "code": "IT",
      "name": "Italie"
    },
    {
      "code": "JM",
      "name": "Jamaïque"
    },
    {
      "code": "JP",
      "name": "Japon"
    },
    {
      "code": "JO",
      "name": "Jordanie"
    },
    {
      "code": "KZ",
      "name": "Kazakhstan"
    },
    {
      "code": "KE",
      "name": "Kenya"
    },
    {
      "code": "KR",
      "name": "Corée du Sud"
    },
    {
      "code": "KW",
      "name": "Koweït"
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
      "name": "Lettonie"
    },
    {
      "code": "LB",
      "name": "Liban"
    },
    {
      "code": "LS",
      "name": "Lesotho"
    },
    {
      "code": "LR",
      "name": "Libéria"
    },
    {
      "code": "LY",
      "name": "Libye"
    },
    {
      "code": "LI",
      "name": "Liechtenstein"
    },
    {
      "code": "LT",
      "name": "Lituanie"
    },
    {
      "code": "LU",
      "name": "Luxembourg"
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
      "name": "Malaisie"
    },
    {
      "code": "MV",
      "name": "Maldives"
    },
    {
      "code": "ML",
      "name": "Mali"
    },
    {
      "code": "MT",
      "name": "Malte"
    },
    {
      "code": "MX",
      "name": "Mexique"
    },
    {
      "code": "MD",
      "name": "Moldavie"
    },
    {
      "code": "MC",
      "name": "Monaco"
    },
    {
      "code": "MN",
      "name": "Mongolie"
    },
    {
      "code": "ME",
      "name": "Monténégro"
    },
    {
      "code": "MA",
      "name": "Maroc"
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
      "name": "Namibie"
    },
    {
      "code": "NP",
      "name": "Népal"
    },
    {
      "code": "NL",
      "name": "Pays-Bas"
    },
    {
      "code": "NZ",
      "name": "Nouvelle-Zélande"
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
      "name": "Nigéria"
    },
    {
      "code": "MK",
      "name": "Macédoine du Nord"
    },
    {
      "code": "NO",
      "name": "Norvège"
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
      "name": "Papouasie-Nouvelle-Guinée"
    },
    {
      "code": "PY",
      "name": "Paraguay"
    },
    {
      "code": "PE",
      "name": "Pérou"
    },
    {
      "code": "PH",
      "name": "Philippines"
    },
    {
      "code": "PL",
      "name": "Pologne"
    },
    {
      "code": "PT",
      "name": "Portugal"
    },
    {
      "code": "QA",
      "name": "Qatar"
    },
    {
      "code": "RO",
      "name": "Roumanie"
    },
    {
      "code": "RU",
      "name": "Russie"
    },
    {
      "code": "RW",
      "name": "Rwanda"
    },
    {
      "code": "SA",
      "name": "Arabie Saoudite"
    },
    {
      "code": "SN",
      "name": "Sénégal"
    },
    {
      "code": "RS",
      "name": "Serbie"
    },
    {
      "code": "SG",
      "name": "Singapour"
    },
    {
      "code": "SK",
      "name": "Slovaquie"
    },
    {
      "code": "SI",
      "name": "Slovénie"
    },
    {
      "code": "ZA",
      "name": "Afrique du Sud"
    },
    {
      "code": "ES",
      "name": "Espagne"
    },
    {
      "code": "LK",
      "name": "Sri Lanka"
    },
    {
      "code": "SE",
      "name": "Suède"
    },
    {
      "code": "CH",
      "name": "Suisse"
    },
    {
      "code": "TW",
      "name": "Taïwan"
    },
    {
      "code": "TH",
      "name": "Thaïlande"
    },
    {
      "code": "TR",
      "name": "Turquie"
    },
    {
      "code": "UG",
      "name": "Ouganda"
    },
    {
      "code": "UA",
      "name": "Ukraine"
    },
    {
      "code": "AE",
      "name": "Émirats Arabes Unis"
    },
    {
      "code": "GB",
      "name": "Royaume-Uni"
    },
    {
      "code": "US",
      "name": "États-Unis"
    },
    {
      "code": "UY",
      "name": "Uruguay"
    },
    {
      "code": "UZ",
      "name": "Ouzbékistan"
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
      "name": "Yémen"
    },
    {
      "code": "ZM",
      "name": "Zambie"
    },
    {
      "code": "ZW",
      "name": "Zimbabwe"
    }
  ]
};
