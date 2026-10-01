import type { ResponsiveImage } from '../types';
import { cx } from '../cx';

export type BusinessCardVariant = 'card' | 'featured' | 'compact';

export type BusinessCardProps = {
  title: string;
  summary: string;
  /** Uraian lebih panjang; hanya tampil pada varian `featured`. */
  description?: string;
  image: ResponsiveImage;
  /** Urutan (0-based), ditampilkan sebagai "01", "02", … */
  index: number;
  /** Jika ada, seluruh kartu menjadi link. */
  href?: string;
  /**
   * `card` = kartu potret dalam grid rata; `featured` = lini utama, foto besar + uraian;
   * `compact` = baris ringkas (foto kecil di kiri) untuk mendampingi `featured`.
   */
  variant?: BusinessCardVariant;
  className?: string;
};

const frames: Record<BusinessCardVariant, string> = {
  card: 'aspect-landscape sm:aspect-card',
  featured: 'aspect-landscape',
  compact: 'aspect-landscape',
};

function Arrow() {
  return (
    <svg
      className="size-4 text-primary-900 transition-transform duration-300 group-hover:translate-x-1"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Kartu lini bisnis bergaya editorial: foto, garis rambut, nomor urut. */
export default function BusinessCard({
  title,
  summary,
  description,
  image,
  index,
  href,
  variant = 'card',
  className,
}: BusinessCardProps) {
  const Tag = href ? 'a' : 'article';
  const number = String(index + 1).padStart(2, '0');
  const photo = (
    <div className={cx('relative overflow-hidden rounded-card bg-neutral-100', frames[variant])}>
      <img
        {...image}
        loading="lazy"
        decoding="async"
        className="size-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      {/* Vignette bawah + grain agar foto beragam warna tetap serasi. */}
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary-950/50 to-transparent"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 grain" aria-hidden="true" />
    </div>
  );

  if (variant === 'compact') {
    return (
      <Tag
        href={href}
        className={cx('group grid grid-cols-5 items-start gap-6 py-7', className)}
        data-reveal
      >
        <div className="col-span-2">{photo}</div>
        <div className="col-span-3">
          <div className="flex items-center justify-between">
            <p className="text-eyebrow font-semibold text-accent-700 tabular-nums">{number}</p>
            {href && <Arrow />}
          </div>
          <h3 className="mt-3 text-title-sm font-normal tracking-tight">{title}</h3>
          <p className="mt-2 text-small leading-relaxed text-neutral-600">{summary}</p>
        </div>
      </Tag>
    );
  }

  const featured = variant === 'featured';
  return (
    <Tag href={href} className={cx('group flex flex-col', className)} data-reveal>
      {photo}
      <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-5">
        <p className="text-eyebrow font-semibold text-accent-700 tabular-nums">{number}</p>
        {href && <Arrow />}
      </div>
      {featured ? (
        <div className="mt-5 grid gap-x-10 gap-y-4 md:grid-cols-5">
          <h3 className="font-serif text-title-lg font-light tracking-tight md:col-span-2">
            {title}
          </h3>
          <div className="md:col-span-3">
            <p className="text-body-lg text-primary-900">{summary}</p>
            {description && <p className="mt-3 leading-relaxed text-neutral-600">{description}</p>}
          </div>
        </div>
      ) : (
        <>
          <h3 className="mt-4 text-title font-normal tracking-tight">{title}</h3>
          <p className="mt-3 leading-relaxed text-neutral-600">{summary}</p>
        </>
      )}
    </Tag>
  );
}
