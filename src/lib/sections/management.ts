import { getCollection, type CollectionEntry } from 'astro:content';
import type {
  ManagementGroup,
  ManagementSectionProps,
} from '../../components/sections/ManagementSection';
import { localize, t, type Locale } from '../../i18n';
import { responsiveImage } from '../image';
import { byOrder, type SectionData } from './shared';

type Person = ManagementGroup['people'][number];
type Entry = CollectionEntry<'management'>;

/** Ubah entri koleksi `management` menjadi props polos untuk PersonCard. */
export async function personCardProps(entry: Pick<Entry, 'data'>, lang: Locale): Promise<Person> {
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

/** Kelompokkan entri per `group` sesuai urutan `groups`, masing-masing diurutkan `order`. */
export function groupPeople<T extends Pick<Entry, 'data'>>(
  entries: T[],
  groups: readonly { key: Entry['data']['group']; title: string }[],
): { title: string; entries: T[] }[] {
  return groups.map((group) => ({
    title: group.title,
    entries: entries.filter((e) => e.data.group === group.key).sort(byOrder),
  }));
}

export async function loadManagement(lang: Locale): Promise<SectionData<ManagementSectionProps>> {
  const dict = t(lang);
  const { management } = dict;
  const groups = groupPeople(await getCollection('management'), [
    { key: 'commissioner', title: management.commissioners },
    { key: 'director', title: management.directors },
  ]);
  return {
    eyebrow: dict.nav.management,
    title: management.title,
    viewProfileLabel: management.viewProfile,
    groups: await Promise.all(
      groups.map(async (group) => ({
        title: group.title,
        people: await Promise.all(group.entries.map((e) => personCardProps(e, lang))),
      })),
    ),
  };
}
