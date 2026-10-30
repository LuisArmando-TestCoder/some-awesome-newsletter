// tl strings for locales. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale tl
export default {
  "auth": {
    "logo": "/icons/logo.png",
    "login": {
      "pageTitle": "Mag-log in",
      "title": "Mag-log in sa AIBAN",
      "subtitle": "Kumonekta upang magpatuloy kung saan ka tumigil.",
      "google": "Magpatuloy gamit ang Google",
      "or": "o",
      "emailPlaceholder": "ikaw@halimbawa.com",
      "continueWithEmail": "Magpatuloy gamit ang email",
      "switchText": "Wala pang account?",
      "switchLink": "Mag-sign up",
      "switchHref": "/signup"
    },
    "signup": {
      "pageTitle": "Mag-sign up",
      "title": "Lumikha ng iyong account",
      "subtitle": "Hindi mo kailangan ng credit card.",
      "google": "Magpatuloy gamit ang Google",
      "or": "o",
      "emailPlaceholder": "ikaw@halimbawa.com",
      "continueWithEmail": "Magpatuloy gamit ang email",
      "switchText": "May account na ba?",
      "switchLink": "Mag-log in",
      "switchHref": "/login"
    }
  },
  "landing": {
    "seo": {
      "title": "AIBAN | Ang website mo, ginawang newsletter sa wika ng bawat mambabasa",
      "description": "Binabasa ng AIBAN ang na-publish mo na, sumusulat ng isyu ng newsletter sa sarili mong boses at ipinapadala ito sa pangalan mo. Natatanggap ito ng bawat subscriber sa sarili niyang wika.",
      "ogImageAlt": "Logo ng AIBAN"
    },
    "skipLink": "Lumaktaw sa pangunahing nilalaman",
    "hero": {
      "eyebrow": "Mga newsletter para sa mga negosyong nagbibigay ng serbisyo",
      "title": "Nagiging lingguhang newsletter ang website mo, sa wika ng bawat mambabasa",
      "lead": "Binabasa ng AIBAN ang content na na-publish mo na, sumusulat ng isyu sa sarili mong boses at ipinapadala ito sa pangalan mo. Natatanggap ito ng bawat subscriber sa wikang binabasa niya. Isang beses mo lang itong ise-set up at tuloy-tuloy na itong tatakbo.",
      "formLabel": "Ang website mo",
      "formPlaceholder": "kumpanyamo.com",
      "formHint": "Gagawa kami ng sample na isyu mula sa address na ilalagay mo. Libre ang pagsisimula at hindi mo kailangan ng card.",
      "formSubmit": "I-preview ang newsletter ko",
      "formError": "Maglagay ng web address gaya ng kumpanyamo.com.",
      "secondaryCta": "Tingnan kung paano ito gumagana"
    },
    "preview": {
      "badge": "Sample na preview",
      "note": "Sample na layout ito na may pansamantalang text. Kapag nagsimula ka na, isusulat ng AIBAN ang totoong isyu mula sa pinakabago mong artikulo.",
      "fromLabel": "Mula kay",
      "toLabel": "Para kay",
      "subjectLabel": "Subject",
      "languageLabel": "Wika ng mambabasa",
      "readOnBlog": "Basahin sa blog",
      "startCta": "Magsimula nang libre gamit ang {site}",
      "startCtaGeneric": "Magsimula nang libre",
      "liveRegion": "Na-update ang sample na preview para sa {site}."
    },
    "chain": {
      "eyebrow": "Paano ito gumagana",
      "title": "Isang input, tapos kusa na itong tatakbo",
      "lead": "Isang beses mo lang ibibigay sa AIBAN ang website mo. Pagkatapos noon, kusang mangyayari ang bawat hakbang sa ibaba, ayon sa iskedyul na pipiliin mo.",
      "triggerLabel": "Kapag",
      "actionLabel": "Tapos",
      "trigger": {
        "title": "Lunes na, 9:00",
        "body": "O anumang iskedyul na pipiliin mo: araw-araw, lingguhan o buwanan."
      },
      "steps": [
        {
          "title": "Hinahanap ng AIBAN ang pinakabago mong artikulo",
          "body": "Sinusuri nito ang website mo at pinipili ang artikulong pinakamahalaga sa ideal mong mambabasa."
        },
        {
          "title": "Isinusulat nito ang isyu sa boses mo",
          "body": "Muling isinusulat ang text para tunog ikaw, batay sa paraan ng pagsulat sa site mo."
        },
        {
          "title": "Isinasalin nito ang isyu para sa bawat mambabasa",
          "body": "Natatanggap ng bawat subscriber ang wikang pinili niya noong nag-sign up siya."
        },
        {
          "title": "Ipinapadala ito sa pangalan mo",
          "body": "Pangalan mo ang nakikita ng mga mambabasa, at sa inbox mo dumarating ang mga sagot nila."
        },
        {
          "title": "Pino-publish nito ang isyu sa blog mo",
          "body": "May sariling pampublikong pahina ng artikulo at sariling link din ang bawat isyu."
        },
        {
          "title": "Ipinapakita nito sa iyo ang nangyari",
          "body": "Nakalista sa dashboard mo kung sino ang sumali at aling mga link ang na-click ng mga mambabasa."
        }
      ],
      "alsoTitle": "Tumatakbo rin ito kapag",
      "also": [
        {
          "title": "May nag-sign up sa site mo",
          "body": "Nagkukumpirma sila sa email at nagsisimulang makatanggap ng mga isyu mo."
        },
        {
          "title": "Nag-paste ka ng link o text",
          "body": "Susulat at magpapadala ang AIBAN ng isyu tungkol dito gamit ang parehong mga hakbang."
        },
        {
          "title": "Nag-upload ka ng listahan ng contact",
          "body": "Nililinis ng AIBAN ang listahan, tinatanggal ang mga duplicate at hinuhulaan ang wika ng bawat contact."
        }
      ]
    },
    "languages": {
      "eyebrow": "Lahat ng wika",
      "title": "Natatanggap ng bawat mambabasa ang isyu sa sarili niyang wika",
      "body": "Hindi mo kailangang sumulat ng magkakahiwalay na bersyon. Isinasalin ng AIBAN ang bawat isyu sa lahat ng wikang binabasa ng mga subscriber mo at pinapanatili ang tono mo sa bawat isa. Kasama sa listahan ang Spanish, Portuguese, French, German, Hindi, Arabic, Japanese at marami pang iba.",
      "sampleNote": "Iisang sample na isyu, kung paano ito matatanggap ng tatlong mambabasa."
    },
    "sender": {
      "eyebrow": "Ang address mo",
      "title": "Ipinapadala sa pangalan mo",
      "body": "Dumarating ang mga isyu na may pangalan mo at email signature mo. Ipinapadala ito ng AIBAN mula sa sarili nitong verified address, kaya hindi mo kailangang ibigay sa amin ang anumang email password. Kapag sumagot ang isang reader, sa inbox mo napupunta ang sagot.",
      "inboxLabel": "Ganito ang itsura nito sa inbox ng mambabasa",
      "inboxFrom": "Ikaw",
      "inboxSubject": "Ngayong linggo mula sa {site}",
      "inboxSnippet": "Maikling buod ng pinakabago mong artikulo, isinulat sa boses mo.",
      "inboxTime": "9:00"
    },
    "grow": {
      "eyebrow": "Palakihin ang listahan mo",
      "title": "Signup form para sa site mo at blog na kusang napupuno",
      "items": [
        {
          "title": "Form sa pag-sign up",
          "body": "Ilagay ang AIBAN form sa website mo. Pinipili ng mga bagong mambabasa ang wika nila at nagkukumpirma sila sa email."
        },
        {
          "title": "Awtomatikong blog",
          "body": "Nagiging pampublikong pahina ng artikulo ang bawat isyu na mahahanap sa search at maibabahagi gamit ang link."
        },
        {
          "title": "Pag-import ng contact",
          "body": "Dalhin ang mga client na mayroon ka na mula sa CSV o Excel file, o mag-paste ng listahan."
        }
      ]
    },
    "useCases": {
      "eyebrow": "Para kanino ito",
      "title": "Ginawa para sa mga negosyong lumalago sa pamamagitan ng ugnayan",
      "lead": "Kung galing sa rekomendasyon at tiwala ang mga client mo, ang regular na mensahe mula sa iyo ang nagpapaalala sa kanila sa iyo. Isinusulat ng AIBAN ang mensaheng iyon para sa iyo.",
      "items": [
        {
          "title": "Mga agency at web designer",
          "body": "Ipadala linggo-linggo sa mga client at prospect ang pinakabago mong gawa at mga artikulo, at gamitin ang parehong setup para sa mga site ng client."
        },
        {
          "title": "Mga IT at software firm",
          "body": "Gawing maikling update ang mga release note at blog post na binabasa ng bawat client sa wika niya."
        },
        {
          "title": "Real estate at pabahay",
          "body": "Ibahagi ang mga bagong listing at post tungkol sa merkado sa mga buyer at seller na iba-iba ang wika."
        },
        {
          "title": "Mga abogado at accountant",
          "body": "Panatilihing updated ang mga client tungkol sa mga paksang isinusulat mo na, sa kalmado at pare-parehong format."
        },
        {
          "title": "Mga coach at trainer",
          "body": "Ipadala ang pinakabago mong aralin o artikulo sa komunidad mo sa takdang araw, nang hindi na ito isinusulat ulit."
        }
      ]
    },
    "pricingIntro": {
      "eyebrow": "Presyo",
      "title": "Magsimula nang libre, mag-upgrade kapag lumaki na ang listahan mo",
      "lead": "Kasama sa libreng plan ang 1 source at hanggang 100 subscriber. Nagdaragdag ang mga bayad na plan ng mas maraming source at subscriber."
    },
    "faqTitle": "Mga tanong bago magsimula",
    "faq": [
      {
        "id": "what-do-i-need",
        "q": "Ano ang kailangan ko para makapagsimula?",
        "a": "Ang address ng website mo at isang email address. Binabasa ng AIBAN ang site mo para matutunan ang mga paksa mo at kung paano ka sumulat."
      },
      {
        "id": "do-i-write",
        "q": "Kailangan ko bang sumulat ng kahit ano?",
        "a": "Hindi kailangan. Isinusulat ng AIBAN ang bawat isyu mula sa content mo. Kapag gusto mo ng isyu tungkol sa isang partikular na bagay, puwede kang mag-paste ng link o text."
      },
      {
        "id": "languages",
        "q": "Anong mga wika ang matatanggap ng mga mambabasa ko?",
        "a": "Isinasalin ng AIBAN ang bawat isyu sa wikang binabasa ng bawat subscriber. Makikita mo ang buong listahan ng mga wika kapag sine-set up mo ang newsletter mo."
      },
      {
        "id": "sender",
        "q": "Kanino galing ang mga email?",
        "a": "Mula sa sending address ng AIBAN, na pangalan mo ang nakalagay bilang sender. Diretso sa inbox mo ang mga sagot. Hindi mo kailanman ibibigay sa amin ang email password mo."
      },
      {
        "id": "contacts",
        "q": "Puwede ko bang dalhin ang mga contact ko?",
        "a": "Oo. Mag-upload ng CSV o Excel file, o mag-paste ng listahan. Nililinis ito ng AIBAN, tinatanggal ang mga duplicate at hinuhulaan ang wika ng bawat contact."
      },
      {
        "id": "schedule",
        "q": "Gaano kadalas ipinapadala ang mga isyu?",
        "a": "Ikaw ang pipili ng iskedyul kapag nag-set up ka, at puwede mo itong baguhin anumang oras sa dashboard mo."
      },
      {
        "id": "free-plan",
        "q": "May libreng plan ba?",
        "a": "Oo. Kasama sa libreng plan ang 1 source at hanggang 100 subscriber. Nagdaragdag ang mga bayad na plan ng mas maraming source at subscriber."
      },
      {
        "id": "cancel",
        "q": "Puwede ba akong magkansela?",
        "a": "Oo. Sumulat sa info@aiban.news anumang oras at kakanselahin namin ang paid plan mo o ibabalik ka namin sa Libreng plan."
      }
    ],
    "finalCta": {
      "title": "Magsimula sa website mo",
      "body": "Ibigay sa AIBAN ang website mo, tingnan ang unang isyu mo, tapos i-on ito kapag handa ka na.",
      "cta": "Magsimula nang libre",
      "secondary": "Basahin ang help center"
    },
    "footer": {
      "tagline": "Mga newsletter na isinulat mula sa sarili mong content at ipinapadala sa wika ng bawat mambabasa.",
      "product": "Produkto",
      "company": "Kumpanya",
      "legal": "Legal",
      "links": {
        "howItWorks": "Paano ito gumagana",
        "pricing": "Presyo",
        "demo": "Demo",
        "help": "Sentro ng tulong",
        "about": "Tungkol sa amin",
        "careers": "Trabaho",
        "privacy": "Patakaran sa privacy",
        "terms": "Mga tuntunin ng serbisyo",
        "cookies": "Patakaran sa cookie"
      },
      "contactLabel": "Contact",
      "rights": "Nakalaan ang lahat ng karapatan."
    }
  },
  "help": {
    "title": "Humiling ng mas mataas na limit",
    "subtitle": "Sabihin sa amin ang mga limit na kailangan mo at sasagot kami sa email.",
    "contact": {
      "cta": "Ipadala ang request",
      "successTitle": "Handa nang ipadala ang request",
      "successBody": "Nagbukas ang email app mo kasama ang request mo. Ipadala ito mula roon at sasagot kami sa email.",
      "learnMore": "/plans"
    },
    "questions": {
      "desiredLimitsHelp": "Sabihin sa amin ang mga limit na kailangan mo, halimbawa kung ilang subscriber at source.",
      "useCaseHelp": "Ilarawan kung ano ang ipinapadala mo, kanino at gaano kadalas.",
      "expectedSpendHelp": "Makakatulong ang tantiya para makapagmungkahi kami ng plan. Puwede mo itong iwan na hindi alam."
    },
    "form": {
      "nameLabel": "Pangalan",
      "emailLabel": "Email",
      "companyLabel": "Kumpanya",
      "optional": "(opsyonal)",
      "limitsLabel": "Mga limit na kailangan mo",
      "useCaseLabel": "Paano mo ginagamit ang AIBAN",
      "spendLabel": "Inaasahang gastos bawat buwan",
      "spend": {
        "lt500": "Mas mababa sa $500",
        "500_2k": "$500 hanggang $2,000",
        "2k_10k": "$2,000 hanggang $10,000",
        "gt10k": "Higit sa $10,000",
        "unknown": "Hindi ko pa alam"
      },
      "urgencyLabel": "Gaano kaapurahan",
      "urgency": {
        "low": "Mababa",
        "normal": "Karaniwan",
        "high": "Mataas"
      },
      "replyLabel": "Paano ka namin sasagutin?",
      "reply": {
        "email": "Sa email",
        "call": "Sa tawag sa telepono"
      },
      "payAsYouGo": "Interesado akong magbayad ayon sa paggamit",
      "sending": "Ipinapadala...",
      "sentTitle": "Naipadala ang request",
      "sentBody": "Natanggap namin ang request mo at sasagot kami sa email address na ibinigay mo.",
      "retryBefore": "Kung hindi nagbukas ang email app mo,",
      "retryLink": "buksan ulit ang request",
      "retryAfter": "o sumulat sa",
      "errors": {
        "name": "Ilagay ang pangalan mo (hindi bababa sa 2 character).",
        "email": "Maglagay ng email address na masasagot namin, gaya ng pangalan@example.com.",
        "company": "Maglagay ng hindi bababa sa 2 character, o iwanan itong blangko.",
        "desiredLimits": "Ilarawan ang mga limit na kailangan mo sa hindi bababa sa 10 character.",
        "useCase": "Ilarawan kung paano mo ito ginagamit sa hindi bababa sa 20 character."
      }
    },
    "faqs": [
      {
        "id": "limits-how",
        "q": "Paano gumagana ang mas mataas na limit?",
        "a": "Magpadala ng request kasama ang mga limit na kailangan mo. Sasagot kami sa email kasama ang mga opsyon para sa account mo."
      }
    ],
    "links": {
      "docs": "/plans",
      "community": "/help"
    }
  },
  "faq": [
    {
      "q": "Ano ang ginagawa ng AIBAN?",
      "a": "Binabasa ng AIBAN ang content na na-publish mo na, gaya ng website mo, blog mo o mga news site na pinili mo. Sumusulat ito ng mga bagong isyu sa sarili mong boses at ipinapadala ang mga ito bilang newsletter. Natatanggap ito ng bawat subscriber sa wikang pinili niya, na pangalan mo ang sender."
    },
    {
      "q": "May libreng plan ba?",
      "a": "Oo. Kasama sa Libreng plan ang 1 source at hanggang 100 subscriber. Kung kailangan mo ng higit pa, sumulat sa amin at papalitan namin ang plan mo."
    },
    {
      "q": "Paano natatanggap ng mga subscriber ang newsletter sa wika nila?",
      "a": "Pumipili ang bawat subscriber ng gustong wika kapag nag-sign up siya. Isinasalin ng AIBAN ang bawat isyu sa wikang iyon bago ito ipadala."
    },
    {
      "q": "Puwede bang manggaling ang mga isyu sa sarili kong email address?",
      "a": "Lumalabas ang mga isyu mula sa sending address ng AIBAN na may pangalan mo at email signature mo, at sa inbox mo napupunta ang mga sagot. Hindi namin hinihingi ang email password mo, kaya walang anumang sa iyo na puwedeng ma-leak."
    },
    {
      "q": "Paano nagsu-subscribe ang mga tao?",
      "a": "Makakakuha ka ng signup page at signup widget na puwede mong ilagay sa website mo. Puwede ka ring magdagdag ng mga tao mismo o mag-upload ng listahan."
    },
    {
      "q": "Puwede ba akong magkansela anumang oras?",
      "a": "Oo. Sumulat sa info@aiban.news anumang oras at kakanselahin namin ang paid plan mo o ibabalik ka namin sa Libreng plan."
    }
  ],
  "plans": {
    "currency": "USD",
    "billingIntervals": [
      "buwanan",
      "taunan"
    ],
    "currentPlan": "free",
    "plans": [
      {
        "id": "free",
        "name": "Libre",
        "monthly": 0,
        "yearly": 0,
        "tagline": "Subukan ang AIBAN gamit ang isang source",
        "featuresBase": [
          "1 source",
          "Hanggang 100 subscriber"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": 1,
          "users": 100
        },
        "ctaLabel": "Kasalukuyang plan",
        "tier": 0
      },
      {
        "id": "starter",
        "name": "Starter",
        "monthly": 17,
        "yearly": 132,
        "tagline": "Para sa lumalagong newsletters",
        "featuresBase": [
          "5 source",
          "Hanggang 100k subscriber"
        ],
        "featuresDelta": [
          "Suporta sa email",
          "Basic na pagsasalin"
        ],
        "limits": {
          "newsSources": 5,
          "users": 100000
        },
        "ctaLabel": "Piliin ang Starter",
        "productId": "prod_starter_id",
        "tier": 1
      },
      {
        "id": "growth",
        "name": "Growth",
        "monthly": 35,
        "yearly": 273,
        "tagline": "Para sa mga matatag nang newsletter",
        "featuresBase": [
          "17 source",
          "Hanggang 250k subscriber"
        ],
        "featuresDelta": [
          "Custom na branding",
          "Advanced na analytics"
        ],
        "limits": {
          "newsSources": 17,
          "users": 250000
        },
        "ctaLabel": "Piliin ang Growth",
        "productId": "prod_growth_id",
        "tier": 2
      },
      {
        "id": "pro",
        "name": "Pro",
        "monthly": 80,
        "yearly": 624,
        "tagline": "Para sa mga marketing professional",
        "featuresBase": [
          "25 source",
          "Hanggang 500k subscriber"
        ],
        "featuresDelta": [
          "Access sa API",
          "Priority na pagproseso"
        ],
        "limits": {
          "newsSources": 25,
          "users": 500000
        },
        "ctaLabel": "Piliin ang Pro",
        "productId": "prod_pro_id",
        "tier": 3
      },
      {
        "id": "master",
        "name": "Master",
        "monthly": 150,
        "yearly": 1170,
        "tagline": "Para sa malalaking audience",
        "featuresBase": [
          "50 source",
          "Walang limit na subscriber"
        ],
        "featuresDelta": [
          "Personal na suporta",
          "Custom na webhook"
        ],
        "limits": {
          "newsSources": 50,
          "users": -1
        },
        "ctaLabel": "Piliin ang Master",
        "productId": "prod_master_id",
        "tier": 4
      },
      {
        "id": "vipfree",
        "name": "VIP Libre",
        "monthly": 0,
        "yearly": 0,
        "tagline": "Full access para sa mga partner",
        "featuresBase": [
          "Walang limit na source",
          "Walang limit na subscriber"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": -1,
          "users": -1
        },
        "ctaLabel": "Kasalukuyang plan",
        "internalOnly": true,
        "tier": 5
      }
    ],
    "contact": {
      "text": "Kailangan ng custom na solusyon?",
      "cta": "Makipag-ugnayan sa amin",
      "href": "/help"
    }
  },
  "article": {
    "notFound": "Hindi nahanap ang artikulo.",
    "errorFetching": "Hindi namin ma-load ang article na ito. I-reload ang page pagkalipas ng isang minuto para subukan ulit.",
    "noArticleSpecified": "Walang tinukoy na artikulo.",
    "goBack": "Bumalik",
    "loading": "Naglo-load..."
  },
  "pricing": {
    "eyebrow": "Presyo",
    "title": "Mga plan at presyo",
    "currentPlan": "Kasalukuyang plan:",
    "monthly": "Buwanan",
    "yearly": "Taunan",
    "yearlySave": "Makatipid ng 35%",
    "intervalLabel": "Panahon ng billing",
    "billedYearly": "sinisingil taon-taon",
    "perMonthShort": "/mo",
    "perYearShort": "/yr",
    "freeCta": "Magsimula nang libre",
    "processing": "Binubuksan ang checkout...",
    "askMore": "Nagsisimula ang bawat account sa Libreng plan. Kung kailangan mo ng higit pa, sumulat sa amin sa {email} at papalitan namin ang plan mo.",
    "askFor": "Humingi ng {planName}",
    "askAction": "Sumulat sa amin",
    "checkoutError": "Hindi namin mabuksan ang checkout. Subukan ulit maya-maya.",
    "networkError": "Hindi namin maabot ang server. Tingnan ang koneksyon mo at subukan ulit.",
    "includes": "Kasama",
    "pageMetaTitle": "Presyo | AIBAN",
    "pageMetaDescription": "Mga plan at presyo ng AIBAN. Magsimula nang libre na may 1 source at hanggang 100 subscriber, saka lumipat sa buwanan o taunang plan kapag kailangan mo ng higit pa.",
    "pageTitle": "Presyo",
    "pageLead": "Magsimula sa Libreng plan na may 1 source at hanggang 100 subscriber. Kapag kailangan mo ng mas maraming source o subscriber, sumulat sa amin at ililipat ka namin sa paid plan na sinisingil buwan-buwan o taon-taon.",
    "faqTitle": "Mga tanong tungkol sa billing",
    "contactText": "Kailangan mo ba ng mas mataas na limit o custom na setup?",
    "contactCta": "Makipag-ugnayan sa amin",
    "everythingIn": "Lahat ng nasa nakaraang plan, plus:",
    "isCurrentPlan": "Ito ang iyong kasalukuyang plan",
    "downgradeTo": "Lumipat sa {planName}",
    "upgradeTo": "Piliin ang {planName}",
    "mockMode": "Mode ng pagsubok",
    "mostPopular": "Pinakasikat",
    "perMonth": "kada buwan",
    "perYear": "kada taon",
    "youSave": "Ang matitipid mo"
  },
  "confirmSubscription": {
    "title": "Kumpirmahin ang subscription mo",
    "goBack": "Bumalik",
    "pleaseAccept": "Mangyaring tanggapin ang terms para makumpleto ang iyong subscription.",
    "iAccept": "Tinatanggap ko ang",
    "termsAndConditions": "Kasunduan at mga Kondisyon",
    "and": "at",
    "privacyPolicy": "Patakaran sa Privacy",
    "confirm": "Kumpirmahin ang subscription",
    "mustAccept": "Kailangang tanggapin ang terms para makapag-subscribe.",
    "invalidLink": "Kulang ang confirmation link na ito. Buksan ang pinakabagong email na ipinadala namin at gamitin ang link doon."
  },
  "articles": {
    "title": "Mga pinakabagong artikulo",
    "subtitle": "Mga article na isinulat ng AIBAN para sa mga newsletter na ipinapadala nito.",
    "producedIn": "Mga wikang mayroon ang mga article na ito",
    "searchPlaceholder": "Maghanap ng mga artikulo...",
    "noArticlesFound": "Walang nahanap na artikulo.",
    "created": "Nilikha noong:",
    "language": "Wika:",
    "rightsReserved": "Nakalaan ang lahat ng karapatan.",
    "errorFetching": "Hindi namin ma-load ang mga article. I-reload ang page pagkalipas ng isang minuto para subukan ulit."
  },
  "blog": {
    "metaTitle": "Blog ng {name}",
    "metaDescription": "Mga artikulo mula sa {name}. Mag-subscribe para makatanggap ng mga bago sa email.",
    "eyebrow": "Blog ng newsletter",
    "heroFrom": "Mga artikulo mula sa {name}",
    "heroDescription": "Ito ang mga artikulong na-publish na ng newsletter na ito. Mag-subscribe para makatanggap ng mga bago sa email.",
    "subscribe": "Mag-subscribe",
    "home": "Home ng blog",
    "featured": "Pinakabagong artikulo",
    "latest": "Mga pinakabagong artikulo",
    "latestHint": "Nauuna ang pinakabago. Walang larawan ang ilang artikulo kaya text lang ang makikita.",
    "articleCount": "{count} artikulo sa {language}",
    "articleCountOne": "1 artikulo sa {language}",
    "languages": "Pumili ng wika",
    "minRead": "{n} minutong basa",
    "readArticle": "Basahin ang artikulo",
    "page": "Pahina {page}",
    "newer": "Mas bagong artikulo",
    "older": "Mas lumang artikulo",
    "pagination": "Mga pahina ng artikulo",
    "emptyTitle": "Wala pang artikulo",
    "emptyBody": "Wala pang na-publish na artikulo rito ang newsletter na ito. Mag-subscribe para matanggap ang una sa email.",
    "endTitle": "Wala nang mas lumang artikulo",
    "endBody": "Narating mo na ang dulo ng listahan.",
    "backToNewest": "Pumunta sa mga pinakabagong artikulo",
    "errorTitle": "Hindi namin ma-load ang mga artikulong ito",
    "errorBody": "Hindi sumagot sa oras ang server ng mga artikulo. I-reload ang pahina pagkalipas ng isang minuto para subukan ulit.",
    "reload": "I-reload ang pahina",
    "missingHolder": "Kulang ang link ng blog na ito dahil hindi nito sinasabi kung kaninong blog ang bubuksan. Hingin sa may-ari ng newsletter ang buong link.",
    "redirecting": "Binubuksan ang blog...",
    "publishedWith": "Na-publish gamit ang AIBAN",
    "cta": {
      "title": "Matanggap ang susunod na artikulo sa email",
      "body": "Mag-subscribe sa {name} at darating sa inbox mo ang mga bagong artikulo. Puwede kang mag-unsubscribe anumang oras.",
      "button": "Mag-subscribe"
    },
    "search": {
      "label": "Maghanap ng artikulo",
      "placeholder": "Maghanap ayon sa salita o parirala",
      "button": "Maghanap",
      "suggestions": "Mga mungkahi",
      "recent": "Mga kamakailang paghahanap",
      "clearRecent": "Burahin ang mga kamakailang paghahanap",
      "title": "Mga resulta ng paghahanap",
      "resultsFor": "Mga resulta para sa \"{q}\"",
      "count": "{count} artikulo ang nahanap",
      "countOne": "1 artikulo ang nahanap",
      "searching": "Naghahanap ng mga artikulo",
      "emptyTitle": "Walang artikulong tugma sa \"{q}\"",
      "emptyBody": "Tingnan ang spelling o subukan ang mas maikling salita. Puwede mo ring tingnan ang lahat ng artikulo sa blog.",
      "browseAll": "Tingnan ang lahat ng artikulo",
      "noQuery": "Mag-type ng salita o parirala sa itaas para maghanap sa blog na ito.",
      "error": "Huminto ang paghahanap dahil hindi sumagot ang server ng mga artikulo. Subukan ulit pagkalipas ng isang minuto.",
      "tryAgain": "Subukan ulit",
      "limitNote": "Ipinapakita ang unang {count} na tugma. Gumamit ng mas tiyak na parirala para paliitin ang listahan."
    },
    "article": {
      "back": "Lahat ng artikulo",
      "published": "Na-publish noong {date}",
      "by": "Ni {name}",
      "otherLanguages": "Magbasa pa sa ibang wika",
      "otherLanguagesHint": "Nagpa-publish din ang newsletter na ito sa mga wikang ito. Binubuksan ng bawat link ang blog sa wikang iyon.",
      "share": "Ibahagi ang artikulong ito",
      "copyLink": "Kopyahin ang link",
      "copied": "Nakopya ang link. Puwede mo itong i-paste kahit saan.",
      "copyFailed": "Hindi makopya ang link. Kopyahin na lang ito mula sa address bar ng browser mo.",
      "notFoundTitle": "Hindi nahanap ang artikulo",
      "notFoundBody": "Maaaring tinanggal na ang artikulong ito, o kulang ang link. Buksan ang blog para makita ang ibang mga artikulo.",
      "errorTitle": "Hindi namin ma-load ang artikulong ito",
      "errorBody": "Hindi sumagot sa oras ang server ng mga artikulo. I-reload ang pahina pagkalipas ng isang minuto para subukan ulit.",
      "goToBlog": "Pumunta sa blog"
    }
  },
  "nav": {
    "mainLabel": "Pangunahin",
    "legalLabel": "Legal",
    "home": "Home ng AIBAN",
    "menu": "Menu",
    "openMenu": "Buksan ang menu",
    "closeMenu": "Isara ang menu",
    "howItWorks": "Paano ito gumagana",
    "pricing": "Presyo",
    "help": "Tulong",
    "about": "Tungkol sa amin",
    "privacy": "Privacy",
    "terms": "Mga tuntunin",
    "cookies": "Cookies",
    "signOut": "Mag-sign out",
    "chooseLanguage": "Pumili ng wika",
    "currentLanguage": "Wika: {name}"
  },
  "about": {
    "metaTitle": "Tungkol sa amin | AIBAN",
    "metaDescription": "Ginagawa ng AIBAN na newsletter ang content na na-publish na ng isang negosyo. Kusa itong naipapadala, sa wika ng bawat subscriber, sa pangalan ng may-ari.",
    "eyebrow": "Tungkol sa amin",
    "title": "Tungkol sa AIBAN",
    "lead": "Ginagawa ng AIBAN na newsletter na kusang naipapadala ang content na na-publish na ng isang negosyo. Binabasa ito ng bawat subscriber sa sarili niyang wika, at dumarating ito sa pangalan ng may-ari.",
    "whatTitle": "Ano ang ginagawa ng AIBAN",
    "whatBody": [
      "Sasabihin mo sa AIBAN kung saan nakalagay ang content mo: ang website mo, ang blog mo o mga news site na sinusubaybayan mo. Kapag may bagong lumabas doon, susulat ang AIBAN ng isyu mula rito sa boses na inilarawan mo at ipapadala ito sa mga subscriber mo ayon sa iskedyul na pinili mo.",
      "Pumipili ng wika ang bawat subscriber kapag nag-sign up siya, at isinasalin ang bawat isyu sa wikang iyon bago ipadala. Pino-publish din ang mga artikulo bilang mga web page, at puwede mo itong ipadala sa sarili mong site."
    ],
    "whoTitle": "Sino ang gumawa nito",
    "whoBody": [
      "Ginawa ang AIBAN ni Luis Murillo Baltodano, ang founder nito. Si Luis ay isang creative engineer na may background sa computer graphics at automation.",
      "Nakalista sa ibaba ang ilan sa mga open source na gawa niya."
    ],
    "projectsTitle": "Open source na gawa ng founder",
    "projects": [
      {
        "name": "Scene Preset",
        "url": "https://github.com/LuisArmando-TestCoder/scene-preset",
        "desc": "Isang library na nagtatanggal ng paulit-ulit na boilerplate kapag gumagamit ng Three.js at mga 3D web API."
      },
      {
        "name": "Canvas Preset",
        "url": "https://github.com/LuisArmando-TestCoder/canvas-preset",
        "desc": "Mga helper para sa karaniwang gawain sa Canvas API."
      },
      {
        "name": "Atomic Gatsby template",
        "url": "https://github.com/LuisArmando-TestCoder/atomic-gatsby-typescript-recoiljs",
        "desc": "Starter template na inayos gamit ang atomic design."
      }
    ],
    "githubLabel": "Si Luis sa GitHub",
    "newTab": "(magbubukas sa bagong tab)",
    "contactTitle": "Makipag-ugnayan",
    "contactBody": "Para sa mga tanong, feedback o ideya para sa partnership, sumulat sa info@aiban.news.",
    "emailCta": "Mag-email sa info@aiban.news",
    "startCta": "Magsimula nang libre",
    "helpCta": "Basahin ang help center"
  },
  "careers": {
    "metaTitle": "Trabaho | AIBAN",
    "metaDescription": "Wala pang bakanteng posisyon ang AIBAN sa ngayon. Puwede ka pa ring sumulat sa amin sa info@aiban.news.",
    "eyebrow": "Trabaho",
    "title": "Magtrabaho sa AIBAN",
    "lead": "Wala pang bakanteng posisyon ang AIBAN sa ngayon.",
    "body": "Kapag may nagbukas na posisyon, ililista ito sa pahinang ito. Kung gusto mong magtrabaho sa AIBAN sa hinaharap, magpadala ng maikling mensahe tungkol sa sarili mo at kung ano ang gusto mong buuin.",
    "emailCta": "Mag-email sa info@aiban.news",
    "emailSubject": "Pagtatrabaho sa AIBAN",
    "aboutCta": "Basahin ang tungkol sa AIBAN"
  },
  "legal": {
    "navLabel": "Mga legal na dokumento",
    "lastUpdated": "Huling na-update: {date}",
    "privacy": {
      "title": "Patakaran sa privacy",
      "metaTitle": "Patakaran sa privacy | AIBAN",
      "metaDescription": "Kung paano kinokolekta, ginagamit at pinoprotektahan ng AIBAN ang data mo, at kung paano mo magagamit ang mga karapatan mo sa data."
    },
    "terms": {
      "title": "Mga tuntunin ng serbisyo",
      "metaTitle": "Mga tuntunin ng serbisyo | AIBAN",
      "metaDescription": "Ang mga tuntuning umiiral kapag gumawa ka ng account at ginamit mo ang AIBAN."
    },
    "cookies": {
      "title": "Patakaran sa cookie",
      "metaTitle": "Patakaran sa cookie | AIBAN",
      "metaDescription": "Kung aling mga cookie ang ginagamit ng AIBAN, ano ang ginagawa nila, gaano katagal ang mga ito at paano mo makokontrol ang mga ito."
    }
  },
  "demoPage": {
    "metaTitle": "Demo | AIBAN",
    "metaDescription": "Panoorin ang walkthrough ng AIBAN at tingnan kung ano ang nangyayari pagkatapos mong mag-sign up, mula sa pagdagdag ng website mo hanggang sa pagpapadala ng unang isyu mo.",
    "eyebrow": "Demo",
    "title": "Tingnan kung paano gumagana ang AIBAN",
    "lead": "Panoorin ang walkthrough, tapos basahin kung ano ang nangyayari pagkatapos mong mag-sign up.",
    "videoTitle": "Walkthrough video ng AIBAN",
    "playLabel": "I-play ang walkthrough video",
    "videoNote": "Nagpe-play ang video mula sa YouTube.",
    "stepsTitle": "Ano ang nangyayari pagkatapos mong mag-sign up",
    "steps": [
      {
        "title": "Idagdag ang website mo",
        "body": "Ilagay ang address ng site mo, ng blog mo o ng news site na sinusubaybayan mo. Binabasa ito ng AIBAN para sa bagong content."
      },
      {
        "title": "Ilarawan ang mga mambabasa mo at ang boses mo",
        "body": "Sabihin sa AIBAN kung sino ang nagbabasa ng newsletter mo at kung paano ito dapat tumunog. Puwede mo ring hayaan itong magmungkahi ng paglalarawan mula sa site mo."
      },
      {
        "title": "Pumili ng iskedyul",
        "body": "Piliin kung gaano kadalas ipapadala ang mga isyu. Puwede mo itong baguhin mamaya sa dashboard mo."
      },
      {
        "title": "Magdagdag ng mga subscriber",
        "body": "Mag-upload ng listahan, magdagdag ng tao isa-isa o ibahagi ang signup page at widget mo. Pumipili ng wika ang bawat subscriber."
      },
      {
        "title": "Idagdag ang sender name at signature mo",
        "body": "Idagdag ang pangalan at email signature na makikita ng mga reader. Ipinapadala ng AIBAN ang bawat isyu mula sa verified address nito sa pangalan mo, at sa inbox mo napupunta ang mga sagot."
      }
    ],
    "ctaTitle": "Subukan ito gamit ang sarili mong website",
    "ctaBody": "Kasama sa libreng plan ang 1 source at hanggang 100 subscriber.",
    "primaryCta": "Magsimula nang libre",
    "secondaryCta": "Tingnan ang presyo"
  },
  "helpCenter": {
    "metaTitle": "Tulong | AIBAN",
    "metaDescription": "Mga sagot tungkol sa pag-set up ng AIBAN: mga source, wika, pagpapadala sa pangalan mo, mga subscriber, ang signup widget, ang blog at billing.",
    "eyebrow": "Sentro ng tulong",
    "title": "Paano ka namin matutulungan?",
    "lead": "Maghanap ng sagot tungkol sa pag-set up at pagpapatakbo ng newsletter mo. Kung hindi mo makita ang kailangan mo, sumulat sa amin.",
    "searchLabel": "Maghanap sa help center",
    "searchPlaceholder": "Subukan ang wika, widget o kanselahin",
    "clearSearch": "I-clear ang paghahanap",
    "resultsCount": "{count} sagot ang tugma sa paghahanap mo.",
    "noResults": "Walang sagot na tugma sa paghahanap mo. Subukan ang ibang salita o mag-email sa info@aiban.news.",
    "topicsLabel": "Mga paksa",
    "copyLink": "Kopyahin ang link",
    "linkCopied": "Nakopya ang link",
    "contactTitle": "Kailangan mo pa ba ng tulong?",
    "contactBody": "Sumulat sa info@aiban.news at isama ang email address na ginamit mo sa pag-sign up.",
    "emailCta": "Mag-email sa info@aiban.news",
    "limitsTitle": "Humiling ng mas mataas na limit",
    "limitsBody": "Sabihin sa amin ang mga limit na kailangan mo at sasagot kami sa email. Kung hindi maipadala ang request mula sa page na ito, magbubukas ang email app mo na may laman na ito para maipadala mo sa amin.",
    "faqFilterLabel": "I-filter ang mga tanong",
    "faqNoMatch": "Walang tanong na tugma sa filter mo.",
    "groups": [
      {
        "id": "getting-started",
        "title": "Pagsisimula",
        "items": [
          {
            "id": "what-is-aiban",
            "q": "Ano ang AIBAN?",
            "a": "Ginagawa ng AIBAN na regular na newsletter ang content na na-publish mo na. Binabasa nito ang website mo, ang blog mo o mga news site na pinili mo, sumusulat ng mga bagong isyu sa boses mo at ipinapadala sa mga subscriber mo. Binabasa ito ng bawat subscriber sa wikang pinili niya."
          },
          {
            "id": "how-to-start",
            "q": "Paano ako magsisimula?",
            "a": "Gumawa ng account sa signup page. Sa setup, hihingin ang address ng site mo at ilang detalye tungkol sa mga mambabasa mo. Pagkatapos noon, puwede ka nang magdagdag ng mga subscriber at pamahalaan ang lahat mula sa dashboard mo."
          },
          {
            "id": "change-settings",
            "q": "Puwede ko bang baguhin ang setup ko mamaya?",
            "a": "Oo. Puwede mong palitan ang mga source, schedule, detalye ng sender at mga subscriber sa dashboard mo kahit kailan. Para palitan ang plan mo, sumulat sa info@aiban.news."
          }
        ]
      },
      {
        "id": "sources",
        "title": "Mga source at content",
        "items": [
          {
            "id": "what-is-a-source",
            "q": "Ano ang puwede kong gamitin bilang source?",
            "a": "Ang source ay web address na binabasa ng AIBAN para sa bagong content, gaya ng website mo, blog mo o news site na sinusubaybayan mo. Nagdadagdag ka ng mga source sa dashboard mo. Nakadepende sa plan mo kung ilan ang puwede mong idagdag."
          },
          {
            "id": "how-often",
            "q": "Gaano kadalas ipinapadala ang newsletter ko?",
            "a": "Ikaw ang pipili kung gaano kadalas ito magpa-publish kapag nagse-set up ka ng source. Puwede mong baguhin ang iskedyul mamaya sa dashboard mo."
          },
          {
            "id": "your-voice",
            "q": "Paano sumusulat ang AIBAN sa boses ko?",
            "a": "Ilalarawan mo ang personalidad ng newsletter mo, o hahayaan mong gumawa ang AIBAN ng paglalarawan para sa iyo. Isinusulat ang mga isyu batay sa paglalarawang iyon. Puwede mo itong i-edit anumang oras sa dashboard mo."
          }
        ]
      },
      {
        "id": "languages",
        "title": "Mga wika",
        "items": [
          {
            "id": "subscriber-language",
            "q": "Paano natatanggap ng mga subscriber ang newsletter sa wika nila?",
            "a": "Pumipili ang bawat subscriber ng gustong wika kapag nag-sign up siya. Isinasalin ng AIBAN ang bawat isyu sa wikang iyon bago ito ipadala."
          },
          {
            "id": "site-language",
            "q": "Puwede ko bang gamitin ang site sa wika ko?",
            "a": "Oo. Gamitin ang language button sa kanang ibaba ng screen para palitan ang wika ng site at ng dashboard."
          }
        ]
      },
      {
        "id": "sending",
        "title": "Pagpapadala sa pangalan mo",
        "items": [
          {
            "id": "own-address",
            "q": "Puwede bang manggaling ang mga isyu sa sarili kong email address?",
            "a": "Lumalabas ang mga isyu mula sa sending address ng AIBAN na may sender name at email signature mo, at sa inbox mo napupunta ang mga sagot. Hindi namin hinihingi ang email password mo, kaya walang anumang sa iyo na puwedeng ma-leak."
          },
          {
            "id": "app-password",
            "q": "Kailangan ko bang ibigay sa AIBAN ang email password ko?",
            "a": "Hindi. Hindi kailanman hinihingi ng AIBAN ang email password mo o isang app password. Ipinapadala ang mga isyu mula sa address ng AIBAN sa pangalan mo, at sa iyo dumarating ang mga sagot."
          }
        ]
      },
      {
        "id": "subscribers",
        "title": "Mga subscriber at signup widget",
        "items": [
          {
            "id": "add-subscribers",
            "q": "Paano ako magdadagdag ng mga subscriber?",
            "a": "Puwede kang magdagdag ng tao isa-isa sa dashboard mo o mag-upload ng file na may listahan mo. Puwede ring sumali ang mga tao sa signup page mo o sa signup widget."
          },
          {
            "id": "signup-widget",
            "q": "Ano ang signup widget?",
            "a": "Ang widget ay signup form na puwede mong ilagay sa sarili mong website. Inilalagay ng mga bisita ang email address nila at pinipili ang wika nila, at sumasali sila sa listahan mo."
          },
          {
            "id": "subscriber-limit",
            "q": "May limit ba sa dami ng subscriber?",
            "a": "May sariling limit ng subscriber ang bawat plan. Kasama sa libreng plan ang hanggang 100 subscriber. Nakalista sa pricing page ang mga limit ng ibang plan."
          }
        ]
      },
      {
        "id": "blog",
        "title": "Blog",
        "items": [
          {
            "id": "blog-pages",
            "q": "Pino-publish ba sa web ang mga artikulo ng newsletter ko?",
            "a": "Oo. Pino-publish din bilang mga web page ang mga artikulong isinusulat ng AIBAN para sa newsletter mo, kaya mababasa rin ito ng mga tao sa labas ng inbox nila."
          },
          {
            "id": "post-to-site",
            "q": "Puwede ko bang i-post ang mga artikulo sa sarili kong website?",
            "a": "Oo. Sa dashboard mo, puwede kang mag-set up ng webhook na nagpapadala ng bawat artikulo ng newsletter sa website mo bilang post. Gumagana ito sa WordPress at sa anumang platform na tumatanggap ng karaniwang REST content."
          }
        ]
      },
      {
        "id": "billing",
        "title": "Billing",
        "items": [
          {
            "id": "free-plan",
            "q": "May libreng plan ba?",
            "a": "Oo. Kasama sa libreng plan ang 1 source at hanggang 100 subscriber. Puwede kang lumipat sa bayad na plan kapag kailangan mo ng higit pa."
          },
          {
            "id": "monthly-yearly",
            "q": "Puwede ba akong magbayad buwanan o taunan?",
            "a": "Oo. Sinisingil ang mga paid plan buwan-buwan o taon-taon. Mas mababa nang 35% ang taunang presyo kaysa sa pagbabayad buwan-buwan nang 12 buwan. Sumulat sa info@aiban.news para pumili ng plan."
          },
          {
            "id": "cancel",
            "q": "Puwede ba akong magkansela anumang oras?",
            "a": "Oo. Sumulat sa info@aiban.news anumang oras at kakanselahin namin ang paid plan mo o ibabalik ka namin sa Libreng plan."
          },
          {
            "id": "higher-limits",
            "q": "Paano kung kailangan ko ng higit pa sa pinakamalaking plan?",
            "a": "Gamitin ang request form sa help page para sabihin sa amin ang mga limit na kailangan mo. Sasagot kami sa email."
          }
        ]
      }
    ]
  },
  "mainPage": {
    "skipToMainContent": "Laktawan at pumunta sa main content",
    "dismissAnnouncement": "Alisin ang anunsyo",
    "problem": "Problema:",
    "outcome": "Resulta:",
    "disclaimer": "Ang 35% savings ay para sa annual billing lamang."
  },
  "authForm": {
    "emailValidation": "Maglagay ng email address gaya ng pangalan@example.com.",
    "failedToSendCode": "Hindi namin naipadala ang code. Tingnan ang email address at subukan ulit pagkalipas ng isang minuto.",
    "sending": "Ipinapadala...",
    "codeSent": "Nagpadala kami ng code sa email mo.",
    "invalidCode": "Hindi tama ang code na iyan. Tingnan ang pinakabagong email na ipinadala namin, o ipadala ulit ang code.",
    "regenerateCode": "Ipadala muli ang code",
    "back": "Balik",
    "byProceeding": "Sa pagpapatuloy, sumasang-ayon ka sa",
    "termsOfService": "Kasunduan sa Serbisyo",
    "and": "at",
    "privacyPolicy": "Patakaran sa Privacy",
    "appName": "AI Newsletter"
  },
  "welcome": {
    "title": "Awtomatikong newsletter generator",
    "setItOnce": "I-set up ito nang isang beses.",
    "useItForever": "Tuloy-tuloy na itong tatakbo pagkatapos."
  },
  "lead": {
    "title": "Gawing mga bisita ang mga subscriber",
    "recommendation": "Tulungan ang aming AI na maunawaan ang iyong brand sa pamamagitan ng pag-connect ng iyong website.",
    "question": "May website ka ba? (opsyonal, puwede mo itong idagdag mamaya)",
    "placeholder": "https://iyong-site.com"
  },
  "newsSource": {
    "title": "I-connect ang iyong content source",
    "subtitle": "Kukunin namin ang iyong feed para hindi ka na magsimula sa wala.",
    "placeholder": "Iyong blog o RSS link"
  },
  "subscribe": {
    "welcome": {
      "title": "Welcome sa newsletter.",
      "invitedBy": "Inimbitahan ka ni {configuratorId}."
    }
  },
  "header": {
    "goToWorkspace": "Buksan ang dashboard",
    "inBilling": "Presyo",
    "vip": "VIP",
    "plan": "{planName} plan",
    "logIn": "Mag-log in",
    "getStarted": "Magsimula nang libre"
  },
  "fileInput": {
    "chooseFile": "Pumili ng file",
    "dropFile": "I-drop dito",
    "release": "Bitawan para i-upload"
  },
  "billing": {
    "title": "Billing at subscription",
    "currentPlanTitle": "Ang kasalukuyang plan mo",
    "upgradePlanTitle": "Palitan ang plan mo",
    "manageSubscription": "Pamahalaan ang subscription",
    "vipPlanName": "VIP partner",
    "vipPlanDescription": "Walang limit na access, handog ng AIBAN.",
    "perMonth": "kada buwan",
    "perYear": "kada taon",
    "monthAbbreviation": "buwan",
    "equivalentTo": "katumbas ng",
    "mostPopular": "Pinakasikat",
    "upgradeTo": "I-upgrade sa",
    "downgradeTo": "Lumipat sa",
    "currentPlanButton": "Ang plan mo",
    "youSave": "Ang matitipid mo",
    "users": "mga user",
    "newsSources": "mga news source",
    "monthly": "Buwanan",
    "yearly": "Taunan",
    "loadingPlan": "Naglo-load ng data ng plan..."
  },
  "languages": [
    {
      "code": "ab",
      "name": "Abkhazian"
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
      "name": "Albanian"
    },
    {
      "code": "am",
      "name": "Amharic"
    },
    {
      "code": "ar",
      "name": "Arabic"
    },
    {
      "code": "an",
      "name": "Aragonese"
    },
    {
      "code": "hy",
      "name": "Armenian"
    },
    {
      "code": "as",
      "name": "Assamese"
    },
    {
      "code": "av",
      "name": "Avaric"
    },
    {
      "code": "ae",
      "name": "Avestan"
    },
    {
      "code": "ay",
      "name": "Aymara"
    },
    {
      "code": "az",
      "name": "Azerbaijani"
    },
    {
      "code": "bm",
      "name": "Bambara"
    },
    {
      "code": "ba",
      "name": "Bashkir"
    },
    {
      "code": "eu",
      "name": "Basque"
    },
    {
      "code": "be",
      "name": "Belarusian"
    },
    {
      "code": "bn",
      "name": "Bengali"
    },
    {
      "code": "bi",
      "name": "Bislama"
    },
    {
      "code": "bs",
      "name": "Bosnian"
    },
    {
      "code": "br",
      "name": "Breton"
    },
    {
      "code": "bg",
      "name": "Bulgarian"
    },
    {
      "code": "my",
      "name": "Burmese"
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
      "name": "Chechen"
    },
    {
      "code": "ny",
      "name": "Chichewa"
    },
    {
      "code": "zh",
      "name": "Chinese"
    },
    {
      "code": "cu",
      "name": "Church Slavic"
    },
    {
      "code": "cv",
      "name": "Chuvash"
    },
    {
      "code": "kw",
      "name": "Cornish"
    },
    {
      "code": "co",
      "name": "Corsican"
    },
    {
      "code": "cr",
      "name": "Cree"
    },
    {
      "code": "hr",
      "name": "Croatian"
    },
    {
      "code": "cs",
      "name": "Czech"
    },
    {
      "code": "da",
      "name": "Danish"
    },
    {
      "code": "dv",
      "name": "Divehi"
    },
    {
      "code": "nl",
      "name": "Dutch"
    },
    {
      "code": "dz",
      "name": "Dzongkha"
    },
    {
      "code": "en",
      "name": "English"
    },
    {
      "code": "eo",
      "name": "Esperanto"
    },
    {
      "code": "et",
      "name": "Estonian"
    },
    {
      "code": "ee",
      "name": "Ewe"
    },
    {
      "code": "fo",
      "name": "Faroese"
    },
    {
      "code": "fj",
      "name": "Fijian"
    },
    {
      "code": "fi",
      "name": "Finnish"
    },
    {
      "code": "fr",
      "name": "French"
    },
    {
      "code": "fy",
      "name": "Western Frisian"
    },
    {
      "code": "ff",
      "name": "Fulah"
    },
    {
      "code": "gd",
      "name": "Scottish Gaelic"
    },
    {
      "code": "gl",
      "name": "Galician"
    },
    {
      "code": "lg",
      "name": "Ganda"
    },
    {
      "code": "ka",
      "name": "Georgian"
    },
    {
      "code": "de",
      "name": "German"
    },
    {
      "code": "el",
      "name": "Greek"
    },
    {
      "code": "kl",
      "name": "Kalaallisut (Greenlandic)"
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
      "name": "Haitian Creole"
    },
    {
      "code": "ha",
      "name": "Hausa"
    },
    {
      "code": "he",
      "name": "Hebrew"
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
      "name": "Hiri Motu"
    },
    {
      "code": "hu",
      "name": "Hungarian"
    },
    {
      "code": "is",
      "name": "Icelandic"
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
      "name": "Indonesian"
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
      "name": "Irish"
    },
    {
      "code": "it",
      "name": "Italian"
    },
    {
      "code": "ja",
      "name": "Japanese"
    },
    {
      "code": "jv",
      "name": "Javanese"
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
      "name": "Kashmiri"
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
      "name": "Kyrgyz"
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
      "name": "Korean"
    },
    {
      "code": "kj",
      "name": "Kuanyama"
    },
    {
      "code": "ku",
      "name": "Kurdish"
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
      "name": "Latvian"
    },
    {
      "code": "li",
      "name": "Limburgish"
    },
    {
      "code": "ln",
      "name": "Lingala"
    },
    {
      "code": "lt",
      "name": "Lithuanian"
    },
    {
      "code": "lu",
      "name": "Luba-Katanga"
    },
    {
      "code": "lb",
      "name": "Luxembourgish"
    },
    {
      "code": "mk",
      "name": "Macedonian"
    },
    {
      "code": "mg",
      "name": "Malagasy"
    },
    {
      "code": "ms",
      "name": "Malay"
    },
    {
      "code": "ml",
      "name": "Malayalam"
    },
    {
      "code": "mt",
      "name": "Maltese"
    },
    {
      "code": "gv",
      "name": "Manx"
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
      "name": "Marshallese"
    },
    {
      "code": "mn",
      "name": "Mongolian"
    },
    {
      "code": "na",
      "name": "Nauru"
    },
    {
      "code": "nv",
      "name": "Navajo"
    },
    {
      "code": "nd",
      "name": "North Ndebele"
    },
    {
      "code": "nr",
      "name": "South Ndebele"
    },
    {
      "code": "ng",
      "name": "Ndonga"
    },
    {
      "code": "ne",
      "name": "Nepali"
    },
    {
      "code": "no",
      "name": "Norwegian"
    },
    {
      "code": "nb",
      "name": "Norwegian Bokmål"
    },
    {
      "code": "nn",
      "name": "Norwegian Nynorsk"
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
      "name": "Ossetian"
    },
    {
      "code": "pi",
      "name": "Pali"
    },
    {
      "code": "ps",
      "name": "Pashto"
    },
    {
      "code": "fa",
      "name": "Persian (Farsi)"
    },
    {
      "code": "pl",
      "name": "Polish"
    },
    {
      "code": "pt",
      "name": "Portuguese"
    },
    {
      "code": "pa",
      "name": "Punjabi"
    },
    {
      "code": "qu",
      "name": "Quechua"
    },
    {
      "code": "ro",
      "name": "Romanian"
    },
    {
      "code": "rm",
      "name": "Romansh"
    },
    {
      "code": "rn",
      "name": "Rundi"
    },
    {
      "code": "ru",
      "name": "Russian"
    },
    {
      "code": "se",
      "name": "Northern Sami"
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
      "name": "Sardinian"
    },
    {
      "code": "sr",
      "name": "Serbian"
    },
    {
      "code": "sn",
      "name": "Shona"
    },
    {
      "code": "ii",
      "name": "Sichuan Yi"
    },
    {
      "code": "sd",
      "name": "Sindhi"
    },
    {
      "code": "si",
      "name": "Sinhala"
    },
    {
      "code": "sk",
      "name": "Slovak"
    },
    {
      "code": "sl",
      "name": "Slovenian"
    },
    {
      "code": "so",
      "name": "Somali"
    },
    {
      "code": "st",
      "name": "Southern Sotho"
    },
    {
      "code": "es",
      "name": "Spanish"
    },
    {
      "code": "su",
      "name": "Sundanese"
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
      "name": "Swedish"
    },
    {
      "code": "tl",
      "name": "Tagalog (Filipino)"
    },
    {
      "code": "ty",
      "name": "Tahitian"
    },
    {
      "code": "tg",
      "name": "Tajik"
    },
    {
      "code": "ta",
      "name": "Tamil"
    },
    {
      "code": "tt",
      "name": "Tatar"
    },
    {
      "code": "te",
      "name": "Telugu"
    },
    {
      "code": "th",
      "name": "Thai"
    },
    {
      "code": "bo",
      "name": "Tibetan"
    },
    {
      "code": "ti",
      "name": "Tigrinya"
    },
    {
      "code": "to",
      "name": "Tonga"
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
      "name": "Turkish"
    },
    {
      "code": "tk",
      "name": "Turkmen"
    },
    {
      "code": "tw",
      "name": "Twi"
    },
    {
      "code": "ug",
      "name": "Uighur"
    },
    {
      "code": "uk",
      "name": "Ukrainian"
    },
    {
      "code": "ur",
      "name": "Urdu"
    },
    {
      "code": "uz",
      "name": "Uzbek"
    },
    {
      "code": "ve",
      "name": "Venda"
    },
    {
      "code": "vi",
      "name": "Vietnamese"
    },
    {
      "code": "vo",
      "name": "Volapük"
    },
    {
      "code": "wa",
      "name": "Walloon"
    },
    {
      "code": "cy",
      "name": "Welsh"
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
      "name": "Zulu"
    }
  ],
  "countries": [
    {
      "code": "AF",
      "name": "Afghanistan"
    },
    {
      "code": "AL",
      "name": "Albania"
    },
    {
      "code": "DZ",
      "name": "Algeria"
    },
    {
      "code": "AS",
      "name": "American Samoa"
    },
    {
      "code": "AD",
      "name": "Andorra"
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
      "name": "Antarctica"
    },
    {
      "code": "AG",
      "name": "Antigua at Barbuda"
    },
    {
      "code": "AR",
      "name": "Argentina"
    },
    {
      "code": "AM",
      "name": "Armenia"
    },
    {
      "code": "AW",
      "name": "Aruba"
    },
    {
      "code": "AU",
      "name": "Australia"
    },
    {
      "code": "AT",
      "name": "Austria"
    },
    {
      "code": "AZ",
      "name": "Azerbaijan"
    },
    {
      "code": "BS",
      "name": "Bahamas"
    },
    {
      "code": "BH",
      "name": "Bahrain"
    },
    {
      "code": "BD",
      "name": "Bangladesh"
    },
    {
      "code": "BB",
      "name": "Barbados"
    },
    {
      "code": "BY",
      "name": "Belarus"
    },
    {
      "code": "BE",
      "name": "Belgium"
    },
    {
      "code": "BZ",
      "name": "Belize"
    },
    {
      "code": "BJ",
      "name": "Benin"
    },
    {
      "code": "BM",
      "name": "Bermuda"
    },
    {
      "code": "BT",
      "name": "Bhutan"
    },
    {
      "code": "BO",
      "name": "Bolivia"
    },
    {
      "code": "BA",
      "name": "Bosnia at Herzegovina"
    },
    {
      "code": "BW",
      "name": "Botswana"
    },
    {
      "code": "BR",
      "name": "Brazil"
    },
    {
      "code": "IO",
      "name": "British Indian Ocean Territory"
    },
    {
      "code": "VG",
      "name": "British Virgin Islands"
    },
    {
      "code": "BN",
      "name": "Brunei"
    },
    {
      "code": "BG",
      "name": "Bulgaria"
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
      "name": "Cambodia"
    },
    {
      "code": "CM",
      "name": "Cameroon"
    },
    {
      "code": "CA",
      "name": "Canada"
    },
    {
      "code": "CV",
      "name": "Cape Verde"
    },
    {
      "code": "KY",
      "name": "Cayman Islands"
    },
    {
      "code": "CF",
      "name": "Central African Republic"
    },
    {
      "code": "TD",
      "name": "Chad"
    },
    {
      "code": "CL",
      "name": "Chile"
    },
    {
      "code": "CN",
      "name": "China"
    },
    {
      "code": "CX",
      "name": "Christmas Island"
    },
    {
      "code": "CC",
      "name": "Cocos (Keeling) Islands"
    },
    {
      "code": "CO",
      "name": "Colombia"
    },
    {
      "code": "KM",
      "name": "Comoros"
    },
    {
      "code": "CG",
      "name": "Congo - Brazzaville"
    },
    {
      "code": "CD",
      "name": "Congo - Kinshasa"
    },
    {
      "code": "CK",
      "name": "Cook Islands"
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
      "name": "Croatia"
    },
    {
      "code": "CU",
      "name": "Cuba"
    },
    {
      "code": "CY",
      "name": "Cyprus"
    },
    {
      "code": "CZ",
      "name": "Czechia"
    },
    {
      "code": "DK",
      "name": "Denmark"
    },
    {
      "code": "DJ",
      "name": "Djibouti"
    },
    {
      "code": "DM",
      "name": "Dominica"
    },
    {
      "code": "DO",
      "name": "Dominican Republic"
    },
    {
      "code": "EC",
      "name": "Ecuador"
    },
    {
      "code": "EG",
      "name": "Egypt"
    },
    {
      "code": "SV",
      "name": "El Salvador"
    },
    {
      "code": "GQ",
      "name": "Equatorial Guinea"
    },
    {
      "code": "ER",
      "name": "Eritrea"
    },
    {
      "code": "EE",
      "name": "Estonia"
    },
    {
      "code": "SZ",
      "name": "Eswatini"
    },
    {
      "code": "ET",
      "name": "Ethiopia"
    },
    {
      "code": "FJ",
      "name": "Fiji"
    },
    {
      "code": "FI",
      "name": "Finland"
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
      "name": "Gambia"
    },
    {
      "code": "GE",
      "name": "Georgia"
    },
    {
      "code": "DE",
      "name": "Germany"
    },
    {
      "code": "GH",
      "name": "Ghana"
    },
    {
      "code": "GR",
      "name": "Greece"
    },
    {
      "code": "GT",
      "name": "Guatemala"
    },
    {
      "code": "GN",
      "name": "Guinea"
    },
    {
      "code": "GY",
      "name": "Guyana"
    },
    {
      "code": "HT",
      "name": "Haiti"
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
      "name": "Hungary"
    },
    {
      "code": "IS",
      "name": "Iceland"
    },
    {
      "code": "IN",
      "name": "India"
    },
    {
      "code": "ID",
      "name": "Indonesia"
    },
    {
      "code": "IR",
      "name": "Iran"
    },
    {
      "code": "IQ",
      "name": "Iraq"
    },
    {
      "code": "IE",
      "name": "Ireland"
    },
    {
      "code": "IL",
      "name": "Israel"
    },
    {
      "code": "IT",
      "name": "Italy"
    },
    {
      "code": "JM",
      "name": "Jamaica"
    },
    {
      "code": "JP",
      "name": "Japan"
    },
    {
      "code": "JO",
      "name": "Jordan"
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
      "name": "South Korea"
    },
    {
      "code": "KW",
      "name": "Kuwait"
    },
    {
      "code": "KG",
      "name": "Kyrgyzstan"
    },
    {
      "code": "LA",
      "name": "Laos"
    },
    {
      "code": "LV",
      "name": "Latvia"
    },
    {
      "code": "LB",
      "name": "Lebanon"
    },
    {
      "code": "LS",
      "name": "Lesotho"
    },
    {
      "code": "LR",
      "name": "Liberia"
    },
    {
      "code": "LY",
      "name": "Libya"
    },
    {
      "code": "LI",
      "name": "Liechtenstein"
    },
    {
      "code": "LT",
      "name": "Lithuania"
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
      "name": "Malaysia"
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
      "name": "Malta"
    },
    {
      "code": "MX",
      "name": "Mexico"
    },
    {
      "code": "MD",
      "name": "Moldova"
    },
    {
      "code": "MC",
      "name": "Monaco"
    },
    {
      "code": "MN",
      "name": "Mongolia"
    },
    {
      "code": "ME",
      "name": "Montenegro"
    },
    {
      "code": "MA",
      "name": "Morocco"
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
      "name": "Namibia"
    },
    {
      "code": "NP",
      "name": "Nepal"
    },
    {
      "code": "NL",
      "name": "Netherlands"
    },
    {
      "code": "NZ",
      "name": "New Zealand"
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
      "name": "Nigeria"
    },
    {
      "code": "MK",
      "name": "North Macedonia"
    },
    {
      "code": "NO",
      "name": "Norway"
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
      "name": "Papua New Guinea"
    },
    {
      "code": "PY",
      "name": "Paraguay"
    },
    {
      "code": "PE",
      "name": "Peru"
    },
    {
      "code": "PH",
      "name": "Philippines"
    },
    {
      "code": "PL",
      "name": "Poland"
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
      "name": "Romania"
    },
    {
      "code": "RU",
      "name": "Russia"
    },
    {
      "code": "RW",
      "name": "Rwanda"
    },
    {
      "code": "SA",
      "name": "Saudi Arabia"
    },
    {
      "code": "SN",
      "name": "Senegal"
    },
    {
      "code": "RS",
      "name": "Serbia"
    },
    {
      "code": "SG",
      "name": "Singapore"
    },
    {
      "code": "SK",
      "name": "Slovakia"
    },
    {
      "code": "SI",
      "name": "Slovenia"
    },
    {
      "code": "ZA",
      "name": "South Africa"
    },
    {
      "code": "ES",
      "name": "Spain"
    },
    {
      "code": "LK",
      "name": "Sri Lanka"
    },
    {
      "code": "SE",
      "name": "Sweden"
    },
    {
      "code": "CH",
      "name": "Switzerland"
    },
    {
      "code": "TW",
      "name": "Taiwan"
    },
    {
      "code": "TH",
      "name": "Thailand"
    },
    {
      "code": "TR",
      "name": "Turkey"
    },
    {
      "code": "UG",
      "name": "Uganda"
    },
    {
      "code": "UA",
      "name": "Ukraine"
    },
    {
      "code": "AE",
      "name": "United Arab Emirates"
    },
    {
      "code": "GB",
      "name": "United Kingdom"
    },
    {
      "code": "US",
      "name": "United States"
    },
    {
      "code": "UY",
      "name": "Uruguay"
    },
    {
      "code": "UZ",
      "name": "Uzbekistan"
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
      "name": "Yemen"
    },
    {
      "code": "ZM",
      "name": "Zambia"
    },
    {
      "code": "ZW",
      "name": "Zimbabwe"
    }
  ]
};
