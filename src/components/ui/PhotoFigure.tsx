import type { ResponsiveImage } from '../types';
import { cx } from '../cx';

export type PhotoFigureRatio = 'panorama' | 'landscape' | 'card';

const ratios: Record<PhotoFigureRatio, string> = {
  panorama: 'aspect-landscape md:aspect-panorama',
  landscape: 'aspect-landscape',
  card: 'aspect-landscape lg:aspect-card',
};

export type PhotoFigureProps = {
  image: ResponsiveImage;
  /** Keterangan singkat, biasanya lokasi: "Misool, Raja Ampat". */
  caption?: string;
  /** Label kecil di kanan keterangan, mis. nomor gambar "01". */
  label?: string;
  ratio?: PhotoFigureRatio;
  className?: string;
};

/**
 * Foto editorial: bingkai bersudut tegas dengan tanda sudut (crop mark) tipis dan keterangan
 * lokasi bergaya label di bawah garis rambut.
 */
export default function PhotoFigure({
  image,
  caption,
  label,
  ratio = 'landscape',
  className,
}: PhotoFigureProps) {
  return (
    <figure className={className} data-reveal>
      <div className="relative">
        <div className={cx('overflow-hidden rounded-card bg-neutral-100', ratios[ratio])}>
          <img {...image} loading="lazy" decoding="async" className="size-full object-cover" />
        </div>
        <span
          className="absolute -top-2 -left-2 size-4 border-t border-l border-primary-900/40"
          aria-hidden="true"
        />
        <span
          className="absolute -right-2 -bottom-2 size-4 border-r border-b border-primary-900/40"
          aria-hidden="true"
        />
      </div>
      {(caption || label) && (
        <figcaption className="mt-5 flex items-center justify-between gap-6 text-eyebrow font-semibold text-primary-500 uppercase">
          <span className="flex items-center gap-4">
            <span className="h-px w-10 bg-current opacity-50" aria-hidden="true" />
            {caption}
          </span>
          {label && <span className="text-primary-900 tabular-nums">{label}</span>}
        </figcaption>
      )}
    </figure>
  );
}
