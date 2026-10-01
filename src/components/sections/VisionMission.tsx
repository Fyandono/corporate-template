import type { ResponsiveImage } from '../types';
import Backdrop from '../ui/Backdrop';
import ColumnLines from '../ui/ColumnLines';
import Eyebrow from '../ui/Eyebrow';
import Grain from '../ui/Grain';
import NusantaraPattern from '../ui/NusantaraPattern';
import Section from '../ui/Section';

export type VisionMissionProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  /** Nomor urut section, mis. "03". */
  index?: string;
  visionTitle: string;
  vision: string;
  missionTitle: string;
  mission: string[];
  /** Foto latar (dekoratif). Tanpa foto, section memakai motif kawung + grain. */
  image?: ResponsiveImage;
};

/**
 * Section gelap sinematik: pernyataan visi besar selebar konten, lalu daftar misi bernomor
 * dua kolom di bawahnya — label di kolom kiri, isi di kolom kanan — di atas foto latar
 * ber-vignette (atau motif kawung), garis kolom, dan grain.
 */
export default function VisionMission({
  visionTitle,
  vision,
  missionTitle,
  mission,
  image,
  index,
  id,
  titleId = `${id ?? 'vision'}-title`,
}: VisionMissionProps) {
  return (
    <Section tone="dark" id={id} labelledBy={titleId} className="relative isolate overflow-hidden">
      {image ? (
        <Backdrop image={image} vignette="center" />
      ) : (
        <>
          <NusantaraPattern fade="left" />
          <Grain />
        </>
      )}
      <ColumnLines />
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="self-start lg:col-span-3" data-reveal>
          <Eyebrow as="h2" id={titleId} tone="dark" index={index}>
            {visionTitle}
          </Eyebrow>
        </div>
        <p
          className="font-serif text-statement font-light text-balance text-white lg:col-span-9"
          data-reveal
        >
          {vision}
        </p>
      </div>
      <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-12">
        <div className="self-start lg:col-span-3" data-reveal>
          <Eyebrow as="h2" tone="dark">
            {missionTitle}
          </Eyebrow>
        </div>
        <ol className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:col-span-9" data-reveal-group>
          {mission.map((item, i) => (
            <li key={item} className="border-t border-white/15 pt-6" data-reveal>
              <span
                className="block font-serif text-title-lg font-light text-accent-400"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-4 text-body-lg leading-relaxed text-primary-100">{item}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
