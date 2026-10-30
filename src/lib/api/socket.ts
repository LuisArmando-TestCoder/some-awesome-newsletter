/**
 * One Socket.IO connection per signed-in owner.
 * - connects only in the browser, lazily loads socket.io-client
 * - registers with the owner's credentials on every (re)connect
 * - reconnects with exponential backoff (socket.io built in)
 * - typed events; `on()` returns an unsubscribe function for component cleanup
 * - status store for a small "Live" indicator
 */
import { writable, type Readable } from 'svelte/store';
import type { Socket } from 'socket.io-client';
import { getApiBaseUrl } from './config';
import { getCredentials } from './credentials';

export type RunSummary = {
	id: string;
	automationId: string;
	status: 'queued' | 'running' | 'ok' | 'partial' | 'failed' | 'skipped';
	trigger?: string;
	startedAt?: string;
	finishedAt?: string;
	steps?: Array<{ type: string; status: string; error?: string }>;
	counts?: { recipients: number; sent: number; failed: number };
	skipReason?: string;
	error?: string;
};

export interface ServerToClientEvents {
	log: (message: string) => void;
	resetPage: () => void;
	'automation:run': (run: RunSummary) => void;
	'import:progress': (p: { importId: string; processed: number; total: number; added: number }) => void;
	activity: (item: { id: string; type: string; createdAt: string; [k: string]: unknown }) => void;
}

export interface ClientToServerEvents {
	register: (p: { id: string; accessCode: string; token?: string }) => void;
	ping: () => void;
	resetAck: () => void;
}

export type SocketStatus = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'offline';
const status = writable<SocketStatus>('idle');
export const socketStatus: Readable<SocketStatus> = { subscribe: status.subscribe };

export type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

let socket: AppSocket | null = null;
let identity: { id: string; accessCode: string } | null = null;
let pingTimer: ReturnType<typeof setInterval> | null = null;
let connecting: Promise<void> | null = null;
type AnyListener = (...args: never[]) => void;
const listeners = new Map<keyof ServerToClientEvents, Set<AnyListener>>();

function attach(s: Socket<ServerToClientEvents, ClientToServerEvents>) {
	for (const [event, set] of listeners) for (const l of set) s.on(event, l as ServerToClientEvents[typeof event]);
}

/** Connect (or switch user). Safe to call many times. */
export function connectSocket(id: string, accessCode: string): Promise<void> {
	if (typeof window === 'undefined' || !id || !accessCode) return Promise.resolve();
	if (socket && identity?.id === id && identity.accessCode === accessCode) return Promise.resolve();
	if (socket) disconnectSocket();
	identity = { id, accessCode };
	status.set('connecting');
	connecting = (async () => {
		const { io } = await import('socket.io-client');
		if (!identity || identity.id !== id) return; // signed out or switched while loading
		const s: Socket<ServerToClientEvents, ClientToServerEvents> = io(getApiBaseUrl(), {
			path: '/socket-io',
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax: 30_000,
			randomizationFactor: 0.5,
			timeout: 20_000,
			transports: ['websocket', 'polling']
		});
		socket = s;
		s.on('connect', () => {
			status.set('connected');
			// Session token first (backend verifies it); legacy code kept for older servers.
			if (identity) s.emit('register', { ...identity, token: getCredentials().sessionToken });
		});
		s.on('disconnect', (reason) => {
			// 'io client disconnect' is ours; anything else will auto reconnect.
			status.set(reason === 'io client disconnect' ? 'idle' : 'reconnecting');
		});
		s.io.on('reconnect_attempt', () => status.set('reconnecting'));
		s.io.on('reconnect_failed', () => status.set('offline'));
		s.on('resetPage', () => s.emit('resetAck'));
		attach(s);
		if (pingTimer) clearInterval(pingTimer);
		pingTimer = setInterval(() => socket?.connected && socket.emit('ping'), 4 * 60 * 1000);
	})().finally(() => {
		connecting = null;
	});
	return connecting;
}

export function disconnectSocket(): void {
	identity = null;
	if (pingTimer) clearInterval(pingTimer);
	pingTimer = null;
	if (socket) {
		socket.removeAllListeners();
		socket.disconnect();
	}
	socket = null;
	status.set('idle');
}

/** Listen to a server event. Returns a function that removes the listener. */
export function on<E extends keyof ServerToClientEvents>(event: E, listener: ServerToClientEvents[E]): () => void {
	let set = listeners.get(event);
	if (!set) listeners.set(event, (set = new Set()));
	set.add(listener as AnyListener);
	// Widen E to the key union: socket.io cannot resolve its listener type for a generic key.
	const key: keyof ServerToClientEvents = event;
	socket?.on(key, listener as ServerToClientEvents[typeof key]);
	return () => {
		set!.delete(listener as AnyListener);
		socket?.off(key, listener as ServerToClientEvents[typeof key]);
	};
}

/** Raw socket for legacy code. Prefer `on()`. */
export function getSocket() {
	return socket;
}
