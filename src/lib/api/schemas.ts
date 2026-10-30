/** zod schemas for responses whose shape the UI depends on. Loose by design: unknown keys pass through. */
import { z } from 'zod';

export const newsSourceSchema = z.looseObject({
	id: z.string(),
	url: z.string().optional().default(''),
	type: z.string().optional(),
	linkSelector: z.string().optional(),
	scheduleTime: z.string().optional(),
	personality: z.string().optional(),
	lead: z.string().optional(),
	active: z.boolean().optional()
});

export const newsSourceEnvelope = z.looseObject({ newsSource: newsSourceSchema });

export const configSchema = z.looseObject({
	newsSources: z.array(z.looseObject({ id: z.string() })).optional(),
	pricingPlan: z.string().optional(),
	senderName: z.string().optional()
});

export const subscriberSchema = z.looseObject({
	email: z.string(),
	name: z.string().optional(),
	language: z.string().optional()
});

export const subscribersByNewsSourceSchema = z.record(z.string(), z.array(subscriberSchema));

export const automationSchema = z.looseObject({
	id: z.string(),
	configuratorId: z.string().optional(),
	name: z.string(),
	enabled: z.boolean(),
	trigger: z.looseObject({ type: z.string(), params: z.record(z.string(), z.unknown()).optional().default({}) }),
	steps: z.array(z.looseObject({ type: z.string() })).default([])
});

export const runRecordSchema = z.looseObject({
	id: z.string(),
	automationId: z.string(),
	status: z.string(),
	startedAt: z.string().optional()
});
