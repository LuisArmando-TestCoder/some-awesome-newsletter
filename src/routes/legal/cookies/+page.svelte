<script lang="ts">
  import { t } from '$lib/i18n/translations';
  const lastUpdated = 'January 6, 2026';
  const contactEmail = 'info@aiban.news';
  const CANONICAL = 'https://aibanewsletter.club/legal/cookies';
  $: lg = ($t as any)?.legal ?? {};
  $: TITLE = lg.cookies?.metaTitle ?? 'Cookie policy | AIBAN';
  $: DESCRIPTION = lg.cookies?.metaDescription ?? 'Which cookies AIBAN uses, what they do, how long they last and how you can control them.';

  const cookieCategories = [
    {
      id: 'essential',
      title: 'Essential cookies',
      description:
        'These are necessary for the website to work and cannot be switched off. They are usually set only in response to actions you take that amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.',
      cookies: [
        { name: 'session_id', provider: 'AIBAN', purpose: 'Keeps you logged in', expiry: 'Session' },
        { name: 'x-auth-token', provider: 'AIBAN', purpose: 'Security authentication', expiry: '30 days' }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics cookies',
      description:
        'These cookies let us count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular.',
      cookies: [
        { name: '_ga', provider: 'Google', purpose: 'Website traffic analysis', expiry: '2 years' },
        { name: '_gid', provider: 'Google', purpose: 'User behavior tracking', expiry: '24 hours' }
      ]
    },
    {
      id: 'preferences',
      title: 'Preference cookies',
      description:
        'These cookies let the website remember your choices, such as your selected language or theme.',
      cookies: [
        { name: 'lang', provider: 'AIBAN', purpose: 'Stores your selected language', expiry: '1 year' },
        { name: 'theme', provider: 'AIBAN', purpose: 'Stores your UI theme (dark or light)', expiry: 'Persistent' }
      ]
    }
  ];
</script>

<svelte:head>
  <title>{TITLE}</title>
  <meta name="description" content={DESCRIPTION} />
  <link rel="canonical" href={CANONICAL} />
  <meta property="og:title" content={TITLE} />
  <meta property="og:description" content={DESCRIPTION} />
  <meta property="og:url" content={CANONICAL} />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<main>
  <h1>{lg.cookies?.title ?? 'Cookie policy'}</h1>
  <p class="legal-date">{(lg.lastUpdated ?? 'Last updated: {date}').replace('{date}', lastUpdated)}</p>

  <p>
    This cookie policy explains how AIBAN ("we", "us" and "our") uses cookies and similar technologies to
    recognize you when you visit our website. It explains what these technologies are, why we use them and
    your rights to control our use of them.
  </p>

  <h2>What are cookies?</h2>
  <p>
    Cookies are small data files placed on your computer or mobile device when you visit a website. Website
    owners use them to make their websites work, or work more efficiently, and to provide reporting
    information.
  </p>

  <h2>How we use cookies</h2>
  <p>
    We use first-party and third-party cookies for several reasons. Some cookies are required for technical
    reasons so that our website can operate; we call these "essential" or "strictly necessary" cookies. Other
    cookies let us track and target the interests of our users to improve their experience on our website.
  </p>

  {#each cookieCategories as category (category.id)}
    <h3>{category.title}</h3>
    <p>{category.description}</p>
    <div class="legal-table-wrap">
      <table>
        <caption class="visually-hidden">{category.title}</caption>
        <thead>
          <tr>
            <th scope="col">Cookie name</th>
            <th scope="col">Provider</th>
            <th scope="col">Purpose</th>
            <th scope="col">Expiry</th>
          </tr>
        </thead>
        <tbody>
          {#each category.cookies as cookie (cookie.name)}
            <tr>
              <td><code>{cookie.name}</code></td>
              <td>{cookie.provider}</td>
              <td>{cookie.purpose}</td>
              <td>{cookie.expiry}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/each}

  <h2>How can I control cookies?</h2>
  <p>
    You have the right to decide whether to accept or reject cookies. You can set or change your web browser
    controls to accept or refuse cookies. If you reject cookies, you can still use our website, though some
    features and areas of the website may not be available to you.
  </p>
  <p>
    Most advertising networks also offer a way to opt out of targeted advertising. To find out more, visit
    <a href="https://www.aboutads.info/choices/" rel="noopener noreferrer">AboutAds.info</a> or
    <a href="https://www.youronlinechoices.com" rel="noopener noreferrer">Your Online Choices</a>.
  </p>

  <h2>Contact</h2>
  <p>
    If you have questions about our use of cookies or other technologies, email us at
    <a href="mailto:{contactEmail}">{contactEmail}</a>.
  </p>
</main>

<style>
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
</style>
