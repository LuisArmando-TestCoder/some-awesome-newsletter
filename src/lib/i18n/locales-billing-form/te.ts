// te strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale te
export default {
  "billing": {
    "header": {
      "title": "బిల్లింగ్ వివరాలు",
      "subtitle": "ఈ వివరాలను మీ ఇన్‌వాయిస్‌లో పెడతాం. తర్వాత పేమెంట్ పేజీ మీ కార్డ్ వివరాలు అడుగుతుంది."
    },
    "fields": {
      "firstName": {
        "label": "మొదటి పేరు",
        "placeholder": "రాహుల్"
      },
      "lastName": {
        "label": "ఇంటి పేరు",
        "placeholder": "రెడ్డి"
      },
      "email": {
        "label": "ఇన్‌వాయిస్‌ల కోసం ఈమెయిల్",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "ఫోన్ నంబర్",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "దేశ కోడ్",
        "placeholder": "IN"
      },
      "address": {
        "label": "బిల్లింగ్ చిరునామా",
        "placeholder": "123 Main Street"
      },
      "city": {
        "label": "నగరం",
        "placeholder": "హైదరాబాదు"
      },
      "state": {
        "label": "రాష్ట్రం లేదా ప్రావిన్స్",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "పోస్టల్ లేదా ZIP కోడ్",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "రెండు అక్షరాలు, ఉదాహరణకు US, MX లేదా CR.",
      "state": "ఐచ్ఛికం. మీ దేశంలో ఇది వాడకపోతే ఖాళీగా వదిలేయండి.",
      "zip": "ఐచ్ఛికం. మీ చిరునామాకు పోస్టల్ కోడ్ లేకపోతే ఖాళీగా వదిలేయండి."
    },
    "errors": {
      "required": "కొనసాగించడానికి ఈ ఫీల్డ్‌ను నింపండి.",
      "email": "name@example.com వంటి ఈమెయిల్ చిరునామాను నమోదు చేయండి.",
      "country": "రెండు అక్షరాల దేశ కోడ్‌ను నమోదు చేయండి, ఉదాహరణకు US."
    },
    "optional": "ఐచ్ఛికం"
  }
};
