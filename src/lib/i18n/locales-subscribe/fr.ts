// fr strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale fr
export default {
  "welcome": {
    "title": "Bienvenue dans la newsletter",
    "invitedBy": "{configuratorId} vous a invité à vous abonner."
  },
  "email": {
    "title": "Où devons-nous envoyer chaque numéro ?",
    "placeholder": "Votre email"
  },
  "name": {
    "title": "Comment vous appelez-vous ?",
    "placeholder": "Votre nom"
  },
  "language": {
    "title": "Dans quelle langue voulez-vous lire ?"
  },
  "subscribed": {
    "title": "Vous êtes abonné",
    "subtitle": "Consultez votre boîte de réception : nous vous avons envoyé un e-mail de confirmation.",
    "continueTo": "Continuer vers",
    "finishingUp": "Vous pouvez fermer cette page."
  },
  "form": {
    "heading": "Abonnez-vous à {title}",
    "headingFallback": "Abonnez-vous à cette newsletter",
    "intro": "Les nouveaux numéros arrivent par e-mail, rédigés dans la langue de votre choix.",
    "from": "De {sender}",
    "emailLabel": "Adresse e-mail",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Prénom",
    "optional": "facultatif",
    "nameHint": "Nous l'utilisons pour vous saluer. Si vous le laissez vide, nous utilisons le début de votre adresse e-mail.",
    "languageLabel": "Langue de vos numéros",
    "languageSummary": "Numéros en {language}.",
    "languageChange": "Modifier",
    "languageHint": "Nous l'avons déduite des réglages de votre navigateur.",
    "submit": "S'abonner",
    "submitting": "Abonnement en cours...",
    "consent": "En vous abonnant, vous acceptez de recevoir des e-mails de {sender}. Chaque e-mail contient un lien de désabonnement.",
    "privacy": "Politique de confidentialité",
    "loadingInfo": "Chargement des informations de la newsletter"
  },
  "success": {
    "title": "Consultez votre boîte de réception",
    "body": "Nous avons envoyé un e-mail de confirmation à {email}. Ouvrez-le et sélectionnez Confirmer l'abonnement.",
    "next": "Votre premier numéro arrive après votre confirmation, rédigé en {language}.",
    "spam": "Si rien n'arrive d'ici quelques minutes, regardez dans vos spams ou dans l'onglet Promotions.",
    "changeEmail": "Utiliser une autre adresse",
    "continueTo": "Continuer vers {host}"
  },
  "errors": {
    "emailRequired": "Saisissez votre adresse e-mail.",
    "emailInvalid": "Cette adresse e-mail semble incomplète. Vérifiez-la et réessayez.",
    "missingLink": "Il manque des informations dans ce lien d'inscription. Demandez un nouveau lien à l'expéditeur.",
    "notFound": "Ce lien d'inscription ne fonctionne plus. Demandez un nouveau lien à l'expéditeur.",
    "limit": "Cette newsletter ne peut pas accepter de nouveaux abonnés pour le moment. Réessayez plus tard.",
    "invalid": "Nous n'avons pas pu accepter cette adresse. Vérifiez-la et réessayez.",
    "server": "Nous n'avons pas pu enregistrer votre abonnement. Réessayez dans un instant.",
    "network": "Nous n'avons pas pu joindre le serveur. Vérifiez votre connexion et réessayez."
  },
  "confirm": {
    "title": "Confirmez votre abonnement",
    "body": "Sélectionnez le bouton pour commencer à recevoir les numéros à l'adresse {email}.",
    "button": "Confirmer l'abonnement",
    "confirming": "Confirmation...",
    "consent": "En confirmant, vous acceptez de recevoir cette newsletter par e-mail. Vous pouvez vous désabonner depuis n'importe quel numéro.",
    "successTitle": "Vous êtes abonné",
    "successBody": "Les nouveaux numéros arriveront à l'adresse {email}.",
    "successTip": "Pour qu'ils n'arrivent pas dans les spams, ajoutez l'expéditeur à vos contacts.",
    "invalidTitle": "Ce lien est incomplet",
    "invalidBody": "Ouvrez à nouveau l'e-mail de confirmation et sélectionnez son bouton. Si vous ne le trouvez pas, réinscrivez-vous depuis la page de l'expéditeur.",
    "notFoundBody": "Nous n'avons trouvé aucune inscription pour cette adresse. Réinscrivez-vous depuis la page de l'expéditeur.",
    "errorBody": "Nous n'avons pas pu confirmer votre abonnement. Réessayez dans un instant.",
    "retry": "Réessayer",
    "home": "Aller à la page d'accueil"
  },
  "embed": {
    "title": "Ajoutez un formulaire d'inscription à votre site",
    "intro": "Collez l'un de ces extraits dans votre site. Les personnes qui s'inscrivent reçoivent un e-mail de confirmation, puis vos numéros dans leur propre langue.",
    "linkLabel": "Lien de la page d'inscription",
    "linkHint": "Partagez-le dans une bio de réseau social, une signature e-mail ou un QR code.",
    "scriptLabel": "Balise script (recommandée)",
    "scriptHint": "Collez-la à l'endroit où le formulaire doit apparaître. Le formulaire s'adapte tout seul à la taille.",
    "iframeLabel": "Iframe",
    "iframeHint": "Utilisez cette option si votre site n'autorise pas les scripts.",
    "copy": "Copier",
    "copied": "Copié",
    "copyFailed": "Sélectionnez le texte et copiez-le manuellement.",
    "options": "Options du formulaire",
    "accent": "Couleur du bouton",
    "accentHint": "Laissez tel quel pour utiliser la couleur de votre marque.",
    "theme": "Thème",
    "themeAuto": "Suivre le réglage du visiteur",
    "themeLight": "Clair",
    "themeDark": "Sombre",
    "layout": "Mise en page",
    "layoutFull": "Complète (titre, prénom et langue)",
    "layoutCompact": "Compacte (e-mail et bouton)",
    "preview": "Aperçu",
    "previewNote": "L'aperçu est réel. Une inscription ici crée un véritable abonné.",
    "missing": "Créez d'abord une newsletter. Le formulaire d'inscription apparaîtra ici ensuite."
  },
  "page": {
    "poweredBy": "Propulsé par AIBAN",
    "title": "S'abonner"
  },
  "signature": {
    "title": "Signature e-mail",
    "intro": "Les lecteurs voient ceci à la fin de chaque numéro. Cliquez sur n'importe quelle partie de l'aperçu pour la modifier.",
    "show": "Afficher ma signature dans chaque numéro",
    "showHint": "Si vous la désactivez, les numéros se terminent après l'article.",
    "preview": "Aperçu",
    "previewEmpty": "Votre signature est vide. Ajoutez votre nom pour commencer.",
    "articleEnd": "Fin de l'article",
    "tabContent": "Contenu",
    "tabStyle": "Style",
    "blocks": "Éléments à inclure",
    "blocksHint": "Sélectionnez une étiquette pour afficher ou masquer cet élément. Les éléments masqués conservent leur texte.",
    "layout": "Mise en page",
    "layouts": {
      "bar": "Barre de couleur",
      "photo": "Photo",
      "stacked": "Empilée",
      "centered": "Centrée",
      "minimal": "Texte seul"
    },
    "fields": {
      "name": "Nom",
      "role": "Fonction",
      "company": "Entreprise",
      "phone": "Téléphone",
      "email": "E-mail",
      "website": "Site web",
      "address": "Adresse",
      "photoUrl": "Photo",
      "logoUrl": "Logo",
      "socials": "Réseaux sociaux",
      "cta": "Bouton",
      "disclaimer": "Mention légale"
    },
    "groups": {
      "about": "À propos de vous",
      "contact": "Contact",
      "images": "Images",
      "socials": "Réseaux sociaux",
      "cta": "Bouton",
      "disclaimer": "Mention légale"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Fondatrice",
      "company": "Studio Rivière",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 rue Principale, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Réserver un appel",
      "ctaUrl": "https://"
    },
    "ctaText": "Texte du bouton",
    "ctaLink": "Lien du bouton",
    "hints": {
      "photoUrl": "Lien vers un PNG ou JPG carré, d'au moins 144 × 144 pixels et de moins de 200 Ko. Affiché en 72 × 72 pixels à côté de votre nom.",
      "logoUrl": "Lien vers un PNG ou JPG sur fond transparent ou blanc, d'au moins 64 pixels de haut. Affiché avec une hauteur de 32 pixels.",
      "website": "Nous ajoutons https:// si vous l'omettez.",
      "cta": "Le texte et le lien sont tous deux nécessaires pour que le bouton s'affiche.",
      "disclaimer": "Petits caractères en bas, par exemple une mention de confidentialité. Laissez vide si vous n'en avez pas besoin."
    },
    "style": {
      "accent": "Couleur d'accent",
      "accentHint": "Utilisée pour la barre, les liens et le bouton. Par défaut, c'est la couleur de votre marque.",
      "font": "Police",
      "fontSans": "Sans empattement",
      "fontSerif": "Avec empattement",
      "size": "Taille du texte",
      "sizeMd": "Normale",
      "sizeSm": "Petite",
      "shape": "Forme de la photo",
      "shapeRound": "Ronde",
      "shapeSquare": "Carrée"
    },
    "hidden": "masqué",
    "reset": "Recommencer",
    "resetConfirm": "Sélectionnez à nouveau pour vider tous les champs"
  }
};
