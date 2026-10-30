// Node module hooks so the WS6 unit tests run with `node --test` and no extra
// dependencies: maps SvelteKit aliases and adds the .ts extension.
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const STUBS = {
	'$env/dynamic/public': 'data:text/javascript,export const env = globalThis.__PUBLIC_ENV__ ?? {};',
	'$env/dynamic/private': 'data:text/javascript,export const env = {};'
};

function withExt(p) {
	for (const cand of [p, `${p}.ts`, `${p}.js`, path.join(p, 'index.ts')]) if (existsSync(cand) && !cand.endsWith(path.sep)) return cand;
	return null;
}

export async function resolve(specifier, context, next) {
	if (STUBS[specifier]) return { url: STUBS[specifier], shortCircuit: true };
	if (specifier.startsWith('$lib/')) {
		const f = withExt(path.join(root, 'src/lib', specifier.slice(5)));
		if (f) return { url: pathToFileURL(f).href, shortCircuit: true };
	}
	if ((specifier.startsWith('./') || specifier.startsWith('../')) && context.parentURL?.startsWith('file:')) {
		const base = path.dirname(fileURLToPath(context.parentURL));
		const f = withExt(path.resolve(base, specifier));
		if (f && f !== path.resolve(base, specifier)) return { url: pathToFileURL(f).href, shortCircuit: true };
	}
	return next(specifier, context);
}
