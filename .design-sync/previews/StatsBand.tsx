import { StatsBand } from 'corporate-template-ui';

export const CompanyInNumbers = () => (
  <StatsBand
    title="Perusahaan dalam angka"
    locale="id"
    note="Data per 31 Desember 2025"
    stats={[
      { value: 50, suffix: '+', label: 'Tahun melayani negeri' },
      { value: 34, label: 'Provinsi jangkauan operasi' },
      { value: 12, label: 'Anak perusahaan' },
      { value: 25, suffix: 'rb+', label: 'Insan perusahaan' },
    ]}
  />
);
