import { getCollection, type CollectionEntry } from 'astro:content';
import type { NewsCardProps } from '../../components/sections/NewsCard';
import type { NewsSectionProps } from '../../components/sections/NewsSection';
import { formatDate, localizedPath, t, type Locale } from '../../i18n';
import { responsiveImage } from '../image';
import type { SectionData } from './shared';

type Entry = Pick<CollectionEntry<'news'>, 'id' | 'data'>;

/** Berita terbit (bukan draft) untuk satu bahasa, terbaru lebih dulu, maksimal `limit`. */
export function latestNews<T extends Entry>(entries: T[], lang: Locale, limit: number): T[] {
  return entries
    .filter((e) => e.id.startsWith(`${lang}/`) && !e.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, limit);
}

/** Ubah entri koleksi `news` menjadi props polos untuk NewsCard. */
export async function newsCardProps(
  entry: Entry,
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

/** `id/judul-berita` → `/id/news/judul-berita`. */
export const newsHref = (entry: Pick<Entry, 'id'>, lang: Locale) =>
  localizedPath(lang, `/news/${entry.id.split('/')[1]}`);

/** Daftar berita untuk halaman Berita (judul sudah ada di PageHero). */
export async function loadNews(
  lang: Locale,
  limit = Infinity,
): Promise<SectionData<NewsSectionProps>> {
  const entries = latestNews(await getCollection('news'), lang, limit);
  return {
    emptyLabel: t(lang).news.empty,
    cards: await Promise.all(
      entries.map((entry) => newsCardProps(entry, lang, newsHref(entry, lang))),
    ),
  };
}

/** Cuplikan tiga berita terbaru di beranda: dengan judul dan link ke halaman Berita. */
export async function loadHomeNews(lang: Locale): Promise<SectionData<NewsSectionProps>> {
  const dict = t(lang);
  return {
    ...(await loadNews(lang, 3)),
    eyebrow: dict.home.newsEyebrow,
    title: dict.home.newsTitle,
    action: { label: dict.common.learnMore, href: localizedPath(lang, '/news') },
  };
}
