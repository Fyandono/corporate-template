import type { ResponsiveImage } from '../types';

export type BusinessCardProps = {
  title: string;
  summary: string;
  image: ResponsiveImage;
  /** Urutan (0-based), ditampilkan sebagai "01", "02", … */
  index: number;
  /** Jika ada, seluruh kartu menjadi link. */
  href?: string;
};

/** Kartu lini bisnis bergaya editorial: gambar potret, garis rambut, nomor urut. */
export default function BusinessCard({ title, summary, image, index, href }: BusinessCardProps) {
  const Tag = href ? 'a' : 'article';
  return (
    <Tag href={href} className="group flex flex-col" data-reveal>
      <div className="aspect-landscape overflow-hidden rounded-card bg-neutral-100 sm:aspect-card">
        <img
          {...image}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-5">
        <p className="text-eyebrow font-semibold text-accent-700 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </p>
        {href && (
          <svg
            className="size-4 text-primary-900 transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
      <h3 className="mt-4 text-title font-normal tracking-tight">{title}</h3>
      <p className="mt-3 leading-relaxed text-neutral-600">{summary}</p>
    </Tag>
  );
}
