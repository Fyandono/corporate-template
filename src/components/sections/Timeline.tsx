import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export type Milestone = { year: number; title: string; description: string };

export type TimelineProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  eyebrow: string;
  title: string;
  milestones: Milestone[];
};

/** Sejarah perusahaan: tonggak berurutan pada satu garis waktu bertitik, dengan tahun besar. */
export default function Timeline({
  eyebrow,
  title,
  milestones,
  id,
  titleId = `${id ?? 'history'}-title`,
}: TimelineProps) {
  return (
    <Section id={id} tone="muted" spacing="compact" labelledBy={titleId}>
      <SectionHeading id={titleId} eyebrow={eyebrow} title={title} />
      <ol className="mt-14 grid gap-y-10 md:grid-cols-2 lg:grid-cols-4" data-reveal-group>
        {milestones.map((milestone) => (
          <li
            key={milestone.year}
            className="relative border-t border-primary-900/25 pt-8"
            data-reveal
          >
            <span
              className="absolute -top-1.5 left-0 size-3 rounded-full border border-primary-900 bg-neutral-50"
              aria-hidden="true"
            />
            <p className="font-serif text-title-lg font-light tracking-tight text-primary-900 tabular-nums">
              {milestone.year}
            </p>
            <h3 className="mt-4 pr-8 text-body-lg">{milestone.title}</h3>
            <p className="mt-2 pr-8 leading-relaxed text-neutral-600">{milestone.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
