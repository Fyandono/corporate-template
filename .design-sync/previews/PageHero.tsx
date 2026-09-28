import { PageHero } from 'corporate-template-ui';

export const WithLead = () => (
  <PageHero
    title="Tentang Kami"
    lead="Mengenal lebih dekat perjalanan, arah, dan nilai-nilai yang kami pegang."
    breadcrumbLabel="Breadcrumb"
    breadcrumbs={[
      { name: 'Beranda', path: '/id' },
      { name: 'Tentang Kami', path: '/id/about' },
    ]}
  />
);

export const DeepPage = () => (
  <PageHero
    title="Energi"
    breadcrumbLabel="Breadcrumb"
    breadcrumbs={[
      { name: 'Beranda', path: '/id' },
      { name: 'Lini Bisnis', path: '/id/business' },
      { name: 'Energi', path: '/id/business/energi' },
    ]}
  />
);
