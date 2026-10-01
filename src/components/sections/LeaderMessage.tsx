import type { ResponsiveImage } from '../types';
import { cx } from '../cx';
import Eyebrow from '../ui/Eyebrow';

export type LeaderMessageProps = {
  /** Label, mis. "Sambutan Direktur Utama". */
  eyebrow: string;
  /** Kutipan sambutan, satu–dua kalimat. */
  quote: string;
  name: string;
  position: string;
  /** Foto potret; `alt` = nama. */
  photo: ResponsiveImage;
  className?: string;
};

/**
 * Sambutan pimpinan: kutipan serif besar dengan tanda kutip sebagai aksen, ditutup "tanda tangan"
 * berupa foto kecil, nama, dan jabatan. Blok (bukan section) — letakkan di dalam `Section`.
 */
export default function LeaderMessage({
  eyebrow,
  quote,
  name,
  position,
  photo,
  className,
}: LeaderMessageProps) {
  return (
    <figure className={cx('grid gap-x-8 gap-y-8 lg:grid-cols-12', className)} data-reveal>
      <div className="lg:col-span-3">
        <Eyebrow as="span" tone="strong" rule={false}>
          {eyebrow}
        </Eyebrow>
        <span
          className="mt-8 hidden font-serif text-figure-lg leading-none font-light text-accent-600 lg:block"
          aria-hidden="true"
        >
          “
        </span>
      </div>
      <div className="lg:col-span-9">
        <blockquote className="font-serif text-statement font-light text-balance text-primary-900">
          <p>{quote}</p>
        </blockquote>
        <figcaption className="mt-10 flex items-center gap-5 border-t border-neutral-200 pt-6">
          <div className="size-16 shrink-0 overflow-hidden rounded-card bg-neutral-100">
            <img
              {...photo}
              alt=""
              loading="lazy"
              decoding="async"
              className="size-full object-cover object-top"
            />
          </div>
          <div>
            <p className="text-body-lg font-medium text-primary-900">{name}</p>
            <p className="mt-1 text-small font-medium text-primary-500">{position}</p>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}
