/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// Unit test untuk logika murni (src/lib, src/config, src/i18n). E2E ada di tests/e2e (Playwright).
// getViteConfig membuat modul virtual Astro (astro:content, astro:assets) bisa di-resolve.
export default getViteConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
});
