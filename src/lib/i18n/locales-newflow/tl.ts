export default {
  step01: {
    title: "Ang AI na parang tao ay awtomatikong nagsusulat ng mga newsletter para sa iyong mga subscriber",
    subtitle: "Gaano kadalas, piliin ang <u>bawat buwan</u> o <u>bawat linggo</u> o <u>bawat araw</u> o <u>anong oras</u>"
  },
  step02: {
    title: "Wika ng newsletter",
    subtitle: "“ipapadala rin ang iyong newsletter sa partikular na wika ng bawat user kung magkaiba sila”"
  },
  step03: {
    title: "I-redirect (Opsyonal)",
    subtitle: "Gusto mo bang i-redirect ang user sa iyong pahina?",
    description: "Maaari mong i-paste ang isang link sa iyong pahina dito, bibilangin namin kung ilan ang pumasok mula sa mga email na ginawa ng AI",
    placeholder: "https://iyong-pahina.com"
  },
  step04: {
    title: "Uri ng balita na gusto mong piliin ng AI",
    subtitle: "Aling tema ng pag-uusap o paksa (hinuhulaan mula sa link ng pag-redirect kung nakatakda, kung hindi ay blangko)",
    placeholder: "hal. Artificial Intelligence, Marketing, Kalusugan..."
  },
  step05: {
    title: "I-customize ang Iyong Lagda",
    subtitle: "Magdisenyo nang biswal o direktang i-edit ang code",
    visualEditor: "Visual Editor",
    htmlSource: "HTML Source",
    livePreview: "Live Preview",
    yourName: "Iyong Pangalan",
    yourTitle: "Iyong Titulo",
    facebookProfile: "Facebook Profile",
    instagramProfile: "Instagram Profile",
    editHtml: "Direktang i-edit ang HTML...",
    warning: "⚠️ Ang mga pag-edit na ginawa dito ay mapapatungan kung babalik ka sa Visual Editor at gumawa ng mga pagbabago."
  },
  step06: {
    title: "Pinagmulan ng Balita",
    subtitle: "Aling website ng balita ang gusto mong gamitin?",
    description: "Maglagay ng URL o hayaan kaming pumili ng isa para sa iyo batay sa iyong paksa.",
    descriptionSmall: "Susuriin namin ang website upang mahanap ang pinakamahusay na nilalaman. Maaaring tumagal ito ng ilang segundo.",
    placeholder: "https://halimbawa.com",
    analyzing: "Sinusuri...",
    next: "Susunod",
    errors: {
      failedToGenerate: "Nabigo ang pagbuo ng selector. Pakisubukan muli o tingnan ang URL.",
      errorGenerating: "Nagkaroon ng error habang bumubuo ng selector.",
      invalidUrl: "Mangyaring maglagay ng valid na URL o pumili ng pinagmulan."
    }
  },
  step07: {
    title: "Selector ng Nilalaman",
    subtitle: "Isipin ang bawat website bilang isang <strong>aklatan na may natatanging layout</strong>.",
    explanation1: "Ang <strong>'Selector'</strong> na ito ay ang partikular na mapa na ginawa namin para sa website na ito. Sinasabi nito sa aming system kung saan eksaktong titingin upang kunin ang mga artikulong gusto mo, habang binabalewala ang mga pindutan ng menu at mga patalastas.",
    explanation2: "<strong>Awtomatiko naming pinunan ang mapang ito para sa iyo.</strong>",
    placeholder: "Selector string...",
    regenerate: "Bumuo Muli ng Selector",
    regenerating: "Bumubuo muli...",
    errors: {
      noUrl: "Walang URL ng pinagmulan ng balita na natagpuan.",
      failedRegenerate: "Nabigo ang pagbuo muli ng selector.",
      errorRegenerate: "Nagkaroon ng error habang bumubuo muli ng selector."
    }
  },
  step08: {
    title: "Silipin",
    placeholder: "Handa na bang bumuo ng iyong unang newsletter?",
    generateBtn: "Bumuo ng Newsletter Email",
    sentBtn: "Naipadala na! Tingnan ang iyong email",
    sendTestBtn: "Magpadala ng Test Email",
    regenerateBtn: "Bumuo Muli",
    loading: {
      initializing: "Nagsisimula...",
      starting: "Nagsisimula ang pagbuo...",
      scraping: "Kinukuha ang nilalaman...",
      translating: "Isinasalin ang artikulo...",
      formatting: "Pina-format ang email...",
      sending: "Kumokonekta sa email provider...",
      authenticating: "Nagpapatunay...",
      sendingArticle: "Ipinapadala ang artikulo...",
      creating: "Lumilikha ng pinagmulan ng balita...",
      saving: "Sine-save ang configuration...",
      finalizing: "Tinatapos ang pag-set up..."
    },
    errors: {
      generationFailed: "Nabigo ang pagbuo: ",
      createFailed: "Nabigo ang paglikha ng pinagmulan ng balita. Pakisubukan muli.",
      errorCreating: "Error sa paglikha ng pinagmulan ng balita: ",
      sendFailed: "Nabigo ang pagpapadala ng email: "
    },
    defaultSubject: "Ang Iyong Nabuo na Newsletter Preview"
  },
  step09: {
    title: "Upang ipadala ang artikulo mula sa iyong email",
    subtitle: "App Password (Opsyonal)",
    description: "(Kung mayroon kang mga serbisyo ng gmail, ilagay ang iyong app password dito)",
    label: "App Password",
    placeholder: "Iyong App Password"
  },
  step10: {
    title: "Gmail Address (Opsyonal)",
    subtitle: "Gmail Email Address",
    description: "Kung gusto mong magpadala mula sa isang partikular na Gmail address",
    placeholder: "iyong-email@gmail.com"
  },
  step11: {
    title: "Magpadala ng Test Email",
    subtitle: "Magpadala ng test email sa iyong sarili upang i-verify ang configuration.",
    sendNow: "Ipadala Ngayon",
    sent: "Naipadala na! Tingnan ang iyong email",
    loading: {
      connecting: "Kumokonekta sa email provider...",
      authenticating: "Nagpapatunay...",
      sending: "Ipinapadala ang artikulo..."
    }
  },
  step12: {
    title: "Ibahagi ang newsletter na ito sa iyong mga tagasunod",
    subtitle: "Link sa subscription funnel (bago sila magsimulang makatanggap ng email, kailangan nilang tanggapin ang iyong imbitasyon)",
    copy: "Kopyahin",
    copied: "Nakopya na ang link!"
  },
  step13: {
    title: "Plano at Mga Limitasyon",
    currentPlan: "Kasalukuyang Plano:",
    limits: "Mga Limitasyon:",
    unknown: "Hindi alam",
    changePlan: "Baguhin ang Plano",
    advancedFeatures: "Kailangan ng mas advanced na mga tampok?",
    developerText: "Tingnan ang aming seksyon ng developer upang isama ang newsletter subscription funnel na ito sa iyong server, isang blog ng lahat ng iyong nabuong artikulo, at pag-subscribe sa mga user mula sa iyong codebase gamit ang aming API Key.",
    dashboardBtn: "Pumunta sa Dashboard",
    usage: "Paggamit:",
    limitDetails: {
      free: "Limitasyon na 100 user",
      starter: "5 pinagmulan, 100k user",
      growth: "17 pinagmulan, 250k user",
      pro: "25 pinagmulan, 500k user",
      master: "50 pinagmulan, walang limitasyong user",
      vipfree: "VIP Libre"
    }
  }
};
