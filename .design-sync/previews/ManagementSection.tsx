import { ManagementSection } from 'corporate-template-ui';

const photo = (label: string, w = 1200, h = 800) => ({
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#262626"/><stop offset="1" stop-color="#737373"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/></svg>`,
  )}`,
  alt: label,
  width: w,
  height: h,
});

const person = (name: string, position: string) => ({
  name,
  position,
  bio: 'Berpengalaman lebih dari 20 tahun di sektor BUMN.',
  photo: photo(name, 600, 800),
});

export const Default = () => (
  <ManagementSection
    id="management"
    index="02"
    eyebrow="Manajemen"
    title="Dipimpin oleh jajaran profesional yang berpengalaman"
    viewProfileLabel="Lihat profil"
    groups={[
      {
        title: 'Dewan Komisaris',
        people: [
          person('Nama Komisaris Utama', 'Komisaris Utama'),
          person('Nama Komisaris', 'Komisaris'),
        ],
      },
      {
        title: 'Direksi',
        people: [
          person('Nama Direktur Utama', 'Direktur Utama'),
          person('Nama Direktur Keuangan', 'Direktur Keuangan'),
        ],
      },
    ]}
  />
);
