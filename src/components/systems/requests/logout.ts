export default async function logout(doRedirect: boolean = true) {
  try {
    // Clear localStorage
    localStorage.clear();
  } catch (error) {
    console.error("Failed to clear user data:", error);
  }

  if (doRedirect) {
    window.location.href = "/";
  }
}