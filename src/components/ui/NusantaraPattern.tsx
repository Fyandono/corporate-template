import { useId } from 'react';
import { cx } from '../cx';

export type NusantaraPatternProps = {
  /** `dark` = garis putih tipis untuk section gelap; `light` = garis gelap sangat samar. */
  tone?: 'dark' | 'light';
  /** Arah pola memudar agar tidak bersaing dengan teks. */
  fade?: 'right' | 'left' | 'center';
  className?: string;
};

/**
 * Motif kawung (batik geometris klasik Jawa) sebagai latar dekoratif.
 * Empat kelopak diagonal bertemu di satu titik, berulang dalam kisi. Letakkan sebagai anak
 * section yang `relative isolate overflow-hidden`.
 */
export default function NusantaraPattern({
  tone = 'dark',
  fade = 'right',
  className,
}: NusantaraPatternProps) {
  const id = `kawung-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <svg
      className={cx(
        'pointer-events-none absolute inset-0 -z-10 size-full',
        tone === 'dark' ? 'text-white/10' : 'text-primary-900/5',
        fade === 'right' && 'pattern-fade-right',
        fade === 'left' && 'pattern-fade-left',
        fade === 'center' && 'pattern-fade-center',
        className,
      )}
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="72" height="72" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <ellipse cx="18" cy="18" rx="22" ry="9" transform="rotate(45 18 18)" />
            <ellipse cx="54" cy="18" rx="22" ry="9" transform="rotate(-45 54 18)" />
            <ellipse cx="18" cy="54" rx="22" ry="9" transform="rotate(-45 18 54)" />
            <ellipse cx="54" cy="54" rx="22" ry="9" transform="rotate(45 54 54)" />
            <circle cx="36" cy="36" r="3" />
            <circle cx="0" cy="0" r="3" />
            <circle cx="72" cy="0" r="3" />
            <circle cx="0" cy="72" r="3" />
            <circle cx="72" cy="72" r="3" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
