import { describe, expect, test } from 'vitest';
import en from '../../src/i18n/en.json';
import id from '../../src/i18n/id.json';
import { getLocale, isLocale, localize, localizedPath, stripLocale } from '../../src/i18n';

/** Semua path key + panjang array, mis. "about.mission[4]". */
function shape(value: unknown, path = ''): string[] {
  if (Array.isArray(value)) return [`${path}[${value.length}]`];
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      shape(child, path ? `${path}.${key}` : key),
    );
  }
  return [path];
}

describe('kamus', () => {
  test('en.json punya key dan jumlah item array yang sama dengan id.json', () => {
    expect(shape(en).sort()).toEqual(shape(id).sort());
  });

  test('tidak ada teks kosong', () => {
    const empty = (dict: object) =>
      shape(dict).filter((path) => {
        const value = path
          .replace(/\[\d+\]$/, '')
          .split('.')
          .reduce<unknown>((node, key) => (node as Record<string, unknown>)[key], dict);
        return Array.isArray(value) ? value.some((v) => !v) : !value;
      });
    expect(empty(id)).toEqual([]);
    expect(empty(en)).toEqual([]);
  });
});

describe('helper path', () => {
  test('localizedPath', () => {
    expect(localizedPath('id')).toBe('/id');
    expect(localizedPath('en', '/privacy')).toBe('/en/privacy');
    expect(localizedPath('en', 'privacy/')).toBe('/en/privacy');
  });

  test('stripLocale', () => {
    expect(stripLocale('/en/privacy.html')).toBe('/privacy');
    expect(stripLocale('/id')).toBe('/');
    expect(stripLocale('/404')).toBe('/404');
  });

  test('getLocale jatuh ke bahasa default untuk nilai tak dikenal', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('fr')).toBe(false);
    expect(getLocale('fr')).toBe('id');
  });

  test('localize', () => {
    expect(localize({ id: 'Halo', en: 'Hello' }, 'en')).toBe('Hello');
  });
});
