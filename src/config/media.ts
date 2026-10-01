import type { ImageMetadata } from 'astro';
import nusantaraMap from '../assets/graphics/nusantara-map.svg';
import archipelago from '../assets/photos/archipelago.jpg';
import hero from '../assets/photos/hero.jpg';
import highlands from '../assets/photos/highlands.jpg';
import type { LocalizedString } from '../i18n/config';

export type Photo = {
  image: ImageMetadata;
  /** Keterangan lokasi yang tampil di samping/bawah foto. */
  caption?: LocalizedString;
  /** Teks alternatif; wajib untuk foto informatif (bukan latar dekoratif). */
  alt?: LocalizedString;
};

/**
 * Foto & grafis section beranda. Ganti file di src/assets/photos/ dengan foto klien
 * (lihat docs/BRANDING.md §6); hapus satu entri untuk kembali ke latar tanpa foto.
 * Foto lini bisnis dan section teks diatur di kontennya masing-masing (src/content/).
 */
export const media: { hero?: Photo; about?: Photo; vision?: Photo; map?: Photo } = {
  /** Latar hero, layar penuh. Pilih foto yang gelap/tenang di sisi kiri-bawah (tempat judul). */
  hero: {
    image: hero,
    caption: { id: 'Gunung Bromo, Jawa Timur', en: 'Mount Bromo, East Java' },
  },
  /** Foto lebar di bawah profil perusahaan. */
  about: {
    image: archipelago,
    caption: { id: 'Misool, Raja Ampat', en: 'Misool, Raja Ampat' },
    alt: {
      id: 'Gugusan pulau karst berhutan di laut biru Raja Ampat, dilihat dari udara',
      en: 'Forested karst islands in the blue sea of Raja Ampat, seen from the air',
    },
  },
  /** Latar section Visi & Misi. */
  vision: { image: highlands },
  /** Peta titik Nusantara di belakang angka kunci. */
  map: { image: nusantaraMap },
};
