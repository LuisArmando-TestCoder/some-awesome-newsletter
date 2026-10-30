// fr (French) strings for locales-newflow. GENERATED from en.ts by scripts/i18n-generate.mjs.
// Do not edit by hand: change en.ts and run npm run i18n:generate. Missing items fall back to English.
export default {
  "onboarding": {
    "progress": "Étape {current} sur {total}",
    "progressLabel": "Progression de la configuration",
    "back": "Retour",
    "skip": "Passer cette étape",
    "continue": "Continuer",
    "whyLabel": "Pourquoi nous le demandons",
    "skipLabel": "Si vous passez",
    "working": "Traitement en cours...",
    "start": {
      "title": "Créez votre newsletter",
      "opening": "Ouverture de la configuration. Si rien ne se passe,",
      "continueHere": "continuez ici"
    },
    "tryAgain": "Réessayer",
    "website": {
      "title": "Quel est votre site web ?",
      "why": "Nous lisons votre site pour trouver les articles qui serviront de base à votre newsletter et pour deviner qui sont vos lecteurs.",
      "skipNote": "Si vous n'avez pas encore de site, choisissez un sujet et nous utiliserons un site d'actualité sur ce thème.",
      "label": "Adresse du site",
      "hint": "Par exemple votreentreprise.com ou votreentreprise.com/blog",
      "placeholder": "votreentreprise.com",
      "submit": "Continuer",
      "checking": "Lecture de votre site...",
      "noWebsite": "Je n'ai pas de site web",
      "haveWebsite": "J'ai un site web",
      "topicTitle": "Choisissez un sujet",
      "topicHint": "Nous utiliserons un site d'actualité sur ce sujet comme première source. Vous pourrez le changer plus tard.",
      "errors": {
        "empty": "Saisissez l'adresse de votre site pour continuer.",
        "invalid": "Cela ne ressemble pas à une adresse web. Vérifiez l'orthographe, par exemple votreentreprise.com.",
        "unreachable": "Nous n'avons pas trouvé d'articles sur cette page. Essayez votre blog ou votre page d'actualités, par exemple votreentreprise.com/blog.",
        "network": "Nous n'avons pas pu joindre nos serveurs. Vérifiez votre connexion et réessayez."
      }
    },
    "readers": {
      "title": "Qui lit votre newsletter ?",
      "why": "Nous écrivons chaque numéro pour ce lecteur et dans cette langue. Les abonnés qui parlent une autre langue reçoivent leur propre version traduite.",
      "skipNote": "Nous avons rempli ces champs à partir de votre site. Modifiez ce qui vous semble faux.",
      "languageLabel": "Langue principale",
      "languageHint": "Nous l'avons déduite des réglages de votre navigateur.",
      "readerLabel": "Votre lecteur idéal",
      "readerHint": "Une phrase suffit. Par exemple : propriétaires de petits restaurants à Lisbonne.",
      "readerPlaceholder": "À qui s'adresse cette newsletter ?",
      "errors": {
        "reader": "Décrivez votre lecteur en quelques mots pour que nous sachions pour qui écrire."
      }
    },
    "preview": {
      "title": "Voici votre premier numéro",
      "why": "Voici l'e-mail que recevront vos abonnés, rédigé à partir de votre dernier article. Rien n'a encore été envoyé.",
      "generating": "Rédaction de votre premier numéro à partir de votre dernier article. Cela prend généralement moins d'une minute.",
      "inboxFrom": "De",
      "inboxTo": "À",
      "inboxSubject": "Objet",
      "defaultSubject": "Votre premier numéro",
      "sendTest": "M'envoyer un test",
      "sendingTest": "Envoi...",
      "testSent": "Test envoyé à {email}. Vérifiez votre boîte de réception et vos spams.",
      "regenerate": "Le réécrire",
      "looksGood": "C'est bon, continuer",
      "skipPreview": "Continuer sans aperçu",
      "howTitle": "Comment nous trouvons vos articles",
      "howBody": "Nous avons enregistré une courte règle qui indique où se trouvent les liens d'articles sur votre page, afin d'ignorer les menus et les publicités. Vous n'avez besoin de la modifier que si l'aperçu a pris le mauvais contenu.",
      "ruleLabel": "Règle d'articles",
      "findAgain": "Rechercher à nouveau les articles",
      "errors": {
        "generate": "Nous n'avons pas pu rédiger le numéro. La page bloque peut-être la lecture automatique. Réessayez, ou revenez en arrière et utilisez la page de votre blog.",
        "test": "L'e-mail de test n'est pas parti. Réessayez dans un instant."
      }
    },
    "senderName": {
      "title": "Comment votre nom doit-il apparaître dans la boîte de réception ?",
      "why": "Les abonnés voient ce nom à côté de chaque numéro : ils le reconnaissent et l'ouvrent.",
      "skipNote": "Si vous passez, l'expéditeur s'affiche comme AIBAN. Vous pourrez changer le nom plus tard dans les Paramètres.",
      "label": "Nom de l'expéditeur",
      "hint": "Votre nom, votre entreprise ou le nom de la newsletter. 60 caractères maximum.",
      "placeholder": "Studio Silva",
      "previewLabel": "Ce que l'on voit dans une boîte de réception",
      "previewBody": "Votre numéro apparaît avec ce nom d'expéditeur. Il est envoyé depuis l'adresse d'envoi d'AIBAN.",
      "save": "Enregistrer et continuer",
      "errors": {
        "empty": "Saisissez un nom d'expéditeur d'au moins 2 caractères.",
        "long": "Le nom de l'expéditeur doit faire 60 caractères maximum.",
        "save": "Nous n'avons pas pu enregistrer le nom. Réessayez dans un instant."
      }
    },
    "signature": {
      "title": "Signature e-mail",
      "why": "Votre signature figure à la fin de chaque numéro, pour que les lecteurs sachent qui l'a écrit et comment vous joindre.",
      "skipNote": "Si vous passez, les numéros se terminent uniquement par le nom de votre newsletter.",
      "nameLabel": "Votre nom",
      "namePlaceholder": "Ana Silva",
      "roleLabel": "Fonction ou entreprise",
      "rolePlaceholder": "Fondatrice, Studio Silva",
      "linkLabel": "Lien",
      "linkHint": "Votre site ou un profil sur un réseau social. Facultatif.",
      "linkPlaceholder": "votreentreprise.com",
      "previewLabel": "Ce que l'on voit à la fin d'un e-mail",
      "previewBody": "Merci de votre lecture. À bientôt pour le prochain numéro.",
      "save": "Enregistrer la signature",
      "existingNote": "Vous avez déjà une signature. L'enregistrer ici la remplace."
    },
    "schedule": {
      "title": "Quand les nouveaux numéros doivent-ils partir ?",
      "why": "Nous consultons votre site avant chaque envoi et rédigeons un nouveau numéro à partir des articles les plus récents.",
      "skipNote": "Vous pouvez changer le jour et l'heure, ou suspendre les envois, à tout moment depuis le tableau de bord.",
      "scheduleLabel": "Heure d'envoi",
      "frequencyLabel": "Fréquence",
      "daily": "Tous les jours",
      "weekly": "Toutes les semaines",
      "monthly": "Tous les mois, le 1er",
      "dayLabel": "Jour",
      "timeLabel": "Heure",
      "timeHint": "À votre heure locale.",
      "summaryDaily": "Tous les jours à {time}, votre heure ({zone}).",
      "summaryWeekly": "Tous les {day} à {time}, votre heure ({zone}).",
      "summaryMonthly": "Le 1er de chaque mois à {time}, votre heure ({zone}).",
      "recipeTitle": "Envoyer les nouveaux numéros automatiquement",
      "recipeBody": "Selon le rythme ci-dessus, nous choisissons votre meilleur nouvel article, le rédigeons avec votre voix, le traduisons pour chaque lecteur et l'envoyons par e-mail.",
      "recipeOn": "Activé",
      "recipeOff": "Désactivé. Les numéros ne partent que lorsque vous cliquez sur Envoyer.",
      "save": "Enregistrer et continuer",
      "saving": "Enregistrement de votre newsletter...",
      "errors": {
        "create": "Nous n'avons pas pu enregistrer votre newsletter. Réessayez dans un instant.",
        "limit": "Votre formule ne permet pas d'ajouter une autre source. Pour en ajouter une, écrivez-nous et nous changerons votre formule."
      }
    },
    "send": {
      "title": "Envoyez votre premier numéro",
      "why": "Envoyer maintenant vous montre le parcours complet : votre numéro arrive dans une vraie boîte de réception, dans la langue du lecteur.",
      "skipNote": "Si vous passez, le premier numéro part à l'heure programmée.",
      "youAreSubscribed": "Vous êtes déjà abonné avec {email}.",
      "othersLabel": "Inviter d'autres personnes (facultatif)",
      "othersHint": "Collez des adresses e-mail séparées par des virgules ou des retours à la ligne. Chaque personne reçoit une invitation personnelle de votre part. Elles ne reçoivent les numéros que si elles acceptent, et nous supprimons les invitations non acceptées après 30 jours.",
      "othersPlaceholder": "ana@example.com, li@example.com",
      "sendNow": "Envoyer maintenant",
      "sending": "Envoi de votre premier numéro...",
      "sentTitle": "Votre premier numéro est en route",
      "sentBody": "Il part vers toutes les personnes de votre liste qui ont confirmé leur inscription. Il peut mettre quelques minutes à arriver.",
      "invited": "Invitations envoyées à {count} personnes. Elles rejoignent votre liste quand elles acceptent.",
      "invitesUnavailable": "Les invitations ne sont pas encore disponibles, nous n'avons donc pas enregistré ces adresses. À l'étape suivante, copiez votre lien d'inscription et envoyez-le-leur vous-même.",
      "continue": "Continuer",
      "errors": {
        "invalidEmails": "Ces adresses semblent incorrectes : {list}. Corrigez-les ou supprimez-les.",
        "add": "Nous n'avons pas pu inviter : {list}. Réessayez plus tard depuis Abonnés.",
        "send": "Le numéro n'est pas parti. Réessayez dans un instant."
      }
    },
    "share": {
      "title": "Obtenez vos premiers abonnés",
      "why": "Les personnes qui s'inscrivent ici reçoivent chaque numéro dans leur propre langue.",
      "skipNote": "Vous retrouverez ce lien et le code d'intégration plus tard dans Abonnés, sous Formulaire d'inscription.",
      "linkLabel": "Page d'inscription",
      "linkHint": "Partagez-la sur les réseaux sociaux, dans le pied de vos e-mails ou via un QR code.",
      "embedLabel": "Formulaire d'inscription pour votre site",
      "embedHint": "Collez ce code à l'endroit où le formulaire doit apparaître sur votre site.",
      "copy": "Copier",
      "copied": "Copié",
      "open": "Ouvrir la page d'inscription"
    },
    "done": {
      "title": "Votre newsletter est configurée",
      "why": "Voici ce qui se passe ensuite et ce qu'il reste à faire.",
      "planLine": "Formule actuelle : {plan}",
      "changePlan": "Voir les formules",
      "toDashboard": "Aller au tableau de bord",
      "summarySource": "Source : {url}",
      "summarySchedule": "Rythme : {schedule}",
      "summaryAutomation": "Envoi automatique : {state}",
      "on": "activé",
      "off": "désactivé"
    }
  },
  "tutorial": {
    "checklistTitle": "Premiers pas",
    "checklistProgress": "{done} sur {total} terminées",
    "checklistDone": "Tout est prêt. Votre newsletter fonctionne désormais toute seule.",
    "dismiss": "Masquer la liste",
    "doneLabel": "terminé",
    "todoLabel": "à faire",
    "show": "Afficher les premiers pas",
    "items": {
      "source": {
        "title": "Indiquez d'où vient votre contenu",
        "body": "Un site ou un blog que nous consultons pour trouver de nouveaux articles."
      },
      "sender": {
        "title": "Choisissez votre nom d'expéditeur",
        "body": "Le nom que les abonnés voient à côté de chaque numéro."
      },
      "subscriber": {
        "title": "Obtenez votre premier abonné",
        "body": "Une personne autre que vous s'inscrit ou est ajoutée."
      },
      "send": {
        "title": "Envoyez votre premier numéro",
        "body": "Un vrai numéro arrive chez les personnes de votre liste."
      },
      "automation": {
        "title": "Activez l'envoi automatique",
        "body": "Les nouveaux numéros partent selon votre programmation."
      },
      "widget": {
        "title": "Ajoutez le formulaire d'inscription à votre site",
        "body": "Les visiteurs peuvent s'abonner sans quitter votre site."
      }
    },
    "open": "Ouvrir",
    "tour": {
      "start": "Faire une visite rapide",
      "next": "Suivant",
      "back": "Retour",
      "skip": "Passer la visite",
      "finish": "Terminer",
      "stepOf": "{current} sur {total}"
    },
    "help": {
      "whatIsThis": "Qu'est-ce que c'est ?",
      "whyItMatters": "Pourquoi c'est important",
      "close": "Fermer"
    }
  },
  "auth": {
    "emailLabel": "Adresse e-mail",
    "emailHint": "Nous envoyons un code à 6 chiffres à cette adresse. Vous n'avez pas besoin de mot de passe.",
    "codeTitle": "Consultez vos e-mails",
    "codeSentTo": "Nous avons envoyé un code à 6 chiffres à {email}.",
    "codeHint": "Le code peut mettre une minute à arriver. Vérifiez aussi vos spams.",
    "changeEmail": "Utiliser une autre adresse",
    "resend": "Envoyer un nouveau code",
    "resendIn": "Vous pourrez demander un nouveau code dans {seconds} s",
    "resendLimit": "Si le code n'est toujours pas arrivé, écrivez-nous depuis la page Aide et nous réglerons le problème.",
    "resent": "Nous avons envoyé un nouveau code.",
    "verifying": "Vérification de votre code...",
    "errors": {
      "email": "Saisissez une adresse e-mail complète, par exemple vous@entreprise.com.",
      "send": "Nous n'avons pas pu envoyer le code. Vérifiez votre connexion et réessayez.",
      "code": "Ce code n'a pas fonctionné. Vérifiez les 6 chiffres ou demandez un nouveau code."
    }
  }
};
