/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ cookies }) {
  // Erase the user cookie (set to empty, expired, path=/)
  cookies.set('user', '', {
    path: '/',
    expires: new Date(0)
  });
  return new Response(null, { status: 204 });
}
