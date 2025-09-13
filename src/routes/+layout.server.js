/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
  let user = null;
  // Print all cookies received by the server
  console.log("Main All cookies in +layout.server.js:", cookies.getAll ? cookies.getAll() : "getAll not available");
  const userCookie = cookies.get('user');

  console.log("Main Cookie value in +layout.server.js:", userCookie);
  if (userCookie && userCookie !== "undefined") {
    try {
      user = JSON.parse(userCookie);
      console.log("Main Parsed user in +layout.server.js:", user);
    } catch (e) {
      user = null;
      console.log("Error parsing user cookie in +layout.server.js:", e);
    }
  }
  return {
    user
  };
}
