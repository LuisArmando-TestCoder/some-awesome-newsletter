import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';


import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from '$env/static/private';
import { getConfigFetchResponse } from '../../components/systems/requests/getConfiguratorSession';
import createInitialConfiguratorConfig from '../../components/systems/requests/createInitialConfiguratorConfig';

/**
 * @param {string} access_token
 */
async function getUserData(access_token) {
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  const data = await response.json();
  return data;
}

export const GET = async (event) => {
  const { url } = event;
  console.log('[oauth/+server.js] OAuth endpoint hit');
  const redirectURL = `${url.origin}/oauth`;
  const code = await url.searchParams.get('code');
  console.log('[oauth/+server.js] code', code);

  if (!code) {
    throw new Error("Missing code");
  }
  const oAuth2Client = new OAuth2Client(
    SECRET_CLIENT_ID,
    SECRET_CLIENT_SECRET,
    redirectURL
  );
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  const credentials = oAuth2Client.credentials;
  console.log('[oauth/+server.js] credentials', credentials);

  // Extract and verify the ID token
  const idToken = tokens.id_token;
  console.log('[oauth/+server.js] idToken', idToken);
  // Fetch user info from Google
  if (!credentials.access_token) {
    throw new Error("Missing access token");
  }
  const userInfo = await getUserData(credentials.access_token);
  console.log('[oauth/+server.js] userInfo', userInfo);

  const { sub, email, given_name, picture } = userInfo;

  const authHeaders = {
    "x-auth-token-id": idToken || '',
    "x-auth-client-id": SECRET_CLIENT_ID,
    "x-auth-code": sub,
    "x-auth-email": email,
    "Content-Type": "application/json",
    given_name,
    picture,
  };

  let response = await getConfigFetchResponse(authHeaders, url.origin);

  if (!response.ok) {
    await createInitialConfiguratorConfig(authHeaders);
  }

  response = await getConfigFetchResponse(authHeaders, url.origin);

  console.log("await response.json()", await response.json())

  const query = toQuery(authHeaders);

  const dest = new URL('/dashboard', url);
  // Safer: put data in the fragment so it doesn't hit server logs/referrers.

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