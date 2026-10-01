import { AboutIntro } from 'corporate-template-ui';

const photo = (w: number, h: number, alt = '') => ({
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#404040"/><stop offset="1" stop-color="#d4d4d4"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/></svg>`,
  )}`,
  alt,
  width: w,
  height: h,
});

export const Default = () => (
  <AboutIntro
    index="01"
    eyebrow="Tentang Kami"
    title="Lima dekade berkontribusi bagi pembangunan nasional"
    lead="Sejak didirikan, perusahaan terus bertransformasi menjadi entitas yang tangguh dan adaptif."
    body={[
      'Perusahaan merupakan Badan Usaha Milik Negara yang bergerak di sektor strategis nasional.',
      'Kami berkomitmen menerapkan prinsip tata kelola perusahaan yang baik.',
    ]}
    figure={{
      image: photo(2100, 900, 'Gugusan pulau dilihat dari udara'),
      caption: 'Misool, Raja Ampat',
    }}
  />
);
