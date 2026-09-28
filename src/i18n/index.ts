import { defaultLocale, locales, type Locale, type LocalizedString } from './config';
import en from './en.json';
import id from './id.json';

export * from './config';

/** Bentuk kamus mengikuti id.json; en.json wajib punya key yang sama (dicek oleh TypeScript). */
export type Dictionary = typeof id;
const dictionaries: Record<Locale, Dictionary> = { id, en };

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export function getLocale(param: string | undefined): Locale {
  return isLocale(param) ? param : defaultLocale;
}

export function t(lang: Locale): Dictionary {
  return dictionaries[lang];
}

export function localize(value: LocalizedString, lang: Locale): string {
  return value[lang];
}

/** `localizedPath('en', '/about')` → `/en/about`; `localizedPath('id', '/')` → `/id`. */
export function localizedPath(lang: Locale, path = '/'): string {
  const clean = path === '/' ? '' : `/${path.replace(/^\/+|\/+$/g, '')}`;
  return `/${lang}${clean}`;
}

/** Path tanpa prefix bahasa dan ekstensi: `/en/about.html` → `/about`. */
export function stripLocale(pathname: string): string {
  const [, maybeLang, ...rest] = pathname.replace(/\.html$/, '').split('/');
  if (!isLocale(maybeLang)) return pathname;
  return `/${rest.join('/')}`;
}

/** getStaticPaths untuk halaman yang dibangun di semua bahasa. */
export function getLangPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

export function formatDate(date: Date, lang: Locale): string {
  return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
