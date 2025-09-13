import { writable } from 'svelte/store';

/**
 * Get a cookie value by name (client-side only).
 * @param {string} name
 * @returns {string | null}
 */
function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop();
    if (cookieValue) {
      const val = cookieValue.split(';').shift();
      if (typeof val === 'string') return decodeURIComponent(val);
    }
  }
  return null;
}

/**
 * Set a cookie (client-side only).
 * @param {string} name
 * @param {string} value
 * @param {number} [days=7]
 */
function setCookie(name, value, days = 7) {
  if (typeof document === 'undefined') return;
  let expires = '';
  if (typeof days === 'number' && days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
}

function createUserStore() {
  let initial = null;
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('user')
    const session = sessionStorage.getItem('user')
    const cookie = getCookie('user')
    console.log("local", local)
    console.log("session", session)
    console.log("cookie", cookie)
    initial = JSON.parse(local || session || "{}");
    if (initial.name) {
      try {
        console.log("This is the null", initial)

        console.log('[user.js] user loaded from localStorage', initial);
      } catch (e) {
        initial = null;
      }
    } else if (getCookie('user') !== "undefined") {
      // Try to get from cookie if localStorage is empty
      initial = JSON.parse(getCookie('user') || "{}");
      if (initial) {
        try {
          console.log("This is the initial", initial)

          localStorage.setItem('user', typeof initial === "string" ? initial : JSON.stringify(initial));
          // sessionStorage.setItem('user', initial);
          console.log('[user.js] user loaded from cookie', initial);
        } catch (e) {
          initial = null;
        }
      }
    }
  }
  const { subscribe, set, update } = writable(initial);

  // Save to localStorage and cookie on set (client only)
  return {
    subscribe,
    set: (/** @type {any} */ value) => {
      console.log("This is the value", value)
      if (typeof window !== 'undefined') {
        if (value) {
          const str = JSON.stringify(value);
          localStorage.setItem('user', str);
          setCookie('user', value);
          console.log('[user.js] user saved to localStorage and cookie', value);
        } else {
          // localStorage.removeItem('user');
          // setCookie('user', '', -1); // Remove cookie
          console.log('[user.js] user removed from localStorage and cookie');
        }
      }
      console.log("This is the value set", value)
      set(value);
    },
    update
  };
}

export const user = createUserStore();
