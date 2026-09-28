import type { ResponsiveImage } from '../types';

export type NewsCardProps = {
  title: string;
  description: string;
  cover: ResponsiveImage;
  /** Tanggal ISO untuk atribut `datetime`. */
  dateTime: string;
  /** Tanggal yang sudah diformat sesuai bahasa, mis. "12 Maret 2026". */
  dateLabel: string;
  href: string;
};

export default function NewsCard({
  title,
  description,
  cover,
  dateTime,
  dateLabel,
  href,
}: NewsCardProps) {
  return (
    <article className="group relative flex flex-col" data-reveal>
      <div className="aspect-[3/2] overflow-hidden rounded-card bg-neutral-100">
        <img
          {...cover}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </div>
      <time
        dateTime={dateTime}
        className="mt-6 border-t border-neutral-200 pt-5 text-eyebrow font-semibold text-neutral-500 uppercase"
      >
        {dateLabel}
      </time>
      <h3 className="mt-4 text-2xl font-normal tracking-tight">
        <a
          href={href}
          className="underline-offset-4 group-hover:underline after:absolute after:inset-0"
        >
          {title}
        </a>
      </h3>
      <p className="mt-3 leading-relaxed text-neutral-600">{description}</p>
    </article>
  );
}
