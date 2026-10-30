/**
 * Product feature switches.
 *
 * payments: off (decision by Luis, 2026-10-30). There is no payment provider:
 * no checkout, no billing portal, no charge at signup, and no provider code in
 * the app. When a provider is chosen later, it is added from scratch and this
 * switch (PUBLIC_PAYMENTS_ENABLED=true) turns the UI back on.
 * UI owners hide upgrade and billing buttons when `features.payments` is false.
 */
import { env } from '$env/dynamic/public';

function flag(key: `PUBLIC_${string}`, fallback: boolean): boolean {
	try {
		const v = (env[key] ?? '').trim().toLowerCase();
		return v ? v === 'true' || v === '1' : fallback;
	} catch {
		return fallback;
	}
}

export const features = {
	payments: flag('PUBLIC_PAYMENTS_ENABLED', false)
};

/** Shown where an upgrade button would be while payments are off. */
export const PAYMENTS_OFF_MESSAGE = 'Paid plans are not available yet. Write to us if you need higher limits and we will set them for you.';
