import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

import type { ResponsiveImage } from '../components/types';

export type { ResponsiveImage };

/** Optimasi gambar Astro (resize + webp + srcset) lalu kembalikan atribut `<img>` polos. */
export async function responsiveImage(
  src: ImageMetadata,
  alt: string,
  sizes: string,
  widths = [400, 800],
): Promise<ResponsiveImage> {
  const img = await getImage({ src, widths, sizes });
  return {
    src: img.src,
    alt,
    width: Number(img.attributes.width ?? src.width),
    height: Number(img.attributes.height ?? src.height),
    srcSet: img.srcSet.attribute || undefined,
    sizes,
  };
}
