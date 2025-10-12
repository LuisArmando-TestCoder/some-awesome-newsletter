import { writable } from 'svelte/store';

export const content = writable({
    title: 'AI Newsletter Generator: Personalized Content, Delivered.',
    metaDescription:
        'Generate personalized newsletters with AI. Transform any news source into custom articles for your subscribers, in their language, and in your brand\'s voice.',
    ogImageUrl: 'https://images.pexels.com/photos/261599/pexels-photo-261599.jpeg',
    canonicalUrl: 'https://example.com/ai-newsletter-generator',
    organization: {
        name: 'AI Newsletter, Inc.',
        logo: 'https://example.com/logo.png',
        url: 'https://example.com/'
    },
    product: {
        name: 'AI Newsletter Generator',
        description: 'The ultimate platform for creating personalized, AI-driven newsletters.'
    },
    announcement: {
        text: 'Beta Launch: Sign up now and get 50% off for the first 3 months!',
        cta: 'Get Started'
    },
    hero: {
        hook: 'AI-Powered Newsletters, Effortlessly.',
        subHook: 'Transform any news source into personalized articles for your subscribers, in their language, and in your brand\'s voice.',
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
    valueProps: {
        title: 'The Future of Newsletters is Here',
        subTitle: 'Engage your audience like never before with AI-driven content that speaks directly to them.',
        props: [
            { title: 'Hyper-Personalization', description: 'Our AI analyzes your website to understand your audience and automatically tailors articles to their interests and language.' },
            { title: 'Automated Content Creation', description: 'Set your schedule, daily, weekly, or monthly, and let our AI select, write, and translate articles for you.' },
            { title: 'Your Brand, Your Voice', description: 'The AI learns your brand\'s personality from your website or custom input, ensuring every newsletter sounds like it was written by you.' }
        ]
    },
    features: {
        title: 'Advanced Features for Maximum Impact',
        subTitle: 'Go beyond simple newsletters and create a powerful marketing channel.',
        featureList: [
            {
                title: 'Intelligent Article Selection',
                description: 'Our AI scans news sources and selects the most relevant articles based on an analysis of your target audience, ensuring high engagement.',
                image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg',
                cta: 'Learn more'
            },
            {
                title: 'Seamless Language Translation',
                description: 'Reach a global audience by automatically translating articles into your subscribers\' native languages, breaking down communication barriers.',
                image: 'https://images.pexels.com/photos/207756/pexels-photo-207756.jpeg',
                cta: 'Learn more'
            },
            {
                title: 'Lead Tracking & Analytics',
                description: 'Embed a lead tracker in your company link to monitor engagement and measure the success of your campaigns with our built-in counter.',
                image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
                cta: 'Learn more'
            }
        ]
    },
    howItWorks: {
        title: 'Get Started in 3 Simple Steps',
        steps: [
            {
                step: 1,
                title: 'Connect Your News Source',
                description: 'Link any news source, and our AI will start analyzing it for relevant content.'
            },
            {
                step: 2,
                title: 'Define Your Voice',
                description: 'Let our AI learn your brand\'s personality from your website or provide a custom description.'
            },
            {
                step: 3,
                title: 'Launch Your Newsletter',
                description: 'Set your schedule and watch as personalized, multilingual newsletters are automatically sent to your subscribers.'
            }
        ]
    },
    personas: {
        title: 'Perfect for Your Business',
        subTitle: 'From startups to enterprises, our tool is designed to help you grow.',
        personaList: [
            {
                persona: 'Content Creators',
                problem: 'Spending hours curating and writing content for your audience.',
                outcome: 'Automate your content creation process and focus on growing your community.'
            },
            {
                persona: 'Marketing Teams',
                problem: 'Struggling to create personalized content that resonates with a global audience.',
                outcome: 'Increase engagement and conversions with hyper-personalized, multilingual newsletters.'
            },
            {
                persona: 'Businesses',
                problem: 'Lacking the resources to create a consistent and engaging newsletter.',
                outcome: 'Build a powerful marketing channel that drives traffic and sales with minimal effort.'
            }
        ]
    },
    metrics: {
        title: 'Real Results, Backed by Data',
        metricList: [
            { value: '90%', label: 'Reduction in content creation time', proof: 'Based on beta user feedback.' },
            { value: '2x', label: 'Increase in subscriber engagement', proof: 'Observed in A/B tests with beta users.' },
            { value: '5x', label: 'Faster content delivery', proof: 'Compared to manual newsletter creation.' }
        ]
    },
    // integrations: {
    //     text: 'Works with the tools you already love.',
    //     logos: [
    //         { name: 'Tool A', src: '/logos/tool-a.svg' },
    //         { name: 'Tool B', src: '/logos/tool-b.svg' },
    //         { name: 'Tool C', src: '/logos/tool-c.svg' },
    //         { name: 'Tool D', src: '/logos/tool-d.svg' },
    //         { name: 'Tool E', src: '/logos/tool-e.svg' },
    //         { name: 'Tool F', src: '/logos/tool-f.svg' }
    //     ]
    // },
    testimonials: {
        title: 'What Our Customers Say',
        testimonialList: [
            {
                quote: "The AI Newsletter Generator has been a game-changer for our content strategy. We're now able to reach our global audience with personalized content that resonates.",
                name: 'Alex Chen',
                title: 'Head of Growth, Global Tech Inc.'
            },
            {
                quote: 'I was skeptical at first, but the AI-generated content is incredibly well-written and on-brand. Our subscribers love it!',
                name: 'Samantha Jones',
                title: 'Founder, The Content Corner'
            },
            {
                quote: 'The amount of time we\'ve saved is incredible. We can now focus on other areas of our business while the AI handles our newsletter.',
                name: 'David Rodriguez',
                title: 'CEO, Startup Solutions'
            }
        ]
    },
    pricing: {
        teaser: 'Affordable Plans for Every Business',
        subTitle: 'Our plans are designed to grow with you.',
        plan: 'Starts from $9/mo',
        cta: 'See Pricing'
    },
    finalCta: {
        hook: 'Ready to Revolutionize Your Newsletter?',
        cta: 'Start Your Free Trial Today'
    },
    footer: {
        copyright: `© ${new Date().getFullYear()} AI Newsletter, Inc. All rights reserved.`,
        companyLinks: {
            title: 'Company',
            links: [
                { text: 'About Us', href: '/about' },
                { text: 'Careers', href: '/careers' },
                { text: 'Blog', href: '/blog' }
            ]
        },
        legalLinks: {
            title: 'Legal',
            links: [
                { text: 'Privacy Policy', href: '/legal/privacy' },
                { text: 'Terms of Service', href: '/legal/terms' },
                { text: 'Cookie Policy', href: '/legal/cookies' }
            ]
        },
        contact: 'support@ainewsletter.com'
    }
});
