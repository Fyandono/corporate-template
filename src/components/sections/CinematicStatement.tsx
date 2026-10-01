import ColumnLines from '../ui/ColumnLines';
import Container from '../ui/Container';
import Eyebrow from '../ui/Eyebrow';
import Grain from '../ui/Grain';
import NusantaraPattern from '../ui/NusantaraPattern';

export type CinematicStatementProps = {
  eyebrow: string;
  statement: string;
  /** Nomor urut section, mis. "03". */
  index?: string;
};

/** Section gelap full-bleed dengan satu pernyataan besar. Pakai 1–2 kali per halaman. */
export default function CinematicStatement({ eyebrow, statement, index }: CinematicStatementProps) {
  return (
    <section className="relative isolate overflow-hidden bg-primary-950 text-white">
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <div
          data-parallax
          className="absolute -bottom-1/2 -left-1/4 aspect-square w-3/4 rounded-full bg-white/5 blur-3xl"
        />
      </div>
      <NusantaraPattern fade="left" />
      <Grain />
      <ColumnLines />
      <Container className="py-32 md:py-48">
        <figure className="grid gap-10 lg:grid-cols-12">
          <div className="self-start lg:col-span-3" data-reveal>
            <Eyebrow as="figcaption" tone="dark" index={index}>
              {eyebrow}
            </Eyebrow>
          </div>
          <blockquote
            className="font-serif text-statement font-light text-balance text-white lg:col-span-9"
            data-reveal
          >
            <p>
              <span className="text-accent-400" aria-hidden="true">
                “
              </span>
              {statement}
              <span className="text-accent-400" aria-hidden="true">
                ”
              </span>
            </p>
          </blockquote>
        </figure>
      </Container>
    </section>
  );
}
