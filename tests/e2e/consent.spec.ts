import { expect, test, type Page } from '@playwright/test';

/**
 * Hanya berjalan bila build memakai PUBLIC_GA_MEASUREMENT_ID (CI memakai ID dummy).
 * Request ke Google dicegat sehingga tidak ada data yang benar-benar terkirim.
 */
async function trackGoogle(page: Page) {
  const requests: string[] = [];
  await page.route(/googletagmanager\.com|google-analytics\.com/, (route) => {
    requests.push(route.request().url());
    return route.fulfill({ status: 204, body: '' });
  });
  return requests;
}

test.beforeEach(async ({ page }) => {
  // Banner disembunyikan dari bot (navigator.webdriver); browser tes perlu tampil seperti pengunjung biasa.
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'webdriver', { get: () => false }),
  );
  await page.goto('/id');
  const enabled = await page.locator('#consent-config').count();
  test.skip(enabled === 0, 'Analytics nonaktif pada build ini');
});

test('GA tidak dimuat sebelum ada persetujuan', async ({ page }) => {
  const requests = await trackGoogle(page);
  await page.reload();
  await expect(page.getByRole('dialog', { name: 'Kami menggunakan cookie' })).toBeVisible();
  await page.waitForTimeout(500);
  expect(requests).toEqual([]);
});

test('menolak cookie: GA tetap tidak dimuat', async ({ page }) => {
  const requests = await trackGoogle(page);
  await page.reload();
  await page.getByRole('button', { name: 'Tolak semua' }).first().click();
  await page.reload();
  await page.waitForTimeout(500);
  expect(requests).toEqual([]);
});

test('menerima cookie: GA dimuat', async ({ page }) => {
  const requests = await trackGoogle(page);
  await page.reload();
  await page.getByRole('button', { name: 'Terima semua' }).first().click();
  await expect.poll(() => requests.some((u) => u.includes('gtag/js'))).toBe(true);
});

test('pengaturan cookie bisa dibuka dari footer', async ({ page }) => {
  await page.getByRole('button', { name: 'Tolak semua' }).first().click();
  await page.getByRole('button', { name: 'Pengaturan Cookie' }).click();
  await expect(page.getByRole('dialog', { name: 'Pengaturan cookie' })).toBeVisible();
});
