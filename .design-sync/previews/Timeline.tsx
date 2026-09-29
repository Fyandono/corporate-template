import { Timeline } from 'corporate-template-ui';

export const Default = () => (
  <Timeline
    eyebrow="Sejarah"
    title="Perjalanan kami"
    milestones={[
      {
        year: 1975,
        title: 'Pendirian perusahaan',
        description: 'Didirikan melalui Peraturan Pemerintah.',
      },
      {
        year: 1998,
        title: 'Menjadi Persero',
        description: 'Status badan hukum berubah menjadi Persero.',
      },
      {
        year: 2012,
        title: 'Ekspansi nasional',
        description: 'Jaringan operasi menjangkau seluruh provinsi.',
      },
      {
        year: 2024,
        title: 'Transformasi berkelanjutan',
        description: 'Meluncurkan peta jalan keberlanjutan.',
      },
    ]}
  />
);
