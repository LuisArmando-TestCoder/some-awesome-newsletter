// ta strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale ta
export default {
  "billing": {
    "header": {
      "title": "கட்டண விவரங்கள்",
      "subtitle": "இந்த விவரங்களை உங்கள் invoice-இல் சேர்ப்போம். அடுத்து கட்டணப் பக்கம் உங்கள் கார்டு விவரங்களைக் கேட்கும்."
    },
    "fields": {
      "firstName": {
        "label": "முதல் பெயர்",
        "placeholder": "அருண்"
      },
      "lastName": {
        "label": "கடைசிப் பெயர்",
        "placeholder": "குமார்"
      },
      "email": {
        "label": "Invoice-களுக்கான மின்னஞ்சல்",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "தொலைபேசி எண்",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "நாட்டுக் குறியீடு",
        "placeholder": "IN"
      },
      "address": {
        "label": "கட்டண முகவரி",
        "placeholder": "123 Main Street"
      },
      "city": {
        "label": "நகரம்",
        "placeholder": "சென்னை"
      },
      "state": {
        "label": "மாநிலம் அல்லது மாகாணம்",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "அஞ்சல் குறியீடு அல்லது ZIP",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "இரண்டு எழுத்துகள், உதாரணமாக US, MX அல்லது CR.",
      "state": "விருப்பத்தேர்வு. உங்கள் நாட்டில் இது பயன்படுத்தப்படவில்லை என்றால் காலியாக விடுங்கள்.",
      "zip": "விருப்பத்தேர்வு. உங்கள் முகவரிக்கு அஞ்சல் குறியீடு இல்லை என்றால் காலியாக விடுங்கள்."
    },
    "errors": {
      "required": "தொடர இந்தப் புலத்தை நிரப்பவும்.",
      "email": "name@example.com போன்ற ஒரு மின்னஞ்சல் முகவரியை உள்ளிடவும்.",
      "country": "இரண்டு எழுத்து நாட்டுக் குறியீட்டை உள்ளிடவும், உதாரணமாக US."
    },
    "optional": "விருப்பத்தேர்வு"
  }
};
