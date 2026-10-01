import { cx } from '../cx';

export type GrainProps = { className?: string };

/**
 * Grain film halus (dekoratif, statis) agar section gelap dan foto tidak terasa datar.
 * Letakkan sebagai anak section yang `relative isolate overflow-hidden`.
 */
export default function Grain({ className }: GrainProps) {
  return (
    <div
      className={cx('pointer-events-none absolute inset-0 -z-10 grain', className)}
      aria-hidden="true"
    />
  );
}
