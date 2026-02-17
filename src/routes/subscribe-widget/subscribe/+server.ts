import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createHmac } from 'crypto';
import { env } from '$env/dynamic/private';
const THE_PASS = env.THE_PASS;

// This function replicates the logic from store.ts for server-side use.
const getApiUrl = (origin: string) => {
  return origin.startsWith('http://localhost') 
    ? "http://localhost:8000" 
    : "https://ai-newsletter-translated.onrender.com";
};

export const POST: RequestHandler = async ({ request, url }) => {
  try {
    const { email, configuratorId, newsSourceId } = await request.json();
    const API_URL = getApiUrl(url.origin);
    const body = {
      email,
      name: email.split('@')[0],
      pass: THE_PASS,
    };
    
    console.log('[subscribe] Using THE_PASS to subscribe. ' + JSON.stringify(body));

    console.log(`[subscribe] Received request for ${email} to subscribe to ${newsSourceId} from ${configuratorId}`);

    if (!email || !configuratorId || !newsSourceId) {
      console.error('[subscribe] Missing required fields.');
      return json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (url.origin.includes("aiban.news") || url.origin.includes("localhost")) {
      console.log('[subscribe] Internal request detected. Using THE_PASS to subscribe.');
      const response = await fetch(`${API_URL}/users/${configuratorId}/${newsSourceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-email': configuratorId,
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return json(data, { status: response.status });
    }

    // 1. Fetch the configuration from the Deno API to get webhookUrl and sharedSecret
    console.log(`[subscribe] Fetching configuration for ${configuratorId}`);
    const configResponse = await fetch(`${API_URL}/config`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-email': configuratorId,
      },
      body: JSON.stringify(body),
    });


    if (!configResponse.ok) {
      console.error(`[subscribe] Failed to fetch configuration for ${configuratorId}`);
      return json({ error: 'Failed to fetch configuration.' }, { status: 500 });
    }
    const config = await configResponse.json();
    const { webhookUrl, webhookSharedSecret } = config;

    if (!webhookUrl || !webhookSharedSecret) {
      console.error(`[subscribe] Webhook is not configured for ${configuratorId}`);
      return json({ error: 'Webhook is not configured for this client.' }, { status: 400 });
    }

    // 2. Make the authenticated server-to-server call to the client's webhook
    console.log(`[subscribe] Making authenticated server-to-server call to ${webhookUrl}`);
    const requestBody = JSON.stringify({ configuratorId });
    const signature = createHmac('sha256', webhookSharedSecret).update(requestBody).digest('hex');

    const keyResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Signature': signature
      },
      body: requestBody
    });

    if (!keyResponse.ok) {
      console.error(`[subscribe] Failed to retrieve API key from client server for ${configuratorId}`);
      return json({ error: 'Failed to retrieve API key from client server.' }, { status: 500 });
    }
    const { apiKey } = await keyResponse.json();

    if (!apiKey) {
      console.error(`[subscribe] Client server did not return an API key for ${configuratorId}`);
      return json({ error: 'Client server did not return an API key.' }, { status: 500 });
    }

    // 3. Now, call the actual Deno API with the retrieved API key
    console.log(`[subscribe] Calling Deno API with retrieved API key for ${email}`);
    const response = await fetch(`${API_URL}/users/${configuratorId}/${newsSourceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ email, name: email.split('@')[0] }) // Assuming name can be derived
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`[subscribe] API error for ${email}: ${errorData.error || response.statusText}`);
      return json({ error: `API error: ${errorData.error || response.statusText}` }, { status: response.status });
    }

    const data = await response.json();

    // 4. Initiate Billing (Get Payment Link) - Attempt to upgrade to paid/tracking subscription
    // We do this after adding the user so they exist in the DB for the webhook to update.
    try {
      const billingResponse = await fetch(`${API_URL}/api/newsletter-subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          configuratorId, 
          newsSourceId,
          planId: "newsletter", 
          interval: "monthly"
        })
      });

      const billingData = await billingResponse.json();
      if (billingData.success && billingData.url) {
        return json({ ...data, paymentUrl: billingData.url }, { status: 201 });
      }
    } catch (billingError) {
      console.error('[subscribe] Billing initiation failed:', billingError);
      // Continue without payment URL (fallback to free/added state)
    }

    return json(data, { status: 201 });

  } catch (error) {
    console.error('Subscription proxy error:', error);
    return json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
};
