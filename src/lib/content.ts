import { writable } from 'svelte/store';

export const content = writable({
    title: 'Silo Automation: Reclaim Your Time',
    metaDescription:
        'Automate repetitive tasks, integrate your tools, and unlock peak efficiency. Start for free and see results in minutes.',
    ogImageUrl: 'https://example.com/og-image.png',
    canonicalUrl: 'https://example.com/',
    organization: {
        name: 'Silo Automation, Inc.',
        logo: 'https://example.com/logo.png',
        url: 'https://example.com/'
    },
    product: {
        name: 'Silo Automator',
        description: 'The ultimate platform for streamlining your digital workflows.'
    },
    announcement: {
        text: 'New Integration: Connect with XYZ Platform in one click!',
        cta: 'Learn More'
    },
    hero: {
        hook: 'Stop Wasting Time on Repetitive Tasks.',
        subHook: 'Our platform automates your newsletters so you can focus on what truly matters.',
        primaryCta: 'Get Started for Free',
        secondaryCta: 'Watch a Demo',
        trustCues: ['No credit card required', '14-day free trial', 'Cancel anytime']
    },
    socialProof: {
        logos: [
            { name: 'InnovateCorp', src: '/logos/logo_1.png' },
            { name: 'QuantumLeap', src: '/logos/logo_2.png' },
            { name: 'Synergy Inc.', src: '/logos/logo_3.png' },
            { name: 'Apex Solutions', src: '/logos/logo_4.png' },
            { name: 'Momentum Co.', src: '/logos/logo_5.png' }
        ],
        counts: 'Trusted by 10,000+ teams worldwide'
    },
    valueProps: [
        { title: 'Integrate Everything', description: 'Connect all your tools in a single, unified hub.' },
        { title: 'Automate Workflows', description: 'Build powerful automations with a simple drag-and-drop interface.' },
        { title: 'Scale with Confidence', description: 'Our enterprise-grade platform grows with your business needs.' }
    ],
    features: [
        {
            title: 'Visual Workflow Builder',
            description: 'Design complex automations without writing a single line of code.',
            image: '/screenshots/feature-builder.png'
        },
        {
            title: 'One-Click Integrations',
            description: 'Connect to hundreds of popular apps from our extensive library.',
            image: '/screenshots/feature-integrations.png'
        },
        {
            title: 'Advanced Analytics',
            description: 'Get deep insights into your operational efficiency and identify bottlenecks.',
            image: '/screenshots/feature-analytics.png'
        }
    ],
    howItWorks: [
        {
            step: 1,
            title: 'Connect Your Apps',
            description: 'Authorize your favorite tools with our secure, one-click process.'
        },
        {
            step: 2,
            title: 'Build Your Silo',
            description: 'Visually map out your process using our intuitive drag-and-drop editor.'
        },
        {
            step: 3,
            title: 'Activate & Monitor',
            description: 'Go live and watch your automated workflows deliver results in real-time.'
        }
    ],
    personas: [
        {
            persona: 'For Marketing Teams',
            problem: 'Struggling to sync lead data between your CRM and email platform?',
            outcome: 'Automate lead nurturing and track campaign ROI from a single dashboard.'
        },
        {
            persona: 'For Operations',
            problem: 'Manual data entry and report generation slowing you down?',
            outcome: 'Eliminate errors and get real-time reports delivered to your inbox automatically.'
        },
        {
            persona: 'For Developers',
            problem: 'Spending too much time on internal tool scripts and API glue code?',
            outcome: 'Offload maintenance to us and trigger workflows via our robust developer API.'
        }
    ],
    metrics: [
        { value: '50%', label: 'Reduction in manual data entry', proof: 'According to a case study with Acme Corp.' },
        { value: '8h', label: 'Average time saved per employee per week', proof: 'Based on internal customer surveys.' },
        { value: '3x', label: 'Faster project delivery cycles', proof: 'Observed in teams after 30 days of use.' }
    ],
    integrations: {
        text: 'Works with the tools you already love.',
        logos: [
            { name: 'Tool A', src: '/logos/tool-a.svg' },
            { name: 'Tool B', src: '/logos/tool-b.svg' },
            { name: 'Tool C', src: '/logos/tool-c.svg' },
            { name: 'Tool D', src: '/logos/tool-d.svg' },
            { name: 'Tool E', src: '/logos/tool-e.svg' },
            { name: 'Tool F', src: '/logos/tool-f.svg' }
        ]
    },
    testimonials: [
        {
            quote: "This platform transformed our operations. We're saving hundreds of hours a month.",
            name: 'Jane Doe',
            title: 'COO, InnovateCorp'
        },
        {
            quote: 'The flexibility of the workflow builder is unmatched. If you can think it, you can automate it.',
            name: 'John Smith',
            title: 'Head of Marketing, QuantumLeap'
        },
        {
            quote: 'A game-changer for our dev team. We retired a mountain of legacy scripts in the first week.',
            name: 'Emily White',
            title: 'Lead Engineer, Synergy Inc.'
        }
    ],
    pricing: {
        teaser: 'Simple, transparent pricing',
        plan: 'Starts from $20/mo',
        cta: 'View All Plans'
    },
    finalCta: {
        hook: 'Ready to build your automated future?',
        cta: 'Start Automating Now'
    },
    footer: {
        copyright: `© ${new Date().getFullYear()} Silo Automation, Inc. All rights reserved.`,
        links: [
            { text: 'Privacy Policy', href: '/legal/privacy' },
            { text: 'Terms of Service', href: '/legal/terms' },
            { text: 'Cookie Policy', href: '/legal/cookies' }
        ],
        contact: 'support@silo-automation.com'
    }
});
