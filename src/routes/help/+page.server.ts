import type { PageServerLoad } from './$types';

/**
 * Help page data. Sign-in lives in the browser (localStorage), so the server
 * does not know who is visiting: the page renders for everyone and the form
 * fills in the owner's details on the client when they are signed in.
 * The old version returned a made-up user and invented usage numbers.
 */
export const load: PageServerLoad = async () => {
	return {
		user: null,
		usage: null,
		plan: null,
		mockMode: false
	};
};
