import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { routeSet, routes } from './routes';

test('ada halaman yang dibangun', () => {
  expect(routes.length).toBeGreaterThan(0);
});

for (const route of routes) {
  test.describe(route, () => {
    test('termuat tanpa error dan punya struktur dasar', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
      page.on('pageerror', (err) => errors.push(err.message));

      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      const lang = route.split('/')[1];
      await expect(page.locator('html')).toHaveAttribute('lang', lang!);
      await expect(page).toHaveTitle(/.+/);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);

      // Tidak ada horizontal scroll.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);

      expect(errors, 'console error (termasuk pelanggaran CSP)').toEqual([]);
    });

    test('semua link internal valid', async ({ page }) => {
      await page.goto(route);
      const hrefs = await page
        .locator('a[href^="/"]')
        .evaluateAll((links) => links.map((a) => a.getAttribute('href')!.split('#')[0]!));
      const broken = [...new Set(hrefs)].filter((href) => href && !routeSet.has(href));
      expect(broken).toEqual([]);
    });

    test('lulus pemeriksaan aksesibilitas (WCAG 2.2 AA)', async ({ page }) => {
      // Tanpa animasi agar kontras diukur pada kondisi akhir (bukan saat elemen masih transparan).
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .exclude('#cc-main')
        .analyze();
      const serious = results.violations.filter((v) => ['serious', 'critical'].includes(v.impact!));
      expect(serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
    });
  });
}
