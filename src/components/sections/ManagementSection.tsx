import { cx } from '../cx';
import Eyebrow from '../ui/Eyebrow';
import PersonCard, { type PersonCardProps } from '../ui/PersonCard';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import LeaderMessage, { type LeaderMessageProps } from './LeaderMessage';

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
  eyebrow?: string;
  /** Judul section. Kosongkan di halaman yang sudah punya `PageHero` berjudul sama. */
  title?: string;
  groups: ManagementGroup[];
  viewProfileLabel: string;
  /** Sambutan pimpinan (kutipan besar) di antara judul dan daftar pengurus. */
  message?: Omit<LeaderMessageProps, 'className'>;
};

/** Sambutan pimpinan, lalu Dewan Komisaris & Direksi yang dikelompokkan dengan label bergaris. */
export default function ManagementSection({
  id,
  titleId = `${id ?? 'management'}-title`,
  index,
  eyebrow,
  title,
  groups,
  viewProfileLabel,
  message,
}: ManagementSectionProps) {
  return (
    <Section id={id} labelledBy={title ? titleId : undefined}>
      {title && <SectionHeading id={titleId} index={index} eyebrow={eyebrow} title={title} />}
      {message && (
        <LeaderMessage
          {...message}
          className={cx('border-t border-primary-900 pt-10', title && 'mt-16 md:mt-20')}
        />
      )}
      {groups.map((group, i) => (
        <div key={group.title} className={cx((title || message || i > 0) && 'mt-16 md:mt-20')}>
          <Eyebrow
            as={title ? 'h3' : 'h2'}
            tone="strong"
            rule={false}
            className="border-t border-primary-900 pt-5"
          >
            {group.title}
          </Eyebrow>
          <ul
            className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
            data-reveal-group
          >
            {group.people.map((person) => (
              <li key={person.name}>
                <PersonCard
                  {...person}
                  as={title ? 'h4' : 'h3'}
                  viewProfileLabel={viewProfileLabel}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Section>
  );
}
