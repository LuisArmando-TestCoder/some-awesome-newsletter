import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';


import {SECRET_CLIENT_ID,SECRET_CLIENT_SECRET} from '$env/static/private';
import { getConfigFetchResponse } from '../../components/systems/requests/getConfiguratorSession';
import createInitialConfiguratorConfig from '../../components/systems/requests/createInitialConfiguratorConfig';
import store, { saveToStore } from '../../components/store';
import { get } from 'svelte/store';

async function getUserData(access_token) {
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  const data = await response.json();
  return data;
}


export const GET = async ({ url, cookies }) => {
    console.log('[oauth/+server.js] OAuth endpoint hit');
    const redirectURL = `${url.origin}/oauth`;
    const code = await url.searchParams.get('code');
    console.log('[oauth/+server.js] code', code);

    try {
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
        const user = oAuth2Client.credentials;
        console.log('[oauth/+server.js] user', user);

        // Extract and verify the ID token
        const idToken = tokens.id_token;
        console.log('[oauth/+server.js] idToken', idToken);
        let idTokenPayload = null;
        if (idToken) {
          // Optionally: verify the ID token here using your backend logic
          // For now, decode the payload for storage
          const [, payloadB64] = idToken.split(".");
          idTokenPayload = JSON.parse(atob(payloadB64));
        }

        // Fetch user info from Google
        if (!user.access_token) {
            throw new Error("Missing access token");
        }
        const userInfo = await getUserData(user.access_token);
        console.log('[oauth/+server.js] userInfo', userInfo);

        // Only store non-sensitive info in cookie, but also store id_token for backend verification
        const { sub, name, given_name, family_name, picture, email } = userInfo;
        // idToken, clientId: SECRET_CLIENT_ID in here attempt to create a user

        console.log("is it here?", email, tokens, user);


        const authHeaders = {
          "x-auth-token-id": idToken || '',
          "x-auth-client-id": SECRET_CLIENT_ID,
          "x-auth-code": sub || '',
          "x-auth-email": email || '',
          "Content-Type": "application/json",
          senderName: name || email || ''
        };
      
        let response = await getConfigFetchResponse();
      
        if (!response.ok) {
          await createInitialConfiguratorConfig();
          response = await getConfigFetchResponse();
        }

        // Set secure: false for localhost, true otherwise
        const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
        const cookieOptions = {
          path: '/dashboard',
          // httpOnly: true,
          // sameSite: /** @type {"lax"} */ ("lax"),
          // secure: !isLocalhost,
          maxAge: 60 * 60 * 24 * 7 // 1 week
        };
        console.log("Setting user cookie with options:", cookieOptions, "on hostname:", url.hostname);
        cookies.set(
          'user',
          JSON.stringify({ sub, name, given_name, family_name, picture, email, configuratorEmail: email, authCode: sub }),
          cookieOptions
        );
        console.log('[oauth/+server.js] user cookie set', JSON.stringify({ sub, name, given_name, family_name, picture, email, configuratorEmail: email, authCode: sub }));
        saveToStore({
          authCode: sub,
          configuratorEmail: email,
        });
        console.log('[oauth/+server.js] authCode and configuratorEmail saved to store');
    } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
    }

    throw redirect(303, '/dashboard');
};
