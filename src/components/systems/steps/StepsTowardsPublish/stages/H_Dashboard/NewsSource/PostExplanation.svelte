<script lang="ts">
    import { writable, derived } from 'svelte/store';
    import CodeFormatter from "../../../../../../common/CodeFormatter.svelte";
    import store from "../../../../../../store";
    import type { NewsSource, NewsletterUser } from "../../../../../../types";
    import Email from "../../../../../inputs/Email/Email.svelte";
    import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte";
    import { addNewsletterUser } from "../../../../../requests/addNewsletterUserEndpoint";
    import Language from "../../../../../inputs/Language/Language.svelte";
    import PlainText from "../../../../../inputs/PlainText/PlainText.svelte";
  import { t } from "$lib/i18n/dashboard-translations";

    export let newsSource: NewsSource;

    const userEmail = writable("");
    const userName = writable("Robert Downey Jr.");
    const userBio = writable("Subscribed from the playground.");
    const userLanguage = writable("en");
    let message = "";
    let isLoading = false;

    function handleLanguageSelect(selectedLanguageCode: string | null) {
        if (selectedLanguageCode) {
            userLanguage.set(selectedLanguageCode);
        }
    }

    async function handleSubscription() {
        const emailValue = $userEmail;
        if (!emailValue) {
            message = $t['errors.invalidEmail'];
            return;
        }

        isLoading = true;
        message = "";

        const user: NewsletterUser = {
            email: emailValue,
            name: $userName,
            bio: $userBio,
            language: $userLanguage,
            newsSourcesConfigTuples: [],
        };

        try {
            const configId = $store.configuratorEmail;
            const newsSourceId = newsSource.id;
            const result = await addNewsletterUser(user, configId, newsSourceId);
            message = result.message || $t['success.subscribed'];
        } catch (error) {
            console.error("Subscription error:", error);
            const errorMessage = error instanceof Error ? error.message : $t['errors.unknown'];
            message = `${$t['errors.failedToSubscribe']}: ${errorMessage}`;
        } finally {
            isLoading = false;
        }
    }

    const codeSnippetForExecution = derived(userEmail, $userEmail => `
// Clicking the \`\`Run Code\`\` button will invoke this subscription logic as an example,
// which uses this very addNewsletterUser function internally.
addUserToNewsletter({ 
  email: "${$userEmail || 'your.email@example.com'}", 
  name: "${$userName}", 
  bio: "${$userBio}", 
  language: "${$userLanguage}" 
  });
`);

  const codeSnippetForCreation = derived(
    [userEmail, userName, userBio, userLanguage],
    ([$userEmail, $userName, $userBio, $userLanguage]) => `
// You can tweak all this hardcoded parameters
async function addUserToNewsletter({ email, name, bio, language }) {
  const user = {
    email,
    name,
    bio,
    language // ISO-639-1 language code
  };

  const APIURI = "https://ai-newsletter-translated.onrender.com";

  // This is the ID associated to this current account, use for internal processes
  const configId = "${$store.configuratorEmail}";

  // This is the ID associated with ${newsSource.url}
  const newsSourceId = "${newsSource.id}";

  const url = \`\${APIURI}/users/\${configId}/\${newsSourceId}\`;

  // API endpoint to add a new subscriber.
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // The API_KEY is private, and you can find it in your account settings.
      'Authorization': \`Bearer \${YOUR_API_KEY}\`,
    },
    body: JSON.stringify(user),
  });

  const result = await response.json();

  if (response.ok) {
    console.log('User added successfully:', result.message);
  } else {
    console.error('Failed to add user:', result.message);
  }
}
`);
</script>

<div class="playground-controls">
  <Email
    onChange={(newValue) => userEmail.set(newValue)}
    placeholder={$t['placeholders.subscriberEmail']}
  />

  <p>
    {$t['markdown.apiPlayground']}
  </p>

  <SubmitButton
    label={$t['labels.runCode']}
    callback={handleSubscription}
    loading={isLoading}
    disabled={!$userEmail || isLoading}
  />
</div>

<CodeFormatter
  lang="javascript"
  code={$codeSnippetForExecution}
/>

{#if message}
  <p class="feedback-message">{message}</p>
{/if}

<h4>{$t['labels.interactiveApiPlayground']}</h4>

<div class="input-grid">
    <PlainText label={$t['labels.name']} bind:value={$userName} />
    <PlainText label={$t['labels.bio']} bind:value={$userBio} />
    <Language onSelect={handleLanguageSelect} defaultLanguageCode={$userLanguage} />
</div>

<CodeFormatter
  lang="javascript"
  code={$codeSnippetForCreation}
/>

<style>
  .playground-controls {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 16px;
  }
  .feedback-message {
    margin-top: 8px;
    font-size: 0.9rem;
    padding: 8px;
    border-radius: 4px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
  }
  .input-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 16px;
  }
</style>
