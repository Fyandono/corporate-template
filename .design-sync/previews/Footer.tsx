import { Footer } from 'corporate-template-ui';

const nav = ['Tentang Kami', 'Manajemen', 'Lini Bisnis', 'Tata Kelola', 'Keberlanjutan', 'Kontak'];

export const Default = () => (
  <Footer
    brandName="Nama Perusahaan"
    homeHref="#"
    homeLabel="Beranda"
    tagline="Membangun nilai berkelanjutan untuk Indonesia."
    legalName="PT Nama Perusahaan (Persero)"
    addressLines={[
      'Gedung Kantor Pusat, Jl. Jend. Sudirman Kav. 1',
      'Jakarta Pusat, DKI Jakarta 10220',
    ]}
    mainNav={nav.map((label) => ({ label, href: '#' }))}
    mainNavLabel="Navigasi utama"
    followUsLabel="Ikuti kami"
    social={['LinkedIn', 'Instagram', 'YouTube', 'X'].map((label) => ({ label, href: '#' }))}
    opensInNewTabLabel="(membuka tab baru)"
    phone="+62 21 000 0000"
    phoneLabel="Telepon"
    email="info@example.co.id"
    emailLabel="Email"
    copyright="© 2026 PT Nama Perusahaan (Persero). Hak cipta dilindungi undang-undang."
    legalNav={['Kebijakan Privasi', 'Kebijakan Cookie', 'Syarat & Ketentuan'].map((label) => ({
      label,
      href: '#',
    }))}
    cookieSettingsLabel="Pengaturan Cookie"
  />
);
