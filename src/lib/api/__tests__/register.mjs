import { register } from 'node:module';
register('./loader.mjs', import.meta.url);

// Minimal browser globals for the API layer.
const mem = new Map();
globalThis.localStorage = {
	getItem: (k) => (mem.has(k) ? mem.get(k) : null),
	setItem: (k, v) => mem.set(k, String(v)),
	removeItem: (k) => mem.delete(k),
	clear: () => mem.clear(),
	key: (i) => [...mem.keys()][i] ?? null,
	get length() {
		return mem.size;
	}
};
globalThis.window = globalThis.window ?? { location: { origin: 'http://localhost:5173', pathname: '/' } };
