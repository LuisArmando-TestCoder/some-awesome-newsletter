<script lang="ts">
    import { onMount } from 'svelte';
    import { t } from '$lib/i18n/translations';
  
    const lastUpdated = "January 6, 2026";
  
    const cookieCategories = [
      {
        id: "essential",
        title: "Essential Cookies",
        description: "These are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.",
        cookies: [
          { name: "session_id", provider: "AIBAN", purpose: "Maintains user login state", expiry: "Session" },
          { name: "x-auth-token", provider: "AIBAN", purpose: "Security authentication", expiry: "30 days" }
        ]
      },
      {
        id: "analytics",
        title: "Analytics Cookies",
        description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular.",
        cookies: [
          { name: "_ga", provider: "Google", purpose: "Website traffic analysis", expiry: "2 years" },
          { name: "_gid", provider: "Google", purpose: "User behavior tracking", expiry: "24 hours" }
        ]
      },
      {
        id: "preferences",
        title: "Preference Cookies",
        description: "These cookies enable the website to provide enhanced functionality and personalization, such as remembering your selected language or theme.",
        cookies: [
          { name: "lang", provider: "AIBAN", purpose: "Stores selected language", expiry: "1 year" },
          { name: "theme", provider: "AIBAN", purpose: "Stores UI theme (dark/light)", expiry: "Persistent" }
        ]
      }
    ];
  </script>
  
  <svelte:head>
    <title>Cookie Policy • A I B A N</title>
  </svelte:head>
  
  <main class="policy">
    <div class="policy__container">
      
      <header class="policy__header">
        <h1 class="policy__title">Cookie Policy</h1>
        <p class="policy__date">Last Updated: {lastUpdated}</p>
      </header>
  
      <section class="policy__section">
        <p class="policy__text">
          This Cookie Policy explains how <strong>AIBAN</strong> ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
        </p>
      </section>
  
      <section class="policy__section">
        <h2 class="policy__subtitle">What are cookies?</h2>
        <p class="policy__text">
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
        </p>
      </section>
  
      <section class="policy__section">
        <h2 class="policy__subtitle">How we use cookies</h2>
        <p class="policy__text">
          We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Sections.
        </p>
  
        {#each cookieCategories as category}
          <div class="policy__category">
            <h3 class="policy__category-title">{category.title}</h3>
            <p class="policy__text">{category.description}</p>
            
            <div class="policy__table-wrapper">
              <table class="policy__table">
                <thead class="policy__table-head">
                  <tr class="policy__table-row">
                    <th class="policy__table-header">Cookie Name</th>
                    <th class="policy__table-header">Provider</th>
                    <th class="policy__table-header">Purpose</th>
                    <th class="policy__table-header">Expiry</th>
                  </tr>
                </thead>
                <tbody class="policy__table-body">
                  {#each category.cookies as cookie}
                    <tr class="policy__table-row">
                      <td class="policy__table-cell"><code>{cookie.name}</code></td>
                      <td class="policy__table-cell">{cookie.provider}</td>
                      <td class="policy__table-cell">{cookie.purpose}</td>
                      <td class="policy__table-cell">{cookie.expiry}</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        {/each}
      </section>
  
      <section class="policy__section">
        <h2 class="policy__subtitle">How can I control cookies?</h2>
        <p class="policy__text">
          You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. 
        </p>
        <p class="policy__text">
          In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit 
          <a href="http://www.aboutads.info/choices/" class="policy__link">AboutAds.info</a> or 
          <a href="http://www.youronlinechoices.com" class="policy__link">Your Online Choices</a>.
        </p>
      </section>
  
      <footer class="policy__footer">
        <p class="policy__text">
          If you have any questions about our use of cookies or other technologies, please email us at 
          <a href="mailto:legal@aiban.com" class="policy__link">legal@aiban.com</a>.
        </p>
      </footer>
  
    </div>
  </main>
  
  <style lang="scss">
    .policy {
      padding: 100px 24px;
      background-color: #fcfcfd;
      min-height: 100vh;
      color: #374151;
      font-family: 'Inter', system-ui, sans-serif;
      line-height: 1.6;
  
      &__container {
        max-width: 800px;
        margin: 0 auto;
      }
  
      &__header {
        border-bottom: 1px solid #e5e7eb;
        padding-bottom: 32px;
        margin-bottom: 48px;
      }
  
      &__title {
        font-size: 2.5rem;
        font-weight: 800;
        color: #111827;
        margin-bottom: 8px;
      }
  
      &__date {
        font-size: 0.875rem;
        color: #6b7280;
      }
  
      &__section {
        margin-bottom: 40px;
      }
  
      &__subtitle {
        font-size: 1.5rem;
        font-weight: 700;
        color: #111827;
        margin-bottom: 16px;
      }
  
      &__text {
        margin-bottom: 16px;
        font-size: 1.05rem;
        color: #4b5563;
  
        strong {
          color: #111827;
        }
      }
  
      &__category {
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 24px;
        margin: 24px 0;
      }
  
      &__category-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: #111827;
        margin-bottom: 12px;
      }
  
      &__table-wrapper {
        overflow-x: auto;
        margin-top: 16px;
      }
  
      &__table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        font-size: 0.875rem;
      }
  
      &__table-header {
        background: #f9fafb;
        padding: 12px;
        border-bottom: 2px solid #e5e7eb;
        font-weight: 600;
        color: #374151;
      }
  
      &__table-cell {
        padding: 12px;
        border-bottom: 1px solid #f3f4f6;
        color: #4b5563;
  
        code {
          background: #f3f4f6;
          padding: 2px 4px;
          border-radius: 4px;
          font-family: monospace;
          color: #ef4444;
        }
      }
  
      &__link {
        color: #3b82f6;
        text-decoration: none;
        font-weight: 500;
        border-bottom: 1px solid transparent;
        transition: border-color 0.2s;
  
        &:hover {
          border-color: #3b82f6;
        }
      }
  
      &__footer {
        margin-top: 60px;
        padding-top: 32px;
        border-top: 1px solid #e5e7eb;
      }
    }
  
    @media (max-width: 640px) {
      .policy__title {
        font-size: 2rem;
      }
      
      .policy__category {
        padding: 16px;
      }
    }
  </style>