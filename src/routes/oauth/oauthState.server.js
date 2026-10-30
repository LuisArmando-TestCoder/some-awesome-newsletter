// Shared Google OAuth start for /login and /signup (WS3).
// Adds a random `state` stored in an HttpOnly cookie so a third party cannot
// finish a login in someone else's browser (login CSRF). Nothing secret is logged.
import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { env } from '$env/dynamic/private';

// Read at runtime so builds do not need the OAuth secrets and rotating them only needs a restart.
const SECRET_CLIENT_ID = env.SECRET_CLIENT_ID ?? '';
const SECRET_CLIENT_SECRET = env.SECRET_CLIENT_SECRET ?? '';

export const OAUTH_STATE_COOKIE = 'aiban_oauth_state';

/** @param {{ url: URL, cookies: import('@sveltejs/kit').Cookies }} event */
export function startGoogleOAuth({ url, cookies }) {
    const redirectURL = `${url.origin}/oauth`;
    const oAuth2Client = new OAuth2Client(SECRET_CLIENT_ID, SECRET_CLIENT_SECRET, redirectURL);
    const state = crypto.randomUUID();
    cookies.set(OAUTH_STATE_COOKIE, state, {
        path: '/oauth',
        httpOnly: true,
        sameSite: 'lax',
        secure: url.protocol === 'https:',
        maxAge: 600,
    });
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['openid', 'profile', 'email'],
        prompt: 'consent',
        state,
    });
    throw redirect(302, authorizeUrl);
}
