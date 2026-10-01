import { cx } from '../cx';
import Eyebrow from './Eyebrow';

export type SectionHeadingProps = {
  eyebrow?: string;
  /** Nomor urut section, mis. "01". Tampil di depan eyebrow sebagai penanda editorial. */
  index?: string;
  title: string;
  lead?: string;
  /** `dark` untuk section berlatar `primary-950`. */
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  id?: string;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  tone = 'light',
  align = 'left',
  as: Tag = 'h2',
  id,
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark';
  return (
    <div
      className={cx('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}
      data-reveal
    >
      {(eyebrow || index) && (
        <Eyebrow
          index={index}
          tone={tone}
          className={cx('mb-6', align === 'center' && 'justify-center')}
        >
          {eyebrow}
        </Eyebrow>
      )}
      <Tag id={id} className={cx('text-headline font-normal', dark && 'text-white')}>
        {title}
      </Tag>
      {lead && (
        <p className={cx('mt-6 text-lead', dark ? 'text-primary-200' : 'text-neutral-600')}>
          {lead}
        </p>
      )}
    </div>
  );
}
