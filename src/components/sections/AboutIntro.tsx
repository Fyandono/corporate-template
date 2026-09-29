import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export type AboutIntroProps = {
  /** Nomor urut section, mis. "01". */
  index?: string;
  eyebrow: string;
  title: string;
  /** Paragraf pembuka besar. */
  lead: string;
  /** Paragraf profil lanjutan. */
  body?: string[];
  /** id judul (untuk `aria-labelledby`). */
  titleId?: string;
};

/** Pembuka profil perusahaan: judul besar di kiri, lead + paragraf di kanan. */
export default function AboutIntro({
  index,
  eyebrow,
  title,
  lead,
  body = [],
  titleId = 'about-title',
}: AboutIntroProps) {
  return (
    <Section
      labelledBy={titleId}
      spacing="none"
      containerClassName="grid gap-12 pt-section pb-section-compact md:pt-section-lg md:pb-section-compact-lg lg:grid-cols-12"
    >
      <SectionHeading
        id={titleId}
        index={index}
        eyebrow={eyebrow}
        title={title}
        className="lg:col-span-7"
      />
      <div className="space-y-5 lg:col-span-4 lg:col-start-9 lg:pt-16" data-reveal>
        <p className="text-lead text-neutral-600">{lead}</p>
        {body.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed text-neutral-600">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
