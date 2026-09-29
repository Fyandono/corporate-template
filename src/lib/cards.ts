import type { CollectionEntry } from 'astro:content';
import type { BusinessCardProps } from '../components/sections/BusinessCard';
import type { NewsCardProps } from '../components/sections/NewsCard';
import type { PersonCardProps } from '../components/ui/PersonCard';
import { formatDate, localize, type Locale } from '../i18n';
import { responsiveImage } from './image';

/** Ubah entri koleksi `business` menjadi props polos untuk BusinessCard. */
export async function businessCardProps(
  entry: CollectionEntry<'business'>,
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

/** Ubah entri koleksi `news` menjadi props polos untuk NewsCard. */
export async function newsCardProps(
  entry: CollectionEntry<'news'>,
  lang: Locale,
  href?: string,
): Promise<NewsCardProps> {
  const { data } = entry;
  return {
    title: data.title,
    description: data.description,
    cover: await responsiveImage(
      data.cover,
      data.coverAlt,
      '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
    ),
    dateTime: data.date.toISOString(),
    dateLabel: formatDate(data.date, lang),
    href,
  };
}

/** Ubah entri koleksi `management` menjadi props polos untuk PersonCard. */
export async function personCardProps(
  entry: CollectionEntry<'management'>,
  lang: Locale,
): Promise<Omit<PersonCardProps, 'as' | 'viewProfileLabel'>> {
  const { data } = entry;
  return {
    name: data.name,
    position: localize(data.position, lang),
    bio: localize(data.bio, lang),
    photo: await responsiveImage(
      data.photo,
      data.name,
      '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
      [320, 640],
    ),
  };
}
