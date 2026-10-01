import { ValuesGrid } from 'corporate-template-ui';

export const Akhlak = () => (
  <ValuesGrid
    eyebrow="Nilai Perusahaan"
    title="Nilai-nilai yang kami pegang"
    values={[
      { title: 'Amanah', description: 'Memegang teguh kepercayaan yang diberikan.' },
      { title: 'Kompeten', description: 'Terus belajar dan mengembangkan kapabilitas.' },
      { title: 'Harmonis', description: 'Saling peduli dan menghargai perbedaan.' },
      { title: 'Loyal', description: 'Berdedikasi dan mengutamakan kepentingan bangsa.' },
      { title: 'Adaptif', description: 'Terus berinovasi menghadapi perubahan.' },
      { title: 'Kolaboratif', description: 'Membangun kerja sama yang sinergis.' },
    ]}
  />
);
