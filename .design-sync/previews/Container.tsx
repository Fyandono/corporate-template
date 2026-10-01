import { Container } from 'corporate-template-ui';

export const PageWidth = () => (
  <div className="bg-neutral-100">
    <Container className="py-8">
      <div className="rounded-card border border-neutral-200 bg-white p-6">
        <p className="text-small font-semibold text-primary-900">
          max-w-7xl · px-4 sm:px-6 lg:px-8
        </p>
        <p className="mt-2 text-neutral-600">
          Semua section memakai Container agar tepi konten sejajar di seluruh halaman.
        </p>
      </div>
    </Container>
  </div>
);

export const AsSection = () => (
  <Container as="section" className="grid gap-6 py-10 md:grid-cols-3">
    {['Integritas', 'Profesional', 'Inovatif'].map((v) => (
      <div key={v} className="border-t-2 border-accent-500 pt-4">
        <h3 className="text-title-sm">{v}</h3>
        <p className="mt-2 text-neutral-600">
          Nilai inti yang menjadi pedoman setiap insan perusahaan.
        </p>
      </div>
    ))}
  </Container>
);
