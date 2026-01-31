export default {
  step01: {
    title: "AI wey dey sound like human automatikally write newsletter for your subscribers",
    subtitle: "How often, select <u>every month</u> or <u>every week</u> or <u>every day</u> or <u>wetin time</u>"
  },
  step02: {
    title: "Language of the newsletter",
    subtitle: "“dem go send your newsletter for every user specific language too if dem different”"
  },
  step03: {
    title: "Redirect (Optional)",
    subtitle: "You wan redirect the user to your page?",
    description: "You fit paste link to your page here, we go count how many enter from the emails wey AI create",
    placeholder: "https://your-page.com"
  },
  step04: {
    title: "Type of news wey you wan make AI pick",
    subtitle: "Which theme of conversation or topic (dem go guess from redirect link if you set am, otherwise empty)",
    placeholder: "e.g. Artificial Intelligence, Marketing, Health..."
  },
  step05: {
    title: "Customize Your Signature",
    subtitle: "Design visually or edit the code directly",
    visualEditor: "Visual Editor",
    htmlSource: "HTML Source",
    livePreview: "Live Preview",
    yourName: "Your Name",
    yourTitle: "Your Title",
    facebookProfile: "Facebook Profile",
    instagramProfile: "Instagram Profile",
    editHtml: "Edit HTML directly...",
    warning: "⚠️ Edits wey you make here go overwrite if you switch back to Visual Editor and make changes."
  },
  step06: {
    title: "News Source",
    subtitle: "Which news website you wan use?",
    description: "Enter URL or make we pick one for you based on your topic.",
    descriptionSmall: "We go analyze the website find the best content. Dis fit take few seconds.",
    placeholder: "https://example.com",
    analyzing: "De analyze...",
    next: "Next",
    errors: {
      failedToGenerate: "Fail to generate selector. Abeg try again or check the URL.",
      errorGenerating: "Error happen when generating selector.",
      invalidUrl: "Abeg enter valid URL or pick source."
    }
  },
  step07: {
    title: "Content Selector",
    subtitle: "Think of every website as <strong>library wey get unique layout</strong>.",
    explanation1: "Dis <strong>'Selector'</strong> na the specific map wey we create for dis website. E dey tell our system exactly where to look to pick up the articles wey you want, while ignoring menu buttons and advertisements.",
    explanation2: "<strong>We don populate dis map for you automatically.</strong>",
    placeholder: "Selector string...",
    regenerate: "Regenerate Selector",
    regenerating: "De regenerate...",
    errors: {
      noUrl: "No news source URL found.",
      failedRegenerate: "Fail to regenerate selector.",
      errorRegenerate: "Error happen when regenerating selector."
    }
  },
  step08: {
    title: "Preview",
    placeholder: "Ready to generate your first newsletter?",
    generateBtn: "Generate Newsletter Email",
    sentBtn: "Sent! Check your email",
    sendTestBtn: "Send Test Email",
    regenerateBtn: "Regenerate",
    loading: {
      initializing: "De initialize...",
      starting: "De start generation...",
      scraping: "De scrape content...",
      translating: "De translate article...",
      formatting: "De format email...",
      sending: "De connect to email provider...",
      authenticating: "De authenticate...",
      sendingArticle: "De send article...",
      creating: "De create news source...",
      saving: "De save configuration...",
      finalizing: "De finalize setup..."
    },
    errors: {
      generationFailed: "Generation fail: ",
      createFailed: "Fail to create news source. Abeg try again.",
      errorCreating: "Error creating news source: ",
      sendFailed: "Fail to send email: "
    },
    defaultSubject: "Your Generated Newsletter Preview"
  },
  step09: {
    title: "To send the article from your email",
    subtitle: "App Password (Optional)",
    description: "(If you get gmail services, put your app password here)",
    label: "App Password",
    placeholder: "Your App Password"
  },
  step10: {
    title: "Gmail Address (Optional)",
    subtitle: "Gmail Email Address",
    description: "If you wan send from specific Gmail address",
    placeholder: "your-email@gmail.com"
  },
  step11: {
    title: "Send Test Email",
    subtitle: "Send test email to yourself to verify the configuration.",
    sendNow: "Send Now",
    sent: "Sent! Check your email",
    loading: {
      connecting: "De connect to email provider...",
      authenticating: "De authenticate...",
      sending: "De send article..."
    }
  },
  step12: {
    title: "Share dis newsletter with your followers",
    subtitle: "Link to subscription funnel (before dem start to receive email, dem go have to accept your invitation)",
    copy: "Copy",
    copied: "Link copied!"
  },
  step13: {
    title: "Plan & Limits",
    currentPlan: "Current Plan:",
    limits: "Limits:",
    unknown: "Unknown",
    changePlan: "Change Plan",
    advancedFeatures: "Need more advanced features?",
    developerText: "Check out our developer section to integrate dis newsletter subscription funnel on your server, a blog of all your generated articles, and subscribing users from your codebase with our API Key.",
    dashboardBtn: "Go to Dashboard",
    usage: "Usage:",
    limitDetails: {
      free: "100 users limit",
      starter: "5 sources, 100k users",
      growth: "17 sources, 250k users",
      pro: "25 sources, 500k users",
      master: "50 sources, unlimited users",
      vipfree: "VIP Free"
    }
  }
};
