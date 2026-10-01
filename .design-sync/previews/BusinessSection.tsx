import { BusinessSection } from 'corporate-template-ui';

const photo = (label: string, w = 1200, h = 800) => ({
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#262626"/><stop offset="1" stop-color="#737373"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/></svg>`,
  )}`,
  alt: label,
  width: w,
  height: h,
});

const cards = ['Energi', 'Infrastruktur', 'Layanan Keuangan', 'Solusi Digital'].map(
  (title, index) => ({
    title,
    index,
    summary: 'Ringkasan singkat lini bisnis dalam satu kalimat.',
    description:
      'Uraian lebih panjang tentang lini bisnis ini; hanya tampil pada lini utama di tata letak featured.',
    image: photo(`Foto lini bisnis ${title}`),
  }),
);

/** 3–4 lini: lini pertama besar, sisanya baris ringkas. */
export const Featured = () => (
  <BusinessSection
    id="business"
    index="03"
    eyebrow="Bisnis"
    title="Portofolio yang menopang perekonomian"
    lead="Portofolio usaha yang saling terintegrasi untuk menciptakan nilai bagi negara."
    cards={cards}
  />
);

/** Portofolio dengan banyak lini: grid rata. */
export const Grid = () => (
  <BusinessSection
    id="business-grid"
    index="03"
    eyebrow="Bisnis"
    title="Portofolio yang menopang perekonomian"
    layout="grid"
    cards={cards}
  />
);
