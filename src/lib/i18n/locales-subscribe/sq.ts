// sq strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale sq
export default {
  "welcome": {
    "title": "Mirë se vini në buletin",
    "invitedBy": "{configuratorId} ju fton të abonoheni."
  },
  "email": {
    "title": "Ku t'ju dërgojmë çdo numër?",
    "placeholder": "Email-i juaj"
  },
  "name": {
    "title": "Si quheni?",
    "placeholder": "Emri juaj"
  },
  "language": {
    "title": "Në cilën gjuhë doni të lexoni?"
  },
  "subscribed": {
    "title": "Jeni abonuar",
    "subtitle": "Në kutinë postare do të gjeni një email konfirmimi.",
    "continueTo": "Vazhdo tek",
    "finishingUp": "Mund ta mbyllni këtë faqe."
  },
  "form": {
    "heading": "Abonohuni te {title}",
    "headingFallback": "Abonohuni te ky buletin",
    "intro": "Numrat e rinj vijnë me email, të shkruar në gjuhën që zgjidhni.",
    "from": "Nga {sender}",
    "emailLabel": "Adresa e emailit",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Emri",
    "optional": "opsionale",
    "nameHint": "E përdorim për t'ju përshëndetur. Nëse e lini bosh, përdorim fillimin e adresës suaj të emailit.",
    "languageLabel": "Gjuha e numrave",
    "languageSummary": "Numrat në {language}.",
    "languageChange": "Ndrysho",
    "languageHint": "E zgjodhëm sipas cilësimeve të shfletuesit tuaj.",
    "submit": "Abonohu",
    "submitting": "Po abonoheni...",
    "consent": "Duke u abonuar, pranoni të merrni email nga {sender}. Çdo email ka një lidhje për çabonim.",
    "privacy": "Politika e privatësisë",
    "loadingInfo": "Po ngarkohen të dhënat e buletinit"
  },
  "success": {
    "title": "Kontrolloni kutinë postare",
    "body": "Dërguam një email konfirmimi në {email}. Hapeni dhe zgjidhni Konfirmo abonimin.",
    "next": "Numri i parë vjen pasi të konfirmoni, i shkruar në {language}.",
    "spam": "Nëse nuk vjen asgjë brenda pak minutash, shikoni te dosja e postës së padëshiruar ose te Promocionet.",
    "changeEmail": "Përdor një email tjetër",
    "continueTo": "Vazhdo te {host}"
  },
  "errors": {
    "emailRequired": "Shkruani adresën tuaj të emailit.",
    "emailInvalid": "Kjo adresë emaili duket e paplotë. Kontrollojeni dhe provoni përsëri.",
    "missingLink": "Kësaj lidhjeje abonimi i mungojnë të dhëna. Kërkojini dërguesit një lidhje të re.",
    "notFound": "Kjo lidhje abonimi nuk funksionon më. Kërkojini dërguesit një lidhje të re.",
    "limit": "Ky buletin nuk mund të pranojë abonentë të rinj tani. Provoni më vonë.",
    "invalid": "Nuk mundëm ta pranojmë këtë adresë. Kontrollojeni dhe provoni përsëri.",
    "server": "Nuk mundëm ta ruajmë abonimin tuaj. Provoni përsëri pas pak.",
    "network": "Nuk mundëm të lidhemi me serverin. Kontrolloni lidhjen dhe provoni përsëri."
  },
  "confirm": {
    "title": "Konfirmoni abonimin",
    "body": "Zgjidhni butonin për të filluar të merrni numrat në {email}.",
    "button": "Konfirmo abonimin",
    "confirming": "Po konfirmohet...",
    "consent": "Duke konfirmuar, pranoni ta merrni këtë buletin me email. Mund të çabonoheni nga çdo numër.",
    "successTitle": "Jeni abonuar",
    "successBody": "Numrat e rinj do të vijnë në {email}.",
    "successTip": "Që të mos përfundojnë te posta e padëshiruar, shtojeni dërguesin te kontaktet.",
    "invalidTitle": "Kjo lidhje është e paplotë",
    "invalidBody": "Hapni përsëri emailin e konfirmimit dhe zgjidhni butonin në të. Nëse nuk e gjeni, abonohuni përsëri nga faqja e dërguesit.",
    "notFoundBody": "Nuk gjetëm abonim për këtë adresë. Abonohuni përsëri nga faqja e dërguesit.",
    "errorBody": "Nuk mundëm ta konfirmojmë abonimin tuaj. Provoni përsëri pas pak.",
    "retry": "Provo përsëri",
    "home": "Shko te faqja kryesore"
  },
  "embed": {
    "title": "Shtoni një formular abonimi në faqen tuaj",
    "intro": "Ngjitni një nga këto pjesë kodi në faqen tuaj. Kush abonohet merr një email konfirmimi, pastaj numrat tuaj në gjuhën e vet.",
    "linkLabel": "Lidhja e faqes së abonimit",
    "linkHint": "Ndajeni në përshkrimin e një profili social, në nënshkrimin e emailit ose në një kod QR.",
    "scriptLabel": "Etiketë script (e rekomanduar)",
    "scriptHint": "Ngjiteni aty ku duhet të shfaqet formulari. Formulari e përshtat vetë madhësinë.",
    "iframeLabel": "Iframe",
    "iframeHint": "Përdoreni këtë nëse faqja juaj nuk lejon skripte.",
    "copy": "Kopjo",
    "copied": "U kopjua",
    "copyFailed": "Përzgjidhni tekstin dhe kopjojeni vetë.",
    "options": "Opsionet e formularit",
    "accent": "Ngjyra e butonit",
    "accentHint": "Lëreni siç është për të përdorur ngjyrën e markës suaj.",
    "theme": "Tema",
    "themeAuto": "Sipas cilësimit të vizitorit",
    "themeLight": "E çelët",
    "themeDark": "E errët",
    "layout": "Paraqitja",
    "layoutFull": "E plotë (titulli, emri dhe gjuha)",
    "layoutCompact": "Kompakte (emaili dhe butoni)",
    "preview": "Parapamje",
    "previewNote": "Parapamja është reale. Një abonim këtu krijon një abonent të vërtetë.",
    "missing": "Krijoni fillimisht një buletin. Formulari i abonimit shfaqet këtu kur ai të ekzistojë."
  },
  "page": {
    "poweredBy": "Funksionon me AIBAN",
    "title": "Abonohuni"
  },
  "signature": {
    "title": "Nënshkrimi i emailit",
    "intro": "Lexuesit e shohin në fund të çdo numri. Klikoni çdo pjesë të parapamjes për ta redaktuar.",
    "show": "Shfaq nënshkrimin tim në çdo numër",
    "showHint": "Nëse e çaktivizoni, numrat mbarojnë pas artikullit.",
    "preview": "Parapamje",
    "previewEmpty": "Nënshkrimi juaj është bosh. Për të filluar, shtoni emrin tuaj.",
    "articleEnd": "Fundi i artikullit",
    "tabContent": "Përmbajtja",
    "tabStyle": "Stili",
    "blocks": "Çfarë të përfshihet",
    "blocksHint": "Zgjidhni një etiketë për ta shfaqur ose fshehur atë pjesë. Pjesët e fshehura e ruajnë tekstin e tyre.",
    "layout": "Paraqitja",
    "layouts": {
      "bar": "Shirit me ngjyrë",
      "photo": "Foto",
      "stacked": "Njëra mbi tjetrën",
      "centered": "Në qendër",
      "minimal": "Vetëm tekst"
    },
    "fields": {
      "name": "Emri",
      "role": "Pozicioni",
      "company": "Kompania",
      "phone": "Telefoni",
      "email": "Emaili",
      "website": "Faqja e internetit",
      "address": "Adresa",
      "photoUrl": "Foto",
      "logoUrl": "Logoja",
      "socials": "Lidhjet sociale",
      "cta": "Butoni",
      "disclaimer": "Shënim ligjor"
    },
    "groups": {
      "about": "Rreth jush",
      "contact": "Kontakti",
      "images": "Imazhet",
      "socials": "Lidhjet sociale",
      "cta": "Butoni",
      "disclaimer": "Shënim ligjor"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Themeluese",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Rruga Kryesore 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Rezervo një telefonatë",
      "ctaUrl": "https://"
    },
    "ctaText": "Teksti i butonit",
    "ctaLink": "Lidhja e butonit",
    "hints": {
      "photoUrl": "Lidhje drejt një imazhi katror PNG ose JPG, të paktën 144 me 144 piksel dhe nën 200 KB. Shfaqet në 72 me 72 piksel pranë emrit tuaj.",
      "logoUrl": "Lidhje drejt një imazhi PNG ose JPG me sfond transparent ose të bardhë, të paktën 64 piksel i lartë. Shfaqet me lartësi 32 piksel.",
      "website": "Nëse e lini jashtë https://, e shtojmë ne.",
      "cta": "Butoni shfaqet vetëm kur plotësoni edhe tekstin, edhe lidhjen.",
      "disclaimer": "Shkrim i vogël në fund, për shembull një shënim konfidencialiteti. Lëreni bosh nëse nuk ju duhet."
    },
    "style": {
      "accent": "Ngjyra theksuese",
      "accentHint": "Përdoret për shiritin, lidhjet dhe butonin. Fillon me ngjyrën e markës suaj.",
      "font": "Shkronjat",
      "fontSans": "Pa serif",
      "fontSerif": "Me serif",
      "size": "Madhësia e tekstit",
      "sizeMd": "Normale",
      "sizeSm": "E vogël",
      "shape": "Forma e fotos",
      "shapeRound": "E rrumbullakët",
      "shapeSquare": "Katrore"
    },
    "hidden": "e fshehur",
    "reset": "Fillo nga e para",
    "resetConfirm": "Zgjidhni përsëri për të pastruar të gjitha fushat"
  }
};
