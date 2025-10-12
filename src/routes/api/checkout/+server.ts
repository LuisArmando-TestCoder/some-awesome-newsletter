import { Checkout } from "@polar-sh/sveltekit";
import { env } from '$env/dynamic/private';

export const GET = Checkout({
  accessToken: env.POLAR_ACCESS_TOKEN,
  successUrl: env.POLAR_SUCCESS_URL,
  server: "production",
  theme: "dark",
});
