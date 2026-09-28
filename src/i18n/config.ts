export const locales = ['id', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'id';

export const localeMeta: Record<Locale, { label: string; name: string; ogLocale: string }> = {
  id: { label: 'ID', name: 'Bahasa Indonesia', ogLocale: 'id_ID' },
  en: { label: 'EN', name: 'English', ogLocale: 'en_US' },
};

/** Teks dwibahasa untuk data konten (site.ts, collections). */
export type LocalizedString = Record<Locale, string>;
