import { writable } from 'svelte/store';

export const faqs = writable([
    { q: 'Is there a free trial?', a: 'Yes! All new users get a 14-day free trial of our Pro plan, no credit card required.' },
    { q: 'What happens after my trial ends?', a: 'You can choose to upgrade to a paid plan or be automatically downgraded to our Free plan, which has limited features.' },
    { q: 'Can I integrate with custom tools?', a: 'Absolutely. Our platform includes a powerful API and webhook system to connect with any in-house or proprietary software.' },
    { q: 'Is my data secure?', a: 'Security is our top priority. We are SOC 2 Type II certified and all data is encrypted in transit and at rest.' },
    { q: 'Do you offer support?', a: 'Yes, we offer 24/7 email support on all plans, with dedicated phone and Slack support available on our Enterprise plan.' },
    { q: 'Can I cancel at any time?', a: 'Yes, you can cancel your subscription at any time from your account dashboard. Your plan will remain active until the end of the current billing cycle.' }
]);
