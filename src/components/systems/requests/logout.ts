export default async function logout(doRedirect: boolean = true) {
  await fetch("/logout", { method: "POST" });

  try {
    // Clear sessionStorage
    sessionStorage.clear();

    // Clear localStorage
    localStorage.clear();

    // Delete all cookies
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
  } catch (error) {
    localStorage.setItem("lastError", String(error));
  }

  if (doRedirect) {
    console.log("Bye");
    window.location.href = "/";
  }
}