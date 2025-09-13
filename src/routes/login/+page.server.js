import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from '$env/static/private';


export const actions = {
    OAuth2: async ({ url }) => {
        const redirectURL = `${url.origin}/oauth`;

        console.log('[login/+page.server.js] SECRET_CLIENT_ID', SECRET_CLIENT_ID);
        console.log('[login/+page.server.js] redirectURL', redirectURL);

        const oAuth2Client = new OAuth2Client(
            SECRET_CLIENT_ID,
            SECRET_CLIENT_SECRET,
            redirectURL
        );

        // Generate the url that will be used for the consent dialog.
        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'openid',
                'profile',
                'email'
            ],
            prompt: 'consent'
        });

        console.log('[login/+page.server.js] authorizeUrl', authorizeUrl);
        throw redirect(302, authorizeUrl);
    }
}
