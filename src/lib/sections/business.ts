import { getCollection, type CollectionEntry } from 'astro:content';
import type {
  BusinessLayout,
  BusinessSectionProps,
} from '../../components/sections/BusinessSection';
import { site } from '../../config/site';
import { localize, localizedPath, t, type Locale } from '../../i18n';
import { responsiveImage } from '../image';
import { byOrder, type SectionData } from './shared';

type Card = BusinessSectionProps['cards'][number];

/**
 * Tata letak section: 3–4 lini → satu lini utama + baris ringkas (`featured`);
 * selain itu grid rata, agar kolom ringkas tidak terlalu pendek/panjang.
 */
export const businessLayout = (count: number): BusinessLayout =>
  count >= 3 && count <= 4 ? 'featured' : 'grid';

/** `sizes` & lebar gambar sesuai posisi kartu dalam tata letak. */
export function cardImageSpec(layout: BusinessLayout, index: number) {
  if (layout === 'grid') {
    return {
      sizes: '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
      widths: [400, 800],
    };
  }
  return index === 0
    ? {
        sizes: '(min-width: 1280px) 700px, (min-width: 1024px) 56vw, 100vw',
        widths: [640, 960, 1400],
      }
    : { sizes: '(min-width: 1024px) 200px, 40vw', widths: [320, 480] };
}

/** Ubah entri koleksi `business` menjadi props polos untuk BusinessCard. */
export async function businessCardProps(
  entry: Pick<CollectionEntry<'business'>, 'data'>,
  lang: Locale,
  index: number,
  layout: BusinessLayout = 'grid',
  href?: string,
): Promise<Card> {
  const { data } = entry;
  const { sizes, widths } = cardImageSpec(layout, index);
  return {
    title: localize(data.title, lang),
    summary: localize(data.summary, lang),
    description: localize(data.description, lang),
    image: await responsiveImage(data.image, localize(data.imageAlt, lang), sizes, widths),
    index,
    href,
  };
}

type Entry = Pick<CollectionEntry<'business'>, 'id' | 'data'>;

/** Link ke halaman detail lini bisnis; `undefined` bila modul halaman detail nonaktif. */
export const businessHref = (lang: Locale, id: string, detailPages: boolean) =>
  detailPages ? localizedPath(lang, `/business/${id}`) : undefined;

async function loadCards(entries: Entry[], lang: Locale, layout: BusinessLayout) {
  return Promise.all(
    entries.map((entry, i) =>
      businessCardProps(
        entry,
        lang,
        i,
        layout,
        businessHref(lang, entry.id, site.features.businessDetailPages),
      ),
    ),
  );
}

/** Daftar lini bisnis untuk halaman Bisnis (judul sudah ada di PageHero). */
export async function loadBusiness(lang: Locale): Promise<SectionData<BusinessSectionProps>> {
  const entries = (await getCollection('business')).sort(byOrder);
  const layout = businessLayout(entries.length);
  return { layout, cards: await loadCards(entries, lang, layout) };
}

/** Cuplikan lini bisnis di beranda: dengan judul dan link ke halaman Bisnis. */
export async function loadHomeBusiness(lang: Locale): Promise<SectionData<BusinessSectionProps>> {
  const dict = t(lang);
  return {
    ...(await loadBusiness(lang)),
    eyebrow: dict.home.businessEyebrow,
    title: dict.home.businessTitle,
    action: { label: dict.common.learnMore, href: localizedPath(lang, '/business') },
  };
}

/** Isi halaman detail satu lini bisnis: teks + foto lebar. */
export async function loadBusinessDetail(entry: Pick<Entry, 'data'>, lang: Locale) {
  const { data } = entry;
  return {
    title: localize(data.title, lang),
    summary: localize(data.summary, lang),
    description: localize(data.description, lang),
    image: await responsiveImage(
      data.image,
      localize(data.imageAlt, lang),
      '(min-width: 1280px) 1216px, 100vw',
      [640, 960, 1280, 1600],
    ),
  };
}
