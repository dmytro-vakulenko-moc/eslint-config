import { defineConfig } from 'eslint/config';

import { createReactRulesConfig } from './react/react.eslint.js';
import reactOverridesEslint from './react/react-overrides.eslint.js';

/**
 * Creates the React ESLint configuration.
 * Combine with createNodeConfig() or createNestConfig() for full coverage:
 * @param options - Optional project root used to resolve the installed React version.
 * @param options.rootDir - The consumer project root. Defaults to `process.cwd()`.
 * @example
 * import { createNodeConfig } from './.eslint/node.eslint.mjs';
 * import { createReactConfig } from './.eslint/react.eslint.mjs';
 * export default defineConfig([...createNodeConfig(), ...createReactConfig()]);
 * @returns The composed React flat-config array (base React rules + overrides).
 */
export function createReactConfig(options: { rootDir?: string } = {}) {
  return defineConfig([...createReactRulesConfig(options), ...reactOverridesEslint]);
}

export default createReactConfig();
