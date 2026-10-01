import type { ResponsiveImage } from '../types';
import Backdrop from '../ui/Backdrop';
import Button from '../ui/Button';
import ColumnLines from '../ui/ColumnLines';
import Container from '../ui/Container';
import Eyebrow from '../ui/Eyebrow';
import Grain from '../ui/Grain';
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
  /** Foto latar layar penuh. Tanpa foto, hero memakai gradien + motif kawung. */
  image?: ResponsiveImage;
  /** Keterangan lokasi foto, tampil kecil di kanan bawah: "Gunung Bromo, Jawa Timur". */
  imageCaption?: string;
};

/**
 * Hero homepage layar penuh, gaya arsitektural: foto latar ber-vignette + grain, garis kolom,
 * judul display besar & ringan, garis rambut pemisah lead dan aksi. Satu per halaman — berisi `<h1>`.
 */
export default function Hero({
  eyebrow,
  title,
  lead,
  primary,
  secondary,
  meta = [],
  scrollLabel,
  image,
  imageCaption,
}: HeroProps) {
  return (
    <>
      <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-primary-950 text-white">
        {image ? (
          <Backdrop image={image} vignette="left" priority />
        ) : (
          <>
            {/* Latar sinematik tanpa foto: gradien + cahaya lembut + motif kawung. */}
            <div className="absolute inset-0 -z-20" aria-hidden="true">
              <div className="absolute inset-0 bg-linear-to-b from-primary-900 via-primary-950 to-primary-950" />
              <div
                data-parallax
                className="absolute -top-1/3 -right-1/4 aspect-square w-3/4 rounded-full bg-white/5 blur-3xl"
              />
            </div>
            <NusantaraPattern fade="right" />
            <Grain />
          </>
        )}
        <ColumnLines />

        <Container className="flex flex-1 flex-col pt-32 pb-10 md:pt-36">
          <div
            className="flex items-center justify-between gap-6 text-eyebrow font-semibold uppercase"
            data-reveal
          >
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
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

          <div className="mt-16 flex items-center justify-between gap-6 text-eyebrow font-semibold text-white/60 uppercase">
            <a
              href="#content-start"
              className="hidden items-center gap-4 transition-colors hover:text-white md:flex"
            >
              <span className="h-px w-10 bg-current" aria-hidden="true" />
              {scrollLabel}
            </a>
            {image && imageCaption && (
              <p className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
                {imageCaption}
              </p>
            )}
          </div>
        </Container>
      </section>
      <span id="content-start" />
    </>
  );
}
