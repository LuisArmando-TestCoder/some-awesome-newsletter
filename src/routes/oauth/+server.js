import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';


import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from '$env/static/private';
import { getConfigFetchResponse } from '../../components/systems/requests/getConfiguratorSession';
import createInitialConfiguratorConfig from '../../components/systems/requests/createInitialConfiguratorConfig';
import { OAUTH_STATE_COOKIE } from './oauthState.server.js';

/**
 * @param {string} access_token
 */
async function getUserData(access_token) {
  // Token in a header, not the query string, so it never lands in proxy or access logs.
  const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!response.ok) throw new Error('Could not read the Google profile');
  const data = await response.json();
  return data;
}

export const GET = async (event) => {
  const { url, cookies } = event;
  const redirectURL = `${url.origin}/oauth`;
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const expectedState = cookies.get(OAUTH_STATE_COOKIE);
  cookies.delete(OAUTH_STATE_COOKIE, { path: '/oauth' });

  // Missing code, a cancelled consent screen or a state mismatch: back to login with a reason, no dead end.
  if (!code || !state || !expectedState || state !== expectedState) {
    const reason = url.searchParams.get('error') ? 'cancelled' : 'expired';
    throw redirect(302, `/login?oauth=${reason}`);
  }
  const oAuth2Client = new OAuth2Client(
    SECRET_CLIENT_ID,
    SECRET_CLIENT_SECRET,
    redirectURL
  );
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  const credentials = oAuth2Client.credentials;

  // Extract and verify the ID token
  const idToken = tokens.id_token;
  // Fetch user info from Google
  if (!credentials.access_token) {
    throw new Error("Missing access token");
  }
  const userInfo = await getUserData(credentials.access_token);

  const { sub, email, given_name, picture } = userInfo;

  const authHeaders = {
    "x-auth-token-id": idToken || '',
    "x-auth-client-id": SECRET_CLIENT_ID,
    "x-auth-code": sub,
    "x-auth-email": email,
    "Content-Type": "application/json",
  };

  // given_name and picture are not sent as HTTP headers: header values must be Latin-1,
  // so names in Chinese, Arabic, Hindi or Polish made fetch throw and the route answer 500.
  // The backend does not read them. A backend hiccup here must not block sign-in either.
  try {
    const response = await getConfigFetchResponse(authHeaders, url.origin);
    if (!response.ok) {
      await createInitialConfiguratorConfig(authHeaders, url.origin);
    }
  } catch (err) {
    console.error('oauth: config bootstrap failed', err instanceof Error ? err.message : 'unknown');
  }

  const query = toQuery({ ...authHeaders, given_name, picture });

  const dest = new URL('/dashboard', url);
  // Still in the query string because the dashboard layout (WS4) reads it from there and
  // removes it with replaceState. Moving to the fragment is requested in requests/4.md.

  throw redirect(302, `${dest.toString()}?${query}`);
};

/**
 * @param {{ [s: string]: any; } | ArrayLike<any>} obj
 */
function toQuery(obj) {
  return new URLSearchParams(
    Object.entries(obj)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => [k, String(v)])
  ).toString();
}