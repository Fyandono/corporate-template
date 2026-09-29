import { PersonCard } from 'corporate-template-ui';

const photo = (label: string, w = 1200, h = 800) => ({
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#262626"/><stop offset="1" stop-color="#737373"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/></svg>`,
  )}`,
  alt: label,
  width: w,
  height: h,
});

export const Default = () => (
  <div className="max-w-xs">
    <PersonCard
      name="Nama Direktur Utama"
      position="Direktur Utama"
      bio="Berpengalaman lebih dari 25 tahun di sektor BUMN dan keuangan."
      photo={photo('Nama Direktur Utama', 600, 800)}
      viewProfileLabel="Lihat profil"
    />
  </div>
);
