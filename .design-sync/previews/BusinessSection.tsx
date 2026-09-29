import { BusinessSection } from 'corporate-template-ui';

const photo = (label: string, w = 1200, h = 800) => ({
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#262626"/><stop offset="1" stop-color="#737373"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/></svg>`,
  )}`,
  alt: label,
  width: w,
  height: h,
});

export const Default = () => (
  <BusinessSection
    id="business"
    index="03"
    eyebrow="Bisnis"
    title="Portofolio yang menopang perekonomian"
    lead="Portofolio usaha yang saling terintegrasi untuk menciptakan nilai bagi negara."
    cards={['Energi', 'Infrastruktur', 'Layanan Keuangan', 'Solusi Digital'].map(
      (title, index) => ({
        title,
        index,
        summary: 'Ringkasan singkat lini bisnis dalam satu atau dua kalimat.',
        image: photo(`Ilustrasi lini bisnis ${title}`),
      }),
    )}
  />
);
