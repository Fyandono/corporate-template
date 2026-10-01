import { cx } from '../cx';
import Button from '../ui/Button';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import NewsCard, { type NewsCardProps } from './NewsCard';

export type NewsSectionProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  index?: string;
  eyebrow?: string;
  /** Judul section. Kosongkan di halaman yang sudah punya `PageHero` berjudul sama. */
  title?: string;
  /** Link ke halaman daftar lengkap, tampil di kanan judul (untuk cuplikan di beranda). */
  action?: { label: string; href: string };
  cards: NewsCardProps[];
  /** Teks saat belum ada berita. */
  emptyLabel: string;
};

/** Berita terbaru dalam grid tiga kolom. */
export default function NewsSection({
  id,
  titleId = `${id ?? 'news'}-title`,
  index,
  eyebrow,
  title,
  action,
  cards,
  emptyLabel,
}: NewsSectionProps) {
  return (
    <Section id={id} labelledBy={title ? titleId : undefined}>
      {title && (
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading id={titleId} index={index} eyebrow={eyebrow} title={title} />
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
      {cards.length === 0 ? (
        <p className={cx('text-neutral-600', title && 'mt-10')}>{emptyLabel}</p>
      ) : (
        <div
          className={cx('grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3', title && 'mt-16')}
          data-reveal-group
        >
          {cards.map((card) => (
            <NewsCard key={card.title} {...card} />
          ))}
        </div>
      )}
    </Section>
  );
}
