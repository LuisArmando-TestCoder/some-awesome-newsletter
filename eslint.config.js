// ESLint flat config (ESLint 10, typescript-eslint 8, eslint-plugin-svelte 3).
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

export default defineConfig(
	{
		ignores: [
			'build/',
			'.svelte-kit/',
			'node_modules/',
			'static/',
			'_aiban_backups/',
			'_deprecated/',
			'_ws3_tmp/',
			'_ws4_tmp/',
			'docs/'
		]
	},
	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		rules: {
			// Allow intentionally unused bindings when prefixed with "_" (for example the
			// dependency arguments of a legacy `$: reset(a, b)` statement, or a catch binding).
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }
			],
			// The app is served from the site root (kit.paths.base is not set), so resolve() would
			// return its input unchanged. Most hrefs and goto() targets here are built at runtime
			// (query strings, hashes, mailto:, external URLs, blog paths from helpers), which the
			// typed Pathname accepted by resolve() cannot express. Turn this back on if a base path
			// is ever configured.
			'svelte/no-navigation-without-resolve': 'off'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				// TypeScript parser for <script lang="ts"> blocks.
				parser: ts.parser,
				extraFileExtensions: ['.svelte'],
				svelteConfig
			}
		}
	}
);
