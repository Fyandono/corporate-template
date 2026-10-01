import { NewsSection } from 'corporate-template-ui';

const photo = (label: string, w = 1200, h = 800) => ({
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#262626"/><stop offset="1" stop-color="#737373"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/></svg>`,
  )}`,
  alt: label,
  width: w,
  height: h,
});

export const Default = () => (
  <NewsSection
    id="news"
    index="06"
    eyebrow="Berita"
    title="Berita & siaran pers"
    emptyLabel="Belum ada berita."
    cards={[1, 2, 3].map((n) => ({
      title: `Judul siaran pers ${n}`,
      description: 'Ringkasan berita dalam satu atau dua kalimat.',
      cover: photo(`Foto berita ${n}`),
      dateTime: '2026-03-12',
      dateLabel: '12 Maret 2026',
    }))}
  />
);

export const Empty = () => (
  <NewsSection
    eyebrow="Berita"
    title="Berita & siaran pers"
    emptyLabel="Belum ada berita."
    cards={[]}
  />
);
