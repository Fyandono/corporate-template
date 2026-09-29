import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export type ValueItem = { title: string; description: string };

export type ValuesGridProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  eyebrow: string;
  title: string;
  values: ValueItem[];
};

/** Nilai perusahaan (mis. AKHLAK) dalam grid berbatas garis rambut. */
export default function ValuesGrid({
  eyebrow,
  title,
  values,
  id,
  titleId = `${id ?? 'values'}-title`,
}: ValuesGridProps) {
  return (
    <Section id={id} spacing="compact" labelledBy={titleId}>
      <SectionHeading id={titleId} eyebrow={eyebrow} title={title} />
      <ul
        className="mt-12 grid gap-px overflow-hidden rounded-card border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3"
        data-reveal-group
      >
        {values.map((value) => (
          <li key={value.title} className="bg-white p-8" data-reveal>
            <h3 className="text-title-sm">{value.title}</h3>
            <p className="mt-3 leading-relaxed text-neutral-600">{value.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
