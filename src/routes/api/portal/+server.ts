import { CustomerPortal } from "@polar-sh/sveltekit";
import { env } from '$env/dynamic/private';
import { Polar } from "@polar-sh/sdk";

const polar = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
});

export const GET = CustomerPortal({
  accessToken: env.POLAR_ACCESS_TOKEN,
  getCustomerId: async (event) => {
    const email = event.url.searchParams.get('customerEmail');
    if (!email) {
      throw new Error("customerEmail not defined");
    }

    try {
      const customer = await polar.customers.getExternal({ externalId: email });
      return customer.id;
    } catch (error: any) {
      if (error.statusCode === 404) {
        const newCustomer = await polar.customers.create({
          email: email,
          externalId: email,
        });
        return newCustomer.id;
      }
      console.error("Error fetching or creating customer", error);
      throw error;
    }
  },
  server: "production",
});
