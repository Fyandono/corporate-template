import { getEntry, render } from 'astro:content';
import { site } from '../../config/site';
import { t, type Locale } from '../../i18n';

/** Section teks Markdown yang tampil di halaman utama, sesuai `site.features`. */
export const proseSectionKeys = (['governance', 'sustainability'] as const).filter(
  (key) => site.features[key],
);

/** Muat isi section teks dari src/content/pages/<lang>/<key>.md. */
export async function loadProseSections(lang: Locale) {
  const dict = t(lang);
  return Promise.all(
    proseSectionKeys.map(async (key) => {
      const entry = await getEntry('pages', `${lang}/${key}`);
      if (!entry) throw new Error(`Konten tidak ditemukan: src/content/pages/${lang}/${key}.md`);
      const { Content } = await render(entry);
      return {
        key,
        eyebrow: dict.nav[key],
        title: entry.data.title,
        lead: entry.data.description,
        Content,
      };
    }),
  );
}
