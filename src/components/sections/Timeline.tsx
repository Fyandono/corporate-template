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

/** Sejarah perusahaan: tonggak berurutan dengan tahun besar dan garis aksen. */
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
      <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4" data-reveal-group>
        {milestones.map((milestone) => (
          <li
            key={milestone.year}
            className="relative border-t-2 border-accent-500 pt-6"
            data-reveal
          >
            <p className="text-title-lg font-semibold tracking-tight text-primary-900">
              {milestone.year}
            </p>
            <h3 className="mt-4 text-body-lg">{milestone.title}</h3>
            <p className="mt-2 leading-relaxed text-neutral-600">{milestone.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
