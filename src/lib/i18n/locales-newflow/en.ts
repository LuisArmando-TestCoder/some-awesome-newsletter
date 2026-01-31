export default {
  step01: {
    title: "The human sounding AI writes newsletters for your subscribers on automatic",
    subtitle: "How frequent, select <u>every month</u> or <u>every week</u> or <u>every day</u> or <u>what time</u>"
  },
  step02: {
    title: "Language of the newsletter",
    subtitle: "“your newsletter will also be sent in every user’s specific language if they are any different”"
  },
  step03: {
    title: "Redirect (Optional)",
    subtitle: "Do you want to redirect the user to your page?",
    description: "You can paste a link to your page here, we will be counting how many enter from the emails the AI creates",
    placeholder: "https://your-page.com"
  },
  step04: {
    title: "Type of news you want the AI to pick",
    subtitle: "Which theme of conversation or topic (inferred from redirect link if set, otherwise empty)",
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
    warning: "⚠️ Edits made here will be overwritten if you switch back to Visual Editor and make changes."
  },
  step06: {
    title: "News Source",
    subtitle: "Which news website do you want to use?",
    description: "Enter a URL or let us pick one for you based on your topic.",
    descriptionSmall: "We will analyze the website to find the best content. This might take a few seconds.",
    placeholder: "https://example.com",
    analyzing: "Analyzing...",
    next: "Next",
    errors: {
      failedToGenerate: "Failed to generate selector. Please try again or check the URL.",
      errorGenerating: "An error occurred while generating selector.",
      invalidUrl: "Please enter a valid URL or pick a source."
    }
  },
  step07: {
    title: "Content Selector",
    subtitle: "Think of every website as a <strong>library with a unique layout</strong>.",
    explanation1: "This <strong>'Selector'</strong> is the specific map we created for this website. It tells our system exactly where to look to pick up the articles you want, while ignoring menu buttons and advertisements.",
    explanation2: "<strong>We have populated this map for you automatically.</strong>",
    placeholder: "Selector string...",
    regenerate: "Regenerate Selector",
    regenerating: "Regenerating...",
    errors: {
      noUrl: "No news source URL found.",
      failedRegenerate: "Failed to regenerate selector.",
      errorRegenerate: "An error occurred while regenerating selector."
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
      initializing: "Initializing...",
      starting: "Starting generation...",
      scraping: "Scraping content...",
      translating: "Translating article...",
      formatting: "Formatting email...",
      sending: "Connecting to email provider...",
      authenticating: "Authenticating...",
      sendingArticle: "Sending article...",
      creating: "Creating news source...",
      saving: "Saving configuration...",
      finalizing: "Finalizing setup..."
    },
    errors: {
      generationFailed: "Generation failed: ",
      createFailed: "Failed to create news source. Please try again.",
      errorCreating: "Error creating news source: ",
      sendFailed: "Failed to send email: "
    },
    defaultSubject: "Your Generated Newsletter Preview"
  },
  step09: {
    title: "To send the article from your email",
    subtitle: "App Password (Optional)",
    description: "(If you have gmail services, put your app password here)",
    label: "App Password",
    placeholder: "Your App Password"
  },
  step10: {
    title: "Gmail Address (Optional)",
    subtitle: "Gmail Email Address",
    description: "If you want to send from a specific Gmail address",
    placeholder: "your-email@gmail.com"
  },
  step11: {
    title: "Send Test Email",
    subtitle: "Send a test email to yourself to verify the configuration.",
    sendNow: "Send Now",
    sent: "Sent! Check your email",
    loading: {
      connecting: "Connecting to email provider...",
      authenticating: "Authenticating...",
      sending: "Sending article..."
    }
  },
  step12: {
    title: "Share this newsletter with your followers",
    subtitle: "Link to subscription funnel (before they start receiving email, they would have to accept your invitation)",
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
    developerText: "Check out our developer section to integrate this newsletter subscription funnel on your server, a blog of all your generated articles, and subscribing users from your codebase with our API Key.",
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
