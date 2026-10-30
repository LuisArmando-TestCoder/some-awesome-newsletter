import { startGoogleOAuth } from '../oauth/oauthState.server.js';

export const actions = {
    OAuth2: async (event) => startGoogleOAuth(event),
};
