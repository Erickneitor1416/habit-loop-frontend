import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
      thresholds: {
        lines: 80,
        statements: 80,
        branches: 80,
        functions: 80,
      },
      reportOnFailure: true,
      all: true,
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/ui/**',
        '**/*.config.*',
        '**/layout.tsx',
        '**/index.ts',
        '**/index.tsx',
        '**/lib/**',
      ],
    },
  },
});
