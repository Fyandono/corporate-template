import { cx } from '../cx';

export type LogoProps = {
  /** Nama singkat perusahaan di samping logo. */
  name: string;
  className?: string;
};

/**
 * Logo placeholder: kotak kosong bersudut membulat sebagai penanda tempat logo. Ganti dengan
 * SVG logo klien (gunakan `currentColor` agar mengikuti warna teks induk).
 */
export default function Logo({ name, className }: LogoProps) {
  return (
    <span className={cx('inline-flex items-center gap-3', className)}>
      <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden="true">
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <span className="text-body leading-tight font-bold tracking-tight">{name}</span>
    </span>
  );
}
