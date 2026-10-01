import { cx } from '../cx';
import Button from '../ui/Button';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import BusinessCard, { type BusinessCardProps } from './BusinessCard';

export type BusinessLayout = 'featured' | 'grid';

export type BusinessSectionProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  index?: string;
  eyebrow?: string;
  /** Judul section. Kosongkan di halaman yang sudah punya `PageHero` berjudul sama. */
  title?: string;
  lead?: string;
  /** Link ke halaman daftar lengkap, tampil di kanan judul (untuk cuplikan di beranda). */
  action?: { label: string; href: string };
  cards: Omit<BusinessCardProps, 'variant' | 'className'>[];
  /**
   * `featured` (default): lini pertama tampil besar di kiri, sisanya baris ringkas di kanan —
   * cocok untuk 3–4 lini. `grid`: semua kartu sama besar, untuk portofolio yang lebih banyak.
   */
  layout?: BusinessLayout;
};

/** Lini bisnis / portofolio: satu lini utama + daftar ringkas, atau grid rata. */
export default function BusinessSection({
  id,
  titleId = `${id ?? 'business'}-title`,
  index,
  eyebrow,
  title,
  lead,
  action,
  cards,
  layout = 'featured',
}: BusinessSectionProps) {
  const [first, ...rest] = cards;
  const top = title ? 'mt-16' : undefined;
  return (
    <Section id={id} tone="muted" labelledBy={title ? titleId : undefined}>
      {title && (
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading id={titleId} index={index} eyebrow={eyebrow} title={title} lead={lead} />
          {action && (
            <Button
              href={action.href}
              variant="secondary"
              className="shrink-0 self-start md:self-auto"
            >
              {action.label}
            </Button>
          )}
        </div>
      )}
      {layout === 'featured' && first ? (
        <div className={cx('grid gap-x-16 gap-y-10 lg:grid-cols-12', top)} data-reveal-group>
          <BusinessCard {...first} variant="featured" className="lg:col-span-7" />
          <div className="divide-y divide-neutral-200 border-y border-neutral-200 lg:col-span-5 lg:self-start">
            {rest.map((card) => (
              <BusinessCard key={card.title} {...card} variant="compact" />
            ))}
          </div>
        </div>
      ) : (
        <div
          className={cx('grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4', top)}
          data-reveal-group
        >
          {cards.map((card) => (
            <BusinessCard key={card.title} {...card} />
          ))}
        </div>
      )}
    </Section>
  );
}
