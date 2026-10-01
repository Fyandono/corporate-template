import { ColumnLines, Container } from 'corporate-template-ui';

export const OnDarkSection = () => (
  <section className="relative isolate overflow-hidden bg-primary-950 text-white">
    <ColumnLines />
    <Container className="py-24">
      <p className="text-eyebrow font-semibold text-accent-400 uppercase">
        Garis kolom arsitektural
      </p>
      <p className="mt-6 max-w-3xl text-headline font-light">
        Garis tipis sejajar grid 12 kolom memberi kesan struktur dan presisi.
      </p>
    </Container>
  </section>
);

export const OnLightSection = () => (
  <section className="relative isolate overflow-hidden bg-white">
    <ColumnLines tone="light" />
    <Container className="py-24">
      <p className="max-w-3xl font-serif text-headline font-light text-primary-900">
        Di section terang garisnya sangat samar — cukup sebagai struktur.
      </p>
    </Container>
  </section>
);
