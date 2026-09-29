import { expect, test } from 'vitest';
import { legalNav, mainNav, sectionHref, sectionIndex } from '../../src/config/navigation';
import { site } from '../../src/config/site';
import { t } from '../../src/i18n';

test('menu hanya berisi section yang fiturnya aktif', () => {
  for (const item of mainNav) {
    if (item.feature) expect(site.features[item.feature]).toBe(true);
  }
});

test('id section unik', () => {
  const ids = mainNav.map((item) => item.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test('setiap item menu punya label di kedua bahasa', () => {
  for (const item of [...mainNav, ...legalNav]) {
    expect(t('id').nav[item.key]).toBeTruthy();
    expect(t('en').nav[item.key]).toBeTruthy();
  }
});

test('sectionHref mengarah ke anchor di beranda bahasa terkait', () => {
  expect(sectionHref('en', 'contact')).toBe('/en#contact');
});

test('sectionIndex berurutan mengikuti menu', () => {
  expect(mainNav.map((item) => sectionIndex(item.id))).toEqual(
    mainNav.map((_, i) => String(i + 1).padStart(2, '0')),
  );
});
