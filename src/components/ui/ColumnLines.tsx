import { cx } from '../cx';
import Container from './Container';

/** Kolom (0-based) yang diberi cahaya turun perlahan; jeda animasi diatur di global.css. */
const sweeps = new Set([2, 7, 10]);

export type ColumnLinesProps = {
  /** `dark` = garis putih tipis untuk section gelap; `light` = garis gelap sangat samar. */
  tone?: 'dark' | 'light';
  className?: string;
};

/**
 * Garis kolom arsitektural (dekoratif) yang sejajar dengan grid konten 12 kolom,
 * dengan cahaya tipis yang turun perlahan di beberapa kolom (mati saat reduced-motion).
 * Letakkan sebagai anak section yang `relative isolate`.
 */
export default function ColumnLines({ tone = 'dark', className }: ColumnLinesProps) {
  const dark = tone === 'dark';
  return (
    <div
      className={cx(
        'pointer-events-none absolute inset-0 -z-10',
        dark ? 'text-white/10' : 'text-primary-900/5',
        className,
      )}
      aria-hidden="true"
    >
      <Container className="column-lines">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i}>
            {sweeps.has(i) && (
              <i className={cx('column-sweep', dark ? 'text-white/45' : 'text-primary-900/25')} />
            )}
          </span>
        ))}
      </Container>
    </div>
  );
}
