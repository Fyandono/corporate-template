import { SectionHeading } from 'corporate-template-ui';

export const Default = () => (
  <div className="bg-white p-8">
    <SectionHeading
      index="01"
      eyebrow="Sekilas Perusahaan"
      title="Lima dekade berkontribusi bagi pembangunan nasional"
      lead="Dengan tata kelola yang baik dan inovasi berkelanjutan, kami menjalankan peran sebagai agen pembangunan sekaligus penciptaan nilai ekonomi."
    />
  </div>
);

export const Centered = () => (
  <div className="bg-neutral-50 p-8">
    <SectionHeading
      align="center"
      eyebrow="Lini Bisnis"
      title="Portofolio yang menopang perekonomian"
    />
  </div>
);

export const DarkTone = () => (
  <div className="bg-primary-950 p-8">
    <SectionHeading
      tone="dark"
      eyebrow="Visi"
      title="Menjadi kebanggaan bangsa"
      lead="Memberi nilai tambah bagi Indonesia melalui pengelolaan aset strategis yang profesional."
    />
  </div>
);
