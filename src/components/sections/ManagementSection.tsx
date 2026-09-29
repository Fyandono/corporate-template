import Eyebrow from '../ui/Eyebrow';
import PersonCard, { type PersonCardProps } from '../ui/PersonCard';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export type ManagementGroup = {
  /** Nama kelompok, mis. "Dewan Komisaris". */
  title: string;
  people: Omit<PersonCardProps, 'as' | 'viewProfileLabel'>[];
};

export type ManagementSectionProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  index?: string;
  eyebrow: string;
  title: string;
  groups: ManagementGroup[];
  viewProfileLabel: string;
};

/** Dewan Komisaris & Direksi, dikelompokkan dengan label bergaris. */
export default function ManagementSection({
  id,
  titleId = `${id ?? 'management'}-title`,
  index,
  eyebrow,
  title,
  groups,
  viewProfileLabel,
}: ManagementSectionProps) {
  return (
    <Section id={id} labelledBy={titleId}>
      <SectionHeading id={titleId} index={index} eyebrow={eyebrow} title={title} />
      {groups.map((group) => (
        <div key={group.title} className="mt-16">
          <Eyebrow as="h3" tone="strong" rule={false} className="border-t border-primary-900 pt-5">
            {group.title}
          </Eyebrow>
          <ul
            className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
            data-reveal-group
          >
            {group.people.map((person) => (
              <li key={person.name}>
                <PersonCard {...person} as="h4" viewProfileLabel={viewProfileLabel} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Section>
  );
}
