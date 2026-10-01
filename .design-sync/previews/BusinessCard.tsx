import { BusinessCard } from 'corporate-template-ui';

const photo = (label: string, from: string, to: string) => ({
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/><circle cx="900" cy="260" r="220" fill="none" stroke="#A3A3A3" stroke-opacity="0.5" stroke-width="2"/><path d="M0 640 L360 480 L620 580 L1200 360 L1200 800 L0 800Z" fill="#FFFFFF" fill-opacity="0.06"/></svg>`,
  )}`,
  alt: label,
  width: 1200,
  height: 800,
});

export const Linked = () => (
  <div className="max-w-sm">
    <BusinessCard
      index={0}
      href="#"
      title="Energi"
      summary="Penyediaan energi yang andal dan terjangkau untuk mendukung pertumbuhan industri nasional."
      image={photo('Ilustrasi lini bisnis energi', '#171717', '#525252')}
    />
  </div>
);

export const Featured = () => (
  <BusinessCard
    variant="featured"
    index={0}
    title="Energi"
    summary="Menjamin ketersediaan energi yang andal dan terjangkau."
    description="Kami mengelola rantai pasok energi dari hulu ke hilir untuk mendukung ketahanan energi nasional, dengan transisi bertahap menuju energi bersih."
    image={photo('Menara transmisi listrik saat senja', '#171717', '#525252')}
  />
);

export const Compact = () => (
  <div className="max-w-md divide-y divide-neutral-200 border-y border-neutral-200">
    <BusinessCard
      variant="compact"
      index={1}
      title="Infrastruktur"
      summary="Membangun konektivitas yang menggerakkan ekonomi."
      image={photo('Simpang susun jalan tol dari udara', '#262626', '#595959')}
    />
    <BusinessCard
      variant="compact"
      index={2}
      title="Layanan Keuangan"
      summary="Memperluas akses pembiayaan yang inklusif."
      image={photo('Gedung perkantoran pada malam hari', '#1C1C1C', '#4A4A4A')}
    />
  </div>
);

export const Grid = () => (
  <div className="grid gap-6 sm:grid-cols-2">
    <BusinessCard
      index={0}
      title="Infrastruktur"
      summary="Pembangunan jalan, pelabuhan, dan kawasan industri yang menghubungkan wilayah."
      image={photo('Ilustrasi lini bisnis infrastruktur', '#262626', '#595959')}
    />
    <BusinessCard
      index={1}
      title="Layanan Keuangan"
      summary="Pembiayaan dan penjaminan untuk UMKM dan proyek strategis nasional."
      image={photo('Ilustrasi lini bisnis layanan keuangan', '#1C1C1C', '#4A4A4A')}
    />
  </div>
);
