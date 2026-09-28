import type { LocalizedString } from '../i18n/config';

/**
 * Identitas & pengaturan klien. Ubah file ini saat memakai template untuk BUMN baru.
 * Lihat docs/BRANDING.md.
 */
export const site = {
  legalName: 'PT Nama Perusahaan (Persero)',
  shortName: 'Nama Perusahaan',
  foundingYear: 1975,

  tagline: {
    id: 'Menggerakkan pembangunan untuk Indonesia yang berdaulat',
    en: 'Driving development for a sovereign Indonesia',
  } satisfies LocalizedString,

  contact: {
    address: {
      street: 'Gedung Kantor Pusat, Jl. Jend. Sudirman Kav. 1',
      city: 'Jakarta Pusat',
      region: 'DKI Jakarta',
      postalCode: '10220',
      country: 'ID',
    },
    phone: '+62 21 000 0000',
    email: 'info@example.co.id',
    hours: {
      id: 'Senin – Jumat, 08.00 – 17.00 WIB',
      en: 'Monday – Friday, 08:00 – 17:00 WIB (UTC+7)',
    } satisfies LocalizedString,
    mapsUrl: 'https://maps.google.com/?q=Monas+Jakarta',
  },

  social: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/' },
    { name: 'Instagram', url: 'https://www.instagram.com/' },
    { name: 'YouTube', url: 'https://www.youtube.com/' },
    { name: 'X', url: 'https://x.com/' },
  ],

  /** Angka kunci di beranda. `value` berupa angka agar bisa dianimasikan. */
  stats: [
    {
      value: 50,
      suffix: { id: '+', en: '+' },
      label: { id: 'Tahun melayani negeri', en: 'Years serving the nation' },
    },
    { value: 34, label: { id: 'Provinsi jangkauan operasi', en: 'Provinces of operation' } },
    { value: 12, label: { id: 'Anak perusahaan', en: 'Subsidiaries' } },
    {
      value: 25,
      suffix: { id: 'rb+', en: 'k+' },
      label: { id: 'Insan perusahaan', en: 'Employees' },
    },
  ] as { value: number; suffix?: LocalizedString; label: LocalizedString }[],

  /** Modul opsional. Modul nonaktif tidak dibangun dan tidak tampil di navigasi/sitemap. */
  features: {
    governance: true,
    sustainability: true,
    news: false,
    businessDetailPages: false,
  },
} as const;

export type FeatureKey = keyof typeof site.features;
