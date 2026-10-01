import type { ResponsiveImage } from '../types';
import Backdrop from '../ui/Backdrop';
import ColumnLines from '../ui/ColumnLines';
import Container from '../ui/Container';
import Grain from '../ui/Grain';
import NusantaraPattern from '../ui/NusantaraPattern';

export type Crumb = { name: string; path: string };

export type PageHeroProps = {
  title: string;
  lead?: string;
  /** Item terakhir dianggap halaman saat ini. */
  breadcrumbs: Crumb[];
  /** Label aksesibel untuk `<nav>` breadcrumb. */
  breadcrumbLabel: string;
  /** Foto latar opsional. Tanpa foto, hero memakai gradien + motif kawung + grain. */
  image?: ResponsiveImage;
};

/** Hero halaman dalam (bukan homepage). Berisi `<h1>`. */
export default function PageHero({
  title,
  lead,
  breadcrumbs,
  breadcrumbLabel,
  image,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-primary-950 text-white">
      {image ? (
        <Backdrop image={image} vignette="left" priority />
      ) : (
        <>
          <div className="absolute inset-0 -z-20" aria-hidden="true">
            <div className="absolute inset-0 bg-linear-to-b from-primary-900 to-primary-950" />
          </div>
          <NusantaraPattern fade="right" />
          <Grain />
        </>
      )}
      <ColumnLines />
      <Container className="pt-40 pb-20 md:pt-52 md:pb-28">
        <nav aria-label={breadcrumbLabel} data-reveal>
          <ol className="flex flex-wrap items-center gap-3 text-eyebrow font-semibold text-primary-200 uppercase">
            {breadcrumbs.map((crumb, i) => (
              <li key={crumb.path} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="opacity-50">
                    /
                  </span>
                )}
                {i === breadcrumbs.length - 1 ? (
                  <span aria-current="page" className="text-white">
                    {crumb.name}
                  </span>
                ) : (
                  <a href={crumb.path} className="hover:text-white">
                    {crumb.name}
                  </a>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mt-8 max-w-5xl text-display font-light text-white" data-reveal>
          {title}
        </h1>
        {lead && (
          <p
            className="mt-10 max-w-2xl border-t border-white/15 pt-8 text-lead text-primary-200"
            data-reveal
          >
            {lead}
          </p>
        )}
      </Container>
    </section>
  );
}
