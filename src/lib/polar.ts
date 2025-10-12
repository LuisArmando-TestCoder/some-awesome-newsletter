import { env } from '$env/dynamic/private';

export async function findOrCreateCustomer(email: string): Promise<string> {
  console.log('--- Finding or creating customer ---');
  
  // 1. Search for an existing customer using their email as the external_id
  console.log('Searching for customer with external_id (email):', email);
  let response = await fetch(`https://sandbox-api.polar.sh/v1/customers/external/${email}`, {
    headers: {
      Authorization: `Bearer ${env.POLAR_ACCESS_TOKEN}`,
    },
  });
  let customer = await response.json();
  console.log('Search response:', customer);

  if (response.ok && customer.id) {
    console.log('Customer found:', customer.id);
    return customer.id;
  }

  // 2. If no customer is found, create a new one with external_id set to their email
  console.log('Customer not found. Creating a new one.');
  response = await fetch(`https://sandbox-api.polar.sh/v1/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.POLAR_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      email: email,
      external_id: email, // Use the email as the unique external ID
    }),
  });
  const newCustomer = await response.json();
  console.log('Create response:', newCustomer);
  
  if (!newCustomer.id) {
    console.error('Failed to create customer. API response:', newCustomer);
    throw new Error('Failed to create customer');
  }
  
  console.log('Customer created:', newCustomer.id);
  return newCustomer.id;
}
