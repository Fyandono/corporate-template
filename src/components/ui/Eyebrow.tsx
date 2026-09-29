import type { ReactNode } from 'react';
import { cx } from '../cx';

export type EyebrowTone = 'light' | 'strong' | 'dark';

const tones: Record<EyebrowTone, string> = {
  light: 'text-primary-500',
  strong: 'text-primary-900',
  dark: 'text-accent-400',
};

export type EyebrowProps = {
  children: ReactNode;
  /** Nomor urut section, mis. "01". Tampil di depan garis. */
  index?: string;
  /** `light` (abu) dan `strong` (gelap) untuk latar terang; `dark` untuk latar `primary-950`. */
  tone?: EyebrowTone;
  /** Garis rambut pendek sebelum teks. */
  rule?: boolean;
  /** Elemen HTML; pakai `h2`/`h3` bila label ini sekaligus judul (mis. "Visi", "Direksi"). */
  as?: 'p' | 'h2' | 'h3' | 'figcaption' | 'span';
  id?: string;
  className?: string;
};

/** Label kecil huruf kapital berjarak lebar — penanda editorial di atas judul/section. */
export default function Eyebrow({
  children,
  index,
  tone = 'light',
  rule = true,
  as: Tag = 'p',
  id,
  className,
}: EyebrowProps) {
  const dark = tone === 'dark';
  return (
    <Tag
      id={id}
      className={cx(
        'flex items-center gap-4 font-sans text-eyebrow font-semibold uppercase',
        tones[tone],
        className,
      )}
    >
      {index && (
        <span className={cx('tabular-nums', dark ? 'text-white' : 'text-primary-900')}>
          {index}
        </span>
      )}
      {rule && <span className="h-px w-10 bg-current opacity-50" aria-hidden="true" />}
      {children}
    </Tag>
  );
}
