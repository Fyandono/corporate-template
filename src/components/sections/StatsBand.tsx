import Container from '../ui/Container';
import Eyebrow from '../ui/Eyebrow';

export type Stat = { value: number; label: string; suffix?: string };

export type StatsBandProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  /** Judul section, tampil sebagai label kecil ala laporan tahunan. */
  title: string;
  stats: Stat[];
  /** Locale BCP 47 untuk format angka, mis. "id" atau "en". */
  locale: string;
  /** Catatan sumber/periode data, mis. "Data per 31 Desember 2025". */
  note?: string;
};

/**
 * Angka kunci bergaya laporan tahunan: angka serif sangat besar, kolom dipisah garis rambut,
 * catatan sumber data. Angka berhitung naik lewat `data-counter` (src/scripts/animations.ts).
 */
export default function StatsBand({
  title,
  stats,
  locale,
  note,
  id,
  titleId = `${id ?? 'stats'}-title`,
}: StatsBandProps) {
  const format = new Intl.NumberFormat(locale);
  return (
    <section id={id} aria-labelledby={titleId} className="bg-white">
      <Container className="pb-section md:pb-section-lg">
        <div className="flex flex-col gap-3 border-t border-primary-900 pt-5 sm:flex-row sm:items-baseline sm:justify-between">
          <Eyebrow as="h2" id={titleId} tone="strong" rule={false}>
            {title}
          </Eyebrow>
          {note && <p className="text-caption text-neutral-500">{note}</p>}
        </div>
        <dl
          className="mt-12 grid grid-cols-2 gap-y-14 lg:grid-cols-4 lg:divide-x lg:divide-neutral-200"
          data-reveal-group
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col pr-6 lg:px-8 lg:first:pl-0" data-reveal>
              <dt className="mt-5 max-w-48 text-small leading-snug text-neutral-600">
                <span className="mr-2 text-accent-700 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {stat.label}
              </dt>
              <dd className="-order-1 font-serif text-figure font-light tracking-tight text-primary-900 tabular-nums md:text-figure-lg">
                <span data-counter={stat.value}>{format.format(stat.value)}</span>
                {stat.suffix && <span className="text-accent-600">{stat.suffix}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
