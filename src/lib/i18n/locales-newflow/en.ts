export default {
  step01: {
    title: "The human sounding AI writes newsletters for your subscribers on automatic",
    subtitle: "How frequent, select <u>every month</u> or <u>every week</u> or <u>every day</u> or <u>what time</u>"
  },
  step02: {
    title: "Language of the newsletter",
    subtitle: "Your newsletter is also sent in each subscriber's own language when it differs."
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
    warning: "Edits made here are replaced if you switch back to the visual editor and make changes."
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
  ,
  onboarding: {
    progress: "Step {current} of {total}",
    progressLabel: "Setup progress",
    back: "Back",
    skip: "Skip this step",
    continue: "Continue",
    whyLabel: "Why we ask",
    skipLabel: "If you skip",
    working: "Working...",
    start: {
      title: "Start your newsletter",
      opening: "Opening setup. If nothing happens,",
      continueHere: "continue here"
    },
    tryAgain: "Try again",
    website: {
      title: "What is your website?",
      why: "We read your site to find the articles your newsletter will be built from, and to guess who your readers are.",
      skipNote: "If you do not have a website yet, pick a topic and we will use a news site about it.",
      label: "Website address",
      hint: "For example yourcompany.com or yourcompany.com/blog",
      placeholder: "yourcompany.com",
      submit: "Continue",
      checking: "Reading your site...",
      noWebsite: "I do not have a website",
      haveWebsite: "I have a website",
      topicTitle: "Pick a topic",
      topicHint: "We will use a news site about this topic as your first source. You can change it later.",
      errors: {
        empty: "Enter your website address to continue.",
        invalid: "This does not look like a web address. Check the spelling, for example yourcompany.com.",
        unreachable: "We could not find articles on this page. Try your blog or news page, for example yourcompany.com/blog.",
        network: "We could not reach our servers. Check your connection and try again."
      }
    },
    readers: {
      title: "Who reads your newsletter?",
      why: "We write every issue for this reader, and in this language. Subscribers who speak another language get their own translated copy.",
      skipNote: "We filled these in from your site. Change anything that looks wrong.",
      languageLabel: "Main language",
      languageHint: "We picked this from your browser settings.",
      readerLabel: "Your ideal reader",
      readerHint: "One sentence is enough. For example: small restaurant owners in Lisbon.",
      readerPlaceholder: "Who is this newsletter for?",
      errors: {
        reader: "Describe your reader in a few words so we know who to write for."
      }
    },
    preview: {
      title: "Here is your first issue",
      why: "This is the email your subscribers will get, written from your latest article. Nothing has been sent yet.",
      generating: "Writing your first issue from your latest article. This usually takes under a minute.",
      inboxFrom: "From",
      inboxTo: "To",
      inboxSubject: "Subject",
      defaultSubject: "Your first issue",
      sendTest: "Send me a test",
      sendingTest: "Sending...",
      testSent: "Test sent to {email}. Check your inbox and spam folder.",
      regenerate: "Write it again",
      looksGood: "Looks good, continue",
      skipPreview: "Continue without a preview",
      howTitle: "How we find your articles",
      howBody: "We saved a short rule that tells us where the article links are on your page, so menus and ads are ignored. You only need to change it if the preview picked the wrong content.",
      ruleLabel: "Article rule",
      findAgain: "Find articles again",
      errors: {
        generate: "We could not write the issue. The page may block automated reading. Try again, or go back and use your blog page.",
        test: "The test email did not send. Try again in a moment."
      }
    },
    senderName: {
      title: "How should your name appear in the inbox?",
      why: "Subscribers see this name next to every issue, so they recognize it and open it.",
      skipNote: "If you skip, the sender shows as AIBAN. You can change the name later in Settings.",
      label: "Sender name",
      hint: "Your name, your company, or the newsletter's name. Up to 60 characters.",
      placeholder: "Silva Studio",
      previewLabel: "How it looks in an inbox",
      previewBody: "Your issue appears with this sender name. It is sent from the AIBAN sending address.",
      save: "Save and continue",
      errors: {
        empty: "Enter a sender name with at least 2 characters.",
        long: "Keep the sender name to 60 characters or fewer.",
        save: "We could not save the name. Try again in a moment."
      }
    },
    signature: {
      title: "Email signature",
      why: "Your signature goes at the end of every issue, so readers know who wrote it and how to reach you.",
      skipNote: "If you skip, issues end with your newsletter name only.",
      nameLabel: "Your name",
      namePlaceholder: "Ana Silva",
      roleLabel: "Role or company",
      rolePlaceholder: "Founder, Silva Studio",
      linkLabel: "Link",
      linkHint: "Your website or a social profile. Optional.",
      linkPlaceholder: "yourcompany.com",
      previewLabel: "How it looks at the end of an email",
      previewBody: "Thanks for reading. See you in the next issue.",
      save: "Save signature",
      existingNote: "You already have a signature. Saving here replaces it."
    },
    schedule: {
      title: "When should new issues go out?",
      why: "We check your site before each send and write a new issue from the newest articles.",
      skipNote: "You can change the day and time, or pause sending, at any time in the dashboard.",
      scheduleLabel: "Send time",
      frequencyLabel: "How often",
      daily: "Every day",
      weekly: "Every week",
      monthly: "Every month, on the 1st",
      dayLabel: "Day",
      timeLabel: "Time",
      timeHint: "In your local time.",
      summaryDaily: "Every day at {time}, your time ({zone}).",
      summaryWeekly: "Every {day} at {time}, your time ({zone}).",
      summaryMonthly: "On the 1st of each month at {time}, your time ({zone}).",
      recipeTitle: "Send new issues automatically",
      recipeBody: "On the schedule above, we pick your best new article, write it in your voice, translate it for each reader, and email it.",
      recipeOn: "On",
      recipeOff: "Off. Issues only go out when you press Send.",
      save: "Save and continue",
      saving: "Saving your newsletter...",
      errors: {
        create: "We could not save your newsletter. Try again in a moment.",
        limit: "Your plan does not allow another source. To add one, write to us and we will change your plan."
      }
    },
    send: {
      title: "Send your first issue",
      why: "Sending now shows you the full path: your issue arrives in a real inbox, in the reader's language.",
      skipNote: "If you skip, the first issue goes out at your scheduled time.",
      youAreSubscribed: "You are already subscribed as {email}.",
      othersLabel: "Invite people (optional)",
      othersHint: "Paste email addresses separated by commas or new lines. Each person gets a personal invitation from you. They only receive issues if they accept, and we delete invitations nobody accepts after 30 days.",
      othersPlaceholder: "ana@example.com, li@example.com",
      sendNow: "Send now",
      sending: "Sending your first issue...",
      sentTitle: "Your first issue is on its way",
      sentBody: "It goes to everyone on your list who has confirmed their subscription. It can take a few minutes to arrive.",
      invited: "Invitations sent to {count} people. They join your list when they accept.",
      invitesUnavailable: "Invitations are not available yet, so we did not save these addresses. On the next step, copy your signup link and send it to them yourself.",
      continue: "Continue",
      errors: {
        invalidEmails: "These addresses look wrong: {list}. Fix or remove them.",
        add: "We could not invite: {list}. Try again later from Subscribers.",
        send: "The issue did not send. Try again in a moment."
      }
    },
    share: {
      title: "Get your first subscribers",
      why: "People who sign up here get every issue in their own language.",
      skipNote: "You can find this link and the embed code later in Subscribers, under Signup form.",
      linkLabel: "Signup page",
      linkHint: "Share it on social media, in your email footer, or on a QR code.",
      embedLabel: "Signup form for your website",
      embedHint: "Paste this code where you want the form to appear on your site.",
      copy: "Copy",
      copied: "Copied",
      open: "Open the signup page"
    },
    done: {
      title: "Your newsletter is set up",
      why: "Here is what happens next and what is left to do.",
      planLine: "Current plan: {plan}",
      changePlan: "See plans",
      toDashboard: "Go to the dashboard",
      summarySource: "Source: {url}",
      summarySchedule: "Schedule: {schedule}",
      summaryAutomation: "Automatic sending: {state}",
      on: "on",
      off: "off"
    }
  },
  tutorial: {
    checklistTitle: "Get started",
    checklistProgress: "{done} of {total} done",
    checklistDone: "All set. Your newsletter runs by itself now.",
    dismiss: "Hide checklist",
    doneLabel: "done",
    todoLabel: "to do",
    show: "Show getting started",
    items: {
      source: { title: "Add where your content comes from", body: "A website or blog we check for new articles." },
      sender: { title: "Choose your sender name", body: "The name subscribers see next to each issue." },
      subscriber: { title: "Get your first subscriber", body: "Someone other than you signs up or is added." },
      send: { title: "Send your first issue", body: "One real issue reaches the people on your list." },
      automation: { title: "Turn on automatic sending", body: "New issues go out on your schedule." },
      widget: { title: "Add the signup form to your site", body: "Visitors can subscribe without leaving your site." }
    },
    open: "Open",
    tour: {
      start: "Take a quick tour",
      next: "Next",
      back: "Back",
      skip: "Skip tour",
      finish: "Finish",
      stepOf: "{current} of {total}"
    },
    help: {
      whatIsThis: "What is this?",
      whyItMatters: "Why it matters",
      close: "Close"
    }
  },
  auth: {
    emailLabel: "Email address",
    emailHint: "We send a 6-digit code to this address. You do not need a password.",
    codeTitle: "Check your email",
    codeSentTo: "We sent a 6-digit code to {email}.",
    codeHint: "The code can take a minute to arrive. Check your spam folder too.",
    changeEmail: "Use a different email",
    resend: "Send a new code",
    resendIn: "You can request a new code in {seconds} s",
    resendLimit: "If the code still has not arrived, write to us from the Help page and we will sort it out.",
    resent: "We sent a new code.",
    verifying: "Checking your code...",
    errors: {
      email: "Enter a full email address, for example you@company.com.",
      send: "We could not send the code. Check your connection and try again.",
      code: "That code did not work. Check the 6 digits or request a new code."
    }
  }
};
