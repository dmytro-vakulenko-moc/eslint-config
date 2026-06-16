import { defineConfig } from 'eslint/config';

/**
 * @description Overrides for React/JSX files to relax rules that conflict with React patterns.
 * @author Dmytro Vakulenko
 */
export default defineConfig([
  {
    name: 'react/overrides',
    files: ['**/*.jsx', '**/*.tsx', '**/*.ts'],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
  {
    // A React project targets the browser, so the Node-oriented
    // `eslint-plugin-n` builtin-availability check must not judge browser
    // globals (e.g. `localStorage`) against Node's experimental-builtins list.
    // This block only loads when the React stack is active, so Node projects
    // keep the rule. See fix-consumer-stack-defects (framework-stack-compatibility).
    name: 'react/browser-environment',
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}'],
    rules: {
      'n/no-unsupported-features/node-builtins': 'off',
    },
  },
  {
    // React function components are not JSDoc'd by convention; their props are
    // documented by their TypeScript types. Don't require a JSDoc block on
    // component files. See fix-consumer-stack-defects (rule-policy-coherence).
    name: 'react/component-docs',
    files: ['**/*.{jsx,tsx}'],
    rules: {
      'jsdoc/require-jsdoc': 'off',
    },
  },
]);
