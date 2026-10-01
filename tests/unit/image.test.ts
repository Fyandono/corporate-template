import { beforeEach, describe, expect, test, vi } from 'vitest';

const getImage = vi.hoisted(() => vi.fn());
vi.mock('astro:assets', () => ({ getImage }));

const { backdropImage, backdropWidths, responsiveImage } = await import('../../src/lib/image');

const meta = (format: string) =>
  ({ src: `/_astro/foto.${format}`, width: 1200, height: 800, format }) as never;

describe('responsiveImage', () => {
  beforeEach(() => getImage.mockReset());

  test('SVG dikembalikan apa adanya tanpa diproses', async () => {
    expect(await responsiveImage(meta('svg'), 'Peta', '100vw')).toEqual({
      src: '/_astro/foto.svg',
      alt: 'Peta',
      width: 1200,
      height: 800,
    });
    expect(getImage).not.toHaveBeenCalled();
  });

  test('gambar raster dioptimasi dengan widths & sizes', async () => {
    getImage.mockResolvedValue({
      src: '/_astro/foto_400.webp',
      attributes: { width: 400, height: 267 },
      srcSet: { attribute: '/a.webp 400w, /b.webp 800w' },
    });
    const img = await responsiveImage(meta('jpg'), 'Foto', '50vw', [400, 800]);
    expect(getImage).toHaveBeenCalledWith(expect.objectContaining({ widths: [400, 800] }));
    expect(img).toEqual({
      src: '/_astro/foto_400.webp',
      alt: 'Foto',
      width: 400,
      height: 267,
      srcSet: '/a.webp 400w, /b.webp 800w',
      sizes: '50vw',
    });
  });

  test('backdropImage: dekoratif, selebar layar, kualitas diturunkan', async () => {
    getImage.mockResolvedValue({
      src: '/_astro/foto_2400.webp',
      attributes: { width: 2400, height: 1600 },
      srcSet: { attribute: '/a.webp 640w' },
    });
    const img = await backdropImage(meta('jpg'));
    expect(getImage).toHaveBeenCalledWith(
      expect.objectContaining({ widths: backdropWidths, sizes: '100vw', quality: 60 }),
    );
    expect(img.alt).toBe('');
  });
});
