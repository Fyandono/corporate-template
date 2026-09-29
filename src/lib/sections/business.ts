import { getCollection, type CollectionEntry } from 'astro:content';
import type { BusinessCardProps } from '../../components/sections/BusinessCard';
import type { BusinessSectionProps } from '../../components/sections/BusinessSection';
import { localize, t, type Locale } from '../../i18n';
import { responsiveImage } from '../image';
import { byOrder, type SectionData } from './shared';

/** Ubah entri koleksi `business` menjadi props polos untuk BusinessCard. */
export async function businessCardProps(
  entry: Pick<CollectionEntry<'business'>, 'data'>,
  lang: Locale,
  index: number,
  href?: string,
): Promise<BusinessCardProps> {
  const { data } = entry;
  return {
    title: localize(data.title, lang),
    summary: localize(data.summary, lang),
    image: await responsiveImage(
      data.image,
      localize(data.imageAlt, lang),
      '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
    ),
    index,
    href,
  };
}

export async function loadBusiness(lang: Locale): Promise<SectionData<BusinessSectionProps>> {
  const dict = t(lang);
  const entries = (await getCollection('business')).sort(byOrder);
  return {
    eyebrow: dict.nav.business,
    title: dict.business.title,
    lead: dict.business.lead,
    cards: await Promise.all(entries.map((entry, i) => businessCardProps(entry, lang, i))),
  };
}
