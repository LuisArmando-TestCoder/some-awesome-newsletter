// am strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale am
export default {
  "welcome": {
    "title": "ወደ ጋዜጣው እንኳን ደህና መጡ",
    "invitedBy": "{configuratorId} እንዲመዘገቡ ጋብዞዎታል።"
  },
  "email": {
    "title": "እያንዳንዱን እትም ወዴት እንላክ?",
    "placeholder": "ኢሜይልዎ"
  },
  "name": {
    "title": "ስምዎ ማን ነው?",
    "placeholder": "ስምዎ"
  },
  "language": {
    "title": "በየትኛው ቋንቋ ማንበብ ይፈልጋሉ?"
  },
  "subscribed": {
    "title": "ተመዝግበዋል",
    "subtitle": "የማረጋገጫ ኢሜል ለማግኘት የገቢ መልዕክት ሳጥንዎን ይፈትሹ።",
    "continueTo": "ወደ ... ይቀጥሉ",
    "finishingUp": "ይህን ገጽ መዝጋት ይችላሉ።"
  },
  "form": {
    "heading": "ለ{title} ይመዝገቡ",
    "headingFallback": "ለዚህ ጋዜጣ ይመዝገቡ",
    "intro": "አዳዲስ እትሞች በመረጡት ቋንቋ ተጽፈው በኢሜል ይደርሳሉ።",
    "from": "ከ{sender}",
    "emailLabel": "የኢሜል አድራሻ",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "የመጀመሪያ ስም",
    "optional": "አማራጭ",
    "nameHint": "ሰላምታ ልንሰጥዎ እንጠቀምበታለን። ባዶ ከተዉት የኢሜል አድራሻዎን መጀመሪያ ክፍል እንጠቀማለን።",
    "languageLabel": "የእትሞችዎ ቋንቋ",
    "languageSummary": "እትሞች በ{language}።",
    "languageChange": "ቀይር",
    "languageHint": "ይህን ከአሳሽዎ ቅንብሮች መርጠናል።",
    "submit": "ይመዝገቡ",
    "submitting": "በመመዝገብ ላይ...",
    "consent": "በመመዝገብ ከ{sender} ኢሜሎችን ለመቀበል ይስማማሉ። እያንዳንዱ ኢሜል የምዝገባ ማቋረጫ ሊንክ አለው።",
    "privacy": "የግላዊነት መመሪያ",
    "loadingInfo": "የጋዜጣው ዝርዝሮች እየተጫኑ ነው"
  },
  "success": {
    "title": "የገቢ መልዕክት ሳጥንዎን ይፈትሹ",
    "body": "ወደ {email} የማረጋገጫ ኢሜል ልከናል። ይክፈቱት እና ምዝገባውን አረጋግጥ የሚለውን ይምረጡ።",
    "next": "ካረጋገጡ በኋላ የመጀመሪያ እትምዎ በ{language} ተጽፎ ይደርሳል።",
    "spam": "በጥቂት ደቂቃዎች ውስጥ ምንም ካልደረሰ፣ በአይፈለጌ መልዕክት ወይም በማስታወቂያዎች አቃፊ ውስጥ ይመልከቱ።",
    "changeEmail": "ሌላ ኢሜል ይጠቀሙ",
    "continueTo": "ወደ {host} ይቀጥሉ"
  },
  "errors": {
    "emailRequired": "የኢሜል አድራሻዎን ያስገቡ።",
    "emailInvalid": "ይህ የኢሜል አድራሻ ያልተሟላ ይመስላል። ፈትሸው እንደገና ይሞክሩ።",
    "missingLink": "ይህ የምዝገባ ሊንክ መረጃ ይጎድለዋል። ላኪውን አዲስ ሊንክ ይጠይቁ።",
    "notFound": "ይህ የምዝገባ ሊንክ ከአሁን በኋላ አይሰራም። ላኪውን አዲስ ሊንክ ይጠይቁ።",
    "limit": "ይህ ጋዜጣ በአሁኑ ጊዜ አዳዲስ ተመዝጋቢዎችን መቀበል አይችልም። በኋላ እንደገና ይሞክሩ።",
    "invalid": "ይህን አድራሻ መቀበል አልቻልንም። ፈትሸው እንደገና ይሞክሩ።",
    "server": "ምዝገባዎን ማስቀመጥ አልቻልንም። ከትንሽ ጊዜ በኋላ እንደገና ይሞክሩ።",
    "network": "ከአገልጋዩ ጋር መገናኘት አልቻልንም። ግንኙነትዎን ፈትሸው እንደገና ይሞክሩ።"
  },
  "confirm": {
    "title": "ምዝገባዎን ያረጋግጡ",
    "body": "እትሞችን በ{email} መቀበል ለመጀመር ቁልፉን ይምረጡ።",
    "button": "ምዝገባውን አረጋግጥ",
    "confirming": "በማረጋገጥ ላይ...",
    "consent": "በማረጋገጥ ይህን ጋዜጣ በኢሜል ለመቀበል ይስማማሉ። ከማንኛውም እትም ምዝገባዎን ማቋረጥ ይችላሉ።",
    "successTitle": "ተመዝግበዋል",
    "successBody": "አዳዲስ እትሞች ወደ {email} ይደርሳሉ።",
    "successTip": "ወደ አይፈለጌ መልዕክት እንዳይገቡ ላኪውን ወደ እውቂያዎችዎ ያክሉ።",
    "invalidTitle": "ይህ ሊንክ ያልተሟላ ነው",
    "invalidBody": "የማረጋገጫ ኢሜሉን እንደገና ከፍተው ቁልፉን ይምረጡ። ካላገኙት ከላኪው ገጽ እንደገና ይመዝገቡ።",
    "notFoundBody": "ለዚህ አድራሻ ምዝገባ ማግኘት አልቻልንም። ከላኪው ገጽ እንደገና ይመዝገቡ።",
    "errorBody": "ምዝገባዎን ማረጋገጥ አልቻልንም። ከትንሽ ጊዜ በኋላ እንደገና ይሞክሩ።",
    "retry": "እንደገና ይሞክሩ",
    "home": "ወደ መነሻ ገጹ ይሂዱ"
  },
  "embed": {
    "title": "ወደ ድረ ገጽዎ የምዝገባ ቅጽ ያክሉ",
    "intro": "ከእነዚህ ቁርጥራጮች አንዱን ወደ ድረ ገጽዎ ይለጥፉ። የሚመዘገቡ ሰዎች የማረጋገጫ ኢሜል፣ ከዚያም እትሞችዎን በራሳቸው ቋንቋ ያገኛሉ።",
    "linkLabel": "የምዝገባ ገጽ ሊንክ",
    "linkHint": "በማኅበራዊ ሚዲያ መግለጫ፣ በኢሜል ፊርማ ወይም በQR ኮድ ያጋሩት።",
    "scriptLabel": "Script ታግ (የሚመከር)",
    "scriptHint": "ቅጹ መታየት ባለበት ቦታ ይለጥፉት። ቅጹ ራሱን ለመግጠም መጠኑን ያስተካክላል።",
    "iframeLabel": "Iframe",
    "iframeHint": "ድረ ገጽዎ ስክሪፕቶችን የማይፈቅድ ከሆነ ይህን ይጠቀሙ።",
    "copy": "ቅዳ",
    "copied": "ተቀድቷል",
    "copyFailed": "ጽሑፉን መርጠው በእጅ ይቅዱት።",
    "options": "የቅጽ አማራጮች",
    "accent": "የቁልፍ ቀለም",
    "accentHint": "የምርት ስምዎን ቀለም ለመጠቀም እንዳለ ይተዉት።",
    "theme": "ገጽታ",
    "themeAuto": "ከጎብኚው ቅንብር ጋር አዛምድ",
    "themeLight": "ብሩህ",
    "themeDark": "ጨለማ",
    "layout": "አቀማመጥ",
    "layoutFull": "ሙሉ (ርዕስ፣ ስም እና ቋንቋ)",
    "layoutCompact": "የታመቀ (ኢሜል እና ቁልፍ)",
    "preview": "ቅድመ እይታ",
    "previewNote": "ቅድመ እይታው ቀጥታ ነው። እዚህ የሚደረግ ምዝገባ እውነተኛ ተመዝጋቢ ይፈጥራል።",
    "missing": "መጀመሪያ ጋዜጣ ይፍጠሩ። ጋዜጣው ሲኖር የምዝገባ ቅጹ እዚህ ይታያል።"
  },
  "page": {
    "poweredBy": "በAIBAN ይሰራል",
    "title": "ይመዝገቡ"
  },
  "signature": {
    "title": "የኢሜል ፊርማ",
    "intro": "አንባቢዎች ይህን በእያንዳንዱ እትም መጨረሻ ላይ ያዩታል። ለማስተካከል የቅድመ እይታውን ማንኛውንም ክፍል ይጫኑ።",
    "show": "ፊርማዬን በእያንዳንዱ እትም አሳይ",
    "showHint": "ካጠፉት እትሞች ከጽሑፉ በኋላ ይጠናቀቃሉ።",
    "preview": "ቅድመ እይታ",
    "previewEmpty": "ፊርማዎ ባዶ ነው። ለመጀመር ስምዎን ያክሉ።",
    "articleEnd": "የጽሑፉ መጨረሻ",
    "tabContent": "ይዘት",
    "tabStyle": "ቅጥ",
    "blocks": "ምን እንደሚካተት",
    "blocksHint": "ያንን ክፍል ለማሳየት ወይም ለመደበቅ መለያ ይምረጡ። የተደበቁ ክፍሎች ጽሑፋቸውን ይይዛሉ።",
    "layout": "አቀማመጥ",
    "layouts": {
      "bar": "የቀለም አሞሌ",
      "photo": "ፎቶ",
      "stacked": "የተደራረበ",
      "centered": "መሀል ላይ",
      "minimal": "ጽሑፍ ብቻ"
    },
    "fields": {
      "name": "ስም",
      "role": "የስራ መደብ",
      "company": "ድርጅት",
      "phone": "ስልክ",
      "email": "ኢሜል",
      "website": "ድረ ገጽ",
      "address": "አድራሻ",
      "photoUrl": "ፎቶ",
      "logoUrl": "አርማ",
      "socials": "የማኅበራዊ ሚዲያ ሊንኮች",
      "cta": "ቁልፍ",
      "disclaimer": "ሕጋዊ ማስታወሻ"
    },
    "groups": {
      "about": "ስለ እርስዎ",
      "contact": "አድራሻ",
      "images": "ምስሎች",
      "socials": "የማኅበራዊ ሚዲያ ሊንኮች",
      "cta": "ቁልፍ",
      "disclaimer": "ሕጋዊ ማስታወሻ"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "መስራች",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Main Street, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "ጥሪ ያስይዙ",
      "ctaUrl": "https://"
    },
    "ctaText": "የቁልፍ ጽሑፍ",
    "ctaLink": "የቁልፍ ሊንክ",
    "hints": {
      "photoUrl": "ቢያንስ 144 በ144 ፒክሰል እና ከ200 KB በታች ወደሆነ ካሬ PNG ወይም JPG የሚወስድ ሊንክ። ከስምዎ ጎን በ72 በ72 ፒክሰል ይታያል።",
      "logoUrl": "ግልጽ ወይም ነጭ ዳራ ያለው፣ ቢያንስ 64 ፒክሰል ቁመት ወዳለው PNG ወይም JPG የሚወስድ ሊንክ። በ32 ፒክሰል ቁመት ይታያል።",
      "website": "ካልጻፉት https:// እንጨምራለን።",
      "cta": "ቁልፉ እንዲታይ ጽሑፉም ሊንኩም ያስፈልጋሉ።",
      "disclaimer": "ከታች የሚገባ ትንሽ ጽሑፍ፣ ለምሳሌ የምስጢራዊነት ማስታወሻ። የማያስፈልግዎ ከሆነ ባዶ ይተዉት።"
    },
    "style": {
      "accent": "የማድመቂያ ቀለም",
      "accentHint": "ለአሞሌው፣ ለሊንኮች እና ለቁልፉ ይውላል። በምርት ስምዎ ቀለም ይጀምራል።",
      "font": "ፊደል",
      "fontSans": "Sans serif",
      "fontSerif": "Serif",
      "size": "የጽሑፍ መጠን",
      "sizeMd": "መደበኛ",
      "sizeSm": "ትንሽ",
      "shape": "የፎቶ ቅርጽ",
      "shapeRound": "ክብ",
      "shapeSquare": "ካሬ"
    },
    "hidden": "ተደብቋል",
    "reset": "እንደገና ጀምር",
    "resetConfirm": "ሁሉንም መስኮች ለማጽዳት እንደገና ይምረጡ"
  }
};
