import { ContactSection } from 'corporate-template-ui';

const photo = (label: string, w = 1200, h = 800) => ({
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#262626"/><stop offset="1" stop-color="#737373"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/></svg>`,
  )}`,
  alt: label,
  width: w,
  height: h,
});

export const Default = () => (
  <ContactSection
    id="contact"
    index="07"
    eyebrow="Kontak"
    title="Mari berkolaborasi membangun negeri"
    lead="Hubungi kami untuk informasi lebih lanjut mengenai perusahaan."
    officeTitle="Kantor Pusat"
    legalName="PT Nama Perusahaan (Persero)"
    addressLines={[
      'Gedung Kantor Pusat, Jl. Jend. Sudirman Kav. 1',
      'Jakarta Pusat, DKI Jakarta 10220',
    ]}
    details={[
      { label: 'Telepon', value: '+62 21 000 0000', href: 'tel:+62210000000' },
      { label: 'Email', value: 'info@example.co.id', href: 'mailto:info@example.co.id' },
      { label: 'Jam Operasional', value: 'Senin – Jumat, 08.00 – 17.00 WIB' },
    ]}
    map={{
      image: photo('Ilustrasi peta lokasi kantor pusat', 1200, 700),
      href: '#',
      label: 'Buka di Google Maps',
    }}
    opensInNewTabLabel="(membuka tab baru)"
  />
);
