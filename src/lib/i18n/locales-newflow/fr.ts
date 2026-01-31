export default {
  step01: {
    title: "L'IA à sonorité humaine rédige des bulletins d'information pour vos abonnés en automatique",
    subtitle: "Quelle fréquence, sélectionnez <u>chaque mois</u> ou <u>chaque semaine</u> ou <u>chaque jour</u> ou <u>à quelle heure</u>"
  },
  step02: {
    title: "Langue du bulletin",
    subtitle: "“votre bulletin sera également envoyé dans la langue spécifique de chaque utilisateur s'ils sont différents”"
  },
  step03: {
    title: "Redirection (Optionnel)",
    subtitle: "Voulez-vous rediriger l'utilisateur vers votre page ?",
    description: "Vous pouvez coller un lien vers votre page ici, nous compterons combien entrent depuis les emails créés par l'IA",
    placeholder: "https://votre-page.com"
  },
  step04: {
    title: "Type d'actualités que vous voulez que l'IA choisisse",
    subtitle: "Quel thème de conversation ou sujet (déduit du lien de redirection si défini, sinon vide)",
    placeholder: "ex. Intelligence Artificielle, Marketing, Santé..."
  },
  step05: {
    title: "Personnalisez Votre Signature",
    subtitle: "Concevez visuellement ou modifiez le code directement",
    visualEditor: "Éditeur Visuel",
    htmlSource: "Source HTML",
    livePreview: "Aperçu en Direct",
    yourName: "Votre Nom",
    yourTitle: "Votre Titre",
    facebookProfile: "Profil Facebook",
    instagramProfile: "Profil Instagram",
    editHtml: "Modifier HTML directement...",
    warning: "⚠️ Les modifications effectuées ici seront écrasées si vous revenez à l'Éditeur Visuel et effectuez des changements."
  },
  step06: {
    title: "Source d'Actualités",
    subtitle: "Quel site d'actualités voulez-vous utiliser ?",
    description: "Entrez une URL ou laissez-nous en choisir une pour vous en fonction de votre sujet.",
    descriptionSmall: "Nous analyserons le site web pour trouver le meilleur contenu. Cela peut prendre quelques secondes.",
    placeholder: "https://exemple.com",
    analyzing: "Analyse en cours...",
    next: "Suivant",
    errors: {
      failedToGenerate: "Échec de la génération du sélecteur. Veuillez réessayer ou vérifier l'URL.",
      errorGenerating: "Une erreur s'est produite lors de la génération du sélecteur.",
      invalidUrl: "Veuillez entrer une URL valide ou choisir une source."
    }
  },
  step07: {
    title: "Sélecteur de Contenu",
    subtitle: "Pensez à chaque site web comme une <strong>bibliothèque avec une mise en page unique</strong>.",
    explanation1: "Ce <strong>'Sélecteur'</strong> est la carte spécifique que nous avons créée pour ce site web. Il indique à notre système exactement où chercher pour récupérer les articles que vous voulez, tout en ignorant les boutons de menu et les publicités.",
    explanation2: "<strong>Nous avons rempli cette carte pour vous automatiquement.</strong>",
    placeholder: "Chaîne du sélecteur...",
    regenerate: "Régénérer le Sélecteur",
    regenerating: "Régénération...",
    errors: {
      noUrl: "Aucune URL de source d'actualités trouvée.",
      failedRegenerate: "Échec de la régénération du sélecteur.",
      errorRegenerate: "Une erreur s'est produite lors de la régénération du sélecteur."
    }
  },
  step08: {
    title: "Aperçu",
    placeholder: "Prêt à générer votre premier bulletin ?",
    generateBtn: "Générer l'Email du Bulletin",
    sentBtn: "Envoyé ! Vérifiez votre email",
    sendTestBtn: "Envoyer un Email de Test",
    regenerateBtn: "Régénérer",
    loading: {
      initializing: "Initialisation...",
      starting: "Démarrage de la génération...",
      scraping: "Extraction du contenu...",
      translating: "Traduction de l'article...",
      formatting: "Formatage de l'email...",
      sending: "Connexion au fournisseur de messagerie...",
      authenticating: "Authentification...",
      sendingArticle: "Envoi de l'article...",
      creating: "Création de la source d'actualités...",
      saving: "Enregistrement de la configuration...",
      finalizing: "Finalisation de la configuration..."
    },
    errors: {
      generationFailed: "La génération a échoué : ",
      createFailed: "Échec de la création de la source d'actualités. Veuillez réessayer.",
      errorCreating: "Erreur lors de la création de la source d'actualités : ",
      sendFailed: "Échec de l'envoi de l'email : "
    },
    defaultSubject: "Aperçu de votre Bulletin Généré"
  },
  step09: {
    title: "Pour envoyer l'article depuis votre email",
    subtitle: "Mot de passe d'application (Optionnel)",
    description: "(Si vous avez des services gmail, mettez votre mot de passe d'application ici)",
    label: "Mot de passe d'application",
    placeholder: "Votre Mot de passe d'application"
  },
  step10: {
    title: "Adresse Gmail (Optionnel)",
    subtitle: "Adresse Email Gmail",
    description: "Si vous souhaitez envoyer depuis une adresse Gmail spécifique",
    placeholder: "votre-email@gmail.com"
  },
  step11: {
    title: "Envoyer un Email de Test",
    subtitle: "Envoyez-vous un email de test pour vérifier la configuration.",
    sendNow: "Envoyer Maintenant",
    sent: "Envoyé ! Vérifiez votre email",
    loading: {
      connecting: "Connexion au fournisseur de messagerie...",
      authenticating: "Authentification...",
      sending: "Envoi de l'article..."
    }
  },
  step12: {
    title: "Partagez ce bulletin avec vos abonnés",
    subtitle: "Lien vers l'entonnoir d'abonnement (avant de commencer à recevoir des emails, ils devront accepter votre invitation)",
    copy: "Copier",
    copied: "Lien copié !"
  },
  step13: {
    title: "Plan et Limites",
    currentPlan: "Plan Actuel :",
    limits: "Limites :",
    unknown: "Inconnu",
    changePlan: "Changer de Plan",
    advancedFeatures: "Besoin de fonctionnalités plus avancées ?",
    developerText: "Consultez notre section développeur pour intégrer cet entonnoir d'abonnement au bulletin sur votre serveur, un blog de tous vos articles générés, et abonner des utilisateurs depuis votre base de code avec notre clé API.",
    dashboardBtn: "Aller au Tableau de Bord",
    usage: "Utilisation :",
    limitDetails: {
      free: "Limite de 100 utilisateurs",
      starter: "5 sources, 100k utilisateurs",
      growth: "17 sources, 250k utilisateurs",
      pro: "25 sources, 500k utilisateurs",
      master: "50 sources, utilisateurs illimités",
      vipfree: "VIP Gratuit"
    }
  }
};
