import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.mjs'],
    // ESLint runs (type-aware linting) can take a moment to warm up.
    testTimeout: 30_000,
    hookTimeout: 30_000,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.mjs'],
      exclude: ['src/**/*.eslint.mjs', 'src/logger.mjs', 'src/tsconfig.utils.mjs'],
    },
  },
});
