import { cx } from '../cx';

export type LogoProps = {
  /** Nama singkat perusahaan di samping monogram. */
  name: string;
  className?: string;
};

/**
 * Logo placeholder. Ganti dengan SVG logo klien (gunakan `currentColor` agar mengikuti warna teks induk).
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
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M11 29V11l9 11 9-11v18" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="20" cy="31" r="2" className="fill-accent-500" />
      </svg>
      <span className="text-body leading-tight font-bold tracking-tight">{name}</span>
    </span>
  );
}
