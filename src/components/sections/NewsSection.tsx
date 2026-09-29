import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import NewsCard, { type NewsCardProps } from './NewsCard';

export type NewsSectionProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  index?: string;
  eyebrow: string;
  title: string;
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
  cards,
  emptyLabel,
}: NewsSectionProps) {
  return (
    <Section id={id} labelledBy={titleId}>
      <SectionHeading id={titleId} index={index} eyebrow={eyebrow} title={title} />
      {cards.length === 0 ? (
        <p className="mt-10 text-neutral-600">{emptyLabel}</p>
      ) : (
        <div
          className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
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
