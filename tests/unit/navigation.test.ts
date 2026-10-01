import { expect, test } from 'vitest';
import { legalNav, mainNav } from '../../src/config/navigation';
import { site } from '../../src/config/site';
import { t } from '../../src/i18n';

test('menu hanya berisi halaman yang fiturnya aktif', () => {
  for (const item of mainNav) {
    if (item.feature) expect(site.features[item.feature]).toBe(true);
  }
});

test('path menu unik dan diawali garis miring', () => {
  const paths = [...mainNav, ...legalNav].map((item) => item.path);
  expect(new Set(paths).size).toBe(paths.length);
  for (const path of paths) expect(path).toMatch(/^\/[a-z-]+$/);
});

test('setiap item menu punya label di kedua bahasa', () => {
  for (const item of [...mainNav, ...legalNav]) {
    expect(t('id').nav[item.key]).toBeTruthy();
    expect(t('en').nav[item.key]).toBeTruthy();
  }
});
