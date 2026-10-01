import type { ResponsiveImage } from '../types';

export type PersonCardProps = {
  name: string;
  position: string;
  bio: string;
  /** Foto potret 3:4; `alt` = nama. */
  photo: ResponsiveImage;
  /** Label tombol buka/tutup bio, mis. "Lihat profil". */
  viewProfileLabel: string;
  /** Level heading nama, mengikuti hierarki section. */
  as?: 'h3' | 'h4';
};

/** Kartu profil (komisaris/direksi): foto potret, nama, jabatan, bio dalam `<details>`. */
export default function PersonCard({
  name,
  position,
  bio,
  photo,
  viewProfileLabel,
  as: Heading = 'h3',
}: PersonCardProps) {
  return (
    <article data-reveal>
      <div className="aspect-portrait overflow-hidden rounded-card bg-neutral-100">
        <img {...photo} loading="lazy" decoding="async" className="size-full object-cover" />
      </div>
      <Heading className="mt-5 text-body-lg">{name}</Heading>
      <p className="mt-1 text-small font-medium text-primary-500">{position}</p>
      <details className="group mt-3">
        <summary className="inline-flex cursor-pointer items-center gap-1 text-small font-semibold text-primary-700">
          {viewProfileLabel}
          <svg
            viewBox="0 0 16 16"
            className="size-4 transition-transform group-open:rotate-180"
            fill="none"
            aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </summary>
        <p className="mt-3 text-small leading-relaxed text-neutral-600">{bio}</p>
      </details>
    </article>
  );
}
