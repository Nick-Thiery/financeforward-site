/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// getViteConfig makes image imports behave as they do in Astro, so the
// content modules can be tested exactly as the build uses them.
export default getViteConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
});
