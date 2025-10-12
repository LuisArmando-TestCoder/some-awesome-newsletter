import { CustomerPortal } from "@polar-sh/sveltekit";
import { env } from '$env/dynamic/private';

export const GET = CustomerPortal({
  accessToken: env.POLAR_ACCESS_TOKEN,
  getCustomerId: async (event) => {
    const email = event.url.searchParams.get('customerEmail');
    if (!email) {
      throw new Error("customerId not defined");
    }
    const response = await fetch(`https://sandbox-api.polar.sh/v1/customers/search?query=${email}`, {
      headers: {
        Authorization: `Bearer ${env.POLAR_ACCESS_TOKEN}`,
      },
    });
    const customers = await response.json();
    return customers.items?.[0]?.id ?? "";
  },
  server: "production",
});
