import { writable } from 'svelte/store';

export const authContent = writable({
  logo: "/icons/logo.png",
  login: {
    title: "Log in to our Newsletter Orchestrator",
    subtitle: "Connect to continue where you left off.",
    google: "Continue with Google",
    or: "or",
    emailPlaceholder: "you@example.com",
    continueWithEmail: "Continue with Email",
    switchText: "Don't have an account?",
    switchLink: "Sign Up",
    switchHref: "/signup"
  },
  signup: {
    title: "Create your account",
    subtitle: "No credit card required.",
    google: "Continue with Google",
    or: "or",
    emailPlaceholder: "you@example.com",
    continueWithEmail: "Continue with Email",
    switchText: "Already have an account?",
    switchLink: "Log In",
    switchHref: "/login"
  }
});
