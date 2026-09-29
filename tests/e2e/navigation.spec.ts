import { expect, test } from '@playwright/test';

test('language switcher menuju halaman padanan', async ({ page }) => {
  await page.goto('/id/privacy');
  await page.getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/en\/privacy$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('setiap link menu punya section tujuan di halaman utama', async ({ page }) => {
  await page.goto('/id');
  const ids = await page
    .locator('header [data-section-link]')
    .evaluateAll((links) => links.map((a) => (a as HTMLElement).dataset.sectionLink!));
  expect(ids.length).toBeGreaterThan(0);
  for (const id of ids) await expect(page.locator(`#${id}`)).toHaveCount(1);
});

test('menu menggulir ke section dan menandainya aktif', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Menu desktop');
  await page.goto('/id');
  const link = page.locator('header nav a[data-section-link="contact"]');
  await link.click();
  await expect(page).toHaveURL(/\/id#contact$/);
  await expect(page.locator('#contact')).toBeInViewport();
  await expect(link).toHaveAttribute('aria-current', 'true');
  // Pindah bahasa tetap di section yang sama.
  await page.getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/en#contact$/);
});

test('menu mobile bisa dibuka dan ditutup dengan keyboard', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Menu mobile hanya tampil di layar kecil');
  await page.goto('/id');
  const openButton = page.locator('[data-mobile-menu-open]');
  await openButton.click();
  const dialog = page.locator('[data-mobile-menu]');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(openButton).toBeFocused();
});

test('skip link memindahkan fokus ke konten utama', async ({ page }) => {
  await page.goto('/id');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Lompat ke konten utama' });
  await expect(skip).toBeFocused();
  await skip.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test('konten tetap tampil saat animasi dimatikan (reduced motion)', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/id');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const hidden = await page
    .locator('[data-reveal]')
    .evaluateAll((els) => els.filter((el) => getComputedStyle(el).opacity === '0').length);
  expect(hidden).toBe(0);
  await context.close();
});
