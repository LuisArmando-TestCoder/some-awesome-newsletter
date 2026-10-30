// am strings for locales. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale am
export default {
  "auth": {
    "logo": "/icons/logo.png",
    "login": {
      "pageTitle": "ይግቡ",
      "title": "ወደ AIBAN ይግቡ",
      "subtitle": "ካቆሙበት ለመቀጠል እባክዎ ይግቡ።",
      "google": "በጎግል ይቀጥሉ",
      "or": "ወይም",
      "emailPlaceholder": "you@example.com",
      "continueWithEmail": "በኢሜል ይቀጥሉ",
      "switchText": "መለያ የለዎትም?",
      "switchLink": "ይመዝገቡ",
      "switchHref": "/signup"
    },
    "signup": {
      "pageTitle": "ይመዝገቡ",
      "title": "መለያዎን ይፍጠሩ",
      "subtitle": "የክሬዲት ካርድ አያስፈልግዎትም።",
      "google": "በጎግል ይቀጥሉ",
      "or": "ወይም",
      "emailPlaceholder": "you@example.com",
      "continueWithEmail": "በኢሜል ይቀጥሉ",
      "switchText": "ቀደም ብሎ መለያ አለዎት?",
      "switchLink": "ይግቡ",
      "switchHref": "/login"
    }
  },
  "landing": {
    "seo": {
      "title": "AIBAN | ድረ ገጽዎ በእያንዳንዱ አንባቢ ቋንቋ ወደ ጋዜጣ ይቀየራል",
      "description": "AIBAN ቀድሞ የሚያትሙትን ያነባል፣ በእርስዎ አጻጻፍ የጋዜጣ እትም ይጽፋል እና በስምዎ ይልካል። እያንዳንዱ ተመዝጋቢ በራሱ ቋንቋ ይቀበለዋል።",
      "ogImageAlt": "የAIBAN አርማ"
    },
    "skipLink": "ወደ ዋናው ይዘት ይዝለሉ",
    "hero": {
      "eyebrow": "ለአገልግሎት ሰጪ ንግዶች የሚሆኑ ጋዜጣዎች",
      "title": "ድረ ገጽዎ በእያንዳንዱ አንባቢ ቋንቋ ሳምንታዊ ጋዜጣ ይሆናል",
      "lead": "AIBAN ቀድሞ የሚያትሙትን ይዘት ያነባል፣ በእርስዎ አጻጻፍ እትም ይጽፋል እና በስምዎ ይልካል። እያንዳንዱ ተመዝጋቢ በሚያነበው ቋንቋ ይቀበለዋል። አንድ ጊዜ ያዘጋጁታል፣ ከዚያ መስራቱን ይቀጥላል።",
      "formLabel": "የእርስዎ ድረ ገጽ",
      "formPlaceholder": "yourcompany.com",
      "formHint": "ካስገቡት አድራሻ የናሙና እትም እናዘጋጃለን። መጀመር ነጻ ነው፣ ካርድም አያስፈልግዎትም።",
      "formSubmit": "ጋዜጣዬን አሳየኝ",
      "formError": "እንደ yourcompany.com ያለ የድረ ገጽ አድራሻ ያስገቡ።",
      "secondaryCta": "እንዴት እንደሚሰራ ይመልከቱ"
    },
    "preview": {
      "badge": "የናሙና ቅድመ እይታ",
      "note": "ይህ ቦታ ያዥ ጽሑፍ ያለው የናሙና አቀማመጥ ነው። ሲጀምሩ AIBAN እውነተኛውን እትም ከአዲሱ ጽሑፍዎ ይጽፋል።",
      "fromLabel": "ከ",
      "toLabel": "ለ",
      "subjectLabel": "ርዕስ",
      "languageLabel": "የአንባቢ ቋንቋ",
      "readOnBlog": "በብሎጉ ላይ ያንብቡ",
      "startCta": "በ{site} በነጻ ይጀምሩ",
      "startCtaGeneric": "በነጻ ይጀምሩ",
      "liveRegion": "የናሙና ቅድመ እይታው ለ{site} ተዘምኗል።"
    },
    "chain": {
      "eyebrow": "እንዴት እንደሚሰራ",
      "title": "አንድ ጊዜ ያስገባሉ፣ ከዚያ በራሱ ይሰራል",
      "lead": "ድረ ገጽዎን አንድ ጊዜ ለAIBAN ይሰጣሉ። ከዚያ በኋላ ከታች ያሉት እያንዳንዱ ደረጃዎች በመረጡት መርሐ ግብር በራሳቸው ይከናወናሉ።",
      "triggerLabel": "መቼ",
      "actionLabel": "ከዚያ",
      "trigger": {
        "title": "ሰኞ ከጠዋቱ 9:00 ሲሆን",
        "body": "ወይም የመረጡት ማንኛውም መርሐ ግብር፦ በየቀኑ፣ በየሳምንቱ ወይም በየወሩ።"
      },
      "steps": [
        {
          "title": "AIBAN አዲሱን ጽሑፍዎን ያገኛል",
          "body": "ድረ ገጽዎን ይፈትሻል እና ተስማሚ አንባቢዎ በጣም የሚፈልገውን ጽሑፍ ይመርጣል።"
        },
        {
          "title": "እትሙን በእርስዎ አጻጻፍ ይጽፋል",
          "body": "ጽሑፉ ድረ ገጽዎ በተጻፈበት መንገድ ላይ ተመስርቶ እርስዎን እንዲመስል እንደገና ይጻፋል።"
        },
        {
          "title": "እትሙን ለእያንዳንዱ አንባቢ ይተረጉማል",
          "body": "እያንዳንዱ ተመዝጋቢ ሲመዘገብ በመረጠው ቋንቋ ይቀበላል።"
        },
        {
          "title": "በስምዎ ይልካል",
          "body": "አንባቢዎች ስምዎን ያያሉ፣ የሚመልሱት መልስም ወደ እርስዎ የገቢ መልዕክት ሳጥን ይደርሳል።"
        },
        {
          "title": "እትሙን በብሎግዎ ላይ ያትማል",
          "body": "እያንዳንዱ እትም የራሱ ሊንክ ያለው የሕዝብ ጽሑፍ ገጽም ያገኛል።"
        },
        {
          "title": "ምን እንደተፈጠረ ያሳይዎታል",
          "body": "የቁጥጥር ፓነልዎ ማን እንደተቀላቀለ እና አንባቢዎች የትኞቹን ሊንኮች እንደተጫኑ ይዘረዝራል።"
        }
      ],
      "alsoTitle": "በተጨማሪም የሚሰራው",
      "also": [
        {
          "title": "አንድ ሰው በድረ ገጽዎ ሲመዘገብ",
          "body": "በኢሜል ያረጋግጡና እትሞችዎን መቀበል ይጀምራሉ።"
        },
        {
          "title": "ሊንክ ወይም ጽሑፍ ሲለጥፉ",
          "body": "AIBAN ስለዚያ እትም ጽፎ በተመሳሳይ ደረጃዎች ይልካል።"
        },
        {
          "title": "የእውቂያ ዝርዝር ሲጭኑ",
          "body": "AIBAN ዝርዝሩን ያጸዳል፣ ድግግሞሾችን ያስወግዳል እና የእያንዳንዱን እውቂያ ቋንቋ ይገምታል።"
        }
      ]
    },
    "languages": {
      "eyebrow": "በሁሉም ቋንቋ",
      "title": "እያንዳንዱ አንባቢ እትሙን በራሱ ቋንቋ ያገኛል",
      "body": "የተለያዩ ቅጂዎችን አይጽፉም። AIBAN እያንዳንዱን እትም ተመዝጋቢዎችዎ ወደሚያነቡት ቋንቋ ሁሉ ይተረጉማል፣ በእያንዳንዱም የእርስዎን ቃና ይጠብቃል። ዝርዝሩ ስፓኒሽ፣ ፖርቱጋልኛ፣ ፈረንሳይኛ፣ ጀርመንኛ፣ ሂንዲ፣ አረብኛ፣ ጃፓንኛ እና ሌሎች ብዙ ቋንቋዎችን ያካትታል።",
      "sampleNote": "ተመሳሳዩ የናሙና እትም፣ ሶስት አንባቢዎች በሚቀበሉት መልኩ።"
    },
    "sender": {
      "eyebrow": "የእርስዎ አድራሻ",
      "title": "በስምዎ ይላካል",
      "body": "እትሞች በስምዎ እና በኢሜል ፊርማዎ ይደርሳሉ። AIBAN ከራሱ የተረጋገጠ አድራሻ ይልካቸዋል፣ ስለዚህ የኢሜል የይለፍ ቃልዎን በጭራሽ አያጋሩንም። አንባቢ ምላሽ ሲሰጥ ምላሹ ወደ ገቢ መልዕክት ሳጥንዎ ይመጣል።",
      "inboxLabel": "በአንባቢ የገቢ መልዕክት ሳጥን ውስጥ የሚታየው",
      "inboxFrom": "እርስዎ",
      "inboxSubject": "የዚህ ሳምንት ከ{site}",
      "inboxSnippet": "የአዲሱ ጽሑፍዎ አጭር ማጠቃለያ፣ በእርስዎ አጻጻፍ የተጻፈ።",
      "inboxTime": "9:00"
    },
    "grow": {
      "eyebrow": "ዝርዝርዎን ያሳድጉ",
      "title": "ለድረ ገጽዎ የምዝገባ ቅጽ እና በራሱ የሚሞላ ብሎግ",
      "items": [
        {
          "title": "የምዝገባ ቅጽ",
          "body": "የAIBAN ቅጹን ወደ ድረ ገጽዎ ያክሉ። አዳዲስ አንባቢዎች ቋንቋቸውን መርጠው በኢሜል ያረጋግጣሉ።"
        },
        {
          "title": "ራስ ሰር ብሎግ",
          "body": "እያንዳንዱ እትም ሰዎች በፍለጋ ሊያገኙትና በሊንክ ሊያጋሩት የሚችሉት የሕዝብ ጽሑፍ ገጽ ይሆናል።"
        },
        {
          "title": "እውቂያዎችን ማስገባት",
          "body": "ቀድሞ ያሉዎትን ደንበኞች ከCSV ወይም Excel ፋይል ያምጡ፣ ወይም ዝርዝር ይለጥፉ።"
        }
      ]
    },
    "useCases": {
      "eyebrow": "ለማን ነው",
      "title": "በግንኙነት ለሚያድጉ ንግዶች የተሰራ",
      "lead": "ደንበኞችዎ በጥቆማ እና በእምነት የሚመጡ ከሆነ፣ ከእርስዎ የሚላክ መደበኛ ማስታወሻ እንዲያስታውሱዎ ያደርጋል። AIBAN ያንን ማስታወሻ ይጽፍልዎታል።",
      "items": [
        {
          "title": "ኤጀንሲዎች እና የድረ ገጽ ዲዛይነሮች",
          "body": "አዲሱን ስራዎን እና ጽሑፎችዎን በየሳምንቱ ለደንበኞችና ለወደፊት ደንበኞች ይላኩ፣ ተመሳሳዩን ማዋቀር ለደንበኞች ድረ ገጾችም ይጠቀሙ።"
        },
        {
          "title": "የአይቲ እና የሶፍትዌር ድርጅቶች",
          "body": "የልቀት ማስታወሻዎችን እና የብሎግ ጽሑፎችን እያንዳንዱ ደንበኛ በቋንቋው ወደሚያነበው አጭር ዜና ይቀይሩ።"
        },
        {
          "title": "ሪል እስቴት",
          "body": "አዳዲስ የሽያጭ ዝርዝሮችን እና የገበያ ጽሑፎችን የተለያዩ ቋንቋዎች ለሚናገሩ ገዢዎችና ሻጮች ያጋሩ።"
        },
        {
          "title": "ጠበቆች እና የሂሳብ ባለሙያዎች",
          "body": "ቀድሞ ስለሚጽፉባቸው ርዕሶች ደንበኞችዎን በረጋ እና ወጥ በሆነ ቅርጸት ያሳውቁ።"
        },
        {
          "title": "አሰልጣኞች",
          "body": "የቅርብ ጊዜ ትምህርትዎን ወይም ጽሑፍዎን እንደገና ሳይጽፉ በተወሰነ ቀን ለማኅበረሰብዎ ይላኩ።"
        }
      ]
    },
    "pricingIntro": {
      "eyebrow": "ዋጋ",
      "title": "በነጻ ይጀምሩ፣ ዝርዝርዎ ሲያድግ ያሻሽሉ",
      "lead": "ነጻው ዕቅድ 1 ምንጭ እና እስከ 100 ተመዝጋቢዎችን ያካትታል። የሚከፈልባቸው ዕቅዶች ተጨማሪ ምንጮችንና ተመዝጋቢዎችን ይጨምራሉ።"
    },
    "faqTitle": "ሰዎች ከመጀመራቸው በፊት የሚጠይቋቸው ጥያቄዎች",
    "faq": [
      {
        "id": "what-do-i-need",
        "q": "ለመጀመር ምን ያስፈልገኛል?",
        "a": "የድረ ገጽዎ አድራሻ እና የኢሜል አድራሻ። AIBAN ርዕሶችዎን እና አጻጻፍዎን ለማወቅ ድረ ገጽዎን ያነባል።"
      },
      {
        "id": "do-i-write",
        "q": "ምንም መጻፍ አለብኝ?",
        "a": "መጻፍ አይጠበቅብዎትም። AIBAN እያንዳንዱን እትም ከይዘትዎ ይጽፋል። ስለ አንድ የተለየ ነገር እትም ሲፈልጉ ሊንክ ወይም ጽሑፍ መለጠፍ ይችላሉ።"
      },
      {
        "id": "languages",
        "q": "አንባቢዎቼ በየትኞቹ ቋንቋዎች ሊያገኙት ይችላሉ?",
        "a": "AIBAN እያንዳንዱን እትም እያንዳንዱ ተመዝጋቢ ወደሚያነበው ቋንቋ ይተረጉማል። ጋዜጣዎን ሲያዋቅሩ ሙሉውን የቋንቋዎች ዝርዝር ማየት ይችላሉ።"
      },
      {
        "id": "sender",
        "q": "ኢሜሎቹ ከማን ነው የሚመጡት?",
        "a": "ከAIBAN የመላኪያ አድራሻ፣ ስምዎ እንደ ላኪ ሆኖ። ምላሾች በቀጥታ ወደ ገቢ መልዕክት ሳጥንዎ ይሄዳሉ። የኢሜል የይለፍ ቃል በጭራሽ አይሰጡንም።"
      },
      {
        "id": "contacts",
        "q": "ያሉኝን እውቂያዎች ማምጣት እችላለሁ?",
        "a": "አዎ። የCSV ወይም Excel ፋይል ይጫኑ፣ ወይም ዝርዝር ይለጥፉ። AIBAN ያጸዳዋል፣ ድግግሞሾችን ያስወግዳል እና የእያንዳንዱን እውቂያ ቋንቋ ይገምታል።"
      },
      {
        "id": "schedule",
        "q": "እትሞች ምን ያህል ጊዜ ይላካሉ?",
        "a": "ሲያዋቅሩ መርሐ ግብሩን ይመርጣሉ፣ በማንኛውም ጊዜም በቁጥጥር ፓነልዎ መቀየር ይችላሉ።"
      },
      {
        "id": "free-plan",
        "q": "ነጻ ዕቅድ አለ?",
        "a": "አዎ። ነጻው ዕቅድ 1 ምንጭ እና እስከ 100 ተመዝጋቢዎችን ያካትታል። የሚከፈልባቸው ዕቅዶች ተጨማሪ ምንጮችንና ተመዝጋቢዎችን ይጨምራሉ።"
      },
      {
        "id": "cancel",
        "q": "መሰረዝ እችላለሁ?",
        "a": "አዎ። በማንኛውም ጊዜ ወደ info@aiban.news ይጻፉልን፣ የሚከፈልበትን ዕቅድዎን እንሰርዛለን ወይም ወደ ነጻው ዕቅድ እንመልስዎታለን።"
      }
    ],
    "finalCta": {
      "title": "በድረ ገጽዎ ይጀምሩ",
      "body": "ድረ ገጽዎን ለAIBAN ይስጡ፣ የመጀመሪያ እትምዎን ይመልከቱ፣ ሲዘጋጁም ያብሩት።",
      "cta": "በነጻ ይጀምሩ",
      "secondary": "የእገዛ ማዕከሉን ያንብቡ"
    },
    "footer": {
      "tagline": "ከራስዎ ይዘት የተጻፉ እና በእያንዳንዱ አንባቢ ቋንቋ የሚላኩ ጋዜጣዎች።",
      "product": "ምርት",
      "company": "ድርጅት",
      "legal": "ሕጋዊ",
      "links": {
        "howItWorks": "እንዴት እንደሚሰራ",
        "pricing": "ዋጋ",
        "demo": "ማሳያ",
        "help": "የእገዛ ማዕከል",
        "about": "ስለ እኛ",
        "careers": "የስራ ዕድሎች",
        "privacy": "የግላዊነት መመሪያ",
        "terms": "የአገልግሎት ውሎች",
        "cookies": "የኩኪ መመሪያ"
      },
      "contactLabel": "ያግኙን",
      "rights": "መብቱ በሕግ የተጠበቀ ነው።"
    }
  },
  "help": {
    "title": "ከፍተኛ ገደቦችን ይጠይቁ",
    "subtitle": "የሚፈልጓቸውን ገደቦች ይንገሩን፣ በኢሜል እንመልስልዎታለን።",
    "contact": {
      "cta": "ጥያቄውን ያቅርቡ",
      "successTitle": "ጥያቄዎ ለመላክ ዝግጁ ነው",
      "successBody": "የኢሜል መተግበሪያዎ ከጥያቄዎ ጋር ተከፍቷል። ከዚያ ይላኩት፣ እኛም በኢሜል እንመልሳለን።",
      "learnMore": "/plans"
    },
    "questions": {
      "desiredLimitsHelp": "የሚፈልጓቸውን ገደቦች ይንገሩን፣ ለምሳሌ ስንት ተመዝጋቢዎችና ምንጮች።",
      "useCaseHelp": "ምን እንደሚልኩ፣ ለማን እና በምን ያህል ጊዜ እንደሆነ ይግለጹ።",
      "expectedSpendHelp": "ግምታዊ መጠን ዕቅድ እንድንጠቁም ይረዳናል። ያልታወቀ ብለው መተው ይችላሉ።"
    },
    "form": {
      "nameLabel": "ስም",
      "emailLabel": "ኢሜል",
      "companyLabel": "ድርጅት",
      "optional": "(አማራጭ)",
      "limitsLabel": "የሚፈልጓቸው ገደቦች",
      "useCaseLabel": "AIBANን እንዴት እንደሚጠቀሙበት",
      "spendLabel": "የሚጠበቅ ወርሃዊ ወጪ",
      "spend": {
        "lt500": "ከ$500 በታች",
        "500_2k": "ከ$500 እስከ $2,000",
        "2k_10k": "ከ$2,000 እስከ $10,000",
        "gt10k": "ከ$10,000 በላይ",
        "unknown": "እስካሁን አላውቅም"
      },
      "urgencyLabel": "አስቸኳይነት",
      "urgency": {
        "low": "ዝቅተኛ",
        "normal": "መደበኛ",
        "high": "ከፍተኛ"
      },
      "replyLabel": "እንዴት እንመልስልዎት?",
      "reply": {
        "email": "በኢሜል",
        "call": "በስልክ ጥሪ"
      },
      "payAsYouGo": "በተጠቀምኩት መጠን መክፈል እፈልጋለሁ",
      "sending": "በመላክ ላይ...",
      "sentTitle": "ጥያቄው ተልኳል",
      "sentBody": "ጥያቄዎን ተቀብለናል፣ በሰጡን የኢሜል አድራሻ እንመልሳለን።",
      "retryBefore": "የኢሜል መተግበሪያዎ ካልተከፈተ፣",
      "retryLink": "ጥያቄውን እንደገና ይክፈቱ",
      "retryAfter": "ወይም ወደዚህ ይጻፉ፦",
      "errors": {
        "name": "ስምዎን ያስገቡ (ቢያንስ 2 ቁምፊዎች)።",
        "email": "ልንመልስበት የምንችለውን የኢሜል አድራሻ ያስገቡ፣ ለምሳሌ name@example.com።",
        "company": "ቢያንስ 2 ቁምፊዎች ያስገቡ፣ ወይም ይህንን ባዶ ይተዉት።",
        "desiredLimits": "የሚፈልጓቸውን ገደቦች ቢያንስ በ10 ቁምፊዎች ይግለጹ።",
        "useCase": "አጠቃቀምዎን ቢያንስ በ20 ቁምፊዎች ይግለጹ።"
      }
    },
    "faqs": [
      {
        "id": "limits-how",
        "q": "ከፍተኛ ገደቦች እንዴት ይሰራሉ?",
        "a": "የሚፈልጓቸውን ገደቦች የያዘ ጥያቄ ይላኩ። ለመለያዎ ያሉትን አማራጮች በኢሜል እንመልስልዎታለን።"
      }
    ],
    "links": {
      "docs": "/plans",
      "community": "/help"
    }
  },
  "faq": [
    {
      "q": "AIBAN ምን ይሰራል?",
      "a": "AIBAN ቀድሞ የሚያትሙትን ይዘት ያነባል፣ ለምሳሌ ድረ ገጽዎን፣ ብሎግዎን ወይም የመረጧቸውን የዜና ድረ ገጾች። በእርስዎ አጻጻፍ አዳዲስ እትሞችን ይጽፋል እና እንደ ጋዜጣ ይልካቸዋል። እያንዳንዱ ተመዝጋቢ በመረጠው ቋንቋ ይቀበለዋል፣ ስምዎም እንደ ላኪ ይታያል።"
    },
    {
      "q": "ነጻ ዕቅድ አለ?",
      "a": "አዎ። ነጻው ዕቅድ 1 ምንጭ እና እስከ 100 ተመዝጋቢዎችን ያካትታል። ተጨማሪ ከፈለጉ ይጻፉልን፣ ዕቅድዎን እንቀይራለን።"
    },
    {
      "q": "ተመዝጋቢዎች ጋዜጣውን በቋንቋቸው እንዴት ያገኛሉ?",
      "a": "እያንዳንዱ ተመዝጋቢ ሲመዘገብ የሚመርጠውን ቋንቋ ይመርጣል። AIBAN እያንዳንዱን እትም ከመላኩ በፊት ወደዚያ ቋንቋ ይተረጉማል።"
    },
    {
      "q": "እትሞች ከራሴ የኢሜል አድራሻ ሊላኩ ይችላሉ?",
      "a": "እትሞች ከAIBAN የመላኪያ አድራሻ በስምዎ እና በኢሜል ፊርማዎ ይላካሉ፣ ምላሾችም ወደ ገቢ መልዕክት ሳጥንዎ ይሄዳሉ። የኢሜል የይለፍ ቃልዎን አንጠይቅም፣ ስለዚህ ሊወጣ የሚችል የእርስዎ ነገር የለም።"
    },
    {
      "q": "ሰዎች እንዴት ይመዘገባሉ?",
      "a": "የምዝገባ ገጽ እና በድረ ገጽዎ ላይ ሊያስቀምጡት የሚችሉት የምዝገባ መግብር ያገኛሉ። ሰዎችን ራስዎ ማከል ወይም ዝርዝር መጫንም ይችላሉ።"
    },
    {
      "q": "በማንኛውም ጊዜ መሰረዝ እችላለሁ?",
      "a": "አዎ። በማንኛውም ጊዜ ወደ info@aiban.news ይጻፉልን፣ የሚከፈልበትን ዕቅድዎን እንሰርዛለን ወይም ወደ ነጻው ዕቅድ እንመልስዎታለን።"
    }
  ],
  "plans": {
    "currency": "USD",
    "billingIntervals": [
      "ወርሃዊ",
      "ዓመታዊ"
    ],
    "currentPlan": "free",
    "plans": [
      {
        "id": "free",
        "name": "ነጻ",
        "monthly": 0,
        "yearly": 0,
        "tagline": "AIBANን በአንድ ምንጭ ይሞክሩ",
        "featuresBase": [
          "1 ምንጭ",
          "እስከ 100 ተመዝጋቢዎች"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": 1,
          "users": 100
        },
        "ctaLabel": "የአሁኑ ዕቅድ",
        "tier": 0
      },
      {
        "id": "starter",
        "name": "Starter",
        "monthly": 17,
        "yearly": 132,
        "tagline": "ለሚያድጉ ኒውስሌተሮች",
        "featuresBase": [
          "5 ምንጮች",
          "እስከ 100k ተመዝጋቢዎች"
        ],
        "featuresDelta": [
          "የኢሜይል ድጋፍ",
          "መሰረታዊ ትርጉም"
        ],
        "limits": {
          "newsSources": 5,
          "users": 100000
        },
        "ctaLabel": "Starter ይምረጡ",
        "productId": "prod_starter_id",
        "tier": 1
      },
      {
        "id": "growth",
        "name": "Growth",
        "monthly": 35,
        "yearly": 273,
        "tagline": "ለተቋቋሙ ጋዜጣዎች",
        "featuresBase": [
          "17 ምንጮች",
          "እስከ 250k ተመዝጋቢዎች"
        ],
        "featuresDelta": [
          "የምርት ስም ማስተካከያ",
          "የላቁ ትንታኔዎች"
        ],
        "limits": {
          "newsSources": 17,
          "users": 250000
        },
        "ctaLabel": "Growth ይምረጡ",
        "productId": "prod_growth_id",
        "tier": 2
      },
      {
        "id": "pro",
        "name": "Pro",
        "monthly": 80,
        "yearly": 624,
        "tagline": "ለግብይት ባለሙያዎች",
        "featuresBase": [
          "25 ምንጮች",
          "እስከ 500k ተመዝጋቢዎች"
        ],
        "featuresDelta": [
          "የAPI መዳረሻ",
          "ቅድሚያ የሚሰጠው አሰራር"
        ],
        "limits": {
          "newsSources": 25,
          "users": 500000
        },
        "ctaLabel": "Pro ይምረጡ",
        "productId": "prod_pro_id",
        "tier": 3
      },
      {
        "id": "master",
        "name": "Master",
        "monthly": 150,
        "yearly": 1170,
        "tagline": "ለብዙ ታዳሚዎች",
        "featuresBase": [
          "50 ምንጮች",
          "ያልተገደበ ተመዝጋቢዎች"
        ],
        "featuresDelta": [
          "VIP ድጋፍ",
          "ብጁ ዌብ ሁኮች (Webhooks)"
        ],
        "limits": {
          "newsSources": 50,
          "users": -1
        },
        "ctaLabel": "Master ይምረጡ",
        "productId": "prod_master_id",
        "tier": 4
      },
      {
        "id": "vipfree",
        "name": "VIP ነጻ",
        "monthly": 0,
        "yearly": 0,
        "tagline": "ለአጋሮች ሙሉ አገልግሎት",
        "featuresBase": [
          "ያልተገደቡ ምንጮች",
          "ያልተገደበ ተመዝጋቢዎች"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": -1,
          "users": -1
        },
        "ctaLabel": "የአሁኑ ዕቅድ",
        "internalOnly": true,
        "tier": 5
      }
    ],
    "contact": {
      "text": "የተለየ መፍትሄ ይፈልጋሉ?",
      "cta": "ያግኙን",
      "href": "/help"
    }
  },
  "article": {
    "notFound": "ጽሁፉ አልተገኘም።",
    "errorFetching": "ይህንን ጽሑፍ መጫን አልቻልንም። በአንድ ደቂቃ ውስጥ ገጹን እንደገና በመጫን ይሞክሩ።",
    "noArticleSpecified": "ምንም ጽሁፍ አልተጠቀሰም።",
    "goBack": "ተመለስ",
    "loading": "በመጫን ላይ..."
  },
  "pricing": {
    "eyebrow": "ክፍያ",
    "title": "ዕቅዶች እና ዋጋዎች",
    "currentPlan": "የአሁኑ ዕቅድ፦",
    "monthly": "ወርሃዊ",
    "yearly": "በዓመት",
    "yearlySave": "35% ይቆጥቡ",
    "intervalLabel": "የክፍያ ጊዜ",
    "billedYearly": "በዓመት የሚከፈል",
    "perMonthShort": "/mo",
    "perYearShort": "/yr",
    "freeCta": "በነጻ ይጀምሩ",
    "processing": "የክፍያ ገጹ እየተከፈተ ነው...",
    "askMore": "እያንዳንዱ መለያ በነጻው ዕቅድ ይጀምራል። ተጨማሪ ከፈለጉ በ{email} ይጻፉልን፣ ዕቅድዎን እንቀይራለን።",
    "askFor": "{planName} ይጠይቁ",
    "askAction": "ይጻፉልን",
    "checkoutError": "የክፍያ ገጹን መክፈት አልቻልንም። እባክዎ ከትንሽ ጊዜ በኋላ እንደገና ይሞክሩ።",
    "networkError": "ከአገልጋዩ ጋር መገናኘት አልቻልንም። ግንኙነትዎን ፈትሸው እንደገና ይሞክሩ።",
    "includes": "የሚያካትተው",
    "pageMetaTitle": "ዋጋ | AIBAN",
    "pageMetaDescription": "የAIBAN ዕቅዶች እና ዋጋዎች። በ1 ምንጭ እና እስከ 100 ተመዝጋቢዎች በነጻ ይጀምሩ፣ ተጨማሪ ሲፈልጉ ወደ ወርሃዊ ወይም ዓመታዊ ዕቅድ ይሂዱ።",
    "pageTitle": "ዋጋ",
    "pageLead": "በ1 ምንጭ እና እስከ 100 ተመዝጋቢዎች በነጻው ዕቅድ ይጀምሩ። ተጨማሪ ምንጮች ወይም ተመዝጋቢዎች ሲፈልጉ ይጻፉልን፣ በወር ወይም በዓመት ወደሚከፈል ዕቅድ እናዛውርዎታለን።",
    "faqTitle": "የክፍያ ጥያቄዎች",
    "contactText": "ከፍ ያሉ ገደቦች ወይም ልዩ ማዋቀር ያስፈልግዎታል?",
    "contactCta": "ያግኙን",
    "everythingIn": "ካለፈው እቅድ በተጨማሪ የሚከተሉትን ይጨምራል፡",
    "isCurrentPlan": "ይህ የአሁኑ እቅድዎ ነው",
    "downgradeTo": "ወደ {planName} ይቀይሩ",
    "upgradeTo": "{planName} ይምረጡ",
    "mockMode": "የሙከራ ሁነታ",
    "mostPopular": "በብዛት የሚመረጠው",
    "perMonth": "በወር",
    "perYear": "በዓመት",
    "youSave": "የሚቆጥቡት"
  },
  "confirmSubscription": {
    "title": "ምዝገባዎን ያረጋግጡ",
    "goBack": "ተመለስ",
    "pleaseAccept": "ምዝገባዎን ለማጠናቀቅ እባክዎ ደንቦቹን ይቀበሉ።",
    "iAccept": "እቀበላለሁ፡",
    "termsAndConditions": "አጠቃላይ ደንቦች",
    "and": "እና",
    "privacyPolicy": "የግላዊነት ፖሊሲ",
    "confirm": "ምዝገባውን ያረጋግጡ",
    "mustAccept": "ለመመዝገብ ደንቦቹን መቀበል አለብዎት።",
    "invalidLink": "ይህ የማረጋገጫ ሊንክ ያልተሟላ ነው። የላክንልዎትን የቅርብ ጊዜ ኢሜል ከፍተው በውስጡ ያለውን ሊንክ ይጠቀሙ።"
  },
  "articles": {
    "title": "የቅርብ ጊዜ ጽሑፎች",
    "subtitle": "AIBAN ለሚልካቸው ጋዜጣዎች የጻፋቸው ጽሑፎች።",
    "producedIn": "እነዚህ ጽሑፎች የሚገኙባቸው ቋንቋዎች",
    "searchPlaceholder": "ጽሁፎችን ይፈልጉ...",
    "noArticlesFound": "ምንም ጽሁፍ አልተገኘም።",
    "created": "የተፈጠረበት፡",
    "language": "ቋንቋ፡",
    "rightsReserved": "መብቱ በሕግ የተጠበቀ ነው።",
    "errorFetching": "ጽሑፎቹን መጫን አልቻልንም። በአንድ ደቂቃ ውስጥ ገጹን እንደገና በመጫን ይሞክሩ።"
  },
  "blog": {
    "metaTitle": "የ{name} ብሎግ",
    "metaDescription": "ከ{name} የተገኙ ጽሑፎች። አዳዲሶቹን በኢሜል ለማግኘት ይመዝገቡ።",
    "eyebrow": "የጋዜጣ ብሎግ",
    "heroFrom": "ከ{name} የተገኙ ጽሑፎች",
    "heroDescription": "እነዚህ ይህ ጋዜጣ ያሳተማቸው ጽሑፎች ናቸው። አዳዲሶቹን በኢሜል ለማግኘት ይመዝገቡ።",
    "subscribe": "ይመዝገቡ",
    "home": "የብሎግ መነሻ",
    "featured": "የቅርብ ጊዜ ጽሑፍ",
    "latest": "የቅርብ ጊዜ ጽሑፎች",
    "latestHint": "አዲሶቹ መጀመሪያ። አንዳንድ ጽሑፎች ምስል የላቸውም፣ ስለዚህ እንደ ጽሑፍ ብቻ ይታያሉ።",
    "articleCount": "በ{language} {count} ጽሑፎች",
    "articleCountOne": "በ{language} 1 ጽሑፍ",
    "languages": "ቋንቋ ይምረጡ",
    "minRead": "{n} ደቂቃ ንባብ",
    "readArticle": "ጽሑፉን ያንብቡ",
    "page": "ገጽ {page}",
    "newer": "አዳዲስ ጽሑፎች",
    "older": "የቆዩ ጽሑፎች",
    "pagination": "የጽሑፍ ገጾች",
    "emptyTitle": "እስካሁን ምንም ጽሑፍ የለም",
    "emptyBody": "ይህ ጋዜጣ እስካሁን እዚህ ምንም ጽሑፍ አላሳተመም። የመጀመሪያውን በኢሜል ለማግኘት ይመዝገቡ።",
    "endTitle": "ተጨማሪ የቆዩ ጽሑፎች የሉም",
    "endBody": "የዝርዝሩ መጨረሻ ላይ ደርሰዋል።",
    "backToNewest": "ወደ አዳዲሶቹ ጽሑፎች ይሂዱ",
    "errorTitle": "እነዚህን ጽሑፎች መጫን አልቻልንም",
    "errorBody": "የጽሑፍ አገልጋዩ በጊዜው ምላሽ አልሰጠም። እንደገና ለመሞከር ከአንድ ደቂቃ በኋላ ገጹን ያድሱ።",
    "reload": "ገጹን ያድሱ",
    "missingHolder": "ይህ የብሎግ ሊንክ የማን ብሎግ እንደሚከፈት ስለማይገልጽ ያልተሟላ ነው። ሙሉውን ሊንክ የጋዜጣውን ባለቤት ይጠይቁ።",
    "redirecting": "ብሎጉ እየተከፈተ ነው...",
    "publishedWith": "በAIBAN የታተመ",
    "cta": {
      "title": "የሚቀጥለውን ጽሑፍ በኢሜል ያግኙ",
      "body": "ለ{name} ይመዝገቡ፣ አዳዲስ ጽሑፎችም ወደ የገቢ መልዕክት ሳጥንዎ ይደርሳሉ። በማንኛውም ጊዜ ምዝገባዎን ማቋረጥ ይችላሉ።",
      "button": "ይመዝገቡ"
    },
    "search": {
      "label": "ጽሑፎችን ይፈልጉ",
      "placeholder": "በቃል ወይም በሐረግ ይፈልጉ",
      "button": "ፈልግ",
      "suggestions": "ጥቆማዎች",
      "recent": "የቅርብ ጊዜ ፍለጋዎች",
      "clearRecent": "የቅርብ ጊዜ ፍለጋዎችን ያጽዱ",
      "title": "የፍለጋ ውጤቶች",
      "resultsFor": "ለ\"{q}\" የተገኙ ውጤቶች",
      "count": "{count} ጽሑፎች ተገኝተዋል",
      "countOne": "1 ጽሑፍ ተገኝቷል",
      "searching": "ጽሑፎች እየተፈለጉ ነው",
      "emptyTitle": "ከ\"{q}\" ጋር የሚዛመድ ጽሑፍ የለም",
      "emptyBody": "ፊደሉን ይፈትሹ ወይም አጠር ያለ ቃል ይሞክሩ። በብሎጉ ላይ ያሉትን ሁሉንም ጽሑፎችም ማሰስ ይችላሉ።",
      "browseAll": "ሁሉንም ጽሑፎች ያስሱ",
      "noQuery": "ይህን ብሎግ ለመፈለግ ከላይ ቃል ወይም ሐረግ ይጻፉ።",
      "error": "የጽሑፍ አገልጋዩ ምላሽ ስላልሰጠ ፍለጋው ቆሟል። ከአንድ ደቂቃ በኋላ እንደገና ይሞክሩ።",
      "tryAgain": "እንደገና ይሞክሩ",
      "limitNote": "የመጀመሪያዎቹ {count} ውጤቶች እየታዩ ነው። ዝርዝሩን ለማጥበብ የበለጠ የተለየ ሐረግ ይጠቀሙ።"
    },
    "article": {
      "back": "ሁሉም ጽሑፎች",
      "published": "የታተመው {date}",
      "by": "በ{name}",
      "otherLanguages": "በሌሎች ቋንቋዎች ተጨማሪ ያንብቡ",
      "otherLanguagesHint": "ይህ ጋዜጣ በእነዚህ ቋንቋዎችም ያትማል። እያንዳንዱ ሊንክ ብሎጉን በዚያ ቋንቋ ይከፍታል።",
      "share": "ይህን ጽሑፍ ያጋሩ",
      "copyLink": "ሊንኩን ቅዳ",
      "copied": "ሊንኩ ተቀድቷል። በየትኛውም ቦታ መለጠፍ ይችላሉ።",
      "copyFailed": "ሊንኩን መቅዳት አልተቻለም። በምትኩ ከአሳሽዎ የአድራሻ አሞሌ ይቅዱት።",
      "notFoundTitle": "ጽሑፉ አልተገኘም",
      "notFoundBody": "ይህ ጽሑፍ ተወግዶ ሊሆን ይችላል፣ ወይም ሊንኩ ያልተሟላ ነው። ሌሎቹን ጽሑፎች ለማየት ብሎጉን ይክፈቱ።",
      "errorTitle": "ይህን ጽሑፍ መጫን አልቻልንም",
      "errorBody": "የጽሑፍ አገልጋዩ በጊዜው ምላሽ አልሰጠም። እንደገና ለመሞከር ከአንድ ደቂቃ በኋላ ገጹን ያድሱ።",
      "goToBlog": "ወደ ብሎጉ ይሂዱ"
    }
  },
  "nav": {
    "mainLabel": "ዋና",
    "legalLabel": "ሕጋዊ",
    "home": "የAIBAN መነሻ",
    "menu": "ምናሌ",
    "openMenu": "ምናሌውን ይክፈቱ",
    "closeMenu": "ምናሌውን ይዝጉ",
    "howItWorks": "እንዴት እንደሚሰራ",
    "pricing": "ዋጋ",
    "help": "እገዛ",
    "about": "ስለ እኛ",
    "privacy": "ግላዊነት",
    "terms": "ውሎች",
    "cookies": "ኩኪዎች",
    "signOut": "ይውጡ",
    "chooseLanguage": "ቋንቋ ይምረጡ",
    "currentLanguage": "ቋንቋ፦ {name}"
  },
  "about": {
    "metaTitle": "ስለ እኛ | AIBAN",
    "metaDescription": "AIBAN አንድ ንግድ ቀድሞ የሚያትመውን ይዘት በራሱ ወደሚላክ ጋዜጣ ይቀይራል፣ በእያንዳንዱ ተመዝጋቢ ቋንቋ እና በባለቤቱ ስም።",
    "eyebrow": "ስለ እኛ",
    "title": "ስለ AIBAN",
    "lead": "AIBAN አንድ ንግድ ቀድሞ የሚያትመውን ይዘት በራሱ ወደሚላክ ጋዜጣ ይቀይራል። እያንዳንዱ ተመዝጋቢ በራሱ ቋንቋ ያነበዋል፣ ጋዜጣውም በባለቤቱ ስም ይደርሳል።",
    "whatTitle": "AIBAN ምን ይሰራል",
    "whatBody": [
      "ይዘትዎ የት እንዳለ ለAIBAN ይነግሩታል፦ ድረ ገጽዎ፣ ብሎግዎ ወይም የሚከታተሏቸው የዜና ድረ ገጾች። እዚያ አዲስ ነገር ሲወጣ AIBAN በገለጹት አጻጻፍ እትም ጽፎ በመረጡት መርሐ ግብር ለተመዝጋቢዎችዎ ይልካል።",
      "እያንዳንዱ ተመዝጋቢ ሲመዘገብ ቋንቋ ይመርጣል፣ እያንዳንዱ እትምም ከመላኩ በፊት ወደዚያ ቋንቋ ይተረጎማል። ጽሑፎቹ እንደ ድረ ገጾችም ይታተማሉ፣ ወደ ራስዎ ድረ ገጽም መላክ ይችላሉ።"
    ],
    "whoTitle": "ማን ይሰራዋል",
    "whoBody": [
      "AIBANን የገነባው መስራቹ ሉዊስ ሙሪዮ ባልቶዳኖ ነው። ሉዊስ በኮምፒውተር ግራፊክስ እና በአውቶሜሽን ልምድ ያለው የፈጠራ መሐንዲስ ነው።",
      "አንዳንድ የክፍት ምንጭ ስራዎቹ ከታች ተዘርዝረዋል።"
    ],
    "projectsTitle": "የመስራቹ የክፍት ምንጭ ስራዎች",
    "projects": [
      {
        "name": "Scene Preset",
        "url": "https://github.com/LuisArmando-TestCoder/scene-preset",
        "desc": "ከThree.js እና ከ3D የድር API ጋር ሲሰሩ ተደጋጋሚ ኮድን የሚያስቀር ላይብረሪ።"
      },
      {
        "name": "Canvas Preset",
        "url": "https://github.com/LuisArmando-TestCoder/canvas-preset",
        "desc": "ለተለመዱ የCanvas API ስራዎች የሚሆኑ አጋዦች።"
      },
      {
        "name": "Atomic Gatsby ቴምፕሌት",
        "url": "https://github.com/LuisArmando-TestCoder/atomic-gatsby-typescript-recoiljs",
        "desc": "በአቶሚክ ዲዛይን የተደራጀ የመጀመሪያ ቴምፕሌት።"
      }
    ],
    "githubLabel": "ሉዊስ በGitHub",
    "newTab": "(በአዲስ ትር ይከፈታል)",
    "contactTitle": "ያግኙን",
    "contactBody": "ለጥያቄዎች፣ አስተያየቶች ወይም የአጋርነት ሀሳቦች ወደ info@aiban.news ይጻፉ።",
    "emailCta": "ወደ info@aiban.news ኢሜል ይላኩ",
    "startCta": "በነጻ ይጀምሩ",
    "helpCta": "የእገዛ ማዕከሉን ያንብቡ"
  },
  "careers": {
    "metaTitle": "የስራ ዕድሎች | AIBAN",
    "metaDescription": "AIBAN በአሁኑ ጊዜ ክፍት የስራ ቦታ የለውም። ቢሆንም በinfo@aiban.news ሊጽፉልን ይችላሉ።",
    "eyebrow": "የስራ ዕድሎች",
    "title": "በAIBAN የስራ ዕድሎች",
    "lead": "AIBAN በአሁኑ ጊዜ ክፍት የስራ ቦታ የለውም።",
    "body": "የስራ ቦታ ሲከፈት በዚህ ገጽ ላይ ይዘረዘራል። ወደፊት በAIBAN ላይ መስራት ከፈለጉ፣ ስለራስዎ እና መገንባት ስለሚፈልጉት ነገር አጭር ማስታወሻ ይላኩ።",
    "emailCta": "ወደ info@aiban.news ኢሜል ይላኩ",
    "emailSubject": "በAIBAN ላይ መስራት",
    "aboutCta": "ስለ AIBAN ያንብቡ"
  },
  "legal": {
    "navLabel": "ሕጋዊ ሰነዶች",
    "lastUpdated": "ለመጨረሻ ጊዜ የተዘመነው፦ {date}",
    "privacy": {
      "title": "የግላዊነት ፖሊሲ",
      "metaTitle": "የግላዊነት ፖሊሲ | AIBAN",
      "metaDescription": "AIBAN ውሂብዎን እንዴት እንደሚሰበስብ፣ እንደሚጠቀም እና እንደሚጠብቅ፣ እንዲሁም የውሂብ መብቶችዎን እንዴት መጠቀም እንደሚችሉ።"
    },
    "terms": {
      "title": "የአገልግሎት ውሎች",
      "metaTitle": "የአገልግሎት ውሎች | AIBAN",
      "metaDescription": "መለያ ሲፈጥሩ እና AIBANን ሲጠቀሙ ተፈጻሚ የሚሆኑ ውሎች።"
    },
    "cookies": {
      "title": "የኩኪ ፖሊሲ",
      "metaTitle": "የኩኪ ፖሊሲ | AIBAN",
      "metaDescription": "AIBAN የሚጠቀማቸው ኩኪዎች፣ ምን እንደሚሰሩ፣ ለምን ያህል ጊዜ እንደሚቆዩ እና እንዴት መቆጣጠር እንደሚችሉ።"
    }
  },
  "demoPage": {
    "metaTitle": "ማሳያ | AIBAN",
    "metaDescription": "የAIBAN ማሳያ ቪዲዮ ይመልከቱ፣ ከተመዘገቡ በኋላ ድረ ገጽዎን ከማከል እስከ የመጀመሪያ እትምዎን መላክ ድረስ ምን እንደሚፈጠር ይዩ።",
    "eyebrow": "ማሳያ",
    "title": "AIBAN እንዴት እንደሚሰራ ይመልከቱ",
    "lead": "የማሳያ ቪዲዮውን ይመልከቱ፣ ከዚያ ከተመዘገቡ በኋላ ምን እንደሚፈጠር ያንብቡ።",
    "videoTitle": "የAIBAN ማሳያ ቪዲዮ",
    "playLabel": "የማሳያ ቪዲዮውን ያጫውቱ",
    "videoNote": "ቪዲዮው ከYouTube ይጫወታል።",
    "stepsTitle": "ከተመዘገቡ በኋላ ምን ይፈጠራል",
    "steps": [
      {
        "title": "ድረ ገጽዎን ያክሉ",
        "body": "የድረ ገጽዎን፣ የብሎግዎን ወይም የሚከታተሉትን የዜና ድረ ገጽ አድራሻ ያስገቡ። AIBAN አዲስ ይዘት ለማግኘት ያነበዋል።"
      },
      {
        "title": "አንባቢዎችዎን እና አጻጻፍዎን ይግለጹ",
        "body": "ጋዜጣዎን ማን እንደሚያነብ እና እንዴት መሰማት እንዳለበት ለAIBAN ይንገሩት። ከድረ ገጽዎ መግለጫ እንዲጠቁም መፍቀድም ይችላሉ።"
      },
      {
        "title": "መርሐ ግብር ይምረጡ",
        "body": "እትሞች ምን ያህል ጊዜ እንደሚላኩ ይምረጡ። በኋላ በቁጥጥር ፓነልዎ መቀየር ይችላሉ።"
      },
      {
        "title": "ተመዝጋቢዎችን ያክሉ",
        "body": "ዝርዝር ይጫኑ፣ ሰዎችን አንድ በአንድ ያክሉ ወይም የምዝገባ ገጽዎን እና መግብርዎን ያጋሩ። እያንዳንዱ ተመዝጋቢ ቋንቋ ይመርጣል።"
      },
      {
        "title": "የላኪ ስምዎን እና ፊርማዎን ያክሉ",
        "body": "አንባቢዎች የሚያዩትን ስም እና የኢሜል ፊርማ ያክሉ። AIBAN እያንዳንዱን እትም ከተረጋገጠ አድራሻው በስምዎ ይልካል፣ ምላሾችም ወደ ገቢ መልዕክት ሳጥንዎ ይሄዳሉ።"
      }
    ],
    "ctaTitle": "በራስዎ ድረ ገጽ ይሞክሩት",
    "ctaBody": "ነጻው ዕቅድ 1 ምንጭ እና እስከ 100 ተመዝጋቢዎችን ያካትታል።",
    "primaryCta": "በነጻ ይጀምሩ",
    "secondaryCta": "ዋጋዎችን ይመልከቱ"
  },
  "helpCenter": {
    "metaTitle": "እገዛ | AIBAN",
    "metaDescription": "AIBANን ስለማዘጋጀት መልሶች፦ ምንጮች፣ ቋንቋዎች፣ በስምዎ መላክ፣ ተመዝጋቢዎች፣ የምዝገባ ዊጄት፣ ብሎግ እና ክፍያ።",
    "eyebrow": "የእገዛ ማዕከል",
    "title": "እንዴት ልንረዳዎ እንችላለን?",
    "lead": "ጋዜጣዎን ስለማዋቀር እና ስለማስኬድ መልሶችን ያግኙ። የሚፈልጉትን ካላገኙ ይጻፉልን።",
    "searchLabel": "በእገዛ ማዕከሉ ይፈልጉ",
    "searchPlaceholder": "ቋንቋ፣ መግብር ወይም መሰረዝ ብለው ይሞክሩ",
    "clearSearch": "ፍለጋውን ያጽዱ",
    "resultsCount": "{count} መልሶች ከፍለጋዎ ጋር ይዛመዳሉ።",
    "noResults": "ከፍለጋዎ ጋር የሚዛመድ መልስ የለም። ሌላ ቃል ይሞክሩ ወይም ወደ info@aiban.news ኢሜል ይላኩ።",
    "topicsLabel": "ርዕሶች",
    "copyLink": "ሊንኩን ቅዳ",
    "linkCopied": "ሊንኩ ተቀድቷል",
    "contactTitle": "አሁንም እገዛ ያስፈልግዎታል?",
    "contactBody": "ወደ info@aiban.news ይጻፉ፣ የተመዘገቡበትንም የኢሜል አድራሻ ያካትቱ።",
    "emailCta": "ወደ info@aiban.news ኢሜል ይላኩ",
    "limitsTitle": "ከፍ ያሉ ገደቦችን ይጠይቁ",
    "limitsBody": "የሚፈልጓቸውን ገደቦች ይንገሩን፣ በኢሜል እንመልሳለን። ጥያቄው ከዚህ ገጽ መላክ ካልቻለ፣ የኢሜል መተግበሪያዎ ጥያቄውን ሞልቶ ይከፈታል፣ እርስዎም ወደ እኛ ይልኩታል።",
    "faqFilterLabel": "ጥያቄዎችን አጣራ",
    "faqNoMatch": "ከማጣሪያዎ ጋር የሚዛመድ ጥያቄ የለም።",
    "groups": [
      {
        "id": "getting-started",
        "title": "መጀመር",
        "items": [
          {
            "id": "what-is-aiban",
            "q": "AIBAN ምንድን ነው?",
            "a": "AIBAN ቀድሞ የሚያትሙትን ይዘት ወደ ተደጋጋሚ ጋዜጣ ይቀይራል። ድረ ገጽዎን፣ ብሎግዎን ወይም የመረጧቸውን የዜና ድረ ገጾች ያነባል፣ በእርስዎ አጻጻፍ አዳዲስ እትሞችን ጽፎ ለተመዝጋቢዎችዎ ይልካል። እያንዳንዱ ተመዝጋቢ በመረጠው ቋንቋ ያነበዋል።"
          },
          {
            "id": "how-to-start",
            "q": "እንዴት ልጀምር?",
            "a": "በምዝገባ ገጹ ላይ መለያ ይፍጠሩ። ማዋቀሩ የድረ ገጽዎን አድራሻ እና ስለ አንባቢዎችዎ ጥቂት ዝርዝሮችን ይጠይቃል። ከዚያ በኋላ ተመዝጋቢዎችን ማከል እና ሁሉንም ነገር ከቁጥጥር ፓነልዎ ማስተዳደር ይችላሉ።"
          },
          {
            "id": "change-settings",
            "q": "ማዋቀሬን በኋላ መቀየር እችላለሁ?",
            "a": "አዎ። ምንጮችን፣ መርሐ ግብሩን፣ የላኪ ዝርዝሮችን እና ተመዝጋቢዎችን በኋላ በዳሽቦርድዎ መቀየር ይችላሉ። ዕቅድዎን ለመቀየር ወደ info@aiban.news ይጻፉ።"
          }
        ]
      },
      {
        "id": "sources",
        "title": "ምንጮች እና ይዘት",
        "items": [
          {
            "id": "what-is-a-source",
            "q": "እንደ ምንጭ ምን መጠቀም እችላለሁ?",
            "a": "ምንጭ AIBAN አዲስ ይዘት ለማግኘት የሚያነበው የድር አድራሻ ነው፣ ለምሳሌ ድረ ገጽዎ፣ ብሎግዎ ወይም የሚከታተሉት የዜና ድረ ገጽ። ምንጮችን በቁጥጥር ፓነልዎ ያክላሉ። ምን ያህል ማከል እንደሚችሉ በዕቅድዎ ይወሰናል።"
          },
          {
            "id": "how-often",
            "q": "ጋዜጣዬ ምን ያህል ጊዜ ይላካል?",
            "a": "ምንጭ ሲያዋቅሩ ምን ያህል ጊዜ እንደሚታተም ይመርጣሉ። መርሐ ግብሩን በኋላ በቁጥጥር ፓነልዎ መቀየር ይችላሉ።"
          },
          {
            "id": "your-voice",
            "q": "AIBAN በእኔ አጻጻፍ እንዴት ይጽፋል?",
            "a": "የጋዜጣዎን ባሕሪ ይገልጻሉ፣ ወይም AIBAN መግለጫ እንዲያዘጋጅልዎ ይፈቅዳሉ። እትሞች በዚያ መግለጫ መሰረት ይጻፋሉ። በማንኛውም ጊዜ በቁጥጥር ፓነልዎ ማስተካከል ይችላሉ።"
          }
        ]
      },
      {
        "id": "languages",
        "title": "ቋንቋዎች",
        "items": [
          {
            "id": "subscriber-language",
            "q": "ተመዝጋቢዎች ጋዜጣውን በቋንቋቸው እንዴት ያገኛሉ?",
            "a": "እያንዳንዱ ተመዝጋቢ ሲመዘገብ የሚመርጠውን ቋንቋ ይመርጣል። AIBAN እያንዳንዱን እትም ከመላኩ በፊት ወደዚያ ቋንቋ ይተረጉማል።"
          },
          {
            "id": "site-language",
            "q": "ድረ ገጹን በቋንቋዬ መጠቀም እችላለሁ?",
            "a": "አዎ። የድረ ገጹን እና የቁጥጥር ፓነሉን ቋንቋ ለመቀየር በማያ ገጹ ታች በቀኝ በኩል ያለውን የቋንቋ ቁልፍ ይጠቀሙ።"
          }
        ]
      },
      {
        "id": "sending",
        "title": "በስምዎ መላክ",
        "items": [
          {
            "id": "own-address",
            "q": "እትሞች ከራሴ የኢሜል አድራሻ ሊላኩ ይችላሉ?",
            "a": "እትሞች ከAIBAN የመላኪያ አድራሻ በላኪ ስምዎ እና በኢሜል ፊርማዎ ይላካሉ፣ ምላሾችም ወደ ገቢ መልዕክት ሳጥንዎ ይሄዳሉ። የኢሜል የይለፍ ቃልዎን አንጠይቅም፣ ስለዚህ ሊወጣ የሚችል የእርስዎ ነገር የለም።"
          },
          {
            "id": "app-password",
            "q": "የኢሜል የይለፍ ቃሌን ለAIBAN መስጠት አለብኝ?",
            "a": "አይ። AIBAN የኢሜል የይለፍ ቃልዎን ወይም የመተግበሪያ የይለፍ ቃል በጭራሽ አይጠይቅም። እትሞች ከAIBAN አድራሻ በስምዎ ይላካሉ፣ ምላሾችም ወደ እርስዎ ይመጣሉ።"
          }
        ]
      },
      {
        "id": "subscribers",
        "title": "ተመዝጋቢዎች እና የምዝገባ መግብር",
        "items": [
          {
            "id": "add-subscribers",
            "q": "ተመዝጋቢዎችን እንዴት እጨምራለሁ?",
            "a": "ሰዎችን በቁጥጥር ፓነልዎ አንድ በአንድ ማከል ወይም ዝርዝርዎን የያዘ ፋይል መጫን ይችላሉ። ሰዎች በምዝገባ ገጽዎ ወይም በምዝገባ መግብሩ በኩልም መቀላቀል ይችላሉ።"
          },
          {
            "id": "signup-widget",
            "q": "የምዝገባ መግብሩ ምንድን ነው?",
            "a": "መግብሩ በራስዎ ድረ ገጽ ላይ ሊያስቀምጡት የሚችሉት የምዝገባ ቅጽ ነው። ጎብኚዎች የኢሜል አድራሻቸውን አስገብተው ቋንቋቸውን ይመርጣሉ፣ ዝርዝርዎንም ይቀላቀላሉ።"
          },
          {
            "id": "subscriber-limit",
            "q": "በተመዝጋቢዎች ቁጥር ላይ ገደብ አለ?",
            "a": "እያንዳንዱ ዕቅድ የራሱ የተመዝጋቢ ገደብ አለው። ነጻው ዕቅድ እስከ 100 ተመዝጋቢዎችን ያካትታል። የዋጋ ገጹ የሌሎቹን ዕቅዶች ገደቦች ይዘረዝራል።"
          }
        ]
      },
      {
        "id": "blog",
        "title": "ብሎግ",
        "items": [
          {
            "id": "blog-pages",
            "q": "የጋዜጣዬ ጽሑፎች በድር ላይ ይታተማሉ?",
            "a": "አዎ። AIBAN ለጋዜጣዎ የሚጽፋቸው ጽሑፎች እንደ ድረ ገጾችም ይታተማሉ፣ ስለዚህ ሰዎች ከገቢ መልዕክት ሳጥናቸው ውጭም ሊያነቧቸው ይችላሉ።"
          },
          {
            "id": "post-to-site",
            "q": "ጽሑፎችን በራሴ ድረ ገጽ ላይ መለጠፍ እችላለሁ?",
            "a": "አዎ። በቁጥጥር ፓነልዎ እያንዳንዱን የጋዜጣ ጽሑፍ ወደ ድረ ገጽዎ እንደ ልጥፍ የሚልክ webhook ማዋቀር ይችላሉ። ከWordPress እና መደበኛ የREST ይዘት ከሚቀበል ማንኛውም መድረክ ጋር ይሰራል።"
          }
        ]
      },
      {
        "id": "billing",
        "title": "ክፍያ",
        "items": [
          {
            "id": "free-plan",
            "q": "ነጻ ዕቅድ አለ?",
            "a": "አዎ። ነጻው ዕቅድ 1 ምንጭ እና እስከ 100 ተመዝጋቢዎችን ያካትታል። ተጨማሪ ሲያስፈልግዎ ወደሚከፈልበት ዕቅድ መሸጋገር ይችላሉ።"
          },
          {
            "id": "monthly-yearly",
            "q": "በወር ወይም በዓመት መክፈል እችላለሁ?",
            "a": "አዎ። የሚከፈልባቸው ዕቅዶች በወር ወይም በዓመት ይከፈላሉ። ዓመታዊው ዋጋ ለ12 ወራት በየወሩ ከመክፈል 35% ያነሰ ነው። ዕቅድ ለመምረጥ ወደ info@aiban.news ይጻፉ።"
          },
          {
            "id": "cancel",
            "q": "በማንኛውም ጊዜ መሰረዝ እችላለሁ?",
            "a": "አዎ። በማንኛውም ጊዜ ወደ info@aiban.news ይጻፉልን፣ የሚከፈልበትን ዕቅድዎን እንሰርዛለን ወይም ወደ ነጻው ዕቅድ እንመልስዎታለን።"
          },
          {
            "id": "higher-limits",
            "q": "ከትልቁ ዕቅድ በላይ ቢያስፈልገኝስ?",
            "a": "የሚፈልጓቸውን ገደቦች ለመንገር በእገዛ ገጹ ላይ ያለውን የጥያቄ ቅጽ ይጠቀሙ። በኢሜል እንመልሳለን።"
          }
        ]
      }
    ]
  },
  "mainPage": {
    "skipToMainContent": "ወደ ዋናው ይዘት ይለፉ",
    "dismissAnnouncement": "ማስታወቂያውን ደብቅ",
    "problem": "ችግር፡",
    "outcome": "ውጤት፡",
    "disclaimer": "የ35% ቅናሽ የሚሰራው በዓመታዊ ክፍያ ላይ ብቻ ነው።"
  },
  "authForm": {
    "emailValidation": "እንደ name@example.com ያለ የኢሜል አድራሻ ያስገቡ።",
    "failedToSendCode": "ኮዱን መላክ አልቻልንም። የኢሜል አድራሻውን ፈትሸው በአንድ ደቂቃ ውስጥ እንደገና ይሞክሩ።",
    "sending": "በመላክ ላይ...",
    "codeSent": "ወደ ኢሜልዎ ኮድ ልከናል።",
    "invalidCode": "ያ ኮድ ትክክል አይደለም። የላክንልዎትን የቅርብ ጊዜ ኢሜል ይፈትሹ፣ ወይም ኮዱን እንደገና ያስልኩ።",
    "regenerateCode": "ኮዱን እንደገና ላክ",
    "back": "ተመለስ",
    "byProceeding": "በመቀጠልዎ የሚከተሉትን ይቀበላሉ፡",
    "termsOfService": "የአገልግሎት ውሎች",
    "and": "እና",
    "privacyPolicy": "የግላዊነት ፖሊሲ",
    "appName": "AI Newsletter"
  },
  "welcome": {
    "title": "አውቶማቲክ የኒውስሌተር አፍላቂ",
    "setItOnce": "አንድ ጊዜ ያዘጋጁት።",
    "useItForever": "ከዚያ በኋላ መስራቱን ይቀጥላል።"
  },
  "lead": {
    "title": "ደንበኞችዎን ወደ ጎብኝዎች ይለውጡ",
    "recommendation": "ድረ-ገጽዎን በማገናኘት AI ምርትዎን እንዲረዳ ያግዙት።",
    "question": "ድረ ገጽ አለዎት? (አማራጭ፣ በኋላ ማከል ይችላሉ)",
    "placeholder": "https://your-site.com"
  },
  "newsSource": {
    "title": "የይዘት ምንጭዎን ያገናኙ",
    "subtitle": "ከባዶ እንዳይጀምሩ ይዘቶችን ከምንጭዎ እናመጣለን።",
    "placeholder": "የእርስዎ ብሎግ ወይም RSS ሊንክ"
  },
  "subscribe": {
    "welcome": {
      "title": "ወደ ጋዜጣው እንኳን ደህና መጡ።",
      "invitedBy": "የተጋበዙት በ {configuratorId} ነው።"
    }
  },
  "header": {
    "goToWorkspace": "የቁጥጥር ፓነሉን ይክፈቱ",
    "inBilling": "ዋጋ",
    "vip": "VIP",
    "plan": "እቅድ {planName}",
    "logIn": "ይግቡ",
    "getStarted": "በነጻ ይጀምሩ"
  },
  "fileInput": {
    "chooseFile": "ፋይል ይምረጡ",
    "dropFile": "እዚህ ይልቀቁ",
    "release": "ለመጫን ይልቀቁ"
  },
  "billing": {
    "title": "ክፍያ እና ምዝገባ",
    "currentPlanTitle": "የአሁኑ ዕቅድዎ",
    "upgradePlanTitle": "ዕቅድዎን ይቀይሩ",
    "manageSubscription": "የደንበኝነት ምዝገባን ያስተዳድሩ",
    "vipPlanName": "VIP አጋር",
    "vipPlanDescription": "ያልተገደበ መዳረሻ፣ በAIBAN የተሰጠ።",
    "perMonth": "በወር",
    "perYear": "በዓመት",
    "monthAbbreviation": "ወር",
    "equivalentTo": "ከዚህ ጋር እኩል፡",
    "mostPopular": "በጣም ተመራጭ",
    "upgradeTo": "ወደዚህ ያሳድጉ፡",
    "downgradeTo": "ወደዚህ ዝቅ ያድርጉ፡",
    "currentPlanButton": "የእርስዎ ዕቅድ",
    "youSave": "የሚቆጥቡት",
    "users": "ተጠቃሚዎች",
    "newsSources": "የዜና ምንጮች",
    "monthly": "ወርሃዊ",
    "yearly": "ዓመታዊ",
    "loadingPlan": "መረጃ በመጫን ላይ..."
  },
  "languages": [
    {
      "code": "ab",
      "name": "አብካዝኛ"
    },
    {
      "code": "aa",
      "name": "አፋርኛ"
    },
    {
      "code": "af",
      "name": "አፍሪካንስ"
    },
    {
      "code": "ak",
      "name": "አካን"
    },
    {
      "code": "sq",
      "name": "አልባኒያን"
    },
    {
      "code": "am",
      "name": "አማርኛ"
    },
    {
      "code": "ar",
      "name": "አረብኛ"
    },
    {
      "code": "an",
      "name": "አራጎኒዝ"
    },
    {
      "code": "hy",
      "name": "አርመንኛ"
    },
    {
      "code": "as",
      "name": "አሳሜዝኛ"
    },
    {
      "code": "av",
      "name": "አቫሪክ"
    },
    {
      "code": "ae",
      "name": "አቬስታን"
    },
    {
      "code": "ay",
      "name": "አይማራ"
    },
    {
      "code": "az",
      "name": "አዘርባጃኒ"
    },
    {
      "code": "bm",
      "name": "ባምባራ"
    },
    {
      "code": "ba",
      "name": "ባሽኪር"
    },
    {
      "code": "eu",
      "name": "ባስክ"
    },
    {
      "code": "be",
      "name": "ቤላሩስኛ"
    },
    {
      "code": "bn",
      "name": "ቤንጋሊ"
    },
    {
      "code": "bi",
      "name": "ቢስላማ"
    },
    {
      "code": "bs",
      "name": "ቦስኒያኛ"
    },
    {
      "code": "br",
      "name": "ብሬቶን"
    },
    {
      "code": "bg",
      "name": "ቡልጋርኛ"
    },
    {
      "code": "my",
      "name": "በርማኛ"
    },
    {
      "code": "ca",
      "name": "ካታላን"
    },
    {
      "code": "ch",
      "name": "ቻሞሮ"
    },
    {
      "code": "ce",
      "name": "ቼቼን"
    },
    {
      "code": "ny",
      "name": "ቺቼዋ"
    },
    {
      "code": "zh",
      "name": "ቻይንኛ"
    },
    {
      "code": "cu",
      "name": "የቤተክርስቲያን ስላቪክ"
    },
    {
      "code": "cv",
      "name": "ቹቫሽ"
    },
    {
      "code": "kw",
      "name": "ኮርኒሽ"
    },
    {
      "code": "co",
      "name": "ኮርሲካን"
    },
    {
      "code": "cr",
      "name": "ክሪ"
    },
    {
      "code": "hr",
      "name": "ክሮሺያኛ"
    },
    {
      "code": "cs",
      "name": "ቼክ"
    },
    {
      "code": "da",
      "name": "ዳኒሽ"
    },
    {
      "code": "dv",
      "name": "ዲቬሂ"
    },
    {
      "code": "nl",
      "name": "ደች"
    },
    {
      "code": "dz",
      "name": "ድዞንግካ"
    },
    {
      "code": "en",
      "name": "እንግሊዝኛ"
    },
    {
      "code": "eo",
      "name": "ኤስፔራንቶ"
    },
    {
      "code": "et",
      "name": "ኢስቶኒያኛ"
    },
    {
      "code": "ee",
      "name": "ኢዌ"
    },
    {
      "code": "fo",
      "name": "ፋሮይስ"
    },
    {
      "code": "fj",
      "name": "ፊጂኛ"
    },
    {
      "code": "fi",
      "name": "ፊኒሽ"
    },
    {
      "code": "fr",
      "name": "ፈረንሳይኛ"
    },
    {
      "code": "fy",
      "name": "ምዕራባዊ ፍሪስያን"
    },
    {
      "code": "ff",
      "name": "ፉላህ"
    },
    {
      "code": "gd",
      "name": "ስኮትላንዳዊ ጌሊክ"
    },
    {
      "code": "gl",
      "name": "ጋሊሺያን"
    },
    {
      "code": "lg",
      "name": "ጋንዳ"
    },
    {
      "code": "ka",
      "name": "ጆርጂያኛ"
    },
    {
      "code": "de",
      "name": "ጀርመንኛ"
    },
    {
      "code": "el",
      "name": "ግሪክ"
    },
    {
      "code": "kl",
      "name": "ካላሊሱት (ግሪንላንድኛ)"
    },
    {
      "code": "gn",
      "name": "ጓራኒ"
    },
    {
      "code": "gu",
      "name": "ጉጃራቲ"
    },
    {
      "code": "ht",
      "name": "የሃይቲ ክሪኦል"
    },
    {
      "code": "ha",
      "name": "ሃውሳ"
    },
    {
      "code": "he",
      "name": "ዕብራይስጥ"
    },
    {
      "code": "hz",
      "name": "ሄሬሮ"
    },
    {
      "code": "hi",
      "name": "ሂንዲ"
    },
    {
      "code": "ho",
      "name": "ሂሪ ሞቱ"
    },
    {
      "code": "hu",
      "name": "ሀንጋሪኛ"
    },
    {
      "code": "is",
      "name": "አይስላንድኛ"
    },
    {
      "code": "io",
      "name": "ኢዶ"
    },
    {
      "code": "ig",
      "name": "ኢግቦ"
    },
    {
      "code": "id",
      "name": "ኢንዶኔዥያኛ"
    },
    {
      "code": "ia",
      "name": "ኢንተርሊንጓ"
    },
    {
      "code": "ie",
      "name": "ኢንተርሊንግ"
    },
    {
      "code": "iu",
      "name": "ኢኑክቲቱት"
    },
    {
      "code": "ik",
      "name": "ኢኑፒያክ"
    },
    {
      "code": "ga",
      "name": "አይሪሽ"
    },
    {
      "code": "it",
      "name": "ጣሊያንኛ"
    },
    {
      "code": "ja",
      "name": "ጃፓንኛ"
    },
    {
      "code": "jv",
      "name": "ጃቫኒዝ"
    },
    {
      "code": "kn",
      "name": "ካናዳ"
    },
    {
      "code": "kr",
      "name": "ካኑሪ"
    },
    {
      "code": "ks",
      "name": "ካሽሚሪ"
    },
    {
      "code": "kk",
      "name": "ካዛክ"
    },
    {
      "code": "km",
      "name": "ខ្መር"
    },
    {
      "code": "ki",
      "name": "ኪኩዩ"
    },
    {
      "code": "rw",
      "name": "ኪንያርዋንዳ"
    },
    {
      "code": "ky",
      "name": "ኪርጊዝ"
    },
    {
      "code": "kv",
      "name": "ኮሚ"
    },
    {
      "code": "kg",
      "name": "ኮንጎ"
    },
    {
      "code": "ko",
      "name": "ኮሪያኛ"
    },
    {
      "code": "kj",
      "name": "ኩዋንያማ"
    },
    {
      "code": "ku",
      "name": "ኩርድሽ"
    },
    {
      "code": "lo",
      "name": "ላኦ"
    },
    {
      "code": "la",
      "name": "ላቲን"
    },
    {
      "code": "lv",
      "name": "ላትቪያኛ"
    },
    {
      "code": "li",
      "name": "ሊምበርግሽ"
    },
    {
      "code": "ln",
      "name": "ሊንጋላ"
    },
    {
      "code": "lt",
      "name": "ሊቱዌኒያኛ"
    },
    {
      "code": "lu",
      "name": "ሉባ-ካታንጋ"
    },
    {
      "code": "lb",
      "name": "ሉክሰምበርግኛ"
    },
    {
      "code": "mk",
      "name": "መቄዶንያኛ"
    },
    {
      "code": "mg",
      "name": "ማላጋሲ"
    },
    {
      "code": "ms",
      "name": "ማላይ"
    },
    {
      "code": "ml",
      "name": "ማላያላም"
    },
    {
      "code": "mt",
      "name": "ማልቲዝ"
    },
    {
      "code": "gv",
      "name": "ማንክስ"
    },
    {
      "code": "mi",
      "name": "ማኦሪ"
    },
    {
      "code": "mr",
      "name": "ማራቲ"
    },
    {
      "code": "mh",
      "name": "ማርሻሊዝ"
    },
    {
      "code": "mn",
      "name": "ሞንጎሊያኛ"
    },
    {
      "code": "na",
      "name": "ናኡሩ"
    },
    {
      "code": "nv",
      "name": "ናቫሆ"
    },
    {
      "code": "nd",
      "name": "ሰሜን ንዴቤሌ"
    },
    {
      "code": "nr",
      "name": "ደቡብ ንዴቤሌ"
    },
    {
      "code": "ng",
      "name": "ንዶንጋ"
    },
    {
      "code": "ne",
      "name": "ኔፓሊ"
    },
    {
      "code": "no",
      "name": "ኖርዌጂያን"
    },
    {
      "code": "nb",
      "name": "ኖርዌጂያን ቦክማል"
    },
    {
      "code": "nn",
      "name": "ኖርዌጂያን ናይኖርስክ"
    },
    {
      "code": "oc",
      "name": "ኦሲታን"
    },
    {
      "code": "oj",
      "name": "ኦጂብዋ"
    },
    {
      "code": "or",
      "name": "ኦሪያ"
    },
    {
      "code": "om",
      "name": "ኦሮሞ"
    },
    {
      "code": "os",
      "name": "ኦሴቲክ"
    },
    {
      "code": "pi",
      "name": "ፓሊ"
    },
    {
      "code": "ps",
      "name": "ፓሽቶ"
    },
    {
      "code": "fa",
      "name": "ፋርስኛ (ፋርሲ)"
    },
    {
      "code": "pl",
      "name": "ፖሊሽ"
    },
    {
      "code": "pt",
      "name": "ፖርቱጋልኛ"
    },
    {
      "code": "pa",
      "name": "ፑንጃቢ"
    },
    {
      "code": "qu",
      "name": "ኬቹዋ"
    },
    {
      "code": "ro",
      "name": "ሮማኒያን"
    },
    {
      "code": "rm",
      "name": "ሮማንሽ"
    },
    {
      "code": "rn",
      "name": "ሩንዲ"
    },
    {
      "code": "ru",
      "name": "ራሽኛ"
    },
    {
      "code": "se",
      "name": "ሰሜናዊ ሳሚ"
    },
    {
      "code": "sm",
      "name": "ሳሞአን"
    },
    {
      "code": "sg",
      "name": "ሳንጎ"
    },
    {
      "code": "sa",
      "name": "ሳንስክሪት"
    },
    {
      "code": "sc",
      "name": "ሳርዲኒያን"
    },
    {
      "code": "sr",
      "name": "ሰርቢያኛ"
    },
    {
      "code": "sn",
      "name": "ሾና"
    },
    {
      "code": "ii",
      "name": "ሲቹዋን ዪ"
    },
    {
      "code": "sd",
      "name": "ሲንዲ"
    },
    {
      "code": "si",
      "name": "ሲንሃላ"
    },
    {
      "code": "sk",
      "name": "ስሎቫክ"
    },
    {
      "code": "sl",
      "name": "ስሎቪኛ"
    },
    {
      "code": "so",
      "name": "ሶማሊ"
    },
    {
      "code": "st",
      "name": "ደቡባዊ ሶቶ"
    },
    {
      "code": "es",
      "name": "ስፓኒሽ"
    },
    {
      "code": "su",
      "name": "ሱዳኒዝ"
    },
    {
      "code": "sw",
      "name": "ስዋሂሊ"
    },
    {
      "code": "ss",
      "name": "ስዋቲ"
    },
    {
      "code": "sv",
      "name": "ስዊድንኛ"
    },
    {
      "code": "tl",
      "name": "ታጋሎግ (ፊሊፒኖ)"
    },
    {
      "code": "ty",
      "name": "ታሂቲያን"
    },
    {
      "code": "tg",
      "name": "ታጂክ"
    },
    {
      "code": "ta",
      "name": "ታሚል"
    },
    {
      "code": "tt",
      "name": "ታታር"
    },
    {
      "code": "te",
      "name": "ቴሉጉ"
    },
    {
      "code": "th",
      "name": "ታይ"
    },
    {
      "code": "bo",
      "name": "ቲቤታን"
    },
    {
      "code": "ti",
      "name": "ትግርኛ"
    },
    {
      "code": "to",
      "name": "ቶንጋ"
    },
    {
      "code": "ts",
      "name": "ሶንጋ"
    },
    {
      "code": "tn",
      "name": "ጽዋና"
    },
    {
      "code": "tr",
      "name": "ቱርክኛ"
    },
    {
      "code": "tk",
      "name": "ቱርክመን"
    },
    {
      "code": "tw",
      "name": "ትዊ"
    },
    {
      "code": "ug",
      "name": "ኡይጉር"
    },
    {
      "code": "uk",
      "name": "ዩክሬንኛ"
    },
    {
      "code": "ur",
      "name": "ኡርዱ"
    },
    {
      "code": "uz",
      "name": "ኡዝቤክ"
    },
    {
      "code": "ve",
      "name": "ቬንዳ"
    },
    {
      "code": "vi",
      "name": "ቪትናምኛ"
    },
    {
      "code": "vo",
      "name": "ቮላፑክ"
    },
    {
      "code": "wa",
      "name": "ዋሎን"
    },
    {
      "code": "cy",
      "name": "ዌልሽ"
    },
    {
      "code": "wo",
      "name": "ዎሎፍ"
    },
    {
      "code": "xh",
      "name": "ዞሳ"
    },
    {
      "code": "yi",
      "name": "ዪዲሽ"
    },
    {
      "code": "yo",
      "name": "ዮሩባ"
    },
    {
      "code": "za",
      "name": "ዡዋንግ"
    },
    {
      "code": "zu",
      "name": "ዙሉ"
    }
  ],
  "countries": [
    {
      "code": "AF",
      "name": "አፍጋኒስታን"
    },
    {
      "code": "AL",
      "name": "አልባኒያ"
    },
    {
      "code": "DZ",
      "name": "አልጄሪያ"
    },
    {
      "code": "AS",
      "name": "የአሜሪካ ሳሞአ"
    },
    {
      "code": "AD",
      "name": "አንዶራ"
    },
    {
      "code": "AO",
      "name": "አንጎላ"
    },
    {
      "code": "AI",
      "name": "አንጉዪላ"
    },
    {
      "code": "AQ",
      "name": "አንታርክቲካ"
    },
    {
      "code": "AG",
      "name": "አንቲጓ እና ባርቡዳ"
    },
    {
      "code": "AR",
      "name": "አርጀንቲና"
    },
    {
      "code": "AM",
      "name": "አርሜኒያ"
    },
    {
      "code": "AW",
      "name": "አሩባ"
    },
    {
      "code": "AU",
      "name": "አውስትራሊያ"
    },
    {
      "code": "AT",
      "name": "ኦስትሪያ"
    },
    {
      "code": "AZ",
      "name": "አዘርባጃን"
    },
    {
      "code": "BS",
      "name": "ባሃማስ"
    },
    {
      "code": "BH",
      "name": "ባህሬን"
    },
    {
      "code": "BD",
      "name": "ባንግላዴሽ"
    },
    {
      "code": "BB",
      "name": "ባርባዶስ"
    },
    {
      "code": "BY",
      "name": "ቤላሩስ"
    },
    {
      "code": "BE",
      "name": "ቤልጂየም"
    },
    {
      "code": "BZ",
      "name": "ቤሊዝ"
    },
    {
      "code": "BJ",
      "name": "ቤኒን"
    },
    {
      "code": "BM",
      "name": "ቤርሙዳ"
    },
    {
      "code": "BT",
      "name": "ቡታን"
    },
    {
      "code": "BO",
      "name": "ቦሊቪያ"
    },
    {
      "code": "BA",
      "name": "ቦስኒያ እና ሄርዞጎቪኒያ"
    },
    {
      "code": "BW",
      "name": "ቦትስዋና"
    },
    {
      "code": "BR",
      "name": "ብራዚል"
    },
    {
      "code": "IO",
      "name": "የብሪቲሽ ህንድ ውቅያኖስ ግዛት"
    },
    {
      "code": "VG",
      "name": "የብሪቲሽ ቨርጂን ደሴቶች"
    },
    {
      "code": "BN",
      "name": "ብሩኒ"
    },
    {
      "code": "BG",
      "name": "ቡልጋሪያ"
    },
    {
      "code": "BF",
      "name": "ቡርኪና ፋሶ"
    },
    {
      "code": "BI",
      "name": "ቡሩንዲ"
    },
    {
      "code": "KH",
      "name": "ካምቦዲያ"
    },
    {
      "code": "CM",
      "name": "ካሜሩን"
    },
    {
      "code": "CA",
      "name": "ካናዳ"
    },
    {
      "code": "CV",
      "name": "ኬፕ ቨርዴ"
    },
    {
      "code": "KY",
      "name": "የኬይማን ደሴቶች"
    },
    {
      "code": "CF",
      "name": "የመካከለኛው አፍሪካ ሪፐብሊክ"
    },
    {
      "code": "TD",
      "name": "ቻድ"
    },
    {
      "code": "CL",
      "name": "ቺሊ"
    },
    {
      "code": "CN",
      "name": "ቻይና"
    },
    {
      "code": "CX",
      "name": "የገና ደሴት"
    },
    {
      "code": "CC",
      "name": "ኮኮስ (ኬሊንግ) ደሴቶች"
    },
    {
      "code": "CO",
      "name": "ኮሎምቢያ"
    },
    {
      "code": "KM",
      "name": "ኮሞሮስ"
    },
    {
      "code": "CG",
      "name": "ኮንጎ - ብራዛቪል"
    },
    {
      "code": "CD",
      "name": "ኮንጎ - ኪንሻሳ"
    },
    {
      "code": "CK",
      "name": "የኩክ ደሴቶች"
    },
    {
      "code": "CR",
      "name": "ኮስታ ሪካ"
    },
    {
      "code": "CI",
      "name": "ኮት ዲቯር"
    },
    {
      "code": "HR",
      "name": "ክሮኤሺያ"
    },
    {
      "code": "CU",
      "name": "ኩባ"
    },
    {
      "code": "CY",
      "name": "ቆጵሮስ"
    },
    {
      "code": "CZ",
      "name": "ቼኪያ"
    },
    {
      "code": "DK",
      "name": "ዴንማርክ"
    },
    {
      "code": "DJ",
      "name": "ጅቡቲ"
    },
    {
      "code": "DM",
      "name": "ዶሚኒካ"
    },
    {
      "code": "DO",
      "name": "የዶሚኒካን ሪፐብሊክ"
    },
    {
      "code": "EC",
      "name": "ኢኳዶር"
    },
    {
      "code": "EG",
      "name": "ግብፅ"
    },
    {
      "code": "SV",
      "name": "ኤል ሳልቫዶር"
    },
    {
      "code": "GQ",
      "name": "ኢኳቶሪያል ጊኒ"
    },
    {
      "code": "ER",
      "name": "ኤርትራ"
    },
    {
      "code": "EE",
      "name": "ኢስቶኒያ"
    },
    {
      "code": "SZ",
      "name": "ኤስዋቲኒ"
    },
    {
      "code": "ET",
      "name": "ኢትዮጵያ"
    },
    {
      "code": "FJ",
      "name": "ፊጂ"
    },
    {
      "code": "FI",
      "name": "ፊንላንድ"
    },
    {
      "code": "FR",
      "name": "ፈረንሳይ"
    },
    {
      "code": "GA",
      "name": "ጋቦን"
    },
    {
      "code": "GM",
      "name": "ጋምቢያ"
    },
    {
      "code": "GE",
      "name": "ጆርጂያ"
    },
    {
      "code": "DE",
      "name": "ጀርመን"
    },
    {
      "code": "GH",
      "name": "ጋና"
    },
    {
      "code": "GR",
      "name": "ግሪክ"
    },
    {
      "code": "GT",
      "name": "ጓቲማላ"
    },
    {
      "code": "GN",
      "name": "ጊኒ"
    },
    {
      "code": "GY",
      "name": "ጉያና"
    },
    {
      "code": "HT",
      "name": "ሃይቲ"
    },
    {
      "code": "HN",
      "name": "ሆንዱራስ"
    },
    {
      "code": "HK",
      "name": "ሆንግ ኮንግ"
    },
    {
      "code": "HU",
      "name": "ሃንጋሪ"
    },
    {
      "code": "IS",
      "name": "አይስላንድ"
    },
    {
      "code": "IN",
      "name": "ህንድ"
    },
    {
      "code": "ID",
      "name": "ኢንዶኔዥያ"
    },
    {
      "code": "IR",
      "name": "ኢራን"
    },
    {
      "code": "IQ",
      "name": "ኢራቅ"
    },
    {
      "code": "IE",
      "name": "አየርላንድ"
    },
    {
      "code": "IL",
      "name": "እስራኤል"
    },
    {
      "code": "IT",
      "name": "ጣሊያን"
    },
    {
      "code": "JM",
      "name": "ጃማይካ"
    },
    {
      "code": "JP",
      "name": "ጃፓን"
    },
    {
      "code": "JO",
      "name": "ዮርዳኖስ"
    },
    {
      "code": "KZ",
      "name": "ካዛክስታን"
    },
    {
      "code": "KE",
      "name": "ኬንያ"
    },
    {
      "code": "KR",
      "name": "ደቡብ ኮሪያ"
    },
    {
      "code": "KW",
      "name": "ኩዌት"
    },
    {
      "code": "KG",
      "name": "ኪርጊስታን"
    },
    {
      "code": "LA",
      "name": "ላኦስ"
    },
    {
      "code": "LV",
      "name": "ላትቪያ"
    },
    {
      "code": "LB",
      "name": "ሊባኖስ"
    },
    {
      "code": "LS",
      "name": "ሌሶቶ"
    },
    {
      "code": "LR",
      "name": "ላይቤሪያ"
    },
    {
      "code": "LY",
      "name": "ሊቢያ"
    },
    {
      "code": "LI",
      "name": "ሊችተንስታይን"
    },
    {
      "code": "LT",
      "name": "ሊቱዌኒያ"
    },
    {
      "code": "LU",
      "name": "ሉክሰምበርግ"
    },
    {
      "code": "MG",
      "name": "ማዳጋስካር"
    },
    {
      "code": "MW",
      "name": "ማላዊ"
    },
    {
      "code": "MY",
      "name": "ማሌዥያ"
    },
    {
      "code": "MV",
      "name": "ማልዲቭስ"
    },
    {
      "code": "ML",
      "name": "ማሊ"
    },
    {
      "code": "MT",
      "name": "ማልታ"
    },
    {
      "code": "MX",
      "name": "ሜክሲኮ"
    },
    {
      "code": "MD",
      "name": "ሞልዶቫ"
    },
    {
      "code": "MC",
      "name": "ሞናኮ"
    },
    {
      "code": "MN",
      "name": "ሞንጎሊያ"
    },
    {
      "code": "ME",
      "name": "ሞንቴኔግሮ"
    },
    {
      "code": "MA",
      "name": "ሞሮኮ"
    },
    {
      "code": "MZ",
      "name": "ሞዛምቢክ"
    },
    {
      "code": "MM",
      "name": "ምያንማር"
    },
    {
      "code": "NA",
      "name": "ናሚቢያ"
    },
    {
      "code": "NP",
      "name": "ኔፓል"
    },
    {
      "code": "NL",
      "name": "ኔዘርላንድስ"
    },
    {
      "code": "NZ",
      "name": "ኒውዚላንድ"
    },
    {
      "code": "NI",
      "name": "ኒካራጓ"
    },
    {
      "code": "NE",
      "name": "ኒጀር"
    },
    {
      "code": "NG",
      "name": "ናይጄሪያ"
    },
    {
      "code": "MK",
      "name": "ሰሜን መቄዶንያ"
    },
    {
      "code": "NO",
      "name": "ኖርዌይ"
    },
    {
      "code": "OM",
      "name": "ኦማን"
    },
    {
      "code": "PK",
      "name": "ፓኪስታን"
    },
    {
      "code": "PA",
      "name": "ፓናማ"
    },
    {
      "code": "PG",
      "name": "ፓፑዋ ኒው ጊኒ"
    },
    {
      "code": "PY",
      "name": "ፓራጓይ"
    },
    {
      "code": "PE",
      "name": "ፔሩ"
    },
    {
      "code": "PH",
      "name": "ፊሊፒንስ"
    },
    {
      "code": "PL",
      "name": "ፖላንድ"
    },
    {
      "code": "PT",
      "name": "ፖርቱጋል"
    },
    {
      "code": "QA",
      "name": "ኳታር"
    },
    {
      "code": "RO",
      "name": "ሮማኒያ"
    },
    {
      "code": "RU",
      "name": "ራሽያ"
    },
    {
      "code": "RW",
      "name": "ሩዋንዳ"
    },
    {
      "code": "SA",
      "name": "ሳውዲ አረቢያ"
    },
    {
      "code": "SN",
      "name": "ሴኔጋል"
    },
    {
      "code": "RS",
      "name": "ሰርቢያ"
    },
    {
      "code": "SG",
      "name": "ሲንጋፖር"
    },
    {
      "code": "SK",
      "name": "ስሎቫኪያ"
    },
    {
      "code": "SI",
      "name": "ስሎቬኒያ"
    },
    {
      "code": "ZA",
      "name": "ደቡብ አፍሪካ"
    },
    {
      "code": "ES",
      "name": "ስፔን"
    },
    {
      "code": "LK",
      "name": "ሲሪላንካ"
    },
    {
      "code": "SE",
      "name": "ስዊድን"
    },
    {
      "code": "CH",
      "name": "ስዊዘርላንድ"
    },
    {
      "code": "TW",
      "name": "ታይዋን"
    },
    {
      "code": "TH",
      "name": "ታይላንድ"
    },
    {
      "code": "TR",
      "name": "ቱርክ"
    },
    {
      "code": "UG",
      "name": "ኡጋንዳ"
    },
    {
      "code": "UA",
      "name": "ዩክሬን"
    },
    {
      "code": "AE",
      "name": "የተባበሩት አረብ ኤምሬትስ"
    },
    {
      "code": "GB",
      "name": "የተባበሩት የንጉሥ ግዛት"
    },
    {
      "code": "US",
      "name": "የተባበሩት መንግስታት"
    },
    {
      "code": "UY",
      "name": "ኡራጓይ"
    },
    {
      "code": "UZ",
      "name": "ኡዝቤኪስታን"
    },
    {
      "code": "VE",
      "name": "ቬንዙዌላ"
    },
    {
      "code": "VN",
      "name": "ቪትናም"
    },
    {
      "code": "YE",
      "name": "የመን"
    },
    {
      "code": "ZM",
      "name": "ዛምቢያ"
    },
    {
      "code": "ZW",
      "name": "ዝምባቡዌ"
    }
  ]
};
