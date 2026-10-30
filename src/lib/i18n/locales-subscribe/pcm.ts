// pcm strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale pcm
export default {
  "welcome": {
    "title": "Welcome to the newsletter",
    "invitedBy": "{configuratorId} invite you to subscribe."
  },
  "email": {
    "title": "Where we go send every issue?",
    "placeholder": "Your email"
  },
  "name": {
    "title": "Wetin be your name?",
    "placeholder": "Your name"
  },
  "language": {
    "title": "Which language you want read am for?"
  },
  "subscribed": {
    "title": "You don subscribe",
    "subtitle": "Check your inbox for confirmation email.",
    "continueTo": "Continue to",
    "finishingUp": "You fit close dis page."
  },
  "form": {
    "heading": "Subscribe to {title}",
    "headingFallback": "Subscribe to dis newsletter",
    "intro": "New issues go dey land by email, for the language wey you choose.",
    "from": "From {sender}",
    "emailLabel": "Email address",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "First name",
    "optional": "you fit leave am",
    "nameHint": "We go use am greet you. If you leave am empty, we go use the first part of your email address.",
    "languageLabel": "Language for your issues",
    "languageSummary": "Issues for {language}.",
    "languageChange": "Change",
    "languageHint": "We pick dis one from your browser settings.",
    "submit": "Subscribe",
    "submitting": "We dey subscribe you...",
    "consent": "If you subscribe, you agree to dey get emails from {sender}. Every email get unsubscribe link.",
    "privacy": "Privacy policy",
    "loadingInfo": "We dey load the newsletter details"
  },
  "success": {
    "title": "Check your inbox",
    "body": "We don send confirmation email to {email}. Open am and select Confirm subscription.",
    "next": "Your first issue go land after you confirm, for {language}.",
    "spam": "If nothing land after some minutes, check your spam or Promotions folder.",
    "changeEmail": "Use another email",
    "continueTo": "Continue go {host}"
  },
  "errors": {
    "emailRequired": "Put your email address.",
    "emailInvalid": "Dis email address no look complete. Check am and try again.",
    "missingLink": "Dis signup link no get complete information. Ask the sender for new link.",
    "notFound": "Dis signup link no dey work again. Ask the sender for new link.",
    "limit": "Dis newsletter no fit take new subscribers now. Try again later.",
    "invalid": "We no fit accept dis address. Check am and try again.",
    "server": "We no fit save your subscription. Try again small time.",
    "network": "We no fit reach the server. Check your connection and try again."
  },
  "confirm": {
    "title": "Confirm your subscription",
    "body": "Select the button to start to receive issues for {email}.",
    "button": "Confirm subscription",
    "confirming": "We dey confirm...",
    "consent": "If you confirm, you agree to dey get dis newsletter by email. You fit unsubscribe from any issue.",
    "successTitle": "You don subscribe",
    "successBody": "New issues go dey land for {email}.",
    "successTip": "To keep dem out of spam, add the sender to your contacts.",
    "invalidTitle": "Dis link no complete",
    "invalidBody": "Open the confirmation email again and select the button. If you no see am, sign up again from the sender page.",
    "notFoundBody": "We no find signup for dis address. Sign up again from the sender page.",
    "errorBody": "We no fit confirm your subscription. Try again small time.",
    "retry": "Try again",
    "home": "Go to the home page"
  },
  "embed": {
    "title": "Add signup form to your site",
    "intro": "Paste one of these codes for your website. People wey sign up go get confirmation email, then your issues for their own language.",
    "linkLabel": "Signup page link",
    "linkHint": "Share am for social media bio, email signature or QR code.",
    "scriptLabel": "Script tag (we recommend am)",
    "scriptHint": "Paste am where the form suppose show. The form go adjust im size by itself.",
    "iframeLabel": "Iframe",
    "iframeHint": "Use dis one if your site no allow scripts.",
    "copy": "Copy",
    "copied": "E don copy",
    "copyFailed": "Select the text and copy am by hand.",
    "options": "Form options",
    "accent": "Button color",
    "accentHint": "Leave am as e be to use your brand color.",
    "theme": "Theme",
    "themeAuto": "Follow the visitor setting",
    "themeLight": "Light",
    "themeDark": "Dark",
    "layout": "Layout",
    "layoutFull": "Full (title, name and language)",
    "layoutCompact": "Small (email and button)",
    "preview": "Preview",
    "previewNote": "The preview dey live. If person sign up here, e go create real subscriber.",
    "missing": "Create newsletter first. The signup form go show here when e dey."
  },
  "page": {
    "poweredBy": "E dey run on AIBAN",
    "title": "Subscribe"
  },
  "signature": {
    "title": "Email signature",
    "intro": "Readers go see dis for the end of every issue. Click any part of the preview to edit am.",
    "show": "Show my signature for every issue",
    "showHint": "If you off am, issues go end after the article.",
    "preview": "Preview",
    "previewEmpty": "Your signature dey empty. Add your name to start.",
    "articleEnd": "End of the article",
    "tabContent": "Content",
    "tabStyle": "Style",
    "blocks": "Wetin to put inside",
    "blocksHint": "Select tag to show or hide that part. The parts wey you hide go still keep their text.",
    "layout": "Layout",
    "layouts": {
      "bar": "Color bar",
      "photo": "Photo",
      "stacked": "One on top the other",
      "centered": "For middle",
      "minimal": "Only text"
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
      "socials": "Social media links",
      "cta": "Button",
      "disclaimer": "Legal note"
    },
    "groups": {
      "about": "About you",
      "contact": "Contact",
      "images": "Pictures",
      "socials": "Social media links",
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
      "ctaLabel": "Book call",
      "ctaUrl": "https://"
    },
    "ctaText": "Button text",
    "ctaLink": "Button link",
    "hints": {
      "photoUrl": "Link to square PNG or JPG, at least 144 by 144 pixels and less than 200 KB. E go show as 72 by 72 pixels near your name.",
      "logoUrl": "Link to PNG or JPG wey get transparent or white background, at least 64 pixels tall. E go show 32 pixels tall.",
      "website": "We go add https:// if you no put am.",
      "cta": "You need both the text and the link before the button go show.",
      "disclaimer": "Small writing for the bottom, like confidentiality note. Leave am empty if you no need am."
    },
    "style": {
      "accent": "Accent color",
      "accentHint": "We dey use am for the bar, links and the button. E dey start with your brand color.",
      "font": "Font",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Text size",
      "sizeMd": "Normal",
      "sizeSm": "Small",
      "shape": "Photo shape",
      "shapeRound": "Round",
      "shapeSquare": "Square"
    },
    "hidden": "e dey hide",
    "reset": "Start again",
    "resetConfirm": "Select again to clear every field"
  }
};
