import type { Session } from '$lib/stores/session';

export const load = async ({ locals }) => {
  const mockMode = !import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  let user: Session | null = null;

  if (mockMode) {
    user = {
      id: 'mock-id',
      email: 'mock@example.com',
      name: 'Mock User',
      provider: 'mock'
    };
  } else {
    // TODO: implement real user logic
  }

  // Mock data for now, replace with actual service calls
  const usage = {
    apiCallsPerDay: {
      used: 50,
      limit: 100,
      remaining: 50,
      resetAt: new Date()
    },
    projects: {
      used: 1,
      limit: 1,
      remaining: 0,
      resetAt: new Date()
    }
  };
  const plan = {
    id: 'trial',
    name: 'Trial',
    interval: 'monthly'
  };

  return {
    user,
    usage,
    plan,
    mockMode
  };
};
