import { getCollection, type CollectionEntry } from 'astro:content';
import type { AboutIntroProps } from '../../components/sections/AboutIntro';
import type { StatsBandProps } from '../../components/sections/StatsBand';
import type { Milestone, TimelineProps } from '../../components/sections/Timeline';
import type { ValueItem, ValuesGridProps } from '../../components/sections/ValuesGrid';
import type { VisionMissionProps } from '../../components/sections/VisionMission';
import { media, type Photo } from '../../config/media';
import { site } from '../../config/site';
import { localize, localizedPath, t, type Locale, type LocalizedString } from '../../i18n';
import { backdropImage, responsiveImage } from '../image';
import { byOrder, type SectionData } from './shared';

type SiteStat = { value: number; suffix?: LocalizedString; label: LocalizedString };

export function mapStats(stats: readonly SiteStat[], lang: Locale): StatsBandProps['stats'] {
  return stats.map((stat) => ({
    value: stat.value,
    label: localize(stat.label, lang),
    suffix: stat.suffix && localize(stat.suffix, lang),
  }));
}

export function mapValues(
  entries: Pick<CollectionEntry<'values'>, 'data'>[],
  lang: Locale,
): ValueItem[] {
  return [...entries].sort(byOrder).map(({ data }) => ({
    title: localize(data.title, lang),
    description: localize(data.description, lang),
  }));
}

export function mapMilestones(
  entries: Pick<CollectionEntry<'milestones'>, 'data'>[],
  lang: Locale,
): Milestone[] {
  return [...entries]
    .sort((a, b) => a.data.year - b.data.year)
    .map(({ data }) => ({
      year: data.year,
      title: localize(data.title, lang),
      description: localize(data.description, lang),
    }));
}

/** Teks foto (keterangan & alt) dalam satu bahasa; alt jatuh ke keterangan bila tidak diisi. */
export function photoText(photo: Pick<Photo, 'caption' | 'alt'>, lang: Locale) {
  const caption = photo.caption && localize(photo.caption, lang);
  return { caption, alt: photo.alt ? localize(photo.alt, lang) : (caption ?? '') };
}

async function loadFigure(photo: Photo, lang: Locale): Promise<AboutIntroProps['figure']> {
  const { caption, alt } = photoText(photo, lang);
  return {
    image: await responsiveImage(
      photo.image,
      alt,
      '(min-width: 1280px) 1216px, 100vw',
      [640, 960, 1280, 1920, 2400],
    ),
    caption,
  };
}

/** Cuplikan profil di beranda: judul + paragraf pembuka + link ke halaman Tentang Kami. */
export function loadHomeIntro(lang: Locale): SectionData<AboutIntroProps> {
  const dict = t(lang);
  const { home } = dict;
  return {
    eyebrow: home.introEyebrow,
    title: home.introTitle,
    lead: home.introBody,
    action: { label: dict.common.learnMore, href: localizedPath(lang, '/about') },
  };
}

/** Angka kunci di beranda, dengan peta titik Nusantara di latar. */
export async function loadStats(lang: Locale): Promise<SectionData<StatsBandProps>> {
  const { home } = t(lang);
  return {
    title: home.statsTitle,
    note: home.statsNote,
    stats: mapStats(site.stats, lang),
    locale: lang,
    map: media.map && (await responsiveImage(media.map.image, '', '100vw')),
  };
}

/** Paragraf pertama menjadi lead, sisanya isi. */
export function splitLead(paragraphs: readonly string[]) {
  const [lead = '', ...body] = paragraphs;
  return { lead, body };
}

/** Visi & misi di atas foto latar — tampil di beranda dan halaman "Tentang Kami". */
export async function loadVisionMission(lang: Locale): Promise<SectionData<VisionMissionProps>> {
  const { about, home } = t(lang);
  return {
    visionTitle: about.visionTitle,
    vision: home.statement,
    missionTitle: about.missionTitle,
    mission: about.mission,
    image: media.vision && (await backdropImage(media.vision.image)),
  };
}

/** Semua props untuk section-section halaman "Tentang Kami". */
export async function loadAbout(lang: Locale) {
  const { about } = t(lang);
  return {
    intro: {
      eyebrow: about.profileEyebrow,
      title: about.profileTitle,
      ...splitLead(about.profileBody),
      figure: media.about && (await loadFigure(media.about, lang)),
    } satisfies SectionData<AboutIntroProps>,
    visionMission: await loadVisionMission(lang),
    values: {
      eyebrow: about.valuesEyebrow,
      title: about.valuesTitle,
      values: mapValues(await getCollection('values'), lang),
    } satisfies SectionData<ValuesGridProps>,
    timeline: {
      eyebrow: about.historyEyebrow,
      title: about.historyTitle,
      milestones: mapMilestones(await getCollection('milestones'), lang),
    } satisfies SectionData<TimelineProps>,
  };
}
