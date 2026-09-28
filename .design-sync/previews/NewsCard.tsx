import { NewsCard } from 'corporate-template-ui';

const photo = (label: string, from: string, to: string) => ({
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/><circle cx="900" cy="260" r="220" fill="none" stroke="#A3A3A3" stroke-opacity="0.5" stroke-width="2"/><path d="M0 640 L360 480 L620 580 L1200 360 L1200 800 L0 800Z" fill="#FFFFFF" fill-opacity="0.06"/></svg>`,
  )}`,
  alt: label,
  width: 1200,
  height: 800,
});

export const Default = () => (
  <div className="max-w-sm">
    <NewsCard
      href="#"
      title="Perusahaan raih penghargaan tata kelola terbaik 2026"
      description="Penghargaan diberikan atas penerapan prinsip GCG yang konsisten dan transparan."
      dateTime="2026-03-12"
      dateLabel="12 Maret 2026"
      cover={photo('Direksi menerima penghargaan tata kelola', '#171717', '#525252')}
    />
  </div>
);

export const ThreeUp = () => (
  <div className="grid gap-10 sm:grid-cols-3">
    <NewsCard
      href="#"
      title="Laporan keberlanjutan 2025 terbit"
      description="Kinerja lingkungan, sosial, dan tata kelola sepanjang tahun."
      dateTime="2026-02-20"
      dateLabel="20 Februari 2026"
      cover={photo('Sampul laporan keberlanjutan', '#262626', '#595959')}
    />
    <NewsCard
      href="#"
      title="Groundbreaking kawasan industri baru"
      description="Proyek strategis nasional di Jawa Tengah mulai dibangun."
      dateTime="2026-01-15"
      dateLabel="15 Januari 2026"
      cover={photo('Peletakan batu pertama', '#141414', '#5C5C5C')}
    />
    <NewsCard
      href="#"
      title="RUPS tahunan menyetujui laporan keuangan"
      description="Pemegang saham mengesahkan laporan tahunan dan penggunaan laba."
      dateTime="2025-12-05"
      dateLabel="5 Desember 2025"
      cover={photo('Suasana RUPS tahunan', '#1C1C1C', '#4A4A4A')}
    />
  </div>
);
