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
