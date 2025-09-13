export const handle = async ({ event, resolve }) => {
    // Read user info from cookie and set on event.locals
    const userCookie = event.cookies.get('user');
    if (userCookie) {
        try {
            event.locals.user = JSON.parse(userCookie);
        } catch (e) {
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
    }
    const response = await resolve(event);
    return response;
};
