// bn strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale bn
export default {
  "billing": {
    "header": {
      "title": "বিলিংয়ের তথ্য",
      "subtitle": "এই তথ্যগুলো আমরা আপনার ইনভয়েসে দিই। এরপর পেমেন্ট পেজে আপনার কার্ডের তথ্য চাওয়া হবে।"
    },
    "fields": {
      "firstName": {
        "label": "নামের প্রথম অংশ",
        "placeholder": "রাহুল"
      },
      "lastName": {
        "label": "পদবি",
        "placeholder": "চক্রবর্তী"
      },
      "email": {
        "label": "ইনভয়েসের জন্য ইমেল",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "ফোন নম্বর",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "দেশের কোড",
        "placeholder": "BD"
      },
      "address": {
        "label": "বিলিংয়ের ঠিকানা",
        "placeholder": "123 Main Street"
      },
      "city": {
        "label": "শহর",
        "placeholder": "ঢাকা"
      },
      "state": {
        "label": "রাজ্য বা প্রদেশ",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "পোস্টাল বা ZIP কোড",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "দুটি অক্ষর, যেমন US, MX বা CR।",
      "state": "ঐচ্ছিক। আপনার দেশে এটি ব্যবহার না হলে খালি রাখুন।",
      "zip": "ঐচ্ছিক। আপনার ঠিকানায় পোস্টাল কোড না থাকলে খালি রাখুন।"
    },
    "errors": {
      "required": "চালিয়ে যেতে এই ঘরটি পূরণ করুন।",
      "email": "name@example.com-এর মতো একটি ইমেল ঠিকানা দিন।",
      "country": "দুই অক্ষরের দেশের কোড দিন, যেমন US।"
    },
    "optional": "ঐচ্ছিক"
  }
};
