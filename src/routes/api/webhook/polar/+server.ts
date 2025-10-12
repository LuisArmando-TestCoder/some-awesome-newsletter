import { Webhooks } from "@polar-sh/sveltekit";
import { env } from '$env/dynamic/private';

export const POST = Webhooks({
  webhookSecret: env.POLAR_WEBHOOK_SECRET!,
  onSubscriptionCreated: async (payload) => {
    // TODO: Make a secure, server-to-server request to the Deno backend
  },
  onSubscriptionUpdated: async (payload) => {
    // TODO: Make a secure, server-to-server request to the Deno backend
  },
});
