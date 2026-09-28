import { Hero } from 'corporate-template-ui';

export const Homepage = () => (
  <Hero
    eyebrow="Badan Usaha Milik Negara"
    title="Membangun nilai berkelanjutan untuk Indonesia"
    lead="Kami mengelola aset strategis negara secara profesional, transparan, dan akuntabel untuk memberikan manfaat terbaik bagi masyarakat dan pemangku kepentingan."
    primary={{ label: 'Tentang Kami', href: '#' }}
    secondary={{ label: 'Lini Bisnis', href: '#' }}
    meta={['Didirikan 1975', 'Jakarta, Indonesia']}
    scrollLabel="Gulir ke bawah"
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
