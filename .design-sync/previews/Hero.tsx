import { Hero } from 'corporate-template-ui';

const photo = (w: number, h: number, alt = '') => ({
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#404040"/><stop offset="1" stop-color="#d4d4d4"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/></svg>`,
  )}`,
  alt,
  width: w,
  height: h,
});

export const Homepage = () => (
  <Hero
    eyebrow="Badan Usaha Milik Negara"
    title="Membangun nilai berkelanjutan untuk Indonesia"
    lead="Kami mengelola aset strategis negara secara profesional, transparan, dan akuntabel untuk memberikan manfaat terbaik bagi masyarakat dan pemangku kepentingan."
    primary={{ label: 'Tentang Kami', href: '#' }}
    secondary={{ label: 'Lini Bisnis', href: '#' }}
    meta={['Didirikan 1975', 'Jakarta, Indonesia']}
    scrollLabel="Gulir ke bawah"
    image={photo(1600, 1100)}
    imageCaption="Gunung Bromo, Jawa Timur"
  />
);

export const SingleAction = () => (
  <Hero
    eyebrow="Karier"
    title="Tumbuh bersama untuk negeri"
    lead="Bergabunglah dengan insan perusahaan yang berintegritas dan berdedikasi."
    primary={{ label: 'Lihat Lowongan', href: '#' }}
    scrollLabel="Gulir ke bawah"
  />
);
