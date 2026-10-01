import Button from '../ui/Button';
import ColumnLines from '../ui/ColumnLines';
import PhotoFigure, { type PhotoFigureProps } from '../ui/PhotoFigure';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export type AboutIntroProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  /** Nomor urut section, mis. "01". */
  index?: string;
  eyebrow: string;
  title: string;
  /** Paragraf pembuka besar. */
  lead: string;
  /** Paragraf profil lanjutan. */
  body?: string[];
  /** Link "selengkapnya" di bawah paragraf, mis. dari beranda ke halaman Tentang Kami. */
  action?: { label: string; href: string };
  /** Foto lebar di bawah teks profil, dengan keterangan lokasi. */
  figure?: Pick<PhotoFigureProps, 'image' | 'caption' | 'label'>;
};

/** Pembuka profil perusahaan: judul besar di kiri, lead + paragraf di kanan, foto lebar di bawah. */
export default function AboutIntro({
  index,
  eyebrow,
  title,
  lead,
  body = [],
  action,
  figure,
  id,
  titleId = `${id ?? 'about'}-title`,
}: AboutIntroProps) {
  return (
    <Section
      id={id}
      labelledBy={titleId}
      spacing="none"
      className="relative isolate overflow-hidden"
      containerClassName="grid gap-12 pt-section pb-section-compact md:pt-section-lg md:pb-section-compact-lg lg:grid-cols-12"
    >
      <ColumnLines tone="light" />
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
        {action && (
          <Button href={action.href} variant="secondary" className="mt-5">
            {action.label}
          </Button>
        )}
      </div>
      {figure && <PhotoFigure {...figure} ratio="panorama" className="lg:col-span-12 lg:mt-8" />}
    </Section>
  );
}
