// English source strings for the public subscribe flow, the embeddable widget,
// the confirm page and the owner's embed code card. Owner: WS5. WS9 translates.
// Placeholders in {braces} are filled at runtime. Keep the old top-level keys
// (welcome, email, name, language, subscribed): other locale files still use them.
export default {
  "welcome": {
    "title": "Welcome to the newsletter",
    "invitedBy": "{configuratorId} invited you to subscribe."
  },
  "email": {
    "title": "Where should we send each issue?",
    "placeholder": "you@example.com"
  },
  "name": {
    "title": "What is your name?",
    "placeholder": "Your name"
  },
  "language": {
    "title": "Which language do you want to read in?"
  },
  "subscribed": {
    "title": "You are subscribed",
    "subtitle": "Check your inbox for a confirmation email.",
    "continueTo": "Continue to",
    "finishingUp": "You can close this page."
  },
  "form": {
    "heading": "Subscribe to {title}",
    "headingFallback": "Subscribe to this newsletter",
    "intro": "New issues arrive by email, written in the language you choose.",
    "from": "From {sender}",
    "emailLabel": "Email address",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "First name",
    "optional": "optional",
    "nameHint": "We use it to greet you. Leave it empty and we use the start of your email address.",
    "languageLabel": "Language for your issues",
    "languageSummary": "Issues in {language}.",
    "languageChange": "Change",
    "languageHint": "We picked this from your browser settings.",
    "submit": "Subscribe",
    "submitting": "Subscribing...",
    "consent": "By subscribing, you agree to get emails from {sender}. Every email has an unsubscribe link.",
    "privacy": "Privacy policy",
    "loadingInfo": "Loading newsletter details"
  },
  "success": {
    "title": "Check your inbox",
    "body": "We sent a confirmation email to {email}. Open it and select Confirm subscription.",
    "next": "Your first issue arrives after you confirm, written in {language}.",
    "spam": "If nothing arrives within a few minutes, look in your spam or Promotions folder.",
    "changeEmail": "Use a different email",
    "continueTo": "Continue to {host}"
  },
  "errors": {
    "emailRequired": "Enter your email address.",
    "emailInvalid": "This email address looks incomplete. Check it and try again.",
    "missingLink": "This signup link is missing information. Ask the sender for a new link.",
    "notFound": "This signup link no longer works. Ask the sender for a new link.",
    "limit": "This newsletter cannot take new subscribers right now. Try again later.",
    "invalid": "We could not accept this address. Check it and try again.",
    "server": "We could not save your subscription. Try again in a moment.",
    "network": "We could not reach the server. Check your connection and try again."
  },
  "confirm": {
    "title": "Confirm your subscription",
    "body": "Select the button to start receiving issues at {email}.",
    "button": "Confirm subscription",
    "confirming": "Confirming...",
    "consent": "By confirming, you agree to get this newsletter by email. You can unsubscribe from any issue.",
    "successTitle": "You are subscribed",
    "successBody": "New issues will arrive at {email}.",
    "successTip": "To keep them out of spam, add the sender to your contacts.",
    "invalidTitle": "This link is incomplete",
    "invalidBody": "Open the confirmation email again and select its button. If you cannot find it, sign up again from the sender's page.",
    "notFoundBody": "We could not find a signup for this address. Sign up again from the sender's page.",
    "errorBody": "We could not confirm your subscription. Try again in a moment.",
    "retry": "Try again",
    "home": "Go to the home page"
  },
  "embed": {
    "title": "Add a signup form to your site",
    "intro": "Paste one of these snippets into your website. People who sign up get a confirmation email, then your issues in their own language.",
    "linkLabel": "Signup page link",
    "linkHint": "Share it in a social bio, an email signature or a QR code.",
    "scriptLabel": "Script tag (recommended)",
    "scriptHint": "Paste it where the form should appear. The form resizes itself to fit.",
    "iframeLabel": "Iframe",
    "iframeHint": "Use this if your site does not allow scripts.",
    "copy": "Copy",
    "copied": "Copied",
    "copyFailed": "Select the text and copy it manually.",
    "options": "Form options",
    "accent": "Button color",
    "accentHint": "Leave it as is to use your brand color.",
    "theme": "Theme",
    "themeAuto": "Match the visitor's setting",
    "themeLight": "Light",
    "themeDark": "Dark",
    "layout": "Layout",
    "layoutFull": "Full (title, name and language)",
    "layoutCompact": "Compact (email and button)",
    "preview": "Preview",
    "previewNote": "The preview is live. A signup here creates a real subscriber.",
    "missing": "Create a newsletter first. The signup form appears here when it exists."
  },
  "page": {
    "poweredBy": "Runs on AIBAN",
    "title": "Subscribe"
  },
  "signature": {
    "title": "Email signature",
    "intro": "Readers see this at the end of every issue. Click any part of the preview to edit it.",
    "show": "Show my signature in every issue",
    "showHint": "Turn it off and issues end after the article.",
    "preview": "Preview",
    "previewEmpty": "Your signature is empty. Add your name to start.",
    "articleEnd": "End of the article",
    "tabContent": "Content",
    "tabStyle": "Style",
    "blocks": "What to include",
    "blocksHint": "Select a tag to show or hide that part. Hidden parts keep their text.",
    "layout": "Layout",
    "layouts": {
      "bar": "Color bar",
      "photo": "Photo",
      "stacked": "Stacked",
      "centered": "Centered",
      "minimal": "Text only"
    },
    "fields": {
      "name": "Name",
      "role": "Job title",
      "company": "Company",
      "phone": "Phone",
      "email": "Email",
      "website": "Website",
      "address": "Address",
      "photoUrl": "Photo",
      "logoUrl": "Logo",
      "socials": "Social links",
      "cta": "Button",
      "disclaimer": "Legal note"
    },
    "groups": {
      "about": "About you",
      "contact": "Contact",
      "images": "Images",
      "socials": "Social links",
      "cta": "Button",
      "disclaimer": "Legal note"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Founder",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Main Street, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Book a call",
      "ctaUrl": "https://"
    },
    "ctaText": "Button text",
    "ctaLink": "Button link",
    "hints": {
      "photoUrl": "Link to a square PNG or JPG, at least 144 by 144 pixels and under 200 KB. Shown at 72 by 72 pixels next to your name.",
      "logoUrl": "Link to a PNG or JPG with a transparent or white background, at least 64 pixels tall. Shown 32 pixels tall.",
      "website": "We add https:// if you leave it out.",
      "cta": "Both the text and the link are needed for the button to show.",
      "disclaimer": "Small print at the bottom, for example a confidentiality note. Leave it empty if you do not need one."
    },
    "style": {
      "accent": "Accent color",
      "accentHint": "Used for the bar, links and the button. Starts with your brand color.",
      "font": "Font",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Text size",
      "sizeMd": "Regular",
      "sizeSm": "Small",
      "shape": "Photo shape",
      "shapeRound": "Round",
      "shapeSquare": "Square"
    },
    "hidden": "hidden",
    "reset": "Start over",
    "resetConfirm": "Select again to clear every field"
  }
};
