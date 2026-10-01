import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

import type { ResponsiveImage } from '../components/types';

export type { ResponsiveImage };

/**
 * Optimasi gambar Astro (resize + webp + srcset) lalu kembalikan atribut `<img>` polos.
 * SVG tidak di-resize (sudah vektor), jadi dikembalikan apa adanya.
 */
/** Lebar yang dibangkitkan untuk foto latar layar penuh (hero, section sinematik). */
export const backdropWidths = [640, 960, 1280, 1920, 2400];

/**
 * Foto latar full-bleed: dekoratif (`alt=""`), selebar layar. Kualitas diturunkan karena foto
 * tampil di bawah lapisan gelap + grain, sehingga artefak kompresi tidak terlihat.
 */
export const backdropImage = (src: ImageMetadata) =>
  responsiveImage(src, '', '100vw', backdropWidths, 60);

export async function responsiveImage(
  src: ImageMetadata,
  alt: string,
  sizes: string,
  widths = [400, 800],
  quality?: number,
): Promise<ResponsiveImage> {
  if (src.format === 'svg') return { src: src.src, alt, width: src.width, height: src.height };
  const img = await getImage({ src, widths, sizes, quality });
  return {
    src: img.src,
    alt,
    width: Number(img.attributes.width ?? src.width),
    height: Number(img.attributes.height ?? src.height),
    srcSet: img.srcSet.attribute || undefined,
    sizes,
  };
}
