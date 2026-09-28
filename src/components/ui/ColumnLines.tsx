import Container from './Container';

/** Kolom (0-based) yang diberi cahaya turun perlahan; jeda animasi diatur di global.css. */
const sweeps = new Set([2, 7, 10]);

/**
 * Garis kolom arsitektural (dekoratif) yang sejajar dengan grid konten 12 kolom,
 * dengan cahaya tipis yang turun perlahan di beberapa kolom (mati saat reduced-motion).
 * Letakkan sebagai anak section gelap yang `relative isolate`.
 */
export default function ColumnLines() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <Container className="column-lines">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i}>{sweeps.has(i) && <i className="column-sweep" />}</span>
        ))}
      </Container>
    </div>
  );
}
