import { defineConfig, devices } from '@playwright/test';

/**
 * Tes berjalan terhadap hasil build (dist/) melalui `astro preview`.
 * Jalankan `npm run build` lebih dulu, atau gunakan `npm run test:ci`.
 */
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL: 'http://localhost:4321', trace: 'on-first-retry' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'npx astro preview --port 4321 --ignore-lock',
    url: 'http://localhost:4321/id',
    reuseExistingServer: !process.env.CI,
  },
});
