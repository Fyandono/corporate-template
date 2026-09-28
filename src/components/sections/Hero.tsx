import Button from '../ui/Button';
import ColumnLines from '../ui/ColumnLines';
import Container from '../ui/Container';
import NusantaraPattern from '../ui/NusantaraPattern';

type Action = { label: string; href: string };

export type HeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  primary: Action;
  secondary?: Action;
  /** Keterangan singkat di kanan atas, mis. ["Didirikan 1975", "Jakarta, Indonesia"]. */
  meta?: string[];
  /** Label link "scroll ke bawah". */
  scrollLabel: string;
};

/**
 * Hero homepage layar penuh, gaya arsitektural: garis kolom, judul display besar & ringan,
 * garis rambut pemisah lead dan aksi. Satu per halaman — berisi `<h1>`.
 */
export default function Hero({
  eyebrow,
  title,
  lead,
  primary,
  secondary,
  meta = [],
  scrollLabel,
}: HeroProps) {
  return (
    <>
      <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-primary-950 text-white">
        {/* Latar sinematik: gradien + cahaya lembut. Ganti/lengkapi dengan foto/video klien. */}
        <div className="absolute inset-0 -z-20" aria-hidden="true">
          <div className="absolute inset-0 bg-linear-to-b from-primary-900 via-primary-950 to-primary-950" />
          <div
            data-parallax
            className="absolute -top-1/3 -right-1/4 aspect-square w-3/4 rounded-full bg-white/5 blur-3xl"
          />
        </div>
        <NusantaraPattern fade="right" />
        <ColumnLines />

        <Container className="flex flex-1 flex-col pt-32 pb-10 md:pt-36">
          <div
            className="flex items-center justify-between gap-6 text-eyebrow font-semibold uppercase"
            data-reveal
          >
            <p className="flex items-center gap-4 text-accent-400">
              <span className="h-px w-10 bg-current opacity-50" aria-hidden="true" />
              {eyebrow}
            </p>
            {meta.length > 0 && (
              <ul className="hidden gap-8 text-primary-200 sm:flex">
                {meta.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-1 flex-col justify-end pt-20" data-reveal-group>
            <h1 className="max-w-6xl text-display font-light text-white" data-reveal>
              {title}
            </h1>
            <div
              className="mt-14 grid gap-10 border-t border-white/15 pt-10 lg:grid-cols-12"
              data-reveal
            >
              <p className="text-lead text-primary-200 lg:col-span-6">{lead}</p>
              <div className="flex flex-wrap items-start gap-4 lg:col-span-5 lg:col-start-8 lg:justify-end">
                <Button href={primary.href} variant="accent">
                  {primary.label}
                </Button>
                {secondary && (
                  <Button href={secondary.href} variant="ghost-light">
                    {secondary.label}
                  </Button>
                )}
              </div>
            </div>
          </div>

          <a
            href="#content-start"
            className="mt-16 hidden items-center gap-4 self-start text-eyebrow font-semibold text-white/60 uppercase transition-colors hover:text-white md:flex"
          >
            <span className="h-px w-10 bg-current" aria-hidden="true" />
            {scrollLabel}
          </a>
        </Container>
      </section>
      <span id="content-start" />
    </>
  );
}
