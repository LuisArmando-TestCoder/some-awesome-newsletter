// fi strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale fi
export default {
  "welcome": {
    "title": "Tervetuloa uutiskirjeen tilaajaksi",
    "invitedBy": "{configuratorId} kutsui sinut tilaamaan."
  },
  "email": {
    "title": "Mihin lähetämme jokaisen numeron?",
    "placeholder": "Sähköpostisi"
  },
  "name": {
    "title": "Mikä on nimesi?",
    "placeholder": "Nimesi"
  },
  "language": {
    "title": "Millä kielellä haluat lukea?"
  },
  "subscribed": {
    "title": "Olet nyt tilaaja",
    "subtitle": "Katso saapuneista vahvistusviesti.",
    "continueTo": "Jatka",
    "finishingUp": "Voit sulkea tämän sivun."
  },
  "form": {
    "heading": "Tilaa {title}",
    "headingFallback": "Tilaa tämä uutiskirje",
    "intro": "Uudet numerot tulevat sähköpostiin valitsemallasi kielellä.",
    "from": "Lähettäjä: {sender}",
    "emailLabel": "Sähköpostiosoite",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Etunimi",
    "optional": "valinnainen",
    "nameHint": "Käytämme sitä tervehdyksessä. Jos jätät kentän tyhjäksi, käytämme sähköpostiosoitteesi alkuosaa.",
    "languageLabel": "Numeroiden kieli",
    "languageSummary": "Numerot kielellä {language}.",
    "languageChange": "Vaihda",
    "languageHint": "Valitsimme tämän selaimesi asetusten perusteella.",
    "submit": "Tilaa",
    "submitting": "Tilataan...",
    "consent": "Tilaamalla hyväksyt sähköpostien vastaanottamisen lähettäjältä {sender}. Jokaisessa viestissä on linkki tilauksen perumiseen.",
    "privacy": "Tietosuojaseloste",
    "loadingInfo": "Ladataan uutiskirjeen tietoja"
  },
  "success": {
    "title": "Katso sähköpostisi",
    "body": "Lähetimme vahvistusviestin osoitteeseen {email}. Avaa se ja valitse Vahvista tilaus.",
    "next": "Ensimmäinen numero tulee vahvistuksen jälkeen kielellä {language}.",
    "spam": "Jos mitään ei tule muutamassa minuutissa, katso roskaposti- tai Tarjoukset-kansio.",
    "changeEmail": "Käytä toista sähköpostiosoitetta",
    "continueTo": "Jatka sivustolle {host}"
  },
  "errors": {
    "emailRequired": "Kirjoita sähköpostiosoitteesi.",
    "emailInvalid": "Sähköpostiosoite näyttää puutteelliselta. Tarkista se ja yritä uudelleen.",
    "missingLink": "Tästä tilauslinkistä puuttuu tietoja. Pyydä lähettäjältä uusi linkki.",
    "notFound": "Tämä tilauslinkki ei enää toimi. Pyydä lähettäjältä uusi linkki.",
    "limit": "Tämä uutiskirje ei juuri nyt voi ottaa uusia tilaajia. Yritä myöhemmin uudelleen.",
    "invalid": "Emme voineet hyväksyä tätä osoitetta. Tarkista se ja yritä uudelleen.",
    "server": "Emme voineet tallentaa tilaustasi. Yritä hetken kuluttua uudelleen.",
    "network": "Emme saaneet yhteyttä palvelimeen. Tarkista yhteytesi ja yritä uudelleen."
  },
  "confirm": {
    "title": "Vahvista tilauksesi",
    "body": "Valitse painike, niin numerot alkavat tulla osoitteeseen {email}.",
    "button": "Vahvista tilaus",
    "confirming": "Vahvistetaan...",
    "consent": "Vahvistamalla hyväksyt, että saat tämän uutiskirjeen sähköpostiisi. Voit perua tilauksen mistä tahansa numerosta.",
    "successTitle": "Olet nyt tilaaja",
    "successBody": "Uudet numerot tulevat osoitteeseen {email}.",
    "successTip": "Lisää lähettäjä yhteystietoihisi, niin viestit eivät päädy roskapostiin.",
    "invalidTitle": "Linkki on puutteellinen",
    "invalidBody": "Avaa vahvistusviesti uudelleen ja valitse sen painike. Jos et löydä viestiä, tilaa uudelleen lähettäjän sivulta.",
    "notFoundBody": "Emme löytäneet tilausta tälle osoitteelle. Tilaa uudelleen lähettäjän sivulta.",
    "errorBody": "Emme voineet vahvistaa tilaustasi. Yritä hetken kuluttua uudelleen.",
    "retry": "Yritä uudelleen",
    "home": "Siirry etusivulle"
  },
  "embed": {
    "title": "Lisää tilauslomake sivustollesi",
    "intro": "Liitä yksi näistä koodinpätkistä sivustollesi. Tilaajat saavat vahvistusviestin ja sen jälkeen numerosi omalla kielellään.",
    "linkLabel": "Tilaussivun linkki",
    "linkHint": "Jaa se somen profiilitekstissä, sähköpostin allekirjoituksessa tai QR-koodina.",
    "scriptLabel": "Script-tagi (suositus)",
    "scriptHint": "Liitä se kohtaan, jossa lomakkeen pitää näkyä. Lomake säätää kokonsa itse.",
    "iframeLabel": "Iframe",
    "iframeHint": "Käytä tätä, jos sivustosi ei salli skriptejä.",
    "copy": "Kopioi",
    "copied": "Kopioitu",
    "copyFailed": "Valitse teksti ja kopioi se itse.",
    "options": "Lomakkeen asetukset",
    "accent": "Painikkeen väri",
    "accentHint": "Jätä ennalleen, niin käytössä on brändisi väri.",
    "theme": "Teema",
    "themeAuto": "Kävijän asetuksen mukaan",
    "themeLight": "Vaalea",
    "themeDark": "Tumma",
    "layout": "Asettelu",
    "layoutFull": "Täysi (otsikko, nimi ja kieli)",
    "layoutCompact": "Tiivis (sähköposti ja painike)",
    "preview": "Esikatselu",
    "previewNote": "Esikatselu on toimiva. Tässä tehty tilaus luo oikean tilaajan.",
    "missing": "Luo ensin uutiskirje. Tilauslomake näkyy tässä, kun uutiskirje on olemassa."
  },
  "page": {
    "poweredBy": "Toteutettu AIBANilla",
    "title": "Tilaa"
  },
  "signature": {
    "title": "Sähköpostin allekirjoitus",
    "intro": "Lukijat näkevät tämän jokaisen numeron lopussa. Muokkaa mitä tahansa osaa klikkaamalla sitä esikatselussa.",
    "show": "Näytä allekirjoitukseni jokaisessa numerossa",
    "showHint": "Jos poistat sen käytöstä, numerot päättyvät artikkeliin.",
    "preview": "Esikatselu",
    "previewEmpty": "Allekirjoituksesi on tyhjä. Aloita lisäämällä nimesi.",
    "articleEnd": "Artikkelin loppu",
    "tabContent": "Sisältö",
    "tabStyle": "Tyyli",
    "blocks": "Mitä näytetään",
    "blocksHint": "Valitse tunniste näyttääksesi tai piilottaaksesi osan. Piilotetut osat säilyttävät tekstinsä.",
    "layout": "Asettelu",
    "layouts": {
      "bar": "Väripalkki",
      "photo": "Kuva",
      "stacked": "Allekkain",
      "centered": "Keskitetty",
      "minimal": "Vain teksti"
    },
    "fields": {
      "name": "Nimi",
      "role": "Tehtävänimike",
      "company": "Yritys",
      "phone": "Puhelin",
      "email": "Sähköposti",
      "website": "Verkkosivusto",
      "address": "Osoite",
      "photoUrl": "Kuva",
      "logoUrl": "Logo",
      "socials": "Somelinkit",
      "cta": "Painike",
      "disclaimer": "Oikeudellinen huomautus"
    },
    "groups": {
      "about": "Tietoja sinusta",
      "contact": "Yhteystiedot",
      "images": "Kuvat",
      "socials": "Somelinkit",
      "cta": "Painike",
      "disclaimer": "Oikeudellinen huomautus"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Perustaja",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Pääkatu 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Varaa puhelu",
      "ctaUrl": "https://"
    },
    "ctaText": "Painikkeen teksti",
    "ctaLink": "Painikkeen linkki",
    "hints": {
      "photoUrl": "Linkki neliön muotoiseen PNG- tai JPG-kuvaan, vähintään 144 x 144 pikseliä ja alle 200 kt. Näkyy nimesi vieressä kokoa 72 x 72 pikseliä.",
      "logoUrl": "Linkki PNG- tai JPG-kuvaan, jossa on läpinäkyvä tai valkoinen tausta ja korkeutta vähintään 64 pikseliä. Näkyy 32 pikselin korkuisena.",
      "website": "Lisäämme alkuun https://, jos jätät sen pois.",
      "cta": "Painike näkyy vain, kun sekä teksti että linkki on annettu.",
      "disclaimer": "Pientä tekstiä alareunassa, esimerkiksi luottamuksellisuushuomautus. Jätä tyhjäksi, jos et tarvitse sitä."
    },
    "style": {
      "accent": "Korostusväri",
      "accentHint": "Käytetään palkissa, linkeissä ja painikkeessa. Oletuksena brändisi väri.",
      "font": "Fontti",
      "fontSans": "Groteski",
      "fontSerif": "Antiikva",
      "size": "Tekstin koko",
      "sizeMd": "Normaali",
      "sizeSm": "Pieni",
      "shape": "Kuvan muoto",
      "shapeRound": "Pyöreä",
      "shapeSquare": "Neliö"
    },
    "hidden": "piilotettu",
    "reset": "Aloita alusta",
    "resetConfirm": "Valitse uudelleen tyhjentääksesi kaikki kentät"
  }
};
