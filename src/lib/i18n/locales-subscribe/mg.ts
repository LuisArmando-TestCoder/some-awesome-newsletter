// mg strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale mg
export default {
  "welcome": {
    "title": "Tongasoa eto amin'ny gazetin-dahatsoratra",
    "invitedBy": "Nanasa anao hisoratra anarana i {configuratorId}."
  },
  "email": {
    "title": "Aiza no handefasanay ny laharana tsirairay?",
    "placeholder": "Ny mailakao"
  },
  "name": {
    "title": "Iza no anaranao?",
    "placeholder": "Ny anaranao"
  },
  "language": {
    "title": "Amin'ny fiteny inona no tianao hamakiana azy?"
  },
  "subscribed": {
    "title": "Voasoratra anarana ianao",
    "subtitle": "Jereo ny boaty mailakao mba hahitanao ny mailaka fanamafisana.",
    "continueTo": "Tohizo mankany",
    "finishingUp": "Azonao akatona ity pejy ity."
  },
  "form": {
    "heading": "Hisoratra anarana amin'ny {title}",
    "headingFallback": "Hisoratra anarana amin'ity gazety ity",
    "intro": "Tonga amin'ny mailaka ny laharana vaovao, voasoratra amin'ny fiteny nofidinao.",
    "from": "Avy amin'i {sender}",
    "emailLabel": "Adiresy mailaka",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Anarana",
    "optional": "tsy voatery",
    "nameHint": "Ampiasainay hiarahabana anao izy io. Raha avelanao ho foana, ny fiandohan'ny adiresy mailakao no ampiasainay.",
    "languageLabel": "Fiteny ho an'ny laharanao",
    "languageSummary": "Laharana amin'ny {language}.",
    "languageChange": "Ovay",
    "languageHint": "Nalainay tamin'ny fikirakiran'ny mpitety tranonkalanao ity.",
    "submit": "Hisoratra anarana",
    "submitting": "Eo am-pisoratana anarana...",
    "consent": "Amin'ny fisoratana anarana dia manaiky ianao handray mailaka avy amin'i {sender}. Misy rohy hialana amin'ny fisoratana anarana ny mailaka tsirairay.",
    "privacy": "Politikan'ny fiainana manokana",
    "loadingInfo": "Eo am-pakana ny antsipirian'ny gazety"
  },
  "success": {
    "title": "Jereo ny boaty mailakao",
    "body": "Nandefa mailaka fanamafisana tany amin'ny {email} izahay. Sokafy izy io ary safidio ny Hamafiso ny fisoratana anarana.",
    "next": "Tonga aorian'ny fanamafisanao ny laharana voalohany, voasoratra amin'ny {language}.",
    "spam": "Raha tsy misy tonga ao anatin'ny minitra vitsy, jereo ao amin'ny spam na Promotions.",
    "changeEmail": "Mampiasà mailaka hafa",
    "continueTo": "Tohizo any amin'ny {host}"
  },
  "errors": {
    "emailRequired": "Ampidiro ny adiresy mailakao.",
    "emailInvalid": "Toa tsy feno ity adiresy mailaka ity. Hamarino ary andramo indray.",
    "missingLink": "Tsy ampy fampahalalana ity rohy fisoratana anarana ity. Angataho rohy vaovao ny mpandefa.",
    "notFound": "Tsy mandeha intsony ity rohy fisoratana anarana ity. Angataho rohy vaovao ny mpandefa.",
    "limit": "Tsy afaka mandray mpisoratra anarana vaovao ity gazety ity amin'izao fotoana izao. Andramo indray any aoriana.",
    "invalid": "Tsy afaka nandray ity adiresy ity izahay. Hamarino ary andramo indray.",
    "server": "Tsy afaka nitahiry ny fisoratanao anarana izahay. Andramo indray afaka kelikely.",
    "network": "Tsy afaka nifandray tamin'ny mpizara izahay. Hamarino ny fifandraisanao ary andramo indray."
  },
  "confirm": {
    "title": "Hamafiso ny fisoratanao anarana",
    "body": "Safidio ny bokotra mba hanombohanao handray laharana ao amin'ny {email}.",
    "button": "Hamafiso ny fisoratana anarana",
    "confirming": "Eo am-panamafisana...",
    "consent": "Amin'ny fanamafisana dia manaiky ianao handray ity gazety ity amin'ny mailaka. Afaka miala amin'ny laharana rehetra ianao.",
    "successTitle": "Voasoratra anarana ianao",
    "successBody": "Ho tonga ao amin'ny {email} ny laharana vaovao.",
    "successTip": "Mba tsy hiditra ao amin'ny spam izy ireo, ampio ao amin'ny lisitry ny fifandraisanao ny mpandefa.",
    "invalidTitle": "Tsy feno ity rohy ity",
    "invalidBody": "Sokafy indray ny mailaka fanamafisana ary safidio ny bokotra ao aminy. Raha tsy hitanao izy, misorata anarana indray avy amin'ny pejin'ny mpandefa.",
    "notFoundBody": "Tsy nahita fisoratana anarana ho an'ity adiresy ity izahay. Misorata anarana indray avy amin'ny pejin'ny mpandefa.",
    "errorBody": "Tsy afaka nanamafy ny fisoratanao anarana izahay. Andramo indray afaka kelikely.",
    "retry": "Andramo indray",
    "home": "Mankanesa amin'ny pejy fandraisana"
  },
  "embed": {
    "title": "Ampio taratasy fisoratana anarana ny tranonkalanao",
    "intro": "Apetaho ao amin'ny tranonkalanao ny iray amin'ireo kaody ireo. Mahazo mailaka fanamafisana ireo misoratra anarana, avy eo ny laharanao amin'ny fiteniny manokana.",
    "linkLabel": "Rohin'ny pejy fisoratana anarana",
    "linkHint": "Zarao ao amin'ny bio amin'ny tambajotra sosialy, sonia mailaka na kaody QR.",
    "scriptLabel": "Tag script (soso-kevitra)",
    "scriptHint": "Apetaho eo amin'ny toerana tokony hisehoan'ny taratasy. Manitsy ny habeny ho azy ny taratasy.",
    "iframeLabel": "Iframe",
    "iframeHint": "Ampiasao ity raha tsy mamela script ny tranonkalanao.",
    "copy": "Adikao",
    "copied": "Voadika",
    "copyFailed": "Safidio ny soratra ary adikao amin'ny tanana.",
    "options": "Safidin'ny taratasy",
    "accent": "Lokon'ny bokotra",
    "accentHint": "Avelao toy izao mba hampiasana ny lokon'ny marikao.",
    "theme": "Endrika",
    "themeAuto": "Araka ny fikirakiran'ny mpitsidika",
    "themeLight": "Mazava",
    "themeDark": "Maizina",
    "layout": "Fandrafetana",
    "layoutFull": "Feno (lohateny, anarana ary fiteny)",
    "layoutCompact": "Fohy (mailaka sy bokotra)",
    "preview": "Topi-maso",
    "previewNote": "Mandeha tokoa ity topi-maso ity. Mamorona mpisoratra anarana tena izy ny fisoratana anarana eto.",
    "missing": "Mamorona gazety aloha. Hiseho eto ny taratasy fisoratana anarana rehefa misy izy."
  },
  "page": {
    "poweredBy": "Mandeha amin'ny AIBAN",
    "title": "Hisoratra anarana"
  },
  "signature": {
    "title": "Sonia mailaka",
    "intro": "Hitan'ny mpamaky eo amin'ny faran'ny laharana tsirairay ity. Tsindrio ny ampahany rehetra amin'ny topi-maso mba hanovana azy.",
    "show": "Asehoy ny soniako amin'ny laharana rehetra",
    "showHint": "Raha vonoinao, mifarana aorian'ny lahatsoratra ny laharana.",
    "preview": "Topi-maso",
    "previewEmpty": "Foana ny soniao. Ampio ny anaranao hanombohana.",
    "articleEnd": "Faran'ny lahatsoratra",
    "tabContent": "Votoatiny",
    "tabStyle": "Endrika",
    "blocks": "Inona no ampidirina",
    "blocksHint": "Safidio ny tag iray mba hanehoana na hanafenana io ampahany io. Mitazona ny soratra ao aminy ireo ampahany miafina.",
    "layout": "Fandrafetana",
    "layouts": {
      "bar": "Tsipika miloko",
      "photo": "Sary",
      "stacked": "Mifanongoa",
      "centered": "Afovoany",
      "minimal": "Soratra ihany"
    },
    "fields": {
      "name": "Anarana",
      "role": "Andraikitra",
      "company": "Orinasa",
      "phone": "Telefaonina",
      "email": "Mailaka",
      "website": "Tranonkala",
      "address": "Adiresy",
      "photoUrl": "Sary",
      "logoUrl": "Logo",
      "socials": "Rohy tambajotra sosialy",
      "cta": "Bokotra",
      "disclaimer": "Fanamarihana ara-dalàna"
    },
    "groups": {
      "about": "Momba anao",
      "contact": "Fifandraisana",
      "images": "Sary",
      "socials": "Rohy tambajotra sosialy",
      "cta": "Bokotra",
      "disclaimer": "Fanamarihana ara-dalàna"
    },
    "placeholders": {
      "name": "Rasoa Rakoto",
      "role": "Mpanorina",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Lalana Lehibe, Antananarivo",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Hanao fotoana antso",
      "ctaUrl": "https://"
    },
    "ctaText": "Soratra amin'ny bokotra",
    "ctaLink": "Rohin'ny bokotra",
    "hints": {
      "photoUrl": "Rohy mankany amin'ny PNG na JPG efamira, farafahakeliny 144 x 144 piksely ary latsaky ny 200 KB. Aseho amin'ny 72 x 72 piksely eo akaikin'ny anaranao.",
      "logoUrl": "Rohy mankany amin'ny PNG na JPG manana ambadika mangarahara na fotsy, farafahakeliny 64 piksely ny haavony. Aseho amin'ny haavo 32 piksely.",
      "website": "Ampianay ny https:// raha tsy soratanao.",
      "cta": "Samy ilaina ny soratra sy ny rohy mba hisehoan'ny bokotra.",
      "disclaimer": "Soratra kely eo ambany, ohatra fanamarihana momba ny tsiambaratelo. Avelao ho foana raha tsy ilainao."
    },
    "style": {
      "accent": "Loko manasongadina",
      "accentHint": "Ampiasaina amin'ny tsipika, rohy ary bokotra. Ny lokon'ny marikao no voalohany.",
      "font": "Endri-tsoratra",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "Haben'ny soratra",
      "sizeMd": "Mahazatra",
      "sizeSm": "Kely",
      "shape": "Endriky ny sary",
      "shapeRound": "Boribory",
      "shapeSquare": "Efamira"
    },
    "hidden": "miafina",
    "reset": "Atombohy indray",
    "resetConfirm": "Safidio indray mba hamafana ny saha rehetra"
  }
};
