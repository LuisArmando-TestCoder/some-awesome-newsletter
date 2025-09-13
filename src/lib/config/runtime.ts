// Public envs only (client-safe). Provide sane defaults for local dev.
const appName = import.meta.env.PUBLIC_APP_NAME ?? 'Platform of Platforms';
const termsUrl = import.meta.env.PUBLIC_TERMS_URL ?? '/legal/terms';
const privacyUrl = import.meta.env.PUBLIC_PRIVACY_URL ?? '/legal/privacy';
const cookiesUrl = import.meta.env.PUBLIC_COOKIES_URL ?? '/legal/cookies';

// If any of these are missing, we consider Mock Mode ON.
const googleId = import.meta.env.PUBLIC_AUTH_GOOGLE_ID ?? '';

// Allow explicit override via PUBLIC_AUTH_FORCE_MOCK=true
const forceMock = (import.meta.env.PUBLIC_AUTH_FORCE_MOCK ?? '').toString().toLowerCase() === 'true';

export const runtime = {
  appName,
  legal: { termsUrl, privacyUrl, cookiesUrl },
  isMockMode: forceMock || !googleId,
};
